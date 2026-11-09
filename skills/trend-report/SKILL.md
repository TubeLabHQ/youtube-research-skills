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

A dated report on what is winning in a niche now. Pick winners by ratio: beating its own channel's average says more than a big view count. A pattern needs three winners from different channels. To explain one video that blew up, compare it with its channel's normal videos.

## Workflow

1. Clarify scope only if needed. Default to the last month. Given a channel, its own videos are the baseline for the top finding, not winners.
2. Search for outliers, at most 2 winners per channel. Reads are free; two or three searches is enough.
3. Take each top winner's hook from its transcript. No transcript, no hook.

## Output Format

```markdown
# Trend Report: {niche or @channel} · {date}

**{Top finding in numbers, two sentences at most.}**
Sample: {n} winners · Window: {used} · Confidence: {level, short reason}

## Winners
### [{Title verbatim}]({url})
{Channel (handle)} · {views} · {ratio} · {date}
Hook: "{first one or two sentences, verbatim}"
Why: {one line}

## Patterns
- {Pattern} · {winners that show it}

## Ideas
1. **{Title}** · {pattern, why it fits}
```

About 600 words: five winners, three patterns, five ideas, one line per field. Cut ideas before proof; add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not promise a small channel's multiple. It proves a format, not a result.
- Do not count another audience or language, sister channels, or paid placements (huge views, almost no likes) as winners.
- Do not copy a winner's title. Keep the mechanism, change the topic.
