# Registro de Decisiones de Diseño

| ID | Fecha | Decisión | Justificación | Impacto |
|---|---|---|---|---|
| D-DIS-001 | 2026-05-30 | Inicialización de la fase | Inicio formal del flujo de diseño RUP. | Establece la base para la documentación técnica y arquitectónica. |

## [22:53] Sincronización de estructura de diseño con análisis

**Contexto:** La carpeta de diseño (`RUP/02-diseño/casosDeUsos/`) presentaba un desfase significativo respecto a la de análisis, contando solo con 5 casos de uso frente a los 43 existentes.

**Decisión:** Inicializar la estructura de directorios y archivos Markdown para todos los casos de uso faltantes en `RUP/02-diseño/casosDeUsos/` y asegurar que `modelosUML/diseño/casosDeUsos/` también cuente con los directorios correspondientes.

**Justificación:** Mantener la consistencia y trazabilidad entre las fases de análisis y diseño, permitiendo que el desarrollo de los artefactos de diseño se realice de forma organizada y modular.

**Impacto:** Se han creado 38 nuevos directorios en `RUP/02-diseño/casosDeUsos/` con sus respectivos archivos `.md` de diseño base, y 5 directorios faltantes en `modelosUML/diseño/casosDeUsos/`.
