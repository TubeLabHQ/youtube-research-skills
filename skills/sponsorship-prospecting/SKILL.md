---
name: sponsorship-prospecting
description: Build a sponsor prospect list of mid-size YouTube channels whose audience matches a brand's target and who are not yet saturated with sponsors, using TubeLab's audience and monetization filters. Maps the brief (product, region, age, gender, income, budget tier) to filters, runs an untapped pass and a proven-to-take-sponsors pass, reads each channel for cadence, consistency and contact hints, ranks by fit and writes a prospect table, a CSV and an outreach angle per top channel. Use when asked for channels to sponsor, influencer or creator prospecting, a sponsorship list for a product, which YouTubers to work with, or an audience-matched creator shortlist. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "10-15 per run (2-3 search_channels at 5, channel reads free)"
  plan: pro
---

# Sponsorship prospecting

For brands and agencies: channels with the right audience, consistent views and room for a sponsor, found from audience predictions instead of a stale influencer database. The output is a prospect list with a fit rank, a CSV, and the video each placement would sit in.

- Use for: "find 30 channels to sponsor for [product]", "creator prospect list for [audience]", "which YouTubers in [niche] take sponsors", "mid-size channels with a US 35+ audience".
- Not for: how a niche makes money (`monetization-research`), what people say under the top videos (`comment-mining`), competitor sets for a creator (`competitor-landscape`).

Audience and monetization filters are Pro data. On a Starter account the audience filters return nothing; say so and fall back to niche keywords plus language as the audience proxy.

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Product and the pitch in one line | required |
| Target audience | region, age band, gender skew, income tier; ask for what the brief does not say |
| Budget tier | small (5K to 50K subscribers), mid (50K to 500K), large (500K+) |
| Niche angles | 2 to 3 topics the audience watches; derive from the product if not given |
| Language | `["en"]` |
| List size | 30 |

## Credit budget

Say before the first paid call: "About 10 to 15 credits: 2 to 3 channel searches at 5, channel reads are free." Do not paginate; a third angle beats a second page.

## Workflow

1. **Map the brief to filters.** Region to `audienceRegion` (M49 subregion codes, any of: `021` Northern America, `154` Northern Europe, `155` Western Europe, `039` Southern Europe, `151` Eastern Europe, `053` Australia and New Zealand, `030` Eastern Asia, `035` South-eastern Asia, `034` Southern Asia, `145` Western Asia, `005` South America, `013` Central America). Age band to `audienceAgeFrom` and `audienceAgeTo`. Gender to `audienceDominantGender` (`male`, `female`, `balanced`). Income to `audienceDominantIncome` (any of `low`, `middle`, `upper_middle`, `high`). Budget tier to `subscribersFrom` and `subscribersTo`.
2. **Untapped pass.** `search_channels` with `query: ["<angle 1>"]`, the audience filters, `subscribersFrom/To`, `monetizationSponsored: false`, `detectionsForKids: false`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `language`, `medianViewsFrom: 5000`, `excludeNiche: [slop list from tubelab-mcp]`, `size: 20`.
3. **Proven pass.** Same filters with `detectionsMonetization: ["sponsored"]` instead of `monetizationSponsored: false`: channels already taking sponsors, which proves the audience buys from creators. Read `detections.sponsored.detected` on each hit; `monetization.sponsored` is stripped on the public API.
4. **Third angle** (optional). Repeat step 2 for `<angle 2>` when the first two passes give under 20 usable hits combined.
5. **Widen rule.** Under 10 usable hits in a pass: `trimester` → `semester`, then drop `audienceDominantIncome`, then relax the age band by 10 years, one step at a time, with one sentence in the output saying what was widened. Never drop `classificationQuality` or `detectionsForKids: false`.
6. **Read each hit:** `audience.dominant` (region, age, gender, income) and `audience.significant`, `statistics.subscriberCount`, `medianViewsEstimate`, `viewVariationCoefficient`, `lastPublishedAtEstimate`, `detections.sponsored.detected`, `detections.affiliate.detected`, `semantic.niches[]`. Drop channels whose dominant region or age sits outside the brief unless `audience.significant` includes it.
7. **`get_channel`** (free) on the top 30: uploads per month from `item.videos[]` dates, median of recent `viewCount`, the 3 top videos by `statistics.averageViewsRatio`, and contact hints in `item.snippet.description` (a business email mention, a website, "for sponsorships"). Record only what the description shows; otherwise the contact path is "channel About page".
8. **Rank** by audience match first (dominant profile equals the brief beats significant-only), then consistency (lower `viewVariationCoefficient`), then size fit to the budget tier, then recency of the last upload. Untapped channels with a matched audience outrank proven ones at equal fit, because the placement will not compete with other sponsors.
9. **Outreach angle for the top 10.** Name the video on their channel a placement would sit in (title verbatim, views, ratio, date) and the one-line reason the audience match holds.

## Output

```markdown
# Sponsor prospects: <product> · <audience summary>
Run: <date> · Budget tier · Angles · Credits used · Widened: <none | what, why> · Plan data: <audience filters used | Starter fallback>

## 1. Prospect list (ranked)
| # | Channel (handle) | Subs | Median views | Uploads / month | Audience (region · age · gender · income) | Sponsored before | Affiliate | Fit | Contact path | Note |

## 2. CSV
```csv
rank,channel,handle,channel_id,subscribers,median_views,uploads_per_month,audience_region,audience_age,audience_gender,audience_income,sponsored_before,affiliate,fit,contact_path,note
```

## 3. Outreach angle (top 10)
- **@handle:** placement in "<title verbatim>" · <views> · ratio <n> · <date>. Why the audience fits: <one line>. Pitch: <one line tying the product to that video's promise>.

## 4. Caveats
Audience and monetization fields are model estimates; confirm with the creator's own analytics before contracting. Untapped means no sponsor detected in the last parse, not never sponsored. Not checked: <brand safety of comments, pricing>.
```

## Pitfalls

- Audience fields are predictions. Present them as "predicted" and ask the creator for a screenshot before paying.
- Never fabricate an email, an agent or a rate. The contact path is what the description shows, or the About page.
- A big channel with a mismatched audience is a worse buy than a small one with the right audience. Rank by fit, not subscribers.
- High variation coefficient means the placement's views are a lottery. Prefer steady channels for fixed-fee deals.
- `monetizationSponsored: false` and `detectionsMonetization` can disagree after a monetization flip; trust the detection, it is the fresher signal.
- Never invent a channel or a video. If you did not fetch it, it is not evidence.

## Example prompts

- "Find 30 channels to sponsor for a sleep supplement: US and UK, 35 to 60, balanced gender, upper-middle income, budget for 50K to 300K subscriber channels."
- "Creator prospect list for a woodworking tool brand, English, channels that already take sponsors."
- "Which mid-size personal finance channels have an Australian audience and no sponsor yet?"
