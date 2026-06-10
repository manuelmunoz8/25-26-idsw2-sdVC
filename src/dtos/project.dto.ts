import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  objectives?: string;

  @IsEnum(['draft', 'active', 'completed', 'cancelled'])
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  objectives?: string;

  @IsEnum(['draft', 'active', 'completed', 'cancelled'])
  @IsOptional()
  status?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}
