import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());
  
  // Habilitar CORS para permitir peticiones desde dominios de Cloudflare Pages
  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Permitir herramientas o desarrollo sin origen
      if (!origin || origin.startsWith('http://localhost:')) {
        callback(null, true);
        return;
      }
      
      // Permitir cualquier subdominio de pages.dev
      if (origin.endsWith('.pages.dev')) {
        callback(null, true);
        return;
      }
      
      // Bloquear otros orígenes
      callback(new Error('Not allowed by CORS'));
    },
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
