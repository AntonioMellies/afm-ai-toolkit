// Stop: antes de o agente encerrar o turno, roda o comando de verificação declarado pelo
// projeto (testes) se houver alterações não commitadas. Só age com `.afm-hooks.json`:
//   { "verify": { "command": "npm test", "timeoutSeconds": 120 } }
// Base: verificação externa (execução de testes) melhora a correção do agente; o modelo
// não se autocorrige de forma confiável sem feedback externo (arXiv 2310.01798, 2510.23761).
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readInput, loadConfig, isDisabled, allow, block, run } from "./lib.mjs";

const input = readInput();
// Já estamos continuando por causa de um bloqueio anterior: nunca entrar em loop.
if (input.stop_hook_active === true) allow();

const config = loadConfig(input.cwd);
if (isDisabled(config, "verify-before-stop")) allow();
const verify = config.verify;
if (!verify || typeof verify.command !== "string" || !verify.command.trim()) allow();

const root = config.root;
const status = run("git", ["status", "--porcelain"], { cwd: root });
const changed = (status.stdout ?? "")
  .split(/\r?\n/)
  .filter((l) => l.trim() && !l.endsWith(".afm-hooks.json"));
if (status.status !== 0 || changed.length === 0) allow(); // sem repositório ou sem alterações

// Não repetir a verificação para o mesmo estado da árvore de trabalho.
const diff = run("git", ["diff", "HEAD"], { cwd: root }).stdout ?? "";
const fingerprint = createHash("sha1").update(status.stdout + diff).digest("hex");
const stateFile = join(tmpdir(), `afm-verify-${createHash("sha1").update(root).digest("hex").slice(0, 12)}.json`);
try {
  if (existsSync(stateFile) && JSON.parse(readFileSync(stateFile, "utf8")).fingerprint === fingerprint) allow();
} catch { /* ignora estado corrompido */ }

const timeout = Math.max(10, Number(verify.timeoutSeconds) || 120) * 1000;
const result = run(verify.command, [], { cwd: root, shell: true, timeout, maxBuffer: 10 * 1024 * 1024 });
if (result.error?.code === "ETIMEDOUT") allow(); // não travar por comando lento
if (result.status === 0) {
  try { writeFileSync(stateFile, JSON.stringify({ fingerprint })); } catch { /* ignora */ }
  allow();
}

const tail = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim().split("\n").slice(-40).join("\n");
block(`A verificação do projeto falhou (\`${verify.command}\`). Corrija a causa antes de encerrar; não enfraqueça os testes.\n\n${tail}`);
