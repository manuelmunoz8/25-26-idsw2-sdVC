import { Repository } from 'typeorm';
import { IBaseService } from '../interfaces/base.service.interface';
export declare abstract class BaseService<T extends {
    id: string;
}> implements IBaseService<T> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    findAll(): Promise<T[]>;
    findOne(id: string): Promise<T>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T>;
    remove(id: string): Promise<void>;
}
