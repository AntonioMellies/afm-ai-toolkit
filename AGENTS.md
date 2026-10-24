# AGENTS.md

Instruções para agentes de IA (Claude Code, Codex, Cursor, Gemini CLI, Antigravity, Copilot e outros) que trabalham neste repositório. Segue o padrão aberto [AGENTS.md](https://agents.md).

## Visão geral

Este repositório é uma **biblioteca de skills agnóstica de ferramenta**. Ele não usa as skills: distribui skills para outros projetos e usuários instalarem.

Todas as skills seguem o padrão aberto [Agent Skills](https://agentskills.io/specification). Por isso o mesmo `SKILL.md` funciona em qualquer ferramenta compatível. Arquivos específicos de uma ferramenta só existem onde ela exige um formato próprio (veja [Arquivos específicos por ferramenta](#arquivos-específicos-por-ferramenta)).

## Estrutura

```
AGENTS.md                          ← este arquivo (instruções canônicas)
CLAUDE.md                          ← shim: importa o AGENTS.md (Claude Code)
.gemini/settings.json              ← faz o Gemini CLI ler o AGENTS.md
README.md                          ← documentação para usuários
plugin.json                        ← manifest portátil Agent Plugins (Codex, Antigravity CLI)
.claude-plugin/plugin.json         ← manifest de plugin do Claude Code
.claude-plugin/marketplace.json    ← marketplace do Claude Code
.agents/plugins/marketplace.json   ← marketplace do Codex
scripts/
  install.sh                       ← instalador macOS/Linux
  install.ps1                      ← instalador Windows
skills/
  <nome-da-skill>/
    SKILL.md                       ← arquivo instalável (obrigatório)
    references/                    ← material de apoio carregado sob demanda
    assets/                        ← templates e arquivos estáticos (opcional)
    scripts/                       ← código executável pela skill (opcional)
templates/
  skill/                           ← ponto de partida para novas skills (não é skill)
references/
  books/                           ← PDFs de referência, padrão: Título - Autor.pdf
```

`templates/` fica fora de `skills/` de propósito: tudo que está em `skills/` é descoberto como skill pelos instaladores e plugins.

## Skills disponíveis

```
skills/architecture-hard-parts-expert/             ← Trade-offs, ADRs, sistemas distribuídos
skills/clean-architecture-expert/                  ← Clean Arch, DDD, Hexagonal
skills/clean-code-expert/                          ← Clean Code, legibilidade
skills/designer-system-material-3/                 ← Material Design 3, Design Tokens
skills/designer-system-material-3-enterprise-ux/   ← M3 para SaaS B2B, CRM, ERP
skills/domain-driven-design/                       ← DDD estratégico e tático
skills/product-discovery-assistant/                ← Product Discovery
skills/production-ready-microservices-expert/      ← Operação em produção
```

## Formato obrigatório do SKILL.md

```markdown
---
name: nome-da-skill
description: Atua como [papel]. [Foco principal em uma linha]. Use quando [situações/palavras-chave].
metadata:
  author: Antonio Mellies
  version: "1.0"
---

# Título da Skill

## Quando usar esta skill
## Mentalidade Principal
## [Seções específicas]
## Referências
## Anti-Padrões
## Comportamento Esperado
## Regra Máxima
```

Regras do frontmatter (spec Agent Skills):

- `name`: obrigatório e **igual ao nome da pasta**. Só minúsculas, números e hífen, no máximo 64 caracteres, sem hífen no início, no fim ou duplicado.
- `description`: obrigatório, no máximo 1024 caracteres. Diz **o que a skill faz e quando usar** ("Use quando…"), com palavras-chave. É o único texto que o agente lê para decidir se ativa a skill. Não use `: ` (dois-pontos seguido de espaço) no texto sem aspas, porque quebra o YAML.
- `metadata`: `author` e `version`, este como string. Incremente `version` quando o comportamento da skill mudar.
- `license`, `compatibility` e `allowed-tools`: opcionais. Use `compatibility` só se a skill tiver requisitos de ambiente.

## Limites de tamanho (progressive disclosure)

Os agentes carregam skills em três níveis: metadados (sempre), corpo do `SKILL.md` (quando a skill é ativada) e arquivos de apoio (quando necessários). Para não desperdiçar contexto:

- **O `SKILL.md` tem no máximo 500 linhas** (alvo de ~5000 tokens). Mire em ≤ 450 para ter folga em edições futuras.
- Conteúdo detalhado (tabelas, catálogos, formatos de saída, checklists, exemplos longos) vai para `references/<assunto>.md`. Deixe no `SKILL.md` um resumo de 1 a 3 linhas e o link relativo.
- Templates e arquivos estáticos vão para `assets/`; código executável vai para `scripts/`.
- As referências ficam a **um nível** do `SKILL.md`: links relativos (`references/x.md`) e sem cadeias de arquivos que apontam para outros arquivos.
- Todo arquivo em `references/` precisa estar listado na seção `## Referências`, e todo link precisa existir.
- Ao dividir uma skill, **mova** o conteúdo sem reescrevê-lo, para não perder regras.

Verificação rápida:

```bash
wc -l skills/*/SKILL.md          # nenhum acima de 500
```

## Neutralidade de ferramenta

- O corpo das skills não depende de uma ferramenta específica. Não use comandos de barra (`/algo`), nomes de tools internas (`Read`, `Bash`…) nem "você é o Claude". Escreva instruções que qualquer agente consiga seguir.
- Nomes de arquivos de outras ferramentas só podem aparecer como **dados a inspecionar** (ex.: "leia AGENTS.md, CLAUDE.md, GEMINI.md").
- Se uma ferramenta exigir algo diferente, crie o arquivo específico fora de `skills/` e registre-o na tabela abaixo.

## Arquivos específicos por ferramenta

| Arquivo | Ferramenta | Por que existe | Quando atualizar |
|---|---|---|---|
| `CLAUDE.md` | Claude Code | Versões anteriores não leem o AGENTS.md; contém só `@AGENTS.md` | Nunca. Edite o AGENTS.md |
| `.gemini/settings.json` | Gemini CLI | O padrão do Gemini CLI é ler `GEMINI.md` | Nunca |
| `plugin.json` | Codex, Antigravity CLI e clientes Agent Plugins | Manifest portátil; descobre `skills/` automaticamente | Ao lançar uma versão |
| `.claude-plugin/plugin.json` | Claude Code | Manifest de plugin exigido pelo Claude Code | Ao lançar uma versão |
| `.claude-plugin/marketplace.json` | Claude Code | Habilita `/plugin marketplace add` | Ao lançar uma versão |
| `.agents/plugins/marketplace.json` | Codex | Habilita `codex plugin marketplace add` | Raramente (só metadados) |
| `scripts/install.*` | Todas | Caminhos de instalação variam por ferramenta | Quando uma ferramenta mudar de caminho |

**O `version` precisa ser idêntico** em `plugin.json`, `.claude-plugin/plugin.json` e `.claude-plugin/marketplace.json`. Ao adicionar ou alterar skills, incremente a versão nos três arquivos.

## Ao adicionar uma nova skill

1. Copiar `templates/skill/` para `skills/<nome>/`. A pasta e o `name` devem ser iguais.
2. Preencher o `SKILL.md` com todas as seções obrigatórias e remover o comentário de regras.
3. Criar pelo menos um arquivo em `skills/<nome>/references/` e listá-lo em `## Referências`.
4. Conferir o limite: `wc -l skills/<nome>/SKILL.md` ≤ 500.
5. Validar: `agentskills validate skills/<nome>` (CLI da lib de referência; instalação: `pip install skills-ref`).
6. Adicionar a skill à tabela do `README.md` e à lista "Skills disponíveis" acima.
7. Se houver livro de referência, adicionar o PDF em `references/books/` com o padrão `Título - Autor.pdf`.
8. Incrementar `version` nos manifests de plugin.

## Validação antes de commitar

```bash
for d in skills/*/; do agentskills validate "$d"; done  # frontmatter e nomes (pip install skills-ref)
wc -l skills/*/SKILL.md                                  # ≤ 500 linhas
grep -rniE "\bclaude\b|codex|gemini|antigravity" skills/ # neutralidade (revisar resultados)
```
