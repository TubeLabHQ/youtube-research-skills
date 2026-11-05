---
name: trend-report
description: Dated trend report for a YouTube niche or for a specific channel's niche, in TubeLab's Trend Report format. Finds the current outliers with TubeLab, pulls each winner's opening hook from its transcript, explains why it worked, names its trending title format, thumbnail formula and hook formula, then distils winning patterns (topics, formats, triggers, power words), writes channel-specific video ideas with a reason each, and closes with learnings. Use when asked for a trend report, what is trending in a niche this week or month, a weekly or monthly research digest, trends for my channel, or what hooks are working right now. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.1"
  requires: tubelab-mcp
  credits: "7-9 per run (2-3 search_outliers at 2, 1 search_related_outliers at 2, 1 search_trending_formats at 1; reads free)"
  plan: starter
---

# Trend report

A dated digest a creator can read in five minutes and act on today, in the same shape as the Trend Report TubeLab emails from the app, so reports can be compared month to month. Every winner carries its real hook (the first words spoken), its outlier score and its views; every idea says why it should work for this channel.

- Use for: "trend report for X", "what's trending in my niche this month", "weekly digest", "what hooks are working right now", "trends for @channel".
- Not for: ranked ideas without the trend context (`video-ideation`), one format in depth (`outlier-research`), a channel diagnosis (`channel-teardown`), niche discovery (`niche-finder`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Niche keyword and/or channel | at least one. With a channel only, derive the niche from its titles |
| Window | `month`; widen per the rule |
| Language | the channel's language, else `["en"]` |
| Long-form or Shorts | long-form unless the channel is Shorts-first |
| Trending videos / ideas | 6 (5 to 8) / 10 |

## Credit budget

Say before the first paid call: "About 7 to 9 credits: 2 to 3 outlier searches at 2, one related-outliers search at 2, one trending-formats search at 1; channel, video and transcript reads are free." Do not paginate.

## Workflow

1. **Channel context (free, when a channel is given).** `get_channel_videos` (fallback `get_channel_shorts`): niche from the titles, median views, the channel's own best formats, its voice (benefit-first, first-person discovery, lists, alarm). Two lines; do not echo the payload.
2. **Niche pass.** `search_outliers` with `query: ["<niche>", "<second phrasing>"]`, `publishedAtFrom: "month"`, `sortBy: "averageViewsRatio"`, `averageViewsRatioFrom: 1.5`, `classificationQuality: "neutral"`, `language`, `type` matching the channel, `excludeKeyword: [slop list from tubelab-mcp]`, `size: 20`.
3. **Widen rule.** Under 8 usable hits: `month` → `trimester` → `semester` → `year`, one step at a time; state the window in the report header. Never drop `classificationQuality`.
4. **Related pass (when a channel is given).** `search_related_outliers` with `relatedChannelId: ["<channel id>"]`, same window and quality, `size: 20`: outliers from channels like this one, which is what "trending for you" means.
5. **Second angle (optional).** A third `search_outliers` on a sub-topic or adjacent niche if the passes so far give under 10 usable hits or the user asked for breadth.
6. **Formats with momentum.** `search_trending_formats` with `query: ["<niche>"]`, `size: 12`, no `language` (the live server rejects it on this tool; default is English). Keep `framework`, `clickTrigger[]`, `overall_stats.doc_count`, `overall_avg_views_ratio`. Match each winner's title to the closest framework; when none fits, write the format as a template with `[bracketed]` slots.
7. **Select the winners.** Merge, dedupe to max 2 per `snippet.channelId`, rank by `averageViewsRatio` with `channelSubscribers` next to each. Take 5 to 8 that are recent, on-niche and varied in format; prefer ratios above 3.
8. **Hooks (free).** `get_video_transcript` per winner. The Hook is the opening verbatim: `events[].text` joined from the start until `startMs` passes 45000 or about 80 words, whichever comes first, in the video's language. No transcript: write "no transcript available" and derive the hook formula from the title and description (`get_video`).
9. **Fields per winner.** Why It Worked (one sentence naming the lever: curiosity gap, urgency, loss aversion, relatability, authority, contrast, named figure, personal mystery) · Outlier Score (`averageViewsRatio`, one decimal; add "z 4.6" when `zScore` is above 3) · Views (with subscribers when it changes the reading) · Trending Format (template) · Thumbnail Formula (1 to 2 sentences only after viewing `snippet.thumbnails.high.url`, else "not reviewed") · Hook Formula (the structure of the opening and why it holds) · Topic (3 to 8 words).
10. **Winning patterns.** Topics (3 to 5) · Trending Formats (templates that recur or carry the top ratios) · Thumbnail Formulas (only from reviewed thumbnails; omit the line otherwise) · Hook Formulas (2 to 4, written as formulas) · Triggers (from `clickTrigger[]` plus your reading) · Power Words (charged or capitalised words verbatim from the winning titles). A pattern is something seen in 2 or more winners from different channels; one occurrence is a "single observation".
11. **Video ideas (10).** Each fuses one trending format or trigger with the channel's identity and voice from step 1: a title under 60 characters and a one-line Why naming the borrowed format or trigger and the fear or desire it serves. No two ideas on the same format. Without a channel, write them for a generic entrant and say so.
12. **Learnings (3).** Numbered bold lessons, each with the observed pattern and one concrete application for this channel including an example title.

## Output

```markdown
# TubeLab Trend Report for <@channel or niche> on <run date>
Window: <month | widened to …, because …> · Language · Credits used · Views and ratios from tool responses; hooks are verbatim transcript openings.

## Trending Videos
### [<Title verbatim>](https://www.youtube.com/watch?v=<id>)
- **Hook:** <first ~45 seconds verbatim, or "no transcript available">
- **Why It Worked:** <one sentence naming the lever>
- **Outlier Score:** <ratio, 1 decimal>
- **Views:** <viewCount> (<subscribers> subscribers)
- **Trending Format:** <[Bracketed] template>
- **Thumbnail Formula:** <what it shows and why, or "not reviewed">
- **Hook Formula:** <structure + why it holds>
- **Topic:** <3-8 words>
<repeat for 5 to 8 videos>

## Winning Patterns
- **Topics:** · **Trending Formats:** · **Thumbnail Formulas:** · **Hook Formulas:** · **Triggers:** · **Power Words:**

## Video Ideas based on Research for <@channel>
- **<Title under 60 chars>** - Why: <borrowed format or trigger + channel identity + the fear or desire served>  (10)

## Learnings
**1. <Lesson>:** <observed pattern>. <Application with an example title.>  (3)
```

## Pitfalls

- Hooks are quotes. Never paraphrase or clean up a hook beyond trimming; never write one for a video without a transcript.
- Thumbnail formulas describe images you looked at. Without vision, write "not reviewed".
- A ratio of 1.5 on a 2M-subscriber channel is a big number and a weak trend signal. Show subscribers next to the ratio.
- Six winners from one channel is a channel, not a trend. Dedupe.
- Ideas must not copy a winner's title. They borrow the format or trigger, then speak in this channel's voice.
- Date the report. A report older than a month is history.
- Never invent a channel, a video, a view count or a quote.

## Example prompts

- "Trend report for @TubeLabHQ this month."
- "What's trending in home security right now? Give me the hooks word for word and 10 ideas for a new faceless channel."
- "Weekly digest for the personal finance niche, long-form only, English."
