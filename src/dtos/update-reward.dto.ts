import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateRewardDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  value?: number;
}
