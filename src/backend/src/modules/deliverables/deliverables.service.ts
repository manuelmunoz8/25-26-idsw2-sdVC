import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deliverable } from './entities/deliverable.entity';
import { BaseService } from '../../common/classes/base.service';
import { Project } from '../projects/entities/project.entity';
import { CreateDeliverableDto, UpdateDeliverableDto } from '../../dtos';

@Injectable()
export class DeliverablesService extends BaseService<Deliverable> {
  constructor(
    @InjectRepository(Deliverable)
    private readonly deliverablesRepository: Repository<Deliverable>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    super(deliverablesRepository);
  }

  async findByProject(projectId: string): Promise<Deliverable[]> {
    return await this.deliverablesRepository.find({
      where: { project: { id: projectId } as any },
      order: { dueDate: 'ASC' },
    });
  }

  async createDeliverable(data: CreateDeliverableDto): Promise<Deliverable> {
    const project = await this.projectRepository.findOne({ where: { id: data.projectId as any } });
    if (!project) throw new NotFoundException('Proyecto no encontrado');

    // Validación de fecha: que sea fecha actual o futura
    if (data.dueDate) {
      const dueDate = new Date(data.dueDate);
      const now = new Date();
      // Ajuste para comparar solo fechas si es necesario, pero el prompt pide "fecha actual"
      // Comparación simple de timestamps para "futura o igual a la actual"
      if (dueDate < new Date(now.setHours(0, 0, 0, 0))) {
        throw new ConflictException('La fecha de entrega no puede ser anterior a la fecha actual');
      }
    }

    const deliverable = this.deliverablesRepository.create({
      ...data,
      project,
      status: data.status || 'pending',
    });
    return await this.deliverablesRepository.save(deliverable);
  }

  async updateDeliverable(id: string, data: UpdateDeliverableDto): Promise<Deliverable> {
    const deliverable = await this.findOne(id);
    const project = await this.projectRepository.findOne({ where: { id: deliverable.project.id as any } });

    if (data.dueDate && project && new Date(data.dueDate) < project.startDate) {
      throw new ConflictException('La fecha de entrega no puede ser anterior a la fecha de inicio del proyecto');
    }

    if (data.status === 'approved') {
      deliverable.approvedAt = new Date();
    }

    Object.assign(deliverable, data);
    return await this.deliverablesRepository.save(deliverable);
  }

  override async findOne(id: string): Promise<Deliverable> {
    const deliverable = await this.deliverablesRepository.findOne({
        where: { id: id as any },
        relations: ['project']
    });
    if (!deliverable) throw new NotFoundException('Entregable no encontrado');
    return deliverable;
  }
}
