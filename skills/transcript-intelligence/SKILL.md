---
name: transcript-intelligence
description: Use when the user wants to break down a YouTube video's hook, script structure or beat sheet, or build a skeleton for a new script. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Transcript Intelligence

## Overview

How a video is built, from the words actually spoken, as a structure the user can reuse. The hook is the exact first 30 seconds, quoted. Name each beat by what it does to keep the viewer watching (opens a question, raises the stakes, pays off), not by its topic. Transcripts are free. Not for what is working in a niche (`trend-report`).

## Workflow

1. Clarify scope only if needed. Read 1 to 3 videos.
2. Quote the first 30 seconds and say what the hook does.
3. Build 5 to 8 timed beats, noting where each open question starts and is answered.

## Output Format

```markdown
# Script Breakdown: {video or channel}

**{Main finding in one line.}** Confidence: {level, short reason}

## {Title} · @handle · {views} · {ratio} · {duration}
Hook (0:00 to 0:30): "{verbatim}" · {what it does}

| Time | Beat | What it does for the viewer |
|---|---|---|

## Structure
{Hook} → {beat} → {payoff} → {call to action}

## Script Skeleton
{Only if a topic was given.}
```

About 500 words per video, one line per beat. Quote only the hook; add no sections.

## Common Pitfalls

- Do not paraphrase the hook. The exact words are the finding.
- Do not write a summary and call it a beat sheet.
- Do not call a structure a pattern from one video. With several, keep only what they share.
- Do not trust numbers in captions. Check them against the description, and mark unclear words [unclear].
- Do not paste the full transcript.
