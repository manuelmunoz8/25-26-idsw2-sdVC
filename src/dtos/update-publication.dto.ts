import { IsString, IsOptional } from 'class-validator';

export class UpdatePublicationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
