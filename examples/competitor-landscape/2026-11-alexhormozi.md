# Competitive landscape: Alex Hormozi (@AlexHormozi)

Run: 2026-11-05 · Neighbours: 7 comparable (as the index defines them, see caveats) + 1 tier above · Credits used: 12 at list prices (two `search_related_channels` at 5, one `search_related_outliers` at 2; channel and video reads free) · Widened: not by window; a second related-channels pass added `subscribersFrom: 300000` because the first pass returned only channels under 4K subscribers · Produced by Claude with the live TubeLab MCP following `skills/competitor-landscape/SKILL.md`. Every number is from a tool response; titles verbatim.

Calls made, in order: `get_channel("@AlexHormozi")` → seed id `UCUyDOdBWhC1MCxEjC46d-zw`; `search_related_channels(relatedChannelId: [seed], publishedAtFrom: "trimester", classificationQuality: "neutral", size: 20)` (shared with the monetization-research example run the same day); `search_related_outliers(relatedChannelId: [seed], publishedAtFrom: "trimester", classificationQuality: "neutral", size: 20)`; `search_related_channels(... same, subscribersFrom: 300000, size: 20)`; `get_channel` on @EvanCarmichael, @BrandonDawsonOfficial, @nishkarshsharmaa, @GregLaVecchia, @nicolascole77, @MaxPerzon, @MichelleExpert, @DrSaharYousef, @theCreator_Playbook, @razvanparaschivpod; `get_video` on the seed's top three videos by ratio.

## 1. Comparison

Seed first. Cadence is videos in the last 90 days of the 120-video sample; outlier rate is `positiveOutliersCount` over `videosSampleCount`; rung is the median promise rung of the last 10 titles (1 bare promise, 2 plus constraint, 3 named mechanism, 4 implicit promise).

| Channel (handle) | Subs | Median views | Ratio to subs | Cadence /90d | Avg duration | Variation | Outlier rate | Faceless | AdSense / sponsored | Rung |
|---|---|---|---|---|---|---|---|---|---|---|
| Alex Hormozi (@AlexHormozi) | 4,610,000 | 334,000 | 0.11 | 15 | 34m45s | 0.85 | 19/120 | no | n/a (not a search hit) | 3 |
| Greg Lav (@GregLaVecchia) | 137,000 | 132,000 | 1.34 | 6 | 24m00s | 0.85 | 6/38 | no | adsense true (outlier hit) | 2 |
| Brandon Dawson (@BrandonDawsonOfficial) | 426,000 | 1,800 | 0.01 | 16 | 15m (sample) | 3.67 | 3/120 | no | adsense false (outlier hit) | 3 |
| Max Perzon (@MaxPerzon) | 67,500 | 2,600 | 0.08 | 13 | 10m (sample) | 1.71 | 11/120 | no | adsense true (outlier hit) | 3 |
| Nicolas Cole (@nicolascole77) | 65,400 | 1,000 | 0.03 | 23 | 15m (sample) | 1.14 | 19/120 | yes (classification) | adsense true (outlier hit) | 3 |
| Michelle Expert (@MichelleExpert) | 59,600 | 3,100 | 0.05 | 12 | 40m (sample) | 3.03 | 8/120 | no | adsense true (outlier hit) | 2 |
| The Creator Playbook (@theCreator_Playbook) | 6,670 | 8,500 | 9.60 | 9 | 15m01s | 2.24 | 1/9 | no | adsense true · sponsored detected | 3 |
| Razvan Paraschiv Podcast (@razvanparaschivpod) | 1,970 | 9,200 | 16.45 | 9 | 59m50s | 1.19 | 2/9 | no | adsense true · newsletter detected | 3 |
| Tier above: Evan Carmichael (@EvanCarmichael) | 4,680,000 | 52,000 | 0.01 | 92 | long (sample) | 0.41 | 19/120 | no | adsense true (outlier hit) | 2 |
| Adjacent: Nishkarsh Sharma (@nishkarshsharmaa) | 1,040,000 | 139,000 | 0.33 | 16 | 15m (sample) | 1.33 | 19/120 | no | adsense true (outlier hit) | 3 |

Average durations marked "(sample)" are read from the sampled videos, not from `averageVideoDurationEstimate`, which the parser did not print for every channel.

## 2. Pillar matrix (videos · median ratio)

Pillars named from the seed's titles, extended where neighbours cover something else. Counts are from each channel's sampled titles; a cell is "–" when the pillar does not appear in the sample.

| Pillar | Seed | @GregLaVecchia | @BrandonDawsonOfficial | @MaxPerzon | @nicolascole77 | @theCreator_Playbook | @razvanparaschivpod | @EvanCarmichael |
|---|---|---|---|---|---|---|---|---|
| "If I started over / in 2026, I'd do this" | 9 · 1.6 | 1 · 0.7 ("watch this before you enter 2027") | 1 · 28.0 | 1 · 16.1 ("The Best Business to Start in 2027") | 4 · 5.5 | – | – | – |
| Ambition and age ("if you're in your 20s or 30s") | 5 · 2.7 | 6 · 1.2 ("$1B CEO: 8 rules I wish I knew in my 20s") | 2 · 1.5 | – | – | – | – | 4 · 0.5 |
| Scale or Fail / fix a real business on camera | 4 · 2.3 | – | 2 · 0.4 ("I Fixed 6 Struggling Businesses Without Leaving My Car") | – | – | – | – | – |
| Competition / cash prize format | 2 · 1.5 ("8 Entrepreneurs Compete For $100,000") | – | – | – | – | – | – | – |
| Founder interviews and origin stories | 1 · 0.4 | 3 · 0.8 | 1 · 0.2 | 1 · 3.6 | – | 1 · 7.3 ("How Getting Cut From the NFL Turned Me Into a $10M Youtuber") | 9 · 0.3 | 10 · 0.4 |
| Wealth mechanics (banks, salary, money models) | 3 · 0.6 | – | 1 · 29.0 ("How the Top 1% Build Their Own Banks (And You Can Too)") | – | 1 · 5.5 ("6 Revenue Streams To Become A 6 Figure Fiction Writer") | 1 · 0.2 | – | 2 · 0.5 |
| Creator economy / YouTube as a business | 3 · 1.2 ("How I Would Build a Personal Brand in 2027") | – | – | 6 · 2.9 ("Youtube + Skool = $230,298/month") | 8 · 1.0 | 7 · 0.2 | – | 3 · 1.0 |
| Mindset and habits | 4 · 1.4 | 10 · 0.7 | 5 · 0.8 | 2 · 4.4 ("8 Tiny Habits That Made Me a Millionaire") | – | – | – | 60+ · 0.5 |

## 3. Gaps, overlaps, moats

Gaps (pillars two or more neighbours carry with ratio above 1 that the seed does not): none at the seed's size. The one candidate is "YouTube plus community as the business" (Max Perzon and Nicolas Cole, ratios 2.9 and 1.0), which the seed touches only through personal-brand videos · proof: Max Perzon (@MaxPerzon) · "Youtube + Skool = $230,298/month" · 4,800 views · ratio 0.92 · 2026-11-02; and "Skool Just Changed Forever (and nobody even realised)" · 19,000 · 3.64 · 2026-10-05. The seed co-owns Skool and has not made a video about running one.

Overlaps: "If I started over" · seed median ratio 1.6 vs neighbours 0.7 to 28 (Brandon Dawson's 28.0 and Max Perzon's 16.1 are single videos on channels with median views under 3K; the seed wins on absolute reach, 2,000,000 views on "If I Started A Business in 2026, I'd Do This", ratio 4.12, 2026-01-05). "Ambition and age" · seed 2.7 vs Greg Lav 1.2 and Evan Carmichael 0.5; the seed is winning this pillar. "Founder interviews" · seed 0.4 vs Razvan 0.3 and Evan 0.4; nobody in the set wins it, including the seed ("If I Started A Personal Brand In 2026, I'd Do This - Dolly Parton" · 182,000 · 0.38 · 2026-09-05).

Moats: "Scale or Fail" (fixing a real business on camera, 90-day update) · seed only at this scale · ratio 2.3 ("Can I Save This Failing Theme Park in 90 Days?" · 1,805,229 · 3.71 · 2026-09-11; "How I Would Build a $10M Service Business (If I Had to Start Over)" · 1,451,882 · 2.89 · 2026-08-29) · keep. "Competition with a cash prize" · seed only · ratio 1.5 ("8 Entrepreneurs Compete For $100,000" · 784,000 · 1.62 · 2026-10-05) · keep, early signal.

Patterns neighbours repeat 3 or more times: the "$1B CEO:" prefix (Greg Lav, 5 titles), "Analysed/explained by a credential" (Dr. Sahar Yousef, "Neuroscientist Explains: Why You're Always Tired (and How to Fix It)" · 3,100,000 · 2.34 · 2026-10-15), and daily guru-clip compilations (Evan Carmichael, 92 uploads in 90 days, median ratio 0.5).

## 4. Moving now (related outliers, last trimester, max 2 per channel)

| Title (verbatim) | Channel (handle) | Subs | Views | Ratio | Published |
|---|---|---|---|---|---|
| If I had to Start A Business With Zero Money, I'd do THIS | Brandon Dawson (@BrandonDawsonOfficial) | 425,000 | 125,773 | 21.5 | 2026-08-11 |
| If You're Building A Business In Your 20's, Watch This | Logan Chierotti (@RealLoganChierotti) | 8,000 | 101,886 | 8.1 | 2026-09-09 |
| why i don't watch business content (as a 24yr old making $10k/mo online) | tragically chill (@tragicallychill) | 5,840 | 31,234 | 7.4 | 2026-09-18 |
| First $1 Roadmap: How I'd Make Money Online If I Was Starting Over (After Generating $30,000,000) | Nicolas Cole (@nicolascole77) | 65,200 | 10,273 | 5.7 | 2026-08-31 |
| Inside the Billionaire Mindset: 9 Habits a Dragon's Den Investor Swears By | Michelle Expert (@MichelleExpert) | 59,300 | 80,370 | 5.2 | 2026-10-19 |
| I'm Sacrificing Everything to Build a $1M Business (as a Gen Z) | Finn Peljo (@finnpeljo) | 2,050 | 12,825 | 4.1 | 2026-08-17 |
| If You Want To Make a $1M This Year, Start a Youtube Channel | Max Perzon (@MaxPerzon) | 67,400 | 15,705 | 2.9 | 2026-09-14 |
| If I Started With ₹0 In 2026, Here's My Exact Plan To Get To ₹10 Crores | Nishkarsh Sharma (@nishkarshsharmaa) | 1,030,000 | 913,206 | 2.6 | 2026-10-08 |
| $1B CEO: 8 rules I wish I knew in my 20s | Greg Lav (@GregLaVecchia) | 134,000 | 444,852 | 2.5 | 2026-09-05 |
| The Rules That Quietly Create Millionaires | Evan Carmichael (@EvanCarmichael) | 4,680,000 | 85,073 | 1.5 | 2026-08-06 |

Six of the ten are the seed's own "If I started over / in your 20s" formats, carried by smaller channels. The format is the niche's lingua franca now, not a differentiator.

## 5. Copy / avoid

Copy: "Zero money" constraint on the start-over format · 1 neighbour, ratio 21.5 (Brandon Dawson, 125,773 views on an 1,800 median channel) plus the seed's own history with the format · fits the seed's best pillar; the constraint is the new element. Copy: credentialed-explainer titling ("Neuroscientist Explains:", "$1B CEO:") · 2 neighbours, median ratio 2.3 · the seed's authority signal is implicit in the name; a prefix like "Portfolio of 10 companies:" would make it explicit for non-subscribers, who are 89% of its viewers by the ratio-to-subs figure. Copy: YouTube-plus-community as a business topic · 2 neighbours, ratio 2.9 to 3.6 on Max Perzon · the seed owns the platform the neighbours are selling.

Avoid: daily guru-clip volume (Evan Carmichael, 92 uploads in 90 days, median ratio 0.5, ratio-to-subs 0.01): size without lift. Avoid: founder-interview podcasts at the seed's cadence (Razvan 0.3 median ratio, Evan 0.4, seed 0.38 on the Dolly Parton episode): the audience comes for the seed's own voice. Avoid: long compilations ("3 Hours of Mindset and Habits to Help You Change Your Life", Evan Carmichael, 94,000 views on a 4.68M channel, ratio 1.69 but 0.02 ratio-to-subs).

## 6. Positioning

For owners of real businesses who want proof rather than motivation, Alex Hormozi is the only channel in this set that fixes a named business on camera and reports the 90-day result, proven by the Scale or Fail pillar at a 2.3 median ratio while the format everyone else copies, "if I started over", has become table stakes.

## Caveats

- The related-channels index places tiny channels next to a 4.6M-subscriber seed: the first pass returned 20 hits with 2 to 3,740 subscribers (median 87). A second pass with `subscribersFrom: 300000` returned 20 channels of which only one (Mario Joos, 541,000) was on topic; the rest were fitness, neuroscience, AI tools, Roblox and a basketball player. The comparable set here was therefore assembled from the on-topic channels in both related-channels passes and the related-outliers pass, and no channel in it sits inside the skill's 0.3x to 3x band. The skill's "widen to semester" rule does not help with this; a size floor scaled to the seed, or using the related-outliers channels as the set, would.
- Monetization and audience fields were present on channel hits (Pro account); the "AdSense / sponsored" column for channels that came from the outliers pass reads `channelMonetization.adsense` from that hit, and sponsorship is only shown where `detections.sponsored.detected` was available on a channel hit.
- Promise rungs are the agent's reading of titles, not a tool field.
- Credits measured: the account balance fell from 884 to 805 across this run and the two sibling example runs (monetization-research and sponsorship-prospecting) executed in the same session, 79 credits in total against 42 at the list prices in the data-layer skill; see the sponsorship example's caveats.
