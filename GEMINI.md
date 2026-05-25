# Contexto Global del Proyecto

Este proyecto simula un entorno profesional de desarrollo de software.

## Objetivos

- Mantener trazabilidad entre requisitos, decisiones y desarrollo.
- Documentar todas las decisiones importantes.
- Mantener separación clara entre frontend, backend y documentación.
- Trabajar siguiendo buenas prácticas de ingeniería de software.

---

# Reglas Generales

- No sobrescribir logs anteriores.
- Toda decisión importante debe quedar documentada.
- Toda modificación relevante debe tener justificación técnica.
- Mantener consistencia entre requisitos y desarrollo.
- Priorizar claridad y mantenibilidad.

---

# Flujo de Trabajo

Antes de realizar cambios:

1. Revisar contexto de la carpeta actual.
2. Revisar documentación relacionada si existe.
3. Analizar impacto técnico.
4. Documentar decisiones importantes.

Después de realizar cambios:

1. Actualizar logs correspondientes.
2. Registrar decisiones relevantes.
3. Mantener trazabilidad con requisitos.

---

# Logs

Cada módulo mantiene su propio:

- ai_log.md
- decisiones.md

Los logs son incrementales y nunca deben reescribirse.

Formato obligatorio:

## [HH:MM] Título breve

**Prompt:** descripción fiel de la solicitud

**Resultado:** resumen técnico de lo generado

**Decisión:** qué se aceptó, rechazó o modificó y por qué

---

# Roles

Frontend:
- UI
- Componentes
- Experiencia de usuario

Backend:
- Lógica de negocio
- Persistencia
- APIs
- Validaciones

Documentación:
- Requisitos
- Arquitectura
- Dominio
- Gestión