import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsUUID } from 'class-validator';

export class CreateDeliverableDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(['pending', 'in_progress', 'delivered', 'approved', 'rejected'])
  @IsOptional()
  status?: string;

  @IsUUID('4', { message: 'ID de proyecto inválido' })
  @IsNotEmpty({ message: 'El ID del proyecto es obligatorio' })
  projectId!: string;
}

export class UpdateDeliverableDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(['pending', 'in_progress', 'delivered', 'approved', 'rejected'])
  @IsOptional()
  status?: string;
}
