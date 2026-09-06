/**
 * MANTRA MERIDIAN RIVERSIDE — ADVANCED PWA SERVICE WORKER
 * Version: mantra-meridian-v1
 * 
 * Features:
 * 1. Cache-First for static immutable assets (/_astro/*, /assets/*, /fonts/*, favicons)
 * 2. Stale-While-Revalidate for HTML directory pages
 * 3. Network-Only for dynamic APIs (/api/*)
 * 4. Automatic cache version cleanup on activate
 * 5. Safe offline resilience
 */

const CACHE_NAME = 'mantra-meridian-v1';

// Critical core assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/favicon.svg',
  '/favicon.ico',
  '/site.webmanifest',
  '/apple-touch-icon.png',
  '/assets/mantra-meridian-hero.webp',
  '/assets/mantra-meridian-rera-qr.webp'
];

// Install: Precache critical shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Purge obsolete caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('mantra-meridian-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Smart Strategy Dispatcher
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Network-Only: API routes and analytics
  if (url.pathname.startsWith('/api/') || url.hostname.includes('google-analytics') || url.hostname.includes('googletagmanager')) {
    return;
  }

  // Cache-First: Immutable static assets (_astro, assets, fonts, icons)
  if (
    url.pathname.startsWith('/_astro/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.woff2')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Stale-While-Revalidate: HTML Pages
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Offline fallback to cached response or root shell
            return cachedResponse || caches.match('/');
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }
});
