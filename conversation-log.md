# Conversation Log (Global Timeline)

Este documento registra eventos relevantes del proyecto de forma cronológica.

No contiene todas las interacciones, solo aquellas que implican:
- decisiones de arquitectura
- cambios estructurales
- creación de módulos
- modificaciones relevantes en frontend/backend
- actualización de documentación global

Cada entrada debe incluir referencias a los logs locales cuando aplique.

---

# Formato obligatorio

## [HH:MM] ID - Título del evento

### Área
Global | Frontend | Backend | Documentación

### Prompt
Descripción fiel o resumida de lo solicitado al AI.

### Resultado
Qué se generó, modificó o propuso.

### Decisión
Qué se aceptó, rechazó o ajustó y por qué.

### Referencias
Archivos afectados o relacionados:
- /frontEnd/documentacion/ai_log.md
- /backEnd/documentacion/ai_log.md
- /documentacion/arquitectura/...
- /documentacion/requisitos/...

---

# Timeline

## [HH:MM] INIT-001 - Inicialización del sistema de proyecto

### Área
Global

### Prompt
Definir estructura base del proyecto con separación frontend, backend y documentación.

### Resultado
Se propuso una arquitectura modular con separación clara por dominios.

### Decisión
Se aceptó la estructura modular con logs independientes por módulo y documentación global.

### Referencias
- /frontEnd/GEMINI.md
- /backEnd/GEMINI.md
- /documentacion/GEMINI.md

---

## [HH:MM] FE-001 - Definición de arquitectura frontend

### Área
Frontend

### Prompt
Definir estructura inicial de componentes y sistema de organización UI.

### Resultado
Se estableció un sistema basado en componentes reutilizables.

### Decisión
Se adoptó arquitectura basada en componentes desacoplados.

### Referencias
- /frontEnd/documentacion/componentes.md
- /frontEnd/documentacion/ai_log.md

---

## [HH:MM] BE-001 - Definición de arquitectura backend

### Área
Backend

### Prompt
Definir estructura del backend con separación por capas.

### Resultado
Se definió arquitectura por capas: controllers, services, repositories, models.

### Decisión
Se adoptó patrón service-layer con separación estricta de responsabilidades.

### Referencias
- /backEnd/documentacion/arquitectura.md
- /backEnd/documentacion/ai_log.md

---

## [HH:MM] DOC-001 - Estructura de documentación global

### Área
Documentación

### Prompt
Organizar documentación del proyecto en requisitos, dominio, arquitectura y gestión.

### Resultado
Se definió estructura de documentación técnica y funcional separada.

### Decisión
Se aprobó separación de documentación por dominios de ingeniería de software.

### Referencias
- /documentacion/requisitos/
- /documentacion/dominio/
- /documentacion/arquitectura/
- /documentacion/gestion/

---

# Reglas de mantenimiento del log

- Nunca sobrescribir entradas existentes.
- Añadir nuevas entradas siempre al final.
- Usar identificadores únicos (FE-xxx, BE-xxx, INIT-xxx, DOC-xxx).
- Cada entrada debe referenciar logs locales si aplica.
- Mantener consistencia entre decisiones globales y locales.

---

# Relación con logs locales

Este archivo no reemplaza los logs internos de cada módulo.

- Frontend → /frontEnd/documentacion/ai_log.md
- Backend → /backEnd/documentacion/ai_log.md
- Arquitectura → /documentacion/arquitectura/
- Decisiones → /documentacion/.../decisiones.md

Este archivo actúa como índice cronológico global del proyecto.