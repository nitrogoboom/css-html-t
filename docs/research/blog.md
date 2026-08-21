# Newsroom: flat Markdown blog in Eleventy

Researched 2026-08-20. Sources at the bottom.

## Answer

Eleventy 3.1.x plus the official RSS plugin. One flat `posts` collection sorted by date. No categories, no tags. Two layouts: `base.njk` (shared head, nav, footer) and `post.njk` (extends base, adds per-post meta).

## How it works

- Drop a `.md` file in `posts/` with frontmatter (`title`, `date`, `description`). It becomes a page.
- The post list page is one `{% for post in collections.posts %}` loop. No pagination needed at our scale.
- RSS is config-only with `@11ty/eleventy-plugin-rss` → `/feed.xml`. No template file.
- Build output is flat static HTML. Same `wrangler pages deploy` as today.

## SEO per post

- One JSON-LD `BlogPosting` block: `headline`, `datePublished`, `dateModified`, `author`, `publisher`, `image` (1200×675 minimum for Discover), `description`.
- OG tags: `og:type=article`, `og:title`, `og:description`, `og:image`, `article:published_time`, `twitter:card=summary_large_image`.
- Frontmatter feeds both. Keep title/description identical across `<title>`, meta, OG, and JSON-LD.

## Reading experience (monochrome long-form)

- Body column capped at `66ch` (sweet spot is 50–75 characters per line). `ch` scales with font size — fits our no-fixed-width rule.
- Line height 1.5 for body; tighter for headings. We already do this.
- Body text 16px minimum; 18–20px reads better for long articles. Our fluid `clamp()` already lands there.

## Rejected

- **Astro content collections.** Typed Zod schemas and islands are more machinery than a flat newsroom needs.
- **Pandoc / hand-rolled script.** Works at first, but hand-builds RSS, collections, and watch mode that Eleventy gives free.

## Sources

- https://www.11ty.dev/docs/plugins/rss/
- https://www.11ty.dev/blog/eleventy-v3/
- https://docs.astro.build/en/guides/content-collections/
- https://practicaltypography.com/line-length.html
- https://www.uxpin.com/studio/blog/optimal-line-length-for-readability/
