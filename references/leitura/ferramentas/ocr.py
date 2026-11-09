"""OCR de PDF escaneado. Uso: python ocr.py <pdf> <out_txt> <tessdata_dir> [ini] [fim] [dpi]
Renderiza cada pagina com PyMuPDF, roda tesseract (por) e escreve '=== PDF PAGINA N ===' + texto."""
import sys, os, subprocess, tempfile
from concurrent.futures import ThreadPoolExecutor
import pymupdf

pdf, out, tessdir = sys.argv[1], sys.argv[2], sys.argv[3]
ini = int(sys.argv[4]) if len(sys.argv) > 4 else 1
fim = int(sys.argv[5]) if len(sys.argv) > 5 else 0
dpi = int(sys.argv[6]) if len(sys.argv) > 6 else 250
TESS = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

doc = pymupdf.open(pdf)
n = doc.page_count
fim = fim or n
tmp = tempfile.mkdtemp(prefix="ocr_")

def render(i):
    p = os.path.join(tmp, f"p{i}.png")
    pix = doc[i - 1].get_pixmap(dpi=dpi, colorspace=pymupdf.csGRAY)
    pix.save(p)
    return p

def work(i):
    png = render(i)
    base = png[:-4]
    subprocess.run([TESS, png, base, "-l", "por", "--tessdata-dir", tessdir, "--psm", "6",
                    "-c", "preserve_interword_spaces=1"], capture_output=True, env={**os.environ, "OMP_THREAD_LIMIT": "1"})
    try:
        txt = open(base + ".txt", encoding="utf-8").read()
    except FileNotFoundError:
        txt = "[OCR FALHOU]"
    for f in (png, base + ".txt"):
        try: os.remove(f)
        except OSError: pass
    return i, txt

# PyMuPDF doc nao e thread-safe: renderiza sequencial dentro do lock
import threading
lock = threading.Lock()
def work_safe(i):
    with lock:
        png = render(i)
    base = png[:-4]
    subprocess.run([TESS, png, base, "-l", "por", "--tessdata-dir", tessdir, "--psm", "6",
                    "-c", "preserve_interword_spaces=1"], capture_output=True, env={**os.environ, "OMP_THREAD_LIMIT": "1"})
    try:
        txt = open(base + ".txt", encoding="utf-8").read()
    except FileNotFoundError:
        txt = "[OCR FALHOU]"
    for f in (png, base + ".txt"):
        try: os.remove(f)
        except OSError: pass
    return i, txt

with ThreadPoolExecutor(max_workers=12) as ex:
    res = dict(ex.map(work_safe, range(ini, fim + 1)))
with open(out, "w", encoding="utf-8") as f:
    for i in range(ini, fim + 1):
        f.write(f"=== PDF PAGINA {i} ===\n{res[i]}\n")
print(f"{pdf}: paginas {ini}-{fim} de {n}, {sum(len(v) for v in res.values())} caracteres")
