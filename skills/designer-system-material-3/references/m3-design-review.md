# M3 Design Review — Template de Auditoria

Use este template para auditar interfaces existentes ou avaliar propostas antes da implementação.

---

## Informações da Revisão

```
Tela / Componente:
Plataforma (Web / Mobile / Desktop):
Breakpoint principal:
Data da revisão:
Revisor:
```

---

## 1. Material Design 3 Compliance

### 1.1 Color System

- [ ] Nenhuma cor hardcoded — todas usam `--md-sys-color-*`
- [ ] Pares `color / on-color` respeitados em todos os componentes
- [ ] Surface containers usados corretamente (não `background` para cards internos)
- [ ] `outline` e `outline-variant` usados para bordas (não cores customizadas)
- [ ] Extensões semânticas (success/warning/info) seguem a convenção `color + on-color + container`
- [ ] Cor primária usada apenas para ações e elementos de destaque
- [ ] Cor terciária usada como acento pontual (não dominante)

**Problemas encontrados:**

```
-
-
```

### 1.2 Typography

- [ ] Todos os textos usam a escala M3 (Display/Headline/Title/Body/Label)
- [ ] Nenhum `font-size` hardcoded — todos via `--md-sys-typescale-*`
- [ ] Hierarquia tipográfica clara (H1 > H2 > Body, sem pular níveis sem intenção)
- [ ] Display e Headline usados apenas para conteúdo de destaque (não corpo de texto)
- [ ] Label usado para UI labels, não para corpo de conteúdo

**Problemas encontrados:**

```
-
-
```

### 1.3 Shape

- [ ] Nenhum `border-radius` hardcoded — todos via `--md-sys-shape-corner-*`
- [ ] Componentes pequenos usam `corner-extra-small` ou `corner-small`
- [ ] Cards usam `corner-medium` ou `corner-large`
- [ ] Elementos em bottom sheets e side sheets usam `corner-large` ou `corner-extra-large`
- [ ] Botões FAB usam `corner-large` (padrão M3)

**Problemas encontrados:**

```
-
-
```

### 1.4 Elevation

- [ ] Surface Tint aplicado em superfícies elevadas (não apenas box-shadow)
- [ ] Dark Mode: elevação aumenta luminosidade via tint (não shadow)
- [ ] Hierarquia de elevação coerente (cards < modais < toasts)
- [ ] Nenhum `box-shadow` customizado fora dos tokens de elevação

**Problemas encontrados:**

```
-
-
```

### 1.5 Spacing

- [ ] Todos os espaçamentos são múltiplos de 4dp
- [ ] Grid de 8dp baseline aplicado para alinhamento vertical
- [ ] Margens de layout respeitam os padrões por breakpoint
- [ ] Nenhum valor arbitrário como `10px`, `15px`, `22px`

**Problemas encontrados:**

```
-
-
```

### 1.6 Components

- [ ] Apenas componentes oficiais M3 utilizados
- [ ] Componente correto para o contexto (ex: não usar Snackbar para confirmações críticas)
- [ ] Variantes corretas (Filled vs Outlined vs Tonal em botões)
- [ ] Navigation adaptada ao breakpoint correto

**Problemas encontrados:**

```
-
-
```

---

## 2. Acessibilidade

- [ ] Contraste de texto ≥ 4.5:1 (WCAG AA)
- [ ] Contraste de UI (botões, inputs, ícones) ≥ 3:1
- [ ] Focus ring visível em todos os elementos interativos
- [ ] Navegação completa por teclado (Tab, Enter, Escape, setas)
- [ ] Screen reader: todos os botões têm `aria-label` ou texto visível
- [ ] Imagens decorativas com `alt=""`, imagens informativas com `alt` descritivo
- [ ] Formulários: `<label>` associado a cada `<input>` via `for/id`
- [ ] Erros de validação: mensagem clara, associada ao campo via `aria-describedby`
- [ ] Área de toque mínima de 48×48dp para todos os elementos interativos
- [ ] Não depende apenas de cor para transmitir informação (ícone + texto + cor)
- [ ] `prefers-reduced-motion` respeitado nas animações

**Problemas encontrados:**

```
-
-
```

---

## 3. Responsividade

- [ ] Layout testado em Compact (0–599px)
- [ ] Layout testado em Medium (600–839px)
- [ ] Layout testado em Expanded (840px+)
- [ ] Navigation adaptada ao breakpoint (Bar/Rail/Drawer)
- [ ] Tipografia adaptada ao breakpoint (Display menor em mobile)
- [ ] Nenhum elemento com overflow horizontal em mobile
- [ ] Imagens e mídia responsivas (`max-width: 100%`)
- [ ] Touch targets adequados em mobile

**Problemas encontrados:**

```
-
-
```

---

## 4. Dark Mode

- [ ] Todos os tokens têm mapeamento Dark Mode
- [ ] Testado com sistema em modo escuro
- [ ] Superfícies escuras não usam preto puro (#000)
- [ ] Elevação em Dark Mode aumenta luminosidade via Surface Tint
- [ ] Todos os estados (hover, focus, error) visíveis em Dark Mode
- [ ] Imagens e ícones visíveis em ambos os modos

**Problemas encontrados:**

```
-
-
```

---

## 5. Estados de UI

- [ ] **Loading**: spinner ou skeleton em todos os carregamentos assíncronos
- [ ] **Empty**: ilustração + texto descritivo + CTA quando aplicável
- [ ] **Error**: mensagem clara + ação de retry quando aplicável
- [ ] **Success**: feedback positivo após ação concluída
- [ ] **Disabled**: componentes bloqueados com `opacity: 38%` e sem interação
- [ ] **Hover / Focus / Pressed**: state layers corretos por componente

**Problemas encontrados:**

```
-
-
```

---

## 6. Consistência

- [ ] Ações iguais têm o mesmo componente em todas as telas
- [ ] Hierarquia visual consistente entre telas equivalentes
- [ ] Iconografia: mesmo conjunto de ícones (Material Symbols)
- [ ] Linguagem textual consistente (labels, mensagens de erro, tooltips)
- [ ] Espaçamento e alinhamento consistentes entre componentes similares

**Problemas encontrados:**

```
-
-
```

---

## 7. Token Coverage

- [ ] Nenhum valor de cor sem token
- [ ] Nenhum valor de tipografia sem token
- [ ] Nenhum valor de shape sem token
- [ ] Tokens organizados em Reference → System → Component
- [ ] Tokens exportáveis em JSON compatível com Style Dictionary

**Problemas encontrados:**

```
-
-
```

---

## Score Final

| Dimensão               | Nota (0–10) | Comentário |
|------------------------|-------------|------------|
| Material Compliance    |             |            |
| Acessibilidade         |             |            |
| Responsividade         |             |            |
| Dark Mode              |             |            |
| Estados de UI          |             |            |
| Consistência           |             |            |
| Token Coverage         |             |            |
| **Overall**            |             |            |

---

## Problemas Priorizados

Liste os problemas por impacto (Alto / Médio / Baixo):

| Prioridade | Problema                          | Componente / Tela | Correção sugerida          |
|------------|-----------------------------------|-------------------|----------------------------|
| Alto       |                                   |                   |                            |
| Alto       |                                   |                   |                            |
| Médio      |                                   |                   |                            |
| Médio      |                                   |                   |                            |
| Baixo      |                                   |                   |                            |

---

## Próximos Passos

```
1.
2.
3.
```

---

## Notas Adicionais

```

```
