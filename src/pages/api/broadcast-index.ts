import type { APIRoute } from 'astro';

export const prerender = false; // Cloudflare Workers Edge Execution

const HOST = 'mantrameridianriverside.com';
const INDEXNOW_KEY = '4c7e6b0a9f1248a881335b2e3a1d95c2';
const KEY_LOCATION = `https://${HOST}/4c7e6b0a9f1248a881335b2e3a1d95c2.txt`;

const ALL_CANONICAL_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/mantra-meridian-riverside/residences`,
  `https://${HOST}/mantra-meridian-riverside/2-bhk`,
  `https://${HOST}/mantra-meridian-riverside/3-bhk`,
  `https://${HOST}/mantra-meridian-riverside/3-bhk-duplex`,
  `https://${HOST}/mantra-meridian-riverside/4-bhk`,
  `https://${HOST}/mantra-meridian-riverside/price`,
  `https://${HOST}/mantra-meridian-riverside/floor-plans`,
  `https://${HOST}/mantra-meridian-riverside/amenities`,
  `https://${HOST}/mantra-meridian-riverside/location`,
  `https://${HOST}/mantra-meridian-riverside/masterplan`,
  `https://${HOST}/mantra-meridian-riverside/riverside`,
  `https://${HOST}/mantra-meridian-riverside/gallery`,
  `https://${HOST}/mantra-meridian-riverside/rera`,
  `https://${HOST}/mantra-meridian-riverside/documents`,
  `https://${HOST}/balewadi`,
  `https://${HOST}/west-pune`,
  `https://${HOST}/pune-real-estate`,
  `https://${HOST}/mantra-meridian-riverside/journal`,
  `https://${HOST}/mantra-meridian-riverside/journal/why-balewadi-emerging-luxury-destination-pune`,
  `https://${HOST}/mantra-meridian-riverside/journal/balewadi-vs-baner-real-estate-comparison`,
  `https://${HOST}/mantra-meridian-riverside/journal/architecture-of-light-riverside-living-meridian`,
  `https://${HOST}/mantra-meridian-riverside/journal/rise-of-sky-duplex-living-pune`,
  `https://${HOST}/mantra-meridian-riverside/journal/hinjewadi-balewadi-connectivity-corridor`,
  `https://${HOST}/mantra-meridian-riverside/journal/pune-real-estate-market-outlook-2026-luxury-investment-guide`
];

async function handleUnifiedBroadcast() {
  try {
    const sitemapUrl = `https://${HOST}/sitemap.xml`;

    // 1. IndexNow payload (Bing, Yandex, Seznam, Naver)
    const indexNowPayload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: ALL_CANONICAL_URLS
    };

    // 2. Parallel dispatches to Search Engine Endpoints
    const dispatches = await Promise.allSettled([
      // Microsoft Bing IndexNow
      fetch('https://www.bing.com/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(indexNowPayload)
      }),
      // IndexNow Central Engine
      fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(indexNowPayload)
      }),
      // Google Search Console Sitemap Ping
      fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, {
        method: 'GET'
      })
    ]);

    const serviceNames = ['Microsoft Bing IndexNow', 'IndexNow Central', 'Google Sitemap Ping'];
    const results = dispatches.map((res, i) => {
      const name = serviceNames[i];
      if (res.status === 'fulfilled') {
        return {
          service: name,
          status: res.value.status,
          ok: res.value.ok
        };
      }
      return {
        service: name,
        status: 500,
        ok: false,
        error: (res.reason as Error)?.message || 'Dispatch failed'
      };
    });

    return new Response(
      JSON.stringify({
        status: 'broadcast_complete',
        timestamp: new Date().toISOString(),
        host: HOST,
        total_urls: ALL_CANONICAL_URLS.length,
        endpoints: results,
        google_indexing_edge_api: `https://${HOST}/api/google-index`
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache'
        }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: err?.message || 'Failed to execute unified indexing broadcast'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export const GET: APIRoute = handleUnifiedBroadcast;
export const POST: APIRoute = handleUnifiedBroadcast;
