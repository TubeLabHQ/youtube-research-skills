---
name: niche-finder
description: Use when the user wants to find a YouTube niche, an untapped or faceless channel idea, or to twist and combine niches into something new. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Niche Finder

## Overview

Find what is working on YouTube right now, then bend it into channel ideas that do not exist yet.

## When to Use

Use this skill when the user asks to:

- find a niche or decide what channel to start
- find unsaturated, faceless or high-earning niches
- twist, combine or transplant a niche

Do not use this for an existing channel (`video-ideation`), one video (`outlier-research`), or a go or no-go (`niche-validator`).

## Workflow

1. Clarify scope only if needed. Ask once about faceless or on camera. Default to English.
2. Find channels and outlier videos working right now, including a pass for channels that earn.
3. Group them into niches and rate demand, supply, freshness, money and audience quality.
4. Read two leaders per top niche for their title patterns.
5. Bend what works into at least 8 ideas: fuse two formats, swap a topic's solution or audience, bridge two niches that share an audience, move a format to a topic where it is absent, or take a niche to a thinner language market.
6. Check the top 3 with one search each. Few hits beside healthy parent niches means open.
7. Rank by openness, audience match and the parents' demand.

## Output Format

```markdown
# Niche Shortlist: {topic or "discovery"}

Sample: {n} channels, {n} outliers · Confidence: {level, why}

## Working Niches
| Niche | Evidence (handle · title · views · ratio · date) | Median views | Audience | Money (estimate) | Saturation |
|---|---|---:|---|---|---|

## New Ideas
| Idea | Move | Parents | Audience match | Hits found | First 3 titles |
|---|---|---|---|---:|---|

## Other-Language Markets
| Niche | Language | Channels | Median views | Verdict |
|---|---|---:|---:|---|

## Caveats
- ...
```

## Common Pitfalls

- Do not search without `publishedAtFrom`. Start at `trimester`, widen one step at a time and say so.
- Do not search without `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not start with a subscriber floor. Small channels with 1K median views show what is new.
- Do not rank by subscribers. Use ratio and median views.
- Do not transplant on words alone. "For seniors" on a topic seniors do not watch is dead.
- Do not present compilation, AI filler, reaction or animal niches without a warning.
- Do not count huge views with almost no likes or comments as an outlier. It is usually paid.
- Do not quote estimates as facts, or run more than six searches.
- Do not invent a channel or a number.
