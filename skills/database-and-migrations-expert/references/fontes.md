# Fontes e rastreabilidade

Livro: *Refactoring Databases: Evolutionary Database Design* (Scott W. Ambler e Pramodkumar J. Sadalage, 2006), lido em EPUB convertido, em inglês.

Convenções deste arquivo:

- `s.N` é o número da seção do marcador do texto extraído (`=== SECAO N ===`). Várias seções são fragmentos de uma linha de código ou só o título de capítulo; o número serve para localizar a passagem, não para citar página. O EPUB não traz paginação confiável.
- As citações são literais em inglês, com no máximo 25 palavras; a explicação em português fica fora das aspas.
- Figuras e diagramas UML não foram lidos (só rótulos soltos). Nada nesta skill descreve o desenho de uma figura.
- Os exemplos do livro são Oracle (PL/SQL), Java e Hibernate. Tudo sobre PostgreSQL, MySQL e ferramentas de migração é `[fora do livro]`, convenção desta skill, e não foi executado.
- O texto tem erros de extração e inconsistências do próprio livro (datas, nomes, SQL); os usados como alerta estão em `riscos-e-armadilhas.md`.
- Não foram usados: a notação UML (apêndice), a bibliografia, a seção sobre CCB (5.7), 5.13 sobre política além de uma menção, e o corpo das refatorações internas de método além de uma linha.

## Parte 1: rastreabilidade das regras

| Regra ou ponto da skill | Livro | Capítulo ou seção | Seções (s.N) | Citação curta |
|---|---|---|---|---|
| Refatoração de banco preserva semânticas comportamental e informacional | Refactoring Databases | 1, Database Refactoring; Glossário | s.13, s.28, s.38, s.586 | "a database refactoring is a simple change to a database schema that improves its design while retaining both its behavioral and informational semantics" |
| Mudar formato de dado (telefone) pode alterar a semântica informacional para um relatório | Refactoring Databases | 2, Maintaining Semantics | s.31 | "In our experience, a similar issue exists when it comes to preserving information semantics" |
| Transformação pode mudar semântica, refatoração não; Introduce Column pode quebrar acesso posicional e programas COBOL | Refactoring Databases | 2, Maintaining Semantics; 11 | s.31, s.552 | "A database transformation may or may not change the semantics; a database refactoring does not." |
| Transformações adicionam funcionalidade | Refactoring Databases | 11, abertura | s.552 | "Transformations are changes that change the semantics of your database schema by adding new features to it." |
| Glossário: não adicionar nem quebrar funcionalidade | Refactoring Databases | Glossary | s.586 | "you can neither add new functionality nor break existing functionality" |
| Seis categorias de refatoração | Refactoring Databases | 2.3, Categories | s.33 | |
| Cheiros do esquema e medo de mudar | Refactoring Databases | 2.4, Database Smells | s.34-35 | |
| Acoplamento é o principal fator de dificuldade; mapa dos acopladores | Refactoring Databases | 2.6 | s.37-38 | "The greater the coupling, the harder it is to refactor something." |
| Banco de uma aplicação versus várias; transição necessária no segundo caso | Refactoring Databases | 2, Database Refactoring | s.28 | "must therefore support a transition period (also referred to as a deprecation period)" |
| Cada refatoração segue o mesmo molde: esquema, migração de dados, programas | Refactoring Databases | Sumário; cap. 6 a 11 | s.1, s.111-116 | |
| Gate: faz sentido, é necessário agora, vale o esforço | Refactoring Databases | 3.1 | s.45-46 | "Does the refactoring make sense?" |
| Segunda pergunta do gate (necessidade agora) | Refactoring Databases | 3.1 | s.45 | "Is the change actually needed now?" |
| Terceira pergunta do gate (esforço) | Refactoring Databases | 3.1 | s.45-46 | "Is it worth the effort?" |
| A segunda pergunta é uma decisão de feeling baseada no histórico com o desenvolvedor | Refactoring Databases | 3.1 | s.45 | "This is usually a gut call" |
| Problema declarado pode ser outra refatoração; dado pode ter fonte oficial em outro banco | Refactoring Databases | 3.2 | s.46, s.48 | |
| Um passo de cada vez; mudança grande em muitas pequenas | Refactoring Databases | 3.2, 5.1, 5.3 | s.46, s.86, s.89 | "Smaller refactorings are always easier to implement and then deploy into production" |
| Os dez passos, iterados | Refactoring Databases | 3, visão geral e seções 3.1 a 3.10 | s.39, s.41, s.43, s.45-69 | "iteratively work through the following activities" |
| Período de transição: esquema antigo e novo em paralelo, duração típica, automação | Refactoring Databases | 3.3 | s.48 | "The potentially long time to fully implement a refactoring underscores the need to automate as much of the process as possible." |
| Pessoas mudam em anos, partes manuais são risco | Refactoring Databases | 3.3 | s.48 | "Over a several-year period, people within your department will change" |
| Premissas da transição: cada aplicação trabalha com um dos esquemas | Refactoring Databases | 3.3 | s.49 | "one but not both versions of the schema" |
| Scaffolding code e data de remoção nos objetos | Refactoring Databases | 3.3; 3.5 | s.49, s.54-60 | "This trigger is an example of database scaffolding code" |
| Não dá para contar com as aplicações atualizarem as duas colunas | Refactoring Databases | 2, Multi-Application | s.30 | "you cannot count on the individual applications to update both columns" |
| A duração do período considera as equipes lentas | Refactoring Databases | 2, Multi-Application | s.30 | "your transition period must take into account the slow teams as well as the fast ones" |
| Mesma data de remoção para esquema original, colunas e trigger | Refactoring Databases | 6, Common Issues | s.110 | "You must assign the same drop dates to the original schema that is being refactored as well as any columns and the trigger." |
| Constraint que só estreita valores não exige transição, mas pode quebrar apps | Refactoring Databases | 3.3 | s.49 | "require a transition period because they simply improve the data quality" |
| Trigger preferido a view e a lote; vantagens e desvantagens | Refactoring Databases | 5.5 | s.93-95 | "Our experience is that triggers are the best approach for the vast majority of situations." |
| Períodos por categoria (exemplos 2 e 3 anos) e mitigação | Refactoring Databases | 5.6 | s.96 | "structural refactorings may have a two-year transition period" |
| Negociar prazo caso a caso nunca foi visto na prática | Refactoring Databases | 5.8 | s.98 | "We have never seen this tried in practice." |
| Sem verba para atualizar programas externos: transição muito longa ou não refatorar; política | Refactoring Databases | 3.7 | s.65-66 | "the political challenges surrounding the need to update other systems often far outweigh the technical challenges" |
| Triggers sem ciclos | Refactoring Databases | 6, Common Issues; Split Table | s.103-108, s.190, s.244 | "You need to implement the trigger so that cycles do not occur" |
| Corrigir views, triggers, procedures e colunas de FK por convenção de nome; consulta de objetos inválidos em Oracle | Refactoring Databases | 6, Common Issues | s.108-110 | |
| Testar esquema, migração e programas externos antes, durante e depois | Refactoring Databases | 3.4 | s.49-53 | |
| Suíte de regressão do banco habilita a refatoração | Refactoring Databases | 1, Database Regression Testing | s.17, s.20 | "having a full regression test suite for your database enables database refactoring" |
| Procedures merecem regressão completa e TDD | Refactoring Databases | 9, Add Read Method | s.437 | "We are firm believers in writing a full, 100 percent regression test suite for your stored procedures." |
| Script por refatoração, numerado e em ordem | Refactoring Databases | 3.5 | s.60 | "We suggest assigning a unique, incremental number to each script." |
| Motivos dos scripts pequenos; script pós-transição com o mesmo identificador | Refactoring Databases | 3.5 | s.62 | |
| Script de dados com o mesmo identificador do script de esquema | Refactoring Databases | 3.6 | s.63 | |
| Estratégias de identificação: build, data e hora, identificador único | Refactoring Databases | 5.2 | s.86-89 | |
| Várias equipes exigem coordenação (caso das duas equipes na mesma coluna) | Refactoring Databases | 5.2 | s.89 | "you need a coordination strategy" |
| Tabela de versão do esquema de uma linha | Refactoring Databases | 5.4 | s.90-93 | |
| Ativos de banco sob controle de configuração; lista de itens | Refactoring Databases | 1, Configuration Management; 3.8-3.9; 5.12 | s.20-22, s.66, s.68, s.99 | |
| Mesmo repositório da aplicação | Refactoring Databases | 5.12 | s.99 | "database assets are co-located in the same repository as the application, enabling us to see who made changes and supporting rollback capabilities" |
| Sandbox físico por desenvolvedor | Refactoring Databases | 1, Developer Sandboxes | s.22-23 | "To successfully refactor your database schema, developers need to have their own physical sandboxes to work in" |
| Portões de promoção entre sandboxes; frequência | Refactoring Databases | 4.1 | s.72-73 | |
| Script de instalação com DDL inicial, scripts de mudança e regressão | Refactoring Databases | 5.10 | s.98 | "an installation script that applies the initial DDL to create the database schema and any applicable change scripts" |
| Não duplicar SQL; encapsular acesso | Refactoring Databases | 5.9, 5.11 | s.98-99 | "The more SQL code you have, the harder it is to refactor your database schema" |
| Refatorações de banco são mais seguras de implantar | Refactoring Databases | 4, abertura | s.70 | "deploying database refactorings is much safer than deploying traditional database schema changes" |
| Pacotes de refatorações por release; versões diferentes por ambiente | Refactoring Databases | 4.2 | s.73, s.75-76 | |
| Janelas de deploy e coordenação com outras equipes | Refactoring Databases | 4.3, 4.4 | s.76-79 | "the primary reason why your preproduction test environment exists is to provide a sandbox in which you can resolve multisystem issues" |
| Sequência de sete passos do deploy | Refactoring Databases | 4.4 | s.79-82 | "Back up your database." |
| Back out: voltar versões e restaurar o backup; deploy em incrementos | Refactoring Databases | 4.4 | s.80, s.82 | |
| Esquema obsoleto removido da produção; datas fixas; remoção em lote | Refactoring Databases | 4.5 | s.82 | "A database refactoring has not been truly deployed until you have removed the deprecated schema from production." |
| Testar a remoção antes em QA | Refactoring Databases | 4.5 | s.82 | "We cannot say this enough" |
| Notas de versão por refatoração, anunciar | Refactoring Databases | 3.10 | s.68-69 | |
| Drop Column: preservar dados, SET UNUSED, janela, SELECT * | Refactoring Databases | 6, Drop Column | s.111-116 | "the database does not physically remove the column but hides the column from everyone" |
| Aplicação não deve usar SELECT * | Refactoring Databases | 6, Drop Column | s.115 | "Generally, it is not a good idea to use SELECT * from any table in your application." |
| Drop Table: não remover enquanto o dado é necessário | Refactoring Databases | 6, Drop Table | s.117-118 | "If there are no alternatives, and the data is still required, you must not remove the table until the alternative(s) exist." |
| Drop View: view como controle de acesso | Refactoring Databases | 6, Drop View | s.119-120 | "a new SAC strategy for the tables accessed by the view should have been previously implemented and deployed" |
| Coluna calculada: trigger mais seguro | Refactoring Databases | 6, Introduce Calculated Column | s.121-131 | "The trigger approach is likely the safer of the two real-time strategies because the logic only needs to be implemented once, in the database." |
| Chave substituta: triggers preenchem a FK na transição; debate natural versus substituta | Refactoring Databases | 6, Introduce Surrogate Key | s.132-140 | "Triggers need to be introduced to populate the value of the foreign key columns during the transition period" |
| Chave substituta é questão disputada | Refactoring Databases | 6, Introduce Surrogate Key | s.132 | "The debate over surrogate and natural keys" |
| Merge de colunas e tabelas: o uso decide; perda de precisão | Refactoring Databases | 6, Merge Columns; Merge Tables | s.141-160 | "The usage of the data should determine whether the columns should be merged" |
| Perda de precisão ao juntar tabelas | Refactoring Databases | 6, Merge Tables | s.146 | "Merging two or more tables can result in a loss of data precision when you merge finely detailed tables." |
| Move Column: regras de inserção e deleção, triggers nos dois lados | Refactoring Databases | 6, Move Column | s.161-172 | "Moving a column to increase normalization reduces data redundancy but may decrease performance if additional joins are required" |
| Rename Column: coluna nova, trigger, cópia, remoção; FKs relacionadas | Refactoring Databases | 6, Rename Column | s.173-180 | |
| Rename Table: duas vias; view só com banco que suporta view atualizável | Refactoring Databases | 6, Rename Table | s.181-190 | "This strategy is viable only if your database supports updateable views." |
| Rename View: antiga redefinida sobre a nova | Refactoring Databases | 6, Rename View | s.191-196 | |
| Replace LOB With Table | Refactoring Databases | 6 | s.197-208 | |
| Troca de coluna: risco de perda de informação | Refactoring Databases | 6, Replace Column | s.209-215 | "A significant risk when replacing a column is information loss" |
| Associativa em 1 para N é construir demais | Refactoring Databases | 6, Replace One-To-Many With Associative Table | s.216-226 | "You are overbuilding your database schema when you use an associative table to implement a one-to-many association." |
| Chave natural no lugar da substituta aumenta a complexidade do acesso | Refactoring Databases | 6, Replace Surrogate Key With Natural Key | s.227-234 | "Thus, by replacing a surrogate key with a natural key, you potentially increase the complexity of the code that accesses your database." |
| Split Column: o uso decide | Refactoring Databases | 6, Split Column | s.235-242 | "The usage of a column should determine whether it should be split." |
| Split Table | Refactoring Databases | 6, Split Table | s.243-254 | |
| Problemas comuns de qualidade de dados; travar tudo ou por subconjuntos | Refactoring Databases | 7, abertura | s.255-257 | "You will likely want to lock the source data rows during the update, affecting performance and availability of the data for the application(s)." |
| Add Lookup Table: copiar valores distintos e limpar antes da FK | Refactoring Databases | 7, Add Lookup Table | s.258-264 | "The easiest way to populate State.State is to copy the unique values from Address.State." |
| Apply Standard Codes: uma coluna por vez | Refactoring Databases | 7, Apply Standard Codes | s.265-269 | "Note that this refactoring is applied a single column at a time" |
| Apply Standard Type: o tipo deve comportar todos os dados | Refactoring Databases | 7, Apply Standard Type | s.270-284 | "This data type must handle all existing data and external access programs must be able to handle it." |
| Consolidate Key Strategy: manter unicidade nas chaves depreciadas | Refactoring Databases | 7, Consolidate Key Strategy | s.285-290 | "Note that you may want to retain the uniqueness constraint on these columns, even though you are not going to use them as keys anymore." |
| Drop Column Constraint | Refactoring Databases | 7 | s.291-293 | |
| Drop Default Value: default nulo equivale a nenhum default; apps dependentes | Refactoring Databases | 7, Drop Default Value | s.295-298 | "From a database point of view, a default value of null is the same as having no default value" |
| Drop Non-Nullable como passo temporário | Refactoring Databases | 7, Drop Non-Nullable | s.298-300 | "you want to change the non-nullable constraint for a limited amount of time during the transition phase" |
| Introduce Column Constraint: regras diferentes por aplicação; relatar violações em lote | Refactoring Databases | 7, Introduce Column Constraint | s.302-305 | "individual applications have good reasons for doing things a certain way" |
| Introduce Common Format: uma coluna por vez | Refactoring Databases | 7, Introduce Common Format | s.306-309 | |
| Introduce Default Value: não corrige linhas existentes; efeitos colaterais | Refactoring Databases | 7, Introduce Default Value | s.311-314 | "appearances can be deceiving" |
| Make Column Non-Nullable: default como técnica útil | Refactoring Databases | 7, Make Column Non-Nullable | s.314-316 | "One technique we have found useful is to assign a default value using Introduce Default Value" |
| Make Column Non-Nullable: limpar nulos antes | Refactoring Databases | 7, Make Column Non-Nullable | s.317-318 | "You may need to clean the existing data because you cannot make a column" |
| Make Column Non-Nullable: default provisório e Drop Default Value depois | Refactoring Databases | 7, Make Column Non-Nullable | s.319 | "after sufficient time has passed and you believe that the access programs have been updated" |
| Move Data: travar dados na movimentação; volume | Refactoring Databases | 7, Move Data | s.321-326 | "you will likely want to lock the data during the move" |
| Replace Type Code With Property Flags | Refactoring Databases | 7 | s.328-339 | |
| Add Foreign Key: não contar com as aplicações para a integridade | Refactoring Databases | 8, Add Foreign Key Constraint | s.342 | "you cannot count on them enforcing data-integrity rules consistently" |
| Add Foreign Key: saneamento de dados, imediata ou diferida, nome, exceções | Refactoring Databases | 8, Add Foreign Key Constraint | s.342-351 | "wait until they actually need the data rows and then add them at that time" |
| Coluna calculada por trigger: falha derruba a transação | Refactoring Databases | 8, Add Trigger For Calculated Column | s.352-364 | "If the trigger fails, the transaction fails, too." |
| Drop Foreign Key: desempenho versus qualidade; desabilitar em vez de dropar (Oracle) | Refactoring Databases | 8, Drop Foreign Key Constraint | s.365-367 | "The fundamental tradeoff is performance versus quality" |
| Cascading Delete: não presumir as mesmas regras de integridade | Refactoring Databases | 8, Introduce Cascading Delete | s.368-380 | "you should not assume that all applications implement the same RI rules" |
| Hard Delete: arquivar antes | Refactoring Databases | 8, Introduce Hard Delete | s.381-384 | "consider archiving all the rows marked for deletion so that you can back out of this refactoring if need be" |
| Soft Delete: preferir trigger; alterar programas | Refactoring Databases | 8, Introduce Soft Delete | s.386-401 | "We prefer the trigger-based approach because it is simple and it avoids the risk that the applications will not update the column properly." |
| Soft Delete: mudar os programas que acessam | Refactoring Databases | 8, Introduce Soft Delete | s.399 | "you must change external programs accessing the data" |
| Trigger de histórico: custo de desempenho | Refactoring Databases | 8, Introduce Trigger For History | s.402-414 | "The primary trade-off is performance related" |
| Add CRUD Methods: padrão único de nomes; esquema muda só nas procedures | Refactoring Databases | 9, Add CRUD Methods | s.416-422 | "Choose one approach and stick to it." |
| Add Mirror Table: replicação nativa; dado obsoleto | Refactoring Databases | 9, Add Mirror Table | s.423-435 | "it is advisable to use this feature over using custom-coded solutions" |
| Encapsulate Table With View | Refactoring Databases | 9 | s.441-442 | "From the point of view of the external programs that access the table, nothing has really changed." |
| Introduce Calculation Method: negociar regra | Refactoring Databases | 9 | s.443-446 | |
| Introduce Index: duplicatas, escrita | Refactoring Databases | 9, Introduce Index | s.447-453 | |
| Introduce Read-Only Table: dado obsoleto | Refactoring Databases | 9, Introduce Read-Only Table | s.453-469 | |
| Migrate Method From Database | Refactoring Databases | 9 | s.470-473 | "Relational databases are a lowest common denominator technology." |
| Use Official Data Source | Refactoring Databases | 9 | s.486-490 | |
| Mudança de interface de método exige transição | Refactoring Databases | 10.1 | s.491-496 | |
| Adicionar parâmetro no fim da lista | Refactoring Databases | 10.1, Add Parameter | s.492 | "The safest way to add a parameter is to add it to the end of parameter list" |
| Reorder Parameters com mesmo tipo: sem transição, defeito silencioso | Refactoring Databases | 10.1, Reorder Parameters | s.495 | "you cannot have a transition period in this case because the types of all three parameters are identical" |
| Reorder Parameters: defeito difícil de achar | Refactoring Databases | 10.1, Reorder Parameters | s.495 | "a tricky defect to find without good test cases" |
| Refatorações internas não mudam a interface | Refactoring Databases | 10.2 | s.497 | "Internal refactorings improve the quality of the implementation of a method without changing its interface." |
| Simplificar antes de trocar o algoritmo; constantes de negócio em tabela | Refactoring Databases | 10.2 | s.497-551 | "it is often easier to simplify it first and then update it" |
| Insert Data, Introduce New Column, Introduce New Table | Refactoring Databases | 11 | s.553-564 | |
| Antes de criar tabela nova, verificar a existente | Refactoring Databases | 11, Introduce New Table | s.562-563 | |
| Introduce View aumenta o acoplamento | Refactoring Databases | 11, Introduce View | s.565-573 | "the addition of a new view increases the coupling within your database schema" |
| Update Data: cinco perguntas; apenas e todas as linhas certas | Refactoring Databases | 11, Update Data | s.574-581 | "you must ensure that you are updating only, and all of, the correct rows" |
| Transition period no glossário | Refactoring Databases | Glossary | s.589 | "The time during which both the old schema and the new schema are supported in parallel." |
| Dados obsoletos em cópias (espelho, tabela somente leitura) | Refactoring Databases | 9, Add Mirror Table; Introduce Read-Only Table | s.424, s.454 | |
| Em banco com várias aplicações a coluna original não é apagada de imediato; exemplo de 1,5 ano | Refactoring Databases | 2, Multi-Application | s.29 | "you do not delete the Customer.Balance column right away" |
| Capítulo 6 reúne as refatorações que mudam a estrutura de tabelas | Refactoring Databases | 6, abertura | s.102 | |
| Capítulo 8 reúne as refatorações de integridade referencial | Refactoring Databases | 8, abertura | s.340 | |
| Capítulo 9 reúne as refatorações que mudam como programas externos interagem com o banco | Refactoring Databases | 9, abertura | s.415 | |
| Add Read Method: filtro de leitura num só lugar | Refactoring Databases | 9, Add Read Method | s.436-440 | |
| Migrate Method To Database: lógica divergente entre aplicações | Refactoring Databases | 9, Migrate Method To Database | s.474-477 | |
| Replace Method(s) With View e Replace View With Method(s): códigos de erro mudam | Refactoring Databases | 9 | s.477-485 | |
| Índice único: consulta de duplicatas (o livro usa COUNT da coluna; a skill usa COUNT(*)) | Refactoring Databases | 9, Introduce Index | s.448-450 | |
| Add Foreign Key: comparar contagem da tabela com a do join antes da constraint | Refactoring Databases | 8, Add Foreign Key Constraint | s.347 | |
| Add Foreign Key: checagem imediata ou diferida | Refactoring Databases | 8, Add Foreign Key Constraint | s.343-346 | |
| Objetos inválidos: consulta Oracle ao catálogo, a incluir na suíte | Refactoring Databases | 6, Common Issues | s.109 | |
| Erros e inconsistências do livro usados como alerta | Refactoring Databases | vários | s.75, s.112, s.171-172, s.173-179, s.225, s.317-318, s.336-338 | |

## Parte 2: o que não é do livro

- "Expandir, sincronizar, migrar, contrair" como apelido do molde: o livro usa transição, depreciação e scaffolding.
- Toda tradução para PostgreSQL, MySQL, Flyway, Liquibase, goose, golang-migrate, Prisma, Knex e Alembic, e toda afirmação sobre bloqueio de DDL nesses bancos.
- A ordem encadeada default, limpeza de nulos, NOT NULL e remoção do default (o livro dá cada passo, não a sequência).
- A observação de que `down` não é back out, a regra de não editar migração aplicada, a CI sobre instantâneo de produção e a exigência de autorização do usuário para executar em produção.
- A leitura de que o trigger do exemplo de Replace Column só preenche um lado nulo, e as correções aos exemplos do livro (`COUNT(*)`, nulos no backfill de flags).
