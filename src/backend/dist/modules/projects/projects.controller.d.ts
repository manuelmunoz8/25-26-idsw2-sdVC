import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { IBaseController } from '../../common/interfaces/base.controller.interface';
export declare class ProjectsController implements IBaseController<Project> {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    create(projectData: Partial<Project>): Promise<Project>;
    update(id: string, projectData: Partial<Project>): Promise<Project>;
    remove(id: string): Promise<void>;
}
