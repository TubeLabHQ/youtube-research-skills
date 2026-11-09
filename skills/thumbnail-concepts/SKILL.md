---
name: thumbnail-concepts
description: Use when the user wants thumbnail concepts or images for a YouTube video, to see what thumbnails work in a niche, or to compare their thumbnails. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Thumbnail Concepts

## Overview

Research what already works, then produce five thumbnail concepts for a video. A thumbnail shows the anchor the viewer already cares about and the bet that makes this video different.

## When to Use

Use this skill when the user asks to:

- get thumbnail concepts or images for a video, title or script
- learn what thumbnails work in a niche
- compare thumbnails or explain why one works

Do not use this for titles (`title-formulas`), a channel analysis (`channel-analysis`), or title and format patterns (`outlier-research`).

## Workflow

1. Clarify scope only if needed. With only a niche, study the niche and skip the bet.
2. View the channel's last 12 thumbnails and decide what to keep. `scripts/thumb-board.sh` can make a contact sheet.
3. Name the bet (the new claim) and the anchor (the familiar problem or desire) in one line each.
4. Find strong and weak examples for the anchor, the bet and the direct competition, plus compositions from other niches.
5. View each example, save it under `thumbnail-concepts/<video-slug>/`, and note why it works in an `index.md`.
6. Write five concepts, each built from a saved example, and star the strongest.
7. Generate the images if you can. Otherwise write one ready-to-paste prompt per concept.

## Output Format

```markdown
# Thumbnail Concepts: "{title}"

Channel: @handle · Style kept: {person | design | nothing} · Confidence: {level, why}

## Style Audit
Keep: ... · Drop: ... · Why: ...

## Bet and Anchor
- Bet:
- Anchor:

## Examples
| Set | Title (verbatim) | Channel · subs | Ratio | Do or avoid | Why |
|---|---|---|---:|---|---|

## Concepts
### ★ 1. {Name}
Composition (from example) · Subject · Bet shown by · Anchor shown by · Text · Colours

## Images or Prompts
- ...
```

## Common Pitfalls

- Do not search without `classificationQuality` at `"positive"`. Viral thumbnails on low-effort channels teach the wrong lesson.
- Do not search without `publishedAtFrom`. Widen recency or rephrase, never lower the quality floor.
- Do not rank by raw views. Rank by `averageViewsRatio`, with at most 2 per channel.
- Do not describe a thumbnail you did not view.
- Do not let thumbnail text repeat the title. Use 3 words or fewer.
- Do not keep the person by default. Faceless beating the face is a finding.
- Do not trust related searches anchored on a title without checking the hits are on topic.
- Do not pass off a concept with no example behind it. Label it a guess.
- Do not say "caused by", or run more than six searches.
- Do not invent a channel, a title or a ratio.
