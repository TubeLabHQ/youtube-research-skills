---
name: sponsorship-prospecting
description: Use when the user wants to find YouTube channels to sponsor for a product, build a creator prospect list, or match creators to an audience. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Sponsorship Prospecting

## Overview

Build a prospect list for a brand: channels with the right audience, consistent views and room for a sponsor.

## When to Use

Use this skill when the user asks to:

- find channels to sponsor for a product or campaign
- build a creator or influencer prospect list
- shortlist channels by audience profile

Do not use this for a creator asking who could sponsor them (`sponsor-finder`) or how a niche makes money (`monetization-research`).

## Workflow

1. Clarify scope only if needed. Get the product, target audience and budget tier: small (5K to 50K subscribers), mid (50K to 500K) or large (500K+).
2. Find channels matching the audience that have not taken sponsors yet.
3. Find channels matching the audience that already take sponsors.
4. Read the top 30 for upload cadence, recent views and contact hints.
5. Rank by audience match, then consistency, size fit and recency. Untapped beats proven at equal fit.
6. Write an outreach angle for the top 10, naming the video a placement would sit in.

## Output Format

```markdown
# Sponsor Prospects: {product} · {audience}

Tier: {tier} · Sample: {n} · Confidence: {level, why}

## Prospects
| Channel (handle) | Subs | Median views | Uploads/mo | Audience (estimate) | Sponsored before | Fit | Contact path |
|---|---:|---:|---:|---|---|---|---|

## CSV
rank,channel,handle,subscribers,median_views,uploads_per_month,audience,sponsored_before,fit,contact_path

## Outreach Angles
- **@handle:** placement in "{title}" · views · ratio · date · why the audience fits

## Caveats
- ...
```

## Common Pitfalls

- Do not search without `publishedAtFrom`. Start at `trimester`, widen one step at a time and say so.
- Do not search without `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not include made-for-kids channels.
- Do not combine a topic search with audience filters. The match drifts off topic.
- Do not rank by subscribers. A mismatched big channel is a worse buy than a matched small one.
- Do not put a channel with erratic views in a fixed-fee deal.
- Do not present audience fields as facts. The brand should ask the creator for a screenshot before paying.
- Do not assume Pro filters on a Starter plan. Fall back to topic and language and say so.
- Do not run more than three searches or paginate a paid search.
- Do not invent an email, a rate, a channel or a video.
