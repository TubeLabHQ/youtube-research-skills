---
name: sponsorship-prospecting
description: Use when the user wants to find YouTube channels to sponsor for a product or business, build a creator prospect list, or match creators to a buyer. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "5.0"
  requires: tubelab-mcp
---

# Sponsorship Prospecting

## Overview

A scored list of YouTube channels worth sponsoring for one product. A brand pays for views by the right people, not for subscribers. So judge reach by the median views of recent long videos, and fit by how closely the audience's country, age, gender and income match the buyer.

## Workflow

1. Clarify scope only if needed: the product, the buyer, and any budget.
2. Start with outlier searches on the topics the buyer watches; they are cheap and find most prospects. Then run one channel search with the buyer's audience filters; only channel-search hits carry audience estimates. Where a prospect has none, write "no estimate" and judge fit from who the channel says it serves. Expect about three to five searches; reads are free.
3. Keep two pools. Channels that already take sponsors are proven, and their current sponsors show what sells to this audience, including the user's competitors. A channel tied to a competing product has little sponsor room, but its deal shows what sells to this buyer; say so. Channels with the right audience and no sponsor yet are cheaper and more open.
4. Read each shortlisted channel. Note its upload rhythm, how steady its views are, sponsor mentions in the descriptions of two or three recent videos (link the brand and the video), and a public contact path from the channel's own description or links. Fetch and view the thumbnail of each video you feature, and say so if one fails to load.
5. Score each prospect from 1 to 5 on audience fit, topic fit, reach (median views), steady views, sponsor room (none yet, some, or crowded), brand safety and contact path. Rank by total, breaking ties on audience fit.
6. Estimate a cost band per sponsored video from median views. Unless the user gives a rate, assume $20 to $40 per 1,000 median views, and note that small channels often set a minimum fee above it. Label it as an estimate, and never state a creator's rate as fact.

## Output Format

```markdown
# 🤝 Sponsorship Prospects: {product}

- **Best fit:** {channel, and why in one sentence}
- **Buyer:** {the audience searched for}
- **Budget:** {if given, and how the top picks fit inside it}

## 🏆 Prospects

Median views come from each channel's last {n} long videos. Audience fields are estimates.

| Channel (link) | Subs | Median views | Audience (estimate) | Sponsors now | Fit (total score) | Contact |
|---|---:|---:|---|---|---:|---|

## ✅ Best Fits

### 1. [{channel}]({url})

[![]({thumbnail of a recent strong video})]({video url})

- **Why it fits:** {one sentence}
- **Proof:** [{title}]({video url}) · {views, ratio, date}
- **Sponsors now:** {linked brands, or "none found"}
- **Outreach angle:** {one sentence the brand could open with, tied to a specific video}
- **Estimated cost:** {band per sponsored video, labelled as an estimate}

## 📋 CSV

~~~csv
channel,url,subscribers,median_views,audience,sponsors_now,fit_score,contact
~~~
```

- Length: about 900 words, not counting the CSV. 10 to 15 prospects in the table, best first, and the top 3 to 5 as blocks.
- Language: plain words and short, complete sentences. Nothing compressed.
- Bullets: one fact each, under 25 words, except quotes and verbatim titles. No extra sections or bullets.
- If it runs long, cut whole items. Never cut proof, and never squeeze sentences.
- Links: link every video, channel, moment, brand and offer you cite, built from IDs, handles and links in the data. Never guess one.
- Thumbnails: use the 320px `mqdefault.jpg` image, on its own line under the heading, linked to the video.

## Common Pitfalls

- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, or the results fill with low-effort videos.
- Do not rank by subscribers. A mismatched big channel is a worse buy than a matched small one.
- Do not present audience fields as facts. They are estimates, so the brand should ask the creator for a screenshot of their analytics before paying.
- Do not trust the language tag for the audience's country. It can call a Hindi or Urdu video English, so check titles, thumbnails and the audience fields.
- Do not list made-for-kids channels, dormant channels (no upload in about the last month), or channels whose views swing wildly from video to video.
- Do not publish private contact details. Use only what the channel shows publicly.
- Do not trust "no sponsor" from the flag alone. It misses some sponsors.
