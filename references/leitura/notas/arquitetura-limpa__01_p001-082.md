# Notas: Arquitetura Limpa (R. C. Martin, ed. pt-BR Alta Books), bloco 01, PDF p.1-82

Convenção: "p.N" = marcador "PDF PAGINA N". Números impressos de página não aparecem no texto extraído (nenhum "impr. M" disponível). O bloco termina no meio do Cap. 5 (OO), na seção "Encapsulamento?".

### Páginas pré-textuais: capa, copyright, créditos, dedicatória (PDF p.1-22)
Sem conteúdo técnico. Copyright 2020 Starlin Alta; tradução de Clean Architecture (Pearson, 2018). Páginas 1-3 e 22 vazias.
Decisão sugerida: descartar (sem conteúdo técnico).

### Sumário (PDF p.23-28)
Estrutura do livro (só títulos): I. Introdução (cap. 1-2); II. Paradigmas (3 Panorama, 4 Estruturada, 5 OO, 6 Funcional [Imutabilidade e Arquitetura, Segregação de Mutabilidade, Event Sourcing]); III. Princípios de Design (7 SRP, 8 OCP, 9 LSP, 10 ISP, 11 DIP); IV. Princípios dos Componentes (12 Componentes, 13 Coesão [REP, CCP, CRP, diagrama de tensão], 14 Acoplamento [ADP, top-down, SDP, SAP]); V. Arquitetura (15 O que é, 16 Independência, 17 Fronteiras, 18 Anatomia do Limite, 19 Política e Nível, 20 Regras de Negócio, 21 Arquitetura Gritante, 22 Arquitetura Limpa [Regra da Dependência], 23 Apresentadores e Objetos Humble, 24 Limites Parciais, 25 Camadas e Limites, 26 Componente Main, 27 Serviços, 28 O Limite Teste, 29 Arquitetura Limpa Embarcada); VI. Detalhes (30 Base de Dados, 31 Web, 32 Frameworks, 33 Estudo de Caso Vendas de Vídeo, 34 O Capítulo Perdido [pacote por camada, por recurso, portas e adaptadores, por componente]); VII. Apêndice A Arqueologia da Arquitetura.
Útil como mapa para os próximos blocos (os capítulos de maior relevância, 7-34, ficam fora deste bloco).
Relevância: clean-architecture-expert: MÉDIA (mapa de capítulos para as próximas leituras); demais: NENHUMA.
Decisão sugerida: usar apenas como índice de orquestração dos blocos seguintes.

### Prefácio de Kevlin Henney (PDF p.29-33)
Resumo: reflexão sobre a metáfora de "arquitetura" em software. Define qualidade arquitetural pelo custo da mudança ao longo do tempo e critica dois extremos (arquitetura autoritária e rígida; generalidade especulativa). Defende tratar arquitetura como investigação contínua.
Conceitos e regras:
- Caixas em diagramas não são a arquitetura; um diagrama é uma visão escolhida entre várias possíveis [p.30].
- Arquitetura = decisões significativas de design, onde significância se mede pelo custo da mudança (citação de Booch) [p.31].
- Boa arquitetura deve atender usuários, desenvolvedores e proprietários não só hoje, mas ao longo do tempo [p.31].
- Dois caminhos ruins: arquitetura imposta com autoridade e rigidez (elimina a mudança em vez de barateá-la) e "generalidade especulativa" (adivinhação codificada, parâmetros, código morto, complexidade acidental) [p.32].
- Caminho preferido: preservar a "suavidade" do software, assumir conhecimento incompleto, tratar arquitetura como jornada e processo de investigação, não artefato congelado [p.33].
- Arquitetura como hipótese que deve ser comprovada por implementação e medição (Tom Gilb) [p.33].
Citações curtas de prova:
- "A única maneira de ir rápido, é ir bem." [p.33]
- "Se você acha que uma arquitetura boa é cara, experimente uma arquitetura ruim." (Foote e Yoder) [p.31]
O que este trecho NÃO diz: não traz regras operacionais, apenas enquadramento; o prefácio é de Henney, não de Martin.
Relevância: clean-architecture-expert: MÉDIA (anti-padrão de generalidade especulativa, arquitetura como hipótese mensurável, custo da mudança como critério); clean-code-expert: BAIXA; testing-tdd-expert: NENHUMA.
Decisão sugerida: usar em clean-architecture-expert (Mentalidade Principal / Anti-Padrões), como enquadramento breve.

### Apresentação de Martin (PDF p.34-37)
Resumo: Martin afirma que as regras de arquitetura são as mesmas em sistemas muito diferentes e que isso se deve à imutabilidade dos blocos de construção do código.
Conceitos e regras:
- As regras da arquitetura de software são independentes de linguagem, hardware, tipo de sistema e época [p.35].
- O código continua sendo sequências, seleções e iterações; as regras de arquitetura são princípios para ordenar esses blocos e, como os blocos não mudaram, as regras são universais e imutáveis [p.36-37].
- O livro trata dessas regras "atemporais e imutáveis" [p.37].
Citações curtas de prova:
- "As regras da arquitetura são sempre as mesmas!" [p.35]
O que este trecho NÃO diz: não enumera as regras; é motivacional/autobiográfico.
Relevância: clean-architecture-expert: BAIXA; demais: NENHUMA.
Decisão sugerida: descartar (autobiográfico); no máximo uma linha de enquadramento.

### Agradecimentos e Sobre o Autor (PDF p.38-42)
Sem conteúdo técnico (nota de rodapé sobre programadoras em 1966 na p.38; bio do autor na p.42: programador desde 1970, autor de Código Limpo, O Codificador Limpo etc.).
Decisão sugerida: descartar.

### Parte I: Introdução (PDF p.43-45)
Resumo: fazer funcionar é fácil; fazer direito exige disciplina. Software bem feito exige só uma fração dos recursos humanos; mudanças são simples e rápidas, defeitos raros.
Conceitos e regras:
- Fazer o software funcionar uma vez não é difícil; fazer direito (estrutura correta) é difícil e exige conhecimento, disciplina e profissionalismo [p.43].
- Sinal de design ruim apontado pelo autor: sistema tão acoplado que qualquer mudança trivial leva semanas e envolve grandes riscos; efeitos em moral, confiança do cliente e paciência de gestores [p.44].
- Quando bem feito: esforço minimizado, funcionalidade e flexibilidade maximizadas [p.44].
O que este trecho NÃO diz: não define arquitetura nem técnicas; é argumento de abertura.
Relevância: clean-architecture-expert: BAIXA; Decisão: descartar (motivacional).

### Cap. 1: O que são Design e Arquitetura? (PDF p.46-56)
Resumo: Martin afirma que design e arquitetura são a mesma coisa (um contínuo de decisões do alto ao baixo nível). O objetivo da arquitetura é minimizar o esforço humano de construir e manter o sistema. Um estudo de caso com dados reais mostra custo por linha de código crescendo 40 vezes entre release 1 e 8, e a conclusão é que bagunça sempre atrasa, mesmo a curto prazo.
Conceitos e regras:
- Não há diferença entre "design" e "arquitetura"; detalhes de baixo nível e estrutura de alto nível formam um tecido contínuo (analogia com a planta de uma casa) [p.46-47].
- Objetivo da arquitetura de software: minimizar os recursos humanos necessários para construir e manter o sistema [p.48].
- Medida de qualidade do design = esforço necessário por mudança/demanda do cliente; se baixo e estável ao longo da vida do sistema, o design é bom; se cresce a cada release, é ruim [p.48].
- Estudo de caso (dados de empresa anônima, slides de Jason Gorman): equipe cresce, mas produtividade medida em linhas de código tende a uma assíntota (fig. 1.2), custo por linha cresce 40x do release 1 ao 8 (fig. 1.3), produtividade dos devs cai de quase 100% para perto de zero (fig. 1.4), folha mensal chega a US$20 milhões no release 8 (fig. 1.5) [p.48-52].
- Causas da bagunça: desenvolvimento apressado, número de programadores como único gerador de resultado, pouca preocupação com limpeza do código e estrutura do design [p.50].
- Mentira dos devs: "limpamos depois, primeiro lançamos"; a pressão de mercado nunca diminui, então nunca se limpa [p.53-54].
- Maior mentira: bagunça acelera no curto prazo e só atrasa no longo prazo; para o autor, fazer bagunça é sempre mais lento que manter limpo, em qualquer escala de tempo [p.54].
- Experimento de Jason Gorman: 6 dias, mesmo programa (inteiros para numerais romanos, aceitação pré-definida, menos de 30 min/dia), TDD nos dias 1, 3 e 5; dias com TDD cerca de 10% mais rápidos, e o dia mais lento com TDD foi mais rápido que o dia mais rápido sem TDD [p.54-55].
- Reescrever do zero é a "Lebre" falando de novo: o mesmo excesso de confiança reproduz a bagunça [p.55-56].
- Conclusão: levar a sério a qualidade da arquitetura e saber quais atributos da arquitetura minimizam esforço e maximizam produtividade [p.56].
Citações curtas de prova:
- "O objetivo da arquitetura de software é minimizar os recursos humanos necessários para construir e manter um determinado sistema." [p.48]
- "A única maneira de seguir rápido é seguir bem." [p.55]
- "Devido ao seu excesso de confiança, eles reformularão o projeto com a mesma bagunça do original." [p.56]
O que este trecho NÃO diz: não apresenta ainda nenhum princípio estrutural (SRP, Dependency Rule etc.). A afirmação sobre TDD é um único experimento de um desenvolvedor, de 6 execuções do mesmo exercício pequeno; o texto o apresenta como evidência, mas é amostra mínima. Os números são lidos das descrições dos gráficos; as figuras não foram extraídas (só legendas).
Relevância: clean-architecture-expert: MÉDIA-ALTA (objetivo/critério de qualidade e argumento de custo, útil como "por quê"); testing-tdd-expert: MÉDIA (argumento "TDD não é mais lento", com a ressalva da amostra mínima); clean-code-expert: BAIXA.
Decisão sugerida: usar em clean-architecture-expert (Mentalidade Principal: objetivo = minimizar esforço humano; sinais de degradação por release) e, com ressalva, em testing-tdd-expert (citar como relato, não como prova).

### Cap. 2: Um Conto de Dois Valores (PDF p.57-63)
Resumo: todo software entrega dois valores, comportamento e estrutura (arquitetura). O segundo é o maior, porque um sistema difícil de mudar fica inútil, enquanto um que não funciona mas é fácil de mudar pode ser consertado. Desenvolvedores devem lutar para que a arquitetura (importante, nunca urgente) não seja sacrificada em favor de features urgentes.
Conceitos e regras:
- Dois valores: comportamento (fazer a máquina satisfazer requisitos; corrigir bugs) e arquitetura (manter o software "soft", fácil de mudar) [p.57-58].
- A dificuldade de uma mudança deve ser proporcional ao escopo da mudança, não à sua forma; quando a forma do sistema não combina com a forma do pedido, o custo explode (analogia quebra-cabeça/peças quadradas em buracos redondos) [p.58-59].
- Arquiteturas devem ser tão agnósticas quanto praticável quanto à "forma" dos requisitos [p.59].
- Argumento dos extremos: programa funcional impossível de mudar fica inútil quando requisitos mudam; programa quebrado fácil de mudar pode ser consertado e mantido útil. Logo, arquitetura (mudabilidade) é o valor maior [p.60].
- Sistema "praticamente impossível de mudar" = custo da mudança excede o benefício; muitos sistemas chegam aí em alguns recursos [p.60].
- Gestores dirão que funcionalidade vem antes, mas ficarão furiosos quando a estimativa de uma mudança for altíssima [p.60-61].
- Matriz de Eisenhower: comportamento é urgente mas nem sempre importante; arquitetura é importante mas nunca urgente. Ordem de prioridade: (1) urgente e importante, (2) não urgente e importante, (3) urgente e não importante, (4) nem um nem outro. Arquitetura ocupa as posições 1 e 2 [p.61-62].
- Erro frequente: promover itens da posição 3 (features urgentes mas não importantes) à posição 1, ignorando a arquitetura [p.62].
- Gestores de negócio não estão equipados para avaliar a importância da arquitetura; é responsabilidade da equipe de desenvolvimento defendê-la; o desenvolvedor é stakeholder e deve lutar, em pé de igualdade, por isso (especialmente o arquiteto) [p.62-63].
- Se a arquitetura vem por último, o sistema fica progressivamente mais caro e a mudança acaba impossível [p.63].
Citações curtas de prova:
- "Todo sistema de software fornece dois valores diferentes para os stakeholders: comportamento e estrutura." [p.57]
- "A dificuldade em fazer tal mudança deve ser proporcional apenas ao escopo da mudança, e não à forma da mudança." [p.58-59]
O que este trecho NÃO diz: não dá critérios mensuráveis de quando priorizar arquitetura em relação a uma feature específica; o argumento dos extremos é retórico (o próprio autor admite que "programa impossível de mudar" é um extremo). Não diz que o comportamento é dispensável.
Relevância: clean-architecture-expert: ALTA (princípio-guia: arquitetura é o valor maior; escopo vs. forma; regra de priorização; papel do arquiteto); testing-tdd-expert: NENHUMA; clean-code-expert: BAIXA.
Decisão sugerida: usar em clean-architecture-expert (Mentalidade Principal e Regra Máxima; fluxo de priorização Eisenhower como argumento ao justificar investimento em estrutura).

### Parte II: Paradigmas da Programação, abertura (PDF p.64-65)
Resumo: arquitetura começa com código. Houve revolução de linguagens (assembler, compilador A0 de Grace Hopper 1951, Fortran 1953 etc.) e, mais significativa, de paradigmas: maneiras de programar relativamente independentes de linguagem; um paradigma diz quais estruturas usar e quando. Surgiram três, e o autor julga improvável surgir outro.
Conceitos e regras:
- Paradigma = maneira de programar, relativamente independente de linguagem; diz que estruturas usar e quando [p.65].
Relevância: clean-architecture-expert: BAIXA. Decisão: descartar além da definição.

### Cap. 3: Panorama do Paradigma (PDF p.66-70)
Resumo: cada paradigma é uma restrição: estruturada restringe transferência direta de controle (goto), OO restringe transferência indireta (ponteiros de função, via polimorfismo), funcional restringe atribuição. Todos "removem" capacidades, e esses três mapeiam as três grandes preocupações da arquitetura.
Conceitos e regras:
- Estruturada (Dijkstra, 1968): disciplina sobre a transferência direta de controle; substitui goto por if/then/else e do/while/until [p.66-67].
- OO (Dahl e Nygaard, 1966; pilha de chamadas ALGOL movida para heap): disciplina sobre a transferência indireta de controle; polimorfismo surge do uso disciplinado de ponteiros de função [p.67].
- Funcional (anterior à programação; cálculo-lambda de Church; LISP 1958): disciplina sobre a atribuição; imutabilidade [p.68].
- Padrão: cada paradigma remove uma capacidade (goto, ponteiros de função, atribuição) e diz o que não fazer; provavelmente não haverá um quarto paradigma; os três foram descobertos entre 1958 e 1968 [p.69].
- Relação com arquitetura: polimorfismo como mecanismo para cruzar limites arquiteturais; programação funcional para disciplinar localização e acesso a dados; programação estruturada como base algorítmica dos módulos. Alinham-se às três preocupações: função, separação de componentes, gerenciamento de dados [p.69].
Citações curtas de prova:
- "A programação orientada a objetos impõe disciplina sobre a transferência indireta do controle." [p.67]
- "A programação funcional impõe disciplina sobre a atribuição." [p.68]
O que este trecho NÃO diz: o detalhe de como o polimorfismo inverte dependências (isso vem no Cap. 5, só iniciado neste bloco, p.82). O texto extraído tem blocos em caixa-alta (p.67-68), apenas formatação de extração.
Relevância: clean-architecture-expert: MÉDIA (base conceitual: polimorfismo como mecanismo de limite; três preocupações arquiteturais); demais: BAIXA.
Decisão sugerida: usar em clean-architecture-expert como parágrafo curto de fundamentos (ou references/ de paradigmas), após ler Cap. 5 e 6.

### Cap. 4: Programação Estruturada (PDF p.71-80)
Resumo: Dijkstra tentou provar programas corretos matematicamente; para isso, descobriu que o goto irrestrito impede decomposição recursiva em unidades provadas, e que sequência, seleção e iteração bastam (Böhm e Jacopini). As provas formais nunca vingaram; o que ficou é uma abordagem científica: testes não provam correção, só refutam. A estruturada permite decompor em pequenas funções "testáveis por tentativa de refutação".
Conceitos e regras:
- Contexto biográfico de Dijkstra (p.71-72), sem conteúdo técnico.
- Problema: programas complexos têm mais detalhes do que o cérebro processa sem ajuda; detalhe despercebido causa falhas surpreendentes [p.73].
- Alguns usos de goto impedem decomposição recursiva em unidades menores (divisão e conquista, necessária para provas); os "bons" usos correspondem a seleção e iteração [p.73-74].
- Böhm e Jacopini: todo programa pode ser construído com sequência, seleção e iteração [p.74].
- Técnicas de prova: enumeração para sequência; reaplicação de enumeração para seleção; indução para iteração [p.74-75].
- Carta "Go To Considerada Prejudicial" (CACM, março de 1968) iniciou uma disputa de cerca de uma década; Dijkstra venceu, e goto desapareceu das linguagens [p.75]. Breaks rotulados e exceções não são o goto irrestrito [p.76].
- Decomposição funcional: módulos decompostos recursivamente em funções de alto nível e depois baixo nível; popularizou análise e design estruturados (Yourdon, Constantine, DeMarco, Page-Jones) nos anos 70-80 [p.76].
- As provas formais nunca vieram; a hierarquia euclidiana de teoremas nunca foi criada; poucos acreditam que provas formais sejam caminho para software de alta qualidade [p.77].
- Ciência: teorias são refutáveis e não comprováveis; o que não conseguimos refutar depois de muito esforço consideramos verdadeiro o suficiente. Matemática prova que é verdadeiro; ciência prova que é falso [p.77-78].
- Testes: "mostram a presença, não a ausência, de bugs"; teste pode provar incorreção, nunca correção; software é como ciência, não como matemática [p.78].
- Refutação só se aplica a programas "comprováveis" (por ex. sem goto irrestrito); a estruturada obriga a decompor em funções pequenas e testáveis [p.79].
- Em todos os níveis, da menor função ao maior componente, software é orientado pela refutabilidade; arquitetos buscam módulos, componentes e serviços facilmente testáveis (por negação do correto), usando disciplinas restritivas análogas à estruturada em nível mais alto [p.79].
Citações curtas de prova:
- "Os testes mostram a presença, não a ausência, de bugs." [p.78]
- "o software é como uma ciência. Demonstramos a exatidão quando falhamos em comprovar a inexatidão" [p.78, trecho de frase, até 25 palavras]
O que este trecho NÃO diz: não prescreve nenhuma técnica de teste (pirâmide, tipos de teste, TDD); não fala de testes por camada; "programa comprovável" é definido pelo tradutor numa nota (p.80) como "programa que apresenta algum resultado", definição pouco rigorosa (possivelmente imprecisão da tradução). Nenhuma regra operacional de design de componentes aqui.
Relevância: testing-tdd-expert: MÉDIA (fundamento epistemológico: testes refutam, não provam; testabilidade como propriedade arquitetural; relaciona estrutura ao teste); clean-architecture-expert: MÉDIA (testabilidade como critério de módulos/componentes/serviços; decomposição funcional como prática); clean-code-expert: BAIXA.
Decisão sugerida: usar em testing-tdd-expert (Mentalidade Principal: teste como refutação, sem garantia de correção) e em clean-architecture-expert (testabilidade como critério arquitetural, citada brevemente).

### Cap. 5: Programação Orientada a Objetos (PDF p.81-82) [continua no próximo bloco]
Resumo (parcial): o autor afirma que a base da boa arquitetura é a compreensão e aplicação dos princípios do design OO. Critica as definições comuns de OO e começa a examinar encapsulamento. O texto do bloco termina na p.82, no início de "Encapsulamento?".
Conceitos e regras:
- Definição "dados e funções combinados" é insatisfatória: implica que o.f() difere de f(o), o que o autor considera absurdo; programadores já passavam estruturas a funções antes de 1966 [p.82].
- Definição "modelar o mundo real" é evasiva e vaga [p.82].
- Três "palavras mágicas" frequentemente citadas: encapsulamento, herança, polimorfismo; o capítulo vai examiná-las uma a uma [p.82].
- Encapsulamento citado como parte da definição porque linguagens OO permitem encapsular dados e funções, formando um limite em torno de um conjunto coeso, onde fora dele os dados ficam ocultos [p.82, truncado].
Citações curtas de prova:
- "Como veremos, a base de uma boa arquitetura é a compreensão e aplicação dos princípios do design orientado a objetos (OO)." [p.81]
O que este trecho NÃO diz: ainda não traz a tese do capítulo sobre polimorfismo e inversão de dependência (fica para o bloco 02); o trecho sobre encapsulamento está truncado.
Relevância: clean-architecture-expert: ALTA (será continuação com polimorfismo e inversão de dependência no próximo bloco); neste bloco, só enquadramento.
Decisão sugerida: aguardar o bloco 02 para extrair o conteúdo; nada a usar deste fragmento além da crítica às definições de OO.

## Checklist de cobertura
- Primeira página lida: 1
- Última página lida: 82 (confirmada: último marcador do arquivo é "PDF PAGINA 82", linha 2086; arquivo lido até a linha 2123)
- Páginas sem texto útil ou ilegíveis: 1-3 e 22 vazias; 4-21 e 38-42 são créditos/copyright/dedicatória/bio sem conteúdo técnico; 6-20 trazem uma única linha cada (lista de equipe editorial)
- Problemas de extração observados: figuras (1.1 a 1.6, 2.1) não extraídas, só legendas, então os números dos gráficos vêm do texto corrido; trechos em CAIXA ALTA nas p.67-68 (formatação de extração); ligaduras "fi" aparecem como "ﬁ" (ex.: "conﬁança"), tratadas como equivalentes; "Princple" no sumário é erro do original; nota de rodapé 2 da p.80 do tradutor sobre "programa comprovável"; numeração impressa de página ausente
- Capítulos/seções cobertos integralmente: Prefácio, Apresentação, Parte I Introdução, Cap. 1, Cap. 2, abertura da Parte II, Cap. 3, Cap. 4
- Capítulos/seções que continuam em outro bloco: Cap. 5 (OO) começa na p.81 e é truncado na p.82 em "Encapsulamento?"

## Auditoria da skill atual
