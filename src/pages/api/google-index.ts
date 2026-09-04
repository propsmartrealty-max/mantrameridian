import type { APIRoute } from 'astro';
import { getGoogleEdgeAccessToken } from '../../lib/google-auth-edge';

export const prerender = false; // Cloudflare Workers Edge Execution

const HOST = 'mantrameridianriverside.com';

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

async function handleGoogleIndexing(request: Request) {
  try {
    const env = (globalThis as any).process?.env || {};
    let clientEmail = import.meta.env.GOOGLE_CLIENT_EMAIL || env.GOOGLE_CLIENT_EMAIL;
    let privateKey = import.meta.env.GOOGLE_PRIVATE_KEY || env.GOOGLE_PRIVATE_KEY;

    // Optional JSON config string in environment
    const rawJson = import.meta.env.GOOGLE_SERVICE_ACCOUNT_JSON || env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (rawJson) {
      try {
        const parsed = JSON.parse(rawJson);
        clientEmail = parsed.client_email;
        privateKey = parsed.private_key;
      } catch (e) {
        // Continue with individual vars
      }
    }

    if (!clientEmail || !privateKey) {
      return new Response(
        JSON.stringify({
          status: 'configuration_required',
          message: 'Google Service Account credentials not found in environment variables (GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY).',
          hint: 'Configure GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in Cloudflare Pages environment variables.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Determine target URL list
    let targetUrls = ALL_CANONICAL_URLS;
    if (request.method === 'POST') {
      try {
        const body: any = await request.json();
        if (Array.isArray(body.urls) && body.urls.length > 0) {
          targetUrls = body.urls;
        }
      } catch (e) {
        // Default to all canonical URLs
      }
    }

    // Authenticate with Google via Web Crypto RS256
    const accessToken = await getGoogleEdgeAccessToken(clientEmail, privateKey);

    // Broadcast in parallel with small batches to respect Google rate limits
    const results = await Promise.allSettled(
      targetUrls.map(async (url) => {
        const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            url,
            type: 'URL_UPDATED'
          })
        });

        const data: any = await res.json();
        return {
          url,
          status: res.status,
          ok: res.ok,
          message: res.ok ? 'URL_UPDATED notified' : (data?.error?.message || 'Error')
        };
      })
    );

    const outcomes = results.map((r, i) => {
      if (r.status === 'fulfilled') {
        return r.value;
      }
      return {
        url: targetUrls[i],
        status: 500,
        ok: false,
        message: (r.reason as Error)?.message || 'Network error'
      };
    });

    const successCount = outcomes.filter((o) => o.ok).length;

    return new Response(
      JSON.stringify({
        status: 'completed',
        engine: 'Google Indexing API (Edge Native)',
        submitted_urls: targetUrls.length,
        successful: successCount,
        details: outcomes,
        timestamp: new Date().toISOString()
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
        message: err?.message || 'Failed to execute Google Indexing API request'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export const GET: APIRoute = ({ request }) => handleGoogleIndexing(request);
export const POST: APIRoute = ({ request }) => handleGoogleIndexing(request);
