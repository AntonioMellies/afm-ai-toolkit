# Exemplo: Configuração de Observabilidade

Referência de implementação das três dimensões de observabilidade para microsserviços.

---

## 1. Logs Estruturados

### Formato esperado (JSON)

```json
{
  "timestamp": "2024-01-15T10:30:00.123Z",
  "level": "INFO",
  "service": "checkout",
  "version": "1.4.2",
  "traceId": "abc-123-def-456",
  "spanId": "span-789",
  "event": "order.approved",
  "orderId": "order-001",
  "customerId": "cust-42",
  "amount": 199.90,
  "durationMs": 45
}
```

### Exemplo Java (Logback + MDC)

```java
// Configurar traceId no início de cada requisição
MDC.put("traceId", request.getHeader("X-Trace-Id"));
MDC.put("service", "checkout");

// Usar log estruturado
log.info("order.approved",
    kv("orderId", order.getId()),
    kv("customerId", order.getCustomerId()),
    kv("amount", order.getAmount())
);
```

### O que NUNCA fazer

```java
// Texto livre não é pesquisável nem correlacionável
log.info("Pedido " + orderId + " aprovado com sucesso!");
```

---

## 2. Métricas (Prometheus)

### Métricas obrigatórias por serviço

```
# Throughput
http_requests_total{method="POST", endpoint="/orders", status="200"} 1523

# Latência (histograma)
http_request_duration_seconds_bucket{le="0.1"} 1200
http_request_duration_seconds_bucket{le="0.5"} 1500
http_request_duration_seconds_bucket{le="1.0"} 1523

# Taxa de erros
http_requests_total{status="500"} 3

# Métricas de negócio
orders_approved_total 1520
orders_rejected_total 3
```

### Exemplo Spring Boot (Micrometer)

```java
@RestController
public class OrderController {

    private final Counter approvedOrders;
    private final Timer orderProcessingTime;

    public OrderController(MeterRegistry registry) {
        this.approvedOrders = registry.counter("orders.approved");
        this.orderProcessingTime = registry.timer("order.processing.time");
    }

    @PostMapping("/orders")
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest request) {
        return orderProcessingTime.record(() -> {
            OrderResponse response = createOrderUseCase.execute(request);
            approvedOrders.increment();
            return ResponseEntity.ok(response);
        });
    }
}
```

---

## 3. Tracing Distribuído

### Propagação de traceId entre serviços

```
Cliente → [traceId: abc-123]
    → Checkout Service → [traceId: abc-123, spanId: span-001]
        → Banco de dados → [traceId: abc-123, spanId: span-002]
        → Billing Service → [traceId: abc-123, spanId: span-003]
            → Kafka Event → [traceId: abc-123, spanId: span-004]
```

### Headers HTTP padrão (W3C Trace Context)

```
traceparent: 00-abc123def456-span001-01
tracestate: checkout=span001
```

### Exemplo configuração (OpenTelemetry + Spring)

```yaml
# application.yml
management:
  tracing:
    sampling:
      probability: 1.0  # 100% em dev, reduzir em prod

otel:
  exporter:
    otlp:
      endpoint: http://jaeger:4317
  resource:
    attributes:
      service.name: checkout
      service.version: 1.4.2
```

---

## 4. Health Checks

```java
@Component
public class DatabaseHealthIndicator implements HealthIndicator {

    private final DataSource dataSource;

    @Override
    public Health health() {
        try (Connection conn = dataSource.getConnection()) {
            conn.isValid(1);
            return Health.up().build();
        } catch (SQLException e) {
            return Health.down()
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}
```

```yaml
# Endpoints expostos
management:
  endpoints:
    web:
      exposure:
        include: health, metrics, prometheus
  endpoint:
    health:
      probes:
        enabled: true  # /health/live, /health/ready, /health/startup
```

---

## 5. Alertas Recomendados

| Alerta | Condição | Severidade |
|---|---|---|
| Alta taxa de erro | `rate(http_requests_total{status=~"5.."}[5m]) > 0.05` | Critical |
| Latência p95 alta | `histogram_quantile(0.95, ...) > 2s` | Warning |
| Serviço indisponível | `up == 0` | Critical |
| Consumer lag alto | `kafka_consumer_lag > 1000` | Warning |
| CPU alta | `container_cpu_usage > 0.8` | Warning |
| Memória alta | `container_memory_usage > 0.9` | Critical |
