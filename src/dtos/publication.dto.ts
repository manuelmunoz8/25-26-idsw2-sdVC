import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'El contenido es obligatorio' })
  content!: string;

  @IsUUID('4', { message: 'ID de autor inválido' })
  @IsNotEmpty({ message: 'El ID del autor es obligatorio' })
  authorId!: string;

  @IsUUID('4')
  @IsOptional()
  parentId?: string;
}

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty({ message: 'El contenido es obligatorio' })
  content!: string;

  @IsUUID('4')
  @IsNotEmpty()
  authorId!: string;
}
