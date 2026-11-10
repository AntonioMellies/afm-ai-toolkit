# Exemplos por banco e por ferramenta

> **Todo este arquivo é `[fora do livro]` e é convenção desta skill.** Os exemplos de *Refactoring Databases* (Ambler e Sadalage, 2006) são em Oracle, Java e Hibernate; o livro não cobre PostgreSQL, MySQL, Flyway, Liquibase nem as demais ferramentas daqui. **Nenhum comando abaixo foi executado em banco algum.** Trate-os como rascunho: confira a sintaxe e o comportamento na documentação da versão que você usa e ensaie em cópia.

> **Aviso para todo comando destrutivo** (DROP, DELETE, UPDATE de dados, ALTER que aperta constraint): rode só em cópia ou sandbox, depois de backup, e nunca em produção sem autorização expressa do usuário. O agente entrega o script e o plano de ensaio; quem autoriza e executa em produção é o usuário.

Os exemplos usam nomes inventados por esta skill (`cliente`, `pedido`) e não reproduzem o código do livro.

## Mapa de conceitos

| Conceito do livro | Oracle no livro | PostgreSQL `[fora do livro]` | MySQL `[fora do livro]` |
|---|---|---|---|
| Data de remoção no objeto | `COMMENT ON` [s.54-60] | `COMMENT ON COLUMN`, `COMMENT ON TRIGGER` | comentário na definição da coluna (exige repetir a definição ao alterar) |
| Trigger de sincronização | PL/SQL, um trigger para INSERT e UPDATE [s.103-108] | função PL/pgSQL e `CREATE TRIGGER`; um trigger pode cobrir INSERT e UPDATE | um trigger por evento; `SET NEW.col = ...` |
| Objetos inválidos | consulta ao catálogo [s.109] | sem equivalente completo; corpos de função são resolvidos ao executar, então só teste exercitando as rotinas | idem |
| Achar colunas com o mesmo nome | consulta ao catálogo [s.109-110] | `information_schema.columns` | `information_schema.columns` |
| Marcar coluna como inutilizada | `SET UNUSED` [s.112] | não assumimos equivalente; verifique o custo do `DROP COLUMN` na documentação | idem |
| FK com checagem diferida | `INITIALLY DEFERRED` [s.343] | `DEFERRABLE INITIALLY DEFERRED` | confira: a checagem costuma ser imediata |
| Constraint sem validar o legado | não no livro | `ADD CONSTRAINT ... NOT VALID` e depois `VALIDATE CONSTRAINT` | confira na documentação |
| Índice em tabela grande | `CREATE INDEX` [s.447-453] | `CREATE INDEX CONCURRENTLY` (não roda dentro de transação) | `ALTER TABLE ... ADD INDEX` com `ALGORITHM` e `LOCK`; efeito depende da versão |
| Desativar FK sem apagar | `DISABLE CONSTRAINT` [s.365-367] | sem equivalente direto por constraint; documente no modelo e em comentário | idem |
| Carga em massa | SQL*Loader [s.325, s.555] | `COPY` | `LOAD DATA` |
| View materializada | [s.455] | `MATERIALIZED VIEW` e `REFRESH` | não nativa |
| Coluna calculada | trigger [s.122] | coluna gerada, mas só a partir da mesma linha | idem |
| Códigos de erro (violação de CHECK, FK e unicidade) | CHECK ORA-2290; FK ORA-2291 (pai não achado) e ORA-2292 (pai com filhos) [s.305, s.351] | CHECK 23514; FK 23503; unicidade 23505; NOT NULL 23502 (SQLSTATE) | FK 1452 (filho sem pai) e 1451 (pai com filhos); unicidade 1062 |
| Booleano | `NUMBER(1)` [s.328] | `boolean` | `BOOLEAN` como apelido de `TINYINT(1)` |

Bloqueios: o livro só afirma, em termos gerais, que atualizar ou mover muitos dados travando linhas afeta desempenho e disponibilidade [s.257, s.323], e que Drop Column em tabela grande pode demorar [s.111]. Não afirmamos aqui qual DDL bloqueia o quê em PostgreSQL ou MySQL; isso depende da versão e da operação. Meça numa cópia com volume parecido com o de produção.

## Exemplo 1: renomear coluna com transição (PostgreSQL)

Molde de `periodo-de-transicao.md`. Datas e nomes são inventados.

```sql
-- Script A: expandir (PostgreSQL, NÃO EXECUTADO, ensaie em cópia com backup)
ALTER TABLE cliente ADD COLUMN nome varchar(120);

COMMENT ON COLUMN cliente.nm   IS 'DEPRECIADA: use cliente.nome. Remover em 2027-06-30';
COMMENT ON COLUMN cliente.nome IS 'Substitui cliente.nm; sincronizada por trigger até 2027-06-30';

CREATE FUNCTION cliente_sync_nome() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.nome IS NULL THEN NEW.nome := NEW.nm;
    ELSIF NEW.nm IS NULL THEN NEW.nm := NEW.nome;
    END IF;
  ELSE
    IF NEW.nm IS DISTINCT FROM OLD.nm THEN NEW.nome := NEW.nm;
    ELSIF NEW.nome IS DISTINCT FROM OLD.nome THEN NEW.nm := NEW.nome;
    END IF;
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER trg_cliente_sync_nome
  BEFORE INSERT OR UPDATE ON cliente
  FOR EACH ROW EXECUTE FUNCTION cliente_sync_nome();   -- versões antigas usam EXECUTE PROCEDURE
COMMENT ON TRIGGER trg_cliente_sync_nome ON cliente IS 'Scaffolding. Remover em 2027-06-30';
```

Por que não cicla: o trigger é `BEFORE` na mesma tabela e só altera `NEW`; não há segundo UPDATE que o dispare de novo. Se os dois campos mudarem na mesma instrução, `nm` vence (regra desta skill). Em sincronização entre duas tabelas, o trigger de cada lado deve gravar no outro só se o valor for diferente (`IS DISTINCT FROM`), para a cadeia parar [s.103, s.244].

```sql
-- Script B: copiar os dados (DML; em cópia/sandbox, depois de backup)
UPDATE cliente SET nome = nm WHERE nome IS NULL;
-- Em tabela grande, faça em lotes e meça; o livro só avisa do custo de travar linhas [s.257].
SELECT count(*) FROM cliente WHERE nome IS DISTINCT FROM nm;   -- esperado: 0
```

```sql
-- Script C: contrair (DESTRUTIVO). Só após a data, testado antes em QA ou pré-produção,
-- com backup e autorização do usuário.
CREATE TABLE cliente_nm_arquivo AS SELECT id, nm FROM cliente;   -- preserva por precaução [s.113-114]
DROP TRIGGER trg_cliente_sync_nome ON cliente;
DROP FUNCTION cliente_sync_nome();
ALTER TABLE cliente DROP COLUMN nm;
```

## Exemplo 2: sequência NOT NULL

```sql
-- NÃO EXECUTADO. Em cópia/sandbox com backup; em produção só com autorização.
-- 1) default (o valor vem de acordo com os interessados; não atualiza linhas existentes)
ALTER TABLE cliente ALTER COLUMN pais SET DEFAULT 'BR';
-- 2) conferir e limpar os nulos existentes (COUNT(*), não COUNT(coluna))
SELECT count(*) FROM cliente WHERE pais IS NULL;
UPDATE cliente SET pais = 'BR' WHERE pais IS NULL;
-- 3) aplicar a constraint
ALTER TABLE cliente ALTER COLUMN pais SET NOT NULL;
-- 4) só depois de tempo suficiente e de confirmar que todos os escritores informam o valor
ALTER TABLE cliente ALTER COLUMN pais DROP DEFAULT;
```

Em MySQL a forma usual é `ALTER TABLE cliente MODIFY pais <tipo> NOT NULL DEFAULT ...`, repetindo a definição da coluna; confira a sintaxe da sua versão.

## Exemplo 3: chave estrangeira com saneamento

```sql
-- NÃO EXECUTADO (PostgreSQL). Só em cópia/sandbox com backup; em produção, só com autorização do usuário.
-- Primeiro sanear [s.347-349], depois a constraint (DDL que aperta o esquema).
SELECT (SELECT count(*) FROM pedido WHERE cliente_id IS NOT NULL) AS total,
       (SELECT count(*) FROM pedido p JOIN cliente c ON c.id = p.cliente_id) AS com_pai;  -- devem ser iguais
ALTER TABLE pedido ADD CONSTRAINT fk_pedido_cliente
  FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT VALID;      -- nome padronizado [s.343]
ALTER TABLE pedido VALIDATE CONSTRAINT fk_pedido_cliente;          -- falha se ainda houver órfãos
```

As aplicações precisam tratar a exceção de violação (SQLSTATE 23503 em PostgreSQL) [s.349-351].

## Exemplo 4: índice único

```sql
-- NÃO EXECUTADO (PostgreSQL). Só em cópia/sandbox com backup; em produção, só com autorização do usuário.
-- Procurar duplicatas antes [s.448-450]; criar índice em tabela grande pode afetar a escrita, meça na cópia.
SELECT cpf, count(*) FROM cliente GROUP BY cpf HAVING count(*) > 1;
CREATE UNIQUE INDEX CONCURRENTLY ux_cliente_cpf ON cliente (cpf);
```

`CONCURRENTLY` não roda em transação, e uma falha pode deixar um índice inválido que precisa ser removido; a ferramenta de migração precisa permitir a execução fora de transação. Veja como na documentação dela.

## Exemplo 5: triggers em MySQL (rascunho)

Em MySQL cada evento tem o seu trigger, e o cliente de linha de comando precisa trocar o delimitador (`DELIMITER`).

```sql
-- NÃO EXECUTADO. Só rascunho; confira a sintaxe e teste em cópia/sandbox com backup.
-- Em produção, só com autorização do usuário.
CREATE TRIGGER trg_cliente_sync_nome_upd BEFORE UPDATE ON cliente FOR EACH ROW
BEGIN
  IF NOT (NEW.nm <=> OLD.nm) THEN SET NEW.nome = NEW.nm;
  ELSEIF NOT (NEW.nome <=> OLD.nome) THEN SET NEW.nm = NEW.nome;
  END IF;
END
```

Faltam o trigger de INSERT e a remoção na data; siga o mesmo molde.

## Ferramentas de migração

O livro implementa scripts numerados à mão e guarda a versão atual em uma tabela de uma linha [s.60, s.90-93]. As ferramentas abaixo automatizam isso `[fora do livro]`. As descrições são de uso geral, não verificadas por execução nesta skill; confirme na documentação.

| Ferramenta (ecossistema) | Ordem e identificação | Tabela de controle |
|---|---|---|
| Flyway (Java, CLI) | arquivos `V<versão>__<descrição>.sql` | tabela de histórico, uma linha por migração aplicada |
| Liquibase (Java, CLI) | changesets com id e autor num changelog (XML, YAML ou SQL) | tabela de log dos changesets |
| goose (Go) | arquivos numerados com seções Up e Down | tabela de versões |
| golang-migrate (Go) | `<versão>_<nome>.up.sql` e `.down.sql` | tabela com a versão e um indicador de estado sujo |
| Prisma Migrate (Node, TypeScript) | uma pasta por migração com `migration.sql`, gerada a partir do schema | tabela de migrações |
| Knex (Node) | arquivos com prefixo de data e funções `up` e `down` | tabelas de migrações e de lock |
| Alembic (Python, SQLAlchemy) | revisões encadeadas por `down_revision`, funções `upgrade` e `downgrade` | tabela com a revisão atual |

Como relacionar com o livro:

- **Identificação** (número, data, GUID) é a escolha de [s.86-89]: as ferramentas implementam uma delas. Duas equipes no mesmo banco continuam precisando de coordenação [s.89]; no Alembic, duas revisões partindo da mesma revisão anterior criam mais de um head e exigem mesclagem.
- **Tabela de controle**: a do livro guarda só a versão atual [s.90-93]. O Alembic guarda a revisão atual (parecido); as outras costumam guardar um registro por migração (mais que o livro).
- **Down não é back out**: o back out do livro restaura o backup e volta as versões da aplicação e do esquema [s.80]. Um `down` ou `downgrade` é conveniência de desenvolvimento, e o `down` de uma migração que dropa coluna não traz os dados de volta. Não use `down` como plano de back out em produção `[convenção desta skill]`.
- **Expandir e contrair em migrações separadas**: a migração de contração entra num arquivo, changeset ou revisão posterior, só depois da data e dos testes em QA, e a data de remoção fica no comentário do objeto e no corpo da migração `[convenção desta skill]`.
- **Migração gerada** (Prisma, e qualquer ferramenta que compara modelos): leia o SQL gerado antes de aplicar. Uma troca de nome pode sair como remover e criar, perdendo dados; reescreva à mão no molde da transição.
- **Não edite migração já aplicada**: corrija com uma nova `[convenção desta skill]`.
- **CI**: aplique todas as migrações num banco vazio e também sobre um instantâneo da produção anterior (cópia anonimizada, com backup), e rode a regressão do banco nos dois casos.

## Código de aplicação em Java, Go, Node e Python

`[convenção desta skill]` Cada versão da aplicação deve funcionar com o esquema em que vai rodar durante a transição, usando uma das estruturas, não as duas [s.49].

- Liste as colunas no SELECT e leia por nome. O livro desaconselha `SELECT *` e aponta a leitura posicional como o problema [s.115]. O `Scan` do `database/sql` em Go e as tuplas padrão do Python são posicionais, então a ordem do SELECT importa.
- Com ORM (Hibernate no livro), mapeie as duas propriedades durante a transição e só a nova depois [s.179-180]. Em outros ORMs, o equivalente é manter os dois campos mapeados até a contração.
- Trate as exceções novas do banco (violação de FK, NOT NULL, unicidade, CHECK) [s.305, s.351].
- Concentre o SQL num lugar, para a mudança de esquema tocar poucos arquivos [s.98, s.99].
