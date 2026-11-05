---
name: title-formulas
description: Use when the user asks for title ideas, title templates, trending title formats, how to title a video, titles that are working right now, or to rewrite a title with a proven formula. Pulls formulas with volume and momentum from the TubeLab MCP trending-formats index, validates them against live outliers, and fills each one for the user's topic.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Title Formulas

## Overview

Titles with proof, not vibes. TubeLab's trending-formats index extracts the template behind outlier titles and counts how many videos use it and how they perform. The TubeLab MCP is the data layer: pull formulas by relevance and momentum, validate in the user's niche, fill, bend, flag the exhausted.

## When to Use

Use this skill when the user asks to:

- get title ideas or title templates for a topic
- see which title formats are trending or working right now
- title a specific video, or rewrite a title with a proven formula

Not for what to make (`video-ideation`) or a packaging diagnosis (`channel-teardown`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_trending_formats` | Title frameworks with counts, ratio, triggers, momentum, examples |
| `search_outliers` | Validating a formula's `pattern` in the user's niche |

Filters and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Topic (required), emotion wanted (none by default; maps to `clickTrigger`: curiosity, open loop, solution, question, controversy, fear, urgency)
   - Authority the channel can claim (ask once); titles must not exceed it. The index is English.

2. **Formulas by relevance**
   - `search_trending_formats` with `query: ["<topic>"]`, `size: 12`. Do not pass `language` (the live server rejects it); `quality` defaults to `positive`.
   - Per hit: `framework` (template with `[X]` slots), `pattern` (wildcard), `clickTrigger[]`, `overall_stats.doc_count`, `overall_avg_views_ratio`, `overall_median_views`, `videos[]`.

3. **Formulas by momentum**
   - Same call without `query`, `sortBy: "lastVideosCountChangePercentage"`, `size: 12`. Add `clickTrigger: ["<emotion>"]` only when asked. Merge with step 2, dedupe on `id`.

4. **Choose**
   - Keep 5 to 8: `doc_count` of 18 or more and `overall_avg_views_ratio` above 2, plus momentum hits whose template fits the topic. Rank by average ratio, then video count. Drop templates that only work in one unrelated niche (read the `videos[]` titles).

5. **Validate in the niche**
   - Top 1 to 2 formulas: `search_outliers` with `titlePattern: "<the hit's pattern>"` (must contain `*` and two letters), `publishedAtFrom: "semester"`, `classificationQuality: "neutral"`, `sortBy: "averageViewsRatio"`, `size: 20`.
   - Two or more on-topic outliers above ratio 3 confirms it; none means "untested here", not a reason to drop it.

6. **Fill each formula three ways**
   - Under 60 characters, promise rung 3 or higher (1 bare promise, 2 plus constraint, 3 named mechanism, 4 implicit promise), with an authority signal the channel can back.

7. **Bend two formulas**
   - Fuse the opening of one with the mechanism of another: "The [X] & [Y] Setup" + "I tried [X] for [N] days" becomes "I ran the [X] & [Y] setup for [N] days". Label "untested" unless validated.

8. **Exhausted warnings**
   - Flag when `lastAvgViewsRatioChangePercentage` is negative, all `videos[]` examples are older than a trimester, or step 5 ratios fall run over run. Ship them marked: "change the promise, keep the mechanism".

## Output Format

```markdown
# Formula Sheet: {topic}

## Summary
- Formulas kept: {n} of {n} returned · validated in niche: {names}
- Authority available: {what the channel can claim}
- Confidence: High/Medium/Low

## 1. Formulas
| # | Formula (framework) | Click trigger | Videos using it | Avg ratio | Median views | Momentum | Example (@handle · title verbatim · views · ratio · date) |

## 2. Validation in {niche}
| Formula | On-topic outliers (n) | Best (@handle · title verbatim · views · ratio · date) | Verdict |

## 3. Filled titles (3 per formula, under 60 characters, rung 3+)
### {Formula}
1. {title} · rung {3-4} · authority: {what backs it}

## 4. Bent formulas (untested unless validated)
- **{new framework}** = {formula A} + {formula B} · example title · why it should hold

## 5. Exhausted
- {formula} · why (falling ratio, stale examples) · how to refresh it

## 6. Notes and Caveats
- Ratios reflect title, thumbnail and topic together · formulas untested in this niche are marked
```

## Quality Guardrails

- Always set `publishedAtFrom` on the validation search and keep `classificationQuality: "neutral"`.
- Rank formulas by average ratio and momentum, not volume alone.
- Every example carries channel, title verbatim, views, ratio, date. If the index did not return it, it is not on the sheet.
- Four searches is the ceiling. Never paginate a paid search.

## Common Pitfalls

- Do not trust a formula with 200 videos and a falling ratio; everyone already used it.
- Do not rewrite `pattern` before passing it as `titlePattern`; rewriting drops the match.
- Do not assume cross-niche momentum formulas fit; read their example titles first.
- Do not fill above the channel's authority, and do not invent a formula, a count or an example video.
