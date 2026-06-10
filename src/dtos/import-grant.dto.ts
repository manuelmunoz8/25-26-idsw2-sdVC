  import { IsNotEmpty, IsString } from 'class-validator';

export class ImportGrantDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID de la convocatoria es obligatorio' })
  id!: string;
}
