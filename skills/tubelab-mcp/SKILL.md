---
name: tubelab-mcp
description: Use when a TubeLab tool call fails or returns nothing, when unsure which search tool or filter to use, or when the user asks how the TubeLab MCP tools, credits or REST API work. The data layer every workflow skill assumes: tool map with costs, identifier rules, craft rules, signal fields, quirks and the REST fallback.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  kind: data-layer
---

# TubeLab MCP: the data layer

TubeLab is a read-only index of public YouTube data, enriched for research: a growing index of breakout channels and outlier videos refreshed daily, trending title formulas, plus live channel, video, transcript and comment reads. This skill is not a workflow. It teaches an agent to use the tools well so every workflow skill in this repo gets the same quality. Tool parameters are in the MCP schema already; this file covers what the schema does not say.

## Connect and check

- Endpoint: `https://public-api.tubelab.net/mcp` (Streamable HTTP, stateless). Claude.ai and Claude Desktop connect through the TubeLab connector (https://claude.ai/directory/tubelab); ChatGPT and Codex through the TubeLab app (https://chatgpt.com/plugins/plugin_asdk_app_6ab3980fb1488191a9b26b3f59efd90b); both OAuth. Claude Code: `claude mcp add --transport http tubelab https://public-api.tubelab.net/mcp`. Grok Bot: ask the Bot to add the MCP server at that URL; Grok Build: the `/mcps` modal. Cursor and other IDE agents send a TubeLab API key as `Authorization: Bearer <key>` (API keys need a Pro or Team plan). Setup per client: https://tubelab.net/docs/api/mcp-server
- When unsure, call `get_credits_balance` (free) first. If a search errors, check the balance before retrying.
- The MCP is included from the Starter plan. Monetization, revenue, RPM and audience fields can be empty on Starter accounts; skills that lean on them say so. Plans: https://tubelab.net/pricing

## Tool map

| Tool | Cost | Use it for |
|---|---|---|
| `search_channels` | 5 credits | Channels by topic with 40+ filters. The niche-finding tool. |
| `search_related_channels` | 5 credits | Channels similar to one or more channel IDs. Competitor sets. |
| `search_outliers` | 2 credits | Videos that outperformed their own channel. What is working now. |
| `search_related_outliers` | 2 credits | Outliers similar to a title, a video, a thumbnail (`thumbnailVideoId`, image similarity) or a channel's videos (`relatedChannelId`). |
| `search_trending_formats` | 1 credit | Title formulas with momentum stats and example videos. |
| `get_channel`, `get_channel_videos` | free | Same payload: channel stats plus up to 120 long-form videos with outlier flags. One call is enough. |
| `get_channel_shorts` | free | Shorts sample with outlier flags. |
| `get_video` | free | Title, description, tags, publish date, views, likes, comment count. |
| `get_video_transcript` | free | Transcript text plus timed `events[]`. |
| `get_video_comments` | free | Up to 100 top comments. |
| `get_credits_balance` | free | Remaining credits. |

Costs are per call, whatever the `size`. Identical requests repeated within a short window are not charged again; changing one filter is a new charge.

## Identifiers

- Channel tools accept a channel ID (`UC...`), a URL or a handle (`@name`). Prefer the ID when a search hit already gave it.
- Video tools need the bare 11-character video ID. Extract it from `watch?v=ID`, `youtu.be/ID`, `shorts/ID` or `embed/ID` and strip `&t=` and other params.
- Search hits carry `id` (video) and `snippet.channelId`. Use those; never guess an ID.

## Craft rules

1. **Broad then narrow.** One wide search, read the distribution, then add filters. Six filters on the first call often return nothing and cost the same.
2. **Recency first.** Always set `publishedAtFrom` with a token (`month`, `trimester`, `semester`, `year`), never a date. Widen one step at a time when thin, and say so in the output.
3. **Content Authenticity is never off.** `classificationQuality: "neutral"` means General and above (the server includes `positive`). Use `neutral` for niche, outlier, ideation and title work; `positive` (High) for anything thumbnail-related. Never drop it to widen a thin result; widen recency or remove another filter instead. `negative` is only for slop audits.
4. **Ratio over raw views.** `averageViewsRatio` (views over the channel's average) and `zScore` say whether a format worked; raw views say the channel is big. Rank by ratio, show both, and keep `channelSubscribers` next to every ratio.
5. **Semantic by default.** `by: "semantic"` understands topics; `by: "lexical"` for exact words. `query` is an array of 1 to 3 phrasings of one topic, not a list of topics.
6. **Stable paging.** Same `seed` on every page of one search. No `sortBy` gives seeded-random order, which is what the app shows on first load. Never paginate a paid search in a loop; two pages is the ceiling unless asked.
7. **Slop list.** Pair the quality floor with `excludeNiche` (channels) or `excludeKeyword` (outliers). Default list, trimmed to the niche and extended with the user's own: `music, song, lofi, movies, trailer, compilation, kids, nursery, news, politics, lingerie, haul, asmr, reaction, live stream`.
8. **Estimates are estimates.** Revenue, RPM and audience fields are model outputs. Order with them, present bands, never quote them as facts or filter on them unless asked.
9. **Thin signal.** Under 5 hits is not a trend. Say so, widen once, and if still thin report "no signal" instead of inventing one.
10. **Proof line.** Every claim about a channel or video carries: channel (handle) · video title verbatim · views · ratio · publish date. Label estimates. If you did not fetch it, you do not know it.

Recipes for the common intents (app default views, small channels punching up, new entrants, faceless, money, first-world audience, consistent performers, title formula in the wild, thumbnail twins, Shorts, other languages): [references/filters.md](references/filters.md).

## Reading results

Full field lists in [references/response-shapes.md](references/response-shapes.md). The short version:

- **Channel hit:** `semantic.niches[]` (cluster on this), `statistics.medianViewsEstimate` (demand; the average is inflated by outliers), `avgViewsToSubscribersRatio` (above 1 is healthy), `viewVariationCoefficient` (lower is steadier), `positiveOutliersCount`, `joinedDateEstimate` (age), `classification`, `monetization` bands, `detections.*.detected`, `audience.dominant`, and 4 sample `videos[]` with `isPositiveOutlier`.
- **Outlier hit:** `snippet.title` (quote verbatim), `statistics.averageViewsRatio`, `zScore`, `viewCount`, `snippet.channelSubscribers`, `publishedAt`, `thumbnails.high.url`, `classification`.
- **Trending format hit:** `framework` (template with `[X]` slots), `pattern` (feed it to `search_outliers.titlePattern`), `clickTrigger[]`, `overall_stats.doc_count`, `overall_avg_views_ratio`, `videos[]` examples. The momentum percentages are sort keys only; the hit does not carry them, so "rising" means "appears in the momentum-sorted list".
- **`get_channel`:** `item.statistics` (median, average, variation coefficient, outlier counts) and `item.videos[]` each with `averageViewsRatio`, `zScore`, `isPositiveOutlier`, `isNegativeOutlier`. Large payload: extract, never echo.
- **`get_video_transcript`:** `items[0].transcript` and `events[]` with `startMs` and `text`. A 30-minute video returns 100KB+; for a hook, read `events[]` until `startMs` passes 45000 and stop. Transcripts keep the spoken language.

## Quirks and errors

- `search_trending_formats` rejects `language` ("Expected string, received array") on the live server because the MCP schema publishes `language` as an array for every search tool while this backend wants a string. Omit it; the default is English.
- Defaults on `search_trending_formats` when omitted: English, `quality: "positive"`, `videosCountFrom: 18`, sorted by `lastVideosCountChangePercentage`, `size: 12`, formulas found in the last 4 months.
- The app's Niche Finder default view is `subscribersFrom: 1, medianViewsFrom: 1000, videosCountFrom: 2`, no sort. The Outliers Finder default view is `viewCountFrom: 5000, type: "video"`, no sort. Mirror them for the same unbiased sample the user sees in the app.
- `search_related_channels` ranks by similarity, not size: a large seed returns small lookalikes unless you add `subscribersFrom`. High `viewCountFrom` floors on `search_outliers` surface paid brand campaigns (ratio 50+); add `channelMonetizationAdsense: true` or exclude them by hand.
- Channel sample dates (`publishedAtEstimate`) and comment dates are month-granular; comment `likeCount` is often null.
- Index statistics (`medianViewsEstimate` on a search hit) and the live `get_channel` statistics diverge on small or young channels. When you read a channel, use the live value and say which one you used.
- `search_related_outliers` with a `title` anchor has returned off-topic hits and ignored `publishedAtFrom` and `classificationQuality` on the live server; `videoId`, `thumbnailVideoId` and `relatedChannelId` anchors behave. `search_outliers` with `by: "lexical"` has ignored the query. Treat both as "check the hits are on topic before spending more".
- `language` on outlier searches matches the indexed title language, not the audio: English titles with Hindi or Tamil narration pass `["en"]`. Check `defaultAudioLanguage` from `get_video` when it matters.
- `channelVideoCountTo` caps at 120 because channels are sampled to 120 videos. `titlePattern` must contain `*` and at least two letters. Ranges must satisfy from < to.
- `get_video_comments` returns "Failed Dependency" or "No comments found" when comments are disabled: treat as no data, not as a failure. Its `comments[]` can contain duplicate entries; dedupe on author plus text, and treat `publishedAt` as coarse (month granularity or relative strings).
- Empty `hits` with `pagination.total: 0`: widen recency, drop one filter or rephrase `query`. Keep the quality floor.
- HTTP 429 means the rate limit (about 30 calls per window, shared across sessions). Wait for the reset and retry; pace reads rather than firing them all at once.
- `pagination.total` has come back as exactly twice `size`, so do not use it to measure how crowded a niche is.
- `get_channel` has no audience or monetization fields; those appear only on search hits.

## Spending credits

Spend paid searches on finding candidates and free reads on understanding them. Two searches per job is the default, three the ceiling; never paginate a paid search in a loop. If a search errors, call `get_credits_balance`, then retry once with fewer filters. Tell the user the credits used at the end, not a budget at the start.

## REST fallback (no MCP)

Same data, same parameter names, plain HTTPS with an API key (Pro or Team) from https://tubelab.net/developers. Base `https://public-api.tubelab.net/v1`, header `Authorization: Api-Key <key>`, 10 requests per minute per key. Arrays are repeated params. Channel endpoints take an ID, not a handle.

| MCP tool | REST |
|---|---|
| `search_channels` / `search_related_channels` | `GET /search/channels` / `GET /search/channels/related?relatedChannelId=UC...` |
| `search_outliers` / `search_related_outliers` | `GET /search/outliers` / `GET /search/outliers/related` |
| `search_trending_formats` | `GET /search/trending-formats` |
| `get_channel`, `get_channel_videos` / `get_channel_shorts` | `GET /channel/videos/{id}` / `GET /channel/shorts/{id}` |
| `get_video` / `get_video_transcript` / `get_video_comments` | `GET /video/{id}` / `GET /video/transcript/{id}` / `GET /video/comments/{id}` |

```bash
curl -s "https://public-api.tubelab.net/v1/search/outliers?query=home%20security&publishedAtFrom=trimester&classificationQuality=neutral&sortBy=averageViewsRatio&size=20" \
  -H "Authorization: Api-Key $TUBELAB_API_KEY"
```

Agent-readable docs: https://tubelab.net/docs/skill.md
