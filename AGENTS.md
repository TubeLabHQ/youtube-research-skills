# Agent routing guide

This repository is a set of Agent Skills for YouTube research on top of the TubeLab MCP. Skills live in `skills/<name>/SKILL.md`. Read the one that matches the ask, then follow it. `skills/tubelab-mcp` is the data layer every workflow skill names; load it when a tool call fails, returns nothing, or you are unsure which filter to use.

## Which skill for which ask

| The user asks | Load |
|---|---|
| Find a niche, unsaturated niches, faceless ideas, niches that earn beyond AdSense, twist or combine niches | `niche-finder` |
| What is working in X, why did this video blow up, trend report, weekly digest, hooks and formats to steal | `trend-report` |
| Video ideas for my channel, what should I make next | `video-ideation` |
| Analyze or roast my channel, why did views drop, what to change first | `channel-analysis` |
| Thumbnail for this video or title or script, thumbnail concepts, generate thumbnails, which thumbnails work in a niche | `thumbnail-concepts` |
| Is X worth entering, is this niche saturated, go or no-go, score this niche | `niche-validator` |
| Titles for my video, title formulas, trending title templates, rewrite a title | `title-formulas` |
| Who are my competitors, how do I compare, competitive landscape, who is growing in my space | `competitor-research` |
| What do viewers ask or complain about, voice of audience, comments | `comment-mining` |
| Script structure, beat sheet, hook of this video, script skeleton | `script-breakdown` |
| Monetization gaps for my channel, what to sell, how channels like mine make money, raise RPM, who could sponsor my channel (the creator's side) | `monetization-research` |
| Which channels should we sponsor, creator prospect list for a product, match creators to a buyer (the brand's side) | `sponsorship-prospecting` |
| Watch a niche, which channels broke out since last run, scheduled digest | `niche-watchlist` |
| How do TubeLab tools work, which filter, credits, REST | `tubelab-mcp` |

Ordered chains for common jobs live in `playbooks/` (launch a faceless channel, monthly client report).

## Rules every skill follows

1. Always set `publishedAtFrom` (tokens: `month`, `trimester`, `semester`, `year`). Widen one step at a time and say so.
2. Content Authenticity is never off: `classificationQuality` at `"neutral"` or above for niches, outliers, ideation and titles; `"positive"` for anything thumbnail-related. Never drop it to widen a thin result. `niche-watchlist` is the exception: its saved search leaves the filter out.
3. Rank by `averageViewsRatio`, not raw views. Show both.
4. Every finding carries its proof from a tool response: channel (handle) · video title verbatim · views · ratio · date. Invent nothing.
5. Link everything you cite: videos, channels, moments, brands and products. Use a URL from tool data, never a guessed one. A sponsor that was only heard links to the video moment where it was said.
6. Look at the thumbnail of every video you analyze. Fetch the image from its link and open it.
7. Revenue, RPM and audience are estimates. Present as bands, labelled.
8. Searches cost credits. Channel, video, transcript and comment reads are free. Search to find candidates, and read to understand them. Most skills use two to six searches, and do not page through a paid search. Two skills go deeper, because the sample is the product. `niche-finder` pages its two channel searches 3 to 4 pages deep. `niche-validator` pages its niche sample two or three pages deep.
9. Write reports in plain language. Use short, full sentences, not dense or telegraphic notes, and no jargon. A reader who is not a YouTube strategist should understand every line on first read.
10. End with the artifact laid out in the skill's "Output Format" section.

## Connecting the MCP

- Claude Code: this repo is a plugin; `.mcp.json` registers `https://public-api.tubelab.net/mcp` and the first call opens OAuth. Or `claude mcp add --transport http tubelab https://public-api.tubelab.net/mcp`.
- Claude.ai, Claude Desktop: the TubeLab connector (https://claude.ai/directory/tubelab), OAuth.
- ChatGPT and Codex: the TubeLab app (https://chatgpt.com/plugins/plugin_asdk_app_6ab3980fb1488191a9b26b3f59efd90b), OAuth.
- Grok Bot: ask the Bot to add the MCP server by URL, then paste or point it at a `SKILL.md` and ask it to save it as a skill; Grok Build: `/mcps` modal, skills in `.grok/skills/` or `~/.grok/skills/`.
- Cursor, others: API key as `Authorization: Bearer <key>` (Pro plan). Setup: https://tubelab.net/docs/api/mcp-server
- No MCP: the REST reference at https://tubelab.net/docs/skill.md.

## Repo conventions for contributors

See `CONTRIBUTING.md`. Each workflow skill is one self-contained `SKILL.md` with the sections Overview · Workflow · Output Format · Common Pitfalls. No skill has a `references/` folder; the full API reference lives at https://tubelab.net/docs/skill.md. Keep it simple, do not over-engineer, Conventional Commits (`type(scope): subject`). Run `node scripts/validate-skills.mjs` before opening a PR.
