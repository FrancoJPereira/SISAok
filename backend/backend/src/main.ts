import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS globalmente para múltiples orígenes
  const allowedOrigins = [
    'http://localhost:5173', // Origen permitido
    'http://localhost:5175', // Otro origen permitido
    'http://localhost:3000', // Otro origen permitido
    // Agrega más orígenes según sea necesario
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir todas las solicitudes si no hay origen
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('No autorizado por CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
