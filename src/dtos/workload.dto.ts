import { IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateWorkloadDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  teachingHours?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  researchHours?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  academicHours?: number;
}
