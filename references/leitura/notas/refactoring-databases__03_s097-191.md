# Notas: Refactoring Databases (Ambler e Sadalage), bloco 03, seções 97-191

Livro em inglês (EPUB convertido). Citações literais em inglês, até 25 palavras, citadas como [s.N]. Paráfrases em português. Número impresso da página do livro entre parênteses quando visível ("impr."). Código do livro (PL/SQL, Java, Hibernate) não reproduzido; só descrito. Este bloco termina no início de Rename View (Capítulo 6); os demais capítulos/refatorações seguem no próximo bloco.

Observação geral de formato: o EPUB quebrou código e títulos em muitas seções minúsculas (s.103-109, s.123-130, s.135-137, s.148-158, s.163-170, s.175-179, s.183-189). Os "## " dessas seções são só linhas de código (CREATE TRIGGER, DECLARE etc.), não títulos de capítulo. Cada seção real de capítulo é indicada abaixo pelo faixa de seções.

---

### Capítulo 5 (final): Database Refactoring Strategies, itens 5.8 (fim) a 5.14 (s.98-101; impr. 66-68 e seguintes) [continua do bloco anterior]
Resumo: Fecha o capítulo de estratégias. O trecho inicial é o fim do item 5.8 (como definir o período de transição). Depois vêm estratégias de apoio: encapsular o acesso ao banco, ter como montar um ambiente de banco com facilidade, não duplicar SQL, colocar ativos de banco sob controle de mudança, cuidado com política organizacional.

Conceitos e regras:
- Fim do 5.8 (período de transição): uma opção é negociar o período de transição com todos os afetados, a cada refatoração ou em lote numa reunião periódica de "negociação de mudança de schema". Vantagem: comunica a mudança e tende a dar o período mais exato. Desvantagem: pode ser lento e penoso. Os autores dizem nunca ter visto isso na prática e recomendam manter simples. [s.98]
- 5.9 Encapsulate Database Access: quanto mais encapsulado o acesso, mais fácil refatorar. No mínimo, concentrar o SQL embutido em um só lugar. Opções: operações consistentes por classe de negócio (save, delete, retrieve, find), classes DAO separadas (ex.: CustomerDAO, AccountDAO), ou, melhor, gerar a lógica de acesso a partir de metadados de mapeamento. [s.98]
- 5.10 Be Able to Easily Set Up a Database Environment: pessoas entram e saem do projeto; a equipe precisa criar instâncias do banco, muitas vezes com versões diferentes do schema, em várias máquinas (sandboxes, Figura 5.1: Demo, Sandbox, Project Integration, Test/QA, Pre-Production, Production). A forma mais eficaz é um script de instalação que aplica o DDL inicial e os scripts de mudança aplicáveis e depois roda a suíte de regressão para garantir que a instalação deu certo. [s.98-99]
- 5.11 Do Not Duplicate SQL: SQL é fácil de escrever e por isso é duplicado pela aplicação e dentro do banco (views, stored procedures, triggers). Quanto mais SQL, mais código acoplado ao que se refatora. Recomendação: SQL em um único pacote/classe, gerado de metadados, ou guardado em arquivos XML lidos em runtime. [s.99]
- 5.12 Put Database Assets Under Change Control: modelos de dados e scripts de banco entram em gerência de configuração. Times que não faziam isso tinham dificuldade de identificar a versão certa do modelo ou do script de mudança na hora de implantar em pré-produção e produção. Preferência dos autores: ativos de banco no mesmo repositório da aplicação (rastreia quem mudou e permite rollback). [s.99]
- 5.13 Beware of Politics: adotar técnicas evolutivas de banco é uma mudança grande; profissionais tradicionais de dados podem se sentir ameaçados; pode ser necessário "jogar o jogo político" (cita Fearless Change, Manns e Rising 2005). [s.101]
- 5.14 What You Have Learned / Online Resources: encerramento; menciona lista de e-mail Agile Databases e sites www.databaserefactoring.com e www.agiledata.org com listas atualizadas de refatorações. [s.101]

Citações curtas de prova:
- "an installation script that applies the initial DDL to create the database schema and any applicable change scripts" [s.98]
- "The more SQL code you have, the harder it is to refactor your database schema" [s.99]
- "database assets are co-located in the same repository as the application, enabling us to see who made changes and supporting rollback capabilities" [s.99]
- "We have never seen this tried in practice." [s.98]

O que este trecho NÃO diz: não detalha ferramentas de migração, ordem de execução de scripts, nem como versionar o schema dentro do banco; não cobre testes (isso foi em capítulos anteriores). A versão do item 5.8 está truncada no início (só o fim).
Relevância: database-and-migrations-expert: ALTA (apoio: encapsular acesso, ambiente reproduzível, scripts sob controle de versão no mesmo repositório da aplicação, instalação = DDL inicial + scripts de mudança + regressão).
Decisão sugerida: usar em database-and-migrations-expert (seções de práticas de apoio e versionamento/deployment).

---

### Capítulo 6: Structural Refactorings, introdução e lista (s.102; impr. 69)
Resumo: Refatorações estruturais mudam a estrutura de tabelas do schema. O capítulo lista 17 refatorações estruturais.

Catálogo (nomes como aparecem no livro; as marcadas "(coberta aqui)" estão neste bloco; as demais seguem no próximo bloco):
- Drop Column: remove coluna de tabela existente (coberta aqui, s.111-116)
- Drop Table: remove tabela (coberta aqui, s.117-118)
- Drop View: remove view (coberta aqui, s.119-120)
- Introduce Calculated Column: nova coluna calculada a partir de dados de uma ou mais tabelas (coberta aqui, s.121-131)
- Introduce Surrogate Key: troca chave natural por substituta (coberta aqui, s.132-140)
- Merge Columns: junta colunas da mesma tabela (coberta aqui, s.141-144)
- Merge Tables: junta tabelas em uma (coberta aqui, s.145-160)
- Move Column: move coluna com dados para outra tabela existente (coberta aqui, s.161-172)
- Rename Column (coberta aqui, s.173-180)
- Rename Table (coberta aqui, s.181-190)
- Rename View (início aqui, s.191)
- Replace Large Object (LOB) With Table (próximo bloco)
- Replace Column (próximo bloco)
- Replace One-to-Many With Associative Table (próximo bloco)
- Replace Surrogate Key With Natural Key (próximo bloco; citada aqui como a operação inversa de Introduce Surrogate Key, página 135 do livro)
- Split Column (próximo bloco)
- Split Table (próximo bloco; citada em Move Column, página 145)

Citação: "Structural refactorings, as the name implies, change the table structure of your database schema." [s.102]
Relevância: database-and-migrations-expert: ALTA (catálogo de refatorações estruturais, categoria "Structural").
Decisão: usar em references/catalogo de refatorações da skill.

---

### Capítulo 6: Common Issues When Implementing Structural Refactorings (s.103-110; impr. 70-72)
Resumo: Seis questões comuns a todas as refatorações estruturais: evitar ciclos de trigger, consertar views, triggers, stored procedures e tabelas quebradas, e definir o período de transição.

Conceitos e regras (lista numerada do livro):
1. Avoid trigger cycles. O trigger de sincronização entre coluna original e nova deve ser escrito para não ciclar: se a coluna original muda, atualiza-se a nova, mas essa atualização não pode disparar a mesma atualização de volta. O exemplo (PL/SQL, BEFORE INSERT OR UPDATE FOR EACH ROW, tabela Customer, colunas FName e FirstName) faz: no INSERT, copia uma coluna para a outra só se a outra for NULL; no UPDATE, compara :NEW com :OLD de cada coluna e propaga a que mudou para a outra. [s.103-108]
2. Fix broken views. Views são acopladas a tabelas e a outras views; uma refatoração estrutural pode quebrar. Exemplo: a view VCustomerBalance (join de Customer e Account somando saldo por CustomerNumber) quebra se Customer.CustomerNumber for renomeada. [s.108]
3. Fix broken triggers. Triggers são acoplados a definições de tabela (coluna renomeada ou movida quebra). O livro dá uma consulta Oracle em User_Objects (Object_Type='TRIGGER' e Status='INVALID') e manda adicioná-la à suíte de testes; ressalva que são necessários outros testes para defeitos de lógica de negócio. [s.109] (específico de Oracle; `[fora do livro]`: em PostgreSQL/MySQL não há status INVALID equivalente; a verificação deve ser por testes que exercitam os triggers)
4. Fix broken stored procedures. Mesma ideia, consulta Oracle com Object_Type='PROCEDURE' e Status='INVALID', para adicionar à suíte de testes. [s.109]
5. Fix broken tables. Tabelas são acopladas indiretamente por convenção de nomes de colunas: se Customer.CustomerNumber é renomeada, Account.CustomerNumber e Policy.CustomerNumber deveriam ser renomeadas também. Consulta Oracle em User_Tab_Columns com LIKE '%CUSTOMERNUMBER%' para achá-las. [s.109-110]
6. Define the transition period. Refatorações estruturais exigem período de transição em ambiente com várias aplicações. A mesma data de remoção (drop date) deve ser atribuída ao schema original sendo refatorado, às colunas e ao trigger, considerando o tempo necessário para atualizar os programas externos. [s.110]

Citações curtas de prova:
- "You must assign the same drop dates to the original schema that is being refactored as well as any columns and the trigger." [s.110]
- "Tables are indirectly coupled to the columns of other tables via naming conventions." [s.109]

O que este trecho NÃO diz: não trata views materializadas, índices ou constraints quebrados; não diz como lidar com falha do trigger de sincronização sob concorrência.
Relevância: database-and-migrations-expert: ALTA (checklist pós-refatoração: views/triggers/procedures/tabelas dependentes, transição com data de remoção única, trigger sem ciclo).
Decisão: usar (checklist de impacto de refatoração estrutural; teste de objetos inválidos).

---

### Drop Column (s.111-116; impr. 73-76)
Resumo: Remove coluna de tabela. Exemplo: Customer.FavoriteColor, com marca de data de remoção no período de transição.

Conceitos e regras:
- Motivação: refatorar o desenho, consequência de refatoração de aplicações externas, ou descobrir coluna sem uso (melhor remover antes que alguém passe a usá-la por engano). Frequentemente é um passo de Move Column (p.103), pois a coluna sai da tabela origem. [s.111]
- Trade-offs: a coluna pode ter dados valiosos; use Move Data (p.192) para preservar em outra tabela. Em tabelas grandes o Drop Column pode demorar e deixar a tabela indisponível para atualização. [s.111]
- Passos do schema update: (1) escolher a estratégia de remoção: alguns produtos não permitem remover coluna, então cria-se tabela temporária, move os dados, remove a original, recria sem a coluna, devolve dados e apaga a temporária; se o produto permite, ALTER TABLE ... DROP COLUMN. (2) Remover a coluna: para tabelas grandes, agende a remoção física para o horário de menor uso, ou marque a coluna como inutilizada com SET UNUSED (mais rápido; o banco não remove fisicamente mas oculta a coluna; remoção física depois em janela de parada). (3) Retrabalhar chaves estrangeiras: se a coluna faz parte de chave primária, remova as colunas correspondentes das tabelas que a usam como FK e recrie as constraints; considere antes Introduce Surrogate Key (p.85) ou Replace Surrogate Key with Natural Key (p.135) para simplificar. Alternativa à remoção física: mascarar a coluna com uma view que não a referencia, via Encapsulate Table With View (p.243). [s.112-113]
- Durante a transição: apenas comentar a coluna (COMMENT ON) com a data de remoção; depois da transição, ALTER TABLE ... DROP COLUMN. [s.112]
- Migração de dados: o negócio normalmente exige preservar os dados "só por precaução". A forma mais simples: criar tabela temporária com a PK da origem mais a coluna removida (CREATE TABLE ... AS SELECT CustomerID, FavoriteColor FROM Customer); outra opção, arquivar em arquivos externos. [s.113-114]
- Atualização dos programas de acesso: (1) refatorar código que ainda usa os dados para outras fontes (se não houver, abandonar a refatoração); (2) enxugar SELECTs que leem e ignoram o valor; (3) refatorar inserts e updates: remover "valores falsos" inseridos na coluna e código que evita sobrescrevê-la; aplicações que fazem SELECT * e leem por posição quebram porque o resultado tem uma coluna a menos; o livro diz que não é boa ideia usar SELECT * em aplicação e que o problema real é o uso de referência posicional. O exemplo Java antes/depois remove a coluna do SELECT, do INSERT e do UPDATE. [s.114-116]

Citações curtas de prova:
- "the database does not physically remove the column but hides the column from everyone" [s.112]
- "Generally, it is not a good idea to use SELECT * from any table in your application." [s.115]

Específico de produto: SET UNUSED, COMMENT ON, CREATE TABLE AS SELECT, "marcar como inutilizado" são Oracle. `[fora do livro]` Em PostgreSQL, DROP COLUMN é uma mudança de catálogo sem reescrever a tabela; em MySQL o custo depende da versão/algoritmo. Não verificado neste bloco.
Observação de extração: no código de exemplo, as datas do COMMENT (14 setembro 2007) e do comentário "On September 14 2004" divergem (erro de impressão ou extração); o método update() "after" ainda mantém o parâmetro color na assinatura (provável descuido do livro). [s.112, s.116]

Relevância: database-and-migrations-expert: ALTA (padrão de remoção segura: marcar com data, preservar dados, SET UNUSED/mascarar via view, ajustar código cliente, SELECT *).
Decisão: usar (receita "remover coluna": preservar, deprecar, janela, depois DROP).

---

### Drop Table (s.117-118; impr. 77-78)
Resumo: Remove tabela não mais usada (substituída por outra fonte ou sem necessidade). Exemplo TaxJurisdictions.

Conceitos e regras:
- Trade-off: apagar a tabela apaga os dados; talvez seja preciso preservar parte ou tudo (especialmente ao normalizar e descobrir que os dados existem em outras tabelas). Pode-se substituir a tabela por view ou consulta, mas então não se pode escrever de volta na mesma view/consulta. [s.117]
- Schema update: resolver integridade de dados; se outras tabelas referenciam, remover a FK ou apontá-la para outra tabela. Fluxo: marcar a tabela como deprecada e remover após a data de transição (DROP TABLE com comentário de data). [s.117]
- Alternativa: apenas renomear a tabela (ALTER TABLE ... RENAME TO TaxJurisdictionsRemoved). Alguns produtos ajustam automaticamente as referências para o novo nome; remova essas FKs com Drop Foreign Key (p.213), pois não se quer integridade referencial contra tabela que será apagada. [s.118]
- Migração: só a necessidade de arquivar dados para restaurar depois, via CREATE TABLE AS SELECT * (tabela ...Removed), antes do DROP. [s.118]
- Programas de acesso: refatorar para as fontes alternativas; se não há alternativa e o dado ainda é necessário, não remova a tabela até as alternativas existirem. [s.118]

Citação: "If there are no alternatives, and the data is still required, you must not remove the table until the alternative(s) exist." [s.118]
Específico: sintaxe Oracle (RENAME TO, CREATE TABLE AS SELECT); a ideia de renomear antes de apagar é geral (`[fora do livro]` PostgreSQL/MySQL usam ALTER TABLE ... RENAME TO também).
Relevância: database-and-migrations-expert: ALTA (drop em duas fases: renomear/deprecar, arquivar, depois dropar).
Decisão: usar.

---

### Drop View (s.119-120; impr. 79-80)
Resumo: Remove view não mais usada. Não apaga dados, mas a view some para quem a acessa.

Conceitos e regras:
- Views frequentemente alimentam relatórios; se o dado ainda é necessário, a view já deveria ter sido substituída por outra view/tabela/consulta, idealmente com desempenho igual ou melhor. [s.119]
- Views também implementam controle de acesso a dados (SAC, security access control); nesse caso uma nova estratégia de SAC deve estar implantada antes. O livro diz que a segurança baseada em view é abordagem de "menor denominador comum", compartilhável entre aplicações mas menos flexível que SAC programático (Ambler 2003). [s.119]
- Mecânica: marcar como deprecada e DROP VIEW após a data de transição. Sem migração de dados. Programas: achar e atualizar referências, reescrever SQL para ler das tabelas base (exemplo antes/depois de AccountDetails para join Customer e Account); atualizar metadados que geram SQL. [s.120]

Citação: "When this is the case, a new SAC strategy for the tables accessed by the view should have been previously implemented and deployed." [s.119]
Relevância: database-and-migrations-expert: MÉDIA (view usada como controle de acesso exige substituir a segurança antes de dropar).
Decisão: usar (nota breve).

---

### Introduce Calculated Column (s.121-131; impr. 81-84)
Resumo: Cria coluna cujo valor é derivado de dados de uma ou mais tabelas, para ganho de desempenho. Exemplo: Customer.TotalAccountBalance com trigger em Account.

Conceitos e regras:
- Motivação: melhorar o desempenho entregando valores pré-calculados (ex.: nível de risco de crédito do cliente a partir do histórico). [s.121]
- Trade-off: a coluna pode sair de sincronia com os dados de origem, sobretudo se aplicações externas precisam atualizá-la; use job em lote regular ou triggers nos dados de origem. [s.121]
- Passos: (1) escolher estratégia de sincronização: batch (se não precisa ser em tempo real), atualização pela aplicação, ou trigger de banco; aplicações podem calcular de formas diferentes; o trigger é mais seguro entre as duas opções em tempo real porque a lógica é implementada uma só vez no banco. (2) Definir como calcular o valor (origem e regra). (3) Determinar a tabela que contém a coluna: a entidade de negócio que a coluna melhor descreve (ex.: risco de crédito pertence a Customer). (4) Adicionar a coluna via Introduce New Column (p.301). (5) Implementar e testar a estratégia de atualização. [s.122]
- O exemplo cria ALTER TABLE Customer ADD ... NUMBER e um trigger BEFORE INSERT/UPDATE/DELETE em Account (FOR EACH ROW) que aplica a diferença incremental: no UPDATE soma NEW-OLD, no INSERT soma NEW, no DELETE subtrai OLD (usando o CustomerID antigo). [s.122-130]
- Migração de dados: não há dado a migrar, mas o valor inicial deve ser populado uma vez por UPDATE com subselect (SUM do saldo por cliente) ou por scripts em lote. [s.130]
- Programas de acesso: substituir toda lógica de cálculo pela leitura da coluna; pode descobrir que aplicações calculam de maneiras diferentes (bug ou situação diferente), exigindo negociar o algoritmo correto com os stakeholders. Exemplo: o SELECT SUM(...) do "before" vira customer.getBalance(). [s.130-131]

Citação: "The trigger approach is likely the safer of the two real-time strategies because the logic only needs to be implemented once, in the database." [s.122]
O que NÃO diz: não trata concorrência, recomputação periódica para corrigir deriva, nem coluna gerada (generated column) do banco. `[fora do livro]` PostgreSQL/MySQL têm colunas geradas, mas elas só servem para derivar de colunas da mesma linha; este exemplo depende de outra tabela, então trigger/batch continua necessário.
Relevância: database-and-migrations-expert: MÉDIA (desnormalização controlada; escolha de sincronização; backfill único).
Decisão: usar (breve).

---

### Introduce Surrogate Key (s.132-140; impr. 85-92)
Resumo: Substitui chave natural (possivelmente composta) por chave substituta. Exemplo: Order com chave (CustomerNumber, OrderDate, StoreID) ganha OrderPOID; OrderItem propaga a nova FK. É o oposto de Replace Surrogate Key With Natural Key (p.135).

Conceitos e regras:
- Motivações: (a) reduzir acoplamento entre schema e domínio de negócio (ex.: número de peça que pode mudar de tamanho ou tipo numérico para alfanumérico é perigoso como PK); (b) aumentar consistência, possivelmente aplicando Consolidate Key Strategy (p.168); (c) melhorar desempenho quando uma chave natural composta grande degrada (alguns bancos sofrem com chaves de várias colunas). [s.132]
- Trade-offs: preferência entre chave natural e substituta é uma "questão religiosa" entre profissionais de dados; ambos têm lugar. Tabela com chave substituta ainda precisa de chave alternativa natural para busca (ex.: InventoryItemPOID e InventoryID). A chave substituta simplifica a estratégia de chaves e reduz acoplamento. Cuidado com excesso de zelo: não introduzir chave substituta onde não é necessária (exemplo: tabela de estados e províncias com código de duas letras estável e único; provavelmente não vale). Se a chave original é FK em outras tabelas, aplique Consolidate Key Strategy nelas, o que pode dar mais trabalho que o benefício. [s.132-133]
- Passos: (1) introduzir a coluna da nova chave (ADD COLUMN, com valores únicos); (2) adicionar novo índice sobre ela; (3) deprecar as colunas originais: serão rebaixadas a chave alternativa ou não-chave ao fim da transição (na tabela origem não são deletadas, apenas deixam de ser PK; nas tabelas filhas são removidas); (4) atualizar e possivelmente adicionar triggers de integridade referencial para usar os novos valores de chave nas outras tabelas, e introduzir triggers que populem as colunas de FK durante a transição, pois as aplicações podem ainda não ter sido atualizadas. Aplicar recursivamente às tabelas filhas (opcional, por consistência). [s.133-134]
- Exemplo (Oracle): gera valores únicos por uma stored procedure GenerateUniqueID (algoritmo HIGH-LOW, citando Ambler 2003); preenche OrderPOID em Order, propaga em OrderItem por UPDATE com subselect, cria índice; trigger PopulateOrderPOID (BEFORE INSERT em OrderItem) preenche a nova FK a partir da chave natural, ou, se só a nova chave vier, preenche as colunas antigas a partir de Order. Na data final: dropa FK e PK antigas, define OrderPOID NOT NULL, recria a PK (OrderPOID) em Order e PK composta (OrderPOID, OrderItemNumber) em OrderItem, recria a FK, cria índice único na chave natural e dropa o trigger. [s.134-138]
- Migração: gerar dados em Order.OrderPOID e atribuí-los às colunas de FK das outras tabelas. [s.139]
- Programas: (1) se a aplicação atribui chaves, todas precisam atribuir OrderPOID; o mínimo é implementar o mesmo algoritmo em todos os programas, melhor um serviço comum; (2) refatorar joins para a nova chave; (3) refatorar recuperações por chave. Exemplo de mapeamento Hibernate antes/depois com um gerador de id. [s.139-140]

Citações curtas de prova:
- "The debate over surrogate and natural keys is a “religious issue” within the data community" [s.132]
- "Triggers need to be introduced to populate the value of the foreign key columns during the transition period" [s.134]

Específico: ADD, MODIFY ... NOT NULL, CREATE UNIQUE INDEX, PL/SQL são Oracle; `[fora do livro]` em PostgreSQL seria ALTER COLUMN SET NOT NULL e sequences/identity no lugar de HIGH-LOW.
Observação de extração: o UPDATE de OrderItem no livro usa colunas sem qualificar (ambíguo); tratar como pseudocódigo. [s.134]
Relevância: database-and-migrations-expert: ALTA (refatoração de chave; sequência de passos com trigger de preenchimento de FK; manter chave natural como alternate key único; propagação para filhas).
Decisão: usar.

---

### Merge Columns (s.141-144; impr. 93-96)
Resumo: Junta duas ou mais colunas de uma tabela. Exemplo: PhoneAreaCode + PhoneLocal em PhoneNumber, deixando PhoneCountryCode.

Conceitos e regras:
- Motivações: coluna idêntica criada por desenvolvedores que não sabiam um do outro (ex.: FeeStructure com 37 colunas, CA_INIT e CheckingAccountOpeningFee); colunas resultado de superdesenho (guardar em partes o que o uso mostra ser um todo); uso real das colunas tornou-se o mesmo (ex.: PreferredCheckStyle e SelectedCheckStyle com o mesmo valor). [s.141-142]
- Trade-offs: pode haver perda de precisão ao juntar colunas finas; ao juntar colunas "usadas para o mesmo fim" você corre o risco de que fossem de fato coisas distintas (então será preciso reintroduzir colunas). O uso dos dados deve determinar se juntar; converse com os stakeholders. [s.142]
- Passos: introduzir a nova coluna (ADD COLUMN; opcional, pode-se reusar uma coluna existente) e um trigger de sincronização acionado por qualquer mudança nas colunas, mantendo-as coerentes durante a transição. No exemplo, o trigger sincroniza as quatro colunas. Ao fim, DROP COLUMN das originais e comentário com data. [s.142-143]
- Migração: converter dados das colunas originais na coluna mesclada uma só vez (exemplo numérico PhoneAreaCode*10000000 + PhoneLocal); enquanto ambas estão ativas, o trigger as mantém sincronizadas. [s.143]
- Programas: usar a coluna mesclada; remover código que juntava colunas; ajustar validações que existiam só porque as colunas estavam separadas (ex.: verificar que dois valores são iguais). Exemplo Java antes/depois de getCustomerPhoneNumber. [s.143-144]

Citação: "The usage of the data should determine whether the columns should be merged" [s.142]
Relevância: database-and-migrations-expert: MÉDIA (exemplo de expand/contract com trigger bidirecional; risco de perda de precisão).
Decisão: usar (exemplo curto).

---

### Merge Tables (s.145-160; impr. 96-102)
Resumo: Junta tabelas em uma. Exemplo: EmployeeIdentification (Picture, VoicePrint, RetinalPrint) é mesclada em Employee.

Conceitos e regras:
- Motivações: superdesenho; uso real das tabelas virou o mesmo (inclusive tabelas 1:1 que geram join desnecessário; alguém não sabia que a tabela existia e evoluiu Employee com dados parecidos); tabela repetida por engano (FeeStructure e FeeSchedule). [s.145-146]
- Trade-off: perda de precisão e risco de a separação ter motivo, por exemplo EmployeeIdentification poderia existir para isolar dados críticos de segurança com direitos de acesso limitados; então será preciso reintroduzir tabelas. O uso dos dados decide. [s.146]
- Passos: (1) adicionar à tabela destino as colunas da outra via ADD COLUMN (a destino pode já ter algumas, gerando inconsistências ou código de domínio poluído; a refatoração deve simplificá-lo); (2) criar triggers de sincronização nos dois sentidos (inclusive INSERT/UPDATE/DELETE) acionados por qualquer mudança, sem ciclos. [s.146-147]
- Datas: comentários nas novas colunas com data final; no fim, dropar os dois triggers e a tabela antiga. [s.147-151]
- Migração: copiar todos os dados (script SQL ou ETL; "não deveria haver passo de transformação"). Exemplo: UPDATE por coluna com subselect pela chave. [s.147-151]
- Programas: (1) simplificar código que acessava várias das tabelas; (2) atualizações incompletas ou contraditórias: acesso que só tratava subconjuntos; código que compensava dados ruins (ex.: converter NULL em "Unknown") pode ser removido se o NULL deixou de existir; (3) alguns programas não precisam dos dados mesclados mas podem sobrescrevê-los com inválidos ou não preencher: estender os programas ou aplicar Introduce Default Value (p.186) às colunas mescladas. [s.158-159]

Citação: "Merging two or more tables can result in a loss of data precision when you merge finely detailed tables." [s.146]
Relevância: database-and-migrations-expert: ALTA (padrão de trigger bidirecional entre tabelas durante transição, risco de colunas novas ficarem nulas/inválidas, usar Introduce Default Value).
Decisão: usar.

---

### Move Column (s.161-172; impr. 103-108)
Resumo: Migra coluna com seus dados para outra tabela existente. Exemplo: Customer.Balance move para Account.Balance.

Conceitos e regras:
- Motivações (situacionais, aparentemente contraditórias): normalização (reduzir redundância); desnormalização para evitar joins comuns (tabela incluída só para ler uma coluna); reorganizar uma tabela dividida (após Split Table, p.145, ou desenho original): coluna usada raramente numa tabela muito acessada (desperdiça rede) ou necessária com frequência numa tabela pouco acessada (joins demais). [s.161]
- Trade-offs: mover para normalizar reduz redundância mas pode piorar desempenho por joins; mover para desnormalizar aumenta redundância. [s.161]
- Passos: (1) identificar regras de deleção (o que fazer com a linha correspondente quando uma linha é apagada: apagar, anular/zerar a coluna, valor padrão, deixar); implementadas em trigger; podem já existir triggers de integridade referencial; (2) identificar regras de inserção; (3) introduzir a nova coluna (ADD COLUMN); (4) introduzir triggers nas colunas original e nova para copiar dados entre elas na transição, acionados por qualquer mudança de linha. [s.162]
- No exemplo, os triggers existentes de RI (Account verifica que o Customer existe; Customer não pode ser apagado se houver Account) são mantidos e dispensam regra de deleção extra para a coluna movida. Fim da transição: DROP COLUMN Customer.Balance e dropar os dois triggers de sincronização (SynchronizeCustomerBalance em Account e SynchronizeAccountBalance em Customer). [s.162-170]
- Migração: copiar os valores da coluna original para a nova, por SQL ou ETL, sem transformação (UPDATE Account SET Balance via subselect em Customer). [s.171]
- Programas: (1) refazer joins para usar a coluna movida; (2) adicionar a nova tabela aos joins se ainda não estiver (pode degradar desempenho); (3) remover a tabela original de joins feitos só para ler a coluna (pode melhorar). O exemplo mostra que, quando um cliente tem várias contas, o saldo vira SUM(Account.Balance). [s.171-172]

Citação: "Moving a column to increase normalization reduces data redundancy but may decrease performance if additional joins are required" [s.161]
Observação: o exemplo move saldo de 1:1 para 1:N sem explicar como o valor único de Customer.Balance é distribuído entre várias contas; o livro só mostra a cópia por subselect (todas as contas do cliente recebem o mesmo valor) e depois soma. Registrar como ressalva: não confiar nesse exemplo para semântica de saldo. [s.171-172]
Relevância: database-and-migrations-expert: ALTA (regras de inserção/deleção antes do trigger; trigger de sincronização nos dois lados; impacto em joins).
Decisão: usar.

---

### Rename Column (s.173-180; impr. 109-112)
Resumo: Renomeia coluna usando coluna nova + trigger de sincronização durante a transição. Exemplo: Customer.FName para FirstName.

Conceitos e regras:
- Motivações: legibilidade, convenções de nomenclatura da empresa, e viabilizar portabilidade entre bancos (ex.: nome original é palavra reservada no novo produto). [s.173]
- Trade-off: custo de refatorar aplicações externas versus legibilidade/consistência. [s.173]
- Passos: (1) introduzir a nova coluna (ADD COLUMN); (2) introduzir trigger de sincronização acionado por qualquer mudança na linha; (3) renomear outras colunas: se a coluna é (parte de) FK em outras tabelas, aplique Rename Column recursivamente para manter consistência (ex.: Customer.CustomerNumber para CustomerID implica renomear Account.CustomerNumber). [s.174]
- Código do exemplo: ADD FirstName VARCHAR(40); COMMENTs com final date e drop date; UPDATE Customer SET FirstName = FName; trigger com a lógica de INSERT/UPDATE da seção de Common Issues; no fim DROP TRIGGER e DROP COLUMN FName. [s.174-179]
- Migração: copiar dados da coluna antiga para a nova (ver Move Data, p.192). [s.179]
- Programas: atualizar SQL embutido e metadados de mapeamento; exemplo Hibernate com três versões: antes (propriedade fName), transição (as duas propriedades fName e firstName) e depois (só firstName). [s.179-180]

Citação: "Therefore, Account.CustomerNumber will now be renamed to Account.CustomerID to keep the column names consistent." [s.174]
Observação de extração: datas inconsistentes no exemplo (drop em 14 nov 2007 na figura; comentário na linha 30 nov 2007). [s.173-179]
Relevância: database-and-migrations-expert: ALTA (renomeação sem downtime: adicionar coluna, sincronizar, migrar código, só então dropar; renomear colunas relacionadas).
Decisão: usar (receita central de expand/contract para rename).

---

### Rename Table (s.181-190; impr. 113-116)
Resumo: Renomeia tabela por duas abordagens: nova tabela + triggers, ou renomear e criar view atualizável com o nome antigo. Exemplo: Cust_TB_Prod para Customer.

Conceitos e regras:
- Motivação: clarear significado/intenção da tabela e seguir convenção de nomes. Trade-off: custo de refatorar aplicações externas versus legibilidade/consistência. [s.181-182]
- Abordagem 1 (via nova tabela): CREATE TABLE Customer; se colunas de Cust_TB_Prod são (parte de) FK em outras tabelas, refatorar constraints/índices para referenciar Customer; dois triggers (um em cada tabela) para sincronizar INSERT/UPDATE/DELETE; copiar dados (INSERT INTO ... SELECT *); sem ciclos de trigger; remover tabela antiga e triggers na data final. Comentários com finaldate/dropdate nas duas tabelas. [s.182-190]
- Abordagem 2 (via view atualizável): renomear a tabela (ALTER TABLE ... RENAME TO; se o produto não suporta RENAME, recriar a tabela e carregar os dados) e criar view com o nome antigo (SELECT * FROM nova). A view serve aos programas ainda não refatorados durante a transição; agende a remoção da antiga para ninguém usá-la por engano. "Viável somente se o banco suporta views atualizáveis." Não há migração de dados. Também refazer as FKs para a nova tabela. [s.189]
- Programas: refatorar para a nova tabela; exemplo de mapeamento Hibernate (atributo table). [s.190]

Citações curtas de prova:
- "This strategy is viable only if your database supports updateable views." [s.189]
- "that update should not trigger the same update to Cust_TB_Prod and so on" [s.190]

`[fora do livro]` PostgreSQL e MySQL suportam ALTER TABLE ... RENAME e views simples atualizáveis; as restrições de atualização de view variam por produto e não são tratadas no livro.
Relevância: database-and-migrations-expert: ALTA (duas estratégias de rename com condição de aplicabilidade; view de compatibilidade).
Decisão: usar.

---

### Rename View (início) (s.191; impr. 117-118) [continua no próximo bloco]
Resumo: Renomeia view; o trecho cobre figura, motivação, trade-offs e os dois primeiros passos.
Conceitos:
- Motivação: legibilidade e convenção de nomes. Trade-off: custo de refatorar aplicações externas versus legibilidade/consistência. [s.191]
- Passos: (1) introduzir a nova view com CREATE VIEW (definição idêntica à da antiga); (2) deprecar a original: indicar que a view antiga não deve mais receber novas funcionalidades nem correções. Demais passos no próximo bloco. [s.191]
Relevância: database-and-migrations-expert: MÉDIA.
Decisão: usar (completar no próximo bloco).

---

## Catálogo de técnicas e refatorações mencionadas neste bloco (nome, 1 linha, seção)
- Encapsulate Database Access (estratégia 5.9): concentrar SQL em um lugar (DAO, save/delete/retrieve/find ou metadados). [s.98]
- Be Able to Easily Set Up a Database Environment (5.10): script de instalação com DDL inicial + scripts de mudança + regressão. [s.98]
- Do Not Duplicate SQL (5.11). [s.99]
- Put Database Assets Under Change Control (5.12). [s.99]
- Beware of Politics (5.13). [s.101]
- Drop Column, Drop Table, Drop View, Introduce Calculated Column, Introduce Surrogate Key, Merge Columns, Merge Tables, Move Column, Rename Column, Rename Table, Rename View: ver acima.
- Referenciadas, definidas em outras partes: Move Data (p.192), Introduce New Column (p.301), Encapsulate Table With View (p.243), Drop Foreign Key (p.213), Consolidate Key Strategy (p.168), Introduce Default Value (p.186), Split Table (p.145), Replace Surrogate Key With Natural Key (p.135).

## Padrão do livro para cada refatoração neste bloco (estrutura fixa)
Motivation, Potential Tradeoffs, Schema Update Mechanics, Data-Migration Mechanics, Access Program Update Mechanics, mais Figura com "Original Schema / Transition Period / Resulting Schema". Durante o Transition Period: objetos antigos ficam marcados com "drop date" e triggers de sincronização temporários com a mesma data. [s.111-191]

## Candidatos a regra
1. Toda refatoração estrutural em ambiente multiaplicação passa por período de transição com a mesma drop date para coluna/tabela original e triggers de sincronização. [s.110] "You must assign the same drop dates to the original schema that is being refactored as well as any columns and the trigger."
2. Triggers de sincronização bidirecional não podem ciclar: atualizar a outra coluna só quando o valor realmente mudou (INSERT: copiar se o outro lado for NULL; UPDATE: comparar NEW com OLD). [s.103-108, s.190] "that update should not trigger the same update to the original columns and so on"
3. Após refatoração estrutural, verificar quebras em views, triggers, stored procedures e colunas de FK por convenção de nome; incluir no teste automatizado a verificação de objetos inválidos (Oracle: User_Objects Status='INVALID') e lembrar que isso não cobre bugs de lógica de negócio. [s.109] "something that you should add to your test suite"
4. Rename Column: nova coluna, trigger, migrar dados com UPDATE, só depois dropar a antiga e o trigger; renomear recursivamente colunas de FK. [s.174]
5. Rename Table: duas estratégias (nova tabela + 2 triggers, ou RENAME + view com nome antigo atualizável); a segunda só se o banco suporta views atualizáveis. [s.189] "This strategy is viable only if your database supports updateable views."
6. Drop Column: preservar dados em tabela temporária se o negócio exigir; em tabelas grandes usar SET UNUSED (Oracle) e remover fisicamente em janela; ou mascarar com view. [s.112-113]
7. Drop Table: não remova enquanto o dado ainda é necessário e não há alternativa; renomear antes de dropar; remover FKs para a tabela renomeada. [s.118]
8. Move Column: definir regras de inserção e deleção antes de escrever os triggers; reaproveitar triggers de RI existentes. [s.162]
9. Introduce Surrogate Key: manter a chave natural como alternate key (índice único), preencher FK nas tabelas filhas por trigger durante a transição, e centralizar a geração de chave num serviço comum; avaliar se a chave substituta vale a pena (ex.: códigos estáveis como estados). [s.132-134, s.139]
10. Introduce Calculated Column: preferir trigger a lógica nas aplicações para colunas derivadas em tempo real; popular valor inicial uma vez; negociar o algoritmo quando aplicações calculam de forma diferente. [s.122, s.130]
11. Merge Columns/Tables: o uso real dos dados decide; risco de perda de precisão ou de remover separação intencional (ex.: segurança); colunas mescladas podem ficar NULL/inválidas para programas antigos, usar Introduce Default Value. [s.142, s.146, s.159]
12. Aplicações não devem usar SELECT * nem acesso por posição; isso quebra ao dropar coluna. [s.115]
13. Ativos de banco (modelo, scripts) no mesmo repositório da aplicação, com script de instalação que roda regressão. [s.98-99]
14. Drop View: se a view implementa controle de acesso, implantar antes outra estratégia de segurança. [s.119]
15. Atenção a SQL específico de produto: nos exemplos (Oracle: PL/SQL, COMMENT ON, SET UNUSED, User_Objects, MODIFY ... NOT NULL) a tradução para PostgreSQL/MySQL é `[fora do livro]`.

## Checklist de cobertura
- Primeira seção lida: 97
- Última seção lida: 191
- Páginas sem texto útil ou ilegíveis: s.97, s.100 (só título "CHAPTER 5"); s.103-109, s.123-130, s.135-137, s.148-158, s.163-170, s.175-179, s.183-189 contêm só fragmentos de código fragmentados em seções artificiais (conteúdo recuperado, código resumido, não copiado).
- Problemas de extração observados: início da s.98 truncado no meio do item 5.8; figuras (diagramas UML de Original Schema / Transition Period / Resulting Schema, Figura 5.1 Sandboxes) só como rótulos soltos, sem descrição do conteúdo visual; marcas d'água de licença ("Prepared for ...", copyright) repetidas em muitas seções, ignoradas; rótulos de margem do livro ("Drop Column", "Merge Tables") misturados ao texto; algumas inconsistências de datas e assinaturas nos exemplos (ver Drop Column e Rename Column).
- Capítulos/seções cobertos integralmente: Capítulo 5 itens 5.9-5.14; Capítulo 6: introdução, Common Issues, Drop Column, Drop Table, Drop View, Introduce Calculated Column, Introduce Surrogate Key, Merge Columns, Merge Tables, Move Column, Rename Column, Rename Table.
- Capítulos/seções que continuam em outro bloco: Capítulo 5 item 5.8 (começo no bloco anterior); Rename View (continua após s.191); no Capítulo 6 ainda faltam Replace LOB With Table, Replace Column, Replace One-to-Many With Associative Table, Replace Surrogate Key With Natural Key, Split Column, Split Table.
