# Infraestructura y Servicios en la Nube

Este documento describe los servicios de terceros utilizados para el despliegue y persistencia del sistema, detallando su configuración y el rol que desempeñan en la arquitectura.

## 1. Cloudflare Pages (Frontend)

**Rol:** Hosting de la aplicación de cliente (React).

### Configuración y Características
- **Soporte SPA:** Optimizado para Single Page Applications mediante reglas de redirección.
- **Manejo de Redirecciones:** Utiliza el archivo `public/_redirects` con la regla `/* / 200` para asegurar que todas las rutas sean manejadas por el router de React.
- **Wrangler:** Configuración avanzada mediante `wrangler.jsonc` con `html_handling: "none"` para evitar conflictos de normalización de URLs y bucles infinitos.
- **Variables de Entorno:** Gestión manual en el panel de Cloudflare (ej: `REACT_APP_API_URL`).

---

## 2. Render (Backend)

**Rol:** Hosting del servicio web (NestJS API).

### Configuración y Características
- **Entorno de Ejecución:** Node.js configurado para **ESM (ECMAScript Modules)** para cumplir con los estándares modernos y facilitar el despliegue.
- **Gestión de Puertos:** Utiliza la variable de entorno `PORT` proporcionada dinámicamente por Render.
- **Conectividad IPv4:** Al operar sobre una red IPv4, requiere el uso de herramientas de compatibilidad para conectar con servicios exclusivamente IPv6 (ver sección Supabase).
- **CORS:** Configurado en el backend para permitir peticiones exclusivamente desde el dominio de Cloudflare Pages.

---

## 3. Supabase (Base de Datos)

**Rol:** Persistencia de datos relacionales mediante PostgreSQL.

### Configuración y Características
- **Connection Pooler:** Debido a que Render no soporta IPv6 nativamente, se utiliza el **Transaction Pooler de Supabase (Puerto 6543)**.
- **Parámetros de Conexión:** 
  - Uso de `?pgbouncer=true` en la cadena de conexión.
  - Codificación URL de credenciales especiales para evitar errores de parseo.
- **Seguridad:** Conexión cifrada mediante SSL/TLS obligatoria, configurada a nivel de TypeORM en el backend.
- **Instancia:** Base de datos gestionada con soporte para migraciones y escalado automático.
