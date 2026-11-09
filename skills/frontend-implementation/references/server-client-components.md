# Server e Client Components, dados e cache

Versão de referência: React 19.3, Next.js 16.4 (App Router). Itens marcados "convenção desta skill" são preferência da skill, sem base direta na documentação lida. As fontes de cada regra estão em `fontes.md`.

## 1. Decisão: servidor ou cliente

Padrão do App Router: layouts e páginas são Server Components. Não existe diretiva para marcar um Server Component; ele é o padrão. `'use client'` é o que marca o cliente.

| Situação | Escolha |
|---|---|
| Buscar dado de banco ou API, usar segredo | Servidor |
| Reduzir JavaScript enviado ao navegador | Servidor |
| Estado, handlers (`onClick`, `onChange`), efeitos, hooks próprios | Cliente |
| API do navegador (`localStorage`, `window`, `navigator`) | Cliente |
| Contexto React | Provider em Client Component |
| Biblioteca de terceiros que usa estado e não tem `'use client'` | Wrapper em Client Component |

Servidor não pode usar `useState` nem `useEffect`, e não cria contexto (só renderiza provider definido em Client Component).

Regra prática: comece no servidor e "empurre" a interatividade para baixo. Se só o campo de busca do cabeçalho é interativo, só ele leva `'use client'`; logo e links continuam no servidor.

## 2. Fronteira `'use client'`

- A diretiva fica no topo do arquivo, antes dos imports. Marca uma fronteira: o arquivo e tudo que ele importa e renderiza diretamente vão para o bundle do cliente. Não precisa repetir em cada componente filho do mesmo grafo.
- Server Component passado como `children` (ou outra prop) a um Client Component não entra no bundle do cliente: é renderizado no servidor e chega pronto.
- Props do servidor para o cliente precisam ser serializáveis. Funções e classes não passam, exceto Server Actions.

Exemplo de composição (código original, convenção de nomes desta skill):

```tsx
// app/pedidos/page.tsx (Server Component)
import { PainelRecolhivel } from './painel-recolhivel'
import { ListaPedidos } from './lista-pedidos'

export default function Page() {
  return (
    <PainelRecolhivel titulo="Pedidos recentes">
      <ListaPedidos /> {/* continua no servidor */}
    </PainelRecolhivel>
  )
}
```

```tsx
// app/pedidos/painel-recolhivel.tsx
'use client'
import { useState, type ReactNode } from 'react'

export function PainelRecolhivel({ titulo, children }: { titulo: string; children: ReactNode }) {
  const [aberto, setAberto] = useState(true)
  return (
    <section>
      <h2>
        <button type="button" aria-expanded={aberto} onClick={() => setAberto(!aberto)}>
          {titulo}
        </button>
      </h2>
      {aberto && children}
    </section>
  )
}
```

### Provider de contexto

O provider é um Client Component que recebe `children` e é importado no layout. Coloque-o o mais fundo possível na árvore (por exemplo, envolvendo só `{children}`, não o documento inteiro), para o Next.js otimizar as partes estáticas.

### Biblioteca de terceiros sem `'use client'`

Crie um arquivo mínimo com `'use client'` que reexporta o componente da biblioteca, e use esse arquivo nos Server Components.

## 3. Onde buscar dados

### Em Server Component (padrão para leitura)

```tsx
// app/clientes/page.tsx
import { listarClientes } from '@/data/clientes' // módulo só de servidor

export default async function Page() {
  const clientes = await listarClientes()
  if (clientes.length === 0) return <p>Nenhum cliente cadastrado ainda.</p>
  return (
    <ul>
      {clientes.map((c) => (
        <li key={c.id}>{c.nome}</li>
      ))}
    </ul>
  )
}
```

- Pode usar `fetch` ou ORM/banco direto. Credenciais e consultas não entram no bundle do cliente.
- `fetch` idêntico na mesma árvore é memoizado. Para acesso que não usa `fetch` (ORM), envolva a função em `React.cache` para compartilhar o resultado dentro da mesma requisição.
- `fetch` não é cacheado por padrão e bloqueia a renderização até terminar.
- Autenticação e autorização continuam obrigatórias no acesso ao dado.

### Paralelo, não sequencial

Dois `await` seguidos viram sequência. Inicie as requisições e espere juntas:

```tsx
const [cliente, pedidos] = await Promise.all([obterCliente(id), listarPedidos(id)])
```

Se uma falha derruba tudo e isso não é desejado, use `Promise.allSettled`. Só use sequência quando uma requisição depende do resultado da outra.

### Streaming: `Suspense` e `loading.tsx`

- `<Suspense fallback={...}>` em volta do componente lento deixa o resto da página aparecer antes. É o recomendado quando há dado de runtime ou não cacheado.
- `loading.tsx` na pasta da rota embrulha a página e seus filhos em `Suspense` automaticamente.
- Cuidado: layout que lê dado de runtime ou não cacheado (`cookies()`, `headers()`, `fetch` não cacheado) não cai no `loading.tsx` da mesma pasta. Mova a busca para a página ou envolva o acesso em seu próprio `Suspense`.
- Projete o fallback para dizer algo útil (esqueleto da lista, título), não só um "Carregando...".

### Em Client Component

Duas formas documentadas:

1. Servidor inicia a promessa (sem `await`), passa como prop; o cliente lê com `use(promessa)` dentro de `<Suspense>`.
2. Biblioteca de cache no cliente (SWR, React Query), que traz suas regras de cache e estados `isLoading` e `error`.

Evite `useEffect` + `fetch` manual: se for inevitável, use cleanup para ignorar resposta atrasada (veja `estado-e-efeitos.md`).

### Route Handler ou Server Action?

- Leitura para a própria tela: Server Component.
- Mutação disparada pela UI: Server Action.
- Endpoint HTTP para terceiros, webhook ou cliente não React: Route Handler (`route.ts`). Não pode existir `route.ts` no mesmo segmento de `page.tsx`. Handlers `GET` não são cacheados por padrão sem Cache Components; os demais métodos nunca são cacheados.

## 4. Cache (condicional à configuração do projeto)

Antes de falar de cache, confira `next.config` (`cacheComponents`). Projetos novos criados com os padrões recomendados já vêm com Cache Components.

- Com Cache Components: `'use cache'` em função ou componente (preferir par com `cacheLife`), conteúdo uncached ou de runtime fica atrás de `<Suspense>`. Valores de runtime (cookies, headers, `searchParams`, `params`) podem ser lidos fora do cache e passados como argumento a função cacheada.
- Valores aleatórios e horário (`Math.random()`, `Date.now()`) exigem tratamento explícito (cachear ou usar `connection()` com `Suspense`).
- Sem Cache Components, as regras de cache são outras: consulte o guia "caching without cache components" do Next.js da versão instalada antes de mexer.
- Após mutação: `updateTag` (leitura imediata do que o usuário acabou de gravar, só em Server Action), `revalidateTag(tag, perfil)` (dois argumentos na versão lida, atualização "stale-while-revalidate"), `revalidatePath`, `refresh()` (atualiza a rota, não revalida tags). Ver `formularios-e-dados.md`.

## 5. Proteger dados no servidor

- Importe `server-only` em módulos que só podem rodar no servidor: importar no cliente quebra o build.
- Só variáveis com prefixo `NEXT_PUBLIC_` vão para o cliente. As demais viram vazio no bundle, mas não dependa disso: não coloque segredo em código que o cliente importa.
- Para projetos novos, a documentação recomenda uma camada de acesso a dados (DAL): só servidor, faz autorização e devolve DTOs mínimos. Escolha uma abordagem e não misture. Nome e pasta (`data/`) são convenção desta skill.
- Evite props largas em Client Components (receber o `User` inteiro quando só se usa o nome). Receba um tipo mínimo.
- Escolha um único padrão de acesso a dados por projeto: HTTP API existente, DAL ou acesso no componente (este último só para protótipo).

```ts
// data/clientes.ts (convenção desta skill: um DTO mínimo por tela)
import 'server-only'
import { obterUsuarioAtual } from './auth'
import { db } from './db'

export type ClienteResumo = { id: string; nome: string }

export async function listarClientes(): Promise<ClienteResumo[]> {
  const usuario = await obterUsuarioAtual()
  if (!usuario) throw new Error('Não autenticado')
  const linhas = await db.clientes.listarPorEmpresa(usuario.empresaId)
  return linhas.map((l) => ({ id: l.id, nome: l.nome })) // sem campos internos
}
```

## 6. Metadados

`export const metadata` (objeto) ou `generateMetadata` (função assíncrona) em layout ou página, só em Server Components. Para o mesmo dado em metadata e página, memoize com `React.cache` para buscar uma vez. Defina ao menos `title` e `description` por rota.

## 7. Checklist de revisão

- [ ] Há `'use client'` só nos arquivos que precisam de estado, evento ou API do navegador?
- [ ] Props para Client Components são mínimas e serializáveis?
- [ ] Requisições independentes rodam em paralelo?
- [ ] Dado lento está atrás de `Suspense` com fallback útil?
- [ ] `params` e `searchParams` recebem `await`?
- [ ] Módulos com segredo importam `server-only` e não são importados por código de cliente?
- [ ] O projeto usa Cache Components? As regras de cache aplicadas correspondem a isso?
