---
name: niche-watchlist
description: Use when the user wants to monitor YouTube niches on a schedule and get a digest of new or breakout channels. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Niche Watchlist

## Overview

Watch niches on a schedule and report only what changed since the last run. The files have a fixed shape so runs compare.

## Workflow

1. Read `watchlist/config.json`, or ask for 1 to 5 niches and write it.
2. Read `watchlist/state.json`. If missing, this run is a baseline, not a breakout wave.
3. Run each saved search once, as saved. Compare only the channels it returns.
4. New means first seen since the last run. A mover is up over 50 percent on its stored median views.
5. Write `watchlist/<date>.md` every run, then refresh the stored values.

`watchlist/config.json`:

```json
{ "niches": [ { "name": "budget travel", "search": { "query": ["budget travel tips"], "language": ["en"],
  "publishedAtFrom": "month", "classificationQuality": "neutral",
  "sortBy": "foundAt", "sortOrder": "desc", "size": 20 } } ] }
```

`watchlist/state.json`:

```json
{ "lastRun": "<date>", "niches": { "budget travel": { "<channelId>":
  { "handle": "@name", "subscribers": 0, "medianViews": 0, "firstSeen": "<date>" } } } }
```

## Output Format

```markdown
# Watchlist Digest: {date}

**{n new, n movers, or "No change"} since {last run}** · Baseline: {yes or no}

## {Niche}
| Channel (handle) | Status | Subs | Median views | Best video (title · views · ratio) |
|---|---|---:|---:|---|
```

About 200 words, five rows per niche, one line for a quiet niche. Add no sections.

## Common Pitfalls

- Do not save a search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above.
- Do not change a saved search between runs. An edited niche starts a new baseline.
- Do not call a channel new because it re-entered the sample. Check first-seen.
- Do not call a breakout below 1K median views or 5 videos.
