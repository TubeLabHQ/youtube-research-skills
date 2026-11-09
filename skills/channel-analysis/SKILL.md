---
name: channel-analysis
description: Use when the user wants to analyze a YouTube channel and understand its positioning, what is working, what is holding it back, and what to change first. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Channel Analysis

## Overview

Analyze a YouTube channel: what it is, what is working, what is holding it back, and what to test next. Not for ideas alone (`video-ideation`) or thumbnails alone (`thumbnail-concepts`).

## Workflow

1. Clarify scope only if needed. Assume the goal is reach, or conversion if the channel sells something.
2. Compare the channel's normal video (median) with its last 4.
3. Find who it serves, what wins and what is wearing out.
4. Compare with what is working in its niche right now.
5. Explain what is holding it back, if anything.
6. Write recommendations as tests.

## Output Format

```markdown
# Channel Analysis: {channel} (@handle)

**Summary.** {Where the channel stands, in numbers.}
Goal: {reach | conversion} · Confidence: {level, why}

## Positioning
{Who it serves, its promise and voice, in two sentences.}

## What Is Working
| Video | Views | Ratio | Date | Why |
|---|---:|---:|---|---|

## What Is Holding It Back
| Problem | Proof (title · views · ratio · date) | Fix |
|---|---|---|

## Tests for the Next 3 Uploads
| Title | Based on | Pass if |
|---|---|---|

## Caveats
- ...
```

Keep it under 400 words, with at most 5 rows per table and 3 caveats.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not compare against channels with a different audience, such as an Indian channel for a channel targeting the US.
- Do not rank by raw views, mix Shorts with long-form, or judge thumbnails you have not seen.
- Do not run more than three searches, or count ads as competitors. Huge views with almost no likes is usually paid.
- Do not call fewer views a problem by itself. A healthy channel is a valid result.
- Do not claim a cause or invent a number. Say what the evidence suggests.
