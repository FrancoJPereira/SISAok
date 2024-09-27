import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CasoModule } from './caso/caso.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',   
      port: 3306,          
      username: 'root',    // cambien en usuario si es diferente
      password: '43279670',   // pongan la contraseña de su MySQL
      database: 'dengue_sr',  // el nombre de la base de datos (recuerden crearla antes en el Workbench)
      autoLoadEntities: true,
      synchronize: true,  
    }),
    UsersModule,
    AuthModule,   
    CasoModule,  
  ],
})
export class AppModule {}
