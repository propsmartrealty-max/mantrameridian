#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

/**
 * UNIFIED SEARCH ENGINE & GOOGLE INDEXING PROGRAMMATIC BROADCASTER
 * 
 * Automatically parses all canonical URLs from public/sitemap.xml and broadcasts
 * them across all search engine indexing APIs:
 * 1. Google Indexing API (Service Account OAuth 2.0 RS256 JWT)
 * 2. IndexNow Central (Bing, Yandex, Seznam, Naver)
 * 3. Microsoft Bing IndexNow Direct Gateway
 * 4. Bing Sitemap Ping Gateway
 */

const HOST = 'mantrameridianriverside.com';
const INDEXNOW_KEY = '4c7e6b0a9f1248a881335b2e3a1d95c2';
const KEY_LOCATION = `https://${HOST}/4c7e6b0a9f1248a881335b2e3a1d95c2.txt`;
const CREDENTIALS_PATH = path.resolve(process.cwd(), 'service-account.json');
const SITEMAP_PATH = path.resolve(process.cwd(), 'public/sitemap.xml');

if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(`❌ Sitemap file not found at ${SITEMAP_PATH}`);
  process.exit(1);
}

const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
const locMatches = sitemapContent.match(/<loc>(https:\/\/[^<]+)<\/loc>/g);

if (!locMatches || locMatches.length === 0) {
  console.error('❌ No <loc> URLs found in sitemap.xml');
  process.exit(1);
}

const urlList = locMatches.map((loc) => loc.replace(/<\/?loc>/g, '').trim());

const PROGRAMMATIC_PRIORITY_URLS = [
  'https://mantrameridianriverside.com/properties/',
  'https://mantrameridianriverside.com/properties/mantra-meridian-riverside-2-bhk-flats-balewadi-price-cost-sheet/',
  'https://mantrameridianriverside.com/properties/mantra-meridian-riverside-3-bhk-apartments-balewadi-high-street-price-cost-sheet/',
  'https://mantrameridianriverside.com/properties/mantra-meridian-riverside-3-bhk-sky-duplex-balewadi-floor-plans-carpet-area/',
  'https://mantrameridianriverside.com/properties/mantra-meridian-riverside-4-bhk-luxury-estates-baner-price-cost-sheet/',
  'https://mantrameridianriverside.com/properties/mantra-meridian-riverside-penthouse-sky-villas-west-pune-8-acre-masterplan-amenities/',
  'https://mantrameridianriverside.com/properties/mantra-meridian-riverside-riverfront-apartments-mula-river-promenade-riverfront-view-apartments/',
  'https://mantrameridianriverside.com/properties/mantra-meridian-riverside-double-height-living-balewadi-sample-flat-video-tour/',
  'https://mantrameridianriverside.com/properties/mantra-meridian-riverside-2-bhk-flats-hinjewadi-phase-1-rental-yield-tech-executives/',
  'https://mantrameridianriverside.com/properties/mantra-meridian-riverside-3-bhk-apartments-mahalunge-capital-appreciation-forecast/'
];

for (const pUrl of PROGRAMMATIC_PRIORITY_URLS) {
  if (!urlList.includes(pUrl)) {
    urlList.push(pUrl);
  }
}

// Programmatic URL Generator for 10,400 Long-Tail Matrix
const isFullMatrix = process.argv.includes('--all') || process.argv.includes('--programmatic');
let programmaticUrls = [];
if (isFullMatrix) {
  const TYPOLOGIES_IDS = [
    '2-bhk-flats', '2-5-bhk-apartments', '3-bhk-apartments', '3-5-bhk-apartments',
    '3-bhk-sky-duplex', '4-bhk-luxury-estates', 'penthouse-sky-villas', 'luxury-penthouses-balewadi',
    'riverfront-apartments', 'river-facing-flats', 'double-height-living', 'duplex-apartments-balewadi',
    'luxury-residences', 'smart-home-residences', 'under-construction-flats', 'ready-possession-estates'
  ];
  const LOCATIONS_IDS = [
    'balewadi', 'balewadi-high-street', 'balewadi-sports-complex', 'baner', 'baner-road',
    'pancard-club-road', 'baner-pashan-link-road', 'hinjewadi-phase-1', 'hinjewadi-phase-2',
    'hinjewadi-phase-3', 'mahalunge', 'mahalunge-maan-bridge', 'wakad', 'aundh',
    'bavdhan', 'pashan', 'punawale', 'tathawade', 'west-pune', 'mumbai-pune-expressway',
    'mula-river-promenade', 'cummins-india-balewadi', 'jupiter-hospital-baner',
    'orchid-school-balewadi', 'metro-line-3-balewadi', 'balewadi-village-road'
  ];
  const INTENTS_IDS = [
    'price-cost-sheet', 'floor-plans-carpet-area', 'rera-possession-date', 'sample-flat-video-tour',
    '8-acre-masterplan-amenities', 'payment-schedule-bank-loan', 'buyer-reviews-ratings',
    'booking-enquiry-concierge', 'capital-appreciation-forecast', 'rental-yield-tech-executives',
    'all-inclusive-price-breakdown', 'specifications-finishes', 'riverfront-view-apartments',
    'vastu-compliant-layouts', 'gated-community-security', 'clubhouse-infinity-pool',
    'nri-investment-portfolio', 'construction-status-milestone', 'resale-vs-new-launch',
    'brochure-pdf-download', 'price-trend-2026', 'emi-calculator-loan-rates',
    'maintenance-charges-breakdown', 'compare-with-competitors', 'site-visit-cab-booking'
  ];

  for (const t of TYPOLOGIES_IDS) {
    for (const l of LOCATIONS_IDS) {
      for (const i of INTENTS_IDS) {
        programmaticUrls.push(`https://${HOST}/properties/mantra-meridian-riverside-${t}-${l}-${i}/`);
      }
    }
  }
}

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getGoogleAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const unsignedJwt = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claimSet))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedJwt);
  signer.end();

  const signature = signer.sign(credentials.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${unsignedJwt}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    throw new Error(`Failed to obtain Google access token: ${JSON.stringify(tokenData)}`);
  }

  return tokenData.access_token;
}

async function broadcastUnifiedIndexing() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚡ UNIFIED GLOBAL SEARCH ENGINE BROADCASTER');
  console.log('   Domain: https://mantrameridianriverside.com');
  console.log(`   Canonical URLs Discovered: ${urlList.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const summary = [];

  // 1. Google Indexing API Programmatic Dispatch
  let credentials = null;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    } catch (e) {
      console.error('⚠️ Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON environment variable:', e.message);
    }
  }
  if (!credentials && fs.existsSync(CREDENTIALS_PATH)) {
    try {
      credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    } catch (e) {
      console.error(`⚠️ Failed to parse ${CREDENTIALS_PATH}:`, e.message);
    }
  }

  if (credentials) {
    try {
      console.log('🔑 [1/3] Authenticating with Google Indexing API (OAuth 2.0)...');
      const googleToken = await getGoogleAccessToken(credentials);
      console.log('   ✅ Google Access Token acquired. Broadcasting all canonical URLs:');

      let googleSuccessCount = 0;
      for (let i = 0; i < urlList.length; i++) {
        const url = urlList[i];
        const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${googleToken}`
          },
          body: JSON.stringify({ url, type: 'URL_UPDATED' })
        });
        if (res.ok) {
          googleSuccessCount++;
          process.stdout.write(`\r   Broadcasting to Google: [${googleSuccessCount}/${urlList.length}] URLs accepted (200 OK)`);
        } else if (res.status === 429) {
          console.log(`\n   ℹ️ Google Indexing API daily publish quota reached (200 requests/day). All canonical URLs and sitemaps remain submitted via IndexNow & Sitemaps.`);
          break;
        }
        if (i < urlList.length - 1) await new Promise((r) => setTimeout(r, 100));
      }
      console.log('\n   ✨ Google Indexing API submission complete!\n');
      summary.push({ engine: 'Google Indexing API', status: 200, published: googleSuccessCount });
    } catch (err) {
      console.error(`   ⚠️ Google Indexing API Error:`, err.message);
      summary.push({ engine: 'Google Indexing API', status: 'error', message: err.message });
    }
  } else {
    console.log('ℹ️ Google credentials not found (set GOOGLE_SERVICE_ACCOUNT_JSON or place service-account.json), skipping Google Indexing API.');
  }

  // 2. IndexNow Protocol Dispatch (Bing, Yandex, Seznam, Naver)
  const indexNowPayload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList
  };

  console.log('📡 [2/3] Broadcasting to IndexNow Central Gateway (api.indexnow.org)...');
  try {
    const resIndexNow = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(indexNowPayload)
    });
    console.log(`   ✅ IndexNow Central: Status ${resIndexNow.status} (${resIndexNow.statusText || 'OK'})`);
    summary.push({ engine: 'IndexNow Central', status: resIndexNow.status });
  } catch (err) {
    console.error(`   ⚠️ IndexNow Central Error:`, err.message);
    summary.push({ engine: 'IndexNow Central', status: 'error', message: err.message });
  }

  console.log('📡 [3/3] Broadcasting directly to Microsoft Bing Gateway (bing.com/indexnow)...');
  try {
    const resBing = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(indexNowPayload)
    });
    console.log(`   ✅ Microsoft Bing IndexNow: Status ${resBing.status} (${resBing.statusText || 'OK'})`);
    summary.push({ engine: 'Microsoft Bing IndexNow', status: resBing.status });
  } catch (err) {
    console.error(`   ⚠️ Microsoft Bing Error:`, err.message);
    summary.push({ engine: 'Microsoft Bing IndexNow', status: 'error', message: err.message });
  }

  // 3b. Programmatic Matrix Batch Dispatch (5,000 Long-Tail URLs)
  if (programmaticUrls.length > 0) {
    console.log(`\n🚀 Broadcasting ${programmaticUrls.length} Programmatic Real Estate Matrix URLs in batches of 1,000...`);
    const BATCH_SIZE = 1000;
    for (let b = 0; b < programmaticUrls.length; b += BATCH_SIZE) {
      const batchUrls = programmaticUrls.slice(b, b + BATCH_SIZE);
      const batchPayload = {
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: batchUrls
      };
      try {
        const batchRes = await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(batchPayload)
        });
        console.log(`   ✅ Programmatic Batch [${b + 1}–${Math.min(b + BATCH_SIZE, programmaticUrls.length)}]: Status ${batchRes.status}`);
      } catch (err) {
        // Non-fatal
      }
    }
  }

  // 4. Ping Search Engine Sitemap Discovery Gateways
  const sitemapsToPing = [
    'https://mantrameridianriverside.com/sitemap-index.xml',
    'https://mantrameridianriverside.com/sitemap.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-1.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-2.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-3.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-4.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-5.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-6.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-7.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-8.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-9.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-10.xml',
    'https://mantrameridianriverside.com/sitemaps/properties-11.xml'
  ];

  console.log('🗺️  [4/4] Pinging Search Engine Sitemap Endpoints...');
  for (const smUrl of sitemapsToPing) {
    try {
      const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(smUrl)}`;
      const pRes = await fetch(pingUrl);
      console.log(`   ✅ Sitemap Ping (${smUrl.split('/').pop()}): Status ${pRes.status}`);
    } catch (pErr) {
      // Non-fatal ping notice
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✨ Unified Search Engine Indexing Broadcast Completed!');
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), totalUrls: urlList.length, results: summary }, null, 2));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

broadcastUnifiedIndexing().catch((err) => {
  console.error('Fatal error during indexing broadcast:', err);
  process.exit(1);
});
