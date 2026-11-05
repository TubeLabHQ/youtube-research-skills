---
name: sponsor-finder
description: Find the brands already sponsoring YouTube channels like yours, with the evidence to pitch them. Uses TubeLab to find channels with your audience profile and size that carry sponsored content, reads their descriptions and the sponsor reads in their videos for the brand names, promo codes, landing links and pitch structures, then ranks the brands by how warm they are for your channel and drafts an outreach angle per brand. Use when asked who could sponsor my channel, how to find sponsors, which brands sponsor channels in my niche, a sponsor list for my channel, or how much to ask (bands only). Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "10-15 per run (1 search_related_channels at 5, 1-2 search_channels at 5; channel, video and transcript reads free)"
  plan: pro
---

# Sponsor finder

Brands that already pay channels with your audience are the warmest leads a creator has. TubeLab knows which channels carry sponsored content and who their audience is; the brand names live in those channels' descriptions and in the first two minutes of their videos. The output is a sponsor list: each brand with where it was seen, the channel sizes it pays, the pitch structure it uses, and the angle your channel can offer it.

- Use for: "who could sponsor my channel", "find sponsors for @channel", "which brands sponsor channels in X", "brands paying channels my size", "sponsor list for my pitch deck".
- Not for: a brand looking for creators (`sponsorship-prospecting`), the full money audit of a channel (`monetization-research`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Your channel | required: ID, URL or `@handle` |
| Size band for lookalikes | 0.3x to 3x your subscribers |
| Categories to exclude | none; the user may exclude gambling, supplements, crypto and the like |
| Language | the channel's language |
| Plan | audience filters need a Pro account; on Starter run steps 1, 2, 4 and 5 and say the twin pass is missing |

## Credit budget

Say before the first paid call: "About 10 to 15 credits: one related-channels search at 5, one or two channel searches at 5; channel, video and transcript reads are free." Do not paginate.

## Workflow

1. **Your channel (free).** `get_channel`: subscribers, `medianViewsEstimate`, `averageVideoDurationEstimate`, cadence, topics from titles, and any sponsor already in your descriptions (so you do not pitch a current partner as new).
2. **Sponsored lookalikes in the niche.** `search_related_channels` with `relatedChannelId: ["<your channel id>"]`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `subscribersFrom` at a third of your subscribers, `subscribersTo` at three times, `detectionsMonetization: ["sponsored"]`, `size: 20`. Per hit keep `snippet.title`, `handle`, `statistics.subscriberCount`, `medianViewsEstimate`, `audience.dominant`, `semantic.niches`. Under 8 hits: drop `subscribersTo`, then widen to `semester`, one step at a time, and say so. Your audience profile is the most common `audience.dominant` across the hits, labelled "proxy".
3. **Sponsored twins outside the niche.** `search_channels` with no `query`, `excludeNiche: ["<your niche keywords>"]`, `audienceRegion: ["<your region>"]`, `audienceAgeFrom`/`To` spanning your dominant age band, `audienceDominantGender`, `detectionsMonetization: ["sponsored"]`, `subscribersFrom`/`To` as in step 2, `medianViewsFrom: 5000`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `sortBy: "recency"`, `size: 20`. Brands here pay for your audience without caring about your topic. Do not combine a semantic `query` with the audience filters; the match drifts off topic.
4. **Read the sponsor reads (free).** For each of up to 15 channels (prefer the ones closest to your size), `get_channel` for `item.snippet.description`, then `get_video` on the 3 most recent videos for their descriptions: brand names, promo codes, tracked links, "sponsored by", "thanks to", "partner". For 4 to 6 videos whose description names a sponsor, `get_video_transcript` and read `events[]` until `startMs` passes 120000: where the read sits (cold open, after the hook, mid-roll), its length, the offer (code, discount, free trial), and the pitch structure. Record only what you read; the index exposes no brand names.
5. **Group by brand.** For each brand: category, channels seen on (handle · subscribers · video title verbatim · date), how many of the sample it sponsors, the smallest and largest channel it pays, the offer, and the placement it buys. Drop categories the user excluded.
6. **Rank the brands** by warmth: pays channels within your size band with your audience profile, on more than one channel, within the last trimester, in a category your content can host naturally. A brand seen once on a channel 10x your size is cold; a brand on three channels your size is a call to make this week.
7. **Outreach angle per brand (top 10).** Which of your videos (title, views, ratio) matches the category, the placement you can offer (the read's position and length as seen on their current channels), and the proof line from your own numbers. Never invent a rate: if the user asks, give the only honest answer, a band from public CPM ranges labelled "industry estimate, not TubeLab data".
8. **Contact path.** Only what the brand's own link in a description shows (a partnerships page, a creator program URL) or "not visible". Never invent an email.

## Output

```markdown
# Sponsor list: <channel title> (@handle)
Run: <date> · Audience profile: <region · age · gender · income> (proxy from n channels) · Size band · Credits used · Plan fields: <yes | partial>

## 1. Brands already paying channels like yours
| # | Brand | Category | Seen on (handle · subs · title verbatim · date) | Channels (n) | Size range paid | Offer | Placement | Warmth |

## 2. Outreach angles (top 10)
### 1. <Brand>
Why them: <evidence> · Your video that fits: <title · views · ratio> · Placement you can offer: <position · length> · Contact path: <URL seen | not visible>

## 3. Pitch structures seen (verbatim openings of 4 to 6 sponsor reads, with channel and timestamp)

## 4. Caveats
Brands come only from descriptions and transcripts read in this run · `detections.sponsored` is a sampled prediction · rates are not TubeLab data · not checked
```

## Pitfalls

- The index flags sponsored content; it does not name the brand. If you did not read the brand in a description or hear it in a transcript, it is not on the list.
- A sponsor read in a transcript can be an affiliate or the channel's own product. Check the description's wording before calling it a sponsor.
- Channels far above your size attract brands with budgets you will not see. Keep the size band tight and show it.
- Audience fields are estimates; say "proxy" and give the share of hits that agree.
- Never invent a contact, a rate or a brand.

## Example prompts

- "Who could sponsor @mychannel? Find the brands already paying channels my size with my audience."
- "Sponsor list for my pitch deck: brands, where they run reads, what they offer, and my angle for each."
- "Which software brands sponsor business channels under 100K subscribers right now?"
