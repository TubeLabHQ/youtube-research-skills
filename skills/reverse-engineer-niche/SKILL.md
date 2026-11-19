---
name: reverse-engineer-niche
description: Use when the user wants to reverse engineer a YouTube niche, or a channel's competitors, into a guidelines book of its outliers, winning titles, thumbnails, hooks and scripts, the versions that flop, and video ideas. Requires the TubeLab MCP.
license: MIT
metadata:
  author: tubelab
  version: "3.0"
  requires: tubelab-mcp
---

# Reverse Engineer Niche

## Overview

A niche taken apart through 12 to 20 channels, emerging ones first (3K to 300K subscribers), as a niche guidelines book. Five lenses:

- **Working formats:** a new video must fit the format and length viewers already watch.
- **New and specific:** new enough to stop a scroll, specific enough to feel real: a price, a job, a place.
- **Anchors:** names, brands, tools or terms that tell YouTube which viewers to send.
- **Dead versions:** a winner's promise that flopped.
- **Who can copy it:** anyone, or only someone with its asset: experience, trust, credentials, a skill, fame or budget.

Not for last month's winners (`trend-report`), one channel (`reverse-engineer-channel`) or whether to enter (`niche-validator`).

## Workflow

1. First ask once, with any scope question: end with video ideas, for their channel or a new one here?
2. Given a channel, sample its competitors. Up to 15 searches, never paging one: six to eight on channels (niche phrasings, emerging and established, channels similar to breakouts or the given channel), three or four on outliers for unsampled channels.
3. Verify each channel with a free read: on topic, long videos, the user's language. English titles can hide Hindi audio. Keep 12 to 20.
4. Median each channel's last three months of long videos. Winners: its top three at twice that or more. Flops: under half, older than a month, trailing their neighbours. One set of totals everywhere.
5. View every winner's thumbnail on contact sheets, and each flop you cite.
6. Group winners into three to five patterns, each on three or more channels, each winner explained against its channel's normal videos.
7. Count title formulas and thumbnail compositions across winners and flops.
8. Read the opening 30 seconds of ten or more winners on different channels. A hook formula is a beat order, named to fit any video, shared by two or more channels.
9. Read four to six full winning transcripts from different patterns. Mark each beat and its time. A structure is a layout two or more share.
10. Pair dead versions with their winners, same channel when you can, with the reason.
11. Count tools, names and words in winning titles against flops. Worn out: as common in flops.
12. Blend two patterns into an angle no sampled video has filmed.
13. Given a channel, find up to three gaps: patterns its competitors win with that it skips.
14. If wanted, run `video-ideation` with these findings as its input, for the last chapter. Unanswered: offer it in the closing line.

## Output Format

One HTML book from this template, style and script unchanged. Repeat or drop page types as the data allows.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{Niche}: Niche Guidelines</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&amp;display=swap" rel="stylesheet">
<style>
:root{--paper:#000;--bg:#0e0e0e;--card:#1a1a1a;--fg:#f4f4f4;--mut:#9d9d9d;--line:#2e2e2e;--red:#ff4e42;--pw:min(100vw,177.78vh);--u:calc(var(--pw)/100);color-scheme:dark}
@media(prefers-color-scheme:light){:root{--paper:#e2e2e2;--bg:#fff;--card:#f1f1f1;--fg:#141414;--mut:#666;--line:#e0e0e0;--red:#e3241b;color-scheme:light}}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--paper);scroll-snap-type:y mandatory;scrollbar-width:none}
body{background:var(--paper);color:var(--fg);font-family:Archivo,system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;counter-reset:pg;-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}a:hover{text-decoration:underline}
.chapter{display:contents}
.page{position:relative;overflow:hidden;width:var(--pw);height:calc(var(--pw)*.5625);margin-block:calc((100vh - var(--pw)*.5625)/2);padding:calc(var(--u)*3.6) calc(var(--u)*5) calc(var(--u)*5);background:var(--bg);display:flex;flex-direction:column;gap:calc(var(--u)*1.8);scroll-snap-align:center;scroll-snap-stop:always;counter-increment:pg;font-size:calc(var(--u)*1.3);line-height:1.4}
.page::before,.page::after{position:absolute;bottom:calc(var(--u)*1.9);font-size:calc(var(--u)*.85);color:var(--mut);letter-spacing:.04em}
.page::before{content:var(--book) "  ·  " var(--ch);left:calc(var(--u)*5)}
.page::after{content:counter(pg);right:calc(var(--u)*5)}
.k{font-size:calc(var(--u)*.95);font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
h1{font-size:calc(var(--u)*6.4);font-weight:800;line-height:1;letter-spacing:-.02em}
h2{font-size:calc(var(--u)*2.7);font-weight:800;line-height:1.1;letter-spacing:-.01em}
.lead{font-size:calc(var(--u)*1.9);font-weight:600;line-height:1.3}
.big{font-size:calc(var(--u)*4.6);font-weight:800;line-height:1}
.mut{color:var(--mut)}
small{font-size:calc(var(--u)*.95)}
.f{font-size:calc(var(--u)*3.1);font-weight:800;line-height:1.15;letter-spacing:-.01em}
mark{background:none;color:var(--red)}
.fill{flex:1;min-height:0;align-content:space-evenly}
.col.fill{justify-content:space-evenly}
.split{flex:1;min-height:0;display:grid;grid-template-columns:1.2fr 1fr;gap:calc(var(--u)*4);align-items:center}
.col{display:flex;flex-direction:column;gap:calc(var(--u)*1.4);min-width:0}
.g2,.g3{display:grid;gap:calc(var(--u)*1.6);align-content:start}
.g2{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:repeat(3,1fr)}
.kv{display:grid;grid-template-columns:auto 1fr;gap:calc(var(--u)*.9) calc(var(--u)*2);align-content:start}
.kv dt{color:var(--mut);font-size:calc(var(--u)*1);font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding-top:.3em}
.v{display:flex;flex-direction:column;gap:calc(var(--u)*.5);font-size:calc(var(--u)*1.05);line-height:1.3;min-width:0}
.v img,.wall img,.anno img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:calc(var(--u)*.6);background:var(--line)}
.v b{font-size:calc(var(--u)*1.7);font-weight:800;line-height:1}
.v span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.v small{color:var(--mut)}
.one .v span{-webkit-line-clamp:1}
.tight .col{gap:var(--u)}.tight .legend{gap:calc(var(--u)*.5)}.tight .kv{gap:calc(var(--u)*.6) calc(var(--u)*2)}.one small{font-size:calc(var(--u)*.85)}
.v.h{display:grid;grid-template-columns:calc(var(--u)*16) 1fr;gap:calc(var(--u)*1.2);align-items:start}
.v.h>div{display:flex;flex-direction:column;gap:calc(var(--u)*.35)}
.v p{font-size:calc(var(--u)*1.05);line-height:1.35}
.vs{flex:1;min-height:0;display:grid;grid-template-columns:repeat(2,minmax(0,calc(var(--u)*36)));justify-content:space-around;align-content:center;gap:calc(var(--u)*5)}
.vs .v{gap:calc(var(--u)*.8);font-size:calc(var(--u)*1.2)}
.vs .v>div:first-child{display:flex;justify-content:space-between;align-items:baseline}
.vs .v b{font-size:calc(var(--u)*4.2)}
.x{position:relative;display:block}
.x::after{content:"";position:absolute;inset:0;border-radius:calc(var(--u)*.6);box-shadow:inset 0 0 0 calc(var(--u)*.22) var(--red);background:linear-gradient(to top right,transparent 49.4%,var(--red) 49.4% 50.6%,transparent 50.6%),linear-gradient(to top left,transparent 49.4%,var(--red) 49.4% 50.6%,transparent 50.6%)}
.anno{position:relative}
.anno i{position:absolute;border:calc(var(--u)*.22) solid var(--red);border-radius:calc(var(--u)*.5)}
.anno i::before{content:attr(data-n);position:absolute;left:calc(var(--u)*-.22);top:calc(var(--u)*-.22);background:var(--red);color:#fff;font:800 calc(var(--u)*1)/1 Archivo,system-ui,sans-serif;padding:calc(var(--u)*.35) calc(var(--u)*.55);border-radius:calc(var(--u)*.4) 0 calc(var(--u)*.4) 0}
.legend{list-style:none;counter-reset:n;display:flex;flex-direction:column;gap:calc(var(--u)*1)}
.legend li{counter-increment:n;display:flex;gap:calc(var(--u)*1);align-items:baseline}
.legend li::before{content:counter(n);flex:none;background:var(--red);color:#fff;font-weight:800;font-size:calc(var(--u)*.9);width:calc(var(--u)*1.8);height:calc(var(--u)*1.8);border-radius:50%;display:grid;place-items:center;transform:translateY(-.1em)}
.beats{display:flex;flex-wrap:wrap;gap:calc(var(--u)*1) calc(var(--u)*3)}
.beats span{position:relative;border:calc(var(--u)*.14) solid var(--line);border-radius:calc(var(--u)*.6);padding:calc(var(--u)*.7) calc(var(--u)*1.2);font-size:calc(var(--u)*1.7);font-weight:700}
.beats span+span::before{content:"→";position:absolute;left:calc(var(--u)*-2.3);color:var(--mut)}
.q{border-left:calc(var(--u)*.2) solid var(--line);padding-left:calc(var(--u)*1.4);display:flex;flex-direction:column;gap:calc(var(--u)*.5)}
.q p{font-size:calc(var(--u)*1.45)}
.q b{color:var(--mut);font-size:calc(var(--u)*.85);letter-spacing:.1em;text-transform:uppercase;margin-right:.6em}
.gantt{display:grid;grid-template-columns:auto 1fr;gap:calc(var(--u)*.7) calc(var(--u)*1.6);align-items:center;font-size:calc(var(--u)*1.15)}
.gantt div{position:relative;height:calc(var(--u)*1.5);background:var(--card);border-radius:calc(var(--u)*.3)}
.gantt div i{position:absolute;inset-block:0;left:calc(var(--a)*1%);width:max(calc(var(--u)*.6),calc((var(--b) - var(--a))*1%));background:var(--fg);border-radius:calc(var(--u)*.3)}
.gantt .pay i{background:var(--red)}
.chips{display:flex;flex-wrap:wrap;gap:calc(var(--u)*.8);align-content:start}
.chip{border:calc(var(--u)*.12) solid var(--line);border-radius:calc(var(--u)*.8);padding:calc(var(--u)*.6) calc(var(--u)*1.1);font-size:calc(var(--u)*1.15)}
.chip.worn{border-color:var(--red)}.chip.worn b{color:var(--red)}
.tag{font-size:calc(var(--u)*1.05);font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.no .tag{color:var(--red)}
.t{width:100%;border-collapse:collapse;font-size:calc(var(--u)*1.15)}
.t td,.t th{text-align:left;padding:calc(var(--u)*.65) calc(var(--u)*1.2) calc(var(--u)*.65) 0;border-bottom:calc(var(--u)*.08) solid var(--line);vertical-align:top}
.t th{color:var(--mut);font-size:calc(var(--u)*.85);letter-spacing:.1em;text-transform:uppercase}
.chans{display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--u)*.9);align-content:start}
.chans a{background:var(--card);border-radius:calc(var(--u)*.6);padding:calc(var(--u)*.8) calc(var(--u)*1.1);font-size:calc(var(--u)*1);line-height:1.35}
.chans b{display:block;font-size:calc(var(--u)*1.15)}
.chans .me{box-shadow:inset 0 0 0 calc(var(--u)*.15) var(--fg)}
.cover{justify-content:flex-end}
.cover::before{display:none}
.wall{position:absolute;inset:-12% -6% -12% 22%;display:grid;grid-template-columns:repeat(4,1fr);gap:calc(var(--u)*.8);transform:rotate(-8deg);opacity:.75}
.cover .shade{position:absolute;inset:0;background:linear-gradient(90deg,var(--bg) 34%,transparent 75%),linear-gradient(0deg,var(--bg) 4%,transparent 40%)}
.cover>div:last-child{position:relative;display:flex;flex-direction:column;gap:calc(var(--u)*1.4);max-width:60%}
.divider{justify-content:center}
.divider .n{font-size:calc(var(--u)*13);font-weight:800;line-height:.9;color:transparent;-webkit-text-stroke:calc(var(--u)*.12) var(--mut)}
.divider h1{font-size:calc(var(--u)*7)}
code{font-family:ui-monospace,Menlo,monospace;font-size:.9em;background:var(--card);padding:.1em .4em;border-radius:.3em}
@media screen and (max-width:760px){
:root{--pw:100vw;--u:11px}
html{scroll-snap-type:none}
.page{width:100%;height:auto;min-height:0;margin:0 0 10px;padding:28px 16px 48px}
.page::before{left:16px;bottom:16px}.page::after{right:16px;bottom:16px}
.split,.g2,.g3,.vs{grid-template-columns:1fr}.chans{grid-template-columns:1fr 1fr}
.cover{min-height:80vh}h1{font-size:42px}.divider h1{font-size:52px}.cover>div:last-child{max-width:none}.wall{inset:-10% -30% 40% -10%}.cover .shade{background:linear-gradient(0deg,var(--bg) 55%,transparent 90%)}
.divider{min-height:60vh}
.beats{padding-left:28px}
}
@page{size:16in 9in;margin:0}
@media print{:root{--pw:16in}html{scroll-snap-type:none}body{display:block}.page{margin:0;break-after:page}}
</style>
</head>
<body style="--book:'{Niche}: Niche Guidelines'">
{CARD: <div class="v"><a href="{video url}"><img src="https://i.ytimg.com/vi/{id}/hqdefault.jpg" alt=""></a><b>{ratio}×</b><a href="{video url}"><span>{title}</span></a><small><a href="{channel url}">{channel}</a> · {views} views · {date}</small></div>
ROW CARD: the same with class="v h", everything after the image link in one <div>, and <p>{why, one line}</p> last when the page asks for it. FLOP: class="x" on the image link crosses it out.
PAGE: <section class="page"><p class="k">{Chapter · section}</p><h2>{title}</h2>{body}</section>. Each body below is one page. A page that overflows becomes two pages.}
<div class="chapter" style="--ch:'Cover'">
<section class="page cover">
<div class="wall">{16 winners: <a href="{video url}"><img src="{hqdefault}" alt=""></a>}</div><div class="shade"></div>
<div><p class="k">{Competitors of <a href="{url}">{channel}</a> · }{run date}</p><h1>{Niche}:<br><span class="mut">Niche Guidelines</span></h1>
<p class="lead">What wins, what flops and how to make it, from {n} winners and {n} flops.</p>
<p class="mut">{n} channels: {n} emerging and {n} established · {n} videos cited</p></div>
</section>
</div>
<div class="chapter" style="--ch:'Research'">
<section class="page divider"><p class="n">01</p><h1>Research</h1><p class="lead mut">The niche · Working formats · The channels · Outliers · Flops · Patterns</p></section>
{The niche: <div class="split"><div class="col"><p class="lead">{what it is}</p><dl class="kv"><dt>Who watches</dt><dd>{one sentence}</dd><dt>What wins</dt><dd>{with numbers}</dd><dt>Start with</dt><dd>{the pattern to make first, and why}</dd></dl></div><div class="col">{CARD}</div></div>}
{Working formats: the same split. kv: Format, Length, Where to differ. Right: <div class="g2">{four CARDs}</div>}
{The channels, h2 "{n} channels: {n} emerging, {n} established": <div class="chans"><a{ class="me" for the given channel} href="{url}"><b>{channel}</b>{emerging or established} · {subs} subscribers<br><span class="mut">median {views} views · {ratio} per subscriber</span></a></div><p class="mut"><small>Medians cover each channel's last three months of long videos. Left out: {channels and why}.</small></p>}
{Outliers, two pages of six: <div class="g2 fill">{ROW CARDs with why}</div>}
{Flops: <p class="lead">{what the flops share}</p><div class="g2 fill">{six FLOP ROW CARDs with why}</div>}
{One page per pattern, h2 = its name: <p class="mut">{n} winners on {n} channels</p><div class="split"><div class="col"><dl class="kv">{Angle, New and specific, Title (formula, slots in <mark>[ ]</mark>), Thumbnail (composition name), Hook (formula name), Script (structure name, only when read), Who can copy}</dl></div><div class="col">{three ROW CARDs}</div></div>}
</div>
<div class="chapter" style="--ch:'Packaging'">
<section class="page divider"><p class="n">02</p><h1>Packaging</h1><p class="lead mut">A winner at a glance · Title formulas · Words · Thumbnail design</p></section>
{A winner at a glance: <div class="split"><div class="col">{ANNOTATED}</div><div class="col"><p class="f">{its title, the slots in <mark></mark>}</p><p class="mut">{channel · views · date · ratio}</p><dl class="kv">{In the title, In the picture, Always}</dl></div></div>}
{ANNOTATED, boxing what matters on one real thumbnail (face, payout screen, amount, arrow), in percent of the image: <a class="anno" href="{video url}"><img src="{hqdefault}" alt=""><i data-n="1" style="left:{x}%;top:{y}%;width:{w}%;height:{h}%"></i></a><ol class="legend"><li>{what box 1 holds, <strong>words on it</strong>}</li></ol>}
{One page per title formula, no h2: <p class="f">"{formula, slots in <mark>[ ]</mark>}"</p><div class="split"><div class="col"><p><span class="big">{n}</span> winners on {n} channels</p><p><span class="big">{n}</span> flops</p></div><div class="col">{three ROW CARDs}</div></div>}
{More formulas, four a page: <div class="g2 fill"><div class="col"><p class="lead">"{formula}"</p><p class="mut">{counts}</p>{ROW CARD}</div></div>}
{Worn out, two a page: <div class="col"><p class="lead">"{formula}"</p><p class="mut">{counts}</p><div class="g2">{winner ROW CARD}{FLOP ROW CARD}</div></div>}
{Words: <div class="g3 fill"><div class="col" style="grid-column:span 2"><p class="k">Win</p><div class="g2">{CHIPs}</div></div><div class="col"><p class="k">Worn out: as common in flops</p><div class="chips">{CHIPs with class="chip worn"}</div></div></div>
CHIP: <div class="chip"><b>{word or topic}</b> · {n} winners, {n} channels, {n} flops<br><small class="mut">e.g. <a href="{video url}">{title}</a> · {ratio}×</small></div>}
{One page per thumbnail composition, h2 = its name: <p class="mut">{n} winners on {n} channels · {n} flops</p><div class="split tight"><div class="col">{ANNOTATED, legend moved right}<small class="mut">{proof}</small></div><div class="col">{legend}<dl class="kv"><dt>Text and colour</dt><dd>..</dd><dt>Why it likely works</dt><dd>..</dd></dl><div class="g2 one">{two CARDs}</div></div></div>}
</div>
<div class="chapter" style="--ch:'Storytelling'">
<section class="page divider"><p class="n">03</p><h1>Storytelling</h1><p class="lead mut">Hook formulas · Script structures</p></section>
{One page per hook formula, h2 = its name: <p class="mut">{n} of {n} openings read, on {n} channels · the first {n} seconds · Who can copy: {..}</p><div class="beats"><span>{beat}</span><span>{beat}</span></div><div class="g2 fill"><div class="q"><small><a href="{video url}&amp;t=0s">{title}</a> · {channel · views · date · ratio}</small><p><b>{Beat}</b>"{its words}"</p></div></div>}
{One page per script structure, h2 = its name: <p class="mut">{n} of {n} scripts read</p><div class="split"><div class="col"><div class="gantt"><span><strong>{Beat: Hook, Setup, Re-hook, Stakes increase, Peak, Twist or Payoff}</strong> <span class="mut">{what happens}</span></span><div{ class=pay on the main payoff}><i style="--a:{start %};--b:{end %}"></i></div><span></span><span class="mut" style="display:flex;justify-content:space-between;font-size:.8em"><span>0%</span><span>50%</span><span>100% of the runtime</span></span></div></div><div class="col"><dl class="kv">{Main payoff, What repeats, Example: linked title, its stats and length}</dl><div class="chips"><a class="chip" href="{video url}&amp;t={s}s"><b>{m:ss}</b> {beat}</a></div></div></div>}
</div>
<div class="chapter" style="--ch:'Learnings'">
<section class="page divider"><p class="n">04</p><h1>Learnings</h1><p class="lead mut">Do's and don'ts · Blends{ · Gaps to win}</p></section>
{One page per pair, h2 = the lesson: <div class="vs"><div class="v yes"><div><span class="tag">✓ Do</span><b>{ratio}×</b></div><a href="{video url}"><img src="{hqdefault}" alt=""></a><a href="{video url}"><span>{title}</span></a><small>{channel · views · date}</small></div><div class="v no">{the dead version, the same with ✕ Don't and class="x" on its image link}</div></div><p class="lead">{the reason}</p>}
{One page per blend, h2 = the new angle: <div class="split"><div class="g2"><div class="col"><p class="k">{pattern}</p>{CARD}</div><div class="col"><p class="k">+ {pattern}</p>{CARD}</div></div><div class="col"><dl class="kv">{New angle, Why it should work, Filmed yet? (not in the {n} videos counted)}</dl></div></div>}
{Given a channel: one page per gap, h2 = the gap: <div class="split"><div class="g2">{two competitor CARDs}</div><div class="col"><dl class="kv">{Their proof, Why it fits}</dl></div></div>. Then a page "Overall": kv of Copy, Avoid, Position, each <span class="lead"></span>.}
</div>
<div class="chapter" style="--ch:'Video ideas'">
{Only after video-ideation ran.}
<section class="page divider"><p class="n">05</p><h1>Video ideas</h1><p class="lead mut">{how many ideas, for whom, from what}</p></section>
{Overview: <table class="t"><tr><th>#</th><th>Idea</th><th>From</th><th>Potential</th><th>Fit</th></tr></table>}
{One page per idea, h2 = "{title}". Each takes a title formula, composition and hook from this book: <div class="split"><div class="col"><dl class="kv">{From, Title formula, Thumbnail (composition: its parts for this video), Hook (formula: its beats for this video), Avoids (linked dead version, ratio, why), Potential · Fit}</dl></div><div class="col"><p class="k">Proof</p>{CARD}</div></div>}
<section class="page"><p class="k">Next steps</p><h2>What to run next</h2><div class="col fill"><div><p><code>{skill}</code> <strong>{what to do}</strong></p><p class="mut">"{a prompt to paste, [brackets] for what the user fills in}"</p></div></div><p class="mut"><small>Made with the YouTube research skills on the <a href="https://tubelab.net/youtube-mcp">TubeLab MCP</a> · Install: <code>npx skills add TubeLabHQ/youtube-research-skills</code></small></p></section>
</div>
<script>
const P=[...document.querySelectorAll('.page')];
addEventListener('keydown',e=>{const d={ArrowRight:1,ArrowDown:1,PageDown:1,ArrowLeft:-1,ArrowUp:-1,PageUp:-1}[e.key];if(!d||innerWidth<=760)return;e.preventDefault();const m=scrollY+innerHeight/2,i=P.findIndex(p=>p.offsetTop+p.offsetHeight>m);(P[i+d]||P[i]).scrollIntoView({behavior:'smooth',block:'center'})});
</script>
</body>
</html>
```

- File: `reverse-engineer-niche-{niche-slug or handle}.html`, or an artifact. Chat: the top finding and the file.
- Plain, short language, with causes stated as likely. One idea and a few lines per page.
- Link every video, channel and moment from the data.
- Spell formulas, compositions, hooks and structures out where used, never by page number.

## Common Pitfalls

- Do not call one channel's hits a pattern. One viral video proves the idea, not the channel.
- Do not sell a pattern seen only on established channels to a new channel. It may ride on trust.
- Do not keep a channel because a search returned it. Hits are often off-topic, off-language or Shorts-only.
- Do not count last month's uploads as flops. They are still collecting views.
- Do not search without `publishedAtFrom` and `classificationQuality` at `"neutral"` or above, except a lookup by handle.
