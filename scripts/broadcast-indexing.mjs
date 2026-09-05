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
  if (fs.existsSync(CREDENTIALS_PATH)) {
    try {
      console.log('🔑 [1/3] Authenticating with Google Indexing API (OAuth 2.0)...');
      const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
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
    console.log('ℹ️ Google service-account.json not found, skipping Google Indexing API.');
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
    console.log(`   ✅ Microsoft Bing: Status ${resBing.status} (${resBing.statusText || 'OK'})`);
    summary.push({ engine: 'Microsoft Bing IndexNow', status: resBing.status });
  } catch (err) {
    console.error(`   ⚠️ Microsoft Bing Error:`, err.message);
    summary.push({ engine: 'Microsoft Bing IndexNow', status: 'error', message: err.message });
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
