---
name: competitor-landscape
description: Compare a YouTube channel against its real neighbours. Uses TubeLab's related-channels search to find the channels most similar to the seed, reads each one's numbers and titles for cadence, consistency, outlier rate, content pillars and promise rung, then maps overlaps and gaps and writes a positioning sentence. Use when asked who my competitors are, how I compare to similar channels, competitor analysis or research, what competitors cover that I do not, what to copy from channels like mine, or a competitive landscape for a client. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "5-9 per run (1 search_related_channels at 5, optional search_related_outliers at 2; channel reads free)"
  plan: starter
---

# Competitor landscape

Your competitors are the channels the index places next to yours, not the big names you watch. One paid search finds them; free reads do the rest. The output is a competitive map: a comparison table, a pillar matrix, the gaps and overlaps, what to copy and what to avoid, and one positioning sentence for the seed channel.

- Use for: "who are my competitors", "how do I compare to channels like mine", "competitor analysis for @channel", "what do similar channels cover that I don't", "competitive landscape for a client".
- Not for: a packaging diagnosis of one channel (`channel-teardown`), niche-level outlier patterns (`outlier-research`), how competitors make money (`monetization-research`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Seed channel | required: ID, URL or `@handle` |
| Known competitors | optional list to force into the set |
| Number of neighbours | 6 to 8 comparable, plus 2 one tier up |
| Shorts | only if the seed publishes Shorts |

## Credit budget

Say before the first paid call: "About 5 to 9 credits: one related-channels search at 5, an optional related-outliers search at 2, channel reads are free." Do not paginate.

## Workflow

1. **Seed profile (free).** `get_channel`: subscribers, `medianViewsEstimate`, `averageViewsEstimate`, `viewVariationCoefficient`, `positiveOutliersCount`, `videosSampleCount`, `averageVideoDurationEstimate`. From `item.videos[]`: cadence (videos published in the last 90 days from `publishedAtEstimate`), top 5 titles by `statistics.averageViewsRatio`, bottom 5, and 3 to 5 content pillars named from the titles. Extract, never echo the payload.
2. **Neighbours.** `search_related_channels` with `relatedChannelId: ["<seed id>"]`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `subscribersFrom` at a third of the seed's subscribers, `size: 15`. Without the subscriber floor a large seed returns small lookalikes (a 4M-subscriber channel got neighbours under 10K), not peers. Per hit keep `snippet.title`, `handle`, `semantic.niches`, `statistics.subscriberCount`, `medianViewsEstimate`, `avgViewsToSubscribersRatio`, `viewVariationCoefficient`, `positiveOutliersCount`, `joinedDateEstimate`, `classification.isFaceless`, `monetization.adsense`, `detections.sponsored.detected`, `audience.dominant` where present. Pick 6 to 8 with subscribers between 0.3x and 3x the seed, plus 2 between 3x and 10x as the tier above. Add the user's named competitors. Under 6 usable hits: widen to `semester` once and say so. For very large seeds (over 1M subscribers) the related index may hold no peers at all; then build the set from the channels behind step 5's related outliers plus the user's named competitors, and say the set is outlier-derived. Never drop `classificationQuality`.
3. **Neighbour numbers (free).** `get_channel` on each pick (up to 10): cadence in the last 90 days, median versus average, variation coefficient, outlier rate (`positiveOutliersCount` over `videosSampleCount`), average duration, top 3 titles by ratio, last upload date. `get_channel_shorts` only when the seed makes Shorts.
4. **Pillars and rungs.** Cluster every channel's titles into pillars; reuse the seed's pillar names where they fit and add new ones where neighbours cover something else. Build the matrix channel × pillar with video count and median ratio per cell. Rate the median promise rung of each channel's last 10 titles (rung 1 bare promise, 2 promise plus constraint, 3 named mechanism, 4 implicit promise where the mechanism carries everything).
5. **What is moving now (optional, 2 credits).** `search_related_outliers` with `relatedChannelId: ["<seed id>"]`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `size: 20`: the neighbours' breakout videos this quarter, deduped to 2 per channel, with ratio and subscribers.
6. **Gaps and overlaps.** Gaps: pillars two or more neighbours cover with median ratio above 1 that the seed does not, with the neighbours' proof lines. Overlaps: pillars everyone covers, where the seed's ratio decides whether it is winning or losing them. Moats: pillars only the seed covers, kept only if its ratio there is above 1, otherwise flagged as a dead end. Formats neighbours repeat 3 or more times are patterns worth naming.
7. **Copy and avoid.** Rank what to copy by the number of neighbours doing it times their median ratio there, then by fit with the seed's existing pillars and size. Avoid: formats whose ratios fall over time in the neighbours' samples, pillars that need resources the seed lacks (on-camera, travel, budget), and anything the tier-above channels do only because of their size.
8. **Positioning sentence.** One sentence: for whom, what the seed does that the neighbours do not, proven by which pillar and ratio.

## Output

```markdown
# Competitive landscape: <seed title> (@handle)
Run: <date> · Neighbours: <n> comparable + <n> tier above · Credits used · Widened: <none | from, to, why>

## 1. Comparison
| Channel (handle) | Subs | Median views | Ratio to subs | Cadence /90d | Avg duration | Variation | Outlier rate | Faceless | AdSense / sponsored | Rung |
Seed first, then comparable, then tier above.

## 2. Pillar matrix (videos · median ratio)
| Pillar | Seed | @n1 | @n2 | … |

## 3. Gaps, overlaps, moats
Gaps: <pillar> · covered by <handles> · proof: handle · title verbatim · views · ratio · date
Overlaps: <pillar> · seed ratio <x> vs neighbours <y>
Moats: <pillar> · seed only · ratio <x> · keep | dead end

## 4. Moving now (if run)
| Title (verbatim) | Channel (handle) | Subs | Views | Ratio | Published |

## 5. Copy / avoid
Copy: <format or pillar> · <n> neighbours · median ratio · why it fits the seed
Avoid: <format> · <reason with data>

## 6. Positioning
<one sentence>
```

## Pitfalls

- Related means semantically similar, not necessarily who the user thinks of as competition. Show the set and let the user add or remove before the deep read.
- Compare with ratios, not raw views. A tier-above channel's 200K video is its normal.
- Cadence and outlier rate come from the 120-video sample; for channels with fewer videos, say "small sample".
- Long-form and Shorts are different games. Do not put Shorts numbers next to long-form numbers.
- Monetization and audience fields are estimates and may be empty on Starter accounts.
- Never invent a channel or a title. If you did not fetch it, it is not evidence.

## Example prompts

- "Who are my real competitors and how do I compare? youtube.com/@handle"
- "Competitive landscape for a client channel: what do the neighbours cover that they don't, and what should they copy?"
- "Compare @mychannel with @rival1 and @rival2 plus whoever TubeLab thinks is similar."
