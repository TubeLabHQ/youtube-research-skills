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

1. Clarify scope only if needed. Assume reach as the goal, or conversion if it sells.
2. Read the channel: median, best videos by ratio, flops.
3. Search for outliers in its niche and one adjacent niche, at most 2 winners per channel. About three searches suffice.
4. Change one thing in each winner (topic, audience, angle, format) and pair it with fit proof; rank by the weaker. A new channel has no fit proof: say so, rank on demand. Fetch and view every featured thumbnail; say if one fails.

## Output Format

```markdown
# Video Ideas: [{channel}]({url})

- **Best idea:** {title, why}
- **Goal:** {reach or conversion}
- **Confidence:** {level, brief why}

1. **{Title}**
   - ![]({thumbnail})
   - Demand: [{channel}]({url}) · [{title}]({url}) · {views, ratio, date}
   - Fit: [{own title}]({url}) · {views, ratio, date}
   - Angle: {what changed}
```

About 500 words: six ideas. One fact per bullet, under 25 words except quotes; no extra sections or bullets. Cut items before proof. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not take demand from another audience or language (tags miss Hindi or Urdu; check title and thumbnail), sister channels, or paid placements (huge views, almost no likes).
- Do not trust ratios from channels with a few hundred subscribers.
- Do not mix in Shorts, or pitch a video the channel already made.
- Do not write titles over 60 characters.
