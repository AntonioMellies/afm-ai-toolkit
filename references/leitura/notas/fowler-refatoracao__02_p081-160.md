# Notas: Fowler, Refatoração (2ª ed., JS), bloco 02, PDF p.81-160

Observação geral: números impressos de página não são visíveis no texto extraído; só se usa a "PDF PAGINA N". Citações curtas apenas; o restante é paráfrase.

---

### Cap. 2 (continuação): Princípios de refatoração, seções "Quando refatorar" (final) até "Indo além" (PDF p.81-106) [continua do bloco anterior]
Resumo: Fecha a discussão de quando refatorar (oportunista, não planejada; preparatória; em revisão de código), trata de objeções e custos (gerente, tempo, donos de código, branches, testes, legado, bancos de dados), a relação com arquitetura/Yagni, processo ágil/XP, desempenho, história da prática e ferramentas automatizadas. A tese central: refatorar é decisão econômica, para ir mais rápido, e depende de código autotestável + integração contínua.

Conceitos e regras:

**Quando refatorar (final) [p.81-83]**
- Código excelente também precisa de refatoração: as decisões de design corretas para as funcionalidades de ontem podem não servir às de hoje; código claro facilita rever essas decisões. [p.81]
- Dica de Kent Beck: antes de cada mudança, tornar a mudança fácil (pode ser difícil) e só então fazer a mudança fácil. [p.81]
- Software nunca está "pronto"; muitas vezes o caminho mais rápido para uma funcionalidade nova é alterar o código existente para acomodá-la. [p.81]
- Refatoração planejada (equipe que a negligenciou, área problemática que cresceu) é legítima, mas deve ser rara; a maior parte deve ser não planejada e oportunista. [p.81]
- Separar refatoração e funcionalidade em commits distintos: vantagem é revisão independente, mas o autor não está convencido; refatoração costuma estar entrelaçada com a funcionalidade e separar pode tirar o contexto que justifica o commit. Cada equipe deve experimentar; não é princípio evidente. [p.81-82]
- Refatoração de longo prazo: em vez de equipe dedicada, combinar de avançar gradualmente; cada pessoa que toca código na "zona de refatoração" o move um pouco na direção desejada, aproveitando que cada passo mantém o sistema funcionando. Ex.: trocar biblioteca introduzindo uma abstração/interface sobre ambas, depois trocar (Branch By Abstraction). [p.82]
- Refatorar em code review: revisão disseminar conhecimento e ajuda a escrever código claro; refatorar durante a revisão materializa sugestões e permite ver o resultado em vez de imaginar, gerando "segundo nível de ideias". [p.82-83]
- Modelo de pull request com revisor sem o autor funciona mal; melhor sentar lado a lado com o autor e refatorar juntos; a conclusão lógica é pair programming (revisão contínua). [p.83]

**O que dizer ao gerente / quando não refatorar [p.83-85]**
- Para gerentes técnicos, a refatoração se justifica pela hipótese da estamina no design; eles devem incentivá-la e procurar sinais de que a equipe faz pouco. É muito mais raro faltar refatoração do que haver excesso. [p.84]
- Conselho controverso do autor para gerentes sem conhecimento técnico: não contar; refatorar é parte de construir software rápido (preparar antes de adicionar função; entender o código para corrigir bug). [p.84]
- Semanas de "refatoração pura" no cronograma, que na verdade são reestruturação descuidada que quebra o código, fazem a palavra virar palavrão. [p.84]
- Quando NÃO refatorar: código confuso que não precisa ser modificado (ex.: tratado como API) pode ficar feio; só compensa se for preciso entender o código. [p.84]
- Reescrever vs. refatorar: decisão que exige julgamento e experiência; muitas vezes só se sabe a dificuldade após tentar. Não há regra simples. [p.84-85]

**Problemas com refatoração [p.85-90]**
- Propósito: programar mais rápido, mais valor com menos esforço. Há trade-off real: se a refatoração grande é desproporcional à funcionalidade pequena, pode-se só adicionar a funcionalidade. [p.85]
- Mais propenso a refatorar: se a refatoração preparatória facilita a mudança, se o problema já foi visto antes (às vezes é preciso ver código feio duas vezes); menos propenso: código raramente tocado, ou quando não se sabe qual melhoria fazer (então experimenta). [p.85-86]
- Evidência de mercado: pouca refatoração é muito mais comum que refatoração demais; desenvolvedores também sacrificam refatoração por velocidade; líder técnico deve mostrar que valoriza a saúde do código. [p.86]
- O argumento mais perigoso é justificar refatoração por "código limpo"/"boas práticas"/motivos morais; o ponto é puramente econômico (mais rápido para adicionar funcionalidades e corrigir bugs). [p.86]
- Dono do código: fronteiras de propriedade impedem mudanças que quebram clientes. Para interface publicada: usar Renomear função mantendo a declaração antiga como passagem (wrapper), marcar como obsoleta e remover com o tempo (às vezes indefinidamente). [p.87]
- Preferência do autor: equipe como dona do código (qualquer membro altera), responsabilidade individual significa monitorar mudanças, não bloqueá-las. Entre equipes, modelo estilo open source (enviar branch/commit para aprovação) permite que a equipe dona altere também os clientes e apague declarações antigas. [p.87-88]
- Branches: feature branches longos pioram a integração; o problema difícil são conflitos semânticos que o merge textual não vê (ex.: renomear função em um branch enquanto outro adiciona chamada à função antiga). Merge (unidirecional) difere de integração (bidirecional). [p.88-89]
- Custo de integrar cresce rápido com a idade do branch (4 semanas é o dobro de 2). Alternativa: CI / Trunk-Based Development, com integração à linha principal pelo menos uma vez por dia; exige práticas para manter a mainline saudável, dividir funcionalidades grandes e usar feature toggles. [p.89]
- Razão principal de preferir CI: é muito mais compatível com refatoração (várias pequenas mudanças espalhadas são propensas a conflitos semânticos); equipes com feature branches longos chegam a parar de refatorar. Feature branches de vida curta e open source ainda são aceitáveis; evidência objetiva (Forsgren et al.) de que CI melhora entrega. [p.89-90]
- Testes: refatoração não altera o comportamento observável; erros acontecem, o essencial é detectá-los rápido. Isso exige suíte abrangente e rápida, ou seja, código autotestável; mudança pequena + testes frequentes = poucas linhas para investigar; se falhar sem achar, voltar à última versão boa pelo controle de versões. [p.90-91]
- Alternativa quando faltam testes: usar apenas refatorações automatizadas de forma comprovadamente segura (IDE); também existem refatorações "seguras por procedimento" específicas de linguagem para bases com pouca cobertura (o autor não detalha). [p.91]
- Código autotestável está ligado a CI (detecta conflitos semânticos de integração), à XP e à Entrega Contínua. [p.91]
- Código legado: refatoração ajuda a entender sistema legado, mas sem testes não dá para refatorar com segurança; adicionar testes é difícil porque o sistema raramente foi projetado para teste. Remete a Feathers: encontrar "linhas de junção" (seams) onde inserir testes; criar essas junções envolve refatoração sem testes (arriscado, mas necessário); refatorações automatizadas seguras ajudam. [p.92]
- Mesmo com testes, não tentar limpar o legado de uma vez; melhorar em partes cada vez que se passa por uma seção (deixar o acampamento mais limpo), mais nas áreas visitadas com frequência. [p.92-93]
- Bancos de dados: refatoração de banco evolucionária (Sadalage): combinar mudanças estruturais no esquema + código de acesso + scripts de migração de dados versionados; executar todos os scripts entre a versão atual e a desejada. Cada mudança pequena e completa. [p.93]
- Renomear campo no banco em várias versões de produção: 1) adicionar campo novo sem usar; 2) atualizar escrita para gravar nos dois; 3) migrar leituras gradualmente; 4) só depois de todos migrarem e de esperar bugs aparecerem, remover o campo antigo. É o padrão de mudança em paralelo (expansão-contração). [p.93-94]

**Refatoração, arquitetura e Yagni [p.94-96]**
- Refatoração muda a visão de arquitetura: permite alterar significativamente a arquitetura de software já em produção; o problema de definir arquitetura antes de programar é supor que os requisitos são compreendidos cedo, o que raramente ocorre. [p.94]
- Recursos de flexibilidade especulativos (muitos parâmetros etc.) não são grátis: complicam o caso atual e frequentemente estão errados, atrasando a reação a mudanças. [p.94-95]
- Estratégia: implementar só as necessidades atuais com ótimo design e refatorar quando as necessidades mudarem. Incluir livremente o que não aumenta complexidade (funções pequenas e bem nomeadas); recurso de flexibilidade que complica deve provar eficácia antes. Ex.: se chamadores não variam um parâmetro, não o adicione; se precisar depois, Parametrizar função é fácil. Só adiciona flexibilidade agora se refatorar depois for significativamente mais difícil. [p.95]
- Nomes: design simples, design incremental, Yagni ("You Aren't Going to Need It"). Yagni não é abandonar o raciocínio sobre arquitetura; desloca o ponto de equilíbrio para resolver problemas mais tarde, quando melhor compreendidos; leva à arquitetura evolucionária. [p.95-96]

**Refatoração e processo de desenvolvimento [p.96-97]**
- Eficácia da refatoração depende de outras práticas da equipe (XP: CI, código autotestável, refatoração; os dois últimos dão origem ao TDD). A primeira base é código autotestável = suíte automatizada que falha se o programador errar. [p.96]
- Sinergia entre código autotestável, CI e refatoração; com elas se pode adotar Yagni; refatoração e Yagni se reforçam (sistema simples é mais fácil de mudar). Em cima disso vem Entrega Contínua. [p.97]

**Refatoração e desempenho [p.97-101]**
- Refatorar pode deixar o código mais lento, mas o torna mais ajustável; a chave (exceto tempo real rígido) é escrever software ajustável primeiro e depois ajustar para velocidade suficiente. [p.98]
- Três abordagens: time budgeting (tempo real rígido, ex. marcapasso), atenção constante (comum, mas não funciona bem: melhorias de performance dispersas dificultam o código, sem ganho real) e a terceira (preferida): código bem fatorado, sem atenção a desempenho, até um exercício deliberado de otimização. [p.98-100]
- Processo de otimização: rodar profiler, focar nos pontos críticos (a maior parte do tempo está numa pequena fração do código; otimizar tudo desperdiça ~90%), mudanças em passos pequenos; após cada passo compilar, testar e rodar o profiler de novo; se não melhorou, desfazer. [p.100-101]
- Caixa de Ron Jeffries: especulou-se sobre a causa da lentidão, mas o profiler mostrou algo totalmente diferente (criação de intervalos de datas vazios); extrair factory para intervalo vazio e devolver constante dobrou a velocidade em ~5 min. Lição: medir, não especular. [p.98-100]
- Código bem fatorado ajuda na otimização: libera tempo (funcionalidades mais rápidas) e dá granularidade ao profiler (partes menores, mais fáceis de ajustar). [p.101]

**História e ferramentas [p.101-105]**
- Origem: Ward Cunningham e Kent Beck (Smalltalk), Ralph Johnson (frameworks), Bill Opdyke (primeira tese sobre refatoração, C++), John Brant e Don Roberts (Smalltalk Refactoring Browser). Fowler motivou-se ao ver Beck refatorar. Efeito colateral da popularidade: "refatoração" passou a designar qualquer reestruturação. [p.101-103]
- Refatoração automatizada: busca/substituição textual é grosseira, exige testes; ferramentas corretas operam na árvore sintática (AST) e precisam re-renderizar o código. [p.104]
- Tipagem estática torna refatorações como Renomear função seguras (resolve o método para a classe correta); sem tipagem, a ferramenta lista pontos de chamada e o usuário escolhe. Ferramentas oferecem também atualizar comentários e substituir duplicatas por chamada ao extrair função. [p.104-105]
- Limites: chamadas reflexivas (ex. Method.invoke) dificultam; mesmo assim, rodar a suíte com frequência. Language Servers expõem AST/refatoração para editores de texto. [p.105]
- Leituras citadas: Refactoring Workbook (Wake), Refatoração para padrões (Kerievsky), Refactoring Databases (Ambler & Sadalage), Refatorando HTML (Harold), Trabalho eficaz com código legado (Feathers), livro Ruby (Fields et al.). [p.106]

Citações curtas de prova:
- "Para cada mudança desejada, faça a mudança ser fácil (aviso: isso pode ser difícil), e então faça a fácil mudança." (Kent Beck) [p.81]
- "O principal propósito da refatoração é fazer com que programemos mais rápido, agregando mais valor com menos esforço." [p.85]
- "O ponto principal da refatoração não é mostrar como uma base de código é bonita, mas, sim, uma questão puramente econômica." [p.86]
- "mesmo que você saiba exatamente o que está acontecendo em seu sistema, faça medições de desempenho, não especule." (Ron Jeffries) [p.100]

O que este trecho NÃO diz: não lista refatorações nem smells aqui; não ensina como adicionar testes a legado (só remete a Feathers); não detalha as "refatorações seguras" de linguagem específica; não dá métricas para decidir refatorar vs. reescrever; não dá regra para commits separados.

Relevância para os artefatos candidatos:
- refactoring-expert: ALTA, quando/quando não refatorar, refatoração oportunista/preparatória, trade-offs, refatoração em paralelo (expansão-contração), Branch By Abstraction, refatorar com interface publicada (wrapper + deprecação), desempenho (medir antes), refatoração automatizada vs. manual.
- testing-tdd-expert: MÉDIA, testes como rede de segurança, relação CI/TDD/refatoração, "voltar ao verde"; o conteúdo central está no cap. 4 abaixo.
- api-design-expert: MÉDIA, interface publicada e dono do código: manter declaração antiga como passagem, depreciar, remover depois; mudança em paralelo para banco/contratos.
- code-review-expert: MÉDIA, refatorar durante a revisão ao lado do autor, pull request sem autor funciona mal.
Decisão sugerida: usar em refactoring-expert (princípios, economia, quando não refatorar, desempenho, mudança em paralelo, branches/CI); secundário em testing-tdd-expert (seção de testes/legado), api-design-expert (interface publicada) e code-review-expert (refatorar em revisão).

---

### Cap. 3: "Maus cheiros" no código (Kent Beck e Martin Fowler) (PDF p.107-125)
Resumo: Catálogo de 24 sinais de que uma refatoração é desejável, cada um com sugestão das refatorações a aplicar. Os autores dizem que não há métricas exatas (limites de tamanho etc.); vale a intuição bem fundamentada. O capítulo deve servir de inspiração: identificar o cheiro e consultar as refatorações sugeridas. (Ordem do texto.)

Conceitos e regras (cada item: o que é; refatorações sugeridas no texto):
1. **Nome misterioso** [p.108]: nomes de funções, módulos, variáveis, classes não comunicam o que fazem/como se usam. Motivação: bons nomes são essenciais; dificuldade de nomear costuma sinalizar problema de design mais profundo. Refatorações: Mudar declaração de função, Renomear variável, Renomear campo.
2. **Código duplicado** [p.108-109]: mesma estrutura em mais de um lugar; leitor precisa comparar cópias e alterar todas. Refatorações: Extrair função; Deslocar instruções (para aproximar trechos parecidos antes de extrair); Subir método (duplicata em subclasses de base comum).
3. **Função longa** [p.109-111]: funções pequenas vivem melhor; o essencial é a boa nomeação (distância semântica entre o que e como). Heurística: sempre que se sente necessidade de comentar, escrever uma função com nome pela intenção (mesmo uma linha). Em 99% dos casos basta Extrair função. Muitos parâmetros/temporárias: Substituir variável temporária por consulta; Introduzir objeto de parâmetros; Preservar objeto inteiro; em último caso Substituir função por comando. Comentários indicam onde extrair; condicionais: Decompor condicional; switch longo: extrair ramos; vários switches para a mesma condição: Substituir condicional por polimorfismo; laços: extrair o laço, se difícil de nomear provavelmente faz duas coisas, então Dividir laço.
4. **Lista longa de parâmetros** [p.111]: confunde. Refatorações: Substituir parâmetro por consulta (parâmetro derivável de outro); Preservar objeto inteiro; Introduzir objeto de parâmetros (dados que andam juntos); Remover argumento de flag; Combinar funções em classe (valores comuns viram campos).
5. **Dados globais** [p.111-112]: modificáveis de qualquer ponto, sem rastro de quem alterou; inclui variáveis de classe e singletons; mais perigosos quando mutáveis. Defesa: Encapsular variável (primeiro passo) e limitar escopo (módulo/classe).
6. **Dados mutáveis** [p.112-113]: atualizações geram efeitos inesperados, mais risco com escopo maior. Refatorações: Encapsular variável; Separar variável; Deslocar instruções e Extrair função (isolar código sem efeito colateral); Separar consulta de modificador; Remover método de escrita; Substituir variável derivada por consulta (dado mutável calculável em outro lugar); Combinar funções em classe / em transformação (limitar quem atualiza); Mudar referência para valor (substituir estrutura em vez de modificar in-place).
7. **Alteração divergente** [p.114]: um módulo muda de formas diferentes por motivos diferentes (ex.: novo banco de dados e novo instrumento financeiro mexem no mesmo módulo). Separar contextos. Refatorações: Separar em fases (se forma sequência); Mover função (ida e volta); Extrair função antes de mover (se misturadas); Extrair classe.
8. **Cirurgia com rifle** [p.114-115]: oposto da anterior; cada mudança exige muitas pequenas edições em várias classes. Refatorações: Mover função, Mover campo; Combinar funções em classe; Combinar funções em transformação; Separar em fases; tática: Internalizar função / Internalizar classe para juntar lógica espalhada (cria Função Longa/Classe Grande intermediária) e depois extrair.
9. **Inveja de recursos** [p.115-116]: função fala mais com outro módulo do que com o seu (ex.: vários getters de outro objeto). Refatorações: Mover função; se só parte, Extrair função e mover. Heurística: colocar a função no módulo que tem a maior parte dos dados que ela usa. Exceções: Strategy, Visitor, Self Delegation (regra geral: agrupar o que muda junto).
10. **Agrupamentos de dados** [p.116-117]: mesmos 3-4 dados aparecem juntos como campos ou parâmetros. Refatorações: Extrair classe (campos), depois Introduzir objeto de parâmetros ou Preservar objeto inteiro. Teste: se apagar um dos dados, os outros ainda fazem sentido? Se não, é um objeto pedindo para nascer; preferir classe a registro simples para atrair comportamento (inveja de recursos).
11. **Obsessão por primitivos** [p.117]: uso de primitivos onde caberiam tipos do domínio (moeda, coordenadas, intervalos, unidades; telefone como string, "stringly typed"; `if (a < upper && a > lower)`). Refatorações: Substituir primitivo por objeto; se for código de tipo com condicional: Substituir código de tipos por subclasses + Substituir condicional por polimorfismo; grupos: Extrair classe + Introduzir objeto de parâmetros.
12. **Switches repetidos** [p.118]: a mesma lógica condicional (switch ou cascata if/else) em vários lugares; cada nova cláusula obriga a achar todos. Refatoração: Substituir condicional por polimorfismo. Os autores não são contra toda condicional; a edição anterior tinha "instruções switch" e a ênfase mudou para a repetição.
13. **Laços** [p.118-119]: com funções de primeira classe, laços são anacrônicos. Refatoração: Substituir laço por pipeline (filter, map) para ver rapidamente elementos e o que se faz com eles.
14. **Elemento ocioso** [p.119]: função cujo corpo é igual ao nome, classe com uma função simples, estrutura que não paga seu custo. Refatorações: Internalizar função, Internalizar classe, Condensar hierarquia.
15. **Generalidade especulativa** [p.119-120]: ganchos e casos especiais "para o futuro". Refatorações: Condensar hierarquia (classes abstratas inúteis); Internalizar função/classe (delegação desnecessária); Mudar declaração de função (parâmetros não usados). Sinal: os únicos usuários são casos de teste; então apagar o teste e aplicar Remover código morto. Nome dado por Brian Foote.
16. **Campo temporário** [p.120]: campo definido só em certas circunstâncias; difícil de entender. Refatorações: Extrair classe para os campos órfãos; Mover função; Introduzir caso especial (classe alternativa para quando os campos não são válidos).
17. **Cadeias de mensagens** [p.120-121]: cliente navega objeto a objeto (getThis...) e fica acoplado à estrutura. Refatoração: Ocultar delegação (em qualquer ponto da cadeia, risco de gerar middle man). Alternativa melhor: ver para que o objeto final é usado, Extrair função do código que o usa e Mover função para dentro da cadeia; se vários clientes percorrem o mesmo caminho, adicionar método. Os autores dizem manter moderação.
18. **Intermediário** [p.121]: classe cujos métodos metade delegam para outra. Refatorações: Remover intermediário; Internalizar função (poucos métodos); Substituir superclasse por delegação / Substituir subclasse por delegação (se houver comportamento adicional).
19. **Trocas escusas** [p.121-122]: módulos trocam dados demais ("cochicham"), acoplamento oculto. Refatorações: Mover função, Mover campo; terceiro módulo para o interesse comum; Ocultar delegação; em herança (subclasses sabem demais), Substituir subclasse/superclasse por delegação.
20. **Classe grande** [p.122]: faz demais; sinal: campos demais (e duplicação), prefixos/sufixos comuns em subconjunto de campos (ex.: depositAmount, depositCurrency). Refatorações: Extrair classe; Extrair superclasse; Substituir código de tipos por subclasses; eliminar redundância dentro da classe (5 métodos de 100 linhas viram 5 de 10 + 10 de 2); clientes mostram subconjuntos de uso que sugerem classes separadas.
21. **Classes alternativas com interfaces diferentes** [p.122-123]: classes intercambiáveis só funcionam com mesma interface. Refatorações: Mudar declaração de função (alinhar), Mover função até protocolos iguais, Extrair superclasse (se houver duplicação).
22. **Classe de dados** [p.123]: só campos e getters/setters, manipulada em excesso por outras classes; frequentemente comportamento no lugar errado. Refatorações: Encapsular registro (campos públicos), Remover método de escrita, Mover função / Extrair função e mover. Exceção: registro de resultado imutável (ex.: saída de Separar em fases), que não precisa de encapsulamento.
23. **Herança recusada** [p.123-124]: subclasse não quer parte do que herda. Tradicional: criar classe irmã e Descer método / Descer campo. Os autores relativizam: usam subclasses para reutilizar comportamento; cheiro costuma ser sutil ("nove de cada dez vezes"); mais grave quando recusa a interface da superclasse; nesse caso Substituir subclasse por delegação ou Substituir superclasse por delegação.
24. **Comentários** [p.124-125]: não são cheiro ruim; são desodorante quando explicam código ruim. Refatorar primeiro: Extrair função; Mudar declaração de função (renomear); Introduzir asserção (regras de estado). Boa hora para comentar: incerteza, e o porquê de uma decisão.

Citações curtas de prova:
- "nenhum conjunto de métricas é páreo para a intuição humana bem fundamentada." [p.108]
- "sempre que sentimos a necessidade de comentar algo, escrevemos uma função em seu lugar." [p.110]
- "Quando sentir necessidade de escrever um comentário, experimente refatorar o código antes, de modo que qualquer comentário se torne supérfluo." [p.125]
- "A regra geral básica é colocar junto aquilo que muda junto." [p.116]

O que este trecho NÃO diz: não dá limites numéricos (linhas, parâmetros, campos); não traz exemplos de código nos cheiros; não explica a mecânica das refatorações citadas (vem nos capítulos do catálogo); não é uma lista de nomes em inglês (traduções PT-BR com o termo inglês só nas refatorações).

Relevância para os artefatos candidatos:
- refactoring-expert: ALTA, catálogo de smells com refatoração-alvo para cada um (base direta para uma tabela smell -> refatoração).
- code-review-expert: ALTA, smells como critério de revisão; heurísticas (comentário = sinal, switch repetido, dados mutáveis, mover o que muda junto).
- testing-tdd-expert: BAIXA, só menciona generalidade especulativa detectada por código usado só em testes.
- api-design-expert: MÉDIA, Lista longa de parâmetros, Argumento de flag, Separar consulta de modificador, Classe de dados, Cadeias de mensagens (acoplamento à estrutura).
Decisão sugerida: usar em refactoring-expert (references/smells.md com os 24 itens, sinal + refatoração sugerida) e em code-review-expert (checklist de smells).

---

### Cap. 4: Escrevendo testes (PDF p.126-144)
Resumo: Argumenta que código autotestável é pré-requisito da refatoração e aumenta a produtividade (menos depuração), e mostra, com Mocha/Chai e um exemplo de província/produtores, como começar a escrever testes unitários em JavaScript: fixtures, falha injetada, beforeEach, foco em risco, limites. Termina com orientações sobre quantidade de testes, cobertura e o que fazer ao receber um bug.

Conceitos e regras:
- A maior parte do tempo de um programador é depuração; o autotestável reduz isso. O estímulo inicial foi a ideia de que classes devem conter seus próprios testes; testes que imprimem saída para conferência manual são maçantes, então a comparação deve ser feita pelo computador, que imprime só "OK". [p.126-127]
- Regra: testes totalmente automatizados que verificam os próprios resultados. [p.127]
- Rodar testes a cada compilação: um bug novo detectado cai em poucos minutos de código novo; bugs de regressão levam minutos em vez de uma hora ou mais; suíte = detector de bugs. [p.127]
- Escrever testes logo após cada pequena função; frameworks xUnit nasceram de JUnit (Beck e Gamma). Testes automatizados são divertidos, manuais são maçantes. [p.127-128]
- Escrever os testes antes de programar: ajuda a pensar no que deve ser feito, foca na interface e não na implementação, e define quando terminar (teste passa). TDD: ciclo rápido de teste que falha, código para passar, refatoração (muitas vezes por hora). [p.128]
- Às vezes é preciso tornar código existente autotestável antes de refatorar. [p.129]
- Exemplo: lógica de negócios (Province, Producer) separada da UI; começa-se pelo caso mais simples (sem UI, persistência ou serviços externos); separar lógica de negócios da UI é boa ideia em geral para pensar nela e testá-la. [p.129-130]
- Teste inicial com Mocha: describe/it, fixture (dados e objetos para o teste) e verificação (assert). Strings descritivas: só o suficiente para identificar o teste quando falha. [p.132-133]
- Regra: garantir que o teste falha quando deve. Ver cada teste falhar ao menos uma vez injetando falha temporária no código (ex.: multiplicar por 2). [p.133-134]
- Execução frequente: testes do código em que se trabalha a cada poucos minutos; todos os testes no mínimo uma vez por dia. Feedback simples é essencial. [p.134]
- Biblioteca de asserção (Chai): estilo assert ou expect. "Barra verde/vermelha": nunca refatorar com barra vermelha; "volte para o verde" = desfazer mudanças recentes até o último estado verde (checkpoint do controle de versões). [p.134-135]
- Testes orientados a risco: testar tudo que a classe deve fazer e as condições que podem fazê-la falhar, não todos os métodos públicos; não testar getters/setters triviais. Escrever testes em excesso leva a não escrever o suficiente. Regra: é melhor escrever e executar testes incompletos do que não executar testes completos. [p.135-136]
- Padrão para testar código existente: escrever com placeholder no valor esperado, substituir pelo valor produzido pelo código (confiando que o código atual está certo), injetar falha, remover a falha. [p.136]
- Duplicação nos testes também é suspeita; mas NÃO usar fixture compartilhado no escopo externo (const guarda só a referência; o objeto pode ser mutado, gerando testes interdependentes, não determinísticos, que dependem da ordem). Usar beforeEach para criar fixture novo a cada teste (mantém isolamento; dá teardown de graça). Fixture compartilhado só se for imutável ou muito caro de criar. A presença de beforeEach sinaliza ao leitor o fixture padrão. [p.136-138]
- Fases do teste: setup-exercise-verify = given-when-then = arrange-act-assert; mais uma implícita: teardown. [p.138-139]
- Regra geral: uma verificação por it, porque o teste falha na primeira falha e oculta informação; aceitável juntar verificações intimamente ligadas. [p.139]
- Limites: além do caminho feliz, testar coleção vazia, zero, negativos, string vazia no lugar de número; pensar como "inimigo" do código. Testes de limites levantam questões de domínio (demanda negativa deveria dar lucro negativo? setter deveria lançar erro ou zerar?). [p.139-141]
- Diferença entre falha (asserção) e erro (exceção em outra fase, como na configuração); frameworks distinguem. [p.141]
- Entrada inválida (ex.: producers como string): decidir se validar. Entre módulos da mesma base confiável, validação demais duplica verificações; para entrada externa (ex.: JSON de requisição) validar e testar. Para refatorar, um erro fora do comportamento observável pode ser descartado; para que falhe mais cedo, Introduzir asserção (não testar asserções, elas já são uma forma de teste). [p.141-142]
- Não deixar o medo de não pegar todos os bugs impedir de pegar a maioria; lei dos retornos decrescentes; focar onde há risco/complexidade; completar a suíte à medida que refatora. [p.142]
- Testes de unidade (pequena área, rápidos) são a espinha dorsal; existem outros (integração, vários níveis, desempenho). Arquiteturas são julgadas pela testabilidade. [p.143]
- Testes evoluem: refatorar testes também; ao receber relatório de bug, escrever primeiro um teste de unidade que o exponha, depois corrigir; perguntar que lacunas o bug revela. [p.143]
- Quantos testes bastam: não há boa medida; cobertura só serve para achar código não testado, não para avaliar qualidade; a melhor medida é subjetiva: confiança de que, se alguém introduzir um defeito, algum teste falhará. Sinal de testes em excesso: gastar mais tempo alterando testes do que o código testado e sentir lentidão; mas é raro frente à falta de testes. [p.143-144]
- Evitar chamadas diretas ao relógio do sistema (Clock Wrapper) para não gerar testes não determinísticos (mencionado no cap. 6, p.153).

Citações curtas de prova:
- "Garanta que os testes sejam totalmente automatizados e que verifiquem os próprios resultados." [p.127]
- "Sempre garanta que um teste falhará quando deve falhar." [p.133]
- "É melhor escrever e executar testes incompletos do que não executar testes completos." [p.136]
- "Ao receber o relatório de um bug, comece escrevendo um teste de unidade que exponha o bug." [p.143]
- "qual é o seu nível de confiança de que, caso alguém introduza um defeito no código, algum teste falhará?" [p.144]

O que este trecho NÃO diz: não detalha TDD (só cita o ciclo e recomenda); não cobre mocks/stubs/test doubles, testes de integração ou de UI, nem pirâmide de testes; não define metas numéricas de cobertura; não ensina a criar seams em legado; exemplos usam Mocha/Chai (adaptar a outro framework).

Relevância para os artefatos candidatos:
- testing-tdd-expert: ALTA, código autotestável, ciclo TDD, regras práticas (falha injetada, fixture isolado, orientado a risco, limites, bug -> teste primeiro, medida subjetiva de confiança, cobertura só acha buracos).
- refactoring-expert: ALTA, testes como rede de segurança, "nunca refatorar com barra vermelha", voltar ao verde, adicionar testes antes de refatorar código sem testes (padrão placeholder).
- code-review-expert: BAIXA a MÉDIA, critério de revisão de testes (isolamento, determinismo, uma verificação por it).
- api-design-expert: NENHUMA/BAIXA, arquiteturas julgadas por testabilidade (menção breve).
Decisão sugerida: usar em testing-tdd-expert (references com regras e padrões) e em refactoring-expert (pré-requisito de testes); descartar o código específico de Mocha/Chai ou usá-lo só como ilustração neutra.

---

### Cap. 5: Apresentação do catálogo (PDF p.145-147)
Resumo: Explica o formato padrão das refatorações do catálogo e os critérios de escolha. Metadados: o catálogo veio de anotações pessoais do autor.

Conceitos e regras:
- Formato com cinco partes: Nome (vocabulário; lista aliases), Esboço (código antes/depois + diagrama, só para lembrar), Motivação (por que e quando não fazer), Procedimento (passos concisos e mínimos, que também funcionam como checklist de casos especiais), Exemplos (simples, didáticos). [p.145-146]
- Filosofia do procedimento: passos bem pequenos e teste após cada passo; o autor na prática dá passos maiores, mas se aparece um bug desfaz o último passo e volta aos menores; quanto mais complicada a situação, menores os passos. Há mais de uma forma de fazer; o procedimento listado é o que funciona bem na maioria dos casos. [p.146]
- Os exemplos são propositalmente simples; o código final ainda tem problemas que exigem outras refatorações; cada refatoração é mantida autocontida. [p.146-147]
- Escolha das refatorações: o catálogo não é completo; inclui as mais comuns e úteis, as com procedimentos que desenvolvem habilidade ou grande efeito no design; omitiu as muito simples e algumas inversas (toda refatoração tem inversa lógica; ex.: inversa de Encapsular variável, raramente usada). Deslocar instruções entrou nesta edição. [p.147]

Citações curtas de prova:
- "o segredo é dar passos pequenos – e, quanto mais complicada a situação, menores devem ser os passos." [p.146]

O que este trecho NÃO diz: não lista o catálogo completo; não define pré-requisitos formais por refatoração.

Relevância para os artefatos candidatos:
- refactoring-expert: ALTA, formato padrão (nome, esboço, motivação, procedimento, exemplo) e princípio de passos mínimos com teste a cada passo servem de estrutura para o catálogo da skill.
- testing-tdd-expert: BAIXA. api-design-expert: NENHUMA. code-review-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert (modelo de formato de cada entrada do catálogo).

---

### Cap. 6: Primeiro conjunto de refatorações (PDF p.148-160) [continua no próximo bloco; neste bloco só o início]
Resumo: Abre o catálogo com as refatorações básicas e dá visão geral do conjunto. Neste bloco aparecem completas Extrair função e a motivação/procedimento de Internalizar função (o exemplo desta última fica truncado no fim do bloco, p.160).

Visão geral do cap. 6 (p.148-149), refatorações citadas, com 1 linha cada:
- Extrair função (Extract Function): extrair código em função nomeada pelo propósito; a mais comum. [p.148]
- Extrair variável (Extract Variable): dar nome a uma expressão. [p.148]
- Internalizar função (Inline Function) e Internalizar variável (Inline Variable): inversas das duas anteriores. [p.148]
- Mudar declaração de função (Change Function Declaration): renomear função e adicionar/remover argumentos. [p.148]
- Renomear variável (Rename Variable), que usa Encapsular variável (Encapsulate Variable). [p.148]
- Introduzir objeto de parâmetros (Introduce Parameter Object): agrupar argumentos comuns em objeto. [p.148]
- Combinar funções em classe (Combine Functions into Class): agrupar funções com seus dados. [p.148]
- Combinar funções em transformação (Combine Functions into Transform): alternativa, boa para dados somente leitura. [p.148]
- Separar em fases (Split Phase): compor módulos em fases distintas. [p.148-149]

**Extrair função (Extract Function)** [p.149-159]. Aliases: antes "Extrair método"; inversa de Internalizar função.
- Motivação: separar intenção de implementação; extrair se for preciso um esforço para entender o que o fragmento faz e nomear pelo "o quê". Não se baseia em tamanho nem em reutilização. Funções muito pequenas (até uma linha) são válidas, se o nome revelar melhor o propósito (ex. highlight que só chama reverse, no Smalltalk). Custo de chamada raramente importa hoje; compiladores otimizam melhor funções pequenas. Exige bons nomes; comentário que antecede um fragmento costuma sugerir o nome. Para o autor, mais de meia dúzia de linhas já "exala um cheiro". [p.149-151]
- Procedimento (passos): [p.151-152]
  1. Criar nova função nomeada pelo propósito (o que, não como). Se não achar nome melhor, talvez não deva extrair; pode extrair, tentar e internalizar de volta se não ajudar. Se a linguagem tem funções aninhadas, aninhar a função extraída na original (reduz variáveis fora do escopo; Mover função depois).
  2. Copiar o código extraído para a nova função.
  3. Verificar referências a variáveis locais do escopo original que não estarão no escopo da nova função; passar como parâmetros. Variável usada só no código extraído mas declarada fora: mover a declaração. Variável reatribuída: se for uma só, tratar o extraído como consulta e atribuir o retorno; se houver muitas atribuições, abandonar a extração e antes aplicar Separar variável ou Substituir variável temporária por consulta.
  4. Compilar após tratar as variáveis.
  5. Substituir o código original por chamada à nova função.
  6. Testar.
  7. Procurar código igual/parecido e considerar Substituir código internalizado por chamada de função.
- Exemplos (p.152-159): (a) sem variáveis fora do escopo (extrair printBanner: cortar, colar, chamar); (b) variáveis locais usadas e não reatribuídas (passar como parâmetros: printDetails(invoice, outstanding); recordDueDate(invoice) para estrutura modificada); (c) atribuição a variável local: parâmetro reatribuído, aplicar Separar variável; temporária usada só no extraído, usar Deslocar instruções para aproximar a declaração; temporária usada fora, devolver o valor (ex. calculateOutstanding retorna result; renomear retorno para `result`, original para const).
- Mais de um valor a devolver: preferir escolher outro trecho para extrair e ter funções separadas; senão devolver um registro; geralmente reorganizar temporárias com Substituir variável temporária por consulta e Separar variável. [p.158]
- Extrair para função aninhada e depois mover: extrair primeiro pelo menos para o mesmo nível da original, para expor cedo a dificuldade com variáveis. [p.159]
- Observação: Clock Wrapper (encapsulador do relógio) para evitar Date.now() direto e testes não determinísticos. [p.153]

**Internalizar função (Inline Function)** [p.159-160, exemplo truncado]. Alias: Internalizar método; inversa de Extrair função.
- Motivação: quando o corpo é tão claro quanto o nome; acesso indireto desnecessário irrita; também útil para internalizar grupo mal fatorado em uma função grande e reextrair; ao encontrar excesso de delegação simples, para preservar só os acessos úteis. [p.159-160]
- Procedimento: [p.160]
  1. Verificar que não é método polimórfico (subclasses que sobrescrevem impedem).
  2. Encontrar todas as chamadas.
  3. Substituir cada chamada pelo corpo.
  4. Testar após cada substituição (pode ser gradual).
  5. Remover a definição da função.
- Nota: se houver recursão, múltiplos pontos de retorno, método em outro objeto sem acesso etc., o autor diz que não se deve fazer essa refatoração. [p.160]

Citações curtas de prova:
- "O segredo, nesse caso, não é o tamanho da função, mas a distância semântica entre o que o método faz e como ele faz." [p.110] (cap. 3; ver acima)
- "nomeie a função com base no que ela faz, e não em como ela faz" [p.151]
- "Um acesso indireto pode ser conveniente, mas um acesso indireto desnecessário é irritante." [p.160]

O que este trecho NÃO diz: não traz neste bloco Extrair variável, Internalizar variável, Mudar declaração de função, Encapsular variável, Renomear variável, Introduzir objeto de parâmetros, Combinar funções em classe/transformação, Separar em fases (vêm nos próximos blocos); o exemplo de Internalizar função está truncado no fim do bloco (começa na linha final, p.160, sem conteúdo).

Relevância para os artefatos candidatos:
- refactoring-expert: ALTA, mecânica passo a passo de Extrair função e Internalizar função, critério "intenção vs. implementação", tratamento de variáveis locais.
- code-review-expert: MÉDIA, critério de nomeação/intenção e comentário como sinal.
- testing-tdd-expert: BAIXA, "testar após cada passo", Clock Wrapper para determinismo.
- api-design-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert (references/catalogo-mecanica.md); completar Internalizar função com o bloco seguinte (exemplo).

---

## Checklist de cobertura
- Primeira página lida: PDF p.81
- Última página lida: PDF p.160 (confirmado por Grep: último marcador é "=== PDF PAGINA 160 ===" na linha 3464 de 3508; arquivo lido até o fim)
- Páginas sem texto útil ou ilegíveis: nenhuma ilegível; o bloco não contém sumário/índice. Figuras (UI do exemplo p.129, diagramas do catálogo) não aparecem no texto extraído.
- Problemas de extração observados: recuos/quebras de linha no código (aspas, espaços e linhas em branco extras dentro de blocos); alguns símbolos de resultado de console corrompidos (ex. "’’’’’’" no lugar de pontos/ticks e "!" no lugar do marcador de falha); "Brandt" vs. "Brant" grafado de dois modos no texto original (p.102, 103); número "3" solto em "alterar um código 3" (marca de nota de rodapé, p.94); nota de tradução "refactoring" (p.106) repetida como rodapé; a caixa de Ron Jeffries (p.98-100) tem a primeira linha de página deslocada. Números impressos de página não visíveis.
- Capítulos/seções cobertos integralmente: final do Cap. 2 (p.81-106), Cap. 3 (p.107-125), Cap. 4 (p.126-144), Cap. 5 (p.145-147), Extrair função (p.149-159).
- Capítulos/seções que continuam em outro bloco: início do Cap. 2 (vem de bloco anterior, antes da p.81); Cap. 6 continua (Internalizar função com exemplo truncado em p.160 e todas as demais refatorações).
