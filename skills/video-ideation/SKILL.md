---
name: video-ideation
description: Generate ranked video ideas for a specific YouTube channel, grounded in what that channel already does well and in current outlier videos from TubeLab. Reads the channel's videos, searches outliers in its niche (and an adjacent niche if given), applies SCAMPER to each winner relative to the channel, and ranks ideas by demand and fit. Use when asked for video ideas, what to make next, content ideas for my channel, topics for the next month, or titles for a channel. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.1"
  requires: tubelab-mcp
  credits: "4-8 per run (2-3 search_outliers at 2, optional search_related_outliers at 2, free reads)"
  plan: starter
---

# Video ideation

Ideas for one channel, not for YouTube in general. Every idea traces back to an outlier that proved the demand and to a video on the user's own channel that proved the fit. The output is an idea bank: 15 to 20 ranked rows, the top 5 expanded with a thumbnail concept and an opening line.

- Use for: "video ideas for @channel", "what should I make next", "20 ideas for the next month", "titles for my channel".
- Not for: finding a niche (`niche-finder`), patterns across a niche with no channel in mind (`outlier-research`), diagnosing a decline (`channel-teardown`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Channel | required: ID, URL or `@handle` |
| Goal | reach (views) or conversion (views from buyers); unknown: reach unless the description sells something, and say which you assumed |
| Adjacent niche keyword | none; adds one extra outlier pass when given |
| How many ideas | 15 to 20 |
| Long-form or Shorts | the channel's main format |
| Language | the channel's language |

## Credit budget

Say before the first paid call: "About 4 to 8 credits: 2 to 3 outlier searches at 2, an optional related-outliers search at 2, channel and video reads are free." Do not paginate.

## Workflow

1. **Learn the channel (free).** `get_channel_videos` (fallback `get_channel_shorts` if `videos[]` is empty). From `item.statistics` take subscribers, `medianViewsEstimate`, `viewVariationCoefficient`. From `item.videos[]` list the top 5 and bottom 5 by `statistics.averageViewsRatio`. Write down what the channel is about, its format mix, its promise style, which topics performed and which flopped. Do not paste the payload.
2. **Quality floor.** `classificationQuality: "neutral"` by default; `"positive"` when the channel itself is high-production so the ideas match its level.
3. **Niche pass.** `search_outliers` with `query: ["<niche in 1-3 phrasings>"]`, `publishedAtFrom: "month"`, `sortBy: "averageViewsRatio"`, `averageViewsRatioFrom: 3`, `classificationQuality` as set, `language`, `type` matching the channel, `size: 20`.
4. **Widen rule.** Under 8 usable hits: `month` → `trimester` → `semester` → `year`, one step at a time, with one sentence in the output saying which window was used and why. Never drop `classificationQuality`.
5. **Adjacent pass** (only if a keyword was given). Same filters, `query: ["<adjacent keyword>"]`. Ideas from it are "adapt" moves by definition.
6. **Competitor pass** (optional, 2 credits). `search_related_outliers` with `relatedChannelId: ["<channel id>"]`, `publishedAtFrom: "trimester"`, `classificationQuality` as set, `size: 20`: outliers from channels like this one, the closest proof of fit.
7. **Dedupe** to at most 2 outliers per `snippet.channelId`, rank by `averageViewsRatio` then `zScore`, keep `snippet.channelSubscribers` next to every ratio.
8. **SCAMPER each of the top 10 to 12 outliers relative to this channel.** Substitute (swap topic, format or angle for this channel's), combine (merge two proven concepts), adapt (borrow from the adjacent niche), modify (amplify or twist the promise), put to other use (repurpose for this channel's segment), eliminate (strip to the core claim), reverse (flip the perspective). One to two ideas per outlier; note the title formula behind each outlier as you go.
9. **Write titles** under 60 characters at promise rung 3 or above (rung 1 bare promise, 2 promise plus constraint, 3 named mechanism, 4 implicit promise where the mechanism carries everything). Pass the authority test: no claim this channel cannot back.
10. **Rank** by demand (source ratio and recency) times fit (does the channel have a close topic in its top half, is the source channel within 10x of this one's size). Under a conversion goal, fit also asks whether the idea reaches the buyer: an idea aimed at the segment the channel sells to outranks a broader idea with a higher ratio, and the table says so. An idea with no fit is "new ground": report it unranked, do not bury it, do not rank it first. Tie-break towards the channel's own best format. Expand the top 5 with a thumbnail concept (what the image shows, text of max 3 words) and an opening line.

## Output

```markdown
# Idea bank: <channel title> (@handle)
Run: <date> · Format · Credits used · Window · Widened: <none | from, to, why>
Channel baseline: <subs> · median <n> views · ratio to subscribers <n> · best format · quality floor used

## 1. Idea bank (ranked)
| # | Idea | Title (<60 chars) | SCAMPER move | Source outlier (channel (handle) · title verbatim · views · ratio · date) | Demand | Fit |
New ground (high demand, no fit): <list, unranked>

## 2. Top 5 expanded
### 1. <title>
- Why it should work here: <the channel's own video that proves fit, with views and ratio>
- Source: channel (handle) · title verbatim · views · ratio · date
- Promise rung · authority check
- Thumbnail concept: <image; text "<max 3 words>">
- Opening line: "<first sentence>"

## 3. Caveats
Sample after dedupe · competitor pass run or skipped · source thumbnails reviewed or not
```

## Pitfalls

- One outlier is one data point. Prefer moves on outliers whose pattern appears more than once in the set.
- Copying a title verbatim is not an idea. Every title is rewritten for this channel's audience and authority.
- Shorts outliers rarely transfer to long-form and vice versa. Match `type` to the channel.
- Tiny source channels (under 100 subscribers) give inflated ratios. Keep them, mark them.
- Thumbnail concepts are proposals, not findings. Do not describe thumbnails you did not view.
- Never invent a channel or a video. If you did not fetch it, it is not evidence.

## Example prompts

- "20 video ideas for @mychannel, ranked."
- "Ideas for @mychannel that borrow from the personal finance niche."
- "What should I make next? Here's my channel: youtube.com/@handle. Keep it to titles I can actually back up."
