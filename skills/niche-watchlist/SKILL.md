---
name: niche-watchlist
description: Use when the user wants to monitor YouTube niches over time and get digests of new or breakout channels since the last run. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Niche Watchlist

## Overview

Watch niches on a schedule and report only what changed since the last run. Not for a one-off hunt (`niche-finder`).

## Workflow

1. Clarify scope only if needed. Read `watchlist/config.json`, or ask for 1 to 5 niches and write it with the exact search settings.
2. Load `watchlist/state.json`, the channels seen with their subscribers and median views.
3. Search each niche once with the saved settings, newest discovered first.
4. Find channels discovered since the last run and channels up more than 50 percent.
5. Read the new channels, write `watchlist/<date>.md` and update the state.

## Output Format

```markdown
# Watchlist Digest: {date}

Niches: {n} · New: {n} · Movers: {n}

## {Niche}
| Channel (handle) | Status | Subs | Median views | Proof (title · views · ratio) |
|---|---|---:|---:|---|
```

Keep it under 200 words, with at most 5 rows per niche.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above.
- Do not change the search settings between runs, or the differences are noise.
- Do not call a channel new because it left and re-entered the sample. Check when it was discovered.
- Do not call a first run a breakout wave.
- Do not call a channel a breakout without 1K median views and at least 5 videos.
- Do not skip the digest when nothing changed. Silence looks like a failed run.
- Do not paginate, or invent a channel or a number.
