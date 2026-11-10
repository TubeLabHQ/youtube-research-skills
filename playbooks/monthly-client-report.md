# Playbook: monthly client report

For studios and agencies reporting on a client channel. Three skills, run in the same chat, then one paste into the client doc.

| Step | Skill | Prompt to paste | Section of the report |
|---|---|---|---|
| 1 | `trend-report` | "Trend report for @client this month." | Winning videos with verbatim hooks and why they worked, patterns, ideas |
| 2 | `competitor-research` | "Competitor research for @client: 12 to 15 channels, comparison table, gaps, positioning." | Where the client stands against peers, leaders and fast risers, with proof lines |
| 3 | `niche-watchlist` | "Run the niche watchlist for the client's niches and give me the delta since last month." | New and moving channels since last month, each with a short analysis: worth studying or not, working topics, title formulas, best recent video |

Optional quarterly additions: `channel-analysis` ("Analyze @client") when growth stalls, and `monetization-research` ("Monetization audit for @client") when the client asks about revenue.

Scheduling: a Claude Code routine or `/loop`, or cron calling `claude -p "run the monthly client report playbook for @client"` on the first of the month. The watchlist keeps its own state in `watchlist/`, so the delta is real month to month.

Rules: every finding carries channel · title verbatim · views · ratio · date. Everything cited is linked with a URL from tool data: videos, channels, moments, brands and products. A sponsor that was only heard links to the video moment. Revenue, RPM and audience are bands labelled "estimate". The report is dated and names the window used.
