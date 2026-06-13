import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  
  app.use((req, res, next) => {
    console.log('--- Nueva Petición ---');
    console.log('Path:', req.path);
    console.log('Origin:', req.headers.origin);
    console.log('Cookies:', req.cookies);
    next();
  });

  app.use(cookieParser());
  
  // Habilitar CORS para permitir peticiones desde dominios de Cloudflare Pages
  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // 1. Permitir desarrollo local
      if (!origin || origin.startsWith('http://localhost:')) {
        callback(null, true);
        return;
      }
    
      // 2. Permitir CUALQUIER despliegue de tu proyecto en Cloudflare Pages
      // Esto acepta tanto https://develop.funiber-connected.pages.dev
      // como https://8ac04279.funiber-connected.pages.dev
      const regex = /^https:\/\/[a-zA-Z0-9-]+\.funiber-connected\.pages\.dev$/;

      if (regex.test(origin)) {
        callback(null, true);
        return;
      }
   
   // 3. Bloquear otros orígenes
    callback(new Error('Not allowed by CORS'));
  },
    credentials: true,
  });
  
  // Configuración de validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
  }));

  // Render inyecta el puerto automáticamente mediante la variable de entorno PORT
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend FUNIBER corriendo en puerto: ${port}`);
}
bootstrap();
