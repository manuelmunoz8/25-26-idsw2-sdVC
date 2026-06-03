import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { BaseService } from '../../common/classes/base.service';

@Injectable()
export class ProjectsService extends BaseService<Project> {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {
    super(projectsRepository);
  }

  // Sobrescribimos findAll para mantener el orden específico solicitado previamente
  override async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
