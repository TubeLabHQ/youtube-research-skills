---
name: monetization-research
description: Audit how a YouTube channel could make more money by studying how its competitors and its audience twins actually monetize. Uses TubeLab's monetization detections, revenue and RPM bands and audience filters to find channels in the niche and channels in other niches with the same audience profile, then reads their descriptions and sponsor reads for the exact mechanics (sponsors, affiliate, products, courses, communities, newsletters, services, donations) and ranks the opportunities, with RPM levers and a sponsor prospect list. Use when asked how to monetize, how competitors make money, how to raise RPM, what to sell to my audience, which sponsors work with channels like mine, or for a monetization audit of a channel or niche. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "15-20 per run (3-4 search_channels or search_related_channels at 5; channel, video and transcript reads free)"
  plan: pro
---

# Monetization research

Money follows the audience, not the topic. The niche shows what competitors do; channels in other niches with the same audience profile show what that audience already pays for, which is usually the bigger lesson. TubeLab's index says which channels have a monetization method; the exact mechanics come from free reads of their descriptions and sponsor reads. The output is a monetization audit: your current stack against the market, every method with evidence and examples, the RPM levers available to you, and the sponsors already paying channels like yours.

- Use for: "how do channels like mine make money", "monetization audit for @channel", "how do I raise my RPM", "what could I sell to my audience", "who sponsors channels in X", "how is my competition monetizing".
- Not for: a brand looking for creators to sponsor (`sponsorship-prospecting`), whether a niche is worth entering (`niche-validator`), video ideas (`video-ideation`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Your channel | recommended: ID, URL or `@handle`. Without one, audit a niche for a generic entrant |
| Niche | derived from the channel's titles if not given |
| Goal | all methods; narrow to AdSense, sponsors, products, community or services if the user says so |
| Language | the channel's language |
| Plan | audience, revenue and RPM fields need a Pro account. On Starter, run steps 1, 3 and 5 only and say which parts are missing |

## Credit budget

Say before the first paid call: "About 15 to 20 credits: one related-channels search at 5, two to three channel searches at 5; channel, video and transcript reads are free." Do not paginate.

## Workflow

1. **Your baseline (free).** `get_channel`: subscribers, `medianViewsEstimate`, `averageVideoDurationEstimate`, cadence from `videos[]` dates, and your current stack parsed from `item.snippet.description` and your top 3 videos' descriptions (`get_video`): sponsor mentions, affiliate links, product, course, community, newsletter, services, donation links. This is the "now" column.
2. **Niche competitors and audience proxy.** `search_related_channels` with `relatedChannelId: ["<your channel id>"]`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `subscribersFrom` at a third of your subscribers (large seeds otherwise return small lookalikes), `size: 20`. Per hit keep `semantic.niches`, `statistics.subscriberCount`, `medianViewsEstimate`, `monetization.adsense`, `revenueMonthlyEstimationFrom/To`, `rpmEstimationFrom/To`, every `detections.<type>.detected` (adsense, sponsored, affiliate, product, donations, course, newsletter, community, services) and `audience.dominant`. Your audience profile is the most common `audience.dominant` region, age, gender and income across these hits, labelled "proxy". If the hits disagree, one `search_channels` with `query: ["<your channel title>"]`, `size: 5` (5 credits) returns your own record when the channel is indexed.
3. **Niche money pass.** `search_channels` with `query: ["<niche>"]`, `publishedAtFrom: "semester"`, `classificationQuality: "neutral"`, `excludeNiche: [slop list from tubelab-mcp]`, `sortBy: "revenueMonthly"`, `size: 20`. The top earners in the niche, with the same fields as step 2. Count how many of the merged niche set have each detection: that is the niche's monetization mix.
4. **Audience twins outside the niche.** `search_channels` with no `query`, `excludeNiche: ["<your niche keywords>"]`, `audienceRegion: ["<your region code>"]`, `audienceAgeFrom`/`audienceAgeTo` spanning your dominant age band, `audienceDominantGender`, `audienceDominantIncome: ["<your tier>"]`, `detectionsMonetization: ["sponsored", "affiliate", "product", "course", "community", "newsletter", "services"]`, `medianViewsFrom: 5000`, `publishedAtFrom: "trimester"`, `classificationQuality: "neutral"`, `sortBy: "revenueMonthly"`, `size: 20`. These are proven markets on your audience. Under 8 hits: drop the income filter first, then widen the age band, and say so. Optional second twin pass with `sortBy: "rpm"` when the goal is AdSense RPM.
5. **Mechanics (free).** Pick 8 to 12 channels: the 4 niche channels with the most detections or the highest revenue band, and 4 to 8 twins. For each, `get_channel` for `item.snippet.description` and `keywords`, then `get_video` on its top 2 videos by `averageViewsRatio` for the descriptions. Record what you actually see: sponsor names and promo codes, affiliate programs (Amazon, software referral links), products (merch, templates, presets, apps), courses and their platform, communities (Patreon, memberships, Skool, Discord), newsletters, services (consulting, agency, "work with me"), donations. For 2 to 3 channels with `detections.sponsored.detected`, `get_video_transcript` and read `events[]` until `startMs` passes 120000 for the sponsor read and its pitch structure. The index does not expose brand names or evidence; only what you read counts.
6. **RPM levers.** Compare your proxy audience and `averageVideoDurationEstimate` with the twins' `rpmEstimationFrom/To` bands: audience tier (region, income, age) sets the ceiling; videos over 8 minutes take mid-rolls; topics the same audience watches on higher-RPM twins (finance, software, business, health) are adjacent topics you can cover without changing audience. Report bands, never a number.
7. **Rank the opportunities** by evidence (how many niche channels and twins use the method) times fit (same audience, same format, authority you already have), with effort as the tie-break from cheapest to dearest: AdSense levers, affiliate, sponsors, products and community, courses and services. An opportunity with twins but no niche evidence is "open on your audience"; one with niche evidence but no twins is "table stakes".
8. **Sponsor prospects.** Every brand seen in step 5 across niche and twins, grouped by category, with where it was seen (channel (handle) · video title verbatim · date) and whether that channel is within 3x of your size. Brands sponsoring your audience twins at your size are the warmest leads.

## Output

```markdown
# Monetization audit: <channel title> (@handle) | <niche>
Run: <date> · Audience profile: <region · age · gender · income> (<own record | proxy from n related channels | inferred>) · Credits used · Plan fields available: <yes | partial>

## 1. Your stack today
<methods found in your descriptions, or "AdSense only" / "nothing visible">

## 2. How the niche monetizes (<n> channels)
| Method | Channels using it | Share | Revenue band of users (estimate) | Examples (handle · what exactly, as read) |

## 3. What your audience already pays for elsewhere (<n> twins)
| Twin channel (handle) | Niche | Subs | Median views | Audience | Methods seen (exact mechanics) | Revenue band (estimate) |

## 4. Opportunities, ranked
| # | Method | Evidence (niche n + twins n) | Fit | Effort | First step | Proof (handle · title · views · ratio · date) |

## 5. RPM levers
Audience tier vs twins' RPM bands (estimates) · average duration vs the 8-minute mid-roll line · adjacent higher-RPM topics your audience watches, with the twin that proves it

## 6. Sponsor prospects
| Brand | Category | Seen on (handle · title · date) | Channel size vs yours | Pitch structure seen |

## 7. Caveats
Revenue, RPM and audience are estimates shown as bands · detections come from a 5-video sample plus the About page and refresh about monthly · methods listed only when read in a description or transcript · not checked
```

## Pitfalls

- Detections are predictions from a sample. A channel can sell a course without the index knowing. Read descriptions before saying a method is absent.
- The public API strips brand names and evidence from `detections`, and strips `monetization.sponsored`; use `detections.sponsored.detected` for the flag and your own reading for the brand.
- Revenue and RPM bands are model outputs. Show `From` to `To`, say "estimate", never quote a single figure.
- A twin's method needs the twin's authority. A course sells on proof; a 2K-subscriber channel copying a 500K channel's course funnel is a gap, not an opportunity, unless the smaller twins do it too.
- Low-income or non-first-world dominant audiences cap AdSense RPM; say so instead of promising RPM gains.
- On Starter accounts audience and money fields may be empty; say "needs Pro" for steps 4 and 6 rather than inferring them.
- Never invent a brand, a product or a price. If you did not read it, it is not evidence.

## Example prompts

- "Monetization audit for @mychannel: how do my competitors make money and what am I missing?"
- "What does my audience pay for on other channels? Find channels with the same audience profile that sell products or run communities."
- "Which sponsors are paying channels my size in home security and adjacent niches?"
