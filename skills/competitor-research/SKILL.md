---
name: competitor-research
description: Use when the user wants to find a YouTube channel's real competitors, how it compares, and the gaps to win. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Competitor Research

## Overview

Find the channels competing for the same viewers. A similar channel is not always a competitor. A competitor serves the same audience with an overlapping promise. The value is the gap, what competitors win with that this channel does not cover. Not for how they earn (`monetization-research`).

## Workflow

1. Clarify scope only if needed.
2. Start with channels the user names and ones you know. Verify each with free reads (topic, audience, language, size) and keep five. Fetch and view every featured thumbnail; say if one fails.
3. Search for similar channels only if you cannot name five.
4. Use medians over the last 90 days.

## Output Format

```markdown
# Competitor Research: [{channel}]({url})

- **Biggest gap:** {one line, in numbers}
- **Set from:** {named, search, known}
- **Confidence:** {level, brief why}

| Channel (link) | Subs | Median views | Median / subs | Uploads, 90 days | Topics |
|---|---:|---:|---:|---:|---|

## Gaps to Win
1. **{Gap}**
   - ![]({thumbnail})
   - [{channel}]({url}) · [{title}]({url}) · {views, ratio, date}
   - Fit: {short}

## Moves
- **Copy:** ...
- **Avoid:** ...
- **Positioning:** {one sentence}
```

About 400 words: your channel first, three gaps. One fact per bullet, under 25 words except quotes; no extra sections or bullets. Cut items before proof. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not trust search lookalikes. They are often tiny or off-topic, worst for large channels.
- Do not compare raw medians across sizes; use median per subscriber.
- Do not mix in Shorts.
- Do not build a gap on one lucky video; it should win twice.
