---
name: transcript-intelligence
description: Use when the user asks how a video is structured, what the hook is, to break down a script or the first 30 seconds, for the beat sheet or retention structure of a video, or for a skeleton for a new script. Pulls transcripts with the TubeLab MCP, quotes the hook verbatim and builds a timestamped beat sheet.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Transcript Intelligence

## Overview

Structure and hooks from the words actually spoken, not from the title. Transcripts on the TubeLab MCP are free reads: read one to five videos, compare them, end in a skeleton for a scriptwriter, every quote verbatim and every timestamp from the transcript.

## When to Use

Use this skill when the user asks to:

- find out how a video is structured, what its hook is, or break down the first 30 seconds
- build a beat sheet or retention structure, compare hooks across videos
- prepare a skeleton for a new script

Do not use this for why the video got views (`outlier-research`), a channel diagnosis (`channel-teardown`), or ideas (`video-ideation`).

## Data Sources

| Tool | Use it for |
|---|---|
| `get_video_transcript` | Transcript text and timed `events[]` |
| `get_video` | Title, duration, date, description, views |
| `get_channel_videos` | A channel's top videos by ratio, when no IDs are given |

Filters and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Videos: 1 to 5 URLs or IDs; ask before reading more. Goal: a teardown, or a skeleton for the user's own topic.

2. **Resolve and read**
   - Extract the bare 11-character ID. From a channel, `get_channel_videos` and pick the top videos by `statistics.averageViewsRatio`.
   - `get_video` per video for title, `duration`, date, description and views.
   - `get_video_transcript` per video, from `events[]` (`startMs`, `text`). Never echo a transcript. On error or empty `events`, record "no transcript available" and continue with title and description.

3. **Hook, verbatim**
   - Join `events[].text` while `startMs < 30000`. Quote exactly, in the spoken language. Type: cold open, question, claim, story, contrast, promise plus proof.

4. **Beat sheet, claims, loops, CTAs, pace**
   - Beats: each shift in subject, device or energy, `startMs` as m:ss, 6 to 12 beats, each named with what it does for retention.
   - Claims with timestamps, backed or asserted. Open loops: where each opens and closes, or "never closed". CTAs with timestamps and the share of runtime at which the first appears.
   - Pace: words divided by `duration` in minutes; shortest, longest and median segment.

5. **Compare, template, skeleton**
   - Across 2 or more videos: what the hooks share, where the first loop opens, where the first CTA sits, pace. One video is a single observation.
   - Template: the recurring structure with `[bracketed]` slots and target durations. Skeleton, if a topic was given: hook draft in the same device, beats with target timestamps, loops, CTA positions.
   - Quotable lines ranked by how self-contained they are; the hook first.

## Output Format

```markdown
# Script Teardown: {video title | n videos from @handle}

## Summary
- Videos: {n} · Transcripts available: {n of n}
- Confidence: High/Medium/Low

## 1. Per video
### {Title verbatim} · @handle · {views} · {duration m:ss} · {published}
- **Hook (0:00 to 0:30, verbatim):** "{...}" · type: {cold open | question | claim | story | contrast | promise}
- **Beat sheet:** 0:00 {beat} · what it does · 0:42 {beat} · … (6 to 12)
- **Claims and numbers:** m:ss "{claim}" (backed | asserted) …
- **Open loops:** opens m:ss "{promise}" → closes m:ss | never closed
- **CTAs:** m:ss {type} … · first CTA at {x}% of runtime
- **Pace:** {n} wpm · segments: shortest, longest, median
- **Quotable lines:** "{verbatim}" (m:ss) …

## 2. Across videos (2 or more)
Hooks: {shared device, length, first words} · first loop at {m:ss} · first CTA at {x}% · pace {range}

## 3. Structure template
[Hook: {device}, 0:00 to 0:30] → [{Block}, to m:ss] → … → [Payoff] → [CTA]

## 4. Skeleton for "{user's topic}" (only when a topic was given)
Hook draft (same device) · beats with target timestamps · loops to open and close · CTA positions · pace target

## 5. Caveats
Captions misspell names and numbers; verify before quoting. No transcript: {videos}. Timestamps are caption start times.
```

## Quality Guardrails

- Quote the hook and every quotable line verbatim, unclear words marked [unclear].
- Every timestamp comes from `events[].startMs`; otherwise write "not in transcript".
- Five transcripts is the ceiling without asking; a 30-minute transcript is 100KB or more.
- A pattern needs 2 or more videos.

## Common Pitfalls

- Do not paraphrase the hook; the exact words are the finding.
- Do not write a summary and call it a beat sheet.
- Do not trust numbers in captions (fifteen hundred becomes 15 100); cross-check the description.
- Do not pull a transcript the user did not ask for.
- Do not invent a timestamp or a quote.
