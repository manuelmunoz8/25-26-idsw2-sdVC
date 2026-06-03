# Arquitectura Base - Abstracciones de Código (Frontend)

Siguiendo los diagramas de secuencia UML, se definen abstracciones para la capa de "View" y la interacción con los servicios.

## Capa de Vista (View / Boundary)

En React, las vistas son componentes funcionales. Para evitar repetir la lógica de carga de datos, manejo de errores y estados CRUD, se propone el uso de Hooks personalizados que actúan como la lógica del "Controller" en el frontend.

### `useCrud<T>` (Custom Hook)
Abstrae la lógica repetitiva de los componentes de vista.

```typescript
function useCrud<T>(service: IBaseService<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = async () => { /* ... */ };
  const create = async (item: Partial<T>) => { /* ... */ };
  // ... rest of CRUD operations
  
  return { data, loading, error, fetchAll, create, ... };
}
```

## Capa de Servicio (Service / Controller en UML)

### `IBaseService<T>` (Interfaz)
Define la estructura que deben seguir todos los servicios de API para ser compatibles con las abstracciones de vista.

```typescript
interface IBaseService<T> {
  getAll(): Promise<T[]>;
  getOne(id: string): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
```

### `BaseApiService<T>` (Clase Abstracta)
Proporciona una implementación base para las peticiones HTTP (Axios/Fetch).

```typescript
abstract class BaseApiService<T> implements IBaseService<T> {
  constructor(protected readonly endpoint: string) {}
  // Implementaciones genéricas de GET, POST, PUT, DELETE
}
```

---
*Documentación generada para mantener consistencia con los modelos UML de diseño.*
