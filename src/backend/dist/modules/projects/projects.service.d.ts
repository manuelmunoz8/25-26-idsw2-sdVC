import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { BaseService } from '../../common/classes/base.service';
export declare class ProjectsService extends BaseService<Project> {
    private readonly projectsRepository;
    constructor(projectsRepository: Repository<Project>);
    findAll(): Promise<Project[]>;
}
