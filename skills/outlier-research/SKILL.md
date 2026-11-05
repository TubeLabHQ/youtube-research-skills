---
name: outlier-research
description: Find YouTube videos that massively outperformed their own channel's average in a niche and explain the repeatable patterns behind them, with proof. Searches TubeLab outliers by ratio, dedupes by channel, reads the winners, and extracts formats, title mechanics and hooks to reuse. Use when asked what is working in a niche, why a video went viral or blew up, what is trending on YouTube in a topic, or for hooks, formats and titles to steal. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.1"
  requires: tubelab-mcp
  credits: "4-6 per run (2-3 search_outliers at 2, free reads)"
  plan: starter
---

# Outlier research

The "why did this work" skill. An outlier is a video that outperformed its own channel's average. A 50K video on a 5K-average channel says more about a format than 2M views on a giant channel, so everything here ranks by ratio, not raw views. The output is an outlier report: the winners with proof, the patterns they share, the hooks worth stealing, and five ideas grounded in them.

- Use for: "what's working in X", "why did this blow up", "what's trending in my niche", "hooks and formats to steal", "show me breakout videos in X".
- Not for: finding a niche to start (`niche-finder`), ideas for one existing channel (`video-ideation`), a dated digest with verbatim hooks (`trend-report`), thumbnails (`thumbnail-concepts`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Niche or topic | required; 1 to 3 phrasings of the same topic |
| Language | `["en"]` |
| Long-form or Shorts | long-form; run a Shorts pass if the user makes Shorts |
| Minimum outlier strength | `averageViewsRatioFrom: 3` |
| Exclusions | the slop list from `tubelab-mcp` plus the user's own |

## Credit budget

Say before the first paid call: "About 4 to 6 credits: 2 to 3 outlier searches at 2, video reads are free." Two passes is the default, three the ceiling. Do not paginate.

## Workflow

1. **Main pass.** `search_outliers` with `query: ["<topic>"]`, `publishedAtFrom: "month"`, `sortBy: "averageViewsRatio"`, `averageViewsRatioFrom: 3`, `classificationQuality: "neutral"`, `language`, `excludeKeyword: [slop list]`, `size: 20`.
2. **Widen rule.** Under 8 usable hits: `month` → `trimester` → `semester`, one step at a time, with one sentence in the output saying which window was used and why. Never drop `classificationQuality`.
3. **Second pass.** A different angle on the same topic (a sub-topic, a synonym, the audience's own words) or `type: "short"` when the user makes Shorts. Only run a third pass if both passes together give under 10 usable hits.
4. **Dedupe by channel.** At most 2 videos per `snippet.channelId`, keeping the higher ratios, so one channel does not become "the pattern".
5. **Rank** by `statistics.averageViewsRatio`, tie-break on `zScore`. Keep `snippet.channelSubscribers` next to every ratio: a 5x on 20 subscribers and a 5x on 2M subscribers mean different things.
6. **Read the top 5** with `get_video` (free): exact `publishedAt`, `tags`, `description`, `duration`, to confirm topic and promise.
7. **Explain each winner** in one line: topic, promise (what the viewer gets), format (the repeatable packaging), title mechanic (number, contrast, named mechanism, open loop, authority claim), thumbnail only if you viewed `snippet.thumbnails.high.url` (else "not reviewed"), channel size context.
8. **Extract patterns.** Group winners by format and title mechanic. A pattern needs 3 or more outliers from different channels; anything with fewer is a "single observation". Rank patterns by count times median ratio.
9. **Hooks to steal.** The titles verbatim that carry the strongest mechanics. Never paraphrase a title in this list.
10. **Five ideas.** Each is a pattern applied to the user's topic, with a draft title under 60 characters and the source outlier it comes from. Rank by the source pattern's strength, then by how recent its newest example is.

## Output

```markdown
# Outlier report: <topic>
Run: <date> · Language · Type · Credits used · Window: <month | trimester | semester> · Widened: <none | from, to, why>

## 1. Outliers (ranked by ratio, max 2 per channel, tiny channels under 100 subs marked *)
| # | Title (verbatim) | Channel (handle) | Subs | Views | Ratio | z-score | Published | Link |

## 2. Repeatable patterns (3+ outliers from different channels)
| Pattern | Format | Title mechanic | Examples (n) | Median ratio |
Single observations: <list, not ranked>

## 3. Hooks to steal (verbatim titles)
- "<title>" · channel (handle) · views · ratio · date

## 4. Five ideas
| # | Idea | Draft title (<60 chars) | Pattern | Source outlier (channel · views · ratio) |

## 5. Caveats
Sample size after dedupe · thumbnails reviewed or not · patterns are associated with the lift, not proven causes · not checked
```

## Pitfalls

- Raw views are not the signal. A video with 3M views and ratio 1.1 is the channel's normal, not an outlier.
- One channel with five hits is a channel, not a pattern. Dedupe before reading.
- Huge views with almost no likes or comments (`get_video` shows it) is a paid placement, not an outlier. Drop it and say so.
- Ratio reflects title, thumbnail and topic together. Say "associated with", not "caused by".
- Under 8 hits is a thin signal. Widen once, say so, and if still thin report "no clear pattern" instead of inventing one.
- Thumbnails you did not view are "not reviewed". Never describe an image you have not seen.
- Never invent a channel or a title. If you did not fetch it, it is not evidence.

## Example prompts

- "What's working in home security right now? Show me the breakout videos and the patterns."
- "Why are 'what N burglars told me' videos blowing up? Find the outliers and tell me the mechanic."
- "Give me 5 hooks to steal for a woodworking channel, with proof."
