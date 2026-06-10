import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deliverable } from './entities/deliverable.entity';
import { BaseService } from '../../common/classes/base.service';

@Injectable()
export class DeliverablesService extends BaseService<Deliverable> {
  constructor(
    @InjectRepository(Deliverable)
    private readonly deliverablesRepository: Repository<Deliverable>,
  ) {
    super(deliverablesRepository);
  }

  async findByProject(projectId: string): Promise<Deliverable[]> {
    return await this.deliverablesRepository.find({
      where: { project: { id: projectId } as any },
      order: { dueDate: 'ASC' },
    });
  }
}
