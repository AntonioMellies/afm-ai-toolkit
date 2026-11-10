---
max_turns: 8
allowed_tools: [Skill]
runs: 3
---

Este teste está falhando no CI desde ontem: OrderTotalTest.appliesCouponOnce expected 90 but was 81. O código do cálculo é: total = subtotal * (1 - coupon.rate); if (customer.isVip()) total = total * (1 - coupon.rate);. Me dá a correção.
