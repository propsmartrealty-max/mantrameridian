import type { APIRoute } from 'astro';

export const prerender = false; // Dynamic Cloudflare Workers Edge Execution

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const GET: APIRoute = async ({ request }) => {
  const startTime = performance.now();
  const headers = request.headers;

  // Cloudflare Edge Specific Header Extraction
  const cfRay = headers.get('cf-ray') || 'direct-v8-execution';
  const cfColo = cfRay.includes('-') ? cfRay.split('-')[1] : headers.get('cf-colo') || 'BOM';
  const cfCountry = headers.get('cf-ipcountry') || 'IN';
  const cfCity = headers.get('cf-ipcity') || 'Pune';
  const cfRegion = headers.get('cf-region') || 'Maharashtra';
  const cfPostalCode = headers.get('cf-postal-code') || '411045';
  const cfContinent = headers.get('cf-ipcontinent') || 'AS';
  const cfMetroCode = headers.get('cf-metro-code') || 'N/A';
  const cfAsn = headers.get('cf-asn') || 'Unknown';
  const cfAsOrg = headers.get('cf-as-organization') || 'Edge Network';
  const cfVisitor = headers.get('cf-visitor') || '{"scheme":"https"}';
  const protocol = headers.get('x-forwarded-proto') || 'https';
  const userAgent = headers.get('user-agent') || 'Unknown Client';

  // Client Hints
  const chUa = headers.get('sec-ch-ua') || '';
  const chPlatform = headers.get('sec-ch-ua-platform') || '';
  const chMobile = headers.get('sec-ch-ua-mobile') || '';

  // NRI Classification
  const isNRI = ['AE', 'US', 'GB', 'SG', 'QA', 'SA', 'CA', 'AU'].includes(cfCountry.toUpperCase());

  const executionDuration = (performance.now() - startTime).toFixed(3);

  const payload = {
    status: 'online',
    edgeTechnology: {
      provider: 'Cloudflare Pages / Workers',
      runtime: 'V8 Isolate Edge Execution',
      smartPlacement: 'Active (Optimized for Nearest Indian Subcontinent / Global Edge Nodes)',
      htmlRewriter: 'Active (Streaming DOM & SEO Optimization)',
      earlyHints103: 'Supported & Configured',
      edgeWaf: 'Active (Automated Threat & Vulnerability Filtering)',
      edgeRateLimiter: 'Active (In-Memory Sliding Window, 5 req / 10 min)',
    },
    routingDiagnostics: {
      coloPoP: cfColo,
      rayId: cfRay,
      protocol,
      edgeLatencyMs: Number(executionDuration),
      timestampIso: new Date().toISOString(),
      timestampIST: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    },
    geoIntelligence: {
      city: cfCity,
      region: cfRegion,
      country: cfCountry,
      postalCode: cfPostalCode,
      continent: cfContinent,
      metroCode: cfMetroCode,
      autonomousSystem: {
        asn: cfAsn,
        organization: cfAsOrg,
      },
      nriInvestorSegment: isNRI,
      marketRouting: isNRI ? 'GLOBAL_NRI_PRIORITY_DESK' : 'DOMESTIC_PUNE_DESK',
    },
    clientProfile: {
      userAgent: userAgent.slice(0, 150),
      clientHints: {
        browser: chUa || 'Standard Browser',
        platform: chPlatform || 'Standard OS',
        mobile: chMobile === '?1',
      },
      visitorScheme: cfVisitor,
    },
    projectIdentity: {
      name: 'Mantra Meridian Riverside',
      reraNumber: 'P52100045688',
      location: 'Balewadi, Pune - 411045',
      canonicalUrl: 'https://mantrameridianriverside.com',
    },
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'X-Edge-PoP': cfColo,
      'X-Edge-Ray': cfRay,
      'X-Edge-Duration': `${executionDuration}ms`,
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
};
