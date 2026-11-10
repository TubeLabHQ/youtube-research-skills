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

Three thumbnail concepts for one video. A strong thumbnail joins what the viewer already cares about with what is new in this video. So study thumbnails for both, write down exactly what works in them, and combine one of each into every concept.

## Workflow

1. Clarify scope only if needed. Split the video into two plain lines: its unique angle (what is new or different about it) and the familiar problem (what this audience already cares about). With only a niche and no video, study the familiar problem alone. If the user wants a title too, follow `title-formulas` first and design for the chosen title, so the thumbnail shows what the title leaves out.
2. Run two outlier searches: one for videos with the unique angle, wherever they are, and one for videos on the familiar problem. Two searches are the norm. Reuse outliers already found in this conversation first, if they meet the quality floor in Common Pitfalls.
3. View the thumbnails of the outliers worth studying in each set, up to 8 in all. Before designing anything, write down what works in each set. Note compositions (how the frame is arranged, the shot, where people and objects sit) and details that pull the eye (a prop, a gesture, a word, a visual trick).
4. Look at the channel's recent thumbnails and note what to keep.
5. Build each concept from one unique-angle pattern and one familiar-problem pattern. Generate the images if you can, or else write one prompt per concept.

## Output Format

```markdown
# 🖼️ Thumbnail Concepts: "{title}"

- **Lead with:** {concept 1, and why in one sentence}
- **Keep from the channel:** {style, colours, face or no face}

[![]({current thumbnail, if published})]({video url})

- **Unique angle:** {what is new in this video}
- **Familiar problem:** {what the audience already cares about}

## 🔍 Patterns That Work

**In unique-angle thumbnails**

[![]({thumbnail})]({video url}) [![]({thumbnail})]({video url}) [![]({thumbnail})]({video url})

- **{Composition or detail}:** {what you saw, in one sentence} · [{title}]({video url})

**In familiar-problem thumbnails**

[![]({thumbnail})]({video url}) [![]({thumbnail})]({video url}) [![]({thumbnail})]({video url})

- **{Composition or detail}:** {what you saw, in one sentence} · [{title}]({video url})

### 1. {Name}

[![]({example thumbnail})]({video url})

- **Combines:** {unique-angle pattern} + {familiar-problem pattern}
- **Based on:** [{channel}]({url}) · [{title}]({video url}) · {views, ratio}
- **Image:** {what is in the frame and where the eye goes}
- **Text:** {3 words at most, or none}
- **Prompt:** {ready to paste}

![]({generated image, if made})
```

- Length: about 750 words. About eight pattern notes across the two groups, then three concepts.
- Language: plain words and short, complete sentences. Nothing compressed.
- Bullets: one fact each, under 25 words, except quotes, verbatim titles and prompts. No extra sections or bullets.
- If it runs long, cut text. Never cut an image, and never squeeze sentences.
- Links: link every video, channel, moment, brand and offer you cite, built from IDs, handles and links in the data. Never guess one.
- Thumbnails: use the 320px `mqdefault.jpg` image, on its own line under the heading, linked to the video.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"positive"`. Viral thumbnails on low-effort channels teach the wrong lesson. Widen the dates, never the floor.
- Do not write generic pattern notes such as "high contrast" or "show emotion". Name the exact prop, gesture, word or framing you saw, and where.
- Do not describe a thumbnail you have not viewed, or cite one without showing it.
- Do not let the thumbnail text repeat the title.
- Do not keep the face by default. If faceless thumbnails win in this niche, say so.
- Do not generate a real person's face. Leave a place in the prompt for a real photo of them.
