---
name: script-breakdown
description: Use when the user wants to break down a YouTube video's hook, script structure or beat sheet, or build a skeleton for a new script. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Script Breakdown

## Overview

How a video holds attention, mapped from its transcript into a structure the user can reuse. Strong videos cycle through promise, stakes, re-hooks and small payoffs before the final payoff. Showing where each one lands is the point. The hook is the exact first 30 seconds, quoted. Transcripts are free to read.

## Workflow

1. Clarify scope only if needed. Read 1 to 3 videos.
2. Tag every beat in order with one type: hook, promise, stakes, open loop, proof, re-hook, mini-payoff, payoff, or call to action. Types repeat, and a long video has 10 to 20 beats.
3. Turn the beats into a layout someone could reuse. With several videos, keep only the parts they share.

## Output Format

```markdown
# 🎬 Script Breakdown: {video or channel}

- **Main finding:** {one sentence}

## [{title}]({video url}) · [{channel}]({url}) · {views, ratio, length}
- **Hook (0:00 to 0:30):** "{word for word}"
- **What it does:** {one sentence}

| Time | Beat | What happens |
|---|---|---|
| [{m:ss}]({link to that moment}) | {type} | {a few words or a short quote} |

## 🗺️ Layout
Hook 0:00 → Promise {m:ss} → ... → Call to action {m:ss}

## 📝 Script Skeleton
{Only if the user gave a topic. Build it on the layout.}
```

- Length: about 700 words per video.
- Language: plain words and short, complete sentences. Nothing compressed.
- Bullets: one fact each, under 25 words, except quotes and verbatim titles. No extra sections or bullets.
- If it runs long, cut whole rows. Never cut the hook, and never squeeze sentences.
- Links: link every video, channel, moment, brand and offer you cite, built from IDs, handles and links in the data. Never guess one.

## Common Pitfalls

- Do not paraphrase the hook. The exact words are the finding.
- Do not name a beat by its topic. Name what it does to keep the viewer watching.
- Do not stop at the first payoff. Late re-hooks are what hold a long video.
- Do not call a layout a pattern from one video.
- Do not trust numbers in captions. Check them against the description, and mark unclear words [unclear].
- Do not paste the full transcript.
