---
name: reverse-engineer-niche
description: Use when the user wants to reverse engineer a YouTube niche, or a channel's competitors, into the patterns that work and the ones that flop, and see how a channel compares. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "1.1"
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
2. Use up to 10 searches, never paging one. Recent outliers from emerging channels are the best source: read the channels behind them. Add channel searches in other phrasings with average views at or above subscribers, similar channels of the best finds or the given channel, and channels you know.
3. Verify each channel with a free read: on topic, long videos, the user's language. English titles can hide Hindi or French audio, so check one video's audio. Add established channels only when under 10 emerging ones hold up.
4. Take each channel's median over its last three months of long videos. Winners are its top two or three at twice that or more. Flops are under half and older than a month. An older flop must also trail the videos around it.
5. Group winners into three to five patterns, each on three or more channels. Explain each winner against its own channel's normal videos.
6. For each pattern, pick two or three dead versions from the flops: same promise, few views. The strongest repeats its own channel's winning package. Give each a reason.
7. Count the tools, names and words repeating in winning titles across channels, against the flops. Hyped: winners on three or more channels. Worn out: as common in flops.
8. View every thumbnail you cite. Read the first 30 seconds of each cited winner.
9. Given a channel, find up to three gaps: patterns its competitors win with that it skips or loses with.

## Output Format

One HTML page from this template, style block unchanged.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Reverse Engineering: {niche, or competitors of channel}</title>
<style>
:root{--bg:#fff;--fg:#1c1c1c;--mut:#666;--line:#e3e3e3;--low:#d42a2a;--med:#c26a00;--high:#0c8a4d}
@media(prefers-color-scheme:dark){:root{--bg:#0f0f0f;--fg:#f1f1f1;--mut:#9a9a9a;--line:#2b2b2b;--low:#ff4e42;--med:#ffa400;--high:#3ddc97}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,sans-serif}
main{max-width:920px;margin:auto;padding:32px 16px 72px}
a{color:inherit}
h1{font-size:24px;margin:0}
h2{font-size:19px;margin:44px 0 6px}
h3{font-size:16px;margin:28px 0 4px}
.mut{color:var(--mut)}
.low{--c:var(--low)}.med{--c:var(--med)}.high{--c:var(--high)}
.row i{flex:none;display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--c)}
.row{border-bottom:1px solid var(--line)}
.row>summary{display:flex;align-items:center;gap:12px;padding:13px 0;cursor:pointer;list-style:none}
.row>summary::-webkit-details-marker{display:none}
.row>summary::after{content:"+";color:var(--mut);width:12px;text-align:center}
.row[open]>summary::after{content:"\2212"}
.row span{flex:1}
.row b{flex:none;color:var(--c)}
.row small{display:block;font-size:13px;color:var(--mut)}
.proof{padding:0 24px 18px 22px}
.proof p{margin:6px 0}
.proof ul{margin:6px 0;padding-left:20px}
.proof li{margin:4px 0}
.vids{display:flex;gap:14px;flex-wrap:wrap;margin:10px 0}
.vids a{width:200px;font-size:13px;line-height:1.35;text-decoration:none}
.vids img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:8px;margin-bottom:6px;background:var(--line)}
blockquote{margin:10px 0;padding-left:12px;border-left:3px solid var(--line);color:var(--mut)}
ol,ul{padding-left:22px}
li{margin:12px 0}
table{border-collapse:collapse;width:100%;margin-top:12px;font-size:15px}
td,th{text-align:left;vertical-align:top;padding:10px 12px 10px 0;border-bottom:1px solid var(--line)}
.n{text-align:right}
.me td{font-weight:700}
@media(max-width:480px){table{font-size:13px}td,th{padding-right:6px}}
</style>
</head>
<body>
<main>
{About 1,500 words. If it runs long, cut whole items, never proof.}
<h1>🧭 Reverse Engineering: {niche, or competitors of <a href="{url}">{channel}</a>}</h1>
<p class="mut">{run date} · {n} channels ({n} emerging, {n} established) · {n} winners · {n} flops cited</p>
<ul>
  <li><strong>What wins:</strong> {one sentence, with numbers}</li>
  <li><strong>Start with:</strong> {the one pattern to make first, and why}</li>
</ul>

<h2>📺 Working Formats</h2>
<ul>
  <li><strong>Format:</strong> {the format the winners share}</li>
  <li><strong>Length:</strong> {usual length of the winners}</li>
  <li><strong>Where to differ:</strong> {one sentence}</li>
</ul>

<h2>👥 The Sample</h2>
<p class="mut">Medians cover each channel's last three months of long videos. {Given a channel: its row is in bold.}</p>
<table>
  <tr><th>Channel</th><th>Type</th><th class="n">Subs</th><th class="n">Median views</th><th class="n">Median per sub</th></tr>
  <tr{ class="me" for the given channel}><td><a href="{url}">{channel}</a></td><td>{emerging or established}</td><td class="n">{subs}</td><td class="n">{views}</td><td class="n">{ratio}</td></tr>
</table>
<p class="mut">{Channels left out and why, one line, if any.}</p>

<h2>🧩 Patterns That Work</h2>
{Three to five patterns. Each shows three winners from different channels.}
<h3>{n}. {Pattern name} · {n} winners on {n} channels</h3>
<div class="vids">
  <a href="{video url}"><img src="{320px mqdefault.jpg}" alt="">{title} · {views, ratio, date}</a>
</div>
<ul>
  <li><strong>Title formula:</strong> "{pattern with every slot in square brackets}"</li>
  <li><strong>Thumbnail:</strong> {the parts a viewer can point at, each in square brackets}</li>
  <li><strong>Hook:</strong> {the order of beats, such as claim → proof → promise}</li>
  <li><strong>Angle:</strong> {the promise to the viewer}</li>
  <li><strong>Anchors:</strong> {the hyped topics and power words it uses}</li>
  <li><strong>New and specific:</strong> {what is new, and what makes it feel real}</li>
  <li><strong>Who can copy it:</strong> {anyone, or needs their asset: which one}</li>
</ul>
<details class="row">
  <summary><span>Proof: {n} winners<small>why each won, and its first lines</small></span></summary>
  <div class="proof">
    <ul>
      <li><a href="{url}">{channel}</a> · <a href="{video url}">{title}</a> · {views, ratio to its median, date} · {why it likely beat this channel's normal videos}
        <blockquote>"{first lines, word for word}"</blockquote></li>
    </ul>
  </div>
</details>

<h2>🔥 Hyped Topics And Power Words</h2>
<p class="mut">Counted in the titles of all {n} channels' last three months: their top winners ({n}) against every flop ({n}).</p>
<h3>Hyped topics</h3>
{Tools, products, names and ideas in winning titles on three or more channels, most channels first. Mark one worn out when flops use it as often as winners. Then one line naming those on two channels only.}
<details class="row {high, or low when worn out}">
  <summary><i></i><span>{topic}<small>{n} winners on {n} channels · {n} flops</small></span><b>{Worn out, or nothing}</b></summary>
  <div class="proof">
    <ul>
      <li>{winner or flop} · <a href="{url}">{channel}</a> · <a href="{video url}">{title}</a> · {views, ratio}</li> {every winner, then up to eight flops}
    </ul>
  </div>
</details>
<h3>Power words</h3>
{Words or phrases in winning titles on two or more channels, such as a condition, a dollar figure or a day count. Mark one worn out when flops use it as often as winners.}
<details class="row {high, or low when worn out}">
  <summary><i></i><span>"{word or phrase}"<small>{n} winners on {n} channels · {n} flops</small></span><b>{Worn out, or nothing}</b></summary>
  <div class="proof">
    <ul>
      <li>{winner or flop} · <a href="{url}">{channel}</a> · <a href="{video url}">{title}</a> · {views, ratio}</li> {every winner, then up to eight flops}
    </ul>
  </div>
</details>

<h2>🚫 What To Avoid</h2>
<ul>
  <li><strong>What the flops share:</strong> {one sentence}</li>
</ul>
<h3>{Pattern name}: dead versions</h3>
<details class="row low">
  <summary><i></i><span><a href="{video url}">{title}</a><small><a href="{url}">{channel}</a> · {views, ratio to its median, date}</small></span><b>{Too familiar, Too general, Wrong anchor or Wrong format}</b></summary>
  <div class="proof">
    <p>{the reason, one line}</p>
    <div class="vids"><a href="{video url}"><img src="{320px mqdefault.jpg}" alt="">{title}</a></div>
  </div>
</details>

{Given a channel only.}
<h2>🎯 Gaps To Win</h2>
<h3>{n}. {Gap}</h3>
<div class="vids">
  <a href="{video url}"><img src="{320px mqdefault.jpg}" alt="">{title} · {views, ratio, date}</a>
</div>
<ul>
  <li><strong>Proof:</strong> <a href="{url}">{channel}</a> · <a href="{video url}">{title}</a> · {views, ratio, date}</li>
  <li><strong>Why it fits:</strong> {one sentence}</li>
</ul>
<h3>Overall</h3>
<ul>
  <li><strong>Copy:</strong> {one sentence}</li>
  <li><strong>Avoid:</strong> {one sentence}</li>
  <li><strong>Positioning:</strong> {one sentence}</li>
</ul>

<h2>🧠 Next Steps</h2>
<ol>
  <li><strong>{What to do}</strong> · <code>{skill}</code><br><span class="mut">"{a prompt to paste, with [square brackets] for what the user fills in}"</span></li>
</ol>
</main>
</body>
</html>
```

- File: `reverse-engineer-niche-{niche-slug or handle}.html`, or an artifact.
- Chat: the top finding, the sample mix and the file.
- Language: plain and short. State causes as likely, never as fact.
- Bullets: one fact each, under 25 words, except quotes, verbatim titles, formulas and prompts.
- Links: every video and channel, from IDs and handles in the data.

## Common Pitfalls

- Do not call one channel's hits a pattern. One viral video on a tiny channel proves the idea, not the channel.
- Do not sell a pattern seen only on established channels to a new channel. It may ride on viewers who already trust them.
- Do not keep a channel because a search returned it. Hits are often off-topic, off-language or Shorts-only.
- Do not count last month's uploads as flops. They are still collecting views.
- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, except a lookup by handle.
