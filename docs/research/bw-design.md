# Monochrome design: hierarchy with only shading

Researched 2026-08-20. Sources at the bottom.

## Answer

A ramp of 7–9 purpose-named grays, all derived from one ink and one paper value with oklch relative color. Depth from layered low-opacity shadows plus 1px hairlines. States from washes and border weight, never hue. We already do most of this; the ramp below formalizes it.

## Token ramp (purpose names, never numbers)

```css
--ink:            oklch(22% 0.005 264);              /* body text */
--ink-muted:      oklch(from var(--ink) 42% c h);    /* secondary text — 4.5:1 floor */
--ink-faint:      oklch(from var(--ink) 60% c h);    /* placeholder/disabled only */
--paper:          oklch(99% 0.002 264);              /* page */
--surface:        /* card fill, 2-4% off paper */
--line:           oklch(from var(--ink) l c h / 12%); /* hairlines */
--line-strong:    oklch(from var(--ink) l c h / 28%); /* interactive edges — must hit 3:1 */
```

Purpose names survive redesigns; `--gray-2` doesn't say what breaks when you change it.

## Depth without color

- 3–5 stacked shadows, opacity 0.03–0.12, blur doubling per layer (we already do this — keep it).
- Pair every shadow with a 1px hairline: the border draws the crisp edge, the shadow implies height. Shadows alone fail the 3:1 edge-contrast check.

## States without color

- Hover: surface wash + border darkens.
- Active: invert — ink fill, paper text.
- Focus: full-contrast ring, never color-only. Custom focus rings must hit 3:1 against both the control and the page (browser defaults are exempt; ours aren't).

## Hard contrast numbers

- Body gray: never lighter than ~#767676 on white (4.5:1). AAA is ~#595959.
- Large text (24px+, or 19px bold): 3:1 minimum.
- Borders, icons, focus rings: 3:1. A 12% hairline on near-white will fail — that's why `--line-strong` exists for interactive edges. Check contrast on the *computed* flattened color, not the token's nominal alpha.

## Dark mode

Nearly free with this token setup: swap ink/paper lightness under `prefers-color-scheme: dark`, chroma stays ~0. Shadows need their own pass (dark UIs read elevation from lighter surfaces, not darker shadows). Optional — decide when the design settles.

## Reference sites

raunofreiberg.com (OS-style monochrome restraint), jxnblk.io/grays (gray-ramp tooling), editorial B&W portfolios: hierarchy from type scale and whitespace, imagery as the only relief.

## Sources

- https://jxnblk.io/grays/
- https://manuel-strehl.de/easy_theming_with_oklch
- https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
- https://webaim.org/articles/contrast/
- https://theosoti.com/blog/designing-shadows/
- https://raunofreiberg.com
