import { IsString, IsEmail, IsNotEmpty, IsEnum, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsEnum(['investigador', 'coordinador'])
  @IsOptional()
  role?: string;
}
