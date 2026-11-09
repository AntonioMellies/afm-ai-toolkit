# Acessibilidade mínima e testes de UI

Versão de referência: React 19.3, Next.js 16.4, WCAG 2.2. Fontes por regra em `fontes.md`. Itens marcados "convenção desta skill" são preferência da skill. Estética, contraste da paleta e tokens ficam com `designer-system-material-3` e `designer-system-material-3-enterprise-ux`; aqui está o mínimo que o código precisa garantir.

## 1. Acessibilidade mínima

### Semântica HTML primeiro

- Use o elemento nativo certo: `button` para ação, `a`/`Link` para navegação, `label` + `input` para campo, `h1`..`h6` em ordem lógica, `ul`/`li` para lista, `nav`, `main`, `header`.
- Role ARIA é uma promessa: `role="button"` em `div` exige que você também implemente teclado e comportamento. Ordem de preferência: elemento nativo, depois ARIA só quando não existe equivalente. ARIA incorreto atrapalha mais do que ajuda quem usa leitor de tela.
- Estrutura e relações visíveis (título, lista, rótulo do campo) precisam existir no HTML (WCAG 1.3.1, nível A).
- Todo componente interativo precisa de nome, papel e estado conhecidos por tecnologia assistiva (WCAG 4.1.2, A).
- Imagem informativa tem `alt`; decorativa tem `alt=""` (WCAG 1.1.1, A). A parte do `alt=""` é convenção desta skill.
- Declare o idioma no `<html lang="pt-BR">`. O exemplo de layout da documentação usa `lang="en"`; ajuste ao idioma do produto (convenção desta skill).

```tsx
// Evite
<div onClick={salvar}>Salvar</div>

// Prefira
<button type="button" onClick={salvar}>Salvar</button>
```

### Formulários

- Todo campo tem `label` associado (`htmlFor` + `id`). Placeholder não substitui rótulo (WCAG 3.3.2, A: rótulos ou instruções onde há entrada).
- Erro identificado e descrito em texto (WCAG 3.3.1, A), não só por cor ou ícone. Associe ao campo com `aria-describedby` (convenção desta skill).
- Mensagens de status (sucesso, erro de envio) em região com `aria-live="polite"`, para serem anunciadas sem mover o foco (WCAG 4.1.3, AA).
- Informação já digitada não deve ser pedida de novo no mesmo processo (WCAG 3.3.7, A).

### Teclado e foco

- Todo o fluxo funciona só com teclado (WCAG 2.1.1, A) e o foco nunca fica preso (2.1.2, A).
- Ordem de foco segue a ordem visual e lógica (2.4.3, A); o foco é sempre visível (2.4.7, AA); o componente focado não fica totalmente escondido por conteúdo do autor, como cabeçalho fixo (2.4.11, AA).
- `tabindex="0"` põe o elemento na sequência de Tab; `tabindex="-1"` permite foco por código mas fora do Tab; evite valores positivos.
- Algo deve sempre ter o foco. Ao fechar diálogo ou remover item, mova o foco para elemento lógico.
- Widgets compostos (menu, abas, lista) usam setas dentro do widget e um só item na sequência de Tab (tabindex "roving" ou `aria-activedescendant`). Se o design system ou uma biblioteca de componentes já entrega isso, use-o em vez de reescrever.
- Não remova o contorno de foco do navegador sem substituto de contraste claro.

### Contraste e alvo de toque

- Texto: contraste mínimo 4,5:1 (3:1 para texto grande: 18pt, ou 14pt em negrito) (1.4.3, AA). Componentes de interface e gráficos necessários: 3:1 (1.4.11, AA).
- Alvos de ponteiro com pelo menos 24 por 24 pixels CSS, com exceções (2.5.8, AA).
- Os valores concretos vêm dos tokens do design system; aqui você apenas verifica o resultado.

### Verificação manual mínima (convenção desta skill)

1. Navegue a tela inteira só com Tab, Shift+Tab, Enter, Espaço e setas.
2. O foco aparece em todo elemento interativo? A ordem faz sentido?
3. Envie o formulário com erro: a mensagem aparece, está ligada ao campo e foi anunciada?
4. Aplique zoom de 200% e confira se nada some ou se sobrepõe.
5. Teste com leitor de tela uma vez nos fluxos críticos. Teste automatizado de acessibilidade não substitui isso.

## 2. Testes de UI: estratégia

| Tipo | Ferramenta | Use para |
|---|---|---|
| Componente (síncrono) | Vitest ou Jest + Testing Library | Comportamento visível de um componente cliente ou síncrono |
| Fluxo ponta a ponta | Playwright | Jornadas (cadastro, filtro, erro), componentes `async` de servidor, integração real |

- Vitest e Jest não suportam Server Components `async`. A documentação recomenda teste ponta a ponta nesses casos. Componentes de servidor síncronos e de cliente podem ser testados em unidade.
- Pirâmide sugerida (convenção desta skill): poucos testes ponta a ponta nos fluxos que geram valor, mais testes de componente nas regras de interação (validação, estados, filtros).
- Teste comportamento que o usuário percebe, não estado interno nem nomes de função.

## 3. Testing Library

Princípio: quanto mais os testes se parecem com o uso real do software, mais confiança dão. Trabalhe com o DOM e com o que o usuário vê, não com instâncias de componente.

### Prioridade de consultas

1. Acessíveis a todos: `getByRole` (com `name`), `getByLabelText` (campos de formulário), `getByPlaceholderText`, `getByText`, `getByDisplayValue`.
2. Semânticas: `getByAltText`, `getByTitle` (com cuidado, leitores de tela tratam `title` de forma inconsistente).
3. `getByTestId` só quando papel e texto não servem (por exemplo, texto dinâmico).

Se `getByRole` não encontra o elemento, a UI pode estar inacessível: corrija o componente antes de contornar o teste.

### Variantes

| Consulta | Retorno | Quando |
|---|---|---|
| `getBy...` | 1 elemento, lança se 0 ou mais de 1 | O elemento deve existir |
| `queryBy...` | elemento ou `null` | Afirmar que NÃO existe |
| `findBy...` | Promise que repete até aparecer (padrão 1000 ms) | Aparece de forma assíncrona após uma ação |

Para vários elementos: `getAllBy`, `queryAllBy`, `findAllBy`.

### `userEvent`

Prefira `userEvent` a `fireEvent`: simula a sequência completa de eventos de uma interação. Chame `userEvent.setup()` dentro do teste, antes de `render`, e use `await` nas ações.

### Exemplo (Vitest, componente cliente)

Componente (exemplo original):

```tsx
// app/clientes/filtro-local.tsx
'use client'
import { useState } from 'react'

export function FiltroLocal({ nomes }: { nomes: string[] }) {
  const [busca, setBusca] = useState('')
  const visiveis = nomes.filter((n) => n.toLowerCase().includes(busca.toLowerCase())) // derivado, não estado
  return (
    <div>
      <label htmlFor="busca">Buscar cliente</label>
      <input id="busca" value={busca} onChange={(e) => setBusca(e.target.value)} />
      {visiveis.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <ul>
          {visiveis.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

Teste:

```tsx
// __tests__/filtro-local.test.tsx
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FiltroLocal } from '../app/clientes/filtro-local'

test('filtra pelo texto digitado e mostra estado vazio', async () => {
  const user = userEvent.setup()
  render(<FiltroLocal nomes={['Ana', 'Bruno']} />)

  await user.type(screen.getByLabelText('Buscar cliente'), 'bru')
  expect(screen.getByRole('listitem')).toBeDefined() // só "Bruno"
  expect(screen.queryByText('Ana')).toBeNull()

  await user.clear(screen.getByLabelText('Buscar cliente'))
  await user.type(screen.getByLabelText('Buscar cliente'), 'zzz')
  expect(screen.getByText('Nenhum cliente encontrado.')).toBeDefined()
})
```

Configuração (do guia de Vitest da documentação do Next.js): dependências de desenvolvimento `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths`, mais `@testing-library/user-event` para este exemplo, e um `vitest.config.mts` com `plugins: [tsconfigPaths(), react()]` e `test: { environment: 'jsdom' }`. Script `"test": "vitest"`. Para os matchers `toBeInTheDocument` e semelhantes, o guia de Jest usa `@testing-library/jest-dom` importado em um arquivo de setup (`setupFilesAfterEnv`); no Vitest, confira a documentação do pacote antes de configurar. Em Jest, a documentação usa `next/jest` em `jest.config.ts`.

O exemplo acima foi escrito para esta skill: rode-o no projeto para confirmar antes de tomá-lo como verdade.

### O que não testar na unidade

- Que o `useState` mudou: teste o efeito visível.
- Componente de servidor `async`: use Playwright.
- Chamada real de Server Action em teste de unidade: isole a lógica de negócio em função testável (convenção desta skill), ou cubra no ponta a ponta.

## 4. Playwright (ponta a ponta)

- Instalação: `npm init playwright` (ou equivalente) cria `playwright.config.ts`.
- Rode contra o código de produção: `npm run build`, `npm run start` e depois `npx playwright test`. Alternativa documentada: `webServer` no config para o Playwright subir o servidor de desenvolvimento.
- Localizadores na ordem de preferência: `getByRole` com nome, `getByLabel`, `getByText`, e por último `getByTestId`. Evite CSS e XPath. Ações e `expect` esperam automaticamente (auto-wait).
- Use `baseURL` no config para `page.goto('/')`.

```ts
// tests/cadastro-cliente.spec.ts (exemplo original)
import { test, expect } from '@playwright/test'

test('mostra erros de validação e depois cadastra', async ({ page }) => {
  await page.goto('/clientes/novo')

  await page.getByRole('button', { name: 'Cadastrar' }).click()
  await expect(page.getByText('Informe ao menos 3 caracteres.')).toBeVisible()

  await page.getByLabel('Nome').fill('Ana Souza')
  await page.getByLabel('E-mail').fill('ana@exemplo.com')
  await page.getByRole('button', { name: 'Cadastrar' }).click()

  await expect(page).toHaveURL(/\/clientes$/)
  await expect(page.getByText('Ana Souza')).toBeVisible()
})
```

- Cubra por fluxo: caminho feliz, erro de validação, estado vazio e permissão negada. Use dados de teste isolados (convenção desta skill).
- Com Cache Components, o auxiliar `instant()` de `@next/playwright` verifica o que aparece logo após a navegação, antes do conteúdo dinâmico chegar. Veja o guia de navegação instantânea do Next.js da versão instalada.

## 5. Checklist de revisão

- [ ] Elementos nativos em vez de `div` clicável? Todo campo com `label`?
- [ ] Erros em texto, ligados ao campo, e status anunciado em `aria-live`?
- [ ] Fluxo completo só com teclado, foco visível, sem armadilha de foco?
- [ ] Contraste 4,5:1 / 3:1 e alvos de 24 por 24 px conferidos contra os tokens?
- [ ] Testes de componente consultam por papel, depois rótulo, depois texto?
- [ ] Componentes `async` de servidor cobertos por Playwright, não por Vitest ou Jest?
- [ ] Playwright roda contra `build` + `start` na CI?
