# Checklist: Microsserviço Pronto para Produção

Use este checklist antes de promover qualquer serviço para produção. Cada item deve ter um responsável e evidência.

---

## Observabilidade

- [ ] **Logs estruturados** — todos os logs emitem JSON com `service`, `traceId`, `timestamp` e contexto de negócio
- [ ] **Métricas expostas** — endpoint `/metrics` (Prometheus) com throughput, latência p50/p95/p99 e taxa de erros
- [ ] **Tracing distribuído** — todas as requisições carregam `traceId` propagado para dependências downstream
- [ ] **Correlação de logs** — logs vinculados ao `traceId` para reconstrução de fluxo em incidentes

## Health Checks

- [ ] **Liveness** (`GET /health/live`) — retorna 200 enquanto o processo está vivo
- [ ] **Readiness** (`GET /health/ready`) — retorna 200 apenas quando banco, filas e dependências estão disponíveis
- [ ] **Startup** (`GET /health/startup`) — retorna 200 após inicialização completa (migrações, caches aquecidos)

## Resiliência

- [ ] **Timeout** configurado para todas as chamadas externas (HTTP, banco, mensageria)
- [ ] **Retry com backoff exponencial** para falhas transitórias
- [ ] **Circuit Breaker** para dependências críticas
- [ ] **Fallback** definido para cenários de degradação
- [ ] **Idempotência** garantida para consumidores de mensageria

## Deploy e Rollback

- [ ] **Pipeline CI/CD** automatizado (build → test → deploy)
- [ ] **Rolling update** configurado (sem downtime no deploy)
- [ ] **Rollback automatizado** em caso de falha no health check pós-deploy
- [ ] **Feature flags** ou versionamento de API para mudanças de contrato

## Monitoramento e Alertas

- [ ] **Dashboard operacional** com métricas de negócio e infraestrutura
- [ ] **Alertas configurados** para: taxa de erro > threshold, latência p95 > SLA, lag de consumer, uso de recursos
- [ ] **Runbooks** documentados para os alertas mais comuns

## Testes

- [ ] **Testes unitários** cobrindo regras de negócio (sem banco ou rede)
- [ ] **Testes de integração** cobrindo adapters e fluxos end-to-end
- [ ] **Teste de contrato** (consumer-driven) para APIs consumidas por outros serviços
- [ ] **Teste de carga** validando comportamento sob volume esperado

## Ownership

- [ ] **Time responsável** identificado e documentado
- [ ] **Documentação de API** (OpenAPI/Swagger) atualizada
- [ ] **Runbooks** de operação escritos e testados
- [ ] **Canal de alertas** configurado para o time responsável

---

## Status do Serviço

| Item | Status | Responsável | Evidência |
|---|---|---|---|
| Logs estruturados | ✅ / ❌ / 🔄 | | |
| Métricas expostas | | | |
| Tracing distribuído | | | |
| Liveness check | | | |
| Readiness check | | | |
| Circuit Breaker | | | |
| Pipeline CI/CD | | | |
| Rollback automatizado | | | |
| Dashboard | | | |
| Alertas | | | |
| Runbooks | | | |

**Aprovação para produção:** [ ] Sim — todos os itens críticos atendem os critérios.
