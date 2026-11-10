# YouTube Research Skills for AI Agents

Practical AI agent skills for YouTube research, powered by the [TubeLab MCP](https://tubelab.net/youtube-mcp).

These skills help agents find niches that are working, explain why a video broke out, write trend reports, generate ideas and titles for a channel, analyze a channel, research thumbnails, map competitors, mine comments and transcripts, audit monetization, find sponsors, build sponsor prospect lists for brands, and watch a niche over time.

Together they work like a full YouTube agency with six roles: a niche scout, a validator, a trend analyst, a script analyst, a packaging team and a money team. It runs on your machine or in your chat app, through your own agent and your own TubeLab account.

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

| Role | Skill | Use it when you want to... | Output |
|---|---|---|---|
| Niche scout | [`niche-finder`](skills/niche-finder/) | Find breakout channels and cash cows with two preset searches, and turn them into new niche ideas | Ten ranked niche ideas, each with proof and a way to earn beyond AdSense |
| Niche scout | [`niche-watchlist`](skills/niche-watchlist/) | Watch a niche and get the delta since the last run, on a schedule | Dated digest of new and moving channels, each with a short analysis: worth studying or not, working topics, title formulas, best recent video. Config and state files |
| Validator | [`niche-validator`](skills/niche-validator/) | Decide go or no-go on one niche, or compare a shortlist of up to three, with the Niche Analyzer scores | Market Size, Unsaturated and Profitable scores, verdict, channels breaking in, formats, gaps, bending ideas, entry plan; a comparison table first for a shortlist |
| Trend analyst | [`trend-report`](skills/trend-report/) | See what is working in a niche or for a channel, and why | Up to five winning videos with verbatim hooks and why they worked, patterns, ideas |
| Script analyst | [`script-breakdown`](skills/script-breakdown/) | Break down a video's structure, hook and beats from its transcript. Given a niche or a channel, it picks the top videos itself | Hook verbatim, typed beats with linked timestamps, one-line layout, optional skeleton |
| Packaging team | [`title-formulas`](skills/title-formulas/) | Get titles you can publish, built on formulas from the trending index, your niche and neighbouring niches. Pairs with `thumbnail-concepts`: titles first | About eight titles with proof, plus a table of their formulas with each one's source, proven or untested |
| Packaging team | [`thumbnail-concepts`](skills/thumbnail-concepts/) | Get thumbnail concepts that join your video's new angle with the problem your viewers know. Pairs with `title-formulas`: the thumbnail for the chosen title | Patterns that work for each, three concepts that combine them, images or prompts |
| Money team | [`monetization-research`](skills/monetization-research/) | Find monetization gaps and what to sell for your channel (the creator's side), from how peers and same-audience channels earn | Table of monetization method gaps, best first, with linked peer offers; the brands that sponsor channels like yours; three products to test |
| Money team | [`sponsorship-prospecting`](skills/sponsorship-prospecting/) | Find YouTube channels to sponsor for your product, matched to your buyer (the brand's side) | 10 to 15 scored prospects with audience, current sponsors and contact path; the best fits with an outreach angle and a cost band; a CSV |
| Channel strategist | [`channel-analysis`](skills/channel-analysis/) | Analyze a channel: positioning, what works, what is holding it back | One-line diagnosis, what works, what holds it back, next 3 tests |
| Channel strategist | [`competitor-research`](skills/competitor-research/) | Compare a channel against 12 to 15 real neighbours: peers, leaders and fast risers | How the set was built, comparison table, gaps, positioning |
| Audience researcher | [`comment-mining`](skills/comment-mining/) | Mine top comments for questions, objections, requests and audience language | Themes with verbatim quotes and likes, top comments, the audience's words, video ideas |
| Ideas | [`video-ideation`](skills/video-ideation/) | Get ranked video ideas for one channel from three sources: its own winning formats, its niche and related niches, plus same-audience channels on request | About ten ideas, each with a twist and linked proof, ranked by potential and fit |
| Data layer | [`tubelab-mcp`](skills/tubelab-mcp/) | Drive the TubeLab tools well: costs, craft rules, quirks found in testing, and where the full API reference lives | Rules the other skills rely on; no artifact |

Every skill is one `SKILL.md`. Real outputs for every skill are in [`examples/`](examples/). Ordered chains for common jobs are in [`playbooks/`](playbooks/), including [`youtube-agency.md`](playbooks/youtube-agency.md), which runs all six roles from a blank page to a first video and a money plan.

## The Agency (Claude Code agents)

The plugin also ships six agents, one per role. Each one is a thin wrapper: it loads the skills for its role and returns the finished report.

| Agent | What it does | Skills it loads |
|---|---|---|
| `niche-scout` | Finds breakout channels and cash cows and turns them into ten niche ideas, or watches a niche over time | `niche-finder`, `niche-watchlist` |
| `validator` | Scores a niche, or a shortlist of up to three, and says go or no-go | `niche-validator` |
| `trend-analyst` | Pulls what is winning right now, with the hooks word for word | `trend-report` |
| `script-analyst` | Breaks the top videos down beat by beat | `script-breakdown` |
| `packaging-team` | Writes titles, then thumbnails for the chosen title, from what is already getting clicked | `title-formulas`, `thumbnail-concepts` |
| `money-team` | Shows what channels like yours sell and who sponsors them, or which channels a brand should sponsor | `monetization-research`, `sponsorship-prospecting` |

In Claude Code, call one by name, for example `@agent-youtube-research:niche-scout find me faceless niche ideas`. Other clients do not load these agent files. They use the same skills directly, and the reports are the same.

## Example Prompts

```text
Find me unsaturated faceless niche ideas in English with real money in them, ranked.
```

```text
Run the whole agency for me: find niches, validate the top three, then give me the trend report, script breakdown, title, thumbnail and money plan for the winner.
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

```text
We sell an invoicing app to US freelancers. Which YouTube channels should we sponsor?
```

## How the Skills Work Together

```text
tubelab-mcp
        │
        ▼
YouTube research agency
 ├─ niche scout          niche-finder · niche-watchlist
 ├─ validator            niche-validator
 ├─ trend analyst        trend-report
 ├─ script analyst       script-breakdown
 ├─ packaging team       title-formulas · thumbnail-concepts
 ├─ money team           monetization-research · sponsorship-prospecting
 ├─ channel strategist   channel-analysis · competitor-research
 ├─ audience researcher  comment-mining
 └─ ideas                video-ideation
```

The workflow skills lean on `tubelab-mcp` for tool costs, craft rules and quirks. The full parameter and REST reference lives at https://tubelab.net/docs/skill.md. Each workflow produces an artifact a creator can act on or a studio can hand to a client, not raw JSON.

## Design Principles

1. **Workflow-first, tool-second.** Users ask for an outcome, not a search.
2. **Outlier over raw views.** A 50K video on a 5K-average channel says more than 2M on a giant. Rank by ratio, show both.
3. **Recency first.** Every search sets a window. Widen one step at a time, and say so.
4. **Content Authenticity is never off.** General and above for niches, outliers, ideas and titles; High for anything thumbnail-related. Never relaxed to widen a thin result. The one exception is `niche-watchlist`, whose saved search leaves it out.
5. **Cited outputs.** Every finding carries channel · title verbatim · views · ratio · date. Everything cited is linked with a URL from tool data: videos, channels, moments, brands and products. A sponsor that was only heard links to the video moment. Nothing invented.
6. **Estimates are estimates.** Revenue, RPM and audience are model outputs, shown as labelled bands.
7. **Credit-aware.** Searches cost credits, reads are free: go deep with free reads, never loop a paid search.
8. **Public data only.** Everything comes from public YouTube pages via TubeLab.
9. **Plain language.** Skills and reports use short, full sentences that anyone can follow on first read.

## Links

- [TubeLab](https://tubelab.net)
- [YouTube MCP](https://tubelab.net/youtube-mcp)
- [MCP Documentation](https://tubelab.net/docs/api/mcp-server)
- [TubeLab in the Claude directory](https://claude.ai/directory/tubelab) · [TubeLab app for ChatGPT and Codex](https://chatgpt.com/plugins/plugin_asdk_app_6ab3980fb1488191a9b26b3f59efd90b) · [Grok Bot apps and MCP servers](https://docs.x.ai/grok-bot/computer-and-apps), [Grok Bot skills](https://docs.x.ai/grok-bot/skills-routines-and-automations) and [Grok Build skills](https://docs.x.ai/build/features/skills-plugins-marketplaces)
- [API Documentation](https://tubelab.net/docs/api/introduction)
- [Pricing](https://tubelab.net/pricing)
- [Contributing](CONTRIBUTING.md) · MIT license
