# Contributing

Skills here are research workflows, not prompts. A good skill tells an agent exactly which TubeLab tool to call, with which filters, in which order, what to compute, and what artifact to produce, so two different agents give the same quality of answer.

## Add a skill

1. Copy `skills/outlier-research` to `skills/<your-skill>`. Name: lowercase, hyphens, max 64 chars, equal to the folder name.
2. Write the frontmatter. `description` is the only text an agent sees before deciding to load the skill: say what it does, when to use it, the trigger phrases, and "Requires the TubeLab MCP". Keep `metadata.credits` and `metadata.plan` accurate.
3. Write the body with these sections, in this order: use for / not for · Inputs · Credit budget · Workflow · Output · Pitfalls · Example prompts. Put the ranking rule in one sentence inside the workflow, not in a formula block.
4. One file. The artifact layout goes inline in the "Output" section as a fenced block. No `assets/`, no `references/`, no generated files: skills are uploaded one folder at a time on claude.ai and ChatGPT, and pasted as one message in clients without skills, so your SKILL.md must stand alone. Name sibling skills in prose (`tubelab-mcp`), never as relative links. Scripts are optional accelerators; the workflow must run on tool calls alone.
5. Follow the conventions below, run the validator, and add one real run under `examples/<skill>/<date>.md`.

```bash
node scripts/validate-skills.mjs
```

## Conventions (the validator checks most of these)

- **Budget first.** State the credit cost before the first paid call. Never paginate a paid search in a loop.
- **Recency tokens, never dates.** `month`, `trimester`, `semester`, `year`. The validator rejects ISO dates in SKILL.md.
- **Widen rule.** One step at a time, with a sentence in the output explaining the widening.
- **Content Authenticity rule.** `classificationQuality: "neutral"` by default, `"positive"` for thumbnail work, never dropped to widen.
- **Proof line.** Channel · video title verbatim · views · ratio · date on every claim.
- **Estimates are estimates.** Revenue, RPM, audience: bands, labelled.
- **Agent-neutral wording.** "Call `search_outliers`", not "use the TubeLab connector in Claude".
- **No prices.** Credit costs are fine; plan prices change, link to https://tubelab.net/pricing.
- **Under 150 lines.** A workflow skill that needs more is two skills.

## Repo conventions

- **Keep it simple.** One `SKILL.md` per skill, plain markdown, no build steps, no generated files, no framework. If a change needs tooling, the change is probably wrong.
- **Do not over-engineer.** A skill is instructions an agent follows, not software. No scoring formulas, no config systems, no abstractions shared between skills. Prefer a sentence over a mechanism.
- **Small, focused changes.** One skill or one fix per pull request. Fold a learned tool quirk into the skill that hit it and into `tubelab-mcp` if it is general.
- **Commits follow Conventional Commits** (the commitizen pattern): `type(scope): subject` in the imperative, lower case, no period. Types: `feat`, `fix`, `docs`, `refactor`, `chore`, `ci`, `test`. Scope is the skill or area.

```text
feat(sponsor-finder): rank brands by warmth
fix(tubelab-mcp): note that lexical outlier search ignores the query
docs(readme): link the claude directory listing
chore(examples): rerun niche-finder on @channel
```

## Examples

Every skill ships one real output in `examples/<skill>/`. Real means produced by an agent with the live MCP, with the credits spent noted at the top. Never fabricate an example; a missing example is better than a fake one.

## Pull requests

CI runs the validator. Describe which agent and client you tested with (Claude Code, Cursor, ChatGPT app, claude.ai) and paste the credit cost of your test run.
