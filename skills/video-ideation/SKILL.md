---
name: video-ideation
description: Use when the user wants video ideas for a YouTube channel, what to make next, or topics for the coming month. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Video Ideation

## Overview

Generate video ideas for one channel, each backed by an outlier that proves demand and a channel video that proves fit. Not for finding a niche (`niche-finder`) or a channel analysis (`channel-analysis`).

## Workflow

1. Clarify scope only if needed. Assume the goal is reach, or conversion if the channel sells something.
2. Learn the channel's normal views, best videos and what flopped.
3. Find current outliers in its niche, at most 2 per channel.
4. Adapt the best into 10 ideas for this channel.
5. Rank by demand and fit.

## Output Format

```markdown
# Video Ideas: {channel} (@handle)

Goal: {reach | conversion} · Confidence: {level, why}

## Ideas
| Title | Source outlier (handle · title · views · ratio · date) | Fit (channel video that proves it) |
|---|---|---|

## Caveats
- ...
```

Keep it under 350 words, with at most 10 table rows and 3 caveats.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not use channels with a different audience as proof, such as an Indian channel for a channel targeting the US.
- Do not rank by raw views, or use the channel's own sister channels as proof.
- Do not count huge views with almost no likes, or trust ratios from tiny channels.
- Do not mix Shorts with long-form. They rarely transfer.
- Do not copy a title. Rewrite it under 60 characters for this channel.
- Do not run more than three searches, or invent a channel or a video.
