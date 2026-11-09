---
name: title-formulas
description: Use when the user wants titles for a YouTube video or topic, proven title templates, or a title rewrite. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Title Formulas

## Overview

About eight titles the user can publish, each built on a formula with proof. A formula is proven when live outliers in the niche, or the channel's own wins, use it. One with no hits in the niche is untested.

## Workflow

1. Clarify scope only if needed: the topic or draft title, and what the channel can truthfully claim.
2. Pull the trending formulas that fit. One the channel already won with is proven.
3. Check the rest against live outliers in the niche. Three searches in total, pulls included.
4. Fill the proven formulas in the channel's voice.

## Output Format

```markdown
# Titles: {topic or draft}

**Use: "{best title}"** · {why, in numbers}
Can claim: {a few words} · Confidence: {level, short reason}

1. **{Title}** · {formula} · {proof}
2. **{Title}** · {formula} · untested here
```

About 400 words: eight titles, strongest first, at most three untested, one proof each: channel (handle) · title verbatim · views · ratio · date, without the channel on its own videos. Add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not go over 60 characters, or claim what the channel cannot back up.
- Do not fill a slot with what the creator is proud of. Fill it with what the viewer wants.
- Do not pass a language to the trending formats search. It rejects one; the index is English.
- Do not reword a formula's pattern when you search with it. The match breaks.
- Do not call a formula rising. Momentum numbers are not returned.
