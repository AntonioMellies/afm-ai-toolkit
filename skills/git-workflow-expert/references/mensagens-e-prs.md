# Mensagens de commit, descrição de PR e checklist de revisão

**Aviso de origem.** Os formatos abaixo são **convenção desta skill**. O livro de referência (Goodliffe) sustenta apenas o conteúdo geral de uma boa mensagem (resumo na primeira frase, motivo, referência a bug, sem listar arquivos) e a prática de revisão por outra pessoa antes de integrar. Tamanhos, modo verbal, rodapés e o modelo de PR não vêm do livro. Se o projeto já tem convenção, siga a do projeto.

## 1. Mensagem de commit

### Do livro (conteúdo)

- Primeira frase: resumo breve e claro do que mudou.
- Depois, se for do interesse de alguém: por que a mudança foi feita.
- Se apropriado: referência a bug ou item relacionado.
- Sem ambiguidade; não repita o que a ferramenta já registra (lista de arquivos).

### Convenção desta skill (formato)

```
<resumo em uma linha, modo imperativo, até ~50 caracteres, sem ponto final>

<corpo opcional: por que a mudança foi necessária e o que mudou em termos
de comportamento; linhas de até ~72 caracteres>

<rodapé opcional: Refs #123>
```

Regras práticas:

- Uma linha em branco separa resumo e corpo.
- O corpo explica o porquê. O diff já mostra o como.
- Idioma e estilo: o do projeto. Se o histórico usa prefixos padronizados (por exemplo `feat:`, `fix:`), continue usando; não introduza prefixos em um projeto que não os usa.
- Se a mensagem precisa de "e" para descrever o commit, divida o commit.

### Exemplos

Fracas (o próprio livro mostra mensagens vazias e vagas como problema):

```
ajustes
fix
corrige coisas e refatora a tela
```

Melhores (convenção):

```
Corrige cálculo de desconto para pedidos sem cupom

O desconto era aplicado sobre o total já com frete, o que gerava valor
menor que o contratado. Passa a incidir apenas sobre os itens.

Refs #4507
```

```
Extrai validação de endereço para classe própria
```

(O segundo exemplo é um commit só de refatoração; qualquer mudança de comportamento vai em outro commit.)

## 2. Descrição de pull request (PR)

O livro não trata de pull requests. O modelo é convenção desta skill, mínimo de itens, sem pretensão de ser o único válido. Se o repositório tiver template de PR, use-o.

```
## O que muda
<uma ou duas frases sobre a mudança>

## Por que
<problema ou necessidade; link para o item de trabalho, se houver>

## Como verificar
<testes executados e resultado; passos manuais, se aplicável>

## Riscos e pontos de atenção
<o que o revisor deve olhar com cuidado; como reverter, se for relevante>
```

Regras práticas (convenção):

- Um PR, uma intenção. Se a descrição precisa de duas seções "O que muda" independentes, divida o PR. Isso conversa com o princípio do livro de manter mudanças pequenas para que a revisão seja administrável.
- Título no mesmo estilo do resumo de commit.
- Não descreva "como" linha a linha; o diff mostra isso. Descreva o que o diff não mostra.
- Não declare "testado" sem ter executado; escreva o que foi de fato executado e o resultado.

## 3. Checklist de revisão antes de integrar

Itens derivados dos princípios do livro (páginas em `fontes.md`), adaptados a PR (a adaptação é convenção):

- A mudança é uma única intenção coesa e completa? Ou mistura mais de uma coisa?
- Formatação ou limpeza está separada de mudança de comportamento (em commits distintos)?
- O build e os testes passam contra a versão mais recente da linha principal?
- Há arquivos que não deveriam ser versionados (IDE, caches, artefatos gerados, configuração pessoal)? E segredos (convenção)?
- Arquivos removidos ou renomeados não são usados por mais ninguém (outros módulos, outras plataformas)?
- Se corrige uma falha reportada, existe teste que a demonstra e evita que volte?
- A mensagem do commit explica o resumo e, quando necessário, o motivo?
- A mudança é pequena o bastante para ser entendida em uma leitura? Se não, pedir divisão.

Postura de quem revisa e de quem é revisado (livro): revisão leve entre pares, crítica com tato, aceitação sem defensiva.
