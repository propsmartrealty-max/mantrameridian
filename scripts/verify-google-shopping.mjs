#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

/**
 * GOOGLE SHOPPING, GOOGLE PRODUCTS & 5-STAR REVIEW SNIPPET VALIDATION SUITE
 * 
 * Verifies that Google Merchant / Shopping XML feeds and Schema.org Product graphs
 * fulfill all technical criteria required to display rich 5-star snippets and free listings.
 */

const ROOT_DIR = process.cwd();
const PRODUCTS_XML = path.resolve(ROOT_DIR, 'public/google-products.xml');
const BASE_LAYOUT = path.resolve(ROOT_DIR, 'src/layouts/BaseLayout.astro');
const DUPLEX_PAGE = path.resolve(ROOT_DIR, 'src/pages/duplex.astro');
const PENTHOUSE_PAGE = path.resolve(ROOT_DIR, 'src/pages/penthouse.astro');
const PRICE_PAGE = path.resolve(ROOT_DIR, 'src/pages/mantra-meridian-riverside/price.astro');
const DETAIL_VIEW = path.resolve(ROOT_DIR, 'src/components/Residences/ResidenceDetailView.astro');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🛍️  GOOGLE PRODUCTS, SHOPPING & 5-STAR SNIPPET VALIDATOR');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Check file existence
assert(fs.existsSync(PRODUCTS_XML), 'google-products.xml exists');
const xmlContent = fs.readFileSync(PRODUCTS_XML, 'utf8');

// 2. Strict Zero-Forbidden-Domain Check
assert(!xmlContent.includes('mantraproperties.in'), 'Zero forbidden mantraproperties.in in google-products.xml');

// 3. Google Merchant Channel & Items
assert(xmlContent.includes('<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">'), 'Valid Google Base RSS 2.0 namespace');
const items = xmlContent.match(/<item>[\s\S]*?<\/item>/g) || [];
assert(items.length === 5, `Found exactly 5 items in product feed (found: ${items.length})`);

// 4. Per-Item Google Shopping Attributes
items.forEach((item, idx) => {
  const idMatch = item.match(/<g:id>([^<]+)<\/g:id>/);
  const id = idMatch ? idMatch[1] : `Item #${idx+1}`;

  assert(item.includes('<g:title>'), `${id}: specifies g:title`);
  assert(item.includes('<g:price>'), `${id}: specifies g:price`);
  assert(item.includes('<g:image_link>'), `${id}: specifies g:image_link`);
  assert(item.includes('<g:availability>in_stock</g:availability>'), `${id}: availability is in_stock`);
  assert(item.includes('<g:condition>new</g:condition>'), `${id}: condition is new`);
  assert(item.includes('<g:brand>Mantra Properties</g:brand>'), `${id}: brand is Mantra Properties`);
  assert(item.includes('<g:shipping>'), `${id}: has g:shipping block`);
  assert(item.includes('<g:tax>'), `${id}: has g:tax block`);
  
  const highlights = item.match(/<g:product_highlight>[\s\S]*?<\/g:product_highlight>/g) || [];
  assert(highlights.length >= 2, `${id}: contains at least 2 g:product_highlight tags (found: ${highlights.length})`);
  
  const details = item.match(/<g:product_detail>[\s\S]*?<\/g:product_detail>/g) || [];
  assert(details.length >= 2, `${id}: contains at least 2 g:product_detail sections (found: ${details.length})`);
});

// 5. Global BaseLayout Product & 5-Star Rating Schema
const baseLayoutContent = fs.readFileSync(BASE_LAYOUT, 'utf8');
assert(baseLayoutContent.includes('"@type": "Product"'), 'BaseLayout coreGraph includes Product schema');
assert(baseLayoutContent.includes('"@id": "https://mantrameridianriverside.com/#flagship-residences-product"'), 'BaseLayout defines flagship residences product');
assert(baseLayoutContent.includes('"@type": "AggregateRating"'), 'BaseLayout includes AggregateRating');
assert(baseLayoutContent.includes('"ratingValue": aggregateRatingData.ratingValue'), 'BaseLayout binds 4.9 star ratingValue');
assert(baseLayoutContent.includes('"hasMerchantReturnPolicy"'), 'BaseLayout Product offer has MerchantReturnPolicy');
assert(baseLayoutContent.includes('"shippingDetails"'), 'BaseLayout Product offer has OfferShippingDetails');

// 6. Typology Pages Rich Snippet & Product Hardening
const duplexContent = fs.readFileSync(DUPLEX_PAGE, 'utf8');
assert(duplexContent.includes('"Product"'), 'duplex.astro declares Product schema');
assert(duplexContent.includes('aggregateRatingData.ratingValue'), 'duplex.astro binds 5-star aggregateRating');
assert(duplexContent.includes('"shippingDetails"'), 'duplex.astro includes OfferShippingDetails');

const penthouseContent = fs.readFileSync(PENTHOUSE_PAGE, 'utf8');
assert(penthouseContent.includes('"Product"'), 'penthouse.astro declares Product schema');
assert(penthouseContent.includes('aggregateRatingData.ratingValue'), 'penthouse.astro binds 5-star aggregateRating');
assert(penthouseContent.includes('"shippingDetails"'), 'penthouse.astro includes OfferShippingDetails');

const priceContent = fs.readFileSync(PRICE_PAGE, 'utf8');
assert(priceContent.includes('"Product"'), 'price.astro declares Product pricing schema');
assert(priceContent.includes('aggregateRatingData.ratingValue'), 'price.astro binds 5-star aggregateRating');
assert(priceContent.includes('"shippingDetails"'), 'price.astro includes OfferShippingDetails');

const detailContent = fs.readFileSync(DETAIL_VIEW, 'utf8');
assert(detailContent.includes('"shippingDetails"'), 'ResidenceDetailView includes OfferShippingDetails');
assert(detailContent.includes('"hasMerchantReturnPolicy"'), 'ResidenceDetailView includes MerchantReturnPolicy');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`🏁 GOOGLE SHOPPING & 5-STAR SNIPPET VALIDATION: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
