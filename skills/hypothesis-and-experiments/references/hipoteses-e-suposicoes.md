# Hipóteses e suposições

Cada autor propõe um formato e uma taxonomia de risco próprios. Eles se complementam, mas **não são a mesma coisa**: use um por vez e diga qual. Páginas em `fontes.md`.

## Formatos de hipótese (escolha um e declare)

| Formato | Autor | Quando serve | Cuidado |
|---|---|---|---|
| *We believe that…* (nós acreditamos que…) | Bland e Osterwalder | Qualquer suposição de proposta de valor, modelo de negócio ou estratégia, inclusive de exequibilidade e viabilidade | Escrever todas assim empurra para provar o que já se acredita (viés de confirmação) |
| MEH e XYZ (*Pelo menos X% de Y farão Z*) | Savoia | Hipótese de engajamento de mercado que dá para dizer com número: quem, quantos, qual ação com custo | X, Y e Z iniciais são palpites; servem para expor desacordo, não para prever |
| Premissa que precisa ser verdadeira | Torres | Suposições escondidas atrás de uma ideia ou solução (passos de uso, valor, dano) | Formular de modo que você precisa que seja verdadeira; formulação negativa inverte o teste |
| Hipótese de negócio | Osterwalder e outros (VPD) | Algo que precisa ser verdade para a ideia funcionar e ainda não foi validado | O livro pede para ranquear por criticidade e testar primeiro as que matam a ideia |

### Qualidade da hipótese (Bland e Osterwalder)

Uma hipótese boa é **testável** (pode ser mostrada verdadeira ou falsa com evidência), **precisa** (diz quem, o quê, quando; como é o sucesso) e **discreta** (uma única coisa). Hipótese composta se divide: "dá para comprar e enviar com lucro" vira uma hipótese sobre custo de compra e outra sobre custo de envio. Uma hipótese por nota, curta, sem lista de itens.

Teste rápido (convenção desta skill): se dois integrantes da equipe poderiam discordar sobre o que um resultado significa, a hipótese ainda está vaga. Escreva o número que está implícito.

### Contra-hipótese

O livro de Bland e Osterwalder pede algumas hipóteses escritas para **refutar** a crença (ex.: "pais não assinariam") e permite testar hipóteses concorrentes ao mesmo tempo, o que ajuda quando a equipe discorda sobre qual testar. Torres usa o mesmo remédio de outra forma: testar premissas de um conjunto de três ideias, em vez de apostar em uma.

### MEH, XYZ e *hypozoom* (Savoia)

1. MEH: a crença-chave sobre como o mercado vai se engajar (aprender mais, experimentar, adotar, comprar).
2. XYZ: reescrever como *pelo menos X% de Y farão Z*, com X percentual, Y um mercado claro e Z uma ação concreta (de preferência pagar um preço específico).
3. *Hypozoom* (xyz minúsculo): trocar o mercado inteiro (Y) por um subconjunto pequeno, local, fácil de alcançar e representativo; o livro fala em algo como 100 a 1.000 pessoas para o teste, mas sem tomar uma amostra tão pequena que não signifique nada. Se XYZ for verdadeiro, xyz também deve ser, e xyz é o que se testa agora. Representatividade importa mais que aleatoriedade (um carro caro não se testa com pessoas sorteadas ao acaso).
4. Use números mesmo como palpite, com a precisão que o momento permite. O exercício também expõe divergências da equipe (um acha que "preço razoável" é US$ 200, outro US$ 80).

Os números dos exemplos do livro (10%, US$ 120, 20%, 50%) são ilustrações do autor.

## Taxonomias de risco (não fundir)

- **Bland e Osterwalder, três tipos.** Desejabilidade (*desirability*: querem isto?), exequibilidade (*feasibility*: conseguimos fazer?) e viabilidade (*viability*: ganhamos dinheiro suficiente?). O livro rotula a ordem de exploração: desejabilidade primeiro, exequibilidade (feasibility) em segundo, viabilidade (viability) em terceiro. Atenção ao termo: em português "viabilidade" costuma soar como a exequibilidade técnica, mas no livro viabilidade (*viability*) é a financeira.
- **Torres, cinco categorias.** Desejabilidade, viabilidade, exequibilidade, usabilidade e ética. A autora observa que a maioria dos times tem viés por uma categoria e ponto cego em ética, e que a classificação importa menos que enumerar. Ela trata jurídico e segurança como exequibilidade, enquanto alguns autores os põem em viabilidade.
- **Savoia, FLOP.** Fracasso de lançamento (*Launch*), de operação (*Operations*) ou de premissa (*Premise*). O livro concentra-se em Premise: as pessoas simplesmente não se interessam. Competência de execução não compensa premissa errada.
- **Fitzpatrick, risco de produto versus risco de mercado.** Risco de produto: dá para construir, dá para crescer, vão continuar usando. Risco de mercado: querem, pagam, são suficientes. Com muito risco de produto as conversas provam menos e é preciso construir algo mais cedo.
- **Osterwalder et al. (VPD), círculo antes do quadrado.** Testar o que o cliente realmente quer (jobs, pains, gains) antes de testar o que se oferece; senão não se sabe se o cliente rejeita a proposta ou se ela atende algo irrelevante.

Se a pergunta do usuário é "por onde começo?", o ponto em comum entre os livros é começar pelo que mata a ideia se for falso e pelo que menos se conhece; a ordem fina depende da taxonomia que você adotou.

## Gerar suposições escondidas (Torres, cap. 9)

- **Story map:** assuma que a solução já existe, liste atores e passos sequenciais do caminho de sucesso; cada passo em que se espera que alguém faça algo gera premissas de desejabilidade, usabilidade e exequibilidade (um mapa de cinco passos gerou vinte premissas no exemplo).
- **Pre-mortem:** "imagine que lançamos e foi um fracasso total; o que deu errado?". Só funciona se o fracasso for dado como certo, não como possível.
- **Percorrer a árvore:** completar "esta solução resolve a oportunidade porque…" e "resolver a oportunidade move o resultado porque…"; cada inferência é uma premissa, inclusive as de viabilidade.
- **Dano potencial:** dados coletados, vício, quem fica de fora, exposição, e também dano ao negócio.
- Gere muitas (a autora fala em 20 a 30, mesmo para ideia simples) antes de priorizar: não se prioriza o que não foi escrito.

Para construir a árvore de oportunidades em si e priorizar oportunidades, use a skill `product-discovery-assistant` se estiver instalada. Esta skill começa quando já existe uma suposição ou ideia a testar.

## Priorizar: importância x evidência

Dois mapas, mesmas duas perguntas. Não some as regras dos dois, escolha um:

- **Bland e Osterwalder (*Assumptions Mapping*).** Eixo da evidência: à esquerda, evidência relevante, observável e recente; à direita, nenhuma. Eixo da importância: no topo, se for falso a ideia falha e as outras hipóteses perdem o sentido. Traga primeiro as de desejabilidade, depois exequibilidade, depois viabilidade. Foque o quadrante importante e sem evidência; no quadrante com evidência, desafie se a evidência é boa o bastante. O livro não dá escala numérica nem desempate.
- **Torres (*assumption mapping*, adaptado de Bland).** Eixo X "quanto sabemos", eixo Y importância (alta se for difícil contornar caso falsa). Posicione de forma relativa, rápido (até cerca de dez minutos por ideia, segundo a autora). Comece pelas duas ou três mais próximas do canto superior direito. Faça por ideia, em um conjunto de três.

Pergunta de verificação (convenção desta skill): "se essa suposição for falsa, o que acontece com o plano?". Se a resposta for "dá para contornar", ela não é a primeira.

## Anti-padrões

- Escrever só hipóteses que confirmam, sem nenhuma que tente refutar.
- Hipótese composta ou sem número ("alguns", "muitos", "razoável").
- Testar a ideia inteira em vez da suposição de maior risco (Torres).
- Formular premissa de modo negativo ("clientes não vão esquecer a senha") ou vaga demais ("clientes terão tempo").
- Gerar poucas premissas e favorecer uma categoria (confundir desejabilidade com usabilidade).
- Tratar a prioridade como decidida para sempre: a evidência nova move a suposição no mapa.
