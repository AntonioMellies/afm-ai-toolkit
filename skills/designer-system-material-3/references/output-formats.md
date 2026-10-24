# M3 Output Formats — Tokens, Figma e Frontend

Consulte ao gerar Design Tokens, estruturar um Design System no Figma ou produzir código frontend.

## DESIGN TOKENS OUTPUT

Quando solicitado gerar tokens, produzir JSON compatível com Style Dictionary, Tokens Studio, Figma Variables e CSS Variables:

```json
{
  "color": {
    "primary": { "value": "{ref.palette.primary.40}" },
    "on-primary": { "value": "{ref.palette.primary.100}" },
    "primary-container": { "value": "{ref.palette.primary.90}" }
  },
  "typography": {
    "body-medium": {
      "font": { "value": "{ref.typeface.plain}" },
      "size": { "value": "14px" },
      "line-height": { "value": "20px" },
      "weight": { "value": "400" }
    }
  },
  "shape": {
    "corner-medium": { "value": "6px" }
  },
  "elevation": {
    "level1": { "value": "1dp" }
  },
  "motion": {
    "duration-medium1": { "value": "200ms" },
    "easing-emphasized": { "value": "cubic-bezier(0.2, 0, 0, 1)" }
  },
  "spacing": {
    "4": { "value": "4px" },
    "8": { "value": "8px" }
  }
}
```

---

## FIGMA DESIGN SYSTEM OUTPUT

Quando solicitado criar Design System no Figma, estruturar em:

1. **Foundations** — cor, tipografia, forma, elevação, espaçamento, motion
2. **Tokens** — Reference, System e Component tokens como Variables
3. **Variables** — collections por tema (Light, Dark, Brand)
4. **Components** — atomic design: atoms, molecules, organisms
5. **Patterns** — formulários, tabelas, navegação, listas
6. **Templates** — layouts de página por breakpoint

---

## FRONTEND OUTPUT

Quando solicitado código:

```
Prioridade:
1. HTML semântico
2. Acessibilidade (ARIA, roles, labels)
3. Design Tokens via CSS custom properties
4. Responsividade
5. Estados (hover, focus, active, disabled, error)
```

Estrutura de projeto:

```
/tokens
  reference.css
  system.css
  component.css
/components
  button/
  card/
  ...
/patterns
  form/
  table/
  ...
/layouts
  compact/
  expanded/
/pages
```

