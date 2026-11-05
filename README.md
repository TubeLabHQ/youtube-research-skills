# YouTube Research Skills

Agent skills that turn Claude, ChatGPT, Codex, Cursor and any skills-compatible agent into a YouTube strategist. Powered by the [TubeLab MCP](https://tubelab.net/youtube-mcp): 500K+ breakout channels, millions of outlier videos, trending title formulas, transcripts and comments, refreshed daily. Real channels, real view counts. Nothing made up.

```bash
npx skills add TubeLabHQ/youtube-research-skills
```

Then connect the MCP once per client: https://tubelab.net/docs/api/mcp-server

## What you can ask

| Ask | Skill | What you get |
|---|---|---|
| "Find me 3 unsaturated faceless niches that make money" | `niche-finder` | working niches with proof channels, then bent ideas (format transplants, audience bridges, topic twists) each with an open-ness check |
| "Home security for seniors is working. Twist it into something new" | `niche-finder` | "dogs as home security" style ideas, parents named, first 3 titles |
| "What's working in personal finance this month, and why" | `outlier-research` | outlier report: table, repeatable patterns, hooks to steal verbatim, 5 ideas |
| "Trend report for @mychannel this month" | `trend-report` | dated digest: trending videos with verbatim hooks, why they worked, formats, triggers, power words, 10 ideas with a why, 3 learnings |
| "20 video ideas for @mychannel" | `video-ideation` | idea bank ranked by demand × fit, top 5 with thumbnail concept and opening line |
| "Why did my views die? Roast @mychannel" | `channel-teardown` | packaging diagnosis essay: decay trajectories, promise rungs, 5 to 8 ideas, title templates |
| "What thumbnails work in home workouts right now" | `thumbnail-research` | thumbnail board, archetypes, rubric table, 3 directions for your next thumbnail |
| "Thumbnails like this video's" | `thumbnail-research` | visual twins by image similarity vs topic twins, side by side |
| "Thumbnail concepts for this title, here's the script" | `thumbnail-concepts` | style audit of your channel, bet and anchor, annotated and saved examples, 5 concepts, images or image prompts |
| "Is woodworking worth entering?" | `niche-validator` | verdict memo: saturation, audience quality, formats carrying the niche, entry strategy with first 5 titles |
| "Title formulas that are rising in my niche" | `title-formulas` | formula sheet with momentum and live examples, filled 3 ways, bent formulas, exhausted warnings |
| "Who are my real competitors and how do I compare?" | `competitor-landscape` | comparison table, pillar matrix, gaps and overlaps, copy and avoid, positioning sentence |
| "What do viewers ask under the top videos in X?" | `comment-mining` | questions with counts, objections, verbatims, audience vocabulary, 5 ideas that answer them |
| "Break down the structure of this video" | `transcript-intelligence` | hook verbatim, beat sheet, claims, quotable lines, structure template, script skeleton |
| "How do channels like mine make money? Audit my monetization" | `monetization-research` | niche mix vs audience twins in other niches, exact mechanics as read, ranked opportunities, RPM levers, sponsor prospects |
| "Find 30 channels to sponsor for my product" | `sponsorship-prospecting` | prospect table and CSV with audience fit, sponsored-before flag, outreach angle per top 10 |
| "Tell me every week which channels are breaking out in X" | `niche-watchlist` | dated delta digest against a state file; schedule it with a routine, cron or n8n |

## Skills

| Group | Skills | Status |
|---|---|---|
| discover | `niche-finder` · `niche-validator` · `outlier-research` · `trend-report` | shipped |
| analyze | `channel-teardown` · `thumbnail-research` · `competitor-landscape` · `comment-mining` · `transcript-intelligence` | shipped |
| create | `video-ideation` · `title-formulas` · `thumbnail-concepts` | shipped |
| business | `monetization-research` · `sponsorship-prospecting` · `niche-watchlist` | shipped (audience and money filters need a Pro account) |
| data | `tubelab-mcp` (tool map, craft rules, filter recipes, response fields, REST fallback) | shipped |

Chains for common jobs are in `playbooks/`: launch a faceless channel in one session, monthly client report.

Every skill is one `SKILL.md`: which tools to call with which filters, in what order, and the artifact to produce. No build step, nothing generated.

## Install

### Skills CLI (Claude Code, Cursor, Codex, Copilot, Gemini CLI, Windsurf)

```bash
npx skills add TubeLabHQ/youtube-research-skills
```

Connect the MCP in your client (OAuth in Claude, API key as Bearer in Codex and Cursor): https://tubelab.net/docs/api/mcp-server

### Claude Code plugin (MCP and skills in one step)

```bash
claude plugin marketplace add TubeLabHQ/youtube-research-skills
claude plugin install youtube-research@tubelab
```

The plugin registers `https://public-api.tubelab.net/mcp`; the first tool call opens OAuth in your browser. Skills show up as `/youtube-research:niche-finder` and friends.

### claude.ai and the ChatGPT app (no skills support)

1. Connect TubeLab once: the TubeLab connector in claude.ai, or the official TubeLab app in ChatGPT (search "TubeLab" in apps, connect, then add it to a chat with + → More → TubeLab).
2. Paste two files into the chat: `skills/tubelab-mcp/SKILL.md`, then the skill you want, for example `skills/niche-finder/SKILL.md`. Then ask your question.

In claude.ai you can also upload a skill folder as a custom skill under Settings → Skills.

### No MCP at all

The REST API covers the same data with an API key: see the REST fallback section in `skills/tubelab-mcp/SKILL.md`.

## Principles

- **Outlier beats raw views.** A 50K video on a 5K-average channel says more than 2M on a giant. Rank by ratio and z-score, show both.
- **Recency first.** Always set `publishedAtFrom`. Start at a month, widen only when thin, say when you widened.
- **Broad then narrow.** One wide search, read the distribution, then filter. Strict filters on the first call return nothing and cost the same.
- **Cite or cut.** Channel · video · views · ratio · date on every claim. Titles verbatim. No invented channels, ever.
- **Estimates are estimates.** Revenue, RPM and audience are models. Order with them, present as bands, never as facts.
- **Credit-aware.** Searches cost credits, reads are free. State the budget, go deep with free tools, never loop a paid search.
- **Quality over slop.** Content Authenticity is never off: `neutral` (General and above) for niches, outliers, ideation and titles; `positive` (High) for anything thumbnail-related, because a viral thumbnail on a low-effort channel teaches the wrong lesson.
- **Artifacts, not answers.** Every skill ends in a table, brief, board or sheet a creator can act on or a studio can hand to a client.
- **Public data only.** Everything comes from public YouTube pages via TubeLab. No private analytics, no scraping of logged-in data.

## Credits and plans

Only the five search tools cost credits (channels 5, outliers 2, trending formats 1). Channel, video, transcript and comment reads are free. Each skill states its budget before the first paid call. The MCP is included from the Starter plan; API keys (Codex, Cursor, REST) and monetization, revenue, RPM and audience data are Pro and Team. Current details: https://tubelab.net/pricing

## Examples

Real outputs produced by an agent with the live MCP, credits noted at the top of each file: `examples/`.

## Contributing

See `CONTRIBUTING.md`. Run `node scripts/validate-skills.mjs` before opening a PR.

## License

MIT
