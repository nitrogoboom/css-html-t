# Site plan

The scoped outlook for this site. Research notes live in [research/](research/). Written plain on purpose.

## The stack (decided and built)

| Layer | Choice | Status |
|---|---|---|
| Build | Eleventy 3.x, Nunjucks, Markdown posts | ✅ Live. `src/` in, `_site/` out. |
| Hosting | Cloudflare Pages via wrangler | ✅ Unchanged. Don't migrate to Workers. |
| Page transitions | `@view-transition` CSS + speculation rules | ✅ Live on every page. |
| Client JS | Vanilla only — menu.js (10 lines) | ✅ No htmx, no Alpine, ever. |
| Pages | Home, About, 6 services, 6 industries, Newsroom + posts + Atom feed | ✅ Generated from data files. |
| Nav/footer | One source: `src/_data/nav.js` (derives from services/industries data) | ✅ Edit once, updates everywhere. |
| Server code (later) | Pages Functions: Turnstile + Buttondown + Resend + R2 | ⬜ When forms are wanted. |
| TypeScript | No. Node is build-tooling only. | — |

## How pages work

- A service/industry page = one row in `src/_data/services.js` or `industries.js`. The pagination templates (`service.njk`, `industry.njk`) and the nav pick it up automatically.
- A blog post = one `.md` file in `src/posts/`. List page, feed, and layout come free.
- Repeated HTML shapes are macros in `src/_includes/parts.njk` (card, faq, cta).

## Owner decisions pending (from the UX review)

- **Desktop bar shows both a tel link and a Contact button.** Reviewer's take: two CTAs dilute each other; drop tel from the desktop bar, keep it in the drawer and footer. Reversible — owner's call.
- **Breadcrumbs at 15 pages?** Underline says what's active, not where you are. ~10 lines of Nunjucks if wanted.

## Remaining work (in order)

1. **Real content pass** — when the owner says so: business name, copy, JSON-LD → `ProfessionalService`, real domain in canonical/OG/feed URLs. Everything is lorem until then, on purpose.
2. **Contact + opt-in**: Pages Function + Turnstile + Buttondown + Resend; gated downloads via R2. See [research/forms-cloudflare.md](research/forms-cloudflare.md).
3. **AI-readiness pass**: robots.txt welcoming citation bots, Cloudflare AI Crawl Control check, sitemap — needs the real domain first. See [research/ai-ready.md](research/ai-ready.md).
4. **Images**: `@11ty/eleventy-img` when real photos land. See [research/perf-a11y.md](research/perf-a11y.md).

## Standing rules

- No fixed pixel widths. Containers cap with `min()` and `ch`. See [research/fluid-css.md](research/fluid-css.md).
- Grays come from the token ramp, purpose-named, oklch-derived. See [research/bw-design.md](research/bw-design.md).
- Media queries only for page-level shifts. Container queries for components in multiple contexts.
- Text contrast 4.5:1; interactive edges and focus rings 3:1.
- Transitions under ~400ms. No parallax, never flashing.
- New JS must justify itself against a platform feature first. See [research/minimal-js.md](research/minimal-js.md).
