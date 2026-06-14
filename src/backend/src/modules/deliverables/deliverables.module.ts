import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deliverable } from './entities/deliverable.entity';
import { DeliverablesService } from './deliverables.service';
import { DeliverablesController } from './deliverables.controller';
import { Project } from '../projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deliverable, Project])],
  controllers: [DeliverablesController],
  providers: [DeliverablesService],
  exports: [DeliverablesService, TypeOrmModule],
})
export class DeliverablesModule {}
