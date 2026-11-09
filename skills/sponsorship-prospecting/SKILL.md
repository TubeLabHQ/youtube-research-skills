---
name: sponsorship-prospecting
description: Use when the user wants to find YouTube channels to sponsor for a product, build a creator prospect list, or match creators to an audience. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Sponsorship Prospecting

## Overview

Build a short prospect list for a brand: channels with the right audience, steady views and room for a sponsor. Not for a creator seeking sponsors (`sponsor-finder`).

## Workflow

1. Clarify scope only if needed. Get the product, audience and budget tier.
2. Find channels on topics this audience watches, both unsponsored and already sponsored.
3. Check each one's audience from the results and drop mismatches.
4. Read the top 10 for cadence, recent views and contact hints.
5. Rank by audience match, then reach and steady views.

## Output Format

```markdown
# Sponsor Prospects: {product} · {audience}

Tier: {tier} · Confidence: {level, why}

## Prospects
| Channel (handle) | Subs | Median views | Audience (estimate) | Sponsored before | Best placement (title · views · ratio · date) | Contact |
|---|---:|---:|---|---|---|---|

## Caveats
- ...
```

Keep it under 300 words, with at most 10 rows per table and 3 caveats.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not search by audience alone. It returns general-interest channels, so search by topic and check the audience.
- Do not include made-for-kids channels.
- Do not rank by subscribers. A mismatched big channel is a worse buy than a matched small one.
- Do not present audience fields as facts. The brand should ask the creator for a screenshot before paying.
- Do not trust "unsponsored" alone. The flag under-detects.
- Do not run more than three searches, or invent an email, a rate or a channel.
