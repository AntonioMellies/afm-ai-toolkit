# Exemplos mínimos em Go, Node e Python

Escopo deliberadamente restrito às construções de que há certeza: consulta parametrizada, ordenação por lista de permitidos, hash de senha, comparação em tempo constante, token aleatório e execução de comando sem shell. O princípio de cada uma tem fonte OWASP em [fontes.md](fontes.md). **As chamadas de API de cada linguagem e biblioteca abaixo são conhecimento da própria skill e não foram verificadas em página lida**: confirme nomes, assinaturas e parâmetros na documentação oficial da versão usada, compile ou execute e teste antes de adotar. Código de autenticação e de criptografia exige revisão humana.

## Consulta parametrizada

O SQL é texto fixo; os valores seguem separados, pela API do driver.

**Go** (`database/sql`; o marcador depende do driver: `$1` no PostgreSQL, `?` em MySQL e SQLite)

```go
row := db.QueryRowContext(ctx,
    "SELECT id, name FROM customers WHERE email = $1", email)
var id int64
var name string
if err := row.Scan(&id, &name); err != nil {
    return err // sql.ErrNoRows tratado como "não encontrado"
}
```

**Node** (`pg`; outros drivers têm o equivalente com `?` ou parâmetros nomeados)

```js
const { rows } = await pool.query(
  'SELECT id, name FROM customers WHERE email = $1',
  [email]
);
```

**Python** (DB-API; o estilo do marcador depende do driver: `%s` no psycopg, `?` no sqlite3)

```python
cur.execute("SELECT id, name FROM customers WHERE email = %s", (email,))
row = cur.fetchone()
```

Errado nas três: montar a string com `fmt.Sprintf`, template literal (`${email}`), f-string, `%` ou `.format`.

## Ordenação e identificadores por lista de permitidos

Nome de coluna e direção não são parametrizáveis. Mapeie para literais do código.

**Go**

```go
var sortColumns = map[string]string{"name": "name", "created": "created_at"}

col, ok := sortColumns[sortParam]
if !ok {
    return errors.New("campo de ordenação inválido")
}
dir := "ASC"
if dirParam == "desc" {
    dir = "DESC"
}
query := "SELECT id, name FROM customers ORDER BY " + col + " " + dir
```

**Node**

```js
const SORT_COLUMNS = new Map([['name', 'name'], ['created', 'created_at']]);

const col = SORT_COLUMNS.get(sortParam);
if (!col) throw new Error('campo de ordenação inválido');
const dir = dirParam === 'desc' ? 'DESC' : 'ASC';
const sql = `SELECT id, name FROM customers ORDER BY ${col} ${dir}`;
```

**Python**

```python
SORT_COLUMNS = {"name": "name", "created": "created_at"}

col = SORT_COLUMNS.get(sort_param)
if col is None:
    raise ValueError("campo de ordenação inválido")
direction = "DESC" if dir_param == "desc" else "ASC"
query = f"SELECT id, name FROM customers ORDER BY {col} {direction}"
```

A interpolação é segura aqui porque `col` e `direction` só podem ser literais definidos no código. Os valores de dados continuam parametrizados.

## Hash de senha (Argon2id)

Parâmetros mínimos citados pela fonte: memória 19 MiB (19456 KiB), 2 iterações, paralelismo 1. Guarde o hash no formato que a biblioteca produz (inclui algoritmo, parâmetros e salt) para poder fazer migração e rehash.

**Python** (pacote `argon2-cffi`)

```python
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher(time_cost=2, memory_cost=19456, parallelism=1)

stored = ph.hash(password)

def verify(stored_hash: str, candidate: str) -> bool:
    try:
        ph.verify(stored_hash, candidate)
    except VerifyMismatchError:
        return False
    if ph.check_needs_rehash(stored_hash):
        pass  # gerar novo hash e atualizar no banco após o login bem-sucedido
    return True
```

**Node** (pacote `argon2`)

```js
const argon2 = require('argon2');

const stored = await argon2.hash(password, {
  type: argon2.argon2id,
  memoryCost: 19456, // KiB
  timeCost: 2,
  parallelism: 1,
});

const ok = await argon2.verify(stored, candidate);
```

**Go** (`golang.org/x/crypto/argon2`; esta API devolve só os bytes, então você mesmo guarda salt e parâmetros; em produção prefira uma biblioteca que gere e leia o formato PHC)

```go
salt := make([]byte, 16)
if _, err := rand.Read(salt); err != nil { // crypto/rand
    return err
}
key := argon2.IDKey([]byte(password), salt, 2, 19*1024, 1, 32) // time, memória KiB, threads, tamanho

// Na verificação: recalcule com o mesmo salt e parâmetros e compare em tempo constante.
candidate := argon2.IDKey([]byte(input), salt, 2, 19*1024, 1, 32)
if subtle.ConstantTimeCompare(key, candidate) != 1 { // crypto/subtle
    return errInvalidCredentials
}
```

Imponha um tamanho máximo de entrada razoável (a fonte pede máximo de pelo menos 64 caracteres, sem truncar em silêncio). Em Go, bcrypt está em `golang.org/x/crypto/bcrypt` (`GenerateFromPassword`, `CompareHashAndPassword`), mas o bcrypt é indicado só para sistemas legados e tem limite de 72 bytes de senha.

## Comparação em tempo constante

Para segredos, tokens e assinaturas já em forma de bytes ou hash. Não use `==`.

**Python**

```python
import hmac
hmac.compare_digest(expected_bytes, provided_bytes)   # ambos bytes (ou ambos str ASCII)
```

**Node**

```js
const crypto = require('crypto');
// timingSafeEqual lança erro se os tamanhos diferirem: compare hashes/HMACs do mesmo tamanho.
const a = crypto.createHash('sha256').update(expected).digest();
const b = crypto.createHash('sha256').update(provided).digest();
const equal = crypto.timingSafeEqual(a, b);
```

**Go**

```go
import "crypto/subtle"

equal := subtle.ConstantTimeCompare(expected, provided) == 1 // 0 imediato se os tamanhos diferirem
```

## Token aleatório de segurança

**Python**

```python
import secrets
token = secrets.token_urlsafe(32)
```

**Node**

```js
const token = require('crypto').randomBytes(32).toString('base64url');
```

**Go**

```go
b := make([]byte, 32)
if _, err := rand.Read(b); err != nil { // crypto/rand, nunca math/rand
    return "", err
}
token := base64.RawURLEncoding.EncodeToString(b)
```

Para token de reset, guarde no banco só o hash do token e defina expiração curta.

## Execução de comando sem shell

Evite quando houver biblioteca. Se inevitável: executável fixo, argumentos separados, valores validados por lista de permitidos, `--` antes de operandos quando o comando suportar.

**Python**

```python
subprocess.run(["/usr/bin/convert-tool", "--", name], check=True, shell=False, timeout=10)
```

**Node**

```js
const { execFile } = require('node:child_process');
execFile('/usr/bin/convert-tool', ['--', name], { timeout: 10_000 }, (err, stdout) => { /* ... */ });
```

**Go**

```go
cmd := exec.CommandContext(ctx, "/usr/bin/convert-tool", "--", name)
out, err := cmd.Output()
```

## Desserialização insegura (Python)

Nunca `pickle.load` nem `pickle.loads` sobre dado não confiável; para YAML use `yaml.safe_load`, nunca `yaml.load` com loader completo nem `yaml.unsafe_load`. Prefira JSON para trocar dados.
