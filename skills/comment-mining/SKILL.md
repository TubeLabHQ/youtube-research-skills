---
name: comment-mining
description: Voice-of-audience report from the top comments on YouTube videos, read through TubeLab. Collects comments from 3 to 10 videos, classifies them into questions, objections, requests, praise with the reason, corrections and the audience's own words, keeps every quote verbatim, and turns the questions into video ideas. Use when asked what the audience is asking, what people complain about under these videos, what viewers want next, comment analysis, audience language for a script or ad, or ideas from comments. Free unless the videos must be found first. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.0"
  requires: tubelab-mcp
  credits: "0-2 per run (comment reads are free; one search_outliers at 2 only when the videos must be found)"
  plan: starter
---

# Comment mining

What the audience says, in its own words. Comments are the cheapest research TubeLab offers: reads are free, and the top 100 under a strong video hold the questions people paid attention to ask. The output is a voice-of-audience report that keeps every quote verbatim and ends in five video ideas that answer the questions.

- Use for: "what are people asking under these videos", "what do viewers complain about", "what should I make next based on comments", "audience language for my script or ad", "mine the comments on @channel".
- Not for: why a video performed (`outlier-research`), the video's structure and hook (`transcript-intelligence`), ideas without the audience's words (`video-ideation`).

## Inputs (ask only for what is missing)

| Input | Default |
|---|---|
| Videos | 3 to 10 video IDs or URLs; or a channel (its recent videos); or a topic (one outlier search) |
| Focus | none; or one of questions, objections, requests, vocabulary |
| Language | the videos' language; quotes stay in it |

## Credit budget

Say before the first paid call, only when a search is needed: "About 2 credits: one outlier search to find the videos; comment reads are free." With video IDs or a channel the run is free, and say so.

## Workflow

1. **Collect the videos.** From URLs, extract the 11-character IDs. From a channel, `get_channel_videos` (free) and take the 5 to 8 most recent with the highest `statistics.averageViewsRatio`; from a topic, one `search_outliers` with `query: ["<topic>"]`, `publishedAtFrom: "trimester"`, `sortBy: "averageViewsRatio"`, `classificationQuality: "neutral"`, `size: 20`, deduped to max 2 per `snippet.channelId`, take the top 5 to 8. Never run a second search; ask for IDs instead.
2. **Read the comments (free).** `get_video_comments` per video: `items[0].comments[]` with `authorText`, `text`, `likeCount`, `publishedAt`, `authorIsChannelOwner`, and `statistics.count`. "Failed Dependency" or "No comments found" means comments are disabled: record "no data" for that video and move on. Skip the owner's own comments when counting audience voice. Dedupe on author plus text before counting: payloads repeat entries, and `statistics.count` can be 2 to 3 times the unique number.
3. **Classify every comment** into: question (what they want to know), objection (disagreement, doubt, "this doesn't work because"), request ("do a video on", "part 2", "show how"), praise with the reason (what exactly they valued), correction (a factual fix, often the most expert viewers), vocabulary (recurring words, slang, how they name the problem). One comment can carry two labels. Weight by `likeCount`: a question with 400 likes is 400 people asking.
4. **Count and cluster.** Merge questions that ask the same thing and keep the best-worded verbatim as the label. Rank clusters by the sum of likes, then by count across videos; a cluster present under 3 or more videos is a theme, one video is a local reaction.
5. **Pick 10 verbatims worth quoting:** exact text, author handle, likes, video. Prefer comments that state a problem in a full sentence, name a number, or contradict the video. Never trim a quote in a way that changes its claim.
6. **Vocabulary list.** The words and phrases the audience uses that the creator does not: how they name the problem, the product, the fear, the goal. These go into titles, hooks and ad copy as they are.
7. **Five video ideas,** each answering a top question or objection: title under 60 characters, the cluster it answers with its like count, and the verbatim that proves the demand.

## Output

```markdown
# Voice of audience: <channel, topic or video set>
Run: <date> · Videos read: <n> (<n> with comments disabled) · Comments read: <n> · Credits used: <0 | 2>
Videos: channel (handle) · title verbatim · views · ratio · date (one line each)

## 1. Top questions
| # | Question (best verbatim) | Likes (sum) | Count | Videos (n) |

## 2. Objections and corrections
| # | Objection or correction (verbatim) | Likes | Author | Video |

## 3. Requested videos
- "<verbatim request>" · likes · author · video

## 4. Ten verbatims worth quoting
1. "<exact text>" · @author · <likes> likes · <video title>

## 5. Audience vocabulary
- <word or phrase> · <how they use it> · seen <n> times

## 6. Five video ideas
| # | Title (<60 chars) | Answers | Likes behind it | Proof verbatim |

## 7. Caveats
Top comments skew positive and recent · likes measure attention, not purchase intent · comments disabled on <n> videos
```

## Pitfalls

- Top comments are sorted by engagement, so they overweight jokes and praise. Say so; do not read a quiet comment section as a happy one.
- A paraphrase that sharpens a comment is fabrication. Quote, then interpret in a separate sentence.
- The creator's own replies are not audience voice; exclude `authorIsChannelOwner`.
- One video's comments reflect that video's title. Themes need 3 or more videos.
- Comments disabled or an error is "no data" for that video, not a finding about the audience.
- Never invent a comment, an author or a like count.

## Example prompts

- "What are people asking under the top 5 videos on @mychannel?"
- "Mine the comments on these three videos for objections I should answer in my next script: <urls>"
- "What words does the home security audience use for 'burglar'? Pull it from comments on recent outliers."
