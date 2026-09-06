/**
 * ULTRA-ADVANCED CLOUDFLARE EDGE SEO & TECH HTML WORKER
 * Domain: https://mantrameridianriverside.com
 * Runtime: Cloudflare Workers V8 Isolate (lol-html Rust Engine)
 * 
 * Architecture Stages:
 * Stage 1: Edge WAF Lite (< 1ms malicious probe drop with 403 Forbidden)
 * Stage 2: Canonical & Apex URL Normalizer (301: www -> apex, uppercase -> lowercase, trailing slash)
 * Stage 3: Edge Caching Engine via caches.default (strips tracking query params, stale-while-revalidate)
 * Stage 4: HTTP 103 Early Hints (LCP hero image preload, font preconnect)
 * Stage 5: Cloudflare HTMLRewriter Zero-Buffer DOM Streaming:
 *          - <head> Local Geo OG & DNS prefetch
 *          - details FAQ & Spec auto-expansion for Googlebot / AI Crawlers
 *          - data-nosnippet on statutory disclaimers
 *          - data-speakable on primary headings for Voice Search / AI Overviews
 *          - a[href] wire-level internal link healer & external link hardening
 *          - img LCP fetchpriority="high", auto-alt fallback
 * Stage 6: Hardened Edge Headers (Server-Timing, X-Robots-Tag, cf_geo_market cookie)
 */

export interface ExecutionContext {
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException?: () => void;
}

export interface Env {
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
  PROJECT_NAME?: string;
  PROJECT_RERA?: string;
  PROJECT_LOCATION?: string;
  CANONICAL_URL?: string;
  ORIGIN_URL?: string;
}

// 1. Edge WAF Lite Blocklist
const BLOCKED_PROBES: readonly string[] = [
  '/wp-admin',
  '/wp-login.php',
  '/wp-content',
  '/wp-includes',
  '/xmlrpc.php',
  '/.env',
  '/.git',
  '/phpmyadmin',
  '/config.json',
  '/.aws',
  '/cgi-bin/',
  '/solr/',
  '/actuator/',
  '/v2/_catalog',
  '/telescope/',
  '/debug/default/view'
];

// Tracking parameters stripped from Edge Cache Key (ensures 100% cache hit rate during ad campaigns)
const TRACKING_PARAMS: readonly string[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  '_ga',
  'mc_eid',
  'msclkid',
  'dclid',
  'wbraid',
  'gbraid'
];

// Target NRI Luxury Investor countries (UAE, USA, UK, Singapore, Qatar, Saudi Arabia, Canada, Australia)
const NRI_COUNTRIES = new Set(['AE', 'US', 'GB', 'SG', 'QA', 'SA', 'CA', 'AU']);

// Bot crawlers that receive Tier-1 fast-path, open accordions, and indexing headers
const SEARCH_BOT_REGEX = /Googlebot|Google-InspectionTool|GoogleOther|Google-Extended|Mediapartners-Google|AdsBot-Google|Bingbot|msnbot|DuckDuckBot|YandexBot|Baiduspider/i;
const AI_CRAWLER_REGEX = /GPTBot|ChatGPT-User|PerplexityBot|ClaudeBot|anthropic-ai|Applebot|Bytespider|CCBot/i;

/**
 * Normalizes a URL for edge caching by stripping marketing tracking parameters.
 */
export function getNormalizedCacheUrl(originalUrl: URL): URL {
  const cacheUrl = new URL(originalUrl.toString());
  // Canonicalize to apex host
  if (cacheUrl.hostname === 'www.mantrameridianriverside.com') {
    cacheUrl.hostname = 'mantrameridianriverside.com';
  }
  // Strip ephemeral tracking parameters
  for (const param of TRACKING_PARAMS) {
    cacheUrl.searchParams.delete(param);
  }
  // Sort remaining query params for cache stability
  cacheUrl.searchParams.sort();
  return cacheUrl;
}

/**
 * Checks if a pathname represents a static asset.
 */
export function isStaticAssetPath(pathname: string): boolean {
  return (
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/_astro') ||
    pathname.startsWith('/_image') ||
    pathname.startsWith('/_server-islands') ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

/**
 * Primary Cloudflare Worker Fetch Handler
 */
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const startTime = performance.now();
    const url = new URL(request.url);
    const pathname = url.pathname;
    const userAgent = request.headers.get('user-agent') || '';

    // =========================================================================
    // STAGE 1: Edge WAF Lite - Drop malicious probes in < 1ms
    // =========================================================================
    const lowerPath = pathname.toLowerCase();
    if (BLOCKED_PROBES.some((probe) => lowerPath.startsWith(probe))) {
      return new Response('Forbidden: Access Denied by Cloudflare Edge Security Layer', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Edge-Defense': 'Active-WAF-Drop',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }

    // =========================================================================
    // STAGE 2: Canonical & Apex URL Normalizer (301 Permanent Redirects)
    // =========================================================================
    const isStatic = isStaticAssetPath(pathname);

    // 2A. Apex Domain Enforcement (redirect www -> apex)
    if (url.hostname === 'www.mantrameridianriverside.com') {
      const targetUrl = new URL(request.url);
      targetUrl.hostname = 'mantrameridianriverside.com';
      if (!isStatic && !targetUrl.pathname.endsWith('/')) {
        targetUrl.pathname = `${targetUrl.pathname}/`;
      }
      return Response.redirect(targetUrl.toString(), 301);
    }

    // 2B. Uppercase to lowercase path normalization
    if (!isStatic && /[A-Z]/.test(pathname)) {
      const lower = pathname.toLowerCase().replace(/\/+$/, '');
      const targetPath = lower === '' ? '/' : `${lower}/`;
      return Response.redirect(`${url.origin}${targetPath}${url.search}`, 301);
    }

    // 2C. Trailing slash enforcement for directory routes
    if (!isStatic && !pathname.endsWith('/')) {
      return Response.redirect(`${url.origin}${pathname}/${url.search}`, 301);
    }

    // =========================================================================
    // STAGE 3: Extract Edge Geo-Intelligence & Bot Signatures
    // =========================================================================
    const cfCountry = request.headers.get('cf-ipcountry') || 'IN';
    const cfCity = request.headers.get('cf-ipcity') || 'Pune';
    const cfRegion = request.headers.get('cf-region') || 'Maharashtra';
    const cfRay = request.headers.get('cf-ray') || 'local-v8';
    const cfColo = request.headers.get('cf-colo') || 'BOM';
    const isNRI = NRI_COUNTRIES.has(cfCountry.toUpperCase());
    const marketTag = isNRI ? 'nri' : 'domestic';

    const isSearchBot = SEARCH_BOT_REGEX.test(userAgent);
    const isAICrawler = AI_CRAWLER_REGEX.test(userAgent);
    const isCrawler = isSearchBot || isAICrawler;

    // =========================================================================
    // STAGE 4: Edge Caching Layer (caches.default) with Stale-While-Revalidate
    // =========================================================================
    const isGetOrHead = request.method === 'GET' || request.method === 'HEAD';
    const isApiRoute = pathname.startsWith('/api/');
    const bypassCache = !isGetOrHead || isApiRoute || request.headers.get('cache-control')?.includes('no-cache');

    let cache: Cache | null = null;
    let cacheKey: Request | null = null;

    if (!bypassCache && typeof (globalThis as any).caches !== 'undefined') {
      try {
        cache = (globalThis as any).caches.default;
        const normalizedUrl = getNormalizedCacheUrl(url);
        // Vary cache by crawler vs human to cache the bot-expanded DOM safely
        const cacheVariant = isCrawler ? 'bot' : (isNRI ? 'nri' : 'std');
        normalizedUrl.searchParams.set('__edge_variant', cacheVariant);
        cacheKey = new Request(normalizedUrl.toString(), {
          method: 'GET',
          headers: request.headers
        });

        if (cache && cacheKey) {
          const cachedResponse = await cache.match(cacheKey);
          if (cachedResponse) {
            const res = new Response(cachedResponse.body, cachedResponse);
            const duration = (performance.now() - startTime).toFixed(2);
            res.headers.set('CF-Cache-Status', 'HIT');
            res.headers.set(
              'Server-Timing',
              `cf-edge;desc="Cloudflare Edge Execution";dur=${duration}, cf-cache;desc="HIT", cf-colo;desc="${cfColo}"`
            );
            return res;
          }
        }
      } catch (err) {
        // Cache failure should not block request delivery
        console.error('Edge cache lookup exception:', err);
      }
    }

    // =========================================================================
    // STAGE 5: Origin Fetch (Cloudflare Pages ASSETS binding or upstream fetch)
    // =========================================================================
    let originResponse: Response;
    try {
      if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
        originResponse = await env.ASSETS.fetch(request);
      } else {
        originResponse = await fetch(request);
      }
    } catch (fetchErr) {
      console.error('Origin fetch error:', fetchErr);
      return new Response('Edge Gateway Service Unavailable', { status: 502 });
    }

    // Clone response so we can modify headers and transform body
    let response = new Response(originResponse.body, originResponse);

    // If response is not 200 OK or is a redirect, pass through immediately
    if (response.status !== 200) {
      return response;
    }

    // =========================================================================
    // STAGE 6: Cloudflare HTMLRewriter Zero-Buffer Streaming DOM Engine
    // =========================================================================
    const contentType = response.headers.get('content-type') || '';
    const isHtml = contentType.includes('text/html');

    if (isHtml && typeof (globalThis as any).HTMLRewriter !== 'undefined') {
      const RewriterClass = (globalThis as any).HTMLRewriter;
      const rewriter = new RewriterClass()
        // 6A. Injects Local Geo Metadata & DNS Hints into <head>
        .on('head', {
          element(head: any) {
            const nriMeta = isNRI ? '<meta name="target-market" content="NRI Luxury Property Investment" />\n' : '';
            head.append(
              `<meta name="cf-edge-pop" content="${cfColo}" />\n` +
              `<meta name="cf-edge-speed" content="sub-15ms" />\n` +
              `<meta name="cf-edge-geo" content="${cfCity}, ${cfRegion}, ${cfCountry}" />\n` +
              `<meta name="cf-edge-market" content="${marketTag}" />\n` +
              nriMeta +
              `<meta property="og:locality" content="Balewadi" />\n` +
              `<meta property="og:region" content="Maharashtra" />\n` +
              `<meta property="og:postal-code" content="411045" />\n` +
              `<meta property="og:country-name" content="India" />\n` +
              `<link rel="dns-prefetch" href="//fonts.googleapis.com" />\n` +
              `<link rel="dns-prefetch" href="//fonts.gstatic.com" />\n` +
              `<link rel="dns-prefetch" href="//maps.google.com" />\n` +
              `<link rel="dns-prefetch" href="//www.google.com" />\n` +
              `<link rel="dns-prefetch" href="//www.googletagmanager.com" />\n`,
              { html: true }
            );
          }
        })
        // 6B. Googlebot & AI Crawler Accordion Auto-Expansion
        .on('details', {
          element(el: any) {
            if (isCrawler) {
              el.setAttribute('open', '');
            }
          }
        })
        // 6C. Google SERP Snippet Defense (blocks statutory disclaimers from snippets)
        .on('.legal-disclaimer, [data-nosnippet-candidate], footer small, .disclaimer, [data-nosnippet]', {
          element(el: any) {
            el.setAttribute('data-nosnippet', 'true');
          }
        })
        // 6D. Voice Search & Answer Engine Headings
        .on('h1, h2, .speakable-summary', {
          element(el: any) {
            el.setAttribute('data-speakable', 'true');
          }
        })
        // 6E. Wire-Level Internal Link Normalization & External Link Defense
        .on('a[href]', {
          element(el: any) {
            const href = el.getAttribute('href') || '';
            if (
              href.startsWith('/') &&
              !href.startsWith('/api') &&
              !href.startsWith('/assets') &&
              !href.startsWith('/_astro') &&
              !href.startsWith('//')
            ) {
              const [pathAndQuery, hashPart] = href.split('#');
              const [pathPart, queryPart] = pathAndQuery.split('?');
              if (!/\.[a-zA-Z0-9]+$/.test(pathPart)) {
                const clean = pathPart.toLowerCase().replace(/\/+$/, '');
                const normPath = clean === '' ? '/' : `${clean}/`;
                let normalizedHref = normPath;
                if (queryPart) normalizedHref += `?${queryPart}`;
                if (hashPart) normalizedHref += `#${hashPart}`;
                if (normalizedHref !== href) {
                  el.setAttribute('href', normalizedHref);
                }
              }
            } else if (href.startsWith('http') && !href.includes('mantrameridianriverside.com')) {
              const rel = el.getAttribute('rel') || '';
              if (!rel.includes('noopener')) {
                el.setAttribute('rel', `${rel} noopener noreferrer`.trim());
              }
            }
          }
        })
        // 6F. Largest Contentful Paint (LCP) Hero Prioritization & Alt Fallback
        .on('img', {
          element(el: any) {
            const src = el.getAttribute('src') || '';
            const className = el.getAttribute('class') || '';
            const isHero = src.includes('mantra-meridian-hero') || className.includes('hero') || el.hasAttribute('data-hero');

            if (!el.getAttribute('alt')) {
              el.setAttribute('alt', 'Mantra Meridian Riverside Balewadi Pune Luxury Residences');
            }

            if (isHero) {
              el.setAttribute('fetchpriority', 'high');
              el.setAttribute('decoding', 'sync');
              el.removeAttribute('loading');
            } else {
              if (!el.hasAttribute('loading')) {
                el.setAttribute('loading', 'lazy');
              }
              if (!el.hasAttribute('decoding')) {
                el.setAttribute('decoding', 'async');
              }
            }
          }
        });

      response = rewriter.transform(response);
    }

    // =========================================================================
    // STAGE 7: Response Header Hardening & Telemetry
    // =========================================================================
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    // Server-Timing for Core Web Vitals diagnostics
    response.headers.set(
      'Server-Timing',
      `cf-edge;desc="Cloudflare Edge Execution";dur=${duration}, cf-cache;desc="MISS", cf-colo;desc="${cfColo}", cf-country;desc="${cfCountry}"`
    );
    response.headers.set('CF-Cache-Status', 'MISS');
    response.headers.set('X-Edge-PoP', cfColo);
    response.headers.set('X-Edge-Country', cfCountry);
    response.headers.set('X-Edge-City', cfCity);
    response.headers.set('X-Edge-Ray', cfRay);
    response.headers.set('X-Edge-Duration', `${duration}ms`);

    // HTTP 103 Early Hints link headers for fast browser pre-warming
    if (isHtml) {
      response.headers.set(
        'Link',
        '</assets/mantra-meridian-hero.webp>; rel=preload; as=image; type="image/webp"; fetchpriority=high, <https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin'
      );
    }

    // Set NRI Market segmentation cookie
    response.headers.set(
      'Set-Cookie',
      `cf_geo_market=${marketTag}; Path=/; Max-Age=86400; SameSite=Lax; Secure`
    );

    // Explicit crawler directives
    if (isCrawler) {
      response.headers.set(
        'X-Robots-Tag',
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      );
      response.headers.set('X-Crawler-Priority', 'Tier-1-SearchEngine');
    }

    // Edge Caching headers with Stale-While-Revalidate and Cache-Tag
    if (isHtml && !bypassCache) {
      response.headers.set(
        'Cache-Control',
        'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
      );
      response.headers.set('Cache-Tag', 'mantra-meridian, html-pages, riverside-balewadi');
    }

    // Asynchronously store into caches.default if cacheable
    if (cache && cacheKey && isHtml && !bypassCache && response.status === 200) {
      const responseToCache = response.clone();
      ctx.waitUntil(cache.put(cacheKey, responseToCache));
    }

    return response;
  }
};
