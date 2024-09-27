import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { CasoService } from './caso.service';
import { CreateCasoDto } from './dto/create-caso.dto';
import { UpdateCasoDto } from './dto/update-caso.dto';

@Controller('casos')
export class CasoController {
  constructor(private readonly casoService: CasoService) {}

  @Get()
  async findAll() {
    const casos = await this.casoService.findAll();
    console.log('Datos enviados a la respuesta (findAll):', casos);
    return casos;
  }

  @Post()
  async create(@Body() createCasoDto: CreateCasoDto) {
    console.log('Datos recibidos en la solicitud (create):', createCasoDto);
    const nuevoCaso = await this.casoService.create(createCasoDto);
    console.log('Datos enviados a la respuesta (create):', nuevoCaso);
    return nuevoCaso;
  }

  @Put(':id') // Método para actualizar el caso
  async update(@Param('id') id: number, @Body() updateCasoDto: UpdateCasoDto) {
    const updatedCaso = await this.casoService.update(id, updateCasoDto);
    return updatedCaso;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result = await this.casoService.remove(id);
    return result;
  }
}
