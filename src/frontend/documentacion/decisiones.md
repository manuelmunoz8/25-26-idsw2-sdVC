## [14:00] (14/06/2026) Implementación de funcionalidad de gestión de entregables

**Decisión:** Crear una página de listado de entregables (`DeliverablesPage`) con acciones de gestión rápida de estado y eliminación.
**Motivo:** Proporcionar al Coordinador una herramienta eficiente para monitorizar y avanzar el estado de los hitos del proyecto.
**Impacto:** El sistema ahora permite una gestión completa del estado de los entregables del proyecto, con una vista clara y acciones rápidas.

---

**Decisión:** Utilizar el método HTTP `PATCH` en lugar de `PUT` para las actualizaciones de recursos de proyecto.
**Motivo:** Cumplir con la especificación del backend para permitir actualizaciones parciales de los atributos del proyecto (`/api/projects/:id`).
**Impacto:** Mejora la eficiencia del tráfico de red y la semántica de la API al enviar únicamente los campos modificados.

---

**Decisión:** Agregar un botón de eliminación directa a cada miembro del equipo en la lista de `ProjectDetailPage`.
**Motivo:** Facilitar la gestión del equipo permitiendo al Coordinador retirar investigadores de forma individual y rápida, manteniendo la consistencia con la acción de agregar.
**Impacto:** El sistema ahora soporta el ciclo de vida completo de la asignación de investigadores a proyectos (asignación y retirada).

---

**Decisión:** Integrar el selector y la lógica de adición de investigadores directamente en la vista de detalle del proyecto (`ProjectDetailPage`).
**Motivo:** Proporcionar un flujo de gestión directo para el Coordinador, reduciendo la fricción al evitar navegaciones innecesarias y permitiendo una visualización inmediata del equipo actualizado.
**Impacto:** El sistema permite ahora una gestión completa y reactiva del equipo de investigación en el contexto de cada proyecto.

---

**Decisión:** Crear una página dedicada `EditProjectPage` que carga el estado inicial a partir de los datos existentes del proyecto.
**Motivo:** Proporcionar una experiencia de usuario consistente al reutilizar la estructura de formularios existente mientras se garantiza que el usuario pueda editar campos específicos de forma atómica.
**Impacto:** El sistema permite ahora una gestión completa del ciclo de vida de los proyectos (Crear, Leer, Editar, Eliminar).

---

**Decisión:** Confirmar la ausencia total de identificadores de base de datos (IDs) en todas las vistas de usuario.
**Motivo:** Asegurar una postura de seguridad proactiva ante la posible exposición de datos internos.
**Impacto:** Se ha verificado que los IDs se utilizan únicamente para lógica de navegación y consultas de API internas, sin ser renderizados en el DOM para el usuario.

---

**Decisión:** Mantener la política de no exponer identificadores de base de datos (IDs) en la interfaz de usuario de listado de proyectos.
**Motivo:** Evitar la exposición innecesaria de datos internos que podrían ser utilizados para ataques o enumeración de registros si un usuario intenta manipular manualmente la URL o realizar acciones no autorizadas.
**Impacto:** Los usuarios interactúan con los proyectos mediante nombres y acciones de navegación, sin conocer el identificador interno del registro, mejorando la seguridad por oscuridad.

---

**Decisión:** Refactorizar el componente `ProjectDetailPage` para mostrar información detallada del proyecto y exponer acciones administrativas directas para el Coordinador.
**Motivo:** Cumplir con los requerimientos definidos en el prototipo `abrirProyecto` para mejorar la gestión de proyectos.
**Impacto:** El Coordinador ahora puede ver todos los detalles relevantes del proyecto y realizar acciones de edición (placeholder) y eliminación directamente desde esta vista.

---

**Decisión:** Crear un nuevo DTO local (`CreateProjectDto.ts`) para el frontend y una nueva página `CreateProjectPage.tsx` dedicada a la creación de proyectos, evitando dependencias externas fuera de la carpeta `frontend`.
**Motivo:** Garantizar la autonomía del módulo frontend y cumplir con los requisitos funcionales sin necesidad de modificar o acceder a carpetas restringidas fuera del workspace permitido.
**Impacto:** Se habilita la funcionalidad solicitada de forma modular, manteniendo la consistencia de tipos y la estructura del proyecto.

---

## [22:11] (10/06/2026) Adopción de DTOs Compartidos como Única Fuente de Verdad

**Decisión:** Migrar todos los métodos de los servicios API para utilizar las clases DTO compartidas con el backend en lugar de interfaces locales o `any`.
**Motivo:** Asegurar una consistencia total en los contratos de datos entre el frontend y el backend, reduciendo bugs por discrepancias en las estructuras de datos.
**Impacto:** El frontend es ahora un consumidor estricto de los DTOs definidos en el backend, mejorando la robustez y facilitando el mantenimiento conjunto.

---

## [22:02] (10/06/2026) Centralización de Tipos mediante Path Mapping

**Decisión:** Configurar TypeScript para utilizar alias de ruta (`@dtos/*`) para importar tipos compartidos desde una carpeta centralizada (`../../dtos/`).
**Motivo:** Garantizar una única fuente de verdad para los tipos (DTOs) usados tanto en frontend como en backend, eliminando el riesgo de discrepancias o duplicación de código.
**Impacto:** El frontend ahora puede importar tipos de forma más limpia y segura (`import { User } from '@dtos/user.dto'`).

---

## [21:17] (10/06/2026) Estandarización y Tipado de la Capa de Servicios

**Decisión:** Eliminar `any` de los servicios, implementar interceptores globales de Axios y estandarizar los métodos de API.
**Motivo:** Mejorar la seguridad de tipos, centralizar la gestión de errores (específicamente 401 y 500) y alinear la nomenclatura con el estándar del backend (`findAll`, `findOne`, etc.).
**Impacto:** El frontend es ahora más robusto ante fallos de red o autenticación, y el código de los componentes es más limpio y tipado. Se requiere que todo nuevo servicio siga este patrón.

---

## [20:48] (10/06/2026) Cobertura Completa de Casos de Uso del Coordinador (Contexto UML)

**Decisión:** Implementar todas las páginas y transiciones de estado definidas en el "Diagrama de Contexto del Coordinador" del proyecto.
**Motivo:** Asegurar que el frontend no sea solo una maqueta parcial, sino que refleje fielmente la capacidad funcional requerida por el rol principal del sistema (Coordinador). Esto incluye la gestión de proyectos, investigadores, carga de trabajo, publicaciones y perfil.
**Impacto:** Se han añadido 9 páginas nuevas y se han ampliado los servicios de API. El sistema ahora soporta navegación profunda (Detalle de Proyecto -> Entregables) y segmentación de datos (Publicaciones Generales vs Mis Publicaciones).

---

## [18:28] (09/06/2026) Migración de Sanitización Destructiva a Codificación Percentual

**Decisión:** Sustituir la eliminación de caracteres especiales en `sanitizeInput` por su codificación en formato percentual (`%XX`).
**Motivo:** La eliminación de caracteres puede alterar datos legítimos. La codificación neutraliza el riesgo de XSS y SQLi sin perder la información original, permitiendo que el backend reciba la cadena completa de forma segura.
**Impacto:** Mejora la integridad de los datos. El backend debe considerar que ciertos caracteres llegarán codificados si no se decodifican en el transporte.

---

## [20:55] (03/06/2026) Adopción de Autenticación con Cookies HttpOnly

**Decisión:** Abandonar el almacenamiento de JWT en `localStorage` y delegar la persistencia de sesión al navegador mediante cookies `HttpOnly` gestionadas por el backend.
**Motivo:** `localStorage` es vulnerable a ataques XSS. Las cookies `HttpOnly` no son accesibles por JavaScript, aumentando drásticamente la seguridad del token de sesión.
**Impacto:** El frontend ahora debe configurar `withCredentials: true` en todas las peticiones para enviar/recibir cookies. El backend debe asegurar configuraciones de CORS correctas para permitir cookies entre dominios (si aplica) y emitir las cookies con las flags `HttpOnly`, `Secure` y `SameSite`.

---

## [19:35] (03/06/2026) Refuerzo de Seguridad y Feedback Visual en Login

**Decisión:** Implementar sanitización de entradas en el cliente y mensajes de error genéricos durante la autenticación.
**Motivo:** Minimizar la superficie de ataque para inyecciones (XSS/SQLi) y prevenir ataques de enumeración de usuarios al no especificar qué campo de las credenciales es incorrecto. Se mejora la UX mediante feedback visual inmediato (bordes rojos) en lugar de alertas intrusivas.
**Impacto:** El login es ahora más seguro y profesional. Se requiere que el backend también realice validaciones y sanitización equivalentes.

---

## [19:22] (03/06/2026) Validación de Consistencia Arquitectónica: Interfaces y UML

**Decisión:** Validar la compatibilidad de los servicios de autenticación con las nuevas abstracciones (`IBaseService`) y mantener la nomenclatura del diagrama de secuencia.
**Motivo:** Garantizar que la reciente introducción de interfaces genéricas no rompa la consistencia con los diagramas de secuencia específicos de cada caso de uso.
**Impacto:** El código mantiene su legibilidad y alineación con el diseño, mientras se prepara para una migración gradual hacia servicios tipados con `IBaseService`.

---

## [19:08] (03/06/2026) Abstracción de Código Basada en UML (View-Controller-Service)

**Decisión:** Definir interfaces y clases abstractas base (`IBaseService`, `BaseApiService`) y Hooks genéricos (`useCrud`) para los módulos del sistema.
**Motivo:** Se identificó un patrón repetitivo en los diagramas de secuencia UML (View, Controller, Repository). En el frontend, esto se traduce en componentes (View) consumiendo servicios (Controller/Repository). El uso de abstracciones reduce el código duplicado en la carga de datos y asegura consistencia con el diseño UML.
**Impacto:** Los nuevos componentes de vista utilizarán hooks y servicios base para interactuar con la API, simplificando la lógica de componentes y mejorando la mantenibilidad.

---

## [19:00] (03/06/2026) Refactorización para Alineación con Diseño UML (Caso de Uso: Iniciar Sesión)

**Decisión:** Renombrar métodos clave y separar la lógica de sesión para reflejar el diagrama de secuencia de diseño.
**Motivo:** Asegurar que la implementación sea un reflejo fiel de la arquitectura diseñada, facilitando la trazabilidad y el entendimiento del flujo por parte de otros desarrolladores o auditores.
**Impacto:** Los métodos `autenticar`, `validarCredenciales` y `crearSesion` ahora mapean directamente a los participantes y mensajes definidos en el UML.

---

## [18:50] (03/06/2026) Estandarización de Autenticación y Gestión de Tokens

**Decisión:** Definir el endpoint `/api/auth/login` y utilizar interceptores de Axios para la gestión de tokens JWT.
**Motivo:** Proporcionar una interfaz clara para el desarrollo del backend y asegurar que todas las peticiones salientes estén correctamente autenticadas sin repetir lógica en cada servicio.
**Impacto:** El backend debe implementar `/api/auth/login` aceptando `email` y `password`, y devolviendo un objeto `{ user: { ... }, token: "..." }`.

---

## [10:30] (31/05/2026) Adopción de Navegación Profesional y Vertical Slice

**Decisión:** Implementar un layout con sidebar lateral y una rebanada vertical para Proyectos.
**Motivo:** Proporcionar una base de navegación escalable y validar la integración con el backend. El uso de un sidebar es el estándar para aplicaciones de gestión (dashboards).
**Impacto:** Define la estructura visual base para todo el proyecto.

---

## [19:39] (26/05/2026) Cambio de Hosting: de GitHub Pages a Cloudflare Pages

**Decisión:** Migrar el despliegue del frontend a Cloudflare Pages.
**Motivo:** Cloudflare Pages ofrece una integración más fluida con Single Page Applications (SPA), permitiendo manejar redirecciones de forma nativa mediante el archivo `_redirects`, lo cual simplifica el enrutamiento comparado con GitHub Pages.
**Impacto:** Se requiere configurar las variables de entorno (`REACT_APP_API_URL`) manualmente en el panel de Cloudflare. El archivo `.github/workflows/deploy.yml` queda obsoleto para el despliegue del frontend pero se mantiene de momento para referencia.

---

## [20:00] (25/05/2026) Arquitectura de Carpetas y Gestión de API con Axios

**Decisión:** Organizar el proyecto en carpetas funcionales (`pages`, `components`, `services`) y usar Axios para la comunicación con el Backend.
**Motivo:** Separar la lógica de negocio (servicios) de la representación (componentes) para mejorar la testabilidad. Axios facilita la inyección de la URL de Render mediante variables de entorno.
**Impacto:** Permite que el frontend sea agnóstico de dónde corre el backend.

---

## [19:15] (25/05/2026) Automatización de Despliegue con GitHub Actions

**Decisión:** Configurar GitHub Actions para compilar y desplegar automáticamente en GitHub Pages cada vez que se realice un push a la rama `develop`.
**Motivo:** Automatización del flujo de entrega y garantía de que el entorno de producción esté siempre actualizado con los últimos cambios de desarrollo.
**Impacto:** Se requiere configuración manual en GitHub Settings para habilitar el despliegue desde Actions.

---

## [18:45] (25/05/2026) Adopción de Navegación por Enlaces Anclados

**Decisión:** Integrar anclas de sección en las referencias cruzadas de la documentación.
**Motivo:** Consistencia con el estándar global del proyecto para facilitar la auditoría técnica.
**Impacto:** Los logs de frontend ahora son más accesibles desde el log global.

---

## [16:00] (25/05/2026) Elección del Stack Tecnológico

**Decisión:** Se ha seleccionado React con TypeScript y Vanilla CSS.
**Motivo:** Flexibilidad para crear una interfaz dinámica y ágil (UX), ecosistema amplio de componentes y coherencia con el tipado del backend. Se evita TailwindCSS por preferencia de diseño original (Vanilla CSS).
**Impacto:** Facilita la creación de componentes reutilizables y una navegación fluida entre el Panel Principal y los detalles de proyectos.

---
