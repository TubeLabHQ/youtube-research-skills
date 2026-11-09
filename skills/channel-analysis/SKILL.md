---
name: channel-analysis
description: Use when the user wants to analyze a YouTube channel for its positioning, what works, what holds it back, and what to change first. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Channel Analysis

## Overview

The median video is normal; the last few uploads are now. A format that loses views each time it returns is worn out: keep the mechanism, change the promise. An unrepeated win is the cheapest opportunity.

## Workflow

1. Clarify scope only if needed. Judge against the goal: reach, or conversion if the channel sells something.
2. Compare the last 4 to 6 long-form uploads with the median, format by format.
3. Check what works now for the same audience. Reads are free; two or three searches is enough.

## Output Format

```markdown
# Channel Analysis: {channel} (@handle)

**{Diagnosis in numbers, two sentences at most.}**
Positioning: {audience and promise}
Goal: {reach or conversion} · Confidence: {level, short reason}

## What Works
1. {Finding} · {proof}

## What Holds It Back
1. {Problem} · {proof} · Fix: {change}

## Next 3 Tests
1. **{Title}** · Based on: {proof} · Pass if: {views by day 30}
```

About 400 words, three items per section, one proof each: channel (handle) · title verbatim · views · ratio · date, without the channel on its own videos. Cut items before proof; add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not call fewer views a problem by itself. A healthy channel is a valid result.
- Do not read a ratio of 1.0 as normal. Ratio is views over the channel mean, so a median video sits below it.
- Do not judge uploads still gathering views, or mix Shorts into long-form.
- Do not state a cause as fact.
