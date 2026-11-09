---
name: monetization-research
description: Use when the user wants monetization gaps for a YouTube channel or niche, what to sell, how to raise RPM, or who could sponsor it. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Monetization Research

## Overview

Find the monetization gaps: what this audience already pays for elsewhere that the channel lacks, and open products nobody in the niche sells. The evidence is in descriptions, offer pages and sponsor reads, all free.

## Workflow

1. Clarify scope only if needed. With no channel, audit the niche.
2. Read the channel's descriptions: how it earns and who pays it.
3. Find peers: competitors you can name, plus same-audience channels from one or two audience-filter searches. Drop off-audience hits.
4. Open their actual offers: what, for whom, price, link. A brand only heard links to its video moment.

## Output Format

```markdown
# Monetization Research: {channel or niche}

- **Biggest gap:** {one line}
- **Peers:** {n}, from {named, search}
- **Confidence:** {level, brief why}

## Methods, Best First
| Method | This channel | Who does it | Opportunity |
|---|---|---|---|
| {method} | {missing, weak or [doing]({link})} | [{offer}]({link}) on [{channel}]({url}) | {short} |

## Open Products to Test
1. **{Specific offer}**
   - Evidence: {linked proof}
   - First test: {short}
```

About 600 words. Rows span products, courses, communities, newsletters, services, sponsors, affiliates, merch, events, software and ads with RPM levers. Sponsor rows list peers' brands, none current. Three open products. One fact per bullet, under 25 words except quotes; no extra sections or bullets. Cut items before proof. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or slop fills the results.
- Do not call every mention a sponsor; some are affiliates or own products.
- Do not rank high what this channel already runs well.
- Do not copy a 500K channel's course funnel onto a 2K channel lacking the trust.
