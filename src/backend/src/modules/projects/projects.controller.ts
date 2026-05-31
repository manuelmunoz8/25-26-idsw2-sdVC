import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post()
  create(@Body() projectData: Partial<Project>): Promise<Project> {
    return this.projectsService.create(projectData);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() projectData: Partial<Project>,
  ): Promise<Project> {
    return this.projectsService.update(id, projectData);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.projectsService.remove(id);
  }
}
