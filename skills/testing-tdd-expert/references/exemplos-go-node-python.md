# Exemplos mínimos em Go, Vitest/Jest e pytest

Exemplos originais desta skill (convenção), sem relação com código de livros. Mostram os mesmos princípios do `SKILL.md`: um conceito por teste, fixture novo por teste, casos de contorno, erro esperado. Os nomes `Carrinho`, `Item` e `Desconto` são hipotéticos.

Em todas as linguagens: rode o teste novo antes da implementação e confirme que falha pelo motivo certo (vermelho); depois rode a suíte inteira.

## Go (pacote `testing`)

Arquivo `desconto_test.go`, no mesmo pacote do código. Tabela de casos com subtestes: cada linha é um conceito.

```go
package preco

import "testing"

func TestDesconto(t *testing.T) {
	casos := []struct {
		nome     string
		total    int // centavos
		esperado int
	}{
		{"abaixo do limite nao tem desconto", 9999, 0},
		{"no limite aplica desconto", 10000, 1000},
		{"total zero nao tem desconto", 0, 0},
	}
	for _, c := range casos {
		t.Run(c.nome, func(t *testing.T) {
			obtido := Desconto(c.total)
			if obtido != c.esperado {
				t.Errorf("Desconto(%d) = %d, esperado %d", c.total, obtido, c.esperado)
			}
		})
	}
}
```

Execução:

```bash
go test ./...                  # suíte inteira
go test -run TestDesconto -v   # só este teste, com detalhes
go test -count=1 ./...         # ignora o cache de resultados
go test -race ./...            # detector de condições de corrida
```

Em Go não há `beforeEach`: construa o objeto dentro de cada teste (ou subteste), o que já dá fixture novo por teste. Use `t.Fatalf` quando o restante do teste não faz sentido após a falha, e `t.Errorf` para continuar.

## Vitest (ou Jest)

Vitest importa as funções; em Jest elas são globais (omita o `import`).

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { Carrinho } from './carrinho'

describe('Carrinho', () => {
  let carrinho: Carrinho

  beforeEach(() => {
    carrinho = new Carrinho() // fixture novo a cada teste
  })

  it('total soma preço vezes quantidade', () => {
    carrinho.adicionar({ nome: 'caneta', preco: 250, quantidade: 2 })

    expect(carrinho.total()).toBe(500)
  })

  it('rejeita quantidade negativa', () => {
    expect(() =>
      carrinho.adicionar({ nome: 'caneta', preco: 250, quantidade: -1 }),
    ).toThrow()
  })
})
```

Execução:

```bash
npx vitest run     # uma execução, sem modo observação
npx jest           # se o projeto usa Jest
```

## pytest

Asserção com `assert` simples; fixture com função decorada, recriada a cada teste por padrão.

```python
import pytest

from carrinho import Carrinho, desconto


@pytest.fixture
def carrinho():
    return Carrinho()


def test_total_soma_preco_vezes_quantidade(carrinho):
    carrinho.adicionar("caneta", 250, 2)

    assert carrinho.total() == 500


def test_quantidade_negativa_e_rejeitada(carrinho):
    with pytest.raises(ValueError):
        carrinho.adicionar("caneta", 250, -1)


@pytest.mark.parametrize(
    "total, esperado",
    [(9999, 0), (10000, 1000), (0, 0)],
)
def test_desconto(total, esperado):
    assert desconto(total) == esperado
```

Execução:

```bash
pytest -q                          # suíte inteira, saída resumida
pytest -x                          # para na primeira falha
pytest test_carrinho.py::test_total_soma_preco_vezes_quantidade
```
