---
name: channel-teardown
description: Use when the user asks to roast a channel, why views died or dropped or growth stopped, what is wrong with their titles or thumbnails, to audit or review a channel, or to rewrite their titles. Pulls the channel's own numbers from the TubeLab MCP, finds what broke, compares with the niche, and writes a diagnosis essay with fixes.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Channel Teardown

## Overview

A port of TubeLab's channel roast: a long-form essay, short punchy paragraphs, bold claims backed by data, no bullets or tables except the TL;DR. Read the channel's own videos for free on the TubeLab MCP, compute the decay, then compare with the niche before diagnosing.

## When to Use

Use this skill when the user asks to:

- roast a channel, or explain why its views died or growth stopped
- audit a channel's titles, thumbnails or packaging, or rewrite its titles

Do not use this for ideas without a diagnosis (`video-ideation`), a niche-level view (`outlier-research`), or thumbnails alone (`thumbnail-concepts`).

## Data Sources

| Tool | Use it for |
|---|---|
| `get_channel`, `get_channel_shorts` | Stats and up to 120 videos with ratios and outlier flags |
| `get_video`, `get_video_transcript` | Enrich a winner or underperformer; verify a mismatch |
| `search_outliers` | What is working in the niche right now |
| `search_related_channels` | The competitor set and its promise rung |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Channel (required). Goal, asked once: **reach** (views, AdSense, sponsors) or **conversion** (views from buyers); unknown, assume reach unless the description sells something. Rewrites only if asked.

2. **Read the channel**
   - `get_channel`, one call: subscribers, `averageViewsEstimate`, `medianViewsEstimate`, `viewVariationCoefficient`, outlier counts, `videosSampleCount`; per video: title, `viewCount`, `publishedAtEstimate`, `statistics.averageViewsRatio`, outlier flags. Shorts-first: `get_channel_shorts`. Never echo.

3. **Compute before reading anything else**
   - Median views ("normal") and the last-4 average ("now", non-live). The contradiction: best video vs last-4 average ("182K once. Last four averaged 1,597.").
   - Outliers with title, views, ratio, date. Decay: any title structure used 3 or more times with views falling run over run; a 3x drop is the headline. A positive outlier never repeated is the unfair advantage.

4. **Enrich**
   - `get_video` on the biggest outlier plus 1 to 2 underperformers. `get_video_transcript` only to verify a mismatch or rewrite a title, at most 3.

5. **The niche right now**
   - `search_outliers`, 2 to 3 passes on angles from the channel's titles: `query`, `publishedAtFrom: "semester"`, `sortBy: "averageViewsRatio"`, `language` of the channel, `classificationQuality: "neutral"`, `viewCountFrom` at 2 to 5x the channel's average (2K-average uses 5000, 500K-average uses 1000000), `size: 20`. Add `channelMonetizationAdsense: true` above a 500K floor so paid campaigns (ratio 50+) do not pass as competitors.
   - Under 5 hits: widen to `year` once and say so.

6. **The competitor set**
   - `search_related_channels` with `relatedChannelId: ["<channel id>"]`, `publishedAtFrom: "semester"`, `classificationQuality: "neutral"`, `size: 12`; their titles show the niche's promise rung.

7. **Apply only the lenses that fit, judged against the goal**
   Each finding: the title and its views, why it fails, the fix, a competitor's title and views. Under conversion, fewer views on a buyer-naming title fails only if it names a segment the channel does not sell to.

   | Lens | Test | Example |
   |---|---|---|
   | Authority signal | Cover the channel name: does the title still say why to trust it? | "9 Marks Burglars Leave on Houses They Hit" |
   | Promise rung | 1 bare, 2 plus constraint, 3 named mechanism, 4 implicit. Median of last 10 vs competitors' top 10. | "Home security tips" (1) vs "What 400 burglars told me" (4) |
   | Content contract | Strong title, decent views, low like ratio; verify with one transcript. | "I tested every budget camera" delivering two |
   | Thumbnail second job | Only when viewed. Thumbnail text that repeats the title is an echo. | "LIVE ALONE?" under "9 Things That Tell Burglars You Live Alone" |
   | Exhausted formats | The decay from step 3. Fix: change the promise, keep the mechanism. | "7 Gadgets" 204K → "10 Gadgets" 66K → "15 Gadgets" 9K |

8. **Write the essay**

## Output Format

```markdown
# Teardown: {channel title} (@handle)

## Summary
- Sample: {n} videos · Goal assumed: {reach | conversion} · Widened: {none | why} · Lenses: {list}
- Confidence: High/Medium/Low

**TL;DR.** {Diagnosis in 1 to 2 bold sentences.}
1. {Action.} 2. … (3 to 5)
---
{Contradiction opener: best metric vs worst recent.}
{Decay trajectories in prose: date · exact title · views · ratio.}
{Lens findings, one short section per lens, each with a competitor title and views beside it.}
{Recommendations: 2 to 3 pillars from what worked here and in the niche · packaging rules · cadence · the unfair advantage.}
{5 to 8 ideas from the outlier data: title · pattern with channel, views, ratio · rung.}
{3 to 5 title templates with [bracketed] variables, one example each.}
{Close: root cause · the single thing to change first.}
{Rewrites, only if asked: what the video delivers · the mismatch · 2 to 3 options · the pick, each with a number, rung 3+, under 60 characters.}
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen once and say so. Never drop `classificationQuality: "neutral"`.
- Median for "normal", last-4 average for "now".
- Every finding carries the exact title, views, ratio, and a competitor's title with views.
- Two to three outlier searches plus one related-channels search. Never paginate a paid search; reads are free.

## Common Pitfalls

- Do not call fewer views a finding by itself; judge against the goal.
- Do not date decay to the day; dates are month-granular.
- Do not apply the thumbnail lens unseen, or mix Shorts with long-form.
- Do not rewrite titles nobody asked for; under 15 videos, decay is "early signal".
- Do not invent a channel or a number.
