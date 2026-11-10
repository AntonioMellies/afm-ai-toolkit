# Registro de leitura (rascunho): hard-parts

Gerado por script a partir das notas dos leitores. Cada item: capítulo/seção, páginas (PDF), relevância avaliada e decisão sugerida. Revisão humana por amostragem pendente.

Seções registradas: 42


## Bloco 01_p001-077 (lido: PDF p.?)

- **Capa, elogios, copyright (PDF p.1-6)**
  - Relevância: (não registrada)
  - Decisão sugerida: descartar (sem conteúdo técnico).
- **Sumário (PDF p.7-12) [estrutura apenas]**
  - Relevância: serve como mapa para os próximos blocos (catálogos de granularidade, dados, sagas, contratos); nenhum detalhe aqui.
  - Decisão sugerida: usar só como mapa de roteamento para os demais blocos.
- **Prefácio e agradecimentos (PDF p.13-17; impr. xi-xv)**
  - Relevância: (não registrada)
  - Decisão sugerida: descartar, exceto a motivação "dados" já registrada acima.
- **Cap.1 What Happens When There Are No "Best Practices"? (PDF p.19-39; impr. 1-21)**
  - Relevância:
  - Decisão sugerida: usar em architecture-hard-parts-expert (novo reference de fitness functions e glossário de definições; ajustar seção de ADR e de dados). Sysops Squad: descartar como conteúdo da skill (só útil como exemplo opcional).
- **Parte I, Pulling Things Apart (intro) (PDF p.41-42; impr. 23-24)**
  - Relevância: architecture-hard-parts-expert: ALTA (corrige/refina a seção "Análise de Acoplamento"). Decisão: usar.
  - Decisão sugerida: (não registrada)
- **Cap.2 Discerning Coupling in Software Architecture (PDF p.43-62; impr. 25-44)**
  - Relevância:
  - Decisão sugerida: usar em architecture-hard-parts-expert (novo reference `coupling-quantum.md` + tabela das 8 combinações) e citar no grupo software-architecture como etapa de diagnóstico estático/dinâmico.
- **Cap.3 Architectural Modularity (PDF p.63-77) [continua no próximo bloco: Sysops Squad Saga "Creating a Business Case" começa em p.77]**
  - Relevância:
  - Decisão sugerida: usar em architecture-hard-parts-expert (novo reference `modularity-drivers.md`) e no grupo software-architecture (gate "há driver de negócio?" antes de decompor).

### Auditoria da skill atual (trecho das notas)

Skill auditada: `architecture-hard-parts-expert` v1.0 (SKILL.md 184 linhas; references/adr-template.md; references/trade-off-table.md). Leitura feita DEPOIS das notas acima. Observação: o bloco cobre só Caps. 1-3 (e início da Sysops Squad do Cap.3); afirmações da skill sobre dados, granularidade detalhada, orquestração/coreografia, sagas e contratos só podem ser verificadas em blocos posteriores.

### (a) O que a skill afirma e o bloco confirma

- "Não existe arquitetura perfeita/silver bullet" e "Nunca responda: esta é a melhor solução"; princípio **Least Worst**: confirmado, o livro rejeita "melhor" porque implicaria maximizar todos os fatores, e propõe a combinação menos pior [p.20].
- Mentalidade "toda decisão cria restrições futuras / sem silver bullet": consistente com Brooks e com "toda mudança do ecossistema" [p.20-21]. (As frases "toda abstração possui um preço" etc. são da skill, não do livro.)
- "Dados geralmente vivem mais que sistemas": confirmado (Berners-Lee e texto) [p.22].
- Dados Operacionais (OLTP) priorizam integridade/disponibilidade vs Analíticos: a distinção operacional/analítico é confirmada [p.22-23]; o livro diz operacional = o que a empresa roda, se parar a organização não funciona por muito tempo [p.22].
- "Nunca assuma banco por serviço é sempre melhor": compatível com o livro, que descreve service-based architecture com banco único como escolha legítima quando se vê pouco valor na separação [p.50]; e microsserviços "podem" formar quanta próprios, não "devem" [p.53].
- Consistência forte vs eventual e o custo/ganho: o livro confirma que transacionalidade é mais fácil em arquiteturas síncronas com mediação e que maior escala vem de sistemas assíncronos/coreografados/eventuais [p.58]; e que transações cross-service são das coisas mais difíceis [p.58].
- Comunicação síncrona (custo: acoplamento temporal, propagação de falhas) vs assíncrona (desacoplamento, resiliência): confirmado em fault tolerance (dependência síncrona de serviço falho anula a tolerância) [p.77], elasticidade (chamada síncrona entre serviços de escala diferente atola o workflow) [p.61-62], escalabilidade [p.75].
- Orquestração vs coreografia como eixo de decisão: confirmado como uma das três forças de coordenação [p.56-58] e definido como conceito [p.32-33]. (Os custos específicos que a skill lista, ver (b).)
- ADR com Contexto, Decisão, Consequências: confirmado como formato do livro [p.23]; ADR deve ser curto e versionável em texto/Markdown [p.23]. A skill ainda acrescenta Status, Alternativas e Fitness Functions (extensões; ver (b)/(c)).
- Fitness Functions: "arquitetura não deve existir só em diagramas", validar dependências proibidas e ciclos entre módulos [p.27-29] (JDepend, ArchUnit, NetArchTest), latência/throughput/resiliência via monitores e chaos [p.25]; segurança via slot de pipeline [p.30]. Confirmado.
- "Pergunta obrigatória: como esta decisão será governada automaticamente?": coerente com a tese de que ADR documenta e fitness function governa [p.23].
- Acoplamento estático/dinâmico como duas dimensões a analisar antes de distribuir: confirmado [p.41, p.46-47].
- Forças de granularidade: "serviço pequeno/grande demais" é o problema-guia do livro; pequenos demais geram problemas transacionais e de orquestração, grandes demais problemas de escala e distribuição [p.45-46]. Confirma o questionamento, não os itens específicos das listas da skill (ver (b)).
- Dimensões da "Avaliação Obrigatória" (performance, escalabilidade, resiliência etc.): o livro trata escalabilidade, elasticidade, deployabilidade, testabilidade, manutenibilidade, tolerância a falhas como características a avaliar [p.67]. Confirmação parcial.
- Anti-padrões "microservices são sempre melhores": o livro confirma que modularidade não exige distribuição (monólito modular, microkernel) [p.68] e que o corte exige driver de negócio [p.67].
- "Assuma que requisitos, times, tecnologias mudarão": compatível com [p.65] (arquitetura precisa mudar continuamente) e [p.21] (ecossistema se substitui peça por peça).

### (b) O que a skill afirma e o bloco contradiz ou não suporta

- **Acoplamento estático = "uma mudança exige recompilar outra parte?" / dinâmico = "uma parte depende da outra para funcionar?"**: não corresponde à definição do livro. No Cap.2, estático = como as partes estão "fiadas"/dependências operacionais necessárias para o quantum subir (SO, frameworks, libs, banco, broker, orquestração de containers) e é medido pelo teste de bootstrap [p.46-47, p.51-52, p.60-61]; dinâmico = como se comunicam em runtime (sync/async, informação trafegada, rigidez do contrato) [p.41, p.47]. O livro diz que nenhum serviço precisa que o outro esteja presente para funcionar, exceto pelo workflow [p.47]. A frase "recompilar" aproxima só a introdução da Parte I ("mensurável em tempo de compilação", [p.41]). Além disso a skill lista "contratos, schemas compartilhados" como estático, o que é compatível, mas "REST, gRPC, filas, eventos" como dinâmico mistura a presença do broker (estática) com a chamada via broker (dinâmica) [p.61]. Recomendação: reescrever as duas perguntas.
- **Orquestração: custo "ponto central de falha, acoplamento"; Coreografia: "observabilidade difícil, troubleshooting complexo"**: o bloco só sustenta que o orquestrador é um ponto de acoplamento holístico que força um quantum único (EDA mediada) [p.51] e que a transacionalidade é mais fácil com mediação [p.58]. "Ponto central de falha", "visibilidade/governança" e "observabilidade difícil" não aparecem no bloco (esperados no Cap.11); não suportado aqui.
- **Assíncrona: custo "rastreabilidade, debug, consistência eventual"**: o bloco só liga assíncrono a consistência eventual como combinação possível e a ganhos de escala/tolerância a falhas; "rastreabilidade/debug" não está no bloco.
- **Consistência: "forte = menor escalabilidade, maior acoplamento; eventual = custo de reconciliação"**: parcialmente suportado (acoplamento muito alto em sao, muito baixo em aec, [p.59]); o livro não fala de "reconciliação" aqui.
- **Forças para divisão/unificação de granularidade** (deploy/escala independentes, autonomia de times, BC; vs transações frequentes, dados compartilhados, mudanças simultâneas, coordenação): lista autoral da skill; o bloco só adianta o conceito de integrators/disintegrators (p.42) e o dilema pequeno/grande (p.45-46) sem enumerar. "Autonomia de times" não aparece como driver no bloco (os drivers listados são speed-to-market e competitividade, via manutenibilidade, testabilidade, deployabilidade, escalabilidade, tolerância a falhas) [p.67]. Não contradiz, mas não é suportado.
- **ADR com campos "Justificativa" separada e "Status/Decisores/Fitness Functions" (template)**: o livro integra a justificativa dentro de Decision e não tem Status/Decisores/Alternativas como seções [p.23]; título é frase nominal curta, alternativas são listadas no Context [p.23]. Extensões legítimas, mas a skill não as sinaliza como adaptação; o livro assume todos os ADRs aprovados.
- **Trade-off table, exemplo "Monólito Modular vs Microservices"** (references/trade-off-table.md):
  - "Monólito Modular: Escalabilidade → Neutro; Resiliência → Neutro; Observabilidade ↓ Baixo" e "Microservices: Resiliência ↑ Alto (com circuit breaker); Observabilidade ↑ Alto; Velocidade de Entrega ↓ Baixo; Evolução ↑ Alto": o bloco diz que microsserviços maximizam escalabilidade/elasticidade [p.75] e que modularidade melhora velocidade de entrega (agilidade/speed-to-market) [p.67]; "Velocidade de Entrega ↓ Baixo" para microsserviços contraria a tese de agilidade (embora o livro avise que serviços que se comunicam demais perdem os ganhos, [p.72-74]). A resiliência de microsserviços só vale se não houver dependência síncrona [p.77]; a tabela cita circuit breaker, que não está no bloco. "Observabilidade ↑ Alto" é ambíguo (leitura: exigência de tracing?). Não suportado/ambíguo.
  - "Monólito Modular: Performance ↑ alto, Consistência ↑ Alto": plausível mas fora do bloco [fora do livro neste bloco].
  - O exemplo trata "Monólito Modular" como equivalente a monólito com um banco/um deploy; o bloco o trata como alternativa que dá manutenibilidade/testabilidade/deployabilidade [p.68] e que continua sendo 1 quantum.
- **"Antes de recomendar arquitetura distribuída, analise acoplamento"** é correto, mas a skill omite a ordem do livro (3 passos: emaranhado, acoplamento, impacto da mudança) [p.45].
- **Descrição da skill cita "Evolutionary Architecture" como competência**: o bloco só menciona o livro Building Evolutionary Architectures como origem do conceito de fitness function [p.25]; nada sobre práticas evolutivas em si. Não é contradição, é escopo não coberto aqui.
- **"Dados Analíticos (OLAP): priorize histórico, agregação, tendências"**: o livro usa "analítico" sem OLAP no bloco; diz que o dado analítico normalmente não é transacional e frequentemente não relacional (grafo, snapshots) e que não é crítico para operação diária mas para direção estratégica [p.23]. "Priorize histórico/agregação" não está no bloco (esperado no Cap.14). Rótulo OLAP não suportado.

### (c) O que o bloco traz e a skill não cobre

Conteúdo de ALTA relevância ausente na skill (candidatos a `references/` e a ajustes de SKILL.md):

1. **Framework de trade-off analysis em 3 passos** (encontrar o que está emaranhado; analisar acoplamento; avaliar impacto da mudança) e o conceito de **dimensões emaranhadas** [p.45]. A skill tem um framework de 4 passos próprio, sem este.
2. **Architecture quantum** (def., 3 critérios, regra "todo ponto de acoplamento holístico forma um quantum", teste do bootstrap, contagem por estilo: monólito, service-based, EDA mediada/broker, EDA com 2 data stores, microsserviços, UI acoplada, micro-frontends, banco compartilhado) [p.46-56]. Ferramenta de diagnóstico estático (diagrama de quanta, análise defensiva de impacto) [p.55, p.61]. Ausente.
3. **As três forças do acoplamento dinâmico (Communication, Consistency, Coordination)** e a **matriz de 8 combinações** com nomes e níveis de acoplamento (Epic sao muito alto ... Anthology aec muito baixo) [p.56-59]. A skill trata sync/async, forte/eventual e orquestração/coreografia como três seções independentes, sem a noção de que as escolhas se influenciam e formam um espaço 3D. Ausência relevante para o catálogo de sagas (Cap.12 em bloco posterior).
4. **Fitness functions em profundidade**: definição "mecanismo objetivo", escopo atômico vs holístico, características compostas (agilidade → mensuráveis), teste de decisão "precisa de conhecimento de domínio?", dinâmicas vs estáticas, manuais, execução contínua, slot de segurança no pipeline (Equifax), ferramentas (JDepend, ArchUnit, NetArchTest, SonarQube), e o limite "não abusar / checklist de importante-não-urgente" [p.24-31]. A skill tem ~6 linhas.
5. **Drivers de modularidade e business case de decomposição**: speed-to-market e vantagem competitiva; cinco características (manutenibilidade, testabilidade, deployabilidade, escalabilidade, disponibilidade/tolerância a falhas); agilidade como característica composta; escopo de mudança app/domínio/função; modularidade ≠ distribuição (monólito modular, microkernel); a degradação quando serviços se comunicam demais ("big ball of distributed mud"); escalabilidade vs elasticidade, MTTS, elasticidade ligada à granularidade e escalabilidade à modularidade; ressalva de tolerância a falhas com chamada síncrona; analogia do copo d'água [p.47-77]. A skill não tem gate "há driver de negócio para quebrar?".
5b. **Regra de entrada "não quebre sem driver de negócio claro"** [p.67] e o sinal de alerta de deploy em conjunto ordenado [p.74].
6. **Definições operacionais** (service, coupling, component, sync/async, orquestrado/coreografado, atômico, contract amplo) [p.32-33] e a "segunda lei": por quê > como [p.31]. A skill não tem glossário; sua definição de acoplamento é a pergunta "recompilar".
7. **Acoplamento não é inerentemente ruim; "desacoplar ao máximo" é conselho vazio** (Paracelsus: a dose faz o veneno) [p.44]. A skill diz "Acoplamento ↓ → Complexidade Operacional ↑" mas não explicita esta regra anti-dogma.
8. **Por que dados viraram preocupação arquitetural**: bounded context move o banco para dentro do serviço, transacionalidade vira questão arquitetural [p.22, p.44]; conselho de evitar transações cross-service [p.58].
9. **Contexto histórico como método** ("considere as restrições que tornaram um estilo dominante") [p.21].
10. **Ressalvas de testabilidade/deployabilidade/escalabilidade para serviços chatos** e a métrica de manutenibilidade (acoplamento incoming) e lista de métricas de componentes (acoplamento, coesão, complexidade ciclomática, tamanho, particionamento técnico vs domínio) [p.68-69].
11. **Service-based architecture** como passo intermediário e alvo comum de decomposição sem mexer em schemas [p.50]. A skill só cita "Monólito, Monólito Modular, Microservices, Event-Driven" (passo 2 do framework) e não contempla service-based.
12. **ADR do livro**: título como frase nominal, alternativas no Context, justificativa em Decision, ADRs de 1-2 páginas, apêndice de ADRs [p.23]. Útil para alinhar o template e documentar quais campos são extensões.
13. **Micro-frontends** como forma de preservar quanta múltiplos quando há UI [p.54-55] e a observação de que UI acoplada colapsa o quantum [p.54].
14. **Arquitetura vs design**: foco em decisões estruturais difíceis de mudar; separar "por quê" de "como" [p.20-21, p.31].

Mapeamento para os artefatos candidatos:
- `skills/architecture-hard-parts-expert/SKILL.md`: (i) reescrever "Análise de Acoplamento" com as definições do Cap.2 e o teste do bootstrap; (ii) adicionar o framework de 3 passos; (iii) acrescentar a tríade Communication/Consistency/Coordination e remeter à matriz de 8 combinações; (iv) adicionar gate de driver de negócio (Cap.3); (v) ampliar fitness functions (resumo de 1-3 linhas + reference). Atenção ao limite de 500 linhas (hoje 184): mover detalhe para references.
- Novos `references/` sugeridos: `coupling-quantum.md` (quantum, contagem por estilo, estático/dinâmico, matriz das 8 sagas com tabela de acoplamento), `fitness-functions.md` (escopo, tipos, ferramentas, limites), `modularity-drivers.md` (cinco características, ressalvas, business case, modular monolith/microkernel/service-based), `glossario.md` (definições p.32-33).
- `references/trade-off-table.md`: revisar o exemplo preenchido (Velocidade de Entrega e Resiliência de microsserviços; sinalizar que depende de comunicação assíncrona e de níveis de acoplamento).
- `references/adr-template.md`: sinalizar quais campos são extensões do formato do livro (Status, Decisores, Alternativas, Fitness Functions) e manter Contexto/Decisão/Consequências como núcleo.
- Grupo `software-architecture`: usar quantum e estático/dinâmico como etapa de diagnóstico; gate "driver de negócio" antes de decompor monólito; e roteamento para sagas/dados/contratos quando os blocos seguintes forem lidos (não inventar antes).

---

## Bloco 02_p078-154 (lido: PDF p.78-154)

- **Cap. 3 (final): Sysops Squad Saga, Creating a Business Case (PDF p.78-80, impr. 60-62) [continua do bloco anterior]**
  - Relevância: architecture-hard-parts-expert: MÉDIA, exemplo de ADR com consequências negativas explícitas e vínculo driver-característica. software-architecture: BAIXA.
  - Decisão sugerida: usar como exemplo de ADR (forma: contexto, decisão ligada a característica, consequências negativas) em references de ADR.
- **Cap. 4: Architectural Decomposition (PDF p.81-97, impr. 63-79)**
  - Relevância: architecture-hard-parts-expert: ALTA (catálogo de abordagens de decomposição, métricas de acoplamento, antipadrão Elephant). software-architecture: ALTA (roteamento "decompor monólito": decomponível? estruturado? -> forking vs componentes; service-based como degrau).
  - Decisão sugerida: usar em architecture-hard-parts-expert/references (decomposição: árvore de decisão, métricas, trade-offs de tactical forking) e como fluxo no grupo software-architecture.
- **Cap. 5: Component-Based Decomposition Patterns (PDF p.99-148, impr. 81-130)**
  - Relevância: architecture-hard-parts-expert: ALTA (catálogo dos 6 padrões, métricas de dimensionamento, fitness functions de governança, shared domain vs infra, shared lib vs serviço). software-architecture: ALTA (fluxo "decompor monólito" passo a passo com perguntas de viabilidade golfball/basketball/airliner). clean-architecture/DDD (outras skills): MÉDIA, mapeamento namespace -> domínio/subdomínio/componente.
  - Decisão sugerida: usar em architecture-hard-parts-expert/references/decomposicao-componentes (novo arquivo com os 6 padrões, métricas e fitness functions) e como etapa do fluxo do grupo software-architecture; exemplos de saga só como ilustração breve.
- **Cap. 6: Pulling Apart Operational Data (PDF p.149-154, impr. 131-136) [continua no próximo bloco]**
  - Relevância: architecture-hard-parts-expert: ALTA (catálogo de data disintegrators/integrators, change control, contrato como abstração do esquema, ownership = quem escreve). software-architecture: MÉDIA.
  - Decisão sugerida: usar em architecture-hard-parts-expert/references (dados: drivers de desintegração) quando combinado com o próximo bloco.

### Auditoria da skill atual (trecho das notas)

Material lido: skills/architecture-hard-parts-expert/SKILL.md (185 linhas), references/adr-template.md, references/trade-off-table.md; e as menções à skill em skills/software-architecture/SKILL.md (fluxo "Decomposição de monólito", linha 61: domain-driven-design -> architecture-hard-parts-expert -> clean-architecture-expert -> production-ready-microservices-expert).

### (a) O que a skill afirma e o bloco confirma
- Princípio "toda decisão tem custo / escolher o menos pior": o bloco mostra trade-offs explícitos em cada abordagem (tactical forking: começa rápido, mas código latente e duplicado, p.95-96; service-based: degrau sem quebrar banco, p.90) e ADRs com consequências negativas (p.80, p.97). Confirma o espírito, mas a expressão "menos pior" não aparece no bloco.
- Acoplamento (Ca/Ce) como insumo antes de recomendar arquitetura distribuída: confirmado pelo bloco, com métricas concretas (p.84, 86, 134) e diagramas de dependência para estimar viabilidade (p.131-134). A skill só nomeia acoplamento estático/dinâmico; o bloco é sobre acoplamento estrutural entre componentes (estático) e o confirma como fator decisivo (p.134).
- Forças que favorecem unificação/divisão na granularidade: o bloco confirma que a granularidade deve ser decidida com cuidado e que começar fino demais traz custos de microsserviços sem necessidade (p.145) e que componentes grandes são mais acoplados e menos modulares (p.102). Citação: "Too many teams make the mistake of starting out too fine-grained" [p.145].
- Dados: "dados geralmente vivem mais que sistemas" não é afirmado, mas o bloco confirma que dados são o ativo mais importante e quebrá-los é mais arriscado e mais difícil que quebrar código (p.150). "Nunca assuma banco por serviço é sempre melhor": consistente com o bloco, que diz que microsserviços exigem dados separados mas service-based admite banco compartilhado (p.150) e traz integradores vs desintegradores (p.150-151).
- Fitness Functions e a pergunta "como será governada automaticamente?": fortemente confirmado; o bloco dá uma fitness function por padrão de decomposição (p.105-107, 113-115, 125, 135-136, 140-141, 147), incluindo ArchUnit (p.136, 141, 147). A skill lista só categorias genéricas ("dependências proibidas, ciclos, limites entre bounded contexts", linha 135 do SKILL.md); dependências proibidas e limites de domínio são exatamente os exemplos ArchUnit do bloco.
- ADR (Contexto/Decisão/Consequências): o bloco usa esse formato nas sagas (p.79-80, p.97), confirmando a estrutura. O template da skill acrescenta Alternativas, Status e Fitness Functions, que o bloco não mostra, mas não contradiz.
- Bounded context e dados: o bloco confirma que bounded contexts em torno de serviços e seus dados controlam mudanças (p.153), alinhado com o uso de "limites entre contextos" na skill.
- Evolutionary architecture: o bloco endossa migração incremental e controlada (p.148) e fitness functions durante manutenção concorrente à migração (p.125), compatível com "assuma que requisitos e volume mudarão".

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- "Framework de Decisão" lista "Monólito, Monólito Modular, Microservices, Event-Driven" como alternativas: o bloco trata o caminho monólito -> service-based -> microsserviços e não trata "monólito modular" nem event-driven. Não contradiz, mas o bloco acrescenta service-based como alternativa/degrau e a skill o omite (não é contradição, é lacuna; ver (c)).
- Tabela de trade-off (references/trade-off-table.md) classifica "Evolução Futura" de "Monólito Modular" como "Neutro: pode migrar módulos para serviços depois": o bloco só sustenta isso condicionalmente: migração exige base estruturada (componentes bem definidos, baixo acoplamento) e nada na skill diz como verificar; sem componentes definíveis o bloco indica tactical forking ou até reescrita (p.82-83, 134). Marcar como suposição não suportada sem a verificação de decomponibilidade.
- Exemplo da tabela: "Observabilidade: Microservices ↑ Alto" e "Monólito Observabilidade ↓ Baixo" usa a seta com sentido ambíguo (alto = bom?) e o bloco não trata observabilidade; também "Performance monólito ↑" vs "Resiliência" não são tratados no bloco. Não suportado pelo bloco (não há contradição, mas as setas não têm semântica consistente: "Complexidade ↓ Baixo" é bom, "Observabilidade ↓ Baixo" parece ruim).
- "Princípio do Least Worst" com a equação "Acoplamento ↓ -> Complexidade Operacional ↑": o bloco apoia parcialmente (microsserviços trazem decomposição de dados, workflows distribuídos, transações distribuídas, automação, contêineres: p.145), mas o enunciado "nunca maximize apenas uma característica" não está no bloco.
- "Nunca responda: esta é a melhor solução" e "Estrutura Obrigatória de Resposta" são estilo da skill; o bloco nunca prescreve formato de resposta. Os autores usam "depende" (p.82) e dão recomendações firmes em alguns pontos (ex.: "considerar service-based primeiro como degrau", p.90; "build services from components, not individual classes", p.89; "não aplique Create Domain Services antes de todos os domínios estarem refatorados", p.146), o que mostra que o tom da skill ("Nunca...") é mais absoluto que o livro nesses pontos. Risco de contradição: a skill rejeita qualquer afirmação absoluta, enquanto o livro estabelece regras fortes de método.
- "Rejeite afirmações absolutas como 'DDD é obrigatório'": o bloco não afirma isso, mas recomenda DDD/decomposição funcional para redimensionar componentes e agrupar domínios (p.104, 122, 139); não contradiz.
- "Orquestração vs coreografia", "consistência forte vs eventual", "síncrona vs assíncrona": não aparecem neste bloco (serão de capítulos posteriores); o bloco não confirma nem contradiz. Seção "Comunicação" e "Consistência" da skill não têm suporte neste bloco.
- Fluxo "Decomposição de monólito" do grupo software-architecture (domain-driven-design -> hard-parts -> clean-architecture -> production): não contradito, mas a ordem pressupõe que decompor começa por contextos DDD; o bloco começa por (1) verificar decomponibilidade com métricas, (2) escolher forking vs componentes, (3) seis padrões de componentes antes de definir domínios (domínios saem do agrupamento de componentes validado com o product owner, p.141) e só então dados (cap. 6). A ordem de roteamento do grupo não cobre esses passos.

### (c) O que o bloco traz e a skill não cobre
Todos os itens abaixo estão ausentes do SKILL.md e dos dois references:
1. Decomposição de monólito (cap. 4-5), nada disso na skill:
   - Antipadrão Elephant Migration / monólito distribuído (p.82).
   - Árvore de decisão: decomponível? -> estruturado? -> tactical forking vs component-based decomposition (p.82-83).
   - Verificação de decomponibilidade: Big Ball of Mud, Ca/Ce, Abstractness, Instability, Distance from the Main Sequence, zonas de dor e inutilidade (p.83-88).
   - Tactical forking (passos, benefícios, desvantagens: p.91-96).
   - Service-based architecture como destino ou degrau, com 4 motivos (p.90, p.145).
   - Seis padrões component-based: Identify and Size, Gather Common Domain, Flatten, Determine Dependencies, Create Component Domains, Create Domain Services (p.100-148), com ordem e advertência de não extrair antes de refatorar todos os domínios (p.146).
2. Métricas e heurísticas quantitativas: tamanho por statements, percentual, 1-2 desvios-padrão (p.102-103); limiares de exemplo (30% para 10 componentes, 10% para 50; 3 desvios; 15 dependências totais; p.106-107, 135); % de código .sharedcode (45% como alerta) e contagem de componentes shared (p.124); golfball/basketball/airliner (p.130-134).
3. Fitness functions concretas para decomposição, em catálogo de 9 (inventário, % máximo, desvios-padrão, nomes folha repetidos, código comum, nada em root namespace, máximo de dependências, proibição X->Y, domínios permitidos, namespace único por serviço; p.105-147) com uso de ArchUnit. A skill só tem o conceito.
4. Shared domain vs shared infrastructure; shared library vs shared service (p.112-113) e a necessidade de re-medir acoplamento após consolidar (p.117).
5. Artefatos de processo: architecture stories (diferença para technical debt stories: p.102); uso de saga/ADR com consequências incluindo custo e atraso (p.80, p.97); alinhar business case a drivers (testability, deployability, fault tolerance, scalability: p.78-79).
6. Dados (início do cap. 6): analogia componente->data domain, classe->tabela, acoplamento->FK/view/trigger/stored procedure (p.150); catálogo de seis data disintegrators com perguntas-guia e o conceito de data integrators (p.151); change control (mudanças quebradoras vs aditivas, serviços esquecidos, p.152-153); definição de "dono" = quem escreve (p.153); acesso a dado de outro contexto via serviço dono e contrato diferente do esquema (abstração, p.154). A skill diz só "avalie volume, consistência, autonomia, reporting, regulatório" e não tem integrators/disintegrators, quanta, nem ownership.
7. Architectural quanta aparece como driver (p.151); a skill não usa o conceito. (Definição formal provavelmente em bloco anterior; não confirmada neste bloco.)
8. Seleção de tipo de banco (relacional, grafo, documento, chave-valor, colunar, NewSQL, cloud native) é anunciada (p.150) mas o conteúdo está no próximo bloco.

Candidatos de melhoria sugeridos (ordem de valor):
- Novo references em architecture-hard-parts-expert: decomposicao-monolito.md (árvore de decisão, métricas, tactical forking, service-based como degrau, 6 padrões, fitness functions, architecture stories). Atualizar SKILL.md com 1-3 linhas e link; respeitar limite de 500 linhas (SKILL.md está em 185).
- Novo references: dados-drivers-decomposicao.md (disintegrators/integrators, change control, bounded context por escrita) após ler o próximo bloco.
- Atualizar o grupo software-architecture: fluxo de decomposição de monólito com etapas (decomponível? -> escolha forking/componentes -> padrões -> domínios -> dados) e roteamento de palavras-chave ("big ball of mud", "tactical forking", "service-based", "distribuído monolito").
- Ajustar references/trade-off-table.md: dar semântica às setas (bom/ruim) e acrescentar service-based como alternativa e a pré-condição de decomponibilidade.
- Neutralidade: ArchUnit é biblioteca Java, não nome de ferramenta de IA; pode ser citada.
- ADR: adicionar exemplo com consequências de custo/atraso e vínculo a drivers (p.79-80).

## Bloco 03_p155-231 (lido: PDF p.155-231)

- **Cap. 6, Pulling Apart Operational Data: fim de "Data Decomposition Drivers" (PDF p.155-164, impr. 137-146) [continua do bloco anterior]**
  - Relevância: architecture-hard-parts-expert (catálogos de dados): ALTA, drivers com sinais mensuráveis; grupo software-architecture: MÉDIA, conecta dados a quantum e operação.
  - Decisão sugerida: usar em skill (catálogo de drivers de desintegração de dados, com sinais/métricas) e em references de dados.
- **Data Integrators (PDF p.164-167, impr. 146-149)**
  - Relevância: architecture-hard-parts-expert: ALTA (integradores de dados e trade-offs nomeados); software-architecture: MÉDIA.
  - Decisão sugerida: usar em skill (dados: desintegradores x integradores).
- **Sysops Squad Saga: Justifying Database Decomposition (PDF p.168-169, impr. 150-151)**
  - Relevância: baixa-média; exemplo de como montar justificativa com métricas. Decisão: usar só como exemplo de aplicação (opcional).
  - Decisão sugerida: (não registrada)
- **Decomposing Monolithic Data: data domain e o processo de cinco passos (PDF p.169-179, impr. 151-161)**
  - Relevância: architecture-hard-parts-expert (catálogo de dados, passos de decomposição): ALTA. Grupo software-architecture: MÉDIA.
  - Decisão sugerida: usar em references de dados da skill (processo de cinco passos com riscos por passo).
- **Selecting a Database Type (PDF p.179-197, impr. 161-179)**
  - Relevância: architecture-hard-parts-expert (catálogo de dados): ALTA para trade-offs por tipo; software-architecture: MÉDIA.
  - Decisão sugerida: usar em references da skill (matriz resumida por tipo de banco x característica), sem reproduzir estrelas inexistentes.
- **Sysops Squad Saga: Polyglot Databases + ADR (PDF p.197-202, impr. 179-184)**
  - Relevância: ALTA como modelo de ADR com consequências reais e como exemplo de escolha de modelo de agregado; MÉDIA para os demais.
  - Decisão sugerida: usar em exemplo de ADR (references).
- **Cap. 7, Service Granularity (PDF p.203-231, impr. 185-213) [cap. continua no próximo bloco; trecho termina no meio da saga de customer registration]**
  - Relevância: architecture-hard-parts-expert (catálogos de granularidade): ALTA; software-architecture: ALTA (decomposição, trade-off com negócio).
  - Decisão sugerida: usar em skill (catálogo de 6 desintegradores x 4 integradores com perguntas-guia, métricas, regra do leftover, formato de trade-off statement) e em references de granularidade; usar ADRs como exemplos.

### Auditoria da skill atual (trecho das notas)



## Bloco 04_p232-308 (lido: PDF p.232-308)

- **Sysops Squad Saga: Customer Registration Granularity (fim do Cap. 7) (PDF p.232-234, impr. 214-216) [continua do bloco anterior]**
  - Relevância: architecture-hard-parts-expert: MÉDIA, exemplo de integrador de granularidade (transação) vs desintegrador (segurança) e de ADR. software-architecture: BAIXA.
  - Decisão sugerida: usar em architecture-hard-parts-expert (exemplo no catálogo de granularidade/ADR), sem duplicar conteúdo do bloco anterior.
- **PARTE II: Putting Things Back Together (PDF p.235, impr. 217)**
  - Relevância: architecture-hard-parts-expert: BAIXA, só enquadramento (estrutura vs comunicação).
  - Decisão sugerida: usar apenas como enquadramento do roteiro da skill.
- **Cap. 8: Reuse Patterns (PDF p.237-265, impr. 219-247)**
  - Relevância: architecture-hard-parts-expert: ALTA, catálogo de técnicas de reuso (replicação, biblioteca, serviço, sidecar) com trade-offs, versionamento/deprecação, regra "reuso = abstração + baixa taxa de mudança", acoplamento ortogonal. software-architecture: ALTA para decisão de reuso entre serviços e governança por fitness functions; MÉDIA para sidecar/operacional com production-ready-microservices-expert.
  - Decisão sugerida: usar em architecture-hard-parts-expert (novo references/ de reuso; acoplamento ortogonal no catálogo de acoplamento); mencionar no grupo software-architecture como roteamento "reuso/compartilhamento de código entre serviços".
- **PARTE II, Cap. 9: Data Ownership and Distributed Transactions (PDF p.267-300, impr. 249-282)**
  - Relevância: architecture-hard-parts-expert: ALTA, catálogo de propriedade de dados (3 cenários, 4 técnicas com tabelas de trade-off). software-architecture: ALTA (decomposição de dados e ownership).
  - Decisão sugerida: usar em architecture-hard-parts-expert (novo references/ de propriedade e acesso a dados); incluir no grupo software-architecture o roteamento para ownership/acesso a dados.
- **Cap. 10: Distributed Data Access (PDF p.301-308, impr. 283-290) [continua no próximo bloco]**
  - Relevância: architecture-hard-parts-expert: ALTA, catálogo de padrões de acesso a dados entre contextos com trade-offs. software-architecture: ALTA.
  - Decisão sugerida: usar em architecture-hard-parts-expert (referência de dados); completar com bloco seguinte.
- **Decisão sugerida**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)

### Auditoria da skill atual (trecho das notas)

Escopo auditado: `skills/architecture-hard-parts-expert/SKILL.md` (185 linhas, versão "1.0"), `references/adr-template.md` e `references/trade-off-table.md`. Comparação feita apenas contra o bloco PDF p.232-308; o que o bloco não cobre não é julgado como erro. O grupo `software-architecture` não foi lido nesta auditoria.

### (a) O que a skill afirma e o bloco confirma
- Toda decisão tem custo e nada é gratuito (Mentalidade Principal): praticamente cada técnica do bloco vem com tabela de vantagens/desvantagens (Tabelas 8-1 a 10-2) [p.241, 245, 251, 257, 274, 276, 279, 280, 290, 295, 297, 304, 306]. A personagem arquiteta insiste em analisar trade-offs em vez de opiniões: "It's not about opinions" [p.263].
- "Depende do contexto" / rejeitar absolutos (Anti-Padrões): duplicar vs acoplar muda conforme o estilo (microsserviços tendem a duplicar; service-based tende a acoplar, "It depends!") [p.252]; reuso não é virtude absoluta [p.260].
- Granularidade, forças de unificação (transações, dados compartilhados): requisito de transação atômica levou a manter um serviço de cliente único [p.232-233]; consolidar serviços preserva transações atômicas [p.280]. Forças de divisão (escalabilidade, tolerância a falhas, throughput, volatilidade de código) aparecem na nota sobre reavaliar por que existem serviços separados ao usar data domain [p.275].
- Dados, não assumir "banco por serviço é sempre melhor": o bloco admite compartilhar esquema (data domain) e consolidar serviços como soluções legítimas, com custos [p.274-276, 279-280].
- Consistência forte vs eventual com custos: ACID vs BASE por propriedade [p.282-285]; custo da consistência eventual é tratamento de erros complexo [p.293, 296]; arquiteturas distribuídas trocam consistência por desempenho, escala e disponibilidade [p.285].
- Comunicação síncrona (custo: acoplamento, propagação de falhas) e assíncrona (custo: consistência eventual): latência, disponibilidade e escala ligadas à chamada interserviço [p.303-304]; síncrono dá consistência, assíncrono dá desempenho e consistência eventual [p.274, 277].
- Orquestração (custo de acoplamento): o padrão orquestrado favorece consistência sobre responsividade; designar um serviço de negócio como orquestrador o sobrecarrega e acopla [p.291-292]. Parcial: "ponto central de falha" não aparece literalmente.
- Coreografia (autonomia, desacoplamento; custo em troubleshooting): o padrão event-based é altamente desacoplado, com tratamento de erro como principal trade-off [p.295-297]; o estado em andamento é difícil de determinar em fluxos assíncronos [p.285]. Parcial: o bloco não usa o termo "coreografia".
- Acoplamento estático/dinâmico: o bloco fala de acoplamento "semântico e estático" na chamada interserviço [p.304] e de "static code sharing" na tabela do serviço compartilhado [p.251]. Parcial: só o lado estático, sem a dicotomia como categoria.
- ADR com Contexto, Decisão, Consequências: os quatro ADRs do bloco seguem essa forma, com o trade-off no fim [p.233-234, 259-260, 265, 298-300]; o trade-off é explicitado ("transactionality versus security") [p.233].
- Fitness functions para governança: sidecar "governado por fitness functions" e pipeline que testa o sidecar com elas [p.255, 258].
- Transações distribuídas perdem consistência/atomicidade por pedido [p.284] e normalmente exigem compensação [p.295]; sagas são remetidas a capítulo posterior [p.294]. Isso dá respaldo à linha "Consistência baixa, sagas necessárias" do exemplo de microsserviços no `trade-off-table.md`.

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- `trade-off-table.md`, exemplo, Microservices: "Resiliência alto, falha isolada por serviço (com circuit breaker)". O bloco mostra o oposto quando há dependência síncrona: serviço compartilhado derruba os consumidores [p.250-251] e a interservice communication tem "No fault tolerance" na tabela [p.304]. Tensão relevante: o ganho de resiliência depende de como os serviços se acoplam; sugerir qualificar.
- Mesmo exemplo, Microservices: "Observabilidade alto, tracing distribuído obrigatório". O bloco não trata observabilidade como vantagem; o ponto relacionado é a dificuldade de saber o estado de transações assíncronas (soft state) [p.285]. Não suportado.
- Mesmo exemplo: ratings de performance, custo operacional e velocidade de entrega entre monólito e microsserviços [fora do livro]; o bloco só trata custos pontuais de rede e latência [p.303-304].
- SKILL.md: "Dados geralmente vivem mais que sistemas" [fora do livro].
- SKILL.md: OLTP vs OLAP: o bloco só lista "dados analíticos" como tema da Parte II [p.235]; sem detalhe aqui.
- SKILL.md: "Princípio do Least Worst": a expressão não aparece neste bloco; o texto fala em trade-offs e "It depends" [p.252, 263]. Não suportado neste bloco (pode estar em bloco anterior; não verificável aqui).
- SKILL.md: forças de divisão "autonomia de times": não aparece neste bloco.
- SKILL.md: Evolutionary Architecture: nenhuma menção neste bloco.
- `adr-template.md`: seção "Fitness Functions" no ADR e o exemplo com Outbox Pattern, idempotência e lag de consumer: o bloco não traz outbox nem idempotência (cita durable subscribers, persistent queues e DLQ [p.271, 296-297]). Os ADRs do bloco não têm seção de fitness functions, status ou decisores, e as alternativas ficam no Contexto [p.233, 259, 265, 298]. Não é contradição; o template é mais elaborado que o modelo do livro.
- SKILL.md tem "Justificativa" como campo separado; nos ADRs do bloco ela está dentro da Decisão [p.233, 265, 299]. Diferença de forma, sem contradição.
- A regra "um serviço não pode conectar a vários esquemas" [p.268, 298] é regra local de uma personagem (Dana) na saga; a skill não a afirma e ela não deve ser promovida a regra geral.

### (c) O que o bloco traz e a skill não cobre
ALTA (catálogos com tabela de trade-off, adequados para novos `references/`):
1. Reuso de código em sistemas distribuídos (Cap. 8): 4 técnicas (replicação, biblioteca compartilhada, serviço compartilhado, sidecar/service mesh), cada uma com vantagens, desvantagens e "quando usar" [p.239-257]. A skill não tem nada sobre reuso.
   - Regra central: reuso nasce por abstração e se operacionaliza por baixa taxa de mudança; SO e frameworks externos são bons alvos, capacidades de domínio internas e frameworks técnicos voláteis não [p.261-262]. Exemplo da seguradora: Customer centralizado cria complexidade e fragilidade [p.261].
   - Granularidade de biblioteca: dependência vs controle de mudança; preferir bibliotecas pequenas por funcionalidade [p.242-243].
   - Versionamento: sempre versionar, comunicar versões, deprecação customizada vs global, nunca usar LATEST, breaking change anula a política [p.243-245]; "versioning is simple" como nona falácia [p.244].
   - Serviço compartilhado: risco de runtime, versionamento de endpoint e subjetividade, latência, escala, falha; bom para código volátil e ambientes poliglotas [p.247-252].
   - Sidecar/service mesh: só acoplamento operacional, não classes de domínio; governado por fitness functions; trade-off de tamanho (heurística de uma personagem: menos da metade dos times, provavelmente não vale) [p.252-259].
   - Acoplamento ortogonal (operacional vs domínio) [p.256]; duplicação vs acoplamento conforme o estilo [p.252].
   - Método: hipótese e verificação da taxa real de mudança no histórico do repositório [p.263-265].
2. Propriedade de dados (Cap. 9): regra "quem escreve é dono"; cenários single/common/joint; resolver single primeiro; common: serviço dono dedicado com fila persistente fire-and-forget ou REST/gRPC/request-reply; joint: table split, data domain, delegate (primary domain priority vs operational characteristics priority), service consolidation, cada um com tabela; diagramar a tabela dentro ou fora do bounded context [p.268-280]. A skill só diz que banco por serviço não é sempre melhor.
3. Transações distribuídas: ACID propriedade por propriedade e como cada uma falha entre serviços; BASE (basic availability, soft state, eventual consistency) [p.281-285]. A skill apenas contrapõe consistência forte e eventual.
4. Três padrões de consistência eventual com tabelas: background synchronization (quebra bounded context, lógica duplicada), orquestrado request-based (4 opções de erro, compensação, falha na compensação exige humano), event-based (durable subscribers, DLQ) [p.285-297]. A skill lista orquestração vs coreografia, sem DLQ, compensação ou assinantes duráveis.
5. Acesso a dados entre contextos (Cap. 10, parcial): Interservice Communication (latências de rede, segurança e dados; estimativas dos autores), Column Schema Replication, Replicated Caching (comparação com cache único e distribuído) [p.301-308]. O padrão Data Domain de acesso e os trade-offs do cache replicado ficam para o bloco seguinte.

MÉDIA:
6. Design vs arquitetura: segurança pode ser resolvida por design em vez de quebrar em unidades de deployment [p.233].
7. Facilitar a negociação em vez de controlá-la [p.233]; hipótese como método de decisão [p.263].
8. ADRs do livro com consequências concretas (consolidação, sidecar, biblioteca vs serviço, single table, delegate com payload) [p.233-234, 259-260, 265, 298-300], úteis como exemplos além do exemplo Kafka da skill.
9. Reavaliar por que existem serviços separados ao adotar data domain (volta ao Cap. 7) [p.275].
10. Cache replicado ou distribuído como mitigador do delegate [p.278].

### Decisão sugerida
- `architecture-hard-parts-expert`: SKILL.md tem 185 linhas, com folga até ~450. Acrescentar seções curtas (1-3 linhas) e criar em `references/` arquivos como `reuso-de-codigo.md`, `propriedade-de-dados.md`, `consistencia-eventual.md` e `acesso-a-dados.md`, listados em `## Referências`. Manter no SKILL.md a regra "abstração + baixa taxa de mudança" e o roteamento.
- `trade-off-table.md`: qualificar as linhas de Resiliência e Observabilidade do exemplo (item b).
- Grupo `software-architecture`: acrescentar roteamento para reuso/compartilhamento de código, propriedade de dados, transação distribuída e acesso a dados, apontando para `architecture-hard-parts-expert` (grupo não lido aqui; conferir).
- Completar após o bloco seguinte (Data Domain de acesso, cache replicado, contratos, workflows, sagas) antes de fechar as referências.

## Bloco 05_p309-385 (lido: PDF p.?)

- **Cap. 10 Distributed Data Access, parte final (PDF p.309-316) [continua do bloco anterior; termina em p.316]**
  - Relevância: architecture-hard-parts-expert: ALTA, catálogo de padrões de acesso a dados com trade-offs e critérios numéricos; software-architecture (grupo): MÉDIA, escolha de padrão de dados na decomposição.
  - Decisão sugerida: usar em architecture-hard-parts-expert (novo references/dados-acesso-distribuido.md: 4 padrões, sinais de escolha, tabelas de trade-off, método de dimensionamento do cache).
- **Cap. 11 Managing Distributed Workflows (PDF p.317-339)**
  - Relevância: architecture-hard-parts-expert: ALTA, orquestração vs. coreografia com critérios, estado em coreografia e acoplamento semântico; software-architecture (grupo): ALTA, decisão de fluxo entre serviços na decomposição.
  - Decisão sugerida: usar em architecture-hard-parts-expert (references/orquestracao-vs-coreografia.md) e mencionar no grupo software-architecture como roteamento ("workflow entre serviços" -> hard-parts).
- **Cap. 12 Transactional Sagas (PDF p.340-382) [p.340 em branco]**
  - Relevância: architecture-hard-parts-expert: ALTA, catálogo de sagas (matriz 8, ratings, anti-padrões Horror/Fantasy Fiction, compensação x estado, máquina de estados, anotações de saga); software-architecture (grupo): ALTA, regra "evite transação distribuída; prefira Fairy Tale/Parallel".
  - Decisão sugerida: usar em architecture-hard-parts-expert (references/sagas-transacionais.md com matriz, ratings reconstruídos, gatilhos de escolha e checklist de compensação); incluir regra de governança (anotações + CLI) em fitness functions.
- **Cap. 13 Contracts (PDF p.383-385) [continua no próximo bloco]**
  - Relevância: architecture-hard-parts-expert: MÉDIA neste bloco (ALTA quando o capítulo completo chegar), definição ampla de contrato e brittleness; software-architecture (grupo): BAIXA agora.
  - Decisão sugerida: aguardar o próximo bloco para consolidar; já usar a definição de contrato e a regra "contrato estrito só quando vantajoso" em architecture-hard-parts-expert.
- **Sugestões de artefato (resumo)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)

### Auditoria da skill atual (trecho das notas)

Skill auditada: C:\Users\Antonio Neto\Documents\Other Projects\afm-ai-toolkit\skills\architecture-hard-parts-expert\SKILL.md (versão 1.0, 185 linhas) e references/adr-template.md, references/trade-off-table.md. Escopo: apenas o que este bloco (cap. 10 final, 11, 12, início do 13) permite confirmar ou refutar.

### (a) Afirmações da skill que o bloco confirma
- "Toda decisão gera benefícios e custos" / "Toda vantagem possui um custo" / regra máxima de trade-off: o bloco repete que tudo em arquitetura é trade-off e que quem acha que não há trade-off ainda não o identificou [p.309]; cada padrão de dados e de saga vem com tabela de vantagens e desvantagens [p.311, 313, 324, 333, 374, 381].
- Anti-padrão "rejeite afirmações absolutas": o bloco rejeita "sempre usar coreografia" e diz para nunca usar absolutos em arquitetura [p.317].
- Comunicação: "Síncrona custa acoplamento temporal, propagação de falhas": Epic Saga falha se qualquer serviço estiver indisponível [p.347]; "Assíncrona custa debug/consistência": assincronia traz race conditions, deadlocks, confiabilidade de filas [p.359, 365].
- Consistência forte: "custo menor escalabilidade, maior acoplamento": atomicidade é a restrição de maior acoplamento; transação distribui escala e responsividade ruins [p.347, 360, 363]. Consistência eventual "custo de reconciliação": dado fora de sincronia e demora (Tabela 12-11) [p.374].
- Orquestração "custo ponto central de falha, acoplamento": confirmado literalmente (single point of failure, acoplamento orquestrador-serviços) [p.323-324]. Orquestração dá "visibilidade, governança, controle": estado consultável, workflow centralizado, tratamento de erro [p.323].
- Coreografia "autonomia, desacoplamento": confirmado (desacoplamento, escala, tolerância a falha) [p.332]; "troubleshooting complexo": suportado por tratamento de erro, recuperabilidade e estado mais difíceis [p.332].
- "Acoplamento estático/dinâmico" como par de análise: o bloco usa "static and dynamic quantum coupling" e coloca contratos como tema de ambos [p.384]; coordenação, comunicação e consistência como as três dimensões do acoplamento dinâmico [p.318].
- "Dados: nunca assuma banco por serviço é sempre melhor": o padrão Data Domain mostra caso legítimo de schema compartilhado, com vantagens (consistência, integridade, join SQL) e custos (bounded context amplo, segurança) [p.311-313]. A saga mostra o critério oposto, onde ele foi descartado por restrição concreta [p.313, 315].
- Granularidade: "forças que favorecem unificação" inclui compartilhamento intenso de dados e coordenação; o bloco cita consolidação de serviços como opção que foi descartada por serem domínios diferentes [p.313].
- ADR com Contexto, Decisão, Consequências: formato dos ADRs do bloco [p.315-316, 321]. Consequências registram custo (licença, escalabilidade) [p.316, 321].
- Hipótese/least worst: método de "hipótese e busca de negativos" na saga de dados (equivalente a "menos pior") [p.314].
- Fitness functions / governança automática: o bloco mostra governança por anotações e ferramenta de varredura de código [p.374-376] e menciona fitness functions para validar implementação de contratos [p.383].

### (b) Afirmações da skill que o bloco contradiz ou não suporta
- "Acoplamento ↓ → Complexidade Operacional ↑" (resumo de trade-off): suporte parcial. O bloco mostra acoplamento baixo com complexidade alta no Anthology e no Parallel ... (Anthology: acoplamento muito baixo, complexidade alta [p.368-369]), mas NÃO de forma geral: Fairy Tale tem acoplamento alto e complexidade muito baixa; Time Travel acoplamento médio e complexidade baixa; Parallel acoplamento baixo e complexidade baixa (ratings reconstruídos, p.354, 357, 366). Logo a regra "menos acoplamento = mais complexidade" é uma generalização que o bloco não sustenta; o livro diz que depende da combinação de forças [p.363].
- "Consistência Forte → Disponibilidade ↓": o bloco sustenta queda de responsividade, disponibilidade e escala em padrões atômicos [p.347, 360, 363], mas usa "disponibilidade" junto com responsividade; não discute CAP.
- "Dado analítico/operacional OLTP vs OLAP": nada neste bloco sobre isso (não suportado aqui, pode estar em outro bloco).
- "Coreografia custa observabilidade difícil": o bloco não usa "observabilidade"; os custos nomeados são workflow distribuído, estado, erro e recuperabilidade [p.332]. Afirmação não suportada textualmente (suportada por inferência).
- "Orquestração: coordenador central" tratada como binária (orquestração x coreografia): o bloco mostra híbridos (Front Controller como pseudo-orquestrador, stamp coupling, orquestrador sem estado, orquestrador por workflow) [p.311-313, 319-320, 329-332]. A skill omite isso, o que a deixa incompleta, não incorreta.
- Estrutura "Benefícios, Trade-offs, Riscos, Alternativas, Recomendação" e a regra "nunca responda 'esta é a melhor solução'": o bloco concorda com o espírito, mas o ADR do livro NÃO tem seção "Justificativa" separada como no template da skill (o livro tem Contexto, Decisão com justificativa embutida, Consequências) [p.315-316, 321]. É diferença de formato, não contradição.
- "Evolutionary Architecture: nunca otimize só para o cenário atual": o bloco mostra o oposto como prática aceita em ADR (aceitar gargalo do orquestrador único e reavaliar se escala mudar) [p.321], e dimensionamento com base em máximos esperados [p.314]. Não contradiz; indica que decisão consciente com gatilho de revisão é válida. O template da skill já tem "Condição de revisão" na trade-off-table, o que é compatível.
- Exemplo preenchido do ADR (Kafka) e da trade-off-table (monólito vs. microsserviços): não são suportáveis nem refutáveis por este bloco (exemplos próprios da skill).
- Linha de resumo da skill "Orquestração custo acoplamento" vs. "Coreografia autonomia": sem contradição, mas a skill não ensina o critério de escolha que o bloco dá (complexidade do workflow, frequência de erro, necessidade de escala) [p.333-334]; ver (c).

### (c) O que o bloco traz e a skill não cobre
1. **Catálogo de padrões de acesso a dados** (cap. 10): Replicated Caching (limite de volume ~500 MB x instâncias, ruim para alta taxa de atualização, dependência de startup, configuração em cloud) e Data Domain, com tabelas de trade-off [p.309-313]. A skill só fala de dados em termos de OLTP/OLAP e "banco por serviço". Falta catálogo (interservice, column schema replication, replicated cache, data domain) e a regra de dimensionamento do cache [p.310, 314].
2. **Acoplamento dinâmico em três dimensões** (comunicação, consistência, coordenação) e **acoplamento semântico vs. de implementação** [p.318, 327-329]. A skill tem "acoplamento dinâmico" só como "dependência em runtime"; não nomeia as três forças nem a regra de que implementação não reduz acoplamento semântico.
3. **Matriz dos 8 padrões de saga** com nomes, superescritos e ratings (acoplamento, complexidade, responsividade, escala) [p.342-369]. A skill não menciona sagas. Inclui os anti-padrões Horror Story(aac) e Fantasy Fiction(aao) e o caminho de escolha (Epic -> preferir Fairy Tale ou Parallel; Time Travel como rampa de acesso ao Anthology) [p.346, 357, 360, 362, 382].
4. **Compensação**: lista de riscos de atualizações compensatórias (sem isolamento, efeitos colaterais, falha de compensação, responsividade, travar ou não participantes) e a alternativa de **gestão de estado com máquina de estados** (NO_SURVEY) [p.369-373, 378-382]. Ausente da skill.
5. **Orquestração vs. coreografia com critérios de escolha**, orquestrador por workflow (não global/ESB), e **três modelos de estado em coreografia** (Front Controller, stateless, stamp coupling) com tabelas [p.319-320, 329-334]. A skill só tem duas linhas genéricas.
6. **Governança de sagas por anotações/atributos e CLI de varredura** [p.374-376]: técnica concreta para a seção de fitness functions da skill (que hoje lista só categorias genéricas: dependências proibidas, ciclos, latência).
7. **Definição de contrato** (formato usado por partes para transmitir informação ou dependências) e espectro estrito-solto com brittleness [p.384-385]. A skill cita "contratos" só como exemplo de acoplamento estático. O capítulo 13 continua no próximo bloco.
8. **Método da saga**: tabelas de trade-offs por critério do problema (workflow control, state query, error handling) e ADR com consequências de escala [p.337-339]; também a ideia de modelar workflow completo com diagramas antes de decidir [p.376].
9. **Instruções para o grupo software-architecture**: o grupo já orquestra hard-parts; este bloco sugere rotear "workflow entre serviços, saga, consistência, acesso a dados entre serviços" para architecture-hard-parts-expert e sinalizar que clean-architecture (camadas) e DDD (bounded context amplo no Data Domain) são consultados em conjunto. Não verifiquei o SKILL.md do grupo [fora do escopo da auditoria, não lido].

### Sugestões de artefato (resumo)
- Novo `references/sagas-transacionais.md` (matriz 8 padrões + ratings reconstruídos com aviso + regras de escolha + riscos de compensação + exemplo de máquina de estados).
- Novo `references/orquestracao-vs-coreografia.md` (critérios, estado em coreografia, acoplamento semântico).
- Novo `references/acesso-a-dados-distribuido.md` (4 padrões, limites de cache, trade-offs).
- Ajustes no SKILL.md: seção "Acoplamento" com as três forças dinâmicas; Workflow com ponteiro para as referências; fitness function de saga por anotações; manter ≤ 500 linhas e listar os novos arquivos em "Referências"; subir `version` e manifests de plugin.
- Cuidado de neutralidade (AGENTS.md): exemplos de código em Java/C# como "anotações/atributos", sem nome de ferramenta; nomes de padrões (Epic, Fairy Tale...) são do livro e devem ser citados como tal.

---

## Bloco 06_p386-462 (lido: PDF p.386-462)

- **Cap. 13 Contracts, continuação: Strict vs Loose Contracts (PDF p.386-393, impr. 368-375) [continua do bloco anterior]**
  - Relevância para os artefatos candidatos: architecture-hard-parts-expert (contratos): ALTA, catálogo estrito/frouxo/CDC com vantagens e desvantagens por tabela; software-architecture: MÉDIA, regra de contrato por serviço.
  - Decisão sugerida: usar em architecture-hard-parts-expert (nova referência de contratos)
- **Cap. 13: Stamp Coupling (PDF p.394-397, impr. 376-379)**
  - Relevância: architecture-hard-parts-expert (acoplamento/contratos/coreografia): ALTA; software-architecture: MÉDIA.
  - Decisão sugerida: usar em architecture-hard-parts-expert (referência de contratos)
- **Saga Sysops Squad: Managing Ticketing Contracts + ADR (PDF p.397-398, impr. 379-380)**
  - Relevância: architecture-hard-parts-expert (exemplo de ADR com consequência de revisitar): MÉDIA; adr-template: BAIXA (já tem formato).
  - Decisão sugerida: usar como exemplo curto de critério de escolha de contrato (estrito vs frouxo por velocidade de mudança do consumidor).
- **Cap. 14 Managing Analytical Data: Previous Approaches (PDF p.399-407, impr. 381-389)**
  - Relevância: architecture-hard-parts-expert (dados analíticos): ALTA, a skill atual só cobre dados operacionais?, a verificar na auditoria; software-architecture: MÉDIA.
  - Decisão sugerida: usar em architecture-hard-parts-expert (nova referência de dados analíticos)
- **Cap. 14: The Data Mesh e Data Product Quantum (PDF p.407-412, impr. 389-394)**
  - Relevância: architecture-hard-parts-expert (dados analíticos, DPQ, quantum): ALTA; software-architecture: ALTA (decisão de dados analíticos em decomposição de plataforma).
  - Decisão sugerida: usar em architecture-hard-parts-expert (nova referência de dados analíticos) e citar no grupo software-architecture
- **Saga Sysops Squad: Data Mesh + ADR (PDF p.412-415, impr. 394-397)**
  - Relevância: architecture-hard-parts-expert (exemplo de ADR com fitness function): MÉDIA.
  - Decisão sugerida: usar como exemplo no catálogo de dados analíticos / ADR com fitness function.
- **Cap. 15 Build Your Own Trade-Off Analysis: abertura e processo (PDF p.417-421, impr. 399-403)**
  - Relevância: architecture-hard-parts-expert (método de análise de trade-offs): ALTA; software-architecture: MÉDIA.
  - Decisão sugerida: usar em architecture-hard-parts-expert (método e trade-off-table)
- **Cap. 15: Trade-Off Techniques (PDF p.422-433, impr. 404-415)**
  - Relevância: architecture-hard-parts-expert (método, anti-vieses, comunicação com stakeholders): ALTA; software-architecture: MÉDIA.
  - Decisão sugerida: usar em architecture-hard-parts-expert (nova referência de técnicas de análise de trade-offs)
- **Epílogo da saga (PDF p.434, impr. 416)**
  - Relevância: architecture-hard-parts-expert: BAIXA (reforça mentalidade: isolar dimensões, modelar e testar). Decisão: descartar ou usar só como frase de reforço.
  - Decisão sugerida: (não registrada)
- **Apêndices A, B, C (PDF p.435-441, impr. 417-423)**
  - Relevância: architecture-hard-parts-expert: MÉDIA, serve de mapa do conteúdo do livro para checar cobertura da skill; Decisão: usar só como checklist de cobertura.
  - Decisão sugerida: (não registrada)
- **Índice remissivo (PDF p.443-459, impr. 425-441)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Sobre os autores, colofão e propaganda (PDF p.460-462)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)
- **Recomendações de melhoria (derivadas só deste bloco)**
  - Relevância: (não registrada)
  - Decisão sugerida: (não registrada)

### Auditoria da skill atual (trecho das notas)

Skill auditada: skills/architecture-hard-parts-expert/SKILL.md (184 linhas, v1.0), references/adr-template.md e references/trade-off-table.md. Só é possível confirmar ou contradizer o que o bloco 06 cobre (Cap. 13 parcial, 14, 15, apêndices, índice). Páginas = PDF (impr. = PDF - 18).

### (a) O que a skill afirma e o bloco confirma
- Sem silver bullet nem solução perfeita: o bloco diz que soluções genéricas raramente existem e que o arquiteto deve ser árbitro de trade-offs, não evangelista. [p.418, p.430, p.433]
- "Least worst": aparece só como entrada de índice ("least worst combination"), sem texto. [p.458]
- Todo trade-off tem lado ruim ("nothing in software architecture is all good"). [p.430]
- Listar alternativas comparáveis e completas: o bloco formaliza isso como lista MECE. [p.422-423]
- Analisar por dimensões (complexidade, escala, resiliência): o Cap. 15 faz o mesmo com forças próprias (acoplamento, complexidade, responsividade/disponibilidade, escala/elasticidade). [p.420]
- Existem acoplamento estático e dinâmico: confirmado (estático = diagrama estrutural do quantum; dinâmico = comunicação/workflow). [p.419]
- Consistência eventual vs atômica com custo de coordenação/reconciliação: usado em DPQ e em stamp coupling para workflow. [p.396, p.411]
- Síncrono vs assíncrono com custos: exemplo com tabela (garantia de início da aprovação vs responsividade e tolerância a falhas). [p.429]
- Orquestração vs coreografia: orquestrador tende a piorar desempenho e consistência; coreografia melhora vazão e escala. [p.396, p.427]
- ADRs e fitness functions como governança: ADRs do bloco com contexto, decisão, consequências; CDC descrito como fitness function; fitness functions contra acoplamento acidental em monorepo. [p.398, p.415, p.392, p.433]
- Dados operacionais e analíticos têm propósitos diferentes. [p.381, p.399-400]
- Condição de revisão no ADR: o ADR do app móvel traz "revisitar se a app store permitir deploy mais rápido" (equivale ao campo "Condição de revisão" do trade-off-table). [p.398]
- Rejeitar absolutos ("X resolve tudo"): alinhado ao alerta contra snake oil e evangelismo. [p.430]
- Requisitos e tecnologia mudam, evolução iterativa: o bloco defende design iterativo e reavaliar quando surge capacidade nova. [p.420, p.423]

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- Acoplamento estático ("uma mudança exige recompilar outra parte?"; imports, bibliotecas, contratos, schemas): o bloco define acoplamento como "se X muda, força Y a mudar?" e lista, para o estático, SO/contêiner, dependências transitivas, persistência, pontos de integração de bootstrap e infraestrutura de mensageria. [p.419] A pergunta de recompilar é mais estreita; contratos aparecem no bloco como espectro próprio (estrito/frouxo).
- A skill põe filas, eventos, REST e gRPC só no dinâmico. O bloco põe a disponibilidade do broker/service plane no acoplamento ESTÁTICO e deixa no dinâmico o padrão de comunicação, consistência e coordenação. [p.411, p.419]
- Estrutura obrigatória de 5 blocos em toda resposta: tensão com o conselho de reduzir a poucos pontos-chave ("bottom line") para stakeholders não técnicos. [p.428-429] Não é contradição estrita.
- "Avaliação obrigatória" com 8 dimensões fixas: o bloco manda adicionar colunas específicas do problema e manter a decisão no contexto estreito. [p.418, p.423-425] Lista fixa não é suportada como regra.
- Setas "Consistência ↑ → Disponibilidade ↓" e "Acoplamento ↓ → Complexidade Operacional ↑": o bloco suporta só parcialmente (correlação inversa acoplamento x escala e acoplamento x responsividade/disponibilidade; contrato frouxo exige CDC e maturidade). [p.393, p.421] Consistência x disponibilidade não aparece neste bloco.
- Orquestração "custo: ponto central de falha": o bloco não usa essa formulação; cita impacto em desempenho e consistência. [p.427] Pode estar em outro bloco.
- Dados analíticos resumidos a "histórico, agregação, tendências": o bloco não contradiz, mas mostra que o caminho centralizado (warehouse/lake) falha por particionamento técnico, fragilidade de pipeline e PII. [p.402-407]
- ADR do SKILL.md (Contexto, Decisão, Justificativa, Consequências) não traz fitness functions nem condição de revisão; o bloco traz ambos nos ADRs. [p.398, p.415] O adr-template.md já inclui Fitness Functions, então o resumo do SKILL.md está defasado em relação ao template.
- Anti-padrões como "Banco por serviço é obrigatório": nada neste bloco os suporta ou contradiz.

### (c) O que o bloco traz e a skill não cobre
Contratos (a skill não menciona):
- Espectro estrito/frouxo/CDC com vantagens e desvantagens (Tabelas 13-1, 13-2, 13-3); REST/GraphQL como mais frouxos; nome-valor como extremo. [p.386-393]
- Regra "need to know"; stamp coupling como anti-padrão acidental (fragilidade, falácia da banda infinita) e como técnica legítima para estado de workflow em coreografia (Tabela 13-4). [p.387, p.394-397]
- Critério de escolha por velocidade de mudança e canal de deploy (app store). [p.397-398]
- Acoplamento semântico não se reduz por implementação. [p.389, p.396, p.427]
- CDC (push vs pull) como fitness function; verifica o que schema não verifica (faixas de valores); exige maturidade. [p.391-393]

Dados analíticos (a skill só cita OLTP/OLAP):
- Data Warehouse (ETL, Star Schema, fatos/dimensões, falhas) e Data Lake (carregar e depois transformar; falhas de descoberta, PII, partição técnica, defasagem), Tabelas 14-1 e 14-2. [p.399-407]
- Data Mesh: 4 princípios, Data Product Quantum (source-aligned, agregado, fit-for-purpose), cooperative quantum, assíncrono + eventual, nunca transacional operacional/analítico, Tabela 14-3, quando usar. [p.407-412]
- Exemplo de ADR com fitness functions ("dia completo ou nenhum"; CDC entre DPQs). [p.414-415]

Método de análise própria (a skill tem só um framework genérico de 4 passos):
- Três passos, diagrama de acoplamento estático, fixar primeiro a dimensão fundamental e iterar. [p.418-422]
- Qualitativo vs quantitativo, MECE, armadilha do out-of-context, cenários de domínio, bottom line, anti-evangelismo (monorepo vs trunk-based). [p.422-433]
- Exemplo pub/sub único vs filas ponto a ponto (contratos por consumidor, segurança/PII, perfil operacional), Tabela 15-4. [p.430-433]
- Correlação inversa acoplamento x escala e acoplamento x disponibilidade entre padrões de saga. [p.421] Valores da Tabela 15-2 ilegíveis na extração.

Outros:
- Architecture quantum como unidade de análise: ausente na skill. [p.411, p.419]
- Apêndices B e C: mapa de ADRs e tabelas de trade-off do livro, úteis para checar cobertura. [p.437, p.439-441]
- Índice sugere catálogos ausentes na skill (verificar em outros blocos): 8 padrões de saga, ACID vs BASE, disintegradores/integradores de granularidade, propriedade conjunta de dados, acesso a dados distribuído, reuso de código. [p.450-459]

### Recomendações de melhoria (derivadas só deste bloco)
1. Criar references/contratos.md (estrito/frouxo/CDC/stamp coupling, need-to-know, critério de escolha, banda) e resumo de 2-3 linhas no SKILL.md.
2. Criar references/dados-analiticos.md (warehouse, lake, mesh, DPQ, regra assíncrono/eventual, quando usar, ADR com fitness function).
3. Criar references/metodo-trade-off.md (3 passos, MECE, out-of-context, cenários, bottom line, anti-evangelismo) e permitir dimensões sob medida no trade-off-table.md.
4. Corrigir no SKILL.md a separação estático (infraestrutura necessária, incl. broker) vs dinâmico (comunicação, consistência, coordenação) e introduzir quantum.
5. Alinhar o ADR do SKILL.md ao template (fitness functions e condição de revisão).
6. Acrescentar modo de resposta "bottom line" para stakeholders não técnicos.
7. Grupo software-architecture: rotear plataformas com dados analíticos para a nova referência, combinando com DDD estratégico (domínio dono do dado) e produção; apenas como sugestão, sem copiar conteúdo.
8. Manter SKILL.md abaixo de 500 linhas (hoje 184), listar novas referências em ## Referências e incrementar version da skill e dos três manifests.
