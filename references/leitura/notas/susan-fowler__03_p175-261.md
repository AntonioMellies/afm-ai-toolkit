# Notas: Susan J. Fowler, Microsserviços Prontos para a Produção, bloco 03 (PDF p.175-261)

Observação geral: o bloco não mostra números de página impressos (sem rodapé/cabeçalho extraído); as páginas citadas são todas "PDF PAGINA N". Todas as paráfrases abaixo vêm só do texto do bloco.

---

### Cap. 5 (final): Tolerância a falhas e preparação para catástrofes, resposta a incidentes (PDF p.175-179) [continua do bloco anterior: avaliação e começo da coordenação estão antes da p.175]
Resumo. Fecha a descrição dos cinco estágios de resposta a incidentes (avaliação, coordenação/comunicação, mitigação, resolução, acompanhamento), com ênfase em registrar a comunicação, separar mitigação de resolução e escrever autópsias sem culpados. Termina com a lista "Avalie seu microsserviço" do capítulo.
Conceitos e regras:
- Estágio 2 (coordenação e comunicação): poucos plantonistas resolvem tudo sozinhos; é preciso coordenar com outras equipes e ter canais claros de comunicação de incidentes/interrupções para problemas de alta gravidade e escopo [p.175]
- Registrar a comunicação durante o incidente (logs de chat, e-mail) por três razões: ajuda no diagnóstico/causa raiz (quem faz o quê, o que já foi descartado); serviços dependentes são avisados e podem se proteger, evitando derrubar a cadeia de dependências; fornece insumo para as autópsias de incidentes graves [p.175]
- Estágio 3 (mitigação): reduzir o impacto sobre clientes e negócio. Mitigar não é resolver: não é corrigir a causa raiz, só reduzir o impacto. Só está mitigado quando a disponibilidade do serviço e a de seus clientes deixam de ser afetadas [p.175-176]
- Estágio 4 (resolução): corrigir de fato a causa raiz, que pode não ter sido feito na mitigação. Aqui "o relógio para": as duas medidas que pesam contra o SLA são tempo de detecção (TTD) e tempo de mitigação (TTM); o tempo de resolução (TTR) raramente pesa contra a disponibilidade [p.176]
- Estágio 5 (acompanhamento) tem três partes: escrever autópsias; compartilhar e analisar incidentes/interrupções graves; elaborar lista de ações para devolver o serviço a um estado pronto para produção (as ações podem estar na própria autópsia) [p.176]
- Conteúdo mínimo da autópsia: resumo do ocorrido; dados (TTD, TTM, TTR, downtime total, nº de usuários afetados, gráficos relevantes); linha do tempo detalhada; análise de causa raiz; resumo de como o incidente poderia ter sido evitado; como evitar interrupções semelhantes; lista de ações para voltar ao estado pronto para produção [p.177]
- Autópsias devem ser sem culpa: apenas fatos objetivos sobre o serviço, sem nomear pessoas; culpar sufoca o aprendizado e o compartilhamento organizacional [p.177]
- Falha em um microsserviço quase certamente afeta pelo menos outro; compartilhar incidentes por toda a organização ajuda a detectar as mesmas falhas em outros serviços antes que ocorram. A autora relata ter visto desenvolvedores saindo das reuniões de análise para corrigir seus próprios serviços [p.177]
- Lista "Avalie" do capítulo (resumo; repetida no Apêndice B, p.227-228): ponto único de falha; cenários de falha (hardware, comunicação/aplicação, dependências, internas); teste de resiliência (lint/unidade/integração/fim a fim, teste de carga regular e programado, **teste de caos** para todos os cenários de falha); processos padronizados de incidentes; impacto no negócio; níveis de falha definidos; estratégias de mitigação definidas; seguir os cinco estágios [p.177-179]
Citações curtas de prova:
- "Mitigação não é o mesmo que resolução" [p.176]
- "o tempo de resolução (TTR) raramente (se alguma vez) pesa contra a disponibilidade de um serviço" [p.176]
- "Autópsias são mais eficazes quando não culpam ninguém" [p.177]
O que este trecho NÃO diz: não descreve os estágios 1-2 por inteiro (estão no bloco anterior); não define níveis de gravidade/falha, nem papéis (comandante de incidente), nem ferramentas de comunicação; não explica COMO executar teste de caos (só aparece como pergunta de checklist, p.178; o conteúdo está no bloco anterior); não dá prazo para a autópsia nem modelo de template.
Relevância: production-ready-microservices-expert: ALTA (resposta a incidentes, TTD/TTM, autópsia); dev-practices: BAIXA; api-design-expert: NENHUMA.
Decisão sugerida: usar em production-ready-microservices-expert (reference de resposta a incidentes e autópsia), confrontando com o que já existir lá.

---

### Cap. 6: Monitoramento (PDF p.180-197)
Resumo. Monitoramento adequado repousa em quatro componentes: logging, dashboards, alertas e plantões. O capítulo define as "métricas principais" (servidor/infraestrutura e microsserviço), regras de logging, dashboards, limiares de alerta (normal/advertência/crítico), alertas acionáveis, roteiros de plantão e organização de plantões. Afirma que a maioria das interrupções vem de implantações ruins e a segunda causa mais comum é falta de monitoramento [p.180].

Conceitos e regras:
Princípios (PDF p.180-182)
- A maioria das interrupções é causada por implantações ruins; a segunda causa mais comum é monitoramento inadequado [p.180]
- Sem monitoramento, falhas ficam desconhecidas até virar interrupção; TTM e tempo de reparo se prolongam [p.180-181]
- Quatro componentes: logging adequado; dashboards de fácil leitura; alertas acionáveis sobre todas as métricas principais; turno de plantão sustentável [p.181]
- Critérios de "adequadamente monitorado": métricas principais nos âmbitos servidor/infra/microsserviço; logging fiel ao estado passado; dashboards fáceis com todas as métricas; alertas acionáveis com limiares sinalizadores; plantão dedicado; procedimento de plantão padronizado [p.181-182]

Métricas principais (p.182-185)
- Métricas principais = propriedades necessárias e suficientes para descrever o comportamento/saúde do serviço; o comportamento do serviço é a soma de suas instâncias em dezenas/centenas de servidores [p.182]
- Duas categorias: servidor e infraestrutura (camadas 1-3 do modelo de quatro camadas do Cap. 1) e microsserviço (camada 4). A separação importa organizacional e tecnicamente: as de servidor afetam várias equipes e devem ser compartilhadas; as de serviço interessam quase só à própria equipe [p.182-183]
- Métricas de servidor/infra: CPU, RAM, threads disponíveis, descritores de arquivo abertos, conexões com bancos. Devem ser granulares: por servidor e agregadas em todos os servidores [p.183]
- Quando o cluster abstrai recursos (ex.: Mesos), métricas de servidor podem não estar disponíveis, mas as de microsserviço continuam obrigatórias [p.184]
- Métricas de microsserviço: específicas da linguagem (exemplo: nº de workers uwsgi em Python), disponibilidade, SLA, latência (do serviço e por endpoint), sucesso dos endpoints, respostas e tempo médio de resposta por endpoint, clientes que originam as solicitações (e endpoints que acessam), erros e exceções (tratados e não tratados), saúde/status das dependências [p.184-185]
- Monitorar em todo estágio do pipeline de deployment (staging, pré-release, produção); staging é observado de perto para detectar problemas antes de chegar a servidores com tráfego real [p.184-185]

Logging (p.185-188)
- Objetivo básico: descrever o estado do serviço em qualquer momento do passado recente; como o serviço muda constantemente (nem o de 12 horas atrás é o mesmo), muitas vezes só os logs permitem achar a causa raiz [p.185-186]
- Recomendação do livro: em geral NÃO versionar o microsserviço (clientes poderiam se prender a versões específicas); em vez disso, bons logs substituem a falta de versão para saber o estado na falha [p.186, nota lateral]
- O que logar é específico por serviço; orientação vaga: tudo que for essencial para descrever o estado. Limitar-se ao que cabe no código do serviço; informação de servidor/infra é logada pela plataforma, não pela aplicação. IDs de usuário e detalhes de requisição/resposta podem e devem estar nos logs [p.186-187]
- SEGURANÇA (nos logs): nunca logar dados identificadores (nomes de clientes, números de previdência social, outros dados privados); nunca logar segredos (senhas, chaves de acesso); na maioria dos casos nem IDs/nomes de usuário, salvo criptografados [p.187]
- Rastrear cada solicitação por toda a cadeia de clientes e dependências (fim a fim) revela latência total e disponibilidade da pilha; um ecossistema pronto para produção exige rastrear cada solicitação pela pilha [p.187]
- Logs são caros (armazenar e acessar); somados em todo o ecossistema o custo é alto. Evitar logs de depuração em produção; garantir que branches com logs de debug nunca cheguem à produção [p.187-188]
- Logging deve ser escalável, disponível, acessível, pesquisável; impor cotas por serviço, limites sobre o que e quanto logar e por quanto tempo reter [p.188]

Dashboards (p.188-190)
- Todo microsserviço tem pelo menos um dashboard com todas as métricas principais (hardware, conexões com bancos, disponibilidade, latência, respostas, status de endpoints), atualizado em tempo real, centralizado e padronizado; legível por qualquer pessoa: saber de imediato se o serviço está saudável [p.188-189]
- Equilíbrio: nem informação demais nem de menos; só o mínimo necessário das métricas principais [p.189]
- Toda métrica que gera alerta deve estar no dashboard; métrica ausente = monitoramento precário; métrica desnecessária = descumprimento de boas práticas de alerta [p.189]
- Exceção: exibir cada fase do pipeline (staging, pré-release, produção), possivelmente em dashboards separados, tratando as fases quase como instâncias diferentes [p.189]
- Antipadrão: desenvolvedores nunca devem precisar observar o dashboard para detectar incidentes; isso indica falhas de alerta [p.190, nota]
- Mostrar os horários de deploy nos gráficos de cada métrica essencial para ligar anomalias a implantações [p.190]
- Dashboards ajudam a detectar anomalias sutis/graduais e a definir limiares a partir do histórico (padrões normais e picos que precederam interrupções) [p.190]

Alertas (p.190-194)
- Todas as métricas principais geram alertas, em vários limiares; também alerta quando uma métrica essencial deixa de aparecer ("não vista") [p.190-191]
- Três limiares por métrica, com limites superior e inferior: normal (não alerta), advertência (alerta antes de causar interrupção) e crítico (valores que de fato causam interrupção/pico de latência/perda de disponibilidade). Alto o bastante para evitar ruído, baixo o bastante para detectar problema real [p.191]
- Sem histórico (serviço novo), definir limiares com testes de carga: tráfego "normal" dá limiares normais; tráfego acima do esperado dá advertência e crítico [p.192, nota]
- Alertas acionáveis: não acionável é o que dispara e é resolvido/ignorado por não ser relevante ou não ser solucionável pelos plantonistas; deve ser removido, reatribuído ao plantão correto ou transformado em acionável [p.192]
- Alertas de dependência correm risco de ser não acionáveis; só alertar se houver ação (mesmo que seja contatar o plantão da dependência) [p.192]
- Tratamento: criar instruções passo a passo (triagem, mitigação, resolução) para cada alerta conhecido, no roteiro de plantão da documentação central [p.193]
- Dois tipos de roteiro: um compartilhado pela organização, para alertas de servidor/infra; outro por microsserviço, para alertas de suas métricas (ex.: pico de latência) [p.193]
- Antipadrões de alerta: se o plantão está sobrecarregado mas o serviço aparenta funcionar, alertas repetidos que se resolvem facilmente devem ser automatizados dentro do serviço; assim o serviço "nunca mais sofrerá o mesmo problema duas vezes" (afirmação da autora) [p.193-194]

Turnos de plantão (p.194-195)
- Desenvolvedores são responsáveis pela disponibilidade dos próprios serviços e devem estar de plantão por eles; objetivo: detectar, mitigar e resolver antes de virar interrupção ou impactar o negócio [p.194]
- Em orgs grandes, SRE/DevOps podem assumir o plantão, mas só quando o serviço está relativamente estável, o que raramente ocorre pois microsserviços mudam sempre [p.194]
- Plantão sustentável: turnos curtos e compartilhados, pelo menos dois desenvolvedores por vez, turnos de no máximo uma semana, com intervalo de ao menos um mês [p.195]
- Escala de plantão pública e acessível, em local centralizado, para dependentes contatarem rápido [p.195]
- Procedimentos de plantão padronizados em toda a organização, com orientação e onboarding rápido [p.195]

Citações curtas de prova:
- "A maioria das interrupções em um ecossistema de microsserviços é causada por implantações ruins." [p.180]
- "desenvolvedores nunca devem precisar observar o dashboard de um microsserviço para detectar incidentes e interrupções" [p.190]
- "os turnos não devem durar mais de uma semana, com intervalos de pelo menos um mês" [p.195]
- "Os logs nunca devem conter informações de identificação" [p.187]
O que este trecho NÃO diz: não prescreve ferramentas nem formato de log (estruturado, nível de severidade, correlation id explícito, amostragem); não define SLO/SLI formalmente (só "SLA" como métrica); não traz números de limiares; não fala de tracing distribuído como tecnologia (só rastrear solicitações fim a fim); não trata observabilidade em termos de "três pilares"; não cobre segurança além de higiene de logs; não aborda alertas por burn rate; não define níveis de severidade do alerta além de advertência/crítico.
Relevância: production-ready-microservices-expert: ALTA (monitoramento, alertas, dashboards, plantão, higiene de logs); dev-practices: MÉDIA (disciplina de logging e de alertas acionáveis); api-design-expert: NENHUMA.
Decisão sugerida: usar em production-ready-microservices-expert (references de monitoramento/alertas/plantão), confrontando com o conteúdo existente.

Checklist de perguntas do cap. 6 [p.195-197] (resumo): métricas principais conhecidas e monitoradas; logging reflete estado e é escalável e barato; dashboard existe e é legível; alerta para toda métrica, com limiares e acionáveis, com instruções no roteiro; plantão dedicado com pelo menos dois devs e procedimento padronizado.

---

### Cap. 7: Documentação e compreensão (PDF p.198-218)
Resumo. Documentação centralizada e atualizada, mais "compreensão" em três níveis (desenvolvedor, equipe, organização), reduz a dispersão organizacional e a defasagem técnica. Define os elementos obrigatórios da documentação, e processos organizacionais: revisões de arquitetura, auditorias de disponibilidade de produção, planos estratégicos e automação das auditorias com nota.

Conceitos e regras:
Princípios (p.198-201)
- Metáfora da "cebola" (Os irmãos Karamazov): "sempre dê uma cebola", isto é, documente sempre, pelo bem de si, da equipe e dos dependentes [p.198-200]
- Documentação ruim atrasa quem usa dependências/ferramentas (engenharia reversa) e quem contribui (sem roteiros o plantonista resolve tudo do zero; sem guia de bordo cada novo dev começa do zero; pontos únicos de falha passam despercebidos) [p.199-200]
- Objetivo: repositório central de conhecimento, com dois componentes: fatos objetivos sobre o serviço e compreensão organizacional de onde ele se encaixa. Dois subproblemas: falta de documentação e falta de compreensão [p.200]
- Critérios "documentado e compreendido": documentação abrangente e atualizada; contém descrição, diagrama de arquitetura, contato e plantão, links, guia de bordo/desenvolvimento, fluxos de solicitação/endpoints/dependências, roteiro de plantão, FAQ; compreensão em três níveis; segue padrões de disponibilidade de produção; arquitetura revista/auditada com frequência [p.200-201]

Documentação (p.201-210)
- Local centralizado (ex.: site interno para todos os serviços e ferramentas). README e comentários no código NÃO bastam como documentação pronta para produção [p.201-202]
- Atualizar sempre que houver mudança significativa (novo endpoint, alerta, dependência); tornar a atualização parte do fluxo de desenvolvimento, senão vira defasagem técnica; obrigar se necessário [p.202]
- Escrever de forma clara, sem jargão excessivo, compreensível por qualquer dev, gerente, PM ou executivo [p.203]
- Descrição curta (exemplo: serviço de recibo que envia e-mail ao cliente após o pedido) [p.203]
- Diagrama de arquitetura: componentes, endpoints, fluxo de solicitações, dependências upstream e downstream, bancos e caches; ajuda a entender, adicionar recursos e a revelar pontos de falha ocultos [p.203-204]
- Contato e plantão: nomes, cargos e contatos de toda a equipe (incluindo gerentes e PM) e quem está de plantão agora [p.205]
- Links: repositório, dashboard, RFC original, slides da última revisão de arquitetura, outros serviços e tecnologias [p.205]
- Guia de bordo e desenvolvimento: passo a passo para configurar o serviço (checkout, ambiente, subir, verificar) e para percorrer o ciclo de desenvolvimento e o pipeline de deployment (alterar, testar, revisar, liberar, implantar) com comandos e exemplos [p.206]
- Fluxos de solicitação, endpoints e dependências: descrição qualitativa dos tipos de solicitações; lista de todos os endpoints de API com nome, descrição e respostas, claros o bastante para outro time usar o serviço como caixa preta; para dependências: endpoints usados, solicitações feitas, SLAs, alternativas/caches/backups em caso de falha, links para docs e dashboards [p.206-207]
- Roteiro de plantão: requisitos gerais; lista completa de alertas, cada um com nome, descrição, descrição do problema e passo a passo de triagem/mitigação/resolução, gravidade, se indica interrupção, como comunicar a equipe e a organização; seção geral de solução de problemas e depuração para falhas inéditas; escrever "para o desenvolvedor sonolento das duas da madrugada" [p.207-208]
- FAQ: perguntas de outras equipes e da própria equipe; regra: se pode ser perguntada de novo, entra na FAQ [p.208-209]

Compreensão (p.210-218)
- Três níveis: desenvolvedor (responder com confiança "sim/não/parcial" sobre escalabilidade, tolerância a falhas etc. com base nos requisitos); equipe (conhece o estado do serviço quanto à disponibilidade de produção e o que falta; padrões como princípios, não só itens a tickar); organização (padrões fazem parte do processo) [p.210-211]
- Avaliar o serviço contra padrões e requisitos de disponibilidade de produção ANTES da RFC e de começar a rodar; e continuamente auditar serviços existentes; automatizar as auditorias e divulgar os resultados internamente [p.211-212]
- Revisões de arquitetura: reunião agendada por serviço com devs e engenheiros de confiabilidade/operação, desenhar a arquitetura em quadro branco e avaliar; a autora diz que é o modo mais imediato e eficaz de compreender o serviço, depois de aplicar os padrões em mais de mil microsserviços. Revela gargalos de escala/desempenho, pontos de falha ocultos, futuros incidentes, cenários de falha, decisões ruins e tecnologias a substituir. Convidar gente de infra/DevOps/SRE. Saída: diagrama novo e atualizado + lista de projetos, que alimenta planos estratégicos e OKRs. Cadência: alinhada ao ciclo de OKR (ex.: trimestral, antes do planejamento) [p.212-213]
- Auditoria de disponibilidade de produção: reunir a equipe com a checklist e verificar requisito a requisito; a estrutura espelha os padrões adotados (estabilidade, confiabilidade, escalabilidade, tolerância a falhas, preparação para catástrofes, desempenho, monitoramento, documentação); requisitos podem ser ajustados por organização [p.213-214]
- Plano estratégico de disponibilidade de produção: a partir dos requisitos não atendidos na auditoria, documentar detalhes de implementação, problemas (incidentes) relacionados, link de ticket e responsáveis; entra no planejamento e nos OKRs; funciona melhor junto com desenvolvimento de recursos e adoção de novas tecnologias [p.214-215]
- Automatização: "se tem de fazer manualmente mais de uma vez, automatize"; checklist automatizada (ex.: verificar que testes de resiliência estão prontos e passando); dificuldade depende da qualidade das APIs dos serviços internos e das ferramentas de autosserviço [p.215-216]
- Efeitos da automação: todos sabem o estado de cada serviço; divulgar resultados; dar uma "nota de disponibilidade de produção"; exigir nota mínima alta para serviços críticos ao negócio e **confinar (bloquear) implantações** [p.217]
- Lista de perguntas "Avalie" do cap. 7 [p.217-218]: documentação central e pesquisável, atualizada a cada mudança, com todos os elementos; todo dev responde sobre disponibilidade de produção; existem princípios/padrões; processo RFC para novos serviços; revisões/auditorias frequentes; planos estratégicos; padrões guiam OKRs; processo automatizado.

Citações curtas de prova:
- "sempre dê uma cebola" [p.199]
- "Arquivos README e comentários no código não são documentação" [p.201, título de nota]
- "se você tem de fazer algo manualmente mais de uma vez, automatize essa tarefa" (paráfrase próxima do texto, p.216)
- "dê a cada microsserviço uma nota de disponibilidade de produção" [p.217]
O que este trecho NÃO diz: não prescreve ferramenta de docs nem formato de ADR (cita RFC e "slides de revisão de arquitetura"); não trata documentação de API como contrato (OpenAPI, versionamento, exemplos de contrato): só pede lista de endpoints com nome, descrição e respostas; não define como calcular a nota; não define cadência de auditoria (só de revisão de arquitetura: trimestral como exemplo); não traz política de descontinuação/desativação (só aparece nas perguntas do apêndice).
Relevância: production-ready-microservices-expert: ALTA (documentação mínima, roteiro de plantão, revisão de arquitetura, auditoria, nota); dev-practices: MÉDIA (docs como parte do fluxo de desenvolvimento, automatizar tarefa repetida); api-design-expert: BAIXA (documentação de endpoints é superficial, sem contrato/versionamento).
Decisão sugerida: usar em production-ready-microservices-expert (modelo de documentação e processo de auditoria); dev-practices só os itens "docs no fluxo de dev" e "automatize o repetido".

---

### Apêndice A: Checklist de disponibilidade de produção (PDF p.219-221)
Resumo. Lista de critérios por padrão. Útil como espinha dorsal de auditoria.
Conceitos e regras (um critério por linha, resumido):
- Estável e confiável [p.219]: ciclo de desenvolvimento padronizado; testes lint, unidade, integração, fim a fim; teste, empacotamento, versão e liberação automatizados; pipeline padronizado com staging, pré-release e produção; clientes conhecidos; dependências conhecidas com backups, alternativas, fallbacks e cache; roteamento e descoberta estáveis
- Escalável e de alto desempenho [p.219-220]: escalas de crescimento qualitativa e quantitativa conhecidas; uso eficiente de hardware; gargalos e requisitos de recurso identificados; **planejamento de capacidade automatizado e programado**; dependências escalam junto; escala com os clientes; padrões de tráfego compreendidos; tráfego pode ser redirecionado em falhas; linguagem adequada; tarefas e dados tratados com alto desempenho e escalabilidade
- Tolerante a falhas e preparado para catástrofes [p.220]: sem ponto único de falha; todos os cenários de falha identificados; testado por testes de código, de carga e **de caos**; detecção e reparo de falhas automatizados; procedimentos padronizados de incidente e interrupção na equipe e na organização
- Monitorado [p.220-221] e Documentado e compreendido [p.221]: idênticos às listas dos capítulos 6 e 7.
Observação: o Apêndice A NÃO lista "descontinuação e desativação" como critério, embora o Apêndice B tenha perguntas sobre o tema (p.224); e NÃO tem nenhum critério de segurança.
Relevância: production-ready-microservices-expert: ALTA (estrutura de auditoria); dev-practices: BAIXA.
Decisão sugerida: usar como estrutura de checklist em production-ready-microservices-expert, se ainda não estiver espelhada.

---

### Apêndice B: Avalie seu microsserviço (PDF p.222-230)
Resumo. Consolida as perguntas dos capítulos 3 a 7 (os capítulos 3, 4 estão no bloco anterior; aqui aparecem as perguntas completas). Material valioso porque inclui perguntas de capítulos que o bloco 03 não traz por extenso.
Conceitos e regras (perguntas de capítulos fora deste bloco, aqui registradas só como lista):
- Ciclo de desenvolvimento [p.222]: repositório central; ambiente de dev fiel à produção; testes lint/unidade/integração/fim a fim; revisão de código; teste/empacotamento/build/liberação automatizados
- Pipeline de deployment [p.222-223]: pipeline padronizado; staging total ou parcial e acesso do staging a serviços de produção; fase canário; pré-release por tempo suficiente e com amostra aleatória do tráfego; mesmas portas em pré-release e produção; implantação simultânea ou gradual em produção; procedimento de emergência para pular staging e pré-release
- Dependências [p.223]: quais são as dependências e clientes; como mitigar falhas de dependência; backups, alternativas, fallbacks, cache defensivo
- Roteamento e descoberta [p.223-224]: health checks confiáveis e fiéis; health checks em canal separado na camada de comunicação; circuit breakers para impedir que serviços não saudáveis façam solicitações; circuit breakers para impedir envio de tráfego a servidores/serviços não saudáveis
- **Descontinuação e desativação [p.224]**: existem procedimentos para desativar um microsserviço? existem procedimentos para descontinuar endpoints de API? (só as duas perguntas; sem conteúdo explicativo neste bloco)
- Conhecer a escala de crescimento [p.224]: escala qualitativa e quantitativa
- Uso eficiente de recursos [p.224]: hardware dedicado ou compartilhado; abstração e alocação de recursos
- Percepção de recursos [p.224-225]: requisitos (CPU, RAM etc.); tráfego por instância; CPU e memória por instância; outros requisitos; gargalos; escalar vertical, horizontal ou ambos
- **Planejamento de capacidade [p.225]**: programado? prazo de espera de novo hardware; frequência das solicitações de hardware; prioridade entre microsserviços nas solicitações; automatizado ou manual
- Dimensionamento das dependências [p.225]: dependências escaláveis e de alto desempenho; escalarão com o crescimento esperado; donos das dependências preparados para o crescimento
- Gerenciamento de tráfego [p.225-226]: padrões de tráfego entendidos; mudanças programadas conforme padrões; picos tratados com cuidado; roteamento automático para outros datacenters em falha
- Tratamento e processamento de tarefas [p.226]: linguagem adequada; limitações de escala/desempenho em requisições e em tarefas; equipe entende como o serviço processa tarefas
- Armazenamento escalável de dados [p.226]: tipo de dado, schema, transações por segundo, leitura x escrita, replicado/particionado, banco dedicado ou compartilhado, como trata dados de teste
- Tolerância a falhas [p.227-228], Monitoramento [p.228-229], Documentação e compreensão [p.229-230]: repetem as perguntas dos capítulos 5, 6 e 7 já registradas acima.
O que o apêndice NÃO diz: são só perguntas; não traz as respostas, critérios de aprovação nem pesos.
Relevância: production-ready-microservices-expert: ALTA (perguntas de auditoria, em particular planejamento de capacidade, descontinuação/desativação, caos); api-design-expert: BAIXA (só 2 perguntas sobre descontinuar endpoints).
Decisão sugerida: usar em production-ready-microservices-expert como checklist de auditoria. Para planejamento de capacidade e descontinuação, o conteúdo explicativo está em outros blocos do livro: verificar blocos 01-02 antes de decidir.

---

### Glossário (PDF p.231-243)
Resumo. Definições curtas. Entradas relevantes (paráfrase):
- alerta acionável: alerta que traz processo passo a passo para triar, mitigar e resolver [p.231]
- auditoria de disponibilidade de produção; automatização da disponibilidade de produção; nota de disponibilidade de produção; plano estratégico; checklist [p.231, 233, 239]
- cache defensivo: guardar dados das dependências downstream para proteger o serviço se a dependência ficar indisponível [p.232]
- camadas do ecossistema: 1 hardware, 2 comunicação, 3 plataforma de aplicação, 4 microsserviço [p.232]
- candidata à produção: versão que passou em lint, unidade, integração e fim a fim, pronta para o pipeline [p.232-233]
- **desativação**: retirar um microsserviço e/ou endpoints de API para que não estejam mais disponíveis a serviços clientes [p.233-234]
- **descontinuação**: serviço e/ou endpoints deixam de ser mantidos pela equipe e deixam de ser recomendados para uso por clientes [p.234]
- escala de crescimento qualitativa (ligada a métricas de negócio) e quantitativa (req/s, consultas/s, transações/s) [p.235]
- escalamento horizontal x vertical [p.235-236]; falhas externas (três camadas inferiores) x internas (dentro do serviço) [p.236]
- planejamento de capacidade: alocação de recursos planejada e programada [p.239]
- pré-release/canary: 2% a 5% do tráfego de produção [p.240]
- staging total x parcial [p.241-242]; paridade de servidor [p.239]
- SPOF [p.239]; limite de alerta [p.237-238]; métricas principais [p.238]
- API: interface bem definida do lado do cliente de cada serviço, que permite interação programática via endpoints estáticos [p.237]
- Lei de Conway e reversa [p.237]
Citações curtas de prova: nenhuma além das definições acima (paráfrases).
O que o glossário NÃO diz: não define procedimentos de descontinuação/desativação (só o significado dos termos); não define versionamento de API, contrato, compatibilidade retroativa.
Relevância: production-ready-microservices-expert: MÉDIA (vocabulário, definições de descontinuação x desativação e de escala qualitativa x quantitativa); api-design-expert: BAIXA.
Decisão sugerida: usar apenas as definições citadas; descartar o resto.

---

### Sobre a autora, Colofão, propagandas de outros livros (PDF p.244-261)
Páginas editoriais (autora: engenheira de confiabilidade no Uber, p.244; colofão com descrição das abelhas cortadeiras, p.245-246; páginas em branco p.247, 250, 253, 256, 259; anúncios de livros da editora p.248-249, 251-252, 254-255, 257-258, 260-261). Sem conteúdo técnico. Decisão: descartar.

---

## Checklist de cobertura
- Primeira página lida: 175
- Última página lida: 261 (confirmada por Grep do último marcador)
- Páginas sem texto útil ou ilegíveis: p.247, 250, 253, 256, 259 (vazias); p.244-246 e 248-249, 251-252, 254-255, 257-258, 260-261 são editoriais/anúncios.
- Problemas de extração observados: quebra de linha no meio de frases e listas com marcadores deslocados; figura 7.1 (diagrama de arquitetura, p.204) aparece só como legenda, sem conteúdo; a definição de "microsserviço" no glossário (p.238) tem espaçamento irregular; sem números de página impressos.
- Capítulos/seções cobertos integralmente: Cap. 6, Cap. 7, Apêndices A e B, Glossário.
- Capítulos/seções que continuam em outro bloco: Cap. 5 começa em bloco anterior (só o final, p.175-179, está aqui). Os conteúdos explicativos de pipeline de deployment, dependências, descontinuação e desativação (Cap. 3), planejamento de capacidade (Cap. 4) e teste de caos (Cap. 5) estão em blocos anteriores; neste bloco aparecem só como perguntas de checklist e glossário.


---

## Auditoria da skill atual

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
