# AI Log - Frontend

## [20:10] (25/05/2026) Unificación de .gitignore en la Raíz

**Prompt:** "Duda, porque pusiste un gitignore dentro de frontend y backend, no bastaria con uno solamente en la raiz... Haz la opcion B"

**Resultado:** 
- Eliminación de `frontend/.gitignore`.
- Centralización de reglas en el `.gitignore` de la raíz.

**Decisión:** Reducción de la complejidad de archivos de configuración.

---

## [20:00] (25/05/2026) Implementación de Scaffolding y Configuración Base

**Prompt:** "Vale empieza con el Scaffolding"

**Resultado:** 
- Instalación de `axios` para gestión de peticiones HTTP.
- Creación de estructura de carpetas modular (`src/components`, `src/pages`, `src/services`, etc.).
- Implementación de `src/services/api.ts` para centralizar la conexión con el backend de Render.

**Decisión:** Se adopta una estructura basada en carpetas funcionales. Se utiliza `axios` por su facilidad para interceptores y manejo de errores.

---

## [19:15] (25/05/2026) Automatización de Despliegue (GitHub Actions)

**Prompt:** "Preferio la real, indicame que configuraciones haras dentro del proyecto y que acciones yo debo tomar en los servicios externos... Si, haz la automatizacion"

**Resultado:** 
- Creación de `.github/workflows/deploy.yml`.
- Configuración de la estrategia de despliegue automático.

**Decisión:** Se garantiza un ciclo de vida de desarrollo moderno y automatizado.

---

## [18:55] (25/05/2026) Inicialización técnica y gestión de dependencias

**Prompt:** "Bien estamos listo para la parte tecnica, primero importacion y creacion de dependencias"

**Resultado:** 
- Creación de `package.json` en `/frontend`.
- Instalación de dependencias core: `react`, `react-dom`, `react-scripts`.
- Configuración inicial de TypeScript (`tsconfig.json`).

**Decisión:** Se utiliza `react-scripts` para una configuración rápida del entorno de desarrollo, manteniendo la estructura de carpetas definida en la arquitectura.

---

## [18:45] (25/05/2026) Implementación de Deep Linking en documentación

...
