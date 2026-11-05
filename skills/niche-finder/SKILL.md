---
name: niche-finder
description: Use when the user asks to find a niche, what niche to start, unsaturated or untapped niches, faceless channel ideas, niche ideas with money in them, or to twist or combine niches. Finds the channels and formats working right now with the TubeLab MCP, then bends them into novel niche ideas, each validated with a cheap search.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Niche Finder

## Overview

Find what is working right now, then bend it into something that does not exist yet. The TubeLab MCP is the data layer: sample with the app's default views, cluster, transplant, fuse, check each idea with one search.

## When to Use

Use this skill when the user asks to:

- find a niche, or what channel to start
- find unsaturated, faceless or money niches
- twist, combine or transplant a niche

Not for an existing channel (`video-ideation`), one video (`outlier-research`), or a go/no-go (`niche-validator`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_channels` | Channels by topic, money, languages |
| `search_outliers` | Breakout formats; open-ness check |
| `get_channel` | Leaders' title mechanics |
| `search_trending_formats` | Optional format for a fusion idea |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Seed topics (optional), faceless or on camera (ask once), languages (default `["en"]`; de, fr, es, pt as expansions)
   - Extra exclusions, adventurousness 1 to 3 (default 2; 1 adjacent, 3 far)

2. **A. Niche Finder default view**
   - `search_channels` with `query` (seed topics, or omit for discovery), `subscribersFrom: 1`, `medianViewsFrom: 1000`, `videosCountFrom: 2`, `classificationQuality: "neutral"`, `publishedAtFrom: "trimester"`, `excludeNiche: [slop list]`, `language`, a fixed `seed`, `size: 20`, no `sortBy`. Add `classificationIsFaceless: true` if faceless. Drop off-topic hits (about a third with a `query`).

3. **A. Money pass**
   - Same base plus `monetizationAdsense: true`, `revenueMonthlyEstimationFrom: 1000`, `subscribersFrom: 1000`, once with `sortBy: "recency"` and once with `sortBy: "foundAt"`. Under 5 hits on a Starter account: rerun without the money filters and say so.

4. **A. Outliers Finder default view**
   - `search_outliers` with the same `query`, `viewCountFrom: 5000`, `type: "video"`, `classificationQuality: "neutral"`, `publishedAtFrom: "trimester"`, `excludeKeyword: [slop list]`, a fixed `seed`, `size: 30`, no `sortBy`.
   - Under 5 usable hits in any pass: widen `trimester` to `semester` to `year`, one step at a time, and say so.

5. **A. Cards and clusters**
   - Channel card: topic (`semantic.niches`) · job (what the viewer gets) · format (sample `videos[]` titles) · audience (`audience.dominant`) · money (`monetization`, `detections`) · age (`joinedDateEstimate`) · demand (`medianViewsEstimate`, `avgViewsToSubscribersRatio`). Outlier card: title, ratio, `channelSubscribers`, date.
   - Cluster by topic plus job. Score 1 to 5 on demand, supply (near-duplicates), freshness (joined within a year), money and audience quality (older, richer, first-world beats raw RPM). Saturation is high supply, low freshness.
   - Top 3 to 5 niches: `get_channel` on 2 leaders each for title mechanics.

6. **B. Bend, twist, transplant**
   At least 8 candidates, nearest to furthest from the evidence.
   - **Format fusion (adjacent).** Two proven formats in one packaging: "The 7 Levels of X" + "Your Life as a Y" = "Your Life as Every Level of X". A `search_trending_formats` hit only if it fits.
   - **Topic twist (adjacent).** Keep the job, swap the solution (cameras, dogs, lighting), or swap the audience (landlords).
   - **Audience bridge (medium).** Two niches share an audience: home security for seniors + dog training for seniors = "dogs as home security".
   - **Format transplant (medium to far).** A format proven in topic A moved to topic B where the audience matches and the format is absent: "what N burglars told me" becomes "what N nurses told me". Confirm the audience with `audienceRegion` on a `search_channels` of topic B.
   - **Market transplant (far).** Rerun step 2 with `language: ["fr"]`, `["de"]`, `["es"]` or `["pt"]`; compare `pagination.total` and medians. 40 English channels and 2 French with healthy medians is open. Only if the user has the language.

7. **B. Validate the top 3 and rank**
   - `search_outliers` with the bent idea as `query` (or its format as `titlePattern`), `publishedAtFrom: "semester"`, `classificationQuality: "neutral"`, `size: 10`. 0 to 3 hits beside healthy parents is open; a page of hits means differentiate or drop.
   - Rank by open-ness, then audience match, then the parents' demand and money scores.

## Output Format

```markdown
# Niche Shortlist: {topic or "discovery"}

## Summary
- Sample: {n} channels and {n} outliers, off-topic dropped
- Window: {used}, widened on {pass} because {reason} · Languages: {langs} · Faceless: {yes | no}
- Confidence: High/Medium/Low

## 1. Working niches
| # | Niche | Evidence channels | Median views | Ratio | Age | Audience | Money | Saturation 1-5 |
Proof line per evidence channel: @handle · title verbatim · views · ratio · date

## 2. Bent ideas (what does not exist yet)
| # | Idea | Move | Parents | Borrowed format | Audience match | Open-ness ({n} hits in {window}) | First 3 titles |

## 3. Market expansions
| Niche | Language | Channels found | Median views | Verdict |

## 4. Notes and Caveats
- Estimates as labelled bands · thin passes · not checked
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen one step at a time and say so. Never drop `classificationQuality`.
- Rank by ratio and median views, not subscribers.
- Every claim carries channel, title verbatim, views, ratio, date; unfetched is not evidence.
- Five or six searches is the default. Never paginate a paid search; reads are free.

## Common Pitfalls

- Do not transplant on words alone; "for seniors" on a topic seniors do not watch is dead.
- Do not present compilation, AI filler, reaction or animal niches without a differentiation warning.
- Do not use RPM filters for AdSense income; audience filters predict it.
- Do not quote estimates as facts, count views with no likes or comments as an outlier, or invent a channel or number.
