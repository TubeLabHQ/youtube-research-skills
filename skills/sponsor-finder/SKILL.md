---
name: sponsor-finder
description: Use when the user wants to find brands that could sponsor their YouTube channel, which brands sponsor similar channels, or how to pitch them. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Sponsor Finder

## Overview

Find the brands already paying channels with the user's audience and show how to pitch them.

## When to Use

Use this skill when the user asks to:

- find who could sponsor their channel
- see which brands sponsor channels like theirs
- build a sponsor list or know what to ask for

Do not use this for a brand looking for creators (`sponsorship-prospecting`) or a full money audit (`monetization-research`).

## Workflow

1. Clarify scope only if needed. Target channels from 0.3x to 3x the user's subscribers.
2. Read the user's channel, including sponsors it already has.
3. Find sponsored channels in the niche, then sponsored channels outside it with the same audience.
4. Read up to 15 of them, closest in size first, for brands, promo codes, links and sponsor reads.
5. Group by brand and rank by warmth: same size band, same audience, recent, seen on more than one channel.
6. Write an outreach angle for the top 10, using the user's own video that best fits each brand.

## Output Format

```markdown
# Sponsor List: {channel} (@handle)

Audience: {proxy} · Size band: {from} to {to} · Confidence: {level, why}

## Brands Paying Channels Like Yours
| Brand | Category | Seen on (handle · title · date) | Channels | Size range | Offer | Warmth |
|---|---|---|---:|---|---|---|

## Outreach Angles
- **{Brand}:** why them · your video that fits · placement · contact path or "not visible"

## Pitch Structures Seen
- "{Verbatim sponsor read opening}" · @handle · {timestamp}

## Caveats
- ...
```

## Common Pitfalls

- Do not search without `publishedAtFrom`, or `classificationQuality` at `"neutral"` or above. Loosen the size band instead.
- Do not combine a topic search with audience filters. The match drifts off topic.
- Do not look for brand names in the index. It only flags sponsored content, so read descriptions and transcripts.
- Do not list a brand you did not read or hear.
- Do not call every read a sponsor. Some are affiliate deals or the creator's own products.
- Do not pitch a current partner as new, or treat one appearance on a channel 10x the size as warm.
- Do not expect a long list above 1M subscribers. Sponsored channels thin out at the top.
- Do not give rates without labelling them an industry estimate, not TubeLab data.
- Do not run more than three searches or paginate a paid search.
- Do not invent a contact, a rate or a brand.
