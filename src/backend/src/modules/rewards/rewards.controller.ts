import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { Reward } from './entities/reward.entity';
import { IBaseController } from '../../common/interfaces/base.controller.interface';
import { CreateRewardDto, UpdateRewardDto } from '../../dtos';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('rewards')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('coordinador')
  create(@Body() rewardData: CreateRewardDto): Promise<Reward> {
    return this.rewardsService.create(rewardData as any);
  }

  @Put(':id')
  @Roles('coordinador')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() rewardData: UpdateRewardDto,
  ): Promise<Reward> {
    return this.rewardsService.update(id, rewardData);
  }

  @Delete(':id')
  @Roles('coordinador')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.rewardsService.remove(id);
  }
}
