---
name: comment-mining
description: Use when the user wants to know what a YouTube audience asks, wants or complains about in the comments, in their own words. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Comment Mining

## Overview

What the audience asks, objects to and wants next, in their own words. Likes are votes: a question with 900 likes is 900 people asking. Quotes stay verbatim; interpretation goes on its own line.

## Workflow

1. Clarify scope only if needed. Default to 5 videos: those given, else the channel's latest (its best if asked), else a topic's top outliers. Comments are free; finding videos costs one search.
2. Remove spam, repeated rows (the data has them) and the creator's replies.
3. Group the rest into questions, objections and requests, weighted by likes.

## Output Format

```markdown
# Voice of Audience: {channel, topic or videos}

**{Biggest ask, with likes and video count.}**
Videos: {n} · Comments kept: {n} · Confidence: {level, short reason}

| Comment (verbatim) | Type | Likes | Video |
|---|---|---:|---|

## Themes
- {Theme} · under {n} videos · {meaning}

## Their Words
- "{phrase}" · {n} times

## Video Ideas
1. **{Title}** · answers {comment} · {likes}
```

About 400 words: eight comments, three themes, three ideas, one line each. Cut items before quotes; add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above.
- Do not present a paraphrase as a quote.
- Do not call it a theme unless it appears under 3 or more videos. Under one, it is a local reaction.
- Do not rank spam. Book promos and bots collect likes.
- Do not read a quiet section as a happy one. Top comments skew positive.
- Do not treat disabled comments as a finding. Say "no data".
