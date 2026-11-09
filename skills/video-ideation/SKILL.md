---
name: video-ideation
description: Use when the user wants video ideas for a YouTube channel, what to make next, or topics for the coming month. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Video Ideation

## Overview

Generate video ideas for one channel, each backed by an outlier that proves demand and a channel video that proves fit.

## When to Use

Use this skill when the user asks to:

- get video ideas or decide what to make next
- fill the next month with topics or titles
- borrow ideas from an adjacent niche

Do not use this for finding a niche (`niche-finder`), patterns with no channel (`outlier-research`), or a channel analysis (`channel-analysis`).

## Workflow

1. Clarify scope only if needed. Assume the goal is reach, or conversion if the channel sells something.
2. Learn the channel: normal views, best and worst videos, format mix and what flopped.
3. Find current outliers in its niche, and in an adjacent niche if given.
4. Keep at most 2 per channel and rank by ratio.
5. Turn the top 10 to 12 into 15 to 20 ideas by substituting, combining, adapting, twisting or reversing them for this channel.
6. Rank by demand and fit, and expand the top 5 with a thumbnail concept and an opening line.

## Output Format

```markdown
# Video Ideas: {channel} (@handle)

Channel: {subs} · median {n} · Goal: {reach | conversion} · Confidence: {level, why}

## Ideas
| Idea | Title | Move | Source outlier (handle · title · views · ratio · date) | Demand | Fit |
|---|---|---|---|---|---|

## Top 5
### 1. {Title}
- Fit: {the channel's own video that proves it}
- Source:
- Thumbnail concept:
- Opening line:

## Caveats
- ...
```

## Common Pitfalls

- Do not search without `publishedAtFrom`. Start at `month`, widen one step at a time and say so.
- Do not search without `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not use channels with a different audience as proof, such as an Indian channel for a channel targeting the US.
- Do not rank by raw views. Rank by `averageViewsRatio` and show both.
- Do not mix Shorts with long-form. They rarely transfer.
- Do not build on one outlier when the set shows a repeated pattern.
- Do not copy a title. Rewrite it under 60 characters for this channel's audience and authority.
- Do not make claims the channel cannot back.
- Do not hide tiny source channels. Mark them, because their ratios are inflated.
- Do not run more than three searches or paginate a paid search.
- Do not invent a channel or a video.
