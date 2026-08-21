# Performance and accessibility bar

Researched 2026-08-20. Sources at the bottom.

## Answer

The site is already near the performance ceiling. Remaining wins: a `_headers` cache file, speculation rules, an image pipeline when real images land, and three specific a11y checks.

## Fonts

Keep the system stack: zero bytes, zero layout shift. If brand type is ever wanted: exactly one variable WOFF2, subset, self-hosted, `font-display: swap`, preloaded. Never multiple static weights.

## Images (when real ones arrive)

- SVG for logos/icons/line art.
- Photos: `@11ty/eleventy-img` plugin → AVIF + WebP + fallback with srcset, generated at build time, zero runtime JS.
- Always explicit `width`/`height` (no layout shift). `loading="lazy" decoding="async"` below the fold; never lazy on the hero/LCP image.

## Cloudflare `_headers` file

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

`immutable` only on hashed filenames, never HTML.

## Speculation rules

One declarative JSON block per page (moderate eagerness, same-origin). Chrome caps ~2 concurrent prerenders — don't over-list. Pairs with view transitions for instant animated navigation. See [view-transitions.md](view-transitions.md).

## A11y specifics for our patterns

- **Popover menu:** the attribute gives Escape, light dismiss, and `aria-expanded` free — but no semantic role. Ours is a `<nav aria-label>`, which is correct; don't add `role="menu"` (that implies app-menu arrow-key behavior).
- **`details`/`summary`:** decent baseline but screen readers differ (VoiceOver quirks). Don't put headings inside `summary`. Test with NVDA + VoiceOver once nav is final.
- **Reduced motion:** the project rule skips `prefers-reduced-motion`. Recorded here as a deliberate, owner-accepted trade-off against WCAG 2.3.3 (AAA, not an AA blocker). Mitigation: keep transitions under ~400ms, no parallax/zoom-depth motion, and never any flashing over 3/sec — that one (WCAG 2.3.1) is not optional at any level.

## Sources

- https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API
- https://developers.cloudflare.com/pages/configuration/headers/
- https://www.11ty.dev/docs/plugins/image/
- https://hidde.blog/popover-accessibility/
- https://a11ysupport.io/tech/html/summary_element
- https://web.dev/learn/accessibility/motion
