# Notas: Refactoring Databases (Ambler e Sadalage), bloco 07, seções 493-592

Livro em inglês (EPUB convertido). Citações literais em inglês; paráfrases em português. Páginas impressas do livro entre parênteses como "impr. N" quando visíveis. Código SQL/Java do livro não reproduzido.

### Cap. 10 Method Refactorings, 10.1 Interface Changing Refactorings (fim: Parameterize Method, Remove Parameter, Rename Method, Reorder Parameters, Replace Parameter with Explicit Methods) (s.493-496, impr. 279-282) [continua do bloco anterior]
Resumo: o bloco começa no meio de Parameterize Method (só a figura 10.2 aparece; texto no bloco anterior). Mostra as refatorações de interface de métodos (stored procedures) com o padrão de período de transição: manter o método antigo marcado com data de remoção ("drop date") e o novo lado a lado, depois remover o antigo.
Conceitos e regras:
- Parameterize Method (fig. 10.2, s.493, impr. 279): três procedures por país (EUA, Canadá, Brasil) viram uma só que recebe o código do país; as três antigas ficam durante a transição com data de remoção 14 jun 2007, depois são removidas. Só a figura está neste bloco.
- Remove Parameter (10.1.3, s.493, impr. 279): remove parâmetro supérfluo (previsto para o futuro e não usado, regra de negócio mudou, ou valor obtível por outro meio como tabela de lookup). Exemplo: GetAccountList perde AsOfDate. Transição (fig. 10.3, s.494): sobrecarga com as duas assinaturas, a antiga com data de remoção, depois só a nova.
- Rename Method (10.1.4, s.493-494, impr. 279-280): renomeia procedure mal nomeada ou fora do padrão de nomes (GetAccountList vira GetAccountsForCustomer). Transição (fig. 10.4): nome novo criado, nome antigo mantido com data de remoção. [fora do livro: ficou implícito que o antigo apenas delega ao novo; o texto do bloco só mostra os dois nomes coexistindo]
- Reorder Parameters (10.1.5, s.495, impr. 281): reordenar parâmetros para refletir convenção de negócio. Risco explícito: se os tipos dos parâmetros são idênticos não há transição possível (não dá para sobrecarregar a assinatura), e o chamador que esqueceu de ser atualizado roda com valores trocados, defeito difícil de achar sem bons testes. Se os tipos diferem, o chamador não atualizado quebra e é fácil de achar. Fig. 10.6 (s.496) mostra o caso de três varchar sem período de transição.
- Replace Parameter with Explicit Methods (10.1.6, s.496, impr. 282): um método que faz coisas diferentes conforme um parâmetro (getter genérico por ID de coluna) é substituído por procedures específicas (GetAccountBalance, GetAccountCustomerID, GetAccountOpeningDate). Transição: genérica com data de remoção, específicas criadas (fig. 10.7).
Citações curtas de prova:
- "you cannot have a transition period in this case because the types of all three parameters are identical" [s.495, impr. 281]
- "a tricky defect to find without good test cases" [s.495, impr. 281]
O que este trecho NÃO diz: não descreve como medir se o antigo ainda é usado antes de remover; não dá o texto de Parameterize Method nem de Add Parameter (bloco anterior). Não fala de nada específico de produto de banco nesta parte, além do conceito de sobrecarga de procedures.
Relevância: database-and-migrations-expert: MÉDIA, mostra o padrão transição com data de remoção aplicado a rotinas e o caso em que não há transição segura (Reorder Parameters com tipos iguais).
Decisão sugerida: usar em database-and-migrations-expert (referência de refatoração de interface de stored procedures; regra: parâmetros de mesmo tipo reordenados exigem testes e/ou novo nome em vez de reordenar).

### Cap. 10, 10.2 Internal Refactorings (s.497-551, impr. 283-293)
Resumo: refatorações internas melhoram a implementação do método sem alterar a interface, portanto sem período de transição (o texto não define passos de transição para elas). São adaptações das refatorações de código de Fowler a funções PL/SQL. Em cada uma o livro mostra código antes e depois (fragmentado pela extração em muitas "seções" curtas; código não reproduzido aqui).
Conceitos e regras (catálogo, uma linha cada):
- Internal Refactorings, definição: melhoram a qualidade da implementação sem mudar a interface [s.497, impr. 283].
- Consolidate Conditional Expression (10.2.1, s.497-501, impr. 283-284): vários testes condicionais com o mesmo resultado são combinados em um só; prepara para Extract Method (s.497).
- Decompose Conditional (10.2.2, s.502-509, impr. 284-285): condição complexa IF-THEN-ELSE, os ramos e a condição viram chamadas a funções com nomes explicativos (exemplo de cálculo de juros por faixa de saldo) (s.502).
- Extract Method (10.2.3, s.509-522, impr. 285-287): trecho duplicado ou com sentido próprio vira função com nome que explica o propósito; efeito colateral citado: procedures públicas de alto nível ficam legíveis como código bem comentado (s.509). Exemplo em três versões (inicial, intermediária, final) de cálculo de juros de conta.
- Introduce Variable (10.2.4, s.522-527, impr. 287-288): expressão complicada vira variáveis booleanas nomeadas; equivale ao Introduce Explaining Variable de Fowler; Fowler sugeriu o nome mais curto (s.522).
- Remove Control Flag (10.2.5, s.528-532, impr. 289): troca variável flag que sai de um laço por teste direto na condição do laço (s.528).
- Remove Middle Man (10.2.6, s.532-535, impr. 289-290): método que só repassa para outro (surge após rename seguido de procedure com nome antigo delegando, ou quando duas procedures fazem a mesma coisa) deve ser eliminado fazendo os chamadores invocarem o destino, permitindo remover o intermediário (s.532-533).
- Rename Parameter (10.2.7, s.535, impr. 290): mudar o nome do parâmetro no código-fonte; descrito como simples (s.535).
- Replace Literal with Table Lookup (10.2.8, s.535-543, impr. 290-292): literal numérico com significado de negócio (saldo mínimo, taxa de juros) vai para uma tabela (exemplo: tabela de linha única de constantes de negócio) e é lido dela; a tabela pode ser cacheada; combinar com Extract Method para encapsular a leitura; equivale ao Replace Magic Number with Symbolic Constant (s.535).
- Replace Nested Conditional with Guard Clauses (10.2.9, s.544-546, impr. 292): IFs aninhados viram IFs separados com retorno antecipado (s.544-546).
- Split Temporary Variable (10.2.10, s.546-551, impr. 292-293): variável temporária reusada para propósitos distintos é dividida em uma por propósito, com nome próprio (s.546).
- Substitute Algorithm (10.2.11, s.551, impr. 293): trocar o corpo do método por algoritmo mais claro; recomenda simplificar antes com outras refatorações (ex.: Extract Method) porque é difícil reescrever algoritmo complicado (s.551). Texto do bloco é só esse parágrafo.
Citações curtas de prova:
- "Internal refactorings improve the quality of the implementation of a method without changing its interface." [s.497, impr. 283]
- "it is often easier to simplify it first and then update it" [s.551, impr. 293]
- "your high-level, public stored procedures will read like well-commented, highly literate code" [s.509, impr. 285]
O que este trecho NÃO diz: não discute testes de regressão específicos para essas refatorações nem risco de mudar o comportamento de rotinas; não dá passos de transição (a interface não muda). Os exemplos são em PL/SQL (Oracle): sintaxe `CREATE OR REPLACE FUNCTION`, `NO_DATA_FOUND`, `SELECT ... INTO`; os operadores `&&`, `||` e `EXECUTE` nos exemplos parecem pseudocódigo e erros do livro (não sintaxe PL/SQL válida), então não copiar. `[fora do livro]`: tradução para PL/pgSQL ou MySQL stored procedures não é tratada.
Relevância: database-and-migrations-expert: BAIXA a MÉDIA, apenas princípio "refatorar rotinas de banco com as mesmas técnicas de código, sem transição porque a interface não muda" e Replace Literal with Table Lookup (constantes de negócio em tabela, cacheável). Os demais são refatoração de código genérica, mais adequados a clean-code-expert/refactoring-expert.
Decisão sugerida: usar em database-and-migrations-expert apenas uma linha de referência (rotinas de banco aceitam refatorações internas de código; Replace Literal with Table Lookup); o resto descartar (já coberto por skills de código).

### Cap. 11 Transformations, introdução (s.552, impr. 295)
Resumo: transformações são mudanças que alteram a semântica do esquema ao adicionar funcionalidade (diferente de refatoração, que preserva semântica). O capítulo lista cinco: Insert Data, Introduce New Column, Introduce New Table, Introduce View, Update Data.
Conceitos e regras:
- Definição: "Transformations are changes that change the semantics of your database schema by adding new features to it." [s.552, impr. 295] (citação 1 do capítulo)
- Glossário reforça: transformação de banco pode ou não mudar semântica; refatoração de banco é um tipo de transformação [s.586, impr. 322].
O que este trecho NÃO diz: não explica quando uma mudança vira transformação em vez de refatoração além da definição; nada sobre migração versionada.
Relevância: database-and-migrations-expert: MÉDIA, separa mudanças que preservam semântica (refatoração) das que adicionam semântica (transformações), útil para classificar scripts de migração.
Decisão sugerida: usar em database-and-migrations-expert (categorias de mudança).

### Insert Data (s.553-558, impr. 297-300)
Resumo: insere linhas em tabela existente. Estrutura padrão do livro para cada refatoração: Motivation, Potential Tradeoffs, Schema Update Mechanics, Data-Migration Mechanics, Access Program Update Mechanics.
Motivação: (1) reorganização de tabelas após Rename Table, Merge Tables, Split Table ou Drop Table (s.553); (2) fornecer dados estáticos de lookup (estados, tipos de endereço, tipos de conta) quando não há tela administrativa para isso; (3) criar dados de teste conhecidos no desenvolvimento (s.554).
Riscos/trade-offs: inserir dados de lookup referenciados por outras tabelas é delicado; os valores inseridos devem ser válidos para o que aparece nas tabelas que referenciam (exemplo State/Address) (s.554).
Passos (schema update): sem mudança de estrutura, mas identificar: (1) os dados a inserir e dependências (o dado de origem deve ser apagado? os valores foram aceitos pelos stakeholders?); (2) tabela destino; (3) origem (outra tabela ou script manual); (4) necessidade de transformação (ex.: conversão métrico/imperial) (s.554).
Migração de dados: poucos dados, script SQL simples; muitos dados, ferramentas utilitárias do banco (cita SQL*Loader da Oracle) ou bulk loader por causa do tempo (s.555). Específico de produto (Oracle); `[fora do livro]`: equivalentes PostgreSQL (COPY) e MySQL (LOAD DATA) não são citados.
Atualização dos programas de acesso: quando é consequência de outra refatoração, os programas já foram atualizados; quando é dado novo no esquema existente, o código externo pode precisar mudar: WHERE que passam a precisar excluir o novo valor (exemplo: "Brokerage" em AccountType, lista de exclusão cresce de 2 para 3 IDs) ou usar Introduce View para expor só o subconjunto; código que valida valores (enum de tipos Premium) precisa incluir o novo valor (s.556-557).
Teste/verificação: não há seção de teste nesta refatoração; o exemplo diz que o novo tipo suporta funcionalidade que deve ser "testada e depois movida para produção" (s.555).
Citações curtas de prova: nenhuma além do essencial.
O que este trecho NÃO diz: não trata idempotência do script de carga, nem ordem com FK, além do aviso de dependência.
Relevância: database-and-migrations-expert: MÉDIA, dados de referência em migração precisam de revisão dos consumidores (queries com NOT IN, enums no código).
Decisão sugerida: usar em database-and-migrations-expert (seed/lookup data: checar consumidores que listam IDs ou enumeram valores).

### Introduce New Column (s.559-561, impr. 301-303)
Resumo: adiciona coluna a tabela existente. Exemplo: State.CountryCode.
Motivação: persistir novo atributo; passo intermediário de outras refatorações (Move Column, Rename Column) (s.559).
Riscos: garantir que a coluna não existe em outro lugar, para não aumentar redundância e problemas de integridade referencial (s.559).
Passos: (1) ALTER TABLE ... ADD com a coluna anulável; (2) FK criada separadamente com Add Foreign Key Constraint (impr. 204) (s.559-560). Migração de dados: o desafio é popular a coluna: combinar com stakeholders os valores, preencher manualmente ou por script (ou ambos), e considerar Introduce Default Value, Drop Non-Nullable ou Make Column Non-Nullable; exemplo de UPDATE de preenchimento inicial onde a coluna é nula (s.560). Programas de acesso: simples, passam a usar a coluna; mostra mapeamento Hibernate antes/depois (many-to-one) (s.560-561). Específico de produto: tipo VARCHAR2 é Oracle.
Teste: não detalhado aqui.
O que este trecho NÃO diz: não menciona risco de lock em tabelas grandes nem preenchimento em lotes. `[fora do livro]`
Relevância: database-and-migrations-expert: MÉDIA, padrão expand: coluna nova anulável, backfill, depois restrições (NOT NULL/default/FK) em passos separados.
Decisão sugerida: usar em database-and-migrations-expert.

### Introduce New Table (s.562-564, impr. 304-305)
Resumo: cria nova tabela. Exemplo: CustomerIdentification.
Motivação: persistir novo atributo; passo intermediário (Split Table, Rename Table criam tabela no lugar da antiga); introduzir nova fonte oficial de dados (quando informações similares estão em várias tabelas que divergem, aplicar Use Official Data Source e depois Drop Table nas originais); tabela de backup/intermediária ao aplicar Drop Table ou Merge Tables (s.562).
Riscos: garantir que a tabela não existe já; frequentemente existe algo próximo e é mais fácil refatorar a existente do que criar tabela com informação redundante (s.562-563).
Passos: CREATE TABLE com PK; FK para Customer (s.563). Migração: popular a tabela (stakeholders, manual/script, considerar Insert Data) (s.564). Acesso: quando a nova tabela substitui várias, tem esquema e semântica um pouco diferentes, então os programas precisam ser refatorados para a nova versão (s.564).
Citações curtas de prova:
- "you may discover that it is easier to refactor that existing table than it is to add a new table containing redundant information" [s.562-563, impr. 304-305]
O que este trecho NÃO diz: sem testes específicos.
Relevância: database-and-migrations-expert: MÉDIA, critério "antes de criar tabela, verificar se existe equivalente"; uso de tabela de backup ao apagar/mesclar.
Decisão sugerida: usar em database-and-migrations-expert.

### Introduce View (s.565-573, impr. 306-309)
Resumo: cria view sobre tabelas existentes (exemplo CustomerPortfolio, soma de saldos e apólices por cliente; e ActiveCustomer para extrair SQL duplicado).
Motivação: resumir dados para relatórios; substituir leituras redundantes (mesma query em vários programas/procedures); segurança (leitura sem permissão de atualização); encapsular acesso à tabela com views atualizáveis, o que permite fazer Rename Column/Rename Table sem impactar aplicações externas (camada de encapsulamento); reduzir duplicação de SQL (s.565-566).
Riscos: (1) desempenho dos joins da view pode ser inaceitável, caso em que se usa Introduce Read-Only Table (impr. 251); (2) aumenta acoplamento do esquema, pois a definição da view depende das tabelas (s.566).
Passos: CREATE VIEW (s.566-568). Migração: nada a migrar (s.568). Acesso: depende do caso; ao substituir SQL repetido, refatorar o código para usar a view; para relatórios, novos relatórios usam a view; para os programas ela parece uma tabela só de leitura; SQL duplicado aumenta risco de bugs porque mudar um e esquecer os outros diverge (s.568-573). Exemplo: filtro "cliente ativo" duplicado em duas queries vira view ActiveCustomer.
Citações curtas de prova:
- "the addition of a new view increases the coupling within your database schema" [s.566, impr. 307]
O que este trecho NÃO diz: não discute views materializadas nem regras para atualização via view. `[fora do livro]` (o exemplo usa join implícito na cláusula WHERE e CREATE OR REPLACE VIEW, sintaxe Oracle/ANSI antiga).
Relevância: database-and-migrations-expert: MÉDIA, view como camada de encapsulamento que viabiliza renomear tabela/coluna sem quebrar clientes externos.
Decisão sugerida: usar em database-and-migrations-expert (encapsulamento por view como técnica de transição).

### Update Data (s.574-581, impr. 310-313)
Resumo: atualiza dados em tabela existente; esquema não muda (exemplo: renomear "Checking" para "Chequing" e "Private" para "Private Banking" em AccountType).
Motivação: reorganização após Rename Table/Column, Move Column, Split Table/Column, Merge Tables/Columns; popular coluna nova nas bases de produção (ex.: coluna Country em Address); mudar dados de referência por mudança de regra de negócio; suportar Apply Standard Codes (consolida "US", "USA", "U.S." em "USA") e Apply Standard Type (converte tipo, ex.: numérico para caractere); corrigir dados transacionais por defeito da aplicação ou do banco (corrigir também as tabelas derivadas, ex.: InterestRate e Charges) (s.574-575).
Riscos: atualizar dados de referência exige que os valores façam sentido para as linhas dependentes (Account referencia AccountType); atualizar somente e todas as linhas corretas (s.575).
Passos: sem mudança de esquema (s.575). Migração: poucos dados, script SQL; muitos dados, ferramenta ETL, sobretudo quando derivado por algoritmo complexo. Perguntas a responder: origem dos dados (tabelas da aplicação ou usuários de negócio)? valores aceitos pelos stakeholders? quais linhas? quais colunas? quais dependências? (s.575-576). Acesso: WHERE que filtram pelo valor antigo ("Private") e código que valida o valor precisam mudar; o exemplo mostra uma view que filtra por nome do tipo e precisa ser atualizada (s.576-581).
Citações curtas de prova:
- "you must ensure that you are updating only, and all of, the correct rows" [s.575, impr. 311]
O que este trecho NÃO diz: não aborda ordem de deploy entre mudar o dado e mudar o código nem rollback. Aviso do próprio exemplo: o texto do exemplo diz que atualiza o tipo "brokerage" mas na verdade renomeia nomes (inconsistência do livro).
Relevância: database-and-migrations-expert: ALTA para a regra de que dado de referência usado como chave de negócio (por nome) é acoplamento escondido em views/código; checklist de 5 perguntas antes de migrar dados.
Decisão sugerida: usar em database-and-migrations-expert (checklist de data migration: origem, aprovação, linhas, colunas, dependências; usar ETL para grande volume).

### Apêndice: The UML Data Modeling Notation (s.581-585, impr. 315-319)
Resumo: notação UML para modelagem física de dados usada nas figuras do livro (perfil de Ambler, mantido em agiledata.org): tabelas como caixas (nome, colunas, triggers), estereótipos PK, FK, AK, Natural, Surrogate, ordem de colunas em chave composta, relacionamentos com multiplicidades (0..1, 1, 0..*, 1..*, *, n, 0..n, 1..n), tabela associativa, agregação, stored procedures, índices, views e propriedades (ex.: read only).
Conceitos: relação muitos-para-muitos não é implementável nativamente no modelo relacional, por isso a tabela associativa (s.583). Ordem das colunas na chave só deve ser indicada quando necessária, para definir índices corretamente (s.582-583).
O que NÃO diz: nada sobre práticas de migração.
Relevância: database-and-migrations-expert: NENHUMA (notação de diagrama); apenas ajuda a ler as figuras do livro.
Decisão sugerida: descartar.

### Glossário (s.585-589, impr. 321-325)
Resumo: definições do livro, úteis para termos exatos.
Conceitos (paráfrase):
- Database refactoring (substantivo): mudança simples no esquema que melhora o design mantendo semântica comportamental e informacional (não adiciona funcionalidade, não quebra existente, não adiciona dado nem muda o sentido do existente) [s.586, impr. 322]. Verbo: evoluir o esquema aos poucos sem mudar a semântica.
- Database transformation: mudança que pode ou não alterar a semântica; refatoração é um tipo [s.586].
- Transition period (= deprecation period): tempo em que o esquema antigo e o novo são suportados em paralelo [s.589, impr. 325].
- Database regression testing: garantir que o esquema funciona desenvolvendo e rodando regularmente uma suíte de testes [s.586].
- Deployment window (release window): momento em que é permitido implantar em produção [s.586].
- Sandboxes: development sandbox (escrever, testar, compilar), project integration sandbox (código de todos compilado e testado), demo sandbox (demonstração a pessoas fora do time), production environment [s.586-588].
- Single-application database: acessado por uma aplicação do mesmo time; multi-application database: acessado por várias, ao menos uma fora do controle do time [s.587-588].
- Categorias: structural refactoring (muda definição de tabelas/views), data quality refactoring (melhora a qualidade da informação), referential integrity refactoring (garante que a linha referenciada existe e que linha desnecessária é removida), architectural refactoring (melhora o modo como programas externos interagem com o banco), method refactoring (melhora um método) [s.585-588].
- Database smell: problema comum no esquema que indica possível necessidade de refatorar [s.586].
- Method (no banco): stored procedure, function ou trigger [s.587].
- Test-First Development (TFD): escrever teste que falha antes do código funcional; TDD = TFD + refatoração [s.589].
- Referential integrity: se A referencia B, B existe; remover B exige remover as referências [s.588].
- ETL: mover dados entre fontes limpando-os no processo [s.587]. Transaction: unidade de trabalho que tem sucesso ou falha por completo [s.589]. XUnit inclui OUnit para Oracle [s.589].
Citações curtas de prova:
- "The time during which both the old schema and the new schema are supported in parallel." [s.589, impr. 325]
- "you can neither add new functionality nor break existing functionality" [s.586, impr. 322]
O que este trecho NÃO diz: é só vocabulário; não prova regras de processo.
Relevância: database-and-migrations-expert: ALTA para vocabulário exato (refatoração vs transformação, transition period, single vs multi-application database, categorias).
Decisão sugerida: usar em database-and-migrations-expert (glossário e categorias).

### Referências e leitura recomendada (s.589-591, impr. 327-329)
Apenas lista bibliográfica. Obras citadas relevantes: Fowler (1999) Refactoring; Fowler e Sadalage (2003) Evolutionary Database Design (artigo martinfowler.com); Ambler (2003) Agile Database Techniques; Feathers (2004) Working Effectively with Legacy Code; Kerievsky (2004) Refactoring to Patterns; Meszaros (2006) xUnit Test Patterns; Kyte (2005) Avoiding Mutating Tables (Oracle, relacionado a triggers); Burry e Mancusi (2004) How to Plan for Data Migration. Sem detalhe.
Relevância: NENHUMA. Decisão: descartar.

### Lista de Refactorings and Transformations (s.591, índice de back matter; páginas impressas não visíveis no rodapé)
Resumo: lista de uma linha por refatoração, com página impressa do livro. Serve como catálogo completo (a lista termina em "continued in back of book" e o resto das linhas aparece depois; o início cobre A a Parameterize Method e o fim cobre Remove Control Flag a Use Official Data Source). Catálogo, uma linha cada, impr. do livro:
Estruturais/dados/integridade/arquitetura (cada qual detalhada em blocos anteriores, aqui só a descrição de uma linha):
- Add CRUD Methods (impr. 232): procedures para criar, ler, atualizar, apagar uma entidade.
- Add Foreign Key Constraint (204): FK para impor relação.
- Add Lookup Table (153): tabela de lookup para coluna existente.
- Add Mirror Table (236): cópia exata de tabela em outro banco.
- Add Parameter (278): método precisa de informação nova.
- Add Read Method (240): procedure de leitura de entidades.
- Add Trigger For Calculated Column (209): trigger que atualiza coluna calculada.
- Apply Standard Codes (157): conformar códigos de uma coluna aos usados em outras.
- Apply Standard Type (162): tipo de dado consistente com colunas similares.
- Consolidate Conditional Expression (283), Decompose Conditional (284).
- Consolidate Key Strategy (168): uma estratégia de chave por entidade.
- Drop Column (72), Drop Column Constraint (172), Drop Default Value (174), Drop Foreign Key Constraint (213), Drop Non-Nullable (177), Drop Table (77), Drop View (79).
- Encapsulate Table With View (243): envolver acesso a tabela com view.
- Extract Method (285), Insert Data (296).
- Introduce Calculated Column (81), Introduce Calculation Method (245), Introduce Cascading Delete (215), Introduce Column Constraint (180), Introduce Common Format (183), Introduce Default Value (186), Introduce Hard Delete (219), Introduce Index (248), Introduce New Column (301), Introduce New Table (304), Introduce Read-Only Table (251), Introduce Soft Delete (222), Introduce Surrogate Key (85), Introduce Trigger For History (227), Introduce Variable (287), Introduce View (306).
- Make Column Non-Nullable (189), Merge Columns (92), Merge Tables (96).
- Migrate Method From Database (257): re-hospedar método do banco na aplicação; Migrate Method To Database (261): o inverso.
- Move Column (103), Move Data (192), Parameterize Method (278).
- Remove Control Flag (289), Remove Middle Man (289), Remove Parameter (279).
- Rename Column (109), Rename Method (279), Rename Table (113), Rename View (117), Reorder Parameters (281).
- Replace Column (126), Replace LOB With Table (120), Replace Literal With Table Lookup (290), Replace Method(s) With View (265), Replace Nested Conditional With Guard Clauses (292), Replace One-To-Many With Associative Table (130), Replace Parameter With Explicit Methods (282), Replace Surrogate Key With Natural Key (135), Replace Type Code With Property Flags (196), Replace View With Method(s) (268).
- Split Column (140), Split Table (145), Split Temporary Variable (292), Substitute Algorithm (293), Update Data (310), Use Official Data Source (271).
Obs.: as páginas "impr." acima vêm da própria lista; a numeração impressa dos capítulos nas seções anteriores confere (ex.: Rename Method p.279, Insert Data p.296).
O que NÃO diz: as descrições curtas são só uma linha; sem passos.
Relevância: database-and-migrations-expert: ALTA como índice do catálogo do livro (nomes e categorias) para a skill citar por nome.
Decisão sugerida: usar em database-and-migrations-expert (índice de nomes de refatorações). Descartar as figuras repetidas de notação UML que se repetem na seção 591 (artefato de extração).

### Índice do documento (Document Outline) (s.592)
Estrutura do livro (só títulos; os números de capítulo abaixo são pela ordem dos títulos, o outline não os traz). Confirma a estrutura geral: Preface; Cap. 1 Evolutionary Database Development (Database Refactoring, Evolutionary Data Modeling, Database Regression Testing, Configuration Management of Database Artifacts, Developer Sandboxes, Impediments); Cap. 2 Database Refactoring (Code Refactoring, Single-Application e Multi-Application Database Environments, Maintaining Semantics, Categories, Database Smells, How It Fits In, Making It Easier); Cap. 3 The Process of Database Refactoring (Verify That a Database Refactoring Is Appropriate, Choose the Most Appropriate, Deprecate the Original Schema, Test Before/During/After, Modify the Schema, Migrate the Source Data, Refactor External Access Programs, Run Regression Tests, Version Control, Announce); Cap. 4 Deploying into Production (Deploying Between Sandboxes, Bundles, Deployment Windows, Deploying Your System, Removing Deprecated Schema); Cap. 5 Database Refactoring Strategies (Smaller Changes Are Easier, Uniquely Identify Individual Refactorings, Implement a Large Change by Many Small Ones, Have a Database Configuration Table, Prefer Triggers over Views or Batch Synchronization, Choose a Sufficient Transition Period, Simplify CCB Strategy, Simplify Negotiations with Other Teams, Encapsulate Database Access, Easy to Set Up a Database Environment, Do Not Duplicate SQL, Put Database Assets Under Change Control, Beware of Politics); Cap. 6 Structural (Drop Column, Drop Table, Drop View, Introduce Calculated Column, Introduce Surrogate Key, Merge Columns, Merge Tables, Move Column, Rename Column, Rename Table [via nova tabela ou via view atualizável], Rename View, Replace LOB With Table, Replace Column, Replace One-To-Many With Associative Table, Replace Surrogate Key With Natural Key, Split Column, Split Table); Cap. 7 Data Quality (Add Lookup Table, Apply Standard Codes, Apply Standard Type, Consolidate Key Strategy, Drop Column Constraint, Drop Default Value, Drop Non-Nullable, Introduce Column Constraint, Introduce Common Format, Introduce Default Value, Make Column Non-Nullable, Move Data, Replace Type Code With Property Flags); Cap. 8 Referential Integrity (Add Foreign Key Constraint, Add Trigger For Calculated Column, Drop Foreign Key Constraint, Introduce Cascading Delete, Introduce Hard Delete, Introduce Soft Delete, Introduce Trigger For History); Cap. 9 Architectural (Add CRUD Methods, Add Mirror Table, Add Read Method, Encapsulate Table With View, Introduce Calculation Method, Introduce Index, Introduce Read-Only Table, Migrate Method From/To Database, Replace Method(s) With View, Replace View With Method(s), Use Official Data Source); Cap. 10 Method Refactorings (Interface Changing: Add Parameter, Parameterize Method, Remove Parameter, Rename Method, Reorder Parameters, Replace Parameter with Explicit Methods; Internal: lista de 11 acima); Cap. 11 Transformations (Insert Data, Introduce New Column, Introduce New Table, Introduce View, Update Data); Apêndice UML; Glossário; Referências; Lista. Cada refatoração estrutural segue o formato Motivation, Potential Tradeoffs, Schema Update Mechanics, Data-Migration Mechanics, Access Program Update Mechanics.
Observação: o outline mostra "Cap. 5 estratégias" e "Cap. 3 processo" que foram cobertos em blocos anteriores (seções 1-492); este bloco não os detalha.
Relevância: database-and-migrations-expert: MÉDIA, mapa para localizar regras (títulos das estratégias e passos do processo) nas notas de outros blocos. Decisão: usar só como mapa.

## Candidatos a regra
(Procedimentos, critérios e armadilhas aplicáveis; cada um com seção e citação literal quando disponível.)
1. Reordenar parâmetros de mesmo tipo em procedure não admite período de transição e vira defeito silencioso: exigir bons testes ou usar nome/assinatura nova em vez de reordenar. [s.495, impr. 281] "a tricky defect to find without good test cases"
2. Padrão de transição em rotinas: manter versão antiga e nova coexistindo, a antiga com data de remoção, depois remover (Remove Parameter, Rename Method, Replace Parameter with Explicit Methods, Parameterize Method). [s.493-496, impr. 279-282, figuras 10.2-10.4 e 10.7] (as figuras mostram {drop date = June 14 2007})
3. Refatorações internas de métodos não mudam a interface e portanto não pedem transição; simplificar (Extract Method) antes de substituir um algoritmo. [s.497, s.551] "it is often easier to simplify it first and then update it"
4. Remove Middle Man: após Rename com procedure de nome antigo delegando, atualizar chamadores para o destino e remover o intermediário. [s.532-533, impr. 289-290]
5. Constantes de negócio (limites, taxas) em tabela de configuração lida por função, possivelmente com cache, em vez de literal em procedure. [s.535, impr. 290] "A better approach is to store the value in a table, and then retrieve it as needed from the table."
6. Transformação (muda semântica) é diferente de refatoração (preserva semântica); classificar cada script de migração. [s.552, s.586] "you can neither add new functionality nor break existing functionality"
7. Adicionar coluna: ADD anulável, depois popular com aprovação dos stakeholders, só então considerar default/NOT NULL/FK como passos separados. [s.559-560, impr. 301-303] (sem citação curta fiel disponível; paráfrase do texto)
8. Antes de criar tabela ou coluna nova, verificar se algo equivalente já existe: risco de redundância e inconsistência. [s.559, s.562-563] "you need to ensure that the column does not exist elsewhere"
9. Dados de lookup inseridos devem ser coerentes com as linhas que os referenciam; ao inserir valor novo, revisar consultas com NOT IN e enums no código que classificam por ID. [s.554, s.556-557, impr. 297-300]
10. Antes de Update Data: origem, aprovação, linhas, colunas e dependências; para volume grande usar ETL; para dado de referência alterado por nome, atualizar também views e código que filtram pelo nome antigo. [s.575-576, impr. 311-313]
11. Introduce View como camada de encapsulamento permite renomear tabela/coluna sem impactar apps externas; custo: acoplamento da view ao esquema e risco de desempenho (alternativa: Introduce Read-Only Table). [s.565-566, impr. 306-307] "the addition of a new view increases the coupling within your database schema"
12. SQL duplicado em várias aplicações deve ser extraído para view, para que uma regra (ex.: cliente ativo) mude em um só lugar. [s.568-573, impr. 308-310]
13. Corrigir dado transacional por defeito exige atualizar as tabelas derivadas também. [s.575, impr. 311]
14. Bulk load para volume grande (SQL*Loader é o exemplo do livro; Oracle). [s.555, impr. 298] `[fora do livro]`: tradução para COPY/LOAD DATA/equivalentes não está no texto.

## Checklist de cobertura
- Primeira seção lida: 493
- Última seção lida: 592
- Páginas sem texto útil ou ilegíveis: seções 497-551 são fragmentos de código PL/SQL partidos em dezenas de "seções" de poucas linhas (conteúdo lido, mas ordem de extração confusa); s.581 e s.591 contêm figuras da notação UML duplicadas (ruído).
- Problemas de extração observados: código dividido em fragmentos com títulos "## " falsos (ex.: "## BEGIN", "## CREATE OR REPLACE FUNCTION ..."); cabeçalhos de página e avisos de licença intercalados no texto; operadores nos exemplos de código (&&, ||, "–" no lugar de "-") parecem erros do livro ou da extração; figuras (diagramas de esquema antes/depois) vêm como texto solto e não foram descritas além do que o texto traz; em Update Data o texto do exemplo diz brokerage mas mostra renomeação de nomes (inconsistência do livro). Conteúdo visual não lido: diagramas UML das figuras 10.2-10.7, 11.1-11.5, A.1-A.5 (só rótulos em texto).
- Capítulos/seções cobertos integralmente: Cap. 10 trecho final (10.1.3 a 10.2.11), Cap. 11 completo (Insert Data, Introduce New Column, Introduce New Table, Introduce View, Update Data), Apêndice UML, Glossário, Referências, Lista de Refactorings and Transformations (primeira e segunda parte), Document Outline.
- Capítulos/seções que continuam em outro bloco: o início do Cap. 10 e Parameterize Method / Add Parameter estavam no bloco anterior (este bloco começa na figura 10.2, s.493).
