# Agent routing guide

This repository is a set of Agent Skills for YouTube research on top of the TubeLab MCP. Skills live in `skills/<name>/SKILL.md`. Read the one that matches the ask, then follow it. `skills/tubelab-mcp` is the data layer every workflow skill links to; load it when a tool call fails, returns nothing, or you are unsure which filter to use.

## Which skill for which ask

| The user asks | Load |
|---|---|
| Find a niche, unsaturated niches, faceless ideas, twist or combine niches | `niche-finder` |
| What is working in X, why did this video blow up, hooks and formats to steal | `outlier-research` |
| Trend report, what is trending this week or month, weekly digest, hooks working right now | `trend-report` |
| Video ideas for my channel, what should I make next | `video-ideation` |
| Roast my channel, why did views die, packaging diagnosis, title rewrites | `channel-teardown` |
| What thumbnails work in X, thumbnails like this one, thumbnail brief | `thumbnail-research` |
| Thumbnail for this video or title or script, thumbnail concepts, generate thumbnails | `thumbnail-concepts` |
| Is X worth entering, is this niche saturated, go or no-go | `niche-validator` |
| Title formulas, trending title templates, fill a formula for my topic | `title-formulas` |
| Who are my competitors, how do I compare, competitive landscape | `competitor-landscape` |
| What do viewers ask or complain about, voice of audience, comments | `comment-mining` |
| Script structure, beat sheet, hook of this video, script skeleton | `transcript-intelligence` |
| How do channels like mine make money, raise RPM, what to sell, who sponsors them | `monetization-research` |
| Find creators to sponsor for a product, prospect list for a brand | `sponsorship-prospecting` |
| Watch a niche, which channels broke out since last run, scheduled digest | `niche-watchlist` |
| How do TubeLab tools work, which filter, credits, REST | `tubelab-mcp` |

Ordered chains for common jobs live in `playbooks/` (launch a faceless channel, monthly client report).

## Rules every skill follows

1. State the credit budget before the first paid search. Searches cost credits; channel, video, transcript and comment reads are free.
2. Always set `publishedAtFrom` (tokens: `month`, `trimester`, `semester`, `year`). Widen one step at a time and say so.
3. Content Authenticity is never off: `classificationQuality: "neutral"` for niches, outliers, ideation and titles; `"positive"` for anything thumbnail-related. Never drop it to widen a thin result.
4. Rank by `averageViewsRatio`, not raw views. Show both.
5. Proof line on every claim: channel (handle) · video title verbatim · views · ratio · date. No invented channels or numbers.
6. Revenue, RPM and audience are estimates. Present as bands, labelled.
7. End with the artifact laid out in the skill's "Output" section.

## Connecting the MCP

- Claude Code: this repo is a plugin; `.mcp.json` registers `https://public-api.tubelab.net/mcp` and the first call opens OAuth. Or `claude mcp add --transport http tubelab https://public-api.tubelab.net/mcp`.
- Claude.ai, Claude Desktop, ChatGPT app: official TubeLab connector or app, OAuth.
- Codex, Cursor, others: API key as `Authorization: Bearer <key>` (Pro plan). Setup: https://tubelab.net/docs/api/mcp-server
- No MCP: the REST fallback section in `skills/tubelab-mcp/SKILL.md`.

## Repo conventions for contributors

See `CONTRIBUTING.md`. Each workflow skill is one self-contained `SKILL.md`; only `tubelab-mcp` has a `references/` folder. Run `node scripts/validate-skills.mjs` before opening a PR.
