# Destilação do Domínio

Consulte ao decidir onde concentrar o esforço de modelagem, ao classificar subdomínios, ao separar o essencial do periférico em um modelo grande ou ao definir o que comprar, terceirizar ou construir.

Base: Eric Evans, *Domain-Driven Design*, cap. 15 (e trechos dos cap. 14 e 17). As páginas citadas são as do PDF (veja [fontes.md](fontes.md)). Trechos marcados "convenção desta skill" não têm base no livro.

---

## Por que destilar

Mesmo isolado de infraestrutura, um domínio grande pode ser complexo demais. Destilar é separar o essencial do resto para extrair o que dá valor ao software. Segundo Evans, a destilação estratégica (p.348):

1. ajuda todos a entender o desenho geral;
2. facilita a comunicação, ao identificar um modelo central de tamanho manejável para entrar na linguagem ubíqua;
3. orienta refatorações;
4. concentra o trabalho nas áreas de maior valor;
5. orienta terceirização, uso de componentes prontos e alocação de pessoas.

---

## Core Domain

**O que é:** as partes do modelo distintivas e centrais para os objetivos das aplicações pretendidas; onde o maior valor deve ser agregado (p.351).

**Por que importa:** num sistema grande, tudo parece necessário e o núcleo é obscurecido e negligenciado. Os desenvolvedores mais fortes tendem a gravitar para infraestrutura ou para problemas bem definidos que não exigem conhecimento do domínio, e o núcleo especializado acaba nas mãos de quem menos pode modelá-lo (p.350-351). O livro cita um projeto em que o melhor desenvolvedor construiu um recurso genérico de comentários enquanto o módulo crítico de empréstimos virava um emaranhado (p.351).

**O que fazer (p.351):**

* Reduzir o modelo ao essencial; encontrar o Core Domain e distingui-lo da massa de modelo e código de apoio. Mantê-lo pequeno.
* Aplicar os melhores talentos no Core e recrutar de acordo. Investir ali em modelo profundo e design flexível. Justificar o investimento em qualquer outra parte pelo quanto apoia o Core.
* Manter o resto do desenho tão genérico quanto for prático. O que precisa ser sigiloso como vantagem competitiva é o Core; não há por que esconder o resto.
* Diante de duas refatorações desejáveis e tempo para uma, escolher a que mais afeta o Core.

**Como escolher o Core:**

* Depende do ponto de vista. Um modelo de dinheiro é genérico na maioria das aplicações, mas pode ser Core num sistema de câmbio, e mesmo ali pode haver uma parte genérica a separar depois (p.352).
* O Core de uma aplicação pode ser componente genérico de apoio de outra. Em geral, num projeto ou numa empresa, é possível definir um Core consistente (p.352).
* A identificação evolui com as iterações: o que parecia central pode ter papel de apoio (p.352).

**Quem trabalha nele:** monte uma equipe de bons desenvolvedores com compromisso de longo prazo e interesse em virar repositórios de conhecimento do domínio, junto de especialistas do negócio. Contratar projetistas externos de curto prazo para o miolo do Core não é prático (o conhecimento vai embora), mas um mentor pode ajudar a equipe a evoluir (p.352).

**Comprar o Core?** O livro considera improvável que o Core possa ser comprado. Frameworks de domínio prontos tiveram resultados pouco convincentes, exceto como linguagens publicadas para troca de dados. Se um framework restringe mais do que oferece abstrações para você especializar, há três leituras possíveis: você está perdendo um ativo essencial (recue do framework no Core), a área não é tão central quanto parecia (redesenhe a fronteira do Core) ou você não tem necessidades especiais no Core (considere comprar e integrar) (p.352-353).

**Risco e primeira versão:** salvo equipe comprovada e domínio muito familiar, o primeiro corte do sistema deve se basear em alguma parte do Core, por simples que seja, porque o Core é a parte de maior risco de modelagem (p.360).

---

## Escalada de técnicas (p.354)

As técnicas podem ser aplicadas em quase qualquer ordem, mas variam no quanto mudam o desenho. Da mais leve para a mais ambiciosa:

| Técnica | Mexe no código? | Investimento relativo (leitura desta skill da p.354) |
|---|---|---|
| Domain Vision Statement | Não | Mínimo |
| Highlighted Core | Pouco ou nada | Baixo |
| Generic Subdomains | Sim (refatoração e reempacotamento) | Médio |
| Cohesive Mechanisms | Sim (encapsulamento com design flexível) | Médio |
| Segregated Core | Sim (reempacota para o Core ficar visível no código) | Alto |
| Abstract Core | Sim (reorganização extensa do modelo) | O mais alto |

Cada técnica exige compromisso maior que a anterior (p.354). Comece pelas leves.

---

## Domain Vision Statement (p.362-363)

**Quando:** no início do projeto, quando o modelo ainda não existe mas já é preciso focar; depois, quando é preciso explicar o valor do sistema sem estudo profundo do modelo; e quando os aspectos críticos do domínio atravessam vários Bounded Contexts (p.362).

**Como:**

* Escreva uma descrição curta (cerca de uma página) do Core Domain e do valor que ele traz, a "proposta de valor".
* Ignore o que não distingue este modelo de outros. Mostre como o modelo atende e equilibra interesses diversos.
* Mantenha estreito. Escreva cedo e revise conforme ganha entendimento (p.362).
* Os exemplos do livro separam o que **entra** (o que o modelo representa e o valor para o negócio, como "o modelo representa prioridades de passageiros e estratégias de reserva") do que **não entra** (decisões de interface, tecnologia, tempo de resposta, segurança) (p.363).

**Armadilha:** documentos de visão feitos só para obter financiamento e abandonados depois. Este deve guiar alocação de recursos, escolhas de modelagem e formação da equipe durante todo o projeto (p.362).

---

## Highlighted Core (p.365-367)

**Problema:** o vision statement identifica o Core em termos amplos, mas deixa a identificação dos elementos específicos a cargo da interpretação individual; cada pessoa escolhe elementos diferentes (p.365).

**Duas formas, ambas de baixo custo e sem alterar o modelo:**

* **Distillation Document:** documento muito breve (de três a sete páginas esparsas) descrevendo o Core Domain e as interações principais entre seus elementos, escrito para ser entendido pelos membros não técnicos. É ponto de entrada mínimo, não documento de design completo. Riscos: pode não ser mantido, pode não ser lido e pode multiplicar fontes de informação. A defesa é o minimalismo (p.365-366).
* **Flagged Core:** marcar os elementos do Core dentro do repositório principal do modelo (estereótipo na ferramenta de UML, comentários estruturados no código ou algum recurso do ambiente de desenvolvimento), de modo que seja fácil saber o que está dentro e fora do Core (p.366-367).

**Uso como ferramenta de processo:** se uma mudança de código ou modelo exige alterar o distillation document, é sinal de que o Core ou sua fronteira muda: consulte a equipe e avise todos. Mudanças fora do Core ou em detalhes não citados no documento podem ser integradas sem consulta (p.367).

---

## Generic Subdomains (p.355-360)

**Quando:** há partes do modelo coesas que **não são a motivação do projeto**, que adicionam complexidade sem capturar conhecimento especializado e que dificultam enxergar o Core (p.355). Exemplos do livro: organograma, contabilidade genérica, fusos horários.

**Como:** identifique subdomínios coesos, fatore modelos genéricos e coloque-os em módulos separados, sem deixar nenhum traço das suas especialidades neles. Dê prioridade menor que a do Core e evite alocar desenvolvedores do núcleo (eles aprenderiam pouco do domínio) (p.355).

**Quatro opções de implementação (p.355-358):**

| Opção | Vantagens | Desvantagens |
|---|---|---|
| Solução pronta (comprar ou código aberto) | Menos código; manutenção externalizada; código mais maduro | Custo de avaliar e entender; qualidade incerta; pode ser exagerada; integração pode dar mais trabalho que implementação mínima própria; pode haver contexto delimitado distinto e dependências de plataforma |
| Desenho ou modelo publicado | Mais maduro; documentação pronta | Pode não se encaixar ou ser exagerado |
| Implementação terceirizada | Libera a equipe do núcleo; interface bem definida; mantém o subdomínio genérico | Ainda consome tempo da equipe central; custo de trazer a posse de volta; qualidade varia |
| Implementação interna | Integração fácil; só o necessário; contratados temporários podem fazer | Carga de manutenção e treinamento; fácil subestimar tempo e custo |

Outras observações do livro:

* Soluções prontas são dignas de investigação, mas em geral "não valem o trabalho", com poucos casos de sucesso (fluxo de trabalho externo, biblioteca de log). Quanto mais genérico o componente e mais destilado seu modelo, maiores as chances de ser útil (p.356).
* Com modelo bem formalizado e rigoroso disponível (contabilidade, física), use-o; implemente só o subconjunto autoconsistente de que precisa (p.356-357).
* Testes automatizados de aceitação, escritos ou especificados por você, ajudam a terceirização. Terceirizar combina bem com modelo publicado (p.357).
* Subdomínios genéricos são o lugar de aplicar projetistas externos, pois não exigem conhecimento profundo do Core e têm menos preocupação de confidencialidade (p.358).

**Genérico não significa reutilizável:** não se preocupe com reuso do código genérico; investir só o necessário nele é o ponto. O reuso que costuma valer é o do **modelo**, como ao usar modelo publicado. Mas seja rigoroso em manter-se dentro do conceito genérico: elementos específicos do setor ali impedem a evolução e pertencem ao Core ou a subdomínios mais especializados (p.360).

**Contraste dos dois projetos de fuso horário (p.358-360):** no projeto de roteamento marítimo, o Core estava maduro, os requisitos eram claros e um contratado temporário resolveu o problema. No de seguros, o Core estava por fazer, os requisitos eram incertos e desenvolvedores de longo prazo gastaram semanas num modelo genérico nunca usado. A diferença foi o custo de oportunidade para o Core. Nos dois, o modelo genérico ficou separado do Core.

---

## Cohesive Mechanisms (p.369-371)

**Quando:** algoritmos complexos começam a inchar o desenho e o "o quê" conceitual é afogado no "como" mecânico; muitos métodos que resolvem o problema escondem os que expressam o problema (p.369).

**Antes de extrair:** o primeiro recurso é buscar um modelo que torne o cálculo simples. Só depois, se parte do mecanismo for conceitualmente coerente, extraia-a. Não é um "calculador" genérico para tudo (p.369).

**Como:**

* Particione o mecanismo coeso em um framework leve separado e exponha suas capacidades por uma interface que revele a intenção.
* Procure formalismos e categorias de algoritmos bem documentados (como grafos); implemente só o subconjunto necessário.
* O modelo do Core ou de um subdomínio genérico **formula** o fato, regra ou problema; o mecanismo **resolve** (p.369-370). Em resumo: o modelo propõe, o mecanismo dispõe (p.370).

**Mecanismo versus Generic Subdomain:** o subdomínio genérico representa um aspecto do domínio por modelo expressivo (apenas menos central); o mecanismo não representa o domínio, resolve um problema computacional (p.370). Na prática a distinção nem sempre é pura no início.

**Exceção:** quando o mecanismo é proprietário e parte do valor do software (algoritmo de rating de risco, de agendamento), ele pode estar no Core. A decisão de ir além é análise de custo e benefício (p.370-371).

**Ciclo completo é normal:** no exemplo do livro, um ano depois outra equipe reabsorveu o mecanismo de grafo no organograma por achar o custo de objetos adicionais e do pacote separado injustificado, mantendo a interface declarativa. Esses ciclos são comuns, não voltam ao ponto de partida e costumam deixar um modelo mais profundo (p.371).

---

## Segregated Core (p.373-378)

**Quando:** um grande Bounded Context crítico ao sistema cujo miolo do modelo está obscurecido por muita capacidade de apoio. Elementos que servem em parte ao Core e em parte ao apoio, e acoplamento entre Core e partes genéricas, sufocam o Core (p.373-374).

**Como (p.373):**

1. Identificar um subdomínio do Core (possivelmente a partir do distillation document).
2. Mover as classes relacionadas para um novo módulo, nomeado pelo conceito que as une.
3. Refatorar o código para separar dados e funcionalidade que não são expressão direta do conceito, colocando-os em outras classes e pacotes, sem buscar perfeição.
4. Refatorar o módulo segregado para tornar relações e interações mais simples e comunicativas (objetivo contínuo).
5. Repetir com outros subdomínios do Core.

O resto pode ficar onde está ou ser agrupado por classes proeminentes; mais tarde, parte do resíduo vira Generic Subdomains (p.373).

**Custos (p.374):** pode tornar mais obscuras as relações com classes acopladas não pertencentes ao Core, e às vezes sacrifica a coesão de um módulo bom para realçar a coesão do Core, o que é ganho líquido segundo o autor. Dá muito trabalho e pode absorver desenvolvedores em mudanças por todo o sistema.

**Decisão de equipe:** a equipe inteira precisa migrar junto; é preciso evitar que alguém aja unilateralmente sobre novos insights e, ao mesmo tempo, não congelar a definição do Core (p.374).

**Exemplo do livro (p.374-378):** no modelo de transporte de cargas, a pergunta "qual é a essência?" foi respondida pelo Domain Vision Statement (visibilidade das operações e entrega confiável conforme o acordo do cliente), e não pelo "resultado financeiro". Daí o pacote `Delivery` como Core, com faturamento em papel de apoio. A segregação levou a dois insights de modelo (o acordo do cliente passou a restringir o passo de manuseio; foi ligado diretamente à carga). O autor tende a ser minimalista no Core e admite mover mais classes se muitas histórias dependerem delas.

---

## Abstract Core (p.379-380)

**Quando:** há muita interação entre subdomínios em módulos separados, de modo que ou surgem muitas referências entre módulos (derrotando a partição), ou a interação fica indireta e obscura. Pense em fatiar na **horizontal**: se a maioria das interações entre módulos puder ser expressa por interfaces polimórficas, vale refatorar esses tipos para um módulo central (p.379).

**Condição:** só vale se as interfaces polimórficas corresponderem a conceitos fundamentais do domínio, não a um truque técnico (p.379).

**Como:** identifique os conceitos mais fundamentais e fatore-os em classes, classes abstratas ou interfaces que expressem a maior parte da interação entre os componentes significativos. Coloque esse modelo abstrato em módulo próprio; as classes especializadas ficam em módulos por subdomínio e referenciam o núcleo abstrato, não umas às outras (p.379-380).

**Aviso:** o processo não é mecânico. Mover automaticamente tudo que é muito referenciado gera uma bagunça sem sentido. Exige entendimento profundo dos papéis nas interações e costuma exigir redesenho considerável (p.380).

---

## Prioridade de refatoração e modelos profundos

* Refatoração guiada por dor: veja se a raiz envolve o Core ou a relação do Core com um elemento de apoio; se sim, resolva isso primeiro. Com liberdade para refatorar, priorize o fatoramento do Core, a segregação do Core e a purificação de subdomínios de apoio para que sejam genéricos (p.382).
* Destilar também é refinar os subdomínios, especialmente o Core, rumo a um modelo profundo e a um design flexível; é no Core que um avanço de modelo muda a trajetória do projeto (p.381).

---

## Quando não aplicar (cautelas)

* Segregated Core e Abstract Core são caros e invasivos. Só quando o Bounded Context é grande e crítico e o miolo está encoberto (p.374); comece pelas técnicas leves (p.354).
* Não "separe por separar" o Abstract Core: sem conceitos fundamentais reais é só truque técnico (p.379-380).
* Não invista em generalidade do que é genérico nem tente reusar código (p.360).
* Não tente comprar o Core sem checar as três leituras do framework restritivo (p.352-353).
* Se o sistema é pequeno e o modelo cabe na cabeça da equipe, a destilação formal é exagero (convenção desta skill, consequência da escalada de investimento descrita na p.354).

## Verificação sugerida (convenção desta skill)

* Alguém novo na equipe consegue, em poucos minutos, listar os elementos do Core? Se não, falta Highlighted Core.
* Os desenvolvedores mais experientes estão no Core ou em infraestrutura e subdomínios genéricos?
* Cada módulo genérico é livre de qualquer termo específico do negócio?
* Algum mecanismo computacional está espalhado nos métodos do Core?
* O Domain Vision Statement cabe em uma página e foi revisto neste trimestre?

## Observação sobre a classificação da skill

A skill principal classifica subdomínios em Core, Supporting e Generic. No livro, os padrões nomeados são **Core Domain** e **Generic Subdomains**; "apoio" aparece só como papel (elementos que não são Core, genéricos ou não). "Supporting Domain" como categoria formal não consta do texto de Evans. Veja a seção de divergências em [fontes.md](fontes.md).
