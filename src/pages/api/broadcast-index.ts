import type { APIRoute } from 'astro';
import { getGoogleEdgeAccessToken } from '../../lib/google-auth-edge';

export const prerender = false; // Cloudflare Workers Edge Execution

const HOST = 'mantrameridianriverside.com';
const INDEXNOW_KEY = '4c7e6b0a9f1248a881335b2e3a1d95c2';
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

async function handleUnifiedBroadcast(locals?: any) {
  try {
    const sitemapUrl = `https://${HOST}/sitemap.xml`;

    const runtimeEnv = (locals as any)?.runtime?.env || {};
    const procEnv = (globalThis as any).process?.env || {};
    const globalEnv = globalThis as any;

    let clientEmail = 
      runtimeEnv.GOOGLE_CLIENT_EMAIL || 
      import.meta.env.GOOGLE_CLIENT_EMAIL || 
      procEnv.GOOGLE_CLIENT_EMAIL ||
      globalEnv.GOOGLE_CLIENT_EMAIL;

    let privateKey = 
      runtimeEnv.GOOGLE_PRIVATE_KEY || 
      import.meta.env.GOOGLE_PRIVATE_KEY || 
      procEnv.GOOGLE_PRIVATE_KEY ||
      globalEnv.GOOGLE_PRIVATE_KEY;

    const rawJson = 
      runtimeEnv.GOOGLE_SERVICE_ACCOUNT_JSON || 
      import.meta.env.GOOGLE_SERVICE_ACCOUNT_JSON || 
      procEnv.GOOGLE_SERVICE_ACCOUNT_JSON ||
      globalEnv.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (rawJson) {
      try {
        const parsed = typeof rawJson === 'string' ? JSON.parse(rawJson) : rawJson;
        clientEmail = parsed.client_email || clientEmail;
        privateKey = parsed.private_key || privateKey;
      } catch (e) {}
    }

    // 1. IndexNow payload (Bing, Yandex, Seznam, Naver)
    const indexNowPayload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: ALL_CANONICAL_URLS
    };

    const dispatches: Promise<any>[] = [
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
    ];

    const serviceNames = ['Microsoft Bing IndexNow', 'IndexNow Central', 'Google Sitemap Ping'];

    // If Google Service Account credentials exist, also dispatch all canonical URLs to Google Indexing API
    if (clientEmail && privateKey) {
      serviceNames.push('Google Indexing API (Edge JWT)');
      dispatches.push(
        (async () => {
          const token = await getGoogleEdgeAccessToken(clientEmail, privateKey);
          const publishPromises = ALL_CANONICAL_URLS.map((url) =>
            fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                url,
                type: 'URL_UPDATED'
              })
            })
          );
          const responses = await Promise.allSettled(publishPromises);
          const allOk = responses.every((r) => r.status === 'fulfilled' && (r.value as Response).ok);
          return {
            status: allOk ? 200 : 207,
            ok: allOk
          };
        })()
      );
    }

    const settled = await Promise.allSettled(dispatches);

    const results = settled.map((res, i) => {
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

export const GET: APIRoute = ({ locals }) => handleUnifiedBroadcast(locals);
export const POST: APIRoute = ({ locals }) => handleUnifiedBroadcast(locals);
