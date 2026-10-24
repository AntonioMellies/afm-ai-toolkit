# M3 Component Map — Guia de Seleção de Componentes

Use este guia para escolher o componente Material Design 3 correto para cada contexto.

---

## Actions — Botões e FABs

| Contexto                                     | Componente correto               | Por quê                                      |
|----------------------------------------------|----------------------------------|----------------------------------------------|
| Ação principal da tela (mobile/tablet)        | FAB / Extended FAB               | Alta visibilidade, ação global               |
| Ação primária em formulário ou dialog         | Filled Button                    | Máxima ênfase visual                         |
| Ação secundária com destaque                  | Filled Tonal Button              | Ênfase média, menos dominante que Filled     |
| Ação secundária sem destaque                  | Outlined Button                  | Ênfase baixa, claro e sutil                  |
| Ação terciária ou link                        | Text Button                      | Ênfase mínima                                |
| Ação com elevação explícita                   | Elevated Button                  | Destaque em superfície plana                 |
| Ação compacta sobre conteúdo                  | Icon Button                      | Sem rótulo, contexto visual suficiente       |
| Seleção exclusiva entre 2–5 opções            | Segmented Button                 | Substitui radio em contextos de toggle       |
| Ação principal + menu de variantes            | Split Button                     | Combina ação e escolha de variante           |

### Hierarquia de ênfase de botões (mais → menos)
```
FAB Extended > FAB > Filled > Tonal > Elevated > Outlined > Text > Icon
```

---

## Navigation — Por Breakpoint

| Breakpoint         | Componente           | Itens        | Comportamento                              |
|--------------------|----------------------|--------------|---------------------------------------------|
| Compact (0–599px)  | Navigation Bar       | 3–5           | Fixo na base, ícone + rótulo opcional       |
| Medium (600–839px) | Navigation Rail      | 3–7           | Lateral esquerda, ícones com rótulos        |
| Expanded (840px+)  | Navigation Drawer    | Ilimitado     | Permanent ou modal, com grupos e sub-itens  |

**Regra de ouro:** nunca use Navigation Bar em desktop sem adaptação.

### Navigation Drawer — Variantes
- **Permanent Drawer**: sempre visível, para desktop com sidebar fixa
- **Modal Drawer**: sobrepõe o conteúdo, fecha ao clicar fora (tablet/desktop)
- **Bottom Sheet** como navigation drawer em mobile não é padrão M3

---

## Communication — Feedback e Notificações

| Situação                                           | Componente        | Duração / Interação                         |
|----------------------------------------------------|-------------------|----------------------------------------------|
| Confirmação de ação destruidora                    | Dialog            | Modal, requer ação do usuário                |
| Informação crítica antes de continuar              | Dialog            | Modal, requer ação do usuário                |
| Feedback de ação concluída (sem ação do usuário)   | Snackbar          | Auto-dismiss 4s, 1 ação opcional             |
| Ajuda contextual ao hover/focus                    | Tooltip           | Aparece ao hover, sumiu ao mover cursor      |
| Contagem de notificações não lidas                 | Badge             | Sobre ícone de navigation ou avatar          |
| Processo em andamento (duração indeterminada)      | Circular Progress | Spinner sem valor fixo                       |
| Upload / Download com progresso mensurável         | Linear Progress   | Barra com percentual                         |

**Evite:** usar Dialog para feedback simples que um Snackbar resolveria.

---

## Selection — Escolha de Opções

| Caso de uso                                          | Componente        | Quando usar                                        |
|------------------------------------------------------|-------------------|----------------------------------------------------|
| Aceitar/rejeitar uma opção (independente)            | Checkbox          | Multi-seleção, cada item independente              |
| Escolher UMA entre N opções                          | Radio Button      | Mútuo exclusivo dentro de um grupo                 |
| Ativar/desativar uma configuração                    | Switch            | Estado binário com efeito imediato                 |
| Filtrar conteúdo por categoria                       | Filter Chip       | Seleção persistente de filtros                     |
| Adicionar entidades em campos (ex: tags)             | Input Chip        | Tags editáveis, removíveis                         |
| Sugestões rápidas de ação                            | Suggestion Chip   | Ações de IA ou quick-reply                         |
| Ações relacionadas ao contexto atual                 | Assist Chip       | Atalhos contextuais                                |
| Seleção contínua de valor numérico                   | Slider            | Volume, brilho, range de preços                    |
| Escolha rápida entre 2–5 opções exclusivas           | Segmented Button  | Alternativa a Radio em toolbars e filtros          |

---

## Inputs — Formulários

| Campo                              | Componente              | Observações                                    |
|------------------------------------|-------------------------|------------------------------------------------|
| Texto livre, linha única           | Outlined Text Field     | Preferir Outlined para formulários explícitos  |
| Texto livre, aparência integrada   | Filled Text Field       | Preferir Filled dentro de cards ou toolbars    |
| Pesquisa global / contextual       | Search (Search Bar)     | Com sugestões ou resultados inline             |
| Data específica                    | Date Picker             | Dialog ou docked, com formatação regional      |
| Hora                               | Time Picker             | Dial ou teclado                                |
| Seleção de uma opção de lista      | Select (Outlined/Filled)| Não usar custom dropdown sem acessibilidade    |

**Regra de formulário:** label sempre visível. Placeholder apenas como dica adicional, nunca substituto de label.

---

## Containment — Organização de Conteúdo

| Uso                                          | Componente           | Variante recomendada                           |
|----------------------------------------------|----------------------|------------------------------------------------|
| Agrupar conteúdo relacionado com hierarquia   | Card                 | Elevated para destaque, Filled para neutro     |
| Listar itens com suporte a ação / navegação   | List                 | Com leading icon, trailing, ou meta            |
| Separar seções visualmente                    | Divider              | Horizontal (entre seções) ou vertical (inline) |
| Conteúdo extra sem trocar de tela (mobile)    | Bottom Sheet         | Modal ou expanded                              |
| Painel lateral com detalhes (desktop/tablet)  | Side Sheet           | Modal ou permanent                             |
| Conteúdo extra em overlay (qualquer tela)     | Dialog               | Somente para interações críticas               |

**Evite:** usar Card para tudo. Listas são mais eficientes para contextos densos.

---

## App Bars

| Posição        | Componente       | Variante                    | Uso                                          |
|----------------|------------------|-----------------------------|----------------------------------------------|
| Topo           | Top App Bar      | Small / Center / Medium / Large | Navegação de volta, título, ações          |
| Fundo (mobile) | Bottom App Bar   | —                           | Ações frequentes + FAB                       |

**Regra:** Top App Bar com título Large ou Medium para telas de conteúdo. Small para navegação aninhada.

---

## Tabs

| Uso                                       | Variante           | Posição                    |
|-------------------------------------------|--------------------|----------------------------|
| Navegação entre seções do mesmo nível     | Primary Tabs       | Abaixo do Top App Bar      |
| Sub-navegação dentro de uma seção         | Secondary Tabs     | Dentro do conteúdo         |

Máximo recomendado: 5 abas. Com mais opções, considerar Navigation Drawer ou filtros.

---

## Data-Heavy — CRM, ERP, Backoffice

| Necessidade                              | Componente / Padrão            |
|------------------------------------------|--------------------------------|
| Listagem com muitas colunas              | Data Table com ordenação       |
| Filtragem avançada                       | Filter Chips + Search + Drawer |
| Detalhes sem perder contexto             | Side Sheet ou Split Layout     |
| Ação em múltiplos itens                  | Checkbox + Contextual App Bar  |
| Carregamento de muitos registros         | Infinite Scroll ou Paginação   |
| Cabeçalhos de categoria em listas longas | Sticky Headers em List         |

---

## Estados Obrigatórios por Componente

Todo componente interativo deve ter os seguintes estados implementados:

| Estado    | CSS / Token                              | Descrição                              |
|-----------|------------------------------------------|----------------------------------------|
| Default   | —                                        | Estado padrão em repouso               |
| Hovered   | `:hover` + `state-layer` (8% on-surface) | Feedback ao passar o cursor            |
| Focused   | `:focus-visible` + Focus Ring            | Visível apenas via teclado             |
| Pressed   | `:active` + `state-layer` (12%)          | Feedback ao clicar/tocar               |
| Dragged   | `state-layer` (16%)                      | Ao arrastar o elemento                 |
| Disabled  | `opacity: 38%` + `pointer-events: none`  | Não disponível, sem interação          |
| Selected  | Fundo `primary-container`                | Item ativo em navigation, chip, tab    |
| Error     | Cor `error`, ícone de alerta             | Validação falhou                       |
| Loading   | Circular Progress                        | Aguardando resposta assíncrona         |
| Empty     | Ilustração + texto + CTA opcional        | Sem dados para exibir                  |

---

## Checklist de Seleção de Componente

Antes de usar qualquer componente, responder:

- [ ] Este é o componente M3 mais adequado para a ação/contexto?
- [ ] O componente está sendo usado no breakpoint correto?
- [ ] Todos os estados (hover, focus, error, disabled, loading, empty) estão implementados?
- [ ] A área de toque é de no mínimo 48×48dp?
- [ ] O componente possui label acessível (aria-label ou texto visível)?
- [ ] As cores usam exclusivamente System Tokens?
- [ ] O componente funciona em Light e Dark Mode?
