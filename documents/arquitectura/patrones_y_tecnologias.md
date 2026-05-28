# Arquitectura Técnica y Patrones de Diseño

Este documento define la estructura técnica del sistema, las tecnologías empleadas y los patrones de diseño que guiarán la implementación, asegurando la trazabilidad con el modelo de análisis RUP.

## 1. Stack Tecnológico

### Backend
- **Framework:** NestJS (Node.js)
- **Lenguaje:** TypeScript
- **ORM:** TypeORM
- **Base de Datos:** PostgreSQL
- **Validación:** class-validator & class-transformer

### Frontend
- **Librería:** React
- **Lenguaje:** TypeScript
- **Comunicación API:** Axios
- **Gestión de Estado:** Hooks nativos (useState, useEffect, useContext)

---

## 2. Capas del Sistema (Mapping BCE)

El diseño técnico mapea directamente los estereotipos de análisis (Boundary-Control-Entity) a componentes tecnológicos específicos:

| Estereotipo Análisis | Componente Técnico | Responsabilidad |
| :--- | :--- | :--- |
| **Boundary** | React Components / NestJS Controllers | Interfaz con el usuario y exposición de endpoints. |
| **Control** | NestJS Services / React Hooks | Lógica de negocio, orquestación y reglas de dominio. |
| **Entity** | TypeORM Entities | Representación persistente del modelo de datos. |

---

## 3. Patrones de Diseño Técnicos

### Backend (NestJS)
- **Singleton:** Los servicios y módulos son singletons por defecto, garantizando consistencia.
- **Dependency Injection (DI):** Desacoplamiento de componentes para facilitar pruebas y mantenibilidad.
- **Data Transfer Object (DTO):** Objetos planos para validar y transferir datos entre el controlador y el servicio.
- **Repository Pattern:** Abstracción de la persistencia mediante TypeORM.

### Frontend (React)
- **Container/Presenter Pattern:** Separación entre lógica de carga de datos y visualización (UI).
- **Custom Hooks:** Encapsulación de lógica de negocio reutilizable (ej: `useAuth`, `useProjects`).
- **Service Layer:** Módulos dedicados para llamadas Axios, aislando la infraestructura API de los componentes.

---

## 4. Trazabilidad con el Análisis

Cada **Diagrama de Colaboración de Análisis** se traducirá en:
1. Un **Controller** en NestJS que reciba la petición.
2. Un **Service** que implemente la lógica del "Controller" del análisis.
3. **Entities** de TypeORM que correspondan a las entidades del análisis.
4. **Componentes React** que representen las vistas (Boundaries).
