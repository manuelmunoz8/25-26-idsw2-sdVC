import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { BaseService } from '../../common/classes/base.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectsService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    private readonly usersService: UsersService,
  ) {
    super(projectsRepository);
  }

  // Sobrescribimos findAll para mantener el orden específico solicitado previamente
  override async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['researchers'],
    });
  }

  override async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id: id as any },
      relations: ['researchers', 'deliverables'],
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
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
