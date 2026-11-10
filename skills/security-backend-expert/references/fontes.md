# Fontes e rastreabilidade

Todas as páginas abaixo foram lidas em **2026-11-09** (data de acesso). Cada regra da skill que tem base externa aparece em uma linha, com a URL exata lida. O conteúdo foi parafraseado. Páginas que não puderam ser lidas aparecem na seção "Omitido" e nada foi extraído delas.

Observação: a leitura das páginas foi feita por resumo automático do conteúdo (extração e condensação). Valores numéricos críticos (parâmetros de hash, tempos, tamanhos) devem ser reconferidos na página vigente antes de entrarem em política ou em código de produção, porque as recomendações são atualizadas.

## 1. Edição e mapa

| Ponto da skill | Fonte | URL exata | Acesso |
|---|---|---|---|
| OWASP Top 10 mais recente publicado é a edição 2025; lista A01 Broken Access Control, A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging and Alerting Failures, A10 Mishandling of Exceptional Conditions | OWASP Top 10:2025 (a página apresenta a edição como "Release") | https://top10.owasp.org/2025 | 2026-11-09 |
| SSRF incorporado ao A01 em 2025; A03 expande componentes vulneráveis para cadeia de suprimentos; A10 novo, cobre tratamento impróprio de erro, erro de lógica e falha aberta | OWASP Top 10:2025, introdução | https://top10.owasp.org/2025/0x00_2025-Introduction | 2026-11-09 |
| Versão mais recente do ASVS é a 5.0.0, publicada em 30 de maio de 2025 | OWASP ASVS | https://asvs.owasp.org/ | 2026-11-09 |
| Capítulos do ASVS 5.0 e cheat sheets mapeadas a cada um (usados só como mapa de leitura) | Índice de cheat sheets por ASVS | https://cheatsheetseries.owasp.org/IndexASVS.html | 2026-11-09 |
| Existência da Cheat Sheet Series e seu propósito | OWASP Cheat Sheet Series | https://cheatsheetseries.owasp.org/ | 2026-11-09 |
| Índice de cheat sheets por Top 10 (edição 2021 neste índice, usado apenas para localizar nomes de cheat sheets) | Índice por Top 10 | https://cheatsheetseries.owasp.org/IndexTopTen.html | 2026-11-09 |

## 2. Regras por categoria

### Controle de acesso

| Regra | Fonte | URL exata | Acesso |
|---|---|---|---|
| Menor privilégio; negar por padrão; validar permissão em toda requisição por mecanismo global; preferir ABAC/ReBAC a acúmulo de papéis; IDs adivinháveis não bastam; incluir recursos estáticos; testes unitários e de integração de autorização | OWASP Authorization Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html | 2026-11-09 |
| Checagem de acesso por objeto; escopar a consulta ao usuário atual; 404 igual para inexistente e não autorizado; identificador complexo é só defesa em profundidade; testar com duas contas | OWASP IDOR Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html | 2026-11-09 |
| Negar por padrão; controle de acesso construído uma vez e reutilizado; CORS mínimo; acesso baseado em posse do registro; sem listagem de diretório nem metadados no raiz; registrar falhas de acesso; limite de taxa; invalidar sessão no logout, JWT stateless de vida curta; testes funcionais de acesso | OWASP Top 10:2025 A01, "How to prevent" | https://top10.owasp.org/2025/A01_2025-Broken_Access_Control | 2026-11-09 |
| DTO só com campos editáveis; não ligar entrada direto a objeto de domínio; lista de permitidos de campos; lista de bloqueio é secundária; DTO não substitui autorização | OWASP Mass Assignment Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Mass_Assignment_Cheat_Sheet.html | 2026-11-09 |
| Restringir métodos HTTP a uma lista com 405; autorizar cada método; controle de acesso em todo endpoint de API não pública | OWASP REST Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | 2026-11-09 |
| Reautenticação para mudar senha ou e-mail e para transações sensíveis | OWASP Authentication Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html | 2026-11-09 |

### Autenticação e sessão

| Regra | Fonte | URL exata | Acesso |
|---|---|---|---|
| Comprimento mínimo 8 com MFA e 15 sem; máximo de pelo menos 64; sem truncar; todos os caracteres; sem regras de composição; bloquear senhas vazadas; sem troca periódica; mensagens e status genéricos; tempo consistente; limite de tentativas por conta e bloqueio sem virar negação de serviço; MFA; TLS em páginas de login e autenticadas; enumeração de usuário (CWE-204); comparação de hash com função segura (tamanho máximo, tipo explícito, tempo constante) | OWASP Authentication Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html | 2026-11-09 |
| Ordem Argon2id, scrypt, bcrypt, PBKDF2 e parâmetros mínimos (19 MiB/2/1; N=2^17,r=8,p=1; custo 10 e 72 bytes; 600.000 e 220.000 iterações); salt único; pepper como defesa em profundidade; limite de 72 bytes do bcrypt e riscos de pré-hash; migração por rehash no login; guardar algoritmo e parâmetros (PHC) | OWASP Password Storage Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html | 2026-11-09 |
| Entropia do ID (64 bits mínimo; 128 se você gera), CSPRNG, cookie `Secure`, `HttpOnly`, `SameSite` explícito, prefixo `__Host-`, modo estrito, ID só por cookie, regenerar após login e mudança de privilégio, timeouts no servidor (exemplos 2 a 5 e 15 a 30 minutos; 4 a 8 horas), invalidação no servidor no logout, `Cache-Control: no-store`, HSTS, nada de token em `localStorage`/`sessionStorage` | OWASP Session Management Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html | 2026-11-09 |
| JWT: assinatura obrigatória, rejeitar `alg: none`, algoritmo da configuração, validar `iss`, `aud`, `exp` (e `nbf` quando aplicável), denylist de `jti` ao encerrar sessão; chave de API não protege sozinha recurso sensível; HTTPS apenas | OWASP REST Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | 2026-11-09 |

### Validação de entrada e injeção

| Regra | Fonte | URL exata | Acesso |
|---|---|---|---|
| Sintaxe e semântica; lista de permitidos; validação no servidor e em fronteiras internas; limites de tamanho e profundidade antes de interpretar; regex com correspondência total, entrada limitada e atenção a ReDoS; sanitizador mantido para HTML; nome e tipo de arquivo não confiáveis; validação não substitui consulta parametrizada; não registrar entrada rejeitada literalmente | OWASP Input Validation Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html | 2026-11-09 |
| Consulta parametrizada (PreparedStatement com `?`), procedimentos armazenados também podem ser injetáveis, HQL com parâmetros nomeados, lista de permitidos para tabela, coluna e direção, escape manual desaconselhado, menor privilégio na conta do banco, uma conta por aplicação, views | OWASP SQL Injection Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html | 2026-11-09 |
| Chamadas JDBC (`prepareStatement`, `setString`, `executeQuery`) e JPA/Hibernate com `setParameter`. A página não traz exemplos de Go, Node ou Python | OWASP Query Parameterization Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html | 2026-11-09 |
| Evitar chamar comandos de SO; argumentos como array; lista de permitidos do comando e dos argumentos; `--`; `ProcessBuilder` ou `Runtime.exec(String[])`; evitar `Runtime.exec(String)`; menor privilégio | OWASP OS Command Injection Defense Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html | 2026-11-09 |
| Evitar desserialização nativa de dado não confiável; preferir JSON ou XML com DTO; só desserializar dado assinado; filtros com lista de classes e limites em Java; `resolveClass()`; `transient`; marcadores `AC ED 00 05` e `rO0`; Python: nunca `pickle` em dado não confiável, `yaml.safe_load`, evitar `jsonpickle.decode`. A página não cobre Node nem Go | OWASP Deserialization Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html | 2026-11-09 |
| Entrada estrita (comprimento, intervalo, formato, tipo), limite de tamanho com 413, `Content-Type` com 415, proteção contra XXE, registrar falhas de validação | OWASP REST Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | 2026-11-09 |

### Criptografia e segredos

| Regra | Fonte | URL exata | Acesso |
|---|---|---|---|
| AES com GCM ou CCM, ECB evitado, RSA 2048 com OAEP, algoritmo próprio proibido, IV por biblioteca e único entre instâncias, CSPRNG e lista de PRNGs a evitar (`rand()`, `Math.random()`, `java.util.Random`), UUID v1 não é aleatório, chaves fora do código e de variável de ambiente, DEK e KEK separadas, rotação, não usar criptografia reversível para senha | OWASP Cryptographic Storage Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html | 2026-11-09 |
| Gerenciamento central, rotação, menor privilégio, não embutir em imagem (ENV, ARG), arquivos montados, OIDC e credenciais curtas em CI/CD, nunca logar segredos, varredura antes do commit, segredos dinâmicos, resposta a incidente (revogar, rotacionar, remover) | OWASP Secrets Management Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html | 2026-11-09 |
| Evitar chaves e segredos estáticos em código, configuração e pipelines; usar federação de identidade e credenciais curtas | OWASP Top 10:2025 A02, "How to prevent" | https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration | 2026-11-09 |

### Logs e erros

| Regra | Fonte | URL exata | Acesso |
|---|---|---|---|
| Eventos a registrar; dados a excluir (senha, token, chaves, string de conexão, dados de pagamento, PII sensível, ID de sessão em texto puro); mascarar ou pseudonimizar o resto; log estruturado; codificar CR, LF e delimitadores; limitar tamanho; em Java, mensagem constante com placeholders mais encoder; falha do log não derruba a aplicação; proteção, transporte e retenção; atributos do evento | OWASP Logging Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html | 2026-11-09 |
| Mensagem genérica ao cliente; sem detalhe de implementação em 5xx; handler global; detalhe no log do servidor; RFC 9457; 4xx para erro do cliente e 5xx para falha do servidor; depuração desligada em produção | OWASP Error Handling Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html | 2026-11-09 |
| Prever falha, tratar na origem, handler global, falhar fechado em transação multi-passo, limites e cotas, resumir erros repetidos, centralizar tratamento, monitorar padrões de ataque | OWASP Top 10:2025 A10, "How to prevent" | https://top10.owasp.org/2025/A10_2025-Mishandling_of_Exceptional_Conditions | 2026-11-09 |
| Resposta genérica de erro em REST e nunca expor stack trace; 500 sem detalhe interno | OWASP REST Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | 2026-11-09 |
| Regra de higiene de logs: nunca registrar dados de identificação, senhas, chaves de acesso ou segredos; na maioria dos casos nem IDs e nomes de usuário, salvo criptografados | Livro (fonte local): Fowler, Susan J. Microsserviços Prontos para a Produção, bloco susan-fowler__03, seção de logging. Citação curta: "Os logs nunca devem conter informações de identificação" | PDF página 187 (marcador "PDF PAGINA 187") | arquivo local |

Observação de conciliação, convenção desta skill: a Logging Cheat Sheet trata a identidade do usuário como atributo útil do evento, e o livro desaconselha IDs em texto claro. A skill recomenda registrar identificador pseudonimizado e deixar a decisão final à política de privacidade da organização.

### SSRF

| Regra | Fonte | URL exata | Acesso |
|---|---|---|---|
| Lista de permitidos quando os destinos são conhecidos; requisição montada pelo código com esquema, porta e caminho fixos; destinos desconhecidos com lista de bloqueio de faixas internas; só `http` e `https`; não aceitar URL completa; validar IP e domínio com biblioteca; rejeitar discordância entre parsers; faixas a bloquear; normalizar IPv4 mapeado; desativar redirecionamento; DNS rebinding (resolver, validar todos os registros A e AAAA, conectar no IP validado); IMDSv2; listas de bloqueio são contornáveis; restrição de saída na rede | OWASP Server Side Request Forgery Prevention Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html | 2026-11-09 |

### Dependências e supply chain

| Regra | Fonte | URL exata | Acesso |
|---|---|---|---|
| SCA desde o início do projeto; ferramentas citadas; correção de transitiva pela dependência direta; testar atualização fora de produção; backport e registro do bloqueio; alcançabilidade e exploração; suprimir alerta por CVE só após patch verificado; aceite de risco por quem responde pelo risco | OWASP Vulnerable Dependency Management Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Vulnerable_Dependency_Management_Cheat_Sheet.html | 2026-11-09 |
| Fixar versões e usar lockfile; aceitar só componentes assinados e validar assinatura; endurecer CI/CD; proveniência gerada na plataforma de build; privilégio mínimo, MFA e credenciais rotacionadas; builds efêmeros | OWASP Software Supply Chain Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Software_Supply_Chain_Security_Cheat_Sheet.html | 2026-11-09 |
| SBOM central incluindo transitivas; remover dependências não usadas; monitorar CVE, NVD e OSV; obter componentes de fontes confiáveis e assinados; implantação em etapas ou canário; repositórios sem segredos e branches protegidos | OWASP Top 10:2025 A03, "How to prevent" | https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures | 2026-11-09 |

### Configuração

| Regra | Fonte | URL exata | Acesso |
|---|---|---|---|
| Hardening repetível e automatizado; ambientes iguais com credenciais diferentes; plataforma mínima; revisão de configuração junto com patches e de permissões de armazenamento em nuvem; segmentação; cabeçalhos de segurança; verificação automatizada; handler central como backup; revisão manual anual se não automatizado | OWASP Top 10:2025 A02, "How to prevent" | https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration | 2026-11-09 |
| Cabeçalhos: `Cache-Control: no-store`, `frame-ancestors 'none'`, `Content-Type` correto, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`; HTTPS apenas; códigos de status | OWASP REST Security Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html | 2026-11-09 |
| Configurar frameworks explicitamente em vez de confiar nos padrões das bibliotecas | OWASP Authorization Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html | 2026-11-09 |

## 3. Convenções desta skill (sem fonte externa)

- Escala de severidade crítica, alta, média e baixa, os critérios e o formato do achado ([formato-de-achado.md](formato-de-achado.md)).
- A lista de padrões de busca por linguagem em [sinais-por-stack.md](sinais-por-stack.md). Apenas as construções marcadas [OWASP] têm base nas páginas listadas acima.
- Todo código em [exemplos-java.md](exemplos-java.md) e [exemplos-go-node-python.md](exemplos-go-node-python.md). Os princípios têm as fontes acima. Os nomes de classes, funções, pacotes e assinaturas (por exemplo Spring Security, `argon2-cffi`, `golang.org/x/crypto/argon2`, `hmac.compare_digest`, `crypto.timingSafeEqual`, `subtle.ConstantTimeCompare`) são conhecimento de API da skill, não conferido em página lida; a única exceção são as chamadas JDBC e JPA/Hibernate, vistas na Query Parameterization Cheat Sheet, e `ProcessBuilder`, visto na OS Command Injection Defense Cheat Sheet.
- A recomendação de revisão humana e testes para autenticação, autorização, pagamentos e criptografia, e a postura de não prometer segurança total.
- Tabela de testes por categoria em [checklist-detalhado.md](checklist-detalhado.md).

## 4. Omitido por falta de página lida

| Item | Motivo |
|---|---|
| Cheat sheet "JSON Web Token for Java" | URL tentada (https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html) devolveu 404. Regras de JWT usam só a REST Security Cheat Sheet |
| Índice `https://cheatsheetseries.owasp.org/Index.html` | Devolveu 404; a existência das cheat sheets foi confirmada pelos índices por Top 10 e por ASVS |
| "Injection Prevention in Java Cheat Sheet" | A página só informa que o conteúdo foi movido para a Java Security Cheat Sheet, que não foi lida |
| Conteúdo detalhado dos requisitos do ASVS 5.0 (numeração, níveis) | A página do ASVS não lista os requisitos; os documentos para download não foram lidos. A skill usa só a versão e o nome dos capítulos pelo índice de cheat sheets |
| Páginas individuais A04, A05, A06, A07, A08 e A09 do Top 10:2025 | Não foram lidas; só a lista de categorias e as páginas A01, A02, A03 e A10 |
| Regras de Node e Go para desserialização | A Deserialization Cheat Sheet não as cobre |
| Limite de taxa como regra detalhada | A REST Security Cheat Sheet não tem seção própria (só 429 e chaves de API); a menção vem do A01 do Top 10:2025 |
| Livro de Susan Fowler para qualquer regra de segurança além da higiene de logs | O livro não trata de segurança; a única regra citada dele é a higiene de logs |
