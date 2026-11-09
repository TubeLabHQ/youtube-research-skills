---
name: comment-mining
description: Use when the user wants to know what a YouTube audience asks, complains about or requests in the comments, or wants their exact language for scripts and ads. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Comment Mining

## Overview

Turn the top comments under a set of videos into what the audience asks, objects to and wants next, in their own words.

## When to Use

Use this skill when the user asks to:

- find what viewers ask or complain about
- see what viewers want next
- get the audience's language for a script, title or ad

Do not use this for why a video performed (`outlier-research`), its structure (`transcript-intelligence`), or ideas without the audience's words (`video-ideation`).

## Workflow

1. Clarify scope only if needed. Default to 5 to 8 videos.
2. Pick the videos: the ones given, a channel's recent best performers, or the top outliers on a topic.
3. Read the top comments and remove duplicates and the creator's own replies.
4. Group them into questions, objections, requests, praise with a reason, corrections and vocabulary, weighted by likes.
5. Pull the best verbatims and the words the audience uses that the creator does not.
6. Turn the top questions and objections into five video ideas.

## Output Format

```markdown
# Voice of Audience: {channel, topic or videos}

Videos: {n} · Unique comments: {n} · Confidence: {level, why}

## Top Questions
| Question (verbatim) | Likes | Videos |
|---|---:|---:|

## Objections and Corrections
| Comment (verbatim) | Likes | Author | Video |
|---|---:|---|---|

## Requested Videos
- ...

## Verbatims Worth Quoting
1. "{exact text}" · @author · {likes} likes · {video}

## Audience Vocabulary
- ...

## Video Ideas
| Title | Answers | Likes behind it | Proof comment |
|---|---|---:|---|

## Caveats
- ...
```

## Common Pitfalls

- Do not present a paraphrase as a quote. Quote first, interpret separately.
- Do not call something a theme unless it appears under 3 or more videos.
- Do not read a quiet comment section as a happy one. Top comments skew positive.
- Do not trust the comment count as unique comments. Responses repeat entries.
- Do not treat disabled comments as a finding. Say "no data".
- Do not run more than one paid search. If you need one, set `publishedAtFrom` and `classificationQuality` at `"neutral"` or above.
- Do not invent a comment, an author or a like count.
