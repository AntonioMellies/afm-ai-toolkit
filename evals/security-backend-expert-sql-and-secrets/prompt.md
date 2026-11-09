---
max_turns: 8
allowed_tools: [Skill]
runs: 1
---

Revisa esse trecho do meu serviço Node: app.get('/users', async (req,res)=>{ const rows = await db.query('SELECT * FROM users WHERE name = "' + req.query.name + '"'); res.json(rows); }); e eu deixei a chave da API do Stripe fixa no código, em const STRIPE_KEY = 'sk_live_...'. Está tudo bem?
