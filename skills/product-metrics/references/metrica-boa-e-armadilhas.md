# Métrica boa, vanity metrics e armadilhas de análise

Fonte: *Lean Analytics* (Croll e Yoskovitz, 2013). As páginas (p.N) são marcadores PDF do texto lido; veja `fontes.md`. Tudo aqui é paráfrase. Os autores chamam os critérios de "regras de bolso", sem base empírica independente.

## 1. O que torna uma métrica boa

O livro lista quatro critérios (p.35-36), e a conclusão reforça dois deles em outras palavras (p.416-417):

| Critério | Em uma frase |
|---|---|
| Comparativa | Compara com outro período, grupo de usuários ou concorrente. "Subiu a conversão em relação à semana passada" ensina mais que "2% de conversão". |
| Compreensível | Se as pessoas não lembram nem discutem o número, é difícil transformar mudança nos dados em mudança de cultura. |
| Razão ou taxa | É mais fácil agir sobre ela, é comparativa por natureza e permite colocar fatores em tensão no mesmo número. |
| Muda o comportamento | O critério mais importante segundo o livro: o que você fará de diferente quando ela mudar? |
| Impulsiona decisão | A conclusão repete que a boa métrica é a que orienta a decisão (p.416). |
| Fácil de entender de relance | Evite despejar dezenas de números (p.417). |

**Por que razões funcionam (p.36).** Distância percorrida só informa; velocidade diz se você precisa acelerar. Uma razão do dia contra a média do mês mostra pico contra tendência. Uma razão pode combinar duas forças opostas, como receita e crescimento numa versão grátis e paga, para não aumentar uma às custas da outra.

**Pergunta de controle (p.36, p.39).** Para cada métrica: "o que farei de diferente com base nas mudanças dela?". Sem resposta, trate como vanity metric. Se a organização não sabe quais métricas mudariam seu comportamento, o livro diz que ela não é orientada por dados de verdade.

**Duas famílias de métricas que mudam comportamento (p.36-37):**
- *Contábeis* (ex.: receita diária): devem tornar as previsões da planilha mais precisas e mostrar se o resultado converge para o plano.
- *Experimentais* (resultado de teste): otimizam produto, preço ou mercado. Combine **antes de coletar** qual mudança o resultado causará. Exemplos do livro: se o site rosa render mais, vai de rosa; se mais da metade disser que não pagaria por uma funcionalidade, não construir; se o MVP curado não elevar o tamanho do pedido em 30%, tentar outra coisa. Os números dos exemplos ilustram o formato da regra e não são limiares recomendados.

**Métricas falsas (p.37).** A métrica precisa estar presa ao comportamento que você quer mudar. O livro cita o vendedor que pede nota 5 na pesquisa e o executivo que vinculou a comissão ao número de negócios no pipeline em vez de negócios fechados ou margem, o que gerou excesso de leads ruins que levaram dois trimestres para limpar. Medir algo que não está ligado a meta alguma desperdiça tempo e pode iludir.

**Métricas em pares (p.38).** Conversão com tempo até a compra informa o fluxo de caixa. Coeficiente viral com tempo de ciclo viral determina a velocidade de adoção. Por trás do par há uma métrica fundamental (receita, caixa, adoção).

## 2. As cinco dimensões a ter em mente (p.38)

Qualitativa ou quantitativa; vanity ou acionável; exploratória ou de reporte; antecedente (leading) ou defasada (lagging); correlacionada ou causal.

- *Qualitativo responde "por quê", quantitativo responde "o quê" e "quanto"* (p.39). No começo você busca dado qualitativo, e as perguntas precisam ser preparadas para não enviesar a resposta.
- *Exploratória × reporte* (p.42-43): reporte é contar o que você sabe que precisa contar (dinheiro, usuários, resultado de experimento). Exploratória busca o que você não sabe que não sabe, e é a que mais importa no início da startup. O caso do Circle of Friends (p.43-44): com 10 milhões de usuários e menos de 20% dos círculos com alguma atividade, uma análise exploratória do banco achou o segmento de mães com engajamento bem maior e levou ao pivô. Os percentuais são do caso, não referências.

## 3. Vanity metrics

Definição do livro (p.39): dado sobre o qual você não consegue agir. A escada do exemplo (p.40):

1. *Total de cadastros*: só sobe e nada diz sobre o que os usuários fazem.
2. *Total de usuários ativos*: um pouco melhor, ainda cresce com o tempo, e depende de definir bem "ativo".
3. *Percentual de usuários que estão ativos*: a acionável, porque muda quando o produto muda e permite experimentar.

Métricas de aquisição por período servem para comparar canais, mas segmentar por tempo é impreciso. O livro prefere rodar as campanhas em paralelo e agrupar por segmento (p.40). Uma métrica acionável não diz o que fazer, só que você faz algo com o dado.

**Vanity metrics que o livro aponta (p.40-41), agrupadas pelo remédio sugerido:**

- *Conte pessoas em vez de eventos:* hits, page views (só valem se o modelo depende deles, como inventário de display), visitas (o número não distingue uma pessoa cem vezes de cem pessoas) e visitantes únicos (só mostram quem viu a home).
- *Meça quem age quando solicitado:* seguidores, amigos e curtidas (um concurso de popularidade até que se saiba quantos agem), e-mails coletados (teste quantos abrem e fazem o que se pede) e downloads (meça ativações ou criação de conta).
- *Depende do negócio:* tempo no site e número de páginas são mau substituto de engajamento, a menos que o negócio dependa disso; muito tempo em páginas de suporte provavelmente é ruim.

**Exceção do próprio livro (p.143):** muitas dessas métricas são relevantes para sites de mídia, que ganham com popularidade. Classifique uma métrica como vanity conforme o modelo, não em abstrato.

## 4. Leading e lagging

- *Leading* tenta prever o futuro (ex.: número de prospects no funil prevê novos clientes). *Lagging* explica o passado (ex.: churn; quando você consegue coletar, os clientes já saíram) (p.44-45). Ambas podem ser acionáveis, mas a leading encurta o ciclo (p.46).
- No início, com pouco dado, meça primeiro a lagging. Para a leading funcionar é preciso análise de coortes e comparação de grupos ao longo do tempo (p.45).
- Em B2B, novos leads qualificados são leading para bookings, mas só servem para prever com a taxa de conversão e a duração do ciclo de vendas (p.45). Uma lagging de um grupo pode ser leading de outro (bookings: lagging para vendas, leading para finanças).
- **Como achar uma leading (p.261-263):** (1) uma métrica medida cedo no ciclo de vida; (2) ligada a um objetivo do modelo de negócio; (3) que permita extrapolar cedo; (4) encontrada por segmentação e coorte, comparando quem ficou com quem saiu. Exemplos que o livro relata de empresas (como casos, não regras): sete amigos em dez dias no Facebook, primeiro dia de retorno na Zynga, um arquivo em uma pasta em um dispositivo no Dropbox. Uma leading precisa estar ligada ao modelo (mais usuários fiéis, não só mais amigos por usuário).

## 5. Correlação e causalidade

- Correlacionar dá previsão; achar a causa permite mudar o resultado (p.46-47, p.264). O livro dá exemplos de armadilha: pneus de inverno e acidentes, sorvete e afogamentos.
- Causalidade raramente é um para um: várias métricas independentes explicam parte do comportamento, e mesmo causalidade parcial tem valor (p.46).
- Para provar causalidade: achar a correlação e rodar um experimento controlando as outras variáveis. É difícil porque nenhum usuário é idêntico e muitas vezes não se consegue amostra controlada significativa (p.46).
- Só com amostra muito grande dá para testar sem controlar tudo. A startup comum deve rodar testes simples, com poucas variáveis (p.47).
- O livro não dá tamanho de amostra, nível de significância nem duração mínima de teste. Ao recomendar isso, avise que é fora do livro.
- Conversão é difícil para obter significância estatística, porque compras são raras frente ao clickstream. Delimite o escopo do experimento (p.369).

## 6. Médias agregadas, segmentos e coortes

- *Segmento*: grupo com característica em comum (navegador, país, tipo de passageiro). Compare segmentos e investigue o anômalo (p.50).
- *Coorte*: grupo que começou junto, acompanhado ao longo do ciclo de vida. Compare coortes para ver se as métricas melhoram com o tempo (p.50).
- **Por que a média esconde**: no exemplo do livro (e-commerce, mil clientes novos por mês), a receita média por cliente parecia estática, mas por coorte o cliente que chegou no mês 5 gastou cerca de US$9 no primeiro mês, quase o dobro do que gastou o do mês 1. A queda de receita após o primeiro mês era a métrica a atacar (p.51-52). As tabelas dessas páginas saíram embaralhadas na extração; só estes valores, escritos no texto corrido, foram usados.
- Estudo *longitudinal* acompanha coortes pela vida natural. *Transversal* dá experiências diferentes a grupos ao mesmo tempo (azul × verde). *Teste A/B* varia um atributo e mantém o resto. Com mais coisas a testar que tráfego, a análise multivariada evita testes em série que atrasam o aprendizado (p.52-53).
- Para decidir se uma mudança funcionou: teste em um subconjunto e compare. Se isso causar atrito, compare a coorte posterior à mudança com a anterior (p.121).
- O resultado do teste Picatic (+376% de cliques com outro texto de chamada) é um caso de dez dias, não expectativa.

## 7. Dados otimizam, pessoas geram hipóteses

O livro adverte que otimização guiada só por dados chega a máximos locais, e pode ter efeitos colaterais (o software que aprendeu que certas imagens geravam mais cliques, em detrimento da marca). A analogia do triciclo: dados otimizam o sistema conhecido, e pessoas descobrem que quatro rodas seriam melhores. Dado quantitativo é bom para testar hipóteses, e ruim para gerar novas sem introspecção humana (p.64-65).

**Armadilhas ao analisar dados (Monica Rogati, p.65-66), em três grupos:**

- *Qualidade do dado:* presumir que está limpo (um bug de instrumentação pode zerar uma parte dos valores), não normalizar (destinos de casamento viram lista de aeroportos movimentados) e tratar mal os outliers, seja excluindo (podem ser seus maiores fãs ou robôs) ou incluindo num modelo geral (distorcem recomendações).
- *Leitura dos números:* ignorar sazonalidade (hora, dia, mês), reportar crescimento sem o tamanho da base, enxergar padrão no ruído e não cruzar com dados externos que sugeririam experimentos.
- *Painéis e alertas:* despejar dados sem saber onde olhar (data vomit) e criar alertas tão sensíveis que passam a ser ignorados.

O livro enumera as armadilhas, sem procedimento de limpeza, de normalização ou limiar de outlier.

## 8. Metas e linhas na areia

- Escolher a métrica não basta: defina o número-alvo (p.86-87). Sem número, é difícil saber o que fazer depois do experimento. Fracasso total e sucesso enorme são óbvios; o difícil é o meio.
- Duas respostas certas para o que é sucesso (p.87): vem do **modelo de negócio** (ex.: se você precisa de 10% dos usuários no plano pago, esse é o número) ou, na falta do modelo, do que é **normal** no setor (baseline), como ponto de partida na ausência de outra informação.
- A meta inicial não é gravada em pedra (p.47-49): ajuste a meta ou a definição da métrica só se for honesto e justificável, e não para continuar apesar da evidência. No caso HighScore House, a meta de quatro usos por semana por pais e filhos para a família ser "ativa" não foi atingida; o CEO ligou para dezenas de pais e descobriu que famílias com um ou dois usos por semana já obtinham valor, e então redefiniram o limiar. O livro diz que isso era legítimo porque estava justificado por dado qualitativo, e que baixar a barra só para passar por ela é trapaça. O número 4 por semana é do caso, não referência.
- **Sem baseline externo (p.373-375):** o livro chama seus números de rudimentares. Derive o seu: plote o resultado ao longo do tempo e observe a assíntota; o ritmo de retornos decrescentes sugere um baseline e o momento de mudar de métrica. No exemplo do livro, a inscrição sobe de 0,3% para 8,2% em 30 dias e a tendência indica teto perto de 9%. Se o modelo de negócio supõe 7%, é hora de aumentar visitantes. O teto pode mudar se a estratégia de aquisição mudar. Regra do livro: não mova a linha até a sua capacidade, eleve a capacidade até a linha.
- Em dados de comparação (benchmark): o livro defende conhecer o "normal" para saber se você está no campo de jogo e se já é hora de parar de otimizar (retornos decrescentes), e avisa que o normal muda conforme o modelo vira mainstream (p.299-300). Um benchmark do livro vale como ponto de partida, e o próprio livro diz que médias não bastam (p.302).

## 9. Outras armadilhas citadas

- **Declarado × comportamento:** usuários mentem sem intenção e não querem ferir seus sentimentos. Ação vale mais que palavra, e popularidade de funcionalidades e o que o usuário fazia antes de desfazer ou voltar são sinais (p.236).
- **B2B:** medir "tempo desde o último uso" engana, porque o usuário é pago para usar; as perguntas reais são se gosta e se fica mais produtivo, com baselines do cliente antes da implantação (p.391-392).
- **Foco prematuro:** otimizar o que não importa para o estágio é, segundo o livro, forma certa de matar a startup (p.182).
- **Números bons que não pagam as contas:** no caso Parse.ly, milhares de usuários e boa imprensa conviviam com ausência de receita, e testes mostraram que os usuários gostavam do produto mas não pagariam (p.273). Se o modelo exige receita, métricas de uso positivas não bastam.
