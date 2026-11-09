---
name: video-ideation
description: Use when the user wants video ideas for a YouTube channel, what to make next, or topics for the coming month. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Video Ideation

## Overview

Six ideas for one channel, each with two proofs: an outlier that shows demand now, and one of the channel's own videos that shows fit. Demand without fit belongs on someone else's channel. Adapt the winner, never copy it.

## Workflow

1. Clarify scope only if needed. Assume the goal is reach, or conversion if the channel sells something.
2. Read the channel: median, best videos by ratio, flops.
3. Search for outliers in its niche and one adjacent niche, at most 2 winners per channel. Reads are free; about three searches is enough.
4. Change one thing in each winner (topic, audience, angle or format) and pair it with its fit proof. Rank by the weaker proof. For a new channel, say there is no fit proof and rank on demand.

## Output Format

```markdown
# Video Ideas: {channel} (@handle)

**{Best idea and why, in one line.}**
Goal: {reach or conversion} · Confidence: {level, short reason}

1. **{Title}**
   Demand: {proof}
   Fit: {own title · views · ratio · date}
   Angle: {what changed, why it suits}
```

About 500 words: six ideas, strongest first, one proof each: channel (handle) · title verbatim · views · ratio · date. Add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not take demand from another audience or language, sister channels, or paid placements (huge views, almost no likes).
- Do not trust ratios from channels with a few hundred subscribers.
- Do not mix Shorts and long-form, or pitch a video the channel already made.
- Do not write titles over 60 characters.
