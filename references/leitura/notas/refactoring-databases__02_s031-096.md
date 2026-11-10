# Notas: Refactoring Databases (Ambler & Sadalage), bloco 02, seções 31-96

Convenção: `[s.N]` = número da seção do marcador; "impr. M" = página impressa do livro quando visível no rodapé. Livro em inglês; paráfrases em português, citações literais em inglês. O bloco cobre: fim do cap. 2 (Database Refactoring), cap. 3 (The Process of Database Refactoring), cap. 4 (Deploying into Production) e início do cap. 5 (Database Refactoring Strategies, até 5.8, truncado). Nenhuma refatoração individual do catálogo (caps. 6-11) aparece aqui; só são citadas por nome/página como exemplos. Várias seções são fragmentos do EPUB (só "## CHAPTER N" ou um trecho de código); o conteúdo útil está nas seções com texto.

---

### Cap. 1-2: fecho de "Database Refactoring" — semântica informacional/comportamental e refatoração vs. transformação (s.31, impr. 21-22) [continua do bloco anterior]
Resumo: o trecho final da definição de refatoração de banco. Preservar a semântica informacional exige cuidado até com mudanças de formato aparentemente inofensivas; preservar a semântica comportamental significa manter a funcionalidade "blackbox". Refatoração é um subconjunto de transformação.
Conceitos e regras:
- Semântica informacional: mudar (416) 555-1234 para 4165551234 pode alterar a semântica para uma aplicação de forma sutil (ex.: relatório que depende do formato (XXX) XXX-XXXX e passa a sair ilegível, embora a "mesma informação" continue sendo exibida). [s.31]
- Semântica comportamental: o código que usa a parte alterada do schema deve ser retrabalhado para dar a mesma funcionalidade; exemplo: após Introduce Calculation Method (p.245), reescrever stored procedures existentes para invocar o método em vez de repetir a lógica; a lógica passa a estar em um único lugar. [s.31]
- Distinção formal: "database transformation" pode ou não mudar semântica; "database refactoring" nunca muda. Transformações (cap. 11) são importantes porque podem ser um passo dentro de uma refatoração (ex.: Move Column usa Introduce Column como um dos passos). [s.31]
- Introduce Column (p.180) é rotulada transformação, não refatoração, porque pode quebrar comportamento: se a coluna entra no meio da tabela, código com acesso posicional (coluna 17) quebra; código COBOL ligado a tabela DB2 quebra se não for re-bound, mesmo com a coluna no fim. [s.31]
- Pragmatismo: o rótulo importa menos que o uso ("practicality should be your guide"). [s.31]
Citações curtas de prova:
- "A database transformation may or may not change the semantics; a database refactoring does not." [s.31, impr. 21]
O que este trecho NÃO diz: não define um procedimento de teste para semântica; não lista todas as transformações.
Relevância: database-and-migrations-expert: ALTA. Define o que conta como refatoração vs. migração que muda semântica, e o risco de "adicionar coluna" em sistemas com acesso posicional.
Decisão sugerida: usar em database-and-migrations-expert (definição e distinção refatoração/transformação).

### 2.2-2.3 Por que não acertar tudo antes; Categorias de refatorações de banco (s.32-33, impr. 22-24)
Resumo: os autores rejeitam "modelar tudo antes" e propõem AMDD (modelagem de alto nível + model storming JIT). Descrevem seis categorias de refatoração de banco.
Conceitos e regras:
- Modelar tudo antes não funcionou bem em três décadas para a comunidade de TI; a abordagem tradicional não reflete métodos evolutivos (RUP, XP) nem a demanda crescente por mudanças. [s.32]
- AMDD: modelagem de alto nível para identificar a "paisagem" e depois detalhes just-in-time; código e schema evoluem e a qualidade se mantém refatorando ambos. [s.32]
- Seis categorias (Tabela 2.1) [s.33]:
  - Structural (cap. 6): muda definição de tabelas/views; ex.: mover coluna, dividir coluna multiuso em várias.
  - Data Quality (cap. 7): melhora a qualidade da informação; ex.: tornar coluna NOT NULL, aplicar formato comum.
  - Referential Integrity (cap. 8): garante existência de linha referenciada e/ou remoção adequada de linha não mais necessária; ex.: trigger para cascade delete que antes era feito fora do banco.
  - Architectural (cap. 9): melhora como programas externos interagem com o banco; ex.: trocar operação Java de biblioteca compartilhada por stored procedure, disponível a apps não-Java.
  - Method (cap. 10): melhora um método (stored procedure, função, trigger); ex.: renomear stored procedure; muitas refatorações de código se aplicam.
  - Non-Refactoring Transformation (cap. 11): muda o schema E a semântica; ex.: adicionar coluna a tabela existente.
- A categorização é imperfeita: Replace Method With View (p.265) cabe em Architectural e Method; foi posta em Architectural. [s.32]
Citações curtas de prova:
- "A change to your database schema that changes its semantics." [s.33, definição de Non-Refactoring Transformation, Tabela 2.1; texto da tabela fragmentado pela extração]
O que este trecho NÃO diz: não detalha as refatorações de cada categoria aqui (estão nos caps. 6-11, em outros blocos).
Relevância: database-and-migrations-expert: ALTA. Taxonomia de seis categorias para classificar mudanças de schema e escolher cuidados.
Decisão sugerida: usar em database-and-migrations-expert (references/categorias).

### 2.4 Database Smells (s.34-35, impr. 23-25)
Resumo: por analogia com code smells (Fowler), lista de sinais de que o schema precisa de refatoração. Cheiro não implica defeito, apenas indica olhar e decidir.
Conceitos e regras (catálogo de smells, 1 linha cada):
- Multipurpose column: coluna usada para vários propósitos, exige código extra checando outras colunas (ex.: data de nascimento do cliente vs. data de início do empregado); limita funcionalidade. [s.34]
- Multipurpose table: tabela guardando vários tipos de entidade (ex.: Customer genérica para pessoa e empresa), gerando colunas NULL para certos tipos. [s.34]
- Redundant data: mesmo dado em vários lugares causa inconsistência (ex.: John Smith com dois endereços em tabelas distintas). [s.34]
- Tables with too many columns: falta de coesão; ex.: três endereços ou vários telefones na Customer; normalizar com tabelas Address e PhoneNumber. [s.34]
- Tables with too many rows: problema de desempenho; dividir verticalmente (mover colunas) ou horizontalmente (mover linhas). [s.34-35]
- "Smart" columns: posições do valor codificam conceitos (ex.: quatro primeiros dígitos do ID do cliente indicam a agência; texto com XML); reorganizar em campos constituintes. [s.35]
- Fear of change: medo de alterar o schema por poder quebrar (ex.: 50 aplicações) é o sinal mais seguro de que se deve refatorar; risco técnico que só piora. [s.35]
- Regra de uso: "se cheira, olhe, pense e refatore se fizer sentido" (analogia limburger/leite). [s.35]
Citações curtas de prova:
- "Fear of change." [s.35, título do smell]
O que este trecho NÃO diz: não dá limites numéricos (quantas colunas/linhas é "demais").
Relevância: database-and-migrations-expert: ALTA. Lista de smells de schema para revisão de modelagem.
Decisão sugerida: usar em database-and-migrations-expert (checklist de smells).

### 2.5-2.6 Onde a refatoração de banco se encaixa; Como facilitar a refatoração (s.35-38, impr. 25-28)
Resumo: refatoração de banco é técnica de implementação, usada para facilitar a adição de uma feature (refatora primeiro, depois adiciona). O acoplamento é o principal fator de dificuldade; encapsular o acesso reduz mas não zera.
Conceitos e regras:
- Fluxo: ao precisar de nova coluna/procedure e o design não suporta bem, refatorar o schema antes e só então adicionar a feature; melhora lentamente e continuamente o design e a produtividade. [s.36]
- Refatoração é só parte do desenvolvimento evolutivo; continuam necessários modelagem ágil, testes do schema, configuração/versionamento e tuning (Fig. 2.6: atividades bidirecionais sem início/fim definidos). [s.36]
- Acoplamento: maior acoplamento, mais difícil refatorar; mais crítico quando há comportamento (código). Banco single-application é o caso fácil (acoplado a si e à aplicação). Banco multi-aplicação pode estar acoplado a: código de aplicações, frameworks de persistência/ORM, outros bancos (replicação, extract/load), schemas de arquivos de dados, código de teste e a si mesmo. [s.37]
- Redução do acoplamento: encapsular o acesso via camada de persistência (DAOs com o SQL, frameworks, stored procedures ou Web services); o acoplamento nunca vai a zero, mas fica gerenciável (Fig. 2.7/2.8). [s.37-38]
- Definição de resumo: refatoração de banco é uma mudança simples ao schema que melhora o design mantendo semântica comportamental e informacional. [s.38]
Citações curtas de prova:
- "The greater the coupling, the harder it is to refactor something." [s.37, impr. 27]
O que este trecho NÃO diz: não diz que stored procedures são sempre melhor camada de persistência; lista as opções sem ranquear.
Relevância: database-and-migrations-expert: ALTA. Mapa de acopladores externos (apps desconhecidas, ETL, ORM, testes) para análise de impacto antes de mudar o schema.
Decisão sugerida: usar em database-and-migrations-expert (análise de impacto e encapsulamento).

---

## Cap. 3 — The Process of Database Refactoring (s.39-69, impr. 29-47)

### Visão geral do processo (s.39-43, impr. 29-32)
Resumo: descreve como implementar UMA refatoração no sandbox de desenvolvimento, usando Move Column (p.103) (Customer.Balance para Account) como exemplo. Desenvolvedor (Eddy) pareia com DBA (Beverley). Aplica-se a banco single e multi-aplicação; a diferença é o período de transição mais longo no multi.
Conceitos e regras: a lista ordenada de atividades iteradas (Fig. 3.2) [s.41, s.43]:
1. Verify that a database refactoring is appropriate.
2. Choose the most appropriate database refactoring.
3. Deprecate the original database schema (opcional).
4. Test before, during, and after.
5. Modify the database schema.
6. Migrate the source data (opcional).
7. Modify external access program(s).
8. Run regression tests.
9. Version control your work.
10. Announce the refactoring.
- Sandboxes lógicos: dev (cópia própria de código e banco), integração do projeto, preprodução (testes de sistema/integração/aceite), produção. O trabalho difícil é no sandbox de dev; deployment é o cap. 4. [s.39]
- Nota de leitura: o diagrama (Fig. 3.2) tem fluxos [Pass]/[Fail]/[Work continues]/[Finished] em texto embaralhado; só a lista de atividades é confiável. 
Citações curtas de prova:
- "Together they iteratively work through the following activities" [s.41, impr. 30] (trecho: "iteratively work through the following activities").
O que este trecho NÃO diz: a lista é descrita como iterativa, não como etapas estritamente sequenciais.
Relevância: database-and-migrations-expert: ALTA. Passos canônicos de uma refatoração de banco.
Decisão sugerida: usar em database-and-migrations-expert (workflow dos 10 passos).

### 3.1 Verify That a Database Refactoring Is Appropriate (s.45, impr. 32-33)
Resumo: o DBA avalia três perguntas antes de aplicar.
Conceitos e regras:
- (1) Does the refactoring make sense? Desenvolvedores podem discordar ou entender mal o design; o DBA conhece o banco do projeto, outros bancos corporativos e a visão geral da empresa; talvez a estrutura atual esteja correta. [s.45]
- (2) Is the change actually needed now? "Gut call" baseado em histórico com o desenvolvedor: há razão de negócio? o desenvolvedor já mudou de ideia dias depois forçando reversão? Se houver dúvida, esperar mais antes de promover ao ambiente de integração. [s.45]
- (3) Is it worth the effort? Avaliar impacto geral e como programas externos acoplam àquela parte; se for exigir atualizar, testar e reimplantar 50 outras aplicações, pode não ser viável. Mesmo com um só app, o acoplamento pode tornar inviável. No exemplo, severidade do problema justifica mesmo com muitas apps afetadas. [s.45-46]
Citações curtas de prova:
- "Is it worth the effort?" [s.45, impr. 32]
O que este trecho NÃO diz: não dá critério quantitativo de custo/benefício; é julgamento.
Relevância: database-and-migrations-expert: ALTA. Gate de decisão antes de refatorar (faz sentido / agora / vale a pena).
Decisão sugerida: usar em database-and-migrations-expert.

### 3.2 Choose the Most Appropriate Database Refactoring (s.46, s.48, impr. 33-35)
Resumo: analisar o problema antes de escolher a refatoração; pequenos passos.
Conceitos e regras:
- Take Small Steps: aplicar uma refatoração de cada vez; exemplo mover, renomear e aplicar formato comum a uma coluna = Move Column (p.103), depois Rename Column (p.109), depois Introduce Common Format (p.183), um de cada vez; se errar, o bug está na parte recém-mudada. [s.46]
- Desenvolvedor pode identificar o problema certo mas a solução errada: Eddy pediu "adicionar coluna" via Introduce Column (p.180), sem saber que a coluna já existe em Customer no lugar errado; a refatoração correta era Move Column. [s.46]
- Sometimes the Data Is Elsewhere: o DBA deve conhecer as fontes de dados da empresa; se outro banco é o repositório oficial, a refatoração verdadeira seria Use Official Data Source (p.271) e não mover a coluna. [s.48]
Citações curtas de prova:
- "Take Small Steps" [s.46, impr. 33, título de box]
O que este trecho NÃO diz: não explica Move Column em detalhe (está no cap. 6).
Relevância: database-and-migrations-expert: ALTA. Um problema aparente de "adicionar coluna" pode ser uma refatoração distinta; checar fonte oficial de dados.
Decisão sugerida: usar em database-and-migrations-expert.

### 3.3 Deprecate the Original Database Schema / Transition Period (s.48-49, impr. 34-36)
Resumo: definição central do período de transição (deprecation period) e do scaffolding.
Conceitos e regras:
- Premissa multi-aplicação: não é possível refatorar e implantar todos os programas simultaneamente; precisa-se de um transition period (também deprecation period) no qual esquema original e novo coexistem em paralelo. [s.48]
- Duração típica: vários trimestres, se não anos; por isso automatizar o máximo (pessoas mudam em anos; partes manuais são risco). Mesmo single-application pode precisar de alguns dias no sandbox de integração. [s.48]
- Ciclo de vida (Fig. 3.3): implementar a refatoração, implantar schema refatorado + scaffolding em produção, período de transição, depois remover schema original e scaffolding. [s.48-49]
- Premissas durante a transição: (a) algumas apps usam o schema original, outras o novo; (b) cada app só precisa trabalhar com UMA versão, não ambas; todas devem rodar corretamente. [s.49]
- Exemplo (Fig. 3.5): adicionar Account.Balance; marcar Customer.Balance para remoção em/após 14 jun 2006 (removal date); dois triggers (SynchronizeAccountBalance em Customer, SynchronizeCustomerBalance em Account) mantêm as colunas sincronizadas, com mesma "drop date". Suposição: código novo usa Account.Balance sem atualizar Customer.Balance e código antigo vice-versa. [s.49]
- Scaffolding code = código simples e comum necessário para manter o banco "glued together"; recebe a mesma data de remoção da coluna. [s.49]
- Nem toda refatoração exige transição: Introduce Column Constraint e Apply Standard Codes (p.157) não exigem, pois só estreitam valores aceitos; mas um valor mais estreito pode quebrar aplicações existentes, então cuidado. [s.49]
- Estratégia de escolha de período: cap. 5. [s.49]
Citações curtas de prova:
- "This trigger is an example of database scaffolding code" [s.49, impr. 35] (texto: "This trigger is an example of database scaffolding code, simple and common code...").
- "applications should only have to work with one but not both versions of the schema" [s.49, impr. 35] (original: "...should only have to work with one but not both versions of the schema").
O que este trecho NÃO diz: não menciona o termo "expand-contract" nem "parallel change"; fala em transition/deprecation period e scaffolding. Não trata de zero-downtime nem locks.
Relevância: database-and-migrations-expert: ALTA. Define expand/contract no vocabulário do livro: coexistência, triggers de sincronização, data de remoção, remoção posterior.
Decisão sugerida: usar em database-and-migrations-expert (transition period, scaffolding, data de remoção marcada no próprio objeto).

### 3.4 Test Before, During, and After (s.49, s.51, s.53, impr. 37-40)
Resumo: abordagem TDD para o schema: escrever teste, depois o DDL mínimo que o satisfaz, até concluir a refatoração. Quatro categorias de teste.
Conceitos e regras:
- Testes a escrever: (a) schema; (b) como a aplicação usa o schema; (c) validar a migração de dados; (d) código externo. [s.49]
- Testar o schema (3.4.1): stored procedures e triggers como código de aplicação; RI (cascade delete; regras de existência, ex.: linha em Customer deve existir antes de inserir em Account); definições de view (filtro/seleção, número de linhas, colunas certas, ordem de colunas e linhas); default values (alguém pode ter removido o default); data invariants/constraints (ex.: número restrito a 1 a 7). [s.49, s.51]
- Desafios: falta de habilidade em teste (treinar, parear DBA sem teste com tester sem DBA); falta de testes unitários de banco existentes (começar agora); falta de ferramentas: DBUnit (dados de teste) e SQLUnit (stored procedures) citados como OSS, mais ferramentas comerciais. [s.51]
- No exemplo, validar que Customer.Balance atualizado reflete em Account.Balance e vice-versa (triggers). [s.51]
- Validar migração de dados (3.4.2): conferir que o saldo correto foi copiado por cliente; em refatorações que "limpam" dados (Apply Standard Codes p.157, Consolidate Key Strategy p.168) escrever testes: códigos antigos (USA, U.S.) não existem mais e foram convertidos ao padrão US; ao trocar identificação do cliente (ID, SSN, telefone) por customer ID, verificar que as relações entre linhas foram preservadas (ex.: telefone 555-1234 apontava Sally Jones; o customer ID novo 987654321 deve apontar para Sally Jones). [s.51, s.53]
- Testar programas externos (3.4.3): para refatorar com confiança é preciso suíte de regressão completa dos programas externos; introduzir o schema final e ver o que quebra. Os donos dos sistemas deveriam escrever os testes; construir a suíte ao longo do tempo por refatoração. [s.53]
Citações curtas de prova:
- "Test Before, During, and After" [s.49, impr. 37, título]
O que este trecho NÃO diz: não mostra exemplos de código de teste; não detalha ferramentas além de DBUnit/SQLUnit (ferramentas de 2006).
Relevância: database-and-migrations-expert: ALTA. Lista concreta do que testar em schema e migração.
Decisão sugerida: usar em database-and-migrations-expert (testes de banco). Ferramentas citadas são datadas; traduzir para pgTAP/outros seria [fora do livro].

### 3.5 Modify the Database Schema (s.53-62, impr. 40-43)
Resumo: implementar com scripts pequenos, um por refatoração, numerados, e capturar também o script de remoção pós-transição.
Conceitos e regras:
- Ferramentas automáticas de refatoração não existiam ao escrever (2006); tudo é escrito à mão em um único script por refatoração. [s.60]
- Cada script recebe número único e incremental (ex.: build number da aplicação); em multi-equipe, ou números únicos entre equipes ou identificador de equipe no número (refatoração 1701 do time A vs. do time B); alternativa: timestamps (cap. 5). [s.60, s.62]
- Por que scripts pequenos: Simplicity (fácil não executar se surgir problema); Correctness (aplicar em ordem; refatorações dependem uma da outra, ex.: renomear coluna e semanas depois movê-la); Versioning (ambientes em versões diferentes: dev 163, integração 161, QA 155, produção 134; para levar integração a 163 aplica-se 162 e 163). [s.62]
- Versionamento exige tabela comum (DatabaseConfiguration) com a versão atual (cap. 5). [s.62]
- DDL do exemplo (Oracle: ALTER TABLE ... ADD, COMMENT ON, CREATE OR REPLACE TRIGGER ... REFERENCING OLD AS OLD NEW AS NEW FOR EACH ROW): adicionar Account.Balance (Numeric) com comentário de objeto contendo a data final (finaldate = 2006-06-14); dois triggers com comentário contendo dropdate. Os triggers disparam os procedimentos UpdateCustomerBalance, UpdateAccountBalanceForCustomer, DeleteCustomerIfAccountNotFound (corpo não mostrado). [s.54-60] Sintaxe específica de Oracle; `[fora do livro]` equivalente PostgreSQL/MySQL não é dado.
- Script pós-transição (mesmo identificador, 163, executado em ordem, após o fim do período): DROP COLUMN Customer.Balance; DROP TRIGGER SynchronizeAccountBalance; DROP TRIGGER SynchronizeCustomerBalance. [s.62]
- Follow Your Database Design Conventions: o trecho alterado deve seguir as diretrizes corporativas (nomes e documentação, no mínimo), fornecidas pelo grupo de DBAs. [s.63]
Citações curtas de prova:
- "assigning a unique, incremental number to each script" [s.60, impr. 42] (original: "We suggest assigning a unique, incremental number to each script.")
O que este trecho NÃO diz: não define mecanismo de aplicação automática dos scripts nem controle de concorrência/lock; não prescreve rollback scripts (o "undo" aparece só como back out em deployment).
Relevância: database-and-migrations-expert: ALTA. Scripts pequenos, numerados, em ordem, com marcação de remoção; script de remoção separado e posterior.
Decisão sugerida: usar em database-and-migrations-expert.

### 3.6 Migrate the Source Data (s.63, impr. 43-44)
Resumo: refatorações frequentemente exigem mover/limpar dados; script de migração com o mesmo número do script de schema.
Conceitos e regras:
- Dois tipos: apenas mover dados (Move Data p.192) ou limpar valores (refatorações de qualidade de dados, cap. 7, ex.: Apply Standard Type p.162, Introduce Common Format p.183). [s.63]
- Script DML de migração com o mesmo identificador que o script de schema; exemplo "one time migration": UPDATE Account SET Balance = (SELECT Balance FROM Customer WHERE CustomerID = Account.CustomerID). [s.63]
- Problemas de qualidade de dados são comuns em bancos legados que degradaram; ao fazer refatorações estruturais/arquiteturais, procurar problemas e aplicar refatorações de qualidade de dados. [s.63]
Citações curtas de prova: nenhuma além do código acima (não reproduzido).
O que este trecho NÃO diz: não aborda migração em lote para tabelas grandes, nem janelas, nem batching.
Relevância: database-and-migrations-expert: ALTA. Script de dados pareado com script de schema.
Decisão sugerida: usar em database-and-migrations-expert.

### 3.7 Refactor External Access Program(s) (s.65, impr. 44-45)
Resumo: programas externos precisam ser refatorados; o desafio é muitas vezes político.
Conceitos e regras:
- Programas externos incluem legados, frameworks de persistência, código de replicação de dados e sistemas de relatório. [s.65]
- Livros indicados para refatorar código: Fowler 1999 (Refactoring), Feathers 2004 (Working Effectively with Legacy Code), Kerievsky 2004 (Refactoring to Patterns). [s.65]
- Risco: alguns programas não serão atualizados ou nem têm equipe; alguém deve assumir responsabilidade e custo; "os desafios políticos frequentemente superam os técnicos". [s.65]
- Aim for Continuous Development: se todos os apps evoluem e são implantados regularmente, a transição pode ser curta. Sem verba para atualizar programas externos: duas estratégias: (1) fazer a refatoração com transição de "várias décadas" (desvantagem: scaffolding longo prejudica desempenho e polui o banco) ou (2) não fazer a refatoração. [s.66]
- "The Need to Document Reflects a Need to Refactor": precisar documentar tabela/coluna/procedure indica que renomear/refatorar pode evitar parágrafos de documentação. [s.65]
Citações curtas de prova:
- "the political challenges surrounding the need to update other systems often far outweigh the technical challenges" [s.65, impr. 44] (texto fragmentado; original em frase maior).
O que este trecho NÃO diz: não oferece técnica de descoberta automática de consumidores desconhecidos do schema.
Relevância: database-and-migrations-expert: ALTA. Cuidados com sistemas externos: responsabilidade, custo, e as duas únicas saídas quando não há como atualizá-los.
Decisão sugerida: usar em database-and-migrations-expert.

### 3.8-3.9 Run Your Regression Tests; Version Control Your Work (s.66-68, impr. 45-46)
Conceitos e regras:
- Testar um pouco, mudar um pouco; automatizar o máximo; mudanças pequenas localizam rapidamente o ponto de quebra. [s.66]
- Colocar sob controle de configuração: scripts, dados de teste e/ou código gerador, casos de teste, documentação, modelos. Tratar artefatos de banco como código-fonte. [s.66, s.68]
Relevância: database-and-migrations-expert: ALTA (lista de artefatos versionados).
Decisão sugerida: usar em database-and-migrations-expert.

### 3.10 Announce the Refactoring (s.68-69, impr. 46-47)
Conceitos e regras:
- Banco é recurso compartilhado: comunicar cedo à equipe (ex.: standup); em multi-aplicação, comunicar a outras equipes sobretudo ao promover para preprodução (lista de e-mail de mudanças de banco, item no relatório de status, relatório formal ao grupo de DBAs operacionais). [s.68]
- Atualizar documentação: database release notes listando cada refatoração em ordem (ex.: "163: Move the Customer.Balance column into the Account table."); metadados corporativos; atualizar o physical data model (PDM), um dos poucos "keeper models". [s.68]
- Não publicar modelos de dados prematuramente; esperar o schema estabilizar para reduzir esforço de documentação e impacto em outras equipes. [s.69]
- Resumo do cap. 3: DBA+dev, verificar adequação, escolher refatoração, transição em paralelo no multi-app, test-first, modificar schema, migrar dados, modificar programas externos, versionar, anunciar. [s.69]
Relevância: database-and-migrations-expert: MÉDIA (release notes por refatoração; comunicação).
Decisão sugerida: usar em database-and-migrations-expert (resumido).

---

## Cap. 4 — Deploying into Production (s.70-83, impr. 49-57)

### Introdução e 4.1 Deploying Between Sandboxes (s.70-72, impr. 49-51)
Resumo: refatorações de banco são mais seguras de implantar que mudanças de schema tradicionais, por três razões, desde que se siga o livro.
Conceitos e regras:
- Razões de segurança: (1) cada refatoração é pequena e simples (mas o conjunto implantado pode ficar complexo se mal gerido); (2) TDD gera suíte de regressão; (3) o período de transição com schemas paralelos dispensa implantar junto uma pilha de mudanças de aplicação. [s.70]
- Estratégias necessárias: implantação entre sandboxes; aplicar pacotes (bundles) de refatorações; janelas de implantação; implantar o sistema; remover schema obsoleto. [s.70, s.72]
- Portões de implantação (Fig. 4.1): dev para integração (fácil e frequente; erro afeta só a equipe), integração para preprodução/teste (controlado; erro pode derrubar outros sistemas), preprodução para produção (rigoroso/altamente controlado; erro afeta clientes). [s.72]
- Em cada sandbox: construir a aplicação e rodar os scripts de gestão do banco (change log, update log, data migration log); depois rerodar regressão; se falhar, corrigir no sandbox de dev, reimplantar e retestar. [s.73]
- Objetivos: integração valida que as mudanças dos pares funcionam juntas; preprodução valida o sistema com os outros da organização. Promoção ao integration várias vezes ao dia é comum; implantar em demo ao menos uma vez por iteração; idealmente em preprodução também, uma vez por iteração. Razões: feedback concreto e melhoria dos scripts de instalação (e seus testes) por execução regular, até estarem robustos para produção. [s.73]
Citações curtas de prova:
- "deploying database refactorings is much safer than deploying traditional database schema changes" [s.70, impr. 49] (original: "...much safer than deploying traditional database schema changes, assuming...").
O que este trecho NÃO diz: não trata de blue-green, feature flags ou zero downtime.
Relevância: database-and-migrations-expert: ALTA. Cadeia de ambientes, portões e razões de segurança.
Decisão sugerida: usar em database-and-migrations-expert.

### 4.2 Applying Bundles of Database Refactorings (s.73, s.75-76, impr. 51-53)
Resumo: como o deploy em produção ocorre a cada alguns meses, as refatorações do período são agrupadas e aplicadas em ordem, por número de versão.
Conceitos e regras:
- Cada refatoração é tratada como sua própria transação: scripts DDL + migração de dados + mudanças no código fonte que acessa aquela parte do schema, com ID único (número ou data/timestamp) que define a ordem. [s.73, s.75]
- Bancos diferentes têm versões diferentes (Fig. 4.2: dev 813/811/815, integração 811, preprod 805, demo 800, produção 758). Leitura de versões: dev 813 mudou desde o sync; dev 809 está desatualizado; dev 815 mudou em paralelo ao 813. Para atualizar: integração a partir de 812, preprod a partir de 806, demo a partir de 801, produção a partir de 758 (o livro escreve 758, que é a própria versão da produção na figura; os demais casos usam versão+1, possível inconsistência do livro; registrado como no original). [s.75]
- Não necessariamente aplicar tudo a todos: ex.: levar produção só até a versão 794 para o próximo release. [s.75]
- "Stack" de refatorações: no início de um novo release inicia-se uma pilha; vai-se adicionando (e às vezes removendo as abandonadas); no fim do release a pilha é baselined como o pacote do release. [s.75-76]
Citações curtas de prova:
- "baseline the stack" [s.76, impr. 53] (original: "you baseline the stack, accepting it as the bundle of schema changes for the current release").
O que este trecho NÃO diz: não prescreve ferramenta específica (Flyway/Liquibase não existem no livro); não trata de ordem de merge de scripts concorrentes além da numeração.
Relevância: database-and-migrations-expert: ALTA. Versionamento por número, aplicação a partir da versão atual do ambiente, bundle por release.
Decisão sugerida: usar em database-and-migrations-expert. Comentário: o ponto de partida "758" para produção na versão 758 parece inconsistente com os outros exemplos (versão+1); registrar a ambiguidade.

### 4.3 Scheduling Deployment Windows (s.76-79, impr. 53-55)
Conceitos e regras:
- Deployment/release window: momento permitido para implantar em produção; ex.: releases só sábado 2-6 a.m., correções 4-6 a.m. em outras noites; podem existir regras de schema (ex.: só no terceiro sábado do mês); organizações menores podem ter janelas a cada alguns meses. [s.76]
- Equipe deve agendar em janelas pré-definidas e coordenar com outras equipes que implantam na mesma janela; preprodução existe para resolver problemas multi-sistema; tudo é testado em preprodução antes de produção. [s.79]
- Benefício: controle do que entra em produção e quando; ajuda a operação, dá datas-alvo, define expectativas dos usuários. [s.79]
Relevância: database-and-migrations-expert: MÉDIA.
Decisão sugerida: usar em database-and-migrations-expert (resumido).

### 4.4 Deploying Your System (s.79-82, impr. 54-56)
Resumo: processo de implantação em sete passos (Fig. 4.4).
Conceitos e regras (ordem exata):
1. Back up your database: sempre que possível, para poder voltar a um estado conhecido; difícil com bancos grandes; refatorações pequenas são fáceis de desfazer individualmente, vantagem que se perde quanto mais se espera (outras dependem delas). [s.79]
2. Run your previous regression tests: garantir que o sistema de produção atual funciona; se a suíte do deploy anterior falhar, abortar e investigar; cuidar para que os testes não tenham efeitos colaterais em produção. [s.79]
3. Deploy your changed application(s) (procedimentos existentes). [s.80]
4. Deploy your database refactorings: scripts de schema e de migração de dados. [s.80]
5. Run your current regression tests (versão atual da suíte); cuidado com efeitos colaterais. [s.80]
6. Back out if necessary: se a regressão mostrar defeitos sérios, reverter aplicações e schemas para as versões anteriores e restaurar o banco do backup do passo 1; se o deploy for complexo, implantar em incrementos, testando cada um (mais complexo, mas uma parte problemática não derruba tudo). [s.80, s.82]
7. Announce the deployment results: anunciar sucesso imediatamente; mesmo se abortar, anunciar o que houve e quando se tentará de novo. [s.82]
- Deploy de refatorações normalmente não é isolado, e sim parte do deploy de um ou mais sistemas e fontes de dados. [s.79]
Citações curtas de prova:
- "Back up your database." [s.79, impr. 54]
O que este trecho NÃO diz: o rollback descrito é restaurar backup + versões anteriores, não scripts "down" reversíveis; não trata de migrações online.
Relevância: database-and-migrations-expert: ALTA. Sequência de deploy com backup, regressão antes e depois e critério de back out.
Decisão sugerida: usar em database-and-migrations-expert.

### 4.5-4.6 Removing Deprecated Schema; What You Have Learned (s.82-83, impr. 56-57)
Conceitos e regras:
- Uma refatoração só está realmente implantada quando o schema obsoleto é removido de produção; ao fim da transição remover schema obsoleto e scaffolding (triggers de sincronização). [s.82]
- Processo: datas fixas (ex.: trimestrais) em que períodos de transição podem terminar; agrupar as remoções e aplicá-las de uma vez. [s.82]
- Testar a remoção: primeiro remover no preprod/QA e retestar tudo; depois aplicar em produção, rodar a suíte e decidir back out ou continuar. [s.82]
- Resumo: bundle de refatorações no janela; coordenar com outras equipes; implantar versões de desenvolvimento em preprodução regularmente melhora e valida scripts. [s.83]
Citações curtas de prova:
- "A database refactoring has not been truly deployed until you have removed the deprecated schema from production." [s.82, impr. 56]
- "You must test thoroughly." [s.82] (texto: "We cannot say this enough: You must test thoroughly.")
O que este trecho NÃO diz: não prescreve como detectar que um consumidor ainda usa a coluna antiga antes de removê-la.
Relevância: database-and-migrations-expert: ALTA. Fase "contract" com data, batch de remoções e teste prévio em QA.
Decisão sugerida: usar em database-and-migrations-expert.

---

## Cap. 5 — Database Refactoring Strategies (s.84-96, impr. 59-66) [continua no próximo bloco; seção 5.8 truncada]

### Lista de lições do cap. 5 (s.84, impr. 59)
Treze lições: (1) Smaller changes are easier to apply; (2) Uniquely identify individual refactorings; (3) Implement a large change by many small ones; (4) Have a database configuration table; (5) Prefer triggers over views or batch synchronization; (6) Choose a sufficient deprecation period; (7) Simplify your database change control board (CCB) strategy; (8) Simplify negotiations with other teams; (9) Encapsulate database access; (10) Be able to easily set up a database environment; (11) Do not duplicate SQL; (12) Put database assets under change control; (13) Beware of politics. Do bloco, só 5.1 a 5.8 estão cobertos; 5.9 em diante (encapsulate, setup de ambiente, duplicate SQL, change control, politics) continua no próximo bloco.

### 5.1 Smaller Changes Are Easier to Apply (s.86, impr. 60)
- Mover coluna, renomear e aplicar tipo padrão ao mesmo tempo é possível, mas mais difícil e arriscado; se uma mudança pequena quebra, sabe-se qual foi a causa. Quanto maior a mudança, maior a chance de defeito e a dificuldade em achá-lo. [s.86]
Relevância: ALTA (já dito no 3.2).

### 5.2 Uniquely Identify Individual Refactorings (s.86-89, impr. 60-62)
Resumo: centenas de refatorações se acumulam e dependem entre si (renomear coluna e semanas depois movê-la); é preciso ordem e dependências explícitas.
Conceitos e regras (Tabela 5.1, três estratégias, premissa single-application/single-database) [s.87]:
- Build number: número de build da aplicação (inteiro do build tool, ex.: CruiseControl) atribuído quando compila e os testes unitários passam após uma mudança. Vantagens: simples; fila FIFO aplicada por número; versão do banco ligada à versão da aplicação. Desvantagens: assume integração entre ferramenta de refatoração e build, ou que cada refatoração seja scripts em controle de configuração; muitos builds sem mudança de banco, então versões não contíguas (1, 7, 11, 12); difícil com várias aplicações no mesmo banco (mesmos números de build).
- Date/timestamp: data/hora atribuída. Vantagens: simples; FIFO. Desvantagens: nome de arquivo com timestamp é desajeitado; precisa de estratégia para associar refatorações ao build da aplicação.
- Unique identifier (GUID ou incremental): vantagens: estratégias existentes de geração. Desvantagens: GUID como nome de arquivo é desajeitado; com GUID ainda é preciso definir a ordem; precisa associar ao build.
- Multi-aplicação/multi-equipe: atribuir ID único a cada equipe e incluir no ID da refatoração (ex.: 1-7, 1-12; 7-3, 7-7). Recomendação do livro: um único time responsável: build number; vários times evoluindo o mesmo banco: date/timestamp (com build number não se sabe quem veio antes, 1-7 ou 7-7?). [s.86, s.89]
- Armadilha de coordenação (caso Fred e Barney): duas equipes aplicaram a mesma refatoração Apply Standard Codes (p.157) na mesma coluna com conjuntos "padrão" diferentes; o conjunto de Barney era o correto, mas só se descobriu na promoção para preprodução, quando um sobrescreveu o outro. Conclusão: em ambiente multi-equipe é preciso estratégia de coordenação, além de ordenar. [s.89]
Citações curtas de prova:
- "you need a coordination strategy" [s.89, impr. 62] (original: "in a multiple-team environment, you need a coordination strategy").
O que este trecho NÃO diz: não aborda migrações com hash/checksum nem detecção de drift; não cita ferramentas de migração modernas.
Relevância: database-and-migrations-expert: ALTA. Critério de escolha de esquema de versionamento e risco de colisão multi-equipe.
Decisão sugerida: usar em database-and-migrations-expert.

### 5.3 Implement a Large Change by Many Small Ones (s.89, impr. 62)
Conceitos e regras:
- Mudanças grandes (chave substituta comum a todas as tabelas, convenção de nomes consistente) devem ser decompostas em muitas pequenas ("one bite at a time"). [s.89]
- Exemplo Split Table (p.145): na prática aplicar vários passos: Introduce New Table (p.304) (transformação) para criar a tabela nova; Move Column (p.103) uma vez para cada coluna; possivelmente Introduce Index (p.248) para a chave primária da nova tabela; cada Move Column exige Introduce New Column (p.301) e Move Data (p.192); podem surgir refatorações de qualidade de dados (cap. 7). [s.89]
- Nota: o livro cita Introduce Column (p.180) em 3.2 e Introduce New Column (p.301) aqui; as páginas diferem entre trechos (inconsistência do livro/extração), registrar.
Relevância: database-and-migrations-expert: ALTA. Decomposição concreta de uma refatoração grande em passos.
Decisão sugerida: usar em database-and-migrations-expert.

### 5.4 Have a Database Configuration Table (s.90-93, impr. 63-64)
Conceitos e regras:
- A versão do schema deve ser armazenada em uma tabela e seguir a mesma estratégia de identificação das refatorações (timestamp com timestamp, etc.). [s.90]
- Exemplo (Oracle, build number): tabela DatabaseConfiguration de uma linha e uma coluna, SchemaVersion NUMBER NOT NULL; INSERT inicial com 0; a cada refatoração aplicada, UPDATE SchemaVersion = identificador (ex.: 17). [s.90-93]
Citações curtas de prova: nenhuma necessária.
O que este trecho NÃO diz: não guarda histórico de refatorações aplicadas (somente a versão atual em uma única linha); não protege contra aplicação fora de ordem.
Relevância: database-and-migrations-expert: ALTA. Tabela de versão do schema atualizada a cada script.
Decisão sugerida: usar em database-and-migrations-expert.

### 5.5 Prefer Triggers over Views or Batch Synchronization (s.93-95, impr. 64-65)
Resumo: três estratégias para manter dados sincronizados na transição (Tabela 5.2). Recomendação: triggers; os exemplos do livro todos assumem trigger.
Conceitos e regras [s.95]:
- Trigger: vantagem: atualização em tempo real. Desvantagens: potencial gargalo de desempenho; potencial de ciclos de trigger; potencial de deadlocks; frequentemente cria dados duplicados (dados nos schemas original e novo).
- Views (ver Encapsulate Table With View, p.243: view representando as tabelas originais que atualiza ambos os schemas): vantagens: tempo real; sem mover dados fisicamente entre tabelas/colunas. Desvantagens: views atualizáveis não são suportadas por alguns bancos, ou o banco não suporta joins numa view atualizável; complexidade adicional de introduzir e depois remover as views.
- Batch updates: job periódico (ex.: diário). Vantagem: impacto de desempenho absorvido em carga fora de pico. Desvantagens: enorme potencial de problemas de integridade referencial; é preciso rastrear versões anteriores dos dados para saber o que mudou; se houve mudanças em ambos os schemas no período, é difícil decidir qual aceitar; também gera dados duplicados.
- Experiência dos autores: triggers para a grande maioria dos casos; views "algumas vezes"; batch "raramente". [s.93]
Citações curtas de prova:
- "Our experience is that triggers are the best approach for the vast majority of situations." [s.93, impr. 64]
O que este trecho NÃO diz: não trata de CDC, dual-write na aplicação, nem dos riscos de lock de trigger em tabela grande; desempenho "gargalo" só mencionado como potencial.
Relevância: database-and-migrations-expert: ALTA. Comparação de mecanismos de sincronização na fase de transição.
Decisão sugerida: usar em database-and-migrations-expert. A sintaxe de trigger do livro é Oracle; equivalentes em PostgreSQL/MySQL são `[fora do livro]`.

### 5.6 Choose a Sufficient Transition Period (s.96, impr. 65)
Conceitos e regras:
- O DBA atribui um período realista, suficiente para todas as outras equipes. Abordagem mais simples: acordar um período comum por categoria de refatoração e aplicá-lo de forma consistente; exemplo: structural = 2 anos; architectural = 3 anos. [s.96]
- Desvantagem: adota-se o período mais longo mesmo que o schema seja acessado por poucas aplicações implantadas com frequência. Mitigação: remover ativamente do schema de produção o que não é mais necessário antes do prazo; ou negociar período menor via CCB ou diretamente. [s.96]
Citações curtas de prova:
- "structural refactorings may have a two-year transition period" [s.96, impr. 65]
O que este trecho NÃO diz: não dá regra para escolher o período além da negociação e do padrão por categoria; os valores são exemplos, não prescrição.
Relevância: database-and-migrations-expert: ALTA.
Decisão sugerida: usar em database-and-migrations-expert.

### 5.7 Simplify Your Database CCB Strategy (s.96, impr. 65)
Conceitos e regras:
- Exemplo: CCB de DBAs operacionais reunia semanalmente; DBAs de projeto traziam as mudanças desejadas em fontes de dados já em produção (fontes ainda não em produção eram livres) e o CCB decidia se permitia e qual período de depreciação. Vantagem: percepção de controle. Desvantagens: desacelera as equipes; falha se a equipe contorná-lo. [s.96]
- Sugestão: dar ao DBA do projeto autoridade para mudar o schema (com o CCB podendo reverter depois) ou ter CCB diário. [s.96]
Relevância: database-and-migrations-expert: BAIXA (governança organizacional).
Decisão sugerida: usar apenas em nota breve ou descartar.

### 5.8 Simplify Negotiations with Other Teams (s.96, impr. 65-66) [continua no próximo bloco]
- Apenas o início: alternativa de definir o período de transição negociando cada refatoração com os donos dos sistemas afetados. Texto truncado em "that might be affected by" no fim do bloco; continua no próximo. [s.96]
Relevância: BAIXA por ora.

---

## Enumeração de refatorações/técnicas citadas por nome neste bloco (1 linha + seção)
Nenhuma é descrita no catálogo neste bloco; só mencionadas para exemplos.
- Move Column (p.103): mover coluna entre tabelas (ex.: Customer.Balance para Account); exemplo de processo do cap. 3. [s.39, s.46, s.89]
- Rename Column (p.109): renomear coluna. [s.46]
- Introduce Common Format (p.183): aplicar formato comum a uma coluna. [s.46, s.63]
- Apply Standard Codes (p.157): converter códigos (USA, U.S. para US); não exige transição; pode conflitar entre equipes. [s.49, s.53, s.89]
- Apply Standard Type (p.162): padronizar tipo de dado. [s.63]
- Consolidate Key Strategy (p.168): escolher uma forma de identificar clientes e refatorar outras tabelas. [s.51, s.53]
- Introduce Column Constraint (p.180 citado): restringe valores; sem transição. [s.49]
- Introduce Column (p.180, transformação) / Introduce New Column (p.301): adiciona coluna vazia; pode quebrar acesso posicional. [s.31, s.46, s.89]
- Introduce New Table (p.304): transformação que cria tabela. [s.89]
- Introduce Index (p.248): criar índice (chave primária da nova tabela). [s.89]
- Move Data (p.192): mover dados entre colunas/tabelas. [s.63, s.89]
- Split Table (p.145): dividir tabela em duas; exige vários passos. [s.89]
- Introduce Calculation Method (p.245): centralizar cálculo em método do banco; atualizar stored procedures para usá-lo. [s.31]
- Replace Method With View (p.265): categoria Architectural. [s.32]
- Encapsulate Table With View (p.243): view que atualiza esquema original e novo; alternativa a triggers. [s.95]
- Use Official Data Source (p.271): quando os dados estão em outro repositório oficial. [s.48]
- Técnicas de processo: transition/deprecation period, scaffolding code, data de remoção marcada no objeto (COMMENT ON), script único numerado por refatoração, script pós-transição de remoção, tabela DatabaseConfiguration, stack/baseline de refatorações, deployment window, backup + back out, release notes por refatoração, PDM atualizado.

## Candidatos a regra (procedimentos, critérios e armadilhas aplicáveis por um agente)
1. Refatoração de banco preserva semântica comportamental E informacional; mudança que altera semântica (ex.: adicionar coluna) é "transformação", e pode quebrar acesso posicional (coluna 17) ou binding (COBOL/DB2). [s.31] "A database transformation may or may not change the semantics; a database refactoring does not."
2. Antes de refatorar, 3 perguntas: faz sentido? é necessário agora? vale o esforço (acoplamento, quantos apps afetados)? [s.45] "Is it worth the effort?"
3. Sinais de schema smell: multipurpose column/table, redundant data, muitas colunas, muitas linhas, smart columns, medo de mudar. [s.34-35]
4. Uma refatoração por vez (mover, depois renomear, depois padronizar), mudanças grandes decompostas em muitas pequenas. [s.46, s.86, s.89]
5. Diagnóstico de problema antes da solução: "adicionar coluna" pode ser Move Column; dado pode ter fonte oficial externa (Use Official Data Source). [s.46, s.48]
6. Em banco com várias aplicações: transition period com schema antigo + novo em paralelo, scaffolding (triggers) com data de remoção marcada nos próprios objetos, depois remoção bundled e testada em QA antes de produção. [s.48-49, s.82] "applications should only have to work with one but not both versions of the schema"
7. Refatoração só está concluída quando o schema obsoleto é removido de produção. [s.82]
8. Nem toda refatoração precisa de transição (Introduce Column Constraint, Apply Standard Codes), mas estreitar valores pode quebrar apps. [s.49]
9. Testar antes, durante e depois: schema (procs, triggers, RI, views, defaults, invariantes), migração (conferir valores copiados, equivalência de chaves), programas externos (regressão). [s.49-53]
10. Um script de schema + um script de dados por refatoração, mesmo número único, em ordem; mais um script de remoção a rodar após a transição. [s.60-63]
11. Tabela de versão do schema (DatabaseConfiguration) atualizada a cada refatoração aplicada; ambientes em versões diferentes recebem só os scripts de versão atual+1 em diante. [s.62, s.75, s.90-93]
12. Estratégia de ID: build number se um time; timestamp se vários times; GUID precisa de ordem. [s.86-89]
13. Em multi-equipe, coordenar refatorações na mesma coluna (caso Fred/Barney). [s.89] "you need a coordination strategy"
14. Sincronização na transição: preferir triggers; views quando suportadas; batch raramente (riscos de RI e conflito). [s.93-95]
15. Deploy em produção: backup, regressão anterior, deploy app, deploy refatorações, regressão atual, back out se necessário (restaurar backup), anunciar. [s.79-82]
16. Sem verba para atualizar apps externas: transição muito longa (custo: scaffolding no banco) ou não refatorar. [s.66]
17. Períodos de transição por categoria (ex.: 2 anos structural, 3 anos architectural), reduzíveis removendo schema não usado ou negociando. [s.96] exemplos do livro, não regra fixa.
18. Encapsular acesso ao banco (DAOs, frameworks, stored procedures, web services) reduz acoplamento. [s.37]
19. Anunciar: release notes com cada refatoração em ordem; atualizar o PDM; não publicar modelos antes de estabilizarem. [s.68-69]

## Checklist de cobertura
- Primeira seção lida: 31
- Última seção lida: 96
- Páginas sem texto útil ou ilegíveis: seções s.40, s.42, s.44, s.47, s.50, s.52, s.61, s.64, s.67, s.71, s.74, s.78, s.81, s.85, s.88, s.94 contêm só um título "## CHAPTER N" (divisão de arquivo do EPUB); s.54-59 e s.91-93 são fragmentos de código (DDL Oracle).
- Problemas de extração observados: texto de figuras e tabelas embaralhado (Figs. 3.2, 3.4, 3.5, 4.1, 4.2, 4.4; Tabelas 2.1, 5.1, 5.2) com colunas intercaladas; cabeçalhos de página ("Database Smells", "Test Before, During, and After") misturados ao corpo; o rodapé "Prepared for dave.stockmann@..." é marca d'água do ebook; texto das seções s.75 sobre versões de ambientes (Fig. 4.2) tem números misturados; conteúdo visual não lido (diagramas UML de Figs. 3.1-3.6, 4.1-4.4); inconsistência de páginas citadas pelo livro para Introduce Column (180 vs 301).
- Capítulos/seções cobertos integralmente: fim do cap. 2 (2.2-2.7); cap. 3 completo; cap. 4 completo; cap. 5 de 5.1 a 5.7.
- Capítulos/seções que continuam em outro bloco: cap. 5 (5.8 truncada em s.96; 5.9 em diante: encapsular acesso, setup de ambiente, não duplicar SQL, change control, política); o catálogo de refatorações (caps. 6-11) vem depois.
