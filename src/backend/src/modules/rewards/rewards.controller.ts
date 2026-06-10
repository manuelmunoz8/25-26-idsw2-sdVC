import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { Reward } from './entities/reward.entity';
import { IBaseController } from '../../common/interfaces/base.controller.interface';
import { CreateRewardDto } from '../../../../dtos/create-reward.dto';

@Controller('rewards')
export class RewardsController implements IBaseController<Reward> {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get()
  findAll(): Promise<Reward[]> {
    return this.rewardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Reward> {
    return this.rewardsService.findOne(id);
  }

  @Post()
  create(@Body() rewardData: CreateRewardDto): Promise<Reward> {
    return this.rewardsService.create(rewardData as any);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() rewardData: Partial<Reward>,
  ): Promise<Reward> {
    return this.rewardsService.update(id, rewardData);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.rewardsService.remove(id);
  }
}
