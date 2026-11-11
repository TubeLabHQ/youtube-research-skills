---
name: reverse-engineer-channel
description: Use when the user wants to reverse engineer how a YouTube channel grew, from its turning points, formats, thumbnails and hooks, into moves to copy and moves to skip. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Reverse Engineer Channel

## Overview

How one channel grew, worked out from its whole video list and turned into moves the user can copy. Growth comes in steps. A step is a stretch where typical views jump and stay up, after something changed: a format, a thumbnail look, a topic, a length, or a hit the channel then repeated. A trait the best and the worst videos share explains nothing. Every read here is free. Not for diagnosing the user's own channel (`channel-analysis`).

## Workflow

1. Clarify scope only if needed. If the user names their own channel or market, aim the moves at it.
2. Read the channel's full long-form list and its Shorts. Say how far back the list reaches, and whether the early videos are missing.
3. Group the videos by quarter, or by month for a young channel, with the uploads and median views of each period. Find the steps, where the median jumps and stays up.
4. For each step, find what changed just before it: the format, topic, title pattern, thumbnail look, length or upload pace. Keep the two or three clearest turning points.
5. Group the videos into formats. A format is a title pattern with its slots marked, a thumbnail layout and a usual length. Count how many videos in each beat the channel's average. Note the formats the channel dropped.
6. View every thumbnail on the list, on numbered contact sheets. Say so if one fails to load.
7. Compare the ten best videos with the ten worst, by ratio. Keep only the differences.
8. Read the first 30 seconds of the five best videos and of two weak ones.
9. Read the best videos' descriptions for what the channel sells and who sponsors it.
10. Write five moves to copy, best first. Each names the skill that runs it, such as `title-formulas`, `thumbnail-concepts`, `script-breakdown`, `niche-bending` or `monetization-research`, and a prompt the user can paste. Add two or three moves to skip.

## Output Format

```markdown
# 🔬 Reverse Engineering: [{channel}]({url})

- **How it grew:** {one sentence, with numbers}
- **Sample:** {n} long videos from {month year} to {month year} · {n} thumbnails viewed · {n} openings read
- **Shorts:** {whether the channel uses them, and how they do next to the long videos}
- **Start with:** {the one move to copy this week}

## 📈 Growth Timeline

| Period | Uploads | Median views | What changed |
|---|---|---|---|
| {quarter or month} | {n} | {views} | {a few words, or "nothing new"} |

## 🚀 Turning Points

### 1. {What changed} · {month year}

[![]({thumbnail})]({video url})

- [{title}]({video url}) · {views, ratio, date}
- **Before:** {what the channel did until then, with its median views}
- **After:** {what it did next, with its median views}

## 🧩 Formats

| Format | Videos | Beat the average | Best video |
|---|---|---|---|
| "{title pattern with slots}" | {n} | {n} of {n} | [{title}]({video url}) · {views, ratio} |

- **Dropped:** {a format the channel stopped making, and how it did}

## 🔍 Best 10 Against Worst 10

**Best:**

[![]({thumbnail})]({video url}) [![]({thumbnail})]({video url}) [![]({thumbnail})]({video url})

**Worst:**

[![]({thumbnail})]({video url}) [![]({thumbnail})]({video url}) [![]({thumbnail})]({video url})

| | Best 10 | Worst 10 |
|---|---|---|
| Title | {what they share} | {what they share} |
| Thumbnail | {what they share} | {what they share} |
| Topic | {what they share} | {what they share} |
| Length | {usual length} | {usual length} |

## 🎣 Hooks

- **What the strong openings share:** {one sentence}
- [{title}]({video url}) · {views, ratio}: "{the first lines, word for word}"

## 💰 How It Earns

- **{Method}:** [{offer or sponsor}]({url}) · seen in [{title}]({video url})

## ✅ Moves to Copy

1. **{Move}**
   - **Proof:** [{title}]({video url}) · {views, ratio, date}
   - **Run next:** `{skill}` · "{a prompt the user can paste}"

## ❌ Moves to Skip

1. **{Move}:** {why it will not carry over, with proof}
```

- Length: about 1,200 words. At most ten timeline rows, so merge quiet periods. Two or three turning points, up to five formats, three hooks, five moves to copy.
- Language: plain words and short, complete sentences. Nothing compressed.
- Bullets: one fact each, under 25 words, except quotes, verbatim titles and prompts. No extra sections or bullets.
- If it runs long, cut whole items. Never cut proof, and never squeeze sentences.
- Links: link every video, channel, moment, brand and offer you cite, built from IDs, handles and links in the data. Never guess one.
- Thumbnails: the 320px `mqdefault.jpg` image, linked to its video, on its own line under a heading or up to three on one line under Best and Worst.

## Common Pitfalls

- Do not read today's views as what a video got at launch. Old videos have had years to collect views, and last month's uploads are still collecting.
- Do not call one hit a turning point. It counts only if the channel repeated it and the views stayed up.
- Do not state a cause as fact. The data shows what changed before a step, not why viewers came.
- Do not study only the hits. A trait the worst videos also have is not why the best ones won.
- Do not tell the user to copy what only works at this channel's size, such as a famous face, a big budget or rare access. Those are moves to skip.
- Do not mix Shorts into the long-form numbers.
