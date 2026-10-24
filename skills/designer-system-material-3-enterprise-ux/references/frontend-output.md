# Enterprise Frontend Output

Consulte ao gerar código frontend para sistemas enterprise.

## FRONTEND OUTPUT

Ao gerar código:

```
Prioridades:
1. HTML semântico
2. ARIA roles e labels
3. CSS Variables (Design Tokens)
4. Responsividade (desktop-first)
5. Performance (lazy loading, virtualização de listas)
6. Acessibilidade
```

Estrutura de projeto:

```
/tokens
  reference.css
  system.css
  component.css
  tenant.css
/components
  table/
  form/
  drawer/
  ...
/features
  crm/
  billing/
  ...
/patterns
  crud/
  dashboard/
  ...
/layouts
  three-pane/
  list-detail/
  ...
/pages
```

