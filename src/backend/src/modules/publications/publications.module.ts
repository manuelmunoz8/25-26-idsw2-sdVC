import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Publication]), AuthModule],
  controllers: [PublicationsController],
  providers: [PublicationsService],
  exports: [PublicationsService, TypeOrmModule],
})
export class PublicationsModule {}
