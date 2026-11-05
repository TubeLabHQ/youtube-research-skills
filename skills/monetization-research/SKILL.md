---
name: monetization-research
description: Use when the user asks how to monetize a YouTube channel, how competitors make money, how to raise RPM, what to sell to their audience, or for a monetization audit of a channel or niche. Finds niche competitors and audience twins with the TubeLab MCP, reads their exact money mechanics, and ranks the opportunities.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Monetization Research

## Overview

Audit how a channel could make more money from two samples: niche competitors, and channels in other niches with the same audience, which show what that audience already pays for. The TubeLab index flags the methods; the exact mechanics come from free reads of descriptions and transcripts.

## When to Use

Use this skill when the user asks to:

- learn how channels like theirs, or the competition, make money
- run a monetization audit for a channel or niche
- raise their RPM, find what to sell, or see which sponsors work with their niche

Do not use this for a brand seeking creators (`sponsorship-prospecting`) or a full sponsor list with outreach (`sponsor-finder`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_related_channels` | Niche competitors, audience proxy |
| `search_channels` | Niche top earners, audience twins |
| `get_channel`, `get_video` | Descriptions: sponsors, affiliates, products |
| `get_video_transcript` | Sponsor reads |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Channel (recommended; else audit the niche for a generic entrant). Goal: all methods, or one of AdSense, sponsors, products, community, services.
   - Audience, revenue and RPM fields need Pro. On Starter run steps 2, 4 and 6 and say what is missing.

2. **Your baseline**
   - `get_channel`: subscribers, `medianViewsEstimate`, `averageVideoDurationEstimate`, cadence. Current stack from the channel description and top 3 video descriptions via `get_video`: sponsors, affiliate, product, course, community, newsletter, services, donations.

3. **Niche competitors and audience proxy**
   - `search_related_channels` with `relatedChannelId: ["<channel id>"]`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `subscribersFrom` at a third of the user's subscribers, `size: 20`.
   - Keep `semantic.niches`, `medianViewsEstimate`, `revenueMonthlyEstimationFrom/To`, `rpmEstimationFrom/To`, each `detections.<type>.detected`, `audience.dominant`. Audience profile: the most common `audience.dominant`, labelled "proxy".

4. **Niche money pass**
   - `search_channels` with `query: ["<niche>"]`, `publishedAtFrom: "semester"`, `classificationQuality: "neutral"`, `excludeNiche: [slop list]`, `sortBy: "revenueMonthly"`, `size: 20`. Count the merged niche set per detection.

5. **Audience twins outside the niche**
   - `search_channels` with no `query`, `excludeNiche: ["<niche keywords>"]`, `audienceRegion`, `audienceAgeFrom`/`To`, `audienceDominantGender`, `audienceDominantIncome`, `detectionsMonetization: ["sponsored", "affiliate", "product", "course", "community", "newsletter", "services"]`, `medianViewsFrom: 5000`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `sortBy: "revenueMonthly"`, `size: 20`.
   - Under 8 hits: drop the income filter, then widen the age band, and say so. Optional pass with `sortBy: "rpm"` for an AdSense goal.

6. **Read the mechanics**
   - 8 to 12 channels: the 4 niche channels with most detections, plus 4 to 8 twins. `get_channel` description, then `get_video` on each one's top 2 videos by `averageViewsRatio`. Record only what you see.
   - For 2 to 3 channels with `detections.sponsored.detected`, `get_video_transcript`, `events[]` until `startMs` passes 120000.

7. **RPM levers**
   - Audience tier against the twins' `rpmEstimationFrom/To` bands sets the ceiling; videos over 8 minutes take mid-rolls; topics the same audience watches on higher-RPM twins are adjacent topics to cover. Bands, never a number.

8. **Rank opportunities, list sponsors**
   - Rank by evidence (niche channels plus twins using the method) times fit (audience, format, authority), cheapest effort as tie-break. Twins but no niche evidence is "open on your audience"; niche but no twins is "table stakes".
   - Every brand seen in step 6: category, where seen, whether within 3x of the user's size.

## Output Format

```markdown
# Monetization Audit: {channel title} (@handle) | {niche}

## Summary
- Audience: {region · age · gender · income} ({own record | proxy from n channels | inferred})
- Sample: {n} niche channels, {n} twins, {n} read in full · Plan fields: {yes | partial} · Confidence: High/Medium/Low

## 1. Your stack today
{methods found, or "AdSense only" / "nothing visible"}

## 2. How the niche monetizes ({n} channels)
| Method | Channels using it | Share | Revenue band of users (estimate) | Examples (handle · as read) |

## 3. What your audience already pays for elsewhere ({n} twins)
| Twin channel (handle) | Niche | Subs | Median views | Audience | Methods seen | Revenue band (estimate) |

## 4. Opportunities, ranked
| # | Method | Evidence (niche n + twins n) | Fit | Effort | First step | Proof (handle · title · views · ratio · date) |

## 5. RPM levers
Audience tier vs twins' RPM bands (estimates) · duration vs the 8-minute line · adjacent higher-RPM topics, each with its twin

## 6. Sponsor prospects
| Brand | Category | Seen on (handle · title · date) | Channel size vs yours | Pitch structure seen |

## 7. Caveats
- Revenue, RPM and audience are estimates shown as bands · detections come from a 5-video sample · methods listed only when read
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen one step at a time and say so. Never drop `classificationQuality: "neutral"`.
- Revenue, RPM and audience are model outputs: `From` to `To` bands labelled "estimate", never a single figure.
- Every method and brand carries channel, title verbatim, views, ratio, date.
- Three to four searches is the ceiling. Never paginate a paid search; reads are free.

## Common Pitfalls

- Do not say a method is absent because the index has no detection; read descriptions first.
- Do not look for brand names in `detections`; the API strips them. The flag is `detections.sponsored.detected`, the brand is your own reading.
- Do not copy a twin's method without its authority; a 2K channel copying a 500K course funnel is a gap.
- Do not promise RPM gains to a low-income or non-first-world audience; say the ceiling instead.
- Do not infer audience or money fields on Starter, and do not invent a brand, a product or a price.
