---
name: transcript-intelligence
description: Tear down the structure of one to five YouTube videos from their transcripts, free of charge. Pulls each transcript with TubeLab, quotes the first 30 seconds verbatim as the hook, builds a timestamped beat sheet, lists the claims and numbers, open loops, CTA placement, pace in words per minute and segment lengths, then compares the hooks and derives a reusable structure template and a script skeleton. Use when asked how a video is structured, what the hook is, to break down a script, to analyse the first 30 seconds, to find the beat sheet or retention structure of a video, or to prepare a skeleton for a new script. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "0 per run (get_video and get_video_transcript are free)"
  plan: starter
---

# Transcript intelligence

Structure and hooks from the words actually spoken, not from the title. The output is a script teardown that ends in a skeleton the user can take straight into a scriptwriter, with every quote verbatim and every timestamp from the transcript.

- Use for: "how is this video structured", "what's the hook", "break down this script", "beat sheet for these 3 videos", "give me a skeleton in this style".
- Not for: why the video got views (`outlier-research`), a channel-level diagnosis (`channel-teardown`), ideas (`video-ideation`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Videos | 1 to 5 URLs or IDs; ask before reading more than 5 |
| Goal | teardown of these videos; or a skeleton for the user's own topic in the same structure |
| Language | the video's own; transcripts keep the spoken language |

## Credit budget

Say before the first call: "This costs no credits: video details and transcripts are free reads." Transcripts are large (a 30-minute video is 100KB or more), so read them one at a time and summarise as you go; never echo a transcript.

## Workflow

1. **Resolve IDs.** Extract the bare 11-character ID from each URL. If the user names a channel instead, `get_channel_videos` (free) and pick the top videos by `statistics.averageViewsRatio`, confirming the pick with the user when more than 5.
2. **`get_video`** per video: `snippet.title`, `duration` (seconds), `publishedAt`, `channelTitle`, `description`, `statistics.viewCount`. The description shows where the chapters and the CTAs sit.
3. **`get_video_transcript`** per video. Work from `events[]` (`startMs`, `text`). If the call errors or `events` is empty, record "no transcript available" and continue with the title and description only.
4. **Hook, verbatim.** Join `events[].text` while `startMs < 30000`. Quote it exactly, trimmed, in the spoken language. Label the hook type: cold open, question, claim, story, contrast, promise plus proof.
5. **Beat sheet.** Walk the events and mark each shift in subject, device or energy as a beat with its `startMs` as m:ss. Aim for 6 to 12 beats; label each with a short name and one sentence on what it does for retention (sets a stake, pays off a loop, resets attention, delivers a step).
6. **Claims and numbers.** Every specific number, name, result or promise, with its timestamp. Mark which are backed in the video and which are asserted.
7. **Open loops.** Each promise of a later payoff ("later I'll show you", "the third one surprised me") with the timestamp it opens and the timestamp it closes, or "never closed".
8. **CTA placement.** Every subscribe, like, link, product or sponsor mention with its timestamp, and the share of runtime at which the first one appears.
9. **Pace.** Words per minute as total words in the transcript divided by `duration` in minutes. Segment lengths from the beat sheet: shortest, longest, median.
10. **Compare across videos** (2 or more): what the hooks share (device, length in seconds, first word class), where the first loop opens, where the first CTA sits, typical pace. One video gives a single observation, not a pattern; say so.
11. **Structure template.** Write the recurring structure as a template with `[bracketed]` slots and target durations per block. If the user gave a topic, fill it into a skeleton: hook draft in the same device, beats with target timestamps, the loops to open and where to close them, CTA positions.

Rank quotable lines by how self-contained they are and how much of the video's claim they carry; the hook is always first.

## Output

```markdown
# Script teardown: <video title | n videos from @handle>
Run: <date> · Credits used: 0 · Videos: <n> · Transcripts available: <n of n>

## 1. Per video
### <Title verbatim> · @handle · <views> · <duration m:ss> · <published>
- **Hook (0:00 to 0:30, verbatim):** "<...>" · type: <cold open | question | claim | story | contrast | promise plus proof>
- **Beat sheet:** 0:00 <beat> · what it does · 0:42 <beat> · … (6 to 12 beats)
- **Claims and numbers:** m:ss "<claim>" (backed | asserted) …
- **Open loops:** opens m:ss "<promise>" → closes m:ss | never closed
- **CTAs:** m:ss <type> … · first CTA at <x>% of runtime
- **Pace:** <n> words per minute · segments: shortest m:ss, longest m:ss, median m:ss
- **Quotable lines:** "<verbatim>" (m:ss) …

## 2. Across videos (2 or more)
Hooks: <shared device, length, first words> · first loop at <m:ss> · first CTA at <x>% · pace <range>
Single observations (one video only): <list>

## 3. Structure template
[Hook: <device>, 0:00 to 0:30] → [<Block>, to m:ss] → … → [Payoff] → [CTA]

## 4. Skeleton for "<user's topic>" (only when a topic was given)
Hook draft (same device) · beats with target timestamps · loops to open and where they close · CTA positions · pace target
Paste into TubeLab Scriptwriter as the outline.

## 5. Caveats
Auto-generated captions misspell names and numbers; verify any figure before quoting it. No transcript: <videos>. Timestamps are caption start times, not cuts.
```

## Pitfalls

- Never paraphrase the hook or a quotable line. If a transcript is auto-generated, quote it as is and mark unclear words with [unclear].
- Do not pull a transcript the user did not ask for; five is the ceiling without asking.
- A beat sheet is not a summary. Each beat names what the moment does for retention.
- Numbers in captions are often wrong (fifteen hundred becomes 1500 or 15 100). Cross-check with the description when it matters.
- One video is one example. Call a pattern a pattern only when it recurs across videos.
- Never invent a timestamp. If the events do not show it, say "not in transcript".

## Example prompts

- "Break down the structure of youtu.be/dQw4w9WgXcQ: hook, beats, loops, CTAs."
- "Compare the first 30 seconds of these three videos and tell me the pattern."
- "Tear down @channel's top 3 videos and give me a skeleton for a video about budget home security."
