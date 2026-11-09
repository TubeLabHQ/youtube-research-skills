---
name: trend-report
description: Use when the user wants a trend report or recurring digest of what is working right now in a YouTube niche or for a channel. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Trend Report

## Overview

Write a dated digest of what is winning in a niche right now: the videos, their spoken hooks, the shared patterns and ideas to act on.

## When to Use

Use this skill when the user asks to:

- get a trend report for a niche or channel
- see what is trending this week or month
- know which hooks are working right now

Do not use this for ideas alone (`video-ideation`), one format in depth (`outlier-research`), or a channel analysis (`channel-analysis`).

## Workflow

1. Clarify scope only if needed. Default to the last month and 5 to 8 videos.
2. If given a channel, learn its niche, normal views and voice.
3. Find the current winners in the niche and among similar channels, and the title formats gaining momentum.
4. Keep at most 2 per channel, varied in format.
5. Quote each winner's opening hook from its transcript.
6. Explain why each worked and name its title format and hook formula.
7. Write the shared patterns, 10 ideas and 3 learnings.

## Output Format

```markdown
# Trend Report for {@channel or niche} on {date}

Sample: {n} winners from {n} channels · Window: {used}

## Trending Videos
### [{Title}](https://www.youtube.com/watch?v={id})
- **Hook:** {verbatim opening}
- **Why It Worked:**
- **Outlier Score:** {ratio}
- **Views:** {views} ({subs} subscribers)
- **Trending Format:**
- **Thumbnail Formula:** {or "not reviewed"}
- **Hook Formula:**

## Winning Patterns
- Topics · Formats · Hooks · Triggers · Power words

## Video Ideas
- **{Title}** - Why: {borrowed format + what the audience wants}

## Learnings
**1. {Lesson}:** {Pattern and how to apply it.}
```

## Common Pitfalls

- Do not search without `publishedAtFrom`. Widen one step at a time and state the window.
- Do not search without `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not rank by raw views. Rank by `averageViewsRatio` and show both.
- Do not paraphrase a hook, or write one for a video with no transcript.
- Do not describe a thumbnail you did not view.
- Do not read a 1.5x on a 2M-subscriber channel, or six winners from one channel, as a trend.
- Do not pass a language to the trending formats search. The server rejects it.
- Do not copy a winner's title into an idea.
- Do not run more than five searches or paginate a paid search.
- Do not invent a channel, a video, a view count or a quote.
