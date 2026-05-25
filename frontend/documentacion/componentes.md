# Componentes Frontend

Este documento define la estructura de componentes de la interfaz del sistema.

---

# Estilo de arquitectura UI

El frontend está basado en componentes reutilizables y desacoplados.

---

# Tipos de componentes

## Componentes de página (Pages)
Representan vistas completas.

Ejemplo:
- LoginPage
- DashboardPage
- ExportPage

---

## Componentes de UI
Elementos reutilizables.

Ejemplo:
- Button
- Input
- Modal
- Table

---

## Componentes de lógica
Gestionan estado o interacción.

Ejemplo:
- AuthProvider
- ExportManager
- QuestionStore

---

# Reglas de diseño

- Separar UI de lógica
- Evitar lógica de negocio en componentes visuales
- Reutilizar componentes siempre que sea posible
- Mantener componentes pequeños y cohesivos

---

# Gestión de estado

El estado debe:

- estar centralizado cuando sea global
- estar local cuando sea específico de componente
- evitar duplicación de fuentes de verdad

---

# Comunicación entre componentes

- Props para comunicación descendente
- Eventos para comunicación ascendente
- Stores o contextos para estado global

---

# Convenciones

- Nombres en PascalCase
- Un componente por archivo
- Evitar componentes demasiado grandes (>300 líneas)