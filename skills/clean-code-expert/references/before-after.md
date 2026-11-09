# Exemplos: antes e depois

Comparações de código em Java, todas originais. Cada exemplo indica a base no livro *Código Limpo* (páginas em fontes.md) ou marca a convenção desta skill.

---

## 1. Nomes que revelam intenção (livro, capítulo 2)

**Antes:**
```java
public boolean check(Customer c, int d) {
    return c.getS() > d;
}
```

**Depois:**
```java
public boolean hasEnoughBalanceForDeposit(Customer customer, int depositAmount) {
    return customer.getBalance() > depositAmount;
}
```

---

## 2. Função com passos em um único nível (livro, capítulo 3 e G30, G34, G36)

Os passos de `processOrder` ficam um nível abaixo do nome. O objeto `Order` responde pelo que sabe, e quem chama não navega por `Customer`.

**Antes:**
```java
public void processOrder(Order order) {
    // validar
    if (order.getCustomerId() == null) throw new RuntimeException("invalid");
    if (order.getItems().isEmpty()) throw new RuntimeException("empty");

    // calcular desconto
    double discount = 0;
    if (order.getCustomer().isPremium()) discount = 0.1;

    // persistir
    orderRepository.save(order);

    // notificar
    emailService.send(order.getCustomer().getEmail(), "Order confirmed");
}
```

**Depois:**
```java
public void processOrder(Order order) {
    validate(order);
    order.applyLoyaltyDiscount();
    orderRepository.save(order);
    confirmationNotifier.notifyConfirmed(order);
}

private void validate(Order order) {
    if (order.hasNoCustomer()) throw new InvalidOrderException("missing customer");
    if (order.hasNoItems()) throw new InvalidOrderException("empty order");
}
```

Contrapeso (livro, capítulo 12): não divida além do que ajuda a leitura. Se `validate` tivesse uma linha, mantê-la inline seria aceitável.

---

## 3. Aninhamento profundo (livro: um ou dois níveis; G28, G29)

**Antes:**
```java
public void cancelSubscription(Subscription subscription) {
    if (subscription.isActive()) {
        if (subscription.canBeCancelled()) {
            subscription.cancel();
            repository.save(subscription);
        }
    }
}
```

**Depois (encapsulando a condição, sem negações):**
```java
public void cancelSubscription(Subscription subscription) {
    if (subscription.isCancellable()) {
        subscription.cancel();
        repository.save(subscription);
    }
}
```

**Alternativa, convenção desta skill (retorno antecipado):**
```java
public void cancelSubscription(Subscription subscription) {
    if (!subscription.isCancellable()) return;

    subscription.cancel();
    repository.save(subscription);
}
```

A versão com retorno antecipado usa uma condição negativa, que o livro pede para evitar (G29), em troca de menos indentação. Escolha a que ficar mais clara. Observação: o exemplo não verifica se `subscription` é nulo, porque o livro orienta a não passar null como argumento por padrão.

---

## 4. Agrupar parâmetros em objetos (livro: agrupar; rótulo Value Object é convenção desta skill)

**Antes:**
```java
public void registerCustomer(String name, String email, String taxId, String phone) {
    // qual String é qual? quatro parâmetros
}
```

**Depois:**
```java
public void registerCustomer(CustomerRegistration registration) { ... }

public record CustomerRegistration(CustomerName name, Email email, TaxId taxId, Phone phone) {}

public record Email(String value) {
    public Email {
        if (!value.contains("@")) throw new InvalidEmailException(value);
    }
}
```

O livro sustenta agrupar parâmetros que formam um conceito e evitar muitos parâmetros. Criar um tipo por valor de domínio é convenção desta skill.

---

## 5. Erro sem retorno nulo (livro, capítulo 7)

**Antes:**
```java
public Customer findCustomer(String id) {
    Customer customer = repository.findById(id);
    if (customer == null) return null; // quem vai checar isso?
    return customer;
}

// no chamador:
Customer c = findCustomer(id);
if (c != null) {
    // ...
}
```

**Depois:**
```java
public Customer findCustomer(CustomerId id) {
    return repository.findById(id)
        .orElseThrow(() -> new CustomerNotFoundException(id));
}
```

O livro pede lançar exceção ou devolver um objeto de caso especial (e coleção vazia em vez de null). O uso de `Optional` é convenção desta skill.

---

## 6. Condição com nome e sem comentário (livro: G28, G25 e capítulo 4)

**Antes:**
```java
// Verifica se o cliente tem permissão para cancelar
if (customer.getStatus() == 1 && customer.getRole() == 2) {
    // cancela
}
```

**Depois:**
```java
if (customer.mayCancel()) {
    cancel();
}
```

`mayCancel()` esconde os números mágicos e dispensa o comentário. A condição vive no objeto que conhece o `status` e o `role`.

---

## 7. Switch por tipo (livro: G23 e capítulo 3)

**Antes:**
```java
Money shippingCost(Shipment shipment) {
    switch (shipment.type()) {
        case STANDARD: return standardCost(shipment);
        case EXPRESS:  return expressCost(shipment);
        case PICKUP:   return Money.ZERO;
        default: throw new IllegalArgumentException("type " + shipment.type());
    }
}
```

**Depois:**
```java
interface ShippingMethod { Money cost(Shipment shipment); }

class StandardShipping implements ShippingMethod { ... }
class ExpressShipping implements ShippingMethod { ... }
class Pickup implements ShippingMethod {
    public Money cost(Shipment shipment) { return Money.ZERO; }
}

// o único switch fica na criação do objeto
ShippingMethod methodFor(ShippingType type) {
    switch (type) {
        case STANDARD: return new StandardShipping();
        case EXPRESS:  return new ExpressShipping();
        case PICKUP:   return new Pickup();
        default: throw new IllegalArgumentException("type " + type);
    }
}
```

Se novas operações forem mais prováveis que novos tipos, o switch pode ser a melhor escolha (livro, capítulo 6, anti-simetria).

---

## 8. Efeito colateral no nome (livro: capítulo 3 e N7)

**Antes:**
```java
public boolean checkPassword(String user, String password) {
    boolean ok = credentials.matches(user, password);
    if (ok) session.start(user);   // efeito escondido
    return ok;
}
```

**Depois (duas funções com um nome honesto cada):**
```java
public boolean passwordMatches(String user, String password) {
    return credentials.matches(user, password);
}

public void signIn(String user, String password) {
    if (!passwordMatches(user, password)) throw new InvalidCredentialsException(user);
    session.start(user);
}
```
