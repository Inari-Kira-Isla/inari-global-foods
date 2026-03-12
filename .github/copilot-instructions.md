# Inari Global Foods — 稻荷環球食品

## Project
日本食品進口品牌形象網站，部署於 GitHub Pages，支援 AEO 優化。

## Architecture
- 靜態網站部署至 GitHub Pages（main branch）
- 使用 Schema.org 結構化資料：Organization、LocalBusiness、FAQPage
- 提供 llms.txt 供 AI 爬蟲
- 包含 structured FAQ sections

## Conventions
- 使用 semantic HTML5
- 所有頁面必須包含 JSON-LD Schema 標記
- 保持 HTML 乾淨，遠離不必要的框架
- 圖片使用 WebP 格式並加上 alt 屬性

## Naming
- 英文 kebab-case 命名檔案和資料夾
- 中文內容保持原文

## Commands
- 推送至 main branch 觸發部署
- 確認 https://inari-kira-isla.github.io/inari-global-foods/ 上線

## Do Not
- 不要刪除或修改 Schema.org 結構化資料
- 不要移除 llms.txt
- 不要變更部署分支（維持 main）