#!/bin/bash
# IndexNow 自動提交 — 通知 Bing/Yandex 新內容
# 用法: ./indexnow-submit.sh [specific-url]
# 無參數時提交 sitemap 中所有 URL

SITE="https://inari-kira-isla.github.io/inari-global-foods"
KEY="570eb046f71cfbe946a687fcfc6d050e"
KEY_LOCATION="$SITE/$KEY.txt"

if [ -n "$1" ]; then
  # Submit single URL
  URLS="[\"$1\"]"
  echo "📤 提交單個 URL: $1"
else
  # Submit all URLs from sitemap
  URLS=$(curl -s "$SITE/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed 's/<loc>//;s/<\/loc>//' | python3 -c "
import sys, json
urls = [line.strip() for line in sys.stdin if line.strip()]
print(json.dumps(urls))
")
  COUNT=$(echo "$URLS" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))")
  echo "📤 從 sitemap 提交 $COUNT 個 URL"
fi

# Submit to IndexNow (Bing)
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"inari-kira-isla.github.io\",
    \"key\": \"$KEY\",
    \"keyLocation\": \"$KEY_LOCATION\",
    \"urlList\": $URLS
  }")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
  echo "✅ IndexNow 提交成功 (HTTP $HTTP_CODE)"
else
  echo "❌ IndexNow 提交失敗 (HTTP $HTTP_CODE): $BODY"
fi
