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

Median views show the channel's typical video; the last few uploads show it now. Comparing them says whether it is healthy, rising or declining. A format that loses views each time it returns is worn out: keep what works, change the title's promise. A hit never followed up is the cheapest opportunity.

## Workflow

1. Clarify scope only if needed. Assume reach as the goal, or conversion if it sells.
2. Compare the last 4 to 6 long-form uploads with the median. Fetch and view every featured thumbnail; say if one fails.
3. Check what works now for the audience in two or three searches.

## Output Format

```markdown
# Channel Analysis: [{channel}]({url})

- **Diagnosis:** {one line, in numbers}
- **Positioning:** {audience, promise, goal}
- **Confidence:** {level, brief why}

## What Works
1. **{Finding}**
   - ![]({thumbnail})
   - [{title}]({url}) · {views, ratio, date}
   - Why: {short}

## Holding It Back
1. **{Problem}**
   - [{title}]({url}) · {views, ratio, date}
   - Fix: {short}

## Next Tests
1. **{Title}**
   - Based on: [{channel}]({url}) · [{title}]({url})
   - Pass if: {views by day 30}
```

About 500 words, three items per section. One fact per bullet, under 25 words except quotes; no extra sections or bullets. Cut items before proof. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not call fewer views a problem alone. Healthy is a valid result.
- Do not read a 1.0 ratio as typical; it uses the mean, so a median video sits below it.
- Do not judge uploads still gathering views, or mix in Shorts.
- Do not state a cause as fact. Say what the evidence suggests.
