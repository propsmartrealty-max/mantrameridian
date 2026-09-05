#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

/**
 * ULTRA-ADVANCED GOOGLE INDEXING API COMMAND-LINE SUITE
 * 
 * Uses Google Cloud Service Account OAuth 2.0 (RS256 JWT) to programmatically publish
 * URL_UPDATED and URL_DELETED notifications and inspect indexing metadata via:
 * - https://indexing.googleapis.com/v3/urlNotifications:publish
 * - https://indexing.googleapis.com/v3/urlNotifications/metadata
 * 
 * Usage:
 *   node scripts/google-indexing.mjs                  # Broadcast URL_UPDATED for all 25 canonical URLs
 *   node scripts/google-indexing.mjs --publish        # Explicitly broadcast URL_UPDATED for all URLs
 *   node scripts/google-indexing.mjs --url <URL>      # Broadcast URL_UPDATED for a specific URL
 *   node scripts/google-indexing.mjs --delete <URL>   # Broadcast URL_DELETED for a specific URL
 *   node scripts/google-indexing.mjs --inspect        # Query Google Indexing metadata status for all URLs
 *   node scripts/google-indexing.mjs --help           # Show help documentation
 */

const CREDENTIALS_PATH = path.resolve(process.cwd(), 'service-account.json');
const SITEMAP_PATH = path.resolve(process.cwd(), 'public/sitemap.xml');

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🌐 Mantra Meridian Riverside — Google Indexing API CLI

Usage:
  node scripts/google-indexing.mjs [options]

Options:
  --publish                 Broadcast URL_UPDATED for all sitemap URLs (default)
  --url <url>               Broadcast URL_UPDATED for a single specific URL
  --delete <url>            Broadcast URL_DELETED for a removed or decommissioned URL
  --inspect, --status       Query Google's recorded metadata status for sitemap URLs
  --help, -h                Show this help menu

Examples:
  node scripts/google-indexing.mjs
  node scripts/google-indexing.mjs --url https://mantrameridianriverside.com/mantra-meridian-riverside/price
  node scripts/google-indexing.mjs --inspect
`);
  process.exit(0);
}

if (!fs.existsSync(CREDENTIALS_PATH)) {
  console.error(`❌ Google service-account.json not found at ${CREDENTIALS_PATH}`);
  process.exit(1);
}

if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(`❌ Sitemap file not found at ${SITEMAP_PATH}`);
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');

const locMatches = sitemapContent.match(/<loc>(https:\/\/[^<]+)<\/loc>/g);
if (!locMatches || locMatches.length === 0) {
  console.error('❌ No URLs found in sitemap.xml');
  process.exit(1);
}

const allUrls = locMatches.map((loc) => loc.replace(/<\/?loc>/g, '').trim());

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Generates an OAuth 2.0 Access Token from the Service Account private key using native Node.js crypto (RS256)
 */
async function getGoogleAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const claimSet = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaimSet = base64UrlEncode(JSON.stringify(claimSet));
  const unsignedJwt = `${encodedHeader}.${encodedClaimSet}`;

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

async function publishUrlToGoogle(accessToken, url, type = 'URL_UPDATED') {
  const startTime = performance.now();
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      url,
      type
    })
  });

  const elapsed = (performance.now() - startTime).toFixed(1);
  const data = await res.json();
  return { status: res.status, ok: res.ok, elapsed, data };
}

async function inspectUrlMetadata(accessToken, url) {
  const startTime = performance.now();
  const res = await fetch(`https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${encodeURIComponent(url)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const elapsed = (performance.now() - startTime).toFixed(1);
  const data = await res.json();
  return { status: res.status, ok: res.ok, elapsed, data };
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('⚡ ULTRA-ADVANCED GOOGLE SEARCH RANKINGS & INDEXING SUITE');
  console.log('   Domain: https://mantrameridianriverside.com');
  console.log(`   Service Account: ${credentials.client_email}`);
  console.log(`   Project ID: ${credentials.project_id}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('🔑 Authenticating with Google OAuth 2.0 (RS256 JWT)...');
  const accessToken = await getGoogleAccessToken();
  console.log('✅ Google OAuth 2.0 access token generated successfully!\n');

  // Case 1: Inspect metadata
  if (args.includes('--inspect') || args.includes('--status')) {
    console.log(`🔍 Inspecting Google Indexing metadata for ${allUrls.length} canonical URLs...\n`);
    for (let i = 0; i < allUrls.length; i++) {
      const url = allUrls[i];
      const res = await inspectUrlMetadata(accessToken, url);
      if (res.ok) {
        const latestNotify = res.data?.latestUpdate?.notifyTime || 'Unknown';
        console.log(`   [${i + 1}/${allUrls.length}] ✅ 200 OK (${res.elapsed}ms): ${url}`);
        console.log(`       Last Notified: ${latestNotify}`);
      } else {
        console.log(`   [${i + 1}/${allUrls.length}] ℹ️ ${res.status} (${res.elapsed}ms): ${url} - ${res.data?.error?.message || 'Queued / Pending Googlebot crawl'}`);
      }
      if (i < allUrls.length - 1) await new Promise((r) => setTimeout(r, 100));
    }
    console.log('\n✨ Google Indexing metadata inspection completed.');
    return;
  }

  // Case 2: Delete specific URL
  const deleteIdx = args.indexOf('--delete');
  if (deleteIdx !== -1 && args[deleteIdx + 1]) {
    const targetUrl = args[deleteIdx + 1];
    console.log(`🗑️ Broadcasting URL_DELETED notification for: ${targetUrl}`);
    const res = await publishUrlToGoogle(accessToken, targetUrl, 'URL_DELETED');
    if (res.ok) {
      console.log(`✅ ${res.status} OK (${res.elapsed}ms): Google accepted URL_DELETED for ${targetUrl}`);
    } else {
      console.error(`⚠️ ${res.status}: Failed to delete ${targetUrl} - ${res.data?.error?.message}`);
    }
    return;
  }

  // Case 3: Single URL update
  const urlIdx = args.indexOf('--url');
  if (urlIdx !== -1 && args[urlIdx + 1]) {
    const targetUrl = args[urlIdx + 1];
    console.log(`🚀 Broadcasting URL_UPDATED notification for single URL: ${targetUrl}`);
    const res = await publishUrlToGoogle(accessToken, targetUrl, 'URL_UPDATED');
    if (res.ok) {
      console.log(`✅ ${res.status} OK (${res.elapsed}ms): Google accepted URL_UPDATED for ${targetUrl}`);
    } else {
      console.error(`⚠️ ${res.status}: Failed to publish ${targetUrl} - ${res.data?.error?.message}`);
    }
    return;
  }

  // Case 4: Default Batch Publish All URLs
  console.log(`🚀 Publishing ${allUrls.length} canonical URLs to Google Indexing API (URL_UPDATED):\n`);
  const results = [];

  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i];
    try {
      const result = await publishUrlToGoogle(accessToken, url, 'URL_UPDATED');
      if (result.ok) {
        console.log(`   [${i + 1}/${allUrls.length}] ✅ 200 OK (${result.elapsed}ms): ${url}`);
        results.push({ url, status: result.status, success: true, elapsed: result.elapsed });
      } else {
        console.log(`   [${i + 1}/${allUrls.length}] ⚠️ ${result.status} (${result.elapsed}ms): ${url} - ${result.data?.error?.message || 'Error'}`);
        results.push({ url, status: result.status, success: false, error: result.data?.error?.message });
      }
    } catch (err) {
      console.error(`   [${i + 1}/${allUrls.length}] ❌ Network error for ${url}:`, err.message);
      results.push({ url, success: false, error: err.message });
    }

    // Rate-limiting pause to respect Google Indexing quota
    if (i < allUrls.length - 1) {
      await new Promise((r) => setTimeout(r, 120));
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  const successCount = results.filter((r) => r.success).length;
  console.log(`✨ Google Indexing API Run Summary: ${successCount}/${allUrls.length} URLs Successfully Published!`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main().catch((err) => {
  console.error('Fatal Google Indexing API error:', err);
  process.exit(1);
});
