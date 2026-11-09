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

Find the channels competing for the same viewers. Similar is not competing: a competitor serves the same audience with an overlapping promise. The value is the gap, what competitors win with that this channel does not cover. Not for how they earn (`monetization-research`).

## Workflow

1. Clarify scope only if needed.
2. Start with the channels the user names and the ones you know. Verify each with free reads (topic, audience, language, size) and keep about 5.
3. Search for similar channels only if you cannot name five. It is weak, worst for large channels.
4. Compute every median over the last 90 days.

## Output Format

```markdown
# Competitor Research: {channel} (@handle)

**{Biggest gap, in numbers.}**
Set from: {named, search, known} · Confidence: {level, short reason}

| Channel (handle) | Subs | Median views | Median / subs | Uploads, 90 days | Topics |
|---|---:|---:|---:|---:|---|

## Gaps to Win
1. {Gap} · {proof} · {why this channel can own it}

Copy: ... · Avoid: ...
Positioning: {one sentence}
```

About 400 words. The channel is the first row; three gaps, one proof each: channel (handle) · title verbatim · views · ratio · date. Cut items before proof; add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not keep a channel because search returned it. Tiny and off-topic lookalikes are common.
- Do not compare raw medians across sizes. Median per subscriber is fairer.
- Do not mix Shorts with long-form.
- Do not build a gap on one lucky video. It should win more than once.
