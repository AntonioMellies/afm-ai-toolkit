# Sinais de risco por stack

Padrões para localizar com busca textual ao revisar. São **pistas**, não achados: cada ocorrência precisa de leitura do fluxo para confirmar se o dado é externo e se existe controle a montante. Ausência de ocorrência não prova ausência de problema.

Convenção desta skill: a lista de padrões é uma heurística de busca montada pela skill. Os princípios por trás dela têm fonte em [fontes.md](fontes.md). Onde a página OWASP nomeia a construção (marcado com [OWASP]), a fonte está lá.

## Injeção e execução

| Categoria | Java | Go | Node | Python |
|---|---|---|---|---|
| SQL por concatenação | `createStatement`, `"... " + var` em string SQL, `String.format` com SQL, HQL concatenado | `fmt.Sprintf("SELECT`, `+ id +` em string SQL | template literal com `${` dentro de SQL, concatenação com `+` | f-string ou `%` ou `.format` em SQL antes de `execute` |
| Comando de SO | `Runtime.exec(String)` [OWASP], `ProcessBuilder("cmd arg arg")` como string única [OWASP], `sh -c` | `exec.Command("sh", "-c", ...)` | `child_process.exec(` com dado externo | `subprocess` com `shell=True`, `os.system` |
| Avaliação dinâmica | `ScriptEngine.eval` | `text/template` usado para gerar código | `eval(`, `new Function(`, `vm.runIn` com dado externo | `eval(`, `exec(` |
| Desserialização | `ObjectInputStream` sobre dado externo [OWASP], marcadores `AC ED 00 05` ou `rO0` [OWASP] | sem padrão nativo a destacar; revise decodificadores de formatos binários e de `encoding/xml` sobre dado externo (limites de tamanho e de profundidade) | `node-serialize` e bibliotecas similares sobre dado externo | `pickle.load(s)` [OWASP], `yaml.load` sem `SafeLoader` e `yaml.unsafe_load` [OWASP], `jsonpickle.decode` [OWASP] |

## Acesso e entrada

| Sinal | O que investigar |
|---|---|
| Handler que busca por ID e retorna sem comparar dono ou tenant | IDOR: falta de escopo por usuário |
| Corpo da requisição ligado direto a entidade persistida (`@RequestBody Entity`, `json.Unmarshal` em struct de modelo, `new User(req.body)`, `User(**data)`) | Mass assignment: campos como papel ou saldo graváveis |
| Rota nova fora do arquivo ou filtro central de autorização | Cobertura parcial de autorização |
| `permitAll`, `AllowAnyOrigin`, `cors({ origin: '*' })` com credenciais, `Access-Control-Allow-Origin` refletindo o `Origin` | CORS e acesso amplos demais |
| ID do usuário lido do corpo ou de parâmetro em vez da sessão | Identidade controlada pelo cliente |

## Autenticação, sessão e tokens

| Sinal | O que investigar |
|---|---|
| `MD5`, `SHA1`, `SHA-256` simples sobre senha; `==` entre hash de senha ou token | Hash inadequado e comparação sem tempo constante |
| Mensagens distintas "usuário não existe" e "senha incorreta" | Enumeração de contas |
| Token de sessão em `localStorage`, cookie sem `Secure`, `HttpOnly` ou `SameSite` | Cookie fraco (a fonte pede esses atributos explícitos) |
| Decodificação de JWT sem verificação de assinatura, algoritmo lido do cabeçalho, ausência de checagem de `exp`, `iss`, `aud` | JWT frouxo |
| ID de sessão igual antes e depois do login | Fixação de sessão |

## Criptografia e segredos

| Sinal | O que investigar |
|---|---|
| `java.util.Random`, `Math.random()`, `rand` do Go (`math/rand`), `random` do Python para token ou chave | PRNG fraco para uso de segurança [OWASP cita `java.util.Random`, `Math.random()` e `rand()`] |
| `AES/ECB`, IV fixo ou derivado de dado previsível, chave literal no código | Modo e IV inadequados; chave embutida |
| Strings parecidas com chave (`AKIA`, `-----BEGIN`, `password=`, `secret`, `token`) em código, `.env` versionado, `application*.properties`, `docker-compose`, `Dockerfile` com `ENV` ou `ARG` de segredo | Segredo no repositório ou na imagem |
| `InsecureSkipVerify: true` (Go), `rejectUnauthorized: false` ou `NODE_TLS_REJECT_UNAUTHORIZED=0` (Node), `verify=False` (Python requests), `TrustAllCerts` ou `HostnameVerifier` que sempre retorna verdadeiro (Java) | Verificação de certificado desligada |

## Logs e erros

| Sinal | O que investigar |
|---|---|
| `log.info("..." + userInput)`, log de objeto de requisição inteiro, de cabeçalho `Authorization`, de corpo de login | Vazamento de segredo e injeção de log |
| `printStackTrace()`, `err.stack` ou `traceback` devolvidos na resposta, `debug=True`, modo de desenvolvimento em produção | Vazamento de detalhe interno |
| `catch` vazio, ou que retorna sucesso, ou que libera acesso em caso de exceção na checagem de permissão | Falha aberta |

## SSRF e saída

| Sinal | O que investigar |
|---|---|
| Cliente HTTP chamado com URL derivada de entrada (`new URL(userUrl)`, `http.Get(url)`, `fetch(url)`, `requests.get(url)`) | SSRF: quais destinos são possíveis |
| Seguimento automático de redirecionamento ativo no cliente de saída | Redirecionamento para destino interno [OWASP] |
| Validação de URL por regex ou por `startsWith`/`contains` no host | Validação contornável por parser diferente |
| Esquemas além de `http` e `https` aceitos (`file://`, `gopher://`, `dict://`) [OWASP] | Vetores de SSRF |

## Dependências e configuração

| Sinal | O que investigar |
|---|---|
| Sem lockfile versionado (`package-lock.json`, `go.sum`, lock do gerenciador Python ou do Gradle/Maven quando usado) | Versões não fixadas [OWASP recomenda lockfile] |
| Versões flutuantes (`latest`, `*`, `^` sem lockfile) | Atualização sem controle |
| Pipeline sem etapa de SCA ou de varredura de segredos | Lacuna de processo |
| Endpoint de diagnóstico, console administrativo ou documentação de API aberta sem autenticação em produção | Superfície exposta |
| Conta do banco com privilégio administrativo na string de conexão da aplicação | Privilégio excessivo [OWASP SQL] |
