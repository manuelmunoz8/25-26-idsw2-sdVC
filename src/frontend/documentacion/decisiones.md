# Registro de Decisiones - Frontend

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
