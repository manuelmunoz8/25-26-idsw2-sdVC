import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';
import { BaseService } from '../../common/classes/base.service';

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
      where: { parent: null as any },
      relations: ['author', 'replies', 'replies.author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Publication[]> {
    return await this.publicationsRepository.find({
      where: { author: { id: userId } as any },
      relations: ['author', 'replies'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneWithReplies(id: string): Promise<Publication> {
    const pub = await this.publicationsRepository.findOne({
      where: { id },
      relations: ['author', 'replies', 'replies.author'],
    });
    if (!pub) throw new NotFoundException('Publication not found');
    return pub;
  }

  async reply(parentId: string, replyData: Partial<Publication>): Promise<Publication> {
    const parent = await this.findOneWithReplies(parentId);
    const reply = this.publicationsRepository.create({
      ...replyData,
      parent,
    });
    return await this.publicationsRepository.save(reply);
  }
}
