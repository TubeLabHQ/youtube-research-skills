---
name: trend-report
description: Use when the user asks for a trend report, what is trending in a niche this week or month, a recurring digest, trends for their channel, or which hooks work now. Finds the current outliers with the TubeLab MCP, quotes each winner's opening hook from its transcript, and writes a dated Trend Report with patterns, ideas and learnings.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Trend Report

## Overview

Write a dated trend digest for a niche or a channel: the current winners with their verbatim spoken hooks, the patterns they share, ideas for this channel and learnings. The TubeLab MCP is the data layer: niche outliers, outliers from similar channels, trending formats, each winner's transcript for the hook.

## When to Use

Use this skill when the user asks to:

- get a trend report for a niche or for their channel
- see what is trending this week or month, or a recurring digest
- know which hooks are working right now, word for word

Not for ranked ideas alone (`video-ideation`), one format in depth (`outlier-research`), or a diagnosis (`channel-teardown`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_outliers` | The niche's current winners by ratio |
| `search_related_outliers` | Outliers from channels like this one |
| `search_trending_formats` | Frameworks with momentum and triggers |
| `get_channel_videos` / `get_channel_shorts` | The channel's niche, median and voice |
| `get_video_transcript`, `get_video` | The verbatim hook; fallback metadata |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Niche keyword and/or channel (at least one; derive the niche from the channel's titles if needed)
   - Window (default `month`), language (the channel's, else `["en"]`), long-form or Shorts, 5 to 8 videos, 10 ideas

2. **Channel context (when given)**
   - `get_channel_videos` (fallback `get_channel_shorts`): niche, median views, best formats, voice (benefit-first, first-person discovery, lists, alarm). Two lines.

3. **Niche search**
   - `search_outliers` with `query: ["<niche>", "<second phrasing>"]`, `publishedAtFrom: "month"`, `sortBy: "averageViewsRatio"`, `averageViewsRatioFrom: 1.5`, `classificationQuality: "neutral"`, `language`, `type` matching the channel, `excludeKeyword: [slop list]`, `size: 20`.
   - Under 8 usable hits: widen `month` to `trimester` to `semester` to `year`, one step at a time; state the window in the header.

4. **Related search (when a channel is given)**
   - `search_related_outliers` with `relatedChannelId: ["<channel id>"]`, same window and quality, `size: 20`. A third `search_outliers` on a sub-topic only if under 10 usable hits so far.

5. **Formats with momentum**
   - `search_trending_formats` with `query: ["<niche>"]`, `size: 12`, no `language` (the live server rejects it). Keep `framework`, `clickTrigger[]`, `overall_stats.doc_count`, `overall_avg_views_ratio`. Match each winner's title to a framework, else write a `[bracketed]` template.

6. **Select the winners**
   - Merge, max 2 per `snippet.channelId`, rank by `averageViewsRatio` with `channelSubscribers` beside it. Take 5 to 8 recent, on-niche, varied in format; prefer ratios above 3.

7. **Hooks**
   - `get_video_transcript` per winner: `events[].text` joined from the start until `startMs` passes 45000 or about 80 words, in the video's language. No transcript: write "no transcript available" and derive the hook formula from `get_video` title and description.

8. **Fields per winner**
   - Why It Worked (the lever: curiosity gap, urgency, loss aversion, relatability, authority, contrast, named figure, personal mystery) · Outlier Score (`averageViewsRatio`, one decimal; add z when `zScore` above 3) · Views (with subscribers) · Trending Format (template) · Thumbnail Formula (only after viewing `snippet.thumbnails.high.url`, else "not reviewed") · Hook Formula (structure and why it holds) · Topic (3 to 8 words).

9. **Patterns, ideas, learnings**
   - Patterns: Topics (3 to 5) · Trending Formats · Thumbnail Formulas (reviewed only) · Hook Formulas (2 to 4) · Triggers (from `clickTrigger[]`) · Power Words (verbatim from winning titles). A pattern is 2 or more winners from different channels.
   - Ideas (10): each fuses one format or trigger with the channel's voice, title under 60 characters, one-line Why naming the borrowed element and the fear or desire served. No two on the same format; without a channel, write for a generic entrant.
   - Learnings (3): numbered bold lessons, each with the pattern and one application with an example title.

## Output Format

```markdown
# TubeLab Trend Report for {@channel or niche} on {run date}

## Summary
- Sample: {n} winners after dedupe, from {n} channels
- Window: {month | widened to x, because y} · Language: {lang} · Type: {long-form | Shorts}

## Trending Videos
### [{Title verbatim}](https://www.youtube.com/watch?v={id})
- **Hook:** {first ~45 seconds verbatim, or "no transcript available"}
- **Why It Worked:** {one sentence naming the lever}
- **Outlier Score:** {ratio, 1 decimal}
- **Views:** {viewCount} ({subscribers} subscribers)
- **Trending Format:** {[Bracketed] template}
- **Thumbnail Formula:** {what it shows and why, or "not reviewed"}
- **Hook Formula:** {structure + why it holds}
- **Topic:** {3-8 words}
{repeat for 5 to 8 videos}

## Winning Patterns
- **Topics:** · **Trending Formats:** · **Thumbnail Formulas:** · **Hook Formulas:** · **Triggers:** · **Power Words:**

## Video Ideas based on Research for {@channel}
- **{Title under 60 chars}** - Why: {borrowed format or trigger + channel identity + the fear or desire served}  (10)

## Learnings
**1. {Lesson}:** {observed pattern}. {Application with an example title.}  (3)
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen one step at a time and state the window. Never drop `classificationQuality`.
- Rank by ratio, show views and subscribers beside it.
- Every winner carries channel, title verbatim, views, ratio, date. If you did not fetch it, it is not evidence.
- Five searches is the ceiling. Never paginate a paid search; reads are free.

## Common Pitfalls

- Do not paraphrase or clean up a hook beyond trimming, or write one for a video without a transcript.
- Do not describe a thumbnail you did not view; write "not reviewed".
- Do not read a 1.5x on a 2M-subscriber channel as a trend, or six winners from one channel.
- Do not copy a winner's title into an idea, or invent a channel, video, view count or quote.
