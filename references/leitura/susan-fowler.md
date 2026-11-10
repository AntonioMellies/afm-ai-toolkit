# Registro de leitura (rascunho): susan-fowler

Gerado por script a partir das notas dos leitores. Cada item: capítulo/seção, páginas (PDF), relevância avaliada e decisão sugerida. Revisão humana por amostragem pendente.

Seções registradas: 24


## Bloco 01_p001-087 (lido: PDF p.1-87)

- **Front matter: capa, copyright, sumário (PDF p.1-13)**
  - Relevância: (não registrada)
  - Decisão sugerida: descartar (só estrutura), usar como mapa para os próximos blocos.
- **Prefácio (PDF p.14-25)**
  - Relevância: production-ready-microservices-expert: ALTA (o método de auditoria: revisão de arquitetura, checklist sim/não, nota, roteiro); api-design-expert: NENHUMA; dev-practices: BAIXA.
  - Decisão sugerida: usar em production-ready-microservices-expert (processo de auditoria e roteiro).
- **Capítulo 1 Microsserviços (PDF p.26-63)**
  - Relevância: production-ready-microservices-expert: MÉDIA (contexto, ecossistema em 4 camadas, riscos organizacionais, padronização contra dispersão); api-design-expert: BAIXA (só a posição "não versionar", fraca e contrária à prática comum; insuficiente sozinha); dev-practices: BAIXA (ambiente de dev espelhando produção, CI).
  - Decisão sugerida: usar em production-ready-microservices-expert (referência de contexto/ecossistema e trade-offs organizacionais); não criar api-design-expert a partir deste bloco.
- **Capítulo 2 Disponibilidade de produção (PDF p.64-85)**
  - Relevância: production-ready-microservices-expert: ALTA (os 8 padrões, a tabela dos noves, o modelo de auditoria e de adoção); api-design-expert: NENHUMA; dev-practices: BAIXA.
  - Decisão sugerida: usar em production-ready-microservices-expert (estrutura de checklist por 8 padrões, tabela dos noves, lista mínima de alertas).
- **Capítulo 3 Estabilidade e confiabilidade (PDF p.86-87) [continua no próximo bloco]**
  - Relevância: production-ready-microservices-expert: MÉDIA (introdução); api-design-expert: BAIXA (depreciação aparece só como anúncio; o conteúdo está no próximo bloco).
  - Decisão sugerida: aguardar bloco seguinte.
- **Registro explícito: SEGURANÇA**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Registro explícito: DESIGN DE APIs**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Artefatos candidatos**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)

### Auditoria da skill atual (trecho das notas)

Escopo: `skills/production-ready-microservices-expert/SKILL.md` (v1.0), `references/production-checklist.md` e `references/observability-setup.md`. Auditado SOMENTE contra este bloco (PDF p.1-87). Itens "não suportado" podem estar nos Caps. 3-7 (outros blocos) e devem ser reavaliados lá.

### (a) O que a skill afirma e o bloco confirma
- Microsserviços são sistemas vivos, mudam e são reimplantados sempre: o livro os chama de coisas "vivas e em constante mutação" [p.41]; ecossistema nunca estático [p.86]; componentes falham com frequência [p.61, 74].
- Operar importa tanto quanto desenvolver: sem organização operacional separada, os desenvolvedores ficam de plantão pelos seus serviços [p.59]. Só serviço "pronto para produção" recebe tráfego, com critérios mensuráveis [p.15, 68]. A frase "Produção é uma funcionalidade" é da skill, não do bloco.
- Princípio da caixa-preta (consumidor conhece só endpoints/protocolo) [p.41-42]. "Nunca depender de banco ou bibliotecas internas" é extrapolação da skill [fora do livro].
- Quatro camadas do ecossistema: camada 2 (rede, DNS, RPC/endpoints, discovery, registry, load balancing, mensageria) [p.45-49]; camada 3 (CI, deploy, logging/monitoramento, autosserviço) [p.49-54]; camada 4 separada da infraestrutura [p.55]. O livro chama a camada 1 de "Hardware" [p.43].
- REST é simples, estável e síncrono/bloqueante [p.46].
- Discovery com IPs/portas mutáveis, roteamento só para instâncias saudáveis, múltiplas instâncias com load balancing [p.48-49].
- Rollback automatizado [p.79]; deploy padronizado e automatizado por pipeline [p.53].
- Logs para reconstruir o estado do serviço [p.54, 78]; dashboard em tempo real [p.78]; alertas acionáveis com roteiro (runbook) por alerta [p.79]; documentação e plantão como padrões [p.80-82].
- Circuit breaker e health checks: só menção genérica [p.71, 87].
- Teste de carga como 2º nível do teste de resiliência [p.75]; testes e CI [p.53].
- Identificar gargalos e requisitos de recursos [p.72-73] (a regra "nunca escale sem diagnóstico" é da skill).

### (b) O que a skill afirma e o bloco contradiz ou não suporta
Tensão/contradição:
- `production-checklist.md` linha 33 ("Feature flags ou versionamento de API para mudanças de contrato"): o livro trata como antipadrão atribuir versões a microsserviços e a endpoints de API [p.40-41]. Ressalva: depreciação/desativação é remetida ao Cap.3 (bloco seguinte); resolver lá antes de editar. Feature flags não aparecem no bloco.
- Logs com `"version"`/`service.version` na referência: o livro diz que, sem versionar o serviço, os logs são o registro para achar problemas de deploys antigos [p.78]. Tensão leve, verificar no Cap.6.
- Mensageria: a skill cita benefícios "desacoplamento e resiliência" e custo "consistência eventual". O livro cita assincronia, complexidade, broker/filas como ponto de falha, condições de corrida e loops infinitos, e diz que pode ser tão estável quanto HTTP se bem arquitetada [p.46-47]. Esses riscos faltam na skill.
- Deploy: a skill manda "rolling update"; o livro prescreve staging, pré-release (2% a 5% dos servidores de produção) e produção [p.19, 70]. Não é contradição direta, mas a skill omite o esquema do livro.
Não suportado pelo bloco (conhecimento externo; marcar [fora do livro] se mantido):
- Logs JSON, `traceId`/`spanId`, W3C Trace Context, OpenTelemetry, Jaeger: o bloco só pede "logging e rastreamento adequados em toda a pilha" e log de todas as requisições/respostas [p.79, 54].
- Percentis p50/p95/p99, Prometheus, Micrometer; probes liveness/readiness/startup com paths; retry com backoff exponencial, timeout, fallback, bulkhead, idempotência; múltiplas zonas; métricas de negócio como camada de monitoramento; teste de contrato consumer-driven; OpenAPI.
- Limiares numéricos da tabela de alertas (5% de erro, p95 > 2s, CPU 80% etc.): o livro só dá o esquema normal/alerta/crítico, com limites "indicativos" (sem ruído e sem perder problema real) [p.79].
- Ordem "Comportamento Esperado" (operação antes do código): não consta no bloco.

### (c) O que o bloco traz e a skill não cobre
Lacuna estrutural: o livro organiza tudo em 8 padrões (estabilidade, confiabilidade, escalabilidade, tolerância a falhas, desempenho, monitoramento, documentação, prontidão para catástrofes) [p.15, 68-69]. A skill não tem esse eixo; o checklist atual é quase só observabilidade, deploy e runbook.
1. Planejamento de capacidade: no bloco é só requisito listado [p.73] com pré-requisitos: escala de crescimento qualitativa (page views, pedidos) e quantitativa (requisições/s) [p.72]; avisar dependências e clientes sobre crescimento esperado [p.73]; rajadas de tráfego não podem derrubar o serviço [p.72-73]; subutilização de hardware tem custo e deve ser pesada junto ao planejamento [p.77]. O método fica no Cap.4 (outro bloco). A skill só tem "diagnostique o gargalo".
2. Teste de caos: o tipo mais intenso de teste de resiliência, com cenários de falha programados e aleatórios em serviços de produção [p.75-76], depois de teste de código (unidade, regressão, integração) e de carga [p.75]. A skill não tem caos nem a taxonomia. Metodologia no Cap.5.
3. Resposta a incidentes: padronizada, coordenada, planejada e comunicada; cada desenvolvedor sabe o que fazer, mitigar e escalar, o que derruba os tempos de mitigação [p.75]. Falhas internas vs externas [p.74]. "Cinco estágios da resposta a incidentes" só no sumário [p.10]. A skill não cobre.
4. Documentação e compreensão: documentação completa, atualizada e centralizada [p.82]; itens: diagrama de arquitetura, guia de integração/desenvolvimento, fluxo de requisições e endpoints, roteiro de plantão por alerta [p.81]; sumário acrescenta descrição, contatos/plantão, links, FAQ [p.11]. Compreensão por revisões de arquitetura regulares, auditorias, roteiros e automação [p.81-82]; exercício do quadro branco [p.80-81]. A skill só tem "documentação" genérica, OpenAPI e runbooks.
5. Descontinuação e desativação: apenas anunciada como parte da estabilidade [p.22, 70, 86-87]; sem conteúdo prático no bloco (pendente no bloco 02). A skill não cobre.
6. Processo de auditoria: revisão de arquitetura de 30 min com diagrama de endpoints, fluxos e dependências [p.15-16]; auditoria sim/não por requisito [p.15]; nota por requisito e geral [p.16]; roteiro com requisitos não cumpridos, links a interrupções, trabalho, tarefa e responsável [p.16]; começar por serviços críticos ao negócio [p.15]; automatizar [p.16, 82]. A skill tem tabela de status, sem nota, roteiro nem revisão de arquitetura.
7. Disponibilidade como objetivo: fórmula uptime/(uptime+downtime) e tabela dos noves (99,9% = 8,76 h/ano; 99,99% = 52,56 min/ano; 99,999% = 5,26 min/ano) [p.66-68]. O livro usa SLA; não define SLO nem error budget no bloco.
8. Lista mínima de alertas: CPU/RAM, file descriptors, conexões de banco, SLA, requests/responses, status de endpoints, erros, saúde de dependências, banco, tarefas [p.79]. A tabela da skill omite vários.
9. Deploy em estágios e ambiente de desenvolvimento espelho da produção [p.52-53, 70]; maioria das interrupções vem de deploy ruim [p.69].
10. Cache defensivo [p.71]; SPOF identificado/resolvido [p.16, 76].
11. Dispersão técnica e padronização (limitar linguagens, padronizar tipo de endpoint e evitar REST+Thrift juntos) [p.40, 59-60]; configuração do serviço no repositório do serviço [p.55]; autosserviço por camada [p.50-52]; trade-offs organizacionais (Conway reverso, plantão pelos desenvolvedores, competição por recursos) [p.57-63].
12. Quando não adotar microsserviços e migração de monólito (anos, replicação de tráfego) [p.37-38]: afim a `software-architecture`/`architecture-hard-parts-expert`.

### Registro explícito: SEGURANÇA
- Este bloco trata de segurança? NÃO. Busca textual por segurança, autenticação, autorização, criptografia, TLS/SSL, segredos, credenciais, vulnerabilidade, privacidade: nenhuma ocorrência relevante em p.1-87 (apenas "autorizada" no copyright e "autorizado a receber tráfego", p.15). O sumário (p.8-13) também não tem tópico de segurança. A skill atual tampouco cobre. Não gerar conteúdo de segurança a partir deste livro.

### Registro explícito: DESIGN DE APIs
- Este bloco trata de design de APIs (contratos, versionamento, depreciação)? NÃO; é marginal, mais documentação. Existe apenas: API como "frontend" do serviço com endpoints estáticos [p.38-39]; padronizar o tipo de endpoint (REST ou Thrift) e o protocolo na organização [p.40-41]; posição explícita CONTRA versionar microsserviços e endpoints [p.40-41]; documentar endpoints e fluxo de requisições [p.81]; depreciação/desativação de serviços e endpoints só anunciada [p.22, 86-87]. Sem contratos formais, compatibilidade, esquemas, paginação, idempotência ou erros padronizados.
- Conclusão provisória: o livro, até p.87, NÃO sustenta `api-design-expert`. Reavaliar após o Cap.3 (depreciação).

### Artefatos candidatos
1. `production-ready-microservices-expert` (ALTA): reorganizar o checklist pelos 8 padrões; adicionar referências de padrões/tabela dos noves [p.66-69] e de processo de auditoria [p.15-16, 82]; incluir deploy em estágios 2-5% [p.70] e lista mínima de alertas [p.79]; adicionar documentação, incidentes e caos após ler os Caps. 5 e 7; ressalvar a linha 33 do checklist após ler o Cap.3; revisar a description. Incrementar `version` e manifests se alterar.
2. `api-design-expert` (NENHUMA neste bloco): não criar com base nele.
3. `dev-practices` (BAIXA): só ambiente espelho da produção, CI centralizado, configuração junto ao serviço; aguardar blocos seguintes.

## Bloco 02_p088-174 (lido: PDF p.88-174)

- **Cap. 3 — Estabilidade e confiabilidade (PDF p.88-112) [continua do bloco anterior; começa no meio de uma frase na p.88]**
  - Relevância: production-ready-microservices-expert: ALTA (pipeline staging/canary/produção, rollback automatizado, deploy bloqueado por SLA/carga, dependências, health checks, descontinuação/desativação). api-design-expert: BAIXA (só o processo de aviso/migração de clientes ao descontinuar endpoints; não há contratos nem versionamento). dev-practices: MÉDIA (ciclo de desenvolvimento, testes antes da revisão, automação do teste/empacotamento/release).
  - Decisão sugerida: usar em production-ready-microservices-expert (novos references: pipeline-deployment, dependencias-e-roteamento, descontinuacao-desativacao); aproveitar o ciclo de desenvolvimento em dev-practices; para api-design-expert, no máximo uma seção curta de "ciclo de vida de endpoint" (descontinuar com monitoramento de uso).
- **Cap. 4 — Escalabilidade e desempenho (PDF p.113-138)**
  - Relevância: production-ready-microservices-expert: ALTA (escala de crescimento, requisitos/gargalos, planejamento de capacidade, escala de dependências, padrões de tráfego, dados de teste). api-design-expert: NENHUMA. dev-practices: BAIXA (simultaneidade/particionamento, só conceito).
  - Decisão sugerida: usar em production-ready-microservices-expert (novo reference: escalabilidade-e-capacidade, com a escala qualitativa->quantitativa->capacidade->orçamento e a lista de requisitos/gargalos); descartar as recomendações de linguagem e NoSQL, ou registrá-las apenas como "posição datada".
- **Cap. 5 — Tolerância a falhas e preparação para catástrofes (PDF p.139-174) [continua no próximo bloco: truncado no estágio "Coordenação", p.174]**
  - Relevância: production-ready-microservices-expert: ALTA (SPOFs, catálogo de falhas, testes de resiliência, caos, mitigação automática, classificação e resposta a incidentes). api-design-expert: BAIXA (só timeouts/descontinuação como falhas de dependência; contra-indica versionar libs/serviços internos). dev-practices: MÉDIA (quatro tipos de teste de código e sua automação, revisão de código com tempo adequado, revisões de arquitetura).
  - Decisão sugerida: usar em production-ready-microservices-expert (novos references: resiliencia-e-testes, resposta-a-incidentes) e em dev-practices (testes e code review); não usar em api-design-expert sem outras fontes.
- **Registro explícito: SEGURANÇA**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Registro explícito: DESIGN DE APIs vs. documentação**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Recomendações de artefatos (derivadas apenas do bloco)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)

### Auditoria da skill atual (trecho das notas)

(production-ready-microservices-expert: SKILL.md, references/production-checklist.md, references/observability-setup.md; versão 1.0)

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

## Bloco 03_p175-261 (lido: PDF p.175-261)

- **Cap. 5 (final): Tolerância a falhas e preparação para catástrofes, resposta a incidentes (PDF p.175-179) [continua do bloco anterior: avaliação e começo da coordenação estão antes da p.175]**
  - Relevância: production-ready-microservices-expert: ALTA (resposta a incidentes, TTD/TTM, autópsia); dev-practices: BAIXA; api-design-expert: NENHUMA.
  - Decisão sugerida: usar em production-ready-microservices-expert (reference de resposta a incidentes e autópsia), confrontando com o que já existir lá.
- **Cap. 6: Monitoramento (PDF p.180-197)**
  - Relevância: production-ready-microservices-expert: ALTA (monitoramento, alertas, dashboards, plantão, higiene de logs); dev-practices: MÉDIA (disciplina de logging e de alertas acionáveis); api-design-expert: NENHUMA.
  - Decisão sugerida: usar em production-ready-microservices-expert (references de monitoramento/alertas/plantão), confrontando com o conteúdo existente.
- **Cap. 7: Documentação e compreensão (PDF p.198-218)**
  - Relevância: production-ready-microservices-expert: ALTA (documentação mínima, roteiro de plantão, revisão de arquitetura, auditoria, nota); dev-practices: MÉDIA (docs como parte do fluxo de desenvolvimento, automatizar tarefa repetida); api-design-expert: BAIXA (documentação de endpoints é superficial, sem contrato/versionamento).
  - Decisão sugerida: usar em production-ready-microservices-expert (modelo de documentação e processo de auditoria); dev-practices só os itens "docs no fluxo de dev" e "automatize o repetido".
- **Apêndice A: Checklist de disponibilidade de produção (PDF p.219-221)**
  - Relevância: production-ready-microservices-expert: ALTA (estrutura de auditoria); dev-practices: BAIXA.
  - Decisão sugerida: usar como estrutura de checklist em production-ready-microservices-expert, se ainda não estiver espelhada.
- **Apêndice B: Avalie seu microsserviço (PDF p.222-230)**
  - Relevância: production-ready-microservices-expert: ALTA (perguntas de auditoria, em particular planejamento de capacidade, descontinuação/desativação, caos); api-design-expert: BAIXA (só 2 perguntas sobre descontinuar endpoints).
  - Decisão sugerida: usar em production-ready-microservices-expert como checklist de auditoria. Para planejamento de capacidade e descontinuação, o conteúdo explicativo está em outros blocos do livro: verificar blocos 01-02 antes de decidir.
- **Glossário (PDF p.231-243)**
  - Relevância: production-ready-microservices-expert: MÉDIA (vocabulário, definições de descontinuação x desativação e de escala qualitativa x quantitativa); api-design-expert: BAIXA.
  - Decisão sugerida: usar apenas as definições citadas; descartar o resto.
- **Sobre a autora, Colofão, propagandas de outros livros (PDF p.244-261)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Segurança neste bloco**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Design de APIs neste bloco**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Artefatos candidatos (resumo)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)

### Auditoria da skill atual (trecho das notas)

Material auditado: `skills/production-ready-microservices-expert/SKILL.md` (176 linhas), `references/observability-setup.md` (185 linhas), `references/production-checklist.md` (73 linhas). Páginas = "PDF PAGINA" deste bloco (175-261). "Não suportado pelo bloco" NÃO significa "errado": os capítulos 1-5 (parcialmente) estão em blocos anteriores e podem suportar itens que aqui não aparecem. Itens marcados [fora do livro] são afirmações da skill que este bloco não permite verificar.

### (a) O que a skill afirma e o bloco confirma
- Operação e monitoramento como parte do produto ("Produção é uma funcionalidade"): o bloco defende que monitoramento adequado e documentação são requisitos de "pronto para produção" [p.180-181, 198, 200-201].
- Camadas do ecossistema (1 infraestrutura/hardware, 2 comunicação, 3 plataforma, 4 microsserviço): o glossário define as quatro camadas na mesma ordem [p.232]; métricas de servidor/infra = camadas 1-3, de microsserviço = camada 4 [p.182-183].
- Serviços mudam o tempo todo ("sistemas vivos"): "o microsserviço está sempre mudando" [p.186].
- Alertas com severidades (skill: Warning/Critical): o livro prevê limiares de advertência e crítico [p.191].
- Runbooks, dashboard, alertas, equipe responsável e documentação como Ownership: runbook por alerta [p.193, 207-208]; dashboard por serviço [p.188]; contato/plantão e equipe na documentação [p.205]; plantão dedicado [p.194].
- Logs devem permitir reconstruir o estado do serviço (o que aconteceu, quando, onde): o objetivo do logging é descrever o estado em qualquer momento do passado recente [p.185-186]; registrar detalhes de requisição/resposta [p.187].
- Rastrear requisições pela cadeia (base do tracing/traceId da skill): rastrear cada solicitação por toda a pilha [p.187]. O livro não fala em traceId, spans, W3C nem OpenTelemetry.
- Métricas de latência, erros, disponibilidade e utilização de recursos: latência, erros e exceções, disponibilidade, CPU, RAM [p.183-185].
- Monitorar infraestrutura e aplicação separadamente [p.182-183].
- Testes automatizados (unidade, integração, ponta a ponta) e teste de carga: Apêndice A [p.219] e perguntas [p.178]; teste de carga também para calibrar limiares [p.192].
- Pipeline CI/CD automatizado: teste, empacotamento, versão e liberação automatizados; pipeline padronizado com staging, pré-release e produção [p.219].
- Circuit breaker e fallback: perguntas sobre circuit breakers [p.224]; backups, alternativas, fallbacks e cache para dependências [p.219]; cache defensivo no glossário [p.232].
- Service discovery e load balancing: "roteamento e descoberta estáveis e confiáveis" [p.219]; definições [p.232, 234].
- Escalar só depois de achar o gargalo (em parte): gargalos e requisitos de recursos identificados [p.220, 224-225]. O livro pede conhecer gargalos; não formula a proibição "nunca escale sem diagnóstico".
- Múltiplas instâncias e escala horizontal: o comportamento do serviço é a soma de dezenas ou centenas de instâncias [p.182]; vertical x horizontal [p.225, 235-236].
- Princípio da caixa-preta: endpoints documentados de modo que outro time trate o serviço como caixa preta [p.207].
- Checklist de prontidão e aprovação condicionada: auditoria com checklist [p.213-214, 219-221]; a ideia de reprovar sem as respostas aparece como bloqueio de implantações por nota mínima [p.217].
- Projetar operação antes do código: avaliar o serviço contra padrões de disponibilidade antes da RFC e antes de receber tráfego [p.211].
- Health checks existirem e serem confiáveis: perguntas sobre confiabilidade e fidelidade dos health checks [p.223].

### (b) O que a skill afirma e o bloco contradiz ou não suporta
Contradições ou tensões:
1. **Dados pessoais em logs.** A skill usa `"customerId": "789"` em claro no exemplo de log e a referência repete `customerId` e `amount`. O bloco diz que logs nunca devem conter dados identificadores nem segredos e que mesmo IDs de usuário só entram criptografados na maioria dos casos [p.187]. Ressalva de fidelidade: a mesma página diz que IDs de usuário e detalhes de requisição "podem e devem" estar nos logs; o livro é internamente ambíguo. Regra segura: ID de usuário só criptografado ou pseudonimizado.
2. **Versão do serviço.** A referência de observabilidade põe `"version": "1.4.2"` nos logs e `service.version` no tracing. O quadro lateral diz que em geral não se recomenda atribuir versão ao microsserviço (clientes se prenderiam a versões) e que bons logs compensam isso [p.186]. Ambíguo: o livro também fala em "versão" no pipeline de build [p.219]. Tratar como tensão a revisar, não como erro.
3. **Checklist "Feature flags ou versionamento de API para mudanças de contrato".** Nada no bloco trata de versionamento de API; o trecho mais próximo desaconselha versionar o serviço [p.186]. Sem suporte.
4. **Runbooks "para os alertas mais comuns".** O livro exige instruções passo a passo para CADA alerta [p.193, 196-197, 207] e que alertas sem ação possível sejam removidos [p.192]. A skill é mais fraca que o livro.
5. **Dashboard "com métricas de negócio".** O livro diz que o dashboard mostra só o mínimo necessário das métricas principais e que incluir métricas desnecessárias indica falha nas práticas de alerta [p.189]. Exceção prevista: fases do pipeline. Tensão com o item de negócio.
6. **Limiares fixos nos alertas recomendados** (taxa de erro > 0,05, p95 > 2 s, CPU > 0,8, memória > 0,9). O livro diz que limiares sem histórico podem ser inúteis ou ruidosos e devem vir de histórico ou de teste de carga, com três níveis (normal, advertência, crítico) [p.190-192]. A skill traz um nível por métrica.

Afirmações da skill sem suporte neste bloco (o livro pode tratar em outro bloco, ou não tratar):
- Logs em JSON estruturado, nível, spanId, "nunca texto livre": o bloco não prescreve formato [p.186-188].
- Três pilares logs/métricas/tracing: o livro usa quatro componentes (logging, dashboards, alertas, plantão) [p.181]. A skill omite plantão.
- Percentis p50/p95/p99 e throughput como métrica nomeada: ausentes; o livro fala em latência, tempos de resposta e sucesso de endpoint [p.184-185].
- Métricas de disco e rede: a lista do livro é CPU, RAM, threads, descritores de arquivo, conexões com banco [p.183].
- Métricas de negócio como camada de monitoramento: ausente (livro: servidor/infra e microsserviço [p.182-183]).
- Liveness / readiness / startup em `/health/*`: o bloco só pergunta se health checks são confiáveis, fiéis e em canal separado [p.223-224]. Os três tipos não aparecem.
- Timeout, retry com backoff exponencial, bulkhead, idempotência: ausentes neste bloco.
- Rolling update e rollback automatizado: o bloco só pergunta se a produção é implantada de uma vez ou gradualmente e se há procedimento de emergência para pular staging/pré-release [p.223]; rollback não é citado.
- Teste de contrato consumer-driven, OpenAPI/Swagger, testes unitários "sem banco ou rede": ausentes. O livro pede lista de endpoints com nome, descrição e respostas [p.207], sem formato.
- Alerta de consumer lag (Kafka), Prometheus, Micrometer, Jaeger, amostragem de tracing: [fora do livro] (o bloco não cita ferramentas).
- Camada 1 incluindo "bancos de dados" e camada 4 "apenas regras de negócio, contratos e casos de uso": o glossário não lista bancos na camada 1 e define a camada 4 como os microsserviços e suas configurações específicas [p.232]. "Microsserviços não devem resolver problemas de infraestrutura": sem suporte no bloco.
- "Runbooks testados" (checklist de Ownership): o bloco não fala em testar runbooks.

### (c) O que o bloco traz e a skill não cobre
- **Resposta a incidentes** [p.175-177, 178-179]: cinco estágios (avaliação, coordenação/comunicação, mitigação, resolução, acompanhamento); mitigar não é resolver; TTD e TTM pesam contra o SLA, TTR quase nunca; registrar a comunicação por três razões; autópsia sem culpa com conteúdo mínimo (resumo, TTD/TTM/TTR, downtime, usuários afetados, linha do tempo, causa raiz, prevenção, lista de ações); compartilhar incidentes entre equipes. A skill não tem nada.
- **Planejamento de capacidade**: neste bloco só como critério e perguntas: automatizado e programado [p.220]; agenda, prazo de espera de hardware, frequência de solicitações, prioridade entre serviços, automatizado ou manual [p.225]; definição no glossário [p.239]. NÃO há método nem texto explicativo aqui (estaria em bloco anterior). Também ausentes na skill: escala de crescimento qualitativa/quantitativa [p.224, 235], requisitos de recurso por instância [p.224-225], dimensionar dependências [p.225], gestão de tráfego e redirecionamento entre datacenters [p.225-226].
- **Teste de caos**: só como critério e pergunta, "todos os possíveis cenários de falha são implementados e testados" por teste de caos [p.178; Apêndice A p.220; Apêndice B p.227]. Sem procedimento neste bloco. A skill só tem teste de carga e não tem inventário de cenários de falha (hardware, comunicação/aplicação, dependências, internas [p.178]) nem SPOF [p.178, 239].
- **Documentação** (cap. 7, p.198-210): repositório central; README e comentários insuficientes [p.201]; atualizar a cada mudança significativa como parte do fluxo de desenvolvimento [p.202]; nove elementos (descrição, diagrama, contato/plantão, links, guia de bordo, fluxos/endpoints/dependências, roteiro de plantão, FAQ) [p.201, 203-209]; estrutura do roteiro de plantão por alerta (nome, descrição, problema, passos, gravidade, é interrupção?, como comunicar) [p.207-208]. A skill tem só "documentação" e "runbooks".
- **Descontinuação e desativação**: o bloco NÃO ensina o procedimento. Traz apenas duas perguntas de checklist (existem procedimentos para desativar um serviço e para descontinuar endpoints de API) [p.224] e definições no glossário (desativação: retirar serviço/endpoints para que clientes não os usem mais; descontinuação: deixam de ser mantidos e recomendados) [p.233-234]. Não consta no Apêndice A. A skill não tem nada. Qualquer procedimento real vem de outro bloco ou é [fora do livro].
- **Alertas e monitoramento**: lista completa de métricas principais (threads, descritores de arquivo, conexões com banco, métricas da linguagem, clientes, saúde de dependências) [p.183-185]; alerta quando a métrica "não é vista" [p.191]; três limiares [p.191]; alerta acionável e remoção dos não acionáveis [p.192]; automatizar alertas repetidos [p.193-194]; alertas de dependência só se houver ação [p.192]; antipadrão de olhar o dashboard para detectar incidente [p.190]; marcar deploys nos gráficos [p.190]; monitorar todas as fases do pipeline [p.184, 189].
- **Plantão**: desenvolvedores de plantão pelo próprio serviço [p.194]; pelo menos 2 pessoas, turno de no máximo uma semana, intervalo de pelo menos um mês [p.195]; escala pública; procedimento padronizado [p.195].
- **Custo e higiene de logging**: logs são caros; sem logs de debug em produção; cotas por serviço e retenção limitada [p.187-188].
- **Processo organizacional de prontidão**: revisão de arquitetura periódica alinhada a OKR [p.212-213]; auditoria com checklist [p.213-214]; plano estratégico de disponibilidade [p.214-215]; automação das verificações, nota de disponibilidade e bloqueio de implantações de serviços críticos com nota baixa [p.215-217]; avaliar antes da RFC [p.211].
- **Deploy**: "A maioria das interrupções ... é causada por implantações ruins" [p.180]; staging total/parcial, canário (2% a 5% do tráfego) [p.240-242] e perguntas do pipeline [p.222-223]. A skill só cita rolling update e rollback; faltam staging e pré-release/canário.
- Documentar dependências com SLA, alternativas, caches e links [p.207]; cache defensivo [p.232].

### Segurança neste bloco
**SIM, mas apenas marginal; o bloco NÃO trata segurança como tema.**
- Único conteúdo de segurança: higiene de logs, sem dados de identificação, sem segredos (senhas, chaves de acesso), IDs de usuário só criptografados [p.187].
- Menção incidental: nuvem acessada "por meio de redes seguras" na definição de provedores [p.240].
- Ausentes: autenticação/autorização, gestão de segredos fora dos logs, criptografia em trânsito/repouso, modelo de ameaças, vulnerabilidades de dependências, conformidade, resposta a incidentes de segurança. Nenhum critério de segurança nos Apêndices A e B [p.219-230].
- Implicação: a skill pode ganhar a regra de logs (e corrigir o exemplo com `customerId`); não há base neste bloco para uma skill de segurança.

### Design de APIs neste bloco
**NÃO. O bloco trata de API apenas como documentação e como alvo de checklist.**
- Documentação de endpoints: lista com nome, descrição qualitativa e respostas, suficiente para uso como caixa preta [p.207]; documentar fluxos de solicitação [p.206-207]; API/endpoint no glossário [p.237, 234]; "APIs decentes" facilitam automatizar a checklist [p.216].
- Contratos, versionamento, compatibilidade retroativa e política de depreciação: ausentes. Só há duas perguntas sobre procedimentos para descontinuar endpoints [p.224] e a nota de que em geral não se recomenda versionar o microsserviço [p.186]. Nenhuma regra de design de contrato.
- Decisão: este bloco NÃO sustenta a criação de `api-design-expert`. Só reavaliar se outro bloco (provavelmente Cap. 3, descontinuação e desativação) trouxer conteúdo.

### Artefatos candidatos (resumo)
- production-ready-microservices-expert: **ALTA**. Propostas: (1) reference de resposta a incidentes e autópsia [p.175-177]; (2) reference de monitoramento e alertas (métricas principais, três limiares, acionabilidade, plantão, custo de logs) [p.180-195]; (3) reference de documentação e roteiro de plantão [p.198-210]; (4) reference de auditoria, revisão de arquitetura, plano estratégico e nota [p.211-217], com a checklist do Apêndice A [p.219-221]; (5) corrigir o exemplo de log com `customerId` e rever a tensão com `version` [p.186-187]; (6) trocar "runbooks para os alertas mais comuns" por "todos os alertas"; (7) listar as novas references em `## Referências` e manter SKILL.md abaixo de 450 linhas.
- dev-practices: **MÉDIA/BAIXA**. Apenas: documentação como parte do fluxo de desenvolvimento [p.202]; automatizar o que se faz manualmente mais de uma vez [p.216]; autópsia sem culpa [p.177]. A maior parte do bloco é operacional.
- api-design-expert: **NENHUMA/BAIXA**. Não criar a partir deste bloco.
