---
name: channel-analysis
description: Use when the user wants to analyze a YouTube channel and understand its positioning, what is working, what is holding it back, and what to change first. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Channel Analysis

## Overview

Analyze a YouTube channel: what it is, what is working, what is holding it back, and what to test next.

## When to Use

Use this skill when the user asks to:

- analyze or review a channel
- explain why its views dropped
- improve its titles, thumbnails or packaging

Do not use this for ideas without an analysis (`video-ideation`), a niche-level view (`outlier-research`), or thumbnails alone (`thumbnail-concepts`).

## Workflow

1. Clarify scope only if needed. Assume the goal is reach, or conversion if the channel sells something.
2. Pull the channel's stats and recent videos. Use the median as "normal" and the last 4 videos as "now".
3. Identify who the channel serves, its promise and its content pillars.
4. Identify the formats that win, the formats losing views with each reuse, and any win never repeated.
5. Read the videos that best explain the pattern.
6. Find what is working in the niche right now and who the closest competitors are.
7. Explain what is holding the channel back, if anything: an exhausted format, a weak promise, no reason to trust, a title the video does not deliver, or thumbnail text that repeats the title.
8. Write recommendations as tests.

## Output Format

```markdown
# Channel Analysis: {channel} (@handle)

**Summary.** {Where the channel stands, in numbers.}
Sample: {n} videos · Goal: {reach | conversion} · Confidence: {level, why}

## Positioning
- Who it serves:
- Promise:
- Voice:

## Content Pillars
| Pillar | Evidence | Example videos |
|---|---|---|

## Priorities
1. {Action, with its proof.}

## What Is Working
| Video | Views | Ratio | Date | Repeatable mechanic |
|---|---:|---:|---|---|

## What Is Declining
| Format | Video | Views | Ratio | Date |
|---|---|---:|---:|---|

## What Is Holding It Back
### {Cause}: {finding}
| This channel | Views · ratio · date | Competitor (handle) | Views · ratio · date |
|---|---|---|---|

## What Not to Copy
- ...

## Tests for the Next 5 Uploads
| Test | Title to publish | Based on | Pass if |
|---|---|---|---|

## Caveats
- ...
```

Add title rewrites only if asked.

## Common Pitfalls

- Do not search without `publishedAtFrom`. Start at `semester`, widen one step at most and say so.
- Do not search without `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not compare against channels with a different audience, such as an Indian channel for a channel targeting the US.
- Do not rank by raw views. Rank by `averageViewsRatio` and show both.
- Do not run more than three searches or paginate a paid search.
- Do not let paid campaigns pass as competitors. Huge views at a ratio above 50 is usually an ad.
- Do not call fewer views a problem by itself. A healthy channel is a valid result.
- Do not assume causation. Say what the evidence suggests.
- Do not date declines to the day, mix Shorts with long-form, or judge thumbnails you have not seen.
- Do not invent a channel or a number.
