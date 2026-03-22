# Contributing to ForgeAI

Thank you for your interest in contributing to ForgeAI! This guide will help you get started.

## Creating a New Skill

1. Create a new folder inside `skills/` with your skill name.
2. Add a `SKILL.md` file inside that folder. This file defines your skill.

### Directory Structure

```
skills/
  my-new-skill/
    SKILL.md
```

## SKILL.md Format

Every `SKILL.md` must follow this structure:

```markdown
---
name: my-skill-name
description: A concise one-line description of what this skill does.
---

# Skill Title

Your skill instructions in Markdown. This body is the prompt that guides
the AI when the skill is invoked.

## Sections

Break your instructions into clear sections as needed.
```

### Frontmatter Requirements

- **name** (required) -- Lowercase, hyphen-separated identifier for the skill.
- **description** (required) -- A short, clear summary of the skill's purpose.

### Markdown Body

The body after the frontmatter contains the full skill instructions. Use clear headings, lists, and examples to make the skill behavior unambiguous.

## Skill Naming Conventions

- Use **lowercase** letters only.
- Separate words with **hyphens** (e.g., `content-writer`, `seo-auditor`).
- Names should be **descriptive** and reflect what the skill does.
- Keep names concise -- aim for 2-3 words maximum.
- Avoid generic names like `helper` or `tool`. Be specific.

## Quality Standards

All contributed skills must meet the following criteria:

- **Tested** -- Run your skill locally and verify it produces correct, useful output across a range of inputs.
- **Professional output** -- Skills should generate polished, well-structured results suitable for real-world use.
- **Clear instructions** -- The SKILL.md body must be unambiguous. Another developer should be able to understand exactly what the skill does by reading it.
- **No hardcoded secrets** -- Never include API keys, passwords, or credentials in skill files.
- **Self-contained** -- Each skill should work independently without relying on other skills unless explicitly designed as part of a skill chain.

## Pull Request Process

1. **Fork** the repository to your own GitHub account.
2. **Create a branch** from `main` with a descriptive name (e.g., `add-skill-keyword-research`).
3. **Add your skill** following the structure and standards described above.
4. **Test your skill** thoroughly before submitting.
5. **Open a Pull Request** against the `main` branch with:
   - A clear title (e.g., "Add keyword-research skill").
   - A description of what the skill does and how you tested it.
6. **Address review feedback** promptly. Maintainers may request changes before merging.

## Reporting Issues

If you find a bug, have a feature request, or want to suggest an improvement:

1. Check the existing issues to avoid duplicates.
2. Open a new issue with a clear, descriptive title.
3. Include as much context as possible:
   - Steps to reproduce (for bugs).
   - Expected vs. actual behavior.
   - Relevant logs or screenshots.
4. Use labels if available (e.g., `bug`, `enhancement`, `skill-request`).

## Code of Conduct

All contributors are expected to uphold a professional and respectful environment:

- Be respectful and constructive in all interactions.
- Welcome newcomers and help them get started.
- Focus feedback on the work, not the person.
- No harassment, discrimination, or abusive behavior of any kind.
- Maintainers reserve the right to remove contributions or ban participants who violate these standards.

By contributing, you agree to abide by this code of conduct.
