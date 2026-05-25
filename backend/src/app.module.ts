import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // ¡OJO! Solo para desarrollo, sincroniza el esquema automáticamente
        ssl: {
          rejectUnauthorized: false, // Necesario para conexiones SSL con Supabase/Render
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
