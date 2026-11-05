---
name: competitor-landscape
description: Use when the user asks who their competitors are, how they compare to similar channels, for a competitor analysis, what competitors cover that they do not, what to copy from channels like theirs, or a competitive landscape for a client. Finds the channel's real neighbours with the TubeLab MCP and maps overlaps, gaps and positioning.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Competitor Landscape

## Overview

Your competitors are the channels the index places next to yours, not the big names you watch. One related-channels search on the TubeLab MCP finds them, free channel reads measure them; the output is a comparison table, a pillar matrix, gaps, copy and avoid, and one positioning sentence.

## When to Use

Use this skill when the user asks to:

- find out who their competitors are, or compare with similar channels
- run a competitor analysis for a channel or a client
- see what similar channels cover that they do not, or what to copy

Do not use this for a packaging diagnosis (`channel-teardown`), niche-level outlier patterns (`outlier-research`), or how competitors make money (`monetization-research`).

## Data Sources

| Tool | Use it for |
|---|---|
| `search_related_channels` | The channels most similar to the seed |
| `search_related_outliers` | The neighbours' breakout videos (optional) |
| `get_channel` | Numbers and titles of seed and neighbours |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Seed channel (required); optional named competitors. Shorts only if the seed publishes Shorts.

2. **Seed profile**
   - `get_channel`: subscribers, `medianViewsEstimate`, `averageViewsEstimate`, `viewVariationCoefficient`, `positiveOutliersCount`, `videosSampleCount`, `averageVideoDurationEstimate`; cadence over 90 days, top and bottom 5 titles by ratio, 3 to 5 pillars.

3. **Neighbours**
   - `search_related_channels` with `relatedChannelId: ["<seed id>"]`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `subscribersFrom` at a third of the seed's subscribers (else a large seed returns small lookalikes), `size: 15`.
   - Pick 6 to 8 between 0.3x and 3x the seed, plus 2 between 3x and 10x as the tier above, plus named competitors. Show the set before the deep read.
   - Under 6 usable hits: widen to `semester` once and say so. Seeds over 1M may have no peers: build the set from step 5's outlier channels and say so.

4. **Neighbour numbers, pillars, rungs**
   - `get_channel` on each pick (up to 10): cadence, median vs average, variation, outlier rate (`positiveOutliersCount` over `videosSampleCount`), duration, top 3 titles by ratio, last upload.
   - Cluster all titles into pillars, reusing the seed's names; matrix channel × pillar with video count and median ratio.
   - Promise rung of the last 10 titles: 1 bare, 2 plus constraint, 3 named mechanism, 4 implicit.

5. **Moving now (optional)**
   - `search_related_outliers`, same `relatedChannelId`, window and quality, `size: 20`; max 2 per channel.

6. **Gaps, overlaps, moats, copy, avoid, position**
   - Gaps: pillars 2 or more neighbours cover at median ratio above 1 that the seed does not. Overlaps: pillars everyone covers. Moats: seed-only pillars, kept if ratio above 1.
   - Copy: rank by neighbours doing it times their median ratio, then fit. Avoid: falling ratios, resources the seed lacks, anything the tier above does only because of size.
   - Positioning: for whom, what the seed does that neighbours do not, proven by a pillar and its ratio.

## Output Format

```markdown
# Competitive Landscape: {seed title} (@handle)

## Summary
- Neighbours: {n} comparable + {n} tier above · Set: {related | outlier-derived} · Window: {trimester | semester}
- Confidence: High/Medium/Low

## 1. Comparison
| Channel (handle) | Subs | Median views | Ratio to subs | Cadence /90d | Avg duration | Variation | Outlier rate | Faceless | AdSense / sponsored | Rung |

## 2. Pillar matrix (videos · median ratio)
| Pillar | Seed | @n1 | @n2 | … |

## 3. Gaps, overlaps, moats
Gaps: {pillar} · covered by {handles} · proof: handle · title verbatim · views · ratio · date
Overlaps: {pillar} · seed ratio {x} vs neighbours {y}
Moats: {pillar} · seed only · ratio {x} · keep | dead end

## 4. Moving now (if run)
| Title (verbatim) | Channel (handle) | Subs | Views | Ratio | Published |

## 5. Copy / avoid
Copy: {format or pillar} · {n} neighbours · median ratio · why it fits · Avoid: {format} · {reason}

## 6. Positioning
{one sentence}
```

## Quality Guardrails

- Always set `publishedAtFrom`; widen once and say so. Never drop `classificationQuality: "neutral"`.
- Compare with ratios, not raw views.
- Every gap and copy claim carries channel, title verbatim, views, ratio, date.
- One related-channels search plus an optional related-outliers search. Never paginate a paid search; reads are free.

## Common Pitfalls

- Do not assume related means who the user thinks of as competition; it is similarity.
- Do not put Shorts numbers next to long-form numbers.
- Do not treat cadence and outlier rate as exact under 120 videos, or monetization and audience fields as facts.
- Do not invent a channel or a title.
