# Fluid CSS: 320px to 4K, no fixed widths

Researched 2026-08-20 from the primary sources: Utopia, Every Layout, SmolCSS, CUBE CSS, web.dev Baseline. Sources at the bottom.

## Answer

Keep what we have — it already matches the masters' pattern. Adopt three upgrades: Utopia-style paired clamp scales for type and space, container queries (`cqi`) for components reused in different contexts, and `min(100% - gutter, 65ch)` containers as the 4K answer.

## The consensus pattern

1. **Fluid type/space via `clamp()`** between two poles (~320px → ~1440px). One custom property per step, reused everywhere. Always keep a `rem` term in the preferred value so user zoom and font settings survive (WCAG 1.4.4 passes automatically if max ≤ 2.5× min).
2. **Nobody scales the root font past ~1440px.** The masters cap type and let *layout* absorb extra width: wider grids, more columns, bigger margins. Our current `html { font-size: clamp(...) }` big-screen scaling is a defensible minority pattern (it keeps the whole rem layout proportional on 4K); keep it, but know the mainstream answer is "constrain the container, not grow the root."
3. **Intrinsic primitives over breakpoints.** Auto-fit grids, Sidebar, Stack, Cluster. We already have these as `.grid .row .sidebar .flow`. This is Every Layout, verbatim.
4. **Line length is the 4K fix:** `width: min(100% - 3rem, 75ch)`. `ch` scales with the font. Zero media queries needed.

## Adopt

- **Container queries** for any component that appears in more than one context (a card in a grid vs. in a sidebar). Baseline-safe since 2023. Media queries stay only for page-level shifts (nav collapse).
- **cqi gotcha:** raw `font-size: 5cqi` grows forever and erases user zoom. Always `clamp(1rem, 3cqi + 0.6rem, 2rem)`.
- **`text-wrap: balance`** on headings (done), **`pretty`** on body copy (done). Ship unconditionally; Firefox falls back silently.
- **CSS anchor positioning** for future tooltips/dropdowns — removes JS positioning code.

## Skip

- `if()` function — too new and inconsistent for production in 2026.
- Pure `vw`-only or `cqi`-only sizing — breaks zoom accessibility.

## Sources

- https://utopia.fyi/blog/clamp-calculator/
- https://every-layout.dev/layouts/
- https://smolcss.dev/
- https://bell.bz/cube-css/
- https://web.dev/articles/baseline-in-action-fluid-type
- https://moderncss.dev/container-query-units-and-fluid-typography/
- https://www.trysmudford.com/blog/fluid-feeling/
