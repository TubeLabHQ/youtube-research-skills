---
name: outlier-research
description: Use when the user wants to know what is working in a YouTube niche, why a video blew up, or which hooks and formats to copy. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Outlier Research

## Overview

Find videos that beat their own channel's normal performance and explain the patterns behind them. Not for picking a niche (`niche-finder`) or one channel's ideas (`video-ideation`).

## Workflow

1. Clarify scope only if needed. Default to English long-form.
2. Find recent outliers on the topic from two different angles.
3. Drop off-topic hits and keep at most 2 videos per channel.
4. Explain why the winners likely worked.
5. Extract the repeatable patterns.

## Output Format

```markdown
# Outlier Report: {topic}

Sample: {n} outliers from {n} channels · Window: {used} · Confidence: {level, why}

## Biggest Outliers
| Title (verbatim) | Channel (handle) | Views | Ratio | Date | Why it likely worked |
|---|---|---:|---:|---|---|

## Patterns to Copy
1. **{Pattern}:** {what to do, with examples}

## Caveats
- ...
```

Keep it under 300 words, with at most 5 table rows and 3 caveats.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not treat raw views as the signal. 3M views at ratio 1.1 is the channel's normal.
- Do not trust ratios from channels with almost no subscribers.
- Do not count huge views with almost no likes. It is usually paid.
- Do not call something a pattern with fewer than 3 outliers from different channels.
- Do not describe a thumbnail you have not viewed, or say "caused by".
- Do not run more than three searches, or invent a channel, a title or a number.
