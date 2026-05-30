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

## [00:32] Automatización de Autoría en Publicaciones

**Contexto:** Al crear o responder una publicación, el autor debe ser el usuario autenticado.

**Decisión:** El `PublicacionController` debe obtener el usuario de la `Sesion` antes de crear la entidad `Publicacion`.

**Justificación:** Evita errores de entrada manual, asegura que la autoría sea verídica y simplifica la interfaz de usuario al no requerir que el usuario se identifique de nuevo.

## [00:33] Desacoplamiento de Fuentes Externas (Importación)

**Contexto:** La importación de convocatorias requiere procesar diversos formatos externos.

**Decisión:** Utilizar un componente `ExternalSourceAdapter` en el análisis de `importarConvocatoria`.

**Justificación:** Aísla la lógica de negocio de la complejidad técnica de parsear archivos o enlaces externos, permitiendo que el controlador trabaje con datos ya estructurados.

## [00:52] Proceso de Dos Pasos para Eliminación de Perfil

**Contexto:** La eliminación de perfil no es inmediata y requiere supervisión administrativa.

**Decisión:** El análisis divide el proceso en `solicitarEliminacionPerfil` (creación de solicitud) y `resolverSolicitud` (dentro de `abrirSolicitudEliminacionPerfil`).

**Justificación:** Cumple con el requisito de seguridad y trazabilidad del sistema, permitiendo que un Coordinador valide las peticiones antes de ejecutar la eliminación física de los datos del usuario.

## [23:54] Separación de Modelos UML y Documentación Descriptiva

**Contexto:** Los archivos PlantUML (.puml) se encontraban mezclados con la documentación textual en la carpeta de análisis, dificultando la navegación y lectura de los documentos descriptivos.

**Decisión:** Mover todos los archivos de modelado (.puml) a la raíz `modelosUML/` y reemplazarlos en `documents/analisis/` con archivos Markdown (.md) explicativos que actúen como puente.

**Justificación:** Sigue el principio de separación de preocupaciones (SoC), separando los artefactos técnicos de modelado de la documentación orientada al usuario o desarrollador que busca entender el análisis sin leer código PlantUML directamente.

**Consecuencias:** Mejora la organización del proyecto, permite una visualización más limpia en entornos de documentación y mantiene la trazabilidad mediante enlaces relativos entre la documentación y los modelos.

## [00:00] Visualización de Diagramas mediante Renderizado Dinámico

**Contexto:** Los usuarios prefieren visualizar los diagramas directamente en la documentación sin tener que navegar a los archivos fuente o descargar imágenes.

**Decisión:** Utilizar URLs dinámicas del servidor de PlantUML codificando el contenido de los archivos `.puml` dentro del archivo Markdown.

**Justificación:** Proporciona una experiencia de usuario superior (WYSIWYG) en visores de Markdown (GitHub, VSCode, Obsidian) sin el sobrecoste de gestionar archivos binarios en el control de versiones.

**Consecuencias:** La documentación siempre está sincronizada visualmente con el código fuente (siempre que se ejecute el script de actualización al cambiar un `.puml`), y no se ensucia el repositorio con archivos `.png` o `.svg` generados.

## [00:05] Almacenamiento Estático de Diagramas (Activos Locales)

**Contexto:** Se requiere que los diagramas sean visualizables localmente sin dependencia de servicios externos y con una organización de carpetas coherente con los casos de uso.

**Decisión:** Generar archivos `.png` para cada diagrama y almacenarlos en una estructura de carpetas espejo dentro de `documents/analisis/imagenes/`.

**Justificación:** Garantiza la persistencia y disponibilidad de los diagramas independientemente de la conexión a internet y centraliza todos los activos visuales en una estructura organizada.

**Consecuencias:** Requiere un paso de regeneración de imágenes si se modifica el código `.puml`, pero mejora la autonomía y profesionalismo de la documentación final.

## [14:51] Eliminación de formatos de imagen redundantes (PNG)

**Contexto:** El directorio de imágenes contenía versiones duplicadas de los diagramas en formatos PNG y SVG. Se ha decidido priorizar el formato vectorial.

**Decisión:** Eliminar todos los archivos PNG y mantener exclusivamente los SVG.

**Justificación:** Los archivos SVG son vectoriales, ocupan menos espacio y permiten escalabilidad sin pérdida de calidad. Mantener ambos formatos generaba redundancia innecesaria en el repositorio.

**Consecuencias:** Reducción del tamaño del repositorio y unificación del estándar de visualización de diagramas en la documentación. Esta decisión actualiza el enfoque previo de almacenamiento estático en PNG.

## [15:00] Nueva ubicación del módulo de análisis

**Contexto:** El usuario solicita organizar la documentación siguiendo una estructura de carpetas RUP más explícita en la raíz del proyecto.

**Decisión:** Mover `documents/analisis` a `../RUP/01-analisis/`.

**Justificación:** Centralizar las fases de RUP en un directorio dedicado (`RUP/`) para mejorar la navegación y organización del proyecto a medida que crece.

**Consecuencias:** Se debe actualizar la referencia en `documents/GEMINI.md` y en los logs de gestión.
