import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    // Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Configuración de la base de datos (PostgreSQL / Supabase)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        
        // Validación de seguridad para evitar el error "Invalid URL"
        if (!dbUrl) {
          console.error('CRÍTICO: La variable DATABASE_URL no está definida.');
        }

        return {
          type: 'postgres',
          url: dbUrl,
          autoLoadEntities: true,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false, // Obligatorio para Supabase
          },
          // Añadimos parámetros de reintento para ser más resilientes en Render
          retryAttempts: 3,
          retryDelay: 3000,
        };
      },
    }),
    
    // Módulos de la aplicación
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
