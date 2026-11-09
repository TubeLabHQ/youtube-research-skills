---
name: thumbnail-concepts
description: Use when the user wants thumbnail concepts or images for a YouTube video, to see what thumbnails work in a niche, or to compare their thumbnails. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "4.0"
  requires: tubelab-mcp
---

# Thumbnail Concepts

## Overview

Research what already works, then produce three thumbnail concepts for a video. Each shows the problem the viewer already cares about and what makes this video different. Not for titles (`title-formulas`).

## Workflow

1. Clarify scope only if needed. With only a niche, study what works there.
2. View the channel's recent thumbnails and decide what to keep.
3. Find and view up to 8 strong examples for the topic and the video's angle.
4. Write three concepts, each built from an example, and star the strongest.
5. Generate the images if you can, or write one ready-to-paste prompt per concept.

## Output Format

```markdown
# Thumbnail Concepts: "{title}"

Keep from the channel: ...

## Examples
| Title (verbatim) | Channel (handle) | Ratio | Why it works |
|---|---|---:|---|

## Concepts
### ★ 1. {Name}
Based on: ... · Image: ... · Text: ...

## Prompts
- ...
```

Keep it under 300 words, with at most 5 rows per table.

## Common Pitfalls

- Do not search without `classificationQuality` at `"positive"`. Viral thumbnails on low-effort channels teach the wrong lesson.
- Do not search without `publishedAtFrom`. Widen dates or rephrase, never lower the quality floor.
- Do not rank by raw views, or describe a thumbnail you did not view.
- Do not let thumbnail text repeat the title. Use 3 words or fewer.
- Do not keep the person by default. Faceless beating the face is a finding.
- Do not generate a real person's face unless it is the user's own channel.
- Do not run more than six searches, or invent a channel, a title or a ratio.
