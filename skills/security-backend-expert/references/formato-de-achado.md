# Formato de achado e severidade

Convenção desta skill: a escala e o formato abaixo são preferência de trabalho, sem fonte externa. Os critérios podem ser ajustados à política de risco da organização.

## Formato

```
[SEVERIDADE] Título curto do problema
Categoria: <controle de acesso | autenticação e sessão | entrada e injeção | criptografia e segredos | logs e erros | SSRF | dependências | configuração>
Local: <arquivo:linha ou módulo/endpoint> (e o escopo que foi visto)
Confiança: confirmado | a confirmar (o que falta ver)
Impacto: o que um atacante consegue, com quais pré-condições (sem conta, conta comum, acesso interno)
Evidência: o trecho ou fluxo que demonstra (dado externo -> ponto perigoso, sem controle no meio)
Correção: mudança mínima recomendada, no stack do projeto
Teste: caso negativo que prova a correção
```

Regras de preenchimento:

- Um achado por causa raiz. Se a mesma falha aparece em dez endpoints, liste um achado e os locais.
- O impacto descreve consequência concreta e pré-condições, não adjetivos.
- "Confiança" evita inflar: se você não viu o fluxo completo, escreva "a confirmar".
- A correção cita a construção do stack em uso. Quando a correção mexe em autenticação, autorização, pagamentos ou criptografia, acrescente "revisão humana especializada recomendada".
- Termine o relatório com o escopo não coberto e com a lembrança de que testes e revisão humana continuam necessários.

## Escala de severidade

| Severidade | Critério | Exemplos típicos |
|---|---|---|
| Crítica | Exploração remota com pouca ou nenhuma pré-condição e impacto amplo em dados, contas ou execução de código | Injeção de SQL ou de comando em rota pública; desserialização insegura de entrada externa; contorno de autenticação; segredo de produção no repositório; acesso a dados de todos os tenants |
| Alta | Exige conta comum ou condição moderada, ou dá acesso a dados sensíveis de outros usuários ou a ações privilegiadas | IDOR em dados pessoais; mass assignment que permite virar administrador; SSRF alcançando metadados de nuvem; hash de senha fraco com base já exposta; JWT sem verificação de algoritmo |
| Média | Exploração depende de várias condições, ou o impacto é limitado, ou o controle existe mas é parcial | Enumeração de contas; ausência de limite de tentativas; cookie sem `SameSite` explícito; dependência vulnerável com função não alcançável; log com dado pessoal |
| Baixa | Endurecimento, defesa em profundidade ou risco teórico com pouca exploração | Cabeçalho de segurança ausente em API sem navegador; nome de cookie revelando o framework; mensagens de erro um pouco verbosas sem dado interno |

Ajuste para cima quando houver dado sensível, regulação (por exemplo dados pessoais) ou exposição pública. Ajuste para baixo quando houver controle compensatório verificado (rede, WAF não é prova suficiente por si só).

## Exemplo

```
[ALTA] Busca de pedido sem checagem de dono (IDOR)
Categoria: controle de acesso
Local: OrderController.getById (src/.../OrderController.java:41); serviço OrderService.findById
Confiança: confirmado (nenhuma checagem de dono no controller nem no serviço; sem filtro global de objeto)
Impacto: qualquer usuário autenticado lê pedidos de outros clientes alterando o ID da URL, incluindo endereço e itens
Evidência: GET /orders/{id} -> orderRepository.findById(id) -> retorno direto, sem comparar customerId com o usuário da sessão
Correção: consultar por id e dono derivado da sessão (findByIdAndCustomerId) e responder 404 quando não existir para esse usuário; aplicar o mesmo padrão em atualizar, cancelar e exportar
Teste: usuário A tenta ler, alterar e cancelar pedido do usuário B e recebe 404 em todos os casos
```

## Relatório de revisão (esqueleto)

1. Escopo visto e escopo não visto
2. Achados, ordenados por severidade
3. Categorias percorridas sem achado
4. Pontos que exigem revisão humana especializada (autenticação, autorização, pagamentos, criptografia)
5. Testes e varreduras a executar pelo time para confirmar as correções
