# Fontes e rastreabilidade

Esta skill não tem livro local. A base são páginas oficiais lidas em 2026-11-09. Todas as regras abaixo foram conferidas no texto retornado pelas páginas na data de acesso. Os exemplos de código foram escritos para esta skill, sem copiar os trechos da documentação.

Versões lidas:

- React 19.3 (página `https://react.dev/versions`: "Latest version: 19.3", lançada em 2026-09-09).
- Next.js 16.4 (blog em `https://nextjs.org/blog`, entrada "Next.js 16.4" de 2026-10-06, que cita React 19.3). O guia de upgrade e o histórico de versões das páginas citam 16.3 e 16.4.
- WCAG 2.2 (quick reference do W3C, filtro "WCAG 2.2").
- Requisitos lidos: Node.js 20.9 ou superior, TypeScript 5.1 ou superior (guia de instalação e de upgrade para a versão 16).

Legenda de data: coluna "Acesso" é sempre 2026-11-09. A coluna "Versão ou atualização" traz o campo `lastUpdated` da página quando ele existe.

## Regras com fonte

| Regra ou ponto da skill | URL | Seção | Versão ou atualização | Acesso | Citação curta |
|---|---|---|---|---|---|
| Layouts e páginas são Server Components por padrão; Client Component para interatividade | `https://nextjs.org/docs/app/getting-started/server-and-client-components` | When to use Server and Client Components | lastUpdated 2026-10-05 | 2026-11-09 | |
| Lista de quando usar cliente (estado, eventos, efeitos, APIs do navegador, hooks próprios) e servidor (dados, segredos, menos JS, FCP) | `https://nextjs.org/docs/app/getting-started/server-and-client-components` | When to use Server and Client Components | 2026-10-05 | 2026-11-09 | |
| `'use client'` marca fronteira; arquivo e imports vão ao bundle do cliente; server components passados como children não entram no grafo | `https://nextjs.org/docs/app/getting-started/server-and-client-components` | Using Client Components | 2026-10-05 | 2026-11-09 | |
| Marcar só o arquivo interativo (ex.: busca no layout) para reduzir JS | `https://nextjs.org/docs/app/getting-started/server-and-client-components` | Reducing JS bundle size | 2026-10-05 | 2026-11-09 | |
| Props para Client Components precisam ser serializáveis; promessa pode ser repassada e lida com `use` | `https://nextjs.org/docs/app/getting-started/server-and-client-components` | Passing data from Server to Client Components | 2026-10-05 | 2026-11-09 | |
| Padrão de slot com `children` para intercalar servidor dentro de cliente | `https://nextjs.org/docs/app/getting-started/server-and-client-components` | Interleaving Server and Client Components | 2026-10-05 | 2026-11-09 | |
| Context não é suportado em Server Components; provider em Client Component, o mais fundo possível | `https://nextjs.org/docs/app/getting-started/server-and-client-components` | Context providers | 2026-10-05 | 2026-11-09 | |
| Wrapper com `'use client'` para biblioteca de terceiros sem a diretiva | `https://nextjs.org/docs/app/getting-started/server-and-client-components` | Third-party components | 2026-10-05 | 2026-11-09 | |
| `server-only` quebra o build se importado no cliente; só `NEXT_PUBLIC_` vai ao cliente | `https://nextjs.org/docs/app/getting-started/server-and-client-components` | Preventing environment poisoning | 2026-10-05 | 2026-11-09 | |
| Server Components: sem `useState` e `useEffect`, sem contexto próprio; não há diretiva para Server Component; componentes `async` | `https://react.dev/reference/rsc/server-components` | What they can and cannot do; Async components; Directives | React 19 | 2026-11-09 | |
| Hooks listados por categoria (estado, efeito, performance, outros) usados como vocabulário | `https://react.dev/reference/react/hooks` | Hooks por categoria | sem versão na página | 2026-11-09 | |
| Dados em Server Component com `fetch` ou ORM; `fetch` idêntico é memoizado; `fetch` não cacheado bloqueia o render | `https://nextjs.org/docs/app/getting-started/fetching-data` | Server Components; With the fetch API | lastUpdated 2026-09-01 | 2026-11-09 | |
| Autenticar e autorizar mesmo com ORM no servidor | `https://nextjs.org/docs/app/getting-started/fetching-data` | With an ORM or database | 2026-09-01 | 2026-11-09 | |
| `loading.js` e `Suspense` para streaming; layout com dado de runtime não usa o `loading.js` da pasta; fallback significativo | `https://nextjs.org/docs/app/getting-started/fetching-data` | Streaming; With loading.js; With Suspense; Creating meaningful loading states | 2026-09-01 | 2026-11-09 | |
| Cliente: `use` com promessa do servidor, ou SWR / React Query | `https://nextjs.org/docs/app/getting-started/fetching-data` | Client Components | 2026-09-01 | 2026-11-09 | |
| Requisições em paralelo com `Promise.all`; `Promise.allSettled` se falha parcial é aceitável; sequência só quando há dependência | `https://nextjs.org/docs/app/getting-started/fetching-data` | Sequential data fetching; Parallel data fetching | 2026-09-01 | 2026-11-09 | |
| `React.cache` para ORM compartilhar resultado na mesma requisição | `https://nextjs.org/docs/app/getting-started/fetching-data` | Reusing data with React.cache | 2026-09-01 | 2026-11-09 | |
| Cache Components: `'use cache'`, par com `cacheLife`, `Suspense` para uncached e runtime, valores de runtime passados como argumento, aleatório e horário exigem tratamento | `https://nextjs.org/docs/app/getting-started/caching` | Usage; Streaming uncached data; Working with runtime APIs; Random values and timestamps | lastUpdated 2026-10-06 | 2026-11-09 | |
| Projetos novos já vêm com Cache Components; sem ele, consultar o guia do modelo anterior | `https://nextjs.org/docs/app/getting-started/caching` | Enabling Cache Components; nota inicial | 2026-10-06; `https://nextjs.org/docs/app/getting-started/installation` 2026-10-02 | 2026-11-09 | |
| Route Handlers: `route.ts`, não coexiste com `page` no mesmo segmento, `GET` não cacheado por padrão | `https://nextjs.org/docs/app/getting-started/route-handlers` | Convention; Caching; Route Resolution | lastUpdated 2026-08-27 | 2026-11-09 | |
| `metadata` e `generateMetadata` só em Server Components; memoizar com `React.cache` | `https://nextjs.org/docs/app/getting-started/metadata-and-og-images` | Static metadata; Generated metadata; Memoizing data requests | lastUpdated 2026-08-25 | 2026-11-09 | |
| `params` e `searchParams` assíncronos (sempre `await`); `PageProps` via `next typegen` | `https://nextjs.org/docs/app/guides/upgrading/version-16` | Async Request APIs | lastUpdated 2026-11-06 | 2026-11-09 | |
| `revalidateTag` com dois argumentos; `updateTag` em Server Actions para leitura imediata; `refresh` | `https://nextjs.org/docs/app/guides/upgrading/version-16` | Caching APIs | 2026-11-06 | 2026-11-09 | |
| `refresh()` não revalida dados com tag | `https://nextjs.org/docs/app/getting-started/mutating-data` | Refresh data | lastUpdated 2026-10-15 | 2026-11-09 | |
| Server Function é assíncrona, chamada por rede; Server Action quando usada em mutação ou formulário; só POST; ações em formulário rodam em transição | `https://nextjs.org/docs/app/getting-started/mutating-data` | What are Server Functions? | 2026-10-15 | 2026-11-09 | "Always verify authentication and authorization inside every Server Function." |
| `'use server'` no topo do arquivo ou da função; Client Components importam ou recebem por prop; não definem actions | `https://nextjs.org/docs/app/getting-started/mutating-data` | Creating Server Functions; Client Components; Passing actions as props | 2026-10-15 | 2026-11-09 | |
| Formulário em Server Component funciona sem JS; em Client Component entra em fila e é priorizado na hidratação | `https://nextjs.org/docs/app/getting-started/mutating-data` | Server Components; Client Components | 2026-10-15 | 2026-11-09 | |
| Pendência com `useActionState`; `redirect` lança exceção e vem depois de revalidar; `revalidatePath`; cookies em action | `https://nextjs.org/docs/app/getting-started/mutating-data` | Showing a pending state; Revalidate data; Redirect after a mutation; Cookies | 2026-10-15 | 2026-11-09 | |
| Chamar Server Action em `useEffect` dentro de `startTransition` | `https://nextjs.org/docs/app/getting-started/mutating-data` | useEffect | 2026-10-15 | 2026-11-09 | |
| Formulário: `FormData`, `bind` para argumento extra, `hidden` vai em HTML sem codificação, validação no servidor com biblioteca de schema (Zod, Valibot), `useActionState` muda a assinatura da action, `aria-live` e `label`, `useFormStatus` em filho, `useOptimistic`, `formAction` em botões, `requestSubmit` | `https://nextjs.org/docs/app/guides/forms` | How it works; Passing additional arguments; Form validation; Validation errors; Pending states; Optimistic updates; Nested form elements; Programmatic form submission | lastUpdated 2026-10-06 | 2026-11-09 | |
| `<form action>` com função: recebe `FormData`, método POST, reinício de campos não controlados após a action, `defaultValue` para preservar, erro lançado vai ao error boundary | `https://react.dev/reference/react-dom/components/form` | Props e comportamento da action | sem versão na página | 2026-11-09 | |
| `useActionState` (estado anterior primeiro argumento, retorno `[estado, ação, pendente]`); preservar valores enviados com `defaultValue`; permalink e progressive enhancement | `https://react.dev/reference/react/useActionState` | Signature; Example; permalink | React 19 | 2026-11-09 | |
| Erros esperados como valor de retorno; `try/catch` e throw não são para esses; Server Component responde condicionalmente; `notFound` | `https://nextjs.org/docs/app/getting-started/error-handling` | Handling expected errors; Not found | lastUpdated 2026-10-15 | 2026-11-09 | |
| `error.tsx` é Client Component, captura erros de render; erros em handlers e async não são capturados (usar estado); `global-error` com `html` e `body` | `https://nextjs.org/docs/app/getting-started/error-handling` | Handling uncaught exceptions; Global errors | 2026-10-15 | 2026-11-09 | |
| Propriedade `retry` (estável na 16.3; `unstable_retry` na 16.2); `reset` só limpa o erro; `error` pode não ser `Error`; mensagem genérica no servidor em produção com `digest`; `error.js` não cobre o layout da mesma pasta | `https://nextjs.org/docs/app/api-reference/file-conventions/error` | Props; retry; reset; Version History | lastUpdated 2026-10-15 | 2026-11-09 | |
| `loading.tsx`: navegação imediata e interrompível; layouts seguem interativos; fallback prefetchado | `https://nextjs.org/docs/app/api-reference/file-conventions/loading` | Behavior | lastUpdated 2026-11-06 | 2026-11-09 | |
| Camada de acesso a dados (só servidor, autorização, DTO mínimo); escolher uma abordagem; props largas em Client Component expõem dados; `server-only`; taint é camada extra | `https://nextjs.org/docs/app/guides/data-security` | Data fetching approaches; Data Access Layer; Component-level data access; Tainting | lastUpdated 2026-10-06 | 2026-11-09 | |
| Actions alcançáveis por POST direto; autenticação e autorização dentro de cada action, incluindo propriedade do recurso (IDOR); validar entrada do cliente; retorno mínimo; limite de taxa; closures criptografadas, sem confiar só nisso; mutação nunca no render | `https://nextjs.org/docs/app/guides/data-security` | Mutating Data (todas as subseções); Validating client input; Controlling return values; Rate limiting; Closures and encryption; Avoiding side-effects during rendering | 2026-10-06 | 2026-11-09 | |
| Variáveis sem `NEXT_PUBLIC_` são só de servidor | `https://nextjs.org/docs/app/guides/data-security`; `https://nextjs.org/docs/app/getting-started/server-and-client-components` | Tainting (Good to know) | 2026-10-06 | 2026-11-09 | |
| `dangerouslySetInnerHTML`: HTML cru, risco de XSS, só com fonte confiável e sanitizada, objeto `__html` próximo da origem | `https://react.dev/reference/react-dom/components/common` | dangerouslySetInnerHTML | sem versão na página | 2026-11-09 | |
| Pensar em React: componentes, versão estática, estado mínimo, onde vive, fluxo inverso | `https://react.dev/learn/thinking-in-react` | Os cinco passos | sem versão na página | 2026-11-09 | |
| Cinco princípios de estrutura de estado; id em vez de cópia do objeto | `https://react.dev/learn/choosing-the-state-structure` | Principles for structuring state | sem versão na página | 2026-11-09 | |
| Descrever a UI por estados visuais; `key` reinicia estado; reducer e context | `https://react.dev/learn/managing-state` | Visão geral do capítulo | sem versão na página | 2026-11-09 | |
| Quando não usar efeito: derivar no render, `useMemo`, handlers, `key`, ajustar estado no render, cadeias, lifting state, dados do filho para o pai, `useSyncExternalStore`, inicializar app, cleanup contra corrida | `https://react.dev/learn/you-might-not-need-an-effect` | Seções 1 a 11 e resumo | sem versão na página | 2026-11-09 | |
| Efeito sincroniza com sistema externo; dependências; cleanup; Strict Mode executa setup, cleanup, setup; efeitos só no cliente | `https://react.dev/reference/react/useEffect` | Resumo da página | sem versão na página | 2026-11-09 | |
| Componentes e hooks puros; props e estado imutáveis; não chamar componente como função; regras dos hooks; lint e Strict Mode | `https://react.dev/reference/rules` | Rules of React | sem versão na página | 2026-11-09 | |
| `useSearchParams`: só cliente, somente leitura, `Suspense` exigido em página estática, `searchParams` da página em Server Component, layouts não recebem `searchParams`, atualizar com `router` ou `Link` | `https://nextjs.org/docs/app/api-reference/functions/use-search-params` | Returns; Prerendering; Server Components; Updating searchParams | lastUpdated 2026-11-06 | 2026-11-09 | |
| Tipos de teste; componentes `async` de servidor: preferir E2E | `https://nextjs.org/docs/app/guides/testing` | Types of tests; Async Server Components | lastUpdated 2026-02-03 | 2026-11-09 | "we recommend using End-to-End Testing over Unit Testing for async components." |
| Vitest: pacotes, `vitest.config.mts` com jsdom, script, exemplo com Testing Library, não suporta `async` Server Components | `https://nextjs.org/docs/app/guides/testing/vitest` | Manual Setup; first test | lastUpdated 2026-08-25 | 2026-11-09 | |
| Jest: `next/jest`, `jest-environment-jsdom`, `@testing-library/jest-dom` via `setupFilesAfterEnv`, não suporta `async` Server Components | `https://nextjs.org/docs/app/guides/testing/jest` | Manual setup; custom matchers | lastUpdated 2026-08-25 | 2026-11-09 | |
| Playwright: `npm init playwright`, rodar contra `build` + `start`, alternativa `webServer`, `baseURL`, `instant()` com Cache Components | `https://nextjs.org/docs/app/guides/testing/playwright` | Manual setup; first test; Running your Playwright tests | lastUpdated 2026-10-15 | 2026-11-09 | |
| Playwright: localizadores por papel, rótulo, texto e `testid` (nessa ordem); auto-wait; evitar CSS e XPath | `https://playwright.dev/docs/locators` | Locators | sem versão na página | 2026-11-09 | |
| Testing Library: testes parecidos com o uso real; DOM em vez de instâncias; uso centrado no usuário | `https://testing-library.com/docs/guiding-principles/` | Guiding principles | sem versão na página | 2026-11-09 | "The more your tests resemble the way your software is used, the more confidence they can give you." |
| Prioridade de consultas (papel, rótulo, placeholder, texto, display value, alt, title, testid); `getBy`, `queryBy`, `findBy` | `https://testing-library.com/docs/queries/about/` | Priority; Types of Queries | sem versão na página | 2026-11-09 | |
| `userEvent` em vez de `fireEvent`; `setup()` antes do `render`; ações com `await` | `https://testing-library.com/docs/user-event/intro` | Introdução | sem versão na página | 2026-11-09 | |
| WCAG 2.2 AA e A: 1.1.1, 1.3.1, 1.4.3 (4,5:1 e 3:1 para texto grande), 1.4.11 (3:1), 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11, 2.5.8 (24 por 24 px CSS), 3.3.1, 3.3.2, 3.3.7, 4.1.2, 4.1.3 | `https://www.w3.org/WAI/WCAG22/quickref/` | Critérios citados | WCAG 2.2 | 2026-11-09 | |
| Primeira regra de ARIA; role é promessa que exige comportamento e teclado; testar com tecnologias assistivas | `https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/` | Read Me First | sem versão na página | 2026-11-09 | "No ARIA is better than Bad ARIA." |
| Teclado: widgets ARIA exigem teclado implementado pelo autor; foco sempre visível; algo deve manter o foco; `tabindex` 0, -1 e valores positivos; roving tabindex; `aria-activedescendant` | `https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/` | Keyboard Interface | sem versão na página | 2026-11-09 | |

## Convenções desta skill (sem base direta nas páginas lidas)

- Mapeamento de onde cada tipo de dado vive, incluindo "filtros compartilháveis vão para a URL" e "dado do servidor não vira estado" (coerente com as páginas, mas formulado pela skill).
- Preferir conteúdo de JSX a HTML montado à mão para texto de usuário (a regra de escape automático do JSX não foi lida).
- Nomes e pastas (`data/`, DTOs, `ClienteResumo`), exemplos em português e a validação manual de formulário.
- Associar erro ao campo com `aria-describedby` e `aria-invalid`; `alt=""` para imagem decorativa; `lang` no `<html>` conforme o idioma do produto; roteiro de verificação manual de acessibilidade; zoom de 200%.
- Proporção de testes (poucos ponta a ponta, mais de componente); isolar lógica de negócio para teste de unidade; dados de teste isolados.
- Estados "vazio" distintos de "filtro sem resultado".
- CSP como camada adicional (a página de segurança lida lista o guia de CSP como leitura relacionada, sem detalhar).
- Nota de que o teste de exemplo em Vitest foi escrito para a skill e deve ser executado no projeto.

## Regras omitidas por falta de base lida

- API do Zod (a página de formulários mostra uma forma; a versão atual da biblioteca não foi conferida em zod.dev, então a skill usa validação manual e cita Zod e Valibot só pelo nome).
- Configuração dos matchers do `@testing-library/jest-dom` no Vitest (lida só para Jest).
- Escape automático de texto em JSX e URLs com esquema perigoso: não foram lidos em página específica, então não há regra sobre eles.
- Detalhes de autenticação (sessão, JWT), CSP, internacionalização, imagens e fontes.
- React Compiler: citado no guia de upgrade como opcional, sem regra na skill.
- Páginas de referência do React para `use`, `useOptimistic` e `useFormStatus` não foram abertas; o uso descrito vem das páginas do Next.js listadas acima.

## Uso de repositório de referência

Opcional pelo pedido: foi lido o README de `vercel-labs/agent-skills` (via página bruta do GitHub) apenas como referência de estrutura. Ideia aproveitada: agrupar regras por categoria e manter o `SKILL.md` curto, com o material detalhado em `references/`. Nenhum conteúdo foi copiado.
