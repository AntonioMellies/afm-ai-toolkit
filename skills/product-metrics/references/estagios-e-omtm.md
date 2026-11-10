# Estágios e a métrica que importa agora (OMTM)

Fonte: *Lean Analytics* (Croll e Yoskovitz, 2013). Páginas (p.N) são marcadores PDF; veja `fontes.md`. Paráfrase, com números sinalizados como caso, regra de bolso de um autor ou convenção dos autores.

## 1. A métrica que importa agora (OMTM)

- **Definição (p.81-82):** em cada momento há uma métrica que merece atenção acima de todas. Foco não é miopia: o livro não diz que exista uma métrica só da ideia à venda da empresa, e sim que, para o estágio atual, há um único número em que todos estão focados.
- **Acompanhe várias, foque uma (p.82):** os KPIs importantes são reportados todo dia; os demais ficam guardados. O livro resume como capturar tudo e focar no que importa.
- **Sinais de que algo está errado (p.84):** o time não sabe qual é a métrica, ela é errada para o estágio, há várias, ou ninguém sabe o valor atual.
- **Ela muda com o estágio, às vezes rápido (p.84).** Aquisição de usuários pode pedir canais e conversão de cadastro a usuário ativo; retenção pede churn, com experimentos de preço, funcionalidades e suporte. O OMTM é mais importante no início; com escala entram mais métricas e mais gente para delegar (p.83).
- **Quatro razões para usar (p.84-85):** responde à pergunta de maior risco; força a traçar a linha na areia; foca a empresa toda; inspira cultura de experimentação, em que falhas planejadas e metódicas são aprendizado e não se punem.
- **Brinquedo de apertar (squeeze toy, p.87-88):** otimizar um número empurra o gargalo para outro lugar e revela o próximo ponto de atenção (matrículas otimizadas, agora custo por cliente; tráfego otimizado, agora conversão). Espere que o OMTM mude.
- **Exercício do livro (p.88):** das métricas boas que você acompanha, escolha a que você não viveria sem. A empresa toda poderia trabalhar só nela? O que quebraria? Dá para traçar a linha?
- **Casos de métrica única citados pelo livro** (exemplos, não receitas): Net Adds no Moz, novos assinantes pagos menos cancelamentos (p.82-83); razão custo de pessoal sobre receita bruta do dia anterior num restaurante, com 24% "mais ou menos certo" e acima de 30% ruim naquele restaurante (p.85); payback de aquisição de clientes em meses no Backupify, com alvo de 12 meses ou menos por canal, do CEO do caso (p.118-119). Os valores desses casos não servem como referência para outro negócio.

## 2. Os cinco estágios (p.79-80, p.179-182)

Ordem sugerida pelos autores: Empathy, Stickiness, Virality, Revenue e Scale, "a menos que você tenha uma boa razão" para outra ordem. O livro avisa que decidir o estágio é a parte em que fundadores mentem para si mesmos, achando que estão mais adiante (p.179). Os estágios valem também para restaurante e software enterprise (p.180-182).

Os critérios numéricos de passagem entre estágios (as "gates") estão numa figura (5-5 e 20-1) cujo conteúdo não foi lido. Esta skill não os reconstrói. Os critérios abaixo são os que o texto corrido descreve.

| Estágio | Risco que testa | Foco de métrica segundo o livro | Perguntas antes de avançar |
|---|---|---|---|
| Empathy | O problema importa e alguém pagaria por uma solução? | Qualitativo: entrevistas de problema e de solução; depois pesquisas em escala. OMTM da validação de problema: a dor dos entrevistados (p.196) | Entrevistas de qualidade suficientes? Entende o cliente (um dia na vida dele)? Acredita que a solução atende? (p.228) |
| Stickiness | O produto retém e engaja? | Usuários ativos diários, semanais e mensais; tempo até ficar inativo; funcionalidades usadas e ignoradas; coortes (p.229) | Usam como esperado? Obtêm valor suficiente (pagam, clicam em anúncios, convidam)? (p.230) |
| Virality | Cresce por indicação? | Coeficiente viral, tempo de ciclo viral, convites por usuário; vigiar stickiness (p.254-258) | Usa algum dos três tipos de virality? Qual o coeficiente e o tempo de ciclo? Que segmentos fazem o que o modelo quer? (p.266) |
| Revenue | Dá dinheiro de forma escalável e autossustentável? | Receita por cliente, CLV, CAC, margem, preço; da proporção de uso para razões de negócio (p.267-268, p.280) | Receita por cliente melhor que a bruta; CLV acima de CAC com o atraso de caixa; atenção ao breakeven (p.272, p.278-280) |
| Scale | Há mercado, e não só negócio? | Comparar payback e churn entre canais, regiões e campanhas; olhar o ecossistema (p.281-283) | O livro diz que a empresa nunca sai de fato do Scale (p.289); sem critério numérico de passagem no texto lido |

### Empathy (p.185-228)
- **Quantidade mínima (p.185):** o livro diz que, sem ter falado com ao menos 15 pessoas em cada fase de entrevistas, você deveria se preocupar em avançar. É a convenção dos autores, sem justificativa estatística.
- **Pontuação de entrevista de problema (p.196-199):** uma convenção dos autores, que eles próprios dizem ser arbitrária e não perfeitamente científica. A estrutura: seis critérios ponderados, com máximo de 43 pontos e corte de 31 como "boa pontuação", e pesos maiores para o entrevistado ter ranqueado os problemas e já tentar resolver o problema hoje. Use como modelo para criar sua própria régua, e não como corte universal. Avalie quantas entrevistas ficam acima da linha e o que as boas têm em comum (segmento, local, forma de abordagem). Os critérios completos e os pesos estão no livro.
- **Pesquisa em escala (p.216):** antes de rodar, escreva o que seria um score bom para cada pergunta quantificável e como a resposta mudaria o seu comportamento.
- **O que medir no MVP (p.224-227):** escolha o OMTM e defina o que é sucesso antes de construir; métricas de aquisição são irrelevantes nesse ponto; estreite o escopo (um bairro, um tipo de produto); o foco é engajamento. Nenhuma funcionalidade deve ser construída sem métrica de uso correspondente. Defina o risco que a funcionalidade elimina e projete o mínimo para medir isso (caso Static Pixels: a funcionalidade extra adicionou fricção, e as transações dobraram em duas semanas depois da remoção).
- **O MVP é um processo, não um produto (p.223).** Um teste de fumaça (página de chamada) testa a mensagem; o MVP testa se o produto resolve a necessidade a ponto de mudar comportamento.
- **Churn definido por janela longa atrasa o aprendizado (p.225):** com "30 dias sem uso" você só descobre depois de 30 dias. O livro sugere olhar o tempo entre visitas como possível leading indicator.

### Stickiness (p.229-236)
- Foco em retenção e engajamento, não em crescimento rápido (p.230). Não gere tráfego novo até saber converter atenção em engajamento (p.230).
- Exceção do livro: negócios que só funcionam com massa crítica (marketplaces, por exemplo) precisam semear o serviço antes de testar stickiness (p.230).
- Iterações do MVP são evolutivas e pivôs são revolucionários; resista a pivotar repetidamente na esperança de engajar. Se uma funcionalidade não melhora de forma significativa o OMTM, o livro manda removê-la (p.230-231).
- **Virality prematura (p.233-234):** ter muitos usuários não é tração se eles não ficam; escalar cedo queima dinheiro em usuários que saem.
- **Perguntas antes de construir uma funcionalidade (p.234-236):** o livro propõe um roteiro de sete perguntas, que se resume em quatro checagens: (1) há uma hipótese escrita, com o percentual de melhora esperado na retenção, e dá para medir o efeito? (2) o custo de tempo e o risco são proporcionais ao impacto esperado, e a funcionalidade não complica o produto? (3) é uma aposta com chance de grande impacto, e não só a coisa mais fácil? (4) o que se sabe vem de comportamento, e não só do que os usuários dizem querer (eles mentem sem querer)?
- Os números do livro para este estágio são de casos (qidiq, Rally); o texto não fixa um limiar de retenção para sair.

### Virality (p.253-266)
- Três tipos: inerente (embutida no uso), artificial (incentivada) e boca a boca. Trate como formas distintas e analise o tráfego de cada uma: a artificial pode trazer tráfego de passagem; a inerente traz clientes engajados (p.254-255).
- Vigie stickiness durante o estágio; crescer com churn alto pode não dar retorno (p.254).
- O livro posiciona virality como multiplicador do marketing pago, e por isso vem antes de Revenue e Scale; um coeficiente sustentado acima de 1 é descrito como "Santo Graal" raro (p.258).
- Fórmulas em `formulas-e-exemplos.md`.

### Revenue (p.267-280)
- Receita por cliente é melhor indicador de saúde que receita bruta: se a bruta sobe e a por cliente cai, serão necessários muitos mais clientes para crescer no mesmo ritmo (p.267-268).
- Regra básica: gastar menos adquirindo clientes do que se ganha deles; o livro admite que isso é uma simplificação, porque só uma fração da receita pode ir para aquisição, e porque há atraso entre gastar e receber (p.272).
- Quatro variáveis do equilíbrio entre aquisição, receita e caixa (p.273): dinheiro em caixa no início, gasto mensal de aquisição, receita por usuário e taxa de churn.
- Escolha qual "mais" de Zyman otimizar (mais eficiência, mais gente, mais frequência, mais dinheiro, mais produtos) conforme o modelo (p.271).
- Quatro tipos de breakeven como metas possíveis (p.278-280): sobre custos variáveis; tempo até o breakeven do cliente; EBITDA; hibernação. Perseguir lucro pode não ser a decisão certa, mas o livro diz que é irresponsável não pensar em breakeven.
- Se as métricas não funcionam, pode ser mais fácil mudar o produto de mercado que criar um novo (p.280).

### Scale (p.281-289)
- Revenue provou um negócio; Scale prova um mercado (p.281).
- Só agora olhe para fora (concorrentes, analistas, distribuidores); olhar cedo demais cega para o que o cliente precisa (p.282).
- Compare métricas de ordem superior (payback de aquisição, por exemplo) entre canais, regiões e campanhas (p.282).
- Vigie queda de engajamento, saturação do mercado inicial e aumento do CAC; o churn segmentado por canal mostra se você cresce o ativo mais importante ou perde atenção (p.283).
- Com a escala é preciso mais de uma métrica ao mesmo tempo (p.289). O livro propõe o padrão Three-Threes como hierarquia (p.286-288): a diretoria acompanha três premissas do modelo, cada uma com uma métrica e uma linha na areia, que não devem mudar mais que uma vez por mês; os executivos definem três ações por premissa a cada semana; e as pessoas rodam três experimentos por ação, documentados antes de rodar, com critério para escolher o vencedor. É uma proposta dos autores, sem validação independente.
- Evite o "pivô preguiçoso": mudar de rumo sem plano é, nas palavras do livro, agitar-se ao vento (p.288).

## 3. Frameworks que o livro relaciona

- **Pirate Metrics (AARRR, p.71-72):** aquisição, ativação, retenção, receita e indicação. A ordem não é estrita (o usuário pode indicar antes de pagar). O livro associa a cada etapa exemplos de métrica (tabela 5-1), como custo de aquisição na aquisição, onboarding concluído na ativação, uso diário e mensal na retenção, CLV e conversão na receita, e coeficiente viral na indicação. A tabela de métricas por caixa do Lean Canvas (5-2) saiu embaralhada e não foi usada.
- **Engines of Growth (Ries, p.73-74, p.81):** motor de stickiness (KPI fundamental: retenção), viral (coeficiente viral, mas é preciso descontar churn) e pago (CLV e CAC, e tempo até o breakeven do cliente). O livro diz ser em geral prematuro ligar o motor pago antes de saber que o produto retém e se espalha, e recomenda focar um motor por vez.
- **Teste de product/market fit de Sean Ellis (p.76):** na experiência dele, se 40% ou mais dos respondentes dizem que ficariam muito decepcionados em perder o serviço, há fit e é hora de escalar. É uma regra empírica de um autor, sem base independente no texto. Se usar, cite assim.
- **Taxa de crescimento e engajamento mínimo (p.303-305):** o livro cita uma regra de bolso de um investidor, de 5 a 7% de crescimento semanal como bom e 10% como excepcional numa aceleradora, e sugere como linha inicial 5% semanais de usuários ativos (sem receita) ou de receita; avisa que não se deve perseguir isso à custa de entender o cliente, e que a visão é enviesada para B2C. Cita também a generalização de um investidor ("30/10/10": 30% dos registrados usam no mês, 10% diariamente). O próprio autor chama de grande generalização.
