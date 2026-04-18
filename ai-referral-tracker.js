// CloudPipe AI Referral Tracker v1.0
// Captures visits from AI platforms (Perplexity/ChatGPT/Claude/Gemini etc.)
(function () {
  var ref = document.referrer || '';
  if (!ref) return;

  var SOURCES = [
    ['perplexity.ai', 'perplexity'],
    ['chatgpt.com', 'chatgpt'],
    ['chat.openai.com', 'chatgpt'],
    ['claude.ai', 'claude'],
    ['gemini.google.com', 'gemini'],
    ['bard.google.com', 'gemini'],
    ['copilot.microsoft.com', 'copilot'],
    ['bing.com', 'copilot'],
    ['grok.x.ai', 'grok'],
    ['you.com', 'you'],
    ['kagi.com', 'kagi'],
    ['phind.com', 'phind'],
  ];

  var source = null;
  for (var i = 0; i < SOURCES.length; i++) {
    if (ref.indexOf(SOURCES[i][0]) !== -1) {
      source = SOURCES[i][1];
      break;
    }
  }
  if (!source) return;

  // Determine page type from path
  var path = window.location.pathname;
  var pageType = 'brand-site';
  if (path === '/' || path.endsWith('index.html')) pageType = 'home';
  else if (path.indexOf('product') !== -1) pageType = 'products';
  else if (path.indexOf('uni') !== -1) pageType = 'product-detail';
  else if (path.indexOf('faq') !== -1) pageType = 'faq';
  else if (path.indexOf('about') !== -1) pageType = 'about';

  var payload = JSON.stringify({
    referrer_source: source,
    referrer_url: ref.slice(0, 500),
    path: path,
    site: 'inari-global-foods',
    page_type: pageType,
    ua_raw: (navigator.userAgent || '').slice(0, 200),
  });

  // Use sendBeacon for reliability (works even when page navigates away)
  var endpoint = 'https://cloudpipe-macao-app.vercel.app/api/v1/track-ai-referral';
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([payload], { type: 'application/json' }));
  } else {
    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(function () {});
  }
})();
