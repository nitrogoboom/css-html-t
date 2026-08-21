// Site source lives in src/, built site lands in _site/ (gitignored, deployed by wrangler).
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/menu.js");
  eleventyConfig.addPassthroughCopy("src/_headers");

  eleventyConfig.addFilter("readableDate", d =>
    new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }));
  eleventyConfig.addFilter("htmlDateString", d =>
    new Date(d).toISOString().slice(0, 10));

  // Atom feed for the newsroom. Base URL is the placeholder domain until the real one lands.
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 10 },
    metadata: {
      language: "en",
      title: "Company Name Newsdesk",
      subtitle: "News, notes, and plain-language guides.",
      base: "https://example.com/",
      author: { name: "Company Name" },
    },
  });

  return { dir: { input: "src" } }; // includes defaults to _includes
}
