# Craft — the distilled standards

The essence of the 2026 research pass (Utopia, Every Layout, SmolCSS, Shadeed, web.dev Baseline). For anything not covered: research live, don't guess.

## Fluid, 320px → 4K

- Type and space via `clamp()` with a `rem` term so user zoom survives. Root font scales past 1280px (`html` clamp) — that's the 4K strategy; rem everywhere rides it. Never cap components in px.
- Containers: `min(100% - gutter, cap)`; prose capped at `66ch`. Line length, not font size, is the widescreen fix.
- Intrinsic primitives over breakpoints: `.wrapper .flow .grid .row .pair .sidebar .intro` — tune with their custom properties, don't invent siblings. Media queries only for page-level shifts (the 64rem nav collapse); container queries for a component reused in different contexts.
- `cqi` always inside `clamp()` with a rem floor.

## Monochrome

- Tokens are purpose-named (`--ink-muted`, never `--gray-2`) and derived with `oklch(from …)`. `--line` is decorative-only (under 3:1); interactive edges use `--ink-muted`.
- Depth = layered low-opacity shadows + 1px hairline. States = wash + border weight + invert, never hue alone. Hover on links needs a non-color cue (underline).

## Transitions

- `@view-transition { navigation: auto }` + named header/footer/main. Firefox just navigates — no fallback code. Speculation-rules JSON in the head is the instant-nav enhancement.
- Named elements are paint layers: overlays need explicit stacking (header carries `z-index: 1`).

## JS ladder

HTML (popover, details, forms) → CSS (`:has()`, scroll-driven, anchor positioning) → vanilla. A library must beat the platform, not tie it. Forms later: `fetch` + `FormData` + `aria-live` status, ~30 lines.

## Perf & a11y

- System font stack. Real images later: `@11ty/eleventy-img` → AVIF/WebP, explicit dimensions, lazy below the fold only.
- `_headers`: short cache on unhashed assets, never immutable HTML.
- Popover gives Escape/dismiss/expanded free but no role — a labeled `<nav>` is right. Nothing inside `summary` but text. Reduced-motion is deliberately skipped (owner rule): keep motion short, no parallax, never flashing (that one's law).
