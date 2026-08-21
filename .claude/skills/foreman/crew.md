# Crew — who works the job

Staff like a real shop: builder, reviewer, breaker are different people. Sonnet agents unless the job is genuinely hard.

| Job | Crew |
|---|---|
| Tiny fix (one file, obvious) | Solo. No agents. |
| New element or section | Build solo → 1 element reviewer + 1 breaker. |
| New page type or template change | Build solo → 1 reviewer + 2 breakers (mobile + desktop/wide). |
| System change (tokens, layout, nav) | 2-3 researchers first → build → reviewer per touched element + 2 breakers. |
| Bug report | 1 diagnoser (or solo if obvious) → fix → 1 verifier who re-runs the repro. |
| Pre-ship vetting | Reviewer per element + 2 breakers + 1 px/contrast auditor. |
| Cleanup / dead code | 1 auditor per file group, report-only; foreman applies. |

## Breaker protocol

- Each breaker creates its own browser tab and passes its tabId on every call. One surface per breaker.
- Paint truth is `elementFromPoint`; overflow truth is `scrollWidth` vs `clientWidth`; focus truth is `activeElement`.
- A finding measured in a hidden/throttled tab is a *claim*, not a bug — foreman re-verifies in a fronted tab before fixing.
- Reviewers cite file:line and severity (CRITICAL / MODERATE / NIT) with the exact fix.

## Verdict discipline

Foreman triages every report: fix CRITICALs and cheap MODERATEs now, log the rest, discard taste. Agents propose; foreman decides.
