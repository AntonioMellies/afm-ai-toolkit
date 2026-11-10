# Força da evidência e decisão

Os livros dão escalas diferentes para "quão forte é este dado". **Cada escala é de um autor, é convenção do autor e não tem base empírica independente neste material.** Escolha uma por análise, diga qual e não some pontos de escalas diferentes. Páginas em `fontes.md`.

## O que todos os livros concordam (e o que isso não resolve)

- Comportamento observado pesa mais que opinião. O que a pessoa diz que fará, em entrevista ou pesquisa, é previsão ruim do que fará. Elogio e "eu compraria" não são dado.
- Um único experimento não basta, nem para matar nem para seguir.
- O custo para quem responde (dinheiro, tempo, reputação) é o que separa sinal de ruído.

Isso orienta a leitura, mas **não substitui a escala**: dois dados "comportamentais" ainda precisam ser comparados por alguma régua.

## Escala 1: Bland e Osterwalder (*Testing Business Ideas*)

**Força, em quatro verificações.** Para cada dado, pergunte se ele é:

| Mais fraco | Mais forte |
|---|---|
| Opinião (crença: "eu faria", "acho importante") | Fato (evento: "semana passada eu…", "gastei… com") |
| O que as pessoas dizem (entrevista, pesquisa) | O que as pessoas fazem (comportamento observável) |
| Ambiente de laboratório (sabem que estão sendo testadas) | Mundo real (não sabem que estão sendo testadas) |
| Pequeno investimento (cadastrar e-mail para aviso de lançamento) | Grande investimento (pré-comprar, arriscar reputação profissional) |

**Confiança na hipótese**, que o livro liga a três dimensões: tipo e força da evidência; número de pontos de dados por experimento (cinco citações de entrevistas pessoais são menos que cem, mas provavelmente mais precisas que cem respostas de uma pesquisa anônima); e número e tipo de experimentos para a mesma hipótese (três séries de entrevistas é melhor que uma; entrevistas, pesquisa e venda simulada juntas é melhor ainda, e melhor ainda com força crescente).

Quatro níveis propostos pelo livro:

- **Very Confident:** vários experimentos, ao menos um de chamada para ação (*call to action*) com evidência muito forte.
- **Somewhat Confident:** vários experimentos com evidência forte, ou um de chamada para ação particularmente forte.
- **Not Really Confident:** só entrevistas ou pesquisas em que as pessoas dizem o que fariam.
- **Not Confident at All:** um único experimento com evidência fraca.

O livro não dá fórmula numérica para isso, nem ranking completo de todos os experimentos.

## Escala 2: Savoia (*The Right It*)

**Dado só vale com *skin in the game*** (algo a perder ou ganhar). O *Skin-in-the-Game Caliper* do autor, que ele diz ser personalizável:

- opinião (de especialista ou não), incentivo ou desencorajamento, e-mail ou telefone falso, curtidas e comentários, enquetes e pesquisas de qualquer tipo: **0 pontos**;
- e-mail válido dado de bom grado para receber novidades daquele produto: 1 ponto; telefone válido: 10 pontos; tempo: 1 ponto por minuto; dinheiro (depósito, pré-pedido): 1 ponto por dólar.

O autor pede **ordens de grandeza**, não precisão falsa (não 0,4 ponto por e-mail). A separação entre zero e algum skin importa mais que o valor dos pontos. Os pesos são do autor.

**TRI Meter.** Cinco faixas de Very Unlikely (10%) a Very Likely (90%), em passos largos de propósito, para não sugerir precisão que o experimento não dá. A presunção inicial é Very Unlikely (a Lei do Fracasso de Mercado: a maioria dos produtos novos falha, mesmo bem executados). Para cada experimento, pergunte: "se a MEH for verdadeira, quão provável é este resultado?" e posicione: muito acima do previsto, Very Likely; no previsto ou um pouco acima, Likely; um pouco abaixo, Unlikely; muito abaixo, Very Unlikely; ambíguo ou possivelmente contaminado, 50/50 ou descarte (inclusive resultados favoráveis suspeitos). Só dados próprios, bem desenhados, entram; nada de opinião nem de dados de terceiros. Mínimo de três a cinco experimentos, mais se o risco ou o investimento for grande.

Qualidade do dado (Savoia): atual, diretamente relevante à decisão, procedência conhecida e significância estatística; dado de terceiros informa, não decide; anedota não é dado.

## Escala 3: Fitzpatrick (*The Mom Test*)

Não é uma escala numérica. Duas leituras:

- **Dado ruim:** elogio, fluff (afirmações genéricas, no futuro ou hipotéticas) e ideias alheias. Gera falso positivo e falso negativo.
- **Compromisso e avanço**, em moedas: tempo (próxima reunião com objetivo, feedback sobre telas, uso sério de um teste), reputação (apresentar a colegas ou ao decisor, depoimento) e dinheiro (carta de intenção, pré-pedido, depósito). Quanto mais o cliente abre mão, mais a opinião dele pesa. Toda reunião de produto ou venda termina em sucesso (compromisso ou avanço) ou fracasso (elogio ou adiamento); não existe "foi bem".

## Régua da VPD (*Value Proposition Design*)

O Test Card do livro tem campos de custo, **confiabilidade dos dados** e tempo; a escala visual desses campos não foi lida. O texto diz: experimentos rápidos e baratos dão evidência menos confiável, os confiáveis custam mais; comece barato quando a incerteza é alta e aumente o gasto com a certeza. Usar de apoio, sem inventar níveis.

## Divergências para declarar

- **Número de experimentos ou conversas.** Bland: vários, e a confiança depende do tipo e da variedade; Savoia: no mínimo de 3 a 5 experimentos; Fitzpatrick: continuar conversando até parar de ouvir novidade (3 a 5 conversas em segmento simples e focado, experiência dele); entrevistas do TBI: 15 a 20. São contextos diferentes (experimento versus conversa de aprendizagem), não uma regra única.
- **Landing page.** O TBI propõe 10% a 15% de conversão de e-mail para validação inicial e trata o e-mail como evidência fraca; Fitzpatrick desconfia da validação por conversão e valoriza conversar com cada cadastrado. Apresente os dois.
- **Peso de entrevista.** O TBI classifica entrevista como evidência relativamente fraca (é o que dizem); Savoia dá zero a opinião; Fitzpatrick usa conversa para colher **fatos do passado** e compromisso, não opinião. Entrevista bem conduzida serve para aprender sobre o problema; não prova demanda.
- **Formato do critério.** Torres exige números absolutos em amostras pequenas (3 de 10), o TBI e a VPD escrevem critérios em percentual (80%, 2% de CTR) e Savoia escreve o XYZ em percentual. Reconcilie por escopo: o XYZ enuncia a hipótese de mercado; o teste pequeno declara o n e quantos devem exibir o comportamento.
- **Limiares.** mais de 40% de desapontados (Sean Ellis; o texto não especifica se conta só "muito desapontado"), 15% de cliques no botão de um *feature stub*, 6% de pledges por tráfego direto: todos são "o livro propõe" ou exemplos de autor. O próprio TBI hedgeia os 40% ("pode-se argumentar").

## Decidir

Dois vocabulários, cada um de um autor:

- **Bland e Osterwalder:** perseverar (continuar testando: a mesma hipótese com experimento mais forte, ou a próxima hipótese importante), pivotar (mudar significativamente um ou mais elementos; parte da evidência anterior pode ficar irrelevante e exigir novo teste) ou matar (a ideia não funcionaria ou o lucro potencial é insuficiente). Se a evidência refuta: matar ou pivotar. Se apoia: próxima hipótese crítica ou mesma hipótese com maior fidelidade. Se é um insight novo: matar, pivotar ou perseverar. Se é incerta: continuar testando. O aprendizado expira (meses, semanas ou dias).
- **Savoia:** Go, Drop ou Tweak. Ajustar a ideia ou as hipóteses com o que se aprendeu, antes de abandonar; o autor sugere inverter premissas antes de desistir. Após uma série de resultados positivos com grande investimento, rodar novo conjunto de experimentos para confirmar.
- **VPD:** invalidado (pivotar), aprender mais (buscar confirmação ou aprofundar o porquê, por exemplo entrevistas depois de um dado quantitativo negativo), validado (expandir para o próximo bloco ou executar).
- **Torres:** resultado positivo reduz risco, não prova: a premissa fica mais conhecida; a próxima ação depende do risco restante e das outras premissas. Pare de testar quando o risco restante for aceitável ou quando construir custar menos que o próximo teste.

Diferenças a manter: o TBI e a VPD tratam "validado" como estado possível; Torres evita o termo (a meta é mitigar risco, não buscar verdade) e o TBI prefere "aprender" a "validar" no quadro de experimentos porque times baixam a barra.

## Registro (um aprendizado por ciclo)

Hipótese, experimento, evidência (dados concretos e escala usada), insights e ações (formato dos estudos de caso do TBI). Registre também o que mudou na lista de suposições e o próximo experimento.

## Armadilhas ao ler evidência

- **TBI:** só medir o que as pessoas dizem; dados incomparáveis (sujeito, contexto e métrica mal definidos); viés de confirmação (descartar o que contraria); poucos experimentos; não sintetizar e decidir; terceirizar o teste; paralisia de análise (limite de tempo, e diferença entre decisão reversível, que se toma rápido, e irreversível).
- **VPD:** falso positivo (ver o que não existe) e falso negativo (não ver o que existe; exemplo do Dropbox, em que anúncios fracos refletiam mercado que ainda não buscava, não falta de interesse), máximo local (otimizar o que já funciona e perder o potencial), máximo esgotado (tomar uma amostra por todo o mercado) e dados errados (olhar o público ou a métrica errada). Decisões irreversíveis pedem teste dobrado.
- **Savoia:** os quatro *trolls*: tradução (o cliente imagina outra coisa), previsão (ninguém prevê bem o que usará), falta de skin in the game e viés de confirmação.
- **Torres:** triangulação em vez de um dado único; falso negativo é barato quando os testes são pequenos e as ideias abundam.

## Perguntas para o usuário

- "Que escala de evidência vamos usar nesta leitura?"
- "Isto que temos é opinião, fato ou comportamento? O cliente arriscou algo?"
- "Se esse número tivesse saído o contrário, você teria decidido diferente? Se não, por que rodar o teste?"
- "Que dado nos faria dizer que a hipótese está errada?"
- "Isso aprendeu algo novo ou confirmou o que já se acreditava?"
