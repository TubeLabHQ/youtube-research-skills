---
name: niche-watchlist
description: Use when the user wants to monitor YouTube niches over time and get digests of new or breakout channels since the last run. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Niche Watchlist

## Overview

Watch niches on a schedule and report only what changed since the last run.

## When to Use

Use this skill when the user asks to:

- watch a niche for new or breakout channels
- get a recurring digest of new channels
- run the watchlist

Do not use this for a one-off niche hunt (`niche-finder`), a go or no-go (`niche-validator`), or video trends (`trend-report`).

## Workflow

1. Clarify scope only if needed. Read `watchlist/config.json`. If it is missing, ask for 1 to 5 niches and write it.
2. Load `watchlist/state.json`, which stores each channel seen with its subscribers and median views. No state means a first run.
3. Search each niche once, newest discovered first, for channels that joined in the last year.
4. Compare with the state: new channels, movers up more than 50 percent, and channels dropped from the sample.
5. Read each new channel and mark breakouts.
6. Write `watchlist/<date>.md` and update the state.
7. If asked to schedule it, one run a day is plenty.

## Output Format

```markdown
# Watchlist Digest: {date}

Niches: {n} · New: {n} · Movers: {n} · Dropped: {n} · First run: {yes | no}

## {Niche}
### Breakouts
- {Channel} (@handle) · {subs} · median {n} · joined {date} · "{top title}" · {views} · ratio {n}. {Why it matters.}

### Movers
- @handle · subs {from} to {to} · median {from} to {to}

### New
- @handle · {subs} · median {n} · {format}

### Dropped
- @handle · last seen {date}
```

## Common Pitfalls

- Do not search without `publishedAtFrom`, or `classificationQuality` at `"neutral"` or above.
- Do not paginate. Page 1 of the newest-discovered sort is the newest 20.
- Do not call a first run a breakout wave. There is no baseline.
- Do not call a channel a breakout without at least 1K median views.
- Do not report dropped as terminated. It only left the newest sample.
- Do not skip the digest when nothing changed. Silence looks like a failed run.
- Do not edit a past digest.
- Do not invent a channel or a number.
