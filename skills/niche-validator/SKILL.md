---
name: niche-validator
description: Use when the user asks whether a niche is worth entering, if X is saturated, whether to start a channel about X, what niche a channel is in and how crowded it is, or to validate a niche idea. Measures demand, supply, audience and formats with the TubeLab MCP and writes a go, twist or no-go verdict memo.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Niche Validator

## Overview

One niche, one verdict: enter, enter with a twist, or stay out, with the numbers. The TubeLab MCP is the data layer: channel sample, outliers, free leader reads.

## When to Use

Use this skill when the user asks to:

- decide if a niche is worth entering, or if it is saturated
- know whether to start a channel about X, or how crowded a channel's niche is

Not for finding or bending niches (`niche-finder`) or why one video worked (`outlier-research`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_channels` | Demand, supply, freshness, audience, other languages |
| `search_outliers` | The formats carrying the niche |
| `get_channel` | Naming the niche; the leaders' best titles |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Niche keyword or a channel (one required), language (default `["en"]`), faceless or not (ask once), exclusions. With a channel, `get_channel` and name the niche from its titles in 2 to 4 words plus one alternative.
   - Language expansion (fr, de, es, pt) only if asked or the English verdict is "crowded"

2. **Supply and demand**
   - `search_channels` with `query: ["<niche>", "<alternative phrasing>"]`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `excludeNiche: [slop list]`, `language`, `size: 20`, no `sortBy`. Add `classificationIsFaceless: true` for a faceless plan. Drop off-topic hits.
   - Under 10 on-topic hits: widen `trimester` to `semester` to `year`, one step at a time, and say so.
   - Demand: median of `medianViewsEstimate` and share with `avgViewsToSubscribersRatio` above 1. Supply: on-topic count and near-duplicates (same `semantic.niches[]`). Freshness: share with `joinedDateEstimate` within a year. Audience: `audience.dominant`, else language proxy; note `monetization` bands.

3. **Formats that carry the niche**
   - `search_outliers` with the same `query` and window, `sortBy: "averageViewsRatio"`, `averageViewsRatioFrom: 3`, `classificationQuality: "neutral"`, `excludeKeyword: [slop list]`, `language`, `size: 20`. Max 2 per `snippet.channelId`; a format needs 3 outliers from different channels.

4. **Read the leaders**
   - `get_channel` on 2 to 3 leaders: cadence, Shorts mix, top 3 titles by `averageViewsRatio`, what they never cover.

5. **Gaps and bent ideas**
   - Topics no leader covers, formats from step 3 leaders skip, 2 to 3 bent ideas (swap audience or solution, fuse formats) with parents named.

6. **Language markets (optional, ask first)**
   - Rerun step 2 with `language: ["fr"]`, `["de"]`, `["es"]` or `["pt"]`; compare `pagination.total` and median views against English.

7. **Verdict**
   - Enter: healthy demand (median above the user's floor, ratio above 1 on most), low or stale supply. Twist: healthy demand, high supply, an open gap from step 5. Stay out: thin demand, near-duplicates with nothing new clearing the floor, or the wrong audience for the income goal.

## Output Format

```markdown
# Niche Verdict: {niche}

## Summary
- Sample: {n} on-topic channels, {n} outliers after dedupe
- Window: {trimester | semester | year}, widened because {reason}
- Confidence: High/Medium/Low

## 1. Saturation (demand vs supply)
Demand: median of medians {n} · {n} of {n} with ratio above 1
Supply: {n} on-topic · {n} near-duplicates · {n} joined within a year clearing {floor}
Verdict: {open | crowded but moving | saturated}

## 2. Audience quality
{region · age · income (estimate) or language proxy} · {monetization bands}

## 3. What is working (formats with proof)
| Format | Outliers (n, channels) | Median ratio | Example (@handle · title verbatim · views · ratio · date) |

## 4. Gaps and bent ideas
- {gap or idea} · move · parents (proof lines)

## 5. Other-language markets (if checked)
| Language | Channels found | Median views | Verdict |

## 6. Verdict and entry strategy
**{Enter | Enter with a twist | Stay out}.** {why, with the numbers}
Format · cadence · first 5 titles (<60 chars, each with its source outlier)

## 7. Notes and Caveats
- Estimates shown as labelled bands · what was not checked
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen one step at a time and say so. Never drop `classificationQuality`.
- Judge openness by ratio, median views and channel age, not subscribers.
- Every claim carries channel, title verbatim, views, ratio, date. If you did not fetch it, it is not evidence.
- Two or three searches is the default. Never paginate a paid search; reads are free.

## Common Pitfalls

- Do not call a niche open because views look large; ten incumbents and nothing new clearing 1K median views is closed.
- Do not quote monetization or audience fields as facts; the language proxy is a proxy.
- Do not turn under 10 on-topic hits after widening into a verdict, or invent a channel or a number.
