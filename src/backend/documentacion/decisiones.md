# Registro de Decisiones - Backend
---

## [15:30] (10/06/2026) Estandarización de Nomenclatura CRUD y Exports

**Decisión:** Estandarizar todos los métodos de servicio bajo la convención CRUD (findAll, findOne, create, update, remove) y crear archivos `index.ts` en cada módulo para exportar DTOs y Entidades.
**Motivo:** Mejorar la consistencia del código, facilitar la mantenibilidad y simplificar la integración con el frontend. Al exportar tipos desde archivos `index.ts` centralizados, el frontend tendrá un punto de entrada claro para importar los tipos necesarios.
**Impacto:** El código es más predecible y el frontend puede importar tipos de forma centralizada sin navegar por múltiples subcarpetas de cada módulo.

---

## [14:30] (10/06/2026) Implementación Integral del Dominio del Coordinador
...

**Decisión:** Expandir el esquema de base de datos y la API para cubrir todos los casos de uso del Coordinador (Entregables, Publicaciones, Recompensas y Gestión de Equipo).
**Motivo:** Completar el prototipo funcional según los requisitos del diagrama de contexto UML. Se incluyeron funcionalidades específicas como el seguimiento de carga de trabajo en horas y el flujo de aprobación para eliminación de perfiles.
**Impacto:** El backend ahora soporta la lógica de negocio completa para la gestión de proyectos de investigación, permitiendo una interacción rica entre coordinadores, investigadores y recursos externos (Grants.gov).

---

## [11:15] (09/06/2026) Actualización de Contraseña de Administrador y Auto-Sincronización

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
**Motivo:** Se identificó un patrón repetitivo en los diagramas de secuencia UML (View, Controller, Repository). El uso de abstracciones reduce el código duplicado, evita ambigüedades y asegura que la implementación sea fiel al diseño arquitectónico.
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
