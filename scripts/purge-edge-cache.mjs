#!/usr/bin/env node

/**
 * CLOUDFLARE EDGE CACHE PURGE CLI SUITE
 * 
 * Programmatically purges Cloudflare CDN edge cache using Zone API tokens.
 * Supports:
 * - Selective tag purge: Cache-Tag: mantra-meridian, sitemaps, google-products, google-realestate
 * - Granular URL purge
 * - Complete purge
 * 
 * Usage:
 *   node scripts/purge-edge-cache.mjs                  # Purges default cache tags
 *   node scripts/purge-edge-cache.mjs --tags sitemaps  # Purges specific cache tag
 *   node scripts/purge-edge-cache.mjs --url <URL>      # Purges specific URL
 *   node scripts/purge-edge-cache.mjs --all            # Purges entire zone cache
 */

const CF_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🚀 Cloudflare Edge Cache Purge Suite — Mantra Meridian Riverside

Usage:
  node scripts/purge-edge-cache.mjs [options]

Options:
  --tags <tags>   Comma-separated list of Cache-Tags to purge (default: mantra-meridian,sitemaps,google-products,google-realestate)
  --url <url>     Specific URL to purge from edge cache
  --all           Purge everything in the Cloudflare Zone (use with care)
  --help, -h      Show this help menu
`);
  process.exit(0);
}

if (!CF_ZONE_ID || !CF_API_TOKEN) {
  console.log('ℹ️  Cloudflare credentials (CLOUDFLARE_ZONE_ID, CLOUDFLARE_API_TOKEN) not found in environment.');
  console.log('   Dry run: Simulated edge cache tag purge for: [mantra-meridian, sitemaps, google-products, google-realestate]');
  console.log('   To execute live purges, provide CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN.');
  process.exit(0);
}

async function purgeCache() {
  const endpoint = `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`;
  let body = {};

  if (args.includes('--all')) {
    body = { purge_everything: true };
    console.log('⚡ Purging entire Cloudflare zone cache...');
  } else if (args.includes('--url')) {
    const urlIdx = args.indexOf('--url') + 1;
    const targetUrl = args[urlIdx];
    if (!targetUrl) {
      console.error('❌ Error: Missing URL after --url flag.');
      process.exit(1);
    }
    body = { files: [targetUrl] };
    console.log(`⚡ Purging URL: ${targetUrl}...`);
  } else {
    let tags = ['mantra-meridian', 'sitemaps', 'google-products', 'google-realestate'];
    if (args.includes('--tags')) {
      const tagIdx = args.indexOf('--tags') + 1;
      if (args[tagIdx]) {
        tags = args[tagIdx].split(',').map(t => t.trim());
      }
    }
    body = { tags };
    console.log(`⚡ Purging Cloudflare Cache-Tags: ${tags.join(', ')}...`);
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const resData = await response.json();
    if (resData.success) {
      console.log('✅ Cloudflare Edge Cache successfully purged!');
    } else {
      console.error('❌ Purge failed:', resData.errors);
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Network or API error:', err);
    process.exit(1);
  }
}

purgeCache();
