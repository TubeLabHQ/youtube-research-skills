# YouTube Research Skills for AI Agents

Practical AI agent skills for YouTube research, powered by the [TubeLab MCP](https://tubelab.net/youtube-mcp).

These skills help agents find niches that are working, explain why a video broke out, write trend reports, generate ideas and titles for a channel, tear down a channel's packaging, research thumbnails, map competitors, mine comments and transcripts, audit monetization, find sponsors, prospect creators, and watch a niche over time.

This is not endpoint routing. Each skill is a complete research workflow: which TubeLab tool to call, with which filters, in what order, what to compute, and the artifact to produce. Every number comes from a tool response, every claim carries a channel, a title, a view count, an outlier ratio and a date.

## Install

```bash
npx skills add TubeLabHQ/youtube-research-skills
```

Works with Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Gemini CLI, Windsurf, VS Code, Grok Build, and other agents that support the [Agent Skills spec](https://agentskills.io).

Grok Build reads skills from `.grok/skills/` in a repo or `~/.grok/skills/`, so a copy of the `skills/` folder is enough:

```bash
git clone https://github.com/TubeLabHQ/youtube-research-skills && cp -r youtube-research-skills/skills/* ~/.grok/skills/
```

Claude Code can also install it as a plugin, which registers the MCP at the same time:

```bash
claude plugin marketplace add TubeLabHQ/youtube-research-skills
claude plugin install youtube-research@tubelab
```

## Setup

Connect the TubeLab MCP once in your client: `https://public-api.tubelab.net/mcp`

- Claude Code: the plugin does it, or `claude mcp add --transport http tubelab https://public-api.tubelab.net/mcp`. The first call opens OAuth.
- Claude.ai and Claude Desktop: the [TubeLab connector](https://claude.ai/directory/tubelab), OAuth.
- ChatGPT and Codex: the [TubeLab app](https://chatgpt.com/plugins/plugin_asdk_app_6ab3980fb1488191a9b26b3f59efd90b), OAuth. Codex supports ChatGPT apps, so no API key is needed there.
- Grok (grok.com, iOS, Android): add the MCP as a custom connector at [grok.com/connectors](https://grok.com/connectors), New Connector, Custom, with the URL above, and complete the authentication. Skills live at [grok.com/skills](https://grok.com/skills): create one by uploading a skill's `SKILL.md`, starting with `tubelab-mcp`.
- Grok Build (terminal): skills from the folders above; add the MCP from the `/mcps` modal.
- Cursor and other IDE agents: a TubeLab API key as `Authorization: Bearer <key>` (Pro plan).
- Claude.ai and Claude Desktop also take skills directly: zip a skill folder (`cd skills && zip -r niche-finder.zip niche-finder/`), upload it under **Customize > Skills**, turn it on, and Claude loads it when a request matches. Upload `tubelab-mcp` too; the workflow skills name it.
- ChatGPT desktop app and Codex: skills live in the **Skills** sidebar and in `.agents/skills/` of a repo; Codex also installs them with `$skill-installer`.
- Any chat client that cannot install skills: paste `skills/tubelab-mcp/SKILL.md` and then the skill you want into the chat. Every skill is one file, so this works as is.

Setup guides per client: [tubelab.net/docs/api/mcp-server](https://tubelab.net/docs/api/mcp-server). The MCP is included from the Starter plan. Searches cost credits (channels 5, outliers 2, trending formats 1); channel, video, transcript and comment reads are free.

## Available Skills

| Skill | Use it when you want to... | Output |
|---|---|---|
| [`niche-finder`](skills/niche-finder/) | Find niches that are working now and bend them into new, unsaturated ideas | Working niches with proof, bent ideas (transplant, bridge, twist, fusion) with open-ness checks |
| [`niche-validator`](skills/niche-validator/) | Decide go or no-go on one niche, from a keyword or a channel | Verdict memo: saturation, audience quality, formats carrying it, entry strategy |
| [`outlier-research`](skills/outlier-research/) | Find videos that beat their channel's baseline in a niche and why | Outlier table, repeatable patterns, hooks to steal, five ideas |
| [`trend-report`](skills/trend-report/) | Get a dated digest of what is trending in a niche or for a channel | Trending videos with verbatim hooks, winning patterns, 10 ideas with a why, learnings |
| [`video-ideation`](skills/video-ideation/) | Get ranked video ideas for one specific channel | Idea bank ranked by demand and fit, top 5 with thumbnail concept and opening line |
| [`title-formulas`](skills/title-formulas/) | Use title formulas with momentum, filled for your topic | Formula sheet with live examples, filled titles, bent formulas, exhausted warnings |
| [`thumbnail-concepts`](skills/thumbnail-concepts/) | Get thumbnail concepts for one video, or study what thumbnails work in a niche | Style audit, bet and anchor, annotated examples, five concepts, images or image prompts |
| [`channel-teardown`](skills/channel-teardown/) | Diagnose why a channel's views died and fix its packaging | Essay with decay trajectories, lenses, ideas, title templates, rewrites on request |
| [`competitor-landscape`](skills/competitor-landscape/) | Compare a channel against its real neighbours | Comparison table, pillar matrix, gaps and overlaps, copy and avoid, positioning |
| [`comment-mining`](skills/comment-mining/) | Mine top comments for questions, objections, requests and audience language | Voice-of-audience report, verbatims, vocabulary, five ideas |
| [`transcript-intelligence`](skills/transcript-intelligence/) | Break down a video's structure, hook and beats from its transcript | Hook verbatim, beat sheet, claims, quotable lines, structure template, script skeleton |
| [`monetization-research`](skills/monetization-research/) | Audit how channels like yours, and channels with your audience, make money | Niche mix vs audience twins, exact mechanics as read, ranked opportunities, RPM levers |
| [`sponsor-finder`](skills/sponsor-finder/) | Find the brands already sponsoring channels with your audience and size | Sponsor list with evidence, offers, placements, outreach angle per brand |
| [`sponsorship-prospecting`](skills/sponsorship-prospecting/) | Build a creator prospect list for a product or brand | Prospect table and CSV with audience fit, sponsored-before flag, outreach angles |
| [`niche-watchlist`](skills/niche-watchlist/) | Watch a niche and get the delta since the last run, on a schedule | Dated digest of new breakout channels, movers and dropped, state file |
| [`tubelab-mcp`](skills/tubelab-mcp/) | Drive the TubeLab tools well: costs, filters, response fields, quirks, REST fallback | Craft rules and recipes the other skills rely on; no artifact |

Every skill is one `SKILL.md`. Real outputs for every skill, all run on the same channel, are in [`examples/`](examples/). Ordered chains for common jobs are in [`playbooks/`](playbooks/).

## Example Prompts

```text
Find me 3 unsaturated faceless niches in English with real AdSense money, then twist the best one into 5 novel channel ideas.
```

```text
Trend report for @mychannel this month. Hooks word for word, and 10 ideas I can make.
```

```text
Roast @mychannel. Be direct. Why did the last six videos tank?
```

```text
Thumbnail concepts for "How I Would Build a $10M Service Business (If I Had to Start Over)". Here is the script.
```

```text
Who could sponsor my channel? Find the brands already paying channels my size with my audience.
```

```text
Who are my real competitors and how do I compare? youtube.com/@handle
```

## How the Skills Work Together

```text
tubelab-mcp
        │
        ▼
YouTube research workflows
 ├─ discover    niche-finder · niche-validator · outlier-research · trend-report
 ├─ create      video-ideation · title-formulas · thumbnail-concepts
 ├─ analyze     channel-teardown · competitor-landscape · comment-mining · transcript-intelligence
 └─ business    monetization-research · sponsor-finder · sponsorship-prospecting · niche-watchlist
```

The workflow skills lean on `tubelab-mcp` for tool costs, filter recipes, response fields and quirks. Each workflow produces an artifact a creator can act on or a studio can hand to a client, not raw JSON.

## Design Principles

1. **Workflow-first, tool-second.** Users ask for an outcome, not a search.
2. **Outlier over raw views.** A 50K video on a 5K-average channel says more than 2M on a giant. Rank by ratio, show both.
3. **Recency first.** Every search sets a window. Widen one step at a time, and say so.
4. **Content Authenticity is never off.** General and above for niches, outliers, ideas and titles; High for anything thumbnail-related. Never relaxed to widen a thin result.
5. **Cited outputs.** Channel · title verbatim · views · ratio · date on every claim. No invented channels, ever.
6. **Estimates are estimates.** Revenue, RPM and audience are model outputs, shown as labelled bands.
7. **Credit-aware.** State the budget before the first paid call, go deep with free reads, never loop a paid search.
8. **Public data only.** Everything comes from public YouTube pages via TubeLab.

## Links

- [TubeLab](https://tubelab.net)
- [YouTube MCP](https://tubelab.net/youtube-mcp)
- [MCP Documentation](https://tubelab.net/docs/api/mcp-server)
- [TubeLab in the Claude directory](https://claude.ai/directory/tubelab) · [TubeLab app for ChatGPT and Codex](https://chatgpt.com/plugins/plugin_asdk_app_6ab3980fb1488191a9b26b3f59efd90b) · [Grok connectors](https://docs.x.ai/grok/connectors) and [Grok Build skills](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [API Documentation](https://tubelab.net/docs/api/introduction)
- [Pricing](https://tubelab.net/pricing)
- [Contributing](CONTRIBUTING.md) · MIT license
