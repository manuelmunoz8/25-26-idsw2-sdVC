import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ConflictException } from '@nestjs/common';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: { findOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  it('should create a project successfully', async () => {
    const projectData = { title: 'New Project' };
    const coordinatorId = 'uuid';
    
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockReturnValue({ ...projectData, coordinatorId, status: 'draft' } as Project);
    jest.spyOn(repository, 'save').mockResolvedValue({ id: '1', ...projectData, coordinatorId, status: 'draft' } as Project);

    const result = await service.createProject(coordinatorId, projectData as any);
    expect(result.title).toBe(projectData.title);
    expect(result.coordinatorId).toBe(coordinatorId);
    expect(result.status).toBe('draft');
  });

  it('should throw ConflictException if title exists', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue({ id: '1' } as Project);

    await expect(service.createProject('uuid', { title: 'Existing' } as any)).rejects.toThrow(ConflictException);
  });
});
