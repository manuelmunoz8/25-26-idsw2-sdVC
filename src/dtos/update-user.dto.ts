import { IsString, IsOptional, IsNumber, Min, IsEnum, IsBoolean, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  weeklyWorkload?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalWorkload?: number;

  @IsEnum(['investigador', 'coordinador'])
  @IsOptional()
  role?: string;

  @IsBoolean()
  @IsOptional()
  deletionRequested?: boolean;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;
}
