import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
export declare class ProjectsService {
    private readonly projectsRepository;
    constructor(projectsRepository: Repository<Project>);
    findAll(): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    create(projectData: Partial<Project>): Promise<Project>;
    update(id: string, projectData: Partial<Project>): Promise<Project>;
    remove(id: string): Promise<void>;
}
