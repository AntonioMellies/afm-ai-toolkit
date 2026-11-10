# Checklist detalhado por categoria

Complementa o `SKILL.md` com parâmetros numéricos e testes. Os valores numéricos vêm das páginas OWASP listadas em [fontes.md](fontes.md); confirme na página vigente antes de fixar um valor em política, porque recomendações são atualizadas.

## Senha: algoritmos e parâmetros mínimos

Ordem de preferência segundo o Password Storage Cheat Sheet:

| Algoritmo | Quando | Mínimo citado pela fonte |
|---|---|---|
| Argon2id | Preferido | memória 19 MiB (m=19456), 2 iterações (t=2), paralelismo 1 (p=1); há combinações equivalentes (12 MiB com t=3, 7 MiB com t=5) |
| scrypt | Se Argon2id não estiver disponível | N=2^17 (128 MiB), r=8, p=1 |
| bcrypt | Apenas sistemas legados | fator de custo 10 ou mais; limite de 72 bytes de senha aplicado na entrada |
| PBKDF2 | Quando FIPS-140 for exigido | HMAC-SHA-256 com 600.000 iterações (HMAC-SHA-512 com 220.000) |

Regras associadas:

- Salt aleatório e único por senha; bibliotecas maduras já cuidam disso.
- Pepper (segredo comum fora do banco, em cofre ou HSM) é defesa em profundidade, nunca proteção isolada.
- bcrypt trunca entradas longas: imponha o limite na entrada. Pré-hash tem riscos (truncamento por byte nulo, "password shucking"); se for inevitável, use HMAC com pepper.
- Migração de hash legado: rehash no próximo login bem-sucedido; guarde algoritmo e parâmetros junto do hash (formato PHC) para convivência de versões.
- Não use criptografia reversível para senha.

## Autenticação: política e abuso

- Comprimento: mínimo de 8 caracteres com MFA e 15 sem MFA; máximo de pelo menos 64; não truncar em silêncio.
- Aceite todos os caracteres, inclusive Unicode e espaço; sem regras de composição; bloqueie senhas comuns ou vazadas; sem troca periódica obrigatória (troque após vazamento).
- Mensagem genérica e mesmo status HTTP em login, recuperação e cadastro, para não confirmar existência de conta; tempo de resposta parecido entre sucesso e falha.
- Limite de tentativas por conta (não só por IP), com limiar, janela e duração definidos; bloqueio exponencial é opção; mantenha a redefinição de senha disponível.
- Reautenticação para mudar senha ou e-mail e para aprovar transações sensíveis.
- Registre e revise falhas de senha e bloqueios.

## Sessão

- ID com pelo menos 64 bits de entropia de CSPRNG (a fonte sugere 128 bits ou mais quando você gera o ID); sem dado pessoal dentro; nome de cookie genérico.
- Cookie: `Secure`, `HttpOnly`, `SameSite=Strict` (preferido) ou `Lax`, nunca `None` sem `Secure`; prefixo `__Host-` (exige `Secure`, sem `Domain`, `Path=/`). SameSite complementa tokens CSRF, não os substitui.
- Modo estrito: aceite só IDs emitidos pelo servidor; aceite ID só por cookie, nunca por URL.
- Regenere o ID após login e após mudança de privilégio e destrua o antigo.
- Timeouts aplicados no servidor: ociosidade (a fonte cita 2 a 5 minutos para alto valor e 15 a 30 para baixo risco) e absoluto (exemplo de 4 a 8 horas).
- Logout invalida no servidor; apagar cookie no cliente não basta. `Cache-Control: no-store` em páginas com dados de sessão.
- Tokens de sessão ou JWT não ficam em `localStorage` nem `sessionStorage`.

## JWT em APIs

- Assinatura (preferida) ou MAC obrigatória; rejeite `alg: none`.
- Algoritmo definido pela configuração do servidor.
- Exija e valide `iss`, `aud` e `exp`; valide `nbf` quando presente ou exigido pelo perfil do token.
- Para encerrar sessão, a fonte sugere denylist de `jti` até a expiração do token.
- Tokens stateless de vida curta; para vida longa, refresh token e revogação.

## Criptografia

- AES com chave de 128 bits ou mais (idealmente 256), modo GCM ou CCM; sem GCM ou CCM, CTR ou CBC com autenticação separada (Encrypt-then-MAC); ECB não.
- RSA: 2048 bits ou mais com OAEP; criptografia de chave pública com biblioteca mantida que implemente esquema híbrido padrão (por exemplo HPKE).
- IV: use o tratamento da biblioteca, garanta unicidade entre todas as instâncias que compartilham a chave e siga os limites do NIST SP 800-38D para AES-GCM.
- CSPRNG para chaves, IVs, IDs de sessão e tokens de CSRF e de reset. Não use `rand()`, `Math.random()`, `java.util.Random`; UUID só se a implementação for sabidamente segura (versão 1 não é aleatória).
- Chaves: geradas por CSPRNG, independentes entre si (DEK e KEK), guardadas em HSM, KMS ou cofre, separadas dos dados, nunca no código, no repositório nem em variável de ambiente. DEK é cifrada por uma KEK guardada à parte e pelo menos tão forte quanto a DEK.
- Rotação quando houver comprometimento (inclusive saída de quem tinha acesso), fim do período criptográfico, aproximação do limite de uso do modo ou enfraquecimento do algoritmo. Mantenha chaves antigas por um período para ler backups.

## Segredos

- Gerenciador central com auditoria e rotação; acesso por segredo, não "leitura de tudo".
- Não gravar segredo em imagem de contêiner (ENV, ARG); prefira arquivo montado pelo orquestrador; variável de ambiente só quando nada melhor for possível.
- Em CI/CD, federação de identidade (OIDC) e credenciais curtas com escopo por job, em vez de credenciais estáticas.
- Varredura de segredos antes do commit (hook ou plugin de IDE).
- Segredo exposto: revogar, rotacionar por automação, remover de código, logs e sistemas, e registrar quem teve acesso.

## Logs: eventos e atributos

- Eventos de segurança: falhas de validação (sinal, não prova de ataque), autenticações e falhas, falhas de autorização, falhas de sessão, erros de aplicação, mudanças de configuração, ações administrativas e de privilégio, acesso a dado sensível, criação e rotação de chave, importação e exportação, upload, falhas de desserialização, falhas de TLS de saída, métodos HTTP inesperados, ações fora de sequência.
- Atributos: quando (timestamp e identificador de interação), onde (aplicação, versão, host, ponto de entrada), quem (origem e identidade, pseudonimizada se necessário), o quê (tipo, severidade, descrição).
- Proteja os logs: transporte seguro, acesso restrito e monitorado, sem exposição em local acessível pela web, retenção só pelo período exigido.
- A falha do próprio logging não pode derrubar a aplicação nem vazar informação.
- Regra de higiene de logs (Microsserviços Prontos para a Produção, p. 187): nunca registrar dados de identificação, senhas, chaves ou segredos. Na maioria dos casos nem IDs e nomes de usuário, salvo criptografados. Concilie com a necessidade de correlação usando identificador pseudonimizado e a política de privacidade da organização.

## Erros

- 4xx para erro do cliente e 5xx só para falha que o servidor não consegue tratar; monitore a taxa de 5xx.
- Corpo de erro padronizado (RFC 9457, Problem Details) e genérico em 5xx.
- Handler global; depuração desligada em produção.
- Falhe fechado: transação multi-passo que falha é revertida por inteiro.
- Limites (taxa, cotas, tamanho) evitam condições excepcionais; erros repetidos podem ser resumidos em estatística.

## SSRF: faixas a bloquear no caso de destino desconhecido

A fonte lista: loopback (`127.0.0.0/8`, `::1/128`), RFC1918 (`10/8`, `172.16/12`, `192.168/16`), link-local (`fe80::/10`), local única (`fc00::/7`), endereços de metadados de nuvem (`169.254.169.254`, `metadata.google.internal`), multicast, IPv4 mapeado em IPv6 (`::ffff:0:0/96`) e NAT64 (`64:ff9b::/96`, `64:ff9b:1::/48`). Normalize o endereço para IPv4 antes de checar. Se mais de um componente interpreta a URL e eles discordam do host, rejeite. Repita as checagens em retentativas e conexões de fallback. Lista de bloqueio sozinha é contornável: prefira lista de permitidos.

## Dependências

- SCA desde o início do projeto; ferramentas citadas pelas fontes incluem OWASP Dependency-Check, Dependency-Track, `npm audit`, Trivy, Grype e Renovate.
- Triagem: há versão corrigida; correção a caminho; sem correção prevista; achado de pentest; correção existe mas não pode ser adotada (backport e registro do bloqueio). Aceite de risco é decisão de quem responde pelo risco na organização, a partir da análise técnica.
- Verifique se a função vulnerável é alcançável e em que condições antes de decidir urgência. Bloquear o payload de uma prova de conceito não prova segurança.
- SBOM central, inclusive transitivas; staged rollout ou canário para atualizações.
- Build: proveniência gerada na plataforma de build, builds imutáveis e efêmeros, MFA e credenciais rotacionadas, escopo mínimo.

## Testes sugeridos por categoria

| Categoria | Teste que prova o controle |
|---|---|
| Acesso | Dois usuários e dois tenants: cada operação (ler, criar, alterar, apagar, exportar, administrar) negada no objeto alheio; rota sem política deve falhar o teste |
| Autenticação | Mesma resposta para conta inexistente e senha errada; bloqueio após limiar; senha vazada rejeitada; ID de sessão novo após login |
| Entrada e injeção | Corpus de entradas hostis (aspas, `../`, metacaracteres, tamanho extremo, tipo errado, campo extra) tratado como dado ou rejeitado |
| Criptografia e segredos | Varredura de segredos na pipeline; teste de ida e volta com dado adulterado falhando na autenticação |
| Logs e erros | Provocar exceção e conferir corpo genérico; buscar senha e token nos logs de teste |
| SSRF | URLs para loopback, metadados, IPv6, esquema `file`, redirecionamento para interno e host que muda de IP |
| Dependências | Scanner na pipeline falhando por severidade definida; lockfile alterado só por PR revisado |
| Configuração | Verificação automática de cabeçalhos e de modo de depuração por ambiente |

Rode esses testes e o scanner de verdade; não declare o resultado sem a execução.
