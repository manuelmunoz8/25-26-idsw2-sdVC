# Integración de API Externa: Grants.gov

Para cumplir con el requisito de **Importar Convocatorias**, el sistema utilizará la API de **Grants.gov** como fuente principal de datos.

## 1. Referencia de la API
- **Endpoint Base Sugerido:** `https://www.grants.gov/grantsws/rest/opportunities`
- **Documentación Oficial:** [Grants.gov S2S API](https://www.grants.gov/web/grants/applicants/applicant-s2s-api.html)

---

## 2. Contrato de Datos (DTO de Importación)

Para estandarizar la entrada de datos desde la API externa hacia nuestro dominio, se utilizará el siguiente esquema de datos en el `ExternalSourceAdapter`:

```typescript
/**
 * DTO para la importación de convocatorias desde Grants.gov
 */
export interface ExternalConvocatoriaDTO {
  externalId: string;      // Opportunity ID de Grants.gov
  titulo: string;          // Opportunity Title
  descripcion: string;     // Description / Synopsis
  agencia: string;         // Agency Name
  fechaCierre: string;     // Close Date (ISO)
  estado: string;          // Status (Post-Date/Awarded)
  enlaceExterno: string;   // URL a la convocatoria original
  requisitos?: string;     // Eligibility / Requirements
}
```

---

## 3. Arquitectura del Adaptador (Backend)

Siguiendo el patrón **Adapter** definido en el análisis, la implementación en NestJS se estructurará así:

- **Folder:** `src/modules/convocatorias/adapters/`
- **Clase:** `GrantsGovAdapter` (Implementa una interfaz `IExternalConvocatoriaSource`).
- **Responsabilidad:** Realizar la petición HTTP (usando `@nestjs/axios`), mapear el JSON de respuesta al `ExternalConvocatoriaDTO` y manejar errores de conexión.

---

## 4. Consumo en Frontend

El frontend consumirá estos datos a través de nuestro propio Backend (Proxy) para evitar problemas de CORS y centralizar la autenticación.

- **Servicio:** `src/services/ConvocatoriasService.ts`
- **Método:** `fetchExternalOpportunities()`
- **Uso:** Alimenta la vista `ImportarConvocatoriaView` con datos sugeridos antes de la persistencia final.
