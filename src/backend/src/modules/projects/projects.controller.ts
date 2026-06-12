import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { IBaseController } from '../../common/interfaces/base.controller.interface';
import { CreateProjectDto, UpdateProjectDto } from '../../dtos';

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
  create(@Body() projectData: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(projectData as any);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() projectData: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.update(id, projectData as any);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.projectsService.remove(id);
  }

  @Post(':id/researchers')
  addResearcher(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('userId', ParseUUIDPipe) userId: string,
  ): Promise<Project> {
    return this.projectsService.addResearcher(id, userId);
  }

  @Delete(':id/researchers/:userId')
  removeResearcher(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<Project> {
    return this.projectsService.removeResearcher(id, userId);
  }
}
