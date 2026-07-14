<h1 align="center">FUNIBER — Plataforma Interna de Investigación</h1>

<div align="center">

[![](https://img.shields.io/badge/-Inicio-0A3B64?style=for-the-badge&logo=github&logoColor=white)](/README.md)
[![](https://img.shields.io/badge/-Modelo_del_Dominio-0A3B64?style=for-the-badge&logo=drawio&logoColor=white)](/documents/requisitado/modeloDelDominio/modeloDominio.md)
[![](https://img.shields.io/badge/-Actores_y_casos_de_uso-0A3B64?style=for-the-badge&logo=group&logoColor=white)](/documents/requisitado/casosDeUso/casosDeUso.md)
[![](https://img.shields.io/badge/-Glosario-0A3B64?style=for-the-badge&logo=notepad&logoColor=white)](/documents/requisitado/modeloDelDominio/documentos/vocabulario.md)

[![](https://img.shields.io/badge/-Detallado_y_Prototipos-0A3B64?style=for-the-badge&logo=notepad&logoColor=white)](/documents/requisitado/casosDeUso/detalle/detalladoYPrototipos.md)
[![](https://img.shields.io/badge/-Diagrama_de_Contexto-0A3B64?style=for-the-badge&logo=flowchart&logoColor=white)](/documents/requisitado/casosDeUso/diagramas/diagramasContexto.md)
[![](https://img.shields.io/badge/-Reuniones-0A3B64?style=for-the-badge&logo=google-meet&logoColor=white)](/documentos/reuniones/reuniones.md)
[![](https://img.shields.io/badge/-Priorización-0A3B64?style=for-the-badge&logo=priority&logoColor=white)](/documents/requisitado/casosDeUso/priorizacionCasosDeUso.md)
[![](https://img.shields.io/badge/-Rúbrica-0A3B64?style=for-the-badge&logo=checklist&logoColor=white)](https://github.com/mmasias/25-26-IdSw1-SdR/blob/main/documents/l'Rubrica.md)

</div>

# Detalle y Prototipo de Casos de Uso
Esta carpeta contiene la **especificación detallada** y el **prototipado** (PlantUML + SALT) de cada caso de uso identificado en la **Plataforma Interna de Investigación de FUNIBER (GIPF)**.

Los casos de uso están organizados por **actor** y por **módulo funcional**, siguiendo los diagramas de contexto y los diagramas de casos de uso del proyecto.

---

## Casos de uso especificados

> Nota rápida:  
> - El **Investigador** opera sobre información **propia** (proyectos propios, publicaciones propias, entregables de sus proyectos).  
> - El **Coordinador** tiene visibilidad y acciones sobre el conjunto del sistema (incluyendo control centralizado).

---

## Coordinador

### Gestión de sesión
- [iniciarSesion](/documents/requisitado/casosDeUso/detalle/coordinador/iniciarSesion/README.md) — Acceso autenticado al sistema
- [cerrarSesion](/documents/requisitado/casosDeUso/detalle/coordinador/cerrarSesion/README.md) — Cierre de sesión

### Navegación general
- [abrirPanelPrincipal](/documents/requisitado/casosDeUso/detalle/coordinador/abrirPanelPrincipal/README.md) — Acceso al panel principal

### Perfil
- [abrirOpcionesPerfil](/documents/requisitado/casosDeUso/detalle/coordinador/abrirOpcionesPerfil/README.md) — Apertura de opciones del perfil
- [editarPerfil](/documents/requisitado/casosDeUso/detalle/coordinador/editarPerfil/README.md) — Edición de datos de perfil
- [solicitarEliminacionPerfil](/documents/requisitado/casosDeUso/detalle/coordinador/solicitarEliminacionPerfil/README.md) — Solicitud de eliminación del perfil
- [abrirSolicitudesEliminacionPerfil](/documents/requisitado/casosDeUso/detalle/coordinador/abrirSolicitudesEliminacionPerfil/README.md) — Listado de solicitudes de eliminación
- [abrirSolicitudEliminacionPerfil](/documents/requisitado/casosDeUso/detalle/coordinador/abrirSolicitudEliminacionPerfil/README.md) — Consulta de una solicitud concreta

### Carga de trabajo
- [abrirOpcionesCargaTrabajo](/documents/requisitado/casosDeUso/detalle/coordinador/abrirOpcionesCargaTrabajo/README.md) — Consulta de carga de trabajo
- [editarCargaTrabajo](/documents/requisitado/casosDeUso/detalle/coordinador/editarCargaTrabajo/README.md) — Edición de carga de trabajo

### Publicaciones
- [abrirPublicaciones](/documents/requisitado/casosDeUso/detalle/coordinador/abrirPublicaciones/README.md) — Listado general de publicaciones
- [abrirPublicacion](/documents/requisitado/casosDeUso/detalle/coordinador/abrirPublicacion/README.md) — Apertura de una publicación
- [responderPublicacion](/documents/requisitado/casosDeUso/detalle/coordinador/responderPublicacion/README.md) — Respuesta a una publicación
- [editarPublicacion](/documents/requisitado/casosDeUso/detalle/coordinador/editarPublicacion/README.md) — Edición de publicación
- [eliminarPublicacion](/documents/requisitado/casosDeUso/detalle/coordinador/eliminarPublicacion/README.md) — Eliminación de publicación

### Mis publicaciones
- [abrirMisPublicaciones](/documents/requisitado/casosDeUso/detalle/coordinador/abrirMisPublicaciones/README.md) — Listado de publicaciones propias
- [abrirMiPublicacion](/documents/requisitado/casosDeUso/detalle/coordinador/abrirMiPublicacion/README.md) — Apertura de una publicación propia
- [crearPublicacion](/documents/requisitado/casosDeUso/detalle/coordinador/crearPublicacion/README.md) — Creación de publicación propia
- [editarPublicacion](/documents/requisitado/casosDeUso/detalle/coordinador/editarMiPublicacion/README.md) — Edición de publicación propia
- [eliminarPublicacion](/documents/requisitado/casosDeUso/detalle/coordinador/eliminarMiPublicacion/README.md) — Eliminación de publicación propia

### Convocatorias
- [abrirConvocatorias](/documents/requisitado/casosDeUso/detalle/coordinador/abrirConvocatorias/README.md) — Listado de convocatorias
- [abrirConvocatoria](/documents/requisitado/casosDeUso/detalle/coordinador/abrirConvocatoria/README.md) — Consulta de una convocatoria
- [importarConvocatoria](/documents/requisitado/casosDeUso/detalle/coordinador/importarConvocatoria/README.md) — Importación de convocatoria

### Recompensas
- [abrirRecompensas](/documents/requisitado/casosDeUso/detalle/coordinador/abrirRecompensas/README.md) — Listado de recompensas
- [abrirRecompensa](/documents/requisitado/casosDeUso/detalle/coordinador/abrirRecompensa/README.md) — Consulta de recompensa
- [crearRecompensa](/documents/requisitado/casosDeUso/detalle/coordinador/crearRecompensa/README.md) — Creación de recompensa
- [editarRecompensa](/documents/requisitado/casosDeUso/detalle/coordinador/editarRecompensa/README.md) — Edición de recompensa
- [eliminarRecompensa](/documents/requisitado/casosDeUso/detalle/coordinador/eliminarRecompensa/README.md) — Eliminación de recompensa

### Proyectos
- [abrirProyectos](/documents/requisitado/casosDeUso/detalle/coordinador/abrirProyectos/README.md) — Listado de proyectos
- [abrirProyecto](/documents/requisitado/casosDeUso/detalle/coordinador/abrirProyecto/README.md) — Consulta de un proyecto
- [crearProyecto](/documents/requisitado/casosDeUso/detalle/coordinador/crearProyecto/README.md) — Creación de proyecto
- [editarProyecto](/documents/requisitado/casosDeUso/detalle/coordinador/editarProyecto/README.md) — Edición de proyecto
- [eliminarProyecto](/documents/requisitado/casosDeUso/detalle/coordinador/eliminarProyecto/README.md) — Eliminación de proyecto
- [agregarInvestigador](/documents/requisitado/casosDeUso/detalle/coordinador/agregarInvestigador/README.md) — Asignación de investigador a proyecto
- [eliminarInvestigador](/documents/requisitado/casosDeUso/detalle/coordinador/eliminarInvestigador/README.md) — Retirada de investigador del proyecto
- [abrirEntregables](/documents/requisitado/casosDeUso/detalle/coordinador/abrirEntregables/README.md) — Listado de entregables del proyecto
- [abrirEntregable](/documents/requisitado/casosDeUso/detalle/coordinador/abrirEntregable/README.md) — Consulta de un entregable
- [crearEntregable](/documents/requisitado/casosDeUso/detalle/coordinador/crearEntregable/README.md) — Creación de entregable
- [editarEntregable](/documents/requisitado/casosDeUso/detalle/coordinador/editarEntregable/README.md) — Edición de entregable
- [eliminarEntregable](/documents/requisitado/casosDeUso/detalle/coordinador/eliminarEntregable/README.md) — Eliminación de entregable

### Investigadores
- [abrirInvestigadores](/documents/requisitado/casosDeUso/detalle/coordinador/abrirInvestigadores/README.md) — Listado de investigadores
- [abrirInvestigador](/documents/requisitado/casosDeUso/detalle/coordinador/abrirInvestigador/README.md) — Consulta de un investigador
- [crearInvestigador](/documents/requisitado/casosDeUso/detalle/coordinador/crearInvestigador/README.md) — Registro de investigador

---

## Investigador

### Gestión de sesión
- [iniciarSesion](/documents/requisitado/casosDeUso/detalle/investigador/iniciarSesion/README.md) — Acceso autenticado al sistema
- [cerrarSesion](/documents/requisitado/casosDeUso/detalle/investigador/cerrarSesion/README.md) — Cierre de sesión

### Navegación general
- [abrirPanelPrincipal](/documents/requisitado/casosDeUso/detalle/investigador/abrirPanelPrincipal/README.md) — Acceso al panel principal

### Perfil
- [abrirOpcionesPerfil](/documents/requisitado/casosDeUso/detalle/investigador/abrirOpcionesPerfil/README.md) — Apertura de opciones del perfil
- [editarPerfil](/documents/requisitado/casosDeUso/detalle/investigador/editarPerfil/README.md) — Edición de datos de perfil
- [solicitarEliminacionPerfil](/documents/requisitado/casosDeUso/detalle/investigador/solicitarEliminacionPerfil/README.md) — Solicitud de eliminación del perfil

### Carga de trabajo (individual)
- [abrirOpcionesCargaTrabajo](/documents/requisitado/casosDeUso/detalle/investigador/abrirOpcionesCargaTrabajo/README.md) — Consulta de carga de trabajo propia
- [editarCargaTrabajo](/documents/requisitado/casosDeUso/detalle/investigador/editarCargaTrabajo/README.md) — Edición de carga de trabajo propia (según contexto del actor)

### Publicaciones (común)
- [abrirPublicaciones](/documents/requisitado/casosDeUso/detalle/investigador/abrirPublicaciones/README.md) — Listado general de publicaciones
- [abrirPublicacion](/documents/requisitado/casosDeUso/detalle/investigador/abrirPublicacion/README.md) — Apertura de una publicación
- [responderPublicacion](/documents/requisitado/casosDeUso/detalle/investigador/responderPublicacion/README.md) — Respuesta a una publicación

### Mis publicaciones (propias)
- [abrirMisPublicaciones](/documents/requisitado/casosDeUso/detalle/investigador/abrirMisPublicaciones/README.md) — Listado de publicaciones propias
- [abrirMiPublicacion](/documents/requisitado/casosDeUso/detalle/investigador/abrirMiPublicacion/README.md) — Apertura de una publicación propia
- [crearPublicacion](/documents/requisitado/casosDeUso/detalle/investigador/crearPublicacion/README.md) — Creación de publicación
- [editarPublicacion](/documents/requisitado/casosDeUso/detalle/investigador/editarPublicacion/README.md) — Edición de publicación propia
- [eliminarPublicacion](/documents/requisitado/casosDeUso/detalle/investigador/eliminarPublicacion/README.md) — Eliminación de publicación propia

### Proyectos (propios)
- [abrirProyectos](/documents/requisitado/casosDeUso/detalle/investigador/abrirProyectos/README.md) — Listado de proyectos propios
- [abrirProyecto](/documents/requisitado/casosDeUso/detalle/investigador/abrirProyecto/README.md) — Consulta de proyecto propio
- [abrirEntregables](/documents/requisitado/casosDeUso/detalle/investigador/abrirEntregables/README.md) — Listado de entregables del proyecto
- [abrirEntregable](/documents/requisitado/casosDeUso/detalle/investigador/abrirEntregable/abrirEntregable.md) — Consulta de entregable
- [crearEntregable](/documents/requisitado/casosDeUso/detalle/investigador/crearEntregable/README.md) — Creación de entregable
- [editarEntregable](/documents/requisitado/casosDeUso/detalle/investigador/editarEntregable/README.md) — Edición de entregable
- [eliminarEntregable](/documents/requisitado/casosDeUso/detalle/investigador/eliminarEntregable/README.md) — Eliminación de entregable
- [abrirProyecto](/documents/requisitado/casosDeUso/detalle/investigador/abrirProyecto/README.md) — Volver al proyecto desde entregables

### Recompensas
- [abrirRecompensas](/documents/requisitado/casosDeUso/detalle/investigador/abrirRecompensas/README.md) — Listado de recompensas propias
- [abrirRecompensa](/documents/requisitado/casosDeUso/detalle/investigador/abrirRecompensa/README.md) — Consulta de una recompensa

### Investigadores (consulta)
- [abrirInvestigadores](/documents/requisitado/casosDeUso/detalle/investigador/abrirInvestigadores/README.md) — Listado de investigadores
- [abrirInvestigador](/documents/requisitado/casosDeUso/detalle/investigador/abrirInvestigador/README.md) — Consulta de un investigador

---

## Estructura de cada caso de uso

Cada carpeta de caso de uso contiene:

- **README.md** — Especificación completa del caso de uso
- **especificacion.puml** — Diagrama de especificación (detallado) en PlantUML
- **prototipo.puml** — Wireframes de prototipado en SALT

---

## Metodología aplicada

- **Coherencia con diagramas de contexto:** no se definen transiciones fuera del contexto.
- **Vocabulario controlado:** acciones del actor y del sistema según el estándar del proyecto.
- **Confirmar vs cancelar:**  
  - Confirmar/Guardar → vuelve al objeto abierto  
  - Cancelar → vuelve al listado
- **Trazabilidad:** las salidas indican la transición.
- **Consistencia 1:1:** campos y botones del prototipo coinciden con el detallado.
