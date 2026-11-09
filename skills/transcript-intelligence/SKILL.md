---
name: transcript-intelligence
description: Use when the user wants to break down a YouTube video's hook, script structure or beat sheet, or build a skeleton for a new script. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Transcript Intelligence

## Overview

Break down how videos are built from the words actually spoken, and turn the structure into a template. Not for what is working in a niche (`trend-report`).

## Workflow

1. Clarify scope only if needed. Read 1 to 3 videos.
2. Quote the first 30 seconds as the hook and name its type.
3. Build a beat sheet of 5 to 8 beats.
4. Write a reusable structure, and a script skeleton if the user gave a topic.

## Output Format

```markdown
# Script Breakdown: {video or channel}

## {Title} · @handle · {views} · {duration}
**Hook (verbatim):** "..." · {type}

| Time | Beat | What it does |
|---|---|---|

## Structure Template
[Hook] → [Block] → [Payoff] → [CTA]

## Script Skeleton
{Only if a topic was given.}

## Caveats
- ...
```

Keep it under 300 words per video, with at most 3 caveats.

## Common Pitfalls

- Do not paraphrase the hook. The exact words are the finding.
- Do not write a summary and call it a beat sheet.
- Do not call something a pattern from one video.
- Do not trust numbers in captions. Check them against the description.
- Do not paste a full transcript into the output.
- Do not invent a timestamp or a quote. Mark unclear words [unclear].
