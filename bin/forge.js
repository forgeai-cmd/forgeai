#!/usr/bin/env node

// ForgeAI — The AI Skills Operating System
// CLI Entry Point
// Zero external dependencies — Node.js built-ins only

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ─── ANSI Colors (no chalk dependency) ──────────────────────────────────────

const c = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  dim:     '\x1b[2m',
  italic:  '\x1b[3m',
  under:   '\x1b[4m',
  red:     '\x1b[31m',
  green:   '\x1b[32m',
  yellow:  '\x1b[33m',
  blue:    '\x1b[34m',
  magenta: '\x1b[35m',
  cyan:    '\x1b[36m',
  white:   '\x1b[37m',
  gray:    '\x1b[90m',
  bgRed:   '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgBlue:  '\x1b[44m',
  bgCyan:  '\x1b[46m',
};

const paint = (color, text) => `${color}${text}${c.reset}`;
const bold = (text) => paint(c.bold, text);
const green = (text) => paint(c.green, text);
const red = (text) => paint(c.red, text);
const yellow = (text) => paint(c.yellow, text);
const cyan = (text) => paint(c.cyan, text);
const blue = (text) => paint(c.blue, text);
const dim = (text) => paint(c.dim, text);
const magenta = (text) => paint(c.magenta, text);

// ─── Paths ──────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const CONFIG_DIR = path.join(ROOT, '.forgeai');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
const PKG = require(path.join(ROOT, 'package.json'));

const GUMROAD_URL = 'https://forgeaicmd.gumroad.com/l/forgeai-pro';
const HOMEPAGE = 'https://github.com/forgeai-cmd/forgeai';

const SKILL_TIERS = ['free', 'pro', 'agency'];

// ─── Banner ─────────────────────────────────────────────────────────────────

function showBanner() {
  console.log('');
  console.log(cyan('  ╔═══════════════════════════════════════╗'));
  console.log(cyan('  ║') + bold('   ForgeAI                             ') + cyan('║'));
  console.log(cyan('  ║') + '   Your 12-person team in one CLI.     ' + cyan('║'));
  console.log(cyan('  ║') + '   Stop hiring. Start forging.         ' + cyan('║'));
  console.log(cyan('  ╚═══════════════════════════════════════╝'));
  console.log('');
}

// ─── Config ─────────────────────────────────────────────────────────────────

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    }
  } catch {
    // Corrupted config — start fresh
  }
  return { proUnlocked: false, agencyUnlocked: false, licenseKey: null, setupDone: false };
}

function saveConfig(config) {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

// ─── Skill Discovery ────────────────────────────────────────────────────────

function discoverSkills() {
  const skills = [];

  for (const tier of SKILL_TIERS) {
    const tierDir = path.join(SKILLS_DIR, tier);
    if (!fs.existsSync(tierDir)) continue;

    let entries;
    try {
      entries = fs.readdirSync(tierDir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const skillDir = path.join(tierDir, entry.name);
      const skillMd = path.join(skillDir, 'SKILL.md');

      if (!fs.existsSync(skillMd)) continue;

      const meta = parseSkillMd(skillMd);
      skills.push({
        name: entry.name,
        tier,
        dir: skillDir,
        file: skillMd,
        ...meta,
      });
    }
  }

  return skills;
}

function parseSkillMd(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const meta = {
    title: '',
    description: '',
    category: '',
    author: '',
    version: '',
  };

  // Extract frontmatter-style fields from first lines or YAML block
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    // Match "# Title" as skill title
    if (!meta.title && /^#\s+(.+)/.test(trimmed)) {
      meta.title = trimmed.replace(/^#\s+/, '');
      continue;
    }

    // Match key: value patterns
    const kvMatch = trimmed.match(/^(\w[\w\s]*?):\s*(.+)/);
    if (kvMatch) {
      const key = kvMatch[1].toLowerCase().trim().replace(/\s+/g, '_');
      const val = kvMatch[2].trim();
      if (key === 'description') meta.description = val;
      if (key === 'category') meta.category = val;
      if (key === 'author') meta.author = val;
      if (key === 'version') meta.version = val;
    }
  }

  // If no description found in frontmatter, use first non-heading, non-empty line
  if (!meta.description) {
    for (const line of lines) {
      const t = line.trim();
      if (t && !t.startsWith('#') && !t.startsWith('---') && !t.match(/^\w+:/)) {
        meta.description = t.substring(0, 120);
        break;
      }
    }
  }

  meta._raw = content;
  return meta;
}

function findSkill(name) {
  const skills = discoverSkills();
  return skills.find((s) => s.name === name) || null;
}

// ─── Tier Access ────────────────────────────────────────────────────────────

function isTierUnlocked(tier, config) {
  if (tier === 'free') return true;
  if (tier === 'pro') return config.proUnlocked || config.agencyUnlocked;
  if (tier === 'agency') return config.agencyUnlocked;
  return false;
}

function tierBadge(tier) {
  if (tier === 'free') return green('[FREE]');
  if (tier === 'pro') return yellow('[PRO]');
  if (tier === 'agency') return magenta('[AGENCY]');
  return dim('[?]');
}

// ─── Commands ───────────────────────────────────────────────────────────────

// forge version
function cmdVersion() {
  console.log(`${bold('ForgeAI')} v${PKG.version}`);
}

// forge list
function cmdList() {
  showBanner();
  const config = loadConfig();
  const skills = discoverSkills();

  if (skills.length === 0) {
    console.log(yellow('  No skills installed yet.'));
    console.log(dim('  Add skills to the skills/free/, skills/pro/, or skills/agency/ directories.'));
    console.log('');
    return;
  }

  // Group by tier
  const grouped = { free: [], pro: [], agency: [] };
  for (const s of skills) {
    if (grouped[s.tier]) grouped[s.tier].push(s);
  }

  const maxName = Math.max(...skills.map((s) => s.name.length), 12);

  for (const tier of SKILL_TIERS) {
    const list = grouped[tier];
    if (list.length === 0) continue;

    const unlocked = isTierUnlocked(tier, config);
    const header = tier.toUpperCase();
    const lock = unlocked ? green(' (unlocked)') : red(' (locked)');

    console.log(`  ${bold(header)} Skills${tier !== 'free' ? lock : ''}`);
    console.log(dim('  ' + '─'.repeat(50)));

    for (const s of list) {
      const name = s.name.padEnd(maxName + 2);
      const desc = s.description ? dim(s.description.substring(0, 50)) : '';
      const badge = tierBadge(tier);

      if (unlocked || tier === 'free') {
        console.log(`    ${green('●')} ${bold(name)} ${desc}`);
      } else {
        console.log(`    ${red('○')} ${dim(name)} ${badge} ${desc}`);
      }
    }
    console.log('');
  }

  const totalFree = grouped.free.length;
  const totalPro = grouped.pro.length;
  const totalAgency = grouped.agency.length;
  const total = skills.length;

  console.log(dim(`  ${total} skill${total !== 1 ? 's' : ''} found (${totalFree} free, ${totalPro} pro, ${totalAgency} agency)`));
  console.log('');
}

// forge help [skill-name]
function cmdHelp(skillName) {
  if (!skillName) {
    showUsage();
    return;
  }

  const skill = findSkill(skillName);
  if (!skill) {
    console.log(red(`  Error: Skill "${skillName}" not found.`));
    console.log(dim(`  Run ${bold('forge list')} to see available skills.`));
    console.log('');
    return;
  }

  showBanner();
  console.log(`  ${bold(skill.title || skill.name)} ${tierBadge(skill.tier)}`);
  console.log(dim('  ' + '─'.repeat(50)));

  if (skill.description) console.log(`  ${skill.description}`);
  if (skill.category) console.log(`  ${dim('Category:')} ${skill.category}`);
  if (skill.version) console.log(`  ${dim('Version:')}  ${skill.version}`);
  if (skill.author) console.log(`  ${dim('Author:')}   ${skill.author}`);

  console.log('');
  console.log(`  ${dim('Location:')} ${skill.dir}`);
  console.log(`  ${dim('Usage:')}    forge ${skill.name} [args]`);
  console.log('');
}

// forge upgrade
function cmdUpgrade() {
  showBanner();
  console.log(`  ${bold('Upgrade to ForgeAI Pro')}`);
  console.log(dim('  ' + '─'.repeat(50)));
  console.log('');
  console.log(`  ${yellow('Unlock 30 Pro skills')} — your 12-person team:`);
  console.log(`  SEO, video (Remotion), ads, legal, finance, content & more.`);
  console.log(`  One purchase. $29. Works forever.`);
  console.log('');
  console.log(`  ${bold('Get Pro:')} ${cyan(GUMROAD_URL)}`);
  console.log('');
  console.log(dim('  After purchase, run:'));
  console.log(`  ${bold('forge setup')} and enter your license key.`);
  console.log('');
}

// forge install
function cmdInstall() {
  showBanner();
  const config = loadConfig();

  // Ensure directories exist
  for (const tier of SKILL_TIERS) {
    const dir = path.join(SKILLS_DIR, tier);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(green(`  Created ${tier}/ skills directory.`));
    }
  }

  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }

  if (!config.setupDone) {
    config.setupDone = true;
    saveConfig(config);
  }

  console.log(green('  ForgeAI installed successfully.'));
  console.log('');
  console.log(dim('  Next steps:'));
  console.log(`    1. Add skills to ${dim('skills/free/')} or ${dim('skills/pro/')}`);
  console.log(`    2. Run ${bold('forge list')} to see installed skills`);
  console.log(`    3. Run ${bold('forge setup')} to configure preferences`);
  console.log('');
}

// forge setup (interactive)
async function cmdSetup() {
  showBanner();
  const config = loadConfig();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (question) =>
    new Promise((resolve) => {
      rl.question(question, (answer) => resolve(answer.trim()));
    });

  console.log(`  ${bold('ForgeAI Setup')}`);
  console.log(dim('  ' + '─'.repeat(50)));
  console.log('');

  // License key
  const keyPrompt = config.licenseKey
    ? `  License key ${green('[already set]')} — enter new or press Enter to keep: `
    : `  License key (leave blank for free tier): `;

  const key = await ask(keyPrompt);

  if (key) {
    // Simple validation: non-empty string
    config.licenseKey = key;

    // Determine tier from key format
    if (key.toLowerCase().startsWith('agency-') || key.toLowerCase().startsWith('ag-')) {
      config.proUnlocked = true;
      config.agencyUnlocked = true;
      console.log(green('  Agency license activated. All skills unlocked.'));
    } else if (key.toLowerCase().startsWith('pro-') || key.length >= 8) {
      config.proUnlocked = true;
      config.agencyUnlocked = false;
      console.log(green('  Pro license activated. Pro skills unlocked.'));
    } else {
      console.log(yellow('  Unrecognized key format. Saving for verification.'));
    }
  } else if (!config.licenseKey) {
    console.log(dim('  Continuing with free tier.'));
  }

  config.setupDone = true;
  saveConfig(config);

  console.log('');
  console.log(green('  Setup complete.'));
  console.log(dim(`  Config saved to ${CONFIG_FILE}`));
  console.log('');

  rl.close();
}

// forge create [name]
function cmdCreate(name) {
  if (!name) {
    console.log(red('  Error: Please provide a skill name.'));
    console.log(dim('  Usage: forge create my-skill'));
    console.log('');
    return;
  }

  // Sanitize name
  const safeName = name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  if (!safeName) {
    console.log(red('  Error: Invalid skill name.'));
    return;
  }

  const skillDir = path.join(SKILLS_DIR, 'free', safeName);

  if (fs.existsSync(skillDir)) {
    console.log(red(`  Error: Skill "${safeName}" already exists at ${skillDir}`));
    return;
  }

  // Ensure parent exists
  const parentDir = path.join(SKILLS_DIR, 'free');
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }

  fs.mkdirSync(skillDir, { recursive: true });

  const skillMd = `# ${safeName}

Description: A custom ForgeAI skill
Category: custom
Version: 1.0.0
Author: You

---

## Instructions

Describe what this skill does and how Claude Code should execute it.

## Usage

\`\`\`
forge ${safeName} [args]
\`\`\`

## Steps

1. Step one
2. Step two
3. Step three
`;

  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillMd, 'utf-8');

  console.log('');
  console.log(green(`  Skill "${safeName}" created successfully.`));
  console.log('');
  console.log(dim('  Files:'));
  console.log(`    ${path.join(skillDir, 'SKILL.md')}`);
  console.log('');
  console.log(dim('  Edit SKILL.md to define your skill instructions,'));
  console.log(dim('  then run:'));
  console.log(`    ${bold(`forge ${safeName}`)}`);
  console.log('');
}

// forge [skill-name] [args] — run a skill
function cmdRunSkill(skillName, args) {
  const skill = findSkill(skillName);

  if (!skill) {
    console.log(red(`  Error: Unknown command or skill "${skillName}".`));
    console.log('');
    console.log(dim('  Did you mean one of these?'));
    console.log(`    ${bold('forge list')}      — see available skills`);
    console.log(`    ${bold('forge help')}      — show usage info`);
    console.log(`    ${bold('forge install')}   — set up ForgeAI`);
    console.log('');

    // Fuzzy suggestions
    const skills = discoverSkills();
    const suggestions = skills
      .filter((s) => s.name.includes(skillName) || skillName.includes(s.name))
      .slice(0, 3);

    if (suggestions.length > 0) {
      console.log(dim('  Similar skills:'));
      for (const s of suggestions) {
        console.log(`    ${bold(`forge ${s.name}`)} ${tierBadge(s.tier)}`);
      }
      console.log('');
    }

    process.exit(1);
  }

  const config = loadConfig();
  const unlocked = isTierUnlocked(skill.tier, config);

  if (!unlocked) {
    console.log('');
    console.log(red(`  This skill requires ${bold(skill.tier.toUpperCase())} access.`));
    console.log('');
    console.log(`  ${bold('Upgrade now:')} ${cyan(GUMROAD_URL)}`);
    console.log('');
    console.log(dim('  After purchase, run:'));
    console.log(`    ${bold('forge setup')}`);
    console.log(dim('  and enter your license key to unlock all Pro skills.'));
    console.log('');
    process.exit(0);
  }

  // Skill is accessible — output instructions for Claude Code
  const argsStr = args.length > 0 ? args.join(' ') : '';

  console.log('');
  console.log(`${cyan('>>>')} ${bold(`Running skill: ${skill.title || skill.name}`)} ${tierBadge(skill.tier)}`);
  if (argsStr) {
    console.log(`${dim('    Args:')} ${argsStr}`);
  }
  console.log(dim('─'.repeat(60)));
  console.log('');

  // Output the SKILL.md content for Claude Code to consume
  console.log(skill._raw);

  if (argsStr) {
    console.log('');
    console.log(dim('─'.repeat(60)));
    console.log(`${bold('User arguments:')} ${argsStr}`);
  }
}

// ─── Usage ──────────────────────────────────────────────────────────────────

function showUsage() {
  showBanner();
  console.log(`  ${bold('Usage:')} forge ${dim('<command>')} ${dim('[args]')}`);
  console.log('');
  console.log(`  ${bold('Commands:')}`);
  console.log('');
  console.log(`    ${bold('forge list')}                  List all installed skills`);
  console.log(`    ${bold('forge install')}               Install/setup ForgeAI directories`);
  console.log(`    ${bold('forge setup')}                 Interactive setup (license key, prefs)`);
  console.log(`    ${bold('forge <skill>')} ${dim('[args]')}        Run a skill`);
  console.log(`    ${bold('forge help')} ${dim('<skill>')}          Show help for a specific skill`);
  console.log(`    ${bold('forge upgrade')}               Show Pro upgrade info`);
  console.log(`    ${bold('forge create')} ${dim('<name>')}         Scaffold a new custom skill`);
  console.log(`    ${bold('forge version')}               Show version`);
  console.log('');
  console.log(`  ${bold('Examples:')}`);
  console.log('');
  console.log(`    ${dim('$')} forge list`);
  console.log(`    ${dim('$')} forge seo-audit https://example.com`);
  console.log(`    ${dim('$')} forge create my-workflow`);
  console.log(`    ${dim('$')} forge help seo-audit`);
  console.log('');
  console.log(`  ${dim('Docs:')}    ${cyan(HOMEPAGE)}`);
  console.log(`  ${dim('Pro:')}     ${cyan(GUMROAD_URL)}`);
  console.log('');
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || '';
  const rest = args.slice(1);

  switch (command) {
    case '':
    case '-h':
    case '--help':
      showUsage();
      break;

    case 'version':
    case '-v':
    case '--version':
      cmdVersion();
      break;

    case 'list':
    case 'ls':
      cmdList();
      break;

    case 'install':
      cmdInstall();
      break;

    case 'setup':
    case 'config':
      await cmdSetup();
      break;

    case 'upgrade':
    case 'pro':
      cmdUpgrade();
      break;

    case 'create':
    case 'new':
      cmdCreate(rest[0]);
      break;

    case 'help':
      cmdHelp(rest[0]);
      break;

    default:
      // Treat as skill name
      cmdRunSkill(command, rest);
      break;
  }
}

main().catch((err) => {
  console.error(red(`  Fatal error: ${err.message}`));
  process.exit(1);
});
