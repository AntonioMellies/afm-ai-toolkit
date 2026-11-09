# Estado, URL e efeitos

Versão de referência: React 19.3, Next.js 16.4. Fontes por regra em `fontes.md`. Itens marcados "convenção desta skill" são preferência da skill.

## 1. Pensar em React: passos

Ordem sugerida pela documentação para construir uma tela:

1. Divida a interface em componentes; cada um faz idealmente uma coisa.
2. Construa uma versão estática com props, sem estado e sem interação. Dados fluem do pai para o filho.
3. Encontre o estado mínimo e completo. Algo não é estado se não muda, vem de props ou pode ser calculado de outro estado ou props.
4. Decida onde o estado vive: ache todos os componentes que dependem dele e coloque no ancestral comum mais próximo (ou em um novo componente acima).
5. Adicione fluxo inverso: passe funções de atualização como props e chame-as nos handlers dos filhos.

## 2. Onde o estado vive (decisão)

| Tipo de dado | Onde vive | Observação |
|---|---|---|
| Valor derivado (lista filtrada, total, nome completo) | Nenhum lugar: calcule no render | Não crie estado |
| Interação local (aberto/fechado, texto digitado antes de enviar) | `useState` no componente | Mantenha o mais baixo possível |
| Dois componentes precisam do mesmo valor | `useState` no ancestral comum | "Lifting state up" |
| Lógica de atualização crescendo com muitas ações | `useReducer` | Reducer concentra as transições |
| Dado que passa por muitos níveis | Context | Provider em Client Component |
| Filtro, ordenação, página, aba que o usuário compartilha ou recarrega | URL (search params) | Link compartilhável, botão voltar funciona |
| Dado do servidor (registros, listas) | Servidor: Server Component, ou biblioteca de cache no cliente | Não copie para `useState` |
| Resultado de mutação | Estado da Server Action (`useActionState`) e revalidação | Veja `formularios-e-dados.md` |

A linha sobre URL e a regra "dado do servidor não vira estado" são convenções desta skill, coerentes com a documentação de `useSearchParams` e de busca de dados.

## 3. Estruturar o estado (cinco princípios)

1. Agrupe estados que sempre mudam juntos.
2. Evite contradição: no lugar de `isEnviando` e `isEnviado`, use um único `status` (`'digitando' | 'enviando' | 'enviado'`).
3. Evite redundância: o que se calcula de props ou estado não é guardado.
4. Evite duplicação: o mesmo dado em dois lugares sai de sincronia.
5. Evite aninhamento profundo: prefira estrutura plana.

Guarde o id selecionado, não uma cópia do objeto:

```tsx
const [itens, setItens] = useState<Item[]>(inicial)
const [selecionadoId, setSelecionadoId] = useState<string | null>(null)
const selecionado = itens.find((i) => i.id === selecionadoId) ?? null // sempre fresco
```

Descreva a UI por estados visuais (`digitando`, `enviando`, `sucesso`) em vez de manipular elementos um a um.

## 4. Estado na URL

Para filtros e busca compartilháveis:

- Em Server Component de página, leia `searchParams` (Promise: use `await`) e passe os valores como props. Layouts não recebem `searchParams`.
- Em Client Component, `useSearchParams` devolve um `URLSearchParams` somente leitura. Para alterar, navegue com `router.push` ou `Link` para a nova query string.
- O Client Component que usa `useSearchParams` deve ficar dentro de `<Suspense>`; sem isso, a página estática falha no build. Em desenvolvimento pode parecer funcionar sem o Suspense.

```tsx
// app/clientes/page.tsx (Server Component)
import { Suspense } from 'react'
import { FiltroStatus } from './filtro-status'

export default async function Page({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams
  const clientes = await listarClientes({ status }) // valide `status` antes de usar
  return (
    <>
      <Suspense fallback={null}>
        <FiltroStatus />
      </Suspense>
      {/* lista... */}
    </>
  )
}
```

```tsx
// app/clientes/filtro-status.tsx
'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export function FiltroStatus() {
  const pathname = usePathname()
  const params = useSearchParams()
  const hrefPara = (status: string) => {
    const p = new URLSearchParams(params.toString())
    p.set('status', status)
    return `${pathname}?${p.toString()}`
  }
  return (
    <nav aria-label="Filtro de status">
      <Link href={hrefPara('ativo')}>Ativos</Link> <Link href={hrefPara('inativo')}>Inativos</Link>
    </nav>
  )
}
```

`searchParams` é entrada do cliente: valide antes de usar em consulta, e nunca decida autorização por ele.

## 5. Quando NÃO usar `useEffect`

Efeito serve para sincronizar o componente com um sistema externo (rede, API do navegador, timer, widget de terceiros). Sem sistema externo, provavelmente não precisa. Pergunta-guia: por que este código precisa rodar? Se é porque o usuário interagiu, vai no handler. Se é porque o componente apareceu, pode ser efeito.

| Quero | Em vez de efeito, faça |
|---|---|
| Valor derivado de props ou estado | Calcule no render (`const total = a + b`) |
| Cálculo caro | `useMemo` (só para cálculos puros; meça antes) |
| Reagir a clique ou envio | Lógica no handler de evento; POST no handler ou na action |
| Reiniciar todo o estado quando a entidade muda | `key={entidade.id}` no componente |
| Ajustar parte do estado quando prop muda | Guardar o id e derivar; ou ajustar durante o render com guarda contra laço |
| Encadear vários estados | Calcule o que der no render e atualize tudo no mesmo handler |
| Avisar o pai de uma mudança | Atualize filho e pai no mesmo evento, ou torne o filho controlado pelo pai |
| Passar dados do filho para o pai | O pai busca e passa para baixo |
| Assinar fonte externa (online/offline, store) | `useSyncExternalStore` |
| Inicializar o app uma vez | Guarda em módulo ou execução no carregamento do módulo (efeito roda duas vezes em Strict Mode) |

Exemplos:

```tsx
// Evite: estado derivado sincronizado por efeito
const [visiveis, setVisiveis] = useState<Item[]>([])
useEffect(() => setVisiveis(itens.filter((i) => i.ativo)), [itens])

// Prefira: calcule
const visiveis = itens.filter((i) => i.ativo)
```

```tsx
// Reiniciar o formulário de comentário ao trocar de usuário
export default function Pagina({ usuarioId }: { usuarioId: string }) {
  return <Perfil key={usuarioId} usuarioId={usuarioId} />
}
```

### Quando o efeito é o certo

Buscar no cliente é sincronizar com a rede e é válido, mas respostas podem chegar fora de ordem. Ignore a resposta antiga no cleanup. Prefira a busca do framework ou um hook próprio.

```tsx
useEffect(() => {
  let ignorar = false
  buscarResultados(consulta).then((r) => {
    if (!ignorar) setResultados(r)
  })
  return () => {
    ignorar = true
  }
}, [consulta])
```

Regras do efeito:

- Dependências são todos os valores reativos que o efeito lê; o linter exige isso. Não suprima o aviso: mude o código.
- O cleanup desfaz o que o setup fez e roda antes de nova execução e na desmontagem.
- Em desenvolvimento com Strict Mode, o React executa setup, cleanup e setup de novo logo após montar. Se isso causa efeito visível, falta cleanup.
- Efeitos só rodam no cliente, nunca na renderização do servidor.
- Para chamar Server Action ao montar ou por evento global, use `startTransition` dentro do efeito.

## 6. Regras do React que evitam bugs

- Componentes e hooks são puros: mesma entrada (props, estado, contexto), mesma saída. Efeitos colaterais fora do render.
- Props e estado são imutáveis: não altere, crie novo valor (`setItens([...itens, novo])`).
- Não chame componentes como função; use em JSX.
- Hooks só no topo do componente ou de outro hook, nunca em laço, condição ou função aninhada, e antes de qualquer `return` antecipado.
- Use o plugin de lint de hooks do React e Strict Mode no desenvolvimento.

## 7. Checklist de revisão

- [ ] Cada `useState` guarda algo que não se calcula de outro estado ou props?
- [ ] Há cópia de prop em estado? Remova ou use `key`.
- [ ] Algum `useEffect` apenas ajusta estado a partir de outro estado ou prop?
- [ ] Algum `useEffect` roda por causa de ação do usuário?
- [ ] Efeitos de rede têm cleanup contra resposta atrasada?
- [ ] Filtros e paginação compartilháveis estão na URL, com `Suspense` em volta de `useSearchParams`?
