import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CasoModule } from './caso/caso.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',   // Cambia por tu host de MySQL
      port: 3306,          // Puerto por defecto de MySQL
      username: 'root',    // Tu usuario de MySQL
      password: 'admin',   // Tu contraseña de MySQL
      database: 'test',  // Tu base de datos
      autoLoadEntities: true,
      synchronize: true,  // Sincronización automática (solo en desarrollo)
    }),
    UsersModule,
    AuthModule,   
    CasoModule,  // Añadido a la misma lista de imports
  ],
})
export class AppModule {}
