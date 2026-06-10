import { Injectable } from '@nestjs/common';
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
}
