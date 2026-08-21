# Site plan

The scoped outlook for growing this template into the full site. Based on the 2026-08-20 research in [research/](research/). Written plain on purpose.

## The stack (decided)

| Layer | Choice | Why |
|---|---|---|
| Build | Eleventy 3.x, Nunjucks templates | Shared nav/footer become one include each. Markdown becomes blog pages. Ships zero JS. |
| Hosting | Cloudflare Pages via wrangler (unchanged) | Not deprecated. Nothing to gain by moving. |
| Page transitions | `@view-transition` in CSS | Zero JS. ~85% of visitors get it; the rest get normal navigation. |
| Client JS | Vanilla only. No htmx, no Alpine. | The platform covers menus, dropdowns, transitions, even list filtering. Forms need ~30 lines. |
| Server code (later) | Cloudflare Pages Functions, plain JS | For forms. Turnstile (spam) + Buttondown (opt-in) + Resend (email) + R2 (gated files). |
| TypeScript / Node | No TS. Node only as local build tooling. | The browser gets zero of either. |
| Design | Monochrome token ramp, oklch-derived | See [research/bw-design.md](research/bw-design.md). |

## Build order

1. **Migrate to Eleventy.** One `base.njk` layout, one `nav.njk` include, one `footer.njk` include. index.html becomes a thin content file. CSS carries over untouched. Same deploy command.
2. **Add view transitions.** The CSS block in [research/view-transitions.md](research/view-transitions.md), plus speculation rules in the base layout.
3. **Fix audit items** while there's still one template: real business data in JSON-LD (`ProfessionalService`), breakpoint comments, `aria-current` via template variable. See [research/audit.md](research/audit.md).
4. **Build inner pages.** 6 services, 6 industries, About. Each service page: answer-first intro, real FAQ (`FAQPage` schema), `Service` schema. Stress-test the layout primitives on the first one before mass-producing.
5. **Newsroom.** Flat `posts` collection, list page, RSS. Post layout capped at 66ch. `BlogPosting` schema per post. See [research/blog.md](research/blog.md).
6. **AI-readiness pass.** robots.txt welcoming citation bots, Cloudflare AI Crawl Control check, sitemap. See [research/ai-ready.md](research/ai-ready.md).
7. **Contact + opt-in** (when ready): Pages Function + Turnstile + Buttondown + Resend. Gated downloads via R2 presigned links. See [research/forms-cloudflare.md](research/forms-cloudflare.md).
8. **Polish:** `_headers` caching, eleventy-img when real photos land, screen-reader pass on the nav.

## Standing rules

- No fixed pixel widths. Containers cap with `min()` and `ch`. See [research/fluid-css.md](research/fluid-css.md).
- One new gray only if the ramp can't express it. Purpose names (`--ink-muted`), never ranks (`--gray-2`).
- Media queries only for page-level shifts. Container queries for components in multiple contexts.
- Every interactive edge and focus ring hits 3:1 contrast. Body grays hit 4.5:1.
- Transitions stay under ~400ms. No parallax or zoom-depth motion. Never flashing.
- New JS must justify itself against a platform feature first. Target: menu.js + one form handler, nothing else.
