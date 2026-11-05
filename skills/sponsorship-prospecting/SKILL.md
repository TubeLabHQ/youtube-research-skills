---
name: sponsorship-prospecting
description: Use when the user asks for YouTube channels to sponsor for a product, creator or influencer prospecting, a sponsorship list for a brand, or an audience-matched creator shortlist. Maps the brief to the TubeLab MCP's audience and monetization filters, ranks mid-size channels by fit, and writes a prospect table, a CSV and outreach angles.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Sponsorship Prospecting

## Overview

For brands and agencies: channels with the right audience, consistent views and room for a sponsor, found from the TubeLab MCP's audience predictions instead of a stale influencer database; free channel reads confirm cadence, consistency and contact hints.

## When to Use

Use this skill when the user asks to:

- find channels to sponsor for a product or campaign
- build a creator or influencer prospect list for an audience
- shortlist channels with a given region, age, gender or income profile, or that already take sponsors

Do not use this for a creator asking who could sponsor them (`sponsor-finder`) or how a niche makes money (`monetization-research`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_channels` | Candidates by audience, size band, sponsor status |
| `get_channel` | Cadence, recent views, top videos, contact hints |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Product and pitch in one line (required); target region, age band, gender skew, income tier.
   - Budget tier: small (5K to 50K subscribers), mid (50K to 500K), large (500K+). Angles: 2 to 3 topics the audience watches. Language `["en"]`, list size 30.
   - Audience and monetization filters need Pro. On Starter fall back to niche keywords plus language and say so.

2. **Map the brief to filters**
   - `audienceRegion` M49 codes: 021 Northern America, 154 Northern Europe, 155 Western Europe, 039 Southern Europe, 151 Eastern Europe, 053 Australia and NZ, 030 Eastern Asia, 035 South-eastern Asia, 034 Southern Asia, 145 Western Asia, 005 South America, 013 Central America.
   - `audienceAgeFrom`/`To`; `audienceDominantGender` (`male`, `female`, `balanced`); `audienceDominantIncome` (`low`, `middle`, `upper_middle`, `high`); `subscribersFrom`/`To` from the tier.

3. **Untapped pass**
   - `search_channels` with `query: ["<angle 1>"]`, the audience filters, `subscribersFrom/To`, `monetizationSponsored: false`, `detectionsForKids: false`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `language`, `medianViewsFrom: 5000`, `excludeNiche: [slop list]`, `size: 20`.

4. **Proven pass**
   - Same filters with `detectionsMonetization: ["sponsored"]` instead of `monetizationSponsored: false`. Read `detections.sponsored.detected`; `monetization.sponsored` is stripped on the public API. A third pass on `<angle 2>` only when both give under 20 usable hits together.

5. **Widen rule**
   - Under 10 usable hits: `trimester` to `semester`, then drop `audienceDominantIncome`, then relax the age band by 10 years, one step at a time, and say so. Never drop `classificationQuality` or `detectionsForKids: false`.

6. **Read and enrich**
   - Per hit: `audience.dominant` and `significant`, `subscriberCount`, `medianViewsEstimate`, `viewVariationCoefficient`, `lastPublishedAtEstimate`, `detections.sponsored.detected`, `detections.affiliate.detected`, `semantic.niches[]`. Drop channels whose dominant audience is outside the brief unless `audience.significant` includes it.
   - `get_channel` on the top 30: uploads per month, median recent `viewCount`, top 3 videos by `averageViewsRatio`, contact hints, else "channel About page".

7. **Rank and write angles**
   - Audience match first (dominant beats significant-only), then lower `viewVariationCoefficient`, then size fit, then upload recency. Untapped outranks proven at equal fit.
   - Top 10: the video a placement would sit in (title verbatim, views, ratio, date) and why the audience fits.

## Output Format

```markdown
# Sponsor Prospects: {product} · {audience summary}

## Summary
- Tier · Angles · Sample: {n} usable hits, {n} enriched · Widened: {none | what, why}
- Plan data: {audience filters | Starter fallback} · Confidence: High/Medium/Low

## 1. Prospect list (ranked)
| # | Channel (handle) | Subs | Median views | Uploads / month | Audience (region · age · gender · income) | Sponsored before | Affiliate | Fit | Contact path | Note |

## 2. CSV
rank,channel,handle,channel_id,subscribers,median_views,uploads_per_month,audience_region,audience_age,audience_gender,audience_income,sponsored_before,affiliate,fit,contact_path,note

## 3. Outreach angle (top 10)
- **@handle:** placement in "{title verbatim}" · {views} · ratio {n} · {date} · why the audience fits · pitch

## 4. Caveats
- Audience and monetization fields are estimates · untapped means no sponsor detected in the last parse · not checked: brand safety, pricing
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen one step at a time and say so. Never drop `classificationQuality: "neutral"` or `detectionsForKids: false`.
- Audience fields are predictions: label them; the brand should ask the creator for a screenshot before paying.
- Every placement carries channel, title verbatim, views, ratio, date.
- Two searches is the default, three the ceiling. Never paginate a paid search.

## Common Pitfalls

- Do not combine a semantic `query` with audience filters in one call; the match drifts off topic. Use one or the other and say which.
- Do not rank by subscribers; a mismatched big channel is a worse buy than a matched small one.
- Do not put a high-variation channel in a fixed-fee deal.
- Do not trust `monetizationSponsored: false` over `detectionsMonetization` when they disagree; the detection is fresher.
- Do not fabricate an email, a rate, a channel or a video.
