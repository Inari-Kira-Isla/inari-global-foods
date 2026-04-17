# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

稻荷環球食品 (Inari Global Foods) — a Macau Japanese-seafood import wholesaler's brand site. It is a **static site** (no build step, no package manager) whose overriding purpose is **AEO / GEO** (Answer Engine / Generative Engine Optimization): being ingested and cited by LLMs (ChatGPT, Claude, Perplexity, Gemini, Baidu-class Chinese bots) and traditional search engines.

- Live (GitHub Pages, canonical): https://inari-kira-isla.github.io/inari-global-foods/
- Mirror (Vercel): https://inari-global-foods.vercel.app/
- Default content language: `zh-Hant` (Traditional Chinese, Macau). English and Portuguese variants exist for select pages and articles.

## Commands

There is no build, lint, or test tooling. All workflows are file edits + git.

- **Local preview**: `python3 -m http.server 8000` from repo root, then visit `http://localhost:8000/`. Required because pages load sibling HTML, JSON, and `/articles/` via relative paths.
- **Deploy**: push to `main`. GitHub Pages serves from `main`; Vercel auto-deploys from the same branch using `vercel.json` (security headers + CSP).
- **Notify search engines after publishing**:
  - All sitemap URLs: `./indexnow-submit.sh`
  - Single URL: `./indexnow-submit.sh https://inari-kira-isla.github.io/inari-global-foods/articles/<slug>.html`
  - The IndexNow key file is `570eb046f71cfbe946a687fcfc6d050e.txt` at repo root — do not rename or delete.

## Repository layout (big picture)

Flat static site. The structure is dictated by what crawlers expect at well-known paths, not by application code.

- **Root HTML pages** — `index.html` (PPT-style homepage using GSAP), `products.html`, `uni.html` (sea-urchin flagship page), `about.html`, `faq.html`. Each is a self-contained page with inlined CSS and multiple JSON-LD blocks.
- **`articles/`** — ~200 long-form AEO articles. Filename convention: `YYYY-MM-DD_<slug-with-chinese-or-kebab-case>[-cn|-en|-pt].html`. No suffix = zh-TW (default); `-cn` = Simplified Chinese, `-en` = English, `-pt` = Portuguese. Language variants share a slug and cross-link via `<link rel="alternate" hreflang>`.
- **`data/`** — JSON knowledge base consumed by on-site widgets and by AI crawlers:
  - `chatbot-knowledge.json` — FAQ corpus (242+ Q/A with keywords and category).
  - `full_product_catalog.json` — product catalog.
  - `shun_calendar.json` — Japanese seasonal (旬) ingredient calendar.
  - `seasonal_state.json` — current-month seasonal highlights.
  - `plans/plan_YYYY-MM.json` — monthly editorial plan driving new `articles/` content.
- **`frames/`** — per-video JPG frame sequences (`salmon/`, `unbox/`) used by scroll-driven animation on the PPT homepage; `*_orig/` siblings are uncompressed originals — ship compressed, keep originals out of hot paths.
- **`images/`** — `cards/`, `products/`, `people/`, `daily/`, `generated/`, `drive-import/`, plus hero / category / feature assets. Prefer WebP with meaningful `alt`.
- **`podcast/`** + `podcast.xml` — episode MP3s with an RSS feed.
- **Crawler surface files (root)** — `sitemap.xml` (205 URLs), `robots.txt` (explicitly allows every major Western and Chinese AI bot; do not narrow this), `feed.xml`, `llms.txt`, `security.txt`, `BingSiteAuth.xml`, `google8613029cfa591e27.html`, `<indexnow-key>.txt`, `.nojekyll` (disables Jekyll on Pages).
- **`baseline-screenshots/`** and `audit-report.json` — reference artefacts capturing how ChatGPT/Gemini/Google currently cite the brand; used to measure AEO regressions. Treat as read-only.
- **`index.html.bak`, `index.html.bak2`** — manual rollback snapshots kept on purpose.

## AEO / GEO architecture (the part that requires multiple files to understand)

The site's value comes from machine-readability, not visual polish. Any change must preserve the crawler surface:

1. **Schema.org JSON-LD is mandatory on every page**, embedded as `<script type="application/ld+json">`. Standard blocks:
   - `Organization` + `LocalBusiness` (with `address`, `geo`, `openingHours`, `sameAs` linking to sister brands — cloudpipe, yamanakada, after-school-coffee, etc.)
   - `FAQPage` — one per language (`inLanguage: "zh-Hant" | "en" | "pt"`). The homepage ships three FAQPage blocks.
   - Articles add `Article` / `BlogPosting`.
   Never remove or "clean up" these blocks; validate that edits keep JSON valid.
2. **`llms.txt`** at root advertises canonical URLs to LLM crawlers. Keep it present and in sync with the Vercel/Pages domain(s).
3. **`robots.txt`** is permissive by design — it enumerates GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Baiduspider, Bytespider, DeepSeekBot, Kimi-Bot, QwenBot, etc. Do not prune this list.
4. **Spider-web internal linking** — every page carries `<link rel="related" ...>` tags to sibling pages (index ↔ uni ↔ products ↔ faq ↔ about), and articles cross-link into `macau/hk/tw` encyclopedia entries. Preserve this graph when adding pages: a new article should both receive and emit `related` links.
5. **Cross-site tracking beacons** — pages load `https://cloudpipe-macao-app.vercel.app/spider-track.js` (and a conversion-track beacon) with `data-site="inari-global-foods"` for L3 LLMCF tracking across the sister-brand network. Keep these script tags on new pages.
6. **CSP (in `vercel.json`)** — the allowlist is narrow (self + googletagmanager + google-analytics). New third-party scripts require a `vercel.json` update, not inline workarounds.

## Conventions

- Semantic HTML5 (`<header>`, `<main>`, `<article>`, `<section>`); mobile-first responsive CSS.
- File and folder names: English kebab-case. Chinese is used freely inside article filenames and content; keep it in the original script (zh-TW for default, zh-CN for `-cn`).
- Every page needs: `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, `hreflang` alternates if a translation exists, and JSON-LD.
- Images: WebP preferred, descriptive `alt` text in the page's language.

## What not to touch without a clear reason

- Schema.org JSON-LD blocks, `llms.txt`, `robots.txt`, `sitemap.xml`, `feed.xml`, `podcast.xml`, `.nojekyll`, the IndexNow key file, search-console verification files (`BingSiteAuth.xml`, `google8613029cfa591e27.html`).
- The `main` deployment branch invariant (both Pages and Vercel deploy from it).
- `baseline-screenshots/` and `audit-report.json` (AEO regression baselines).
- `sameAs` links in Organization schema and `rel="related"` link graph — these are the spider-web.

## Related guidance files

`AGENTS.md`, `GEMINI.md`, and `.github/copilot-instructions.md` contain overlapping short briefs for other agents. `BING-SETUP.md` documents the Bing Webmaster verification flow.
