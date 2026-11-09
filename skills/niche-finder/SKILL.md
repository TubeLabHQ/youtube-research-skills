---
name: niche-finder
description: Use when the user wants to find a YouTube niche, an untapped or faceless channel idea, or to twist and combine niches into something new. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Niche Finder

## Overview

Find what is working on YouTube right now, then bend it into channel ideas that do not exist yet. Not for an existing channel (`video-ideation`) or a go or no-go (`niche-validator`).

## Workflow

1. Clarify scope only if needed. Ask once about faceless or on camera.
2. Find the channels and outlier videos working right now.
3. Group them into niches and judge demand, supply and audience.
4. Bend the best into new ideas: fuse two formats, swap the audience, or move a format to a topic where it is absent.
5. Check the top 3 ideas with one search each. Few hits beside a healthy parent niche means open.

## Output Format

```markdown
# Niche Shortlist: {topic or "discovery"}

Sample: {n} channels, {n} outliers · Confidence: {level, why}

## Working Niches
| Niche | Proof (handle · title · views · ratio · date) | Saturation |
|---|---|---|

## New Ideas
| Idea | How it was bent | Hits found | First title |
|---|---|---:|---|

## Caveats
- ...
```

Keep it under 350 words, with at most 5 rows per table and 3 caveats.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not start with a subscriber floor, but do not trust ratios from channels with almost no subscribers.
- Do not transplant on words alone. "For seniors" on a topic seniors do not watch is dead.
- Do not present compilation, AI filler, reaction or animal niches without a warning.
- Do not count huge views with almost no likes. It is usually paid.
- Do not run more than six searches, or invent a channel or a number.
