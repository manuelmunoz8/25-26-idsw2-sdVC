import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DeliverablesService } from './deliverables.service';
import { Deliverable } from './entities/deliverable.entity';
import { CreateDeliverableDto, UpdateDeliverableDto } from 'shared-dtos/deliverable.dto';

@Controller('deliverables')
export class DeliverablesController {
  constructor(private readonly deliverablesService: DeliverablesService) {}

  @Get('project/:projectId')
  findByProject(@Param('projectId', ParseUUIDPipe) projectId: string): Promise<Deliverable[]> {
    return this.deliverablesService.findByProject(projectId);
  }

  @Post()
  create(@Body() deliverableData: CreateDeliverableDto): Promise<Deliverable> {
    return this.deliverablesService.create(deliverableData as any);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() deliverableData: UpdateDeliverableDto,
  ): Promise<Deliverable> {
    return this.deliverablesService.update(id, deliverableData as any);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deliverablesService.remove(id);
  }
}
