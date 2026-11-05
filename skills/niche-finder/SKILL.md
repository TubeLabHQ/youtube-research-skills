---
name: niche-finder
description: Find YouTube niches that are working right now and bend them into new, unsaturated channel ideas with evidence. Finds working channels and outlier formats with TubeLab using the app's own default views, parses them into topic, job, format and audience cards, then transplants formats across topics, bridges audiences, twists topics and fuses formats into novel niche ideas, each validated with a cheap search. Use when asked to find a niche, what niche to start, unsaturated or untapped niches, faceless channel ideas, niche ideas with money in them, or to twist or combine niches. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.1"
  requires: tubelab-mcp
  credits: "14-22 per run (3 search_channels at 5, 2-3 search_outliers at 2, free reads)"
  plan: starter
---

# Niche finder

Two halves. First find what is working, using the same default views the TubeLab app shows. Then bend it into something that does not exist yet, with the parents named so the user can verify every idea. The output is a shortlist of novel niche ideas with evidence, not a list of niches that already exist.

- Use for: "find me a niche", "what should I start", "unsaturated niches", "faceless ideas", "twist this niche", "what's working in X and how do I make it mine".
- Not for: ideas for an existing channel (`video-ideation`), why one video worked (`outlier-research`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Seed topics | none; a broad discovery run is fine |
| Faceless? | ask once if unknown |
| Languages | `["en"]`; offer de, fr, es, pt as expansion markets |
| Exclusions | the slop list from `tubelab-mcp` plus the user's own |
| Adventurousness | 2 on a 1 to 3 scale (1 adjacent, 3 far transplant) |

## Credit budget

Say before the first paid call: "About 14 to 22 credits: 3 channel searches at 5, 2 to 3 outlier searches at 2, channel reads are free." Do not paginate. Do not re-run a search with one filter changed unless the result was empty.

## Workflow A: find what is working

1. **Niche Finder default view.** `search_channels` with `query` (seed topics, or omit for discovery), `subscribersFrom: 1`, `medianViewsFrom: 1000`, `videosCountFrom: 2`, `classificationQuality: "neutral"`, `publishedAtFrom: "trimester"`, `excludeNiche: [slop list]`, `language`, a fixed `seed`, `size: 20`, no `sortBy`. Add `classificationIsFaceless: true` if faceless. This is the unbiased "what exists right now" sample. Expect noise: with a `query`, about a third of the seeded-random hits can be off-topic; drop those before clustering.
2. **Money pass.** Same base plus `monetizationAdsense: true`, `revenueMonthlyEstimationFrom: 1000`, `subscribersFrom: 1000`, once with `sortBy: "recency"` (most recently active) and once with `sortBy: "foundAt"` (newest discoveries, where brand-new breakouts show up). Under 5 hits on a Starter account: rerun without the money filters and say so.
3. **Outliers Finder default view.** `search_outliers` with the same `query`, `viewCountFrom: 5000`, `type: "video"`, `classificationQuality: "neutral"`, `publishedAtFrom: "trimester"`, `excludeKeyword: [slop list]`, a fixed `seed`, `size: 30`, no `sortBy`. Catches formats that broke out inside niches the channel passes missed.
4. **Widen rule.** Under 5 usable hits in any pass: `trimester` → `semester` → `year`, one step at a time, with one sentence in the output saying which pass was widened and why. Never drop `classificationQuality`.
5. **Parse every hit into a card:** topic (2 to 4 words, from `semantic.niches` and titles) · job (what the viewer gets, as a verb phrase) · format (the repeatable packaging, from the sample `videos[]` titles) · audience (region · age · gender · income from `audience.dominant`, else "inferred") · money (`monetization` bands, `detections`) · age (`joinedDateEstimate`) · demand (`medianViewsEstimate`, `avgViewsToSubscribersRatio`) · proof line. Outliers: title, ratio, `channelSubscribers`, date. Cards make the moves mechanical: a transplant is "same audience, different topic, format absent".
6. **Cluster cards into working niches** by topic plus job. Score each 1 to 5 on demand (median views, ratio above 1), supply (near-duplicate channels in the sample), freshness (share joined within a year), money (revenue band, AdSense, sponsor or affiliate detections) and audience quality (older, higher-income, first-world audiences beat raw RPM). Saturation is high supply with low freshness.
7. For the top 3 to 5 niches, `get_channel` (free) on 2 leaders each to extract the exact title mechanics. Extract, never paste the payload.

## Workflow B: bend, twist, transplant

Produce at least 8 candidates with these moves, from closest to furthest from the evidence. Every idea names its parents.

8. **Format fusion (adjacent).** Two proven formats from the same niche in one packaging: "The 7 Levels of X" + "Your Life as a Y" → "Your Life as Every Level of X". Optional trending-topic injection with `search_trending_formats` on the niche (1 credit) only if it fits naturally.
9. **Topic twist (adjacent).** Keep the job, swap the solution: "feel safe at home" is served by cameras, dogs, lighting, neighbours, smart locks, habits. Or keep the solution, swap the audience: home security for landlords, RV owners, people living alone, small shop owners.
10. **Audience bridge (medium).** Two working niches share an audience profile: home security for seniors + dog training for seniors, same 55+ homeowner audience → "dogs as home security": breeds that deter burglars, training a dog to alert, what burglars say about dogs.
11. **Format transplant (medium to far).** A format proven in topic A moved to topic B where the audience matches and the format is absent: "I ranked every X" (tools, retired hobbyists) → "I ranked every hearing aid"; "what N burglars told me" → "what N nurses told me about hospital stays". Confirm the audience match with `audienceRegion` and `audienceAgeFrom` on a `search_channels` of topic B when the account has audience data; otherwise compare the cards.
12. **Market transplant (far).** Rerun pass 1 for the top niche with `language: ["fr"]`, `["de"]`, `["es"]` or `["pt"]` and compare `pagination.total` and median views. 40 English channels and 2 French ones with healthy medians is an open market. Only when the user has, or wants, the language.
13. **Validate the top 3 cheaply.** `search_outliers` with the bent idea as `query` (or its format as `titlePattern`), `publishedAtFrom: "semester"`, `classificationQuality: "neutral"`, `size: 10`. Zero to 3 hits next to healthy parents means open. A page of hits means someone already did it: differentiate or drop.

Rank bent ideas by open-ness first (fewest validation hits), then audience match (exact, overlapping, inferred), then the parents' demand and money scores. Tie-break by parent freshness.

## Output

```markdown
# Niche shortlist: <topic or "discovery">
Run: <date> · Languages · Faceless · Credits used · Widened: <none | which pass, from, to, why>

## 1. Working niches
| # | Niche | Evidence channels | Median views | Ratio | Age (joined) | Audience | Money signal | Saturation 1-5 |
Proof lines, one per evidence channel: channel (handle) · video title verbatim · views · ratio · date

## 2. Bent ideas (what does not exist yet)
| # | Idea | Move | Parents | Borrowed format | Audience match | Open-ness check (<n> hits in <window>) | First 3 titles |
Parent proof lines for every idea. Open ideas are "no evidence yet", never "guaranteed".

## 3. Market expansions
| Niche | Language | Channels found | Median views | Verdict |

## 4. Pitfalls and what we did not check
Estimates shown as bands · thin passes · not checked (Shorts, other languages, sponsor rates)
```

## Pitfalls

- A transplant needs the audience to match, not just the words. "For seniors" on a topic seniors do not watch is a dead idea.
- Compilations, AI filler, restoration, reaction and animal-heavy niches are hard to differentiate; flag them.
- Prefer audience filters over RPM filters when the user wants AdSense income.
- Revenue, RPM and audience are estimates. Say "estimate", give bands.
- Under 5 hits is not a trend. Widen once, then report "thin signal".
- Never invent a channel or a video. If you did not fetch it, it is not evidence.

## Example prompts

- "Find me 3 unsaturated faceless niches in English with real AdSense money."
- "Home security for seniors is working. Twist it into 5 novel channel ideas and tell me which are still open."
- "What's working in personal finance right now, and which formats could I transplant into woodworking?"
