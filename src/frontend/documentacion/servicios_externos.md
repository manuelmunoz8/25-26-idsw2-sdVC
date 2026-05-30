# Documentación de Servicios Externos (Frontend)

## 1. Integración con Convocatorias (Grants.gov)

El frontend no se comunica directamente con la API de Grants.gov por razones de seguridad y control de CORS. Todas las peticiones se realizan a través de los endpoints de agregación del Backend.

### Flujo de Datos
1. El componente `ImportarConvocatoria` solicita datos externos al backend.
2. El backend (NestJS) actúa como proxy y adaptador de la API de Grants.gov.
3. El frontend recibe una respuesta ya normalizada según el `ExternalConvocatoriaDTO`.

### Implementación Sugerida (Axios)
```typescript
// src/services/convocatorias.service.ts

export const fetchExternalConvocatorias = async (criterio: string) => {
  const response = await axios.get(`${API_URL}/external/convocatorias`, {
    params: { q: criterio }
  });
  return response.data; // Listado normalizado
};
```

---

## 2. Consistencia con el Análisis
Este diseño implementa la transición de navegación definida en el diagrama de colaboración `importarConvocatoria-analisis.puml`, donde la vista interactúa con el sistema para extraer y visualizar datos antes de la confirmación final del usuario.
