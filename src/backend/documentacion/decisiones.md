# Registro de Decisiones - Backend
## [16:00] (14/06/2026) Edición de Proyectos y Autorización

**Decisión:** Utilizar el método `PATCH` para la actualización de proyectos y validar la propiedad del proyecto (coordinador) en la capa de servicio.
**Motivo:** `PATCH` es más adecuado para actualizaciones parciales que `PUT`. La validación de permisos en el servicio garantiza que incluso si alguien tiene el rol de 'coordinador', solo pueda editar los proyectos de los que es responsable.
**Impacto:** Permite modificaciones parciales seguras en la información del proyecto, manteniendo la integridad de la propiedad del mismo.

---

## [15:20] (14/06/2026) Implementación de Soft Delete en Proyectos
...

**Decisión:** Implementar borrado lógico mediante el campo `isDeleted` en la entidad `Project` y actualizar el servicio y controlador para reflejar este cambio.
**Motivo:** Garantizar la integridad de los datos, permitir auditorías históricas y facilitar la recuperación de proyectos eliminados por error.
**Impacto:** Los métodos de consulta ahora excluyen por defecto los registros eliminados lógicamente, y el endpoint de borrado ya no destruye los datos físicamente.

---

## [14:45] (14/06/2026) Relación de Coordinador y Seguridad en Consulta de Proyectos
...

**Decisión:** Incluir explícitamente la relación `ManyToOne` con `User` (`coordinator`) en `Project` y restringir el acceso a `GET /projects/:id` al rol 'Coordinador'.
**Motivo:** Se requiere visualizar el responsable del proyecto (coordinador) en la consulta detallada. Además, la información detallada de los proyectos debe estar protegida para acceso exclusivo de coordinadores.
**Impacto:** Mejora la calidad de la información expuesta por la API y garantiza el cumplimiento de los requisitos de seguridad.

---

## [11:55] (14/06/2026) Exclusión de archivos de test del proceso de build

**Decisión:** Excluir explícitamente los archivos de pruebas (`*.spec.ts`, `*.test.ts`) en la configuración del compilador de TypeScript (`tsconfig.json`).
...

**Motivo:** Evitar que el proceso de compilación (`tsc` en `npm run build`) intente procesar archivos de test en el entorno de producción. Estos archivos dependen de librerías de test (`@nestjs/testing`, `jest`) que no forman parte de las dependencias de producción, causando fallos en el despliegue de Render.
**Impacto:** El proceso de build es ahora más limpio y robusto, evitando errores relacionados con dependencias de desarrollo ausentes en producción.

---

## [02:30] (14/06/2026) Creación de Proyectos y Trazabilidad

**Decisión:** Incluir `coordinatorId` obligatorio en la entidad `Project` y automatizar su asignación en el backend a partir de la sesión.
...

**Motivo:** Asegurar la trazabilidad completa desde la creación del proyecto, vinculando cada proyecto a su coordinador responsable. Automatizar esta asignación evita errores de entrada del usuario y garantiza la integridad de los datos.
**Impacto:** Los proyectos ahora quedan correctamente vinculados a su coordinador desde el momento de la creación, cumpliendo con los requisitos de negocio de auditoría.

---

## [01:55] (14/06/2026) Fix Dependency Injection in ProjectsModule

**Decisión:** Importar `AuthModule` dentro de `ProjectsModule` para resolver problemas de inyección de dependencias con `JwtAuthGuard`.
**Motivo:** `ProjectsModule` utilizaba `JwtAuthGuard`, la cual depende de `AuthService`. Al no estar `AuthService` (proporcionado por `AuthModule`) en el alcance de `ProjectsModule`, NestJS fallaba al instanciar el guard.
**Impacto:** Permite la correcta instanciación de los guardias de autenticación en las rutas protegidas del módulo de proyectos.

---

## [16:35] (14/06/2026) Flujo de Borrado Lógico y Aprobaciones

**Decisión:** Implementar borrado lógico mediante `isDeleted` en lugar de eliminación física y establecer un sistema de aprobación por parte del Coordinador.
**Motivo:** Requisito de auditoría y gestión de estado. Los perfiles no deben desaparecer instantáneamente para permitir auditorías y evitar errores de borrado accidental, siendo el Coordinador el encargado de autorizar la baja definitiva.
**Impacto:** Mejora la integridad de los datos y proporciona un control administrativo sobre la baja de investigadores.

---

## [15:05] (13/06/2026) Inclusión de campo 'department' en esquema de Usuario

**Decisión:** Añadir el campo opcional `department` (tipo `string`) en la entidad `User` y actualizar los DTOs correspondientes.
**Motivo:** Requisito funcional solicitado por el frontend para categorizar investigadores por departamento durante el registro.
**Impacto:** Permite capturar esta información extra sin romper la compatibilidad con usuarios existentes (al ser opcional).

---

## [14:45] (12/06/2026) Implementación de Endpoint para Creación de Usuarios

**Decisión:** Exponer el método `POST /users` en el `UsersController`, utilizando `CreateUserDto` para la validación de entrada.
**Motivo:** El sistema requería una vía programática para registrar nuevos investigadores/coordinadores, funcionalidad que no existía anteriormente. Se reutiliza la lógica existente en `UsersService.create`.
**Impacto:** El frontend ahora puede consumir este endpoint para registrar usuarios. Se mantiene la consistencia arquitectónica delegando la validación y persistencia.

---

## [14:00] (12/06/2026) Alineación de DTOs con Modelos UML de Diseño

**Decisión:** Actualizar los DTOs para incluir campos faltantes (`status`, `visibility` en `CreatePublicationDto`) definidos en los modelos UML de diseño.
**Motivo:** Garantizar que la API cumpla estrictamente con la especificación técnica definida en los modelos de análisis/diseño para asegurar la integridad del sistema.
**Impacto:** Los contratos de la API ahora son consistentes con la documentación técnica, mejorando la robustez y trazabilidad del sistema.

---

## [15:30] (10/06/2026) Estandarización de Nomenclatura CRUD y Exports

**Decisión:** Estandarizar todos los métodos de servicio bajo la convención CRUD (findAll, findOne, create, update, remove) y crear archivos `index.ts` en cada módulo para exportar DTOs y Entidades.
**Motivo:** Mejorar la consistencia del código, facilitar la mantenibilidad y simplificar la integración con el frontend. Al exportar tipos desde archivos `index.ts` centralizados, el frontend tendrá un punto de entrada claro para importar los tipos necesarios.
**Impacto:** El código es más predecible y el frontend puede importar tipos de forma centralizada sin navegar por múltiples subcarpetas de cada módulo.

---

## [10:30] (31/05/2026) Implementación de la primera rebanada vertical (Proyectos)


**Decisión:** Actualizar la contraseña del usuario administrador a `funiber%2Dconnected/2026` e implementar una lógica de conciliación automática en `UsersService`.
**Motivo:** El frontend ha cambiado la codificación de caracteres especiales (URL encoding), enviando `%2D` en lugar de `-`. Para mantener la compatibilidad sin requerir intervenciones manuales en la base de datos, el backend ahora verifica y actualiza el hash de la contraseña del administrador durante el inicio de la aplicación si detecta una discrepancia.
**Impacto:** Garantiza que el acceso administrativo sea restaurado inmediatamente tras el próximo despliegue, alineando el backend con el nuevo comportamiento del cliente.

---

**Decisión:** Migrar el almacenamiento del JWT del cuerpo de la respuesta (`access_token`) a una cookie `HttpOnly`.
**Motivo:** Seguridad mejorada. Al evitar que el token sea accesible por JavaScript (document.cookie), se mitigan los riesgos de ataques XSS. Esto se alinea con la recomendación del equipo de frontend para manejar la persistencia de sesión de forma más robusta.
**Impacto:** El frontend ya no debe extraer el token de la respuesta JSON, sino confiar en que el navegador manejará la cookie automáticamente en cada petición. Se requiere configurar `FRONTEND_URL` en las variables de entorno de Render para habilitar CORS correctamente.

---

## [21:06] (03/06/2026) Migración de tipos de columna VARCHAR a TEXT

**Decisión:** Cambiar todos los tipos de datos `VARCHAR` por `TEXT` en las entidades de TypeORM.
**Motivo:** En PostgreSQL, `TEXT` y `VARCHAR` tienen el mismo rendimiento y almacenamiento. `TEXT` es más flexible ante futuros cambios de longitud sin necesidad de migraciones de esquema. Las validaciones de longitud se delegarán a la capa de aplicación (DTOs/Validadores de NestJS).
**Impacto:** Mejora la mantenibilidad de la base de datos a largo plazo. Al tener `synchronize: true` activo, la base de datos se actualizará automáticamente en el próximo despliegue.

---

## [20:32] (03/06/2026) Implementación de Seguridad en Autenticación (Hashing)

**Decisión:** Adoptar `bcrypt` para el hashing de contraseñas y estandarizar códigos de error en el proceso de login.
**Motivo:** Seguridad básica de la información. Almacenar contraseñas en texto plano es inaceptable. Se implementa un código de error genérico (`AUTH_INVALID_CREDENTIALS`) para evitar la enumeración de usuarios y cumplir con los requisitos del usuario.
**Impacto:** Todas las contraseñas nuevas y el usuario por defecto estarán hasheados. El frontend recibirá una estructura de error consistente para manejar fallos de autenticación.

---

## [19:08] (03/06/2026) Abstracción de Código Basada en UML (View-Controller-Repository)

**Decisión:** Definir interfaces y clases abstractas base (`IBaseController`, `IBaseService`, `BaseService`) para los módulos del sistema.
**Motivo:** Se identificó un patrón repetitivo en los diagramas de secuencia UML (View, Controller, Repository). El uso de abstracciones reduce el código duplicado, evita ambiguedades y asegura que la implementación sea fiel al diseño arquitectónico.
**Impacto:** Los futuros módulos deberán extender de estas clases base, simplificando la implementación de operaciones CRUD estándar y mejorando la mantenibilidad.

---

## [10:30] (31/05/2026) Implementación de la primera rebanada vertical (Proyectos)

**Decisión:** Implementar el módulo de Proyectos como la primera funcionalidad completa del sistema.
**Motivo:** Validar el "cableado" completo de la infraestructura (Render + Supabase + Cloudflare Pages) mediante una funcionalidad core que afecte a todas las capas. Proyectos es la entidad central del dominio según el modelo del dominio.
**Impacto:** Establece el patrón a seguir para el resto de módulos (Deliverables, Publications, etc.).

---

## [19:55] (26/05/2026) Cambio de Instancia de Base de Datos (Supabase)

**Decisión:** Actualizar la URI de conexión para apuntar a la nueva instancia de Supabase.
**Motivo:** Recreación de la base de datos por parte del usuario, lo que invalidó las credenciales anteriores.
**Impacto:** Se requiere actualizar la variable `DATABASE_URL` tanto en el entorno local (`.env`) como en el panel de control de Render (Producción).

---

## [20:00] (25/05/2026) Arquitectura Modular y Persistencia con TypeORM

**Decisión:** Adoptar una estructura modular de NestJS y usar TypeORM como ORM principal.
**Motivo:** TypeORM es el estándar de la industria para NestJS y permite manejar las relaciones complejas del dominio de investigación de forma segura. La estructura modular permite aislar la lógica de Usuarios, Proyectos y Entregables.
**Impacto:** Facilita el mantenimiento y permite que Render despliegue el código de forma predecible.

---

## [19:15] (25/05/2026) Infraestructura de Producción (Render & Supabase)

**Decisión:** Utilizar Render para el hospedaje del Web Service y Supabase para la base de datos PostgreSQL.
**Motivo:** Necesidad de un entorno real con persistencia de datos persistente y conectividad externa.
**Impacto:** El backend requiere configuración de CORS para aceptar peticiones desde GitHub Pages.

---

## [18:45] (25/05/2026) Adopción de Navegación por Enlaces Anclados

**Decisión:** Integrar anclas de sección en las referencias cruzadas de la documentación.
**Motivo:** Consistencia con el estándar global del proyecto para facilitar la auditoría técnica.
**Impacto:** Los logs de backend ahora son más accesibles desde el log global.

---

## [16:00] (25/05/2026) Elección del Stack Tecnológico

**Decisión:** Se ha seleccionado Node.js con NestJS y PostgreSQL.
**Motivo:** Necesidad de una arquitectura modular, tipado fuerte con TypeScript y manejo robusto de relaciones complejas entre Proyectos, Investigadores y Entregables.
**Impacto:** Permite escalabilidad y una integración fluida con el frontend mediante el uso compartido de interfaces/tipos.

---
