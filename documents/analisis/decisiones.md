# Registro de Decisiones - Módulo de Análisis

## [23:19] Estructura de Carpetas de Análisis

**Contexto:** Se requiere iniciar el análisis siguiendo la metodología RUP basándose en los requisitos existentes.

**Decisión:** Crear una carpeta por cada caso de uso identificado en la fase de requisitado dentro de `analisis/casosDeUsos/`.

**Justificación:** Facilitar la trazabilidad entre los requisitos detallados y los artefactos de análisis (diagramas de robustez, diagramas de secuencia de análisis, etc.) que se generarán para cada caso de uso.

**Consecuencias:** Estructura organizada que permite escalar el análisis de forma modular.

## [23:50] Coherencia con Diagramas de Contexto

**Contexto:** Los diagramas de colaboración de análisis deben reflejar las transiciones de estado definidas en el requisitado.

**Decisión:** Utilizar los estados de los diagramas de contexto (`SESION_CERRADA`, `PANEL_PRINCIPAL_ABIERTO`, etc.) como puntos de entrada y salida en los diagramas de colaboración.

**Justificación:** Asegurar que el análisis sea una refinación directa de los requisitos, manteniendo la trazabilidad y consistencia del flujo del sistema.

## [00:08] Patrón de Orquestación (Dashboard)

**Contexto:** Los paneles principales actúan como puntos de acceso a múltiples funcionalidades.

**Decisión:** Utilizar un patrón de orquestación donde el controlador carga dinámicamente las opciones permitidas consultando el `PermisosRepository` con el usuario de la `Sesion`.

**Justificación:** Permite un diseño flexible que se adapta al rol del usuario (Coordinador vs Investigador) sin duplicar la lógica de la vista principal.

## [00:12] Especialización de Repositorios

**Contexto:** Los datos de perfil y carga de trabajo pertenecen a entidades que pueden estar separadas (Usuario vs Investigador).

**Decisión:** Utilizar el `UsuarioRepository` para la gestión de perfil general y el `InvestigadorRepository` para la carga de trabajo específica.

**Justificación:** Sigue el principio de responsabilidad única (SRP) y refleja fielmente el modelo de dominio, donde un Usuario puede ser un Investigador pero la lógica de carga de trabajo es exclusiva de este último.

## [00:29] Eliminación en Cascada de Entregables

**Contexto:** La eliminación de un proyecto debe gestionar sus dependencias funcionales.

**Decisión:** En el diagrama de análisis de `eliminarProyecto`, el `ProyectoController` coordina con el `EntregableRepository` para asegurar la limpieza de entregables antes de eliminar el proyecto.

**Justificación:** Mantiene la integridad referencial y funcional del sistema, alineándose con las advertencias especificadas en los requisitos detallados del caso de uso.
