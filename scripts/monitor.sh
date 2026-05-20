#!/usr/bin/env bash
set -euo pipefail

REPO="mmasias/25-26-idsw2-sdVC"
DASHBOARD="DASHBOARD.md"

log() { echo ":: $*" >&2; }

check_file_has_content() {
    local user="$1"
    local filepath="$2"
    local marker="$3"
    local content
    content=$(gh api "repos/$user/25-26-idsw2-sdVC/contents/$filepath" --jq '.content' 2>/dev/null | base64 -d 2>/dev/null) || return 1
    if echo "$content" | grep -qF "$marker"; then
        echo "vacio"
    else
        echo "relleno"
    fi
}

check_dir_has_files() {
    local user="$1"
    local dirpath="$2"
    local count
    count=$(gh api "repos/$user/25-26-idsw2-sdVC/contents/$dirpath" --jq 'length' 2>/dev/null) || echo "0"
    if [ "$count" -le 1 ]; then
        echo "vacio"
    else
        echo "$count archivos"
    fi
}

check_readme_rewritten() {
    local user="$1"
    local content
    content=$(gh api "repos/$user/25-26-idsw2-sdVC/contents/README.md" --jq '.content' 2>/dev/null | base64 -d 2>/dev/null) || return 1
    if echo "$content" | grep -qF "Sesiones de VibeCoding"; then
        echo "original"
    else
        echo "reescrito"
    fi
}

get_commit_count() {
    local user="$1"
    local count
    count=$(gh api "repos/$user/25-26-idsw2-sdVC/commits?per_page=100" --jq 'length' 2>/dev/null) || echo "0"
    echo "$count"
}

get_last_commit_date() {
    local user="$1"
    gh api "repos/$user/25-26-idsw2-sdVC/commits?per_page=1" --jq '.[0].commit.author.date' 2>/dev/null || echo "N/A"
}

get_last_commit_msg() {
    local user="$1"
    gh api "repos/$user/25-26-idsw2-sdVC/commits?per_page=1" --jq '.[0].commit.message | split("\n")[0]' 2>/dev/null || echo "N/A"
}

get_commits_since_scaffold() {
    local user="$1"
    local total
    total=$(get_commit_count "$user")
    echo $((total - 1))
}

icon() {
    case "$1" in
        relleno|reescrito) echo "X" ;;
        vacio|original) echo "-" ;;
        *) echo "?" ;;
    esac
}

log "Obteniendo lista de forks..."
FORKS=$(gh api "repos/$REPO/forks" --jq '.[].owner.login' 2>/dev/null)

if [ -z "$FORKS" ]; then
    log "No se encontraron forks."
    exit 1
fi

TOTAL=$(echo "$FORKS" | wc -l)
log "Encontrados $TOTAL forks."

{
    echo "# Dashboard de seguimiento - 25-26-idsw2-sdVC"
    echo ""
    echo "> Generado: $(date '+%Y-%m-%d %H:%M:%S %Z')"
    echo ">"
    echo "> Leyenda: X = presente/relleno | - = vacio/original | ? = error"
    echo ""
    echo "| # | Alumno | Commits | Ultima actividad | QUE_HACE | ConvLog | README | Src | UML | Ultimo commit |"
    echo "|---|---|---|---|---|---|---|---|---|---|"

    IDX=0
    for user in $FORKS; do
        IDX=$((IDX + 1))
        log "[$IDX/$TOTAL] Procesando $user..."

        COMMITS=$(get_commits_since_scaffold "$user")
        LAST_DATE=$(get_last_commit_date "$user")
        LAST_MSG=$(get_last_commit_msg "$user")

        QUE_HACE=$(check_file_has_content "$user" "QUE_HACE.md" "En una frase" 2>/dev/null || echo "?")
        CONVLOG=$(check_file_has_content "$user" "conversation-log.md" "lo que le dijo al AI para arrancar" 2>/dev/null || echo "?")
        README=$(check_readme_rewritten "$user" 2>/dev/null || echo "?")
        SRC=$(check_dir_has_files "$user" "src" 2>/dev/null || echo "?")
        UML=$(check_dir_has_files "$user" "modelosUML" 2>/dev/null || echo "?")

        IQ=$(icon "$QUE_HACE")
        IC=$(icon "$CONVLOG")
        IR=$(icon "$README")
        IS=$(icon "$SRC")
        IU=$(icon "$UML")

        SHORT_DATE=$(echo "$LAST_DATE" | cut -dT -f1)

        echo "| $IDX | $user | $COMMITS | $SHORT_DATE | $IQ | $IC | $IR | $IS | $IU | $LAST_MSG |"
    done

    echo ""
    echo "## Resumen rapido"
    echo ""

    ACTIVOS=0
    for user in $FORKS; do
        COMMITS=$(get_commits_since_scaffold "$user")
        if [ "$COMMITS" -gt 0 ]; then
            ACTIVOS=$((ACTIVOS + 1))
        fi
    done

    echo "- Forks totales: $TOTAL"
    echo "- Alumnos con actividad (>1 commit): $ACTIVOS"
    echo "- Alumnos sin actividad: $((TOTAL - ACTIVOS))"
    echo ""
    echo "## Detalle por alumno"
    echo ""

    for user in $FORKS; do
        COMMITS=$(get_commits_since_scaffold "$user")
        if [ "$COMMITS" -gt 0 ]; then
            echo "### $user ($COMMITS commits propios)"
            echo ""
            echo "| Fecha | Mensaje |"
            echo "|---|---|"
            gh api "repos/$user/25-26-idsw2-sdVC/commits?per_page=20" --jq '.[] | select(.commit.message | test("vibecoding idsw2") | not) | "| \(.commit.author.date | split("T")[0]) | \(.commit.message | split("\n")[0]) |"' 2>/dev/null || true
            echo ""
        fi
    done

} > "$DASHBOARD"

log "Dashboard generado: $DASHBOARD"
