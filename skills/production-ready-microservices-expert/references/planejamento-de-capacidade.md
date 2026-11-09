# Escalabilidade, desempenho e planejamento de capacidade

Material de apoio para responder "quantas instâncias, de quê, até quando". Paráfrase do capítulo de escalabilidade e desempenho do livro de Susan J. Fowler (páginas PDF entre parênteses; detalhes e citações em `fontes.md`). O que não vem do livro está marcado como **convenção desta skill**.

## Quando usar

- Dimensionar um serviço novo ou prever o impacto de crescimento de tráfego.
- Investigar por que um serviço não escala (gargalo) ou por que o hardware está ocioso.
- Preparar um teste de carga ou revisar o orçamento de infraestrutura.

## Sequência que o livro usa (cada passo alimenta o próximo)

1. **Escala de crescimento qualitativa (p.115-118).** Ligue o serviço a uma métrica de negócio do produto, como usuários, pedidos ou aberturas do aplicativo. "Aguenta x requisições por segundo" sozinho não responde nada sem saber *onde* o serviço entra no fluxo (p.116-117). Para ferramentas internas de plataforma, a escala é expressa pelos clientes delas (nº de deploys, de serviços, volume de logs, gigabytes) (p.118).
2. **Escala de crescimento quantitativa (p.118-119).** Traduza a métrica de negócio em quantidade mensurável (requisições, consultas ou transações por segundo). Exemplo do texto: cada "olho no aplicativo" gera duas requisições e uma transação de banco, então a escala vira RPS e TPS.
3. **Requisitos de recursos por instância (p.121-122).** Meça quanto tráfego, CPU e memória *uma* instância consome. CPU e RAM são os principais; em ambiente multithread, threads viram o terceiro. Inclua outros recursos específicos, como conexões de banco e cotas de logging (p.121).
4. **Gargalos de recursos (p.122-123).** Gargalo é o que limita a escala por causa de como o serviço usa recursos: o limite de conexões do banco, ou só conseguir crescer aumentando CPU/RAM por máquina (escala vertical). O livro manda refatorar para escalar horizontalmente com simultaneidade e particionamento. Gargalos não óbvios aparecem sob teste de carga (p.123, 162).
5. **Planejamento de capacidade (p.123-125).** Definir as necessidades de hardware de cada serviço com antecedência, entrar no orçamento e reservar o hardware. Entradas: escalas de crescimento, métricas de negócio e previsões de tráfego, gargalos e requisitos conhecidos, histórico de tráfego (p.124).
6. **Dependências (p.125-127).** Um serviço perfeitamente escalável ainda sofre se uma dependência crítica não escala junto; e o seu serviço não deve ser gargalo dos clientes.
7. **Tráfego (p.127-129).** Conhecer os padrões de tráfego, tratar picos sem cair e saber redirecionar tráfego entre datacenters.

## Quantas instâncias

O livro dá o método, não uma fórmula: descobrir o que *uma* instância trata (tráfego, CPU, memória) e escalar horizontalmente adicionando servidores com o serviço implantado (p.122). A projeção de carga vem da cadeia métrica de negócio, requisições por unidade e previsão de negócio (o exemplo de 20 mil novos visitantes únicos no trimestre, p.124).

**Convenção desta skill** (não é do livro), para transformar isso em número:

```
instâncias = ceil( pico projetado (RPS) / (RPS por instância medido x utilização alvo) ) + reserva para falhas
```

Os valores de utilização alvo e de reserva são decisões do time. Registre-os junto com a medição que os justifica e valide com teste de carga (p.162).

## Previsão de tráfego: o que o livro oferece e o que não oferece

- O livro **não traz modelo de previsão**. Ele aponta fontes: previsões de negócio ligadas à escala qualitativa (p.117-118, 124), dados históricos de tráfego (p.116, 124, 128) e teste de carga com tráfego acima do atual (p.116, 162).
- Alerta explícito: calcular a escala só com o tráfego de hoje torna a inferência sobre o futuro arriscada (p.116).
- Se a equipe de negócio não tem previsão, registre isso como risco de capacidade em vez de inventar uma curva (**convenção desta skill**).

## Orçamento, prazo e automação

- Hardware é caro e precisa estar no orçamento antes de ser necessário; falta de hardware vira queda de disponibilidade e custo para a empresa (p.123-125).
- Descubra o prazo real para obter hardware novo antes de agendar o planejamento (p.125).
- O planejamento manual introduz erros de cálculo; o livro recomenda automatizar o máximo, por exemplo com ferramenta de autosserviço na plataforma (p.125).
- Quando os recursos são escassos, serviços críticos para o negócio recebem prioridade (p.119-120).
- Subutilização custa dinheiro, mas é diferente de folga de capacidade planejada: pese as duas juntas (p.77).
- Em hardware compartilhado, isole os serviços (por exemplo, contêineres com isolamento de recursos) para que um vizinho não degrade os outros (p.120).

## Dependências e comunicação entre equipes

- Avise donos de dependências e clientes quando espera crescimento (p.73, 127).
- Reuniões de revisão de arquitetura e escalabilidade entre equipes cujos serviços dependem uns dos outros funcionaram para o livro: cada serviço apresenta arquitetura e limites e o grupo decide o que fazer para escalar o conjunto (p.127).
- Teste de carga em produção exige avisar todas as dependências (p.164). Veja o arquivo de testes de resiliência.

## Gerenciamento de tráfego

- Programe mudanças, indisponibilidades operacionais e deploys fora dos horários de pico; calibre os limites de monitoramento pelo padrão de tráfego do serviço (p.128).
- Picos repentinos não podem derrubar o serviço nem os sistemas de monitoramento e logging; trate-os como parte do pacote de resiliência (p.129).
- Cada serviço precisa saber redirecionar tráfego de um datacenter para outro sem perder disponibilidade (p.129).

## Dados e testes (resumo)

- Banco errado, esquema errado ou banco sem suporte a "locação de teste" limita a escala (p.133). Feche conexões corretamente: bancos têm limite de conexões simultâneas (p.135).
- Dados de teste escritos em staging parcial devem ser marcados como teste e apagados em intervalos regulares (p.135-136).

## Perguntas de verificação

Responda com evidência (medição, painel, relatório de carga):

- Qual a escala qualitativa e a quantitativa? Quem confirmou a previsão de negócio?
- Quanto tráfego, CPU e memória cada instância usa? Quais outros recursos limitam (conexões, threads, cotas)?
- O serviço só cresce com escala vertical? Há gargalo já identificado e tratado?
- O planejamento é programado, automatizado e tem prazo de hardware conhecido? Quem tem prioridade na escassez?
- As dependências aguentam o crescimento esperado e seus donos foram avisados?
- Mudanças respeitam o padrão de tráfego? Um pico ou a perda de um datacenter foi testado?

## Convenções desta skill (sem base no livro)

- A fórmula de instâncias acima e as margens de utilização.
- "Nunca escale sem diagnosticar o gargalo": o livro apoia apenas que se deve conhecer o comportamento de uma instância antes de escalar horizontalmente (p.122).
