# Page transitions: cross-document view transitions, zero JS

Researched 2026-08-20. Sources at the bottom.

## Answer

Add `@view-transition { navigation: auto; }` to style.css. Name the header, footer, and main content with `view-transition-name`. That is the whole feature. No JavaScript, no fallback code.

## Browser support (verified August 2026)

| Feature | Chrome/Edge | Safari | Firefox |
|---|---|---|---|
| Cross-document `@view-transition` | 126+ | 18.2+ | Not yet (bug 1860854, Interop 2026 target) |
| Speculation Rules (prerender) | Yes | No | No |

About 85% of visitors get transitions. Firefox users get a normal instant navigation — no error, no flash. The at-rule is invisible to browsers that don't know it.

## The CSS

```css
/* Both pages must opt in for a transition to fire between them. */
@view-transition { navigation: auto; }

/* Shared chrome reads as persistent instead of cross-fading. */
header { view-transition-name: site-header; }
footer { view-transition-name: site-footer; }
main   { view-transition-name: page-content; }

/* Optional custom motion; the default cross-fade is free. */
::view-transition-new(page-content) { animation: 400ms ease-out slide-from-right; }
::view-transition-old(page-content) { animation: 400ms ease-in slide-to-left; }
@keyframes slide-from-right { from { transform: translateX(30px); opacity: 0; } }
@keyframes slide-to-left   { to   { transform: translateX(-30px); opacity: 0; } }
```

## Instant feel (optional, declarative, Chromium-only)

```html
<script type="speculationrules">
{ "prerender": [{ "where": { "href_matches": "/*" }, "eagerness": "moderate" }] }
</script>
```

Safari and Firefox ignore the script type. It is JSON, not executed JS.

## Gotchas

- Fixed/sticky elements and open popovers can render under the snapshot layer mid-animation. Fix: give them their own `view-transition-name`. Our header naming above covers the main case; verify the mobile FAB visually.
- Keep transitions 300–500ms. A 4s timeout auto-cancels slow ones; the navigation still happens.
- Transitions fire only on same-origin link clicks and back/forward — not reload or address-bar entry.

## Sources

- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition
- https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
- https://caniuse.com/mdn-css_at-rules_view-transition
- https://bugzilla.mozilla.org/show_bug.cgi?id=1860854
- https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API
