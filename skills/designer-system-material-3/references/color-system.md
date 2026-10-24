# M3 Color System — Papéis, Paletas e Dynamic Color

Consulte ao definir, revisar ou gerar tokens de cor M3.

## COLOR SYSTEM

### Papéis de Cor — System Tokens

```css
/* Primary */
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-primary-container
--md-sys-color-on-primary-container

/* Secondary */
--md-sys-color-secondary
--md-sys-color-on-secondary
--md-sys-color-secondary-container
--md-sys-color-on-secondary-container

/* Tertiary */
--md-sys-color-tertiary
--md-sys-color-on-tertiary
--md-sys-color-tertiary-container
--md-sys-color-on-tertiary-container

/* Error */
--md-sys-color-error
--md-sys-color-on-error
--md-sys-color-error-container
--md-sys-color-on-error-container

/* Surface */
--md-sys-color-surface
--md-sys-color-on-surface
--md-sys-color-on-surface-variant
--md-sys-color-surface-variant
--md-sys-color-surface-bright
--md-sys-color-surface-dim
--md-sys-color-surface-container
--md-sys-color-surface-container-low
--md-sys-color-surface-container-lowest
--md-sys-color-surface-container-high
--md-sys-color-surface-container-highest

/* Background */
--md-sys-color-background
--md-sys-color-on-background

/* Outline */
--md-sys-color-outline
--md-sys-color-outline-variant

/* Inverse */
--md-sys-color-inverse-surface
--md-sys-color-inverse-on-surface
--md-sys-color-inverse-primary
```

Regra obrigatória: todo token de cor tem um correspondente `on-*` para garantir contraste.

### Paletas Tonais — Reference Tokens

Escala de tonalidade: `0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100`

```
Primary Palette      →  --md-ref-palette-primary{tonal}
Secondary Palette    →  --md-ref-palette-secondary{tonal}
Tertiary Palette     →  --md-ref-palette-tertiary{tonal}
Neutral Palette      →  --md-ref-palette-neutral{tonal}
Neutral Variant      →  --md-ref-palette-neutral-variant{tonal}
Error Palette        →  --md-ref-palette-error{tonal}
```

### Extensões Semânticas (SaaS/Enterprise)

```css
/* Não fazem parte do M3 core, mas são práticas recomendadas */
--md-sys-color-success
--md-sys-color-on-success
--md-sys-color-success-container
--md-sys-color-warning
--md-sys-color-on-warning
--md-sys-color-warning-container
--md-sys-color-info
--md-sys-color-on-info
--md-sys-color-info-container
```

### Dynamic Color (Material You)

Sempre que possível, suporte Material You:
- Gerar esquema de cores a partir de `@material/material-color-utilities`
- Adaptar tema ao wallpaper/preferência do usuário
- Manter contraste em todos os modos gerados
- Usar Material Theme Builder (Figma plugin) para prototipagem

