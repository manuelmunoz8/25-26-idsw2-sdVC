import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { Publication } from './entities/publication.entity';
import { CreatePublicationDto, CreateReplyDto, UpdatePublicationDto } from '../dtos';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Get()
  findAll(): Promise<Publication[]> {
    return this.publicationsService.findAllMain();
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseUUIDPipe) userId: string): Promise<Publication[]> {
    return this.publicationsService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Publication> {
    return this.publicationsService.findOneWithReplies(id);
  }

  @Post()
  create(@Body() publicationData: CreatePublicationDto): Promise<Publication> {
    return this.publicationsService.create(publicationData as any);
  }

  @Post(':id/replies')
  reply(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() replyData: CreateReplyDto,
  ): Promise<Publication> {
    return this.publicationsService.reply(id, replyData as any);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() publicationData: UpdatePublicationDto,
  ): Promise<Publication> {
    return this.publicationsService.update(id, publicationData as any);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.publicationsService.remove(id);
  }
}
