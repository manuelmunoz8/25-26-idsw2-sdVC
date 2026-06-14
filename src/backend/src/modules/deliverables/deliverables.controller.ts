import { Controller, Get, Post, Body, Param, Put, Delete, Patch, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { DeliverablesService } from './deliverables.service';
import { Deliverable } from './entities/deliverable.entity';
import { CreateDeliverableDto, UpdateDeliverableDto } from '../../dtos';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('deliverables')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('coordinador')
export class DeliverablesController {
  constructor(private readonly deliverablesService: DeliverablesService) {}

  @Get('/project/:projectId')
  findByProject(@Param('projectId', ParseUUIDPipe) projectId: string): Promise<Deliverable[]> {
    return this.deliverablesService.findByProject(projectId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Deliverable> {
    return this.deliverablesService.findOne(id);
  }

  @Post()
  create(@Body() deliverableData: CreateDeliverableDto): Promise<Deliverable> {
    return this.deliverablesService.createDeliverable(deliverableData);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() deliverableData: UpdateDeliverableDto,
  ): Promise<Deliverable> {
    return this.deliverablesService.updateDeliverable(id, deliverableData);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deliverablesService.softDelete(id);
  }
}
