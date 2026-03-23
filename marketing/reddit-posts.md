# ForgeAI Reddit Launch Posts

---

## 1. r/SideProject

**Title:** I built a CLI that installs 150+ AI skills in one command -- here's the weird journey

**Body:**

Hey everyone. Been lurking here for a while, figured it's time to share what I've been working on.

I use Claude Code daily for client work -- SEO, lead gen, marketing, dev. Over the past year I accumulated over 150 custom AI skills (think: slash commands that do real work). Keyword research, competitor analysis, invoice generation, content writing, technical audits -- you name it.

The problem was managing them. Skills scattered across folders, no way to browse or install them cleanly, no versioning. So I built ForgeAI.

**What it does:** It's basically a package manager for AI skills. One CLI install, then you can browse, install, and run 150+ skills that plug directly into Claude Code. Think npm but for AI workflows.

**What I learned building it:**

- People don't want "AI tools" -- they want specific outcomes. "Write me a blog post" is too vague. "Run a technical SEO audit with 18 criteria and output a PDF" is what actually saves time.
- Bundling skills into categories (SEO, marketing, business, dev) made adoption way easier than a flat list.
- Free tier matters more than I expected. 15 free skills got more traction in testing than any landing page copy.

**Pricing:** 15 skills free forever, Pro is $29/mo (all skills), Agency is $99/mo (team features).

Repo: [GITHUB_LINK]

Happy to answer questions about the build or the business side. And if you have skill ideas, I'm all ears -- the catalog is growing weekly.

---

## 2. r/EntrepreneurRideAlong

**Title:** Building a business selling AI skills as a subscription -- month 1 numbers and strategy

**Body:**

Wanted to share this because it's a business model I haven't seen discussed much here.

**The backstory:** I run a small agency (SEO + lead gen). Over the past year, I built 150+ AI skill scripts to automate my own work -- things like keyword research, competitor analysis, content audits, schema markup generation, client reporting. Each one is a reusable command that plugs into Claude Code and does a specific job.

Clients started asking "how do you do that so fast?" and I realized the skills themselves were the product.

**What ForgeAI is:** A CLI tool that lets you browse, install, and run AI skills. One install command, then you pick what you need. Skills cover SEO, marketing, sales, content, dev, business ops.

**The business model:**

- Free tier: 15 skills (enough to be genuinely useful, not a teaser)
- Pro: $29/mo -- full access to 150+ skills
- Agency: $99/mo -- team seats, priority support, custom skill requests

**Why I think this works:**

1. AI tools are everywhere but most are too generic. Nobody needs another "write me an email" tool. They need "write a cold outreach email for a dental clinic in Ohio using this template framework." That specificity is the moat.
2. Skills compound. Once someone has 10 skills in their workflow, switching cost is real.
3. The catalog grows every week. Each new skill makes the subscription more valuable without raising the price.

**Where I am now:** Soft launch phase, getting early users, iterating on the install experience. Not profitable yet -- this is a ride-along from the start.

Repo: [GITHUB_LINK]

Would love feedback on the pricing or go-to-market. Anyone else selling AI workflows as a product?

---

## 3. r/ClaudeAI

**Title:** I organized 150+ Claude Code skills into a single CLI tool with browsing, install, and categories

**Body:**

If you use Claude Code heavily, you probably have a growing collection of custom skills (the /slash-command files in ~/.claude/skills/). I hit 150+ and it became unmanageable, so I built a tool to fix it.

**ForgeAI** is a CLI that acts as a skill registry and installer for Claude Code. You browse a catalog, pick what you need, and it drops the skill files into the right directory. Next time you open Claude Code, the skills are available as slash commands.

**How it works technically:**

- Skills are organized into categories: SEO (15 skills), marketing (10), business (14), dev tools, content, and more
- Each skill is a structured prompt file with metadata (description, category, version, dependencies)
- The CLI handles install, update, and removal -- no manual file copying
- Skills can reference each other (e.g., /competitor-analysis feeds into /content-gap-analysis)

**Some examples of what the skills do:**

- /technical-seo -- runs an 18-criteria audit, outputs structured findings
- /schema-markup-generator -- generates JSON-LD from page content
- /keyword-research -- keyword analysis with intent classification
- /invoice-organizer -- parses and organizes invoice data
- /copywriting -- produces copy following specific persuasion frameworks

**Free tier:** 15 skills, no time limit. Pro ($29/mo) unlocks everything. Agency ($99/mo) adds team features.

The whole point is that Claude Code is powerful but skills make it practical for repeated business workflows. Instead of re-explaining what you want every session, you just run a command.

Repo: [GITHUB_LINK]

Curious if others have been building skill libraries and how you manage them.

---

## 4. r/ChatGPT

**Title:** I made a tool that turns AI into a business operating system -- 150+ specific skills you can install and run

**Body:**

I got tired of generic AI prompts that produce generic output. So over the past year I built specialized AI skills for every part of my business -- SEO audits, competitor research, content writing, lead generation, client reporting, invoicing, email campaigns, the list kept growing.

Now there are 150+ of them and I packaged them into a tool called ForgeAI.

**The idea is simple:** Instead of asking AI to "help me with marketing," you run a specific skill like /keyword-research or /competitor-analysis or /technical-seo and get structured, actionable output every time. Each skill knows exactly what to ask for, what format to output, and how to chain into the next step.

**Categories include:**

- SEO (15 skills) -- on-page, off-page, technical, local, schema, content gaps
- Marketing (10 skills) -- social media strategy, copywriting, paid ads, email campaigns, CRO
- Business ops (14 skills) -- sales enablement, lead research, invoices, meeting notes, analytics
- Content (multiple) -- research + writing with consistent voice, content refresh, meta optimization
- Dev tools -- webapp testing, API building, frontend design

It currently works with Claude Code (CLI), and the skills install in one command.

**Pricing:** 15 skills free. Pro is $29/mo for everything. Agency is $99/mo for teams.

[GITHUB_LINK]

Not trying to replace any existing tools -- this is for people who already use AI daily and want repeatable, specific workflows instead of starting from scratch every conversation.

---

## 5. r/Marketing

**Title:** 15 free AI marketing skills that replaced 3 separate tools for me

**Body:**

I work in SEO and lead gen. Over the past year I went from paying for multiple marketing tools to running AI skills that do the same work -- often better because I customized them to my exact workflow.

I packaged them into a tool called ForgeAI. 15 of the marketing-focused skills are free, no catch.

**The free skills that actually moved the needle for me:**

- **Keyword research** -- not just volume data, but intent classification and content angle suggestions. I stopped using my old keyword tool for initial research.
- **On-page SEO auditor** -- checks title tags, meta descriptions, headers, internal links, schema. Outputs a prioritized fix list. Replaced manual audits.
- **Competitor analysis** -- pulls apart what competitors are doing across content, backlinks, and positioning. Took me 2 hours manually, now takes 5 minutes.
- **Content gap analysis** -- finds topics your competitors rank for that you don't. This one directly led to 3 new pages that now drive traffic.
- **Copywriting** -- follows actual persuasion frameworks (PAS, AIDA, BAB) instead of producing generic "engaging content." I use this for landing pages and email sequences.

**The stuff that's behind the paywall ($29/mo Pro):**

More specialized skills -- local SEO optimization, schema markup generator, paid ads analysis, CRO conversion optimization, social media strategy per platform, email marketing campaigns, growth analytics.

In total there are 150+ skills across marketing, SEO, business, dev, and content. They run through Claude Code (a CLI tool from Anthropic).

[GITHUB_LINK]

Genuinely curious what marketing workflows you'd want automated. I'm adding new skills weekly and real use cases are more valuable than my own guesses.

---

## 6. r/Freelance

**Title:** I automated 80% of my admin work with AI skills -- here's exactly what and how

**Body:**

I run a small SEO/lead gen operation. Just me and one setter. The admin side was eating my time -- writing proposals, doing audits, researching prospects, formatting reports, managing outreach campaigns, handling invoices.

Over the past year I built AI skills for each of those tasks. Not generic ChatGPT prompts -- actual structured commands that take inputs and produce finished outputs every time.

**What I automated and roughly how much time it saves weekly:**

- **Prospect research** -- skill pulls apart a potential client's web presence, competitors, and gaps. Was 45 min per prospect, now 5 min. (~3 hours/week saved)
- **Technical SEO audits** -- 18-criteria audit with prioritized findings. Was half a day, now 20 minutes. (~4 hours/week)
- **Proposal content** -- skill generates a customized proposal draft based on the audit findings. I edit for 10 minutes instead of writing for an hour. (~2 hours/week)
- **Outreach emails** -- templates per industry, personalized per prospect. Batch of 20 takes 5 minutes. (~1.5 hours/week)
- **Client reporting** -- pulls metrics and formats into a readable report. (~1 hour/week)
- **Invoice organization** -- parses, categorizes, tracks. Small time save but removes mental overhead.

Total: roughly 12 hours/week back. That's either more client work or actual free time.

I packaged all of this into ForgeAI -- a CLI tool with 150+ skills. 15 are free. Full access is $29/mo. There's an agency tier at $99/mo for teams.

[GITHUB_LINK]

The skills run through Claude Code. If you're not using that yet, it's Anthropic's CLI tool -- works in your terminal.

I'm not saying this replaces expertise. You still need to know what good SEO looks like to verify the output. But the grunt work? That part is gone.

---

## 7. Hacker News (Show HN)

**Title:** Show HN: ForgeAI -- 150+ AI skills for business, one CLI install

**Body:**

ForgeAI is a skill registry and CLI for Claude Code. It lets you browse, install, and manage reusable AI skills that run as slash commands. Think of it as a package manager for AI workflows.

The problem it solves: power users of Claude Code end up with dozens of custom skill files scattered across directories, with no versioning, no discoverability, and no way to share them. ForgeAI gives structure to that. Skills have metadata (category, version, description, dependencies), install cleanly, and update through the CLI.

The catalog currently has 150+ skills across SEO (audits, keyword research, schema markup, competitor analysis), marketing (copywriting, social media, paid ads, email campaigns, CRO), business operations (lead research, invoicing, meeting notes, sales enablement), and development (testing, frontend design, API building). Each skill is a structured prompt with defined inputs, outputs, and chaining capabilities -- not a wrapper around "ask the AI nicely."

Free tier includes 15 skills with no expiration. Pro is $29/month for full catalog access. Agency is $99/month with team management.

[GITHUB_LINK]
