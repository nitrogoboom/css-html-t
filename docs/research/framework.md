# Framework: Eleventy on Cloudflare Pages

Researched 2026-08-20. Sources at the bottom.

## Answer

Move to Eleventy (11ty). Keep deploying to Cloudflare Pages with wrangler, same as now.

## Why

- Eleventy turns the shared nav and footer into one include file each. No copy-paste.
- It turns Markdown files into blog pages with zero config.
- It ships zero JavaScript to the browser. The output is plain HTML and CSS, same as today.
- The current style.css carries over unchanged. index.html splits into one base layout plus per-page content.
- It is mature and low-churn. Easy to leave later if needed.

## What we checked and rejected

- **Hand-rolled include script.** Fine at 5 pages. Becomes homemade tooling debt at 15 pages plus a blog.
- **Astro.** Also ships zero JS, but adds its own component syntax and a bigger build pipeline. Overkill for a brochure-plus-blog site.
- **Workers + HTMLRewriter includes.** Runs templating JS on every request instead of once at build time. More moving parts, less capability.
- **Hugo, Next.js, Gatsby.** Either a new language ecosystem or way too much framework.

## Cloudflare Pages status (verified against official docs)

Pages is **not** deprecated as of August 2026. Cloudflare steers new full-stack apps toward Workers Static Assets (parity since March 2026), but plain static deploys via wrangler — exactly our setup — stay fully supported with no deadline. Do not migrate. Revisit only when forms need server logic; then Pages Functions or a thin Worker sits next to the static output. No rewrite.

## Sources

- https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/
- https://cloudcannon.com/blog/eleventy-11ty-vs-astro/
- https://www.11ty.dev/docs/deployment/
- https://mecanik.dev/en/posts/cloudflare-pages-vs-workers-which-to-use-in-2026/
