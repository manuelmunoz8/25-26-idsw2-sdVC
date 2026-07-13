import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';
import { BaseService } from '../../common/classes/base.service';
import { CreatePublicationDto, CreateReplyDto, UpdatePublicationDto } from '../../dtos';

@Injectable()
export class PublicationsService extends BaseService<Publication> {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationsRepository: Repository<Publication>,
  ) {
    super(publicationsRepository);
  }

  async findAllMain(): Promise<Publication[]> {
    return await this.publicationsRepository.find({
      where: { parent: null as any, isDeleted: false },
      relations: ['author', 'replies', 'replies.author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Publication[]> {
    return await this.publicationsRepository.find({
      where: { author: { id: userId } as any, isDeleted: false },
      relations: ['author', 'replies'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneWithReplies(id: string): Promise<Publication> {
    const pub = await this.publicationsRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['author', 'replies', 'replies.author'],
    });
    if (!pub) throw new NotFoundException('Publication not found');

    // Filter out deleted replies manually since TypeORM won't do it automatically for OneToMany without SoftDelete
    if (pub.replies) {
        pub.replies = pub.replies.filter(reply => !reply.isDeleted);
    }

    return pub;
  }

  async createPublication(authorId: string, data: CreatePublicationDto): Promise<Publication> {
    const publication = this.publicationsRepository.create({
      ...data,
      author: { id: authorId } as any,
    });
    return await this.publicationsRepository.save(publication);
  }

  async reply(authorId: string, parentId: string, replyData: CreateReplyDto): Promise<Publication> {
    const parent = await this.findOneWithReplies(parentId);
    const reply = this.publicationsRepository.create({
      ...replyData,
      parent,
      author: { id: authorId } as any,
    });
    return await this.publicationsRepository.save(reply);
  }

  async updatePublication(userId: string, id: string, data: UpdatePublicationDto): Promise<Publication> {
    const publication = await this.publicationsRepository.findOne({
        where: { id, isDeleted: false },
        relations: ['author']
    });
    if (!publication) throw new NotFoundException('Publication not found');
    
    if (publication.author.id !== userId) {
        throw new UnauthorizedException('No tienes permiso para editar esta publicación');
    }

    Object.assign(publication, data);
    return await this.publicationsRepository.save(publication);
  }

  async removePublication(userId: string, id: string): Promise<void> {
    const publication = await this.publicationsRepository.findOne({
        where: { id, isDeleted: false },
        relations: ['author']
    });
    if (!publication) throw new NotFoundException('Publication not found');

    if (publication.author.id !== userId) {
        throw new UnauthorizedException('No tienes permiso para eliminar esta publicación');
    }

    await this.remove(id);
  }
}
