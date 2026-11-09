---
name: monetization-research
description: Use when the user wants to understand how a YouTube channel or niche makes money, how to raise RPM, what to sell, or who could sponsor it. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Monetization Research

## Overview

Show how a channel could earn more by studying its competitors and other channels with the same audience.

## Workflow

1. Clarify scope only if needed. With no channel, audit the niche for a new entrant.
2. Record how the channel earns today from its descriptions.
3. Find channels of similar size, in and outside its niche, with the same audience.
4. Read the best 8 for exact sponsors, products, courses and services.
5. Rank the opportunities by evidence and fit.

## Output Format

```markdown
# Monetization Research: {channel or niche}

Audience: {estimate} · Confidence: {level, why}

## Today
{How it earns now, in two sentences.}

## Opportunities
| Method | Proof (handle · what was seen) | Fit | First step |
|---|---|---|---|

## Sponsors to Pitch
| Brand | Seen on (handle · title · date) | Why it fits |
|---|---|---|

## RPM Levers
- ...

## Caveats
- ...
```

Keep it under 350 words, with at most 5 rows per table and 3 caveats.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not quote revenue, RPM or audience as a single figure. Use bands labelled as estimates.
- Do not say a method is absent because the index has no detection. Read the descriptions.
- Do not look for brands in detection fields. They appear only in descriptions and transcripts.
- Do not call every read a sponsor, or pitch a current partner as new. Some are affiliate deals or the creator's own products.
- Do not copy a method without the authority behind it. A 2K channel cannot run a 500K channel's course funnel.
- Do not stop at thin results. Say the peer set is weak and what you read instead.
- Do not run more than four searches, or invent a brand or a price.
