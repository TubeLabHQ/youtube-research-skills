---
name: title-formulas
description: Title formulas with proof for a YouTube topic, from TubeLab's trending-formats index. Pulls the formulas with the most videos and the most momentum, validates the chosen ones against live outliers in the user's niche, fills each formula three ways for the user's topic, bends two formulas into novel ones, and flags formulas that are exhausted. Use when asked for title ideas, title templates, trending title formats, how to title my video, titles that are working right now, or to rewrite a title with a proven formula. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "3-6 per run (2 search_trending_formats at 1, 1-2 search_outliers at 2 to validate)"
  plan: starter
---

# Title formulas

Titles with proof, not vibes. Every formula here comes from TubeLab's trending-formats index, which extracts the template behind outlier titles and counts how many videos use it and how they perform. The output is a formula sheet: the templates, their numbers, three filled titles each for the user's topic, and the bent formulas nobody has used yet.

- Use for: "title ideas for X", "trending title formats", "how should I title this", "titles that work right now", "rewrite this title with a proven formula".
- Not for: ideas for what to make (`video-ideation`), why a video worked (`outlier-research`), a channel's packaging diagnosis (`channel-teardown`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Topic | required; also the video's subject if a specific video is being titled |
| Emotion wanted | none; maps to `clickTrigger` (curiosity, open loop, solution, question, controversy, fear, urgency) |
| Authority the channel can claim | ask once: credentials, results, scale of experience; titles must not exceed it |
| Language | English only (the trending-formats index is English by default) |

## Credit budget

Say before the first paid call: "About 3 to 6 credits: two trending-formats searches at 1, one or two outlier searches at 2 to validate." Do not paginate.

## Workflow

1. **Formulas by relevance.** `search_trending_formats` with `query: ["<topic>"]`, `size: 12`. Do not pass `language` (the live server rejects it on this tool; the default is English). `quality` defaults to `positive`. Read per hit: `framework` (the template with `[X]` slots), `pattern` (the wildcard), `clickTrigger[]`, `overall_stats.doc_count`, `overall_stats.overall_avg_views_ratio`, `overall_stats.overall_median_views`, `videos[]` examples.
2. **Formulas by momentum.** Same call without `query`, `sortBy: "lastVideosCountChangePercentage"`, `size: 12`: the formulas gaining videos fastest right now, across niches. Add `clickTrigger: ["<emotion>"]` only when the user asked for one. Merge with step 1 and dedupe on `id`.
3. **Choose.** Keep 5 to 8 formulas: the ones with `doc_count` of 18 or more and `overall_avg_views_ratio` above 2, plus any from step 2 whose template fits the topic without strain. Rank by average views ratio, then by video count. Drop templates that only work in one unrelated niche (read the `videos[]` titles to tell).
4. **Validate in the niche (2 credits).** For the top 1 to 2 formulas, `search_outliers` with `titlePattern: "<the hit's pattern>"` (must contain `*` and at least two letters), `publishedAtFrom: "semester"`, `classificationQuality: "neutral"`, `sortBy: "averageViewsRatio"`, `size: 20`. Keep the hits that are on the user's topic. Two or more on-topic outliers with ratio above 3 confirms the formula in this niche; none means the formula is untested here, which is a note, not a reason to drop it.
5. **Fill each formula three ways** for the user's topic. Rules: under 60 characters, promise rung 3 or higher (rung 1 bare promise, rung 2 promise plus constraint, rung 3 named mechanism, rung 4 implicit promise where the mechanism carries everything), an authority signal the channel can back (a number of cases, a plain credential, a result, a scale), no claim the channel cannot support.
6. **Bend two formulas** into 2 to 3 novel ones: fuse the opening of one with the constraint or mechanism of another ("The [X] & [Y] Setup" + "I tried [X] for [N] days" → "I ran the [X] & [Y] setup for [N] days"). Validate a bent formula only if the user wants to spend 2 more credits; otherwise label it "untested".
7. **Exhausted warnings.** Flag a formula when its `lastAvgViewsRatioChangePercentage` is negative (sort by it to see), when all its `videos[]` examples are older than a trimester, or when the step 4 outliers show the ratio falling run over run. Exhausted formulas still ship on the sheet, marked, with the advice "change the promise, keep the mechanism".

## Output

```markdown
# Formula sheet: <topic>
Run: <date> · Credits used · Validated in niche: <formula names> · Authority available: <what the channel can claim>

## 1. Formulas
| # | Formula (framework) | Click trigger | Videos using it | Avg ratio | Median views | Momentum | Example (channel (handle) · title verbatim · views · ratio · date) |
Momentum: rising / steady / falling, from lastVideosCountChangePercentage and lastAvgViewsRatioChangePercentage.

## 2. Validation in <niche>
| Formula | On-topic outliers (n) | Best (channel (handle) · title verbatim · views · ratio · date) | Verdict |

## 3. Filled titles (3 per formula, under 60 characters, rung 3+)
### <Formula>
1. <title> · rung <3-4> · authority: <what backs it>
2. …
3. …

## 4. Bent formulas (untested unless validated)
- **<new framework>** = <formula A> + <formula B> · example title · why it should hold

## 5. Exhausted
- <formula> · why (falling ratio, stale examples) · how to refresh it

## 6. Caveats
Index is English and positive quality by default · ratios reflect title, thumbnail and topic together · formulas untested in this niche are marked
```

## Pitfalls

- A formula with 200 videos and a falling ratio is a formula everyone already used. Momentum fields decide, not volume.
- `pattern` goes into `titlePattern` as is; rewriting it drops the match.
- A title above the channel's authority gets the click and loses the trust. Ask what the channel can claim before filling.
- Formulas from step 2 are cross-niche; read their example titles before assuming they fit.
- Never present a filled title as proven. The formula is proven; the title is a draft.
- Never invent a formula, a count or an example video. If the index did not return it, it is not on the sheet.

## Example prompts

- "Give me 10 title formulas that are working for personal finance, with proof, and fill them for budgeting for couples."
- "Rewrite 'My home security setup' with a trending formula. I'm an ex-cop with 15 years on the job."
- "Which title formats are rising right now that would fit woodworking?"
