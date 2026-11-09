---
name: title-formulas
description: Use when the user wants titles or title formulas for a YouTube video or topic, or a title rewrite. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Title Formulas

## Overview

Titles the user can publish, each on a proven formula, then the formulas used. A formula is proven when current niche outliers or the channel's own wins use it. One with no niche hits is untested. With no video in mind, lead with the formulas; titles become example fills.

## Workflow

1. Clarify scope only if needed: the topic or draft title, and what the channel can truthfully claim.
2. Pull the trending formulas that fit.
3. Check formulas the channel has not won with against niche outliers. Three searches in total, pulls included.
4. Write each title in the channel's voice.

## Output Format

```markdown
# Titles: {topic or draft}

- **Use:** "{best title}" · {why, in numbers}
- **Can claim:** {a few words}
- **Confidence:** {level, brief why}

1. **{Title}**
   - Formula: {formula}
   - Proof: [{channel}]({url}) · [{title}]({url}) · {views, ratio, date}, or "untested here"

| Formula | Videos | Avg ratio | Example (link) | Proven or untested here |
|---|---:|---:|---|---|
```

About 500 words: eight titles, at most three untested, then five or six formulas. One fact per bullet, under 25 words except quotes; no extra sections or bullets; drop the channel on its own videos. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or results fill with slop.
- Do not exceed 60 characters or claim what the channel cannot back up.
- Do not fill a slot with what the creator is proud of, only what the viewer wants.
- Do not pass a language to the trending formats search (English only) or reword a formula's pattern (the match breaks).
- Do not call a formula rising; momentum is not returned.
