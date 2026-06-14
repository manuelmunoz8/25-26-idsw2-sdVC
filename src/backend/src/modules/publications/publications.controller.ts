import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { Publication } from './entities/publication.entity';
import { CreatePublicationDto, CreateReplyDto, UpdatePublicationDto } from '../../dtos';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() publicationData: CreatePublicationDto): Promise<Publication> {
    return this.publicationsService.createPublication(req.user.id, publicationData);
  }

  @Post(':id/replies')
  @UseGuards(JwtAuthGuard)
  reply(
    @Request() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() replyData: CreateReplyDto,
  ): Promise<Publication> {
    return this.publicationsService.reply(req.user.id, id, replyData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Request() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() publicationData: UpdatePublicationDto,
  ): Promise<Publication> {
    return this.publicationsService.updatePublication(req.user.id, id, publicationData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req: any, @Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.publicationsService.removePublication(req.user.id, id);
  }
}
