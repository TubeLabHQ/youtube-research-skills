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

YouTube's [channel monetization policies](https://support.google.com/youtube/answer/1311392) remove monetization for mass-produced videos, reused material without original commentary, shock or manipulation formulas, and AI personas posing as human experts on health, legal, money or politics. The best evidence is what happened to the channel's closest look-alikes.

## Workflow

1. Read each channel for free: its top and newest videos and About text. Judge pace from video reads, since list dates can be months off.
2. Look for one template across titles, descriptions, thumbnails and three to five transcripts. View the thumbnails of the videos you cite.
3. Note what already shows a real creator: an on-camera video presenting the channel, and an About text naming who makes the videos.
4. Run both searches below per channel, seeded with it, without the quality filter. Lost AdSense means `monetization.adsense` is false with a `monetizationChangedAt` date, whatever the AdSense detection says. False alone only means not monetized.
5. If the audited channel is in its own lost-AdSense search, lead with that and the date, score look-alikes 40, band demonetization high, and leave it off the list.
6. Rate every other hit from 0 to 100: titles first, then thumbnails for title matches, then scripts if still unsure. A close one, 60 or more, shares the title formula and subject, and the thumbnail style. A removed channel's thumbnails load from `https://cdn.tubelab.net/vi/<id>.jpeg`.
7. Score two risks. Under 30 is low 🟢, 30 to 59 is medium 🟡, and 60 or more is high 🔴.
   - Termination: 5 points per close look-alike gone from YouTube, up to 100.
   - Demonetization adds up four parts:
     - Look-alikes: 5 points per close one gone or demonetized, up to 40.
     - Mass-produced, 0 to 25: 0 when every video is built differently, 12 when most share one title formula and thumbnail layout, 25 when scripts share one arc too. Recompiling its own videos counts here.
     - Reused material from others, 0 to 20: 0 when all is its own, 10 when some lean on others' clips or text with thin commentary, 20 when most do.
     - Off-putting or AI-expert, 0 to 15: 0 when absent, 8 when a shock or humiliation hook recurs, 15 when most rely on it or an AI persona poses as a human expert.
8. Compare several channels. One shared template is what spam systems look for.

Gone from YouTube, then lost AdSense:

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
| Demonetization risk | Points | Based on |
|---|---|---|
| Look-alikes gone or demonetized | {n}/40 | {n} close of {n} checked {after "The channel's own AdSense is off" if so} |
| Mass-produced videos | {n}/25 | {what repeats} |
| Reused material | {n}/20 | {what is reused} |
| Off-putting or AI-expert content | {n}/15 | {what was found} |

| Termination risk | Points | Based on |
|---|---|---|
| Look-alikes gone from YouTube | {n}/100 | {n} of the {n} close ones are gone, {n} lost AdSense only |

## 🚩 Red Flags
### 1. {Flag}

[![]({thumbnail})]({video url})

- [{title}]({video url}) · {views, ratio, date} {up to three videos, one bullet each}
- **Rule:** {the policy line it runs into}
- **Fix:** {one sentence}

## 👥 What Happened To Channels Like Yours
- [{channel}]({url}) · {no longer on YouTube, last upload {date} | lost AdSense {date}} · closeness {n}/100 {"(titles only)" if no thumbnail loaded} · {what matched: the title formula, the thumbnail style or the script structure} {closest first}

## ✅ Actions To Reduce Risk
1. **{Action}**
   - **Why:** {one sentence}
{The red flag fixes first, biggest first. Then one action for what step 3 found missing: an on-camera video presenting the channel and how its videos are made, an About text naming who makes them, or both. Never an action the channel already does.}
```

- Length: about 600 words per channel. Up to three red flags, five look-alikes and four actions.
- Language: plain words and short, complete sentences. Nothing compressed.
- Bullets: one fact each, under 25 words, except quotes and verbatim titles. No extra sections or bullets.
- If it runs long, cut whole items. Never cut proof.
- Links: link every video and channel you cite, built from IDs and handles in the data. Never guess one.
- Thumbnails: use the 320px `mqdefault.jpg` image, on its own line under the heading, linked to the video.

## Common Pitfalls

- Do not say why a look-alike is gone. The data shows it left, not why.
- Do not rate closeness by topic alone. One niche holds many formats.
- Do not count a look-alike that gained AdSense, unless it is now gone.
- Do not count a large original's later copycats. Check which came first.
- Do not flag AI use or upload pace alone. The policy targets interchangeable videos.
- A score is not a probability, and a low one is valid.
- Never suggest hiding from detection. Every action changes the videos or shows who makes them.
