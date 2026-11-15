---
name: audit-channel-risk
description: Use when the user wants to know whether a YouTube channel is at risk of being demonetized or terminated, with a score for each, the red flags and what to fix first. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
---

# Audit Channel Risk

## Overview

YouTube's [channel monetization policies](https://support.google.com/youtube/answer/1311392?hl=en) decide which channels keep monetization, and they change often. Read the page on every run and check the channel against it, never against memory. The best evidence is what happened to the channels most similar to it.

## Workflow

1. Read the policy page and list its sections that set a rule for a channel's videos, skipping those that only point to another page. If it will not open, ask the user to paste it.
2. Read each channel for free: its top and newest videos and About text. Judge pace from video reads, since list dates can be months off.
3. Check the channel against each section, across titles, descriptions, thumbnails and three to five transcripts. View the thumbnails of the videos you cite.
4. Note what already shows real people behind the channel: a real presenter on camera, and an About text naming who makes the videos.
5. Run both searches below per channel, seeded with it, without the quality filter. Lost AdSense means `monetization.adsense` is false with a `monetizationChangedAt` date, whatever the AdSense detection says. False alone only means not monetized.
6. If the audited channel is in its own lost-AdSense search, lead with that and the date, score demonetization 100, and leave it off the list.
7. Rate every other hit from 0 to 100: titles first, then thumbnails for title matches, then scripts if still unsure. A close one, 60 or more, shares the title formula and subject, and the thumbnail style. A terminated channel's thumbnails load from `https://cdn.tubelab.net/vi/<id>.jpeg`.
8. Score two risks from 0 to 100, where higher is riskier. One strong signal is enough, so take the highest and never add them up. Under 30 is low 🟢, 30 to 59 is medium 🟡, and 60 or more is high 🔴.
   - Termination: 15 points per close similar channel terminated, up to 100.
   - Demonetization: the higher of two signals.
     - Similar channels: 15 points per close one terminated or demonetized, up to 100.
     - Guidelines: its worst section. A section scores 0 when at most two videos run into it, 60 when more do, and 100 when over half do.
9. Compare several channels. One shared template is what spam systems look for.

Terminated, then lost AdSense:

```json
{ "relatedChannelId": ["<channelId>"], "terminated": true, "publishedAtFrom": "year", "size": 40 }
{ "relatedChannelId": ["<channelId>"], "monetizationChanged": true, "monetizationAdsense": false, "publishedAtFrom": "year", "size": 40 }
```

## Output Format

```markdown
# 🛡️ Channel Risk Audit: [{channel}]({url})

- **AdSense:** off since {date} {only if the channel is in its own lost-AdSense search}
- **Demonetization risk:** {n}/100 {🟢, 🟡 or 🔴}
- **Termination risk:** {n}/100 {🟢, 🟡 or 🔴}
- **Biggest risk:** {one sentence, with numbers}

## 🆚 Channels
{Only with several channels. Then one block per channel, from the Score section down, riskiest first.}

| Channel | Demonetization risk | Termination risk | Biggest risk |
|---|---|---|---|
| [{channel}]({url}) | {n}/100 {band emoji} | {n}/100 {band emoji} | {a few words} |

- **Shared template:** {what the channels repeat between them, or "none"}

## 📊 Score
| Demonetization risk | Score | Based on |
|---|---|---|
| Own AdSense | 100/100 | Off since {date} {leave this row out if it is not off} |
| Similar channels terminated or demonetized | {n}/100 | {n} close of {n} checked |
| Guidelines | {n}/100 | {n} of {n} sections failed |

The highest row sets the demonetization risk.

| Termination risk | Score | Based on |
|---|---|---|
| Similar channels terminated | {n}/100 | {n} of the {n} close ones were terminated, {n} lost AdSense only |

## 📋 Guidelines Check
- {✅ or ❌} [{section name as the page words it}]({policy page url}) · {n}/100 · {what was found, in a few words} {every section checked, failed ones first}

## 🚩 Red Flags
{One per failed section, biggest first. Leave this section out when none failed.}
### 1. {Flag}

[![]({thumbnail})]({video url})

- [{title}]({video url}) · {views, ratio, date} {up to three videos, one bullet each}
- **Rule:** {the policy line it runs into, quoted from the page}
- **Fix:** {one sentence}

## 👥 What Happened To Channels Like Yours
- [{channel}]({url}) · {terminated, last upload {date} | lost AdSense {date}} · closeness {n}/100 {"(titles only)" if no thumbnail loaded} · {what matched: the title formula, the thumbnail style or the script structure} {closest first}

## ✅ Actions To Reduce Risk
1. **{Action}**
   - **Why:** {one sentence}
{The red flag fixes first, biggest first. Then one action for what step 4 found missing: a real presenter on camera, in a video presenting the channel and how its videos are made, an About text naming who makes them, or both. Never an action the channel already does. Word each action as one plain thing to try, clear without its Why, like "Try new title formulas" or "Add a real presenter on camera".}
```

- Length: about 600 words per channel. Up to three red flags, five similar channels and four actions.
- Language: plain words and short, complete sentences. Nothing compressed.
- Bullets: one fact each, under 25 words, except quotes and verbatim titles. No extra sections or bullets.
- If it runs long, cut whole items. Never cut proof.
- Links: link every video and channel you cite, built from IDs and handles in the data. Never guess one.
- Thumbnails: use the 320px `mqdefault.jpg` image, on its own line under the heading, linked to the video.

## Common Pitfalls

- Do not say why a similar channel was terminated. The data does not show why.
- Do not rate closeness by topic alone. One niche holds many formats.
- Do not count a similar channel that gained AdSense, unless it is now terminated.
- Do not count a large original's later copycats. Check which came first.
- Do not flag AI use or upload pace alone.
- A score is not a probability, and a low one is valid.
- Never suggest hiding from detection. Every action changes the videos or shows who makes them.
