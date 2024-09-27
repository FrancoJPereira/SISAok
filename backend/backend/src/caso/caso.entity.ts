import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Caso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({
    type: 'enum',
    enum: ['Dengue'],
  })
  enfermedad: string;

  @Column()
  dni: number;

  @Column()
  telefono: number;
}
