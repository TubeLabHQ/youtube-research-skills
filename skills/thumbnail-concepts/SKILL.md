---
name: thumbnail-concepts
description: Use when the user wants thumbnail concepts or images for a YouTube video, or to see which thumbnails work in a niche. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Thumbnail Concepts

## Overview

Three thumbnail concepts for one video, each built from one that already works. A thumbnail shows what the title withholds: the thing the viewer already cares about, plus what is new in this video.

## Workflow

1. Clarify scope only if needed. With only a niche, report the 5 best examples and what they share.
2. View the channel's recent thumbnails and decide what to keep.
3. View up to 8 examples: the same idea in the niche, and compositions from other niches with the same kind of reveal.
4. Build each concept from one viewed example. Generate the images if you can, or write a prompt per concept.

## Output Format

```markdown
# Thumbnail Concepts: "{title}"

**Lead with: {concept 1}, because {why}.**
Keep from the channel: {style, colours, face or not}

### 1. {Name}
Based on: {channel (handle) · title verbatim · views · ratio}
Image: {what is in frame, where the eye goes}
Text: {3 words or fewer, or none}
Prompt: {ready to paste}
```

About 400 words: three concepts, strongest first, one line per field. Use only examples you viewed; add no sections.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"positive"`. Viral thumbnails on low-effort channels teach the wrong lesson. Widen the dates, never the floor.
- Do not describe a thumbnail you have not viewed.
- Do not let thumbnail text repeat the title.
- Do not keep the face by default. If faceless wins in this niche, say so.
- Do not generate a real person's face. Leave a slot in the prompt for a real photo of them.
