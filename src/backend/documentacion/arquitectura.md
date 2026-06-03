# Arquitectura Backend

Este documento define la estructura técnica del backend del sistema.

---

# Estilo arquitectónico

El sistema sigue una arquitectura en capas:

- Controllers (entrada de solicitudes)
- Services (lógica de negocio)
- Repositories (acceso a datos)
- Models (entidades del dominio)
- DTOs (transferencia de datos)

---

# Flujo de ejecución

Cliente
→ Controller
→ Service
→ Repository
→ Base de datos

---

# Responsabilidades por capa

## Controllers
- Recibir requests
- Validar entrada básica
- Delegar a servicios

## Services
- Contienen lógica de negocio
- Aplican reglas del dominio
- Orquestan operaciones

## Repositories
- Acceso a datos
- Consultas a BD
- Persistencia de entidades

## Models
- Representación del dominio
- No contienen lógica compleja

## DTOs
- Comunicación entre capas
- Evitan exposición directa de modelos

---

# Reglas de diseño

- No mezclar lógica de negocio en controllers
- No acceder a base de datos desde services directamente sin repositorio
- Mantener independencia del dominio
- Evitar dependencias circulares

---

# Extensibilidad

El sistema está diseñado para permitir:

- añadir nuevos módulos sin afectar los existentes
- cambiar la persistencia sin modificar lógica de negocio
- escalar servicios de forma independiente

---

# Manejo de Autenticación y JWT

Para implementar la persistencia de sesión en el frontend, se debe seguir el siguiente flujo:

## 1. Almacenamiento
Tras un login exitoso, el backend devuelve un `access_token`. El frontend debe almacenar este token de forma segura:
- **Recomendado**: Guardar en `localStorage`.

## 2. Peticiones Autenticadas
Todas las peticiones a endpoints protegidos deben incluir el token en el header `Authorization`:
```http
Authorization: Bearer <tu_jwt_aqui>
```

## 3. Persistencia de Sesión (Auto-login)
Al cargar la aplicación (ej. en el componente principal):
1. Verificar si existe un token en el almacenamiento.
2. Si existe, realizar una petición GET a `GET /auth/validate` enviando el token en el header `Authorization`.
3. Si el backend devuelve 200 OK, el usuario se considera autenticado y se cargan sus datos.
4. Si el backend devuelve 401 Unauthorized, borrar el token del almacenamiento y redirigir al login.