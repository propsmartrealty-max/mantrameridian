import type { APIRoute } from 'astro';

/**
 * CLOUDFLARE EDGE INDEXNOW AUTOMATION ENDPOINT
 * Instantly broadcasts updated project URLs to Bing, Yandex, and syndicated search indexes
 */

const INDEXNOW_KEY = '4c7e6b0a9f1248a881335b2e3a1d95c2';
const HOST = 'mantrameridianriverside.com';
const KEY_LOCATION = `https://${HOST}/4c7e6b0a9f1248a881335b2e3a1d95c2.txt`;

const PRIORITY_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/mantra-meridian-riverside/residences`,
  `https://${HOST}/mantra-meridian-riverside/price`,
  `https://${HOST}/mantra-meridian-riverside/floor-plans`,
  `https://${HOST}/mantra-meridian-riverside/2-bhk`,
  `https://${HOST}/mantra-meridian-riverside/3-bhk`,
  `https://${HOST}/mantra-meridian-riverside/3-bhk-duplex`,
  `https://${HOST}/mantra-meridian-riverside/4-bhk`,
  `https://${HOST}/mantra-meridian-riverside/location`,
  `https://${HOST}/mantra-meridian-riverside/amenities`,
  `https://${HOST}/mantra-meridian-riverside/masterplan`,
  `https://${HOST}/mantra-meridian-riverside/riverside`,
  `https://${HOST}/mantra-meridian-riverside/gallery`,
  `https://${HOST}/mantra-meridian-riverside/rera`,
  `https://${HOST}/mantra-meridian-riverside/documents`,
  `https://${HOST}/mantra-meridian-riverside/journal`,
  `https://${HOST}/pune-real-estate`
];

export const POST: APIRoute = async () => {
  try {
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: PRIORITY_URLS
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return new Response(
      JSON.stringify({
        status: 'success',
        indexnow_status: response.status,
        submitted_urls: PRIORITY_URLS.length,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: err?.message || 'Failed to dispatch IndexNow ping'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      endpoint: 'Cloudflare IndexNow Broadcast Gateway',
      host: HOST,
      registered_key: INDEXNOW_KEY,
      target_urls: PRIORITY_URLS.length,
      method: 'POST to trigger instant search engine re-indexing'
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
