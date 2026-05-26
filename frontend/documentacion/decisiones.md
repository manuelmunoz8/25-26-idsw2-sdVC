# Registro de Decisiones - Frontend

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
