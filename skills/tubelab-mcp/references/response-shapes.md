# Response shapes: the fields that matter

Verified against live responses. Fields not listed exist but rarely matter for research. All search responses share `pagination: { total, from, size }` and `hits[]`.

## search_channels / search_related_channels hit

```
id                                   channel ID (use for get_channel, relatedChannelId)
time                                 when TubeLab last indexed it
language                             "en"
snippet.title, snippet.handle        "Ed Brannigan", "@EdBrannigan"
snippet.contentKind[]                ["video", "long-form"] or ["short", "short-form"]
snippet.thumbnails.high.url          channel avatar
semantic.niches[]                    ["home security", "crime prevention", ...]   <- cluster on this
semantic.description                 one-line AI summary of the channel
classification.quality               "positive" | "neutral" | "negative"   (Content Authenticity)
classification.isFaceless, isOnCamera
statistics.subscriberCount
statistics.videosCount, videosSampleCount
statistics.averageViewsEstimate      inflated by outliers; prefer median
statistics.medianViewsEstimate       <- demand signal
statistics.avgViewsToSubscribersRatio  above 1 = algorithm pushing beyond subs
statistics.viewVariationCoefficient  lower = steadier; >1.5 = hit-driven
statistics.positiveOutliersCount, negativeOutliersCount
statistics.viewCountMonthlyEstimate  rough 28-day views
statistics.lastPublishedAtEstimate, oldestParsedPublishedAtEstimate
statistics.joinedDateEstimate        channel creation date (age)
statistics.viewCountAllTime, viewsPerHourEstimate
monetization.adsense                 true/false/null
monetization.revenueMonthlyEstimationFrom / To   USD band (estimate)
monetization.rpmEstimationFrom / To  USD per 1000 views band (estimate)
monetization.monetizationChangedAt   ISO date when AdSense state flipped, else null
detections.<type>.detected           adsense, sponsored, affiliate, product, donations, course, newsletter, community, services, madeWithAI, forKids
audience.dominant                    { region: "021", age: "55-64", gender: "male", income: "middle" }
audience.significant                 { regions: [...], ageRanges: [...] }
videos[]                             up to 4 recent videos: id, title, viewCount, duration, publishedAtEstimate, thumbnails, statistics.isPositiveOutlier
shorts[]                             same for Shorts
```

Pro-only fields (`monetization`, `audience`, `detections`) can be missing on Starter accounts. The `sponsored` boolean inside `monetization` is stripped on the public API; read `detections.sponsored.detected` instead.

## search_outliers / search_related_outliers hit

```
id                                   video ID (use for get_video, thumbnailVideoId)
kind                                 "video" | "short"
time                                 indexed at
snippet.title                        verbatim title   <- quote exactly
snippet.channelId, channelTitle, channelHandle, channelSubscribers
snippet.publishedAt                  ISO date
snippet.duration                     seconds
snippet.language
snippet.thumbnails.high.url          1280x720 maxres when available
snippet.sentiment                    { sentiment, subSentiment } or null
snippet.monetization                 video revenue/RPM band (estimate, often 0 on tiny channels)
snippet.channelMonetization          channel adsense + revenue/RPM bands
statistics.viewCount, likeCount, commentCount
statistics.averageViewsRatio         views / channel average   <- rank on this
statistics.zScore                    standard deviations above channel mean
statistics.isPositiveOutlier, isNegativeOutlier
classification.quality, isFaceless, isOnCamera
```

A 3x ratio on a 20-subscriber channel and a 3x ratio on a 2M-subscriber channel are both outliers. Always report `channelSubscribers` next to the ratio so the reader can weigh it.

## search_trending_formats hit

```
id                                   "*the*&*setup*"
framework                            "The [X] & [Y] Setup"     <- the reusable template
pattern                              "*The*&*Setup*"           <- feed to search_outliers.titlePattern
language, quality
clickTrigger[]                       ["curiosity", "open loop"]
time                                 first found
overall_stats.doc_count              videos using it (volume)
overall_stats.overall_avg_views_ratio   mean outlier ratio of those videos
overall_stats.overall_avg_z_score
overall_stats.overall_median_views, overall_avg_views, overall_avg_duration
videos[]                             { id, title } examples (mixed niches)
```

Momentum fields (`lastVideosCountChangePercentage`, `lastAvgViewsRatioChangePercentage`) are available as sort keys and filters; the hit exposes the aggregate stats above.

## get_channel / get_channel_videos / get_channel_shorts

```
id, time
item.snippet.title, handle, description, keywords, thumbnails
item.statistics.subscriberCount, videosCount, videosSampleCount
item.statistics.averageViewsEstimate, medianViewsEstimate, standardDeviationViewsEstimate
item.statistics.viewVariationCoefficient, avgViewsToSubscribersRatio
item.statistics.positiveOutliersCount, negativeOutliersCount
item.statistics.viewCountMonthlyEstimate, averageVideoDurationEstimate
item.statistics.lastPublishedAtEstimate, oldestParsedPublishedAtEstimate
item.videos[] (up to 120, newest first)
  id, title, viewCount, duration, publishedAtEstimate, thumbnails
  statistics.averageViewsRatio, zScore, isPositiveOutlier, isNegativeOutlier
item.shorts[] (get_channel_shorts)
```

This is the raw material for a channel teardown: compute last-4 average, median, decay of repeated formats, and list positive/negative outliers from `videos[]`. The payload is large; summarize it.

## get_video

```
items[0].snippet.title, description, tags[], publishedAt, channelId, channelTitle, duration, defaultAudioLanguage, thumbnails.high.url
items[0].statistics.viewCount, likeCount, commentCount
```

## get_video_transcript

```
items[0].transcript     plain text
items[0].events[]       { startMs, durationMs, endMs, text }
```

Use `events` for "what happens in the first 30 seconds" questions; use `transcript` for topic and promise checks.

## get_video_comments

```
items[0].comments[]     { authorText, text, likeCount, publishedAt, authorIsChannelOwner, ... }
items[0].statistics.count
```

Up to 100 comments. Errors when comments are disabled: treat as no data.

## get_credits_balance

```
results.balance         integer
```
