---
name: thumbnail-concepts
description: Use when the user asks for a thumbnail for this video, thumbnail concepts for a title or script, to generate thumbnails, what thumbnails work in a niche, thumbnails like this one, or how their thumbnails compare. Researches high-authenticity thumbnails with the TubeLab MCP, splits the video into bet and anchor, and delivers five concepts with images or prompts.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Thumbnail Concepts

## Overview

A thumbnail is two things at once: the anchor the viewer already cares about and the bet that makes this video different. Research each on the TubeLab MCP, audit the channel's own look, then draw five concepts and the images or prompts to make them.

## When to Use

Use this skill when the user asks to:

- get a thumbnail, five concepts or generated images for a specific video, title or script
- learn what thumbnails work in a niche (niche mode)
- find thumbnails like a reference video, explain why one works, or compare their own

Do not use this for titles (`title-formulas`), a channel diagnosis (`channel-teardown`), or title and format patterns (`outlier-research`).

## Data Sources

| Tool | Use it for |
|---|---|
| `get_channel_videos` | The channel's last 12 thumbnails with ratios |
| `search_outliers` | Thumbnails that already use the anchor and the bet |
| `search_related_outliers` | Competition on the title; visual twins across niches |

Filters, the slop list and response fields are in `tubelab-mcp`.

## Workflow

1. **Clarify scope only if needed**
   - Title or idea, better a script. Niche only: the niche is the anchor, no bet, skip step 5. Channel (else unstyled). Optional reference video.

2. **Style audit**
   - `get_channel_videos`: last 12 `thumbnails.high.url` with `statistics.averageViewsRatio` and `medianViewsEstimate`. View all 12 (`scripts/thumb-board.sh urls.txt` makes a contact sheet).
   - Keep the person if the face appears in the thumbnails that perform; keep any consistent design; if recent thumbnails underperform the median, keep nothing.

3. **Bet and anchor**
   - Bet: the new claim, mechanism or angle ("if I had to start over"). Anchor: the familiar problem or desire ("building a service business"). One line each.

4. **Anchor examples**
   - `search_outliers` with `query: ["<anchor>"]`, `publishedAtFrom: "trimester"`, `sortBy: "averageViewsRatio"`, `classificationQuality: "positive"`, `type: "video"`, `size: 24`. Under 8 hits: widen `trimester` to `semester` to `year` to `all`, or rephrase; never touch the quality floor.
   - Keep the top 8 to 12 by ratio, max 2 per channel: "do this". "Avoid this": one call with `averageViewsRatioTo: 0.8`, `sortOrder: "asc"`; if empty, skip.

5. **Bet examples**
   - `search_outliers` with `query: ["<bet>", "<bet in the audience's words>"]`, same filters. The bet is often a mechanism from another niche.

6. **Competition**
   - `search_related_outliers` with `title: ["<the video title>"]`, `publishedAtFrom: "semester"`, `classificationQuality: "positive"`, `size: 20`; split by ratio into do and avoid.
   - Off-topic hits (the live server has ignored date and quality on `title` anchors): do not retry; build the set from anchor and bet hits sharing the title's words.

7. **Compositions from anywhere**
   - `search_related_outliers` with `thumbnailVideoId: "<best example or the reference video>"`, `publishedAtFrom: "year"`, `classificationQuality: "positive"`, `size: 16`. Layout matters, not topic. A reference video's twins' mean ratio vs the anchor set's says whether look or topic carries the views.

8. **Annotate and save**
   - View every kept thumbnail. Save into `thumbnail-concepts/<video-slug>/{style,anchor,bet,competition,composition}/`, numbered in table order (working files, not for republishing).
   - `index.md` there, one row per image: file · title verbatim · handle · ratio · subs · tag (faces, eye contact, power phrase, timeline, comparison, transformation, before-after, group, arrow, number, authenticity, boring-but-works) · do / avoid · why. Then two reflections: what the audience connects with the anchor; compositions to borrow and avoid.

9. **Five concepts**
   - Each: composition (from which saved example), subject and expression, the device showing the bet, the element showing the anchor, text (3 words or fewer, what the title withholds), colours, one alternative.
   - Rank by how many "do this" examples support the composition, then distance from the competition; star the strongest.

10. **Make the images**
    - Client can generate images (ChatGPT app, Claude with an image tool): ask once "Generate these 5 as 1280×720?", starred first. Else an image MCP in the session. Else one complete prompt per concept: composition, subject, device, text, colours, style notes, 16:9, no logos.

## Output Format

```markdown
# Thumbnail Concepts: "{title verbatim}"

## Summary
- Channel: @handle · Style kept: {person | design | nothing} · Windows: {per set} · Examples viewed: {n}
- Confidence: High/Medium/Low

## 1. Style audit
Keep: … · Drop: … · Why: {ratios of recent thumbnails vs median}

## 2. Bet and anchor
Bet: {one line} · Anchor: {one line}

## 3. Examples (saved in thumbnail-concepts/{slug}/)
| Set | # | Title (verbatim) | Channel (handle) · subs | Ratio | Tag | Do / avoid | Why |
Anchor reflection: … · Competition: {how we stand out} · Compositions: {borrow / avoid}

## 4. Concepts
### ★ 1. {name}
Composition (from {set #}) · Subject · Bet shown by · Anchor shown by · Text · Colours · Restyled · Alternative
### 2–5. …

## 5. Images
{generated images} | {tool used} | {one prompt per concept, ready to paste}
```

## Quality Guardrails

- Every search uses `publishedAtFrom` and `classificationQuality: "positive"`; widen recency or rephrase, never relax the floor.
- Rank by ratio, max 2 per channel, subscribers and title verbatim on every example.
- Three to six searches. Never paginate a paid search; reads are free.
- A concept without a saved example behind it is a guess; label it.

## Common Pitfalls

- Do not describe a thumbnail you did not view; without vision, deliver the URLs and mark concepts "unviewed".
- Do not let text repeat the title.
- Do not keep the person by default; faceless beating the face is a finding.
- Do not say "caused by"; ratios reflect title, thumbnail and topic together.
- Do not invent a channel, a title or a ratio.
