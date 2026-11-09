---
name: title-formulas
description: Use when the user wants YouTube title ideas, title templates, trending title formats, or to rewrite a title with a proven formula. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Title Formulas

## Overview

Give the user title formulas that are working now, filled for their topic. Not for what to make (`video-ideation`).

## Workflow

1. Clarify scope only if needed. Ask once what authority the channel can claim.
2. Pull the formulas relevant to the topic.
3. Keep the 5 whose examples fit the topic.
4. Check the best one against live outliers, and each against the channel's own titles.
5. Fill each formula two ways for the topic.

## Output Format

```markdown
# Title Formulas: {topic}

Authority: {what the channel can claim}

## Formulas
| Formula | Videos | Avg ratio | Example title | Verdict |
|---|---:|---:|---|---|

## Filled Titles
### {Formula}
1. {Title}

## Caveats
- ...
```

Keep it under 250 words, with at most 5 rows per table and 3 caveats.

## Common Pitfalls

- Do not validate without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above.
- Do not pass a language to the trending formats search. The server rejects it, and the index is English.
- Do not reword a formula's pattern when searching with it. The match breaks.
- Do not drop a formula with no hits in the niche. Call it untested.
- Do not write titles over 60 characters or above the channel's authority.
- Do not run more than four searches, or invent a formula, a count or an example.
