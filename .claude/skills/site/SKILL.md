---
name: site
description: How to build, style, and ship pages in this project. Use for ANY change to HTML, CSS, JS, templates, or content in this repo. Trigger with /site or automatically when editing site files.
---

# Site skill

You are working on a monochrome MSP website. Static files, Cloudflare Pages, near-zero JS. The decisions are already made — read [docs/plan.md](../../../docs/plan.md) first, don't re-decide them. Deep dives live in [docs/research/](../../../docs/research/).

## The stack

- **Build:** Eleventy + Nunjucks. Pages are `.njk` files in `src/`. Shared shell: `src/_includes/base.njk` + `nav.njk` + `footer.njk`. Nav/footer links: `src/_data/nav.js` (derives from services.js/industries.js — edit those once, every page updates). Repeated HTML shapes become macros in `src/_includes/parts.njk`; one-tag elements stay CSS classes with `data-variant`. Markdown for blog posts.
- **Hosting:** Cloudflare Pages via wrangler. Do not migrate to Workers.
- **JS:** Vanilla only. No frameworks, no htmx, no Alpine. Ever.
- **Design:** Black, white, and grays. No new colors. Glass effect stays on. No reduced-motion overrides.
- **Content:** Lorem ipsum everywhere, on purpose. This phase is framework, structure, and layout patterns only. Do not write real copy or fill in real business data (names, phones, addresses, schema) until the owner says so.

## Who does what

Solve in this order. Stop at the first layer that works.

1. **HTML first.** Native elements do the job: `popover` for overlays, `details` for accordions and dropdowns, real forms with `required`/`type=email`. Semantic landmarks, one H1, headings in order.
2. **CSS second.** Page transitions (`@view-transition`), animations, state (`:has()`), even list filtering (checkboxes + `:has()`). Use the existing primitives: `.wrapper .flow .grid .row .pair .sidebar .intro`. Tune them with their custom properties; don't invent new layout code.
3. **JS last, and rarely.** Only for what the platform truly can't do. Today that's menu.js (10 lines) and, later, one form-submit handler. Every new line of JS needs a reason a platform feature can't cover.

## CSS rules

- No fixed pixel widths. Use `clamp()`, `min()`, `ch`, and the existing token scale (`--gap`, `--stack`, `--gutter`, `--section-pad`).
- Grays come from the token ramp, derived with `oklch(from …)`. Purpose names (`--ink-muted`), never ranks (`--gray-2`).
- Text contrast 4.5:1. Interactive edges and focus rings 3:1.
- Media queries only for page-level layout shifts (the 64rem nav collapse). Container queries for components used in multiple contexts.
- Transitions under 400ms. No flashing, no parallax.
- Comment style: say the constraint the code can't show, in plain words. Match the density already in style.css.

## Every change, every time

1. Edit files in `src/`.
2. Build + validate: `npx @11ty/eleventy && npx -y html-validate "_site/**/*.html" && npx -y csstree-validator src/style.css`. All must pass.
3. Check the browser preview (launch config `site`, port 4173) at mobile, desktop, and a wide window.
4. Commit, `git push origin main`, then `npx -y wrangler pages deploy _site --project-name css-html-t --branch main --commit-dirty=true`.

## Research rule

Before adding an element, fixing a bug, or picking a technique: check [docs/research/](../../../docs/research/) first. If it's not covered, research online — training data lags current CSS. Add what you learn to the matching research doc.

## Quick map

| Task | Read first |
|---|---|
| New page | Add a row to `src/_data/services.js`/`industries.js`, or a new `.njk` with `layout: base.njk` |
| New blog post | Drop a `.md` in `src/posts/` with title/description/date front matter |
| Layout, sizing, responsiveness | [docs/research/fluid-css.md](../../../docs/research/fluid-css.md) |
| Page transitions | [docs/research/view-transitions.md](../../../docs/research/view-transitions.md) |
| Colors, shadows, states | [docs/research/bw-design.md](../../../docs/research/bw-design.md) |
| Any JS temptation | [docs/research/minimal-js.md](../../../docs/research/minimal-js.md) |
| Forms, opt-in, downloads | [docs/research/forms-cloudflare.md](../../../docs/research/forms-cloudflare.md) |
| SEO, schema, AI crawlers | [docs/research/ai-ready.md](../../../docs/research/ai-ready.md) |
| Speed, caching, a11y | [docs/research/perf-a11y.md](../../../docs/research/perf-a11y.md) |
