---
name: reverse-engineer-niche
description: Use when the user wants to reverse engineer a YouTube niche, or a channel's competitors, into its outliers, the patterns, titles, thumbnails, hooks and scripts that win, the versions that flop, and how a channel compares. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "2.0"
  requires: tubelab-mcp
---

# Reverse Engineer Niche

## Overview

A niche taken apart through 12 to 20 channels, emerging ones first (3K to 300K subscribers): its outliers, winning patterns, title, thumbnail, hook and script formulas, and what flops. Five lenses:

- **Working formats:** a new video must first fit the format and length viewers already watch together.
- **New and specific:** new enough to stop a scroll, specific enough to feel real: a price, a job, a place. Flops tend to be familiar and general.
- **Anchors:** names, brands, tools or terms that tell YouTube which viewers to send.
- **Dead versions:** a winner's promise that flopped.
- **Who can copy it:** anyone, or only someone with its asset: life experience, insider trust, credentials, a hard skill, fame or budget.

Not for last month's winners (`trend-report`), one channel (`reverse-engineer-channel`), whether to enter (`niche-validator`) or new niches (`niche-finder`).

## Workflow

1. Given a channel, sample its competitors.
2. Use up to 15 searches, never paging one. Six to eight on channels: the niche in different phrasings, for emerging and for established channels, and similar channels of different breakouts or the given channel. Three or four on outliers, to find channels not yet sampled.
3. Verify each channel with a free read: on topic, long videos, the user's language. English titles can hide Hindi audio. Keep 12 to 20.
4. Take each channel's median over its last three months of long videos. Winners are its top three at twice that or more. Flops are under half, older than a month, and trail the videos around them. Use one set of totals everywhere.
5. View every winner's thumbnail on contact sheets, and each flop you cite.
6. Group winners into three to five patterns, each on three or more channels. Explain each winner against its channel's normal videos.
7. Count title formulas and thumbnail compositions across all winners and flops.
8. Read the first 30 seconds of ten or more winners on different channels. Name beats in words that fit any video: setup, stakes, twist. A hook formula is an order of beats two or more channels share.
9. Read the full transcripts of four to six top winners from different patterns. Mark each beat and its time. A structure is a layout two or more share.
10. For each pattern, pick two or three dead versions, with a reason.
11. Count the tools, names and words in winning titles against the flops. Hyped: winners on three or more channels. Worn out: as common in flops.
12. Given a channel, find up to three gaps: patterns its competitors win with that it skips.

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
{About 3,500 words outside the collapsed proof. If it runs long, cut whole items, never proof.}
<h1>🧭 Reverse Engineering: {niche, or competitors of <a href="{url}">{channel}</a>}</h1>
<p class="mut">{run date} · {n} channels ({n} emerging, {n} established) · {n} winners and {n} flops counted, {n} videos cited</p>

<h2>🧭 The Niche</h2>
<p>{One or two plain sentences: what the niche is and who watches it.}</p>
<ul>
  <li><strong>What wins:</strong> {one sentence, with numbers}</li>
  <li><strong>Start with:</strong> {the one pattern to make first, and why}</li>
  <li><strong>Format:</strong> {the format the winners share}</li>
  <li><strong>Length:</strong> {usual length of the winners}</li>
  <li><strong>Where to differ:</strong> {one sentence}</li>
</ul>
<details class="row">
  <summary><span>The sample: {n} channels<small>medians cover each channel's last three months of long videos{; the given channel is in bold}</small></span></summary>
  <table>
    <tr><th>Channel</th><th>Type</th><th class="n">Subs</th><th class="n">Median views</th><th class="n">Median per sub</th></tr>
    <tr{ class="me" for the given channel}><td><a href="{url}">{channel}</a></td><td>{emerging or established}</td><td class="n">{subs}</td><td class="n">{views}</td><td class="n">{ratio}</td></tr>
  </table>
  <p class="mut">{Channels left out and why, one line, if any.}</p>
</details>

<h2>🚀 Outliers</h2>
<p class="mut">{n} winners with the highest ratio to their own channel's median, at most two per channel.</p>
<div class="vids">
  <a href="{video url}"><img src="{320px mqdefault.jpg}" alt="">{title} · {channel} · {views}, {ratio}x, {date}</a> {9 to 12}
</div>
<details class="row">
  <summary><span>Why each broke out<small>against its own channel's normal videos</small></span></summary>
  <div class="proof"><ul>
    <li><a href="{url}">{channel}</a> · <a href="{video url}">{title}</a> · {views, ratio, date} · {why it likely beat this channel's normal videos}</li>
  </ul></div>
</details>

<h2>🧩 Patterns That Work</h2>
<h3>{n}. {Pattern name} · {n} winners on {n} channels</h3>
<div class="vids">{three winners from different channels, as in Outliers}</div>
<ul>
  <li><strong>Angle:</strong> {the promise to the viewer}</li>
  <li><strong>New and specific:</strong> {what is new, and what makes it feel real}</li>
  <li><strong>Packaging:</strong> {title formula {n} · thumbnail {n} · hook {n}, numbered as below}</li>
  <li><strong>Who can copy it:</strong> {anyone, or needs their asset: which one}</li>
</ul>
<details class="row">
  <summary><span>Proof: {n} of the {n} winners<small>why each won</small></span></summary>
  <div class="proof"><ul>
    <li><a href="{url}">{channel}</a> · <a href="{video url}">{title}</a> · {views, ratio to its median, date} · {why it likely won}</li>
  </ul></div>
</details>

<h2>✍️ Title Formulas</h2>
<p class="mut">Counted in all {n} winners and {n} flops. {8 to 12 formulas.}</p>
<details class="row {high, or low when worn out}">
  <summary><i></i><span>{n}. "{formula, every slot in square brackets}"<small>{n} winners on {n} channels · {n} flops · e.g. <a href="{video url}">{example title}</a> · {ratio}</small></span><b>{Worn out, or nothing}</b></summary>
  <div class="proof"><ul>
    <li>{winner or flop} · <a href="{url}">{channel}</a> · <a href="{video url}">{title}</a> · {views, ratio}</li> {every winner using it, then up to four flops}
  </ul></div>
</details>

<h2>🖼️ Thumbnails That Work</h2>
<p class="mut">All {n} winner and {n} flop thumbnails viewed.</p> {Four to six compositions, by layout, face, text, colour and objects.}
<h3>{n}. {Composition name} · {n} winners on {n} channels · {n} flops</h3>
<div class="vids">{two or three winners using it, as in Outliers}</div>
<ul>
  <li><strong>Formula:</strong> {the parts a viewer can point at, each in square brackets, such as "[face, shocked, right] + [price in yellow, left]"}</li>
  <li><strong>Text and colour:</strong> {how many words, what they say, the main colours}</li>
  <li><strong>Why it likely works:</strong> {one sentence}</li>
</ul>

<h2>🎣 Hook Formulas</h2>
<h3>{n}. {Formula name} · {n} of {n} openings read, on {n} channels</h3>
<ul>
  <li><strong>Structure:</strong> {beat} → {beat} → {beat}, in the first {n} seconds</li>
  <li><strong>Who can copy it:</strong> {anyone, or needs their asset: which one}</li>
</ul>
<details class="row">
  <summary><span>Examples: {n} openings<small>word for word</small></span></summary>
  <div class="proof"><ul>
    <li><a href="{url}">{channel}</a> · <a href="{video url}&t=0s">{title}</a> · {views, ratio}<blockquote><strong>{Beat}:</strong> "{its words}"</blockquote></li>
  </ul></div>
</details>

<h2>📜 Script Structures</h2>
<h3>{n}. {Structure name} · {n} of {n} scripts read</h3>
<ul>
  <li><strong>Layout:</strong> Hook 0:00 → {beat} {share of runtime} → ... → {ending}</li>
  <li><strong>Main payoff:</strong> {where it lands, as a share of the runtime, and what it is}</li>
  <li><strong>What repeats:</strong> {the device the scripts reuse, and how often}</li>
</ul>
<details class="row">
  <summary><span>Example: {title}<small>{channel} · {views, ratio, length}</small></span></summary>
  <table>
    <tr><th>Time</th><th>Beat</th><th>What happens</th></tr>
    <tr><td><a href="{video url}&t={seconds}s">{m:ss}</a></td><td>{beat}</td><td>{a few words}</td></tr>
  </table>
</details>

<h2>🔥 Hyped Topics And Power Words</h2>
<p class="mut">Counted in the titles of all {n} winners and {n} flops.</p>
<h3>Hyped topics</h3>
{Tools, products, names and ideas in winning titles on three or more channels, most channels first. Then one line naming those on two channels only.}
<details class="row {high, or low when worn out}">
  <summary><i></i><span>{topic}<small>{n} winners on {n} channels · {n} flops</small></span><b>{Worn out, or nothing}</b></summary>
  <div class="proof"><ul>
    <li>{winner or flop} · <a href="{url}">{channel}</a> · <a href="{video url}">{title}</a> · {views, ratio}</li> {every winner, then up to eight flops}
  </ul></div>
</details>
<h3>Power words</h3>
{Words or phrases in winning titles on two or more channels, such as a condition, a dollar figure or a day count, as rows like the topics.}

<h2>🚫 What To Avoid</h2>
<ul><li><strong>What the flops share:</strong> {one sentence}</li></ul>
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
<div class="vids">{one or two competitor winners, as in Outliers}</div>
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

- File: `reverse-engineer-niche-{niche-slug or handle}.html`, or an artifact. Chat: the top finding and the file.
- Language: plain and short. State causes as likely, never as fact.
- Bullets: one fact each, under 25 words, except quotes, titles, formulas and prompts.
- Links: every video, channel and moment, from IDs and handles in the data.

## Common Pitfalls

- Do not call one channel's hits a pattern or formula. One viral video proves the idea, not the channel.
- Do not sell a pattern seen only on established channels to a new channel. It may ride on trust.
- Do not keep a channel because a search returned it. Hits are often off-topic, off-language or Shorts-only.
- Do not count last month's uploads as flops. They are still collecting views.
- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, except a lookup by handle.
