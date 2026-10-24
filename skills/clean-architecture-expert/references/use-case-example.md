# Exemplo: Modelagem de Caso de Uso

Exemplo completo de um Caso de Uso com todas as partes: definição, entidade, use case, command e controller.

## 1. Definição do Caso de Uso

```
Caso de Uso: Cancelar Assinatura

Ator:        Cliente autenticado
Objetivo:    Cancelar uma assinatura ativa
Entradas:    subscriptionId, customerId
Saídas:      confirmação do cancelamento
Regras:      - A assinatura deve existir
             - A assinatura deve pertencer ao cliente
             - A assinatura deve estar ativa (não pode já estar cancelada)
             - Deve ser gerado um evento de domínio ao cancelar
```

## 2. Entidade de Domínio

```java
// domain/entities/Subscription.java
public class Subscription {
    private final SubscriptionId id;
    private final CustomerId customerId;
    private SubscriptionStatus status;
    private final List<DomainEvent> domainEvents = new ArrayList<>();

    public void cancel(CustomerId requestingCustomer) {
        validateOwnership(requestingCustomer);
        validateActiveStatus();

        this.status = SubscriptionStatus.CANCELLED;
        domainEvents.add(new SubscriptionCancelledEvent(this.id, this.customerId));
    }

    private void validateOwnership(CustomerId requestingCustomer) {
        if (!this.customerId.equals(requestingCustomer)) {
            throw new UnauthorizedSubscriptionAccessException(id);
        }
    }

    private void validateActiveStatus() {
        if (status != SubscriptionStatus.ACTIVE) {
            throw new SubscriptionNotActiveException(id, status);
        }
    }

    public List<DomainEvent> domainEvents() {
        return Collections.unmodifiableList(domainEvents);
    }
}
```

## 3. Command

```java
// application/commands/CancelSubscriptionCommand.java
public record CancelSubscriptionCommand(
    SubscriptionId subscriptionId,
    CustomerId customerId
) {}
```

## 4. Use Case

```java
// application/usecases/CancelSubscriptionUseCase.java
public class CancelSubscriptionUseCase {

    private final SubscriptionRepository repository; // interface do domínio
    private final EventPublisher publisher;          // interface do domínio

    public void execute(CancelSubscriptionCommand command) {
        Subscription subscription = repository
            .findById(command.subscriptionId())
            .orElseThrow(() -> new SubscriptionNotFoundException(command.subscriptionId()));

        subscription.cancel(command.customerId());

        repository.save(subscription);
        publisher.publish(subscription.domainEvents());
    }
}
```

## 5. Controller (Adapter Inbound)

```java
// adapters/inbound/http/SubscriptionController.java
@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    private final CancelSubscriptionUseCase cancelSubscription;

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(
        @PathVariable String id,
        @AuthenticationPrincipal UserDetails user
    ) {
        cancelSubscription.execute(new CancelSubscriptionCommand(
            new SubscriptionId(id),
            new CustomerId(user.getUsername())
        ));
        return ResponseEntity.noContent().build();
    }
}
```

## O que observar neste exemplo

- A regra de negócio (`cancel`) vive na entidade, não no controller nem no use case
- O use case apenas orquestra — não contém lógica de negócio
- O controller não conhece a entidade `Subscription`, apenas o command
- `SubscriptionRepository` e `EventPublisher` são interfaces — o domínio não sabe como são implementadas
