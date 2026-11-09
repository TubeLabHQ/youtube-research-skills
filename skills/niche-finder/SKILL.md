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

The product is new channel ideas, not a list of existing niches. The best openings sit beside proven demand: a format missing from a topic, or a working niche for an audience nobody serves.

## Workflow

1. Clarify scope only if needed: a starting topic or none, faceless or on camera.
2. Search broadly for what works now, and group it by topic, format and audience.
3. Bend the strongest: fuse two formats, swap the audience, or move a format to a topic where it is absent.
4. Check the top 3 with one search each. Few hits beside a healthy parent niche means open.
5. Expect about six searches. Read before you search again.

## Output Format

```markdown
# Niche Ideas: {topic or "open discovery"}

**{Best idea, with the number behind it.}**
Sample: {n} channels, {n} outliers · Confidence: {level, short reason}

1. **{Idea}** · {audience, format}
   Bent from: {parent niche, the move} · {proof}
   Open check: {hits, what they were}
   First video: {title}
```

About 400 words: three to five ideas, strongest first, one proof each: channel (handle) · title verbatim · views · ratio · date. Cut ideas before proof; add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not trust ratios from channels with almost no subscribers, or huge views with almost no likes. That is usually paid.
- Do not transplant on words alone. "For seniors" on a topic seniors do not watch has no audience.
- Do not offer reupload, compilation or AI filler niches without a demonetization warning.
