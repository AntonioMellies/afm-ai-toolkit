// Utilitários compartilhados pelos hooks do plugin afm-ai-toolkit.
// Regras de projeto: opt-out por AFM_HOOKS_DISABLE=1 ou `.afm-hooks.json`; qualquer
// erro inesperado termina em exit 0 (um hook nunca deve travar o trabalho).
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

export function readInput() {
  try {
    const raw = readFileSync(0, "utf8");
    return raw.trim() ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Procura `.afm-hooks.json` do diretório de trabalho até a raiz. */
export function loadConfig(cwd) {
  let dir = resolve(cwd || process.cwd());
  for (let i = 0; i < 25; i++) {
    const file = join(dir, ".afm-hooks.json");
    if (existsSync(file)) {
      try {
        return { root: dir, ...JSON.parse(readFileSync(file, "utf8")) };
      } catch {
        return { root: dir };
      }
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return { root: resolve(cwd || process.cwd()) };
}

/** true quando o usuário desligou os hooks (variável de ambiente ou config). */
export function isDisabled(config, hookName) {
  if (process.env.AFM_HOOKS_DISABLE === "1") return true;
  if (config.disabled === true) return true;
  if (Array.isArray(config.disabledHooks) && config.disabledHooks.includes(hookName)) return true;
  return false;
}

/** Bloqueia a ação: mensagem em stderr e exit 2 (o agente recebe o motivo). */
export function block(message) {
  process.stderr.write(message + "\n");
  process.exit(2);
}

export function allow() {
  process.exit(0);
}

export function run(cmd, args, options = {}) {
  return spawnSync(cmd, args, { encoding: "utf8", windowsHide: true, ...options });
}

/** Caminho do executável se existir no PATH (sem usar shell). */
export function which(cmd) {
  const finder = process.platform === "win32" ? "where" : "which";
  const r = run(finder, [cmd]);
  if (r.status !== 0 || !r.stdout) return null;
  return r.stdout.split(/\r?\n/).find(Boolean) || null;
}
