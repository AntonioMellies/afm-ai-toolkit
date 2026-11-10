# Avaliação de oportunidade

Base: *Inspired*, cap. 35 (p.199-201), com apoio dos caps. 23, 28 e 34 e do cap. 39. Páginas por regra em `fontes.md`. O que não tem página é **convenção desta skill**.

## O que o livro diz

A avaliação de oportunidade é uma técnica *extremamente simples*: quatro perguntas respondidas **antes** de começar o trabalho de discovery (p.199). O autor as chama de mínimo indispensável e diz que há outros fatores possíveis, conforme a natureza da oportunidade, mas não os lista (p.201). Por isso esta skill não acrescenta campos ao livro: tamanho de mercado, concorrência, estimativa de esforço e semelhantes só entram se o usuário pedir, marcados como convenção.

| # | Pergunta | O que o livro exige da resposta |
|---|---|---|
| 1 | Qual objetivo de negócio este trabalho atende? | Mapear para um ou mais objetivos atribuídos ao time (p.200) |
| 2 | Como saberemos que tivemos sucesso? (resultados-chave) | Definir a medida de sucesso desde o início, mapeando para pelo menos um resultado-chave do time (p.200) |
| 3 | Que problema isto resolve para o cliente? | Manter o foco no cliente; trabalho para usuário interno é possível, ligado ao benefício do cliente final (p.200) |
| 4 | Que tipo de cliente é o foco? | Beneficiário principal: persona, mercado-alvo específico ou trabalho a ser feito; agradar a todos termina em não agradar ninguém (p.200-201) |

Quem responde é o PM; o livro diz que preparar as respostas leva normalmente poucos minutos. Depois, compartilha com o time e com stakeholders, e todo membro do time deve conhecer as quatro respostas antes da discovery (p.201).

Ressalva do livro: às vezes um executivo pede trabalho estratégico fora do normal (por exemplo, apoiar uma parceria). Se for raro, não se estressa: dá-se o máximo de contexto, e as quatro perguntas ainda podem valer (p.201).

## Como coletar (convenção desta skill)

Pergunte, uma de cada vez, e registre a resposta com a origem (quem disse, quando, onde está o dado):

1. **Objetivo.** *Qual objetivo seu time recebeu da liderança, com as palavras que ele usa? Este trabalho atende qual?* Se não há objetivo atribuído, registre *sem dado* e diga que a ligação com o time está aberta.
2. **Resultados-chave.** *Qual métrica muda se isto der certo? Qual é o valor hoje? Qual valor seria excelente e qual seria perda de tempo?* O livro usa exatamente este tipo de pergunta: uma melhora de 1% no churn seria excelente ou desperdício? (p.200). Sem o valor atual, a meta não tem referência: registre *sem baseline* e peça a medição.
3. **Problema do cliente.** *Que dor você observou? Em quem, e como sabe?* Peça notas, gravações, tickets ou dados de uso reais. Se a resposta for uma funcionalidade (*precisamos de X*), trate como solução e pergunte o problema por trás: o livro diz que a conversa humana tende a soluções, que roadmaps de features são listas de soluções possíveis e que um pouco de tempo enquadrando o problema muda o resultado (p.197-198).
4. **Cliente-alvo.** *Quem é o beneficiário principal? Se tivesse de escolher um só segmento, qual?* Se a resposta for *todos*, devolva a pergunta.

Se a resposta vier como opinião sem evidência, registre como **hipótese** e liste o que falta para virar dado. Não complete.

## Resultados-chave: o que o livro propõe

- O objetivo é qualitativo; o resultado-chave é quantitativo e mede **resultado de negócio**, não produto entregue nem tarefa (p.159).
- Exemplo do livro: o onboarding de um cliente novo leva 30 dias e precisa cair para 3 horas ou menos; o resultado-chave é o tempo médio de onboarding abaixo de três horas (p.136).
- O livro cita como comuns de um a três objetivos, cada um com de um a três resultados-chave (p.160). É uma proposta do autor, não um limite verificado.
- Escala de pontuação: o livro diz que é comum definir 0 para nenhum progresso, 0,3 para o mínimo que se sabe alcançar, 0,7 para ter feito o que se esperava e 1,0 para um resultado excepcional, além do esperado. Ele pede consistência na organização acima de qualquer escala específica (p.160). **O livro propõe esses valores; use a escala que a organização do usuário já adota** e diga qual.
- Um resultado-chave que seja compromisso de alta integridade é binário: entregou o prometido ou não (p.160). Marque-o como tal.
- Quem propõe os resultados-chave de cada objetivo é o time; a liderança atribui os objetivos, e é normal haver negociação a cada trimestre (p.161).

## Evidência de clientes em esforços grandes

Só para esforço grande (produto ou negócio novo, mercado ou geografia novos, redesign), nunca para feature ou projeto pequeno (p.217), o livro descreve o programa de clientes de descoberta: desenvolver clientes de referência em paralelo ao produto (p.217). Cliente de referência é real (não amigo nem família), roda o produto em produção, pagou dinheiro de verdade e aceita contar a outros, voluntária e sinceramente, que gosta do produto (p.216).

O que o livro propõe (números do autor, sem significância estatística; ele próprio diz que o número serve para dar confiança):

- seis clientes de referência no mesmo mercado-alvo, no caso de produtos para empresas (p.218);
- recrutar de seis a oito para cobrir desistências, sempre do mercado-alvo (p.219);
- no máximo oito participantes (p.220);
- o objetivo é uma solução única que funcione para todos, não as features que cada um pede (p.220);
- se for difícil recrutar até quatro ou cinco clientes interessados, o problema talvez não seja tão importante (p.221).

Na avaliação de oportunidade, use isso só como pergunta ao usuário: *quantos clientes reais, do mercado-alvo, já aceitaram trabalhar com vocês nisto?* Zero é resposta válida e vira *sem dado*.

## Quando a avaliação não basta

Para iniciativas maiores, com vários objetivos e problemas, o livro oferece a carta do cliente; para produto ou negócio novo, o canvas de startup (p.197). Não são exclusivas da avaliação de oportunidade. Esta skill não as detalha: encaminhe para `product-discovery-assistant`, se instalada.

## Formato de saída (convenção desta skill)

```
Objetivo de negócio: ...            (origem: ...)
Resultado-chave: ... hoje: ...  meta: ...   (origem: ...)
Problema do cliente: ...            (evidência: ...)
Cliente-alvo: ...
Sem dado / a confirmar: ...
```
