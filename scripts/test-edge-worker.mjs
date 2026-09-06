#!/usr/bin/env node

/**
 * AUTOMATED CLOUDFLARE EDGE SEO WORKER & WHITE BOT TEST SUITE
 * 
 * Verifies:
 * 1. Edge WAF Lite (< 1ms 403 drop)
 * 2. Apex Normalization (www -> apex 301)
 * 3. Uppercase & Trailing Slash Normalization
 * 4. Cache Key Parameter Sanitization (strips utm/gclid/fbclid)
 * 5. White Bot Optimization (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot)
 * 6. Zero-Cookie Isolation for White Bots
 * 7. Human Geolocation & NRI Cookie Segmentation
 * 8. Cache-Control & Cache-Tag Cleanliness
 */

import assert from 'node:assert/strict';
import worker, { getNormalizedCacheUrl, isStaticAssetPath } from '../workers/seo-edge-worker.ts';
import { identifyWhiteBot } from '../src/utils/bot-detection.ts';

console.log('🧪 Starting Cloudflare Edge SEO Worker & White Bot Test Suite...\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

async function runAsyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

// Mock ExecutionContext for Cloudflare Worker
let cachedPuts = [];
const mockCtx = {
  waitUntil: (promise) => {
    cachedPuts.push(promise);
    return Promise.resolve(promise);
  },
  passThroughOnException: () => {}
};

// -----------------------------------------------------------------------------
// 1. Static Asset Identification Tests
// -----------------------------------------------------------------------------
runTest('isStaticAssetPath identifies files and asset paths correctly', () => {
  assert.equal(isStaticAssetPath('/assets/hero.webp'), true);
  assert.equal(isStaticAssetPath('/_astro/chunk.js'), true);
  assert.equal(isStaticAssetPath('/favicon.ico'), true);
  assert.equal(isStaticAssetPath('/sitemap.xml'), true);
  assert.equal(isStaticAssetPath('/llms-full.txt'), true);
  assert.equal(isStaticAssetPath('/api/enquiry'), true);
  assert.equal(isStaticAssetPath('/balewadi/'), false);
  assert.equal(isStaticAssetPath('/mantra-meridian-riverside/2-bhk/'), false);
  assert.equal(isStaticAssetPath('/'), false);
});

// -----------------------------------------------------------------------------
// 2. Cache Key Normalizer Tests
// -----------------------------------------------------------------------------
runTest('getNormalizedCacheUrl strips tracking parameters for 100% cache hit stability', () => {
  const urlWithTrackers = new URL(
    'https://www.mantrameridianriverside.com/balewadi/?utm_source=google&utm_medium=cpc&gclid=12345&fbclid=abcde&clean_param=keepme'
  );
  const normalized = getNormalizedCacheUrl(urlWithTrackers);

  assert.equal(normalized.hostname, 'mantrameridianriverside.com');
  assert.equal(normalized.pathname, '/balewadi/');
  assert.equal(normalized.searchParams.has('utm_source'), false);
  assert.equal(normalized.searchParams.has('utm_medium'), false);
  assert.equal(normalized.searchParams.has('gclid'), false);
  assert.equal(normalized.searchParams.has('fbclid'), false);
  assert.equal(normalized.searchParams.get('clean_param'), 'keepme');
});

// -----------------------------------------------------------------------------
// 3. White Bot Identification Engine Tests
// -----------------------------------------------------------------------------
runTest('identifyWhiteBot accurately categorizes verified search engines and AI crawlers', () => {
  const google = identifyWhiteBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
  assert.equal(google.isWhiteBot, true);
  assert.equal(google.botType, 'Google-Tier1');
  assert.equal(google.shouldExpandDetails, true);

  const bing = identifyWhiteBot('Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)');
  assert.equal(bing.isWhiteBot, true);
  assert.equal(bing.botType, 'Bing-Tier1');
  assert.equal(bing.shouldExpandDetails, true);

  const gpt = identifyWhiteBot('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)');
  assert.equal(gpt.isWhiteBot, true);
  assert.equal(gpt.botType, 'Frontier-AI-Crawler');
  assert.equal(gpt.shouldExpandDetails, true);

  const claude = identifyWhiteBot('Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)');
  assert.equal(claude.isWhiteBot, true);
  assert.equal(claude.botType, 'Frontier-AI-Crawler');
  assert.equal(claude.shouldExpandDetails, true);

  const perplexity = identifyWhiteBot('Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)');
  assert.equal(perplexity.isWhiteBot, true);
  assert.equal(perplexity.botType, 'Frontier-AI-Crawler');

  const human = identifyWhiteBot('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36');
  assert.equal(human.isWhiteBot, false);
  assert.equal(human.shouldExpandDetails, false);
});

// -----------------------------------------------------------------------------
// 4. Edge WAF Lite Tests
// -----------------------------------------------------------------------------
await runAsyncTest('Edge WAF instantly drops /wp-admin and /.env with 403 Forbidden', async () => {
  const wpReq = new Request('https://mantrameridianriverside.com/wp-admin');
  const wpRes = await worker.fetch(wpReq, {}, mockCtx);
  assert.equal(wpRes.status, 403);
  assert.equal(wpRes.headers.get('X-Edge-Defense'), 'Active-WAF-Drop');

  const envReq = new Request('https://mantrameridianriverside.com/.env');
  const envRes = await worker.fetch(envReq, {}, mockCtx);
  assert.equal(envRes.status, 403);
  assert.equal(envRes.headers.get('X-Edge-Defense'), 'Active-WAF-Drop');
});

// -----------------------------------------------------------------------------
// 5. Edge Canonical & Apex Normalization Tests
// -----------------------------------------------------------------------------
await runAsyncTest('Edge Canonical 301 redirects www to apex canonical domain with trailing slash', async () => {
  const wwwReq = new Request('https://www.mantrameridianriverside.com/balewadi');
  const res = await worker.fetch(wwwReq, {}, mockCtx);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('Location'), 'https://mantrameridianriverside.com/balewadi/');
});

await runAsyncTest('Edge Canonical 301 redirects uppercase path to lowercase with trailing slash', async () => {
  const upperReq = new Request('https://mantrameridianriverside.com/Balewadi');
  const res = await worker.fetch(upperReq, {}, mockCtx);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('Location'), 'https://mantrameridianriverside.com/balewadi/');
});

await runAsyncTest('Edge Canonical 301 enforces trailing slash on directory routes', async () => {
  const slashReq = new Request('https://mantrameridianriverside.com/balewadi');
  const res = await worker.fetch(slashReq, {}, mockCtx);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('Location'), 'https://mantrameridianriverside.com/balewadi/');
});

// -----------------------------------------------------------------------------
// 6. White Bot Optimization & Cookie Isolation Tests
// -----------------------------------------------------------------------------
await runAsyncTest('Worker delivers zero-cookie response with Tier-1 headers to Googlebot', async () => {
  const mockHtml = `<!DOCTYPE html><html><head><title>Test Page</title></head><body><h1>Mantra Meridian</h1></body></html>`;
  const env = {
    ASSETS: {
      fetch: async () => new Response(mockHtml, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }
  };

  const googlebotReq = new Request('https://mantrameridianriverside.com/balewadi/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'cf-ipcountry': 'US',
      'cf-colo': 'SJC'
    }
  });

  const res = await worker.fetch(googlebotReq, env, mockCtx);
  assert.equal(res.status, 200);

  // Crawler Headers
  assert.ok(res.headers.get('X-Robots-Tag')?.includes('index, follow'));
  assert.equal(res.headers.get('X-Crawler-Priority'), 'Tier-1-Verified-WhiteBot');
  assert.equal(res.headers.get('X-WhiteBot-Type'), 'Google-Tier1');

  // CRITICAL: White Bots must never receive Set-Cookie
  assert.equal(res.headers.has('Set-Cookie'), false);

  // AI Search & Ingestion Signals
  assert.equal(res.headers.get('Content-Signal'), 'ai-train=yes, ai-search=yes');
  assert.equal(res.headers.get('X-AI-Context'), 'https://mantrameridianriverside.com/llms-full.txt');

  // Cache-Control & Cache-Tag
  assert.ok(res.headers.get('Cache-Control')?.includes('stale-while-revalidate'));
  assert.equal(res.headers.get('Cache-Tag'), 'mantra-meridian, html-pages, riverside-balewadi');
});

await runAsyncTest('Worker delivers zero-cookie response with Tier-1 headers to OpenAI GPTBot', async () => {
  const mockHtml = `<!DOCTYPE html><html><head></head><body><h1>AI Test</h1></body></html>`;
  const env = {
    ASSETS: {
      fetch: async () => new Response(mockHtml, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }
  };

  const gptReq = new Request('https://mantrameridianriverside.com/balewadi/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
      'cf-ipcountry': 'US',
      'cf-colo': 'SJC'
    }
  });

  const res = await worker.fetch(gptReq, env, mockCtx);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('X-Crawler-Priority'), 'Tier-1-Verified-WhiteBot');
  assert.equal(res.headers.get('X-WhiteBot-Type'), 'Frontier-AI-Crawler');
  assert.equal(res.headers.has('Set-Cookie'), false);
});

// -----------------------------------------------------------------------------
// 7. Human Geolocation & Cookie Assignment Tests
// -----------------------------------------------------------------------------
await runAsyncTest('Worker tags human Indian visitor with domestic market cookie', async () => {
  const mockHtml = '<!DOCTYPE html><html><head></head><body><h1>Domestic</h1></body></html>';
  const env = {
    ASSETS: {
      fetch: async () => new Response(mockHtml, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }
  };

  const userReq = new Request('https://mantrameridianriverside.com/balewadi/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      'cf-ipcountry': 'IN',
      'cf-ipcity': 'Pune',
      'cf-region': 'Maharashtra',
      'cf-colo': 'BOM'
    }
  });

  const res = await worker.fetch(userReq, env, mockCtx);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('X-Edge-PoP'), 'BOM');
  assert.equal(res.headers.get('X-Edge-Country'), 'IN');
  assert.ok(res.headers.get('Set-Cookie')?.includes('cf_geo_market=domestic'));
});

await runAsyncTest('Worker tags human NRI visitor with nri market cookie', async () => {
  const mockHtml = '<!DOCTYPE html><html><head></head><body><h1>NRI</h1></body></html>';
  const env = {
    ASSETS: {
      fetch: async () => new Response(mockHtml, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    }
  };

  const nriReq = new Request('https://mantrameridianriverside.com/balewadi/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0',
      'cf-ipcountry': 'AE', // Dubai / UAE
      'cf-ipcity': 'Dubai',
      'cf-colo': 'DXB'
    }
  });

  const res = await worker.fetch(nriReq, env, mockCtx);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('X-Edge-PoP'), 'DXB');
  assert.ok(res.headers.get('Set-Cookie')?.includes('cf_geo_market=nri'));
});

// -----------------------------------------------------------------------------
// Test Summary
// -----------------------------------------------------------------------------
console.log(`\n📊 Test Suite Complete: ${passedTests}/${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('🎉 All Cloudflare Edge SEO Worker & White Bot tests passed successfully!\n');
  process.exit(0);
} else {
  console.error(`❌ ${totalTests - passedTests} test(s) failed.\n`);
  process.exit(1);
}
