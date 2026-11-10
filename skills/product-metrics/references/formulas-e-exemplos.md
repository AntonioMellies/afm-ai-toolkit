# Fórmulas e exemplos como o livro define

Fonte: *Lean Analytics* (Croll e Yoskovitz, 2013); páginas (p.N) são marcadores PDF, veja `fontes.md`. Regra desta página: só entra fórmula que o texto enuncia. Onde o livro **não** define algo com rigor, isso está dito. Os números dos exemplos são ilustrações do livro e não servem como referência para outro negócio. Contas marcadas como "conferência desta skill" são aritmética nossa sobre os dados do livro.

## Churn (p.121-124)

**Definição geral:** percentual de pessoas que abandonam o serviço ao longo do tempo. Escolha um período (semana, mês, trimestre) e use o mesmo em todas as métricas. Em freemium ou trial, calcule separadamente para usuários (não pagantes) e clientes (pagantes).

**Quem churna (p.122):** usuário não pagante cancela a conta ou deixa de voltar; usuário pagante cancela, para de pagar ou volta ao plano gratuito. O livro recomenda definir usuário inativo como quem não faz login há 90 dias (ou menos).

**Fórmula simples (atribuída a Steven Noble, p.122-123):**

```
churn = (nº de churns no período) / (nº de clientes no início do período)
```

Exemplo do livro: 26 pagantes perdidos em fevereiro para 1.035 no início do mês dá 2,5%. Com 2,5% de churn por mês, o cliente médio ficaria cerca de 40 meses (100 / 2,5), e daí se começa a calcular o valor do cliente: 40 meses vezes a receita mensal média por usuário (p.123).

**Por que a fórmula simples pode enganar (p.123):** os churns ocorrem ao longo do período, mas o número de clientes no início é um retrato de um instante; com crescimento variável ou muito rápido, o resultado engana.

**Correção parcial do livro:** usar a média entre o início e o fim do período no denominador. Mas, com crescimento em "taco de hóquei" (100 clientes no início, 10.000 no fim), a média supõe 5.050 no meio do período, o que não é verdade, porque os clientes novos e os churns se concentram no fim.

**Pior caso:** definir churn como "não voltou em 30 dias" compara as perdas do mês passado com os ganhos deste mês e é um indicador defasado: quando você descobre o problema, já é o mês seguinte.

**Duas simplificações propostas (p.123-124):** (1) medir o churn por coorte, comparando novos e saídos pela data em que se tornaram usuários; (2) medir o churn por dia, porque, quanto menor o período, menos a mudança dentro dele distorce a conta.

**Churn de pagantes (OfficeDrop, p.332):** número de pagantes que migram para o plano gratuito ou cancelam, dividido pelo total de pagantes disponíveis para churn no início do mês. É a definição de uma empresa, citada como exemplo; a meta de 4% daquela empresa (e o "bom" de 3%) é julgamento do caso.

**Em app móvel (p.135):** meça em um dia, uma semana e um mês, pois as causas diferem.

**Churn de audiência em mídia:** não incluído. A fórmula descrita no texto (p.144) diverge dos números da tabela na extração, e o livro não a define de forma conclusiva aqui.

## Tempo de vida e valor do cliente (CLV)

- **Vida média = 1 / churn** (p.123 e p.133): com 15% de churn mensal, 1/0,15 = 6,67 meses, no exemplo de jogo do livro.
- **CLV, no jogo do exemplo (p.133):** receita média por usuário (ARPU) multiplicada pela vida média, o que dá US$21,33 no exemplo (US$3,20 vezes 6,67).
- Para SaaS, o livro dá a conta do churn de 2,5% acima, 40 meses vezes a receita mensal média (p.123).
- **O livro não dá uma fórmula única e rigorosa de CLV.** Descreve-o como o valor do cliente "do berço ao túmulo" (p.117, p.132) e como a receita total que ele traz durante a relação (p.311). Também diz que o CLV que você calcula provavelmente está errado, porque o churn pesa muito nele e é indicador defasado; o executivo citado sugere, no início, oferecer só planos mensais para ver o churn real cedo (p.311-312).

## Custo de aquisição de clientes (CAC)

- **O livro não define CAC por fórmula.** Descreve-o como o dinheiro gasto para conseguir um cliente pagante (p.102, p.116). No caso do mobile, distingue o custo de um usuário e o de um pagante (p.131).
- **Regra básica (p.272):** gastar menos para adquirir clientes do que se obtém deles; o livro diz que isso é simplificado, porque só uma fração da receita pode ir para aquisição, e porque há atraso entre pagar para adquirir e ser pago de volta.
- **Regra de bolso, "não rígida" (p.311-312):** CAC abaixo de um terço do valor do cliente ao longo da vida. Razões do livro: o CLV está provavelmente errado, o CAC também (custos de onboarding e infraestrutura), você "empresta" dinheiro ao cliente enquanto não recupera o investimento, e a trava obriga a validar custos cedo. Se o custo de entregar é alto, pode ser necessário menos de um terço. Como orientação inicial, o livro diz para partir do modelo de negócio e das margens-alvo.
- **O que o livro cita de outras fontes (apenas como contexto):** relação CAC para CLV de quase 1 para 1 em aplicativos de consumo (projeto Startup Genome) e, em aplicações de ticket alto (CLV acima de US$50 mil), a maioria gastando de 0,2 a 2% do CLV em aquisição (p.302). Backupify: 5 a 6 vezes de CLV sobre CAC e alvo de payback de 12 meses ou menos por canal (p.118). São números de fontes específicas.
- **Payback de aquisição (p.118-119):** o CEO do Backupify descreve como um número único que reúne eficiência de marketing, receita por cliente, fluxo de caixa e churn. O livro não dá fórmula.

### Tempo até o breakeven do cliente (p.74, p.279)

O livro define por texto (quanto tempo leva para recuperar o custo de aquisição do cliente) e mostra um exemplo em tabela: CLV de US$27, 11 meses de atividade, receita média de US$2,45 por cliente por mês, CAC de US$14, e 5,7 meses até o breakeven. A conta que reproduz o exemplo (conferência desta skill, e não fórmula enunciada pelo livro) é CAC dividido pela receita mensal média: 14 / 2,45 = 5,7. O livro conclui que seriam necessários 5,7 meses de caixa para manter a empresa rodando (p.279).

### As quatro variáveis do equilíbrio de caixa (p.273)

Dinheiro em caixa no início, gasto mensal com aquisição, receita por usuário e taxa de churn. Captar demais dilui; captar de menos faltará caixa, porque o cliente paga ao longo do tempo e a aquisição é paga à vista. O livro não dá fórmula.

## Coeficiente viral e tempo de ciclo (p.256-258, p.312-313)

**Definição (David Skok, citada em p.256):** o número de novos clientes que cada cliente existente consegue converter.

```
taxa de convite   = convites enviados / usuários
taxa de aceitação = inscrições / convites
coeficiente viral = taxa de convite x taxa de aceitação
```

Exemplo do livro: 2.000 clientes enviam 5.000 convites (taxa 2,5); 500 são aceitos (10%); coeficiente de 25% (0,25).

**Ressalvas do livro:** na prática os usuários deixam de convidar e a rede satura, então o efeito composto (25% de 25%, e assim por diante) é otimista. O **tempo de ciclo** importa tanto que o autor o considera mais importante que o coeficiente: na planilha de exemplo dele, 20 dias com ciclo de dois dias chegam a 20.470 usuários, e com ciclo de um dia, a mais de 20 milhões. É uma planilha de exemplo, não dado real.

**Meta:** coeficiente acima de 1 significa produto autossustentável, mas o livro diz que um coeficiente sustentado acima de 1 é um "Santo Graal" raro. Mesmo abaixo de 1, ele reduz o CAC. Exemplo (p.313): US$1.000 para 100 usuários dá CAC de US$10; com coeficiente 0,4, os 100 convidam 40, que convidam 16, e assim por diante; o livro conclui que os 100 viram "165" e o CAC cai para US$6,06. Observação: a soma da série geométrica 100 / (1 - 0,4) dá cerca de 166,7; o livro arredonda para 165. Como regra de bolso, o livro diz que acima de 0,75 as coisas estão "muito boas", e que não existe virality "normal".

**Em B2B**, onde o convite por clique não é a norma, o livro sugere o net promoter score como proxy (p.257-258).

## Receita por usuário em app móvel (p.133-134)

- **ARPU** = receita / número de usuários ativos (ou jogadores), normalmente por mês. **ARPPU** é a receita média por usuário pagante (p.131). A porcentagem que paga é à parte.
- **Exemplo do livro (jogo gratuito):** cerca de 12.300 downloads no mês, 96% abrem e conectam, 30% se tornam engajados (jogam em três dias distintos), e cada engajado gera US$3,20 por mês. Os downloads do mês geram então cerca de US$11.339 (conferência desta skill: 12.300 x 0,96 x 0,30 x 3,20 dá cerca de US$11.336; a diferença vem de o texto falar em pouco mais de 12.300 downloads). Com 15% de churn mensal, a vida média é 6,67 meses e o CLV do jogador é de US$21,33. O livro afirma que, conhecendo o custo de adquirir um engajado, dá para calcular a contribuição, o retorno dos anúncios e o tempo de recuperação.

## Magic Number para SaaS (p.270-271)

Atribuído a Josh James, em 2008, para medir o retorno do gasto com vendas e marketing:

```
magic number = (QRR[x] - QRR[x-1]) / QExpSM[x-1]
```

em que QRR é a receita recorrente trimestral e QExpSM[x-1] é a despesa de vendas e marketing do trimestre anterior. Sem dado trimestral, divida o gasto anual por quatro, o que também suaviza sazonalidade. Resultado abaixo de 0,75 indica problema (cada dólar que entra na máquina devolve menos); acima de 1 indica que dá para financiar o crescimento reinvestindo em vendas e marketing. **Inconsistência no texto:** a introdução fala em mudar a receita recorrente "anual", mas a fórmula e os insumos usam receita recorrente trimestral; esta skill reproduz a fórmula como está listada.

## Outros números que o livro define como razão

- **Razão de custo de pessoal sobre receita bruta do dia anterior (Solare, p.85):** a razão funciona, segundo o dono, porque é simples, imediata, acionável, comparável e fundamental. Os limiares (acima de 30% ruim, 24% certo) valem para aquele restaurante.
- **Razão de reservas às 17h para clientes da noite (p.86):** 5 para 1 para o Solare; não serve para restaurantes de outro perfil, e o livro diz isso. Bom exemplo de leading indicator local.
- **Razão dia-semana em UGC (p.153):** quantos dos visitantes de hoje estiveram aqui antes na semana.
- **Taxa de recompra anual (p.99):** percentual de quem comprou no ano passado que compra neste ano.
- **Preço:** o livro diz que não há regra clara do que cobrar e que testar é essencial; achado o ponto de receita máxima, sugere mirar cerca de 10% abaixo dele para estimular o crescimento da base (p.311). É uma sugestão, e não uma fórmula.
