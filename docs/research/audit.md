# Code audit: index.html, style.css, menu.js

Audited 2026-08-20 against 2026 best practice.

## Verdict

The code is well above baseline. The primitive system, popover menu, subgrid cards, and 10-line menu.js are current best practice, not over-engineering. Keep the architecture; fix the gaps below before scaling to 15 pages.

## Keep (don't touch)

- **Layout primitives** (`.wrapper .flow .grid .row .pair .sidebar .intro`, style.css:277-304). Single-purpose, custom-property-tunable, genuinely fluid 320px→4K. These become the template partials.
- **Big-screen root scaling** (style.css:11-19) with the 4K device-width bump and Firefox print fix. Correct and defensive.
- **Subgrid cards** with full-card link + `:has()` focus ring (style.css:341-358).
- **Popover mobile menu + `<details name>` accordions** with `@starting-style` exit/enter animation. The 2026-correct pattern.
- **menu.js at 10 lines.** Only does what the platform can't. Do not add a framework.
- **`list-style-type: ""`** Safari fix, `oklch(from …)` tokens, layered shadows. All deliberate and right.

## Fix (before page 2 exists)

1. **No view-transition rules yet** — a stated goal with zero implementation. Add `@view-transition` + names (see [view-transitions.md](view-transitions.md)).
2. **64rem breakpoint lives in three literals** — style.css:113, style.css:143, menu.js:3, synced by comment only. Centralize or at least keep the comments.
3. **Nav links duplicated 3×** — desktop nav, mobile drawer, footer. Eleventy includes solve this; it's the main reason to migrate now, not at page 10.
4. **Placeholder data in JSON-LD/meta** (index.html:7-65) — lorem, example.com, fake phone/geo. Swap `LocalBusiness` → `ProfessionalService` when real data lands. Flag so it never deploys as-is to the real domain.
5. **`aria-current="page"` is manual per page** — a template variable should set it. Decide: footer current-page styling, yes or no (currently unstyled).

## Rethink (decisions to make at migration time)

- Primitives are only proven on homepage marketing sections. Stress-test one real inner page (a blog post) before calling the set complete.
- Verify 64rem is still the right nav-collapse point once content-heavy pages exist.
- Decide view-transition-name scoping (persistent chrome vs animated content) while there's still one template — retrofitting across diverged pages is error-prone.
