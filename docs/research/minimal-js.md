# JavaScript: vanilla only, and barely any

Researched 2026-08-20. Sources at the bottom.

## Answer

No library. Not htmx, not Alpine. The platform now covers nearly everything; what's left is ~30 lines of vanilla JS for form submits.

## Why no htmx

htmx's whole model is "server returns HTML fragments to swap in." A static site has no fragment-serving backend, so htmx buys nothing over `fetch` unless we build extra infrastructure just to feed it. 14kb for two forms is disproportionate. Even htmx's author points smaller cases at ~3.5kb tools or nothing.

## Why no Alpine

Alpine (7–8kb) earns its keep for reactive client state. Our dropdowns and menus are already native `details`/popover. Reconsider only if a multi-step conditional form ever appears.

## What stays zero-JS

- Page transitions: `@view-transition` (CSS).
- Menus, dropdowns, FAQ: popover + `details` (HTML).
- Filterable blog list, if ever wanted: CSS `:has()` + checkboxes. No JS.

## The one vanilla pattern we'll need (forms)

```js
form.addEventListener('submit', async e => {
  e.preventDefault()
  const status = form.querySelector('[role=status]') // aria-live region — required for a11y
  const btn = form.querySelector('button')
  btn.disabled = true
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form) })
    if (!res.ok) throw new Error() // fetch does NOT reject on 4xx/5xx
    status.textContent = 'Message sent.'
    form.reset()
  } catch {
    status.textContent = 'Something went wrong. Try again.'
  } finally {
    btn.disabled = false
  }
})
```

Pair with native HTML validation (`required`, `type=email`) so bad input never leaves the browser. Forms also work with plain POST + redirect if we ever want literally zero JS.

## Sources

- https://htmx.org/docs/
- https://htmx.org/essays/alternatives/
- https://alpinejs.dev/
- https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
- https://codepen.io/dereksheppard/pen/LYVWpoE
