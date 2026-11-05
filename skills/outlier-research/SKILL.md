---
name: outlier-research
description: Use when the user asks what is working in a YouTube niche, why a video blew up or went viral, what is trending in a topic, or for hooks, formats and titles to steal. Finds videos that beat their own channel's average with the TubeLab MCP, explains the repeatable patterns, and produces a swipe file with proof.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Outlier Research

## Overview

Find YouTube videos that beat their own channel's normal performance in a niche, then explain the repeatable patterns behind them. A 50K video on a 5K-average channel says more about a format than 2M views on a giant channel, so everything here ranks by ratio, not raw views. The TubeLab MCP is the data layer: search outliers, dedupe by channel, read the winners for free.

## When to Use

Use this skill when the user asks to:

- find what is working in a niche, or the breakout videos in a topic
- explain why a video blew up or went viral
- get hooks, formats or titles to steal, with proof
- build a swipe file of high-performing videos

Do not use this to pick a niche (`niche-finder`), for ideas for one existing channel (`video-ideation`), for a dated digest with spoken hooks (`trend-report`), or for thumbnails (`thumbnail-concepts`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_outliers` | Videos that outperformed their channel, by topic |
| `get_video` | Date, tags, description, likes and comments of a winner |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Topic as 1 to 3 phrasings, language (default `["en"]`), long-form or Shorts (default long-form)
   - Minimum ratio (default 3) and the user's own exclusions

2. **Main search**
   - `search_outliers` with `query: ["<topic>"]`, `publishedAtFrom: "month"`, `sortBy: "averageViewsRatio"`, `averageViewsRatioFrom: 3`, `classificationQuality: "neutral"`, `language`, `excludeKeyword: [slop list]`, `size: 20`.
   - Under 8 usable hits: widen `month` to `trimester` to `semester`, one step at a time, and say so. Never drop `classificationQuality`.

3. **Second search**
   - A different angle on the same topic (sub-topic, synonym, the audience's words), or `type: "short"` for Shorts channels. A third search only if both give under 10 usable hits together.

4. **Dedupe and rank**
   - Max 2 videos per `snippet.channelId`, keeping the higher ratios.
   - Rank by `statistics.averageViewsRatio`, tie-break on `zScore`, with `snippet.channelSubscribers` next to every ratio.

5. **Enrich the top 5**
   - `get_video` for exact `publishedAt`, `tags`, `description`, `duration`, likes and comments. Huge views with almost no likes or comments is a paid placement: drop it and say so.

6. **Explain each winner in one line**
   Topic, promise, format (the repeatable packaging), title mechanic (number, contrast, named mechanism, open loop, authority claim), channel size. Thumbnail only if you viewed `snippet.thumbnails.high.url`, else "not reviewed".

7. **Patterns, hooks, ideas**
   - A pattern needs 3 or more outliers from different channels; fewer is a "single observation". Rank by count times median ratio.
   - Hooks to steal are titles verbatim, never paraphrased.
   - Five ideas: a pattern applied to the user's topic, a draft title under 60 characters, the source outlier.

## Output Format

```markdown
# Outlier Report: {topic}

## Summary
- Sample: {n} outliers after dedupe, from {n} channels
- Window: {month | trimester | semester}, widened from {x} because {reason}
- Confidence: High/Medium/Low

## Biggest Outliers
| Rank | Title (verbatim) | Channel | Subs | Views | Ratio | Published | Why it likely worked |
|---:|---|---|---:|---:|---:|---|---|

## Repeatable Patterns
1. **Pattern name** — format, title mechanic, {n} examples from different channels, median ratio {x}.
Single observations: {list}

## Hooks to Steal
- "Exact title" · @handle · views · ratio · date

## Content Ideas Based on the Outliers
| # | Idea | Draft title (<60 chars) | Pattern | Source outlier (channel · views · ratio) |

## Notes and Caveats
- Thumbnails reviewed or not · patterns are associated with the lift, not proven causes · what was not checked
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen one step at a time and say so. Never drop `classificationQuality`.
- Rank by ratio, show views and subscribers next to it.
- Every claim carries channel, title verbatim, views, ratio, date. If you did not fetch it, it is not evidence.
- Two searches is the default, three the ceiling. Never paginate a paid search; reads are free.

## Common Pitfalls

- Do not treat raw views as the signal. 3M views at ratio 1.1 is the channel's normal.
- Do not call one channel with five hits a pattern.
- Do not describe a thumbnail you have not viewed, or paraphrase a title in the hooks list.
- Do not say "caused by"; ratio reflects title, thumbnail and topic together.
- Do not invent a channel, a title or a number.
