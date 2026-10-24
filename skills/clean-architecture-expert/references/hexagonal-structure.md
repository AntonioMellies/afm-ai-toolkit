# Exemplo: Estrutura Hexagonal Completa

Exemplo de estrutura de projeto para um contexto de negócio `subscriptions` usando Arquitetura Hexagonal com DDD.

## Estrutura de Pastas

```
src/
└── subscriptions/
    ├── domain/
    │   ├── entities/
    │   │   └── Subscription.java
    │   ├── valueobjects/
    │   │   ├── SubscriptionId.java
    │   │   ├── SubscriptionStatus.java
    │   │   └── Money.java
    │   ├── events/
    │   │   ├── SubscriptionCreatedEvent.java
    │   │   └── SubscriptionCancelledEvent.java
    │   ├── repositories/
    │   │   └── SubscriptionRepository.java       ← interface (port)
    │   └── services/
    │       └── SubscriptionDomainService.java
    │
    ├── application/
    │   ├── usecases/
    │   │   ├── CreateSubscriptionUseCase.java
    │   │   └── CancelSubscriptionUseCase.java
    │   ├── commands/
    │   │   ├── CreateSubscriptionCommand.java
    │   │   └── CancelSubscriptionCommand.java
    │   ├── queries/
    │   │   └── FindSubscriptionQuery.java
    │   └── dto/
    │       └── SubscriptionResponse.java
    │
    ├── adapters/
    │   ├── inbound/
    │   │   ├── http/
    │   │   │   └── SubscriptionController.java   ← adapter REST
    │   │   └── messaging/
    │   │       └── SubscriptionEventConsumer.java ← adapter Kafka
    │   └── outbound/
    │       ├── persistence/
    │       │   └── JpaSubscriptionRepository.java ← adapter JPA
    │       └── messaging/
    │           └── KafkaEventPublisher.java        ← adapter Kafka
    │
    └── infrastructure/
        ├── persistence/
        │   ├── SubscriptionJpaEntity.java
        │   └── SubscriptionJpaRepository.java
        ├── messaging/
        │   └── KafkaConfig.java
        └── configuration/
            └── SubscriptionBeanConfig.java
```

## Regras de Dependência

```
SubscriptionController
    → CancelSubscriptionUseCase (application)
        → SubscriptionRepository (domain - interface)
            ← JpaSubscriptionRepository (adapter - implementação)

Domínio não conhece: JPA, Spring, Kafka, HTTP
```

## O que pertence a cada camada

| Camada | Responsabilidade | Pode depender de |
|---|---|---|
| `domain` | Regras de negócio, entidades, events | Nada externo |
| `application` | Orquestração de casos de uso | `domain` |
| `adapters` | Tradução entre mundo externo e aplicação | `application`, `domain` |
| `infrastructure` | Configurações, beans, providers | Qualquer camada |
