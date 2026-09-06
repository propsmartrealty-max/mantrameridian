import type { APIRoute } from 'astro';

export const prerender = false; // Cloudflare Workers Edge Execution

/**
 * CLOUDFLARE EDGE PROGRAMMATIC INDEXING BROADCAST API
 * 
 * Supports both GET (webhook/cron) and POST requests to programmatically broadcast
 * all canonical URLs across IndexNow (Bing, Yandex, Seznam, Naver) search engines.
 */

const INDEXNOW_KEY = '4c7e6b0a9f1248a881335b2e3a1d95c2';
const HOST = 'mantrameridianriverside.com';
const KEY_LOCATION = `https://${HOST}/4c7e6b0a9f1248a881335b2e3a1d95c2.txt`;

const ALL_CANONICAL_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/mantra-meridian-riverside/residences/`,
  `https://${HOST}/mantra-meridian-riverside/2-bhk/`,
  `https://${HOST}/mantra-meridian-riverside/3-bhk/`,
  `https://${HOST}/mantra-meridian-riverside/3-bhk-duplex/`,
  `https://${HOST}/mantra-meridian-riverside/4-bhk/`,
  `https://${HOST}/mantra-meridian-riverside/price/`,
  `https://${HOST}/mantra-meridian-riverside/floor-plans/`,
  `https://${HOST}/mantra-meridian-riverside/amenities/`,
  `https://${HOST}/mantra-meridian-riverside/location/`,
  `https://${HOST}/mantra-meridian-riverside/masterplan/`,
  `https://${HOST}/mantra-meridian-riverside/riverside/`,
  `https://${HOST}/mantra-meridian-riverside/gallery/`,
  `https://${HOST}/mantra-meridian-riverside/rera/`,
  `https://${HOST}/mantra-meridian-riverside/documents/`,
  `https://${HOST}/balewadi/`,
  `https://${HOST}/west-pune/`,
  `https://${HOST}/pune-real-estate/`,
  `https://${HOST}/mantra-meridian-riverside/journal/`,
  `https://${HOST}/mantra-meridian-riverside/journal/why-balewadi-emerging-luxury-destination-pune/`,
  `https://${HOST}/mantra-meridian-riverside/journal/balewadi-vs-baner-real-estate-comparison/`,
  `https://${HOST}/mantra-meridian-riverside/journal/architecture-of-light-riverside-living-meridian/`,
  `https://${HOST}/mantra-meridian-riverside/journal/rise-of-sky-duplex-living-pune/`,
  `https://${HOST}/mantra-meridian-riverside/journal/hinjewadi-balewadi-connectivity-corridor/`,
  `https://${HOST}/mantra-meridian-riverside/journal/pune-real-estate-market-outlook-2026-luxury-investment-guide/`
];

async function handleIndexingBroadcast() {
  try {
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: ALL_CANONICAL_URLS
    };

    const dispatches = await Promise.allSettled([
      fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload)
      }),
      fetch('https://www.bing.com/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload)
      })
    ]);

    const results = dispatches.map((res, i) => {
      const endpoint = i === 0 ? 'IndexNow Central' : 'Microsoft Bing';
      if (res.status === 'fulfilled') {
        return { endpoint, status: res.value.status, ok: res.value.ok };
      }
      return { endpoint, status: 'failed', error: (res.reason as Error)?.message };
    });

    return new Response(
      JSON.stringify({
        status: 'success',
        submitted_urls: ALL_CANONICAL_URLS.length,
        dispatches: results,
        timestamp: new Date().toISOString(),
        host: HOST
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: err?.message || 'Failed to execute programmatic indexing broadcast'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export const GET: APIRoute = handleIndexingBroadcast;
export const POST: APIRoute = handleIndexingBroadcast;
