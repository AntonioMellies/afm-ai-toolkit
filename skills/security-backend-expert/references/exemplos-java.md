# Exemplos mínimos em Java

Trechos curtos que ilustram a correção. São ponto de partida, não código pronto para produção: ajuste ao framework e à versão, compile, escreva os testes negativos e submeta código de autenticação, autorização, pagamentos e criptografia a revisão humana. Os nomes de tipos de bibliotecas (Spring, Jakarta, SLF4J, Spring Security) devem ser conferidos na versão usada pelo projeto.

## 1. Consulta parametrizada (JDBC)

```java
// Correto: o SQL é fixo e o valor vai como parâmetro.
String sql = "SELECT id, name FROM customers WHERE email = ?";
try (PreparedStatement ps = connection.prepareStatement(sql)) {
    ps.setString(1, email);
    try (ResultSet rs = ps.executeQuery()) {
        // ler resultados
    }
}
```

Errado: `"... WHERE email = '" + email + "'"`. Em JPA ou Hibernate use parâmetro nomeado (`:email` com `setParameter("email", email)`) também em HQL e JPQL.

## 2. Ordenação e nomes de coluna por lista de permitidos

Identificadores não são parametrizáveis. Mapeie a escolha do usuário para valores do código.

```java
private static final Map<String, String> SORT_COLUMNS = Map.of(
        "name", "name",
        "created", "created_at");

String column = SORT_COLUMNS.get(sortParam);
if (column == null) {
    throw new IllegalArgumentException("Campo de ordenação inválido");
}
String direction = "desc".equalsIgnoreCase(dirParam) ? "DESC" : "ASC";
String sql = "SELECT id, name FROM customers ORDER BY " + column + " " + direction;
```

A concatenação aqui é segura porque `column` e `direction` vêm só de literais do código.

## 3. Autorização por objeto (evitar IDOR)

```java
public Order getOrder(long orderId, AuthenticatedUser user) {
    return orderRepository.findByIdAndCustomerId(orderId, user.customerId())
            .orElseThrow(() -> new NotFoundException()); // 404 também para "não é seu"
}
```

A identidade vem da sessão ou do token (`user`), nunca de campo enviado no corpo. Cubra leitura, alteração, cancelamento e exportação com o mesmo padrão.

## 4. Negar por padrão e política central (Spring Security)

```java
@Bean
SecurityFilterChain api(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(a -> a
            .requestMatchers("/health").permitAll()
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .requestMatchers("/orders/**").hasRole("CUSTOMER")
            .anyRequest().denyAll());   // rota nova sem regra explícita é negada
    return http.build();
}
```

A regra de URL não substitui a checagem de dono do exemplo 3. Teste que uma rota sem regra retorna 403.

## 5. DTO com validação (contra mass assignment)

```java
public record CreateUserRequest(
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(max = 100) String name) {}   // sem campo "role" nem "isAdmin"

@PostMapping("/users")
ResponseEntity<UserView> create(@Valid @RequestBody CreateUserRequest req) { ... }
```

O papel e outros campos sensíveis são definidos pelo servidor. Valide também semântica (por exemplo, data final posterior à inicial) e limite o tamanho do corpo na configuração do servidor.

## 6. Hash de senha

```java
// Spring Security: Argon2id com parâmetros explícitos (confirme a assinatura na versão usada).
// saltLength, hashLength, parallelism, memória em KiB, iterações
PasswordEncoder encoder = new Argon2PasswordEncoder(16, 32, 1, 19456, 2);

String stored = encoder.encode(rawPassword);
boolean ok = encoder.matches(candidate, stored);
```

Os parâmetros acima seguem o mínimo citado pela fonte (19 MiB, 2 iterações, paralelismo 1); alguns construtores padrão usam valores menores, por isso eles são explícitos. A classe pode exigir a biblioteca BouncyCastle. Se usar bcrypt, aplique o limite de 72 bytes na entrada. Faça rehash no login quando os parâmetros mudarem.

## 7. Comparação em tempo constante e token aleatório

```java
// Comparação de bytes em tempo constante (ex.: assinatura, token de reset já em hash).
boolean same = MessageDigest.isEqual(expectedBytes, providedBytes);

// Token de segurança a partir de CSPRNG.
private static final SecureRandom RANDOM = new SecureRandom();

static String newToken() {
    byte[] bytes = new byte[32];            // 256 bits
    RANDOM.nextBytes(bytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
}
```

Guarde só o hash do token de reset no banco. Nunca use `java.util.Random` nem `Math.random()` para isso.

## 8. Cookie de sessão

```java
ResponseCookie cookie = ResponseCookie.from("__Host-sid", sessionId)
        .httpOnly(true)
        .secure(true)
        .sameSite("Strict")
        .path("/")               // __Host- exige Path=/, Secure e nenhum Domain
        .build();
response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
```

Na prática o framework gerencia a sessão: configure esses atributos nele, regenere o ID no login e invalide no servidor no logout.

## 9. Criptografia autenticada (AES-GCM) com a JCA

```java
private static final SecureRandom RANDOM = new SecureRandom();

static byte[] encrypt(SecretKey key, byte[] plaintext) throws GeneralSecurityException {
    byte[] iv = new byte[12];                    // 96 bits, novo a cada mensagem
    RANDOM.nextBytes(iv);
    Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
    cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(128, iv));
    byte[] ct = cipher.doFinal(plaintext);
    return ByteBuffer.allocate(iv.length + ct.length).put(iv).put(ct).array();
}
```

Cuidados: a chave vem de KMS ou cofre, nunca do código; o IV não pode repetir com a mesma chave e há limite de mensagens por chave (NIST SP 800-38D), então rotacione; na decifragem, falha de autenticação deve resultar em erro, sem devolver dado parcial. Para uso real, prefira uma biblioteca de alto nível mantida ou o envelope encryption do KMS e peça revisão de especialista.

## 10. Segredo fora do código

```java
// O orquestrador monta o segredo como arquivo; o caminho vem de configuração.
String dbPassword = Files.readString(Path.of(System.getenv("DB_PASSWORD_FILE"))).strip();
```

Não registre o valor em log, não o inclua em mensagens de exceção e não o grave na imagem.

## 11. Logs seguros

```java
// Mensagem constante com placeholders; sem dado sensível; identificador pseudonimizado.
log.warn("login_failed userRef={} reason={}", pseudonymize(userId), "bad_credentials");
```

Placeholders sozinhos não impedem quebra de linha injetada: configure o appender para codificar CR e LF (ou use log estruturado em JSON) e limite o tamanho de valores vindos do usuário. Nunca registre senha, token, cabeçalho `Authorization` nem corpo de login.

## 12. Erro genérico com handler global (Spring)

```java
@RestControllerAdvice
class GlobalErrorHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalErrorHandler.class);

    @ExceptionHandler(Exception.class)
    ProblemDetail unexpected(Exception ex) {
        String errorId = UUID.randomUUID().toString();
        log.error("unexpected_error errorId={}", errorId, ex);       // detalhe só no servidor
        ProblemDetail pd = ProblemDetail.forStatusAndDetail(
                HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno. Informe o código ao suporte.");
        pd.setProperty("errorId", errorId);
        return pd;
    }
}
```

Trate exceções de negócio e de validação com handlers próprios que devolvem 4xx. Em transações, uma falha no meio faz rollback de tudo.

## 13. Chamada HTTP de saída com destino permitido (SSRF, caso de destinos conhecidos)

```java
private static final Set<String> ALLOWED_HOSTS = Set.of("api.parceiro.example", "files.interno.example");

private final HttpClient client = HttpClient.newBuilder()
        .followRedirects(HttpClient.Redirect.NEVER)       // redirecionamento não é seguido
        .connectTimeout(Duration.ofSeconds(3))
        .build();

HttpResponse<String> fetch(String hostKey, String resourceId) throws Exception {
    if (!ALLOWED_HOSTS.contains(hostKey)) {
        throw new IllegalArgumentException("Destino não permitido");
    }
    // O código monta esquema, host e caminho; o usuário só escolhe um identificador validado.
    URI uri = URI.create("https://" + hostKey + "/v1/items/" + URLEncoder.encode(resourceId, StandardCharsets.UTF_8));
    return client.send(HttpRequest.newBuilder(uri).GET().build(), HttpResponse.BodyHandlers.ofString());
}
```

Este exemplo cobre só o caso de destinos conhecidos. Para destinos externos desconhecidos, a validação precisa resolver o nome, checar todos os endereços contra faixas internas e conectar no IP validado; isso é fácil de errar. Use uma biblioteca ou proxy de saída revisado, combine com restrição de saída na rede e peça revisão humana.

## 14. Comando de SO sem shell

```java
// Evite quando houver API da biblioteca. Se inevitável: executável fixo, argumentos separados e validados.
private static final Pattern SAFE_NAME = Pattern.compile("^[a-z0-9]{3,10}$");

if (!SAFE_NAME.matcher(name).matches()) {
    throw new IllegalArgumentException("Nome inválido");
}
ProcessBuilder pb = new ProcessBuilder(List.of("/usr/bin/convert-tool", "--", name));
pb.directory(new File("/var/app/work"));
Process p = pb.start();
```

Evite `Runtime.exec(String)`: ele divide a string em espaços e entrada com espaço vira argumento extra. Separar argumentos não dispensa validá-los.

## 15. Desserialização

Preferência: JSON ligado a DTOs, sem desserialização nativa de dado externo. Se a serialização nativa for inevitável, configure um filtro com lista de classes permitidas e limites antes de ler.

```java
ObjectInputFilter filter = ObjectInputFilter.Config.createFilter(
        "maxdepth=5;maxrefs=100;maxbytes=65536;com.acme.Bicycle;!*");   // permite uma classe, nega o resto
try (ObjectInputStream in = new ObjectInputStream(stream)) {
    in.setObjectInputFilter(filter);
    Object o = in.readObject();
}
```

Confirme a sintaxe do filtro na versão do JDK usada. Marque campos sensíveis como `transient`. Verifique também a assinatura da mensagem antes de desserializar.
