# Comandos de depuração por linguagem

Tudo neste arquivo é convenção desta skill: atalhos práticos para executar os passos do processo (reproduzir, isolar, testar hipótese) nas linguagens do dia a dia. O livro-base não trata de nenhuma destas ferramentas. Confira a versão da sua ferramenta; a sintaxe pode variar.

Princípio comum: o comando serve a uma hipótese. Rode o teste de reprodução, observe, e só então abra o debugger ou aumente o nível de log.

## Java

Teste focado (Maven ou Gradle):

```text
mvn -Dtest=PedidoTest#cupomMaiorQueSubtotalNaoGeraTotalNegativo test
gradle test --tests "PedidoTest.cupomMaiorQueSubtotalNaoGeraTotalNegativo"
```

Debugger remoto (a JVM espera o depurador da IDE se conectar na porta 5005):

```text
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=*:5005 -jar app.jar
```

Concorrência: `jstack <pid>` mostra as threads e seus estados (útil para travamentos e deadlocks). Breakpoint condicional na IDE (parar só quando `pedido.total() < 0`) testa uma hipótese sem alterar o código.

Log com contexto (exemplo com SLF4J, que é a fachada usada pela maioria dos projetos):

```java
log.warn("total negativo pedidoId={} subtotal={} desconto={}", id, subtotal, desconto);
```

Registre dados que permitem reproduzir (identificadores, valores de entrada), não frases genéricas. Ao relançar exceções, preserve a causa original: `throw new PedidoException("falha ao totalizar " + id, e);`.

## Go

Teste focado, sem cache e com detector de corridas:

```text
go test -run '^TestTotal' -v -count=1 ./pkg/pedido
go test -race -count=1 ./...
```

Debugger Delve:

```text
dlv test ./pkg/pedido -- -test.run TestTotal
dlv debug ./cmd/app
```

Dentro do Delve: `break arquivo.go:42`, `continue`, `print variavel`, `next`, `step`.

Logs estruturados com a biblioteca padrão (`log/slog`, Go 1.21 ou mais recente):

```go
slog.Warn("total negativo", "pedidoID", id, "subtotal", subtotal, "desconto", desconto)
```

Erros: embrulhe com contexto sem perder a causa (`fmt.Errorf("totalizar pedido %s: %w", id, err)`) e nunca descarte o `err` retornado.

## Node.js

Debugger embutido (para na primeira linha e aguarda o cliente de depuração, por exemplo a IDE ou o inspetor do navegador):

```text
node --inspect-brk app.js
```

Teste focado com o executor nativo (Node 18 ou mais recente):

```text
node --test --test-name-pattern="cupom maior" test/
```

Com Jest ou Vitest, use o filtro por nome do teste do próprio executor. Para Promises sem tratamento, confira se há um `.catch` ou `try/await/catch` no caminho; rejeições ignoradas escondem a evidência.

Logs: registre objeto estruturado em vez de concatenar strings, e prefira a saída de erro (`console.error`) para falhas.

## Python

Teste focado e parada no primeiro erro:

```text
pytest tests/test_pedido.py -k cupom_maior -x
pytest tests/test_pedido.py -k cupom_maior --pdb   # abre o depurador na falha
```

Depurador:

```python
breakpoint()   # chama o depurador (pdb por padrão) neste ponto
```

```text
python -m pdb app.py
```

Comandos do pdb: `n` (próxima linha), `s` (entrar na função), `c` (continuar), `p expressao` (imprimir), `l` (listar código), `w` (mostrar a pilha).

Logs com a biblioteca padrão:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
logging.getLogger(__name__).warning("total negativo pedido_id=%s subtotal=%s", pedido_id, subtotal)
```

## Controle de versões (qualquer linguagem)

Bisseção do histórico com o teste de reprodução como critério (veja o passo de arqueologia em processo.md):

```text
git bisect start
git bisect bad
git bisect good <commit-sem-o-bug>
git bisect run <comando-do-teste>
git bisect reset
```
