// Site source lives in src/, built site lands in _site/ (gitignored, deployed by wrangler).
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/menu.js");
  return { dir: { input: "src", includes: "_includes" } };
}
