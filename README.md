# Rama AUDIT - Seguimiento de forks de alumnos

## Primera vez (en cada maquina)

```bash
git clone https://github.com/mmasias/25-26-idsw2-sdVC.git
cd 25-26-idsw2-sdVC
git checkout AUDIT
bash scripts/setup.sh
git checkout main
```

## Uso diario

```bash
git audit
```

Esto ejecuta `scripts/update-dashboard.sh`, que:
1. Cambia a la rama `AUDIT`
2. Ejecuta `scripts/monitor.sh` (consulta todos los forks via GitHub API)
3. Genera `DASHBOARD.md` con el estado de cada alumno
4. Commitea, pushea y vuelve a `main`

## Ficheros

| Fichero | Funcion |
|---|---|
| `scripts/setup.sh` | Configura el alias `git audit` en `~/.gitconfig` |
| `scripts/update-dashboard.sh` | Wrapper: checkout, ejecutar monitor, commit, push |
| `scripts/monitor.sh` | Logica de consulta a la GitHub API |
| `DASHBOARD.md` | Reporte generado (no editar a mano) |

## Requisitos

- `gh` (GitHub CLI) autenticado
- `jq`
