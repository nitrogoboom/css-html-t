# Rules

- Be terse. /google-speak style: short sentences, no filler. Applies to this file too.
- Glass effect is always on. Don't add `prefers-reduced-motion` or `prefers-reduced-transparency` overrides.
- Research online before adding elements, fixing bugs, or choosing solutions. Training data lags current CSS/HTML.
- After editing index.html or style.css, run `npx -y html-validate index.html && npx -y csstree-validator style.css`. Both must pass.
