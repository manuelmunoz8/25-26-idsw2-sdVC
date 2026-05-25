# Decisiones Globales del Proyecto

## [20:10] (25/05/2026) Unificación de Control de Versiones (.gitignore)

### Decisión
Centralizar todas las reglas de exclusión de Git en un único archivo `.gitignore` en la raíz del proyecto, eliminando los archivos locales de `/backend` y `/frontend`.

### Motivo
Simplificar la gestión del repositorio y evitar la redundancia de archivos de configuración, manteniendo una estructura más limpia y fácil de mantener para el usuario.

---

## [20:00] (25/05/2026) Scaffolding Arquitectónico Modular

### Decisión
Estructurar ambos módulos (Frontend y Backend) de forma modular y desacoplada, utilizando servicios para la lógica de comunicación.

### Motivo
Garantizar que el crecimiento del sistema (nuevos casos de uso P1 y P2) no degrade la calidad del código y mantener la independencia entre la UI y la API.

---

## [19:15] (25/05/2026) Estrategia de despliegue híbrido y CI/CD

### Decisión
Implementar un despliegue híbrido:
- **Frontend:** GitHub Pages (estático) con despliegue automático vía GitHub Actions desde la rama `develop`.
- **Backend:** Render (Web Service) conectado al repositorio.
- **Base de Datos:** Supabase (PostgreSQL).

### Motivo
Simular un entorno profesional de producción con herramientas gratuitas y robustas, permitiendo la disponibilidad pública del proyecto sin intervención manual en cada actualización.

### Detalle Técnico Render
- **Branch:** develop
- **Root Directory:** backend
- **Build:** npm install && npm run build
- **Start:** npm run start:prod
- **Variables:** DATABASE_URL, NODE_ENV, PORT.

---

## [18:45] (25/05/2026) Sistema de navegación por enlaces anclados

### Decisión
Utilizar enlaces relativos de Markdown con anclas (`#`) para la navegación entre logs y documentos técnicos.

### Motivo
Mejorar la usabilidad y la velocidad de acceso a la información, permitiendo saltar directamente a secciones específicas de eventos en lugar de abrir el archivo en la parte superior.

---

## [16:00] (25/05/2026) División frontend/backend

### Decisión
Separar responsabilidades entre frontend y backend.

### Motivo
Mejorar modularidad y simulación de entorno profesional.

---
