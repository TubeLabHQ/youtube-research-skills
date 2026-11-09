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

1. Clarify scope only if needed. With only a niche, show the 5 best examples as images and what they share.
2. View the channel's recent thumbnails; decide what to keep.
3. View up to 8 examples: the same idea in the niche, and other niches' compositions with the same kind of reveal.
4. Build each concept from one viewed example. Generate images if you can, else write prompts.

## Output Format

```markdown
# Thumbnail Concepts: "{title}"

- **Lead with:** {concept 1, why}
- **Keep:** {style, colours, face or not}
- **Current:** ![]({current, if published})

### 1. {Name}
- ![]({example})
- **Based on:** [{channel}]({url}) · [{title}]({url}) · {views, ratio}
- **Image:** {what is in frame, eye path}
- **Text:** {3 words at most, or none}
- **Prompt:** {ready to paste}
- ![]({generated, if made})
```

About 400 words: three concepts. One fact per bullet, under 25 words except quotes and prompts; no extra sections or bullets. Show every thumbnail cited as an image, cutting text first. Link everything you cite (videos, channels, moments, brands, offers), built from IDs, handles and links in the data, never guessed.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"positive"`. Viral thumbnails on low-effort channels teach the wrong lesson. Widen the dates, never the floor.
- Do not describe a thumbnail you have not viewed.
- Do not let thumbnail text repeat the title.
- Do not keep the face by default. If faceless wins in this niche, say so.
- Do not generate a real person's face. Leave a slot in the prompt for a real photo of them.
