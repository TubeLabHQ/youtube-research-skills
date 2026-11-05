---
name: niche-watchlist
description: Scheduled monitoring of YouTube niches for new breakout channels, using TubeLab's newest-discovered sort and a local state file so each run reports only the delta. Reads a watchlist config, searches each niche for channels found since the last run, enriches the new ones, flags fast movers and young channels, notes channels that dropped out, writes a dated digest and updates the state. Use when asked to watch a niche, track new channels weekly or daily, set up a breakout alert, a niche monitor, a recurring digest, or to run the watchlist. Built for Claude Code routines, /loop, cron and n8n. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "5 per niche per run (1 search_channels at 5 per niche, channel reads free)"
  plan: starter
---

# Niche watchlist

A run is cheap, repeatable and stateful: one channel search per niche, a diff against what the last run saw, and a digest of what is new. The showcase for scheduled research, because the TubeLab index refreshes daily and `sortBy: "foundAt"` surfaces channels the day they are discovered.

- Use for: "watch home security and tell me when new channels break out", "weekly digest of new faceless channels in X", "run the watchlist", "set up a niche monitor".
- Not for: a one-off niche hunt (`niche-finder`), a go or no-go on one niche (`niche-validator`), trends in videos rather than channels (`trend-report`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Watchlist folder | `watchlist/` in the current project; create it on the first run |
| Niches | from `watchlist/config.json`; if missing, ask for 1 to 5 niche queries and write the file |
| Language | per niche in config, default `["en"]` |
| Faceless only | per niche in config, default false |

## Credit budget

Say before the first paid call: "About 5 credits per niche: one channel search at 5 each, channel reads are free. N niches, about 5N credits." Never paginate; the newest 20 per niche is the window.

## Workflow

1. **Load state.** Read `watchlist/config.json` and `watchlist/state.json` (shapes below). Missing state means a first run: everything found is "new" and the digest says so.
2. **Search each niche.** `search_channels` with `query: [config.query]`, `sortBy: "foundAt"`, `joinedDateFrom: "year"`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `language`, `classificationIsFaceless: true` when configured, `excludeNiche: [slop list from tubelab-mcp plus config.exclude]`, `medianViewsFrom: 1000`, `size: 20`. Under 5 hits: widen `joinedDateFrom` to `all` once and say so in the digest; never drop `classificationQuality`.
3. **Diff.** New = hit IDs not in `state.seen[niche]`. Dropped = IDs in state that no longer appear in the newest-20 sample (they aged out or went quiet; not necessarily terminated). Movers = already-seen channels whose `statistics.subscriberCount` or `medianViewsEstimate` grew more than 50 percent since the value stored in state.
4. **Enrich new entries.** `get_channel` (free) on each new ID: `item.statistics.subscriberCount`, `medianViewsEstimate`, `avgViewsToSubscribersRatio`, `joinedDateEstimate`, `videosCount`, and the top video from `item.videos[]` by `statistics.averageViewsRatio` for the proof line.
5. **Flag.** "Breakout" when `avgViewsToSubscribersRatio` is above 2 or `joinedDateEstimate` is under 90 days old with median views above 1000. "Watch" for the rest. Order new entries by ratio, breakouts first.
6. **Why it matters,** one line per entry: the format its top video uses, the audience it serves, and what it proves about the niche (a 60-day-old channel at 20K median views proves the niche is open to entrants).
7. **Write the digest** to `watchlist/<date>.md` and update `state.json` with every ID seen this run and the subscriber and median view values for next run's movers. Keep `lastRun`. If nothing changed, write a one-line digest saying so; silence looks like a failed run.

Rank the digest by what the reader should act on: breakouts, then movers, then watch-list additions, then dropped.

## Output

```markdown
# Watchlist digest: <date>
Niches: <n> · New: <n> · Movers: <n> · Dropped: <n> · Credits used: <5N> · Widened: <none | niche, why>

## <Niche>
### Breakouts
- **<Channel> (@handle)** · <subs> subs · median <n> · ratio <n> · joined <date> · proof: "<top title verbatim>" · <views> · ratio <n> · <date>. Why it matters: <one line>.
### Movers
- **@handle** · subs <from> → <to> · median <from> → <to>. <one line>
### New to the watch list
- @handle · <subs> · median <n> · <format in 4 words>
### Dropped from the newest-20 sample
- @handle · last seen <date>

## State written
watchlist/state.json updated · <n> IDs tracked across <n> niches
```

Config and state shapes:

```json
// watchlist/config.json
{ "niches": [ { "name": "home-security", "query": "home security for seniors", "language": ["en"], "faceless": false, "exclude": ["compilation"] } ] }

// watchlist/state.json
{ "lastRun": "<date>", "seen": { "home-security": { "UC...": { "subscribers": 12000, "medianViews": 4800, "firstSeen": "<date>" } } } }
```

## Scheduling

One run per day is plenty; the index refreshes daily and more runs only repeat the same sample. In Claude Code use `/loop 24h run the niche-watchlist skill` or a routine; from cron, call `claude -p "run the niche-watchlist skill in this project"` from the project folder; from n8n, a Schedule trigger calling the same command over SSH or a webhook into a Claude Code session. Commit `watchlist/` so the state travels with the project.

## Pitfalls

- A first run has no baseline. Say "first run, everything is new" and do not call it a breakout wave.
- Dropped means out of the newest-20 sample, not terminated. Use `terminated: true` on a `search_channels` only if the user asks to check.
- Ratio above 2 on a 50-subscriber channel is noise. Breakout needs median views above 1000 as well.
- The seeded-random order does not apply here; `foundAt` is a true sort, so page 1 is the newest 20 and paging adds nothing new.
- Do not rewrite history: never edit a past digest, write a new one.
- Never invent a channel or a number. If you did not fetch it, it is not evidence.

## Example prompts

- "Set up a watchlist for home security, woodworking and personal finance, English, and run it."
- "Run the niche-watchlist."
- "What's new in my watched niches since last week?"
