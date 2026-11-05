# Filter recipes by intent

Every recipe starts from the two non-negotiables: a recency window (`publishedAtFrom`) and a Content Authenticity floor (`classificationQuality`). Add the rest one filter at a time. If a recipe returns under 5 hits, widen recency first (month → trimester → semester → year), then remove the most specific filter. Never remove `classificationQuality`.

## The slop list

Use on `search_channels` as `excludeNiche` and on `search_outliers` as `excludeKeyword`:

```
["music", "song", "lofi", "movies", "trailer", "compilation", "kids", "nursery", "news", "politics", "lingerie", "haul", "asmr", "reaction", "live stream"]
```

Trim it to the niche: a music-education research run keeps "music". Add the user's own exclusions.

## Recent momentum (what is working now)

```
search_outliers { query: ["<topic>"], publishedAtFrom: "month", sortBy: "averageViewsRatio", averageViewsRatioFrom: 3, classificationQuality: "neutral", language: ["en"], excludeKeyword: [...slop], size: 20 }
```

Widen to `trimester` if thin. Dedupe by `snippet.channelId` (max 2 per channel) before reading patterns.

## The app's default views (unbiased sample)

Niche Finder default view:

```
search_channels { query: ["<topic>"], subscribersFrom: 1, medianViewsFrom: 1000, videosCountFrom: 2, classificationQuality: "neutral", publishedAtFrom: "trimester", excludeNiche: [...slop], seed: "<fixed>", size: 20 }
```

Outliers Finder default view:

```
search_outliers { query: ["<topic>"], viewCountFrom: 5000, type: "video", classificationQuality: "neutral", publishedAtFrom: "trimester", seed: "<fixed>", size: 30 }
```

No `sortBy` on either: results come in seeded-random order, which is what the app shows on first load. Use these when you want "what exists" rather than "what is biggest".

## Small channels punching above their size

```
search_channels { query: ["<topic>"], subscribersTo: 50000, averageViewsFrom: 10000, avgViewsToSubscribersRatioFrom: 1, publishedAtFrom: "trimester", classificationQuality: "neutral", sortBy: "avgViewsToSubscribersRatio" }
```

Ratio above 1 means the algorithm is pushing the channel beyond its subscriber base.

## New entrants (how fast can a new channel grow here)

```
search_channels { query: ["<topic>"], joinedDateFrom: "semester", medianViewsFrom: 1000, publishedAtFrom: "trimester", classificationQuality: "neutral", sortBy: "foundAt" }
```

`joinedDateFrom` is channel creation; `sortBy: "foundAt"` surfaces channels TubeLab discovered most recently. A niche where channels under 6 months old already clear 1K median views is open.

## Faceless only / on camera only

Add `classificationIsFaceless: true` or `classificationIsOnCamera: true` to any channel or outlier search. Faceless flags are predictions; confirm on the `videos[]` thumbnails when it matters.

## Money signals (Pro data)

Proven AdSense:

```
search_channels { ..., monetizationAdsense: true, revenueMonthlyEstimationFrom: 1000, subscribersFrom: 1000 }
```

Brand-friendly (sponsored or affiliate already present):

```
search_channels { ..., detectionsMonetization: ["sponsored", "affiliate"] }
```

Untapped (no sponsors yet, healthy views):

```
search_channels { ..., monetizationSponsored: false, medianViewsFrom: 20000 }
```

Monetization flips (lost or gained AdSense recently):

```
search_channels { ..., monetizationChanged: true, sortBy: "monetizationChangedAt" }
```

Treat revenue and RPM as bands: report `revenueMonthlyEstimationFrom` to `...To`, never a single number.

## First-world audience (Pro data)

```
search_channels { ..., audienceRegion: ["021", "154", "155", "053"], audienceAgeFrom: 35, audienceDominantIncome: ["upper_middle", "high"] }
```

Older, higher-income audiences in Northern America, Northern and Western Europe, Australia and New Zealand carry the best RPMs. Prefer this over filtering on `rpmEstimationFrom`, which is less reliable outside those regions.

## Consistent performers (not one-hit channels)

```
search_channels { ..., viewVariationCoefficientTo: 1, medianViewsFrom: 5000, sortBy: "viewVariationCoefficient", sortOrder: "asc" }
```

Outlier counts are not filters; read `positiveOutliersCount` from each hit. Low variation coefficient means views are steady video to video; good for "can I replicate this" questions. High coefficient with many positive outliers means a format-driven channel where single videos carry it.

## Title formula in the wild

```
search_outliers { titlePattern: "*for 30 days*", publishedAtFrom: "semester", classificationQuality: "neutral", sortBy: "averageViewsRatio" }
```

Take `pattern` from a `search_trending_formats` hit and paste it in. The pattern must contain `*` and at least two letters.

## Thumbnail twins (thumbnail research)

```
search_related_outliers { thumbnailVideoId: "<video id>", publishedAtFrom: "semester", classificationQuality: "positive", size: 24 }
```

Always `positive` here: only high-authenticity channels teach a thumbnail lesson worth copying. Then `search_related_outliers { title: ["<the same video's title>"] }` for topic twins to compare against the visual twins.

## Shorts

Channels: `contentKind: "short-form"` plus `filterBy: "short"` so the range filters read the Shorts statistics. Outliers: `type: "short"`. Monetization filters are less accurate on Shorts-only channels.

## Other-language markets

Rerun the same search with `language: ["fr"]`, `["de"]`, `["es"]`, `["pt"]` and compare `pagination.total` and median views. A niche with 40 English channels and 2 French ones is a market-transplant candidate.

## Terminated channels (what gets channels killed)

```
search_channels { query: ["<topic>"], terminated: true, size: 20 }
```

Use for risk notes in a niche brief, not for ideas.
