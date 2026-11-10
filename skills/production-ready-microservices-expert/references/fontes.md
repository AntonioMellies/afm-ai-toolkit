# Fontes e rastreabilidade

Livro de referência: Susan J. Fowler, *Microsserviços Prontos para a Produção* (edição em português). Páginas = marcador "PDF PAGINA N" do texto extraído. Citações literais têm no máximo 25 palavras. Regras sem linha nesta tabela não são atribuídas ao livro: são convenções desta skill.

Escopo desta versão (1.1): as páginas lidas e usadas foram 40-47, 55, 64-87, 104-230 (fim do capítulo 3, capítulos 4 a 7 e apêndices A e B) e o glossário (p.231-243, apenas as entradas citadas). As páginas 1-39, 48-54, 56-63 e 88-103 (parte dos capítulos 1 e 3) não foram lidas para esta versão.

## Rastreabilidade: regra, capítulo e páginas

| Regra ou ponto da skill | Capítulo ou seção | Páginas (PDF) | Citação curta |
|---|---|---|---|
| Oito padrões de prontidão (estabilidade, confiabilidade, escalabilidade, tolerância a falhas, prontidão para catástrofes, desempenho, monitoramento, documentação) | Cap. 2 | 68-69 | |
| Disponibilidade é objetivo, não princípio; fórmula uptime/(uptime+downtime) | Cap. 2 | 66 | |
| Tabela dos noves (downtime tolerado) | Cap. 2 | 67-68 | |
| Escala qualitativa (negócio) e quantitativa (RPS/QPS/TPS) | Cap. 4 "Conhecendo a escala de crescimento" | 115-119 | |
| Inferir o futuro só com tráfego atual é arriscado; usar teste de carga e histórico | Cap. 4 | 116 | "corre o risco de ser equivocada" |
| Requisitos de recursos por instância (CPU, RAM, threads, conexões, cotas de log) | Cap. 4 "Percepção de recursos" | 121-122 | "requisitos para uma única instância do serviço" |
| Escalar horizontalmente; contar servidores a partir do comportamento de uma instância | Cap. 4 | 122 | |
| Gargalos: limite de conexões de banco, dependência de escala vertical, teste de carga para os não óbvios | Cap. 4 | 122-123 | |
| Planejamento de capacidade programado: necessidades, orçamento, reserva de hardware | Cap. 4 | 123-125 | "Os princípios do planejamento de capacidade são bem diretos" |
| Exemplo de projeção (20 mil novos visitantes únicos no trimestre) | Cap. 4 | 124 | |
| Prazo de espera de hardware; automatizar o planejamento com autosserviço | Cap. 4 | 125 | |
| Escalamento das dependências; revisões de arquitetura e escalabilidade entre equipes | Cap. 4 | 125-127 | |
| Padrões de tráfego, agendar mudanças fora do pico, picos e redirecionamento entre datacenters | Cap. 4 "Gerenciamento de tráfego" | 127-129 | |
| Prioridade para serviços críticos; subutilização versus folga planejada; isolamento em hardware compartilhado | Cap. 2 e 4 | 77, 119-120 | |
| Dados de teste e locação de teste; conexões de banco | Cap. 4 | 135-136 | |
| Avisar dependências e clientes sobre crescimento | Cap. 2 e 4 | 73, 127 | |
| Definição de planejamento de capacidade, escalas de crescimento, escalamento horizontal e vertical | Glossário | 235-236, 239 | |
| Perguntas de verificação de capacidade | Cap. 4 / Apêndice B | 136-138, 224-226 | |
| Falhas acontecem, qualquer falha possível acontecerá | Cap. 5 | 139, 144-145 | |
| Eliminar pontos únicos de falha; técnica de quadro branco | Cap. 5 | 140, 142-144 | |
| Mitigar quando não é possível eliminar | Cap. 5 | 144 | |
| Falhas comuns (revisões, processo, deploy); falhas por camada e de dependência; falhas internas | Cap. 5 | 145-157 | |
| SLA de dependência e multiplicação de disponibilidades | Cap. 5 | 154 | |
| Teste de resiliência: código, carga e caos (visão geral) | Cap. 2 e 5 | 75-76, 141, 157-158 | "o tipo de teste de resiliência mais importante" |
| Quatro tipos de teste de código e automação | Cap. 5 | 158-161 | |
| Teste de carga: objetivo, estágios, produção, avisar dependências, automatizar | Cap. 5 | 161-165 | "Nunca assuma que as dependências downstream podem tratar a carga" (p.164) |
| Teste de caos: produção, programado e aleatório, controle, serviço central, tipos de experimento | Cap. 5 | 166-168 | |
| Toda falha nova entra no conjunto de testes | Cap. 5 | 141 | "deve ser adicionada ao conjunto de testes de resiliência" |
| Detecção e reparo automatizados; rollback de versão e de configuração; alternativa estável; redirecionar tráfego | Cap. 5 | 168-170 | |
| Cache defensivo, alternativas, fallbacks, filas para dependências | Cap. 3 | 105-106, 232 | |
| Health check em canal separado, resposta útil e precisa; 200 fixo não é ideal; circuit breaker | Cap. 3 | 107-108, 111, 223-224 | "deve dar uma resposta útil e precisa" |
| Custo do downtime; TTD, TTM, TTR | Cap. 5 | 170-171, 176 | |
| Categorização de serviços e de incidentes (gravidade e escopo) | Cap. 5 | 171-173 | |
| Cinco estágios da resposta a incidentes | Cap. 5 | 173-176 | "Mitigação não é o mesmo que resolução" (p.176) |
| Registro da comunicação durante o incidente | Cap. 5 | 175 | |
| Postmortem (autópsia): conteúdo mínimo, sem culpa; compartilhar | Cap. 5 | 176-177 | |
| Monitoramento: três componentes na visão geral (logging, painéis, alertas) e quatro no capítulo 6 (com plantão) | Cap. 2 e 6 | 78, 80, 181 | |
| Alertas acionáveis, três limiares, limiar a partir de histórico ou teste de carga | Cap. 2 e 6 | 79, 190-192 | "Um alerta não acionável não é um alerta útil" (p.79) |
| Não depender de olhar o painel para detectar incidente | Cap. 6 | 190 | "nunca devem precisar observar o dashboard" |
| Higiene de logs (sem dados de identificação, segredos; IDs só criptografados) | Cap. 6 | 187 | "Os logs nunca devem conter informações de identificação" |
| Custo de logs; sem logs de depuração em produção; cotas | Cap. 6 | 187-188 | |
| Painel: só o mínimo das métricas principais | Cap. 6 | 188-189 | |
| Roteiro de plantão por alerta; automatizar alertas repetidos | Cap. 6 e 7 | 79, 193-194, 207-208 | "nunca mais sofrerá o mesmo problema duas vezes" (p.194) |
| Plantão: desenvolvedores, mínimo 2, turno máx. 1 semana, intervalo mín. 1 mês | Cap. 6 | 194-195 | |
| Escrever runbook para ser lido às duas da madrugada | Cap. 7 | 208 | "desenvolvedores sonolentos possam entender às duas da madrugada" |
| Documentação central, atualizada junto com o código; README não basta | Cap. 7 | 200-203 | "Arquivos README e comentários no código não são documentação" |
| Elementos da documentação | Cap. 7 | 203-209 | |
| Entendimento em três níveis; revisão de arquitetura; auditoria; plano estratégico; automação e nota | Cap. 7 | 80-82, 210-217 | |
| Apêndice A (checklist) e B (perguntas) | Apêndices | 219-230 | |
| Descontinuação e desativação: causa de instabilidade, passos, monitorar tráfego residual | Cap. 3 | 108-109 | "são mais um problema sociológico ... do que um problema técnico" (p.108); "desativados em vez de abandonados" (p.109) |
| Definições de descontinuação e desativação | Glossário | 233-234 | |
| Falhas por descontinuação sem aviso aos clientes | Cap. 5 | 154-155 | |
| Evitar atribuir versões a microsserviços e a endpoints | Cap. 1 | 40-41 | "tratados como coisas vivas e em constante mutação" (p.41) |
| Não versionar nem se prender a versões de bibliotecas e serviços internos | Cap. 5 | 154 | |
| Logs compensam a ausência de versão do serviço | Cap. 2 e 6 | 78, 186 | |
| Caixa-preta | Cap. 1 e 7 | 41, 207 | |
| Quatro camadas do ecossistema; banco na camada de hardware; microsserviços separados da infraestrutura | Cap. 1 | 42-44, 55 | |
| REST simples e síncrono; mensageria assíncrona, mais complexa, filas como ponto de falha, condições de corrida | Cap. 1 | 46-47 | |

Observações de fidelidade: (a) a visão geral do livro cita "regressão" entre os testes de código (p.75), o capítulo 5 lista lint, unidade, integração e fim a fim (p.158-161); (b) p.173 fala em "quatro níveis de gravidade (0 a 4)", que são cinco valores; (c) o canário tem "2% a 5% dos servidores de produção" em p.70 e "2% a 5% do tráfego de produção" em p.240; (d) o livro é ambíguo sobre IDs de usuário em logs: p.187 diz que IDs e detalhes de requisição "podem e devem" ser registrados e, no parágrafo seguinte, que IDs só entram criptografados.

## Posições do livro que não foram adotadas como regra desta skill

- Recomendação de linguagens de programação para escalar (p.130-132) e a escolha entre banco relacional e NoSQL (p.134-135): conteúdo datado e dependente do contexto.
- Mesos e Docker como exemplos de abstração e isolamento (p.120): citados como exemplos de época.

## Divergências entre a skill atual e o livro

Auditoria do `SKILL.md`, de `production-checklist.md` e de `observability-setup.md` (versão 1.0) contra as páginas listadas no escopo acima. Veredito: **Apoiado** (o livro sustenta), **Parcial**, **Sem base** (o livro lido não traz; é convenção da skill, o que não significa que esteja errado) ou **Tensão** (o livro diz algo diferente). Nenhum arquivo foi alterado para corrigir estes pontos; o `SKILL.md` ganhou apenas marcações onde indicado.

### SKILL.md

| Trecho | Veredito | Base e observação |
|---|---|---|
| Sistemas vivos que mudam e são reimplantados | Apoiado | p.41, 86 |
| "Produção é uma funcionalidade" e operação tão importante quanto código | Parcial | O livro trata monitoramento e documentação como requisitos de prontidão (p.68-69, 180-181); a frase é da skill |
| Perguntas obrigatórias antes de aprovar | Parcial | Equivalente do livro: auditoria por checklist e avaliação antes da RFC (p.211, 213-214) |
| Princípio da caixa-preta | Apoiado | p.41, 207 |
| "Nunca depender de banco interno ou bibliotecas internas" | Sem base | O livro fala de não se prender a versões de bibliotecas e serviços internos (p.154) |
| Quatro camadas | Apoiado | p.42-43, 55. Banco de dados na camada 1: p.44 diz que bancos (dedicados ou compartilhados) pertencem à camada de hardware; p.133-134 trata a responsabilidade pelo banco como da plataforma ou do serviço. O texto é misto |
| Camada 4 "apenas regras de negócio, contratos e casos de uso" | Parcial | p.55: a camada 4 contém tudo que é específico do serviço, incluindo suas configurações; a redação da skill é própria |
| Logs estruturados em JSON, `traceId`, "nunca texto livre" | Sem base | O livro pede logar para reconstruir o estado e rastrear cada requisição na pilha (p.186-187) sem prescrever formato |
| Higiene de logs | Apoiado | p.187 |
| Métricas p50/p95/p99, throughput | Parcial | O livro lista latência, disponibilidade, SLA, respostas, erros, CPU, RAM, threads, descritores, conexões de banco (p.183-185); não cita percentis |
| Três pilares (logs, métricas, tracing) | Tensão leve | A visão geral do livro cita três componentes (logging, painéis, alertas, p.78); o capítulo 6 conta quatro, com plantão (p.80, 181) |
| Health checks `/health/live`, `/health/ready`, `/health/startup` | Sem base | O livro fala em um endpoint de saúde com resposta útil e precisa, em canal separado, e diz que um 200 fixo não é ideal (p.107, 111, 151). Separação em liveness/readiness/startup vem de orquestradores, não do livro |
| Timeout | Parcial | Só aparece como cenário de falha de dependência (p.154-155) |
| Retry com backoff exponencial | Sem base | Ausente nas páginas lidas |
| Circuit breaker | Apoiado | p.107-108, 111, 224: para serviços com taxa anormal de erros e para tráfego de entrada e saída |
| Fallback | Apoiado | p.105-106, 169 (alternativas, filas, cache defensivo) |
| Bulkhead | Sem base | Ausente. O isolamento por contêineres citado em p.120 trata de vizinhos em hardware compartilhado, não do padrão bulkhead |
| Mensageria: "desacoplamento e resiliência", custo "consistência eventual" | Parcial | p.46-47: assíncrona e mais complexa; broker e filas podem ser ponto de falha; riscos de condições de corrida e laços infinitos; pode ser tão escalável quanto REST se bem arquitetada. REST é simples e estável, porém síncrono (bloqueante). Os termos "acoplamento temporal" e "consistência eventual" não estão nessas páginas |
| Service discovery e load balancing; múltiplas instâncias; escala horizontal | Apoiado | p.107, 122, 152, 232, 234. Múltiplas zonas: o livro menciona zonas de disponibilidade e redirecionamento entre datacenters (p.129, 148-149, 169) |
| Evitar IPs fixos | Sem base | Não encontrado nas páginas lidas |
| Rolling update | Sem base | O livro usa pipeline de staging, pré-release (canário, 2% a 5%) e produção, e pergunta se o deploy em produção é gradual ou de uma vez (p.70, 219, 223). O termo rolling update não aparece |
| Rollback automatizado, evitar deploy manual | Apoiado | p.79, 168-170 |
| Monitorar infraestrutura, aplicação e negócio | Parcial | O livro separa métricas de servidor/infraestrutura e de microsserviço (p.182-183). Métricas de negócio servem à escala de crescimento (p.117), e o painel deve ter só o mínimo das métricas principais (p.189) |
| Logs respondem o quê, quando, onde, qual entidade | Parcial | Objetivo do livro: descrever o estado do serviço em qualquer momento do passado recente (p.185-186) |
| Escalabilidade: diagnosticar gargalo, lista CPU/memória/banco/rede/fila | Parcial | Gargalos e requisitos do livro: CPU, RAM, threads, conexões, cotas (p.121-123, 183). "Nunca escale sem diagnóstico" é da skill |
| Ownership com equipe, dashboard, alertas e runbooks | Apoiado | p.188, 193, 205-207 |
| Ordem de "Comportamento Esperado" (operação antes do código) | Parcial | Avaliar contra os padrões antes da RFC (p.211); a sequência de oito passos é da skill |

### production-checklist.md

| Linha | Veredito | Observação |
|---|---|---|
| Logs JSON, `/metrics` Prometheus, `traceId` | Sem base | Livro sem formato nem ferramentas (p.185-187) |
| Health checks live/ready/startup | Sem base | Ver acima; a linha "Liveness retorna 200" está em tensão com a crítica do livro a respostas fixas (p.107) |
| Retry com backoff, idempotência | Sem base | Ausentes |
| Timeout, circuit breaker, fallback | Parcial/Apoiado | Ver tabela acima |
| Rolling update | Sem base | Ver acima |
| Rollback em falha de health check pós-deploy | Apoiado | O livro também usa limiares de advertência e crítico das métricas principais (p.169-170) |
| "Feature flags ou migração gradual" para mudanças de contrato | Sem base | Feature flags não aparecem em nenhuma das páginas lidas; a parte "evite atribuir versões" está apoiada (p.40-41, 154) |
| Dashboard com métricas de negócio | Tensão | O livro quer só o mínimo das métricas principais (p.189) |
| Alertas: limiares fixos, lag de consumer | Parcial | O livro dá três níveis por métrica e limiares a partir de histórico ou teste de carga; sem valores nem lag de consumer (p.191-192) |
| Runbooks "para os alertas mais comuns" | Tensão | O livro exige roteiro para cada alerta (p.79, 193, 207) |
| Testes de unidade "sem banco ou rede" | Sem base | Livro: testes pequenos e independentes (p.159) |
| Teste de contrato consumer-driven | Sem base | O livro usa testes fim a fim contra endpoints de clientes e dependências (p.160) |
| Teste de carga | Apoiado | p.161-165; o livro é mais exigente (cada estágio, aviso a dependências) |
| Documentação OpenAPI/Swagger | Sem base | Livro: lista de endpoints com nome, descrição e respostas (p.207) |
| Runbooks "escritos e testados" | Parcial | Escritos por alerta: apoiado; testados: o livro não menciona |

### observability-setup.md

| Ponto | Veredito | Observação |
|---|---|---|
| `customerId` e `amount` no log de exemplo | Tensão | p.187: sem dados de identificação; IDs de usuário em geral só criptografados (o livro é ambíguo na mesma página) |
| `version` e `service.version` nos logs | Tensão leve | O livro desaconselha versionar serviços e diz que os logs compensam a ausência de versão (p.78, 186); mas usa versão para builds e rollback (p.168, 219) |
| Prometheus, Micrometer, OpenTelemetry, Jaeger, W3C Trace Context, amostragem | Sem base | O livro não cita ferramentas de observabilidade |
| Tabela de alertas (5% de erro, p95 > 2 s, CPU 0,8, memória 0,9, lag > 1000) | Sem base | Valores ilustrativos; o livro só define o esquema normal, advertência e crítico (p.191-192) |
| Probes `/health/live`, `/health/ready`, `/health/startup` | Sem base | Ver health checks |

### Lacunas: assuntos do livro que a skill ainda não cobre em arquivo próprio

Fora do escopo desta atualização (ficaram para uma próxima): a estrutura por oito padrões e o processo de auditoria como checklist próprio; o pipeline de deploy em estágios (staging total e parcial, canário, deploy gradual, bloqueio por SLA); o ciclo de desenvolvimento padronizado; dependências e roteamento em detalhe; monitoramento e painéis em profundidade. Parte desse conteúdo está nas páginas 91-103, que não foram relidas nesta versão.
