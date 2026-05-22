# Whynt Corporate Website

This repository contains the Whynt marketing website and content-driven pages built with Astro.

## What It Is

Whynt is a small-scale, product-focused tech company that builds and maintains software for small and mid-sized businesses. This site presents the brand, services, blog, FAQ, pricing, terms, and changelog content.

## Tech Stack

- Astro
- TypeScript
- Tailwind CSS
- PostCSS
- Sharp for image processing
- Astro sitemap integration

## Project Structure

- `src/pages` - route entry points for the main site pages, including the homepage, service pages, legal pages, and blog index.
- `src/components` - reusable UI blocks, page sections, and layout primitives used across the site.
- `src/content` - content collections for markdown-driven pages, such as the blog posts.
- `src/data` - structured JSON data that powers sections like FAQs, changelog entries, and other repeated content.
- `src/layouts` - top-level page shells that wrap content pages with shared metadata and structure.
- `src/styles` - global styles and shared CSS.
- `public` - static files served directly, including images and other assets that do not need processing.

Most of the site is content-driven rather than app-driven, so the page files usually wire together shared components and data rather than containing large amounts of custom logic. That keeps the site easy to update when the branding, copy, or content changes.

## Available Scripts

- `bun run dev` - start the local Astro dev server
- `bun run build` - run type checking and create a production build
- `bun run preview` - preview the production build locally
- `bun run astro` - access Astro CLI commands

## Getting Started

| Command           | What it does                                       |
| ----------------- | -------------------------------------------------- |
| `bun install`     | Installs all project dependencies.                 |
| `bun run dev`     | Starts the local Astro development server.         |
| `bun run build`   | Runs type checking and creates a production build. |
| `bun run preview` | Serves the production build locally for review.    |

After running `bun run dev`, open the local URL shown in the terminal.

## Content Notes

- Blog posts live in `src/content/blog`.
- FAQ content lives in `src/data/json-files/faqData.json`.
- Changelog content lives in `src/data/json-files/changelogData.json`.
- Page-level SEO metadata is defined in each file under `src/pages`.

## License

See [LICENSE](LICENSE) for license details.
