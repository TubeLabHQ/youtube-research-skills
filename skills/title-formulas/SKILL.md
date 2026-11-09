---
name: title-formulas
description: Use when the user wants YouTube title ideas, title templates, trending title formats, or to rewrite a title with a proven formula. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Title Formulas

## Overview

Give the user title formulas that are working now, proven in their niche and filled for their topic.

## When to Use

Use this skill when the user asks to:

- get title ideas or templates for a topic
- see which title formats are trending
- title a video or rewrite a title

Do not use this for what to make (`video-ideation`) or a full channel analysis (`channel-analysis`).

## Workflow

1. Clarify scope only if needed. Ask once what authority the channel can claim.
2. Pull the formulas most relevant to the topic and the ones gaining momentum.
3. Keep 5 to 8 with real volume, a strong ratio and examples that fit the topic.
4. Check the top 1 to 2 against live outliers in the niche.
5. Fill each formula three ways for the topic.
6. Bend two formulas into new ones.
7. Flag the formulas that are wearing out.

## Output Format

```markdown
# Title Formulas: {topic}

Kept: {n} · Validated in niche: {names} · Authority: {what the channel can claim}

## Formulas
| Formula | Trigger | Videos | Avg ratio | Momentum | Example (handle · title · views · ratio · date) |
|---|---|---:|---:|---|---|

## Validation
| Formula | On-topic outliers | Best example | Verdict |
|---|---:|---|---|

## Filled Titles
### {Formula}
1. {Title}

## Bent Formulas
- **{New formula}** = {A} + {B} · example title · untested

## Wearing Out
- {Formula} · why · how to refresh it

## Caveats
- ...
```

## Common Pitfalls

- Do not validate without `publishedAtFrom`, or `classificationQuality` at `"neutral"` or above.
- Do not pass a language to the trending formats search. The server rejects it, and the index is English.
- Do not reword a formula's pattern when searching with it. The match breaks.
- Do not trust a formula with many videos and a falling ratio. Everyone has already used it.
- Do not assume a trending formula fits. Read its example titles first.
- Do not drop a formula with no hits in the niche. Call it untested.
- Do not write titles over 60 characters or above the channel's authority.
- Do not run more than four searches or paginate a paid search.
- Do not invent a formula, a count or an example.
