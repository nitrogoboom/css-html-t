# AI-ready: what actually works in 2026

Researched 2026-08-20. Sources at the bottom.

## Answer

Being "AI-driven" for a business site mostly means: clean semantic HTML, deep JSON-LD, and a robots.txt that welcomes the AI crawlers that cite you. It is 80% classic SEO fundamentals. Anyone selling "GEO/AEO" as separate magic is a red flag.

## Priority checklist

1. **JSON-LD on every page.** `Organization` sitewide; `ProfessionalService` on about/contact; `Service` on each service page; `FAQPage` where there are FAQs; `BreadcrumbList`; `BlogPosting` on posts. Sites with complete schema were ~3x more likely to be cited in AI Overviews (directional stat).
2. **Semantic HTML.** Landmarks (`nav`, `main`, `article`), one H1, correct heading order, descriptive link text. AI crawlers re-derive structure from this. We already do it.
3. **robots.txt with intent.** Three crawler classes:
   - *Search/citation bots* (OAI-SearchBot, Claude-SearchBot, PerplexityBot) — **allow**; they send cited traffic.
   - *Agent bots* (ChatGPT-User, Claude-User) — **allow**; they fetch your page when a user asks about you.
   - *Training bots* (GPTBot, ClaudeBot, CCBot, Google-Extended) — owner's choice; blocking them does not hurt citations.
4. **Check the Cloudflare dashboard too.** Cloudflare's AI Crawl Control ships new default blocking Sept 15, 2026, and CDN rules silently override robots.txt intent. Verify dashboard settings match the file.
5. **Answer-first content.** Lead each service page with the direct answer, elaborate after. Real FAQ sections with verbatim customer questions. This is the actual lever.
6. **llms.txt: skip or 15 minutes, last.** ~2–10% adoption, no major AI company reads it in production, measured traffic effect ≈ zero.
7. **Workers AI chat widget: later, only if wanted.** It is a feature, not readiness.

## Sources

- https://www.anagram.ai/blog/ai-crawlers-explained-gptbot-claudebot-perplexitybot-and-how-to-let-them-in-2026
- https://blog.cloudflare.com/content-independence-day-ai-options/
- https://www.helpnetsecurity.com/2026/07/02/cloudflare-ai-crawler-controls/
- https://support.anthropic.com/en/articles/8896518
- https://geojacker.com/llms-txt
- https://www.emarketer.com/content/faq-on-geo-aeo--where-ai-search-seo-overlap-2026
