# Enterprise Layout Patterns — M3 Canonical Layouts

Referência de layouts para sistemas SaaS B2B, CRM, ERP e Backoffice.

---

## Canonical Layouts M3

O Material Design 3 define três canonical layouts para aplicações desktop complexas.

---

## 1. List-Detail

Padrão ideal para: **CRM, ERP, Gestão de Tickets, Customer Support**

```
┌────────────────────────────────────────────────────────────────────────┐
│ Navigation Drawer  │  List Panel          │  Detail Panel              │
│ ────────────────── │ ──────────────────── │ ────────────────────────── │
│ ○ Dashboard        │ [Busca + Filtros]    │  [Nome do Contato]         │
│ ● Contatos         │                      │  Status: Ativo     [Editar]│
│ ○ Oportunidades    │ ○ Ana Lima           │  ──────────────────────── │
│ ○ Atividades       │ ● Bruno Melo ◀ sel  │  Tabs: Detalhes Atividades │
│ ○ Relatórios       │ ○ Carlos Pinto       │                            │
│                    │ ○ Diana Rocha        │  Email: bruno@empresa.com  │
│                    │ ○ Eduardo Silva      │  Tel: (11) 99999-0000      │
│                    │                      │  Empresa: Acme Corp        │
│                    │ ← 1–20 de 2.847 →   │  Criado em: 10/01/2025    │
└────────────────────┴──────────────────────┴────────────────────────────┘
```

**Grid:** Nav 240dp · List 320–400dp · Detail restante (flex)
**Breakpoints:**
- Expanded: todos os 3 painéis visíveis
- Medium: ocultar Detail, abrir como Drawer ao selecionar
- Compact: ocultar List e Detail, navegar em telas separadas

---

## 2. Supporting Panel

Padrão ideal para: **Backoffice, Tabelas Complexas, Analytics, Finanças**

```
┌────────────────────────────────────────────────────────────────────────┐
│ Navigation Rail │  Primary Workspace                   │  Side Panel   │
│ ────────────── │ ──────────────────────────────────── │ ──────────── │
│ [Dashboard]    │  Pedidos                 [+ Novo]     │  Filtros      │
│ [Pedidos]  ←  │  ───────────────────────────────────  │  ──────────  │
│ [Produtos]     │  ☐  #  Data    Cliente   Total Status │  Status       │
│ [Relatórios]   │  ☐ 001 10/06  Acme      R$1.200 ✓   │  ○ Todos      │
│ [Config]       │  ☒ 002 10/06  Beta      R$3.450 ⏳  │  ○ Aprovado   │
│                │  ☐ 003 09/06  Gamma     R$890   ✗   │  ● Pendente   │
│                │  ☐ 004 09/06  Delta     R$2.100 ✓   │               │
│                │  ──────────────────────────────────  │  Período      │
│                │  ← Anterior   1–20 de 847   Próximo→ │  01/06–10/06  │
└────────────────┴──────────────────────────────────────┴───────────────┘
```

**Grid:** Rail 80dp · Workspace flex · Side Panel 280–360dp
**Breakpoints:**
- Expanded: workspace + side panel visíveis
- Medium: side panel colapsado, abrir como drawer
- Compact: rail como bottom bar, side panel como bottom sheet

---

## 3. Three-Pane (Enterprise Complexo)

Padrão ideal para: **ERP, Plataformas de E-mail, Customer Service, Inbox**

```
┌──────────────────────────────────────────────────────────────────────┐
│ Nav Drawer     │  Primary Workspace        │  Inspector Panel        │
│ ─────────────  │ ─────────────────────────  │ ───────────────────── │
│ ○ Inbox (12)   │  [Busca]   [Filtros]       │  Ticket #1847          │
│ ○ Enviados     │                             │  ──────────────────── │
│ ● Pendentes    │  ● Ticket #1847 — Urgente  │  Cliente: Ana Lima     │
│ ○ Resolvidos   │  ○ Ticket #1846 — Normal   │  Plano: Enterprise     │
│ ○ Fechados     │  ○ Ticket #1845 — Baixo    │  SLA: 2h restantes ⚠  │
│                │  ○ Ticket #1844 — Normal   │                        │
│ ─────────────  │                             │  Tabs: Detalhes Hist. │
│ + Nova Equipe  │                             │  [Atribuir] [Resolver] │
└────────────────┴─────────────────────────────┴────────────────────────┘
```

**Grid:** Nav 240dp · Workspace flex · Inspector 360dp
**Breakpoints:**
- Expanded: 3 painéis
- Medium: nav como rail, inspector como drawer
- Compact: navegação linear entre telas

---

## 4. Dashboard Layout

Padrão ideal para: **Painéis executivos, Analytics, Monitoring**

```
┌──────────────────────────────────────────────────────────────────────┐
│ Nav Drawer  │  Dashboard                                             │
│ ────────── │ ────────────────────────────────────────────────────── │
│ ○ Overview  │  Visão Geral — Junho 2025           [Exportar] [+30d] │
│ ○ Vendas    │ ───────────────────────────────────────────────────── │
│ ○ Suporte   │  R$ 847.200    12.4k Usuários    98.7% Uptime   42 ⚠ │
│ ○ Produtos  │  ▲ +14% mês   ▲ +8% mês         ▼ -0.1%       ▲ +6  │
│ ○ Config    │ ───────────────────────────────────────────────────── │
│             │  Receita Mensal          │  Pedidos por Status         │
│             │  [Line Chart]            │  [Bar Chart]                │
│             │                          │                              │
│             │ ───────────────────────────────────────────────────── │
│             │  Últimos Pedidos (tabela com link para módulo)         │
└─────────────┴──────────────────────────────────────────────────────┘
```

**Regra:** Dashboard é ponto de partida para ação, não decoração.

---

## Workspace Layout Rules

### Altura do Page Header

```
Mínimo: 56dp
Máximo: 72dp (com subtítulo ou breadcrumb)
```

Evitar headers que ocupam mais de 20% da viewport.

### Sidebar Permanente

```
Collapsed: 80dp (somente ícones)
Expanded:  240dp (ícones + labels)
```

Sempre suportar toggle collapsed/expanded. Preferir collapsed em telas menores.

### Inspector / Side Panel

```
Mínimo: 280dp
Máximo: 420dp
Padrão:  360dp
```

Fechar com Esc. Manter scroll independente do primary workspace.

---

## Breakpoint Adaptation Table

| Elemento              | Compact (0–599)   | Medium (600–839) | Expanded (840+)       |
|-----------------------|-------------------|------------------|-----------------------|
| Navigation            | Bottom Bar        | Navigation Rail  | Drawer Permanente     |
| Sidebar               | Modal Drawer      | Colapsada (rail) | Permanente expandida  |
| Side Panel            | Bottom Sheet      | Modal Drawer     | Permanente            |
| Grid                  | 4 colunas         | 8 colunas        | 12 colunas            |
| Margem lateral        | 16dp              | 24dp             | 24dp+                 |
| Tabela                | Lista card-based  | Tabela compacta  | Tabela confortável    |
| Formulário            | 1 coluna          | 1–2 colunas      | 2 colunas             |
| KPIs no dashboard     | Scroll horizontal | 2×2 grid         | 4 em linha            |
| Inspector panel       | Tela separada     | Modal Drawer     | Painel fixo lateral   |

---

## Navigation Drawer — Estrutura Enterprise

```
┌──────────────────────────────┐
│ [Logo]    [Collapse ←]       │
├──────────────────────────────┤
│                              │
│  PRINCIPAL                   │
│  ○ Dashboard                 │
│  ● Pedidos             (12)  │
│  ○ Clientes                  │
│  ○ Produtos                  │
│                              │
│  FINANCEIRO                  │
│  ○ Faturas                   │
│  ○ Pagamentos                │
│  ○ Relatórios                │
│                              │
│  CONFIGURAÇÕES               │
│  ○ Usuários                  │
│  ○ Permissões                │
│  ○ Integrações               │
│                              │
├──────────────────────────────┤
│  [Avatar] Ana Lima  [→ Sair] │
└──────────────────────────────┘
```

**Regras:**
- Agrupar por domínio de negócio, não por tipo técnico
- Máximo 3 níveis de hierarquia (item > sub-item)
- Badges apenas para ações pendentes que requerem atenção
- Item ativo com cor `--md-sys-color-secondary-container`

---

## Density Tokens — Enterprise Override

Para contextos de alta densidade (tabelas, listas), aplicar overrides de spacing:

```css
/* Comfortable (padrão M3) */
.density-comfortable {
  --row-height: 48px;
  --cell-padding-v: 12px;
  --cell-padding-h: 16px;
}

/* Compact (enterprise padrão) */
.density-compact {
  --row-height: 40px;
  --cell-padding-v: 8px;
  --cell-padding-h: 16px;
}

/* Ultra Compact (power users) */
.density-ultra-compact {
  --row-height: 32px;
  --cell-padding-v: 4px;
  --cell-padding-h: 12px;
}
```

---

## Checklist de Layout Enterprise

- [ ] Canonical layout adequado ao tipo de sistema (List-Detail, Supporting, Three-Pane)
- [ ] Navigation adaptada aos três breakpoints
- [ ] Sidebar suporta collapsed/expanded
- [ ] Inspector panel fecha com Esc e mantém scroll independente
- [ ] Page header com no máximo 72dp de altura
- [ ] Breakpoints implementados para Compact, Medium e Expanded
- [ ] Densidade selecionável pelo usuário
- [ ] Scroll da área de conteúdo não afeta navigation e header
- [ ] Tabelas com sticky header e primeira coluna sticky quando necessário
- [ ] Dashboard não ultrapassa 6–8 KPIs na tela inicial
