# Rules

- For any HTML/CSS/JS/content change, follow the `site` skill (`.claude/skills/site/SKILL.md`). Plan and research live in `docs/`.
- Be terse. /google-speak style: short sentences, no filler. Applies to this file too.
- Glass effect is always on. Don't add `prefers-reduced-motion` or `prefers-reduced-transparency` overrides.
- Research online before adding elements, fixing bugs, or choosing solutions. Training data lags current CSS/HTML.
- Eleventy site. Source in `src/` (pages as `.njk`, shared layout in `src/_includes/`, nav links in `src/_data/nav.json`). Build output `_site/` is gitignored.
- After editing anything in `src/`, run `npx @11ty/eleventy && npx -y html-validate "_site/**/*.html" && npx -y csstree-validator src/style.css`. All must pass.
- GitHub: `nitrogoboom/css-html-t` (public), branch `main`. Cloudflare Pages: project `css-html-t`, not Git-connected — https://css-html-t.pages.dev
- After a change lands: commit, `git push origin main`, then `npx -y wrangler pages deploy _site --project-name css-html-t --branch main --commit-dirty=true`. Keep both current.
