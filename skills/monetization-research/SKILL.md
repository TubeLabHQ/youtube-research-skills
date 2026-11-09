---
name: monetization-research
description: Use when the user wants to know how a YouTube channel or niche makes money, how to raise RPM, what to sell, or who could sponsor it. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Monetization Research

## Overview

How a channel could earn more, from what its peers already do. The evidence is in descriptions and sponsor reads, free to read; the index only flags that money exists. Channels in other niches with the same audience show what it already buys. Revenue, RPM and audience are estimates: show bands.

## Workflow

1. Clarify scope only if needed. With no channel, audit the niche.
2. Read the channel's descriptions: how it earns and who already pays it.
3. Name similar-size, same-audience peers, in and outside the niche. Search once if you cannot name five.
4. Read 6 to 8 for links, codes and sponsor reads; rank by frequency and fit.

## Output Format

```markdown
# Monetization Research: {channel or niche}

**{Biggest opportunity, one line.}**
Today: {how it earns, who pays} · Confidence: {level, short reason}
Audience: {estimated band, only if a search gave one}

## Opportunities
1. **{Method}** · {proof} · First step: {action}

## Sponsors to Pitch
- {Brand} · {proof} · {fit}

## RPM Levers
- {Lever} · {evidence}
```

About 400 words: three opportunities, five sponsors, proof as channel (handle) · title · date · what was seen. Cut items before proof; add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or slop fills the results.
- Do not call every mention a sponsor (some are affiliates or own products), or pitch a current partner.
- Do not copy a 500K channel's course funnel onto a 2K channel. It lacks the trust.
- Do not hide how the peer set was built, or that it is weak.
