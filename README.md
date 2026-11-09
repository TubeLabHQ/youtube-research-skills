# YouTube Research Skills for AI Agents

Practical AI agent skills for YouTube research, powered by the [TubeLab MCP](https://tubelab.net/youtube-mcp).

These skills help agents find niches that are working, explain why a video broke out, write trend reports, generate ideas and titles for a channel, analyze a channel, research thumbnails, map competitors, mine comments and transcripts, audit monetization, find sponsors, and watch a niche over time.

This is not endpoint routing. Each skill is a short research workflow: the judgment an expert strategist brings, the traps to avoid, and the report to produce. Every number comes from a tool response, every finding carries a linked channel and title, a view count, an outlier ratio and a date.

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
- Grok Bot: ask a Bot to add the MCP server at the URL above (a Bot can add an MCP server that is not in its catalog by URL) and complete the authentication. Then hand the Bot this repo URL, or paste a `SKILL.md`, and ask it to save each one as a skill, starting with `tubelab-mcp`. Skills are shared by all your Bots; if a Bot cannot find one, open Connect apps and enable it under Private skills.
- Grok Build (terminal): skills from the folders above; add the MCP from the `/mcps` modal.
- Cursor and other IDE agents: a TubeLab API key as `Authorization: Bearer <key>` (Pro plan).
- Claude.ai and Claude Desktop also take skills directly: zip a skill folder (`cd skills && zip -r niche-finder.zip niche-finder/`), upload it under **Customize > Skills**, turn it on, and Claude loads it when a request matches. Upload `tubelab-mcp` too; the workflow skills name it.
- ChatGPT desktop app and Codex: skills live in the **Skills** sidebar and in `.agents/skills/` of a repo; Codex also installs them with `$skill-installer`.
- Any chat client that cannot install skills: paste `skills/tubelab-mcp/SKILL.md` and then the skill you want into the chat. Every skill is one file, so this works as is.

Setup guides per client: [tubelab.net/docs/api/mcp-server](https://tubelab.net/docs/api/mcp-server). The MCP is included from the Starter plan. Searches cost credits (channels 5, outliers 2, trending formats 1); channel, video, transcript and comment reads are free.

## Available Skills

| Skill | Use it when you want to... | Output |
|---|---|---|
| [`niche-finder`](skills/niche-finder/) | Find niches that are working now and bend them into new, unsaturated ideas | Three to five new niche ideas, each with proof, an openness check and a first video |
| [`niche-validator`](skills/niche-validator/) | Decide go or no-go on one niche, from a keyword or a channel | Verdict, channels breaking in, formats that work, entry plan |
| [`trend-report`](skills/trend-report/) | See what is working in a niche or for a channel, and why | Up to five winning videos with verbatim hooks and why they worked, patterns, ideas |
| [`video-ideation`](skills/video-ideation/) | Get ranked video ideas for one specific channel | Six ideas, each with demand proof and fit proof |
| [`title-formulas`](skills/title-formulas/) | Get titles you can publish, and the trending formulas behind them | About eight titles with proof, plus a table of their formulas, proven or untested |
| [`thumbnail-concepts`](skills/thumbnail-concepts/) | Get thumbnail concepts for one video, or study what thumbnails work in a niche | Three concepts, each built from a viewed thumbnail, images or prompts |
| [`channel-analysis`](skills/channel-analysis/) | Analyze a channel: positioning, what works, what is holding it back | One-line diagnosis, what works, what holds it back, next 3 tests |
| [`competitor-research`](skills/competitor-research/) | Compare a channel against its real neighbours | How the set was built, comparison table, gaps, positioning |
| [`comment-mining`](skills/comment-mining/) | Mine top comments for questions, objections, requests and audience language | Themes with verbatim quotes and likes, top comments, the audience's words, video ideas |
| [`script-breakdown`](skills/script-breakdown/) | Break down a video's structure, hook and beats from its transcript | Hook verbatim, typed beats with linked timestamps, one-line layout, optional skeleton |
| [`monetization-research`](skills/monetization-research/) | Find monetization gaps and what to sell, from how peers and same-audience channels earn | Methods table best first with linked peer offers and sponsors, three products to test |
| [`niche-watchlist`](skills/niche-watchlist/) | Watch a niche and get the delta since the last run, on a schedule | Dated digest of new and moving channels, config and state files |
| [`tubelab-mcp`](skills/tubelab-mcp/) | Drive the TubeLab tools well: costs, filters, response fields, quirks, REST fallback | Craft rules and recipes the other skills rely on; no artifact |

Every skill is one `SKILL.md`. Real outputs for every skill are in [`examples/`](examples/). Ordered chains for common jobs are in [`playbooks/`](playbooks/).

## Example Prompts

```text
Find me 3 unsaturated faceless niches in English with real AdSense money, then twist the best one into new channel ideas.
```

```text
Trend report for @mychannel this month. Hooks word for word, and ideas I can make.
```

```text
Analyze @mychannel. Be direct. Why did the last six videos underperform?
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
 ├─ discover    niche-finder · niche-validator · trend-report
 ├─ create      video-ideation · title-formulas · thumbnail-concepts
 ├─ analyze     channel-analysis · competitor-research · comment-mining · script-breakdown
 └─ business    monetization-research · niche-watchlist
```

The workflow skills lean on `tubelab-mcp` for tool costs, filter recipes, response fields and quirks. Each workflow produces an artifact a creator can act on or a studio can hand to a client, not raw JSON.

## Design Principles

1. **Workflow-first, tool-second.** Users ask for an outcome, not a search.
2. **Outlier over raw views.** A 50K video on a 5K-average channel says more than 2M on a giant. Rank by ratio, show both.
3. **Recency first.** Every search sets a window. Widen one step at a time, and say so.
4. **Content Authenticity is never off.** General and above for niches, outliers, ideas and titles; High for anything thumbnail-related. Never relaxed to widen a thin result.
5. **Cited outputs.** Every finding carries channel · title verbatim · views · ratio · date, and everything cited is linked (videos, channels, moments, brands, products) with a URL from tool data; a sponsor only heard links to its video moment. Nothing invented.
6. **Estimates are estimates.** Revenue, RPM and audience are model outputs, shown as labelled bands.
7. **Credit-aware.** Searches cost credits, reads are free: go deep with free reads, never loop a paid search.
8. **Public data only.** Everything comes from public YouTube pages via TubeLab.

## Links

- [TubeLab](https://tubelab.net)
- [YouTube MCP](https://tubelab.net/youtube-mcp)
- [MCP Documentation](https://tubelab.net/docs/api/mcp-server)
- [TubeLab in the Claude directory](https://claude.ai/directory/tubelab) · [TubeLab app for ChatGPT and Codex](https://chatgpt.com/plugins/plugin_asdk_app_6ab3980fb1488191a9b26b3f59efd90b) · [Grok Bot apps and MCP servers](https://docs.x.ai/grok-bot/computer-and-apps), [Grok Bot skills](https://docs.x.ai/grok-bot/skills-routines-and-automations) and [Grok Build skills](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [API Documentation](https://tubelab.net/docs/api/introduction)
- [Pricing](https://tubelab.net/pricing)
- [Contributing](CONTRIBUTING.md) · MIT license
