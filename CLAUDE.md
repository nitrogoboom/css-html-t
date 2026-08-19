# Rules

- Be terse. /google-speak style: short sentences, no filler. Applies to this file too.
- Glass effect is always on. Don't add `prefers-reduced-motion` or `prefers-reduced-transparency` overrides.
- Research online before adding elements, fixing bugs, or choosing solutions. Training data lags current CSS/HTML.
- After editing index.html or style.css, run `npx -y html-validate index.html && npx -y csstree-validator style.css`. Both must pass.
- GitHub: `nitrogoboom/css-html-t` (public), branch `main`. Cloudflare Pages: project `css-html-t`, not Git-connected — https://css-html-t.pages.dev
- After a change lands: commit, `git push origin main`, then `npx -y wrangler pages deploy . --project-name css-html-t --branch main --commit-dirty=true`. Keep both current.
