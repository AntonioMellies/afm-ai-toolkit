// PostToolUse (Edit|Write|MultiEdit): formata o arquivo editado, por extensão.
// Só age quando a ferramenta existe E o projeto a usa (config presente); caso contrário
// sai em silêncio para não reformatar código fora do estilo do projeto.
import { existsSync, readFileSync } from "node:fs";
import { extname, join, resolve, isAbsolute } from "node:path";
import { readInput, loadConfig, isDisabled, allow, run, which } from "./lib.mjs";

const input = readInput();
const filePath = input?.tool_input?.file_path;
if (!filePath) allow();

const config = loadConfig(input.cwd);
if (isDisabled(config, "format-on-edit") || config.format?.disabled === true) allow();

const abs = isAbsolute(filePath) ? filePath : resolve(input.cwd || process.cwd(), filePath);
if (!existsSync(abs)) allow();
const root = config.root;
const ext = extname(abs).toLowerCase();

const has = (...names) => names.some((n) => existsSync(join(root, n)));
const pkg = () => {
  try { return JSON.parse(readFileSync(join(root, "package.json"), "utf8")); } catch { return {}; }
};
const pyproject = () => {
  try { return readFileSync(join(root, "pyproject.toml"), "utf8"); } catch { return ""; }
};
const localBin = (name) => {
  const f = join(root, "node_modules", ".bin", process.platform === "win32" ? `${name}.cmd` : name);
  return existsSync(f) ? f : null;
};

// Comando customizado por extensão: { "format": { "commands": { ".java": ["cmd", "{file}"] } } }
const custom = config.format?.commands?.[ext];
let cmd = null;
if (Array.isArray(custom) && custom.length) {
  cmd = custom.map((a) => (a === "{file}" ? abs : a));
} else if ([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".css"].includes(ext)) {
  const usesPrettier = has(".prettierrc", ".prettierrc.json", ".prettierrc.yaml", ".prettierrc.yml", ".prettierrc.js", "prettier.config.js", "prettier.config.mjs") || pkg().prettier;
  const bin = localBin("prettier");
  if (usesPrettier && bin) cmd = [bin, "--write", abs];
} else if (ext === ".go") {
  const gofmt = which("gofmt");
  if (gofmt) cmd = [gofmt, "-w", abs];
} else if (ext === ".py") {
  const toml = pyproject();
  const ruff = which("ruff");
  const black = which("black");
  if (ruff && (has("ruff.toml", ".ruff.toml") || toml.includes("[tool.ruff"))) cmd = [ruff, "format", abs];
  else if (black && toml.includes("[tool.black")) cmd = [black, "-q", abs];
}
if (!cmd) allow();

// Falha do formatter nunca bloqueia: o arquivo pode estar incompleto no meio da edição.
run(cmd[0], cmd.slice(1), { cwd: root, timeout: 20000, shell: cmd[0].toLowerCase().endsWith(".cmd") });
allow();
