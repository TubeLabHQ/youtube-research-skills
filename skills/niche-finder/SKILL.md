---
name: niche-finder
description: Use when the user wants to find a YouTube niche, an untapped or faceless channel idea, or to twist or combine niches. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Niche Finder

## Overview

The product is new channel ideas, not a list of existing niches. The best openings sit beside proven demand: a format that works in one topic and is missing from another, or a working niche for an audience nobody serves.

## Workflow

1. Clarify scope only if needed: a starting topic or none, faceless or on camera.
2. Lead with outlier searches; search channels only to see if newcomers break in. Group by topic, format and audience.
3. Bend the strongest: fuse two formats, swap the audience, or move a format where it is absent.
4. Check the top 3 with one search each. Few hits beside a healthy parent means open.
5. Expect about six searches. Fetch and view every featured thumbnail; say if one fails.

## Output Format

```markdown
# Niche Ideas: {topic or "open discovery"}

- **Best idea:** {idea, its number}
- **Sample:** {n} outliers
- **Confidence:** {level, brief why}

1. **{Idea}** · {audience, format}
   - Bent from: {parent niche, the move}
   - ![]({thumbnail})
   - [{channel}]({url}) · [{title}]({url}) · {views, ratio, date}
   - Open check: {hits found}
   - First video: {title}
```

About 400 words: three to five ideas. One fact per bullet, under 25 words except quotes; no extra sections or bullets. Cut ideas before proof. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not trust ratios from near-zero-subscriber channels, huge views with almost no likes (usually paid), or the language tag (Hindi or Urdu can be tagged English).
- Do not transplant on words alone; the audience must already watch the topic.
- Do not offer reupload, compilation or AI filler niches without a demonetization warning.
