# AI Log - Backend

## [18:45] (25/05/2026) Implementación de Deep Linking en documentación

**Prompt:** "bien ahora actualiza decisiones_globales.md y conversation-log.md para que se refleje los cambios que te pedi sobre los enlaces hacia los archivos"

**Resultado:** 
- Actualización de `decisiones_globales.md` con el nuevo estándar de navegación.
- Creación del evento **DOC-002** en `conversation-log.md` con enlaces anclados.
- Sincronización de logs locales.

**Decisión:** Se formaliza el uso de anclas para mejorar la experiencia de revisión técnica utilizando la hora real del sistema.

---

## [16:05] (25/05/2026) Análisis inicial y definición técnica

**Prompt:** "Vale prefiero tu recomendacion, dado este caso, empieza los logs desde el principio de esta conversacion segun lo planteado en los .md que leiste previamente"

**Resultado:** 
- Investigación de la documentación raíz (`README.md`, `QUE_HACE.md`, `2Think.md`) y del modelo de dominio.
- Identificación de entidades clave: Proyecto, Investigador, Entregable, Convocatoria.
- Propuesta y aceptación del stack: Node.js (NestJS) + PostgreSQL.
- Creación de la estructura de logs.

**Decisión:** Se inicia el registro cronológico siguiendo el formato obligatorio definido en `backend/GEMINI.md`. Se prioriza la trazabilidad desde el primer contacto con la hora real del sistema.

---
