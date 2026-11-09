---
name: comment-mining
description: Use when the user wants to know what a YouTube audience asks, complains about or requests in the comments, or wants their exact language for scripts and ads. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Comment Mining

## Overview

Turn the top comments under a set of videos into what the audience asks, objects to and wants next, in their own words. Not for why a video performed (`outlier-research`) or its structure (`transcript-intelligence`).

## Workflow

1. Clarify scope only if needed. Default to 5 videos.
2. Read the top comments on the videos given, a channel's recent best, or a topic's top outliers.
3. Remove spam, duplicates and the creator's replies.
4. Group what is left by likes into questions, objections and requests.
5. Turn the biggest ones into three video ideas.

## Output Format

```markdown
# Voice of Audience: {channel, topic or videos}

Videos: {n} · Unique comments: {n} · Confidence: {level, why}

## What They Ask and Want
| Comment (verbatim) | Type | Likes | Video |
|---|---|---:|---|

## Their Words
- {Phrase the audience uses} · seen {n} times

## Video Ideas
| Title | Answers | Likes behind it |
|---|---|---:|

## Caveats
- ...
```

Keep it under 300 words, with at most 8 rows per table and 3 caveats.

## Common Pitfalls

- Do not present a paraphrase as a quote.
- Do not call something a theme unless it appears under 3 or more videos.
- Do not rank spam. Book promos and bot replies often collect high likes.
- Do not read a quiet comment section as a happy one. Top comments skew positive.
- Do not treat disabled comments as a finding. Say "no data".
- Do not run more than one paid search. If you need one, set `publishedAtFrom` and `classificationQuality` at `"neutral"` or above.
- Do not invent a comment, an author or a like count.
