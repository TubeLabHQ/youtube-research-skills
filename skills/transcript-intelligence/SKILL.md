---
name: transcript-intelligence
description: Use when the user wants to break down a YouTube video's hook, script structure or beat sheet, or build a skeleton for a new script. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Transcript Intelligence

## Overview

Break down how videos are built from the words actually spoken, and turn the structure into a template for a new script.

## When to Use

Use this skill when the user asks to:

- see how a video is structured or what its hook is
- build a beat sheet or compare hooks
- prepare a skeleton for a new script

Do not use this for why a video got views (`outlier-research`), a channel analysis (`channel-analysis`), or ideas (`video-ideation`).

## Workflow

1. Clarify scope only if needed. Read 1 to 5 videos.
2. Pull each video's details and transcript.
3. Quote the first 30 seconds as the hook and name its type.
4. Build a beat sheet of 6 to 12 beats, with claims, open loops, calls to action and pace.
5. Compare the videos and write a reusable structure.
6. If the user gave a topic, write a script skeleton in the same structure.

## Output Format

```markdown
# Script Breakdown: {video or channel}

Videos: {n} · Transcripts: {n} · Confidence: {level, why}

## {Title} · @handle · {views} · {duration}
- **Hook (verbatim):** "..." · {type}
- **Beat sheet:** m:ss {beat} · what it does
- **Claims:** m:ss "..." (backed | asserted)
- **Open loops:** opens m:ss · closes m:ss
- **Calls to action:** m:ss · {type}
- **Pace:** {n} words per minute
- **Quotable lines:** "..."

## Across Videos
- ...

## Structure Template
[Hook] → [Block] → [Payoff] → [CTA]

## Script Skeleton
{Only if a topic was given.}

## Caveats
- ...
```

## Common Pitfalls

- Do not paraphrase the hook. The exact words are the finding.
- Do not write a summary and call it a beat sheet.
- Do not call something a pattern from one video.
- Do not trust numbers in captions. Check them against the description.
- Do not read more than five transcripts without asking. They are long.
- Do not paste a full transcript into the output.
- Do not invent a timestamp or a quote. Mark unclear words [unclear].
