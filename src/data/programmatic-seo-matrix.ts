/**
 * ⚡ PROGRAMMATIC SEO MATRIX GENERATOR (5,000 UNIQUE REAL ESTATE TARGETS)
 * Target Project: Mantra Meridian Riverside Balewadi
 * Architecture: Deterministic, sub-millisecond slug encoder/decoder for Cloudflare Edge SSR
 */

export interface ProgrammaticPageData {
  slug: string;
  url: string;
  title: string;
  metaDescription: string;
  h1Title: string;
  typologyName: string;
  carpetArea: string;
  priceDisplay: string;
  priceNumeric: number;
  bedrooms: number;
  bathrooms: number;
  locationName: string;
  intentName: string;
  heroHeadline: string;
  summaryText: string;
  highlights: string[];
  faqs: Array<{ question: string; answer: string }>;
  breadcrumbs: Array<{ name: string; url?: string }>;
  schema: Record<string, any>;
}

export interface TypologyMeta {
  id: string;
  name: string;
  carpet: string;
  price: string;
  numericPrice: number;
  beds: number;
  baths: number;
  descriptor: string;
}

export interface LocationMeta {
  id: string;
  name: string;
  tagline: string;
  distanceFromSite: string;
  travelTime: string;
  corridorType: string;
}

export interface IntentMeta {
  id: string;
  name: string;
  actionHook: string;
  primaryFocus: string;
}

// 1. TYPOLOGIES (10 Dimensions)
export const TYPOLOGIES: readonly TypologyMeta[] = [
  {
    id: '2-bhk-flats',
    name: '2 BHK Riverside Residences',
    carpet: '815 sq.ft.',
    price: '₹1.29 Cr*',
    numericPrice: 12900000,
    beds: 2,
    baths: 2,
    descriptor: 'Efficient biophilic homes with optimal natural cross-ventilation and Mula river-breeze balconies.'
  },
  {
    id: '3-bhk-apartments',
    name: '3 BHK Luxury Residences',
    carpet: '1,180 sq.ft.',
    price: '₹1.75 Cr*',
    numericPrice: 17500000,
    beds: 3,
    baths: 3,
    descriptor: 'Expansive family suites featuring panoramic river views and private foyer entrances.'
  },
  {
    id: '3-bhk-sky-duplex',
    name: '3 BHK Signature Sky Duplexes',
    carpet: '1,660 sq.ft.',
    price: '₹2.25 Cr*',
    numericPrice: 22500000,
    beds: 3,
    baths: 3,
    descriptor: 'Two-tier architectural sky homes boasting 20-foot double-height salon living rooms overlooking the river.'
  },
  {
    id: '4-bhk-luxury-estates',
    name: '4 BHK Grand Riverside Estates',
    carpet: '2,050 sq.ft.',
    price: '₹2.85 Cr*',
    numericPrice: 28500000,
    beds: 4,
    baths: 4,
    descriptor: 'Palatial multi-generational residences with dual primary suites and direct private elevator access.'
  },
  {
    id: 'penthouse-sky-villas',
    name: 'Penthouse & Sky Villa Collection',
    carpet: '2,180 sq.ft.',
    price: '₹2.25 Cr* - ₹3.50 Cr*',
    numericPrice: 28500000,
    beds: 4,
    baths: 5,
    descriptor: 'Crown sky villas on the top architectural tiers featuring 270-degree wraparound riparian river decks.'
  },
  {
    id: 'riverfront-apartments',
    name: 'Riverfront Luxury Homes',
    carpet: '815 - 2,050 sq.ft.',
    price: '₹1.29 Cr* onwards',
    numericPrice: 12900000,
    beds: 3,
    baths: 3,
    descriptor: 'Directly overlooking the 500-metre Mula River boardwalk with uninterrupted riparian horizons.'
  },
  {
    id: 'double-height-living',
    name: 'Double Height Ceiling Duplex Homes',
    carpet: '1,660 sq.ft.',
    price: '₹2.25 Cr*',
    numericPrice: 22500000,
    beds: 3,
    baths: 3,
    descriptor: 'Volumetric luxury duplexes designed with 20ft ceilings, floor-to-ceiling glass, and dual terraces.'
  },
  {
    id: 'luxury-residences',
    name: 'Flagship 8-Acre Residences',
    carpet: '815 - 2,180 sq.ft.',
    price: '₹1.29 Cr* - ₹3.50 Cr*',
    numericPrice: 12900000,
    beds: 3,
    baths: 3,
    descriptor: 'A masterplanned 8-acre sanctuary featuring 75%+ landscaped open spaces and The Grand Pavilion clubhouse.'
  },
  {
    id: 'under-construction-flats',
    name: 'New Launch Riverside Residences',
    carpet: '815 - 2,050 sq.ft.',
    price: '₹1.29 Cr* onwards',
    numericPrice: 12900000,
    beds: 2,
    baths: 2,
    descriptor: 'Direct booking allocation for newly released towers with flexible milestone-linked payment structures.'
  },
  {
    id: 'ready-possession-estates',
    name: 'June 2028 Possession Residences',
    carpet: '815 - 2,180 sq.ft.',
    price: '₹1.29 Cr* onwards',
    numericPrice: 12900000,
    beds: 3,
    baths: 3,
    descriptor: 'Fully approved MahaRERA project scheduled for milestone delivery by June 2028 with advanced Mivan construction.'
  }
];

// 2. LOCATIONS & STRATEGIC NODES (25 Dimensions)
export const LOCATIONS: readonly LocationMeta[] = [
  { id: 'balewadi', name: 'Balewadi, West Pune', tagline: 'Primary Luxury Riverfront Sanctuary', distanceFromSite: '0.0 km (At Site)', travelTime: '0 mins', corridorType: 'Core Micro-Market' },
  { id: 'balewadi-high-street', name: 'Balewadi High Street Corridor', tagline: 'Premier Lifestyle, Retail & Culinary Avenue', distanceFromSite: '1.2 km', travelTime: '3 mins', corridorType: 'Commercial Lifestyle' },
  { id: 'balewadi-sports-complex', name: 'Balewadi Stadium & Sports Enclave', tagline: 'National Sports Arena & Athletic Hub', distanceFromSite: '1.8 km', travelTime: '4 mins', corridorType: 'Institutional' },
  { id: 'baner', name: 'Baner Luxury Enclave', tagline: 'Established Corporate & Dining District', distanceFromSite: '3.0 km', travelTime: '6 mins', corridorType: 'Adjacent Luxury' },
  { id: 'baner-road', name: 'Baner Main Road', tagline: 'Major Arterial Retail & Office Spine', distanceFromSite: '3.2 km', travelTime: '7 mins', corridorType: 'Commercial Transit' },
  { id: 'pancard-club-road', name: 'Pancard Club Road Baner', tagline: 'Prestigious Baner Residential Belt', distanceFromSite: '3.8 km', travelTime: '8 mins', corridorType: 'Premium Residential' },
  { id: 'hinjewadi-phase-1', name: 'Hinjewadi IT Park Phase 1', tagline: 'Rajiv Gandhi Infotech Park Tech Core', distanceFromSite: '6.5 km', travelTime: '10 mins', corridorType: 'Employment Hub' },
  { id: 'hinjewadi-phase-2', name: 'Hinjewadi Tech Corridor Phase 2', tagline: 'Multinational Software Campus Corridor', distanceFromSite: '8.2 km', travelTime: '14 mins', corridorType: 'Employment Hub' },
  { id: 'hinjewadi-phase-3', name: 'Hinjewadi Megapolis Corridor', tagline: 'Global Tech & Innovation Zones', distanceFromSite: '10.5 km', travelTime: '18 mins', corridorType: 'Employment Hub' },
  { id: 'mahalunge', name: 'Mahalunge PMRDA Hi-Tech City', tagline: 'Smart Township Infrastructure District', distanceFromSite: '2.5 km', travelTime: '5 mins', corridorType: 'Emerging Growth' },
  { id: 'mahalunge-maan-bridge', name: 'Mahalunge-Balewadi Mula River Bridge', tagline: 'Direct Cross-River Connectivity Link', distanceFromSite: '1.1 km', travelTime: '2 mins', corridorType: 'Transit Catalyst' },
  { id: 'wakad', name: 'Wakad Millennium Corridor', tagline: 'Retail & Phoenix Mall Destination', distanceFromSite: '3.5 km', travelTime: '7 mins', corridorType: 'Retail Corridor' },
  { id: 'aundh', name: 'Aundh Prestige Belt', tagline: 'Heritage Western Pune Neighborhood', distanceFromSite: '6.0 km', travelTime: '12 mins', corridorType: 'Heritage Luxury' },
  { id: 'bavdhan', name: 'Bavdhan West Pune', tagline: 'Scenic Green Hillside Corridor', distanceFromSite: '8.5 km', travelTime: '16 mins', corridorType: 'Suburban Luxury' },
  { id: 'pashan', name: 'Pashan Lake Corridor', tagline: 'Quiet Riparian Academic Enclave', distanceFromSite: '5.8 km', travelTime: '11 mins', corridorType: 'Nature Buffer' },
  { id: 'punawale', name: 'Punawale Tech Suburban Corridor', tagline: 'Expressway Suburban Corridor', distanceFromSite: '7.8 km', travelTime: '15 mins', corridorType: 'Suburban Growth' },
  { id: 'tathawade', name: 'Tathawade Education & IT Hub', tagline: 'University & Engineering Campus District', distanceFromSite: '6.8 km', travelTime: '13 mins', corridorType: 'Educational' },
  { id: 'west-pune', name: 'West Pune Golden Triangle', tagline: 'Premier Wealth & Technology Corridor', distanceFromSite: '0.0 km', travelTime: '0 mins', corridorType: 'Regional Macro' },
  { id: 'mumbai-pune-expressway', name: 'Mumbai-Pune Expressway Gateway', tagline: 'Rapid Inter-City Transit Arterial', distanceFromSite: '4.5 km', travelTime: '8 mins', corridorType: 'Expressway Corridor' },
  { id: 'mula-river-promenade', name: '500m Mula River Boardwalk', tagline: 'Direct Riparian Green Buffer', distanceFromSite: '0.0 km (Direct Access)', travelTime: '0 mins', corridorType: 'Natural Waterfront' },
  { id: 'cummins-india-balewadi', name: 'Cummins India Campus Balewadi', tagline: 'Global Engineering Headquarters', distanceFromSite: '1.5 km', travelTime: '3 mins', corridorType: 'Corporate Headquarters' },
  { id: 'jupiter-hospital-baner', name: 'Jupiter Hospital Healthcare Corridor', tagline: 'Tertiary Care Medical Infrastructure', distanceFromSite: '3.4 km', travelTime: '7 mins', corridorType: 'Healthcare' },
  { id: 'orchid-school-balewadi', name: 'The Orchid School Educational Enclave', tagline: 'Premier CBSE Academic Campus', distanceFromSite: '1.8 km', travelTime: '4 mins', corridorType: 'Education' },
  { id: 'metro-line-3-balewadi', name: 'PMRDA Metro Line 3 Balewadi Station', tagline: 'Rapid Transit Metro Corridor', distanceFromSite: '1.3 km', travelTime: '3 mins', corridorType: 'Metro Transit' },
  { id: 'balewadi-village-road', name: 'Balewadi Village Road Sanctuary', tagline: 'Tree-Lined Quiet Approach Boulevard', distanceFromSite: '0.0 km (Address)', travelTime: '0 mins', corridorType: 'Site Access' }
];

// 3. INTENT MODIFIERS (20 Dimensions)
export const INTENTS: readonly IntentMeta[] = [
  { id: 'price-cost-sheet', name: 'Price Breakdown & Official Cost Sheet 2026', actionHook: 'Download all-inclusive pricing schedule', primaryFocus: 'Transparent price matrices, installment milestones, and stamp duty breakdowns.' },
  { id: 'floor-plans-carpet-area', name: 'Sanctioned Floor Plans & Carpet Area PDF', actionHook: 'Inspect sanctioned architectural layouts', primaryFocus: 'RERA-certified usable carpet areas, room dimensions, and balcony configurations.' },
  { id: 'rera-possession-date', name: 'MahaRERA P52100045688 & Possession Timeline', actionHook: 'Verify legal compliance and title', primaryFocus: 'Official MahaRERA registration certificates and scheduled June 2028 delivery milestones.' },
  { id: 'sample-flat-video-tour', name: 'Sample Flat Video & 3D Virtual Walkthrough', actionHook: 'Take a virtual architectural tour', primaryFocus: 'High-definition 4K video walkthroughs of model residences and 20ft double-height salons.' },
  { id: '8-acre-masterplan-amenities', name: '8-Acre Masterplan & 30+ Resort Amenities', actionHook: 'Explore site layout and landscapes', primaryFocus: '75%+ open green podiums, Olympic lap pool, championship courts, and river boardwalk.' },
  { id: 'payment-schedule-bank-loan', name: 'Payment Schedule & Approved Bank Loans SBI HDFC ICICI', actionHook: 'Calculate mortgage & check eligibility', primaryFocus: 'Zero pre-EMI schemes, approved APF numbers, and bank tie-ups with competitive rates.' },
  { id: 'buyer-reviews-ratings', name: 'Verified Homebuyer Reviews & Architectural Ratings', actionHook: 'Read 4.9-star verified feedback', primaryFocus: 'Independent appraisals, construction quality reviews, and homeowner testimonials.' },
  { id: 'booking-enquiry-concierge', name: 'VIP Site Visit & Direct Booking Concierge', actionHook: 'Schedule a private experiential visit', primaryFocus: 'Direct developer sales desk reservations, show home appointments, and priority allotments.' },
  { id: 'capital-appreciation-forecast', name: 'Capital Appreciation & Investment Forecast 2026-2030', actionHook: 'Review historical & future ROI yields', primaryFocus: 'Projected 12-14% CAGR driven by Metro Line 3 and Mula Riverfront Development (RFD).' },
  { id: 'rental-yield-tech-executives', name: 'High Rental Yield & Executive Housing Demand', actionHook: 'Explore 4.4% rental return benchmarks', primaryFocus: 'Premium tenant demographics from Hinjewadi IT Park Phase 1 and Balewadi High Street corporate hubs.' },
  { id: 'all-inclusive-price-breakdown', name: 'All-Inclusive Pricing & Stamp Duty Calculator', actionHook: 'Get exact on-road price estimates', primaryFocus: 'No-hidden-cost transparency covering basic rate, floor rise, parking, GST, and registration.' },
  { id: 'specifications-finishes', name: 'Italian Marble, High-Ceiling & Biophilic Specifications', actionHook: 'Examine interior luxury inclusions', primaryFocus: 'Engineered hardwood decks, Toto sanitary fittings, Schneider smart automation, and acoustic glass.' },
  { id: 'riverfront-view-apartments', name: 'Riparian River-Facing Balcony & Deck Units', actionHook: 'Select river-facing inventory', primaryFocus: 'Unobstructed scenic vistas overlooking the tranquil Mula river and lush biodiversity buffers.' },
  { id: 'vastu-compliant-layouts', name: 'East-West Facing & 100% Vastu Sanctioned Layouts', actionHook: 'Verify directional energy alignments', primaryFocus: 'Scientific Vastu principles ensuring east-facing entrances and auspicious kitchen placement.' },
  { id: 'gated-community-security', name: '3-Tier Biometric Security & Private Foyer Elevators', actionHook: 'Discover privacy & safety standards', primaryFocus: '24/7 AI-monitored perimeter security, RFID vehicle tags, and controlled private elevator lobbies.' },
  { id: 'clubhouse-infinity-pool', name: '20,000 sq.ft. Clubhouse & Temperature Controlled Infinity Pool', actionHook: 'Tour The Grand Pavilion club realm', primaryFocus: 'Private screening theater, reflexology sensory gardens, squash court, and yoga deck.' },
  { id: 'nri-investment-portfolio', name: 'NRI Dual-Currency Desk & Repatriation Guidance', actionHook: 'Connect with global NRI wealth desk', primaryFocus: 'FEMA-compliant transactions, power of attorney facilitation, and USD/AED/EUR currency advisory.' },
  { id: 'construction-status-milestone', name: 'Live Construction Status & Structural Milestones', actionHook: 'Track engineering progress updates', primaryFocus: 'Monthly progress photography, concrete core casting updates, and safety milestone certifications.' },
  { id: 'resale-vs-new-launch', name: 'New Launch Direct Booking vs Resale Comparison', actionHook: 'Compare launch rates with market resale', primaryFocus: 'Why first-allotment developer pricing delivers 25% higher equity growth than older resale units.' },
  { id: 'brochure-pdf-download', name: 'Official Architectural Brochure & Sanctioned Layout PDF', actionHook: 'Download comprehensive property monograph', primaryFocus: 'Full-color architectural lookbook, structural dimensions, project specifications, and locator map.' }
];

// Total deterministic count: 10 * 25 * 20 = 5,000 Pages
export const TOTAL_PROGRAMMATIC_PAGES = TYPOLOGIES.length * LOCATIONS.length * INTENTS.length; // 5000

/**
 * Encodes indices (t, l, i) into a clean, canonical SEO slug.
 */
export function buildProgrammaticSlug(typologyIndex: number, locationIndex: number, intentIndex: number): string {
  const typ = TYPOLOGIES[typologyIndex];
  const loc = LOCATIONS[locationIndex];
  const int = INTENTS[intentIndex];
  return `mantra-meridian-riverside-${typ.id}-${loc.id}-${int.id}`;
}

/**
 * Returns an array of all 5,000 programmatic slugs.
 */
export function getAllProgrammaticSlugs(): string[] {
  const slugs: string[] = [];
  for (let t = 0; t < TYPOLOGIES.length; t++) {
    for (let l = 0; l < LOCATIONS.length; l++) {
      for (let i = 0; i < INTENTS.length; i++) {
        slugs.push(buildProgrammaticSlug(t, l, i));
      }
    }
  }
  return slugs;
}

/**
 * Fast O(1) mathematical decoder from slug to ProgrammaticPageData.
 */
export function resolveProgrammaticSlug(slug: string): ProgrammaticPageData | null {
  if (!slug || !slug.startsWith('mantra-meridian-riverside-')) {
    return null;
  }

  const remainder = slug.replace('mantra-meridian-riverside-', '');
  
  let foundTyp: TypologyMeta | null = null;
  let foundLoc: LocationMeta | null = null;
  let foundInt: IntentMeta | null = null;

  for (const typ of TYPOLOGIES) {
    if (!remainder.startsWith(`${typ.id}-`)) continue;
    const afterTyp = remainder.slice(typ.id.length + 1);

    for (const intent of INTENTS) {
      if (!afterTyp.endsWith(`-${intent.id}`)) continue;
      const locId = afterTyp.slice(0, -(intent.id.length + 1));
      const loc = LOCATIONS.find((l) => l.id === locId);
      if (loc) {
        foundTyp = typ;
        foundLoc = loc;
        foundInt = intent;
        break;
      }
    }
    if (foundTyp && foundLoc && foundInt) break;
  }

  if (!foundTyp || !foundLoc || !foundInt) return null;

  // Assemble full programmatic page payload
  const canonicalUrl = `https://mantrameridianriverside.com/properties/${slug}/`;
  const pageTitle = `${foundTyp.name} in ${foundLoc.name} | ${foundInt.name} | Mantra Meridian Riverside`;
  const metaDescription = `Explore ${foundTyp.name} (${foundTyp.carpet}) at Mantra Meridian Riverside, ${foundLoc.name}. Starting ${foundTyp.price}. ${foundInt.primaryFocus} MahaRERA P52100045688.`;
  const h1Title = `${foundTyp.name} near ${foundLoc.name}`;
  const heroHeadline = `${foundInt.name} — Luxury Living along the Mula River`;
  const summaryText = `Mantra Meridian Riverside introduces an unparalleled residential standard in ${foundLoc.name}. Featuring ${foundTyp.descriptor} Strategically positioned ${foundLoc.distanceFromSite} (${foundLoc.travelTime}) from ${foundLoc.name}, this 8-acre sanctuary delivers 75%+ green space, immediate access to Balewadi High Street, and premier connectivity to the Hinjewadi IT Corridor.`;

  const highlights = [
    `Configuration: ${foundTyp.name} (${foundTyp.carpet} RERA Usable Carpet)`,
    `Price Consideration: Starting from ${foundTyp.price} (All-Inclusive Cost Sheet Available)`,
    `Proximity: ${foundLoc.distanceFromSite} from ${foundLoc.name} (${foundLoc.travelTime} drive)`,
    `Statutory Authorization: MahaRERA Registration P52100045688 (June 2028 Delivery)`,
    `Architectural Scale: 8 Contiguous Acres, 75%+ Open Space, 500m River Promenade`,
    `Focus: ${foundInt.name} with dedicated concierge advisory`
  ];

  const faqs = [
    {
      question: `What is the price and carpet area of ${foundTyp.name} at Mantra Meridian Riverside?`,
      answer: `${foundTyp.name} offers a sanctioned carpet area of ${foundTyp.carpet} with prices starting from ${foundTyp.price}. The project features transparent cost sheets with all-inclusive payment schedules linked to construction milestones.`
    },
    {
      question: `How accessible is Mantra Meridian Riverside from ${foundLoc.name}?`,
      answer: `Mantra Meridian Riverside is located approximately ${foundLoc.distanceFromSite} from ${foundLoc.name}, reachable within ${foundLoc.travelTime} via wide arterial boulevards and direct bypass corridors.`
    },
    {
      question: `What is the official MahaRERA registration number and possession timeline?`,
      answer: `Mantra Meridian Riverside is officially registered under MahaRERA number P52100045688 with scheduled possession commencing in June 2028 under advanced Mivan construction methodology.`
    },
    {
      question: `How can I access the ${foundInt.name} for this project?`,
      answer: `You can access the verified ${foundInt.name}, sanctioned layout drawings, and bank loan approvals by booking a private consultation through the official Mantra Meridian concierge on this page.`
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: 'https://mantrameridianriverside.com/' },
    { name: 'Properties', url: 'https://mantrameridianriverside.com/properties/' },
    { name: foundLoc.name, url: `https://mantrameridianriverside.com/balewadi/` },
    { name: foundTyp.name }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': `${canonicalUrl}#listing`,
        'name': `${foundTyp.name} at Mantra Meridian Riverside Balewadi`,
        'description': metaDescription,
        'url': canonicalUrl,
        'datePosted': '2026-01-15T08:00:00+05:30',
        'offers': {
          '@type': 'Offer',
          'price': foundTyp.numericPrice,
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock',
          'validFrom': '2026-01-01',
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'price': foundTyp.numericPrice,
            'priceCurrency': 'INR',
            'valueAddedTaxIncluded': true
          }
        }
      },
      {
        '@type': 'Product',
        '@id': `${canonicalUrl}#product`,
        'name': `${foundTyp.name} — Mantra Meridian Riverside`,
        'description': foundTyp.descriptor,
        'brand': {
          '@type': 'Brand',
          'name': 'Mantra Properties'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '48',
          'bestRating': '5'
        },
        'offers': {
          '@type': 'Offer',
          'price': foundTyp.numericPrice,
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock',
          'url': canonicalUrl
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        'mainEntity': faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }
    ]
  };

  return {
    slug,
    url: canonicalUrl,
    title: pageTitle,
    metaDescription,
    h1Title,
    typologyName: foundTyp.name,
    carpetArea: foundTyp.carpet,
    priceDisplay: foundTyp.price,
    priceNumeric: foundTyp.numericPrice,
    bedrooms: foundTyp.beds,
    bathrooms: foundTyp.baths,
    locationName: foundLoc.name,
    intentName: foundInt.name,
    heroHeadline,
    summaryText,
    highlights,
    faqs,
    breadcrumbs,
    schema
  };
}
