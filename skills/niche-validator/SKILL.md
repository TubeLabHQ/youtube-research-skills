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

One niche, one verdict: enter, enter with a twist, or stay out. The deciding question is whether new channels are breaking in now. Young, small channels winning means open, however big the leaders are.

## Workflow

1. Clarify scope only if needed. Given a channel, name its niche from its titles.
2. Search the niche for channels and recent outliers, then read the promising channels for age, cadence and median. About three searches is enough.
3. Name the formats carrying the winners, and what the leaders never cover. That gap is the twist.

## Output Format

```markdown
# Niche Verdict: {niche}

**{Enter, Enter with a twist, or Stay out}.** {Why, in numbers.}
Sample: {n} channels, {n} outliers · Confidence: {level, short reason}

## Breaking In
- {Channel (handle)} · {age} · {subs} · {median}

## Formats That Work
- {Format} · {proof}

## Entry Plan
{The gap, the format}, then the first 3 titles.
```

About 400 words, three items per section, one proof each: channel (handle) · title verbatim · views · ratio · date. Cut items before proof; add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not call a niche open on big views. Ten incumbents and no newcomer above 1K median views is closed.
- Do not count the search total as the niche's size (it is capped), or huge views with almost no likes as demand (usually paid).
- Do not name a format from fewer than 3 outliers on different channels.
- Do not give a verdict on fewer than 10 on-topic channels. Say what would settle it.
