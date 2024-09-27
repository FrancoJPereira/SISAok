import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCasoDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  enfermedad: string;

  @IsNumber()
  @IsNotEmpty()
  dni: number;

  @IsNumber()
  @IsNotEmpty()
  telefono: number;
}
