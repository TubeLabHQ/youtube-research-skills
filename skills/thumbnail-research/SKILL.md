---
name: thumbnail-research
description: Research what thumbnails work in a niche or find thumbnails that look like a reference video, using TubeLab's thumbnail similarity search and outlier data, then code each thumbnail on a fixed rubric and turn the patterns into a brief for the user's next thumbnail. Use when asked what thumbnails work in a niche, thumbnails like this video, why this thumbnail works, thumbnail ideas, a thumbnail brief, or how my thumbnails compare. Always filters to high Content Authenticity. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.1"
  requires: tubelab-mcp
  credits: "4-6 per run (2-3 searches at 2, reads free)"
  plan: starter
---

# Thumbnail research

The skill only TubeLab can run: outliers plus a thumbnail similarity search, reviewed on a fixed rubric so the result is a pattern, not a vibe. Output is a thumbnail board and three directions for the user's next thumbnail.

**Hard rule:** every search here uses `classificationQuality: "positive"` (High Content Authenticity) and it is never relaxed. A viral thumbnail on a low-effort channel teaches the wrong lesson. When results are thin, widen recency or change the query; never touch the quality floor.

- Use for: "what thumbnails work in X", "thumbnails like this one", "why does this thumbnail work", "brief for my next thumbnail", "how do my thumbnails compare".
- Not for: title work (`outlier-research`, `channel-teardown`), idea generation (`video-ideation`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Entry | A: a niche or topic · B: a reference video URL or ID. Ask if neither is given |
| Language | `["en"]` |
| User's channel | optional; enables the "yours vs theirs" comparison |
| Vision | decide yourself whether you can view images; otherwise use the fallback in step 4 |

## Credit budget

Say before the first paid call: "About 4 to 6 credits: 2 to 3 searches at 2, channel reads are free."

## Workflow

1. **Entry A (niche).** `search_outliers` with `query: ["<topic>"]`, `publishedAtFrom: "trimester"`, `sortBy: "averageViewsRatio"`, `classificationQuality: "positive"`, `language`, `type: "video"`, `size: 30`. Widen to `semester` then `year` only if under 8 hits, and say so.
2. **Entry B (reference video).** Extract the 11-character ID. `search_related_outliers` with `thumbnailVideoId: "<id>"`, `publishedAtFrom: "semester"`, `classificationQuality: "positive"`, `size: 24`: outliers whose thumbnails look like it (visual twins). Then the same call with `title: ["<the video's exact title>"]` instead: topic twins. The mean ratio of each set tells you whether the look or the topic is carrying the views.
3. **Dedupe** by `snippet.channelId` (max 2 per channel), keep the top 12 to 16 by `averageViewsRatio`. Record title verbatim, channel, `channelSubscribers`, views, ratio, `publishedAt`, `snippet.thumbnails.high.url`.
4. **Look at them.** With vision: write the URLs to a file and run `scripts/thumb-board.sh urls.txt`, which downloads them and, with ImageMagick installed, tiles a labelled contact sheet; otherwise open the URLs one by one. Without vision: deliver the URL list with ratios and the rubric for the user to fill, and build the board and directions from titles, ratios and the twin-set comparison only.
5. **Code each thumbnail** on the rubric. Use the exact values so patterns compare across runs.

| Column | Values |
|---|---|
| face | `none` · `one` · `many` (masked, back-of-head or tiny faces count as none) |
| expression | `neutral` · `surprise` · `fear` · `joy` · `anger` · `n/a` |
| text_words | integer; numbers count as one word |
| second_job | `adds` (text or image gives what the title withholds: result, number, object, reaction) · `echo` (repeats the title) · `none` |
| objects | integer, excluding faces and text |
| temperature / contrast | `warm` · `cool` · `mixed` / `low` · `medium` · `high` |
| layout | `subject_left` · `subject_right` · `center` · `split` |
| devices | `none` · `arrow` · `circle` · `box` · `multiple` |
| red_flag | `yes` when the image claims what the title does not support (fake number, staged shock). Flag, do not copy. |

6. **Find the patterns.** For each rubric value, compare the mean ratio of thumbnails with that value to the sample mean; report values at 1.3x or more as "associated with higher ratio", never as causes. Under 8 thumbnails the lifts are noise: say "thin signal" and describe archetypes qualitatively. Cluster into 3 to 4 archetypes (thumbnails sharing 3 or more rubric values), named by their strongest two, each with 2 to 3 examples and ratios.
7. **Compare with the user's own thumbnails** when a channel is given: `get_channel_videos` (free) gives the last videos with `thumbnails.high.url` and `averageViewsRatio`. Code the last 6 on the same rubric and note what they do differently from the winning archetypes.
8. **Write the board.**

## Output

```markdown
# Thumbnail board: <niche | "like <reference title>">
Run: <date> · Entry: <A | B> · Sample: <n> after dedupe · Credits used · Widened: <none | from, to, why> · Vision: <reviewed images | URL list, rubric for the user>

## 1. Board (top 12 by ratio)
| # | Thumbnail (image or link) | Title (verbatim) | Channel · subs | Views | Ratio | Published |
Entry B only: visual twins mean ratio <x> vs topic twins <y>. <One sentence: the look or the topic is carrying it.>

## 2. Archetypes
| Archetype | Defining rubric values | Examples (#) | Mean ratio |

## 3. Rubric table
| # | face | expression | text_words | second_job | objects | temperature | contrast | layout | devices | red_flag | ratio |
Lifts at or above 1.3: <column=value: lift>. Associated with, not caused by.

## 4. Yours vs theirs (when a channel was given)
| Your last 6 | second_job | face | contrast | ratio | Differs from winners by |

## 5. Three directions for your next thumbnail
1. **<Archetype> for <topic>:** <one-line brief a designer can execute: subject, text (max N words), what the text adds, colour, layout>

## 6. Do / don't
Do: <3 items from the lifts>. Don't: <3 items, including anything flagged red_flag>.
Caveats: thumbnails change after publish; ratios reflect title + thumbnail + topic together.
```

## Pitfalls

- Thumbnails change after publish; what you see today may not be what earned the ratio. Say so when a video is older than a trimester.
- Never relax `classificationQuality` below `positive` in this skill, even for an empty result.
- A 3x ratio on a 20-subscriber channel is a weak signal; show `channelSubscribers` next to every ratio.
- Without vision, do not describe thumbnails you have not seen.
- Shorts thumbnails are rarely seen; use `type: "video"` unless the user is on Shorts.

## Example prompts

- "What thumbnails work in home workouts right now? Give me 3 directions for my next one."
- "Find outliers whose thumbnails look like youtu.be/dQw4w9WgXcQ and tell me what the look has in common."
- "Compare my last 6 thumbnails (@mychannel) with the top performers in personal finance."
