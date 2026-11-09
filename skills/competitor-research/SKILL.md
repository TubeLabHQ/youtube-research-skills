---
name: competitor-research
description: Use when the user wants to find a YouTube channel's real competitors, compare it with them, and see the gaps, overlaps and what to copy. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Competitor Research

## Overview

Find the channels closest to a YouTube channel, compare them, and show what to copy, what to avoid and how to stand apart.

## When to Use

Use this skill when the user asks to:

- find who a channel's competitors are
- compare a channel with similar channels
- see what competitors cover that the channel does not

Do not use this for a single channel's analysis (`channel-analysis`), niche-level patterns (`outlier-research`), or how competitors make money (`monetization-research`).

## Workflow

1. Clarify scope only if needed. Include any competitors the user names.
2. Pull the channel's numbers, titles and content pillars.
3. Find 6 to 8 channels of similar size, plus 2 from the tier above.
4. Compare cadence, consistency, outlier rate, video length and content pillars.
5. Find the pillars competitors win with that the channel misses, the ones everyone covers, and the ones only this channel owns.
6. Decide what to copy and avoid, and write one positioning sentence.

## Output Format

```markdown
# Competitor Research: {channel} (@handle)

Competitors: {n} · Confidence: {level, why}

## Comparison
| Channel (handle) | Subs | Median views | Uploads /90d | Length | Outlier rate |
|---|---:|---:|---:|---|---:|

## Content Pillars
| Pillar | This channel | @competitor1 | @competitor2 |
|---|---|---|---|

## Gaps, Overlaps and Moats
- Gap: {pillar} · {handle · title · views · ratio · date}
- Overlap: ...
- Moat: ...

## Copy
- ...

## Avoid
- ...

## Positioning
{One sentence.}

## Caveats
- ...
```

## Common Pitfalls

- Do not search without `publishedAtFrom`. Start at `trimester`, widen one step at most and say so.
- Do not search without `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not search without a subscriber floor near a third of the channel's size. Large channels otherwise return small lookalikes.
- Do not compare against channels with a different audience, such as an Indian channel for a channel targeting the US.
- Do not assume similar means competing. Say when a match is only similar.
- Do not compare raw views. Use ratios, and keep Shorts apart from long-form.
- Do not run more than two paid searches or paginate them.
- Do not invent a channel or a title.
