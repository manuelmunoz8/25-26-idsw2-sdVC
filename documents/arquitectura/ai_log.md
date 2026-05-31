# AI Log - Módulo de Arquitectura

## [10:30] (31/05/2026) Inicio de Implementación Core - Vertical Slice de Proyectos

**Prompt:** "recomendarías que empezáramos a hacer?... recuerda que tu eres el que maneja todo el proyecto, pero por donde empezaras?"

**Resultado:** 
- Definición de la estrategia de implementación por "Vertical Slices".
- Inicio del módulo de Proyectos en Backend y Frontend.
- Validación de la arquitectura de integración Render-Supabase-Pages.

**Decisión:** Priorizar una funcionalidad completa (Proyectos) sobre la implementación horizontal de capas para detectar problemas de integración tempranamente.

---

## [18:29] Actualización de README Principal y Documentación Global

**Prompt:** "Bien en el README.md de esta carpeta vas a ver que lo cambie, puedes escribir algo que suene coherente con lo que dice el titulo del archivo"

**Resultado:** 
- Redacción y actualización del contenido del `README.md` raíz.
- Inclusión de propósito del proyecto, estructura del repositorio y stack tecnológico.

**Decisión:** Se alineó la descripción pública del proyecto con la visión técnica de `QUE_HACE.md` y la estructura modular definida en la arquitectura, mejorando la presentación del repositorio.

## [23:59] Inicialización de log modular

**Prompt:** N/A (Ajuste estructural según GEMINI.md)

**Resultado:** Creación del log modular para el módulo de arquitectura.

**Decisión:** Seguir la normativa de modularidad de logs del proyecto.

## [01:28] Investigación de Stack Tecnológico

**Prompt:** vete a /sdvc/25-26-idsw2-sdVC y ve a las carpeta de frontend y backend para ver las tecnologias escogidas y definamos patrones de diseño con las tecnologias elegidas.

**Resultado:** 
- **Backend:** NestJS, TypeScript, TypeORM, PostgreSQL.
- **Frontend:** React, TypeScript, Axios.
- Se han definido los patrones de diseño técnicos alineados con estas tecnologías en `decisiones.md`.

**Decisión:** Mantener la coherencia entre el patrón BCE de análisis y la arquitectura de servicios/controladores de NestJS para facilitar la implementación.

## [01:40] Documentación de Integración API Grants.gov

**Prompt:** Primero busca una API en https://github.com/public-apis/public-apis que simule o se parezca lo mas cercano a noticias/envio de convocatorias investigativas. Si, documenta en el backend y en el frontend de ser necesario la API.

**Resultado:** 
- Seleccionada la API de **Grants.gov** como referencia.
- Creado `backend/documentacion/integracion_grants_gov.md` con DTOs y arquitectura del adaptador.
- Creado `frontend/documentacion/servicios_externos.md` con la lógica de consumo.

**Decisión:** Se definió un proceso de **Proxy/Adapter** en el backend para normalizar los datos de Grants.gov antes de enviarlos al frontend, asegurando que el frontend trabaje con una interfaz limpia y desacoplada de la API externa.

## [01:47] Documentación General de Infraestructura (Cloudflare, Render, Supabase)

**Prompt:** documentar en documents de forma general los servicios de Cloudfare Pages, Supabase y de Render en /documents, puedes revisar los registros respectivos dentro de la carpeta de frontend y backend.

**Resultado:** Creado `arquitectura/servicios_nube.md` con el detalle técnico de la infraestructura.

**Decisión:** Consolidar la información de despliegue y persistencia en un documento de arquitectura global para facilitar el entendimiento de la topología del sistema sin entrar en detalles de código de cada módulo.
