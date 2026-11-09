---
name: niche-validator
description: Use when the user wants to know whether a YouTube niche is worth entering or already saturated. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Niche Validator

## Overview

One niche, one verdict: enter, enter with a twist, or stay out. It uses the same three scores as TubeLab's Niche Analyzer, so it matches the app. Beyond the scores, the deciding question is whether new channels are breaking in now.

## Workflow

1. Clarify scope only if needed. Name the niche in 2 to 3 words; if given a channel, take it from its titles. Start with the last 3 months, and widen to 6 months, then a year, if results are thin. Say so.
2. Sample the niche: search channels for that name over two or three pages. Keep only on-topic channels: most of their recent titles serve the niche's audience. Add leaders you know and verify them with free reads. If no channel above roughly 100K subscribers is in the sample, say Market Size is understated. Then run one search for young channels above 1K median views, which feeds Breaking In and not the scores, and two outlier searches from different angles. That is five to seven paid searches in all.
3. Read the leaders and the breakout channels. Note each one's most-viewed video, average views, subscribers and RPM band. Fetch and view the thumbnail of every video you feature, and say so if one fails to load.
4. Compute three scores from the on-topic channels. Leave out channels under 1,000 subscribers, whose ratios mean nothing, and any giant that would set an average alone. Cap every score at 100.
   - Market Size: average each channel's most-viewed video, divide by 1,000,000, and multiply by 100.
   - Unsaturated: for each channel, divide average views by subscribers. Average those ratios, divide by 1.1, and multiply by 100.
   - Profitable: average the low RPM estimates, divide by 7 dollars, and multiply by 100. If RPM is missing, say this score could not be computed.
   - Bands: under 50 is weak, 50 to 70 is fair, and 71 or more is strong.
5. Base the verdict on the scores and on whether newcomers break in. Name the formats behind the winners, what the leaders never cover, and two or three niche-bending ideas, such as joining two proven formats.

## Output Format

```markdown
# ⚖️ Niche Verdict: {niche}

- **Verdict:** {enter, enter with a twist, or stay out}, {why, with numbers}
- **Sample:** {n} on-topic channels, {n} outliers, {window, and whether it was widened}
- **Left out of the scores:** {channels, and why}

| Score | 0 to 100 | Band | Based on |
|---|---:|---|---|
| Market Size | {n} | {🟢, 🟡 or 🔴} | viral views potential {n}, average views {n}, {"understated" if no leader above 100K} |
| Unsaturated | {n} | {band} | reach beyond subscribers {ratio} |
| Profitable | {n} | {band} | RPM {band} |

Revenue estimate, unreliable outside English-speaking audiences:

| Views | 1K | 10K | 100K | 1M |
|---|---|---|---|---|
| Revenue | {band} | {band} | {band} | {band} |

## 🚀 Breaking In
- [{channel}]({url}) · {age, subscribers, median views}

## ✅ Formats That Work

### 1. {Format}

[![]({thumbnail})]({video url})

- [{channel}]({url}) · [{title}]({video url}) · {views, ratio, date}
- [{channel}]({url}) · [{title}]({video url}) · {views, ratio, date}
- [{channel}]({url}) · [{title}]({video url}) · {views, ratio, date}

## 🎯 Gaps and Ideas
- **{Gap or idea}:** {one sentence}

## 🌍 Other Languages
{Check French, German and Spanish markets only if the user asked or the niche looks saturated, since each costs more searches: market, channels found, open or not. Otherwise leave this section out.}

## 🧭 Entry Plan
- **Angle:** {the gap and the format, in one sentence}
- **First titles:** {three titles}
```

- Length: about 700 words. Three items per section. Bands: 🟢 strong, 🟡 fair, 🔴 weak.
- Language: plain words and short, complete sentences. Nothing compressed.
- Bullets: one fact each, under 25 words, except quotes and verbatim titles. No extra sections or bullets.
- If it runs long, cut whole items. Never cut proof, and never squeeze sentences.
- Links: link every video, channel, moment, brand and offer you cite, built from IDs, handles and links in the data. Never guess one.
- Thumbnails: use the 320px `mqdefault.jpg` image, on its own line under the heading, linked to the video.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with low-effort videos.
- Do not present the scores as measurements. They are estimates from a sample, and RPM is unreliable outside first-world, English-speaking audiences.
- Do not call a niche open because views are big. Ten established channels and no newcomer above 1K median views means it is closed.
- Do not treat the search total as the size of the niche, because it is capped. Do not count huge views with almost no likes as demand; they are usually paid.
- Do not name a format from fewer than 3 outliers on different channels. The language tag can call a Hindi or Urdu video English, so check the title and thumbnail.
- Do not give a verdict on fewer than 10 on-topic channels. Say what would settle it.
