---
name: trend-report
description: Use when the user wants a trend report or recurring digest of what is working right now in a YouTube niche or for a channel. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Trend Report

## Overview

Write a dated digest of what is winning in a niche right now, with spoken hooks and ideas to act on. Not for ideas alone (`video-ideation`) or one format in depth (`outlier-research`).

## Workflow

1. Clarify scope only if needed. Default to the last month.
2. If given a channel, learn its niche and voice.
3. Find the current winners, at most 2 per channel.
4. Quote each winner's opening hook from its transcript.
5. Write the shared patterns, five ideas and three learnings.

## Output Format

```markdown
# Trend Report for {@channel or niche} on {date}

Sample: {n} winners · Window: {used}

## Trending Videos
| Video | Channel (handle) | Views | Ratio | Date | Hook (verbatim) | Why it worked |
|---|---|---:|---:|---|---|---|

## Winning Patterns
- ...

## Video Ideas
- **{Title}** · Why: ...

## Learnings
1. ...
```

Keep it under 450 words, with at most 5 rows per table.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not rank by raw views, or count the channel's own sister channels as winners.
- Do not read a 1.5x on a 2M-subscriber channel, or six winners from one channel, as a trend.
- Do not paraphrase a hook, or write one for a video with no transcript.
- Do not pass a language to the trending formats search. The server rejects it.
- Do not copy a winner's title into an idea.
- Do not run more than five searches, or invent a channel, a view count or a quote.
