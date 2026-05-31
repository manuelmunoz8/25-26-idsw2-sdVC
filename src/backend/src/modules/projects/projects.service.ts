import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectsRepository.create(projectData);
    return await this.projectsRepository.save(project);
  }

  async update(id: string, projectData: Partial<Project>): Promise<Project> {
    await this.findOne(id);
    await this.projectsRepository.update(id, projectData);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectsRepository.remove(project);
  }
}
