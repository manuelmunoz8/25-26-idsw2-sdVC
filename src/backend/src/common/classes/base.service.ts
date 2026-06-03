import { Repository, FindOptionsWhere } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { IBaseService } from '../interfaces/base.service.interface';

export abstract class BaseService<T extends { id: string }> implements IBaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<T> {
    const record = await this.repository.findOne({ 
      where: { id } as FindOptionsWhere<T> 
    });
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    return record;
  }

  async create(data: Partial<T>): Promise<T> {
    const record = this.repository.create(data as any);
    return await this.repository.save(record as any) as T;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    await this.findOne(id);
    await this.repository.update(id, data as any);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const record = await this.findOne(id);
    await this.repository.remove(record);
  }
}
