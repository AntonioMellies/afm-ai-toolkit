# Notas: Fowler, Refatoração (2ª ed., JS), bloco 03, PDF p.161-240

Observações gerais: o bloco cobre o final do Cap. 6 (catálogo "Primeiro conjunto de refatorações") e o início do Cap. 7 (Encapsulamento). Os números impressos de página não aparecem no texto extraído; só os marcadores "PDF PAGINA N" são usados. Cada refatoração do livro segue o formato: nome (aliases/inversa) -> Motivação -> Procedimento (mecanismo) -> Exemplo. Todos os passos de mecanismo abaixo são paráfrase; muitos terminam em "Teste" (rodar a suíte após cada passo pequeno).

---

### Internalizar função (Inline Function), final (PDF p.161-162) [continua do bloco anterior]
Fim dos exemplos da refatoração. Caso simples: copiar a expressão de retorno da função chamada para o ponto de chamada. Casos mais complexos exigem adaptar nomes de argumentos e, se houver dificuldade, ir uma linha por vez.
Conceitos e regras:
- Caso trivial: substituir a chamada pela expressão de retorno da função chamada [p.161].
- Se o nome do parâmetro declarado difere do argumento passado, adaptar o código ao internalizar [p.161].
- Se a função a internalizar tem várias instruções (exemplo gatherCustomerData, que preenche uma lista de saída), mover uma linha por vez usando "Mover instruções para os pontos de chamada" (Move Statements to Callers) e só então remover a função [p.162].
- Regra de ritmo: estar sempre pronto a dar passos menores; se tentou rápido e os testes falharam, voltar ao último estado verde e refazer em passos menores [p.162].
Citações curtas de prova:
- "O ponto principal, nesse caso, é sempre estar pronto para dar passos menores." [p.162]
O que este trecho NÃO diz: a motivação e o procedimento completo de Internalizar função estão no bloco anterior (não aparecem aqui).
Relevância: refactoring-expert: ALTA (princípio de passo pequeno e retorno ao último verde); testing-tdd-expert: MÉDIA (ciclo "falhou -> voltar ao último verde"); api-design-expert: NENHUMA; code-review-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert (regra de reduzir o passo quando os testes falham); testing-tdd-expert como exemplo do uso de testes como rede.

---

### Extrair variável (Extract Variable) (PDF p.162-167)
Aliases: antes "Introduzir variável explicativa"; inversa de Internalizar variável. Dá nome a uma subexpressão complexa.
Resumo: criar uma variável imutável com nome que explique uma parte de uma expressão e substituir a expressão. Se o nome faz sentido além da função, preferir extrair como função/método (em classe, vira getter).
Conceitos e regras:
- Motivação: expressões complexas ficam legíveis quando partes recebem nome; variáveis também são ganchos para depurador/print [p.163].
- Decidir o contexto do nome: se só faz sentido na função, variável; se faz sentido mais amplo, considerar expor como função, o que reduz duplicação e revela intenção [p.163-164].
- Se promover o nome exigir esforço muito maior, deixar para depois (via "Substituir variável temporária por consulta"); em classe é fácil usar Extrair função [p.164].
- Mecanismo [p.164]: (1) garantir que a expressão não tem efeitos colaterais; (2) declarar variável imutável (const) recebendo cópia da expressão; (3) substituir a expressão original pela variável; (4) testar. Se a expressão aparece mais de uma vez, substituir cada ocorrência testando após cada uma.
- Exemplo (preço = preço base - desconto por quantidade + frete): extrai-se basePrice, quantityDiscount, shipping um a um; o comentário que listava os termos é removido quando o código passa a dizer o mesmo [p.164-166].
- Exemplo em classe: os mesmos nomes viram getters (basePrice, quantityDiscount, shipping) porque se aplicam ao pedido todo; objetos dão contexto para compartilhar lógica entre métodos [p.166-167].
Citações curtas de prova:
- "Garanta que a expressão que você quer extrair não tenha efeitos colaterais." [p.164]
O que este trecho NÃO diz: não discute quando a extração piora a legibilidade (variáveis demais).
Relevância: refactoring-expert: ALTA (catálogo + mecanismo); clean-code-expert (artefato existente): ALTA; code-review-expert: BAIXA (expressão complexa sem nome como sinal); testing-tdd-expert: BAIXA; api-design-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert/references (catálogo de refatorações com mecanismo).

---

### Internalizar variável (Inline Variable) (PDF p.167-168)
Aliases: antes "Internalizar variável temporária"; inversa de Extrair variável.
Resumo: substituir a variável pela expressão quando o nome não diz mais que a expressão ou quando a variável atrapalha refatorar o código ao redor.
Conceitos e regras:
- Motivação: o nome não comunica além da própria expressão; ou a variável bloqueia outra refatoração [p.167].
- Mecanismo [p.168]: (1) verificar que o lado direito da atribuição está livre de efeitos colaterais; (2) se não for imutável, torná-la imutável e testar (confirma que há uma única atribuição); (3) encontrar a primeira referência e substituir pelo lado direito; (4) testar; (5) repetir por todas as referências; (6) remover declaração e atribuição; (7) testar.
Citações curtas: nenhuma necessária.
O que este trecho NÃO diz: não dá critério de quando preferir manter a variável além do nome redundante.
Relevância: refactoring-expert: ALTA (catálogo + mecanismo); demais: NENHUMA/BAIXA.
Decisão sugerida: usar em refactoring-expert.

---

### Mudar declaração de função (Change Function Declaration) (PDF p.168-177)
Aliases: Renomear função, Renomear método, Adicionar parâmetro, Remover parâmetro, Modificar assinatura (Change Signature).
Resumo: refatoração das "junções" do sistema: nome e parâmetros de uma função. Tem dois procedimentos: simples (mudar tudo de uma vez) e de migração (gradual, com função intermediária). Escolher migração quando houver muitas chamadas, chamadas difíceis de alcançar, método polimórfico, mudança complexa ou API publicada.
Conceitos e regras:
- Motivação: declarações de funções são as junções entre partes do software; boas junções facilitam estender, más junções dificultam entender e mudar [p.169].
- Renomear assim que se entende um nome melhor; dica: escrever um comentário que descreva o propósito e transformá-lo no nome [p.169].
- Parâmetros definem o contexto de uso: trocar "pessoa" por "número de telefone" torna a função reutilizável e reduz acoplamento entre módulos [p.169-170].
- Escolha de parâmetros não tem regra simples (ex.: passar o pagamento inteiro vs. a data de vencimento: acopla à interface do objeto, mas facilita evoluir a lógica sem mudar chamadores); "não há resposta correta, especialmente com o passar do tempo", por isso dominar esta refatoração [p.170].
- Quando só renomeia, o livro chama a refatoração de Renomear função, com o mesmo procedimento [p.170].
- Procedimento simples [p.171]: (1) se remove parâmetro, garantir que não é referenciado no corpo; (2) alterar a declaração para a desejada; (3) achar todas as referências à declaração antiga e atualizá-las; (4) testar. Separar mudanças: renomear e adicionar parâmetro em passos distintos.
- Procedimento de migração [p.171]: (1) se necessário, refatorar o corpo para facilitar a extração; (2) Extrair função no corpo para criar a nova função (nome temporário fácil de pesquisar se o nome for o mesmo); (3) se a nova função precisa de parâmetros adicionais, adicioná-los pelo procedimento simples; (4) testar; (5) Internalizar função na função antiga (cada chamada, uma por vez); (6) se usou nome temporário, Mudar declaração de função de novo para restaurar o nome; (7) testar.
- Polimorfismo: acrescentar nível de indireção em cada vinculação; se polimórfico em uma só hierarquia, basta método de encaminhamento na superclasse; sem ligação na superclasse, é preciso encaminhamento em cada classe de implementação [p.171-172].
- API publicada: pausar após criar a nova função, marcar a original como obsoleta (deprecated), esperar clientes migrarem e remover quando tiver certeza [p.172, p.173-174]. Mesmo sem conseguir apagar a antiga, já se tem um nome melhor para o código novo [p.174].
- Ferramentas: tipagem estática e IDE tornam renomear automático e seguro; sem tipagem, busca gera falso-positivos [p.172]. Simples falha quando há muitos pontos de chamada ou nomes não únicos (ex.: changeAddress existe em Pessoa e em ContratoDeSeguro) [p.173]. Se o procedimento simples falhar, restaurar o último estado bom e usar migração [p.173].
- Exemplos: renomear circum para circumference (simples e migração) [p.172-173]; adicionar parâmetro isPriority a addReservation de Livro via nome temporário zz_addReservation, com asserção de que o novo parâmetro foi passado (Introduzir asserção) para pegar chamadas esquecidas, depois Internalizar função e renomear [p.174-175]; trocar parâmetro cliente por código de estado em inNewEngland: Extrair variável stateCode, Extrair função (nome temporário xxNEW...), Internalizar variável, Internalizar função nas chamadas, renomear de volta [p.175-177].
- Ferramentas automáticas deixam a migração menos necessária (tratam renomeações complexas) e mais eficiente (extrair/internalizar rápidos e seguros) [p.177].
Citações curtas de prova:
- "Boas junções me permitem acrescentar novas partes ao sistema com facilidade" [p.169]
- "Se vejo uma função com um nome incorreto, é mandatório que eu o altere assim que compreender qual seria um nome melhor." [p.169]
- "A única resposta correta para esse problema é que não há uma resposta correta, especialmente com o passar do tempo." [p.170] (aprox. 20 palavras)
O que este trecho NÃO diz: não prescreve política de versionamento/depreciação (prazos, semver, avisos); só menciona marcar como obsoleta e esperar os clientes migrarem. Nada sobre compatibilidade binária ou contratos de rede.
Relevância: refactoring-expert: ALTA (mecanismo simples e de migração completos); api-design-expert: ALTA (migração gradual, API publicada, deprecação, parâmetro como acoplamento/escolha de contrato, nomes como junções); code-review-expert: MÉDIA (nome ruim/parâmetro inadequado como critério); testing-tdd-expert: MÉDIA (asserção para validar migração; testar a cada passo).
Decisão sugerida: usar em refactoring-expert (mecânica) e api-design-expert (migração de API publicada: nova função, deprecar antiga, remover quando todos migrarem; "pausar a refatoração"); sinal de nome ruim em code-review-expert.

---

### Encapsular variável (Encapsulate Variable) (PDF p.177-182)
Aliases: antes "Autoencapsular campo", "Encapsular campo".
Resumo: dados são mais difíceis de mover que funções (não dá para deixar um "encaminhador"), então encapsular o acesso por funções antes de reorganizar. Dá também um ponto para validação, monitoramento e lógica de atualização.
Conceitos e regras:
- Motivação: mover dados exige alterar todas as referências num único ciclo; quanto maior o escopo, mais difícil (por isso dados globais são problemáticos). Encapsular transforma a tarefa difícil (reorganizar dados) na simples (reorganizar funções) [p.178].
- Hábito do autor: todo dado mutável de escopo maior que uma função fica acessível só por funções; em código legado, encapsular ao tocar nele para evitar mais acoplamento [p.178].
- Explica a ênfase de OO em dados privados; campo público sugere Encapsular campo [p.178].
- Autoencapsulamento (acesso interno por getters/setters) é visto como exagero; se a classe é tão grande que precisa disso, deveria ser dividida; mas é passo útil antes de dividir uma classe [p.179].
- Dados imutáveis precisam muito menos de encapsulamento: podem ser copiados em vez de movidos [p.179].
- Mecanismo [p.179]: (1) criar funções de encapsulamento (leitura e escrita); (2) rodar verificações estáticas; (3) para cada referência, substituir por chamada à função (teste após cada); (4) restringir visibilidade da variável (se impossível, renomear para algo inusitado e testar para achar acessos remanescentes); (5) testar; (6) se o valor for registro, considerar Encapsular registro.
- Em JS, restringir visibilidade movendo variável e acessores para seu próprio arquivo e exportando só os acessores [p.180].
- Convenções de nome: o autor evita prefixo "get" e getter/setter sobrecarregado ("Overloaded Getter Setter"), mas mantém "set" [p.180].
- Encapsular o valor, não só a referência: a refatoração básica não impede mutação do conteúdo. Opções: getter devolve cópia (rasa) dos dados (favorito do autor, especialmente em listas); ou impedir mudanças com Encapsular registro (classe wrapper só com getters). Atenção a código que contava em alterar o dado compartilhado; os testes devem detectar [p.181-182].
- Detectar/impedir alterações é medida frequentemente temporária: eliminar as modificações ou oferecer funções apropriadas, depois devolver cópia [p.182]. Copiar também no setter pode evitar acidentes quando não se precisa de ligação com o dado original [p.182]. Cópia e wrapper só protegem um nível; níveis mais profundos precisam de mais cópias/encapsulamento [p.182].
Citações curtas de prova:
- "Quanto maior o escopo dos dados, mais importante será encapsulá-los." [p.178]
- "A imutabilidade é extremamente eficaz para preservar dados." [p.179]
O que este trecho NÃO diz: não trata concorrência/threads nem custo de desempenho de cópia além de uma menção breve (efeito "desprezível").
Relevância: refactoring-expert: ALTA; api-design-expert: MÉDIA (getter devolvendo cópia/valor imutável como contrato; controle de acesso a estado compartilhado); code-review-expert: MÉDIA (variável global/mutável ampla, campo público como sinal); testing-tdd-expert: BAIXA (testes pegam cópias que quebram expectativa).
Decisão sugerida: usar em refactoring-expert (mecanismo); sinais de dados globais/campos públicos em code-review-expert.

---

### Renomear variável (Rename Variable) (PDF p.182-185)
Resumo: bons nomes estão no coração da programação clara; a importância do nome cresce com o escopo.
Conceitos e regras:
- Motivação: nomes ruins surgem por falta de cuidado, por melhor entendimento posterior ou por mudança de propósito do programa [p.183]. Variável de lambda de uma linha pode ter uma letra; parâmetros de funções pequenas podem ser concisos; em JS dinâmico o autor insere o tipo no nome (aCustomer); campos persistentes exigem nomeação mais cuidadosa [p.183].
- Mecanismo [p.183]: (1) se amplamente usada, considerar Encapsular variável; (2) achar todas as referências e alterar; (3) testar. Se há referências de outra base de código, é variável publicada e não dá para renomear. Se não muda, pode-se copiar para variável com novo nome e migrar gradualmente.
- Variável com escopo amplo: encapsular (title()/setTitle) e então renomear o campo; raramente se internalizam as funções de encapsulamento depois [p.184].
- Constante: criar o novo nome, atribuir o antigo a partir dele, migrar referências aos poucos e remover a cópia; serve também para variáveis somente leitura para clientes (ex.: export JS) [p.184-185].
Citações curtas de prova:
- "Dar bons nomes está no coração de uma programação clara." [p.183]
O que este trecho NÃO diz: não dá convenções de nomenclatura detalhadas além do dito.
Relevância: refactoring-expert: ALTA (mecanismo + caso de constante/publicada); clean-code-expert: ALTA; api-design-expert: MÉDIA (variável/constante publicada não pode ser renomeada; usar cópia/alias de transição); code-review-expert: MÉDIA (nome pouco claro).
Decisão sugerida: usar em refactoring-expert; nota sobre "publicada" em api-design-expert.

---

### Introduzir objeto de parâmetros (Introduce Parameter Object) (PDF p.185-190)
Resumo: grupos de dados que viajam juntos (agrupamento de dados, ex.: data início/fim) são substituídos por uma estrutura única, tornando a relação explícita e abrindo caminho para mover comportamento para essa estrutura.
Conceitos e regras:
- Motivação: encurta listas de parâmetros, dá consistência de nomes, e principalmente permite mudanças mais profundas: criar funções/classe com o comportamento comum, elevar a estrutura a nova abstração do domínio [p.186].
- Mecanismo [p.186]: (1) se não há estrutura apropriada, criar uma (preferir classe, e preferencialmente objeto de valor); (2) testar; (3) Mudar declaração de função para adicionar parâmetro da nova estrutura; (4) testar; (5) adaptar cada chamada para passar a instância correta, testando após cada; (6) para cada elemento da estrutura, substituir o uso do parâmetro original pelo elemento e remover o parâmetro; testar.
- Exemplo: readingsOutsideRange(station, min, max) com par min/max vindo do plano de operação (nomes diferentes: temperatureFloor/Ceiling) vira NumberRange (classe sem setters para virar value object). Em JS a chamada pode ficar como está; em outras linguagens, passar null temporariamente [p.187-189].
- Depois, mover comportamento (ex.: contains) para a classe, identificar outros pares min/max no código e adicionar igualdade por valor [p.189-190].
Citações curtas de prova:
- "a verdadeira eficácia dessa refatoração está no modo como ela permite modificações mais profundas no código" [p.186]
O que este trecho NÃO diz: não limita quantos parâmetros são "demais" (a lista longa de parâmetros como smell está em outro capítulo).
Relevância: refactoring-expert: ALTA (mecanismo); api-design-expert: ALTA (lista de parâmetros, objeto de parâmetros/range como contrato, evolução compatível ao adicionar parâmetro antes de remover); code-review-expert: MÉDIA (agrupamento de dados como sinal); clean-code-expert: MÉDIA.
Decisão sugerida: usar em refactoring-expert e api-design-expert (parâmetros agrupados em tipo de valor).

---

### Combinar funções em classe (Combine Functions into Class) (PDF p.190-195)
Resumo: quando várias funções operam sobre o mesmo corpo de dados (normalmente passado como argumento), criar uma classe que explicite o ambiente compartilhado.
Conceitos e regras:
- Motivação: classe explicita o contexto comum, simplifica chamadas (menos argumentos), dá referência para passar o objeto adiante e oportunidade de refatorar outros processamentos em métodos [p.190-191].
- Alternativa: Combinar funções em transformação; vantagem da classe: clientes podem alterar os dados nucleares e as derivações permanecem consistentes. Prefere classe a função aninhada (difícil de testar) e classe quando mais de uma função precisa ser exposta [p.191]. Linguagens sem classes usam Função como Objeto [p.191].
- Mecanismo [p.191]: (1) Encapsular registro no registro de dados comum (se não houver registro, Introduzir objeto de parâmetros); (2) para cada função que usa o registro, Mover função para a nova classe (argumentos que são membros da classe saem da lista); (3) cada parte de lógica que manipula os dados é extraída com Extrair função e movida para a classe.
- Exemplo (leituras de medidor de chá): lógica de preço base e valor tributável duplicada em vários clientes; já existe função calculateBaseCharge em outro lugar, mas funções soltas são fáceis de esquecer; criar classe Reading, mover calculateBaseCharge (renomeada baseCharge, sem diferenciar campo de derivado: Princípio do Acesso Uniforme), extrair e mover taxableCharge, trocar clientes um a um [p.191-194].
- Como derivados são calculados sob demanda, não há inconsistência se os dados armazenados mudam; classe é conveniente se há chance de dados mutáveis [p.194-195].
Citações curtas de prova:
- "o problema com funções de nível mais alto como essa é que se torna fácil nos esquecermos delas" [p.192]
O que este trecho NÃO diz: não define coesão formal nem métricas.
Relevância: refactoring-expert: ALTA; clean-code-expert/clean-architecture-expert: MÉDIA; code-review-expert: MÉDIA (lógica duplicada espalhada, funções que giram em torno do mesmo registro); api-design-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert.

---

### Combinar funções em transformação (Combine Functions into Transform) (PDF p.195-200)
Resumo: reunir cálculos derivados em uma função de transformação (enrich) que recebe o registro original e devolve cópia enriquecida com campos derivados, centralizando a lógica de derivação.
Conceitos e regras:
- Motivação: valores derivados costumam ser calculados em vários pontos; reuni-los dá um local consistente e evita duplicação; extrair função só ajuda se as funções forem achadas, o que é difícil se estiverem longe dos dados [p.195-196].
- Diferença para a classe: classe é bem melhor se os dados originais forem atualizados no código; transformação guarda valores derivados e fica inconsistente se o original mudar [p.196]. Em linguagens com estruturas imutáveis, transformações são mais comuns; também servem com dados somente leitura (ex.: dados de exibição em página web) [p.200].
- Mecanismo [p.196]: (1) criar função de transformação que aceita o registro e devolve os mesmos valores (geralmente com cópia profunda; vale escrever teste de que o registro original não é alterado); (2) escolher uma lógica, mover o corpo para a transformação criando novo campo, e mudar o cliente para ler o novo campo (extrair função antes se complexa); (3) testar; (4) repetir para as demais.
- Convenção de nome: "enrich" quando a saída é essencialmente os mesmos dados com informação extra; "transform" quando é algo diferente [p.198].
- Aceita mutar o resultado dentro da transformação e imutabilidade nas fronteiras; escolhe nomes (aReading) para facilitar mover código [p.198].
- Teste de que a transformação não altera a entrada: clonar o objeto como oráculo e comparar com deepEqual [p.199].
- Problema: cliente que altera um campo gera dados inconsistentes; em JS a melhor opção é Combinar funções em classe [p.200].
Citações curtas de prova:
- "usar uma classe é muito melhor se os dados originais forem atualizados no código" [p.196]
O que este trecho NÃO diz: não trata de performance de cópia profunda.
Relevância: refactoring-expert: ALTA; testing-tdd-expert: MÉDIA (teste de não-mutação da entrada com oráculo); api-design-expert: MÉDIA (enrich vs transform, imutabilidade nas fronteiras); code-review-expert: BAIXA (duplicação de lógica de derivação).
Decisão sugerida: usar em refactoring-expert; exemplo do teste de entrada inalterada em testing-tdd-expert.

---

### Separar em fases (Split Phase) (PDF p.200-206)
Resumo: quando um trecho lida com duas tarefas diferentes, dividi-lo em duas fases sequenciais ligadas por uma estrutura de dados intermediária, de modo a poder tratar cada assunto separadamente.
Conceitos e regras:
- Motivação: pensar em cada módulo sem manter o outro na cabeça; exemplo clássico: compilador (tokens, árvore sintática, transformações, código-objeto) [p.201-202]. Típico quando as entradas não refletem o modelo necessário ao processamento (parse + lógica) ou quando passos sequenciais são muito diferentes [p.201].
- Melhor pista: etapas do código usam conjuntos de dados e funções distintos [p.202].
- Mecanismo [p.202]: (1) extrair o código da segunda fase em função própria; (2) testar; (3) introduzir uma estrutura intermediária como argumento adicional da função extraída; (4) testar; (5) analisar cada parâmetro da segunda fase: se usado pela primeira, movê-lo para a estrutura intermediária, testando a cada vez (se a segunda não deve usá-lo, extrair o resultado de cada uso para campo da estrutura e Mover instruções para os pontos de chamada na linha que o preenche); (6) Extrair função no código da primeira fase, devolvendo a estrutura intermediária (também se pode extrair a primeira fase em objeto de transformação).
- Exemplo priceOrder: fase 1 calcula preço dependente do produto (basePrice, discount), fase 2 aplica frete; viram calculatePricingData e applyShipping com priceData intermediário; preferência de mover o máximo de parâmetros para a estrutura intermediária [p.202-206].
Citações curtas de prova:
- "A melhor pista é quando diferentes etapas do fragmento de código usam conjuntos de dados e funções distintos." [p.202]
O que este trecho NÃO diz: não dá o exemplo de parse de string de pedido em passos detalhados (apenas como ilustração inicial do cabeçalho, p.200-201).
Relevância: refactoring-expert: ALTA; clean-architecture-expert: MÉDIA (separar fases/parse de entrada vs lógica); code-review-expert: MÉDIA (função que mistura duas tarefas); testing-tdd-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert.

---

### CAPÍTULO 7: Encapsulamento (introdução) (PDF p.207-208)
Resumo: introdução do capítulo; apresenta o conjunto de refatorações e a lógica: ocultar "segredos" de módulos (Parnas).
Conceitos e regras:
- Critério importante de decomposição em módulos: identificar os segredos que cada módulo deve ocultar; estruturas de dados são os segredos mais comuns [p.207].
- Mapa do capítulo: Encapsular registro, Encapsular coleção, Substituir primitivo por objeto (efeitos secundários surpreendentes), Substituir variável temporária por consulta (ajuda ao dividir funções longas), Extrair classe/Internalizar classe, Ocultar delegação (e a inversa Remover intermediário, porque ocultar demais infla interfaces), e Substituir algoritmo [p.207-208].
Citações curtas: nenhuma.
O que este trecho NÃO diz: Substituir algoritmo é apenas citada; seu mecanismo não aparece neste bloco.
Relevância: refactoring-expert: MÉDIA (índice do capítulo); api-design-expert: MÉDIA (ocultar segredos/informação como critério).
Decisão sugerida: usar como contexto em refactoring-expert.

---

### Encapsular registro (Encapsulate Record) (PDF p.208-217)
Aliases: antes "Substituir registro por classe de dados".
Resumo: trocar um registro/estrutura simples (ou hash) por classe com métodos de acesso, ocultando o que é armazenado versus o que é calculado.
Conceitos e regras:
- Motivação: em registros simples é preciso distinguir armazenado e calculado (ex.: intervalo start/end/length); objetos escondem isso. Prefere objetos a registros para dados mutáveis; para dados imutáveis pode-se manter todos os valores no registro (com passo de enriquecimento). Renomear campo fica mais fácil (acessores para nome antigo e novo) [p.208-209].
- Hashmaps/dicionários não explicitam campos; quanto maior o escopo, mais problemas; se precisar torná-los explícitos, transformar em classes. Estruturas aninhadas (JSON/XML) também podem ser encapsuladas [p.209].
- Mecanismo [p.210]: (1) Encapsular variável na variável que guarda o registro, dando nomes fáceis de procurar às funções; (2) substituir o conteúdo por classe simples que encapsula o registro, com método que devolve o registro bruto, e fazer as funções usarem esse método; (3) testar; (4) criar funções que devolvam o objeto em vez do registro bruto; (5) para cada usuário, trocar a função que devolve registro pela que devolve objeto, usando acessor (criando se preciso), testando após cada; em registro complexo/aninhado, tratar primeiro os clientes que atualizam, e considerar devolver cópia ou proxy somente leitura aos que só leem; (6) remover o acessor de dados brutos e as funções com nome fácil de procurar; (7) testar; (8) se os campos são estruturas, aplicar Encapsular registro e Encapsular coleção recursivamente.
- Exemplo simples (organization): o getter "getRawDataOfOrganization" é propositalmente feio e de vida curta; depois pode-se desdobrar _data em campos, o que rompe a ligação com o registro de entrada [p.210-212].
- Exemplo aninhado (customerData): focar nas atualizações (agrupá-las num só lugar é a parte mais importante); extrair setUsage e movê-la para a classe [p.212-214]. Para verificar que todas as atualizações foram tratadas: fazer rawData devolver deep copy (se a cobertura de testes for boa, um teste falha) ou proxy somente leitura, ou cópia congelada [p.214-215].
- Leituras: (a) extrair cada leitura para a classe (API explícita, mas muito código para casos especiais); (b) devolver a estrutura lista-e-hash por cópia (custo de cópia e confusão se clientes esperam alterar o original; medir antes de se preocupar); (c) aplicar Encapsular registro recursivamente (controle máximo, mais trabalho, talvez com Mudar referência para valor) [p.215-216]. Mistura criteriosa de getters e novas classes pode funcionar [p.216].
Citações curtas de prova:
- "Ao trabalhar com uma estrutura de dados grande, gosto de me concentrar nas atualizações." [p.214]
O que este trecho NÃO diz: não descreve a implementação do proxy somente leitura em JS (deixada como exercício, p.215).
Relevância: refactoring-expert: ALTA; api-design-expert: MÉDIA (ocultar representação, dados brutos vs objeto, cópia/proxy); testing-tdd-expert: MÉDIA (usar cobertura de testes + deep copy como detector de atualizações esquecidas); code-review-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert; truque deep copy como detector em testing-tdd-expert.

---

### Encapsular coleção (Encapsulate Collection) (PDF p.217-221)
Resumo: encapsular uma coleção exige mais que getter/setter da referência: o getter não deve entregar a coleção mutável; a classe oferece add/remove.
Conceitos e regras:
- Motivação: encapsular dado mutável para ver quando e como é modificado; erro comum: o acessor devolve a própria coleção e membros mudam sem a classe intervir [p.217].
- Contar com hábito da equipe de não modificar fora do módulo é arriscado; melhor impedir acidentalmente [p.218].
- Opções para o getter [p.218-219]: (a) nunca devolver coleção (método específico por uso, ex.: numberOfOrders): o autor discorda por perder pipelines de coleção e criar código extra; (b) proxy/visão somente leitura (ex.: Java lança exceção na escrita); (c) devolver cópia (mais comum; pode surpreender quem espera alterar o original; custo em coleções enormes, medir antes). Proxy reflete mudanças posteriores, cópia não. Ponto crucial: consistência na base de código, usar um só procedimento [p.218-219].
- Mecanismo [p.219]: (1) Encapsular variável se a referência não estiver encapsulada; (2) adicionar funções de adicionar/remover elementos (se há setter da coleção, usar Remover método de escrita ou fazê-lo copiar); (3) verificações estáticas; (4) achar referências que chamam modificadores da coleção e trocar pelas novas funções, testando após cada; (5) fazer o getter devolver visão protegida (proxy somente leitura ou cópia); (6) testar.
- Exemplo (Person.courses): addCourse e removeCourse (decide o que fazer ao remover item ausente: aqui lança RangeError por padrão, com callback opcional); setter passa a guardar cópia; getter devolve slice. "Moderadamente paranoico": ordenar array em JS modifica o original, então copiar antes de operações que possam mutar [p.219-221].
Citações curtas de prova:
- "contar com esses hábitos, em geral, não é uma atitude sábia" [p.218]
- "prefiro copiá-las desnecessariamente a depurar erros em consequência de modificações inesperadas" [p.221]
O que este trecho NÃO diz: não aborda coleções concorrentes nem imutáveis persistentes.
Relevância: refactoring-expert: ALTA; api-design-expert: ALTA (contrato de getters de coleção: cópia vs proxy, consistência, add/remove explícitos, decisão sobre remoção de ausente); code-review-expert: ALTA (getter que devolve lista mutável é achado de revisão); testing-tdd-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert, api-design-expert e como critério em code-review-expert.

---

### Substituir primitivo por objeto (Replace Primitive with Object) (PDF p.221-226)
Aliases: antes "Substituir dado por objeto", "Substituir código de tipos por classe".
Resumo: valores simples (string/número) que ganham comportamento (formatação, validação, comparação) devem virar classe própria, que concentra a lógica antes duplicada.
Conceitos e regras:
- Motivação: decisões iniciais de usar dados simples deixam de servir; ex.: telefone como string passa a exigir formatação/código de área; a lógica duplica-se. Ao querer algo além de exibir, criar classe; no início só encapsula o primitivo, mas vira local para comportamento. Muitos desenvolvedores experientes a consideram uma das mais importantes, embora contraintuitiva para iniciantes [p.222-223].
- Mecanismo [p.223]: (1) Encapsular variável se necessário; (2) criar classe de valor simples (construtor recebe o valor existente, getter do valor); (3) verificações estáticas; (4) mudar o setter para criar instância da classe e guardá-la (ajustando o tipo do campo); (5) mudar o getter para devolver o resultado do getter da nova classe; (6) testar; (7) considerar Renomear função nos acessores originais; (8) considerar explicitar papel como objeto de valor ou de referência (Mudar referência para valor / Mudar valor para referência).
- Exemplo (prioridade do pedido): classe Priority com toString (conversão, não getter), getter renomeado priorityString, depois expõe objeto Priority; construtor aceita instância existente; adiciona validação de valores legais, índice, equals, higherThan, lowerThan; cliente passa a usar higherThan(new Priority("normal")) em vez de comparar strings [p.223-226].
Citações curtas de prova:
- "Esses pequenos valores começam muito humildemente, mas, depois de nutridos, poderão crescer e se transformar em ferramentas úteis." [p.222]
O que este trecho NÃO diz: não discute custo de alocação nem alternativas como enums/tipos nativos de cada linguagem.
Relevância: refactoring-expert: ALTA; clean-architecture-expert/domain-driven-design (existentes): ALTA (value object); api-design-expert: MÉDIA (tipos de domínio no lugar de strings mágicas, validação na fronteira); code-review-expert: ALTA (obsessão por primitivos, comparações com strings literais como achado); testing-tdd-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert e code-review-expert (sinal: strings/números com comportamento espalhado).

---

### Substituir variável temporária por consulta (Replace Temp with Query) (PDF p.226-230)
Resumo: trocar variável temporária por método/função que calcula o valor, ajudando a extrair partes de funções grandes e evitando duplicação.
Conceitos e regras:
- Motivação: transformar variáveis em funções facilita extrair partes (sem passar variáveis), define fronteira clara, expõe dependências/efeitos colaterais inconvenientes e evita duplicar cálculos entre funções [p.227].
- Funciona melhor dentro de classe (contexto compartilhado); fora, risco de muitos parâmetros; funções aninhadas evitam isso mas limitam o compartilhamento [p.227].
- Só serve para variáveis calculadas uma vez e depois só lidas; podem ter várias atribuições se todas forem extraídas na consulta; o cálculo deve dar o mesmo resultado quando lida depois (exclui snapshots como oldAddress) [p.227].
- Mecanismo [p.228]: (1) verificar que a variável é totalmente definida antes do uso e que o cálculo não gera valor diferente a cada uso; (2) se não for somente leitura mas puder ser, tornar const; (3) testar; (4) extrair a atribuição para uma função (nome temporário se necessário); garantir ausência de efeitos colaterais (senão, Separar consulta de modificador); (5) testar; (6) Internalizar variável para remover a temporária.
- Exemplo (Order.price com basePrice e discountFactor): tornar basePrice const e testar (confirma ausência de atribuições esquecidas), extrair getter, internalizar; para discountFactor a função extraída leva as duas atribuições [p.228-230].
Citações curtas: nenhuma necessária.
O que este trecho NÃO diz: não trata custo de recomputar a consulta repetidamente.
Relevância: refactoring-expert: ALTA; code-review-expert: BAIXA; testing-tdd-expert: BAIXA (const como verificação); api-design-expert: NENHUMA.
Decisão sugerida: usar em refactoring-expert.

---

### Extrair classe (Extract Class) (PDF p.230-233)
Resumo: dividir classe que acumulou responsabilidades criando uma classe nova e movendo campos e métodos relacionados.
Conceitos e regras:
- Motivação: na prática classes crescem; sinais de que deve ser separada: classe grande demais para entender; subconjunto de dados e de métodos que formam um conjunto; subconjuntos de dados que mudam juntos ou dependem uns dos outros; teste mental: o que ficaria sem sentido se removesse um dado ou método?; subtipagem que afeta só alguns recursos ou de formas diferentes (sinal que surge mais tarde) [p.230-231].
- Mecanismo [p.231-232]: (1) decidir como separar responsabilidades; (2) criar nova classe-filha (no livro, "filha" = a que recebe) que expressa a responsabilidade; renomear a original se necessário; (3) criar instância ao construir a original e ligar da original para a nova; (4) Mover campo para cada campo, testando; (5) Mover função para cada método, começando pelos de nível mais baixo (os chamados, não os que chamam), testando; (6) revisar interfaces, remover métodos desnecessários, renomear; (7) decidir se expõe a nova classe e, se sim, considerar Mudar referência para valor.
- Exemplo: Person com officeAreaCode/officeNumber vira Person + TelephoneNumber; renomear tirando "office", telephoneNumber vira toString; considerar expor e aplicar Mudar referência para valor [p.232-233].
Citações curtas de prova:
- "Na prática, as classes crescem." [p.231]
O que este trecho NÃO diz: não dá limites numéricos de tamanho; o smell "Classe grande" fica em outro capítulo.
Relevância: refactoring-expert: ALTA (sinais + mecanismo); code-review-expert: ALTA (sinais de classe com múltiplas responsabilidades); clean-architecture-expert/clean-code-expert: MÉDIA; api-design-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert e como critérios de revisão (sinais) em code-review-expert.

---

### Internalizar classe (Inline Class) (PDF p.234-236)
Resumo: inversa de Extrair classe; desfaz uma classe que não vale mais a pena, geralmente por ter perdido responsabilidades.
Conceitos e regras:
- Motivação: classe diminuta depois de mover responsabilidades; ou, para realocar recursos entre duas classes, às vezes é mais fácil internalizar para juntar e depois extrair de novo. Abordagem genérica de reorganização: ora mover um elemento de cada vez, ora reunir contextos por internalização e separar por extração [p.234-235].
- Mecanismo [p.235]: (1) na classe de destino criar funções para todas as funções públicas da classe original, apenas delegando; (2) alterar todas as referências para usar as delegações, testando após cada; (3) mover todas as funções e dados para a classe de destino, testando a cada passo, até esvaziar a original; (4) apagar a original ("pequena cerimônia fúnebre").
- Exemplo TrackingInformation dentro de Shipment: delegação criada primeiro, depois Internalizar função em display e movimento de campos; não usa o procedimento completo de Mover campo porque só Shipment referencia o campo [p.235-236].
Citações curtas: nenhuma necessária.
O que este trecho NÃO diz: não dá critério quantitativo de "classe pequena demais".
Relevância: refactoring-expert: ALTA; code-review-expert: BAIXA (classe preguiçosa referida em outro capítulo); demais: NENHUMA.
Decisão sugerida: usar em refactoring-expert.

---

### Ocultar delegação (Hide Delegate) (PDF p.237-239)
Resumo: esconder a navegação por objeto delegado (a.department.manager) criando método de delegação no servidor (a.manager).
Conceitos e regras:
- Motivação: encapsulamento é um dos segredos do bom design modular; módulos sabem menos sobre outros, então mudanças se propagam menos. Cliente que chama método de um objeto guardado em campo do servidor precisa conhecer o delegado; se a interface do delegado mudar, todos os clientes mudam. Delegação simples no servidor limita a propagação ao servidor [p.237-238].
- Mecanismo [p.238]: (1) para cada método do objeto delegado, criar método de delegação simples no servidor; (2) adaptar o cliente para chamar o servidor, testando após cada; (3) se nenhum cliente precisa mais do delegado, remover o acessor do servidor para o delegado; (4) testar.
- Exemplo Pessoa/Departamento: Person.manager delega a department.manager; remover o getter department depois que todos os clientes migrarem [p.238-239].
Citações curtas de prova:
- "Um encapsulamento significa que os módulos precisam saber menos sobre outras partes do sistema." [p.237]
O que este trecho NÃO diz: não menciona o nome do smell Message Chains neste ponto (isso é de outro capítulo).
Relevância: refactoring-expert: ALTA; api-design-expert: MÉDIA (não vazar estrutura interna na interface); code-review-expert: MÉDIA (cadeias de chamadas a.b.c como sinal); clean-architecture-expert: MÉDIA.
Decisão sugerida: usar em refactoring-expert; sinal "cliente navega objeto delegado" em code-review-expert.

---

### Remover intermediário (Remove Middle Man) (PDF p.239-240) [continua no próximo bloco]
Resumo: inversa de Ocultar delegação; remove métodos de encaminhamento quando o servidor virou só intermediário. O texto do bloco termina no início do exemplo.
Conceitos e regras:
- Motivação: ocultar tem custo, cada novo recurso do delegado exige novo método de delegação; quando o encaminhamento incomoda, o servidor é um intermediário (smell "Intermediário", Cap. 3) e o cliente pode chamar o delegado direto. O smell costuma aparecer quando se segue a Lei de Demeter com entusiasmo demais (autor sugere chamá-la de "Sugestão de Demeter Ocasionalmente Útil") [p.240].
- Difícil achar o nível certo de ocultação; com Ocultar delegação e Remover intermediário isso importa menos: adapta-se com o tempo; "refatoração significa jamais ter de lamentar" [p.240].
- Mecanismo [p.240]: (1) criar getter para o objeto delegado; (2) para cada uso de método de delegação por cliente, substituir pela chamada encadeada via getter, testando após cada; se todas as chamadas a um método de delegação foram substituídas, apagá-lo; com refatorações automatizadas pode-se aplicar Encapsular variável ao campo do delegado e Internalizar função em todos os métodos que o usam.
- O exemplo (pessoa/departamento) começa em p.240 e termina no bloco seguinte (truncado).
Citações curtas de prova:
- "Refatoração significa jamais ter de lamentar" [p.240] (trecho: "Refatoração significa jamais ter de lamentar – eu apenas faço a correção.")
O que este trecho NÃO diz: o exemplo completo (cortado no fim do bloco).
Relevância: refactoring-expert: ALTA; code-review-expert: MÉDIA (Intermediário como smell, equilíbrio com Lei de Demeter); api-design-expert: BAIXA.
Decisão sugerida: usar em refactoring-expert (par Ocultar delegação/Remover intermediário e a ideia de reajustar o nível de ocultação).

---

## Síntese por artefato

### refactoring-expert (catálogo de maus cheiros + mecânica)
Neste bloco não há catálogo de maus cheiros novo; há mecânica passo a passo (ALTA) das refatorações: Extrair variável [p.162-167], Internalizar variável [p.167-168], Mudar declaração de função (simples e migração) [p.168-177], Encapsular variável [p.177-182], Renomear variável [p.182-185], Introduzir objeto de parâmetros [p.185-190], Combinar funções em classe [p.190-195], Combinar funções em transformação [p.195-200], Separar em fases [p.200-206], Encapsular registro [p.208-216], Encapsular coleção [p.217-221], Substituir primitivo por objeto [p.221-226], Substituir variável temporária por consulta [p.226-230], Extrair classe [p.230-233], Internalizar classe [p.234-236], Ocultar delegação [p.237-239], Remover intermediário [p.239-240]. Também úteis: regra de passo pequeno com retorno ao último verde [p.162, p.173]; mover/renomear em passos separados [p.171]; nome temporário fácil de pesquisar [p.171, p.174, p.176]; pares inversos (extrair/internalizar; ocultar/remover) e a dica de reorganizar internalizando para depois extrair [p.234-235].

### testing-tdd-expert
Pouco material direto. Aproveitáveis: "Teste" após cada passo como parte do mecanismo (todas as refatorações); asserção temporária para pegar chamadas não migradas (Introduzir asserção) [p.175]; teste de que a transformação não muta a entrada (oráculo via deep copy) [p.199]; deep copy no getter como detector de modificações esquecidas, dependendo de boa cobertura de testes [p.214-215]; confiar nos testes para detectar mudanças que dependiam de mutar a coleção/dado compartilhado [p.181]; tornar variável const e testar para verificar atribuição única [p.168, p.228]. Não há discussão de TDD, pirâmide de testes ou código autotestável neste bloco.

### api-design-expert
Material ALTA: migração de assinatura de função com função intermediária, deprecação e remoção de API publicada [p.171-174]; parâmetros como contrato/acoplamento e a ausência de resposta única [p.169-170]; objeto de parâmetros (range) [p.185-190]; contrato de getter de coleção (cópia vs proxy, add/remove, consistência) [p.217-221]; variável/constante publicada não pode ser renomeada, usar cópia/alias [p.183-185]; encapsular representação e devolver cópia/imutável [p.181-182, p.208-216]; ocultar delegado para não vazar estrutura [p.237-238]. Limite: o livro trata API como código chamado por clientes que o autor não controla, sem versionamento formal nem REST/HTTP.

### code-review-expert
Critérios extraíveis (sinais, como "cheiros" implícitos): nome pouco claro/abreviado [p.169, p.183]; grupo de parâmetros/dados que andam juntos [p.186]; funções soltas que operam sobre o mesmo registro e lógica de derivação duplicada [p.190-196]; função que mistura duas tarefas com dados distintos [p.202]; getter que devolve coleção mutável [p.217-218]; primitivo (string/número) com comportamento espalhado ou comparações com literais [p.222-223]; classe grande com subconjuntos de dados/métodos coesos, dados que mudam juntos, subtipagem parcial [p.231]; cadeias de navegação a.b.c e o oposto, intermediário puro [p.237-240]; dado global/mutável de escopo amplo e campo público [p.178]. O livro nomeia explicitamente apenas o smell "Intermediário" (Cap. 3) neste bloco.

---

## Checklist de cobertura
- Primeira página lida: PDF 161
- Última página lida: PDF 240 (confirmado por Grep: último marcador "=== PDF PAGINA 240 ===", linha 3735; arquivo tem 3776 linhas e foi lido por inteiro)
- Páginas sem texto útil ou ilegíveis: nenhuma; p.176-177, 180 etc. contêm apenas código/diagramas de cabeçalho parcialmente quebrados, mas legíveis
- Problemas de extração observados: o cabeçalho "antes/depois" de cada refatoração aparece como código solto com quebras de linha e indentação perdidas; chaves de fechamento fora de lugar; números impressos de página ausentes (por isso não há "impr. M"); a refatoração Internalizar função começa antes do bloco (p.161 já no meio dos exemplos); uma ocorrência de "–" no lugar de "-" em código (p.204); a grafia "getdefaultOwner" no código de p.180 parece erro do livro/extração (função renomeada de getDefaultOwner)
- Capítulos/seções cobertos integralmente: Extrair variável, Internalizar variável, Mudar declaração de função, Encapsular variável, Renomear variável, Introduzir objeto de parâmetros, Combinar funções em classe, Combinar funções em transformação, Separar em fases, Cap. 7 (introdução), Encapsular registro, Encapsular coleção, Substituir primitivo por objeto, Substituir variável temporária por consulta, Extrair classe, Internalizar classe, Ocultar delegação
- Capítulos/seções que continuam em outro bloco: Internalizar função (começa no bloco anterior; motivação/procedimento lá); Remover intermediário (exemplo cortado em p.240); Capítulo 7 continua (Substituir algoritmo, etc.)
