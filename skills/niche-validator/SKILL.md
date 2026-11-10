---
name: niche-validator
description: Use when the user wants to know whether a YouTube niche, or a shortlist of niches, is worth entering or already saturated. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Niche Validator

## Overview

One niche, one verdict: enter, enter with a twist, or stay out. A shortlist of up to three gets a comparison, then a full verdict for the strongest. The scores match TubeLab's Niche Analyzer. The real test is whether new channels are breaking in.

## Workflow

1. Clarify scope only if needed. Name the niche in 2 to 3 words; for a channel, take it from its titles. Given a shortlist, sample and score each niche the same way. For a new idea, sample its nearest existing niche, and say so. Start with the last 3 months; widen to 6 months, then a year, if results are thin.
2. Search videos for the niche from two angles, sorted by views with no ratio floor. Take the first 10 to 15 on-topic channels behind the top results, where most recent titles serve the niche's audience. Skip channels under 1,000 subscribers. Read each for its most-viewed video as returned, average views and subscribers. Add a known leader only if the searches missed it.
3. Compute three scores from the sample. Leave out, and name, any channel whose views per subscriber exceed three times the sample's median. Do not leave a channel out because it is big. If a read and a search hit disagree, trust the read. Round each score, cap it at 100, then band it.
   - Market Size: average each channel's most-viewed video, divide by 1,000,000, and multiply by 100.
   - Unsaturated: for each channel, divide average views by subscribers. Average those ratios, divide by 1.1, and multiply by 100.
   - Profitable: average the low RPM estimates from the search hits' channel data, divide by 7 dollars, and multiply by 100. If RPM is missing, say it could not be computed.
   - Bands: under 50 is weak 🔴, 50 to 70 is fair 🟡, and 71 or more is strong 🟢.
4. For Breaking In, run one channel search for young channels (joined in the last year, above 1K median views) in the strongest niche only. Two searches per niche, plus this one. View the thumbnail of every video you feature, and say if one fails to load.
5. Name the formats behind the winners, by ratio on the same hits, what the leaders never cover, and two or three ideas that bend it.

## Output Format

```markdown
# ⚖️ Niche Verdict: {niche, or the strongest of the shortlist}

- **Verdict:** {enter, enter with a twist, or stay out}, {why, with numbers}
- **Sample:** {n} on-topic channels, {n} videos, {window, and whether it was widened}
- **Left out of the scores:** {channels, and why; drop this bullet if none}

## 🆚 Shortlist
{Only with a shortlist. Write "not scored" for a niche with fewer than 10 on-topic channels. Everything after this section is about the strongest niche.}

| Niche | Market Size | Unsaturated | Profitable | Verdict |
|---|---|---|---|---|
| {niche} | {n} {band emoji} | {n} {band emoji} | {n} {band emoji} | {verdict} |

- **Why {niche}:** {one sentence on why it is the strongest}

## 📊 Scores

| Score | 0 to 100 | Band | Based on |
|---|---:|---|---|
| Market Size | {n} | {🟢, 🟡 or 🔴} | viral views potential {n}, average views {n}, {"set by one video" if the band changes without it} |
| Unsaturated | {n} | {band} | reach beyond subscribers {ratio} |
| Profitable | {n} | {band} | RPM {band}, from {n} channels |

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
- **Leaders never cover:** {one sentence}
- **{Idea}:** {one sentence}

## 🌍 Other Languages
{Check French, German and Spanish markets only if the user asked or the niche looks saturated, since each costs more searches: market, channels found, open or not. Otherwise leave this section out.}

## 🧭 Entry Plan
- **Angle:** {the gap and the format, in one sentence}
- **First titles:** {three titles}
```

- Length: about 700 words, plus any shortlist. Three items per section.
- Language: plain words and short, complete sentences. Nothing compressed.
- Bullets: one fact each, under 25 words, except quotes and verbatim titles. No extra sections or bullets.
- If it runs long, cut whole items. Never cut proof, and never squeeze sentences.
- Links: link every video, channel, moment, brand and offer you cite, built from IDs, handles and links in the data. Never guess one.
- Thumbnails: use the 320px `mqdefault.jpg` image, on its own line under the heading, linked to the video.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with low-effort videos.
- Do not present the scores as measurements. They are estimates from a sample.
- Do not call a niche open on big views alone. Ten established channels and no newcomer means it is closed.
- Do not count huge views with almost no likes as demand; they are usually paid.
- Do not name a format from fewer than 3 outliers on different channels. The language tag can call a Hindi or Urdu video English, so check the title and thumbnail.
- Do not judge fewer than 10 on-topic channels. Say what would settle it.
