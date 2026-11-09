---
name: trend-report
description: Use when the user wants to know what works now in a YouTube niche, why a video blew up, which hooks to copy, or a trend report. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Trend Report

## Overview

A dated report on what is winning in a niche now. Rank by ratio: a video that beats its own channel's average says more than a big view count. A pattern needs three winners from different channels. To explain one video that blew up, compare it with its channel's normal videos.

## Workflow

1. Clarify scope only if needed. Default to the last month. Given a channel, its own videos are the top finding's baseline, not winners.
2. Search for outliers, at most 2 winners per channel. Two or three searches suffice.
3. Quote each top winner's hook verbatim from its transcript; no transcript, no hook. Fetch and view every featured thumbnail; say if one fails.

## Output Format

```markdown
# Trend Report: {niche or [channel](url)} · {date}

- **Top finding:** {one line, in numbers}
- **Sample:** {n} winners, {window}
- **Confidence:** {level, brief why}

## Winners
1. **[{title}]({url})**
   - ![]({thumbnail})
   - [{channel}]({url}) · {views, ratio, date}
   - Hook: "{first sentence or two}"
   - Why: {short}

## Patterns
- **{Pattern}:** {winners}

## Ideas
1. **{Title}** · {pattern, fit}
```

About 600 words: five winners, three patterns, five ideas. One fact per bullet, under 25 words except quotes; no extra sections or bullets. Cut ideas before proof. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not promise a small channel's multiple. It proves a format, not a result.
- Do not count other-language, other-audience, sister-channel or paid videos (huge views, almost no likes) as winners. The language tag misses Hindi or Urdu; check title and thumbnail.
- Do not copy a winner's title; adapt what worked.
