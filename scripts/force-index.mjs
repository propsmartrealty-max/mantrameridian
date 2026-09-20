#!/usr/bin/env node

/**
 * FORCE GOOGLE INDEXING — Priority URL Submitter
 * Uses Google Indexing API to force-request crawl of all key pages.
 * Run: node scripts/force-index.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const CREDENTIALS_PATH = path.resolve(process.cwd(), 'service-account.json');
const HOST = 'mantrameridianriverside.com';

// Priority order — most important pages first
const PRIORITY_URLS = [
  // Tier 1 — Primary brand keywords (index ASAP)
  `https://${HOST}/`,
  `https://${HOST}/mantra-meridian-riverside/`,
  `https://${HOST}/mantra-meridian-riverside-balewadi/`,
  `https://${HOST}/mantra-meridian-riverside/price/`,
  `https://${HOST}/mantra-meridian-riverside/floor-plans/`,
  `https://${HOST}/mantra-meridian-riverside/residences/`,
  `https://${HOST}/mantra-meridian-riverside/location/`,
  `https://${HOST}/mantra-meridian-riverside/gallery/`,
  `https://${HOST}/mantra-meridian-riverside/amenities/`,
  `https://${HOST}/mantra-meridian-riverside/masterplan/`,
  // Tier 2 — Typology pages
  `https://${HOST}/mantra-meridian-riverside/2-bhk/`,
  `https://${HOST}/mantra-meridian-riverside/3-bhk/`,
  `https://${HOST}/mantra-meridian-riverside/3-bhk-duplex/`,
  `https://${HOST}/mantra-meridian-riverside/4-bhk/`,
  `https://${HOST}/mantra-meridian-riverside/rera/`,
  `https://${HOST}/mantra-meridian-riverside/documents/`,
  `https://${HOST}/mantra-meridian-riverside/riverside/`,
  // Tier 3 — Brand permutation pages
  `https://${HOST}/mantra-meridian-riverside-balewadi/`,
  `https://${HOST}/mantra-riverside-balewadi/`,
  `https://${HOST}/mantra-meridian-balewadi/`,
  `https://${HOST}/mantra-balewadi/`,
  `https://${HOST}/mantra-meridian/`,
  `https://${HOST}/mantra-riverside/`,
  // Tier 4 — Market pages
  `https://${HOST}/balewadi/`,
  `https://${HOST}/hinjewadi/`,
  `https://${HOST}/west-pune/`,
  `https://${HOST}/pune-real-estate/`,
  `https://${HOST}/mahalunge/`,
  `https://${HOST}/baner/`,
  `https://${HOST}/compare/`,
  // Tier 5 — Typology landing pages
  `https://${HOST}/duplex/`,
  `https://${HOST}/penthouse/`,
  `https://${HOST}/nri-desk/`,
  `https://${HOST}/home-loan/`,
  `https://${HOST}/explore/`,
  // Tier 6 — Journal articles (long-tail)
  `https://${HOST}/mantra-meridian-riverside/journal/`,
  `https://${HOST}/mantra-meridian-riverside/journal/why-balewadi-emerging-luxury-destination-pune/`,
  `https://${HOST}/mantra-meridian-riverside/journal/balewadi-vs-baner-real-estate-comparison/`,
  `https://${HOST}/mantra-meridian-riverside/journal/architecture-of-light-riverside-living-meridian/`,
  `https://${HOST}/mantra-meridian-riverside/journal/rise-of-sky-duplex-living-pune/`,
  `https://${HOST}/mantra-meridian-riverside/journal/hinjewadi-balewadi-connectivity-corridor/`,
  `https://${HOST}/mantra-meridian-riverside/journal/pune-real-estate-market-outlook-2026-luxury-investment-guide/`,
  `https://${HOST}/mantra-meridian-riverside/journal/hinjewadi-it-corridor-balewadi-luxury-housing-guide/`,
  `https://${HOST}/mantra-meridian-riverside/journal/baner-vs-balewadi-vs-mahalunge-real-estate-investment-2026/`,
  `https://${HOST}/mantra-meridian-riverside/journal/sky-duplex-vs-penthouse-luxury-living-pune/`,
  `https://${HOST}/mantra-meridian-riverside/journal/kumar-magnacity-vs-mantra-meridian-riverside-comparison/`,
];

function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const unsigned = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claim))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const sig = signer.sign(credentials.private_key, 'base64')
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const jwt = `${unsigned}.${sig}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function forceIndex() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 GOOGLE FORCE-INDEXING — Priority URL Submitter');
  console.log(`   Domain: https://${HOST}`);
  console.log(`   URLs to submit: ${PRIORITY_URLS.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let credentials = null;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  } else if (fs.existsSync(CREDENTIALS_PATH)) {
    credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  }
  if (!credentials) {
    console.error('❌ No Google credentials found.');
    process.exit(1);
  }

  const token = await getAccessToken(credentials);
  console.log('✅ Google OAuth token acquired\n');

  let success = 0, fail = 0, quota = 0;
  const results = [];

  for (let i = 0; i < PRIORITY_URLS.length; i++) {
    const url = PRIORITY_URLS[i];
    const tier = i < 10 ? 'T1' : i < 17 ? 'T2' : i < 24 ? 'T3' : i < 31 ? 'T4' : 'T5';
    try {
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url, type: 'URL_UPDATED' }),
      });
      const body = await res.json();
      if (res.status === 200) {
        success++;
        console.log(`  ✅ [${tier}] ${url}`);
        results.push({ url, status: 'submitted' });
      } else if (res.status === 429 || body?.error?.code === 429) {
        quota++;
        console.log(`  ⚠️  [QUOTA] ${url}`);
        results.push({ url, status: 'quota_exceeded' });
      } else {
        fail++;
        console.log(`  ❌ [${res.status}] ${url} — ${body?.error?.message || 'unknown'}`);
        results.push({ url, status: 'error', detail: body?.error?.message });
      }
    } catch (e) {
      fail++;
      console.log(`  ❌ [ERR] ${url} — ${e.message}`);
    }
    // Respect rate limit: 200 req/day → ~1 per 432ms
    if (i < PRIORITY_URLS.length - 1) await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✨ Force Indexing Complete`);
  console.log(`   ✅ Submitted: ${success} URLs`);
  console.log(`   ⚠️  Quota hit: ${quota} URLs`);
  console.log(`   ❌ Failed:    ${fail} URLs`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Save results log
  const log = { timestamp: new Date().toISOString(), submitted: success, quota, failed: fail, results };
  fs.writeFileSync(path.resolve(process.cwd(), 'scripts/indexing-log.json'), JSON.stringify(log, null, 2));
  console.log('📄 Results saved to scripts/indexing-log.json');
}

forceIndex().catch(e => { console.error('Fatal:', e); process.exit(1); });
