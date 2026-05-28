# Registro de Decisiones - Módulo de Arquitectura

## [23:59] Estructura Modular

**Contexto:** Alineación con las directrices del proyecto.

**Decisión:** Mantener registro de decisiones específico del módulo.

## [01:28] Definición de Tecnologías y Patrones de Diseño

**Contexto:** Transición a la fase de Diseño tras completar el Análisis RUP. Es necesario alinear el diseño con las tecnologías ya presentes en el workspace.

**Decisión:** 
1. **Backend:** Se confirma el uso de **NestJS (TypeScript)** con **TypeORM** y **PostgreSQL**. Se adoptará el patrón **Arquitectura Modular/Limpia** propio de NestJS (Controllers, Services, Modules) que mapea perfectamente con el patrón BCE del análisis.
2. **Frontend:** Se confirma el uso de **React (TypeScript)** con **Axios**. Se adoptará un patrón de **Componentes Funcionales** y **Hooks Personalizados** para la lógica de negocio, junto con una capa de **Servicios API**.

**Justificación:** Estas tecnologías y patrones proporcionan la robustez, escalabilidad y tipado fuerte necesarios.

## [01:40] Uso de Proxy-Adapter para APIs Externas

**Contexto:** El sistema requiere importar datos de convocatorias de fuentes externas como Grants.gov.

**Decisión:** Implementar un patrón Proxy-Adapter en el Backend en lugar de realizar llamadas directas desde el Frontend.

**Justificación:** 
1. **Seguridad:** Protege las claves de API (si fueran necesarias) en el servidor.
2. **CORS:** Evita bloqueos de seguridad del navegador.
3. **Normalización:** El frontend siempre recibe el mismo formato de datos (`ExternalConvocatoriaDTO`), independientemente de si la fuente externa cambia o si añadimos más fuentes en el futuro.

## [01:47] Consolidación de Topología de Red e Infraestructura

**Contexto:** La arquitectura del sistema depende de la interacción de tres servicios de nube con restricciones específicas (IPv4/IPv6, CORS, SPA Routing).

**Decisión:** Documentar de forma centralizada el rol de Cloudflare Pages, Render y Supabase en la carpeta de arquitectura global.

**Justificación:** Proporcionar una visión holística de cómo se comunican las capas del sistema y las soluciones aplicadas a retos técnicos de infraestructura (como el uso de PgBouncer para compatibilidad IPv4/IPv6).
