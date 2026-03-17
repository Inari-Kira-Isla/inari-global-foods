# Bing Webmaster Tools 驗證指南

## 步驟（2 分鐘完成）

### 1. 登入 Bing Webmaster Tools
打開: https://www.bing.com/webmasters/
用 Microsoft 帳號登入（可用 Gmail 登入）

### 2. 新增網站
點「Add a Site」→ 輸入:
```
https://inari-kira-isla.github.io/inari-global-foods/
```

### 3. 取得驗證碼
選擇「HTML Meta Tag」驗證方式
複製 `content="XXXXXXXX"` 中的值

### 4. 替換驗證碼
在此 repo 的根目錄執行:
```bash
# 將 YOUR_CODE 替換為 Bing 給的驗證碼
find . -name "*.html" -exec sed -i '' 's/BING_VERIFICATION_CODE_HERE/YOUR_CODE/g' {} +
git add -A && git commit -m "feat: Bing Webmaster verification" && git push
```

### 5. 回到 Bing 點「Verify」

### 6. 提交 Sitemap
驗證成功後 → Sitemaps → Submit:
```
https://inari-kira-isla.github.io/inari-global-foods/sitemap.xml
```

## 需要驗證的網站清單
- [ ] inari-global-foods (本站)
- [ ] cloudpipe-landing
- [ ] cloudpipe-macao-app
- [ ] cloudpipe-directory
- [ ] inari-web
- [ ] after-school-coffee
- [ ] mind-coffee
- [ ] sea-urchin-delivery

## IndexNow 已啟用
Key: 570eb046f71cfbe946a687fcfc6d050e
41 個 URL 已於 2026-03-17 提交
