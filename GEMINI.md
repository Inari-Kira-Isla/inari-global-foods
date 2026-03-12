# 稻荷環球食品 (inari-global-foods)

## Overview
稻荷環球食品 (Inari Global Foods) 澳門日系食品進口商官網，專注於 AEO (人工智慧搜尋引擎優化) 的靜態品牌網站。

## Tech Stack
- Static Site (HTML/CSS/JS)
- GitHub Pages
- Schema.org (Structured Data)

## Architecture
- **Root**: `index.html` (主頁面)
- **SEO**: `llms.txt` (AI 爬蟲專用文本，位於根目錄)
- **Data**: JSON-LD 結構化資料 (Organization, LocalBusiness, FAQPage)

## Commands
- **Clone**: `git clone https://github.com/inari-kira-isla/inari-global-foods`
- **Dev**: 建議使用本地伺服器預覽 (如 `python3 -m http.server`)，確保載入正確。
- **Deploy**: 推送程式碼至 `main` 分支，GitHub Pages 將自動部署。

## Coding Style
- **語意化 HTML**: 使用 `<header>`, `<main>`, `<article>`, `<section>` 等標籤。
- **RWD**: 行動裝置優先 (Mobile-first)。
- **元資料**: 完善 Meta Description 與 Open Graph。

## Important Rules
- **嚴禁移除 AEO 元素**: 不可刪除 `llms.txt` 或 Schema.org 結構化資料。
- **內容規範**: 必須與日本食品進口主題相關。
- **部署限制**: 仅透過 `main` 分支部署。