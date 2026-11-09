// PreToolUse (Edit|Write|MultiEdit): bloqueia edição de arquivos sensíveis ou que o
// agente tende a alterar para "fazer passar" em vez de corrigir o código.
import { basename, relative, resolve, isAbsolute } from "node:path";
import { readInput, loadConfig, isDisabled, block, allow, run } from "./lib.mjs";

const ALLOWED_ENV = /^\.env\.(example|sample|template|dist)$/i;
const SECRET_NAMES = [
  /^\.env(\..+)?$/i,
  /\.(pem|key|p12|pfx|jks|keystore)$/i,
  /^id_(rsa|dsa|ecdsa|ed25519)(\.pub)?$/i,
  /^(credentials|secrets?)(\..+)?\.(json|ya?ml|toml)$/i,
  /^\.netrc$/i,
];
const LOCKFILES = [
  /^package-lock\.json$/, /^yarn\.lock$/, /^pnpm-lock\.yaml$/, /^bun\.lockb?$/,
  /^go\.sum$/, /^poetry\.lock$/, /^Pipfile\.lock$/, /^uv\.lock$/, /^Cargo\.lock$/,
  /^gradle\.lockfile$/, /^composer\.lock$/, /^Gemfile\.lock$/,
];
const LINT_CONFIGS = [
  /^\.eslintrc(\..+)?$/, /^eslint\.config\.(js|mjs|cjs|ts)$/, /^\.prettierrc(\..+)?$/,
  /^prettier\.config\.(js|mjs|cjs|ts)$/, /^ruff\.toml$/, /^\.ruff\.toml$/, /^\.golangci\.ya?ml$/,
  /^checkstyle\.xml$/, /^\.editorconfig$/, /^\.flake8$/, /^\.pylintrc$/,
];
const MIGRATION_DIR = /(^|\/)(db\/migrate|migrations?|flyway|liquibase|alembic\/versions|prisma\/migrations)(\/|$)/i;

function existsOnMainBranch(root, relPath) {
  for (const ref of ["origin/main", "origin/master", "main", "master"]) {
    if (run("git", ["rev-parse", "--verify", "--quiet", ref], { cwd: root }).status !== 0) continue;
    return run("git", ["cat-file", "-e", `${ref}:${relPath}`], { cwd: root }).status === 0;
  }
  return false; // sem referência principal: não dá para decidir, então permite
}

const input = readInput();
const filePath = input?.tool_input?.file_path;
if (!filePath) allow();

const config = loadConfig(input.cwd);
if (isDisabled(config, "protect-files")) allow();

const name = basename(filePath);
const extra = config.protectFiles ?? {};
const allowList = extra.allow ?? [];
if (allowList.includes(name)) allow();

if (!ALLOWED_ENV.test(name) && SECRET_NAMES.some((re) => re.test(name))) {
  block(`Bloqueado: ${name} pode conter segredos. Não edite arquivos de credenciais; peça ao usuário para alterá-lo. (Desligar: AFM_HOOKS_DISABLE=1)`);
}
if (LOCKFILES.some((re) => re.test(name))) {
  block(`Bloqueado: ${name} é lockfile gerado. Altere o manifesto de dependências e rode o gerenciador de pacotes em vez de editar o lockfile.`);
}
if (LINT_CONFIGS.some((re) => re.test(name))) {
  block(`Bloqueado: ${name} é configuração de lint/formatação. Corrija o código em vez de afrouxar a regra. Se a mudança de configuração for pedida pelo usuário, adicione "${name}" em protectFiles.allow no .afm-hooks.json.`);
}

const abs = isAbsolute(filePath) ? filePath : resolve(input.cwd || process.cwd(), filePath);
const root = config.root;
const rel = relative(root, abs).split("\\").join("/");
if (!rel.startsWith("..") && MIGRATION_DIR.test(rel) && existsOnMainBranch(root, rel)) {
  block(`Bloqueado: ${rel} é uma migration que já existe na branch principal e pode ter sido aplicada. Crie uma nova migration em vez de alterá-la.`);
}
allow();
