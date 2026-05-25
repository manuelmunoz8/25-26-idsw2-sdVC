# AI Log - Backend

## [20:20] (25/05/2026) Depuración de Conexión a DB (Invalid URL)

**Prompt:** "Vale ha pasado 9 veces este error al tratar de hacer el deploy... Retrying (9)... TypeError: Invalid URL"

**Resultado:** 
- Mejora de la validación en `app.module.ts` para capturar la ausencia de `DATABASE_URL`.
- Configuración de `retryAttempts` y `retryDelay` en TypeORM.
- Revisión de la carga de variables de entorno en producción.

**Decisión:** Se añade una validación explícita para evitar que el proceso falle con un error genérico de URL, facilitando el diagnóstico en los logs de Render.

---

## [20:12] (25/05/2026) Corrección de Sintaxis en tsconfig.json

**Prompt:** "Vale mas errores: tsconfig.json(15,5): error TS5025: Unknown compiler option 'forceConsistentCasingInFileNames: true'..."

**Resultado:** 
- Corrección de error tipográfico en `backend/tsconfig.json` (comillas y dos puntos faltantes en `forceConsistentCasingInFileNames`).
- Validación del formato JSON.

**Decisión:** Corrección quirúrgica para resolver el fallo de lectura del compilador de TypeScript en Render.

---

## [20:10] (25/05/2026) Resolución de Errores de Módulos (ESM vs CommonJS)

**Prompt:** "Vale han habido cuatro error en render te los enumero en orden..."

**Resultado:** 
- Configuración de `"type": "module"` en `package.json`.
- Reescritura de `tsconfig.json` para usar `NodeNext` y eliminar `verbatimModuleSyntax`.
- Activación de `experimentalDecorators` y `emitDecoratorMetadata` para NestJS.
- Corrección de imports internos añadiendo extensiones `.js` requeridas por ESM.

**Decisión:** Se migra el backend a ESM puro para alinearse con los estándares modernos de Node.js y resolver los conflictos de compilación en Render.

---

## [20:10] (25/05/2026) Unificación de .gitignore en la Raíz

**Prompt:** "Duda, porque pusiste un gitignore dentro de frontend y backend, no bastaria con uno solamente en la raiz... Haz la opcion B"

**Resultado:** 
- Eliminación de `backend/.gitignore`.
- Centralización de reglas en el `.gitignore` de la raíz.

**Decisión:** Simplificación de la configuración de Git para mejorar la mantenibilidad del repositorio.

---

## [20:00] (25/05/2026) Implementación de Scaffolding y Configuración Base

**Prompt:** "Vale empieza con el Scaffolding"

**Resultado:** 
- Instalación de dependencias de persistencia (`typeorm`, `pg`) y validación.
- Creación de estructura de carpetas modular (`src/modules`, `src/common`, etc.).
- Implementación de `main.ts` con soporte para el puerto dinámico de Render y CORS.
- Configuración de `app.module.ts` con integración asíncrona de TypeORM para Supabase.
- Configuración de scripts en `package.json` para producción.

**Decisión:** Se establece una arquitectura modular que facilita la escalabilidad. Se habilita CORS globalmente para permitir la comunicación con GitHub Pages.

---

## [19:15] (25/05/2026) Configuración de Infraestructura de Producción

**Prompt:** "Preferio la real, indicame que configuraciones haras dentro del proyecto y que acciones yo debo tomar en los servicios externos... Si, haz la automatizacion"

**Resultado:** 
- Definición de Render y Supabase como stack de infraestructura.
- Actualización de decisiones globales y locales.

**Decisión:** Se inicia la preparación del backend para un entorno de nube real.

---

## [18:55] (25/05/2026) Inicialización técnica y gestión de dependencias

**Prompt:** "Bien estamos listo para la parte tecnica, primero importacion y creacion de dependencias"

**Resultado:** 
- Creación de `package.json` en `/backend`.
- Instalación de dependencias core: `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`, `reflect-metadata`, `rxjs`.
- Inicialización de `tsconfig.json`.

**Decisión:** Se opta por una instalación manual de dependencias de NestJS para tener control total sobre la estructura inicial antes de generar el scaffolding completo.

---

## [18:45] (25/05/2026) Implementación de Deep Linking en documentación

...
