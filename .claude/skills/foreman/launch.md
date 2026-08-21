# Launch — what's left

In rough order. Each is a normal foreman job when the owner calls it.

1. **Real content pass** (owner triggers): copy, business name, real domain in canonical/OG/feed URLs, JSON-LD → `ProfessionalService`, real icons/OG image replacing the placeholders in `src/`.
2. **Contact + email opt-in**: recipe in [forms.md](forms.md) — Pages Function + Turnstile + Buttondown + Resend; gated downloads via R2 presigned links.
3. **Links & discovery**: robots.txt welcoming citation bots, sitemap, `<link rel="alternate">` to feed.xml, Cloudflare AI Crawl Control check — recipe in [ai-ready.md](ai-ready.md). Needs the real domain.
4. **Image pipeline**: `@11ty/eleventy-img` when real photos land.
5. **Owner decisions parked**: drop tel link from desktop bar? breadcrumbs at 15 pages? dark mode (cheap with the oklch tokens)?
