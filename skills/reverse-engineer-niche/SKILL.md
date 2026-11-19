---
name: reverse-engineer-niche
description: Use when the user wants to reverse engineer a YouTube niche, or a channel's competitors, into the patterns that work and the ones that flop, and see how a channel compares. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
---

# Reverse Engineer Niche

## Overview

A niche taken apart through 10 to 12 of its channels: the patterns that win, the versions that flop, and who can copy each. Prefer emerging channels, with 3K to 300K subscribers. Read every video through five lenses:

- **Working formats:** YouTube groups videos by what viewers watch together, not by topic. A new video must first fit the winners' format and length.
- **New and specific:** new enough to stop a scroll, specific enough to feel real: a price, a document, a job, a place. Flops tend to be familiar and general.
- **Anchors:** names, brands, tools or terms that tell YouTube which viewers to send.
- **Dead versions:** recent videos with a winner's promise that flopped.
- **Who can copy it:** anyone, or only someone with its asset: life experience, insider trust, professional credibility, subculture fluency, a hard skill, fame or budget.

Not for a dated digest of last month's winners (`trend-report`), whether to enter (`niche-validator`) or new niches (`niche-finder`).

## Workflow

1. Clarify scope only if needed. Given a channel, sample its competitors.
2. Find candidates with up to 10 searches, never paging one. Recent outliers from emerging-size channels are the best source: read the channels behind them. Add channel searches in other phrasings with average views at or above subscribers, similar-channel searches seeded with the best finds or the given channel, and channels you know.
3. Verify each channel with a free read: on topic, long videos, the user's language. English titles can hide Hindi or French audio, so check one video's audio. Add established channels only when under 10 emerging ones hold up.
4. Take each channel's median over its last three months of long videos. Winners are its top two or three at twice that or more. Flops are under half and older than a month. An older flop must also trail the videos around it.
5. Group winners into three to five patterns, each on three or more channels. Explain each winner against its own channel's normal videos.
6. For each pattern, pick two or three dead versions from the flops: same promise, few views. The strongest repeats its own channel's winning package. Give each a reason.
7. View every thumbnail you cite. Read the first 30 seconds of each cited winner.
8. Given a channel, find up to three gaps: patterns its competitors win with that it skips or loses with.

## Output Format

```markdown
# 🧭 Reverse Engineering: {niche, or competitors of [channel](url)}

- **What wins:** {one sentence, with numbers}
- **Sample:** {n} channels ({n} emerging, {n} established) · {n} winners, {n} flops · {n} thumbnails viewed · {n} openings read
- **Start with:** {the one pattern to make first, and why}

## 📺 Working Formats

- **Format:** {the format the winners share}
- **Length:** {usual length of the winners}
- **Where to differ:** {one sentence}

## 👥 The Sample

Medians cover each channel's last three months of long videos. {The given channel's row is in bold.}

| Channel | Type | Subs | Median views | Median per sub |
|---|---|---:|---:|---:|
| [{channel}]({url}) | emerging | {subs} | {views} | {ratio} |

## 🧩 Patterns That Work

### 1. {Pattern name} · {n} winners on {n} channels

[![]({thumbnail})]({video url}) [![]({thumbnail})]({video url}) [![]({thumbnail})]({video url})

- **Title formula:** "{pattern with every slot in square brackets}"
- **Thumbnail:** {the parts a viewer can point at, each in square brackets}
- **Hook:** {the order of beats, such as claim → proof → promise}
- **Angle:** {the promise to the viewer}
- **Anchors:** {names, tools or terms that recur}
- **New and specific:** {what is new, and what makes it feel real}
- **Who can copy it:** {anyone, or needs their asset: which one}

<details>
<summary>Proof: {n} winners</summary>

- [{channel}]({url}) · [{title}]({video url}) · {views, ratio to its median, date} · {why it likely beat this channel's normal videos}
  - Hook: "{first lines, word for word}"

</details>

## 🚫 What To Avoid

- **What the flops share:** {one sentence}

### {Pattern name}: dead versions

- [{channel}]({url}) · [{title}]({video url}) · {views, ratio to its median, date} · **{too familiar, too general, wrong anchor or wrong format}:** {one line}

## 🎯 Gaps To Win

### 1. {Gap}

[![]({thumbnail})]({video url})

- **Proof:** [{channel}]({url}) · [{title}]({video url}) · {views, ratio, date}
- **Why it fits:** {one sentence}

- **Copy:** {one sentence}
- **Avoid:** {one sentence}
- **Positioning:** {one sentence}

## 🧠 Next Steps

1. **{What to do}** · `{skill}` · "{a prompt to paste, with [square brackets] for what the user fills in}"
```

- Length: about 1,500 words. Gaps To Win only for a channel. If it runs long, cut whole items, never proof.
- Language: plain words and short, complete sentences. State causes as likely, never as fact.
- Bullets: one fact each, under 25 words, except quotes, verbatim titles, formulas and prompts.
- Links: every video and channel cited, built from IDs and handles in the data.
- Thumbnails: the 320px `mqdefault.jpg`, linked, on its own line. Each pattern shows three winners from different channels.
- Quotes: word for word, only inside the collapsed proof.

## Common Pitfalls

- Do not call one channel's hits a pattern. One viral video on a tiny channel proves the idea, not the channel.
- Do not sell a pattern seen only on established channels to a new channel. It may ride on viewers who already trust them.
- Do not keep a channel because a search returned it. Hits are often off-topic, off-language or Shorts-only.
- Do not count last month's uploads as flops. They are still collecting views.
- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, except a lookup by handle.
