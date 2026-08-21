# Forms, opt-in, and gated downloads on Cloudflare

Researched 2026-08-20. Sources at the bottom.

## Answer

Plain HTML forms posting to one Cloudflare Pages Function, protected by Turnstile. Opt-ins forward to Buttondown. Contact emails send via Resend. Gated files live in R2 and get emailed as time-limited links. Store nothing ourselves.

## The stack

| Job | Tool | Cost |
|---|---|---|
| Form handling | Pages Function (`functions/api/submit.js`) | Free |
| Spam | Turnstile (verify server-side) | Free, unlimited |
| Newsletter/opt-in | Buttondown — plain HTML POST endpoint, zero JS | Free/cheap at our volume |
| Transactional email | Resend HTTP API | Free: 3,000/mo, 100/day |
| Gated files | R2 private bucket + presigned time-limited URL | Free tier fine |

## Key facts

- **Pages Functions ARE Workers** (same runtime, billing) with file routing. No separate Worker needed. No migration off Pages.
- **MailChannels' free Workers email is DEAD** (terminated June 2024). Many tutorials still rank; ignore them all.
- **Cloudflare's native `send_email` binding** effectively wants the $5/mo Workers Paid plan. Resend's free tier doesn't. Resend wins.
- **MailerLite requires a JS snippet** — disqualified. Buttondown's `embed-subscribe` endpoint is a plain `<form method="post">`. Kit/ConvertKit has a plain-POST fallback too.
- **Don't store opt-ins in KV/D1.** The ESP is the source of truth (subscribes, unsubscribes, compliance). Add D1 only if we ever need to query submissions ourselves.
- **Gated downloads:** never a public static path. Function validates Turnstile + opt-in, generates a presigned R2 URL (via `aws4fetch`), emails it through Resend.

## Node / TypeScript answer

**No to both as requirements.** Node is needed only as local build tooling (Eleventy and wrangler run on it — already installed). Pages Functions are plain `.js` using web-standard `fetch`/`Response`. TypeScript is optional comfort, not needed at this size. The browser gets zero Node, zero TS, near-zero JS.

## Sources

- https://blog.mailchannels.com/important-update-mailchannels-email-sending-api-for-cloudflare-workers-to-be-terminated/
- https://developers.cloudflare.com/pages/functions/
- https://resend.com/docs/send-with-cloudflare-workers
- https://developers.cloudflare.com/r2/api/s3/presigned-urls/
- https://docs.buttondown.com/forms
- https://prosopo.io/tools/cloudflare-turnstile-pricing/
