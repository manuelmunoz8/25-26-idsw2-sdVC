# AI Log - Backend

## [21:06] (03/06/2026) Migración de VARCHAR a TEXT en Entidades

**Prompt:** "Duda, Supabase me esta diciendo que cambie todos las columnas que tengan tipo de dato varcahr a text, que piensas al respecto?"

**Resultado:** 
- Identificación de todas las columnas `VARCHAR` en las entidades `Project` y `User`.
- Modificación de los decoradores `@Column` para utilizar explícitamente `type: 'text'`.
- Registro de la decisión arquitectónica en `decisiones.md`.

**Decisión:** Se adopta el uso de `TEXT` para mejorar la flexibilidad de la base de datos, delegando la validación de formato/longitud a la capa de aplicación (NestJS).

---

## [20:32] (03/06/2026) Implementación de Hashing y Verificación de Login

**Prompt:** "vamos a implementar la logica de verificacion del inicio de sesion... Te pido que hagas hash de las contraseñas... tambien retorna un codigo de error cuando ya sea el usuario o contraseña sean erroneos... como usuario por defecto usaremos este... admin@funiber.org / funiber-connected/2026"

**Resultado:** 
- Instalación de `bcrypt` y sus tipos.
- Actualización de `UsersService` para incluir hashing en la creación de usuarios.
- Implementación de `onModuleInit` en `UsersService` para sembrar el usuario administrador por defecto con contraseña hasheada.
- Actualización de `AuthService` para verificar contraseñas usando `bcrypt.compare`.
- Implementación de un error de autenticación estandarizado con el código `AUTH_INVALID_CREDENTIALS`.

**Decisión:** Se opta por `bcrypt` por su robustez y facilidad de uso. Se implementa el sembrado automático para garantizar la existencia del usuario administrador en cualquier entorno sin intervención manual adicional.

---

## [19:08] (03/06/2026) Abstracción de Código Basada en UML (View-Controller-Repository)

**Prompt:** "Bien necesito que me documentes ya sea en la carpeta de frontend o backend el "codigo repetido", lo que me refiero es, en la carpeta de diseño en modelosUML veras diagramas de secuencia para cada caso de uso, y vas a ver que la mayoria tiene un view, controler y repositorio que estas mencionadas serian clases, pero la vas a documentar para ya ser clases abstractas o interfaces, asi reutilizamos codigo y evitamos ambiguedades. Plantea en los docs y de ser necesario haz las entidades mencionadas anteriormente."

**Resultado:** 
- Identificación del patrón View-Controller-Repository en los diagramas de secuencia UML.
- Creación de `backend/documentacion/arquitectura_base.md` con la definición de `IBaseController`, `IBaseService` y `BaseService`.
- Registro de la decisión arquitectónica en `backend/documentacion/decisiones.md`.

**Decisión:** Se adoptan abstracciones genéricas para estandarizar el desarrollo de módulos, alineando la implementación con el diseño UML y reduciendo la duplicación de lógica CRUD.

---

## [18:15] (26/05/2026) Resolución de Error IPv6 (ENETUNREACH)

**Prompt:** "Vale esta fue la linea de error que me dio render... postgresql://postgres.ndyjccyzshwpduimgekm:BnxmebESMN%2F09@aws-1-eu-central-1.pooler.supabase.com:6543/postgres"

**Resultado:** 
- Identificación del error `ENETUNREACH` como incompatibilidad entre IPv4 (Render) e IPv6 (Supabase Direct).
- Migración de la conexión al **Connection Pooler** de Supabase (Puerto 6543).
- Adición del parámetro `?pgbouncer=true` en la cadena de conexión.
- Actualización de `backend/.env` con la nueva URI.

**Decisión:** Se opta por el uso del Pooler en lugar de la conexión directa para garantizar compatibilidad con la red de Render sin incurrir en costes adicionales (IPv4 add-on).

---

## [19:55] (26/05/2026) Actualización de Conexión a Supabase

**Prompt:** "Vale, he tenido que re hacer la base de datos, aqui tienes los detalles... Verifica como configurar correctamente el URI y me lo pasas, cuando pongas el mensaje en los logs, no muestres el password"

**Resultado:** 
- Creación de archivo `.env` en `/backend` con la nueva `DATABASE_URL`.
- Codificación de caracteres especiales en la URI de conexión (password encoding).
- Verificación de la configuración de TypeORM en `app.module.ts` (SSL habilitado).

**Decisión:** Se actualizan las credenciales de la base de datos tras el reset de la instancia de Supabase. Se aplica codificación URL a la contraseña para evitar errores de parseo en la cadena de conexión.

---

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

## [12:50] (31/05/2026) Resolución de errores de compilación en Render (Backend)

**Prompt:** "Bien errores en render, te paso los logs..."

**Resultado:** 
- Instalación de la dependencia faltante `axios` en el backend.
- Corrección de errores de inicialización de propiedades en las entidades `Project` y `User` mediante el uso de operadores de aserción de asignación definitiva (`!`).
- Verificación de compilación exitosa mediante `npm run build`.

**Decisión:** Se corrigen los errores técnicos reportados por el compilador de TypeScript en el entorno de Render (Strict Mode activado).

---

## [11:15] (31/05/2026) Implementación de Autenticación e Integración con Grants.gov

**Prompt:** "1. Hacer el login y que pueda dicernir entre Investigador y Coordinador... 2. Render: Crear los endpoins... API que elegimos... 3. Supabase: Que esta maneje los registrados usuarios y proyectos"

**Resultado:** 
- Creación del módulo `Users` y entidad `User` para persistencia en Supabase.
- Implementación de `AuthModule` con JWT para manejo de sesiones y roles.
- Creación de `GrantsModule` con endpoint `/grants/search` para buscar convocatorias externas.
- Registro de nuevos módulos en `AppModule`.

**Decisión:** Se utiliza JWT por ser el estándar para APIs desacopladas. Se implementa un mock para Grants.gov para permitir la búsqueda inmediata sin dependencias externas bloqueantes en el prototipo.

---

## [10:30] (31/05/2026) Implementación del módulo de Proyectos (Vertical Slice)

**Prompt:** "recomendarías que empezáramos a hacer?... recuerda que tu eres el que maneja todo el proyecto, pero por donde empezaras?"

**Resultado:** 
- Creación de la entidad `Project` en `src/backend/src/modules/projects/entities/project.entity.ts`.
- Implementación de `ProjectsService` con operaciones CRUD básicas.
- Implementación de `ProjectsController` para exponer los endpoints de proyectos.
- Creación de `ProjectsModule` y registro en `AppModule`.

**Decisión:** Se inicia con el módulo de Proyectos por ser el núcleo del sistema (P1) y permitir validar la integración completa entre el frontend, backend y Supabase.

---

## [01:25] Reestructuración del proyecto

**Prompt:** Mover la carpeta backend dentro de src.

**Resultado:** Carpeta backend movida a src/backend.

**Decisión:** Se reorganiza la estructura para centralizar el código en src siguiendo la nueva directriz del proyecto.
