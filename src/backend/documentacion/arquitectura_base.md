# Arquitectura Base - Abstracciones de Código

A partir de los diagramas de secuencia UML, se ha identificado un patrón recurrente basado en la arquitectura de tres capas (View, Controller, Repository). Para evitar redundancia y ambigüedad, se definen las siguientes abstracciones.

## Capa de Control (Controller)

Cada módulo (Proyectos, Publicaciones, Recompensas, etc.) utiliza un controlador para orquestar las peticiones.

### `IBaseController<T>` (Interfaz)
Define las operaciones estándar de un controlador.

```typescript
interface IBaseController<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  remove(id: string): Promise<void>;
}
```

## Capa de Lógica/Servicio (Service/Controller en UML)

Aunque el UML menciona "Controller", en NestJS esto se divide en el Controller (entrada) y el Service (lógica).

### `IBaseService<T>` (Interfaz)
```typescript
interface IBaseService<T> {
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  remove(id: string): Promise<void>;
}
```

### `BaseService<T>` (Clase Abstracta)
Implementa la lógica común de TypeORM para reducir código repetido.

```typescript
abstract class BaseService<T> implements IBaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}
  // Implementaciones genéricas de find, save, etc.
}
```

## Capa de Persistencia (Repository)

### `IBaseRepository<T>`
En la mayoría de los casos, se utiliza el `Repository<T>` de TypeORM, que ya actúa como una abstracción genérica. Para casos de uso complejos, se pueden definir interfaces personalizadas que extiendan esta funcionalidad.

---
*Documentación generada para mantener consistencia con los modelos UML de diseño.*
