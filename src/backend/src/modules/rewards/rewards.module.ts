import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reward]), AuthModule],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [RewardsService, TypeOrmModule],
})
export class RewardsModule {}
