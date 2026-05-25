# Conversation Log (Global Timeline)

Este documento registra eventos relevantes del proyecto de forma cronológica inversa (lo más reciente arriba).

No contiene todas las interacciones, solo aquellas que implican:
- decisiones de arquitectura
- cambios estructurales
- creación de módulos
- modificaciones relevantes en frontend/backend
- actualización de documentación global

Cada entrada debe incluir referencias a los logs locales cuando aplique.

---

# Timeline

## [20:20] (25/05/2026) BE-001 - Resolución de Conflictos de Módulos (ESM Migration)

### Área
Backend | Infraestructura

### Prompt
"Vale han habido cuatro error en render te los enumero en orden... error TS1287... error TS1295..."

### Resultado
- Migración del Backend a Módulos ECMAScript (ESM) mediante `"type": "module"` en `package.json`.
- Refactorización de `tsconfig.json` para compatibilidad con NestJS y NodeNext.
- Corrección de rutas de importación con extensiones `.js`.

### Decisión
Se abandona CommonJS en favor de ESM para cumplir con las restricciones de compilación de Render y utilizar estándares modernos de TypeScript/Node.js.

### Referencias
- [backend/package.json](./backend/package.json)
- [backend/tsconfig.json](./backend/tsconfig.json)
- [backend/src/main.ts](./backend/src/main.ts#L3)

---

## [20:10] (25/05/2026) INIT-004 - Unificación de Control de Versiones (.gitignore)

### Área
Global | Gestión de Código

### Prompt
"Duda, porque pusiste un gitignore dentro de frontend y backend, no bastaria con uno solamente en la raiz... Haz la opcion B"

### Resultado
- Eliminación de los archivos `.gitignore` locales en `/backend` y `/frontend`.
- Centralización de todas las reglas en el `.gitignore` de la raíz, incluyendo rutas relativas.

### Decisión
Se prioriza la simplicidad y la limpieza del repositorio centralizando la configuración de Git, lo que facilita la visualización global de las exclusiones del proyecto.

### Referencias
- [.gitignore](./.gitignore)
- [documents/arquitectura/decisiones_globales.md](./documents/arquitectura/decisiones_globales.md#2010-25052026-unificación-de-control-de-versiones-gitignore)

---

## [20:00] (25/05/2026) INIT-003 - Implementación de Scaffolding y Estructura Base

### Área
Backend | Frontend | Arquitectura

### Prompt
"Vale empieza con el Scaffolding"

### Resultado
- Creación de la estructura de carpetas profesional en ambos módulos.
- Configuración de NestJS con soporte para Render y Supabase (TypeORM).
- Configuración de React con Axios y centralización de servicios API.
- Preparación de scripts de producción en `package.json`.

### Decisión
Se establece la estructura ósea del proyecto. El backend queda preparado para el despliegue automático en Render y el frontend listo para empezar a consumir datos.

### Referencias
- [backend/src/main.ts](./backend/src/main.ts)
- [backend/src/app.module.ts](./backend/src/app.module.ts)
- [frontend/src/services/api.ts](./frontend/src/services/api.ts)
- [documents/arquitectura/decisiones_globales.md](./documents/arquitectura/decisiones_globales.md#2000-25052026-scaffolding-arquitectónico-modular)

---

## [19:15] (25/05/2026) INIT-002 - Configuración de CI/CD y Estrategia de Despliegue Híbrido

### Área
Global | Arquitectura | CI/CD

### Prompt
"Preferio la real, indicame que configuraciones haras dentro del proyecto y que acciones yo debo tomar en los servicios externos... Si, haz la automatizacion"

### Resultado
- Creación de `.github/workflows/deploy.yml` para automatizar el despliegue del frontend.
- Definición de la infraestructura: GitHub Pages + Render + Supabase.
- Especificación de parámetros técnicos para el Web Service de Render (Root Directory: backend, Branch: develop, variables de entorno).
- Documentación de la estrategia en `decisiones_globales.md`.

### Decisión
Se establece un flujo de CI/CD profesional para garantizar que los cambios en la rama `develop` se reflejen automáticamente en el entorno de producción (GitHub Pages).

### Referencias
- [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)
- [documents/arquitectura/decisiones_globales.md](./documents/arquitectura/decisiones_globales.md#1915-25052026-estrategia-de-despliegue-híbrido-y-cicd)

---

## [18:55] (25/05/2026) INIT-001 - Inicialización Técnica y Gestión de Dependencias

### Área
Backend | Frontend | Global

### Prompt
"Bien estamos listo para la parte tecnica, primero importacion y creacion de dependencias"

### Resultado
- Inicialización de `package.json` y `tsconfig.json` en `/backend` y `/frontend`.
- Instalación de dependencias base para NestJS y React.
- Verificación del entorno de ejecución (Node/NPM).

### Decisión
Se establecen los cimientos técnicos del proyecto siguiendo el stack aprobado. Se prioriza la instalación de dependencias core antes de la implementación de lógica de negocio.

### Referencias
- [backend/documentacion/ai_log.md](./backend/documentacion/ai_log.md#1855-25052026-inicialización-técnica-y-gestión-de-dependencias)
- [frontend/documentacion/ai_log.md](./frontend/documentacion/ai_log.md#1855-25052026-inicialización-técnica-y-gestión-de-dependencias)

---

## [18:45] (25/05/2026) DOC-002 - Implementación de Sistema de Navegación por Enlaces Anclados

### Área
Documentación | Global

### Prompt
"Una duda, puedes hacer que las lineas de referencias en conversation-log te lleve directamente a los .md correspondientes? ... Vale cerca pero te falto añadir la seccion exacta del .md al que vamos ejemplo: [Texto visible para el usuario](./ruta/del/archivo.md#nombre-de-la-sección)"

### Resultado
- Se implementaron enlaces relativos con anclajes (#) en `conversation-log.md`.
- Se documentó la decisión en `documents/arquitectura/decisiones_globales.md`.
- Se actualizaron las referencias de eventos previos para soportar navegación quirúrgica.

### Decisión
Se adopta el estándar de "Deep Linking" en la documentación para maximizar la eficiencia en la revisión de logs y trazabilidad de decisiones utilizando la hora real del sistema (18:45).

### Referencias
- [documents/arquitectura/decisiones_globales.md](./documents/arquitectura/decisiones_globales.md#1845-25052026-sistema-de-navegación-por-enlaces-anclados)
- [backend/documentacion/decisiones.md](./backend/documentacion/decisiones.md#1845-25052026-adopción-de-navegación-por-enlaces-anclados)
- [frontend/documentacion/decisiones.md](./frontend/documentacion/decisiones.md#1845-25052026-adopción-de-navegación-por-enlaces-anclados)
- [backend/documentacion/ai_log.md](./backend/documentacion/ai_log.md#1845-25052026-implementación-de-deep-linking-en-documentación)
- [frontend/documentacion/ai_log.md](./frontend/documentacion/ai_log.md#1845-25052026-implementación-de-deep-linking-en-documentación)

---

## [16:24] (25/05/2026) DOC-001 - Definición del Stack Tecnológico y Sincronización de Logs

### Área
Global | Frontend | Backend | Documentación

### Prompt
"Especifica mas porque elejirias cada tecnologia y dame los detalles de lo que te permitiria... Vale prefiero tu recomendacion, dado este caso, empieza los logs desde el principio de esta conversacion segun lo planteado en los .md que leiste previamente"

### Resultado
- Se propuso y aceptó el stack: **Node.js (NestJS) + React (TypeScript) + PostgreSQL**.
- Se inicializaron los logs locales en ambos módulos (`ai_log.md` y `decisiones.md`).
- Se realizó una investigación exhaustiva de la documentación existente (`README.md`, `QUE_HACE.md`, `2Think.md`, `priorizacionCasosDeUso.md`).

### Decisión
Se adoptó un stack basado en tipado fuerte (TypeScript) y arquitectura modular (NestJS) para garantizar la mantenibilidad y escalabilidad del sistema de gestión de investigación. Se estableció el inicio de la trazabilidad formal con la hora correcta.

### Referencias
- [frontend/documentacion/decisiones.md](./frontend/documentacion/decisiones.md#1600-25052026-elección-del-stack-tecnológico)
- [backend/documentacion/decisiones.md](./backend/documentacion/decisiones.md#1600-25052026-elección-del-stack-tecnológico)
- [frontend/documentacion/ai_log.md](./frontend/documentacion/ai_log.md#1605-25052026-análisis-inicial-y-definición-técnica)
- [backend/documentacion/ai_log.md](./backend/documentacion/ai_log.md#1605-25052026-análisis-inicial-y-definición-técnica)
- [documents/casosDeUso/priorizacionCasosDeUso.md](./documents/casosDeUso/priorizacionCasosDeUso.md)

---

## [HH:MM] DOC-000 - Estructura de documentación global (Histórico)

### Área
Documentación

### Prompt
Organizar documentación del proyecto en requisitos, dominio, arquitectura y gestión.

### Resultado
Se definió estructura de documentación técnica y funcional separada.

### Decisión
Se aprobó separación de documentación por dominios de ingeniería de software.

### Referencias
- [documents/casosDeUso/casosDeUso.md](./documents/casosDeUso/casosDeUso.md)
- [documents/modeloDelDominio/modeloDominio.md](./documents/modeloDelDominio/modeloDominio.md)
- [documents/arquitectura/decisiones_globales.md](./documents/arquitectura/decisiones_globales.md)

---

## [HH:MM] BE-000 - Definición de arquitectura backend (Histórico)

### Área
Backend

### Prompt
Definir estructura del backend con separación por capas.

### Resultado
Se definió arquitectura por capas: controllers, services, repositories, models.

### Decisión
Se adoptó patrón service-layer con separación estricta de responsabilidades.

### Referencias
- [backend/documentacion/arquitectura.md](./backend/documentacion/arquitectura.md)
- [backend/documentacion/ai_log.md](./backend/documentacion/ai_log.md)

---

## [HH:MM] FE-000 - Definición de arquitectura frontend (Histórico)

### Área
Frontend

### Prompt
Definir estructura inicial de componentes y sistema de organización UI.

### Resultado
Se estableció un sistema basado en componentes reutilizables.

### Decisión
Se adoptó arquitectura basada en componentes desacoplados.

### Referencias
- [frontend/documentacion/componentes.md](./frontend/frontend/documentacion/componentes.md)
- [frontend/documentacion/ai_log.md](./frontend/frontend/documentacion/ai_log.md)

---

## [HH:MM] INIT-000 - Inicialización del sistema de proyecto (Histórico)

### Área
Global

### Prompt
Definir estructura base del proyecto con separación frontend, backend y documentación.

### Resultado
Se propuso una arquitectura modular con separación clara por dominios.

### Decisión
Se aceptó la estructura modular con logs independientes por módulo y documentación global.

### Referencias
- [frontend/GEMINI.md](./frontend/GEMINI.md)
- [backend/GEMINI.md](./backend/GEMINI.md)
- [documents/GEMINI.md](./documents/GEMINI.md)

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

- Frontend → [frontend/documentacion/ai_log.md](./frontend/documentacion/ai_log.md)
- Backend → [backend/documentacion/ai_log.md](./backend/documentacion/ai_log.md)
- Arquitectura → [documents/arquitectura/](./documents/arquitectura/)
- Decisiones → [documents/casosDeUso/priorizacionCasosDeUso.md](./documents/casosDeUso/priorizacionCasosDeUso.md)

Este archivo actúa como índice cronológico global del proyecto.
