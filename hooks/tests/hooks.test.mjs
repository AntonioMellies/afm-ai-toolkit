import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const hook = (name) => join(here, "..", `${name}.mjs`);

function runHook(name, payload, { env = {}, cwd } = {}) {
  return spawnSync(process.execPath, [hook(name)], {
    input: JSON.stringify(payload),
    encoding: "utf8",
    cwd,
    env: { ...process.env, AFM_HOOKS_DISABLE: "", ...env },
  });
}
const tmp = () => mkdtempSync(join(tmpdir(), "afm-hook-"));
const git = (cwd, ...args) => spawnSync("git", args, { cwd, encoding: "utf8" });

// ---------- protect-files ----------
test("protect-files bloqueia .env e permite .env.example", () => {
  const cwd = tmp();
  const blocked = runHook("protect-files", { cwd, tool_input: { file_path: join(cwd, ".env") } });
  assert.equal(blocked.status, 2);
  assert.match(blocked.stderr, /segredos/);
  const ok = runHook("protect-files", { cwd, tool_input: { file_path: join(cwd, ".env.example") } });
  assert.equal(ok.status, 0);
});

test("protect-files bloqueia lockfile e config de lint, permite código", () => {
  const cwd = tmp();
  assert.equal(runHook("protect-files", { cwd, tool_input: { file_path: join(cwd, "package-lock.json") } }).status, 2);
  assert.equal(runHook("protect-files", { cwd, tool_input: { file_path: join(cwd, ".eslintrc.json") } }).status, 2);
  assert.equal(runHook("protect-files", { cwd, tool_input: { file_path: join(cwd, "src", "app.ts") } }).status, 0);
});

test("protect-files respeita protectFiles.allow e o opt-out", () => {
  const cwd = tmp();
  writeFileSync(join(cwd, ".afm-hooks.json"), JSON.stringify({ protectFiles: { allow: [".eslintrc.json"] } }));
  assert.equal(runHook("protect-files", { cwd, tool_input: { file_path: join(cwd, ".eslintrc.json") } }).status, 0);
  const cwd2 = tmp();
  const off = runHook("protect-files", { cwd: cwd2, tool_input: { file_path: join(cwd2, ".env") } }, { env: { AFM_HOOKS_DISABLE: "1" } });
  assert.equal(off.status, 0);
});

test("protect-files bloqueia migration que já existe na branch principal", () => {
  const cwd = tmp();
  git(cwd, "init", "-q", "-b", "main");
  git(cwd, "config", "user.email", "t@t");
  git(cwd, "config", "user.name", "t");
  mkdirSync(join(cwd, "db", "migrations"), { recursive: true });
  writeFileSync(join(cwd, "db", "migrations", "001_init.sql"), "select 1;");
  git(cwd, "add", ".");
  git(cwd, "commit", "-q", "-m", "init");
  const existing = runHook("protect-files", { cwd, tool_input: { file_path: join(cwd, "db", "migrations", "001_init.sql") } });
  assert.equal(existing.status, 2);
  const created = runHook("protect-files", { cwd, tool_input: { file_path: join(cwd, "db", "migrations", "002_new.sql") } });
  assert.equal(created.status, 0);
});

test("protect-files sai em silêncio com entrada vazia ou inválida", () => {
  const r = spawnSync(process.execPath, [hook("protect-files")], { input: "não é json", encoding: "utf8" });
  assert.equal(r.status, 0);
});

// ---------- block-destructive-bash ----------
const bash = (command, opts) => runHook("block-destructive-bash", { cwd: tmp(), tool_input: { command } }, opts);

test("block-destructive-bash bloqueia comandos destrutivos", () => {
  for (const c of [
    "rm -rf /", "rm -rf ~", "rm -rf .", "rm -fr *",
    "git push --force origin main", "git push -f", "git reset --hard HEAD~1",
    "git clean -fd", "git checkout .", "git branch -D feature",
    "psql -c 'x' && psql -c \"DROP TABLE users\"".replace("'x'", "x"),
    "kubectl delete pods --all", "kubectl --context prod-eu get pods",
  ]) {
    assert.equal(bash(c).status, 2, `deveria bloquear: ${c}`);
  }
});

test("block-destructive-bash permite comandos comuns e texto entre aspas", () => {
  for (const c of [
    "rm -rf node_modules", "rm -rf ./build", "git push origin feature", "git push --force-with-lease origin feature",
    "git status", "git commit -m \"nunca use git reset --hard\"", "echo 'rm -rf /'", "ls -la", "npm test",
  ]) {
    assert.equal(bash(c).status, 0, `deveria permitir: ${c}`);
  }
});

test("block-destructive-bash respeita opt-out por variável e por allow na config", () => {
  assert.equal(bash("git reset --hard", { env: { AFM_HOOKS_DISABLE: "1" } }).status, 0);
  const cwd = tmp();
  writeFileSync(join(cwd, ".afm-hooks.json"), JSON.stringify({ blockDestructiveBash: { allow: ["^git reset --hard"] } }));
  assert.equal(runHook("block-destructive-bash", { cwd, tool_input: { command: "git reset --hard" } }).status, 0);
});

// ---------- format-on-edit ----------
test("format-on-edit não faz nada (exit 0) sem ferramenta ou config", () => {
  const cwd = tmp();
  const f = join(cwd, "a.ts");
  writeFileSync(f, "const a   =  1");
  const r = runHook("format-on-edit", { cwd, tool_input: { file_path: f } });
  assert.equal(r.status, 0);
  assert.equal(r.stderr, "");
});

test("format-on-edit executa comando customizado da config", () => {
  const cwd = tmp();
  const f = join(cwd, "a.txt2");
  writeFileSync(f, "x");
  const script = join(cwd, "fmt.mjs");
  writeFileSync(script, `import {writeFileSync} from "node:fs"; writeFileSync(process.argv[2], "formatado");`);
  writeFileSync(join(cwd, ".afm-hooks.json"), JSON.stringify({ format: { commands: { ".txt2": [process.execPath, script, "{file}"] } } }));
  const r = runHook("format-on-edit", { cwd, tool_input: { file_path: f } });
  assert.equal(r.status, 0);
  assert.equal(spawnSync(process.execPath, ["-e", `process.stdout.write(require("fs").readFileSync(${JSON.stringify(f)},"utf8"))`], { encoding: "utf8" }).stdout, "formatado");
});

// ---------- verify-before-stop ----------
function repoWithChange(config) {
  const cwd = tmp();
  git(cwd, "init", "-q", "-b", "main");
  git(cwd, "config", "user.email", "t@t");
  git(cwd, "config", "user.name", "t");
  writeFileSync(join(cwd, "a.txt"), "1");
  git(cwd, "add", ".");
  git(cwd, "commit", "-q", "-m", "init");
  writeFileSync(join(cwd, "a.txt"), `2-${Math.random()}`);
  if (config) writeFileSync(join(cwd, ".afm-hooks.json"), JSON.stringify(config));
  return cwd;
}
const nodeCmd = (code) => `"${process.execPath}" -e "${code}"`;

test("verify-before-stop sem config não faz nada", () => {
  const cwd = repoWithChange(null);
  assert.equal(runHook("verify-before-stop", { cwd }).status, 0);
});

test("verify-before-stop bloqueia quando o comando falha e passa quando ok", () => {
  const failing = repoWithChange({ verify: { command: nodeCmd("console.error('falhou o teste X');process.exit(1)") } });
  const r = runHook("verify-before-stop", { cwd: failing });
  assert.equal(r.status, 2);
  assert.match(r.stderr, /falhou o teste X/);
  const passing = repoWithChange({ verify: { command: nodeCmd("process.exit(0)") } });
  assert.equal(runHook("verify-before-stop", { cwd: passing }).status, 0);
});

test("verify-before-stop não entra em loop (stop_hook_active) e ignora árvore limpa", () => {
  const cwd = repoWithChange({ verify: { command: nodeCmd("process.exit(1)") } });
  assert.equal(runHook("verify-before-stop", { cwd, stop_hook_active: true }).status, 0);
  git(cwd, "checkout", "--", "a.txt");
  assert.equal(runHook("verify-before-stop", { cwd }).status, 0);
});
