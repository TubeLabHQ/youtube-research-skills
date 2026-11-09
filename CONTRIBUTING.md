# Contributing

Skills here are short research workflows. Models are smart, and over-detailed instructions often make results worse. A good skill gives the model what an expert YouTube strategist knows and it does not, says what the reader needs, and gets out of the way.

## Add a skill

1. Copy `skills/trend-report` to `skills/<your-skill>`. Name: lowercase, hyphens, max 64 chars, equal to the folder name.
2. Write the frontmatter. `description` is loaded in every chat and decides whether the skill loads: one sentence under 40 words, starting "Use when the user wants to ...", naming the job rather than trigger phrases, ending "Requires the TubeLab MCP."
3. Write four body sections, in this order.
   - **Overview:** what the user gets, and the one or two ideas a strategist brings. Add a "Not for" line only where a sibling skill is easy to confuse.
   - **Workflow:** short numbered steps, usually three to eight. Keep only what a capable model would not do unprompted. Step 1 is "Clarify scope only if needed", with the defaults.
   - **Output Format:** a fenced template of bullets, with no paragraphs. It opens with a short summary list with bold labels (the main finding, the sample). Each finding is a bold label with bulleted details, and field labels are bold. An item with a thumbnail is a `###` heading, with the thumbnail on its own line under it, linked to the video (`[![](thumb)](url)`). Never put a thumbnail in a list or a table cell. Use tables only to compare short fields. Under the template, add a short bullet list of report rules: length and item counts, plain language, one fact per bullet under 25 words (quotes and verbatim titles are exempt), what to cut first, links, and thumbnails as the 320px `mqdefault.jpg` image.
   - **Common Pitfalls:** four to six "Do not" lines, each with its reason. Most are thinking errors and data traps of the job. At most one is about filters.
4. One file, with the artifact layout inline in Output Format as a fenced block. No `assets/`, `references/` or generated files: a skill is uploaded as one folder or pasted as one message, so SKILL.md must stand alone. Name sibling skills in backticks (`tubelab-mcp`), never as relative links. Scripts are optional; the workflow runs on tool calls alone.
5. Follow the conventions below, run the validator, and add one real run under `examples/<skill>/<date>.md`.

```bash
node scripts/validate-skills.mjs
```

## Conventions (the validator checks dates, links, sections and size)

- **Search discipline.** Search to find candidates, and read to understand them. Searches cost credits, and reads are free. Most skills use two to six searches, and do not page through a paid search. Two skills are the exception. `niche-finder` pages its two channel searches 3 to 4 pages deep, and `niche-validator` pages its niche sample two or three pages deep. No budget announcements.
- **Recency tokens, never dates.** `month`, `trimester`, `semester`, `year`; the validator rejects ISO dates. Widen one step at a time, and say so.
- **Content Authenticity rule.** `classificationQuality` at `"neutral"` or above by default, `"positive"` for thumbnail work, never dropped to widen. `niche-watchlist` is the exception: its saved search leaves the filter out.
- **Proof line.** Every finding carries channel (handle) · video title verbatim · views · ratio · date, from a tool response. Link everything cited, with a URL from tool data: videos, channels, moments, brands and products. A sponsor that was only heard links to the video moment. A skill that judges videos fetches and views their thumbnails. Rank by ratio, and show views too.
- **Estimates are estimates.** Revenue, RPM, audience: bands, labelled.
- **Describe the job, not the tool.** Write "Find what is working in the niche", not "call `search_outliers`". Tool names and parameters live in `tubelab-mcp`. The recency and quality line in Common Pitfalls is the general exception. Two skills also carry search settings: `niche-watchlist` keeps its saved search, and `niche-finder` keeps its two presets.
- **No prices.** Credit costs are fine; plan prices change, link to https://tubelab.net/pricing.
- **Plain language, in the skill and in its report.** Short, full sentences. Nothing dense, compressed or telegraphic, no jargon, no em dashes. A reader who is not a YouTube strategist should understand every line on first read.
- **At most 650 words of instruction**, not counting the fenced template and settings blocks. The validator warns above that. A workflow skill that needs more is two skills.

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
