import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasoController } from './caso.controller';
import { CasoService } from './caso.service';
import { Caso } from './caso.entity';
import { CasoRepository } from './caso.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Caso])],
  controllers: [CasoController],
  providers: [CasoService, CasoRepository],
})
export class CasoModule {}
