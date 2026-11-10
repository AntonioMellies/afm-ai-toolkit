# Notas: Susan J. Fowler, Microsserviços Prontos para a Produção (Novatec, 2017), bloco 01, PDF p.1-87

Todas as páginas citadas são "PDF PAGINA N" do marcador. A numeração impressa não é visível no texto extraído (não há rodapé), então não há "impr. M".

### Front matter: capa, copyright, sumário (PDF p.1-13)
Páginas de capa/copyright (p.1-7) e sumário completo (p.8-13). Registrado só como estrutura.
Estrutura do livro (do sumário, p.8-13):
- Cap.1 Microsserviços (ecossistema em 4 camadas, desafios organizacionais)
- Cap.2 Disponibilidade de produção (8 padrões)
- Cap.3 Estabilidade e confiabilidade (ciclo de desenvolvimento, pipeline staging/canary/produção, dependências, roteamento e descoberta, descontinuação e desativação)
- Cap.4 Escalabilidade e desempenho (escala de crescimento, uso eficiente de recursos, percepção de recursos, planejamento de capacidade, escalamento de dependências, gerenciamento de tráfego, tratamento de tarefas, armazenamento escalável)
- Cap.5 Tolerância a falhas e preparação para catástrofes (SPOF, cenários de falha, teste de resiliência: código/carga/caos, detecção e reparo, incidentes: "cinco estágios da resposta a incidentes")
- Cap.6 Monitoramento (métricas, logging, dashboards, alertas, plantão)
- Cap.7 Documentação e compreensão (8 itens de documentação; revisões de arquitetura, auditorias, planos estratégicos, automação)
- Apêndice A Checklist, Apêndice B Avalie seu microsserviço, Glossário.
Observação: o sumário NÃO tem capítulo de segurança nem de design de APIs/versionamento. [p.8-13]
Decisão sugerida: descartar (só estrutura), usar como mapa para os próximos blocos.

### Prefácio (PDF p.14-25)
Resumo: A autora criou os padrões de disponibilidade de produção ao trabalhar como SRE na Uber, com mais de mil microsserviços vindos da divisão de um monólito, 85% sem envolvimento de SRE. Descreve o processo (revisão de arquitetura, auditoria sim/não, roteiros, nota) e declara o escopo do livro: prescritivo, abstrato, não é passo a passo nem descrição da Uber.
Conceitos e regras:
- Oito princípios: estável, confiável, escalável, tolerante a falhas, de alto desempenho, monitorado, documentado, preparado para catástrofes; cada um quantificável, com critérios mensuráveis. [p.15]
- Serviço que atende aos critérios é "pronto para produção" e só então pode receber tráfego de produção. [p.15]
- Processo de adoção: SRE reúne serviços críticos ao negócio (cuja queda derruba a aplicação), revisa arquitetura, audita (checagens sim/não por requisito), cria roteiros (passo a passo para ficar pronto), atribui nota. [p.15]
- Revisão de arquitetura: cada desenvolvedor do serviço desenha a arquitetura em até 30 minutos; ao diagramar endpoints, fluxos de requisição e dependências, os pontos de falha ficam evidentes. [p.15-16]
- Pronto/não-pronto binário não basta; adicionou-se pontuação por requisito e nota geral. [p.16]
- Roteiro de auditoria: lista de requisitos não cumpridos + links para interrupções recentes causadas por eles + trabalho necessário + tarefa aberta + responsável. [p.16]
- Próximo passo da autora: automatizar todo o processo continuamente para todos os serviços. [p.16]
- O livro não é guia passo a passo, não é enciclopédico, não é específico de tecnologia (ex.: não manda usar Kafka para logs, apresenta aspectos de logging pronto para produção) e não é sobre a Uber. [p.19-20]
- Admite que há outras formas de testar versões além de staging/pré-release/produção, mas apresenta essa como a melhor. [p.19]
- Capítulos 3-7 terminam com "Avalie seu microsserviço" (perguntas); Apêndice A é checklist; B reúne perguntas. [p.21, 23]
Citações curtas de prova:
- "este é o livro que eu gostaria de ter tido em mãos quando comecei a padronizar os microsserviços do Uber" [p.17]
O que este trecho NÃO diz: não define ainda critérios concretos; não trata segurança.
Relevância: production-ready-microservices-expert: ALTA (o método de auditoria: revisão de arquitetura, checklist sim/não, nota, roteiro); api-design-expert: NENHUMA; dev-practices: BAIXA.
Decisão sugerida: usar em production-ready-microservices-expert (processo de auditoria e roteiro).

### Capítulo 1 Microsserviços (PDF p.26-63)
Resumo: Explica por que monólitos viram problema (carga operacional, complexidade, escala horizontal/vertical), define microsserviço, descreve o processo de divisão, a arquitetura de um microsserviço, o ecossistema em 4 camadas e os 4 trade-offs organizacionais (Lei de Conway reversa, dispersão técnica, novas formas de falhar, competição por recursos).
Conceitos e regras:
Monólito e divisão
- Aplicações têm 3 elementos (frontend, backend, dados). Com o crescimento surgem carga operacional, mais complexidade e necessidade de escalar horizontal e verticalmente. [p.27-29]
- Escalabilidade exige simultaneidade e segmentação, difíceis em monólito. [p.31-32]
- Microsserviço: pequena aplicação que faz uma tarefa bem, substituível, desenvolvida e implantada de forma independente, mas parte de um sistema maior. [p.33]
- Riscos: dividir mal gera "vários monólitos menores"; deve ser simples. [p.35-36]
- Passos para dividir: (1) identificar componentes (passo mais difícil), (2) reorganizar equipes (uma equipe por serviço, ou uma equipe com vários serviços organizados por produto/domínio; cuidar da fadiga operacional), (3) construir infraestrutura organizacional; só então migrar. [p.35-37]
- Migração: extrair código e replicar tráfego, ou reescrever e replicar/redirecionar após testes; exige planejamento documentado; migração completa pode levar anos. [p.37]
- Começar já com microsserviços em empresa pequena é desaconselhado: falta infraestrutura e capacidade operacional, e é difícil identificar componentes. [p.37-38]
Arquitetura do microsserviço
- Frontend do microsserviço é uma API com endpoints estáticos (ex.: get/update/delete_customer_information); endpoints convivem no mesmo backend. [p.38-39]
- Endpoints devem ser padronizados na organização (o TIPO, não os endpoints específicos): REST ou Thrift; ter ambos complica monitoramento. [p.40]
- Microsserviços se comunicam por RPC; protocolo depende de endpoints e arquitetura. [p.40]
- Evitar atribuir versões a microsserviços e a endpoints de API (antipadrão): microsserviço não é biblioteca; versionar vira pesadelo porque clientes embutem versões obsoletas; tratar como "coisas vivas em constante mutação". [p.40-41] (ÚNICO trecho sobre versionamento neste bloco, e é contra versionar.)
- Escolha de endpoint/protocolo é decisão de arquitetura do ecossistema, não do desenvolvedor individual. [p.41]
- Liberdade de linguagem interna, mas com custo elevado para a organização. [p.41]
- Meta: microsserviço como caixa-preta (entrada por endpoint, saída; cliente não precisa entender nada além dos endpoints). [p.41-42]
Ecossistema em 4 camadas [p.42-56]
- Camada 1 Hardware: servidores, SO padronizado, isolamento/abstração de recursos (Docker, Mesos), databases, gerenciamento de configuração, monitoramento e logging em nível de servidor. [p.43-45]
- Camada 2 Comunicação: rede, DNS, RPC, endpoints, troca de mensagens, service discovery, service registry, balanceamento de carga. [p.45-49]
  - HTTP+REST/Thrift: simples, estável, difícil implementar errado, mas síncrono/bloqueante. [p.46]
  - Mensageria: assíncrona, pubsub e request-response; riscos: broker/filas viram ponto de falha, condições de corrida, loops infinitos; pode ser tão estável quanto síncrona se houver proteções. [p.47]
  - Descoberta roteia só para instâncias saudáveis; registro é o banco de IPs/portas; portas/IPs mudam com escala e redeploy. [p.48]
  - Muitas camadas de balanceamento de carga em qualquer ecossistema grande. [p.49]
- Camada 3 Plataforma de aplicação: ferramentas de autosserviço, ambiente de desenvolvimento, teste/build/empacotamento/release (CI), pipeline de deployment, logging e monitoramento centralizados em nível de microsserviço. [p.49-54]
  - Ferramentas de autosserviço por camada para que equipes superiores não precisem entender camadas inferiores; também evitam que não especialistas alterem sistemas das camadas 1-3 e causem interrupções (ex.: gerenciamento de configuração). [p.50-52]
  - Ambiente de desenvolvimento mais estável: espelho da produção, diferente de staging, pré-release e produção; desenvolvimento só local leva a deploys ruins. [p.52-53]
  - Todo microsserviço deve logar todas as requisições e respostas; sem versões e com ritmo rápido, é impossível reproduzir bugs/estado, então o log é a fonte. [p.54]
- Camada 4 Microsserviços: o serviço e suas configurações específicas; recomenda manter as configurações do serviço no repositório do serviço, acessadas pelas ferramentas inferiores. [p.55-56]
Desafios organizacionais [p.56-63]
- Citação de Brooks (sem bala de prata); microsserviços trocam escala/eficiência por custos em outro lugar. [p.56]
- Lei de Conway Reversa: a estrutura organizacional é moldada pela arquitetura; resulta em equipes pequenas e isoladas, desenvolvedores "como microsserviços" (especialistas isolados). [p.57-58]
- Déficit de comunicação entre equipes de serviço e de infraestrutura/plataforma (levantar requisitos de centenas de equipes leva meses ou anos). [p.58]
- Sem organização operacional separada: as equipes de desenvolvimento ficam de plantão pelos seus serviços. [p.59]
- Dispersão técnica: mil equipes = mil formas de implantar, monitorar, alertar, testar; só se reduz com padronização em todos os níveis; suportar muitas linguagens é inviável, escolher poucas linguagens suportadas. [p.59-60]
- Débito técnico cresce silenciosamente; pós-incidente costuma adotar solução rápida, não a melhor. [p.60-61]
- Terceira contrapartida: novas formas de falhar; nenhum teste evita falhas; há limite no preparo. [p.61]
- Competição por recursos (hardware, engenharia, contratação); mitigar classificando equipes por criticidade para o negócio, com a desvantagem de sacrificar ferramentas de desenvolvimento e projetos de futuro. [p.61-63]
Citações curtas de prova:
- "Evite atribuir versões aos microsserviços e endpoints" [p.40] (título do boxe)
- "nenhum microsserviço é uma ilha" [p.33]
O que este trecho NÃO diz: não trata segurança (autenticação, autorização, TLS, segredos); não aprofunda design de contratos de API nem depreciação de endpoints (isso é tratado no Cap.3, em outro bloco); a lista de tecnologias é exemplificativa.
Relevância: production-ready-microservices-expert: MÉDIA (contexto, ecossistema em 4 camadas, riscos organizacionais, padronização contra dispersão); api-design-expert: BAIXA (só a posição "não versionar", fraca e contrária à prática comum; insuficiente sozinha); dev-practices: BAIXA (ambiente de dev espelhando produção, CI).
Decisão sugerida: usar em production-ready-microservices-expert (referência de contexto/ecossistema e trade-offs organizacionais); não criar api-design-expert a partir deste bloco.

### Capítulo 2 Disponibilidade de produção (PDF p.64-85)
Resumo: Define disponibilidade como objetivo (não princípio) da padronização, apresenta o cálculo por uptime/downtime e a notação dos noves, e introduz os oito padrões (princípios) com seus requisitos, cada um detalhado nos capítulos seguintes; termina com estratégias para implementar a padronização na organização.
Conceitos e regras:
- Padrões devem ser genéricos para todos os serviços e específicos para serem quantificáveis e mensuráveis. [p.66]
- Disponibilidade = uptime / (uptime + downtime); é objetivo, não princípio, pois não orienta como construir. [p.66]
- Tabela dos noves (downtime permitido): 99% = 3,65 dias/ano; 99,9% = 8,76 h/ano; 99,99% = 52,56 min/ano (8,66 s/dia); 99,999% = 5,26 min/ano. [p.67-68]
- "Pronto para produção" = serviço em que se pode confiar o tráfego de produção; confiança é conquistada. [p.68]
- Os oito padrões juntos (nenhum sozinho) geram disponibilidade. [p.68-69]
Padrões e requisitos (listas do próprio livro):
- Estabilidade: ciclo de desenvolvimento estável; processo de implantação estável; procedimentos estáveis de introdução e descontinuação. Contexto: a maioria das interrupções é rastreável a um deploy ruim; deploy em staging, pré-release (2% a 5% dos servidores de produção) e produção. [p.69-70]
- Confiabilidade: implantação confiável; planejar, mitigar e proteger-se contra falhas e dependências (cache, cache defensivo); roteamento e descoberta confiáveis (health checks precisos, erros tratados). [p.70-72]
- Escalabilidade: escalas de crescimento quantitativa e qualitativa definidas; gargalos e requisitos de recursos; planejamento de capacidade cuidadoso e preciso; tratamento escalável de tráfego (rajadas); escalar dependências (avisar dependências e clientes sobre crescimento esperado); armazenamento escalável. [p.72-73]
- Tolerância a falhas e prontidão para catástrofes: identificar e planejar cenários de catástrofe/falha; identificar e resolver SPOF; detecção e correção de falhas; teste de resiliência (código, carga, caos); tráfego gerenciado para falhas; incidentes e interrupções tratados de forma adequada. [p.74-76]
  - Falhas internas (código sem testes) vs externas (datacenter, gerenciamento de configuração). [p.74]
  - Resposta a incidentes padronizada e coordenada: cada desenvolvedor sabe o que fazer, mitigar e escalar. [p.75]
  - Teste de resiliência em 3 níveis: teste de código (unidade, regressão, integração); teste de carga (mudanças drásticas de tráfego); teste de caos (cenários de falha executados, programados e aleatórios, em serviços de produção). [p.75-76]
- Desempenho: SLAs de disponibilidade adequados; tratamento e processamento de tarefas adequado (evitar muitas chamadas de rede caras; assíncrono quando melhora); uso eficiente de recursos; subutilização precisa ser pesada contra planejamento de capacidade. [p.76-77]
- Monitoramento: logging e rastreamento em toda a pilha; dashboards; alertas acionáveis com roteiro; rotação de plantão. [p.77-80]
  - Em ecossistemas de microsserviços não se versiona o serviço, então logs são o que permite achar o que deu errado em um deploy antigo. [p.78]
  - Dashboards com métricas principais em tempo real; ninguém deve precisar olhar o dashboard para detectar incidentes; rollback para versão estável deve ser totalmente automatizado. [p.78-79]
  - Alertas mínimos sobre: CPU e RAM, file descriptors, conexões ao database, SLA, requests/responses, status de endpoints, erros e exceções, saúde das dependências, info de database, número de tarefas em processamento. [p.79]
  - Limites normal/alerta/crítico por métrica; limites indicativos (altos o bastante para evitar ruído, baixos para detectar problema real). [p.79]
  - Todo alerta deve ser acionável e ter roteiro (runbook). [p.79]
- Documentação e compreensão: documentação completa, atualizada e centralizada; compreensão organizacional (desenvolvedor, equipe, ecossistema). Conteúdo mínimo: diagrama de arquitetura, guia de integração/desenvolvimento, fluxo de requisições e endpoints da API, roteiro de plantão por alerta. Compreensão via revisões de arquitetura regulares, auditorias e roteiros, automação. Exercício do quadro branco: pedir à equipe que esboce a arquitetura revela entendimento divergente. [p.80-82]
Implementação [p.82-85]
- Exige adesão de cima para baixo e de baixo para cima; apresentar padronização como guia, não como gargalo. [p.83]
- Resposta à resistência: velocidade dos desenvolvedores é paralisada por interrupções; "a forma é libertadora" (Brooks). [p.83-84]
- Requisitos são gerais; cada organização deve traduzi-los para suas ferramentas internas (ex.: deploy estável descrito em termos da ferramenta de autosserviço), o que pode levar a reconstruir ferramentas. [p.84]
- SREs informam, motivam e aplicam; a implementação é de SREs integrados e dos próprios desenvolvedores. [p.85]
Citações curtas de prova:
- "a padronização traz liberdade e reduz a entropia" [p.84]
- "uma aplicação ou um serviço pronto para produção é aquele que podemos confiar que atenderá o tráfego de produção" [p.68] (paráfrase fiel; texto original ligeiramente mais longo)
O que este trecho NÃO diz: não dá limites numéricos de alerta nem metas de SLO concretas além da tabela dos noves; os requisitos aqui são só listas (detalhe nos Caps.3-7); não trata segurança; "caos" aparece apenas como definição, sem metodologia (a metodologia fica no Cap.5, outro bloco). Não há definição de SLO/error budget (usa apenas SLA).
Relevância: production-ready-microservices-expert: ALTA (os 8 padrões, a tabela dos noves, o modelo de auditoria e de adoção); api-design-expert: NENHUMA; dev-practices: BAIXA.
Decisão sugerida: usar em production-ready-microservices-expert (estrutura de checklist por 8 padrões, tabela dos noves, lista mínima de alertas).

### Capítulo 3 Estabilidade e confiabilidade (PDF p.86-87) [continua no próximo bloco]
Resumo: Só a abertura do capítulo. Texto cortado em "...sem causar" (final da p.87). Anuncia os tópicos: ciclo de desenvolvimento padronizado, pipelines de deployment em múltiplos estágios, dependências, circuit breakers e health checks no roteamento e descoberta, descontinuação e desativação de serviços e endpoints.
Conceitos e regras:
- Microsserviço estável: desenvolvimento, deploy, adoção de tecnologia e descontinuação de outros serviços não desestabilizam o ecossistema. [p.87]
- Todo requisito de estabilidade traz um de confiabilidade e vice-versa. [p.87]
- Uma versão defeituosa de um microsserviço crítico pode derrubar todo o negócio. [p.87]
- Mudanças devem passar por vários estágios antes de ir a todos os servidores de produção. [p.87]
O que este trecho NÃO diz: nada ainda sobre como fazer a descontinuação/desativação, nem as fases do pipeline em detalhe.
Relevância: production-ready-microservices-expert: MÉDIA (introdução); api-design-expert: BAIXA (depreciação aparece só como anúncio; o conteúdo está no próximo bloco).
Decisão sugerida: aguardar bloco seguinte.

## Segurança e design de APIs (registros explícitos)
- Este bloco trata de SEGURANÇA? NÃO. Busca textual por segurança, autenticação, autorização, criptografia, TLS/SSL, segredos, credenciais, vulnerabilidade, privacidade: zero ocorrências relevantes (apenas "autorizada" no copyright e "autorizado a receber tráfego" na p.15, sem sentido de segurança). O sumário (p.8-13) também não tem capítulo ou seção de segurança; sugere que o livro inteiro não trata disso (a confirmar nos blocos seguintes, só Cap.3-7 e apêndices restam).
- Este bloco trata de design de APIs (contratos, versionamento, depreciação)? NÃO como tema. Há apenas: (1) padronizar o tipo de endpoint (REST ou Thrift) e protocolo na organização, p.40; (2) recomendação explícita de NÃO versionar microsserviços nem endpoints (p.40-41, repetida na p.78); (3) documentação de endpoints e fluxo de requisição como item de documentação, p.81; (4) anúncio, sem conteúdo, de "descontinuação e desativação de serviços e endpoints" no Cap.3 (p.86-87). Não há nada sobre contratos de API, compatibilidade, esquemas, idempotência, paginação ou estratégia de depreciação neste bloco. O livro, até aqui, NÃO sustenta uma skill api-design-expert.

## Checklist de cobertura
- Primeira página lida: 1
- Última página lida: 87 (último marcador do arquivo confirmado por Grep: "=== PDF PAGINA 87 ===", linha 2922)
- Páginas sem texto útil ou ilegíveis: p.1-3 (capa/folha de rosto, quase vazias), p.4-7 (copyright e contatos da editora). Figuras 1.1 a 1.7 não têm texto (apenas legendas).
- Problemas de extração observados: sumário com marcadores soltos; boxes de destaque ("Evite atribuir versões...") com quebra de linha irregular; texto da p.87 cortado no final do bloco ("sem causar"); legendas de figuras sem conteúdo dos diagramas; algumas palavras com grafias do original ("Phabrictor").
- Capítulos/seções cobertos integralmente: Front matter/sumário, Prefácio, Capítulo 1, Capítulo 2.
- Capítulos/seções que continuam em outro bloco: Capítulo 3 (começa na p.86, truncado na p.87).

## Auditoria da skill atual
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

