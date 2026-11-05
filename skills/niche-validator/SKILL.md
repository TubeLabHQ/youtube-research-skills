---
name: niche-validator
description: Go or no-go verdict on one YouTube niche, from a keyword or from a channel whose niche you want checked. Reads the niche's channels and outliers from TubeLab to measure demand against supply, audience quality, which formats carry the niche, the gaps left open, and whether other-language markets are thinner, then writes a verdict memo with an entry strategy and the first five titles. Use when asked is this niche worth entering, is X saturated, should I start a channel about X, what niche is this channel in and is it crowded, or validate my niche idea. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "7-9 per run (1 search_channels at 5, 1-2 search_outliers at 2, free reads)"
  plan: starter
---

# Niche validator

One niche, one verdict. Where `niche-finder` scans wide and bends, this skill goes deep on a single niche the user already has in mind and says enter, enter with a twist, or stay out, with the numbers that justify it. The output is a verdict memo a creator can act on this week.

- Use for: "is X worth entering", "is X saturated", "should I start a channel about X", "what niche is @channel in and is it crowded", "validate my niche".
- Not for: finding or bending niches (`niche-finder`), why one video worked (`outlier-research`), ideas for an existing channel (`video-ideation`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Niche keyword or channel | one is required; from a channel, name the niche from its titles first |
| Language | `["en"]`; expansion check in fr, de, es, pt only if asked or if the English verdict is "crowded" |
| Faceless? | ask once if the user plans a faceless channel |
| Exclusions | the slop list from `tubelab-mcp` plus the user's own |

## Credit budget

Say before the first paid call: "About 7 to 9 credits: one channel search at 5, one or two outlier searches at 2, channel reads are free." Do not paginate. A language expansion is one more channel search at 5; ask before running it.

## Workflow

1. **Name the niche (free, when a channel is given).** `get_channel`: from `item.snippet` and the `item.videos[]` titles write the niche in 2 to 4 words plus one alternative phrasing. Confirm with the user only if the two phrasings disagree.
2. **Supply and demand.** `search_channels` with `query: ["<niche>", "<alternative phrasing>"]`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `excludeNiche: [slop list]`, `language`, `size: 20`, no `sortBy` (seeded-random, the app's unbiased sample). Add `classificationIsFaceless: true` when the user plans a faceless channel. Drop off-topic hits before reading anything.
3. **Widen rule.** Under 10 on-topic hits: `trimester` → `semester` → `year`, one step at a time, with one sentence in the memo saying which window was used and why. Never drop `classificationQuality`.
4. **Read the sample.** Per hit: `statistics.medianViewsEstimate`, `avgViewsToSubscribersRatio`, `viewVariationCoefficient`, `subscriberCount`, `joinedDateEstimate`, `semantic.niches[]`, `monetization` bands, `detections.*.detected`, `audience.dominant`. Then: demand is the median of median views and the share of channels with ratio above 1; supply is the count of on-topic channels and how many are near-duplicates (same niches, same title shapes); freshness is the share joined within a year; audience quality is the dominant region, age and income when present, else the language as a proxy.
5. **Formats that carry the niche.** `search_outliers` with the same `query`, `publishedAtFrom` as used in step 2, `sortBy: "averageViewsRatio"`, `averageViewsRatioFrom: 3`, `classificationQuality: "neutral"`, `excludeKeyword: [slop list]`, `language`, `size: 20`. Dedupe to max 2 per `snippet.channelId`. Group titles by format and title mechanic; a format counts when 3 or more outliers from different channels share it.
6. **Leaders (free).** `get_channel` on 2 to 3 of the strongest channels from step 2: upload cadence from `item.videos[]` dates, long-form versus Shorts mix, the top 3 titles by `averageViewsRatio`, what they never cover.
7. **Gaps and bent ideas.** Topics the audience asks for that no leader covers, formats proven in step 5 that the leaders have not used, and 2 to 3 bent ideas (swap the audience, swap the solution, fuse two formats) with the parent outliers named.
8. **Language markets (optional, 5 credits).** Rerun step 2 with `language: ["fr"]`, `["de"]`, `["es"]` or `["pt"]` for one language the user can produce in; compare `pagination.total` and median views against English.
9. **Verdict.** Enter when demand is healthy (median views above the user's floor, ratio above 1 on most channels) and supply is low or stale (few near-duplicates, young channels still clearing the floor). Enter with a twist when demand is healthy and supply is high but a gap or format from step 7 is open. Stay out when demand is thin, when near-duplicates dominate and nothing joined in the last year clears the floor, or when the audience region or income is wrong for the user's income goal. Rank the entry titles by the strength of the outlier pattern they borrow, then by freshness.

## Output

```markdown
# Niche verdict: <niche>
Run: <date> · Language · Window: <trimester | semester | year> · Widened: <none | from, to, why> · Credits used

## 1. Saturation (demand vs supply)
Demand: median of median views <n> · <n> of <n> channels with ratio above 1 · top median <n>
Supply: <n> on-topic channels in the sample · <n> near-duplicates · <n> joined within a year still clearing <floor> views
Verdict on saturation: <open | crowded but moving | saturated>

## 2. Audience quality
<dominant region · age · income from audience.dominant, labelled estimate; or language proxy> · monetization: <AdSense share, revenue band (estimate), detections present>

## 3. What is working (formats with proof)
| Format | Outliers (n, channels) | Median ratio | Example (channel (handle) · title verbatim · views · ratio · date) |

## 4. Gaps and bent ideas
- <gap or idea> · move · parents (proof lines)

## 5. Other-language markets (if checked)
| Language | Channels found | Median views | Verdict |

## 6. Verdict and entry strategy
**<Enter | Enter with a twist | Stay out>.** <two sentences of why, with the numbers>
Format · cadence · first 5 titles (each under 60 characters, with the outlier it borrows from)

## 7. Caveats
Sample size · estimates shown as bands · not checked
```

## Pitfalls

- A niche with ten big incumbents and nobody new clearing 1K median views is closed no matter how large the view counts look.
- Raw subscriber counts say nothing about openness; `avgViewsToSubscribersRatio` and `joinedDateEstimate` do.
- Monetization and audience fields are estimates and may be missing on Starter accounts. Say "estimate", give bands, and fall back to the language proxy without pretending it is more.
- Under 10 on-topic hits after widening is "thin signal", not "open".
- Never invent a channel or a video. If you did not fetch it, it is not evidence.

## Example prompts

- "Is 'home security for seniors' worth entering as a faceless channel?"
- "What niche is youtube.com/@handle in, and is it saturated?"
- "Validate 'budget RV living' for English and Spanish."
