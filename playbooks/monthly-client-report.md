# Playbook: monthly client report

For studios and agencies reporting on a client channel. Three skills, run in the same chat, then one paste into the client doc. Budget: about 10 to 20 credits per client per month (trend report 4, watchlist 5 per niche, competitors free when you can name them).

| Step | Skill | Prompt to paste | Section of the report |
|---|---|---|---|
| 1 | `trend-report` | "Trend report for @client this month." | Winning videos with verbatim hooks and why they worked, patterns, ideas |
| 2 | `competitor-research` | "Competitor research for @client: comparison table, gaps, positioning." | Where the client stands against its neighbours, with proof lines |
| 3 | `niche-watchlist` | "Run the niche watchlist for the client's niches and give me the delta since last month." | New and moving channels since last month, one row each |

Optional quarterly additions: `channel-analysis` ("Analyze @client") when growth stalls, and `monetization-research` ("Monetization audit for @client") when the client asks about revenue.

Scheduling: a Claude Code routine or `/loop`, or cron calling `claude -p "run the monthly client report playbook for @client"` on the first of the month. The watchlist keeps its own state in `watchlist/`, so the delta is real month to month.

Rules: every finding in the report carries channel · title verbatim · views · ratio · date; revenue, RPM and audience are bands labelled "estimate"; the report is dated and names the window used.
