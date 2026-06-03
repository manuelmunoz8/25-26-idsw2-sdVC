import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Configurar en producción
    credentials: true,
  });
  
  // Configuración de validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Render inyecta el puerto automáticamente mediante la variable de entorno PORT
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend FUNIBER corriendo en puerto: ${port}`);
}
bootstrap();
