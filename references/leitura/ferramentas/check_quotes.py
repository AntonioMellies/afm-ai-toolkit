import sys, os, re, unicodedata

# uso: python -I check_quotes.py <chunks_dir> <notes_dir> [prefixo] [chunks_raw_dir]
chunks, notes = sys.argv[1], sys.argv[2]
prefix = sys.argv[3] if len(sys.argv) > 3 else ""
# opcional: diretorio com a extracao SEM layout (colunas de tabelas ficam intercaladas no modo layout)
alt = sys.argv[4] if len(sys.argv) > 4 else None

def norm(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return s.strip()

QUOTE = re.compile(r"[\"“«]([^\"”»\n]{20,300})[\"”»]\s*\[([ps])\.\s*(\d+)")
MARK = re.compile(r"=== (?:PDF PAGINA|SECAO) (\d+)[^\n]*===")


def pages_of(raw):
    """{numero: conjunto de palavras normalizadas} por pagina/secao do bloco."""
    out, parts = {}, MARK.split(raw)
    for i in range(1, len(parts), 2):
        out.setdefault(int(parts[i]), set()).update(norm(parts[i + 1]).split())
    return out


tot_all = ok_all = pg_all = 0
for fn in sorted(os.listdir(notes)):
    if not fn.endswith(".md") or not fn.startswith(prefix):
        continue
    src = os.path.join(chunks, fn[:-3] + ".txt")
    if not os.path.exists(src):
        print(f"SEM-BLOCO {fn}")
        continue
    # texto do bloco sem marcadores, com hifenizacao de fim de linha removida
    text = open(src, encoding="utf-8").read()
    text = re.sub(r"-\s*\n\s*", "", text)
    ntext = norm(text)
    nalt = ""
    if alt and os.path.exists(os.path.join(alt, fn[:-3] + ".txt")):
        raw_alt = open(os.path.join(alt, fn[:-3] + ".txt"), encoding="utf-8").read()
        nalt = norm(re.sub(r"-\s*\n\s*", "", raw_alt))
    body = open(os.path.join(notes, fn), encoding="utf-8").read()
    qs = QUOTE.findall(body)
    # considera so citacoes com >= 5 palavras
    qs = [t for t in qs if len(t[0].split()) >= 5]
    pg = pages_of(text)
    if nalt:
        for k, v in pages_of(raw_alt).items():
            pg.setdefault(k, set()).update(v)
    miss = []
    ok = 0
    ok_pg = 0
    for q, kind, num in qs:
        # separa trechos com reticencias
        parts = [p for p in re.split(r"\.\.\.|…|\[\.\.\.\]", q) if len(p.split()) >= 4]
        if not parts:
            continue
        if all(norm(p) in ntext or (nalt and norm(p) in nalt) for p in parts):
            ok += 1
        else:
            # fallback: todas as palavras da citacao presentes na pagina citada (+-1) ou na secao;
            # cobre colunas de tabela intercaladas pela extracao. Mais fraco que a busca literal.
            n = int(num)
            window = {n - 1, n, n + 1} if kind == "p" else {n}
            words = set()
            for k in window:
                words |= pg.get(k, set())
            if all(set(norm(p).split()) <= words for p in parts):
                ok_pg += 1
            else:
                miss.append(q)
    tot = ok + ok_pg + len(miss)
    tot_all += tot
    ok_all += ok
    pg_all += ok_pg
    long_q = [t for t in qs if len(t[0].split()) > 30]
    aviso = "  <-- ATENCAO: 0 citacoes no formato esperado; NAO conta como aprovado" if tot == 0 else ""
    print(f"{fn}: {ok} literais + {ok_pg} so-na-pagina de {tot}; >30 palavras: {len(long_q)}{aviso}")
    for m in miss[:4]:
        print(f"    NAO ACHADA: {m[:110]}")
print(f"TOTAL: {ok_all}/{tot_all} literais; +{pg_all} apenas na pagina/secao (conferir); {tot_all - ok_all - pg_all} nao achadas")
