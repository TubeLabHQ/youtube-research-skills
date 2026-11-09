# Contributing

Skills here are short research workflows. Models are smart, and over-detailed instructions often make results worse. A good skill gives the model what an expert YouTube strategist knows and it does not, says what the reader needs, and gets out of the way.

## Add a skill

1. Copy `skills/trend-report` to `skills/<your-skill>`. Name: lowercase, hyphens, max 64 chars, equal to the folder name.
2. Write the frontmatter. `description` is loaded in every chat and decides whether the skill loads: one sentence under 40 words, starting "Use when the user wants to ...", naming the job rather than trigger phrases, ending "Requires the TubeLab MCP."
3. Four body sections, in order. **Overview:** what the user gets and the one or two ideas a strategist brings; a "Not for" line only where a sibling is easy to confuse. **Workflow:** three to five one-line steps a capable model would not take unprompted; step 1 is "Clarify scope only if needed" with the defaults. **Output Format:** bullets, no paragraphs: a summary with bold labels (verdict, goal, confidence), then each finding a bold label with sub-bullets, a thumbnail image when a video is the subject, everything cited linked, tables only for short fields. Close with one line: word target, item counts, one proof per item, "One fact per bullet, under 25 words except quotes; no extra sections or bullets. Cut items before proof." **Common Pitfalls:** four to six "Do not" lines with the reason: thinking errors and data traps, at most one on filter hygiene.
4. One file, with the artifact layout inline in Output Format as a fenced block. No `assets/`, `references/` or generated files: a skill is uploaded as one folder or pasted as one message, so SKILL.md must stand alone. Name sibling skills in backticks (`tubelab-mcp`), never as relative links. Scripts are optional; the workflow runs on tool calls alone.
5. Follow the conventions below, run the validator, and add one real run under `examples/<skill>/<date>.md`.

```bash
node scripts/validate-skills.mjs
```

## Conventions (the validator checks dates, links, sections and size)

- **Search discipline.** Search to find candidates, read to understand them: searches cost credits, reads are free. About three searches per job, no paid search paginated in a loop, no budget announcements.
- **Recency tokens, never dates.** `month`, `trimester`, `semester`, `year`; the validator rejects ISO dates. Widen one step at a time, and say so.
- **Content Authenticity rule.** `classificationQuality` at `"neutral"` or above by default, `"positive"` for thumbnail work, never dropped to widen.
- **Proof line.** Every finding carries channel (handle) · video title verbatim · views · ratio · date from a tool response; everything cited is linked (videos, channels, moments, brands, products) with a URL from tool data; a sponsor only heard links to its video moment. A skill that judges videos fetches and views their thumbnails. Rank by ratio, show views too.
- **Estimates are estimates.** Revenue, RPM, audience: bands, labelled.
- **Describe the job, not the tool.** "Find what is working in the niche", not "call `search_outliers`". Tool names and parameters live in `tubelab-mcp`, except the recency and quality line in Common Pitfalls.
- **No prices.** Credit costs are fine; plan prices change, link to https://tubelab.net/pricing.
- **Plain words.** Short sentences, no coined jargon, no em dashes.
- **At most 350 words** including frontmatter and template (the validator warns above). A workflow skill that needs more is two skills.

## Repo conventions

- **Keep it simple.** One `SKILL.md` per skill, plain markdown, no build steps, no framework. If a change needs tooling, the change is probably wrong.
- **Do not over-engineer.** A skill is instructions an agent follows, not software. No scoring formulas, no config systems, no abstractions shared between skills. Prefer a sentence over a mechanism.
- **Small, focused changes.** One skill or one fix per pull request. Fold a learned tool quirk into the skill that hit it and into `tubelab-mcp` if it is general.
- **Commits follow Conventional Commits** (the commitizen pattern): `type(scope): subject` in the imperative, lower case, no period. Types: `feat`, `fix`, `docs`, `refactor`, `chore`, `ci`, `test`. Scope is the skill or area.

```text
feat(comment-mining): rank comments by likes
fix(tubelab-mcp): note that lexical outlier search ignores the query
docs(readme): link the claude directory listing
chore(examples): rerun niche-finder on @channel
```

## Examples

Every skill ships one real output in `examples/<skill>/`. Real means produced by an agent with the live MCP, with the credits spent noted at the top. Never fabricate one; a missing example beats a fake one.

## Pull requests

CI runs the validator. Say which agent and client you tested with and paste the credit cost of your test run.
