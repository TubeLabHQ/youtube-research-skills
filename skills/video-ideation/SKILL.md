---
name: video-ideation
description: Use when the user asks for video ideas, what to make next, content ideas for their channel, topics for the next month, or titles for a specific channel. Reads the channel and searches current outliers in its niche with the TubeLab MCP, applies SCAMPER to each winner, and returns an idea bank ranked by demand and fit.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Video Ideation

## Overview

Ideas for one channel: each traces back to an outlier that proved the demand and a channel video that proved the fit. The TubeLab MCP is the data layer: free channel read, outlier searches, SCAMPER per winner.

## When to Use

Use this skill when the user asks to:

- get video ideas for their channel, or know what to make next
- fill the next month with topics or titles
- borrow ideas from an adjacent niche

Not for finding a niche (`niche-finder`), patterns with no channel (`outlier-research`), or a decline (`channel-teardown`).

## Data Sources

| Tool | Use it for |
|---|---|
| `get_channel_videos` / `get_channel_shorts` | Baseline, best and worst videos |
| `search_outliers` | Winners in the niche and the adjacent niche |
| `search_related_outliers` | Outliers from channels like this one |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Channel (required), goal: reach or conversion (default reach unless the description sells something; say which)
   - Adjacent niche keyword (none by default), idea count (15 to 20), type and language (the channel's)

2. **Learn the channel**
   - `get_channel_videos` (fallback `get_channel_shorts`): subscribers, `medianViewsEstimate`, `viewVariationCoefficient`, top 5 and bottom 5 videos by `statistics.averageViewsRatio`. Note format mix, promise style, what flopped. No payload.
   - Quality floor: `classificationQuality: "neutral"`, or `"positive"` when the channel is high-production.

3. **Niche search**
   - `search_outliers` with `query: ["<niche in 1-3 phrasings>"]`, `publishedAtFrom: "month"`, `sortBy: "averageViewsRatio"`, `averageViewsRatioFrom: 3`, `classificationQuality` as set, `language`, `type` matching the channel, `size: 20`.
   - Under 8 usable hits: widen `month` to `trimester` to `semester` to `year`, one step at a time, and say so.

4. **Adjacent and competitor searches**
   - Adjacent (only if a keyword was given): same filters with `query: ["<adjacent keyword>"]`; its ideas are "adapt" moves.
   - Competitor (optional): `search_related_outliers` with `relatedChannelId: ["<channel id>"]`, `publishedAtFrom: "trimester"`, `classificationQuality` as set, `size: 20`.

5. **Dedupe and rank the sources**
   - Max 2 per `snippet.channelId`. Rank by `averageViewsRatio` then `zScore`, `snippet.channelSubscribers` beside every ratio.

6. **SCAMPER the top 10 to 12 outliers relative to this channel**
   - Substitute, combine, adapt (from the adjacent niche), modify (twist the promise), put to other use (this channel's segment), eliminate (core claim only), reverse (flip the perspective). One to two ideas per outlier.

7. **Write titles**
   - Under 60 characters, promise rung 3 or above (1 bare promise, 2 plus constraint, 3 named mechanism, 4 implicit promise). No claim this channel cannot back.

8. **Rank and expand**
   - Demand (source ratio and recency) times fit (a close topic in the channel's top half, source channel within 10x of this size). Under a conversion goal, the segment the channel sells to outranks a higher ratio.
   - No fit is "new ground": report unranked. Expand the top 5 with a thumbnail concept (image, text of max 3 words) and an opening line.

## Output Format

```markdown
# Idea Bank: {channel title} (@handle)

## Summary
- Channel: {subs} · median {n} views · best format · goal assumed: {reach | conversion}
- Sample: {n} outliers after dedupe · window: {used}, widened because {reason}
- Confidence: High/Medium/Low

## 1. Idea bank (ranked)
| # | Idea | Title (<60 chars) | SCAMPER move | Source outlier (@handle · title verbatim · views · ratio · date) | Demand | Fit |
New ground (high demand, no fit): {list, unranked}

## 2. Top 5 expanded
### 1. {title}
- Fit: {the channel's own video that proves it, views, ratio}
- Source: @handle · title verbatim · views · ratio · date
- Promise rung · authority check
- Thumbnail concept: {image; text "{max 3 words}"}
- Opening line: "{first sentence}"

## 3. Notes and Caveats
- Source thumbnails reviewed or not · tiny source channels marked
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen one step at a time and say so. Never drop `classificationQuality`.
- Rank by ratio with views and subscribers beside it. Match `type` to the channel; Shorts rarely transfer to long-form.
- Every source carries channel, title verbatim, views, ratio, date. If you did not fetch it, it is not evidence.
- Three searches is the ceiling. Never paginate a paid search; reads are free.

## Common Pitfalls

- Do not build on one outlier when the set shows a repeated pattern.
- Do not copy a title verbatim; rewrite for this channel's audience and authority.
- Do not drop tiny source channels (under 100 subscribers); mark them, their ratios are inflated.
- Do not present thumbnail concepts as findings, describe thumbnails you did not view, or invent a channel or a video.
