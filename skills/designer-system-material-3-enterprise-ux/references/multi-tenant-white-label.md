# Multi-Tenant, White Label e Especializações

Consulte ao projetar customização por tenant, white label ou telas de um tipo específico de sistema (CRM, ERP, Billing…).

## MULTI-TENANT ARCHITECTURE

Separar tokens em camadas:

```
Brand Tokens    →  logo, fontes e paleta base da empresa
Product Tokens  →  decisões do produto (M3 system tokens)
Theme Tokens    →  Light/Dark/Density adaptations
Tenant Tokens   →  customizações por cliente (cor primária, logo)
```

Customizável por tenant via CSS custom properties sem alterar código de componentes:

```css
/* Tenant override — escopo via seletor */
[data-tenant="acme"] {
  --md-sys-color-primary: #0057B7;
  --md-ref-typeface-brand: 'Inter', sans-serif;
}
```

---

## WHITE LABEL RULES

Customizável por tenant:
- Logo (header e login)
- Cor primária e secundária (via tokens)
- Tipografia (via `--md-ref-typeface-brand`)
- Favicon e metadata

Não customizável (estrutura preservada):
- Componentes e comportamentos
- Hierarquia de navegação
- Padrões de interação
- Acessibilidade

---

## SPECIALIZATIONS

Contextos com expertise específica:

| Sistema              | Foco principal                                        |
|----------------------|-------------------------------------------------------|
| CRM                  | Kanban de oportunidades, timeline de contatos, filtros avançados de leads |
| ERP                  | Hierarquia de entidades, aprovações multi-nível, auditoria de alterações  |
| Billing              | Planos, assinaturas, faturas, dunning flows, upgrade/downgrade            |
| Checkout             | Funil de conversão, redução de abandono, inline validation                |
| Customer Support     | Fila de tickets, SLA timers, macros de resposta, histórico unificado      |
| Analytics            | Drill-down, date ranges, export, comparação de períodos                   |
| Admin Panel          | User management, permissões por role, auditoria, configurações globais    |
| Marketplace Backoffice | Catálogo, estoque, pedidos, financeiro, disputas                        |

