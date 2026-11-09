---
name: outlier-research
description: Use when the user wants to know what is working in a YouTube niche, why a video blew up, or which hooks and formats to copy. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Outlier Research

## Overview

Find videos that beat their own channel's normal performance and explain the repeatable patterns behind them.

## When to Use

Use this skill when the user asks to:

- find what is working in a niche
- explain why a video blew up
- get hooks, formats or titles to copy

Do not use this to pick a niche (`niche-finder`), for one channel's ideas (`video-ideation`), for a dated digest (`trend-report`), or for thumbnails (`thumbnail-concepts`).

## Workflow

1. Clarify scope only if needed. Default to English long-form.
2. Find recent outliers on the topic, from two different angles.
3. Keep at most 2 videos per channel and rank by ratio.
4. Read the top 5 and drop paid placements.
5. Explain why each winner likely worked: topic, promise, format and title mechanic.
6. Extract the patterns, the hooks to copy and five ideas for the user's topic.

## Output Format

```markdown
# Outlier Report: {topic}

Sample: {n} outliers from {n} channels · Window: {used} · Confidence: {level, why}

## Biggest Outliers
| Title (verbatim) | Channel | Subs | Views | Ratio | Date | Why it likely worked |
|---|---|---:|---:|---:|---|---|

## Repeatable Patterns
1. **{Pattern}:** {format, title mechanic, examples, median ratio}

## Hooks to Copy
- "{Exact title}" · @handle · views · ratio · date

## Content Ideas
| Idea | Draft title | Pattern | Source outlier |
|---|---|---|---|

## Caveats
- ...
```

## Common Pitfalls

- Do not search without `publishedAtFrom`. Start at `month`, widen one step at a time and say so.
- Do not search without `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not treat raw views as the signal. 3M views at ratio 1.1 is the channel's normal.
- Do not call something a pattern with fewer than 3 outliers from different channels.
- Do not count huge views with almost no likes or comments. It is usually a paid placement.
- Do not describe a thumbnail you have not viewed, or paraphrase a title you present as a hook.
- Do not say "caused by". A ratio reflects title, thumbnail and topic together.
- Do not run more than three searches or paginate a paid search.
- Do not invent a channel, a title or a number.
