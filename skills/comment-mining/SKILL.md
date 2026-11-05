---
name: comment-mining
description: Use when the user asks what the audience is asking, what people complain about under these videos, what viewers want next, for a comment analysis, audience language for a script or ad, or ideas from comments. Reads top comments with the TubeLab MCP, classifies them, keeps every quote verbatim and turns the questions into video ideas.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Comment Mining

## Overview

What the audience says, in its own words. Comment reads on the TubeLab MCP are free, and the top 100 under a strong video hold the questions people cared enough to ask. The output keeps every quote verbatim and ends in five video ideas that answer them.

## When to Use

Use this skill when the user asks to:

- find out what people are asking or complaining about under these videos
- see what viewers want next, or run a comment analysis
- get the audience's language for a script, title or ad
- generate ideas from comments

Do not use this for why a video performed (`outlier-research`), its structure and hook (`transcript-intelligence`), or ideas without the audience's words (`video-ideation`).

## Data Sources

| Tool | Use it for |
|---|---|
| `get_video_comments` | Up to 100 top comments per video |
| `get_channel_videos` | A channel's recent videos by ratio |
| `search_outliers` | The videos, when only a topic is given |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Videos: 3 to 10 IDs or URLs, a channel, or a topic. Focus: none, or questions, objections, requests, vocabulary. Quotes stay in the videos' language.

2. **Collect the videos**
   - URLs: extract the 11-character IDs. Channel: `get_channel_videos`, the 5 to 8 most recent with the highest `statistics.averageViewsRatio`.
   - Topic: one `search_outliers` with `query: ["<topic>"]`, `publishedAtFrom: "trimester"`, `sortBy: "averageViewsRatio"`, `classificationQuality: "neutral"`, `size: 20`, max 2 per `snippet.channelId`, top 5 to 8. Never a second search; ask for IDs instead.

3. **Read the comments**
   - `get_video_comments` per video: `items[0].comments[]` with `authorText`, `text`, `likeCount`, `publishedAt`, `authorIsChannelOwner`.
   - "Failed Dependency" or "No comments found" means disabled: record "no data" and move on.
   - Skip the owner's comments. Dedupe on author plus text; payloads repeat entries and `statistics.count` can be 2 to 3 times the unique number. If `likeCount` is null throughout, rank by count and say so.

4. **Classify and cluster**
   - Labels: question, objection, request, praise with the reason, correction (often the most expert viewers), vocabulary (how they name the problem). Weight by `likeCount`: 400 likes is 400 people asking.
   - Merge questions that ask the same thing; the best-worded verbatim is the label. Rank by sum of likes, then count across videos. A theme spans 3 or more videos; one video is a local reaction.

5. **Verbatims, vocabulary, ideas**
   - 10 verbatims: exact text, author, likes, video. Prefer full-sentence problems, numbers, or contradictions of the video. Never trim a quote in a way that changes its claim.
   - Vocabulary: words the audience uses that the creator does not, for titles, hooks and ad copy as they are.
   - Five ideas, each answering a top question or objection: title under 60 characters, the cluster and its likes, the verbatim that proves demand.

## Output Format

```markdown
# Voice of Audience: {channel, topic or video set}

## Summary
- Videos read: {n} ({n} with comments disabled) · Comments: {n} unique · Likes available: yes/no
- Videos: channel (handle) · title verbatim · views · ratio · date (one line each)
- Confidence: High/Medium/Low

## 1. Top questions
| # | Question (best verbatim) | Likes (sum) | Count | Videos (n) |

## 2. Objections and corrections
| # | Objection or correction (verbatim) | Likes | Author | Video |

## 3. Requested videos
- "{verbatim request}" · likes · author · video

## 4. Ten verbatims worth quoting
1. "{exact text}" · @author · {likes} likes · {video title}

## 5. Audience vocabulary
- {word or phrase} · {how they use it} · seen {n} times

## 6. Five video ideas
| # | Title (<60 chars) | Answers | Likes behind it | Proof verbatim |

## 7. Caveats
Top comments skew positive and recent · likes measure attention, not purchase intent
```

## Quality Guardrails

- Quote, then interpret in a separate sentence; a sharpened paraphrase is fabrication.
- Every verbatim carries author, likes and the video it came from.
- At most one paid search, with `publishedAtFrom` and `classificationQuality: "neutral"`; comment reads are free.
- Themes need 3 or more videos; one video's comments reflect that video's title.

## Common Pitfalls

- Do not read a quiet comment section as a happy one; top comments overweight praise.
- Do not count the creator's replies as audience voice.
- Do not treat disabled comments or an error as a finding; it is "no data".
- Do not trust `statistics.count` as the number of unique comments.
- Do not invent a comment, an author or a like count.
