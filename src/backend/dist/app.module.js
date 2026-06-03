"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const projects_module_1 = require("./modules/projects/projects.module");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const grants_module_1 = require("./modules/grants/grants.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            // Configuración global de variables de entorno
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            // Configuración de la base de datos (PostgreSQL / Supabase)
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const dbUrl = configService.get('DATABASE_URL');
                    // Validación de seguridad para evitar el error "Invalid URL"
                    if (!dbUrl) {
                        console.error('CRÍTICO: La variable DATABASE_URL no está definida.');
                    }
                    return {
                        type: 'postgres',
                        url: dbUrl,
                        autoLoadEntities: true,
                        synchronize: false,
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
            projects_module_1.ProjectsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            grants_module_1.GrantsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map