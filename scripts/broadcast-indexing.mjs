#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

/**
 * PROGRAMMATIC CLOUDFLARE & SEARCH ENGINE INDEXING BROADCASTER
 * 
 * Automatically parses all canonical URLs from public/sitemap.xml and
 * broadcasts them across global search engine indexing APIs:
 * 1. IndexNow API (Bing, Yandex, Seznam, Naver)
 * 2. Microsoft Bing IndexNow Direct Gateway
 * 3. Google Search Sitemap Ping Gateway
 */

const HOST = 'mantrameridianriverside.com';
const KEY = '4c7e6b0a9f1248a881335b2e3a1d95c2';
const KEY_LOCATION = `https://${HOST}/4c7e6b0a9f1248a881335b2e3a1d95c2.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');

if (!fs.existsSync(sitemapPath)) {
  console.error(`❌ Sitemap file not found at ${sitemapPath}`);
  process.exit(1);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = sitemapContent.match(/<loc>(https:\/\/[^<]+)<\/loc>/g);

if (!locMatches || locMatches.length === 0) {
  console.error('❌ No <loc> URLs found in sitemap.xml');
  process.exit(1);
}

const urlList = locMatches.map((loc) => loc.replace(/<\/?loc>/g, '').trim());

console.log(`📡 Discovered ${urlList.length} canonical URLs for programmatic indexing broadcast:`);
urlList.forEach((url, i) => console.log(`   ${i + 1}. ${url}`));

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList
};

async function broadcastIndexing() {
  console.log('\n🚀 Initiating Programmatic Search Engine Broadcasts...');
  const results = [];

  // 1. Dispatch to global IndexNow Gateway
  try {
    const res1 = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    console.log(`✅ [IndexNow Central] Status: ${res1.status} (${res1.statusText || 'OK'})`);
    results.push({ service: 'IndexNow Central', status: res1.status });
  } catch (err) {
    console.error(`⚠️ [IndexNow Central] Error:`, err.message);
    results.push({ service: 'IndexNow Central', error: err.message });
  }

  // 2. Dispatch to Microsoft Bing Direct Gateway
  try {
    const res2 = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    console.log(`✅ [Microsoft Bing] Status: ${res2.status} (${res2.statusText || 'OK'})`);
    results.push({ service: 'Microsoft Bing', status: res2.status });
  } catch (err) {
    console.error(`⚠️ [Microsoft Bing] Error:`, err.message);
    results.push({ service: 'Microsoft Bing', error: err.message });
  }

  // 3. Dispatch to Google Sitemap Ping Gateway
  try {
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    const res3 = await fetch(googlePingUrl);
    console.log(`✅ [Google Sitemap Ping] Status: ${res3.status} (${res3.statusText || 'OK'})`);
    results.push({ service: 'Google Sitemap Ping', status: res3.status });
  } catch (err) {
    console.error(`⚠️ [Google Sitemap Ping] Error:`, err.message);
    results.push({ service: 'Google Sitemap Ping', error: err.message });
  }

  console.log('\n✨ Programmatic indexing broadcast workflow completed successfully.');
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), totalUrls: urlList.length, results }, null, 2));
}

broadcastIndexing().catch((err) => {
  console.error('Fatal error during indexing broadcast:', err);
  process.exit(1);
});
