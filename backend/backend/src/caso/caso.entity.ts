import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Caso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  enfermedad: string;

  @Column()
  dni: string;

  @Column()
  telefono: string;
}
