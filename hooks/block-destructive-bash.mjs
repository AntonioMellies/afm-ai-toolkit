// PreToolUse (Bash): bloqueia comandos destrutivos óbvios.
// É uma guarda contra acidentes, NÃO uma fronteira de segurança: regex é contornável.
import { readInput, loadConfig, isDisabled, block, allow } from "./lib.mjs";

/** Remove o conteúdo de strings entre aspas para não casar texto de mensagens. */
function stripQuoted(cmd) {
  return cmd.replace(/'[^']*'/g, "''").replace(/"(?:\\.|[^"\\])*"/g, '""');
}

const RULES = [
  { re: /\brm\s+(-[a-zA-Z]*[rR][a-zA-Z]*[fF]?|-[a-zA-Z]*[fF][a-zA-Z]*[rR]|--recursive)\b[^;&|]*\s(\/|~|\$HOME|\.|\*|\.\.)(\s|$)/, why: "rm -rf em raiz, home, diretório atual ou curinga" },
  { re: /\bgit\s+push\b[^;&|]*(\s--force(?!-with-lease)\b|\s-f\b)/, why: "git push --force (use --force-with-lease só com autorização explícita)" },
  { re: /\bgit\s+reset\s+--hard\b/, why: "git reset --hard descarta trabalho não commitado" },
  { re: /\bgit\s+clean\b[^;&|]*\s-[a-zA-Z]*f/, why: "git clean -f apaga arquivos não versionados" },
  { re: /\bgit\s+(checkout|restore)\b[^;&|]*\s(--\s+)?\.(\s|$)/, why: "descarta todas as alterações do diretório de trabalho" },
  { re: /\bgit\s+branch\s+-D\b/, why: "git branch -D apaga branch sem checar merge" },
  { re: /\bdrop\s+(database|schema|table)\b/i, why: "DROP em banco de dados", sql: true },
  { re: /\btruncate\s+table\b/i, why: "TRUNCATE TABLE", sql: true },
  { re: /\b(kubectl|helm)\b[^;&|]*\s(--context[= ]\S*prod\S*|-n\s+\S*prod\S*|--namespace[= ]\S*prod\S*)/i, why: "comando kubectl/helm em contexto de produção" },
  { re: /\bkubectl\s+delete\b[^;&|]*(--all\b|\bnamespace\b|\bns\b)/, why: "kubectl delete em massa" },
  { re: /\bterraform\s+(apply|destroy)\b[^;&|]*(prod|production)/i, why: "terraform em produção" },
  { re: /\bterraform\s+destroy\b/, why: "terraform destroy" },
  { re: /\bchmod\s+-R\s+0?777\b/, why: "chmod -R 777" },
];

const input = readInput();
const command = input?.tool_input?.command;
if (typeof command !== "string" || !command) allow();

const config = loadConfig(input.cwd);
if (isDisabled(config, "block-destructive-bash")) allow();

const allowPatterns = (config.blockDestructiveBash?.allow ?? []).map((p) => new RegExp(p));
const DB_CLIENT = /\b(psql|mysql|mariadb|sqlite3|sqlcmd|mongosh|clickhouse-client)\b/;
const SPLIT = /;|&&|\|\||\||\n/;
const segments = stripQuoted(command).split(SPLIT);
const rawSegments = command.split(SPLIT);
for (let i = 0; i < segments.length; i++) {
  const segment = segments[i];
  if (allowPatterns.some((re) => re.test(segment))) continue;
  for (const rule of RULES) {
    // SQL entre aspas só conta quando o comando chama um cliente de banco de dados.
    const target = rule.sql && DB_CLIENT.test(segment) ? (rawSegments[i] ?? segment) : segment;
    if (rule.re.test(target)) {
      block(`Bloqueado: ${rule.why}. Se for intencional, peça confirmação ao usuário e execute-o ele mesmo (ou use AFM_HOOKS_DISABLE=1).`);
    }
  }
}
allow();
