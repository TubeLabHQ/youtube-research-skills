---
name: niche-validator
description: Use when the user wants to know whether a YouTube niche is worth entering, is saturated, or how crowded a channel's niche is. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Niche Validator

## Overview

Give one niche one verdict: enter, enter with a twist, or stay out, with the numbers behind it.

## When to Use

Use this skill when the user asks to:

- decide if a niche is worth entering
- check if a niche is saturated or how crowded it is
- validate a channel idea

Do not use this for finding or bending niches (`niche-finder`) or why one video worked (`outlier-research`).

## Workflow

1. Clarify scope only if needed. If given a channel, name its niche from its titles. Ask once about faceless or on camera.
2. Measure demand, supply, freshness and audience quality from the niche's channels.
3. Find the formats carrying the niche.
4. Read 2 to 3 leaders for what they do and never cover.
5. Find the gaps and 2 to 3 ways to twist the niche.
6. If the niche looks crowded, compare other-language markets.
7. Give the verdict. Enter on healthy demand and low supply. Twist on healthy demand, high supply and an open gap. Otherwise stay out.

## Output Format

```markdown
# Niche Verdict: {niche}

**{Enter | Enter with a twist | Stay out}.** {Why, in numbers.}
Sample: {n} channels, {n} outliers · Confidence: {level, why}

## Demand and Supply
- Demand:
- Supply:
- Freshness:

## Audience
- ...

## Formats That Work
| Format | Outliers | Median ratio | Example (handle · title · views · ratio · date) |
|---|---:|---:|---|

## Gaps and Twists
- ...

## Entry Plan
Format · cadence · first 5 titles, each with its source outlier

## Caveats
- ...
```

## Common Pitfalls

- Do not search without `publishedAtFrom`. Start at `trimester`, widen one step at a time and say so.
- Do not search without `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not call a niche open because views look large. Ten incumbents and nothing new clearing 1K median views is closed.
- Do not judge openness by subscribers. Use ratio, median views and channel age.
- Do not call something a format with fewer than 3 outliers from different channels.
- Do not give a verdict on under 10 on-topic channels. Say the sample is too thin.
- Do not quote money or audience fields as facts, or run more than three searches.
- Do not invent a channel or a number.
