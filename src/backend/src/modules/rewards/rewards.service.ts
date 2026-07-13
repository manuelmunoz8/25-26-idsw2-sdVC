import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward } from './entities/reward.entity';
import { BaseService } from '../../common/classes/base.service';

@Injectable()
export class RewardsService extends BaseService<Reward> {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardsRepository: Repository<Reward>,
  ) {
    super(rewardsRepository);
  }

  override async findAll(): Promise<Reward[]> {
    return await this.rewardsRepository.find({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' },
    });
  }

  override async findOne(id: string): Promise<Reward> {
    const reward = await this.rewardsRepository.findOne({
      where: { id: id as any, isDeleted: false },
    });
    if (!reward) throw new NotFoundException(`Reward with ID ${id} not found`);
    return reward;
  }
}
