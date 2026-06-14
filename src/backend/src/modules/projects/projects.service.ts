import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { BaseService } from '../../common/classes/base.service';
import { UsersService } from '../users/users.service';
import { CreateProjectDto, UpdateProjectDto } from '../../dtos';

@Injectable()
export class ProjectsService extends BaseService<Project> {
// ... (rest of code)
  async updateProject(coordinatorId: string, id: string, projectData: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);

    // Check permission: Coordinator must match or user must be admin
    // Assuming 'admin' is a role not explicitly present in the requirements list but commonly used.
    // For now, based on instructions: "Solo el Coordinador del proyecto o un administrador debe tener permiso"
    // I need to check the coordinatorId on the project.

    if (project.coordinatorId !== coordinatorId) {
      throw new ForbiddenException('No tienes permiso para editar este proyecto');
    }

    Object.assign(project, projectData);
    return await this.projectsRepository.save(project);
  }
// ...

    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    private readonly usersService: UsersService,
  ) {
    super(projectsRepository);
  }

  // Sobrescribimos findAll para mantener el orden específico solicitado previamente
  override async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' },
      relations: ['researchers'],
    });
  }

  override async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id: id as any, isDeleted: false },
      relations: ['coordinator', 'researchers', 'deliverables'],
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async softDelete(id: string): Promise<void> {
    const project = await this.findOne(id);
    project.isDeleted = true;
    await this.projectsRepository.save(project);
  }

  async createProject(coordinatorId: string, projectData: CreateProjectDto): Promise<Project> {
    const existingProject = await this.projectsRepository.findOne({ where: { title: projectData.title } });
    if (existingProject) {
      throw new ConflictException('Ya existe un proyecto con este título');
    }

    const project = this.projectsRepository.create({
      ...projectData,
      status: projectData.status || 'draft',
      coordinatorId,
    });

    return await this.projectsRepository.save(project);
  }

  async addResearcher(projectId: string, userId: string): Promise<Project> {
    const project = await this.findOne(projectId);
    const user = await this.usersService.findOne(userId);
    
    if (!project.researchers) project.researchers = [];
    if (!project.researchers.find(r => r.id === userId)) {
      project.researchers.push(user);
      await this.projectsRepository.save(project);
    }
    return project;
  }

  async removeResearcher(projectId: string, userId: string): Promise<Project> {
    const project = await this.findOne(projectId);
    project.researchers = project.researchers.filter(r => r.id !== userId);
    await this.projectsRepository.save(project);
    return project;
  }
}
