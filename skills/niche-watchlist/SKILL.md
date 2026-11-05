---
name: niche-watchlist
description: Use when the user asks to watch a YouTube niche, track new channels weekly or daily, set up a breakout alert or niche monitor, or run the watchlist. Searches each niche with the TubeLab MCP's newest-discovered sort, diffs against a local state file, and writes a dated digest of breakouts, movers and dropped channels.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Niche Watchlist

## Overview

Watch one or more niches on a schedule: one channel search per niche, a diff against a local state file from the last run, and a digest of only what is new. The TubeLab index refreshes daily and `sortBy: "foundAt"` surfaces channels the day they are discovered; `get_channel` enriches the new ones for free.

## When to Use

Use this skill when the user asks to:

- watch a niche and hear when new channels break out
- get a weekly or daily digest of new channels in a topic
- set up a niche monitor or breakout alert, or run the watchlist

Do not use this for a one-off niche hunt (`niche-finder`), a go or no-go (`niche-validator`), or video trends (`trend-report`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_channels` | Newest 20 channels per niche, sorted by `foundAt` |
| `get_channel` | Live stats, age and top video of each new channel |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Folder `watchlist/` in the current project; niches from `watchlist/config.json`. If missing, ask for 1 to 5 niche queries and write it. Per niche: language (default `["en"]`), faceless only (default false), extra exclusions.

2. **Load state**

   ```json
   // watchlist/config.json
   { "niches": [ { "name": "home-security", "query": "home security for seniors", "language": ["en"], "faceless": false, "exclude": ["compilation"] } ] }

   // watchlist/state.json
   { "lastRun": "<date>", "seen": { "home-security": { "UC...": { "subscribers": 12000, "medianViews": 4800, "firstSeen": "<date>" } } } }
   ```

   - No state means a first run: everything is "new" and the digest says so.

3. **Search each niche**
   - `search_channels` with `query: [config.query]`, `sortBy: "foundAt"`, `joinedDateFrom: "year"`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `language`, `classificationIsFaceless: true` when configured, `excludeNiche: [slop list plus config.exclude]`, `medianViewsFrom: 1000`, `size: 20`.
   - Under 5 hits: widen `joinedDateFrom` to `all` once and say so. Never drop `classificationQuality`.

4. **Diff against state**
   - New: IDs not in `state.seen[niche]`. Dropped: IDs in state no longer in the newest-20 sample (aged out, not terminated). Movers: seen channels whose `subscriberCount` or `medianViewsEstimate` grew over 50 percent since the stored value.

5. **Enrich and flag new entries**
   - `get_channel` per new ID: `subscriberCount`, `medianViewsEstimate`, `avgViewsToSubscribersRatio`, `joinedDateEstimate`, `videosCount`, top video from `item.videos[]` by `averageViewsRatio` for the proof line.
   - Breakout: `avgViewsToSubscribersRatio` above 2, or joined under 90 days ago with median views above 1000. Watch: the rest. Order by ratio, breakouts first, one line each on the format, the audience and what it proves.

6. **Write the digest, update state, schedule**
   - Write `watchlist/<date>.md`: breakouts, movers, watch-list additions, dropped. Update `state.json` with every ID seen plus subscribers and median views; keep `lastRun`. Nothing changed: write a one-line digest, silence looks like a failed run.
   - One run per day is plenty. Claude Code: `/loop 24h run the niche-watchlist skill`, or a routine. cron: `claude -p "run the niche-watchlist skill in this project"`. n8n: a Schedule trigger calling that command over SSH. Commit `watchlist/` so state travels with the project.

## Output Format

```markdown
# Watchlist Digest: {date}

## Summary
- Niches: {n} · New: {n} · Movers: {n} · Dropped: {n}
- Widened: {none | niche, why} · First run: {yes | no}

## {Niche}
### Breakouts
- **{Channel} (@handle)** · {subs} subs · median {n} · ratio {n} · joined {date} · proof: "{top title verbatim}" · {views} · ratio {n} · {date}. Why it matters: {one line}.
### Movers
- **@handle** · subs {from} → {to} · median {from} → {to}. {one line}
### New to the watch list
- @handle · {subs} · median {n} · {format in 4 words}
### Dropped from the newest-20 sample
- @handle · last seen {date}

## State written
watchlist/state.json updated · {n} IDs tracked across {n} niches
```

## Quality Guardrails

- Always set `publishedAtFrom` and `joinedDateFrom`; widen `joinedDateFrom` once and say so. Never drop `classificationQuality: "neutral"`.
- Every breakout carries channel, top title verbatim, views, ratio, date.
- One search per niche per run, no paging: `foundAt` is a true sort, so page 1 is the newest 20. Channel reads are free.
- Never edit a past digest; write a new one.

## Common Pitfalls

- Do not call a first run a breakout wave; there is no baseline.
- Do not report dropped as terminated; use `terminated: true` on `search_channels` only if asked to check.
- Do not flag a 50-subscriber channel with ratio above 2 as a breakout; it also needs median views above 1000.
- Do not skip the digest when nothing changed.
- Do not invent a channel or a number.
