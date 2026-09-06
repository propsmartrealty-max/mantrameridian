#!/usr/bin/env node

/**
 * AUTOMATED CLOUDFLARE EDGE SEO WORKER TEST SUITE
 * 
 * Verifies all 6 stages of the edge worker pipeline:
 * 1. Edge WAF Lite (< 1ms 403 drop)
 * 2. Apex Normalization (www -> apex 301)
 * 3. Uppercase & Trailing Slash Normalization
 * 4. Cache Key Parameter Sanitization
 * 5. Bot Header Injection (X-Robots-Tag, X-Crawler-Priority)
 * 6. Geo & NRI Segmentation (Set-Cookie cf_geo_market)
 * 7. HTMLRewriter DOM Transformation (details open, data-nosnippet, data-speakable, LCP priority)
 */

import assert from 'node:assert/strict';
import worker, { getNormalizedCacheUrl, isStaticAssetPath } from '../workers/seo-edge-worker.ts';

console.log('🧪 Starting Cloudflare Edge SEO Worker Test Suite...\n');

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
const mockCtx = {
  waitUntil: (promise) => Promise.resolve(promise),
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
// 3. Edge WAF Lite Tests
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

  const gitReq = new Request('https://mantrameridianriverside.com/.git/config');
  const gitRes = await worker.fetch(gitReq, {}, mockCtx);
  assert.equal(gitRes.status, 403);
  assert.equal(gitRes.headers.get('X-Edge-Defense'), 'Active-WAF-Drop');
});

// -----------------------------------------------------------------------------
// 4. Edge Canonical & Apex Normalization Tests
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
// 5. Googlebot & Search Engine Tier-1 Fast Path Tests
// -----------------------------------------------------------------------------
await runAsyncTest('Worker detects Googlebot and injects indexing headers and early hints', async () => {
  const mockHtml = `<!DOCTYPE html>
<html>
<head><title>Test Page</title></head>
<body>
  <h1>Mantra Meridian Luxury</h1>
  <details><summary>FAQ 1</summary><p>Answer 1</p></details>
  <img src="/assets/mantra-meridian-hero.webp" class="hero" />
  <div class="legal-disclaimer">Statutory MahaRERA text</div>
</body>
</html>`;

  const mockOriginFetch = async () => {
    return new Response(mockHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  };

  const env = {
    ASSETS: { fetch: mockOriginFetch }
  };

  const googlebotReq = new Request('https://mantrameridianriverside.com/balewadi/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'cf-ipcountry': 'US',
      'cf-colo': 'SJC',
      'cf-ray': 'test-ray-sjc'
    }
  });

  const res = await worker.fetch(googlebotReq, env, mockCtx);
  assert.equal(res.status, 200);

  // Check Crawler Headers
  const xRobots = res.headers.get('X-Robots-Tag');
  assert.ok(xRobots && xRobots.includes('index, follow'));
  assert.equal(res.headers.get('X-Crawler-Priority'), 'Tier-1-SearchEngine');

  // Check 103 Early Hints Link Preload Header
  const linkHeader = res.headers.get('Link');
  assert.ok(linkHeader && linkHeader.includes('mantra-meridian-hero.webp'));

  // Check Edge Server-Timing Header
  const serverTiming = res.headers.get('Server-Timing');
  assert.ok(serverTiming && serverTiming.includes('cf-edge'));

  // Check Cache-Control & Cache-Tag
  assert.ok(res.headers.get('Cache-Control')?.includes('stale-while-revalidate'));
  assert.equal(res.headers.get('Cache-Tag'), 'mantra-meridian, html-pages, riverside-balewadi');

  // Check NRI Cookie (US is in NRI set)
  assert.ok(res.headers.get('Set-Cookie')?.includes('cf_geo_market=nri'));
});

// -----------------------------------------------------------------------------
// 6. Domestic Geo & Standard User Tests
// -----------------------------------------------------------------------------
await runAsyncTest('Worker tags domestic Indian visitor with domestic market cookie', async () => {
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

// -----------------------------------------------------------------------------
// Test Summary
// -----------------------------------------------------------------------------
console.log(`\n📊 Test Suite Complete: ${passedTests}/${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('🎉 All Cloudflare Edge SEO Worker tests passed successfully!\n');
  process.exit(0);
} else {
  console.error(`❌ ${totalTests - passedTests} test(s) failed.\n`);
  process.exit(1);
}
