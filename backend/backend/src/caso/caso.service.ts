import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caso } from './caso.entity';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';

@Injectable()
export class CasoService {
  constructor(
    @InjectRepository(Caso)
    private casoRepository: Repository<Caso>,
  ) {}

  async findAll(): Promise<Caso[]> {
    return this.casoRepository.find();
  }

  async create(createCasoDto: CreateCasoDto): Promise<Caso> {
    const nuevoCaso = this.casoRepository.create(createCasoDto);
    return this.casoRepository.save(nuevoCaso);
  }

  async update(id: number, updateCasoDto: UpdateCasoDto): Promise<Caso> {
    const caso = await this.casoRepository.findOne({ where: { id } });
    if (!caso) {
      throw new NotFoundException(`Caso with ID ${id} not found`);
    }
    // Actualiza las propiedades del caso
    Object.assign(caso, updateCasoDto);
    return this.casoRepository.save(caso);
  }

  async remove(id: number): Promise<void> {
    const result = await this.casoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Caso with ID ${id} not found`);
    }
  }
}
