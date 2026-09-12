#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

/**
 * GOOGLE REAL ESTATE & PROPERTY FEED VALIDATION SUITE
 * 
 * Verifies XML syntax, property schema compliance, unit attributes,
 * and canonical route integrity across google-realestate.xml & google-products.xml.
 */

const ROOT_DIR = process.cwd();
const REAL_ESTATE_FEED = path.resolve(ROOT_DIR, 'public/google-realestate.xml');
const PRODUCTS_FEED = path.resolve(ROOT_DIR, 'public/google-products.xml');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🏛️  GOOGLE REAL ESTATE & PROPERTY FEED VALIDATOR');
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
assert(fs.existsSync(REAL_ESTATE_FEED), 'google-realestate.xml exists');
assert(fs.existsSync(PRODUCTS_FEED), 'google-products.xml exists');

const reContent = fs.readFileSync(REAL_ESTATE_FEED, 'utf8');
const prodContent = fs.readFileSync(PRODUCTS_FEED, 'utf8');

// 2. Strict Zero-Forbidden-Domain Check
assert(!reContent.includes('mantraproperties.in'), 'google-realestate.xml contains zero mantraproperties.in references');
assert(!prodContent.includes('mantraproperties.in'), 'google-products.xml contains zero mantraproperties.in references');

// 3. Check XML Declaration & Root Tags
assert(reContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'google-realestate.xml has valid XML declaration');
assert(reContent.includes('<property_feed version="2.0"'), 'google-realestate.xml has property_feed root element');
assert(reContent.includes('<development>'), 'google-realestate.xml contains development block');

// 4. Validate Development Level Attributes
assert(reContent.includes('<rera_number>P52100045688</rera_number>'), 'MahaRERA number P52100045688 present');
assert(reContent.includes('<latitude>18.5848136</latitude>'), 'Precise latitude 18.5848136 present');
assert(reContent.includes('<longitude>73.7751313</longitude>'), 'Precise longitude 73.7751313 present');
assert(reContent.includes('<plus_code>9RQC+73 Pune</plus_code>'), 'Google Plus Code 9RQC+73 Pune present');
assert(reContent.includes('<site_area unit="acres">8</site_area>'), '8-acre site area verified');

// 5. Validate Listings & Typologies
const listings = reContent.match(/<listing>[\s\S]*?<\/listing>/g) || [];
assert(listings.length === 5, `Found exactly 5 complete property listings (found: ${listings.length})`);

const expectedListingIds = [
  'MMR-2BHK-001',
  'MMR-3BHK-002',
  'MMR-3BHK-DUP-003',
  'MMR-4BHK-004',
  'MMR-PENTHOUSE-005'
];

expectedListingIds.forEach(id => {
  assert(reContent.includes(`<id>${id}</id>`), `Listing ID ${id} present in property feed`);
});

// 6. Validate Required Listing Attributes
listings.forEach((listing, idx) => {
  const idMatch = listing.match(/<id>([^<]+)<\/id>/);
  const id = idMatch ? idMatch[1] : `Item #${idx+1}`;
  
  assert(listing.includes('<property_type>'), `${id} specifies property_type`);
  assert(listing.includes('<title>'), `${id} specifies title`);
  assert(listing.includes('<url>'), `${id} specifies url`);
  assert(listing.includes('<bedrooms>'), `${id} specifies bedrooms`);
  assert(listing.includes('<bathrooms>'), `${id} specifies bathrooms`);
  assert(listing.includes('<carpet_area unit="sqft">'), `${id} specifies carpet_area in sqft`);
  assert(listing.includes('<price currency="INR">'), `${id} specifies price in INR`);
  assert(listing.includes('<availability>InStock</availability>'), `${id} specifies InStock availability`);
  assert(listing.includes('<status>Active</status>'), `${id} specifies Active status`);
  assert(listing.includes('<floor_plan>'), `${id} specifies floor_plan url`);
  assert(listing.includes('<possession_date>2028-06-30</possession_date>'), `${id} specifies possession_date`);
});

// 7. Validate Google Products XML Feed
const productItems = prodContent.match(/<item>[\s\S]*?<\/item>/g) || [];
assert(productItems.length === 5, `google-products.xml contains 5 product items (found: ${productItems.length})`);
assert(prodContent.includes('MMR-PENTHOUSE-001'), 'google-products.xml contains Penthouse item');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`🏁 REAL ESTATE FEED VALIDATION SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
