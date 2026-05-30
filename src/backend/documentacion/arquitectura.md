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