import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  value?: number;
}
