"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_js_1 = require("./app.module.js");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_js_1.AppModule);
    // Habilitar CORS para permitir peticiones desde dominios de Cloudflare Pages
    app.enableCors({
        origin: (origin, callback) => {
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
    app.useGlobalPipes(new common_1.ValidationPipe({
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
//# sourceMappingURL=main.js.map