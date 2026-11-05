---
name: sponsor-finder
description: Use when the user asks who could sponsor their YouTube channel, which brands sponsor channels in their niche or at their size, a sponsor list for a pitch deck, or how much to ask. Finds sponsored channels with the same audience through the TubeLab MCP, reads their sponsor reads for brand names, and ranks the brands by warmth.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Sponsor Finder

## Overview

Brands already paying channels with the user's audience are the warmest leads a creator has. The TubeLab MCP index knows which channels carry sponsored content and who their audience is; the brand names live in descriptions and the first two minutes of videos.

## When to Use

Use this skill when the user asks to:

- find who could sponsor their channel, or which brands sponsor channels in their niche or at their size
- build a sponsor list for a pitch deck
- know how much to ask (bands only)

Do not use this for a brand looking for creators (`sponsorship-prospecting`) or a full money audit (`monetization-research`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_related_channels` | Sponsored lookalikes, audience proxy |
| `search_channels` | Sponsored twins outside the niche |
| `get_channel`, `get_video` | Descriptions: brands, codes, links |
| `get_video_transcript` | The sponsor read |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Channel (required); excluded categories (none by default).
   - Size band: 0.3x to 3x the user's subscribers. Seeds over 1M: `subscribersFrom: 100000`, no ceiling.
   - Audience filters need Pro. On Starter skip step 4 and say so.

2. **Your channel**
   - `get_channel`: subscribers, `medianViewsEstimate`, cadence, topics, and sponsors already in its descriptions, so a current partner is not pitched as new.

3. **Sponsored lookalikes in the niche**
   - `search_related_channels` with `relatedChannelId: ["<channel id>"]`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, the size band, `detectionsMonetization: ["sponsored"]`, `size: 20`. Audience profile is the most common `audience.dominant`, labelled "proxy".
   - Under 8 hits: one widening only across steps 3 and 4: drop the size band, keep the window, say so.

4. **Sponsored twins outside the niche**
   - `search_channels` with no `query`, `excludeNiche: ["<niche keywords>"]`, `audienceRegion`, `audienceAgeFrom`/`To`, `audienceDominantGender`, `detectionsMonetization: ["sponsored"]`, the size band, `medianViewsFrom: 5000`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `sortBy: "recency"`, `size: 20`.
   - Never combine a semantic `query` with audience filters; the match drifts off topic. Never pad a thin pass.

5. **Read the sponsor reads**
   - Up to 15 channels, closest in size first: `get_channel` description and `get_video` on the 3 latest videos for brands, promo codes, tracked links.
   - For 4 to 6 videos naming a sponsor, `get_video_transcript`, `events[]` until `startMs` passes 120000: placement, length, offer, pitch structure.

6. **Group by brand, rank by warmth**
   - Per brand: category, channels seen on, size range paid, offer, placement.
   - Warm: within the size band, same audience, more than one channel, last trimester, a category the content can host. Once on a channel 10x the size is cold.

7. **Outreach angle for the top 10**
   - The user's video that fits the category (title, views, ratio) and the placement they can offer as seen on the brand's channels.
   - Contact path only as seen in a description, else "not visible". Rates, if asked: a public CPM band labelled "industry estimate, not TubeLab data".

## Output Format

```markdown
# Sponsor List: {channel title} (@handle)

## Summary
- Audience: {region · age · gender · income} (proxy from {n} channels) · Size band: {from} to {to}
- Sample: {n} lookalikes, {n} twins, {n} read in full · Confidence: High/Medium/Low

## 1. Brands already paying channels like yours
| # | Brand | Category | Seen on (handle · title · date) | Channels (n) | Size range paid | Offer | Placement | Warmth |

## 2. Outreach angles (top 10)
- **{Brand}:** why them · your video that fits ({title · views · ratio}) · placement · contact path {URL | not visible}

## 3. Pitch structures seen
- "{verbatim opening of the sponsor read}" · @handle · {timestamp}

## 4. Caveats
- Brands only from descriptions and transcripts read · `detections.sponsored` is a sampled prediction · rates are not TubeLab data
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen once and say so. Never drop `classificationQuality: "neutral"`; drop the size band instead.
- Every brand carries channel, title verbatim, views, date. Not read or heard means not on the list.
- Audience fields are estimates: say "proxy".
- Two searches is the default, three the ceiling. Never paginate a paid search; reads are free.

## Common Pitfalls

- Do not look for brand names in the index; it flags sponsored content only.
- Do not call every read a sponsor; some are affiliate or own products.
- Do not let the size band drift upward, and do not expect a long list for seeds over 1M; the sponsored index thins out at the top.
- Do not invent a contact, a rate or a brand.
