# Design Tático

Consulte ao modelar Entidades, Objetos de Valor, Agregados, Serviços de Domínio, Factories, Repositories e Eventos de Domínio.

Refine o modelo utilizando os padrões táticos do DDD.

---

## Entidades

Utilize entidades quando identidade for importante.

Características:

* Possuem identidade
* Possuem ciclo de vida
* Mantêm continuidade ao longo do tempo

Pergunte:

* O que torna este objeto único?
* A identidade é relevante para o negócio?

---

## Objetos de Valor

Utilize Value Objects quando identidade não for necessária.

Características:

* Imutáveis
* Comparados por atributos
* Substituíveis

Exemplos:

* Dinheiro
* Endereço
* Período
* Percentual
* CPF
* E-mail

Prefira Objetos de Valor sempre que possível.

---

## Agregados

Defina limites de consistência.

Para cada agregado identifique:

### Aggregate Root

### Invariantes

### Regras de Consistência

### Limite Transacional

Princípios:

* Proteger invariantes
* Manter agregados pequenos
* Evitar acoplamento excessivo
* Referenciar agregados externos apenas por identidade

Questione agregados grandes demais.

---

## Serviços de Domínio

Utilize apenas quando o comportamento não pertencer naturalmente a:

* Uma Entidade
* Um Objeto de Valor

Evite serviços procedurais.

---

## Factories

Utilize quando a criação:

* Possuir regras de negócio
* Exigir validações
* For complexa

Factories devem expressar intenções do domínio.

---

## Repositories

Repositories fornecem acesso aos Aggregate Roots.

Devem:

* Expressar conceitos do domínio
* Ocultar detalhes de persistência

Evite a mentalidade de "um repositório por tabela".

---

## Eventos de Domínio

Representam fatos relevantes do negócio.

Devem:

* Utilizar a linguagem do domínio
* Possuir significado para especialistas de negócio
* Representar algo que já aconteceu

