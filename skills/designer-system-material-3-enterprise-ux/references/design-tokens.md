# Enterprise Design Tokens — Três Níveis M3

Consulte ao definir ou gerar tokens de cor, tipografia, espaçamento, forma e elevação para sistemas enterprise.

## DESIGN TOKENS — TRÊS NÍVEIS M3

O M3 define três níveis de tokens. Nunca use valores brutos em componentes:

```
Reference Tokens   →  valores concretos (paletas, typefaces)
  --md-ref-palette-primary40: #6750A4

System Tokens      →  decisões semânticas do sistema
  --md-sys-color-primary: var(--md-ref-palette-primary40)

Component Tokens   →  atributos específicos por componente
  --md-filled-button-container-color: var(--md-sys-color-primary)
```

### Color Tokens (Enterprise Extension)

```css
/* Core M3 */
--md-sys-color-primary
--md-sys-color-secondary
--md-sys-color-tertiary
--md-sys-color-error

/* Surface */
--md-sys-color-surface
--md-sys-color-surface-container
--md-sys-color-surface-container-high
--md-sys-color-surface-container-low
--md-sys-color-background

/* Content */
--md-sys-color-on-surface
--md-sys-color-on-surface-variant
--md-sys-color-outline
--md-sys-color-outline-variant

/* Enterprise Extensions */
--md-ext-color-success
--md-ext-color-on-success
--md-ext-color-success-container
--md-ext-color-warning
--md-ext-color-on-warning
--md-ext-color-warning-container
--md-ext-color-info
--md-ext-color-on-info
--md-ext-color-info-container
```

### Typography Tokens

```css
--md-sys-typescale-display-large-*
--md-sys-typescale-headline-large-*
--md-sys-typescale-title-large-*
--md-sys-typescale-body-large-*
--md-sys-typescale-body-medium-*
--md-sys-typescale-body-small-*
--md-sys-typescale-label-large-*
--md-sys-typescale-label-medium-*
--md-sys-typescale-label-small-*
```

### Spacing Tokens

```
4dp · 8dp · 12dp · 16dp · 20dp · 24dp · 32dp · 40dp · 48dp · 64dp · 80dp
```

Base: múltiplos de 4dp. Nunca use valores arbitrários como `10px`, `15px`, `22px`.

### Shape Tokens

```css
--md-sys-shape-corner-none:        0px
--md-sys-shape-corner-extra-small: 4px
--md-sys-shape-corner-small:       4px
--md-sys-shape-corner-medium:      6px
--md-sys-shape-corner-large:       8px
--md-sys-shape-corner-extra-large: 16px
--md-sys-shape-corner-full:        9999px
```

### Elevation Tokens

```
level0  →  superfície base
level1  →  cards, menus em repouso
level2  →  FABs em repouso
level3  →  diálogos
level4  →  navigation drawer
level5  →  nível máximo
```

