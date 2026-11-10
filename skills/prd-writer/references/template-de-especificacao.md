# Modelo curto de especificação

**Este modelo é convenção desta skill.** O livro (*Inspired*) não define estrutura de PRD; a ordem e os títulos abaixo organizam, em um documento curto, as regras que ele sustenta. A coluna "Base" diz de onde vem cada seção. Páginas em `fontes.md`.

Use o modelo inteiro só quando valor e usabilidade têm evidência real. Em trabalho de baixo risco (p.196-197), preencha as seções 1, 3 e 5 e as demais só se houver o que dizer. Campo sem dado fica como *sem dado*, com a pergunta que falta. Nada é inventado.

| Seção | Base |
|---|---|
| 0. Estado da evidência | convenção desta skill |
| 1. Oportunidade | livro, p.199-201 |
| 2. Riscos e quem valida | livro, p.185, p.139, p.188, p.261-262 |
| 3. Protótipo | livro, p.248 |
| 4. Complementos | livro (gatilho), p.248; formato é convenção |
| 5. Story map | livro, p.213-214 |
| 6. Stakeholders e restrições | livro, p.318-321 |
| 7. Instrumentação | livro, p.288 |
| 8. Resultado esperado e itens de roadmap | livro, p.313-314 |
| 9. Compromissos de data | livro, p.138-140 |

## Modelo

```
# [Nome do trabalho]
Responsável (PM): ...   Time: ...   Data da versão: ...

## 0. Estado da evidência
Em uma linha por risco: validado, parcial ou sem dado (e o que falta).
Se valor ou usabilidade estão *sem dado*: pare aqui e liste o plano de validação.

## 1. Oportunidade (as quatro perguntas)
- Objetivo de negócio (qual dos objetivos do time): ...
- Resultado-chave: métrica ... hoje ... meta ...
- Problema do cliente: ...           Evidência: (notas, dados, onde estão)
- Cliente-alvo: ...

## 2. Riscos e quem valida
| Risco | Pergunta | Quem valida | Evidência real | Estado |
| Valor | | clientes e usuários | | |
| Usabilidade | | clientes e usuários | | |
| Viabilidade técnica | | engenheiros | | |
| Viabilidade de negócio | | stakeholders | | |

## 3. Protótipo
Local/link: ...   Fidelidade: ...   Fluxos que cobre: ...   O que NÃO mostra: ...
O que foi observado em testes (reação, comportamento, desistências): ...  (sem inventar)

## 4. Complementos (só se os engenheiros não estão no mesmo local ou o produto é especialmente complexo)
- Casos de uso: ...
- Regras de negócio (regra, origem, exceções): ...
- Critérios de aceitação (verificáveis): ...

## 5. Story map
Atividades (ordem de uso) > tarefas (críticas acima das opcionais) > stories.
Linha do release 1 e objetivo do release: ...

## 6. Stakeholders e restrições
Quem tem poder de veto: ...   Restrição de cada um: ...   Viram o protótipo? quando? como (walkthrough)?: ...

## 7. Instrumentação
O que será medido no uso desta funcionalidade e como se liga ao resultado-chave: ...

## 8. Resultado esperado e relato de impacto
Item | problema | resultado-chave | hoje | meta | data (só com restrição real) | impacto medido após o lançamento

## 9. Compromissos de data (se houver)
Data pedida, quem pediu, restrição real, estado da discovery, dependências do time (delivery): ...

## Pendências
Lista de *sem dado* e quem fornece.
```

## Notas de uso

- **Não prescreva o como.** A seção 3 e a 4 dizem o que o usuário vê e quais regras valem, não a arquitetura (p.80-81).
- **Palavras do cliente só reais.** A seção 1 e a 3 citam apenas o que o usuário trouxe de pesquisa real. Sem material, escreva *sem dado*.
- **Revise a cada aprendizado.** O protótipo e o story map são atualizados com o feedback; o documento deve apontar para a versão atual, não duplicá-la.
- **Dados do livro são propostas do autor.** Se o texto usar a escala de pontuação dos resultados-chave ou o número de clientes de referência, diga *o livro propõe* e cite a página.
