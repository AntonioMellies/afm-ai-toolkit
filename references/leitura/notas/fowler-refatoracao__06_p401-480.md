# Notas: Fowler, Refatoração (2ª ed., JS), bloco 06 (PDF p.401-480)

Observação geral: números impressos de página não são visíveis no texto extraído; só se usa a "PDF PAGINA". O bloco contém o final do Cap. 12 (Lidando com herança, p.401-459), Bibliografia (p.460-463), Lista de refatorações (p.464-466), tabela "Maus cheiros no código" com refatorações comuns (p.467-469) e propaganda de outros livros da editora (p.470-480).

---

### Capítulo 12 - Lidando com herança: introdução (PDF p.401) [início do capítulo; provavelmente começa neste bloco]
Resumo: o capítulo trata da herança, recurso poderoso mas fácil de usar mal, e muitas vezes só se percebe o uso indevido tarde. Lista as refatorações para mover coisas na hierarquia, adicionar/remover classes e trocar herança por delegação.
Conceitos e regras:
- Mover funcionalidade para cima/baixo na hierarquia: Subir método, Subir campo, Subir corpo do construtor, Descer método, Descer campo [p.401].
- Adicionar/remover classes da hierarquia: Extrair superclasse, Remover subclasse, Condensar hierarquia [p.401].
- Substituir código de tipos por subclasses: adiciona subclasses para trocar um campo que aciona comportamento distinto conforme seu valor [p.401].
- Quando a herança fica no lugar errado ou inapropriada, usar Substituir subclasse por delegação ou Substituir superclasse por delegação [p.401].
Citações curtas de prova:
- "a herança é muito útil, mas também fácil de ser usada indevidamente" [p.401] (trecho de frase; paráfrase próxima)
O que este trecho NÃO diz: não define critérios de "uso indevido" aqui (isso vem nas motivações de cada refatoração).
Relevância: refactoring-expert: ALTA (mapa do capítulo); testing-tdd-expert: BAIXA; api-design-expert: NENHUMA; code-review-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert (índice de refatorações de herança).

---

## Catálogo de refatorações de herança (cada uma com motivação e procedimento)

### Subir método (Pull Up Method) (PDF p.401-404) - inversa de Descer método
Resumo: mover método idêntico de subclasses para a superclasse para eliminar duplicação.
Motivação: duplicação é terreno fértil para bugs, pois uma alteração pode não ser feita na outra cópia, e duplicatas são difíceis de achar [p.402]. Mais fácil quando os corpos são idênticos (copiar-e-colar); mesmo assim vale procurar diferenças, pois elas costumam revelar comportamento sem teste [p.402-403]. Muitas vezes vem depois de outros passos: se dois métodos puderem ser parametrizados até ficarem iguais, aplicar antes Parametrizar função [p.403]. Complicação maior: corpo que referencia recursos só existentes na subclasse, então antes é preciso subir campo/método desses elementos [p.403]. Se o fluxo geral for semelhante mas os detalhes diferirem, considerar Formar método de template (referência externa [mf-ft]) [p.403].
Mecanismo (passos) [p.403]:
1. Inspecionar os métodos para garantir que são idênticos; se fazem a mesma tarefa mas não são idênticos, refatorar até ficarem com corpos idênticos.
2. Verificar que todas as chamadas de método e referências a campos no corpo referem recursos acessíveis da superclasse.
3. Se as assinaturas diferem, usar Mudar declaração de função para igualar ao que se quer na superclasse.
4. Criar o método na superclasse e copiar o corpo de um deles.
5. Executar verificações estáticas.
6. Apagar o método de uma subclasse; testar.
7. Continuar apagando das demais subclasses até todos removidos.
Exemplo [p.403-405]: Employee.annualCost e Department.totalAnnualCost (ambos `monthlyCost * 12`) em subclasses de Party; renomear para o mesmo nome, copiar para Party, remover de Employee, testar, remover de Department. Em linguagem dinâmica, monthlyCost não declarado em Party funciona, mas convém sinalizar que subclasses devem implementá-lo: método "de armadilha" na superclasse que lança erro (SubclassResponsibilityError, nome vindo de Smalltalk) [p.404-405].
Citações curtas de prova:
- "Sempre que houver duplicação, haverá risco de uma alteração em uma cópia não ser feita na outra." [p.402]
O que NÃO diz: não trata de herança múltipla nem de mixins.
Relevância: refactoring-expert: ALTA (mecânica + sinal de duplicação); testing-tdd-expert: MÉDIA (diferenças revelam falta de teste); code-review-expert: MÉDIA (duplicação entre subclasses).
Decisão sugerida: usar em refactoring-expert/references (mecânica de herança).

### Subir campo (Pull Up Field) (PDF p.405-406) - inversa de Descer campo
Resumo: mover campo duplicado em subclasses para a superclasse.
Motivação: subclasses desenvolvidas de forma independente ou combinadas por refatoração costumam duplicar campos (nomes às vezes semelhantes, às vezes não); só observando o uso se sabe se são o mesmo. Reduz duplicação de duas formas: remove a declaração de dados duplicada e permite mover para a superclasse o comportamento que usa o campo [p.406]. Em linguagens dinâmicas, em que campos passam a existir ao receber valor, subir campo é basicamente consequência de Subir corpo do construtor [p.406].
Mecanismo [p.406]:
1. Inspecionar todos os usuários do campo candidato para garantir uso do mesmo modo.
2. Se nomes diferem, Renomear campo.
3. Criar o campo na superclasse, acessível às subclasses (protected).
4. Apagar os campos nas subclasses.
5. Testar.
Relevância: refactoring-expert: ALTA (passos); demais: BAIXA.
Decisão sugerida: usar em refactoring-expert.

### Subir corpo do construtor (Pull Up Constructor Body) (PDF p.406-410)
Resumo: mover código comum dos construtores das subclasses para o construtor da superclasse.
Motivação: construtores são "ardilosos": não são métodos comuns, há restrições (regras especiais sobre o que fazer e em que ordem). Primeira ideia normal (Extrair função + Subir método) não serve diretamente [p.407-408]. Se a refatoração ficar confusa, usar Substituir construtor por função de factory [p.408].
Mecanismo [p.408]:
1. Definir construtor na superclasse se não existir; garantir que os construtores das subclasses o chamem.
2. Usar Deslocar instruções para mover instruções comuns para logo depois da chamada a super().
3. Remover o código comum de cada subclasse e colocá-lo na superclasse; adicionar à chamada super() os parâmetros de construtor referenciados.
4. Testar.
5. Se houver código comum que não possa ir para o início do construtor, usar Extrair função e depois Subir método.
Exemplo [p.408-410]: atribuição de `name` em Employee e Department subida para Party. Caso com comportamento comum no fim: Manager chama `if (this.isPrivileged) this.assignCar()` após atribuir `grade` (isPrivileged depende de grade, só definido na subclasse); extrair `finishConstruction()` e subir para Employee [p.410].
Relevância: refactoring-expert: ALTA; demais: BAIXA.
Decisão sugerida: usar em refactoring-expert (cuidado com ordem de inicialização).

### Descer método (Push Down Method) (PDF p.410-412) - inversa de Subir método
Resumo: mover método que só interessa a uma subclasse (ou poucas) para elas.
Motivação: deixa o código mais claro. Só é possível se quem chama sabe que está lidando com aquela subclasse; senão, usar Substituir condicional por polimorfismo com comportamento "placebo" na superclasse [p.411].
Mecanismo [p.411-412]: copiar o método para toda subclasse que precisar; remover da superclasse; testar; remover das subclasses que não precisam; testar.
Relevância: refactoring-expert: ALTA; code-review-expert: BAIXA.

### Descer campo (Push Down Field) (PDF p.412-413) - inversa de Subir campo
Resumo: mover campo usado só por uma subclasse (ou poucas) para elas.
Mecanismo [p.413]: declarar o campo em todas as subclasses que precisarem; remover da superclasse; testar; remover das subclasses que não precisarem; testar.
Relevância: refactoring-expert: ALTA (curta).

### Substituir código de tipos por subclasses (Replace Type Code with Subclasses) (PDF p.413-421)
Incorpora: Substituir enumeração pelo padrão State/Strategy e Extrair subclasse; inversa de Remover subclasse [p.413].
Resumo: trocar um campo de código de tipo (enum/símbolo/string/número) por subclasses.
Motivação: na maioria das vezes o código de tipo basta (muitas vezes vem de serviço externo). Duas situações pedem subclasses: (1) permitem polimorfismo para lógica condicional, útil quando várias funções variam conforme o código, aplicando Substituir condicional por polimorfismo; (2) há campos/métodos válidos só para certos valores do tipo (ex.: quota só para "salesman"), então criar subclasse e aplicar Descer campo, tornando a relação explícita em vez de validação [p.414]. Decisão a tomar: herança direta (engineer subtipo de employee) ou indireta (propriedade "tipo de funcionário" com subtipos). Direta é mais simples, mas não serve se a hierarquia já é usada para outro eixo (ex.: tipo de trabalho) nem se o tipo é mutável; para indireta, aplicar Substituir primitivo por objeto no código de tipo e então esta refatoração na nova classe [p.414-415].
Mecanismo [p.415]:
1. Autoencapsular o campo do código de tipo.
2. Escolher um valor do código; criar subclasse que sobrescreve o getter para devolver o literal.
3. Criar lógica de seletor que mapeia o parâmetro de código para a subclasse. Herança direta: Substituir construtor por função de factory e colocar o seletor na factory. Indireta: seletor pode ficar no construtor.
4. Testar.
5. Repetir para cada valor do código, testando a cada mudança.
6. Remover o campo de código de tipo.
7. Testar.
8. Usar Descer método e Substituir condicional por polimorfismo nos métodos que usam os acessores do código; depois remover os acessores.
Exemplo direto [p.415-418]: Employee com type "engineer"/"manager"/"salesman"; getter `type`; subclasses sobrescrevem `get type()`; factory `createEmployee` com switch; truque "paranóico": alterar temporariamente o valor retornado pela subclasse e ver o teste falhar para confirmar que a subclasse é usada [p.416-417]; ao final o `validateType` é substituído pelo `default: throw` do switch, e o parâmetro `type` do construtor removido com Mudar declaração de função [p.417-418]. Getters `type` restantes removidos com Remover código morto quando ninguém mais os usar [p.418].
Exemplo indireto [p.418-421]: já existem subclasses part-time/full-time; Substituir primitivo por objeto cria EmployeeType; depois subclasses Engineer/Manager/Salesman de EmployeeType com `toString`; lógica de capitalização movida para EmployeeType (`capitalizedName`) [p.419-421]. Fowler diz que esse exemplo substitui "Substituir enumeração pelo padrão State/Strategy" da 1ª edição, que ele agora vê como esta refatoração com herança indireta [p.421].
Citações curtas de prova:
- "usar uma subclasse deixa o relacionamento mais explícito." [p.414]
O que NÃO diz: não dá critério numérico (quantos switches justificam).
Relevância: refactoring-expert: ALTA; testing-tdd-expert: MÉDIA (truque de quebrar o retorno para provar que o teste cobre o caminho; testar a cada passo); code-review-expert: MÉDIA (código de tipo + switches = smell).
Decisão sugerida: usar em refactoring-expert; truque do teste "paranóico" em testing-tdd-expert.

### Remover subclasse (Remove Subclass) (PDF p.421-426) - anteriormente Substituir subclasse por campos; inversa de Substituir código de tipos por subclasses
Resumo: substituir subclasses que fazem pouco por um campo na superclasse.
Motivação: subclasses dão suporte a variações e polimorfismo ("programar com base na diferença"), mas, com a evolução, as variações podem migrar ou sumir; às vezes subclasses foram criadas antecipando funcionalidades que nunca vieram. Há custo para compreender uma subclasse; se faz muito pouco, não vale mais a pena [p.422].
Mecanismo [p.422]:
1. Substituir construtor por função de factory no construtor da subclasse. Se clientes usam um campo de dado para decidir a subclasse, colocar essa decisão num método factory da superclasse.
2. Se há código que testa tipos das subclasses, Extrair função no teste de tipo e Mover função para a superclasse; testar a cada mudança.
3. Criar um campo que represente o tipo da subclasse.
4. Modificar métodos que referenciam a subclasse para usar o novo campo.
5. Apagar a subclasse.
6. Testar.
Nota: em grupo de subclasses, fazer antes os passos de encapsulamento (factory, mover testes de tipo) e depois inserir individualmente na superclasse [p.422].
Exemplo [p.423-426]: Person com Male/Female só sobrescrevendo `genderCode`; antes de remover, verificar se há comportamento dependente de subclasse nos clientes; encapsular criação com factory (Extrair função da lógica de seleção de `loadFromInput`, `createPerson(aRecord)`); `instanceof` "nunca tem um cheiro bom" [p.425]: extrair `isMale` e mover para Person; adicionar campo `_genderCode` (default "X"), remover subclasses uma a uma testando; por fim tornar o código simétrico ("M","F","X") para não intrigar leitores [p.425-426]. Observação: pessoas fora de masculino/feminino existem; esquecer isso é erro comum de modelagem [p.425].
Citações curtas de prova:
- "instanceof – que nunca tem um cheiro bom" [p.425]
Relevância: refactoring-expert: ALTA; code-review-expert: MÉDIA (subclasse ociosa, instanceof); testing-tdd-expert: BAIXA.

### Extrair superclasse (Extract Superclass) (PDF p.427-432)
Resumo: criar superclasse com o que duas classes parecidas têm em comum.
Motivação: duas classes com tarefas parecidas podem usar o mecanismo básico de herança; mover dados comuns com Subir campo e comportamento com Subir método. Herança muitas vezes é percebida durante a evolução do programa (ao identificar elementos comuns), não necessariamente planejada de antemão a partir de classificação do "mundo real" [p.428]. Alternativa: Extrair classe (delegação). Fowler começa por Extrair superclasse por ser mais simples, sabendo que pode usar depois Substituir superclasse por delegação [p.428].
Mecanismo [p.428]:
1. Criar superclasse vazia; tornar as classes originais suas subclasses (se necessário, Mudar declaração de função nos construtores).
2. Testar.
3. Um a um, usar Subir corpo do construtor, Subir método e Subir campo para mover elementos comuns.
4. Analisar métodos restantes nas subclasses; se houver partes comuns, Extrair função e depois Subir método.
5. Verificar clientes das classes originais; considerar adaptá-los para usar a interface da superclasse.
Exemplo [p.429-432]: Employee e Department ganham Party; sobe `name`, unifica `monthlyCost`/`totalMonthlyCost` e `annualCost`/`totalAnnualCost` via Mudar declaração de função (se representarem o mesmo propósito), sobe `annualCost`.
Relevância: refactoring-expert: ALTA.

### Condensar hierarquia (Collapse Hierarchy) (PDF p.432-433)
Resumo: fundir classe e sua superclasse quando já não diferem o bastante.
Mecanismo [p.432-433]: escolher a classe a remover (pelo nome que fizer mais sentido no futuro; se nenhum, arbitrária); usar Subir/Descer campo/método para mover tudo para uma só classe; ajustar referências à "vítima"; remover a classe vazia; testar.
Relevância: refactoring-expert: ALTA (curta); code-review-expert: BAIXA (smell Elemento ocioso/Generalidade especulativa).

### Substituir subclasse por delegação (Replace Subclass with Delegate) (PDF p.433-452)
Resumo: trocar herança por delegação quando a herança limita (eixo único, acoplamento forte) ou quando se precisa variar dinamicamente o "tipo".
Motivação: herança é a forma natural de expressar variação de comportamento por categoria. Desvantagens: (1) só pode ser usada uma vez, ou seja, um único eixo de variação (ex.: jovem/idoso OU rico/pobre, não ambos); (2) cria relacionamento muito íntimo entre as classes: mudar a classe-pai pode quebrar as filhas, pior se estiverem em módulos de equipes diferentes. Delegação resolve ambos (delegar a várias classes por motivos diferentes; interface clara, menos acoplamento) [p.434]. Princípio "prefira composição à herança" (GoF) não significa "herança é nociva"; Fowler usa herança primeiro e passa à delegação se houver problemas; a refatoração equivale a trocar subclasses pelos padrões State e Strategy (estruturalmente iguais) [p.434-435]. Nem todo caso envolve hierarquia na delegação, mas costuma ser conveniente [p.435].
Mecanismo [p.435-436]:
1. Se há muitas chamadas aos construtores, Substituir construtor por função de factory.
2. Criar classe de delegação vazia; construtor aceita dados específicos da subclasse e em geral referência de volta ao host.
3. Adicionar campo na superclasse para a delegação.
4. Alterar a criação da subclasse para inicializar o campo com instância da delegação (na factory, ou no construtor se tem certeza da classe).
5. Escolher um método da subclasse para mover; usar Mover função para a delegação, sem remover o código de delegação original; mover também o que ele precisar ou adicionar referência ao host.
6. Se o método original tem chamadas fora da classe, mover o código de delegação da subclasse para a superclasse protegido por verificação de presença da delegação; se não tem, Remover código morto.
7. Com várias subclasses e duplicação, Extrair superclasse (a delegação padrão vai para a superclasse de delegação e a guarda deixa de ser necessária).
8. Testar; repetir até mover todos os métodos.
9. Trocar chamadas dos construtores das subclasses pelo da superclasse; testar; Remover código morto na subclasse.
Exemplo 1 [p.436-443]: Booking/PremiumBooking (talkback, basePrice, hasDinner). Herança funciona bem ali (programação por diferença), mas há ressalvas: superclasse fatorada para facilitar sobrescrita (acoplamento) [p.438]; razões para trocar: usar a herança para outro eixo, ou precisar mudar dinamicamente de default para premium (`aBooking.bePremium()`), quando substituir um objeto referenciado em vários lugares é difícil [p.438]. Passos: factory (`createBooking`, `createPremiumBooking`), `PremiumBookingDelegate(hostBooking, extras)` com referência para trás `_host`, `_bePremium` na factory [p.438-439]; mover `hasTalkback` com `_host` para dados da superclasse, testar, apagar da subclasse (e esperar que alguns testes falhem), depois despachar na superclasse com guarda `this._premiumDelegate ? ... : ...` [p.440-441]; `basePrice` chama `super`: duas opções para evitar recursão infinita: (a) Extrair função (`_privateBasePrice`) e despachar, (b) transformar o método da delegação em extensão (`extendBasePrice(base)`), preferida por ser mais concisa [p.441-442]; método só da subclasse (`hasDinner`) movido, e a superclasse devolve `undefined` se não há delegação (em JS, propriedade inexistente dá undefined; o instinto do autor seria lançar erro) [p.442-443]. Conclusão: aqui a refatoração sozinha não melhora o código, pois a delegação acrescenta lógica de despacho e referências bidirecionais; vale pela vantagem do status mutável ou pela necessidade de usar a herança para outro fim [p.443].
Exemplo 2 (hierarquia) [p.443-452]: Bird com subclasses EuropeanSwallow, AfricanSwallow, NorwegianBlueParrot; o sistema vai distinguir pássaros selvagens/cativeiros, que precisam ocupar a herança, então espécies vão para delegação [p.444-445]. Uma subclasse por vez, da mais simples; `selectSpeciesDelegate(data)` no construtor de Bird [p.445]. Problema com `plumage` sobrescrito apenas no Norwegian Blue: despachar condicional com `instanceof NorwegianBlueParrotDelegate` é "mau cheiro tão ruim quanto o de um papagaio em decomposição" [p.449]; alternativa de implementar o default em cada delegação duplicaria código; solução: Extrair superclasse nas delegações (`SpeciesDelegate` com plumage padrão e `airSpeedVelocity` null), e o `default` do seletor devolve `new SpeciesDelegate(...)`, garantindo que o campo nunca é nulo e simplificando os métodos de Bird para delegação direta [p.449-451]. Resultado: a herança de espécies fica com escopo mais claro (só o que varia por espécie); o que é igual para todas fica em Bird. Fowler sugere "mistura criteriosa de composição e herança" em lugar de "prefira composição à herança" [p.452].
Citações curtas de prova:
- "Prefira composição de objetos à herança de classe" [p.434] (princípio citado; Fowler o qualifica)
- "Prefira uma mistura criteriosa de composição e herança" [p.452]
O que NÃO diz: não oferece critério numérico para quando migrar; o exemplo mostra um caso em que a refatoração sozinha não melhora o código.
Relevância: refactoring-expert: ALTA; code-review-expert: MÉDIA (herança de eixo único, `instanceof`, acoplamento sub/superclasse); testing-tdd-expert: MÉDIA ("espero que alguns testes falhem", boa suíte para detectar falhas em subclasse); api-design-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert/references (herança vs delegação).

### Substituir superclasse por delegação (Replace Superclass with Delegate) (PDF p.453-459) - anteriormente Substituir herança por delegação
Resumo: trocar `extends` por um campo que referencia o antigo pai e métodos de encaminhamento.
Motivação: herança é forma simples de reuso, mas pode gerar confusão; exemplo clássico de uso indevido: Stack herdando de List (reaproveita armazenamento, mas expõe todas as operações de lista, a maioria inaplicáveis) [p.453]. Sinais: se as funções da superclasse não fazem sentido na subclasse, não se deve usar herança para obtê-las; além disso toda instância da subclasse deve ser instância da superclasse e válida em todos os usos da superclasse. Ex.: modelo de carro reaproveitado para carro físico com VIN e data de fabricação é o erro de modelagem "homônimo entre tipo e instância" (referência [mf-tih]) [p.454]. Mesmo quando a subclasse é razoável, a relação é fortemente acoplada e falha fácil com mudanças na superclasse. Custo: escrever métodos de encaminhamento, tediosos mas simples e com baixo risco de erro. Conselho: usar herança antes e aplicar a substituição se virar problema; semântica exigida: todo método do supertipo se aplica ao subtipo e toda instância do subtipo é instância do supertipo [p.454].
Mecanismo [p.455]:
1. Criar campo na subclasse que referencia o objeto da superclasse; inicializar com nova instância.
2. Para cada elemento da superclasse, criar função na subclasse que encaminha para a delegação; testar a cada grupo consistente (pares get/set só após ambos movidos).
3. Quando todos os elementos estiverem sobrescritos por encaminhadores, remover a ligação de herança.
Exemplo [p.455-459]: Scroll (pergaminho) estende CatalogItem; erro de modelagem: pergaminho físico vs item de catálogo (várias cópias do mesmo item); dados copiados exigem cuidado nas atualizações. Passos: campo `_catalogItem`, encaminhadores (`id`, `title`, `hasTag`), remover `extends` [p.456-457]. Para refletir o modelo correto, aplicar Mudar valor para referência: criar `_id` próprio no Scroll (item de catálogo temporário com ID nulo, "alerta vermelho" tolerado só durante o trabalho), achar repositório de itens de catálogo por ID, adicionar `catalogID` e `catalog` ao construtor com Mudar declaração de função, usar `catalog.get(catalogID)`, e remover `title`/`tags` dos parâmetros [p.457-459]. (O código final do último passo está truncado no fim do capítulo, p.459; o texto extraído termina com o construtor ainda com `title, tags` e sem mostrar a remoção, ou seja, o bloco mostra o estado antes da remoção dos parâmetros.)
Citações curtas de prova:
- "se as funções da superclasse não fizerem sentido na subclasse, é sinal de que eu não deveria estar usando herança" [p.454] (paráfrase curta)
O que NÃO diz: não aborda herança múltipla; não discute interfaces/traits.
Relevância: refactoring-expert: ALTA; code-review-expert: ALTA (critério: subclasse que não satisfaz todo contrato do pai, Stack/List, tipo-instância); api-design-expert: MÉDIA (expor só a interface necessária via delegação, não herdar API inteira); testing-tdd-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert e code-review-expert (critérios de herança indevida).

---

### Bibliografia (PDF p.460-463)
Bibliografia e links ("bliki" de Fowler). Apenas estrutura. Itens relevantes para os artefatos (somente títulos citados no texto): [Feathers] Trabalho eficaz com código legado; [Kerievsky] Refatoração para padrões; [gof] Padrões de projeto; [mf-stc] Código autotestável; [mf-tc] Cobertura de testes; [mf-tdd] TDD; [mf-xunit]; [mf-pc] Mudança em paralelo (Parallel Change); [mf-bba] Branch por abstração; [mf-cqs] Separação comando-consulta; [mf-yagni]; [mf-ua] Princípio do acesso uniforme; [mf-vo] Objeto de valor; [mf-repos] Repositório; [mf-ref-pipe]; [mf-ref-doc]; [Opdyke]; [Parnas]; [Wake] Refactoring Workbook; [Ambler & Sadalage] Refactoring Databases. Sem conteúdo técnico além dos títulos/URLs.
Relevância: todas BAIXA (só pistas de leitura); testing-tdd-expert e api-design-expert: BAIXA (títulos mf-stc/mf-tc/mf-tdd; mf-pc/mf-bba para migração gradual de API).
Decisão sugerida: descartar como conteúdo; títulos podem servir de "ver também" (marcar como [fora do bloco] se usados).

### Lista de refatorações (PDF p.464-466)
Índice alfabético do catálogo (cerca de 60 itens listados, sem contagem exata verificada, incluindo "Agrupamentos de dados" listado como entrada solta, provável item de smell/extração). Nomes (PT/EN) como aparecem: Combinar funções em classe (Combine Functions into Class); Combinar funções em transformação (Combine Functions into Transform); Condensar Hierarquia (Collapse Hierarchy); Consolidar expressão condicional (Consolidate Conditional Expression); Decompor condicional (Decompose Conditional); Descer campo (Push Down Field); Descer método (Push Down Method); Deslocar instruções (Slide Statements); Dividir laço (Split Loop); Encapsular coleção (Encapsulate Collection); Encapsular registro (Encapsulate Record); Encapsular variável (Encapsulate Variable); Extrair classe (Extract Class); Extrair função (Extract Function); Extrair superclasse (Extract Superclass); Extrair variável (Extract Variable); Internalizar função (Inline Function); Internalizar variável (Inline Variable); Introduzir asserção (Introduce Assertion); Introduzir caso especial (Introduce Special Case); Introduzir objeto de parâmetros (Introduce Parameter Object); Mover campo (Move Field); Mover função (Move Function); Mover instruções para os pontos de chamada (Move Statements to Callers); Mover instruções para uma função (Move Statements into Function); Mudar declaração de função (Change Function Declaration); Mudar referência para valor (Change Reference to Value); Mudar valor para referência (Change Value to Reference); Ocultar delegação (Hide Delegate); Parametrizar função (Parameterize Function); Preservar objeto inteiro (Preserve Whole Object); Remover argumento de flag (Remove Flag Argument); Renomear campo (Rename Field); Remover código morto (Remove Dead Code); Remover intermediário (Remove Middle Man); Remover método de escrita (Remove Setting Method); Remover subclasse (Remove Subclass); Renomear variável (Rename Variable); Separar consulta de modificador (Separate Query from Modifier); Separar em fases (Split Phase); Separar variável (Split Variable); Subir campo (Pull Up Field); Subir corpo do construtor (Pull Up Constructor Body); Subir método (Pull Up Method); Substituir algoritmo (Substitute Algorithm); Substituir comando por função (Replace Command with Function); Substituir condicional aninhada por cláusulas de guarda (Replace Nested Conditional with Guard Clauses); Substituir condicional por polimorfismo (Replace Conditional with Polymorphism); Substituir construtor por função de factory (Replace Constructor with Factory Function); Substituir consulta por parâmetro (Replace Query with Parameter); Substituir código de tipos por subclasses (Replace Type Code with Subclasses); Substituir código internalizado por chamada de função (Replace Inline Code with Function Call); Substituir função por comando (Replace Function with Command); Substituir laço por pipeline (Replace Loop with Pipeline); Substituir parâmetro por consulta (Replace Parameter with Query); Substituir primitivo por objeto (Replace Primitive with Object); Substituir subclasse por delegação (Replace Subclass with Delegate); Substituir superclasse por delegação (Replace Superclass with Delegate); Substituir variável derivada por consulta (Replace Derived Variable with Query); Substituir variável temporária por consulta (Replace Temp with Query).
Nota de extração: "Agrupamentos de dados" aparece entre Extrair variável e Internalizar função (p.464), possivelmente resíduo de extração (é nome de smell, não refatoração). Não aparecem no índice: Internalizar classe (Inline Class), apesar de citada na tabela de smells (p.467-469); marcar como [ausente no índice do bloco].
Relevância: refactoring-expert: ALTA (lista-mestre de nomes PT/EN para a skill).
Decisão sugerida: usar em refactoring-expert (glossário PT/EN dos nomes).

### Tabela "Maus cheiros no código" -> refatorações comuns (PDF p.467-469)
Resumo: tabela de mapeamento smell -> refatorações comuns. Nomes dos smells aparecem em PT; o inglês só nas refatorações. Este mapeamento é ALTA relevância para refactoring-expert e code-review-expert. (Observação: a extração da tabela quebrou colunas; a ordem das refatorações foi preservada, mas "Agrupamentos de dados" aparece colado a "Extrair classe" na primeira linha.)
Enumeração (smell: refatorações comuns) [p.467-469]:
- Agrupamentos de dados (Data Clumps): Extrair classe, Introduzir objeto de parâmetros, Preservar objeto inteiro [p.467]
- Alteração divergente (Divergent Change): Separar em fases, Mover função, Extrair função, Extrair classe [p.467]
- Cadeias de mensagens (Message Chains): Ocultar delegação, Extrair função, Mover função [p.467]
- Campo temporário (Temporary Field): Extrair classe, Mover função, Introduzir caso especial [p.467]
- Cirurgia com rifle (Shotgun Surgery): Mover função, Mover campo, Combinar funções em classe, Combinar funções em transformação, Separar em fases, Internalizar função, Internalizar classe [p.467]
- Classe de dados (Data Class): Encapsular registro, Remover método de escrita, Mover função, Extrair função, Separar em fases [p.467]
- Classe grande (Large Class): Extrair classe, Extrair superclasse, Substituir código de tipos por subclasses [p.467]
- Classes alternativas com interfaces diferentes (Alternative Classes with Different Interfaces): Mudar declaração de função, Mover função, Extrair superclasse [p.467]
- Comentários (Comments): Extrair função, Mudar declaração de função, Introduzir asserção [p.467-468]
- Código duplicado (Duplicated Code): Extrair função, Deslocar instruções, Subir método [p.468]
- Dados globais (Global Data): Encapsular variável [p.468]
- Dados mutáveis (Mutable Data): Encapsular variável, Separar variável, Deslocar instruções, Extrair função, Separar consulta de modificador, Remover método de escrita, Substituir variável derivada por consulta, Combinar funções em classe, Combinar funções em transformação, Mudar referência para valor [p.468]
- Elemento ocioso (Lazy Element): Internalizar função, Internalizar classe, Condensar hierarquia [p.468]
- Função longa (Long Function): Extrair função, Substituir variável temporária por consulta, Introduzir objeto de parâmetros, Preservar objeto inteiro, Substituir função por comando, Decompor condicional, Substituir condicional por polimorfismo, Dividir laço [p.468]
- Generalidade especulativa (Speculative Generality): Condensar hierarquia, Internalizar função, Internalizar classe, Mudar declaração de função, Remover código morto [p.468]
- Herança recusada (Refused Bequest): Descer método, Descer campo, Substituir subclasse por delegação, Substituir superclasse por delegação [p.468]
- Intermediário (Middle Man): Remover intermediário, Internalizar função, Substituir superclasse por delegação, Substituir subclasse por delegação [p.469]
- Inveja de recursos (Feature Envy): Mover função, Extrair função [p.469]
- Laços (Loops): Substituir laço por pipeline [p.469]
- Lista longa de parâmetros (Long Parameter List): Substituir parâmetro por consulta, Preservar objeto inteiro, Introduzir objeto de parâmetros, Remover argumento de flag, Combinar funções em classe [p.469]
- Nome misterioso (Mysterious Name): Mudar declaração de função, Renomear variável, Renomear campo [p.469]
- Obsessão por primitivos (Primitive Obsession): Substituir primitivo por objeto, Substituir código de tipos por subclasses, Substituir condicional por polimorfismo, Extrair classe, Introduzir objeto de parâmetros [p.469]
- Switches repetidos (Repeated Switches): Substituir condicional por polimorfismo [p.469]
- Trocas escusas (Insider Trading): Mover função, Mover campo, Ocultar delegação, Substituir subclasse por delegação, Substituir superclasse por delegação [p.469]
Nomes em inglês dos smells acima: os equivalentes em inglês entre parênteses NÃO aparecem neste bloco (só os nomes em PT); foram inferidos/rotulados por mim e devem ser marcados [fora do livro/bloco] se usados.
Observação: este bloco traz só o mapeamento; a descrição de cada smell não está aqui [a localização no livro, Cap. 3, é conhecimento prévio: fora do bloco].
O que este trecho NÃO diz: não define cada smell nem critério de detecção; apenas relaciona a refatorações.
Relevância: refactoring-expert: ALTA (tabela smell->refatoração; núcleo do catálogo de maus cheiros); code-review-expert: ALTA (nomes de smells como critério de revisão e a ação sugerida); testing-tdd-expert: NENHUMA; api-design-expert: MÉDIA (Lista longa de parâmetros, Remover argumento de flag, Introduzir objeto de parâmetros, Mudar declaração de função, Separar consulta de modificador, Encapsular).
Decisão sugerida: usar em refactoring-expert (references/smells-para-refatoracoes) e code-review-expert (tabela de apoio).

### Propaganda e páginas de editora (PDF p.470-480)
Anúncios de outros livros (NoSQL Essencial; Programação web com Node e Express; Candlestick; Avaliando Empresas, Investindo em Ações; Manual de Análise Técnica). Sem relação com refatoração.
Relevância: NENHUMA em todos. Decisão: descartar.

---

## Resumo transversal (apoio às decisões)
- Conselho recorrente de Fowler sobre herança: usar herança primeiro e migrar para delegação se começar a dar problema; a migração é sempre possível via Substituir subclasse/superclasse por delegação [p.434-435, 454].
- Sinais de herança indevida citados: funções do pai que não fazem sentido no filho (Stack/List); filho que não é instância válida do pai em todos os usos; confusão tipo vs instância (modelo de carro / carro físico; item de catálogo / pergaminho); necessidade de variar em mais de um eixo; necessidade de mudar de tipo dinamicamente; acoplamento forte entre pai e filho, pior entre módulos de equipes diferentes [p.434, 454, 456].
- `instanceof`/verificação explícita de classe é sinalizado como mau cheiro [p.425, 449].
- Prática de teste: testar após cada passo pequeno; "esperar que alguns falhem" em passo intermediário; quebrar de propósito o valor retornado para provar que o teste exercita a subclasse; diferenças entre métodos "idênticos" podem revelar comportamento sem teste [p.403, 417, 440].
- Padrão de transição segura: encapsular criação com função de factory antes de mexer em subclasses; usar referência de volta ao host e métodos de despacho temporários [p.416, 422, 435, 438].

## Checklist de cobertura
- Primeira página lida: 401
- Última página lida: 480 (último marcador do arquivo confirmado via Grep)
- Páginas sem texto útil ou ilegíveis: 470-480 (propaganda de outros livros); 460-463 e 464-466 só listas (bibliografia/índice de refatorações)
- Problemas de extração observados: tabela de smells com colunas desalinhadas (nome do smell colado à primeira refatoração, ex.: "AgrupamentosExtrair classe"); código com indentação perdida e `class X…` como indicador de contexto; "Agrupamentos de dados" aparece solto no índice de refatorações (p.464); exemplo final de Substituir superclasse por delegação termina no passo de remover title/tags com código ainda mostrando os parâmetros (p.459, trecho possivelmente em inglês "load routine…"); números impressos de página não visíveis; grafias do original como "NorweigianBlueParrot" e "Substituir enumeração pelo padrão State/Strategy" mantidas como no texto.
- Capítulos/seções cobertos integralmente: Subir método, Subir campo, Subir corpo do construtor, Descer método, Descer campo, Substituir código de tipos por subclasses, Remover subclasse, Extrair superclasse, Condensar hierarquia, Substituir subclasse por delegação, Substituir superclasse por delegação (todo o restante do Cap. 12 após a introdução); Bibliografia; Lista de refatorações; tabela de maus cheiros.
- Capítulos/seções que continuam em outro bloco: o Cap. 12 começa em p.401 (primeiras páginas do capítulo; não há continuação para o próximo bloco; o livro termina no apêndice/bibliografia). Nenhuma seção continua além de p.480.
