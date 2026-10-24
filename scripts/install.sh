#!/usr/bin/env bash
# Instala as skills do afm-ai-toolkit nas pastas de skills de cada ferramenta.
# Uso: scripts/install.sh [--target <alvo>] [--scope project|global] [--project-dir <dir>]
#                         [--skill <nome>]... [--list] [--uninstall]
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_DIR="$REPO_ROOT/skills"

TARGET="agents"
SCOPE="project"
PROJECT_DIR="$(pwd)"
SKILLS=()
LIST=false
UNINSTALL=false

usage() {
  cat <<'EOF'
Uso: install.sh [opções]

  --target <alvo>        agents | claude | cursor | gemini | antigravity | copilot | all  (padrão: agents)
                         agents = .agents/skills (Codex, Cursor, Gemini CLI, Antigravity, Copilot)
  --scope <escopo>       project | global  (padrão: project)
  --project-dir <dir>    raiz do projeto de destino quando --scope project  (padrão: diretório atual)
  --skill <nome>         instala só esta skill e as que ela referencia (pode repetir; padrão: todas)
  --list                 lista as skills disponíveis e sai
  --uninstall            remove as skills em vez de instalar (só as nomeadas, sem dependências)
  -h, --help             mostra esta ajuda
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target) TARGET="$2"; shift 2 ;;
    --scope) SCOPE="$2"; shift 2 ;;
    --project-dir) PROJECT_DIR="$2"; shift 2 ;;
    --skill) SKILLS+=("$2"); shift 2 ;;
    --list) LIST=true; shift ;;
    --uninstall) UNINSTALL=true; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Opção desconhecida: $1" >&2; usage >&2; exit 1 ;;
  esac
done

available_skills() {
  for dir in "$SKILLS_DIR"/*/; do
    [[ -f "$dir/SKILL.md" ]] && basename "$dir"
  done
}

# Skills de grupo declaram as skills que referenciam em metadata.skills: "a b c"
skill_dependencies() {
  sed -n '2,/^---$/s/^  skills: *"\(.*\)"$/\1/p' "$SKILLS_DIR/$1/SKILL.md"
}

if $LIST; then
  available_skills
  exit 0
fi

if [[ "$SCOPE" != "project" && "$SCOPE" != "global" ]]; then
  echo "Escopo inválido: $SCOPE (use project ou global)" >&2
  exit 1
fi

# Destinos por ferramenta: "<project>|<global>" (globais separados por ':')
destinations() {
  case "$1" in
    agents)      echo ".agents/skills|$HOME/.agents/skills" ;;
    claude)      echo ".claude/skills|$HOME/.claude/skills" ;;
    cursor)      echo ".cursor/skills|$HOME/.cursor/skills" ;;
    gemini)      echo ".gemini/skills|$HOME/.gemini/skills" ;;
    antigravity) echo ".agents/skills|$HOME/.gemini/config/skills:$HOME/.gemini/antigravity-cli/skills" ;;
    copilot)     echo ".github/skills|$HOME/.copilot/skills" ;;
    *) echo "Alvo inválido: $1" >&2; exit 1 ;;
  esac
}

if [[ "$TARGET" == "all" ]]; then
  TARGETS=(agents claude cursor gemini antigravity copilot)
else
  TARGETS=("$TARGET")
fi

if [[ ${#SKILLS[@]} -eq 0 ]]; then
  while IFS= read -r name; do SKILLS+=("$name"); done < <(available_skills)
fi

for skill in "${SKILLS[@]}"; do
  if [[ ! -f "$SKILLS_DIR/$skill/SKILL.md" ]]; then
    echo "Skill não encontrada: $skill (use --list)" >&2
    exit 1
  fi
done

# Inclui as dependências das skills de grupo (a desinstalação remove só as nomeadas)
if ! $UNINSTALL; then
  SELECTED="|"
  for skill in "${SKILLS[@]}"; do SELECTED="$SELECTED$skill|"; done
  for skill in "${SKILLS[@]}"; do
    for dep in $(skill_dependencies "$skill"); do
      if [[ ! -f "$SKILLS_DIR/$dep/SKILL.md" ]]; then
        echo "Dependência não encontrada: $dep (declarada em $skill)" >&2
        exit 1
      fi
      [[ "$SELECTED" == *"|$dep|"* ]] && continue
      SELECTED="$SELECTED$dep|"
      SKILLS+=("$dep")
      echo "dependência  $dep  (de $skill)"
    done
  done
fi

# Compatível com o bash 3.2 do macOS (sem arrays associativos)
DONE="|"
for target in "${TARGETS[@]}"; do
  IFS='|' read -r project_path global_paths <<< "$(destinations "$target")"
  if [[ "$SCOPE" == "project" ]]; then
    dests=("$PROJECT_DIR/$project_path")
  else
    IFS=':' read -r -a dests <<< "$global_paths"
  fi

  for dest in "${dests[@]}"; do
    [[ "$DONE" == *"|$dest|"* ]] && continue
    DONE="$DONE$dest|"
    for skill in "${SKILLS[@]}"; do
      if $UNINSTALL; then
        if [[ -d "$dest/$skill" ]]; then
          rm -rf "${dest:?}/$skill"
          echo "removida   $skill  ←  $dest"
        fi
      else
        mkdir -p "$dest"
        rm -rf "${dest:?}/$skill"
        cp -R "$SKILLS_DIR/$skill" "$dest/$skill"
        echo "instalada  $skill  →  $dest"
      fi
    done
  done
done
