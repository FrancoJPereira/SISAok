import { Repository } from 'typeorm';
import { Caso } from './caso.entity';

export class CasoRepository extends Repository<Caso> {
  // Aquí puedes agregar métodos personalizados si los necesitas
}

// Luego, si necesitas usarlo en tu módulo, asegúrate de hacerlo como parte de los proveedores
