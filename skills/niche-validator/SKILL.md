---
name: niche-validator
description: Use when the user wants to know whether a YouTube niche is worth entering or already saturated. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Niche Validator

## Overview

One niche, one verdict: enter, enter with a twist, or stay out. The deciding question is whether new channels are breaking in now. If young, small channels are winning, the niche is open, however big the leaders.

## Workflow

1. Clarify scope only if needed. Given a channel, name its niche.
2. Search the niche for channels and recent outliers; read promising ones (age, cadence, median). Three searches suffice.
3. Name the winning formats and what the leaders never cover. That gap is the twist. Fetch and view every featured thumbnail; say if one fails.

## Output Format

```markdown
# Niche Verdict: {niche}

- **Verdict:** {one of the three}, {why, in numbers}
- **Sample:** {n} channels, {n} outliers
- **Confidence:** {level, brief why}

## Breaking In
- [{channel}]({url}) · {age, subs, median}

## Formats
1. **{Format}**
   - ![]({thumbnail})
   - [{channel}]({url}) · [{title}]({url}) · {views, ratio, date}

## Entry Plan
- **Angle:** {gap, format}
- **Titles:** {first 3}
```

About 400 words: three items per section. One fact per bullet, under 25 words except quotes; no extra sections or bullets. Cut items before proof. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not call a niche open on big views. Ten incumbents and no newcomer above 1K median views is closed.
- Do not count the capped search total as niche size, or huge views with almost no likes (usually paid) as demand.
- Do not name a format from fewer than 3 outliers on different channels, or trust their language tag: Hindi or Urdu can be tagged English.
- Do not give a verdict on fewer than 10 on-topic channels. Say what would settle it.
