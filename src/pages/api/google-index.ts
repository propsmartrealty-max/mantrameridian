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

async function handleGoogleIndexing(request: Request, locals?: any) {
  try {
    const runtimeEnv = locals?.runtime?.env || {};
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

    // Optional JSON config string in environment
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

    // Determine target URL list, notification type, and action
    let targetUrls = ALL_CANONICAL_URLS;
    let notificationType = 'URL_UPDATED';
    let isInspectAction = false;

    const requestUrl = new URL(request.url);
    if (requestUrl.searchParams.get('action') === 'status' || requestUrl.searchParams.get('inspect') === 'true') {
      isInspectAction = true;
    }

    if (request.method === 'POST') {
      try {
        const body: any = await request.json();
        if (Array.isArray(body.urls) && body.urls.length > 0) {
          targetUrls = body.urls;
        } else if (typeof body.url === 'string' && body.url.trim()) {
          targetUrls = [body.url.trim()];
        }
        if (body.type === 'URL_DELETED') {
          notificationType = 'URL_DELETED';
        }
        if (body.action === 'status' || body.action === 'inspect') {
          isInspectAction = true;
        }
      } catch (e) {
        // Default to all canonical URLs with URL_UPDATED
      }
    }

    // Authenticate with Google via Web Crypto RS256
    const accessToken = await getGoogleEdgeAccessToken(clientEmail, privateKey);

    // If inspect action, query Google's recorded notification metadata
    if (isInspectAction) {
      const inspectResults = await Promise.allSettled(
        targetUrls.map(async (url) => {
          const startTime = performance.now();
          const res = await fetch(`https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(url)}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          const data: any = await res.json();
          const elapsed = (performance.now() - startTime).toFixed(1);
          return {
            url,
            status: res.status,
            ok: res.ok,
            elapsed_ms: Number(elapsed),
            metadata: res.ok ? data : null,
            message: res.ok ? 'Metadata retrieved' : (data?.error?.message || 'Not yet crawled or registered')
          };
        })
      );

      const inspectOutcomes = inspectResults.map((r, i) => {
        if (r.status === 'fulfilled') return r.value;
        return {
          url: targetUrls[i],
          status: 500,
          ok: false,
          elapsed_ms: 0,
          message: (r.reason as Error)?.message || 'Network error'
        };
      });

      return new Response(
        JSON.stringify({
          status: 'completed',
          action: 'metadata_inspection',
          engine: 'Google Indexing API (Edge Native)',
          inspected_urls: targetUrls.length,
          details: inspectOutcomes,
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
    }

    // Broadcast publish notifications in parallel
    const results = await Promise.allSettled(
      targetUrls.map(async (url) => {
        const startTime = performance.now();
        const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            url,
            type: notificationType
          })
        });

        const data: any = await res.json();
        const elapsed = (performance.now() - startTime).toFixed(1);
        return {
          url,
          status: res.status,
          ok: res.ok,
          elapsed_ms: Number(elapsed),
          type: notificationType,
          message: res.ok ? `${notificationType} accepted` : (data?.error?.message || 'Error')
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
        elapsed_ms: 0,
        type: notificationType,
        message: (r.reason as Error)?.message || 'Network error'
      };
    });

    const successCount = outcomes.filter((o) => o.ok).length;

    return new Response(
      JSON.stringify({
        status: 'completed',
        action: 'publish',
        engine: 'Google Indexing API (Edge Native)',
        type: notificationType,
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

export const GET: APIRoute = ({ request, locals }) => handleGoogleIndexing(request, locals);
export const POST: APIRoute = ({ request, locals }) => handleGoogleIndexing(request, locals);
