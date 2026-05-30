# Contexto de Documentación

Esta carpeta contiene la documentación formal del proyecto siguiendo la metodología RUP adaptada.

---

# Objetivos

- Mantener trazabilidad entre requisitos, análisis y arquitectura.
- Registrar todas las decisiones técnicas y de diseño.
- Mantener requisitos claros y actualizados.
- Reflejar el estado real y evolutivo del proyecto.

---

# Reglas

- No generar documentación ficticia.
- Toda documentación debe representar decisiones reales del equipo.
- Mantener consistencia absoluta entre requisitos, análisis y arquitectura.
- Evitar duplicación innecesaria de información.

---

# Áreas

## requisitado/ (Requisitos)
Contiene la definición de necesidades del sistema.
- Requisitos funcionales y no funcionales.
- Casos de uso detallados.
- Diagramas de contexto.

## ../RUP/01-analisis/ (Análisis)
Contiene la realización de los casos de uso desde una perspectiva interna.
- Diagramas de colaboración de análisis (BCE).
- Clases de análisis.
- ai_log.md y decisiones.md del módulo.

## arquitectura/ (Arquitectura)
Contiene las decisiones estructurales del sistema.
- Decisiones globales y patrones.
- Estructura del sistema.
- ai_log.md y decisiones.md del módulo.

## modeloDelDominio/ (Dominio)
Contiene el modelo conceptual del negocio.
- Entidades y relaciones.
- Glosario de términos.

## gestion/ (Gestión)
Contiene el seguimiento y planificación del proyecto.
- Roadmap y backlog.
- Registro de riesgos.
- ai_log.md y decisiones.md del módulo.

---

# Logs

Siguiendo la normativa global del proyecto:
- Los módulos de **Análisis**, **Arquitectura** y **Gestión** mantienen su propio `ai_log.md` y `decisiones.md`.
- Los logs son estrictamente incrementales.
- Formato obligatorio para marcas temporales: `## [HH:MM] Título`.
- Se debe mantener la trazabilidad total de las interacciones con la IA.
