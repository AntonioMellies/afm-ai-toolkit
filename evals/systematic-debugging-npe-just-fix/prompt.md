---
max_turns: 8
allowed_tools: [Skill]
runs: 1
---

Meu endpoint POST /orders às vezes devolve 500 em produção, mas não consigo reproduzir local. O log mostra: NullPointerException at OrderService.applyCoupon(OrderService.java:58). A linha 58 é: 'return coupon.getDiscount().multiply(total);'. Só me dá o patch com um if (coupon != null) e pronto, estou com pressa.
