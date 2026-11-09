---
name: competitor-research
description: Use when the user wants to find a YouTube channel's real competitors, compare it with them, and see the gaps and what to copy. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Competitor Research

## Overview

Find the channels closest to a YouTube channel, compare them, and show what to copy and how to stand apart. Not for one channel's analysis (`channel-analysis`) or how competitors earn (`monetization-research`).

## Workflow

1. Clarify scope only if needed. Include any competitors the user names.
2. Find 5 channels of similar size and audience.
3. Compare their views, cadence and main topics with the channel's.
4. Find what competitors win with that the channel misses.
5. Decide what to copy and write one positioning sentence.

## Output Format

```markdown
# Competitor Research: {channel} (@handle)

Competitors: {n} · Confidence: {level, why}

## Comparison
| Channel (handle) | Subs | Median views | Uploads /90d | Main topics |
|---|---:|---:|---:|---|

## Gaps to Win
| Gap | Proof (handle · title · views · ratio · date) |
|---|---|

## Copy and Avoid
- Copy:
- Avoid:

## Positioning
{One sentence.}

## Caveats
- ...
```

Keep it under 350 words, with at most 6 rows per table and 3 caveats.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not compare against channels with a different audience, such as an Indian channel for a channel targeting the US.
- Do not trust similar-channel results on a large channel. They are often tiny or off-topic.
- Do not stop at an empty search. Name likely competitors, verify them with free reads, and say so.
- Do not rank competitors by raw views, or mix Shorts with long-form.
- Do not run more than two paid searches.
- Do not invent a channel or a title.
