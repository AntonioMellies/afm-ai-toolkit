# Enterprise Design Review — Template de Auditoria SaaS/ERP/CRM

Template completo para auditar interfaces de sistemas corporativos com foco em produtividade, Enterprise UX e Material Design 3.

---

## Informações da Revisão

```
Sistema / Módulo:
Tipo de app (CRM / ERP / Backoffice / Billing / Outro):
Usuário alvo (persona, nível de expertise, frequência de uso):
Plataforma principal (Web Desktop / Tablet / Híbrido):
Data da revisão:
Revisor:
```

---

## 1. Enterprise UX Readiness

### 1.1 Eficiência Operacional

- [ ] Ações frequentes exigem no máximo 2 cliques
- [ ] Atalhos de teclado disponíveis para ações primárias
- [ ] Edição inline disponível para campos simples em tabelas/detail pages
- [ ] Bulk actions para operações em múltiplos registros
- [ ] Drawers usados para visualização/edição rápida sem troca de contexto
- [ ] Filtros aplicados são persistentes durante a sessão
- [ ] Busca disponível sempre que houver mais de 20 registros

**Problemas encontrados:**
```
-
-
```

### 1.2 Densidade de Informação

- [ ] Density adequada ao contexto (não espaçamento mobile em desktop)
- [ ] Tabelas com densidade configurável (comfortable / compact / ultra compact)
- [ ] Headers de página com altura máxima de 72dp
- [ ] Conteúdo útil visível sem scroll em 80% dos casos de uso frequentes
- [ ] Ausência de cards desnecessários onde tabelas/listas seriam mais eficientes

**Problemas encontrados:**
```
-
-
```

### 1.3 Preservação de Contexto

- [ ] Usuário não perde contexto ao visualizar detalhes (drawer / panel)
- [ ] Bread crumbs claros para hierarquias profundas
- [ ] Filtros e busca mantidos ao navegar entre abas da mesma tela
- [ ] Seleção de itens preservada ao paginar (se aplicável)
- [ ] Scroll position preservada ao voltar da detail page

**Problemas encontrados:**
```
-
-
```

### 1.4 Progressive Disclosure

- [ ] Ações avançadas acessíveis mas não dominando a tela
- [ ] Filtros avançados disponíveis sob demanda
- [ ] Configurações avançadas em seção colapsável ou tela dedicada
- [ ] Informações secundárias em tabs, não na view principal

**Problemas encontrados:**
```
-
-
```

---

## 2. Layout e Navegação

### 2.1 Canonical Layout

- [ ] Canonical layout adequado ao tipo de sistema:
  - [ ] List-Detail (CRM, tickets, gestão de entidades)
  - [ ] Supporting Panel (tabelas + filtros/contexto)
  - [ ] Three-Pane (mail, inbox, ERP complexo)
  - [ ] Dashboard (analytics, monitoramento)

- [ ] Navigation Rail ou Drawer Permanente em Expanded (não Navigation Bar)
- [ ] Navigation Bar apenas em Compact (mobile)
- [ ] Inspector/Side Panel com largura entre 280–420dp
- [ ] Sidebar permanente com suporte a collapsed/expanded

**Problemas encontrados:**
```
-
-
```

### 2.2 Responsividade

- [ ] Testado em Compact (0–599px)
- [ ] Testado em Medium (600–839px)
- [ ] Testado em Expanded (840px+)
- [ ] Navigation adaptada em cada breakpoint
- [ ] Layout desktop-first (não mobile-first aplicado ao desktop)
- [ ] Side panel vira drawer em Medium, tela separada em Compact

**Problemas encontrados:**
```
-
-
```

---

## 3. Padrões CRUD

### 3.1 List Page

- [ ] Busca com debounce implementada
- [ ] Filtros com estado ativo visível (chips com ×)
- [ ] Ordenação disponível nas colunas principais
- [ ] Checkbox e bulk actions implementados
- [ ] Paginação com total de registros
- [ ] Hover na linha: ações rápidas visíveis
- [ ] Estados: loading (skeleton), empty, no-results, error

**Problemas encontrados:**
```
-
-
```

### 3.2 Detail Page

- [ ] Breadcrumb de navegação
- [ ] Summary Card com dados-chave sempre visível
- [ ] Tabs com conteúdo por domínio (Detalhes, Histórico, Atividades)
- [ ] Lazy load por tab
- [ ] Ações no header (Editar, menu secundário)
- [ ] Estados: loading (skeleton), not-found, error

**Problemas encontrados:**
```
-
-
```

### 3.3 Formulários

- [ ] Labels visíveis em todos os campos (não placeholder como label)
- [ ] Validação inline em tempo real
- [ ] Mensagens de erro específicas
- [ ] Campos obrigatórios indicados
- [ ] Layout 2 colunas em Expanded, 1 coluna em Compact
- [ ] Footer fixo com ações Cancelar e Salvar
- [ ] Estados: submitting, server error, success

**Problemas encontrados:**
```
-
-
```

### 3.4 Delete

- [ ] Dialog modal com nome do item
- [ ] Mensagem clara sobre irreversibilidade
- [ ] Botão de confirmação em cor error
- [ ] Cancelar como foco padrão (não a ação destrutiva)

**Problemas encontrados:**
```
-
-
```

---

## 4. Tabelas

- [ ] Sticky header
- [ ] Coluna primária clicável (navega para detail)
- [ ] Ordenação por coluna com indicador visual
- [ ] Seleção múltipla via checkbox
- [ ] Bulk actions aparecem ao selecionar itens
- [ ] Paginação com seletor de itens por página
- [ ] Estados: loading (skeleton rows), empty, no-results, error
- [ ] Densidade selecionável pelo usuário
- [ ] Export disponível (CSV / Excel quando aplicável)
- [ ] Sticky primeira coluna em tabelas muito largas

**Problemas encontrados:**
```
-
-
```

---

## 5. Filtros e Busca

- [ ] Filtros frequentes visíveis inline (não escondidos)
- [ ] Filtros ativos representados como chips removíveis
- [ ] Filtros avançados em drawer lateral
- [ ] Busca sempre disponível quando há mais de 20 registros
- [ ] Busca com debounce (não busca a cada tecla)
- [ ] Estado "Nenhum resultado" com sugestão de ajustar filtros

**Problemas encontrados:**
```
-
-
```

---

## 6. Dashboard

- [ ] KPIs respondem: O que aconteceu? Vs. quê? O que fazer?
- [ ] Máximo 8 KPIs na tela inicial
- [ ] Alertas e pendências com links para ação
- [ ] Tabela de registros recentes/relevantes presente
- [ ] Gráficos com dados acionáveis (não apenas decorativos)
- [ ] Sem Pie Charts com mais de 4 fatias
- [ ] Sem gráficos 3D

**Problemas encontrados:**
```
-
-
```

---

## 7. Material Design 3 Compliance

### 7.1 Tokens

- [ ] Nenhum valor hardcoded de cor, tipografia, espaçamento ou border-radius
- [ ] Todos os tokens seguem hierarquia: Reference → System → Component
- [ ] Extensões enterprise (success, warning, info) seguem convenção M3

### 7.2 Componentes

- [ ] Componentes M3 corretos para cada contexto
- [ ] Navigation Rail/Drawer no Expanded (não Navigation Bar)
- [ ] Botões com hierarquia correta (Filled > Tonal > Outlined > Text)
- [ ] Snackbar para feedback temporário (não Dialog)
- [ ] Dialog apenas para confirmações críticas

**Problemas encontrados:**
```
-
-
```

---

## 8. Acessibilidade

- [ ] Contraste de texto: mínimo 4.5:1 (WCAG AA)
- [ ] Contraste de UI: mínimo 3:1
- [ ] Navegação completa por teclado
- [ ] Focus ring visível em todos os interativos
- [ ] ARIA labels em ícones sem texto
- [ ] Tabelas com `<th scope>` e `<caption>` corretos
- [ ] Formulários com `<label>` associado a cada `<input>`
- [ ] Erros associados ao campo via `aria-describedby`
- [ ] Área de toque mínima de 48×48dp
- [ ] Não depende apenas de cor para informação

**Problemas encontrados:**
```
-
-
```

---

## 9. Dark Mode

- [ ] Tokens mapeados para Light e Dark
- [ ] Testado com sistema em modo escuro
- [ ] Tabelas e gráficos visíveis em Dark Mode
- [ ] Status badges com contraste em Dark Mode
- [ ] Elevação via Surface Tint (não apenas shadow)

**Problemas encontrados:**
```
-
-
```

---

## 10. Estados de UI

- [ ] Loading: skeleton em listas, tabelas e detail pages
- [ ] Empty: ilustração + texto + CTA quando aplicável
- [ ] No Results: texto + sugestão de ajustar filtros/busca
- [ ] Error: mensagem clara + retry
- [ ] Success: Snackbar com confirmação
- [ ] Warning: banner ou inline warning
- [ ] Permission Denied: explicação + CTA para solicitar acesso
- [ ] Offline: banner de conectividade

**Problemas encontrados:**
```
-
-
```

---

## 11. Multi-Tenant e White Label

- [ ] Tokens organizados em camadas: Brand → Product → Theme → Tenant
- [ ] Override de cor primária por tenant via CSS selector
- [ ] Logo customizável sem alterar código
- [ ] Tipografia customizável via `--md-ref-typeface-brand`
- [ ] Nenhuma cor ou fonte hardcoded nos componentes

**Problemas encontrados:**
```
-
-
```

---

## Score Final

| Dimensão                | Nota (0–10) | Comentário |
|-------------------------|-------------|------------|
| UX Score                |             |            |
| Enterprise Readiness    |             |            |
| Acessibilidade          |             |            |
| Escalabilidade          |             |            |
| Consistência            |             |            |
| Densidade de Dados      |             |            |
| Material Compliance     |             |            |
| Token Coverage          |             |            |
| **Overall**             |             |            |

---

## Problemas Priorizados

| Prioridade | Problema                           | Tela / Componente | Impacto              | Correção sugerida             |
|------------|------------------------------------|-------------------|----------------------|-------------------------------|
| Alta       |                                    |                   |                      |                               |
| Alta       |                                    |                   |                      |                               |
| Alta       |                                    |                   |                      |                               |
| Média      |                                    |                   |                      |                               |
| Média      |                                    |                   |                      |                               |
| Baixa      |                                    |                   |                      |                               |

---

## O que está correto

```
-
-
-
```

## Problemas críticos (impacto na produtividade)

```
-
-
```

## Impacto operacional estimado

```
-
```

## Próximos Passos

```
1.
2.
3.
```
