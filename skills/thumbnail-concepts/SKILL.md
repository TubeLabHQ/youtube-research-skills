---
name: thumbnail-concepts
description: Thumbnail concepts for one specific video, or a thumbnail study of a niche when no video exists yet, researched not guessed. Reads the channel's own thumbnails to decide what style to keep, splits the video's title or script into its bet (the new claim or mechanism) and its anchor (the familiar problem or desire), searches TubeLab for high-authenticity thumbnails that already use each, plus the direct competition on the same idea and compositions from other niches, annotates and saves the examples, then combines the learnings into five concepts and either generates the images, hands them to an image-generation tool the user has connected, or returns ready-to-paste image prompts. Use when asked for a thumbnail for this video, thumbnail concepts or ideas for a title, a thumbnail from a script, to generate thumbnails, what thumbnails work in a niche, thumbnails like this one, why this thumbnail works, or how my thumbnails compare. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "6-12 per run (3-6 searches at 2; channel and video reads free)"
  plan: starter
---

# Thumbnail concepts

A thumbnail is two things at once: the anchor the viewer already cares about and the bet that makes this video different. This skill researches each separately, looks at what the channel already looks like, and only then draws concepts. The output is a concept brief with five concepts, the annotated examples they borrow from, and the images or the prompts to make them.

**Hard rule:** every search here uses `classificationQuality: "positive"` (High Content Authenticity), never relaxed. Thin results widen recency (`trimester` → `semester` → `year` → `all`) or rephrase the query; they never touch the quality floor.

- Use for: "thumbnail for this video", "thumbnail concepts for this title", "I have the script, give me thumbnails", "generate 5 thumbnails for …", "what thumbnails work in X", "thumbnails like this one", "how do my thumbnails compare".
- Not for: titles (`title-formulas`), a channel diagnosis (`channel-teardown`), niche-level title and format patterns (`outlier-research`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Video title or idea | a script, transcript or outline is better when it exists. With only a niche, run niche mode: the niche is the anchor, there is no bet, and the concepts are for "your next video in this niche" |
| Reference video | optional: a video whose thumbnail the user wants more of; adds the twins comparison in step 6 |
| Creative details | optional: who it is for, the specific promise, what actually happens, unusual access or demonstrations, evidence, where it goes against the usual advice |
| Channel | the user's channel (ID, URL or `@handle`); without one, concepts are unstyled |
| Reference thumbnails | optional video IDs or URLs the user likes or dislikes |
| Image generation | decided in step 9 |

## Credit budget

Say before the first paid call: "About 6 to 12 credits: 3 to 6 searches at 2, channel and video reads are free."

## Workflow

1. **Style audit (free).** `get_channel_videos` on the channel: last 12 videos with `thumbnails.high.url` and `statistics.averageViewsRatio`, plus `medianViewsEstimate`. Download and view the 12 thumbnails (write the URLs to a file and run `scripts/thumb-board.sh urls.txt`, which downloads them and tiles a labelled contact sheet when ImageMagick is installed; otherwise open the downloaded files one by one). Decide what to keep: the person, when it is a personal brand and the face appears in the thumbnails that perform; any intentional, consistent design (fonts, colours, framing, layout) when it is recognisable across videos. If recent thumbnails underperform the median and the look is generic, keep nothing and say so. Write 3 lines: "keep", "drop", "why". Nothing here is good or bad, it is reference.
2. **Bet and anchor.** From the title, script and creative details define the **bet** (the new claim, mechanism or angle: "the 10 minutes after you eat") and the **anchor** (the familiar problem or desire the audience already cares about: "losing belly fat"). State both in one line each and continue; the user can correct them. Niche mode: anchor is the niche, skip step 4, and step 5 becomes the niche's top performers.
3. **Anchor examples.** `search_outliers` with `query: ["<anchor>"]`, `publishedAtFrom: "trimester"`, `sortBy: "averageViewsRatio"`, `classificationQuality: "positive"`, `type: "video"`, `size: 24`. Widen per the rule if under 8 hits. Keep the top 8 to 12 by ratio, max 2 per channel: these are "do this". For "avoid this", one more call with `averageViewsRatioTo: 0.8`, `sortBy: "averageViewsRatio"`, `sortOrder: "asc"`, same anchor and quality; if it returns nothing, say so and skip the negative set.
4. **Bet examples.** `search_outliers` with `query: ["<bet>", "<bet in the audience's words>"]`, same filters as step 3. The bet is often a mechanism that exists in other niches (timing windows, before and after, "N minutes", a number on a timer): that is wanted, the composition transfers.
5. **Competition.** `search_related_outliers` with `title: ["<the video title>"]`, `publishedAtFrom: "semester"`, `classificationQuality: "positive"`, `size: 20`: the videos with the same bet and anchor. Split by ratio into "do this" and "avoid this". If the hits come back off-topic (the live server has returned unrelated results for `title` anchors and ignored the date and quality filters), do not retry: build the competition set from the anchor and bet hits whose titles share the video's words, and say so. Write one line: how we stand out, what they all do that we avoid, what we do that they do not.
6. **Compositions from anywhere.** `search_related_outliers` with `thumbnailVideoId: "<id of the best anchor or bet example, or the user's reference video>"`, `publishedAtFrom: "year"`, `classificationQuality: "positive"`, `size: 16`: visual twins across niches. Run it on a second example if the first set is thin. Composition ideas may come from any niche; what matters is the layout, not the topic. With a reference video, also compare its visual twins' mean ratio with the mean ratio of the anchor set on the same topic: that says whether the look or the topic is carrying the views.
7. **Annotate and save.** View every kept thumbnail. Download them into `thumbnail-concepts/<video-slug>/{style,anchor,bet,competition,composition}/` numbered in table order (local working files for the user; other creators' thumbnails are not for republishing), and write `index.md` there with one row per image: file · title verbatim · channel (handle) · ratio · subscribers · tag (faces, eye contact, power phrase, timeline, comparison, transformation, before-after, group, arrow, number, authenticity, boring-but-works) · do / avoid · one line on why. Then write the two reflections the flow asks for: for the anchor, which symbols, objects and emotions the audience already connects with it; for the compositions, what is worth borrowing and what to stay away from.
8. **Five concepts.** Combine the learnings: each concept names its composition (borrowed from which saved example), the subject and expression, the object or device that shows the bet, the element that shows the anchor, the text (3 words or fewer, only if it adds what the title withholds), colours, and how it is restyled to the channel's kept elements. Star the strongest and say why. Give one alternative per concept (a different text, or no text). Rank by how many "do this" examples support the composition, then by distance from the competition set.
9. **Make the images.** If the client can generate images (the ChatGPT app, or a Claude client with an image tool), ask once: "Generate these 5 as 1280×720 images?" and generate the starred one first. Otherwise check the session's tools for any image-generation MCP and offer to use it. If none, end with one complete image prompt per concept: composition, subject, expression, framing, device, text and its placement, colours, style notes from step 1, 16:9, no extra text, no logos.

## Output

```markdown
# Thumbnail concepts: "<title verbatim>"
Run: <date> · Channel: @handle · Credits used · Windows used · Style kept: <person | design | nothing>

## 1. Style audit
Keep: … · Drop: … · Why: <ratios of recent thumbnails vs median>

## 2. Bet and anchor
Bet: <one line> · Anchor: <one line>

## 3. Examples (saved in thumbnail-concepts/<slug>/)
| Set | # | Title (verbatim) | Channel (handle) · subs | Ratio | Tag | Do / avoid | Why |
Anchor reflection: <symbols, objects, emotions the audience already connects with it>
Competition: <how we stand out>
Compositions: <worth borrowing / stay away from>

## 4. Concepts
### ★ 1. <name>
Composition (from <set #>) · Subject and expression · Bet shown by · Anchor shown by · Text · Colours · Restyled: <kept elements> · Alternative: …
### 2–5. …

## 5. Images
<generated images> | <tool used> | <one prompt per concept, ready to paste>
```

## Pitfalls

- Research first, draw second. A concept without a saved example behind its composition is a guess; label it so.
- Never relax `classificationQuality` below `positive`, even for an empty result. Widen time instead.
- Do not describe a thumbnail you did not view. Without vision, deliver the saved URLs and the annotation table for the user to fill, and build concepts from titles and ratios only, marked "unviewed".
- The bet must be visible, not just written. Text that repeats the title is an echo; the thumbnail's job is the half the title withholds.
- Keep the person only when the face performs. A personal brand whose faceless thumbnails outperform the face ones has a finding, not a rule.
- Ratios reflect title, thumbnail and topic together. Say "associated with", never "caused".
- Never invent a channel, a title or a ratio. If you did not fetch it, it is not evidence.

## Example prompts

- "What thumbnails work in home workouts right now? Give me concepts for my next one."
- "Find thumbnails that look like youtu.be/dQw4w9WgXcQ and tell me what the look has in common."
- "Thumbnail concepts for 'The 10 Minutes After You Eat Decide If That Meal Becomes Belly Fat' on @mychannel. Here is the script: …"
- "I'm making a video on why most people fail at cold outreach. Research thumbnails and generate 5 concepts."
- "Give me thumbnail ideas for this title, keep my channel's look, and return image prompts I can paste into Midjourney."
