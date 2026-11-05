---
name: channel-teardown
description: Packaging teardown of one YouTube channel. Pulls the channel's own numbers from TubeLab, finds what broke (decaying formats, missing authority signal, wrong promise rung, title-video mismatch, thumbnails echoing titles), compares against what is working in the niche right now, and writes an essay with a diagnosis, fixes, new ideas and title templates, every claim backed by a title and a view count. Use when asked to roast a channel, why views died or dropped, why a channel stopped growing, what is wrong with my titles or thumbnails, audit or review my channel, or rewrite my titles. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.1"
  requires: tubelab-mcp
  credits: "9-11 per run (2-3 search_outliers at 2, 1 search_related_channels at 5, reads free)"
  plan: starter
---

# Channel teardown

A port of TubeLab's channel roast. The output is a long-form essay: short punchy paragraphs, bold claims backed by data, no bullets or tables in the body (the TL;DR actions are the one exception). Direct, not mean. Data at every claim.

- Use for: "roast @channel", "why did my views die", "what's wrong with my titles", "audit my channel", "rewrite my last 5 titles", "why did I stop growing".
- Not for: ideas without a diagnosis (`video-ideation`), a niche-level view (`outlier-research`), thumbnails alone (`thumbnail-concepts`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Channel | required: URL, `@handle` or ID |
| Goal | ask once: **reach** (more views, AdSense, sponsors) or **conversion** (views from people who buy the channel's product or service). Unknown: assume reach for channels with no visible product, conversion for channels whose description sells something, and say which you assumed |
| Rewrite old titles? | no, unless asked or a content-contract mismatch cannot be explained without one |
| Language | the channel's own |
| Niche angles | derived from the channel's titles; 2 to 3 angles |

## Credit budget

Say before the first paid call: "About 9 to 11 credits: 2 to 3 outlier searches at 2, one related-channels search at 5, channel and video reads are free." Transcripts are free but long: pull at most 3, only to verify a suspected mismatch or to rewrite a title.

## Workflow

1. **`get_channel`** (free, one call; `get_channel_videos` is the same payload). From `item.statistics`: subscribers, `averageViewsEstimate`, `medianViewsEstimate`, `viewVariationCoefficient`, `positiveOutliersCount`, `negativeOutliersCount`, `videosSampleCount`. From `item.videos[]` (newest first): every title, `viewCount`, `publishedAtEstimate`, `statistics.averageViewsRatio`, `isPositiveOutlier`, `isNegativeOutlier`. Shorts-first channels: `get_channel_shorts` and `item.shorts[]`. Extract, never echo.
2. **Compute before reading anything else:** median views (not the average, which outliers inflate) · last-4 average (the 4 most recent non-live videos) · the contradiction (best video in the sample versus the last-4 average: "182K once. Last four averaged 1,597.") · positive and negative outliers with title, views, ratio, date · decay: any title structure (same opening words, number template or "X vs Y" shape) used 3 or more times, ordered by date, with views falling run over run. A 3x drop from first use to last is the headline. A positive outlier whose format was never repeated is the unfair advantage.
3. **`get_video`** (free) on the biggest positive outlier plus 1 to 2 recent underperformers: exact date, description, tags, like and comment counts. `get_video_transcript` only to verify a suspected content-contract mismatch or to rewrite a title.
4. **`search_outliers`** in the channel's niche, 2 to 3 passes on different angles: `query` (one angle), `publishedAtFrom: "semester"`, `sortBy: "averageViewsRatio"`, `language` matched to the channel, `classificationQuality: "neutral"`, `viewCountFrom` at 2 to 5x the channel's average views (a 2K-average channel uses 5000, a 500K-average channel uses 1000000), `channelMonetizationAdsense: true` when the floor is above 500K so paid brand campaigns (software and bank channels with ratio 50+) do not pass as competitors, `size: 20`. Widen to `year` if a pass returns under 5 hits and say so. Never drop `classificationQuality`.
5. **`search_related_channels`** with `relatedChannelId: ["<channel id>"]`, `publishedAtFrom: "semester"`, `classificationQuality: "neutral"`, `size: 12`: the competitor set. Their sample `videos[]` titles show which promise rung the niche sits at. That is where the audience is.
6. **Apply only the lenses that fit, judged against the goal.** For each: the specific title and its views, why it fails, the fix principle, and a competitor's title and views beside it. Under a conversion goal, a title that names the buyer ("if you have a service business") and gets fewer views is not a failure if the segment named is the buyer; it is a failure when it names a segment the channel does not sell to, or when the universal frame of the same content would have reached the same buyers. Say which case it is, and keep the reach number next to it so the user sees the trade.

| Lens | Test | Example |
|---|---|---|
| Authority signal | Cover the channel name. Does the title still say why to trust it? Signals: a number of cases, a plain credential, a result, a scale. | "How to Secure Your Home" fails; "9 Marks Burglars Leave on Houses They Plan to Hit" carries its own authority |
| Promise rung | Rung 1 bare promise, 2 promise plus constraint, 3 named mechanism, 4 implicit promise where the mechanism carries everything. Median rung of the last 10 titles versus the competitors' top 10; a gap of 1 or more is a finding. | "Home security tips" (1) vs "What 400 burglars told me they check first" (4) |
| Content contract | Strong title, decent views, low like or comment ratio, or complaining comments. Verify with one transcript: what the video delivers in 2 to 3 sentences versus the promise. | "I tested every budget camera" delivering two cameras and a doorbell |
| Thumbnail second job | Only when thumbnails are visible. If removing the title or the thumbnail text loses nothing, it is an echo. The second job adds the result, the reaction, the object, the withheld number. | text "LIVE ALONE?" under "9 Things That Tell Burglars You Live Alone" (echo) vs a single pair of shoes at a door |
| Exhausted formats | The decay from step 2, with the trajectory: date, exact title, views, ratio. The fix is "change the promise, keep the mechanism", not "stop". | "7 Gadgets…" 204K → "10 Gadgets…" 66K → "15 Gadgets…" 9K |

7. **Write the essay.**

## Output

```markdown
# Teardown: <channel title> (@handle)
Run: <date> · Sample: <n> videos · Credits used · Widened: <none | pass, from, to, why> · Lenses applied

**TL;DR.** <Diagnosis in 1 to 2 bold sentences.>
1. <Action, self-contained.>  2. …  3. …  (3 to 5)
---
<Contradiction opener: best metric vs worst recent metric.>
<Decay trajectories, in prose: date · exact title · views · ratio, run over run.>
<Lens findings, one short section per lens that fits, each with a side-by-side competitor title and views.>
<Strategic recommendations: 2 to 3 content pillars grounded in what worked here and in the niche; packaging rules for this size and trust level; cadence and format mix; competitive positioning, what this channel has that nobody else does.>
<5 to 8 new ideas from the outlier data: title · pattern it is based on with channel, views, ratio · promise rung · content contract in one sentence.>
<3 to 5 repeatable title templates with [bracketed] variables, one concrete example each.>
<Close: one-sentence root cause · the unfair advantage · the single thing to change first.>
<Only if asked or unavoidable, rewrites: what the video delivers (from the transcript) · the mismatch · 2 to 3 options · the pick. Each rewrite has a specific number, passes the authority test, sits at rung 3 or higher, stays under 60 characters, never name-drops a tool the viewer has not heard of.>
```

## Pitfalls

- Average views are inflated by outliers. Use the median for "normal" and the last-4 average for "now".
- `publishedAtEstimate` in the channel sample is month-granular; order videos inside a month by their sample position (newest first) and say the decay is dated to the month.
- "Your titles are generic" without the exact title, its views and a competitor's title with views is not a finding.
- Fewer views is not a finding by itself. Niching the title down can be the goal; judge against reach or conversion, never against views alone.
- Thumbnail lens only when you can see the thumbnails. Otherwise say so and skip it.
- Shorts-first channels: `get_channel_shorts` and `type: "short"` on outlier searches.
- Under 15 sampled videos, decay patterns are "early signal".
- Do not rewrite titles nobody asked you to rewrite.

## Example prompts

- "Roast @mychannel. Be direct. Why did the last six videos tank?"
- "Audit this channel's packaging against what's working in woodworking right now: youtube.com/@handle"
- "My video on X got 180K, everything since gets 2K. Tear it down and rewrite the last 3 titles."
