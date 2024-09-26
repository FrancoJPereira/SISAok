import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Caso } from './caso.entity';
import { CreateCasoDto } from './dto/create-caso.dto';

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

  async remove(id: number): Promise<void> {
    const result = await this.casoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Caso with ID ${id} not found`);
    }
  }
}
