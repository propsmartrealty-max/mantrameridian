#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

/**
 * GOOGLE INDEXING API PROGRAMMATIC BROADCASTER
 * Uses Google Service Account JWT OAuth2 to publish URL_UPDATED notifications
 * directly to Google's indexing endpoint:
 * https://indexing.googleapis.com/v3/urlNotifications:publish
 */

const CREDENTIALS_PATH = path.resolve(process.cwd(), 'service-account.json');
const SITEMAP_PATH = path.resolve(process.cwd(), 'public/sitemap.xml');

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

const urlList = locMatches.map((loc) => loc.replace(/<\/?loc>/g, '').trim());

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Generates an OAuth 2.0 Access Token from the Service Account private key using native Node.js crypto
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

async function publishUrlToGoogle(accessToken, url) {
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

  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

async function runGoogleIndexing() {
  console.log(`📡 Discovered ${urlList.length} canonical URLs for Google Indexing API submission.`);
  console.log(`🔑 Service Account: ${credentials.client_email} (Project: ${credentials.project_id})`);
  console.log('🔄 Authenticating with Google OAuth 2.0...');

  const accessToken = await getGoogleAccessToken();
  console.log('✅ Google OAuth 2.0 access token generated successfully!\n');

  console.log('🚀 Publishing URLs to Google Indexing API:');
  const results = [];

  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i];
    try {
      const result = await publishUrlToGoogle(accessToken, url);
      if (result.ok) {
        console.log(`   [${i + 1}/${urlList.length}] ✅ 200 OK: ${url}`);
        results.push({ url, status: result.status, success: true });
      } else {
        console.log(`   [${i + 1}/${urlList.length}] ⚠️ ${result.status}: ${url} - ${result.data?.error?.message || 'Error'}`);
        results.push({ url, status: result.status, success: false, error: result.data?.error?.message });
      }
    } catch (err) {
      console.error(`   [${i + 1}/${urlList.length}] ❌ Network error for ${url}:`, err.message);
      results.push({ url, success: false, error: err.message });
    }

    // Gentle 100ms throttle to comply with Google rate limits
    if (i < urlList.length - 1) {
      await new Promise((r) => setTimeout(r, 120));
    }
  }

  console.log('\n✨ Google Indexing API submission run completed.');
  const successfulCount = results.filter((r) => r.success).length;
  console.log(`Summary: ${successfulCount}/${urlList.length} URLs processed.`);
  return results;
}

runGoogleIndexing().catch((err) => {
  console.error('Fatal Google Indexing API error:', err);
  process.exit(1);
});
