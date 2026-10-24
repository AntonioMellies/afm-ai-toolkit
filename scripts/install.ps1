<#
.SYNOPSIS
  Instala as skills do afm-ai-toolkit nas pastas de skills de cada ferramenta.

.EXAMPLE
  .\scripts\install.ps1                                   # todas as skills em .agents/skills do diretório atual
  .\scripts\install.ps1 -Target claude -Scope global      # todas as skills em ~/.claude/skills
  .\scripts\install.ps1 -Target all -Skill clean-code-expert
  .\scripts\install.ps1 -Skill backend-engineering         # skill de grupo + as skills que ela referencia
  .\scripts\install.ps1 -List
  .\scripts\install.ps1 -Target claude -Scope global -Uninstall
#>
[CmdletBinding()]
param(
  # agents = .agents/skills (Codex, Cursor, Gemini CLI, Antigravity, Copilot)
  [ValidateSet('agents', 'claude', 'cursor', 'gemini', 'antigravity', 'copilot', 'all')]
  [string]$Target = 'agents',

  [ValidateSet('project', 'global')]
  [string]$Scope = 'project',

  # Raiz do projeto de destino quando -Scope project
  [string]$ProjectDir = (Get-Location).Path,

  # Instala só estas skills e as que elas referenciam (padrão: todas)
  [string[]]$Skill,

  [switch]$List,

  [switch]$Uninstall
)

$ErrorActionPreference = 'Stop'

$skillsDir = Join-Path (Split-Path $PSScriptRoot -Parent) 'skills'
$userHome = [Environment]::GetFolderPath('UserProfile')

$available = Get-ChildItem $skillsDir -Directory |
  Where-Object { Test-Path (Join-Path $_.FullName 'SKILL.md') } |
  Select-Object -ExpandProperty Name

if ($List) {
  $available
  return
}

$destinations = @{
  agents      = @{ project = '.agents/skills';  global = @("$userHome/.agents/skills") }
  claude      = @{ project = '.claude/skills';  global = @("$userHome/.claude/skills") }
  cursor      = @{ project = '.cursor/skills';  global = @("$userHome/.cursor/skills") }
  gemini      = @{ project = '.gemini/skills';  global = @("$userHome/.gemini/skills") }
  antigravity = @{ project = '.agents/skills';  global = @("$userHome/.gemini/config/skills", "$userHome/.gemini/antigravity-cli/skills") }
  copilot     = @{ project = '.github/skills';  global = @("$userHome/.copilot/skills") }
}

$targets = if ($Target -eq 'all') { 'agents', 'claude', 'cursor', 'gemini', 'antigravity', 'copilot' } else { @($Target) }
$selected = @(if ($Skill) { $Skill } else { $available })

foreach ($name in $selected) {
  if ($name -notin $available) {
    throw "Skill não encontrada: $name (use -List)"
  }
}

# Skills de grupo declaram as skills que referenciam em metadata.skills: "a b c"
function Get-SkillDependencies([string]$name) {
  $lines = Get-Content (Join-Path (Join-Path $skillsDir $name) 'SKILL.md') -Encoding UTF8
  for ($i = 1; $i -lt $lines.Count -and $lines[$i] -ne '---'; $i++) {
    if ($lines[$i] -match '^  skills: *"(.*)"$') { return -split $Matches[1] }
  }
}

# Inclui as dependências das skills de grupo (a desinstalação remove só as nomeadas)
if (-not $Uninstall) {
  foreach ($name in @($selected)) {
    foreach ($dep in Get-SkillDependencies $name) {
      if ($dep -notin $available) {
        throw "Dependência não encontrada: $dep (declarada em $name)"
      }
      if ($dep -in $selected) { continue }
      $selected += $dep
      Write-Host "dependência  $dep  (de $name)"
    }
  }
}

$done = @{}
foreach ($t in $targets) {
  $dests = if ($Scope -eq 'project') { @(Join-Path $ProjectDir $destinations[$t].project) } else { $destinations[$t].global }

  foreach ($dest in $dests) {
    $dest = [IO.Path]::GetFullPath($dest)
    if ($done.ContainsKey($dest)) { continue }
    $done[$dest] = $true

    foreach ($name in $selected) {
      $installed = Join-Path $dest $name
      if ($Uninstall) {
        if (Test-Path $installed) {
          Remove-Item $installed -Recurse -Force -Confirm:$false
          Write-Host "removida   $name  <-  $dest"
        }
      }
      else {
        New-Item -ItemType Directory -Force $dest | Out-Null
        if (Test-Path $installed) { Remove-Item $installed -Recurse -Force -Confirm:$false }
        Copy-Item (Join-Path $skillsDir $name) $installed -Recurse
        Write-Host "instalada  $name  ->  $dest"
      }
    }
  }
}
