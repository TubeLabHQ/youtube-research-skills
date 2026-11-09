---
name: monetization-research
description: Use when the user wants to understand how a YouTube channel or niche makes money, how to raise RPM, or what to sell to its audience. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Monetization Research

## Overview

Show how a channel could make more money by studying its competitors and channels in other niches with the same audience.

## When to Use

Use this skill when the user asks to:

- learn how a channel or niche makes money
- raise RPM or find what to sell
- audit a channel's monetization

Do not use this for a brand seeking creators (`sponsorship-prospecting`) or a full sponsor list (`sponsor-finder`).

## Workflow

1. Clarify scope only if needed. With no channel, audit the niche for a new entrant.
2. Record how the channel earns today from its descriptions.
3. Find niche competitors and estimate the audience.
4. Find channels in other niches with the same audience. They show what this audience already pays for.
5. Read 8 to 12 of them for the exact sponsors, products, courses, communities and services.
6. Rank the opportunities by evidence and fit, with the cheapest to try first on ties.
7. List the RPM levers and the brands you saw.

## Output Format

```markdown
# Monetization Research: {channel or niche}

Audience: {estimate} · Sample: {n} channels · Confidence: {level, why}

## Today
- ...

## How the Niche Makes Money
| Method | Channels using it | Revenue band (estimate) | Example |
|---|---:|---|---|

## What This Audience Pays For Elsewhere
| Channel (handle) | Niche | Audience | Methods seen |
|---|---|---|---|

## Opportunities
| Method | Evidence | Fit | Effort | First step |
|---|---|---|---|---|

## RPM Levers
- ...

## Sponsor Prospects
| Brand | Category | Seen on (handle · title · date) |
|---|---|---|

## Caveats
- ...
```

## Common Pitfalls

- Do not search without `publishedAtFrom`. Widen one step at a time and say so.
- Do not search without `classificationQuality` at `"neutral"` or above, or the results fill with slop.
- Do not quote revenue, RPM or audience as a single figure. Use bands labelled as estimates.
- Do not say a method is absent because the index has no detection. Read the descriptions first.
- Do not look for brand names in the detection fields. Brands appear only in descriptions and transcripts.
- Do not copy a method without the authority behind it. A 2K channel cannot run a 500K channel's course funnel.
- Do not promise RPM gains to a low-income audience. State the ceiling.
- Do not assume Pro fields on a Starter plan. Say what is missing.
- Do not run more than four searches or paginate a paid search.
- Do not invent a brand, a product or a price.
