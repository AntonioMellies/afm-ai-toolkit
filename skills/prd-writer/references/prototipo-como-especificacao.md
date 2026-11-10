# Protótipo como especificação

Base: *Inspired*, caps. 45 (p.247-248), 47 (p.253-254), 56 (p.301-302), 61 (p.317-321), 11 (p.76) e 12 (p.80-81). Páginas por regra em `fontes.md`. O que não tem página é **convenção desta skill**.

## O que o livro diz

O livro dá ao protótipo dois papéis. O principal é enfrentar um ou mais riscos de produto na discovery (valor, usabilidade, viabilidade técnica ou de negócio). O secundário é comunicar a engenheiros e à organização o que construir, o que ele chama de *prototype as spec* (p.248).

Cinco princípios do protótipo (p.247-248):

1. Serve para aprender algo a custo muito menor que construir o produto: no mínimo uma ordem de grandeza menos tempo e esforço.
2. Criar o protótipo obriga a pensar o problema muito mais fundo do que conversar ou escrever, e expõe problemas grandes que ficariam escondidos.
3. É ferramenta de colaboração: o time e os parceiros de negócio o experimentam e formam entendimento comum.
4. Há vários níveis de fidelidade e nenhum é o certo em geral; escolhe-se o do propósito e só se sobe quando necessário, porque baixa fidelidade é mais rápida e barata.
5. Em muitos casos o protótipo basta como especificação. Quando os engenheiros não estão no mesmo local ou o produto é especialmente complexo, ele precisa ser complementado com detalhes, normalmente casos de uso, regras de negócio e critérios de aceitação.

O livro **não define o formato** de casos de uso, regras de negócio ou critérios de aceitação, e não lista outros gatilhos além dos dois acima. Qualquer estrutura abaixo é convenção desta skill.

## Consequências para quem escreve a especificação

- **O documento aponta para o protótipo.** Registre onde está, qual a fidelidade, quais fluxos cobre e o que ele **não** mostra. A especificação escrita cobre a diferença, não repete a tela.
- **Complementos só no gatilho do livro.** Pergunte: os engenheiros estão no mesmo local? O produto é especialmente complexo? Se ambas as respostas forem não, não escreva casos de uso, regras e critérios por hábito; o protótipo e o story map bastam. Se alguma for sim, escreva só o que o protótipo não deixa claro.
- **Fidelidade mínima suficiente.** Baixa fidelidade mostra só informação e fluxo, sem o efeito do visual nem de dados reais (p.253). Alta fidelidade parece e funciona de forma real, mas os dados não são vivos (p.254). Para sign-off de stakeholders, o livro pede alta fidelidade (ver abaixo).
- **O protótipo de usuário não prova valor.** O erro típico de iniciantes é mostrar um protótipo de alta fidelidade a 10 ou 15 pessoas que dizem amá-lo e achar que validou (p.254). Elogio ao protótipo é evidência fraca de valor: registre-o como reação, não como validação, e leve a pergunta de valor a `hypothesis-and-experiments`, se instalada.
- **Protótipo não é produto.** Não está pronto para o mercado nem é algo que a empresa venderia e sustentaria (p.48). A especificação não deve tratá-lo como entrega.
- **Não prescreva o *como*.** Engenheiros em geral não gostam que o PM diga como construir; o livro pede dar o máximo de latitude para a melhor solução e compartilhar dor do cliente, dados e restrições de negócio (p.80-81). A especificação descreve problema, comportamento esperado e restrições, não arquitetura.
- **Estimativa não se arranca em reunião.** Pedir estimativa de uma pilha de ideias, sob pressão, tende a dar resposta conservadora; o livro sugere dar tempo para os engenheiros investigarem e perguntar *qual a melhor forma de fazer e quanto tempo levaria*, em vez de *dá para fazer?* (p.294). Por isso a especificação não traz estimativa nem prazo impostos de fora.
- **Só user stories de alto nível empurram o design para a engenharia.** O livro lista como problema grave o PM entregar user stories muito genéricas, de modo que os engenheiros precisam inventar o design (p.76). Quem especifica só por stories deve ao menos ter protótipo ou story map.
- **Instrumentação é parte da especificação.** O autor considera quase inegociável colocar ao menos a análise básica de uso de cada feature que entra (p.288). Inclua o que será medido, ligado ao resultado-chave.

## Aprovação de stakeholders

- Stakeholder é quem tem poder de veto ou pode impedir o lançamento (p.318).
- O livro pede mostrar a solução aos stakeholders-chave durante a discovery, antes de ela entrar no backlog; o erro comum é mostrá-la depois de construída (p.320).
- Apresentações em slides são ambíguas para testar viabilidade de negócio: o advogado precisa ver telas e textos reais, o marketing, o design real, a segurança, o que o produto faz exatamente (p.321). O autor pede para **não confiar em aprovação de nada que não seja protótipo de alta fidelidade**, em reuniões individuais, não em grupo (p.321).
- Em caso de impasse entre a opinião do PM e a do stakeholder, o livro propõe mudar o jogo: rodar um teste rápido e levar evidência (p.320).
- Cadência que o livro cita como típica: cerca de duas a três horas por semana, meia hora com cada stakeholder-chave (p.320).

## Teste de usuário, demonstração e walkthrough

O livro distingue três formas de mostrar o protótipo (p.301-302). Diga qual está em uso:

| Forma | Quem conduz | Objetivo |
|---|---|---|
| Teste de usuário | o usuário | testar usabilidade e valor |
| Demonstração | o PM (em geral com roteiro de marketing de produto) | mostrar o valor, persuadir |
| Walkthrough | em geral o PM; o stakeholder pode mexer | dar ao stakeholder todas as chances de achar um problema, sem vender, sem testar nele e sem esconder nada |

Para aprovação de stakeholder, esta skill usa o **walkthrough** (inferência desta skill: o livro define o walkthrough como mostrar o protótipo ao stakeholder para ele achar problemas, p.302, e pede sign-off sobre protótipo de alta fidelidade, p.321). Erros de iniciante que o livro aponta: fazer walkthrough com um cliente em prospecção quando devia ser demonstração, e fazer demonstração durante um teste de usuário e depois perguntar o que ele achou (p.302).

## O que o texto complementar deve cobrir (convenção desta skill)

Quando o gatilho do livro se aplica, escreva só estes itens, curtos, ligados a pontos do protótipo:

- **Casos de uso:** quem faz o quê e com que resultado, nos fluxos que o protótipo não detalha.
- **Regras de negócio:** regra, origem (quem a impõe, que stakeholder ou norma) e exceções conhecidas.
- **Critérios de aceitação:** condições verificáveis de comportamento esperado, escritas para que o time possa conferir por execução ou teste.

Cada item cita o ponto do protótipo a que se refere. Dados que o usuário não forneceu ficam como *sem dado*; não os invente.
