import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { IBaseController } from '../../common/interfaces/base.controller.interface';
import { CreateProjectDto, UpdateProjectDto } from '../../dtos';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coordinador')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.projectsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coordinador')
  create(@Request() req: any, @Body() projectData: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(req.user.id, projectData);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coordinador')
  async update(
    @Request() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() projectData: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.updateProject(req.user.id, id, projectData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coordinador')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.projectsService.softDelete(id);
  }

  @Post(':id/investigators')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coordinador')
  addResearcher(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('investigatorId', ParseUUIDPipe) investigatorId: string,
  ): Promise<Project> {
    return this.projectsService.addResearcher(id, investigatorId);
  }

  @Delete(':id/investigators/:investigatorId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('coordinador')
  removeResearcher(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('investigatorId', ParseUUIDPipe) investigatorId: string,
  ): Promise<Project> {
    return this.projectsService.removeResearcher(id, investigatorId);
  }
}
