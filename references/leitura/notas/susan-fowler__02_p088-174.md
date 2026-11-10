# Notas de leitura: Susan J. Fowler, Microsserviços Prontos para a Produção (PT) — bloco 02, PDF p.88-174

Convenções: "p.N" = PDF PAGINA N do marcador. O número impresso de rodapé NÃO aparece no texto extraído (nenhum "impr. M" disponível). Citações são curtas e fiéis ao texto extraído. Itens marcados [posição do livro] são afirmações do autor que podem ser discutíveis; foram registradas sem endosso.

Estrutura do bloco: fim do Cap. 3 (Estabilidade e confiabilidade, p.88-112), Cap. 4 completo (Escalabilidade e desempenho, p.113-138), Cap. 5 quase completo (Tolerância a falhas e preparação para catástrofes, p.139-174; truncado no início do estágio "Coordenação" da resposta a incidentes).

---

### Cap. 3 — Estabilidade e confiabilidade (PDF p.88-112) [continua do bloco anterior; começa no meio de uma frase na p.88]

Resumo: O capítulo defende que a maioria das falhas vem de código ruim que passou sem ser detectado, e que a resposta é um ciclo de desenvolvimento padronizado, um pipeline de deployment em três fases (staging, pré-release/canary, produção), conhecimento e mitigação de dependências, roteamento/descoberta com health checks e circuit breakers, e descontinuação/desativação cuidadosas. Termina com listas de perguntas de avaliação por tópico.

Lista de critérios de "serviço estável e confiável" (p.88): ciclo de desenvolvimento padronizado; testes lint/unidade/integração/fim a fim; teste, empacotamento, versão e release totalmente automatizados; pipeline padronizado staging/pré-release/produção; clientes conhecidos; dependências conhecidas com backups, alternativas, fallbacks e cache; roteamento e descoberta estáveis.

#### Ciclo de desenvolvimento (p.88-90)
Conceitos e regras:
- Maioria das interrupções vem de erros de código não detectados no desenvolvimento, nos testes ou no deploy; a mitigação típica é reverter à última versão estável e reimplantar [p.88].
- Etapas: alteração em ramo individual a partir de repositório central, testes de unidade/integração, depois revisão por outros engenheiros; só com aprovação e lint/unidade/integração verdes a mudança entra no repositório e então no pipeline [p.89-90].
- Ambiente de desenvolvimento deve refletir a produção, especialmente se o teste exige chamar outros serviços ou ler/escrever em database [p.90].
- Dica do autor: rodar todos os testes (lint, unidade, integração, fim a fim) ANTES da revisão de código, no ramo, liberando a revisão só após sucesso [p.90].
- Entre desenvolvimento e pipeline há empacotamento, build e teste completo antes do primeiro estágio [p.90-91].

#### Pipeline de deployment (p.91-103)
Resumo: Implantações ruins são a causa principal de interrupções; com dezenas a milhares de equipes implantando sem coordenação, um pipeline padronizado em toda a organização é a salvaguarda. Três estágios isolados (Fig. 3.2).
Conceitos e regras:
- Staging: cópia do ambiente de produção sem tráfego real; geralmente sem paridade de servidor (custo), e a capacidade do staging pode ser uma porcentagem da produção, definida pelo método de teste usado [p.92]. Métodos de teste em staging: tráfego simulado/gravado, teste manual de endpoints, testes automatizados de unidade/integração/especializados, ou combinação [p.93].
- Tratar staging e produção como "implantações" ou "fases" separadas do MESMO serviço (e não como serviços/repositórios separados), para não dessincronizar mudanças, em especial de configuração [p.93].
- Versão em staging já é candidata à produção: precisa ter passado lint, unidade, integração e revisão; o deploy em staging deve ter a mesma seriedade que o de produção [p.93].
- Staging total (p.94-95): ecossistema staging separado, cópia integral da produção (não necessariamente com paridade de servidor); staging só fala com staging, nunca com produção; nunca escreve em databases de produção e leitura de produção também não recomendada; cada serviço tem database de teste próprio com leitura e escrita. Risco: novas versões falam com novas versões de dependências, o que pode não refletir o mundo real; pode exigir coordenar/agendar deploys em staging [p.95].
- Staging parcial (p.95-97): cada serviço tem seu pool de staging que conversa com clientes e dependências de PRODUÇÃO; exige testes específicos de staging e pelo menos um novo teste de staging por novo recurso [p.96]. Risco: deploy ruim em staging pode derrubar serviços de produção, mesmo só com leituras. Acesso ao database restrito a leitura; para testar escrita: "locação de teste" (test tenancy, marcar dados escritos como teste), sendo o mais seguro escrever em database de teste separado [p.97].
- Tabela 3.1 (p.97): staging total x parcial; rollbacks automatizados são exigidos no parcial e não no total.
- Staging deve ter dashboards, monitoramento e logging idênticos aos de produção, com alertas/logs diferenciados por tipo de implantação (staging/pré-release/produção) para indicar qual ambiente tem o problema [p.97-98]. Dashboards devem permitir que alguém de fora avalie rapidamente a saúde do serviço [p.98].
- Rollback automatizado é obrigatório em staging parcial; o gatilho de rollback é definido por limites em métricas principais; passos que exigem intervenção manual são pontos de falha para todo o ecossistema [p.98].
- Quanto tempo em staging: até passar nos testes específicos da fase sem falhas [p.99].
- Pré-release (canary) (p.99-101): servidores com 5% a 10% da capacidade de produção, recebendo tráfego real; se sobreviver, vai ao resto. Se há vários datacenters/regiões/clouds, o conjunto canary deve ter servidores em cada um [p.99]. Pré-release é parte da produção: mesmas portas frontend/backend, servidores escolhidos ALEATORIAMENTE do pool de produção, acesso total a dependências e databases [p.99-100]. Não usar portas separadas para canary, pois isso derrota a amostragem aleatória [p.100]. Dashboards/logs iguais à produção, alertas identificados como canary [p.100]. Rollback automatizado é "necessidade absoluta" no canary [p.100].
- Duração no canary: minutos, horas ou dias; definida pelos padrões de tráfego; só sai quando um ciclo completo de tráfego termina; a definição de "ciclo de tráfego" deve ser padronizada na organização e a duração criada por serviço [p.100-101].
- Produção (p.101): só chega quem passou por staging e canary; pode ser total de uma vez ou gradual por porcentagem de hardware (ex.: 25%, 50%, 75%, 100%) ou por datacenter/região/país [p.101].
- Impondo deploy estável (p.101-103): o atraso do pipeline é pequeno e personalizável; implantar várias vezes por dia compromete estabilidade [posição do livro]. Pular fases só em interrupção gravíssima; "correções de emergência" são antipadrão (podem introduzir novos erros por falta de teste); preferir voltar à última versão estável [p.102-103].
- Bloqueio de deploys: se a cota de downtime do SLA esgotou, deploys podem ser bloqueados (exemplo: SLA 99,99% permite 4,38 min/mês; 12 min de downtime em um mês poderia bloquear deploys por três meses); falha em teste de carga pode bloquear deploy em produção; serviços críticos que não atendem aos critérios de disponibilidade da organização às vezes têm deploy bloqueado [p.103].

#### Dependências (p.104-106)
Conceitos e regras:
- Todo serviço tem clientes upstream e dependências downstream; preparar, mitigar e proteger-se de falhas de dependência é um dos aspectos mais importantes [p.104].
- Exemplo "recebimento-transmissor" (SLA 99,99%) dependente de "clientes" com uptime real de 89,99%: disponibilidade cai para 89,98%; não cumprir SLA é uma falha de dependência [p.104-105].
- Dependências precisam ser conhecidas, documentadas e rastreadas: entram no diagrama/documentação de arquitetura e no dashboard; grafos de dependência gerados automaticamente via rastreamento distribuído em todos os serviços [p.105].
- Mitigação por dependência: alternativa (outro endpoint), fila para requisições enquanto a dependência está fora, ou cache dentro do serviço [p.105-106]. Cache LRU como "cache defensivo": barato, rápido, sem chamadas de rede; não é necessário para toda dependência, mas protege contra dependências não confiáveis [p.106].

#### Roteamento e descoberta (p.106-108)
Conceitos e regras:
- Camada de comunicação deve proteger contra padrões de tráfego danosos; partes relevantes: descoberta de serviços, registro de serviços, balanceamento de carga [p.106-107].
- Health checks constantes para que nunca se envie requisição a servidor/serviço doente; fazê-los em CANAL SEPARADO do tráfego geral; "200 OK" fixo no /health é suficiente para a maioria mas não ideal, pois só diz que o serviço subiu parcialmente; o endpoint deve dar resposta útil e precisa [p.107].
- Instância doente: balanceador para de rotear; serviço inteiro doente (percentual ou todos os servidores falhando check): para de receber tráfego [p.107].
- Health check não é o único fator: muitas exceções não tratadas também devem tornar o serviço "não saudável", com circuit breakers acionados quando há taxa anormal de erros [p.107-108].

#### Descontinuação e desativação (p.108-109) — ALTA para este tema
Resumo: Causa "geralmente esquecida" de instabilidade; descontinuar endpoints de API ou desativar serviços exige tratar clientes; o livro afirma que é mais problema sociológico que técnico.
Conceitos e regras:
- Desativar serviço ou descontinuar endpoint pode quebrar clientes; descontinuar endpoints é ainda mais comum (recursos mudam, endpoints mudam) [p.108].
- Ao desativar: alertar todos os clientes e orientá-los; se há substituto ou funcionalidade absorvida por outro serviço, ajudar clientes a migrar para os novos endpoints [p.108]. Mesmo processo para endpoint: avisar clientes, informar o novo endpoint ou como lidar com a perda definitiva [p.108-109].
- Monitoramento é crítico: acompanhar de perto as chamadas ao endpoint/serviço antes da desativação para ver se ainda há solicitações [p.109].
- Abandono: serviços antigos sem supervisão têm falhas despercebidas e demoram a ser corrigidos; devem ser DESATIVADOS, não abandonados [p.109].
- Nada causa mais instabilidade que a perda repentina de uma dependência, mesmo que prevista por outra equipe [p.109].
Citações curtas de prova (Cap. 3):
- "a descontinuação e a desativação são mais um problema sociológico dentro da organização de engenharia de software do que um problema técnico" [p.108]
- "tais microsserviços devem ser desativados em vez de abandonados" [p.109]
- "um microsserviço que muda de hora em hora raramente é estável ou confiável" [p.102]
- "Correções de emergência são um antipadrão" [p.103]
- "Quaisquer passos do processo de implantação que precisem de intervenção manual são pontos de falha" [p.98]

#### Avalie seu microsserviço (p.110-112)
Listas de perguntas por tópico (ciclo de dev, pipeline, dependências, roteamento/descoberta, descontinuação/desativação) — enumeradas: repositório central; ambiente dev fiel à produção; testes lint/unidade/integração/fim a fim; política de code review; processo de teste/empacotamento/build/release automatizado; pipeline padronizado; staging total ou parcial; acesso do staging a serviços de produção; canary existe, com duração suficiente, com amostra aleatória do tráfego, com portas iguais às de produção; deploy em produção total ou gradual; procedimento para pular staging/canary em emergência; dependências e clientes conhecidos; mitigação por backup/alternativa/fallback/cache defensivo; health checks confiáveis, precisos e em canal separado; circuit breakers para serviços doentes e para tráfego a servidores doentes; procedimento para desativar serviços e para descontinuar endpoints [p.110-112]. p.112 contém ainda uma nota de rodapé sobre canários (mais sensíveis que humanos).

O que este trecho NÃO diz: não define versionamento de API nem contrato; não fala de blue-green nem rolling update por nome; não fala de feature flags; não detalha como rodar testes lint/unidade (isso vem no Cap. 5); não distingue liveness/readiness/startup; não fala de segurança (autenticação, autorização, segredos); não detalha prazos/janelas de deprecação nem formato de aviso (sem períodos de sunset nem cabeçalhos); a documentação é só referenciada (Cap. 7 fora do bloco).
Relevância: production-ready-microservices-expert: ALTA (pipeline staging/canary/produção, rollback automatizado, deploy bloqueado por SLA/carga, dependências, health checks, descontinuação/desativação). api-design-expert: BAIXA (só o processo de aviso/migração de clientes ao descontinuar endpoints; não há contratos nem versionamento). dev-practices: MÉDIA (ciclo de desenvolvimento, testes antes da revisão, automação do teste/empacotamento/release).
Decisão sugerida: usar em production-ready-microservices-expert (novos references: pipeline-deployment, dependencias-e-roteamento, descontinuacao-desativacao); aproveitar o ciclo de desenvolvimento em dev-practices; para api-design-expert, no máximo uma seção curta de "ciclo de vida de endpoint" (descontinuar com monitoramento de uso).

---

### Cap. 4 — Escalabilidade e desempenho (PDF p.113-138)

Resumo: Eficiência é central em sistemas distribuídos; escalabilidade (dividir e conquistar via simultaneidade e particionamento) e desempenho (eficiência) são padrões de disponibilidade de produção interligados. O capítulo cobre escalas de crescimento qualitativa e quantitativa, uso eficiente de recursos, requisitos e gargalos de recursos, planejamento de capacidade, escala de dependências, gerenciamento de tráfego, tratamento de tarefas, escolha de linguagem e armazenamento de dados.

Critérios de "serviço escalável e de alto desempenho" (p.115): escalas de crescimento conhecidas; uso eficiente de hardware; gargalos e requisitos identificados; planejamento de capacidade automatizado e programado; dependências crescem junto; cresce com os clientes; padrões de tráfego compreendidos; tráfego redirecionável em falhas; linguagem adequada; tarefas tratadas eficientemente; dados armazenados de forma escalável.

#### Escalas de crescimento (p.115-119) — ALTA
Conceitos e regras:
- Escala qualitativa: vincula o serviço às métricas de negócio de nível superior (usuários, "eyeballs", pedidos/entregas), que pertencem ao produto e não ao serviço individual [p.116-117]. Dizer apenas "aguenta X RPS/QPS" é informação "inútil sem contexto" [p.116]. Perguntas do autor para achar a escala: quando a solicitação é feita (por viagem, ao abrir o app, ao cadastrar usuário)? [p.117].
- Só olhar carga atual para inferir capacidade futura pode induzir a erro; alternativas: teste de carga e análise de dados históricos de tráfego [p.116].
- Ferramentas internas/plataforma/infra: difícil expressar em métricas de negócio; usar o número de implantações, de serviços, de logs agregados, GB de dados etc., tão previsíveis quanto possível [p.118].
- Escala quantitativa: traduz a qualitativa em quantidade mensurável (ex.: cada "eyeball" gera 2 requisições e 1 transação de database, então medir em RPS e TPS) [p.118-119]. Será usada para prever custos operacionais, hardware e limitações [p.119].

#### Uso eficiente de recursos (p.119-120)
- Tratar CPU, memória, armazenamento e rede como recursos finitos e disputados; priorizar serviços críticos ao negócio na alocação quando o recurso é escasso [p.119-120].
- Hardware dedicado (um serviço por servidor) é caro e ineficiente; compartilhar é, em geral, mais eficiente mas exige isolamento (contêiner Docker + isolamento de recursos) para evitar vizinhos barulhentos [p.120]. Abstração de recursos (ex.: Apache Mesos) permite alocação dinâmica [p.120].

#### Percepção de recursos: requisitos e gargalos (p.120-123) — ALTA
- Requisitos de recursos: CPU e RAM de UMA instância (threads como terceiro recurso em ambientes multithread); incluir recursos adicionais (conexões de database, quotas de logging) [p.121]. Método: medir um servidor só (quanto tráfego, CPU, memória) para saber quantos servidores adicionar ao escalar horizontalmente [p.122].
- Gargalo de recurso: limite inerente ao uso de recursos (ex.: número de conexões abertas ao database perto do limite); depender de escalar verticalmente é gargalo e abandona simultaneidade e particionamento [p.122]. Gargalos não óbvios são descobertos com testes de carga exaustivos [p.123].
- "O escalamento vertical não é uma forma sustentável..." [p.123] (callout): otimizar sempre para simultaneidade e particionamento.

#### Planejamento de capacidade (p.123-125) — ALTA (tema pedido)
Conceitos e regras:
- Garantir acesso a hardware conforme o serviço cresce; hardware custa e orçamentos são planejados com antecedência [p.123].
- Princípios (p.124): determinar necessidades de hardware de cada serviço com antecedência, incorporá-las ao orçamento, e garantir que o hardware seja reservado. Insumos: escalas de crescimento qualitativa/quantitativa, métricas e previsões de negócio, gargalos e requisitos conhecidos, histórico de tráfego.
- Exemplo (p.124): se o serviço cresce com visitantes únicos, cada visitante equivale a N RPS e a empresa prevê 20 mil novos visitantes no trimestre, a necessidade de capacidade do trimestre é calculável.
- Fazer o exercício de forma programada ANTES do orçamento, para o hardware não faltar por orçamento incompleto [p.124]. Custo de planejar mal: menor disponibilidade, interrupções, dinheiro [p.124-125].
- Alerta: descobrir o tempo de espera (lead time) para comprar/instalar/configurar hardware novo antes de agendar o planejamento [p.125].
- Planejamento manual introduz falhas (cálculo errado); automatizar, idealmente com ferramenta de autosserviço na camada de plataforma de aplicação [p.125].

#### Escalamento de dependências (p.125-127)
- Se uma dependência crítica não escala, toda a cadeia sofre; também é preciso garantir que o próprio serviço não seja gargalo para seus clientes [p.126].
- Vincular a escalabilidade de cada serviço às métricas de negócio (escala qualitativa) alinha as equipes mesmo com comunicação difícil [p.126].
- Equipes donas das dependências devem ser alertadas de picos de crescimento esperados; prática do autor: reuniões de revisão de arquitetura e escalabilidade entre equipes cujos serviços se encadeiam [p.127].

#### Gerenciamento de tráfego (p.127-129)
- Três aspectos: prever crescimento com as escalas; entender padrões de tráfego; tratar aumentos e picos súbitos [p.127-128].
- Padrões de tráfego permitem agendar mudanças, downtimes e deploys fora dos horários de pico e ajustar limites de monitoramento ao padrão do serviço [p.128].
- Picos: preparar infraestrutura, monitoramento, logging e equipes como parte dos testes de resiliência [p.129].
- Multi-datacenter: roteamento entre datacenters é responsabilidade da infraestrutura (camada de comunicação), mas cada serviço deve estar preparado para ter o tráfego redirecionado sem perder disponibilidade [p.129].

#### Tratamento e processamento de tarefas (p.129-132)
- A linguagem influencia a capacidade de processar tarefas de forma escalável; escolher por limitações de escalabilidade/desempenho, não por moda, diversão ou familiaridade [p.130-131]. "Não existe a melhor linguagem" [p.131].
- Simultaneidade (dividir tarefas) e particionamento (processar partes em paralelo com workers; adicionar workers para mais demanda) [p.131-132]. O livro sugere C++, Java ou Go como construídas para simultaneidade/particionamento e que Python introduz gargalos difíceis de mitigar; serviços já escritos em linguagens limitadas "podem (e devem) ser reescritos" [p.132] [posição do livro, discutível e datada].
- Três perguntas que a equipe deve saber responder: como processa tarefas, com que eficiência, como se comporta quando as requisições aumentam [p.131].

#### Armazenamento escalável de dados (p.132-136)
- Database errado, schema errado ou database sem suporte a test tenancy compromete a disponibilidade [p.133].
- Quem é dono do database: plataforma (database como serviço) ou equipe do microsserviço; o autor recomenda oferecer DB como serviço na plataforma e permitir que equipes rodem o próprio se o oferecido não servir [p.133-134].
- Perguntas para escolher database (p.134): transações por segundo; tipo de dado; schema e frequência de mudança; consistência forte ou eventual; leitura/escrita intensiva; escala horizontal ou vertical. Posição do livro: se escala horizontal ou leitura/escrita paralela, escolher NoSQL, pois relacionais têm dificuldade [p.135] [posição do livro, discutível].
- Bancos compartilhados: competição por espaço; projetar para escalar quando um serviço "inquilino" precisar de mais [p.135]. Fechar conexões corretamente por causa de limites de conexões [p.135].
- Dados de teste (fim a fim, carga, staging): marcar como teste (test tenancy) e apagar a intervalos regulares [p.135-136].

#### Avalie seu microsserviço (p.136-138)
Perguntas por tópico: escala qualitativa/quantitativa; hardware dedicado ou compartilhado e abstração de recursos; requisitos (CPU, RAM, tráfego por instância, outros); gargalos; vertical x horizontal; planejamento de capacidade programado, lead time de hardware, frequência de pedidos, prioridade entre serviços, automatizado ou manual; dependências escaláveis e donos preparados; padrões de tráfego entendidos, mudanças agendadas segundo o padrão, picos tratados, roteamento automático entre datacenters; linguagem adequada; limitações no tratamento de requisições/tarefas; tipo de dado, schema, TPS, leitura x escrita, replicação/particionamento, database dedicado x compartilhado, tratamento de dados de teste [p.136-138].

Citações curtas de prova (Cap. 4):
- "inútil sem contexto adicional" (sobre RPS/QPS isolado) [p.116]
- "O escalamento vertical não é uma forma sustentável ou escalável de projetar microsserviços" [p.123]
- "construir e executar uma ferramenta de planejamento de capacidade do tipo autosserviço" [p.125]
- "Não existe a “melhor” linguagem para escrever um microsserviço" [p.131]

O que este trecho NÃO diz: não dá fórmula numérica de dimensionamento além do exemplo qualitativo; não cobre autoscaling/HPA, filas de backpressure, rate limiting, cache distribuído nem otimização de código; não trata sharding em detalhe; não cobre custo em nuvem pay-per-use (fala de compra de hardware e orçamento); as recomendações de linguagem e de NoSQL refletem a posição da autora e estão sem comparativos.
Relevância: production-ready-microservices-expert: ALTA (escala de crescimento, requisitos/gargalos, planejamento de capacidade, escala de dependências, padrões de tráfego, dados de teste). api-design-expert: NENHUMA. dev-practices: BAIXA (simultaneidade/particionamento, só conceito).
Decisão sugerida: usar em production-ready-microservices-expert (novo reference: escalabilidade-e-capacidade, com a escala qualitativa->quantitativa->capacidade->orçamento e a lista de requisitos/gargalos); descartar as recomendações de linguagem e NoSQL, ou registrá-las apenas como "posição datada".

---

### Cap. 5 — Tolerância a falhas e preparação para catástrofes (PDF p.139-174) [continua no próximo bloco: truncado no estágio "Coordenação", p.174]

Resumo: Falhas são inevitáveis; o capítulo propõe eliminar pontos únicos de falha, catalogar cenários de falha por camada, testar resiliência (código, carga, caos), automatizar detecção/mitigação e padronizar a resposta organizacional a incidentes.

Critérios de "serviço tolerante a falhas" (p.141-142): sem ponto único de falha; cenários de falha e catástrofes identificados; testes de resiliência por código, carga e caos; detecção e mitigação automatizadas; procedimentos padronizados de incidentes e interrupções.
Ordem dos passos (p.140-141): eliminar SPOFs, identificar cenários, testar, e por fim passos organizacionais; toda nova falha vivida deve ser adicionada ao conjunto de testes de resiliência para que não volte [p.141].

#### Pontos únicos de falha (p.142-144) — ALTA
- Qualquer parte da arquitetura do serviço que o derrube é SPOF; a maioria dos serviços reais tem vários [p.142].
- Exemplo Redis (broker) + Celery (workers) em Python: se workers param, as tarefas acumulam no Redis; com milhares de req/s a memória do Redis esgota, tarefas são perdidas, e se a máquina Redis é compartilhada, outros serviços também perdem tarefas [p.142-143].
- Técnica para achar SPOFs: revisão de arquitetura com cada equipe desenhando a arquitetura em quadro branco e perguntando "O que acontece se esta parte falhar?" [p.143].
- Em um ecossistema não há SPOF isolado: o de um serviço costuma ser SPOF da cadeia de dependências [p.143].
- Se não puder eliminar (ex.: tecnologia imposta pela organização), mitigar as consequências [p.144].

#### Cenários de catástrofe e falha (p.144-157) — ALTA (catálogo)
Resumo: Qualquer falha possível ocorrerá; o autor agrupa em falhas comuns do ecossistema (operacionais), de hardware, de comunicação/plataforma, de dependência e internas. Catálogo da lista-resumo de cada categoria:
- Exemplos de catástrofes citadas: racks que caem, falha de HVAC, database de produção apagado por acidente, desastres naturais que destroem datacenters [p.144]; bibliotecas corrompidas/perdidas, monitoramento falhando, logs perdidos [p.145].
- Falhas comuns em todos os níveis (p.145-148): revisão insuficiente de design de arquitetura de sistema/serviço (envolver engenheiros de cada camada; revisões programadas porque a infra muda muito em 1-2 anos) [p.146]; revisões de código incompletas (velocidade de desenvolvimento e troca de contexto) [p.147]; processos de desenvolvimento ruins; procedimentos de deploy instáveis [p.147-148]. Mitigação: cultura de code review com tempo dedicado, testes extensivos, pipeline estável [p.148].
- Hardware (p.148-150): falha de servidor, de rack, de datacenter, de provedor de nuvem, de provisionamento, da tecnologia de isolamento/abstração de recursos, gerenciamento de configuração separado, falhas causadas por mudanças de configuração, lacunas no monitoramento e logging em nível de servidor, falha de rede, downtimes operacionais, falta de redundância de infraestrutura [p.150].
- Comunicação e plataforma de aplicação (p.150-153): falhas de rede, erros de DNS, falhas de RPC (canal único de RPC; separar canais de RPC e health check mitiga), tratamento inadequado de requisições/respostas, falhas no sistema de mensageria (filas/brokers sem backup), falhas de descoberta/registro de serviços, balanceamento incorreto, falhas nas ferramentas e ambiente de desenvolvimento, nos pipelines de teste/empacotamento/versão/release, no pipeline de deploy (impede também correções críticas), lacunas de logging e monitoramento no nível do microsserviço [p.151-153].
- Dependência (p.153-155): falha/interrupção de serviço downstream, interrupções de serviços internos ou de terceiros, falhas de bibliotecas internas ou de terceiros, dependência que não cumpre o SLA, descontinuação/desativação de endpoint de API ou de microsserviço, descontinuação de interface, timeouts para serviço downstream e para dependência externa [p.155]. Disponibilidade do serviço = sua própria disponibilidade multiplicada pela das dependências downstream [p.154]. Dependências de terceiros: escolher estáveis e estabelecidas, evitar a menos que indispensável, senão viram SPOF [p.154-155].
- Posição do livro sobre versões [p.154]: não recomenda atribuir versões a bibliotecas e microsserviços internos nem prender-se a versões específicas deles, pois o desenvolvimento é acelerado e isso leva a usar versões instáveis, não confiáveis e às vezes "não seguras". [posição do livro; importante para api-design-expert: o livro NÃO sustenta versionamento de API, ao contrário sugere evitar]
- Internas do serviço (p.155-157): revisões de código incompletas, arquitetura e projetos precários, falta de testes de unidade e integração, deploys ruins, falta de monitoramento, tratamento inadequado de erros e exceções (exceções não tratadas ou "engolidas"), falha no database, limitações de escalabilidade [p.157]. Observação: assumindo infra estável, a maioria dos incidentes é autoinfligida [p.155-156].

#### Teste de resiliência (p.157-168) — ALTA (tema pedido)
- Definição: submeter ativamente o serviço, de forma repetida e aleatória, a todos os cenários de falha em produção [p.157]. Três tipos: teste de código, teste de carga, teste de caos [p.158].
- Teste de código (p.158-161): aplicado em todas as camadas, não só nos microsserviços (descoberta, gestão de configuração etc.) [p.158]. Quatro tipos: lint (sintaxe/estilo/guias) [p.159]; unidade (unidades pequenas e independentes; só isso não basta) [p.159]; integração (componentes combinados) [p.159]; fim a fim (simulam tráfego real: acessam endpoints de clientes, do próprio serviço e das dependências, leem databases e detectam problemas no fluxo de requisição) [p.160]. Automação: unidade e integração rodam em sistema externo logo após a revisão de código; rejeição impede entrada no pipeline como candidata à produção [p.160-161].
- Teste de carga (p.161-166): serve para verificar que o serviço aguenta o aumento previsto de tráfego e descobrir gargalos; usa escalas de crescimento (RPS/QPS/TPS derivados da escala qualitativa e quantitativa) e os requisitos/gargalos [p.162]. Também usado "ao contrário" para descobrir escalas, gargalos, escala de dependências e capacidade futura [p.162-163]. Executar em cada estágio do pipeline: staging serve para testar o próprio framework de carga e prever problemas; com staging parcial, cuidado para não derrubar produção; com staging total sem paridade, cuidado com precisão [p.163]. Staging não basta: é obrigatório testar em produção, alertando todas as equipes de dependência de plantão; nunca assumir que dependências downstream aguentam a carga [p.163-164]. Em produção é perigoso e essencial; é preciso mecanismo automatizado para interromper rapidamente o teste [p.164]. Automação: ferramenta de autosserviço na plataforma, centralizada; programar regularmente conforme padrões de tráfego (carga alta em produção só em horário de baixo tráfego, nunca no pico); pacote de testes validado; em casos extremos, bloquear deploy se o serviço não passa no teste de carga; registrar e divulgar internamente cada teste [p.164-165]. Resumo p.165-166: carga calculada das escalas, em RPS/QPS/TPS; em cada estágio; comunicado às dependências; automatizado, logado e agendado.
- Teste de caos (p.166-168): forçar falhas em produção, de forma programada (equipes se preparam) e aleatória (pegar desprevenidos); todo cenário de falha/catástrofe identificado deve ser forçado [p.166]. Responsável: software de caos com permissões adequadas, cada evento logado; controlar para não derrubar o ecossistema [p.166-167]. Oferecer como serviço (não implementação por equipe): automatizar, exigir pacote geral e específico, permitir que equipes criem novos testes; o próprio serviço de caos precisa sobreviver ao pacote padrão; repetir até as equipes terem confiança [p.167]. Vale também para hardware físico; sugere Simian Army como solução aberta com pacote padrão [p.167]. Exemplos de testes de caos (p.167-168): desativar o endpoint de API de uma dependência; parar todo tráfego para uma dependência; injetar latência entre clientes/dependências, serviço/database compartilhado e serviço/sistema de processamento de tarefas; parar todo o tráfego para um datacenter ou região; desligar servidor aleatoriamente.

#### Detecção e reparo de falhas (p.168-170) — ALTA
- Objetivo: reduzir o impacto aos usuários (outros serviços ou clientes reais) [p.168].
- Estratégia 1: voltar imediatamente à última versão estável; o mesmo para configuração: tratar configurações como código, implantar em liberações sucessivas e permitir voltar ao último conjunto estável [p.168-169].
- Estratégia 2: comutar para alternativa estável: outro endpoint ou serviço; se não houver, enfileirar/salvar requisições; falha de datacenter: redirecionar tráfego; redirecionar tráfego é quase sempre a opção mais inteligente [p.169].
- A detecção só é viável com monitoramento pronto para produção (Cap. 6, fora do bloco); humanos são ruins em detectar/diagnosticar e viram SPOF; reparo também deve ser automatizado (rollback automático por limites de métricas/health checks; roteamento automático por limites de métricas) [p.169-170].

#### Incidentes e interrupções (p.170-174) [continua no próximo bloco] — ALTA (tema pedido)
- Cada minuto fora do ar reduz a disponibilidade e consome o SLA; o custo financeiro é quantificável; tempos de detecção, mitigação e resolução se acumulam [p.170-171].
- Categorização de serviços (p.171-172): classificar por criticidade ao negócio; basta uma categorização básica; críticos têm prioridade/impacto máximo, demais por proximidade aos críticos; camadas de infraestrutura (hardware, comunicação, plataforma) usadas por serviços críticos têm sempre a maior prioridade. Serve também para disputa de recursos.
- Categorização de incidentes (p.172-173): dois eixos, gravidade (impacto no negócio, alinhada à categoria do serviço; escala de 0 a 4, 0 = mais grave) e escopo (alto = afeta todo o negócio/recurso externo; médio = o próprio serviço ou ele e alguns clientes; baixo = sem efeito perceptível a clientes/negócio/externos; local x global). Exemplos: datacenter inteiro fora = gravidade 0, escopo alto; serviço crítico fora 30 min afetando um cliente = gravidade 0, escopo médio; ferramenta interna de templates fora por horas = gravidade 3, escopo baixo [p.173]. Observação: nem toda falha é emergência para todos; centenas de falhas por semana em ecossistema de mil serviços [p.171].
- Cinco estágios da resposta a incidentes (Fig. 5.1) (p.173-174): avaliação, coordenação, mitigação, resolução e acompanhamento (follow-up). O padrão da indústria tem três (triagem, mitigação, resolução) e microsserviços exigem dois adicionais: coordenação e acompanhamento [p.174]. Avaliação: quando um alerta dispara por mudança em métrica-chave, o engenheiro de plantão faz a triagem e define gravidade e escopo [p.174]. O texto do bloco termina no cabeçalho "Coordenação", sem conteúdo; mitigação, resolução, acompanhamento, e a lista "Avalie seu microsserviço" do Cap. 5 estão no próximo bloco.

Citações curtas de prova (Cap. 5):
- "Microsserviços falharão, eles falharão com frequência" [p.139]
- "retornar imediatamente para a última versão estável do serviço" [p.168]
- "Seres humanos são terríveis para detectar e diagnosticar falhas de sistema" [p.169]
- "fazê-lo falhar o tempo todo e de todas as formas possíveis" [p.166]
- "a maioria dos incidentes e das interrupções sofridas por um microsserviço será quase exclusivamente autoinfligida" [p.155-156]

O que este trecho NÃO diz: não menciona retry com backoff, bulkhead, idempotência, timeouts configuráveis (só como cenário de falha), nem degradação graciosa além de fallback/fila; não define SLO/orçamento de erro formal (só a cota de downtime do SLA); não descreve post-mortem (pode estar no próximo bloco); não trata segurança nem recuperação de dados/backup de database (cita apenas "database apagado por acidente" como catástrofe); não detalha ferramentas de caos além de Simian Army; "teste de caos em produção" é apresentado como regra, sem critérios de pré-requisitos graduais.
Relevância: production-ready-microservices-expert: ALTA (SPOFs, catálogo de falhas, testes de resiliência, caos, mitigação automática, classificação e resposta a incidentes). api-design-expert: BAIXA (só timeouts/descontinuação como falhas de dependência; contra-indica versionar libs/serviços internos). dev-practices: MÉDIA (quatro tipos de teste de código e sua automação, revisão de código com tempo adequado, revisões de arquitetura).
Decisão sugerida: usar em production-ready-microservices-expert (novos references: resiliencia-e-testes, resposta-a-incidentes) e em dev-practices (testes e code review); não usar em api-design-expert sem outras fontes.

---

## Auditoria da skill atual (production-ready-microservices-expert: SKILL.md, references/production-checklist.md, references/observability-setup.md; versão 1.0)

### (a) O que a skill afirma e o bloco confirma
- "Deploy via pipeline, rollback automatizado, evite deploy manual" (SKILL.md "Deploy", Checklist "Estratégia de rollback", "Automação de deploy"): confirmado. Pipeline padronizado, teste/empacotamento/release automatizados [p.88]; rollback automatizado obrigatório no canary e no staging parcial [p.98, p.100]; passos manuais são pontos de falha [p.98]; reparo deve ser automatizado, com rollback por limites de métricas/health checks [p.169-170].
- Checklist "Rollback automatizado em caso de falha no health check pós-deploy": confirmado em parte, pois o livro usa health checks E limites nas métricas principais como gatilho [p.98, p.169-170].
- "Resiliência: circuit breaker, fallback" (SKILL.md): confirmado. Circuit breakers para serviços com taxa anormal de erros [p.107-108, p.111]; fallback, alternativas, fila e cache defensivo para dependências [p.105-106, p.169].
- "Assuma que falhas acontecerão; nunca assuma que a rede é confiável": confirmado [p.139, p.144-145, p.151].
- "Service Discovery, Load Balancing; múltiplas instâncias; escalado horizontalmente; múltiplas zonas" (SKILL.md "Infraestrutura Dinâmica"): confirmado, com a ressalva de que o livro enfatiza escalar horizontalmente [p.122-123], health checks alimentando o balanceador [p.107] e redirecionamento de tráfego entre datacenters [p.129, p.169].
- "Escalabilidade: diagnostique o gargalo antes de escalar" (SKILL.md): apoiado. Identificar requisitos e gargalos de recursos (CPU, RAM, conexões de DB, limites de logging) e descobrir gargalos não óbvios com teste de carga [p.121-123]. A lista da skill (CPU, memória, banco, rede, fila ou aplicação) é compatível, mas não é a lista do livro.
- "Teste de carga validando comportamento sob volume esperado" (checklist "Testes"): confirmado, mas o livro é mais exigente (ver c) [p.161-166].
- "Testes unitários, integração" (checklist): confirmado [p.159]; o livro acrescenta lint e fim a fim [p.159-160].
- "Dashboard operacional; alertas; ownership/equipe responsável; runbooks": parcialmente confirmado. Dashboards e dependências no dashboard [p.97-98, p.105]; alertas diferenciados por ambiente [p.98, p.100]; alertas ligados a métricas principais e plantão [p.156, p.174]. "Runbooks" e "equipe responsável documentada" NÃO aparecem nominalmente neste bloco (podem estar no Cap. 7).
- "Quatro camadas do ecossistema (infra, comunicação, plataforma, microsserviços)": confirmado quanto às quatro camadas [p.133, p.145, p.149-151]. Ver divergência de conteúdo em (b).
- "Monitorar infraestrutura, aplicação, negócio": o livro tem monitoramento no nível de servidor e de microsserviço [p.149, p.151], mas o detalhe do monitoramento está no Cap. 6 (fora do bloco). Confirma só parcialmente, sem a camada de "negócio" no sentido de dashboards de negócio (as métricas de negócio no bloco servem às escalas de crescimento, [p.116-117]).
- "Rolling update": o livro descreve implantação gradual em produção por porcentagem de hardware, datacenter, região ou país [p.101], o que é compatível, mas é outro mecanismo nomeado (canary + gradual).

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- CONTRADIZ: Checklist "Deploy e Rollback": "Feature flags ou versionamento de API para mudanças de contrato". O bloco diz que NÃO é recomendável atribuir versões a bibliotecas e microsserviços internos nem vincular-se a versões específicas, pela natureza acelerada do desenvolvimento [p.154]. Atenção: o livro trata de versões de libs/serviços internos e não de versionamento de contrato HTTP público; ainda assim o bloco não sustenta recomendar versionamento de API e, no mínimo, exige reformular (feature flags não aparecem no bloco).
- NÃO SUPORTA (divergência de profundidade): Health checks liveness/readiness/startup com rotas /health/live, /health/ready, /health/startup (SKILL.md, checklist, observability-setup). O bloco fala de UM endpoint /health com resposta útil e precisa, em canal separado do tráfego geral, e critica o "200 OK" fixo como não ideal [p.107, p.111]. A divisão em liveness/readiness/startup é conceito de orquestradores [fora do livro]. O checklist ("Liveness retorna 200 enquanto o processo está vivo") está em tensão com a crítica do livro à resposta fixa.
- NÃO SUPORTA: "Retry com backoff exponencial" e "bulkhead" (SKILL.md "Resiliência"; checklist "Retry"). Neste bloco não aparecem; timeouts aparecem só como cenário de falha de dependência [p.155]. "Idempotência para consumidores de mensageria": também ausente. "Teste de contrato consumer-driven": ausente (o livro usa testes fim a fim contra clientes/dependências [p.160]).
- NÃO SUPORTA: "Princípio da Caixa-Preta" (SKILL.md): o bloco só diz que isolamento total é verdade "a princípio" e que serviços têm clientes e dependências reais [p.104]; princípio não está no bloco.
- DIVERGE: Camada 1 da skill inclui "bancos de dados" e camada 3 inclui "observabilidade, monitoramento, logging". No bloco, a camada de hardware contém monitoramento/logging em nível de servidor [p.149] e o monitoramento/logging de microsserviço está na plataforma de aplicação [p.151]; o database é da plataforma (database como serviço) ou da camada do microsserviço [p.133-134], não da camada de hardware. A camada 4 "não deve resolver problemas de infraestrutura" não está no bloco.
- NÃO SUPORTA como regra do livro: "Logs estruturados em JSON com traceId, nunca texto livre", /metrics Prometheus, OpenTelemetry/Jaeger, Micrometer, W3C Trace Context (observability-setup.md). O bloco só menciona logging/monitoramento nos Caps. 3 e 5 e remete ao Cap. 6; pede rastreamento distribuído para gerar grafos de dependência [p.105]. Esse material pode ser mantido, mas a fonte não é este bloco.
- NÃO SUPORTA/PARCIAL: tabela de alertas (taxa de erro > 5%, p95 > 2s, lag de consumer etc.): o livro não traz limiares; diz que limites derivam das métricas principais e do padrão de tráfego do serviço [p.98, p.128]. Os limiares da skill são ilustrativos, sem apoio no bloco.
- "Nunca escale sem diagnóstico": o livro não usa a regra assim; diz que escalar horizontalmente exige conhecer o comportamento de uma instância [p.122]. Mais restrito que a skill, sem contradição.
- "Evite IP fixo/config manual" (anti-padrão): ausente no bloco; o mais próximo é "gerenciamento separado de configuração" como causa de falha [p.150].

### (c) O que o bloco traz e a skill não cobre
Lacunas, com prioridade para os temas pedidos:
1. Planejamento de capacidade (p.123-125, p.136-137): escala de crescimento qualitativa (negócio) e quantitativa (RPS/TPS), requisitos de recursos por instância, previsão com dados históricos, orçamento antecipado, lead time de hardware, automação por ferramenta de autosserviço, priorização de serviços críticos. A skill só tem "como ele crescerá?" e "diagnostique o gargalo". LACUNA TOTAL.
2. Teste de caos (p.166-168): produção, programado e aleatório, como serviço central, logging e permissões, exemplos de experimentos. A skill não menciona caos. LACUNA TOTAL. Também ausentes: teste de resiliência em três níveis (código, carga, caos) e o princípio de adicionar cada nova falha ao conjunto de testes [p.141, p.157-158].
3. Resposta a incidentes (p.170-174): categorização de serviços por criticidade; incidentes por gravidade (0-4) e escopo (alto/médio/baixo); cinco estágios (avaliação, coordenação, mitigação, resolução, acompanhamento); custo do minuto de downtime. A skill só tem "runbooks" e "alertas". LACUNA TOTAL. (Mitigação, resolução, acompanhamento e coordenação detalhados estão no próximo bloco.)
4. Documentação: o bloco NÃO desenvolve (apenas exige dependências no diagrama/documentação de arquitetura e dashboards compreensíveis para quem é de fora [p.98, p.105] e revisões de arquitetura [p.143, p.146-147]); o Cap. 7 está fora deste bloco. A skill cita documentação/runbooks e OpenAPI no checklist; este bloco não confirma nem contradiz OpenAPI.
5. Descontinuação e desativação (p.108-109): aviso a clientes, migração para novos endpoints, monitoramento do tráfego residual antes de desligar, "desativar em vez de abandonar", visão de problema sociológico. A skill NÃO cobre (só uma menção a "versionamento de API" no checklist).
6. Pipeline em três fases (p.91-103): staging total x parcial com riscos, test tenancy e banco de teste, canary (5-10%, servidores aleatórios, mesmas portas, duração por ciclo de tráfego), deploy gradual, correções de emergência como antipadrão, bloqueio de deploy por SLA esgotado ou falha em teste de carga. A skill tem apenas "rolling update/rollback".
7. Dependências (p.104-106, p.125-127, p.153-155): clientes e dependências conhecidos, cálculo da disponibilidade (própria x dependências), cache defensivo LRU, alternativas/fila, escala de dependências, revisões de arquitetura e escalabilidade entre equipes, dependências de terceiros. A skill só tem circuit breaker e fallback genéricos.
8. SPOFs e revisão de arquitetura com quadro branco (p.142-144), exemplo Redis/Celery.
9. Catálogo de cenários de falha por camada (p.145-157), incluindo falhas operacionais (revisões, processos, deploys).
10. Detecção/reparo automatizados: rollback de configuração tratada como código, comutar para alternativa, redirecionar tráfego, eliminar erro humano (p.168-170).
11. Padrões de tráfego e agendamento de mudanças fora do pico, picos súbitos, failover entre datacenters (p.127-129).
12. Dados de teste e test tenancy, conexões de DB, escolha de database por perguntas (p.133-136).
13. SLA e cota de downtime (99,99% = 4,38 min/mês) como regra de bloqueio de deploy (p.103).
14. Health checks em canal separado e resposta útil; circuit breaker também para tráfego saindo e entrando (p.107-108).

### Registro explícito: SEGURANÇA
- O bloco trata de SEGURANÇA? NÃO. Não há seção, critério ou padrão de segurança (autenticação, autorização, segredos, criptografia, vulnerabilidades, mTLS, OWASP). Menções tangenciais apenas: versões de bibliotecas/serviços internos "às vezes não seguras" [p.154]; software de teste de caos precisa de "permissões adequadas" [p.166-167]; staging/testes sem acesso de escrita a databases de produção [p.95, p.97] (isolamento de dados, não segurança de acesso); alerta sobre "database de produção apagado por acidente" [p.144]. Não dá base para uma skill ou seção de segurança.

### Registro explícito: DESIGN DE APIs vs. documentação
- O bloco trata de design de APIs (contratos, versionamento, depreciação)? NÃO como design. Não há regras de contrato, modelagem de recursos, compatibilidade, idempotência de API, nem versionamento (ao contrário: desaconselha versionar bibliotecas/serviços internos [p.154]). Depreciação aparece SÓ como ciclo de vida operacional: descontinuar endpoint = avisar clientes, indicar novo endpoint, monitorar chamadas residuais [p.108-109], e como cenário de falha de dependência [p.155]. Documentação de API: apenas referência a Cap. 7 (fora do bloco). Conclusão: não sustenta um artefato `api-design-expert`; no máximo uma subseção de "descontinuação de endpoints" dentro de production-ready-microservices-expert.

### Recomendações de artefatos (derivadas apenas do bloco)
- production-ready-microservices-expert (ALTA): subir versão; novos references (pipeline de deployment, escalabilidade e planejamento de capacidade, resiliência e testes incl. caos e carga, resposta a incidentes, descontinuação/desativação); revisar checklist: remover/ajustar "versionamento de API"; reformular health check (resposta útil, canal separado); acrescentar canary, dependências conhecidas, planejamento de capacidade, caos, classificação de incidentes. Manter o conteúdo de observabilidade/Prometheus/OTel como [fora do livro], pois a fonte é o Cap. 6.
- api-design-expert (BAIXA): não criar com base neste bloco.
- dev-practices (MÉDIA): ciclo de desenvolvimento (ramo, revisão, testes antes da revisão, automação de teste/empacotamento/release); quatro tipos de teste de código; code review com tempo adequado; revisões de arquitetura.

---

## Checklist de cobertura
- Primeira página lida: 88
- Última página lida: 174 (marcador final do arquivo: "=== PDF PAGINA 174 ===", conferido por Grep; 87 marcadores, p.88 a p.174, contínuos)
- Páginas sem texto útil ou ilegíveis: nenhuma ilegível. Páginas de pouco conteúdo: p.112 (fim da lista do Cap. 3 + nota de rodapé), p.174 (termina no cabeçalho "Coordenação", sem corpo).
- Problemas de extração observados: p.88 começa no meio de uma frase (continuação do bloco anterior); figuras (3.1-3.4, 5.1) não aparecem (só legendas); listas com quebras de linha irregulares e alguns itens duplicados por extração; tabela 3.1 extraída em linhas soltas; caixas de destaque ("callouts") aparecem como texto corrido com título; números impressos de página não aparecem.
- Capítulos/seções cobertos integralmente: Cap. 4 (p.113-138, incluindo "Avalie seu microsserviço"); Cap. 3 a partir da p.88 até o fim (p.112).
- Capítulos/seções que continuam em outro bloco: Cap. 3 começa antes da p.88 (início do capítulo, princípios e primeiras seções); Cap. 5 continua após a p.174 (estágios Coordenação, Mitigação, Resolução, Acompanhamento, e "Avalie seu microsserviço" do Cap. 5). Capítulos citados mas fora do bloco: Cap. 6 (Monitoramento), Cap. 7 (Documentação e compreensão).
