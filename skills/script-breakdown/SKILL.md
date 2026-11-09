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

How a video holds attention, mapped from its transcript into a reusable structure. Strong videos cycle promise, stakes, re-hooks and small payoffs before the final payoff; showing where each one lands is the point. The hook is the exact first 30 seconds, quoted. Transcripts are free.

## Workflow

1. Clarify scope only if needed. Read 1 to 3 videos.
2. Tag every beat in order with one type: hook, promise, stakes, open loop, proof, re-hook, mini-payoff, payoff, call to action. Types repeat; a long video runs 10 to 20 beats.
3. Reduce the beats to a reusable layout; across videos, keep the shared parts.

## Output Format

```markdown
# Script Breakdown: {video or channel}

- **Main finding:** {one line}
- **Confidence:** {level, brief why}

## [{title}]({url}) · [{channel}]({url}) · {views, ratio, duration}
- **Hook (0:00 to 0:30):** "{verbatim}"
- **What it does:** {short}

| Time | Beat | What happens |
|---|---|---|
| [{m:ss}]({moment url}) | {type} | {few words or short quote} |

## Layout
Hook 0:00 → Promise {m:ss} → ... → CTA {m:ss}

## Script Skeleton
{Only with a topic, on the layout.}
```

About 600 words per video. One fact per bullet, under 25 words except quotes; no extra sections or bullets. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not paraphrase the hook. The exact words are the finding.
- Do not tag a beat by topic; tag its job for retention.
- Do not stop at the first payoff; late re-hooks hold a long video.
- Do not call a layout a pattern from one video.
- Do not trust caption numbers; check them against the description; mark unclear words [unclear].
- Do not paste the full transcript.
