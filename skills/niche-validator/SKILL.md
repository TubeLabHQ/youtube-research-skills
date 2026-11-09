---
name: niche-validator
description: Use when the user wants to know whether a YouTube niche is worth entering, is saturated, or how crowded a channel's niche is. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Niche Validator

## Overview

Give one niche one verdict: enter, enter with a twist, or stay out. Not for finding niches (`niche-finder`).

## Workflow

1. Clarify scope only if needed. If given a channel, name its niche from its titles.
2. Judge demand, supply and how many new channels are breaking in.
3. Find the formats carrying the niche and what the leaders never cover.
4. Give the verdict and the entry plan.

## Output Format

```markdown
# Niche Verdict: {niche}

**{Enter | Enter with a twist | Stay out}.** {Why, in numbers.}
Sample: {n} channels, {n} outliers · Confidence: {level, why}

## Formats That Work
| Format | Proof (handle · title · views · ratio · date) |
|---|---|

## Gaps
- ...

## Entry Plan
{Format, plus the first 3 titles.}

## Caveats
- ...
```

Keep it under 300 words, with at most 5 rows per table and 3 caveats.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not call a niche open because views look large. Ten incumbents and nothing new clearing 1K median views is closed.
- Do not use the search total to measure supply. It is capped.
- Do not count huge views with almost no likes. It is usually paid.
- Do not call something a format with fewer than 3 outliers from different channels.
- Do not give a verdict on under 10 on-topic channels.
- Do not run more than three searches, or invent a channel or a number.
