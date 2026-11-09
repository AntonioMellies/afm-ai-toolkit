# Formulários, Server Actions, estados de tela e segurança de dados

Versão de referência: React 19.3, Next.js 16.4. Fontes por regra em `fontes.md`. Itens marcados "convenção desta skill" são preferência da skill.

## 1. Server Action como endpoint

Uma Server Function é uma função assíncrona que roda no servidor e é chamada pelo cliente por requisição de rede. Usada em formulário ou mutação, chama-se Server Action. Pontos que um desenvolvedor backend deve ter em mente:

- Só aceita POST e é alcançável por requisição direta, não só pela sua tela. Verifique autenticação e autorização dentro de cada action. Autenticar a página não protege a action.
- Autorização é mais que "está logado?": confira se o usuário pode agir sobre aquele recurso (evita IDOR).
- Valide toda entrada (campos, argumentos, parâmetros de rota): o cliente pode alterar tudo.
- O retorno é serializado e vai ao cliente. Devolva só o que a UI precisa (`{ ok: true }`), nunca o registro do banco.
- Declare com `'use server'` no topo do arquivo (todas as exportações viram actions) ou dentro da função. Client Components não definem actions; importam de um arquivo `'use server'` ou as recebem por prop.
- Padrão recomendado: a action fica fina e delega autenticação, autorização e banco a um módulo só de servidor (camada de acesso a dados).
- Operações caras (e-mail, gravação pesada) merecem limite de taxa.
- Valores capturados em closure de action definida dentro de componente trafegam ao cliente criptografados; não conte só com isso para proteger segredo.

## 2. Formulário básico

`<form action={...}>` aceita função. O React chama a função com `FormData` (todos os campos com `name`). Não precisa de `onSubmit`, `preventDefault` nem estado controlado para cada campo. O método é sempre POST.

```tsx
// app/clientes/novo/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { obterUsuarioAtual } from '@/data/auth'
import { criarCliente } from '@/data/clientes'

export type EstadoCadastro = {
  erros?: { nome?: string; email?: string }
  mensagem?: string
  valores?: { nome: string; email: string }
}

export async function cadastrarCliente(_anterior: EstadoCadastro, formData: FormData): Promise<EstadoCadastro> {
  const usuario = await obterUsuarioAtual()
  if (!usuario) throw new Error('Não autenticado') // inesperado: vai ao error boundary

  const nome = String(formData.get('nome') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()

  const erros: NonNullable<EstadoCadastro['erros']> = {}
  if (nome.length < 3) erros.nome = 'Informe ao menos 3 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erros.email = 'Informe um e-mail válido.'
  if (erros.nome || erros.email) return { erros, valores: { nome, email } } // erro esperado: valor, não exceção

  const resultado = await criarCliente(usuario, { nome, email }) // autorização também dentro da camada de dados
  if (!resultado.ok) return { mensagem: 'Não foi possível cadastrar. Tente novamente.', valores: { nome, email } }

  revalidatePath('/clientes')
  redirect('/clientes') // lança exceção de controle: nada roda depois; revalide antes
}
```

A validação manual acima é só ilustrativa (convenção desta skill). A documentação cita bibliotecas de schema, como Zod e Valibot, para validar no servidor; se adotar uma, confira a API da versão instalada.

## 3. Formulário com erros, pendência e foco

Para exibir erros, o componente do `<form>` vira Client Component e usa `useActionState`. A action passa a receber o estado anterior como primeiro argumento (como acima).

```tsx
// app/clientes/novo/form-cliente.tsx
'use client'

import { useActionState } from 'react'
import { cadastrarCliente, type EstadoCadastro } from './actions'

const inicial: EstadoCadastro = {}

export function FormCliente() {
  const [estado, formAction, pendente] = useActionState(cadastrarCliente, inicial)
  return (
    <form action={formAction} noValidate>
      <div>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          defaultValue={estado.valores?.nome}
          aria-invalid={estado.erros?.nome ? true : undefined}
          aria-describedby={estado.erros?.nome ? 'nome-erro' : undefined}
        />
        {estado.erros?.nome && <p id="nome-erro">{estado.erros.nome}</p>}
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={estado.valores?.email}
          aria-invalid={estado.erros?.email ? true : undefined}
          aria-describedby={estado.erros?.email ? 'email-erro' : undefined}
        />
        {estado.erros?.email && <p id="email-erro">{estado.erros.email}</p>}
      </div>
      <p aria-live="polite">{estado.mensagem}</p>
      <button type="submit" disabled={pendente}>
        {pendente ? 'Salvando...' : 'Cadastrar'}
      </button>
    </form>
  )
}
```

Pontos:

- Depois que a action termina com sucesso ou retorna erro de validação, o React reinicia campos não controlados. Para preservar o que o usuário digitou, devolva os valores no estado e use `defaultValue`.
- Se a action lança exceção, o erro vai para o error boundary mais próximo. Por isso erros esperados voltam como valor, e `throw` fica para o inesperado.
- `pendente` desabilita o botão e evita envio duplo. Alternativa: `useFormStatus`, que precisa ser chamado em um componente filho dentro do `<form>` (por exemplo, um `BotaoEnviar`).
- Mensagens de status entram em região `aria-live="polite"` para serem anunciadas (WCAG 4.1.3). Ligação do erro ao campo com `aria-describedby` e `aria-invalid` é convenção desta skill; a documentação lida mostra `aria-live` e `label` com `htmlFor`.
- Validação do navegador (`required`, `type="email"`) é conveniência; a garantia é a do servidor.
- Progressive enhancement: formulário que chama Server Action em Server Component funciona antes de o JavaScript carregar. Em Client Component, o envio entra em fila e o formulário é priorizado na hidratação.
- Argumento extra além dos campos: `acao.bind(null, id)`. Campo `hidden` vai em HTML puro e sem codificação: não ponha nele nada sensível, e revalide o id no servidor.
- Vários botões de ação: `formAction` no botão. Atalho de teclado que envia: `form.requestSubmit()`.

### Atualização otimista

`useOptimistic` mostra um estado provisório enquanto a action roda (lista com o novo item já aparecendo). Use quando o atraso incomoda e a falha é rara; confirme com o resultado real. Na versão lida, a action chama o setter otimista e depois aguarda a Server Action.

## 4. Revalidar depois de mutar

Na versão lida (Next.js 16.x):

| Quero | Use |
|---|---|
| Atualizar uma rota inteira após mutação | `revalidatePath('/clientes')` |
| Invalidar dados por tag, aceitando "stale" enquanto atualiza | `revalidateTag('clientes', 'max')` (dois argumentos; a forma com um argumento está obsoleta) |
| O usuário deve ver imediatamente o que gravou | `updateTag('cliente-' + id)` (só em Server Action) |
| Atualizar a UI atual sem mexer em tags | `refresh()` (não revalida dados com tag) |
| Ir para outra página | `redirect(...)` depois de revalidar |

## 5. Estados de tela: loading, erro, vazio

Toda tela que lista ou carrega dado cobre quatro estados: carregando, erro, vazio e sucesso.

### Loading

- `loading.tsx` na rota: aparece imediatamente na navegação, com layouts ainda interativos. Embrulha `page.tsx` em `Suspense`.
- `<Suspense fallback={<EsqueletoLista />}>` em volta de partes lentas, para streaming granular.
- O fallback deve ser significativo: esqueleto ou parte útil da tela futura.

### Erro

Dois tipos, com tratamento diferente:

- **Esperados** (validação, falha de requisição previsível): modele como valor de retorno, mostre na tela. Em Server Component, responda condicionalmente (`if (!res.ok)`).
- **Inesperados** (bugs): lance exceção. O `error.tsx` mais próximo captura em tempo de renderização.

```tsx
// app/clientes/error.tsx
'use client'

export default function Erro({ error, retry }: { error: unknown; retry: () => void }) {
  // `error` pode não ser Error: estreite antes de ler propriedades
  const digest = error instanceof Error ? (error as Error & { digest?: string }).digest : undefined
  return (
    <div>
      <h2>Não foi possível carregar os clientes.</h2>
      {digest && <p>Código para suporte: {digest}</p>}
      <button type="button" onClick={() => retry()}>
        Tentar novamente
      </button>
    </div>
  )
}
```

- `error.tsx` é Client Component e não cobre o layout da mesma pasta; erros no layout raiz vão para `global-error.tsx`, que define `<html>` e `<body>`.
- A propriedade de nova tentativa é `retry` a partir do Next.js 16.3 (estável); na 16.2 era `unstable_retry`; `reset` ainda existe e só limpa o erro sem rebuscar. Confira a versão instalada.
- Error boundaries não pegam erro em handlers de evento nem em código assíncrono fora do render: capture e guarde em estado para exibir.
- Em produção, a mensagem de erro vinda do servidor é genérica, com `digest` para cruzar com o log do servidor. Não conte com a mensagem original no cliente.
- `notFound()` com `not-found.tsx` para recurso inexistente.

### Vazio

Lista vazia não é erro: mostre mensagem que explica o motivo e a próxima ação ("Nenhum cliente cadastrado. Cadastre o primeiro."), distinguindo "sem dados" de "filtro sem resultado". Isso é convenção desta skill; o padrão visual vem das skills de design.

## 6. Segurança básica de frontend

### XSS

- `dangerouslySetInnerHTML` insere HTML cru. Conteúdo vindo de usuário, inclusive o que está no banco e foi editado por usuários, pode executar script. Use só com HTML de fonte confiável e sanitizado (por exemplo, Markdown renderizado por um parser confiável e mostrado só a quem escreveu).
- Quando precisar, crie o objeto `{ __html }` perto de onde o HTML é produzido, para deixar claro o que é HTML cru.
- Não interpole texto de usuário em HTML montado à mão; prefira renderizar como conteúdo de JSX e reserve `dangerouslySetInnerHTML` para o caso acima (convenção desta skill).
- Defina Content Security Policy como camada adicional (convenção desta skill: ver o guia de CSP do Next.js da versão instalada).

### Dados sensíveis

- Tudo que chega ao navegador é público: bundle, props, retorno de Server Action, variáveis `NEXT_PUBLIC_`. Segredos ficam só em código de servidor.
- Não passe o objeto inteiro do banco como prop. Selecione campos.
- Módulos de servidor importam `server-only`.
- Não confie em dado do cliente para decidir permissão: `searchParams`, cabeçalhos e campos de formulário são alteráveis. Verifique no servidor, por exemplo lendo o cookie de sessão e consultando permissão a cada vez.
- Mutação nunca acontece durante o render nem em `GET`. Use Server Action.
- API de taint do React (experimental no Next.js) é camada extra; não substitui filtrar dados na camada de acesso.

## 7. Checklist de revisão

- [ ] A action autentica e autoriza antes de qualquer efeito?
- [ ] A entrada é validada no servidor e erros esperados voltam como valor?
- [ ] O retorno da action é mínimo?
- [ ] O botão mostra pendência e evita envio duplo?
- [ ] Campos têm `label`, mensagens de erro ligadas aos campos e status anunciado?
- [ ] A tela cobre carregando, erro, vazio e sucesso?
- [ ] Revalidação pós-mutação usa a API certa para a versão (dois argumentos em `revalidateTag`)?
- [ ] Não há `dangerouslySetInnerHTML` com conteúdo não sanitizado nem segredos em código de cliente?
