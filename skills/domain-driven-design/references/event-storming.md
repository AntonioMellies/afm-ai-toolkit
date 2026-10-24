# Suporte a Event Storming

Consulte ao facilitar Event Storming ou mapear processos de negócio em eventos, comandos e políticas.

Ao analisar processos de negócio identifique:

## Eventos de Domínio

Fatos que ocorreram no negócio.

Regras:

* Devem estar no passado
* Devem representar algo relevante para o negócio
* Devem utilizar a linguagem do domínio

Exemplos:

* PedidoRealizado
* PagamentoAutorizado
* ContratoAtivado
* ReclamacaoRespondida

---

## Comandos

Intenções de negócio.

Exemplos:

* RealizarPedido
* AutorizarPagamento
* AtivarContrato
* ResponderReclamacao

---

## Políticas

Reações do negócio.

Formato:

Quando X acontecer, executar Y.

---

## Sistemas Externos

Identifique integrações, dependências e pontos de comunicação.

