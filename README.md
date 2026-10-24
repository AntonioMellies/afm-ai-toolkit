# afm-ai-toolkit

Biblioteca de **skills para agentes de IA**, independente de ferramenta. Todas as skills seguem o padrão aberto [Agent Skills](https://agentskills.io/specification) (`<skill>/SKILL.md`), então a mesma skill funciona em:

| Ferramenta | Skills | Plugin / Marketplace |
|---|---|---|
| Claude Code | ✅ | ✅ `.claude-plugin/` |
| OpenAI Codex | ✅ | ✅ `plugin.json` + `.agents/plugins/marketplace.json` |
| Cursor | ✅ | — (instale as skills) |
| Gemini CLI | ✅ | — (instale as skills) |
| Google Antigravity | ✅ | ✅ `plugin.json` (CLI) |
| GitHub Copilot | ✅ | — (instale as skills) |

---

## Skills disponíveis

| Skill | Pasta | Quando usar | Referência |
|---|---|---|---|
| Clean Architecture Expert | `skills/clean-architecture-expert/` | Projetar camadas, modelar casos de uso, avaliar a Dependency Rule | *Arquitetura Limpa*, Robert C. Martin |
| Clean Code Expert | `skills/clean-code-expert/` | Revisar código, refatorar nomes e funções, definir padrões de implementação | *Código Limpo*, Robert C. Martin |
| Architecture Hard Parts Expert | `skills/architecture-hard-parts-expert/` | Decidir entre alternativas arquiteturais, documentar ADRs, analisar trade-offs | *Software Architecture: The Hard Parts*, Ford, Richards et al. |
| Production-Ready Microservices Expert | `skills/production-ready-microservices-expert/` | Avaliar prontidão para produção, projetar observabilidade, resiliência e deploy | *Microsserviços Prontos para a Produção*, Susan J. Fowler |
| Domain-Driven Design | `skills/domain-driven-design/` | Descobrir e modelar domínios, Bounded Contexts, Event Storming, Agregados | *Domain-Driven Design*, Eric Evans |
| Material Design System Architect | `skills/designer-system-material-3/` | Projetar, auditar e gerar interfaces M3, tokens, componentes e Design Systems | [Material Design 3](https://m3.material.io), Google |
| Material Enterprise SaaS Architect | `skills/designer-system-material-3-enterprise-ux/` | Projetar SaaS B2B, CRM, ERP e Backoffice com M3, produtividade e alta densidade | [Material Design 3](https://m3.material.io), Google |
| Product Discovery Assistant | `skills/product-discovery-assistant/` | Conduzir discovery do zero ou achar oportunidades e melhorias em um projeto existente | [Product Manager Skills](https://github.com/deanpeters/Product-Manager-Skills), Dean Peters |

---

## Como instalar

São quatro opções, da mais simples para a mais manual. Use **uma** delas.

### Opção 1: CLI universal (`npx skills`)

O [`skills`](https://skills.sh) CLI detecta as ferramentas instaladas e copia as skills para a pasta certa de cada uma. Requer Node.js.

```bash
# Interativo: escolhe skills e ferramentas
npx skills add AntonioMellies/afm-ai-toolkit

# Listar as skills do repositório
npx skills add AntonioMellies/afm-ai-toolkit --list

# Uma skill específica, para ferramentas específicas, no escopo global
npx skills add AntonioMellies/afm-ai-toolkit --skill clean-code-expert \
  -a claude-code -a codex -a cursor -a gemini-cli -a antigravity -g

```

### Opção 2: Plugin / marketplace

Instala o pacote inteiro (todas as skills) e permite receber atualizações pela própria ferramenta.

**Claude Code**

```text
/plugin install afm-ai-toolkit --marketplace AntonioMellies/afm-ai-toolkit
```

Ou em dois passos (funciona também em versões anteriores):

```text
/plugin marketplace add AntonioMellies/afm-ai-toolkit
/plugin install afm-ai-toolkit@afm-ai-toolkit
```

Skills vindas de plugin recebem o prefixo do plugin: `/afm-ai-toolkit:clean-code-expert`.

**OpenAI Codex**

```bash
codex plugin marketplace add AntonioMellies/afm-ai-toolkit
```

Depois, instale o plugin `afm-ai-toolkit` pelo diretório de Plugins do Codex.

**Google Antigravity (CLI)**

```bash
agy plugin install https://github.com/AntonioMellies/afm-ai-toolkit
```

### Opção 3: Scripts do repositório

Clone o repositório e use o instalador. Ele copia a pasta completa de cada skill (`SKILL.md` + `references/`).

```bash
git clone https://github.com/AntonioMellies/afm-ai-toolkit.git
cd afm-ai-toolkit
```

**macOS / Linux**

```bash
# Todas as skills em .agents/skills do projeto atual (Codex, Cursor, Gemini CLI, Antigravity, Copilot)
./scripts/install.sh --project-dir ~/meu-projeto

# Todas as skills no Claude Code, para todos os projetos
./scripts/install.sh --target claude --scope global

# Uma skill em todas as ferramentas
./scripts/install.sh --target all --scope global --skill clean-code-expert


# Listar / remover
./scripts/install.sh --list
./scripts/install.sh --target claude --scope global --uninstall
```

**Windows (PowerShell)**

```powershell
# Todas as skills em .agents/skills do projeto atual
.\scripts\install.ps1 -ProjectDir C:\dev\meu-projeto

# Todas as skills no Claude Code, para todos os projetos
.\scripts\install.ps1 -Target claude -Scope global

# Algumas skills em todas as ferramentas
.\scripts\install.ps1 -Target all -Scope global -Skill clean-code-expert,domain-driven-design


# Listar / remover
.\scripts\install.ps1 -List
.\scripts\install.ps1 -Target claude -Scope global -Uninstall
```

| `--target` / `-Target` | Ferramentas |
|---|---|
| `agents` (padrão) | Codex, Cursor, Gemini CLI, Antigravity e Copilot (pasta compartilhada `.agents/skills`) |
| `claude` | Claude Code |
| `cursor`, `gemini`, `antigravity`, `copilot` | Pasta própria de cada ferramenta |
| `all` | Todos os anteriores |

### Opção 4: Manual

Copie a **pasta inteira** da skill (não só o `SKILL.md`) para o diretório de skills da ferramenta:

| Ferramenta | Projeto | Global (usuário) |
|---|---|---|
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| OpenAI Codex | `.agents/skills/` | `~/.agents/skills/` |
| Cursor | `.agents/skills/` ou `.cursor/skills/` | `~/.agents/skills/` ou `~/.cursor/skills/` |
| Gemini CLI | `.agents/skills/` ou `.gemini/skills/` | `~/.agents/skills/` ou `~/.gemini/skills/` |
| Google Antigravity | `.agents/skills/` | `~/.gemini/config/skills/` (IDE/App) · `~/.gemini/antigravity-cli/skills/` (CLI) |
| GitHub Copilot | `.agents/skills/` ou `.github/skills/` | `~/.copilot/skills/` |

```bash
# macOS / Linux
mkdir -p .agents/skills
cp -R skills/clean-code-expert .agents/skills/
```

```powershell
# Windows
New-Item -ItemType Directory -Force .agents\skills | Out-Null
Copy-Item -Recurse skills\clean-code-expert .agents\skills\
```

O resultado deve ficar assim:

```
meu-projeto/
  .agents/skills/          (ou .claude/skills/ para o Claude Code)
    clean-code-expert/
      SKILL.md
      references/
        before-after.md
```

> **Dica:** `.agents/skills/` é lido pela maioria das ferramentas. Para cobrir também o Claude Code, instale em `.claude/skills/` ou use `--target all`.

---

## Como usar uma skill

O agente lê o `name` e a `description` de cada skill instalada e **ativa a skill sozinho** quando o pedido combina com ela. Também dá para invocar explicitamente:

| Ferramenta | Invocação explícita |
|---|---|
| Claude Code | `/clean-code-expert` (ou `/afm-ai-toolkit:clean-code-expert` se instalada via plugin) |
| Codex | `$clean-code-expert`, ou `/skills` para escolher |
| Cursor | `/clean-code-expert` |
| Gemini CLI | peça pelo nome; `/skills list` mostra as skills carregadas |
| Antigravity | `/clean-code-expert` na CLI; no IDE, menu **Customizations** |
| Copilot | `/clean-code-expert` no chat |

Você também pode citar a skill no prompt: *"use a skill clean-architecture-expert para revisar este módulo"*.

## Verificar a instalação

- **Claude Code**: digite `/` e procure a skill, ou use `/plugin` para ver o plugin.
- **Codex**: `/skills`.
- **Cursor**: Settings → Rules/Skills, ou digite `/`.
- **Gemini CLI**: `/skills list`.
- **Antigravity**: menu **Customizations** no painel do agente, ou `agy plugin list`.

---

## Estrutura do repositório

```
skills/
  <nome-da-skill>/
    SKILL.md              ← instruções da skill (padrão Agent Skills)
    references/           ← material de apoio carregado sob demanda
templates/skill/          ← ponto de partida para novas skills
references/books/         ← livros de referência (PDF)
scripts/                  ← instaladores (install.sh, install.ps1)
plugin.json               ← plugin portátil (Agent Plugins)
.claude-plugin/           ← plugin e marketplace do Claude Code
.agents/plugins/          ← marketplace do Codex
AGENTS.md                 ← regras para contribuidores e agentes
```

Cada `SKILL.md` tem frontmatter YAML (`name`, `description`, `metadata`) seguido das instruções. Os arquivos em `references/` são carregados pelo agente só quando a tarefa precisa deles, e você também pode copiá-los como templates para o seu projeto.

---

## Contribuindo

O formato obrigatório do `SKILL.md`, o limite de 500 linhas, as regras de neutralidade e o checklist de nova skill estão em [AGENTS.md](AGENTS.md). Resumo:

1. Copie `templates/skill/` para `skills/<nome-da-skill>/`. O nome da pasta deve ser igual ao `name`.
2. Preencha o `SKILL.md` (≤ 500 linhas) e crie pelo menos um arquivo em `references/`.
3. Valide com `agentskills validate skills/<nome-da-skill>` (`pip install skills-ref`).
4. Adicione a skill à tabela acima e incremente `version` nos manifests de plugin.
