---
name: sponsor-finder
description: Use when the user wants to find brands that could sponsor their YouTube channel, which brands sponsor similar channels, or how to pitch them. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Sponsor Finder

## Overview

Find the brands already paying channels with the user's audience and show how to pitch them. Not for a brand looking for creators (`sponsorship-prospecting`).

## Workflow

1. Clarify scope only if needed. Target channels from 0.3x to 3x the user's subscribers.
2. Read the user's channel, including sponsors it already has.
3. Find sponsored channels on the same topic, and check their audience.
4. Read the closest 10 for brands, promo codes and sponsor reads.
5. Rank brands by how close they are in size, audience and recency.

## Output Format

```markdown
# Sponsor List: {channel} (@handle)

Audience: {proxy} · Confidence: {level, why}

## Brands to Pitch
| Brand | Seen on (handle · title · date) | Offer | Why it fits | Your matching video |
|---|---|---|---|---|

## Caveats
- ...
```

Keep it under 250 words, with at most 5 table rows and 3 caveats.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above. Loosen the size band instead.
- Do not look for brand names in the index, or list a brand you did not read or hear.
- Do not trust the sponsored flag alone. It often shows channels with no sponsor.
- Do not call every read a sponsor. Some are affiliate deals or the creator's own products.
- Do not pad a thin list. If the channel sells only its own offers, or nothing is found, say so.
- Do not pitch a current partner as new.
- Do not run more than three searches, or invent a contact, a rate or a brand.
