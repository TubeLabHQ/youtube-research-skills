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

1. Clarify scope only if needed. Default to 10 to 15 videos: those given, else the channel's latest (its best if asked), else a topic's top outliers. Finding videos by topic costs one search.
2. Fetch comments one video at a time; parallel saves overwrite. Remove spam, repeated rows and the creator's replies.
3. Group the rest into questions, objections and requests.

## Output Format

```markdown
# Voice of Audience: {channel, topic or videos}

- **Biggest ask:** {likes, videos}
- **Sample:** {n} videos, {n} comments
- **Confidence:** {level, brief why}

## Themes
1. **{Theme}**
   - {n} videos · {likes} likes
   - "{best quote}" · [{video}]({url})
   - Means: {short}

| Comment (verbatim) | Type | Likes | Video (link) |
|---|---|---:|---|

## Their Words
- "{phrase}" · {n} times

## Video Ideas
1. **{Title}** · answers {theme}
```

About 500 words: five themes, ten comments, three ideas. One fact per bullet, under 25 words except quotes; no extra sections or bullets. Cut items before quotes. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above.
- Do not present a paraphrase as a quote.
- Do not call it a theme under fewer than 3 videos.
- Do not rank spam. Book promos and bots collect likes.
- Do not read a quiet section as a happy one. Top comments skew positive.
- Do not read disabled comments as a finding. Say "no data".
