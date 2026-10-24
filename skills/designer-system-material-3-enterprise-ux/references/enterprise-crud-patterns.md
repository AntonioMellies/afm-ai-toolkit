# Enterprise CRUD Patterns — Padrões de Telas para SaaS/ERP/CRM

Referência de estrutura e comportamento para os padrões CRUD em sistemas corporativos.

---

## Padrão Geral CRUD

Todo módulo enterprise deve ter os 5 fluxos padronizados:

```
List   →  tabela com filtros, busca, ações em massa
Create →  formulário de criação
View   →  detail page com tabs
Edit   →  formulário de edição (drawer ou página)
Delete →  dialog de confirmação
```

A experiência deve ser idêntica entre módulos. Usuários aprendem uma vez, usam em todos os lugares.

---

## 1. LIST PAGE

### Estrutura Completa

```
┌────────────────────────────────────────────────────────────────────────┐
│ [←] Clientes                                         [Importar] [+ Novo]│
│ 2.847 registros                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ [🔍 Buscar clientes...]        [Filtros ▼]  Status: ● Ativo ×  [Limpar] │
├──────────────────────────────────────────────────────────────────────────┤
│ ☐  Nome ↑         Email                  Cidade    Status  Criado em     │
│ ── ────────────── ──────────────────── ──────── ──────── ──────────     │
│ ☐  Ana Lima       ana@empresa.com       São Paulo  Ativo  01/06/2025     │
│ ☐  Bruno Melo     bruno@corp.com        Curitiba   Ativo  28/05/2025     │
│ ☒  Carlos Pinto   carlos@biz.com        Rio de Jan Inativo 15/05/2025   │
│ ☐  Diana Rocha    diana@empresa.com     Belo Horiz Ativo  10/05/2025    │
├──────────────────────────────────────────────────────────────────────────┤
│ 1 selecionado  [Exportar] [Desativar] [Excluir]              1–20 de 2.847│
│                                                        ← Anterior  Próximo→│
└────────────────────────────────────────────────────────────────────────────┘
```

### Regras

**Header:**
- Título do módulo + contagem de registros
- Ação primária ("+ Novo") sempre no canto superior direito
- Ações secundárias (Importar, Exportar) antes da ação primária

**Context Bar:**
- Busca sempre à esquerda
- Botão "Filtros" com indicador do número de filtros ativos
- Chips de filtros ativos com X para remover individualmente
- "Limpar" para remover todos os filtros de uma vez

**Tabela:**
- Checkbox na primeira coluna para seleção
- Coluna principal (nome/identificador) sempre clicável — navega para Detail Page
- Ícone de ordenação ativo na coluna selecionada (↑ ↓)
- Hover na linha: mostrar ações rápidas (editar, visualizar) como icon buttons
- Sticky header ao scrollar

**Bulk Actions Bar (aparecer ao selecionar ≥1 item):**
- Contextual App Bar substituindo o header original
- Mostrar quantos estão selecionados
- Ações disponíveis para o conjunto selecionado
- X para desselecionar tudo

**Paginação:**
- Sempre mostrar total de registros
- Opção de escolher itens por página (20 / 50 / 100)
- Compact: scroll infinito como alternativa

---

## 2. DETAIL PAGE

### Estrutura Completa

```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Clientes > Ana Lima                           [Editar] [Ações ▼]    │
│ Ana Lima                                        ● Ativa                │
├──────────────────────────────────────────────────────────────────────────┤
│ Dados Principais                                                         │
│ ┌─────────────────────────────────────────────────────────────────────┐ │
│ │ Email             Tel               Empresa         Criado em        │ │
│ │ ana@empresa.com  (11) 99999-0000   Acme Corp       01/06/2025       │ │
│ └─────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────┤
│ [ Detalhes ] [ Histórico ] [ Atividades ] [ Documentos ] [ Relacionados ]│
├──────────────────────────────────────────────────────────────────────────┤
│ Tab: Detalhes                                                             │
│                                                                          │
│ Informações de Contato          Informações Comerciais                   │
│ Nome:       Ana Lima            Segmento:  Tecnologia                    │
│ Cargo:      Diretora de TI      Origem:    Indicação                     │
│ Empresa:    Acme Corp           Gerente:   João Oliveira                 │
│ LinkedIn:   /in/analima         Desde:     Janeiro 2024                  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Tab: Histórico

```
Histórico de Alterações

10/06/2025 14:32  João Oliveira alterou Status: Ativo → Inativo
08/06/2025 10:15  Ana Lima foi atribuída ao Gerente: João Oliveira
01/06/2025 09:00  Registro criado por Maria Santos
```

### Tab: Atividades

```
[+ Nova Atividade]

● 10/06 — Call agendada para 15/06 (João Oliveira)
● 08/06 — E-mail enviado: "Proposta comercial"
✓ 05/06 — Reunião de apresentação (concluída)
✓ 01/06 — Primeiro contato via indicação
```

### Regras

**Header da Detail Page:**
- Breadcrumb para voltar à lista
- Nome completo do registro + status badge
- Ações no canto direito: primária (Editar) + menu secundário (Ações ▼)

**Summary Card:**
- Grid com 3–5 dados-chave
- Sempre visível, independente da tab ativa
- Máximo 1 linha por campo

**Tabs:**
- Máximo 6 tabs (usar Menu "Mais" para excedentes)
- Tab ativa mantida ao editar e voltar
- Lazy load do conteúdo de cada tab

**Edição:**
- Ação "Editar" abre Drawer lateral (campos simples)
- Ação "Editar" abre página dedicada (formulário complexo)
- Edição inline para campos isolados (clique no campo → input ativo)

---

## 3. DRAWER DE EDIÇÃO RÁPIDA

Para formulários com até 8 campos:

```
┌── Editar Cliente ──────────────────────────────── × ┐
│                                                       │
│ Nome completo *                                       │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Ana Lima                                        │  │
│ └─────────────────────────────────────────────────┘  │
│                                                       │
│ E-mail *                                             │
│ ┌─────────────────────────────────────────────────┐  │
│ │ ana@empresa.com                                 │  │
│ └─────────────────────────────────────────────────┘  │
│                                                       │
│ Status                                               │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Ativo                                         ▼ │  │
│ └─────────────────────────────────────────────────┘  │
│                                                       │
│ Telefone                                             │
│ ┌─────────────────────────────────────────────────┐  │
│ │ (11) 99999-0000                                 │  │
│ └─────────────────────────────────────────────────┘  │
│                                                       │
├───────────────────────────────────────────────────────┤
│                         [Cancelar]  [Salvar Alterações]│
└───────────────────────────────────────────────────────┘
```

**Regras:**
- Abrir pelo lado direito (slide-in)
- Fechar com Esc, clique no backdrop ou botão ×
- Footer fixo com ações Cancelar e Salvar
- Validação inline em tempo real
- Exibir loading no botão Salvar durante requisição
- Fechar drawer após save bem-sucedido + mostrar Snackbar de confirmação

---

## 4. CREATE / EDIT PAGE

Para formulários complexos (mais de 8 campos):

```
┌────────────────────────────────────────────────────────────────────────┐
│ ← Clientes  /  Novo Cliente                                            │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│ Informações Básicas                                                      │
│ ─────────────────────────────────────────────────────────────────────── │
│ Nome completo *                    Cargo                                 │
│ ┌────────────────────────────┐    ┌────────────────────────────────────┐ │
│ │                            │    │                                    │ │
│ └────────────────────────────┘    └────────────────────────────────────┘ │
│                                                                          │
│ E-mail *                           Telefone                              │
│ ┌────────────────────────────┐    ┌────────────────────────────────────┐ │
│ │                            │    │                                    │ │
│ └────────────────────────────┘    └────────────────────────────────────┘ │
│                                                                          │
│ Informações Comerciais                                                   │
│ ─────────────────────────────────────────────────────────────────────── │
│ Empresa *                          Segmento                              │
│ ┌────────────────────────────┐    ┌────────────────────────────────────┐ │
│ │                            │    │                                  ▼ │ │
│ └────────────────────────────┘    └────────────────────────────────────┘ │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│ Footer fixo                               [Cancelar]    [Criar Cliente]  │
└──────────────────────────────────────────────────────────────────────────┘
```

**Regras:**
- Layout de 2 colunas em Expanded (campos relacionados lado a lado)
- Layout de 1 coluna em Compact e Médio
- Seções agrupadas com título e divisor
- Footer fixo com ações (não scroll para chegar no botão)
- Breadcrumb claro: voltar à lista ou ao registro pai
- Validação em tempo real (não somente ao submeter)
- Ação primária desabilitada até campos obrigatórios preenchidos
- Em Edit: mostrar estado "carregando dados" (skeleton) antes de exibir formulário

---

## 5. DELETE CONFIRMATION DIALOG

```
┌───────────────────────────────────────────────┐
│                                               │
│  Excluir cliente?                             │
│                                               │
│  Você está prestes a excluir permanentemente  │
│  "Ana Lima". Esta ação não pode ser desfeita. │
│                                               │
│                      [Cancelar]  [Excluir]    │
└───────────────────────────────────────────────┘
```

**Regras:**
- Dialog modal (não snackbar, não inline)
- Sempre nomear o item que será excluído
- Linguagem clara sobre irreversibilidade quando aplicável
- Botão de confirmação com cor `--md-sys-color-error`
- Cancelar como ação padrão (foco no Cancelar, não no Excluir)
- Deletar em lote: mostrar contagem ("Excluir 3 clientes?")
- Considerar "Soft Delete" + opção de restaurar quando possível

---

## 6. INLINE EDITING

Para edição rápida de campos isolados em tabela ou detail page:

```
Repouso:   Ana Lima          [lápis ao hover]
Editando:  [ Ana Lima      ] [✓] [×]
Salvando:  [ Ana Lima      ] [spinner]
Salvo:     Ana Lima Editada  [✓ verde por 2s]
Erro:      [ Ana Lima      ] [✗] Não foi possível salvar
```

**Regras:**
- Ativar ao clicar no campo (cursor pointer + hover hint)
- Confirmar com Enter ou Tab (avança para próximo campo)
- Cancelar com Esc (restaura valor anterior)
- Auto-save sem botão explícito quando possível
- Mostrar feedback de sucesso e erro inline

---

## 7. BULK ACTIONS

Quando ≥1 item selecionado na tabela, substituir o Page Header por Contextual App Bar:

```
┌────────────────────────────────────────────────────────────────────────┐
│ ×  3 selecionados                [Exportar]  [Desativar]  [Excluir]   │
└────────────────────────────────────────────────────────────────────────┘
```

**Regras:**
- Mostrar apenas ações válidas para o conjunto selecionado
- Ações destrutivas sempre no final (à direita)
- Ações destrutivas em lote exigem Dialog de confirmação com contagem
- X fecha a seleção e restaura o header original
- Manter seleção ao paginar (select all = todos os registros, não só a página)

---

## 8. STATUS BADGES

Padrões de cores por status semântico:

```css
/* Tokens Enterprise (extensão do M3) */

/* Ativo / Aprovado / Sucesso */
background: var(--md-ext-color-success-container);
color: var(--md-ext-color-on-success-container);

/* Pendente / Em análise */
background: var(--md-ext-color-warning-container);
color: var(--md-ext-color-on-warning-container);

/* Inativo / Cancelado / Erro */
background: var(--md-sys-color-error-container);
color: var(--md-sys-color-on-error-container);

/* Draft / Rascunho / Neutro */
background: var(--md-sys-color-surface-container-high);
color: var(--md-sys-color-on-surface-variant);

/* Info / Em progresso */
background: var(--md-ext-color-info-container);
color: var(--md-ext-color-on-info-container);
```

**Regras:**
- Badge sempre com ícone + texto (nunca apenas cor)
- Máximo 3–4 status diferentes por módulo
- Status críticos com ícone de alerta

---

## 9. ESTADOS OBRIGATÓRIOS POR TELA

### List Page

| Estado      | Exibição                                           |
|-------------|-----------------------------------------------------|
| Loading     | Skeleton rows (não spinner no centro)               |
| Empty       | Ilustração + "Nenhum cliente cadastrado" + [+ Novo] |
| No Results  | Ícone de busca + "Nenhum resultado" + [Limpar Filtros] |
| Error       | Ícone de erro + mensagem + [Tentar novamente]       |
| Partial Load| Dados visíveis + spinner no footer                  |

### Detail Page

| Estado      | Exibição                                           |
|-------------|-----------------------------------------------------|
| Loading     | Skeleton do header + skeleton das tabs              |
| Not Found   | "Registro não encontrado" + [← Voltar]              |
| Error       | Banner de erro + [Tentar novamente]                 |
| Saving      | Botão com spinner + campos desabilitados            |
| Saved       | Snackbar "Alterações salvas"                        |

### Form

| Estado      | Exibição                                            |
|-------------|------------------------------------------------------|
| Pristine    | Todos os campos sem validação                        |
| Touched     | Validação inline no campo tocado                     |
| Submitting  | Botão com spinner + form desabilitado                |
| Error       | Highlight nos campos inválidos + mensagens inline    |
| Server Error| Banner no topo do form + detalhes do erro            |
| Success     | Snackbar + redirect para Detail Page ou lista        |

---

## Checklist CRUD Enterprise

### List Page
- [ ] Busca com debounce
- [ ] Filtros com chips de estado ativo
- [ ] Ordenação em todas as colunas relevantes
- [ ] Seleção múltipla com Bulk Actions
- [ ] Paginação com total de registros
- [ ] Estados: loading (skeleton), empty, no-results, error
- [ ] Hover na linha com ações rápidas
- [ ] Ação "+ Novo" sempre visível

### Detail Page
- [ ] Breadcrumb de navegação
- [ ] Summary Card com dados-chave
- [ ] Tabs com lazy load
- [ ] Histórico de alterações
- [ ] Ações contextuais no header
- [ ] Estados: loading, not-found, error

### Create / Edit
- [ ] Layout 2 colunas em Expanded
- [ ] Footer fixo com ações
- [ ] Validação inline em tempo real
- [ ] Labels visíveis em todos os campos
- [ ] Mensagens de erro específicas
- [ ] Estados: loading (ao editar), submitting, error, success

### Delete
- [ ] Dialog modal com nome do item
- [ ] Botão de confirmação em cor error
- [ ] Cancelar como foco padrão
