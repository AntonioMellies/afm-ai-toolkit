# Exemplos: Antes e Depois — Clean Code

Comparações práticas de código com e sem aplicação dos princípios de Clean Code.

---

## 1. Nomes que revelam intenção

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

## 2. Funções com uma única responsabilidade

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
    validateOrder(order);
    applyDiscount(order);
    orderRepository.save(order);
    notifyCustomer(order);
}

private void validateOrder(Order order) {
    if (order.getCustomerId() == null) throw new InvalidOrderException("missing customer");
    if (order.getItems().isEmpty()) throw new InvalidOrderException("empty order");
}

private void applyDiscount(Order order) {
    if (order.getCustomer().isPremium()) {
        order.applyDiscount(0.1);
    }
}

private void notifyCustomer(Order order) {
    emailService.send(order.getCustomer().getEmail(), "Order confirmed");
}
```

---

## 3. Guard Clauses em vez de aninhamento

**Antes:**
```java
public void cancelSubscription(Subscription subscription) {
    if (subscription != null) {
        if (subscription.isActive()) {
            if (subscription.canBeCancelled()) {
                subscription.cancel();
                repository.save(subscription);
            }
        }
    }
}
```

**Depois:**
```java
public void cancelSubscription(Subscription subscription) {
    if (subscription == null) return;
    if (!subscription.isActive()) return;
    if (!subscription.canBeCancelled()) return;

    subscription.cancel();
    repository.save(subscription);
}
```

---

## 4. Objetos ao invés de primitivos

**Antes:**
```java
public void registerCustomer(String name, String email, String cpf, String phone) {
    // qual String é qual?
}
```

**Depois:**
```java
public void registerCustomer(CustomerName name, Email email, CPF cpf, PhoneNumber phone) {
    // cada tipo carrega sua própria validação
}

public record Email(String value) {
    public Email {
        if (!value.contains("@")) throw new InvalidEmailException(value);
    }
}
```

---

## 5. Tratamento de erro sem retornos nulos

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

// no chamador: sem checagem de nulo, exceção propagada ou tratada onde faz sentido
```

---

## 6. Comentário desnecessário vs. código autoexplicativo

**Antes:**
```java
// Verifica se o cliente tem permissão para cancelar
if (customer.getStatus() == 1 && customer.getRole() == 2) {
    // cancela
}
```

**Depois:**
```java
if (customer.isActive() && customer.hasAdminRole()) {
    cancel();
}
```
