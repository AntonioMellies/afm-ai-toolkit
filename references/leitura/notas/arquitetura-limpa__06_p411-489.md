# Notas: Arquitetura Limpa (R. C. Martin), bloco 06 (PDF p.411-489)

Observação geral: o bloco é o Apêndice A ("Arquitetura em ação"/retrospectiva autobiográfica de arquitetura, nome exato do apêndice não aparece no trecho) em sua parte final (continua do bloco anterior, iniciado antes da p.411), mais a nota de rodapé do apêndice (p.464-465) e páginas de propaganda de outros livros (p.467-489, sem conteúdo técnico). Números impressos de página não aparecem no texto extraído. O texto é narrativa em primeira pessoa; as "lições" são o que interessa.

### Apêndice A: Supervisor de contabilidade, ASC/Varian 620/f (PDF p.411-414) [continua do bloco anterior]
Resumo: Martin descreve, aos 18 anos (1971), a reescrita de um sistema de contabilidade em minicomputador sem SO nem linguagem de alto nível; análise dos dois limites do sistema (aplicação-supervisor).
Conceitos e regras:
- Sistema com sobreposição (overlay) em disco; um supervisor preemptivo gerenciava interrupções, IO e troca de aplicações [p.412-413].
- Limite 1 (saída de caracteres): dependência "normal", ou seja, dependência apontava na mesma direção do fluxo de controle (aplicações dependiam em tempo de compilação do supervisor). Esse limite impedia a aplicação de saber o tipo de dispositivo de saída [p.414].
- Limite 2 (início das aplicações): dependência invertida; o supervisor iniciava aplicações sem dependência de compilação sobre elas, e a "interface polimórfica" era apenas o endereço fixo de início na área de overlay. O limite impedia o supervisor de saber algo das aplicações além do ponto inicial [p.414].
Citações curtas de prova:
- "O limite evitava que as aplicações soubessem para qual tipo de dispositivo a saída estava indo." [p.414]
O que este trecho NÃO diz: não usa o termo "Dependency Rule" nesta passagem; é exemplo histórico de inversão de dependência sem OO.
Relevância: clean-architecture-expert: MÉDIA (exemplo concreto de fluxo de controle x direção de dependência); testing-tdd-expert: NENHUMA; clean-code-expert: NENHUMA.
Decisão sugerida: usar como exemplo ilustrativo em clean-architecture-expert (references), opcional.

### Laser Trim / Teradyne Applied Systems (PDF p.414-419)
Resumo: sistema de polimento a laser em M365 com camadas MOP, utilitária e de isolamento (DSL), todas fortemente acopladas.
Conceitos e regras:
- Camadas existiam, mas limites eram "no mínimo, confusos"/suaves: a camada utilitária chamava o MOP e o MOP chamava de volta a camada utilitária (acoplamento cíclico); código-fonte do MOP era bifurcado entre divisões e integrado manualmente [p.418].
- A camada de isolamento oferecia uma máquina virtual/DSL aos programas de aplicação, mas a linguagem não era independente da máquina, tinha idiossincrasias acopladas às camadas inferiores [p.418-419].
- Única unidade de compilação em assembler; "quantidade imensa de acoplamentos" era típica do início dos anos 70 [p.419].
Citações curtas de prova:
- "Os limites nesta aplicação eram, no mínimo, suaves." [p.419]
O que este trecho NÃO diz: não prescreve solução; é anti-exemplo (camadas nominais sem limites reais).
Relevância: clean-architecture-expert: BAIXA/MÉDIA (anti-exemplo: ter camadas não é ter limites; vazamento no DSL).
Decisão sugerida: anti-padrão curto, opcional.

### Monitoramento de alumínio fundido, OMC (PDF p.419-421)
Resumo: automação de chão de fábrica em IBM System/7 em assembler, sem SO; autor demitido. Única lição arquitetural: instrução SPI (equivalente ao Thread.yield() em Java) [p.421].
Relevância: todas NENHUMA. Decisão: descartar.

### 4-TEL (PDF p.421-427)
Resumo: sistema de testes de linhas telefônicas. Evolui de monolito assembler para separar COLT (ligação/medição) e SAC (análise/relatórios) por causa de lentidão de 30 cps e custo de memória; depois uma arquitetura de "plug-in" por vetorização em EPROM.
Conceitos e regras:
- Separar a parte que liga/mede da parte que analisa e gera relatórios foi um limite "muito limpo e altamente desacoplado": pacotes curtos de dados entre SAC e COLT, uma forma simples de DSL ("DIAL XXXX", "MEASURE") [p.422]. Resultado: telas mais rápidas e menos memória nos COLTs [p.422].
- Problema de implantação: trocar o software exigia regravar e substituir 30 chips porque qualquer mudança deslocava endereços de todo o executável [p.424-425].
- Solução "Vetorização": 32 arquivos-fonte compiláveis independentemente (<1K), cada um com tabela de endereços de sub-rotinas (máx. 20), tabela de vetores em RAM carregada na inicialização, e todas as chamadas feitas por indireção via vetor [p.425-426].
- Consequência: chips implantáveis de forma independente; o autor afirma que isso foi despacho polimórfico/objetos e "literalmente uma arquitetura de plug-in", com menu e ligação à aplicação principal automáticos ao inserir o chip [p.426]. Ressalva do autor: na época não sabiam separar UI de regras de negócio [p.426].
- Benefício inesperado: correção de firmware por dial-up apontando o vetor para RAM com a sub-rotina corrigida [p.426-427].
Citações curtas de prova:
- "Os chips passaram a ser independentemente implementáveis." [p.426]
- "Literalmente, essa era uma arquitetura de plug-in." [p.426]
O que este trecho NÃO diz: não generaliza a técnica para um catálogo de padrões; a inferência "indireção por tabela permite deploy independente" é a leitura do autor sobre o caso.
Relevância: clean-architecture-expert: MÉDIA (origem de plug-in/independência de deploy e limites como DSL de mensagens); testing-tdd-expert: NENHUMA.
Decisão sugerida: usar como exemplo opcional de "limite que permite implantação independente".

### SAC: Computador da Área de Serviço (PDF p.427-433)
Resumo: sistema de 60.000 linhas de assembler monolítico, sem isolamento de dispositivo e UI das regras de negócio; descreve os custos disso, o código de despacho incompreensível e o fracasso da reescrita ("Time Tigre") e da bifurcação EUA/Europa.
Conceitos e regras:
- Código crítico de despacho (determinação de qual tipo de técnico enviar) que ninguém entendia: toda mudança quebrava algo; a gerência o "congelou" ("oficialmente rígido") [p.428]. Lição declarada: valor do código limpo [p.428].
- Sem isolamento de controle de dispositivo ou UI das regras de negócio: lógica de modem espalhada por centenas de lugares, formatação de terminal idem [p.429].
- Modem novo com controle completamente diferente; como o controle estava espalhado, a solução foi um hack na sub-rotina de escrita no bus serial que traduzia os padrões de bit do modem antigo para o novo ("pior hack imaginável") [p.429-430]. Lição: valor de isolar hardware das regras de negócio e de interfaces abstratas [p.430].
- Reescrita total em C/UNIX por uma equipe separada ("Time Tigre") fracassou após anos; a observação é que é muito difícil uma equipe de redesign alcançar uma grande equipe que mantém ativamente o sistema antigo [p.430-431].
- Fork do código para a Europa em vez de integrar; tentativa posterior de reintegrar e tratar diferenças como configuração falhou três vezes porque as bases divergiram demais [p.431-433].
Citações curtas de prova:
- "O código se tornou oficialmente rígido." [p.428]
- "Foi por causa desse fiasco que eu aprendi o valor de isolar o hardware das regras de negócio" (parafraseado de p.430; citação literal exata: "o valor de isolar o hardware das regras de negócio e das interfaces abstratas") [p.430]
O que este trecho NÃO diz: não oferece método de migração; não propõe Strangler ou equivalente. A afirmação sobre redesign é observação empírica do autor, não regra geral provada.
Relevância: clean-architecture-expert: ALTA (anti-padrões concretos: detalhes de dispositivo/UI espalhados; custo da mudança; reescrita paralela); clean-code-expert: BAIXA (menciona "código limpo", mas sem critérios); testing-tdd-expert: NENHUMA (não há menção de testes).
Decisão sugerida: usar em clean-architecture-expert como anti-padrões/lições (isolar dispositivo; reescrita total arriscada).

### Linguagem C, BOSS, pCCU (PDF p.433-440)
Resumo: história de adoção do C e de um trocador de tarefas cooperativo (BOSS) sobre 8085; pCCU feito em uma semana.
Conceitos e regras:
- BOSS: tarefas não preemptivas, troca via laço de votação (polling) quando tarefa bloqueia por evento com block(eventCheckFunction) [p.436].
- "Armadilha do cronograma": adiar sistematicamente a arquitetura CCU/CMU porque os clientes adiavam os comutadores digitais; depois o prazo chegou de repente [p.438-439]. Percebeu-se tarde o "limite arquitetural óbvio" entre ligação e medição, que teria economizado muito se reconhecido antes [p.438].
- Solução enxuta: nem toda arquitetura planejada era necessária; um computador simples no escritório central retransmitia comandos a dois COLTs padrão, decodificando o número de telefone (pCCU) [p.439-440]. O autor diz que não há grande implicação arquitetural [p.440].
Citações curtas de prova:
- "Poderíamos ter economizado uma fortuna se tivéssemos reconhecido o limite arquitetural óbvio" [p.438] (citação ajustada para o recorte)
O que este trecho NÃO diz: não dá critério para decidir quando investir em arquitetura; é relato.
Relevância: clean-architecture-expert: BAIXA/MÉDIA (custo de adiar limites óbvios; atender necessidade real com solução mínima).
Decisão sugerida: opcional; no máximo uma linha.

### DLU/DRU (PDF p.440-442)
Resumo: mux/demux de terminais sobre um link de 9600 bps. Duas arquiteturas radicalmente diferentes (pipeline de tarefas com filas vs. uma tarefa grande por terminal) funcionaram igualmente bem.
Conceitos e regras:
- DLU: modelo de fluxo de dados, tarefas pequenas e focadas, filas, "pipes e filters" [p.442]. DRU: uma tarefa por terminal, sem filas [p.442].
- Conclusão: arquiteturas de software podem ser extremamente diferentes e ainda assim igualmente eficazes [p.442].
Citações curtas de prova:
- "arquiteturas de software podem ser extremamente diferentes e ainda assim igualmente eficazes" [p.442] (trecho da frase)
O que este trecho NÃO diz: não compara critérios (desempenho, custo de manutenção); é anedota.
Relevância: clean-architecture-expert: BAIXA (contrapeso ao dogmatismo: o que importa é atender a necessidade). Decisão: opcional/descartar.

### VRS: Voice Response System (PDF p.443-446)
Resumo: sistema de resposta de voz para técnicos de cabo; usou UNIFY com Embedded SQL espalhado por todo o código C; quando o produto foi descontinuado a troca de banco foi impossível.
Conceitos e regras:
- SQL embutido como strings no C "em todos os lugares", além de chamadas de API específicas do fornecedor espalhadas [p.445].
- Produto UNIFY foi cancelado; tentativa de migrar para outro fornecedor durante cerca de três meses foi abandonada: acoplamento tão forte que não havia esperança de reestruturar a custo razoável [p.445-446]. Solução: contratar terceiro para manter o UNIFY, com taxas crescentes [p.446].
- Lição declarada: bancos de dados são detalhes que devem ser isolados do propósito de negócio geral do sistema; aversão a acoplamento forte a software de terceiros [p.446].
Citações curtas de prova:
- "bases de dados são detalhes que devem ser isolados do propósito de negócio geral do sistema" [p.446]
O que este trecho NÃO diz: não descreve o padrão (Repository, gateway) para isolar o banco; apenas a lição.
Relevância: clean-architecture-expert: ALTA (caso real de custo de acoplar banco/fornecedor ao negócio; evidência para "banco é detalhe"); testing-tdd-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert como exemplo/justificativa.

### O Recepcionista Eletrônico (ER) (PDF p.446-449)
Resumo: primeiro sistema de voice mail; arquitetura "orientada a serviços": processos por estado, mensagens via arquivos de disco.
Conceitos e regras:
- Cada linha tinha um processo de escuta; cada estado da chamada iniciava um processo manipulador; mensagens passadas por arquivos de disco; serviço escreve o estado, dispara o próximo serviço por linha de comando e sai [p.447-448].
- Autoavaliação: não era arquitetura "limpa" no sentido do livro porque não era arquitetura de plug-in, mas mostrava limites reais: serviços implantáveis independentemente, cada um em seu domínio de responsabilidade, processos de alto e baixo nível, muitas dependências na direção certa [p.448].
- Fracasso comercial por marketing e perda de patente (não é questão arquitetural) [p.448-449].
Citações curtas de prova:
- "Os serviços eram independentemente implementáveis e viviam em seu próprio domínio de responsabilidade." [p.448]
O que este trecho NÃO diz: não define quando preferir serviços a monólito.
Relevância: clean-architecture-expert: BAIXA. Decisão: descartar ou nota curta.

### CDS: Craft Dispatch System (PDF p.449-452)
Resumo: evolução do ER para uma arquitetura que o autor chama de "microsserviços", com máquina de estado externalizada em arquivo de texto, memória compartilhada (3DBB) e dados etiquetados (FLD).
Conceitos e regras:
- Máquina de estado externalizada em arquivo de texto: mudar o fluxo sem mudar código, o que o autor associa ao Princípio Aberto/Fechado; novo serviço adicionável ao fluxo editando o arquivo, até em execução (hot-swapping, "BPEL eficaz") [p.450-451].
- 3DBB: memória compartilhada por nome, sem ponteiros (partições de memória separadas), só strings/constantes [p.451].
- FLD: árvores binárias nome-dado, hierarquia recursiva, traduzíveis para strings; autor compara a XML/JSON [p.452].
- Entrada manual de tíquetes em fluxo de texto semiestruturado com milhares de códigos e erros de digitação, exigindo parsing tolerante [p.451-452].
Citações curtas de prova:
- "Isso permitiu mudar o fluxo da aplicação sem mudar nenhum código (o Princípio Aberto/Fechado)." [p.450] (parafraseado da frase; citação literal: "mudar o fluxo da aplicação sem mudar nenhum código")
O que este trecho NÃO diz: não explica o OCP aqui; o uso do termo "microsserviços" é anacrônico e retrospectivo (autor: "o que chamamos hoje de").
Relevância: clean-architecture-expert: BAIXA (OCP via configuração externa; exemplo de extensão sem modificação).
Decisão sugerida: opcional.

### Clear Communications (PDF p.452-454)
Resumo: startup (1988); sem arquitetura, "só código"; função C de 3000 linhas; três anos sem vender.
Conceitos e regras:
- Anti-exemplo: "Arquitetura? Você está brincando? Isso era uma startup. Ninguém tinha tempo para arquitetura" [p.454]; resultado: código grudento (função gi() de 3000 linhas, p.453) e fracasso comercial (o texto não atribui o fracasso comercial à falta de arquitetura, mas ao mercado desinteressado, p.454).
Citações curtas de prova:
- "Ninguém tinha tempo para arquitetura. Só código, droga!" [p.454]
O que este trecho NÃO diz: não relaciona causalmente a falta de arquitetura com a falha de vendas.
Relevância: clean-code-expert: BAIXA (anti-exemplo de função gigante, mas sem diretrizes). Decisão: descartar.

### Origem do SOLID e Uncle Bob (PDF p.454-458)
Resumo: autor muda para C++ e estuda OO; debates na Netnews.
Conceitos e regras:
- "Em um daqueles debates, foram estabelecidas as bases dos princípios SOLID." [p.455] (afirmação histórica do autor; sem detalhes dos princípios neste bloco).
- Livros citados como fontes de estudo: Stroustrup, Wirfs-Brock, Coad, Goldberg, Coplien, Booch [p.455].
O que este trecho NÃO diz: não lista nem explica os princípios SOLID; não dá data.
Relevância: clean-architecture-expert: BAIXA (proveniência do SOLID, apenas como nota histórica).
Decisão: descartar (ou nota histórica).

### ROSE (Rational) (PDF p.457-460)
Resumo: ferramenta de diagramas Booch com camadas reais, mas com dependências apontadas na direção do fluxo de controle (GUI > representação > regras > base de dados), o oposto da Dependency Rule; banco orientado a objetos e excesso de arquitetura levaram ao fracasso.
Conceitos e regras:
- ROSE tinha arquitetura em camadas verdadeiras, dependências controladas, passível de releases e independentemente implantável [p.457], mas faltou estrutura de plug-in verdadeira [p.458].
- Regra de dependência da ROSE era estrita, mas não era a regra do livro: dependências apontavam para a direção tradicional do fluxo de controle e não para as políticas de alto nível [p.458-459]. Cadeia: GUI > representação > regras de manipulação > base de dados [p.459]. O autor diz que essa falha de direcionar dependências para a política contribuiu para a morte do produto [p.459].
- Banco de dados orientado a objetos: ideia de que o banco pareceria RAM; virou framework de terceiros "grande, lento, intrusivo e caro", "maior erro prático" [p.459].
- O maior erro foi o excesso de arquitetura: muito mais camadas, cada uma com sobrecarga de comunicação, reduzindo a produtividade [p.459-460]. A ferramenta foi substituída por uma aplicação pequena feita por pequena equipe de Wisconsin [p.460].
- Lição: a arquitetura deve ser flexível o bastante para se adaptar ao tamanho do problema; para uma pequena ferramenta desktop, arquitetura excessiva é "receita para o fracasso" [p.460].
Citações curtas de prova:
- "Provavelmente, a base de dados foi nosso maior erro prático." [p.459]
- "O maior erro, na verdade, foi o excesso de arquitetura." [p.459]
- "grandes arquiteturas às vezes levam a grandes fracassos" [p.460] (trecho)
O que este trecho NÃO diz: não define limiar de quando a arquitetura vira excessiva; não detalha quais camadas eram supérfluas.
Relevância: clean-architecture-expert: ALTA (contraexemplo da Dependency Rule; aviso contra over-engineering; BD como detalhe; dimensionamento da arquitetura); testing-tdd-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (anti-padrões: dependências seguindo fluxo de controle; overengineering; framework de persistência intrusivo; adequar arquitetura ao tamanho do problema).

### Exame de Registro de Arquitetos (ETS/NCARB) (PDF p.460-463)
Resumo: 36 aplicações (18 vinhetas GUI tipo CAD + 18 avaliadoras); o primeiro framework "reutilizável" (45.000 linhas) não serviu; refeito com quatro vinhetas simultâneas; vinhetas como plug-ins do framework.
Conceitos e regras:
- Primeira tentativa: um ano construindo framework de 45.000 linhas + 6.000 de aplicação; ele não se encaixou nas novas aplicações ("fricções sutis") [p.462]. Segunda: escrever 4 vinhetas simultaneamente, reaproveitando e retrabalhando; novo framework de 45.000 linhas, vinhetas de 3.000 a 6.000 linhas [p.462-463].
- Relações seguem a Regra da Dependência: vinhetas são plug-ins do framework; toda a política de alto nível da GUI no framework; o código da vinheta é "só a cola" [p.463]. Para avaliação: política de alto nível na vinheta; framework de avaliação como plug-in da vinheta de avaliação [p.463]. Ligação estática em C++, então a noção de plug-in não ocorria na época, mas o fluxo de dependências era consistente [p.463].
- Lição: "para criar um framework reutilizável, você precisa primeiro criar um framework utilizável"; frameworks reutilizáveis devem ser criados em conjunto com várias aplicações que o usam [p.463] (o texto diz "aplicações reutilizáveis", aparente deslize; fiel ao texto extraído).
- Crítica à promessa de reutilização OO: não basta código OO limpo para obter reutilização natural [p.461].
Citações curtas de prova:
- "para criar um framework reutilizável, você precisa primeiro criar um framework utilizável" [p.463]
- "Toda a política de alto nível da GUI estava no framework." [p.463]
O que este trecho NÃO diz: não define a "regra de três" nem número de aplicações necessárias; "quatro" é apenas o que fizeram.
Relevância: clean-architecture-expert: ALTA/MÉDIA (reutilização só vem de uso real em várias aplicações; plug-in e Regra da Dependência em exemplo concreto; reuse/release equivalence não é citado aqui); clean-code-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (anti-padrão: framework reutilizável especulativo; política no núcleo, aplicações como plug-ins).

### Conclusão do apêndice e notas de rodapé (PDF p.463-465)
Resumo: autor diz que é história parcial e parada no início dos anos 90. Notas de rodapé 1-13 são curiosidades históricas (sem conteúdo arquitetural). Nota 10: BOSS renomeado depois, em tom de brincadeira; nota 13: CASE = Computer Aided Software Engineering.
Relevância: NENHUMA. Decisão: descartar.

### Páginas de propaganda de outros livros (PDF p.467-489)
Páginas de catálogo (Data Science do Zero, Como Ser Antirracista, Pai Rico Pai Pobre, Fake, 12 Regras para a Vida), com HTML bruto em algumas. Páginas 466, 470, 476, 481 e 486 estão vazias. Sem relação com o livro. Registradas como material comercial; sem detalhamento. Decisão: descartar.

## Checklist de cobertura
- Primeira página lida: 411
- Última página lida: 489 (conferida via Grep: último marcador "=== PDF PAGINA 489 ===")
- Páginas sem texto útil ou ilegíveis: 466, 470, 476, 481, 486 (vazias); 467-469, 471-475, 477-480, 482-485, 487-489 (propaganda de outros livros)
- Problemas de extração observados: ligaduras "ﬁ/ﬂ/ﬀ" preservadas; uma sequência "4-TE" no lugar de "4-TEL" (p.421); "8085m" (p.441); entidades HTML cruas na propaganda (p.477-480); algumas imagens/figuras (A.5 a A.9) ausentes; a seção "Conclusão" aparece cortada no fim da p.463 e continua na p.464; números impressos de página não visíveis.
- Capítulos/seções cobertos integralmente: do final do Apêndice A (a partir de p.411) até sua conclusão e notas (p.464-465)
- Capítulos/seções que continuam em outro bloco: o Apêndice A começa antes da p.411 (bloco anterior); nenhum continua depois.

Achado geral: nenhum conteúdo sobre SOLID detalhado, testes por camada, componentes (REP/CCP/CRP, ADP, SDP, SAP), fronteiras detalhadas ou camadas de Clean Architecture neste bloco; é narrativa com lições de acoplamento (detalhes de hardware/banco/UI espalhados), limites e plug-in, e riscos de overengineering e de frameworks reutilizáveis especulativos.

## Auditoria da skill atual

Escopo: `skills/clean-architecture-expert/SKILL.md` (v1.0) e `references/hexagonal-structure.md`, `references/use-case-example.md`. Este bloco (PDF p.411-489) é só o final do Apêndice A (memórias do autor); quase nada dele é normativo. Os itens abaixo comparam as afirmações da skill apenas com o que está no texto do bloco. O que não está no bloco é marcado [fora do livro].

### (a) O que a skill afirma e o bloco confirma
- "Banco de dados é um detalhe" / desacoplar de framework e banco: confirmado pelo caso VRS. SQL embutido e chamadas de API do fornecedor espalhados pelo código; com o produto UNIFY cancelado, três meses de troca fracassaram por acoplamento forte [p.445-446]. Lição do autor: bases de dados são detalhes a isolar do propósito de negócio [p.446]. Também ROSE: o banco orientado a objetos virou framework "grande, lento, intrusivo e caro" [p.459].
- "Frameworks são detalhes; nunca devem influenciar o domínio" e "Nunca priorizar frameworks, modismos": apoio indireto no mesmo caso (modismo do banco OO, p.458-459) e na aversão do autor ao acoplamento forte com software de terceiros [p.446].
- Dependency Rule, dependências apontam para a política de alto nível: o autor aplica explicitamente a Regra da Dependência ao framework de GUI e às vinhetas (plug-ins; política de alto nível no framework) [p.463]; e diagnostica o oposto na ROSE (dependências na direção do fluxo de controle, não da política) como contribuinte da morte do produto [p.458-459].
- "Nunca misturar domínio e infraestrutura": no SAC, controle de modem e UI espalhados pelas regras de negócio geraram o hack de tradução de bits [p.429-430]; lição: isolar hardware das regras de negócio e usar interfaces abstratas [p.430].
- Interfaces para dependências externas e inversão de dependência: no supervisor de 1971, a interface polimórfica invertia a dependência e o supervisor não sabia nada das aplicações além do ponto inicial [p.414].
- Manutenibilidade / custo futuro: SAC com código de despacho "oficialmente rígido" [p.428] (anedota, não métrica).
- Ports & Adapters / limites para integração externa: o 4-TEL mostra limite SAC/COLT limpo, com pacotes curtos tipo DSL [p.422] (confirmação fraca; o bloco não nomeia Ports & Adapters).

### (b) O que a skill afirma e o bloco contradiz ou não suporta
- A skill exige camadas completas (domain/application/adapters/infrastructure), Hexagonal "sempre que houver integração externa", DDD, Sagas, Outbox, sem contrapeso de proporcionalidade. O bloco diz que o maior erro da ROSE foi o excesso de arquitetura e que a arquitetura deve se adaptar ao tamanho do problema [p.459-460]. Não é contradição direta, mas a skill não suporta esse limite (lacuna de calibragem).
- Taxonomia "Infrastructure -> Adapters -> Application -> Domain", com `infrastructure` podendo depender de "Qualquer camada": o bloco não descreve camadas nem diretórios; não suporta nem contradiz. Os nomes das camadas são [fora do livro] em relação a este bloco.
- "Casos de Uso são o centro do sistema" e o modelo ator/objetivo/entrada/saída: o bloco não menciona casos de uso. Não suportado aqui.
- Screaming Architecture, DDD (Aggregates, Value Objects), Domain Events, Sagas, Outbox, Circuit Breaker: ausentes do bloco [fora do livro].
- "Regra Máxima: a única forma de desenvolver software rapidamente é desenvolvê-lo corretamente": a frase não aparece no bloco. O bloco traz startup que codificava sem arquitetura ("Só código, droga!", p.454), mas atribui o fracasso comercial ao mercado desinteressado [p.454], não à falta de arquitetura. Nem suporta nem contradiz.
- "Código testável sem banco, API ou mensageria" e "Testabilidade... se não, arquitetura incorreta": o bloco não menciona testes; não suporta.
- A skill enuncia a regra como "dependências apontam para dentro" e lista camadas. O bloco ressalva que a ROSE tinha regra de dependência estrita entre camadas, mas não a do livro [p.458-459]: ter camadas com dependências controladas não basta (ver c1).

### (c) O que o bloco traz e a skill não cobre
1. Camadas controladas não bastam: a ROSE tinha camadas verdadeiras e dependências estritas, mas voltadas ao fluxo de controle (GUI > representação > regras > banco), o que contribuiu para a morte do produto [p.457-459]. Acréscimo sugerido: no teste de Dependency Rule, verificar a direção em relação à política, não só a existência de camadas.
2. Excesso de arquitetura / dimensionamento: camadas extras com sobrecarga de comunicação reduziram a produtividade; adaptar a arquitetura ao tamanho do problema [p.459-460]. A skill não tem regra de proporcionalidade.
3. Fluxo de controle x direção de dependência: no supervisor de 1971, um limite tem dependência normal (mesma direção do fluxo) e outro invertida (polimorfismo por endereço fixo) [p.414]. A skill só enuncia a regra.
4. Custo de adiar limites óbvios ("armadilha do cronograma") e solução mínima que atende o caso real (pCCU em cerca de uma semana) [p.438-440].
5. Reescrita total paralela como risco: equipe de redesign dificilmente alcança a equipe grande que mantém o sistema antigo; o "Time Tigre" falhou [p.430-431]. Bifurcação de código por região (EUA/Reino Unido) com reintegração falhando três vezes [p.431-433]. A skill cobre refatoração de legado só de forma genérica.
6. Frameworks reutilizáveis: para criar um reutilizável é preciso antes criar um utilizável, junto de várias aplicações; o primeiro framework de 45.000 linhas não serviu às novas [p.462-463]. Vinhetas como plug-ins, política de alto nível no framework [p.463]. A skill não trata reuso nem plug-ins.
7. Independência de deploy por indireção: arquitetura de plug-in via vetores [p.425-426]; máquina de estado externalizada como extensão sem modificar código (OCP) [p.450-451]. A skill não cobre plug-in nem OCP por configuração.
8. Limites como mensagens/DSL curtas entre processos [p.422]; serviços independentemente implantáveis (ER), com ressalva do autor de que não era "limpa" por não ser plug-in [p.448].
9. Casos concretos de acoplamento como evidência: SQL embutido e API de fornecedor espalhada (VRS) [p.445]; hack de tradução no nível de bits em vez de interface abstrata (SAC) [p.429-430]; chamadas cíclicas MOP/camada utilitária [p.418]. A skill veda anotações/SQL no domínio em termos gerais, sem esses casos.
10. Dois estilos diferentes igualmente eficazes (pipeline de filas x tarefa por terminal) [p.442]: contrapeso a dogmatismo.
11. Origem do SOLID citada de passagem (debates na Netnews) [p.455]; nada sobre o conteúdo dos princípios.
12. Testes por camada, componentes, fronteiras parciais, Humble Object etc.: [fora do bloco]; não foram usados.

### Recomendações (somente com base no bloco)
- clean-architecture-expert: acrescentar uma referência curta de "proporcionalidade e armadilhas de campo" com c1, c2, c5, c6 e c9, citando o apêndice; incrementar versão e revisar grupos que citam a skill (backend-engineering, software-architecture).
- testing-tdd-expert: nada neste bloco.
- clean-code-expert: nada utilizável (menções a "código limpo" são anedóticas, p.428; função de 3000 linhas, p.453).
