# M3 Color Tokens — Referência Completa

Referência de todos os tokens de cor do Material Design 3 com CSS custom properties.

---

## Hierarquia de Tokens

```
Reference Tokens  →  valores concretos (paletas tonais)
System Tokens     →  papéis semânticos do sistema
Component Tokens  →  propriedades específicas de cada componente
```

---

## System Color Tokens

### Primary

| Token CSS                              | Uso                                    |
|----------------------------------------|----------------------------------------|
| `--md-sys-color-primary`               | Componentes de ação principal          |
| `--md-sys-color-on-primary`            | Conteúdo sobre Primary                 |
| `--md-sys-color-primary-container`     | Containers de destaque primário        |
| `--md-sys-color-on-primary-container`  | Conteúdo sobre Primary Container       |
| `--md-sys-color-primary-fixed`         | Primary fixo (independe do tema)       |
| `--md-sys-color-primary-fixed-dim`     | Primary fixo, versão mais escura       |
| `--md-sys-color-on-primary-fixed`      | Conteúdo sobre Primary Fixed           |
| `--md-sys-color-on-primary-fixed-variant` | Variante de conteúdo sobre Fixed    |

### Secondary

| Token CSS                               | Uso                                    |
|-----------------------------------------|----------------------------------------|
| `--md-sys-color-secondary`              | Ações e elementos secundários          |
| `--md-sys-color-on-secondary`           | Conteúdo sobre Secondary               |
| `--md-sys-color-secondary-container`    | Containers secundários                 |
| `--md-sys-color-on-secondary-container` | Conteúdo sobre Secondary Container     |

### Tertiary

| Token CSS                               | Uso                                    |
|-----------------------------------------|----------------------------------------|
| `--md-sys-color-tertiary`               | Contraste e acento terciário           |
| `--md-sys-color-on-tertiary`            | Conteúdo sobre Tertiary                |
| `--md-sys-color-tertiary-container`     | Containers de acento                   |
| `--md-sys-color-on-tertiary-container`  | Conteúdo sobre Tertiary Container      |

### Error

| Token CSS                            | Uso                                    |
|--------------------------------------|----------------------------------------|
| `--md-sys-color-error`               | Estados de erro e validação            |
| `--md-sys-color-on-error`            | Conteúdo sobre Error                   |
| `--md-sys-color-error-container`     | Containers de erro                     |
| `--md-sys-color-on-error-container`  | Conteúdo sobre Error Container         |

### Surface

| Token CSS                                     | Uso                                     |
|-----------------------------------------------|-----------------------------------------|
| `--md-sys-color-surface`                      | Superfície base de componentes          |
| `--md-sys-color-on-surface`                   | Conteúdo sobre Surface                  |
| `--md-sys-color-on-surface-variant`           | Conteúdo secundário sobre Surface       |
| `--md-sys-color-surface-variant`              | Variante de superfície para containers  |
| `--md-sys-color-surface-bright`               | Superfície mais clara                   |
| `--md-sys-color-surface-dim`                  | Superfície mais escura                  |
| `--md-sys-color-surface-container`            | Container neutro padrão                 |
| `--md-sys-color-surface-container-low`        | Container com menos ênfase              |
| `--md-sys-color-surface-container-lowest`     | Container mínimo (quase background)     |
| `--md-sys-color-surface-container-high`       | Container com mais ênfase               |
| `--md-sys-color-surface-container-highest`    | Container máximo                        |

### Background e Outline

| Token CSS                            | Uso                                    |
|--------------------------------------|----------------------------------------|
| `--md-sys-color-background`          | Plano de fundo da página               |
| `--md-sys-color-on-background`       | Conteúdo sobre Background              |
| `--md-sys-color-outline`             | Bordas e divisores com ênfase          |
| `--md-sys-color-outline-variant`     | Bordas e divisores sutis               |

### Inverse e Scrim

| Token CSS                            | Uso                                      |
|--------------------------------------|------------------------------------------|
| `--md-sys-color-inverse-surface`     | Superfície invertida (snackbar)          |
| `--md-sys-color-inverse-on-surface`  | Conteúdo sobre Inverse Surface           |
| `--md-sys-color-inverse-primary`     | Primary invertido (sobre inverse surface)|
| `--md-sys-color-scrim`               | Overlay semitransparente (modais, sheets)|
| `--md-sys-color-shadow`              | Sombra de elevação (nível 0 = no shadow) |

---

## Reference Palette Tokens

Escala tonal: `0 · 10 · 20 · 30 · 40 · 50 · 60 · 70 · 80 · 90 · 95 · 99 · 100`

```css
/* Exemplo com Primary Palette */
--md-ref-palette-primary0:   #000000
--md-ref-palette-primary10:  #21005D
--md-ref-palette-primary20:  #381E72
--md-ref-palette-primary30:  #4F378B
--md-ref-palette-primary40:  #6750A4  /* → sys.color.primary (Light) */
--md-ref-palette-primary50:  #7F67BE
--md-ref-palette-primary60:  #9A82DB
--md-ref-palette-primary70:  #B69DF8
--md-ref-palette-primary80:  #D0BCFF  /* → sys.color.primary (Dark) */
--md-ref-palette-primary90:  #EADDFF  /* → sys.color.primary-container (Light) */
--md-ref-palette-primary95:  #F6EEFF
--md-ref-palette-primary99:  #FFFBFE
--md-ref-palette-primary100: #FFFFFF

/* Typeface reference */
--md-ref-typeface-brand: 'Roboto Flex', sans-serif;
--md-ref-typeface-plain: 'Roboto', sans-serif;
```

---

## Mapeamento Light vs Dark

| Papel                  | Light (Tonal)   | Dark (Tonal)    |
|------------------------|-----------------|-----------------|
| `primary`              | primary40       | primary80       |
| `on-primary`           | primary100      | primary20       |
| `primary-container`    | primary90       | primary30       |
| `on-primary-container` | primary10       | primary90       |
| `surface`              | neutral99       | neutral10       |
| `on-surface`           | neutral10       | neutral90       |
| `background`           | neutral99       | neutral10       |
| `outline`              | neutral-variant50 | neutral-variant60 |

---

## Extensões Semânticas (Enterprise/SaaS)

Não fazem parte do core M3, mas são extensões práticas para sistemas corporativos:

```css
/* Success */
--md-ext-color-success:               #1B6B3A;
--md-ext-color-on-success:            #FFFFFF;
--md-ext-color-success-container:     #A8F5C0;
--md-ext-color-on-success-container:  #00210E;

/* Warning */
--md-ext-color-warning:               #795900;
--md-ext-color-on-warning:            #FFFFFF;
--md-ext-color-warning-container:     #FFDEAA;
--md-ext-color-on-warning-container:  #271900;

/* Info */
--md-ext-color-info:                  #006495;
--md-ext-color-on-info:               #FFFFFF;
--md-ext-color-info-container:        #C8E6FF;
--md-ext-color-on-info-container:     #001E2F;
```

---

## Como Gerar Esquemas com Material Color Utilities

```bash
npm install @material/material-color-utilities
```

```typescript
import { argbFromHex, themeFromSourceColor, applyTheme } from '@material/material-color-utilities';

const theme = themeFromSourceColor(argbFromHex('#6750A4'));

// Aplicar tema ao documento
applyTheme(theme, { target: document.body, dark: false });
```

---

## Como Gerar via Figma

1. Instalar plugin **Material Theme Builder** no Figma
2. Definir cor-fonte (source color) da marca
3. Exportar Variables como JSON
4. Importar no Style Dictionary ou Tokens Studio

---

## Checklist de Conformidade de Cores

- [ ] Nenhum valor hexadecimal hardcoded no código de componentes
- [ ] Todos os pares cor/on-cor verificados com contraste WCAG (4.5:1 texto, 3:1 UI)
- [ ] Surface containers usados em vez de `background` para cards e panéis
- [ ] Extensões semânticas (success/warning/info) seguem o mesmo padrão `color + on-color + container + on-container`
- [ ] Dark Mode mapeado para todos os papéis de cor
- [ ] `scrim` aplicado em overlays de modais e bottom sheets
- [ ] `outline-variant` usado para divisores sutis, `outline` para bordas com ênfase
