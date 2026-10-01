export interface KeywordCluster {
  category: string;
  primaryKeywords: string[];
  searchIntents: string[];
  semanticPhrases: string[];
}

export interface TopicalClusterDefinition {
  id: number;
  name: string;
  category: string;
  pillarId: number;
  intent: 'Navigational' | 'Commercial' | 'Informational' | 'Transactional';
  canonicalTarget: string;
  schemaEntityType: string;
  keywords: string[];
  seoAnchorText: string;
  editorialSummary: string;
}

// =============================================================================
// 00. CORE BRAND QUERIES (Strict Tier-1 Ranking Targets for Google.com)
// Note: Order of positions #1-#5 is strictly asserted in automated edge tests.
// =============================================================================
export const coreBrandQueries: readonly string[] = [
  "Mantra Meridian",
  "Mantra Balewadi",
  "Mantra Riverside",
  "Mantra Riverside Balewadi",
  "Mantra Meridian Balewadi"
] as const;

export const coreBrandQueriesLower: readonly string[] = [
  "mantra meridian",
  "mantra balewadi",
  "mantra riverside",
  "mantra riverside balewadi",
  "mantra meridian balewadi"
] as const;

export const majorGoogleQueries: readonly string[] = [
  "Mantra Balewadi",
  "Mantra Meridian",
  "Mantra Meridian Balewadi",
  "Mantra Riverside Balewadi",
  "Mantra Riverride Balewadi",
  "Mantra Meridian Riverside Balewadi"
] as const;

export const majorGoogleQueriesLower: readonly string[] = [
  "mantra balewadi",
  "mantra meridian",
  "mantra meridian balewadi",
  "mantra riverside balewadi",
  "mantra riverride balewadi",
  "mantra meridian riverside balewadi"
] as const;

// =============================================================================
// 01. COMPREHENSIVE BRAND ENTITY PERMUTATIONS
// =============================================================================
export const brandPermutations: string[] = [
  // 5 Explicit High-Priority Target Search Queries (Strictly preserved for test assertion integrity)
  "Mantra Meridian",
  "Mantra Balewadi",
  "Mantra Riverside",
  "Mantra Riverside Balewadi",
  "Mantra Meridian Balewadi",

  // Major Google Query Variations & Combinations
  "Mantra Riverride Balewadi",
  "Mantra Meridian Riverside Balewadi",
  "Mantra Riverride",
  "Riverride Balewadi Mantra",
  "Riverride Mantra Balewadi",
  "Mantra Riverride Pune",
  "Meridian Mantra Balewadi",
  "Riverside Mantra Balewadi",
  "Balewadi Mantra Meridian",
  "Balewadi Mantra Riverside",
  "Balewadi Mantra Meridian Riverside",
  "Mantra Riverside Meridian Balewadi",

  // 4-token natural permutations
  "Mantra Meridian Riverside Balewadi",
  "Mantra Meridian Balewadi Riverside",
  "Mantra Riverside Meridian Balewadi",
  "Mantra Riverside Balewadi Meridian",
  "Mantra Balewadi Meridian Riverside",
  "Mantra Balewadi Riverside Meridian",
  "Meridian Riverside Balewadi Mantra",
  "Meridian Balewadi Riverside Mantra",
  "Meridian Mantra Riverside Balewadi",
  "Meridian Mantra Balewadi Riverside",
  "Riverside Meridian Balewadi Mantra",
  "Riverside Mantra Meridian Balewadi",
  "Balewadi Mantra Meridian Riverside",
  "Balewadi Meridian Riverside Mantra",
  "Balewadi Riverside Mantra Meridian",

  // 3-token essential permutations
  "Mantra Meridian Balewadi",
  "Mantra Meridian Riverside",
  "Mantra Riverside Balewadi",
  "Meridian Riverside Balewadi",
  "Meridian Balewadi Pune",
  "Mantra Balewadi Pune",
  "Mantra Riverside Pune",
  "Mantra Meridian Pune",
  "Meridian at Riverside Balewadi",
  "Meridian at Riverside Pune",
  "Meridian Riverside Pune",
  "Site Mantra Riverside",
  "Site Mantra Balewadi",
  "Mantra Meridian High Street",
  "Meridian Balewadi High Street",
  "Mantra Balewadi Riverside",
  "Riverside Balewadi Mantra",

  // Developer authority permutations
  "Mantra Properties Meridian Balewadi",
  "Mantra Properties Meridian Riverside",
  "Mantra Properties Riverside Balewadi",
  "Mantra Properties Balewadi Pune",
  "Mantra Properties Meridian Riverside Balewadi",
  "Meridian by Mantra Properties",
  "Meridian by Mantra Properties Balewadi",
  "Riverside by Mantra Properties",
  "Mantra Properties Ongoing Projects Balewadi",
  "Mantra Properties New Launch Balewadi",
  "Mantra Properties Balewadi Village Road",

  // High-Intent Search Query Permutations & Combinations
  "Mantra Meridian Balewadi Pune",
  "Mantra Riverside Balewadi Pune",
  "Mantra Meridian Riverside Balewadi Pune",
  "Mantra Balewadi Riverside Pune",
  "Mantra Meridian Pune Balewadi",
  "Mantra Riverside Pune Balewadi",
  "Mantra Meridian Riverside West Pune",
  "Mantra Meridian Project Balewadi",
  "Mantra Riverside Project Balewadi",
  "Mantra Meridian Riverside Project",
  "Mantra Meridian Official Website",
  "Mantra Riverside Official Website",
  "Mantra Meridian Balewadi Official Website",
  "Mantra Riverside Balewadi Official Website",
  "Mantra Meridian Riverside Official Website",

  // Phonetic, Spacing & Common Query Variations
  "Mantra Riverride",
  "Mantra Riverride Balewadi",
  "Mantra Riverride Riverside",
  "Mantra Maridian",
  "Mantra Maridian Balewadi",
  "Mantra Maridian Riverside",
  "Mantra Maridian Riverside Balewadi",
  "Mantra River Side",
  "Mantra River Side Balewadi",
  "Mantra Meridian River Side",
  "Mantra Meridian River Side Balewadi",
  "Meridian Mantra",
  "Meridian Mantra Pune",
  "Riverside Mantra",
  "Riverside Mantra Pune",

  // Intent: Price, Cost Sheet & Payment
  "Mantra Meridian Balewadi Price",
  "Mantra Riverside Balewadi Price",
  "Mantra Meridian Riverside Price",
  "Mantra Balewadi Price List",
  "Mantra Meridian Cost Sheet",
  "Mantra Riverside Cost Sheet",
  "Mantra Meridian Balewadi Cost Sheet",
  "Mantra Riverside Balewadi Cost Sheet",
  "Mantra Meridian Balewadi Payment Plan",

  // Intent: Floor Plans, Layout & Masterplan
  "Mantra Meridian Balewadi Floor Plans",
  "Mantra Riverside Balewadi Floor Plans",
  "Mantra Meridian Riverside Floor Plan",
  "Mantra Balewadi Floor Plan PDF",
  "Mantra Meridian 8 Acre Masterplan",
  "Mantra Riverside Masterplan Balewadi",

  // Intent: Location & Landmarks
  "Mantra Meridian Balewadi Location",
  "Mantra Riverside Balewadi Location",
  "Mantra Meridian Balewadi Site Address",
  "Mantra Riverside Balewadi Site Address",
  "Mantra Meridian near Balewadi High Street",
  "Mantra Riverside near Balewadi High Street",
  "Mantra Balewadi near Hinjewadi IT Park",
  "Mantra Meridian near Mula River",
  "Mantra Riverside Mula River Promenade",

  // Intent: Trust, RERA & Contact
  "Mantra Meridian Balewadi RERA Number",
  "Mantra Riverside Balewadi RERA",
  "Mantra Meridian Balewadi MahaRERA P52100045688",
  "Mantra Meridian Balewadi Contact Number",
  "Mantra Riverside Balewadi Phone Number",
  "Mantra Meridian Balewadi Sales Office",
  "Mantra Meridian Balewadi Experience Centre",
  "Mantra Meridian Balewadi Sample Flat",
  "Mantra Riverside Balewadi Sample Flat Video",
  "Mantra Meridian Balewadi Possession Date",
  "Mantra Riverside Balewadi Possession Date",
  "Mantra Meridian Balewadi Construction Update",
  "Mantra Riverside Balewadi Reviews",
  "Mantra Meridian Balewadi Reviews"
];

// =============================================================================
// 02. CONFIGURATION & TYPOLOGY SEARCH PERMUTATIONS
// =============================================================================
export const typologyPermutations: string[] = [
  "Mantra Meridian Riverside Balewadi 2 BHK",
  "Mantra Meridian Balewadi 2 BHK price",
  "Mantra Meridian 2 BHK carpet area Balewadi",
  "Mantra Meridian Riverside 2 BHK floor plan",
  "2 BHK flats in Balewadi Mantra Meridian",
  "2 BHK in Balewadi Mantra Riverside",
  "Mantra Properties Meridian 2 BHK price",
  "2 BHK flats near Balewadi High Street Mantra",
  
  "Mantra Meridian Riverside Balewadi 3 BHK",
  "Mantra Meridian Balewadi 3 BHK price",
  "Mantra Meridian 3 BHK carpet area Balewadi",
  "Mantra Meridian Riverside 3 BHK floor plan",
  "3 BHK flats in Balewadi Mantra Meridian",
  "3 BHK in Balewadi Mantra Riverside",
  "Mantra Properties Meridian 3 BHK price",
  "3 BHK river facing apartments Balewadi Mantra",

  "Mantra Meridian Riverside Balewadi 3 BHK Duplex",
  "Mantra Meridian Balewadi Duplex price",
  "Signature Sky Duplex Balewadi Mantra Meridian",
  "Mantra Meridian 3 BHK Duplex floor plan",
  "Duplex flats in Balewadi Mantra Meridian",
  "Two tier sky homes Balewadi Mantra Properties",
  "Double height ceiling flats Balewadi Mantra",

  "Mantra Meridian Riverside Balewadi 4 BHK",
  "Mantra Meridian Balewadi 4 BHK price",
  "Mantra Meridian 4 BHK carpet area Balewadi",
  "Mantra Meridian Riverside 4 BHK floor plan",
  "4 BHK luxury apartments Balewadi Mantra Meridian",
  "4 BHK flats in Balewadi Mantra Riverside",
  "Grand Riverside Estates Mantra Meridian Balewadi"
];

// =============================================================================
// 03. PRICING, COMMERCIAL & COST SHEET PERMUTATIONS
// =============================================================================
export const pricingPermutations: string[] = [
  "Mantra Meridian Riverside Balewadi price",
  "Mantra Meridian Balewadi price list 2026",
  "Mantra Meridian Riverside cost sheet",
  "Mantra Meridian Balewadi cost sheet PDF",
  "Mantra Riverside Balewadi pricing breakdown",
  "Meridian Riverside Balewadi payment plan",
  "Mantra Properties Meridian Balewadi all inclusive price",
  "Mantra Meridian Balewadi booking amount",
  "Mantra Meridian Riverside maintenance charges",
  "Mantra Meridian Balewadi price per square foot",
  "Mantra Meridian stamp duty registration Pune",
  "Mantra Meridian home loan approved banks SBI HDFC ICICI",
  "Mantra Meridian installment schedule Balewadi",
  "Mantra Properties Meridian Riverside payment schedule"
];

// =============================================================================
// 04. LOCATION, TRANSIT & PROXIMITY PERMUTATIONS
// =============================================================================
export const locationPermutations: string[] = [
  "Mantra Meridian Riverside Balewadi exact location",
  "Mantra Meridian Balewadi site address",
  "Mantra Meridian Balewadi Village Road address",
  "Mantra Meridian Google Maps location",
  "Mantra Meridian location near Balewadi High Street",
  "Riverside flats near Balewadi High Street Mantra Meridian",
  "Properties near Mula River Balewadi Mantra Meridian",
  "Flats near proposed Wakad Balewadi bridge Mantra Meridian",
  "Apartments near PMRDA Metro Line 3 Balewadi Mantra Meridian",
  "Luxury flats near Hinjewadi IT Park Phase 1 Mantra Meridian",
  "Mantra Meridian distance from Cummins India Balewadi",
  "Mantra Meridian distance from Jupiter Hospital Baner",
  "Mantra Meridian distance from The Orchid School Balewadi",
  "West Pune luxury real estate corridor Mantra Meridian"
];

// =============================================================================
// 05. FLOOR PLANS, MASTERPLAN & COLLATERAL PERMUTATIONS
// =============================================================================
export const collateralPermutations: string[] = [
  "Mantra Meridian Riverside Balewadi floor plans",
  "Mantra Meridian Balewadi floor plans PDF download",
  "Mantra Meridian Riverside unit layouts",
  "Mantra Meridian 8-acre masterplan layout Balewadi",
  "Mantra Meridian Riverside sanctioned building plans",
  "Mantra Meridian Balewadi official brochure PDF",
  "Mantra Meridian brochure download Balewadi",
  "Mantra Meridian Balewadi sample flat video",
  "Mantra Meridian 3D virtual tour Balewadi",
  "Mantra Meridian elevation and layout drawings"
];

// =============================================================================
// 06. MAHARERA STATUTORY, LEGAL & POSSESSION PERMUTATIONS
// =============================================================================
export const statutoryPermutations: string[] = [
  "Mantra Meridian Riverside Balewadi MahaRERA number",
  "MahaRERA P52100045688 Mantra Meridian",
  "MahaRERA P52100045688 Balewadi",
  "Mantra Meridian Balewadi RERA certificate download",
  "Mantra Meridian Riverside possession date June 2028",
  "Mantra Meridian Balewadi legal title clearance",
  "Mantra Meridian construction status update 2026",
  "Mantra Properties MahaRERA compliance Pune",
  "Mantra Meridian sanctioned carpet area certificate"
];

// =============================================================================
// 07. CONTACT, SALES OFFICE & SITE VISIT PERMUTATIONS
// =============================================================================
export const contactPermutations: string[] = [
  "Mantra Meridian Riverside Balewadi contact number",
  "Mantra Meridian Balewadi official contact concierge",
  "Mantra Meridian sales office Balewadi",
  "Mantra Meridian sales gallery Balewadi Village Road",
  "Mantra Meridian site visit booking",
  "Mantra Meridian official enquiry WhatsApp Concierge",
  "Mantra Meridian customer care number Pune",
  "Mantra Properties sales office contact Pune"
];

// =============================================================================
// 08. REVIEWS, CREDIBILITY & COMPARATIVE PERMUTATIONS
// =============================================================================
export const reputationPermutations: string[] = [
  "Mantra Meridian Riverside Balewadi reviews",
  "Mantra Meridian Balewadi genuine buyer reviews",
  "Mantra Meridian Balewadi complaints and ratings",
  "Mantra Meridian vs 24K Altura Balewadi",
  "Mantra Meridian vs Balmoral Riverside Balewadi",
  "Mantra Meridian vs VTP Earth One Balewadi",
  "Mantra Meridian vs ANP Universe Balewadi",
  "Best luxury residential project in Balewadi Pune 2026",
  "Is Mantra Meridian good for investment in Pune",
  "Mantra Properties customer satisfaction track record"
];

// =============================================================================
// 09. HINJEWADI IT PARK & TECH EXECUTIVE CORRIDOR PERMUTATIONS
// =============================================================================
export const hinjewadiKeywords: string[] = [
  "flats near Hinjewadi IT Park Phase 1",
  "flats near Hinjewadi IT Park Phase 2",
  "2 BHK near Hinjewadi IT Park Pune",
  "3 BHK near Hinjewadi IT Park Pune",
  "luxury apartments near Rajiv Gandhi Infotech Park",
  "Mantra Meridian Hinjewadi connectivity",
  "commute from Balewadi to Hinjewadi Phase 1",
  "luxury homes for IT leaders Hinjewadi Balewadi",
  "PMRDA Metro Line 3 Hinjewadi to Balewadi",
  "residences near Embassy TechZone Hinjewadi",
  "apartments near Quadron Business Park Hinjewadi",
  "executive housing Hinjewadi tech corridor"
];

// =============================================================================
// 10. BANER LUXURY CORRIDOR & LINK ROAD PERMUTATIONS
// =============================================================================
export const banerKeywords: string[] = [
  "Baner luxury apartments Pune",
  "flats in Baner Pune",
  "apartments in Baner Pune",
  "luxury flats in Baner",
  "2 BHK flats in Baner Pune",
  "3 BHK flats in Baner Pune",
  "4 BHK luxury apartments Baner",
  "flats near Baner Balewadi link road",
  "luxury homes near Balewadi High Street Baner",
  "Mantra Meridian Baner connectivity",
  "Mantra Properties Baner",
  "Mantra Meridian Baner",
  "Baner vs Balewadi real estate comparison",
  "new residential projects in Baner Balewadi 2026",
  "upcoming projects in Baner Pune",
  "Pancard Club Road luxury flats Pune",
  "premium 3 BHK 4 BHK Baner Balewadi corridor",
  "apartments near Jupiter Hospital Baner",
  "gated community Baner Balewadi border",
  "Baner road luxury properties",
  "flats near Mumbai Pune Expressway Baner",
  "ready possession flats in Baner Balewadi",
  "under construction luxury flats Baner"
];

// =============================================================================
// 11. MAHALUNGE HI-TECH CITY & BRIDGE CORRIDOR PERMUTATIONS
// =============================================================================
export const mahalungeKeywords: string[] = [
  "Mahalunge township flats Pune",
  "Mahalunge Balewadi bridge connection flats",
  "flats near Mahalunge Hi-Tech City PMRDA",
  "riverfront properties Mahalunge Balewadi",
  "VTP Earth One vs Mantra Meridian Balewadi",
  "Godrej Hillside Mahalunge vs Mantra Meridian",
  "investment in Mahalunge Balewadi river corridor",
  "flats near Mula river bridge Mahalunge Balewadi"
];

// =============================================================================
// 12. DUPLEX, PENTHOUSE & SKY VILLA ARCHITECTURAL PERMUTATIONS
// =============================================================================
export const duplexPenthouseKeywords: string[] = [
  "3 BHK Duplex flats Balewadi Pune",
  "Sky Duplex Mantra Meridian Riverside",
  "double height ceiling apartments Pune",
  "4 BHK Riverfront Penthouse Balewadi",
  "two tier luxury sky villas Pune",
  "luxury duplex apartments West Pune",
  "river facing duplex Balewadi Mantra Meridian",
  "20ft ceiling living room apartments Pune",
  "luxury penthouses in Balewadi Pune"
];

// =============================================================================
// 13. COMPARATIVE PROJECT & LOCALITY SEARCHES
// =============================================================================
export const comparativeProjectKeywords: string[] = [
  "Mantra Meridian vs Kumar Magnacity",
  "Mantra Meridian vs 24K Altura Balewadi",
  "Mantra Meridian vs Balmoral Riverside Balewadi",
  "Mantra Meridian vs VTP Earth One Mahalunge",
  "Mantra Meridian vs ANP Universe Balewadi",
  "Mantra Meridian vs Kasturi The Balmoral",
  "best luxury residential project Balewadi vs Wakad",
  "riverfront apartments Balewadi comparison 2026",
  "Mantra Properties vs Kolte Patil Balewadi"
];

// =============================================================================
// 14. PUNE REAL ESTATE MACRO MARKET & INVESTMENT PERMUTATIONS
// =============================================================================
export const puneRealEstateMacroKeywords: string[] = [
  "Pune real estate market outlook 2026",
  "best residential investment micromarkets Pune",
  "top luxury projects in West Pune 2026",
  "riverfront development RFD Pune real estate",
  "Mula Mutha riverfront apartments Pune",
  "Pune Metro Line 3 residential appreciation",
  "Pune Ring Road impact on Balewadi property",
  "NRI luxury real estate investment Pune"
];

// =============================================================================
// COMPLETE 54-CLUSTER KEYWORD ECOSYSTEM TAXONOMY
// Fully compliant with Google Search Essentials, Information Gain, and E-E-A-T
// =============================================================================
export const TOPICAL_CLUSTERS_54: Record<number, TopicalClusterDefinition> = {
  1: {
    id: 1,
    name: "Master Brand Keywords",
    category: "Brand Authority",
    pillarId: 1,
    intent: "Navigational",
    canonicalTarget: "/",
    schemaEntityType: "ApartmentComplex",
    seoAnchorText: "Mantra Meridian Riverside Balewadi",
    editorialSummary: "Official flagship portal covering Mantra Meridian, Mantra Riverside, and Mantra Balewadi by Mantra Properties.",
    keywords: [
      "Mantra Meridian", "Mantra Meridian Pune", "Mantra Meridian Balewadi", "Mantra Meridian Riverside",
      "Mantra Meridian Riverside Balewadi", "Mantra Riverside", "Mantra Riverside Balewadi", "Mantra Balewadi",
      "Mantra Properties Balewadi", "Mantra Properties Pune", "Mantra Meridian Pune project", "Mantra Meridian residential project",
      "Mantra Meridian luxury project", "Mantra Meridian premium project", "Mantra Meridian apartments", "Mantra Meridian flats",
      "Mantra Meridian homes", "Mantra Meridian residences", "Mantra Meridian riverfront apartments", "Mantra Meridian riverside apartments",
      "Mantra Meridian waterfront homes", "Mantra Meridian luxury residences", "Mantra Meridian West Pune"
    ]
  },
  2: {
    id: 2,
    name: "Developer Keyword Ecosystem",
    category: "Developer Authority",
    pillarId: 1,
    intent: "Navigational",
    canonicalTarget: "/",
    schemaEntityType: "RealEstateAgent",
    seoAnchorText: "Mantra Properties Pune Projects",
    editorialSummary: "Institutional track record of Mantra Properties delivering benchmark residential communities across Pune.",
    keywords: [
      "Mantra Properties", "Mantra Properties Pune", "Mantra Properties projects", "Mantra Properties Pune projects",
      "Mantra Properties residential projects", "Mantra Properties luxury projects", "Mantra Properties premium projects",
      "Mantra Properties upcoming projects", "Mantra Properties new projects", "Mantra Properties Balewadi",
      "Mantra Properties West Pune", "Mantra Properties developer", "Mantra Properties builder", "Mantra Properties review",
      "Mantra Properties projects review", "Mantra Properties Meridian", "Mantra Properties Mantra Meridian",
      "Mantra Properties Balewadi projects", "Mantra Properties riverfront projects", "Mantra Properties luxury apartments"
    ]
  },
  3: {
    id: 3,
    name: "High-Intent Project Keywords",
    category: "Commercial Intent",
    pillarId: 1,
    intent: "Transactional",
    canonicalTarget: "/price/",
    schemaEntityType: "RealEstateListing",
    seoAnchorText: "Mantra Meridian Price & Cost Sheet",
    editorialSummary: "Transparent pricing breakdown, cost sheets, payment schedules, and verified booking details.",
    keywords: [
      "Mantra Meridian price", "Mantra Meridian price Pune", "Mantra Meridian price Balewadi", "Mantra Meridian Riverside price",
      "Mantra Meridian latest price", "Mantra Meridian current price", "Mantra Meridian price list", "Mantra Meridian cost",
      "Mantra Meridian cost sheet", "Mantra Meridian payment plan", "Mantra Meridian payment schedule", "Mantra Meridian booking amount",
      "Mantra Meridian token amount", "Mantra Meridian offers", "Mantra Meridian launch offers", "Mantra Meridian discount",
      "Mantra Meridian availability", "Mantra Meridian booking", "Mantra Meridian site visit", "Mantra Meridian sample flat",
      "Mantra Meridian sales office", "Mantra Meridian brochure", "Mantra Meridian brochure PDF"
    ]
  },
  4: {
    id: 4,
    name: "2 BHK Keyword Cluster",
    category: "Typology",
    pillarId: 2,
    intent: "Commercial",
    canonicalTarget: "/mantra-meridian-riverside/2-bhk/",
    schemaEntityType: "SingleFamilyResidence",
    seoAnchorText: "2 BHK Flats in Balewadi Mantra Meridian",
    editorialSummary: "Detailed architectural specifications for 2 BHK residences spanning 785 to 845 sq.ft. carpet area.",
    keywords: [
      "Mantra Meridian 2 BHK", "Mantra Meridian 2 BHK Balewadi", "Mantra Meridian 2 BHK Pune", "Mantra Meridian Riverside 2 BHK",
      "Mantra Meridian 2 BHK price", "Mantra Meridian 2 BHK price Balewadi", "Mantra Meridian 2 BHK price Pune", "Mantra Meridian 2 BHK flat",
      "Mantra Meridian 2 BHK apartment", "Mantra Meridian 2 BHK home", "Mantra Meridian 2 BHK luxury", "Mantra Meridian 2 BHK premium",
      "Mantra Meridian 2 BHK floor plan", "Mantra Meridian 2 BHK layout", "Mantra Meridian 2 BHK carpet area", "Mantra Meridian 2 BHK balcony",
      "Mantra Meridian 2 BHK river view", "Mantra Meridian 2 BHK river facing", "Mantra Meridian 2 BHK availability", "Mantra Meridian 2 BHK booking",
      "Mantra Meridian 2 BHK review", "Mantra Meridian 2 BHK investment"
    ]
  },
  5: {
    id: 5,
    name: "3 BHK Keyword Cluster",
    category: "Typology",
    pillarId: 2,
    intent: "Commercial",
    canonicalTarget: "/mantra-meridian-riverside/3-bhk/",
    schemaEntityType: "SingleFamilyResidence",
    seoAnchorText: "3 BHK Luxury Apartments Balewadi Mantra Meridian",
    editorialSummary: "Palatial 3 BHK residences spanning 1,120 to 1,240 sq.ft. carpet area with sweeping Mula river vistas.",
    keywords: [
      "Mantra Meridian 3 BHK", "Mantra Meridian 3 BHK Balewadi", "Mantra Meridian 3 BHK Pune", "Mantra Meridian Riverside 3 BHK",
      "Mantra Meridian 3 BHK price", "Mantra Meridian 3 BHK price Balewadi", "Mantra Meridian 3 BHK price Pune", "Mantra Meridian 3 BHK flat",
      "Mantra Meridian 3 BHK apartment", "Mantra Meridian 3 BHK home", "Mantra Meridian 3 BHK luxury", "Mantra Meridian 3 BHK premium",
      "Mantra Meridian 3 BHK floor plan", "Mantra Meridian 3 BHK layout", "Mantra Meridian 3 BHK carpet area", "Mantra Meridian 3 BHK balcony",
      "Mantra Meridian 3 BHK river view", "Mantra Meridian 3 BHK river facing", "Mantra Meridian 3 BHK availability", "Mantra Meridian 3 BHK booking",
      "Mantra Meridian 3 BHK review", "Mantra Meridian 3 BHK investment"
    ]
  },
  6: {
    id: 6,
    name: "3 BHK Duplex / Sky Duplex Cluster",
    category: "Typology",
    pillarId: 2,
    intent: "Commercial",
    canonicalTarget: "/duplex/",
    schemaEntityType: "SingleFamilyResidence",
    seoAnchorText: "Signature 3 BHK Sky Duplex Balewadi",
    editorialSummary: "Rare two-tier architectural sky homes with 20-foot double-height salon living rooms (1,580–1,740 sq.ft. carpet).",
    keywords: [
      "Mantra Meridian 3 BHK duplex", "Mantra Meridian 3 BHK sky duplex", "Mantra Meridian sky duplex", "Mantra Meridian duplex apartment",
      "Mantra Meridian duplex Balewadi", "Mantra Meridian duplex Pune", "Mantra Riverside sky duplex", "Mantra Meridian 3 BHK duplex price",
      "Mantra Meridian sky duplex price", "Mantra Meridian duplex floor plan", "Mantra Meridian duplex carpet area", "Mantra Meridian duplex layout",
      "Mantra Meridian duplex balcony", "Mantra Meridian duplex river view", "Mantra Meridian double height apartment", "Mantra Meridian double height living room",
      "Mantra Meridian duplex with terrace", "Mantra Meridian luxury duplex", "sky duplex Balewadi", "sky duplex Pune",
      "luxury duplex apartments Pune", "duplex apartments West Pune"
    ]
  },
  7: {
    id: 7,
    name: "4 BHK Keyword Cluster",
    category: "Typology",
    pillarId: 2,
    intent: "Commercial",
    canonicalTarget: "/mantra-meridian-riverside/4-bhk/",
    schemaEntityType: "SingleFamilyResidence",
    seoAnchorText: "4 BHK Grand Riverside Estates Balewadi",
    editorialSummary: "Grand multi-generational 4 BHK residences spanning 1,920 to 2,180 sq.ft. carpet area with private elevator access.",
    keywords: [
      "Mantra Meridian 4 BHK", "Mantra Meridian 4 BHK Balewadi", "Mantra Meridian 4 BHK Pune", "Mantra Meridian Riverside 4 BHK",
      "Mantra Meridian 4 BHK price", "Mantra Meridian 4 BHK price Balewadi", "Mantra Meridian 4 BHK apartment", "Mantra Meridian 4 BHK luxury apartment",
      "Mantra Meridian 4 BHK floor plan", "Mantra Meridian 4 BHK layout", "Mantra Meridian 4 BHK carpet area", "Mantra Meridian 4 BHK river view",
      "Mantra Meridian 4 BHK river facing", "Mantra Meridian 4 BHK balcony", "Mantra Meridian 4 BHK availability", "Mantra Meridian 4 BHK booking",
      "Mantra Meridian 4 BHK review", "Mantra Meridian 4 BHK investment", "luxury 4 BHK Balewadi", "premium 4 BHK Balewadi", "luxury 4 BHK West Pune"
    ]
  },
  8: {
    id: 8,
    name: "Penthouse Keywords",
    category: "Typology",
    pillarId: 2,
    intent: "Commercial",
    canonicalTarget: "/penthouse/",
    schemaEntityType: "SingleFamilyResidence",
    seoAnchorText: "Penthouse & Sky Villa Collection Balewadi",
    editorialSummary: "Crown jewel penthouse residences and sky villas with private cantilevered sky decks overlooking the Mula River.",
    keywords: [
      "Mantra Meridian penthouse", "Mantra Meridian penthouses", "Mantra Meridian luxury penthouse", "Mantra Meridian penthouse Balewadi",
      "Mantra Meridian penthouse Pune", "Mantra Meridian river view penthouse", "Mantra Meridian penthouse price", "Mantra Meridian penthouse floor plan",
      "Mantra Meridian penthouse carpet area", "Mantra Meridian premium penthouse", "riverfront penthouse Pune", "luxury penthouse Balewadi",
      "penthouse West Pune"
    ]
  },
  9: {
    id: 9,
    name: "Carpet Area Keywords",
    category: "Technical Specifications",
    pillarId: 2,
    intent: "Informational",
    canonicalTarget: "/floor-plans/",
    schemaEntityType: "FloorPlan",
    seoAnchorText: "Mantra Meridian Carpet Area Analysis",
    editorialSummary: "Certified MahaRERA carpet areas, usable room dimensions, and zero dead corridor space engineering.",
    keywords: [
      "Mantra Meridian carpet area", "Mantra Meridian carpet area Pune", "Mantra Meridian apartment size", "Mantra Meridian flat size",
      "Mantra Meridian unit size", "Mantra Meridian 2 BHK carpet area", "Mantra Meridian 3 BHK carpet area", "Mantra Meridian 3 BHK duplex carpet area",
      "Mantra Meridian 4 BHK carpet area", "Mantra Meridian usable area", "Mantra Meridian built up area", "Mantra Meridian super built up area",
      "Mantra Meridian balcony area", "Mantra Meridian room dimensions", "Mantra Meridian master bedroom size", "Mantra Meridian living room size",
      "Mantra Meridian kitchen size"
    ]
  },
  10: {
    id: 10,
    name: "Floor Plan Ecosystem",
    category: "Technical Specifications",
    pillarId: 2,
    intent: "Commercial",
    canonicalTarget: "/floor-plans/",
    schemaEntityType: "FloorPlan",
    seoAnchorText: "Mantra Meridian Floor Plans PDF Download",
    editorialSummary: "Interactive CAD blueprints, typical floor layouts, and Vastu-compliant residential unit orientations.",
    keywords: [
      "Mantra Meridian floor plan", "Mantra Meridian floor plans", "Mantra Meridian Balewadi floor plan", "Mantra Meridian Riverside floor plan",
      "Mantra Meridian 2 BHK floor plan", "Mantra Meridian 3 BHK floor plan", "Mantra Meridian 3 BHK duplex floor plan", "Mantra Meridian 4 BHK floor plan",
      "Mantra Meridian penthouse floor plan", "Mantra Meridian floor plan PDF", "Mantra Meridian layout", "Mantra Meridian apartment layout",
      "Mantra Meridian flat layout", "Mantra Meridian unit plan", "Mantra Meridian typical floor plan", "Mantra Meridian tower plan",
      "Mantra Meridian building plan", "Mantra Meridian RERA floor plan", "Mantra Meridian sanctioned plan", "Mantra Meridian RERA layout",
      "Mantra Meridian vastu floor plan"
    ]
  },
  11: {
    id: 11,
    name: "Master Plan Keywords",
    category: "Masterplan",
    pillarId: 1,
    intent: "Informational",
    canonicalTarget: "/masterplan/",
    schemaEntityType: "Place",
    seoAnchorText: "Mantra Meridian 8-Acre Masterplan",
    editorialSummary: "Comprehensive 8-acre estate zoning, riparian nature buffers, vehicular drop-offs, and open space distribution.",
    keywords: [
      "Mantra Meridian master plan", "Mantra Meridian masterplan", "Mantra Meridian Balewadi master plan", "Mantra Meridian Riverside master plan",
      "Mantra Meridian site plan", "Mantra Meridian project layout", "Mantra Meridian 8 acre master plan", "Mantra Meridian 8 acre project",
      "Mantra Meridian development plan", "Mantra Meridian landscape plan", "Mantra Meridian riverfront master plan", "Mantra Meridian amenity plan",
      "Mantra Meridian tower layout", "Mantra Meridian road plan", "Mantra Meridian garden plan", "Mantra Meridian river view plan"
    ]
  },
  12: {
    id: 12,
    name: "Riverfront / Mula River Core SEO Cluster",
    category: "Riverfront Sanctuary",
    pillarId: 3,
    intent: "Commercial",
    canonicalTarget: "/mantra-meridian-riverside/riverside/",
    schemaEntityType: "Place",
    seoAnchorText: "Mula Riverfront Apartments Pune",
    editorialSummary: "Direct Mula River frontage with a dedicated 500-meter riverside promenade and unobstructed riparian nature views.",
    keywords: [
      "Mantra Meridian riverfront", "Mantra Meridian riverside", "Mantra Meridian Mula River", "Mantra Meridian Mula riverfront",
      "Mantra Meridian river view", "Mantra Meridian river facing", "Mantra Meridian river facing apartments", "Mantra Meridian river facing flats",
      "Mantra Meridian river facing homes", "Mantra Meridian river view apartments", "Mantra Meridian river view flats", "Mantra Meridian river view homes",
      "Mantra Meridian riverside apartments", "Mantra Meridian riverside homes", "Mantra Meridian waterfront apartments", "Mantra Meridian waterfront homes",
      "Mantra Meridian waterfront residences", "Mantra Meridian riverfront residences", "Mantra Meridian riverfront lifestyle", "Mantra Meridian Mula River views",
      "Mula River apartments Pune", "Mula River homes Pune", "Mula River property Pune", "riverfront apartments Balewadi",
      "riverside apartments Balewadi", "river view flats Balewadi", "riverfront homes Pune", "riverside homes Pune",
      "riverfront property West Pune", "river view property Pune"
    ]
  },
  13: {
    id: 13,
    name: "Riverfront Lifestyle Cluster",
    category: "Riverfront Sanctuary",
    pillarId: 3,
    intent: "Informational",
    canonicalTarget: "/mantra-meridian-riverside/riverside/",
    schemaEntityType: "Place",
    seoAnchorText: "Riverfront Luxury Living Balewadi",
    editorialSummary: "Biophilic architectural living alongside perennial natural waters with microclimate cooling benefits.",
    keywords: [
      "riverside lifestyle Balewadi", "riverfront lifestyle Pune", "waterfront lifestyle Pune", "riverside luxury living",
      "riverfront luxury living", "luxury riverside apartments Pune", "luxury riverfront apartments Pune", "river view luxury homes Pune",
      "homes beside Mula River", "apartments beside Mula River", "living beside Mula River", "nature living Balewadi",
      "nature inspired homes Balewadi", "biophilic apartments Pune", "biophilic architecture Pune", "riverfront gated community Pune",
      "riverfront luxury residences Pune"
    ]
  },
  14: {
    id: 14,
    name: "Balewadi Core Market Keywords",
    category: "Micro-Market Authority",
    pillarId: 4,
    intent: "Commercial",
    canonicalTarget: "/balewadi/",
    schemaEntityType: "Place",
    seoAnchorText: "Property in Balewadi Pune",
    editorialSummary: "Complete real estate intelligence and luxury residential benchmarks across the Balewadi micro-market.",
    keywords: [
      "property in Balewadi", "flats in Balewadi", "apartments in Balewadi", "homes in Balewadi", "residential projects Balewadi",
      "new projects Balewadi", "new launch projects Balewadi", "upcoming projects Balewadi", "luxury projects Balewadi",
      "premium projects Balewadi", "luxury apartments Balewadi", "premium apartments Balewadi", "high rise apartments Balewadi",
      "gated community Balewadi", "2 BHK Balewadi", "3 BHK Balewadi", "4 BHK Balewadi", "2 BHK flats Balewadi",
      "3 BHK flats Balewadi", "4 BHK flats Balewadi", "luxury 2 BHK Balewadi", "luxury 3 BHK Balewadi", "luxury 4 BHK Balewadi",
      "premium residences Balewadi", "riverfront projects Balewadi", "Mula River projects Balewadi"
    ]
  },
  15: {
    id: 15,
    name: "Balewadi High Street Cluster",
    category: "Lifestyle Destination",
    pillarId: 4,
    intent: "Commercial",
    canonicalTarget: "/location/",
    schemaEntityType: "Place",
    seoAnchorText: "Apartments Near Balewadi High Street",
    editorialSummary: "Situated just 3 minutes (1.2 km) from Pune's most celebrated gourmet dining and cosmopolitan shopping avenue.",
    keywords: [
      "Mantra Meridian near Balewadi High Street", "Mantra Meridian Balewadi High Street", "Mantra Meridian High Street", "Mantra Meridian near High Street",
      "flats near Balewadi High Street", "apartments near Balewadi High Street", "luxury apartments near Balewadi High Street", "property near Balewadi High Street",
      "residential projects near Balewadi High Street", "2 BHK near Balewadi High Street", "3 BHK near Balewadi High Street", "premium projects near Balewadi High Street",
      "Balewadi High Street property", "Balewadi High Street apartments"
    ]
  },
  16: {
    id: 16,
    name: "West Pune Ecosystem",
    category: "Macro-Market Authority",
    pillarId: 5,
    intent: "Commercial",
    canonicalTarget: "/west-pune/",
    schemaEntityType: "AdministrativeArea",
    seoAnchorText: "West Pune Luxury Real Estate",
    editorialSummary: "Strategic gateway connecting Balewadi, Baner, Mahalunge, Wakad, and Hinjewadi into a unified luxury residential belt.",
    keywords: [
      "Mantra Meridian West Pune", "Mantra Meridian West Pune property", "Mantra Meridian luxury West Pune", "West Pune real estate",
      "West Pune property", "West Pune residential projects", "West Pune new projects", "West Pune new launch",
      "West Pune upcoming projects", "West Pune luxury projects", "West Pune premium projects", "West Pune luxury apartments",
      "West Pune premium apartments", "West Pune 2 BHK", "West Pune 3 BHK", "West Pune 4 BHK", "luxury homes West Pune",
      "premium homes West Pune", "riverfront homes West Pune", "river view apartments West Pune", "gated communities West Pune"
    ]
  },
  17: {
    id: 17,
    name: "Baner Cluster",
    category: "Micro-Market Authority",
    pillarId: 5,
    intent: "Commercial",
    canonicalTarget: "/baner/",
    schemaEntityType: "Place",
    seoAnchorText: "Luxury Flats Near Baner Pune",
    editorialSummary: "Effortless 6-minute connection to Baner's commercial boulevard, retail centres, and Jupiter Hospital.",
    keywords: [
      "Mantra Meridian near Baner", "Mantra Meridian Baner", "Mantra Meridian Baner Balewadi", "Mantra Meridian Baner Road",
      "Mantra Meridian near Baner Road", "flats near Baner", "apartments near Baner", "luxury apartments Baner",
      "premium apartments Baner", "luxury projects Baner", "new projects Baner", "upcoming projects Baner",
      "2 BHK Baner", "3 BHK Baner", "4 BHK Baner", "Baner Balewadi property",
      "Baner Balewadi residential projects", "Baner Balewadi luxury projects"
    ]
  },
  18: {
    id: 18,
    name: "Mahalunge Cluster",
    category: "Micro-Market Authority",
    pillarId: 5,
    intent: "Commercial",
    canonicalTarget: "/mahalunge/",
    schemaEntityType: "Place",
    seoAnchorText: "Mahalunge Balewadi River Corridor",
    editorialSummary: "Immediate adjacency to the PMRDA Mahalunge Hi-Tech City and planned riverside transit corridors.",
    keywords: [
      "Mantra Meridian near Mahalunge", "Mantra Meridian Mahalunge", "Mantra Meridian Mahalunge Balewadi", "Mantra Meridian Mahalunge Hinjewadi",
      "property near Mahalunge", "flats near Mahalunge", "apartments near Mahalunge", "luxury apartments Mahalunge",
      "premium projects Mahalunge", "new projects Mahalunge", "upcoming projects Mahalunge", "2 BHK Mahalunge",
      "3 BHK Mahalunge", "4 BHK Mahalunge", "Mahalunge Balewadi property", "Mahalunge Baner property",
      "Mahalunge Hinjewadi property", "Mahalunge West Pune real estate", "residential projects Mahalunge"
    ]
  },
  19: {
    id: 19,
    name: "Hinjewadi / Hinjawadi Cluster",
    category: "Employment Hub",
    pillarId: 5,
    intent: "Commercial",
    canonicalTarget: "/hinjewadi/",
    schemaEntityType: "Place",
    seoAnchorText: "Luxury Homes Near Hinjewadi IT Park",
    editorialSummary: "Direct 14-minute transit corridor to Rajiv Gandhi Infotech Park Phase 1, 2, and 3 for IT leadership executives.",
    keywords: [
      "Mantra Meridian near Hinjewadi", "Mantra Meridian Hinjewadi", "Mantra Meridian Hinjawadi", "Mantra Meridian Hinjewadi IT Park",
      "Mantra Meridian Hinjewadi Phase 1", "Mantra Meridian Hinjewadi Phase 2", "Mantra Meridian Hinjewadi Phase 3", "Mantra Meridian Rajiv Gandhi Infotech Park",
      "flats near Hinjewadi", "apartments near Hinjewadi", "luxury apartments near Hinjewadi", "premium apartments near Hinjewadi",
      "homes near Hinjewadi IT Park", "residential projects near Hinjewadi", "2 BHK near Hinjewadi", "3 BHK near Hinjewadi",
      "property near Hinjewadi", "IT professionals property Pune", "Hinjewadi IT employees homes", "Hinjewadi investment property"
    ]
  },
  20: {
    id: 20,
    name: "Wakad Cluster",
    category: "Micro-Market Authority",
    pillarId: 5,
    intent: "Commercial",
    canonicalTarget: "/location/",
    schemaEntityType: "Place",
    seoAnchorText: "Property Near Wakad Pune",
    editorialSummary: "Direct river bridge connection linking Balewadi Village Road to Wakad's educational and commercial infrastructure.",
    keywords: [
      "Mantra Meridian near Wakad", "Mantra Meridian Wakad", "Mantra Meridian Wakad Pune", "Mantra Meridian Wakad connectivity",
      "flats near Wakad", "apartments near Wakad", "luxury apartments Wakad", "premium apartments Wakad",
      "new projects Wakad", "upcoming projects Wakad", "2 BHK Wakad", "3 BHK Wakad",
      "4 BHK Wakad", "property near Wakad", "residential projects near Wakad", "Balewadi Wakad property",
      "Balewadi Wakad residential projects"
    ]
  },
  21: {
    id: 21,
    name: "Balewadi–Wakad Connectivity",
    category: "Infrastructure Transit",
    pillarId: 6,
    intent: "Informational",
    canonicalTarget: "/location/",
    schemaEntityType: "Place",
    seoAnchorText: "Balewadi Wakad River Bridge Connectivity",
    editorialSummary: "Planned Balewadi-Wakad bridge reducing commute to Phoenix Mall of the Millennium and Hinjewadi to under 10 minutes.",
    keywords: [
      "Balewadi Wakad bridge", "Balewadi Wakad bridge project", "Balewadi Wakad connectivity", "Mantra Meridian Balewadi Wakad",
      "Mantra Meridian Wakad bridge", "Balewadi to Wakad", "Wakad to Balewadi", "Balewadi Wakad road",
      "Balewadi Wakad real estate", "property near Balewadi Wakad bridge", "residential projects near Balewadi Wakad bridge"
    ]
  },
  22: {
    id: 22,
    name: "Metro Keywords",
    category: "Infrastructure Transit",
    pillarId: 6,
    intent: "Informational",
    canonicalTarget: "/location/",
    schemaEntityType: "Place",
    seoAnchorText: "Properties Near Balewadi Metro Line 3",
    editorialSummary: "Located within 5 minutes of upcoming Balewadi Metro Station on the 23-km PMRDA Metro Line 3.",
    keywords: [
      "Mantra Meridian metro", "Mantra Meridian metro connectivity", "Mantra Meridian metro station", "Mantra Meridian Balewadi Metro",
      "Balewadi Metro", "Balewadi Metro station", "upcoming Balewadi Metro", "PMRDA Metro Line 3",
      "Metro Line 3 Balewadi", "Hinjewadi Shivajinagar Metro", "Pune Metro Line 3", "flats near Balewadi Metro",
      "apartments near Balewadi Metro", "residential projects near Balewadi Metro", "luxury projects near metro Pune"
    ]
  },
  23: {
    id: 23,
    name: "Highway Connectivity",
    category: "Infrastructure Transit",
    pillarId: 6,
    intent: "Informational",
    canonicalTarget: "/location/",
    schemaEntityType: "Place",
    seoAnchorText: "Mumbai Bangalore Highway NH48 Connectivity",
    editorialSummary: "Seamless 4-minute access to NH 48 (Mumbai-Bengaluru Highway) and the Mumbai-Pune Expressway bypass.",
    keywords: [
      "Mumbai Bengaluru Highway", "Mantra Meridian NH48", "Mantra Meridian NH 48", "Mantra Meridian Mumbai Bangalore Highway",
      "Mantra Meridian Mumbai Bengaluru Highway", "Mantra Meridian near NH48", "flats near NH48 Balewadi", "apartments near NH48 Pune",
      "luxury homes near NH48", "residential projects near NH48", "property near Mumbai Bangalore Highway Pune", "Mumbai Pune Expressway",
      "Mantra Meridian Mumbai Pune Expressway", "Mantra Meridian near Expressway", "Mantra Meridian Expressway connectivity",
      "apartments near Mumbai Pune Expressway", "flats near Mumbai Pune Expressway", "luxury homes near Mumbai Pune Expressway",
      "Balewadi Expressway connectivity", "property near Mumbai Pune Expressway"
    ]
  },
  24: {
    id: 24,
    name: "Airport / Railway Cluster",
    category: "Infrastructure Transit",
    pillarId: 6,
    intent: "Informational",
    canonicalTarget: "/location/",
    schemaEntityType: "Place",
    seoAnchorText: "Transit to Pune Airport & Railway Station",
    editorialSummary: "Optimized multi-modal transit routes to Pune International Airport (Lohegaon) and Pune Junction.",
    keywords: [
      "Mantra Meridian Pune Airport", "Mantra Meridian airport connectivity", "Mantra Meridian Pune International Airport",
      "Mantra Meridian railway station", "Mantra Meridian Pune Junction", "Mantra Meridian railway connectivity",
      "Balewadi airport connectivity", "Balewadi railway connectivity", "property near Pune Airport",
      "luxury homes near Pune Airport", "apartments near Pune Railway Station"
    ]
  },
  25: {
    id: 25,
    name: "Amenities Master Cluster",
    category: "Curated Lifestyle",
    pillarId: 7,
    intent: "Commercial",
    canonicalTarget: "/amenities/",
    schemaEntityType: "ApartmentComplex",
    seoAnchorText: "Mantra Meridian 30+ Luxury Amenities",
    editorialSummary: "Over 30 lifestyle amenities organized across 8 experiential chapters covering wellness, recreation, and sport.",
    keywords: [
      "Mantra Meridian amenities", "Mantra Meridian amenities list", "Mantra Meridian luxury amenities", "Mantra Meridian lifestyle amenities",
      "Mantra Meridian clubhouse", "Mantra Meridian clubhouse amenities", "Mantra Meridian swimming pool", "Mantra Meridian infinity pool",
      "Mantra Meridian gym", "Mantra Meridian fitness centre", "Mantra Meridian yoga", "Mantra Meridian meditation",
      "Mantra Meridian sports amenities", "Mantra Meridian kids play area", "Mantra Meridian gardens", "Mantra Meridian landscaped garden",
      "Mantra Meridian river promenade", "Mantra Meridian clubhouse Pune", "Mantra Meridian amenities Balewadi"
    ]
  },
  26: {
    id: 26,
    name: "Clubhouse Cluster",
    category: "Curated Lifestyle",
    pillarId: 7,
    intent: "Commercial",
    canonicalTarget: "/amenities/",
    schemaEntityType: "ApartmentComplex",
    seoAnchorText: "The Grand Pavilion 20,000 Sq Ft Clubhouse",
    editorialSummary: "Iconic 20,000 sq.ft. community centerpiece featuring private screening theatre, executive coworking, and ballroom.",
    keywords: [
      "Mantra Meridian clubhouse", "Mantra Meridian Grand Pavilion", "Mantra Meridian clubhouse Balewadi", "Mantra Meridian clubhouse Pune",
      "Mantra Meridian clubhouse amenities", "Mantra Meridian clubhouse photos", "Mantra Meridian clubhouse tour", "Mantra Meridian clubhouse walkthrough",
      "Mantra Meridian clubhouse interior", "Mantra Meridian clubhouse facilities", "Mantra Meridian luxury clubhouse", "Mantra Meridian premium clubhouse",
      "Mantra Meridian clubhouse swimming pool", "Mantra Meridian clubhouse gym", "Mantra Meridian clubhouse lounge"
    ]
  },
  27: {
    id: 27,
    name: "Swimming Pool / Wellness Cluster",
    category: "Curated Lifestyle",
    pillarId: 7,
    intent: "Commercial",
    canonicalTarget: "/amenities/",
    schemaEntityType: "ApartmentComplex",
    seoAnchorText: "Riverfront Infinity Lap Pool Balewadi",
    editorialSummary: "Temperature-controlled 25m riverside infinity lap pool with sunken aqua loungers and heated hydrotherapy jacuzzi.",
    keywords: [
      "Mantra Meridian swimming pool", "Mantra Meridian infinity pool", "Mantra Meridian riverfront infinity pool", "Mantra Meridian lap pool",
      "Mantra Meridian heated pool", "Mantra Meridian jacuzzi", "Mantra Meridian aqua lounge", "Mantra Meridian pool deck",
      "Mantra Meridian pool view", "Mantra Meridian wellness centre", "Mantra Meridian wellness amenities", "Mantra Meridian spa",
      "Mantra Meridian hydrotherapy", "Mantra Meridian yoga pavilion", "Mantra Meridian meditation lawn", "Mantra Meridian fitness studio"
    ]
  },
  28: {
    id: 28,
    name: "Fitness Keywords",
    category: "Curated Lifestyle",
    pillarId: 7,
    intent: "Commercial",
    canonicalTarget: "/amenities/",
    schemaEntityType: "ApartmentComplex",
    seoAnchorText: "Technogym High Performance Fitness Center",
    editorialSummary: "State-of-the-art cardiovascular and strength conditioning studio powered by Technogym equipment.",
    keywords: [
      "Mantra Meridian gym", "Mantra Meridian fitness centre", "Mantra Meridian fitness studio", "Mantra Meridian Technogym",
      "Mantra Meridian high performance gym", "Mantra Meridian yoga", "Mantra Meridian yoga pavilion", "Mantra Meridian meditation",
      "Mantra Meridian wellness", "Mantra Meridian wellness centre", "Mantra Meridian fitness amenities",
      "luxury apartments with gym Balewadi", "luxury apartments with wellness centre Pune"
    ]
  },
  29: {
    id: 29,
    name: "Nature / Biophilic Keywords",
    category: "Riparian Architecture",
    pillarId: 3,
    intent: "Informational",
    canonicalTarget: "/mantra-meridian-riverside/riverside/",
    schemaEntityType: "Place",
    seoAnchorText: "Biophilic Architecture & River Ecology",
    editorialSummary: "75%+ open landscaped greens, indigenous botanical groves, and riparian wetland conservation buffers.",
    keywords: [
      "Mantra Meridian biophilic architecture", "Mantra Meridian nature living", "Mantra Meridian green living", "Mantra Meridian river ecology",
      "Mantra Meridian riverside greenery", "Mantra Meridian landscape", "Mantra Meridian landscaped gardens", "Mantra Meridian green spaces",
      "Mantra Meridian natural views", "Mantra Meridian open spaces", "Mantra Meridian tree lined", "Mantra Meridian riparian landscape",
      "Mantra Meridian ecological landscape", "biophilic homes Pune", "nature homes Balewadi", "green homes West Pune"
    ]
  },
  30: {
    id: 30,
    name: "Architecture Keywords",
    category: "Design Language",
    pillarId: 1,
    intent: "Informational",
    canonicalTarget: "/explore/",
    schemaEntityType: "ApartmentComplex",
    seoAnchorText: "Modern Glass Facade Architecture Balewadi",
    editorialSummary: "Contemporary architectural towers featuring cantilevered wrap-around viewing decks and double-height volumes.",
    keywords: [
      "Mantra Meridian architecture", "Mantra Meridian architectural design", "Mantra Meridian luxury architecture", "Mantra Meridian modern architecture",
      "Mantra Meridian façade", "Mantra Meridian glass façade", "Mantra Meridian cantilever balcony", "Mantra Meridian sky deck",
      "Mantra Meridian riverfront architecture", "Mantra Meridian double height living", "Mantra Meridian panoramic living room",
      "Mantra Meridian large balconies", "Mantra Meridian premium interiors", "luxury architecture Pune", "modern apartments Balewadi"
    ]
  },
  31: {
    id: 31,
    name: "Lifestyle Keywords",
    category: "Curated Lifestyle",
    pillarId: 7,
    intent: "Informational",
    canonicalTarget: "/amenities/",
    schemaEntityType: "ApartmentComplex",
    seoAnchorText: "Waterfront Resort Living West Pune",
    editorialSummary: "Private concierge services, high-speed fiber connectivity, and hotel-inspired multi-tier hospitality.",
    keywords: [
      "Mantra Meridian luxury lifestyle", "Mantra Meridian premium lifestyle", "Mantra Meridian riverside lifestyle",
      "Mantra Meridian resort lifestyle", "Mantra Meridian wellness lifestyle", "Mantra Meridian family lifestyle",
      "Mantra Meridian urban luxury", "Mantra Meridian contemporary living", "Mantra Meridian nature lifestyle",
      "luxury lifestyle Balewadi", "luxury living West Pune", "premium lifestyle Pune", "riverfront lifestyle Pune"
    ]
  },
  32: {
    id: 32,
    name: "RERA Ecosystem",
    category: "Statutory & Legal",
    pillarId: 1,
    intent: "Navigational",
    canonicalTarget: "/rera/",
    schemaEntityType: "GovernmentPermit",
    seoAnchorText: "MahaRERA Registration P52100045688",
    editorialSummary: "Official statutory compliance verified under Maharashtra Real Estate Regulatory Authority certificate P52100045688.",
    keywords: [
      "Mantra Meridian RERA", "Mantra Meridian MahaRERA", "Mantra Meridian RERA number", "Mantra Meridian RERA registration",
      "Mantra Meridian MahaRERA number", "Mantra Meridian RERA certificate", "Mantra Meridian RERA status", "Mantra Meridian registered project",
      "Mantra Meridian RERA approved", "Mantra Meridian sanctioned plans", "P52100045688", "P52100045688 Mantra Meridian",
      "Mantra Meridian RERA details", "Mantra Meridian legal details", "Mantra Meridian project registration"
    ]
  },
  33: {
    id: 33,
    name: "Possession Keywords",
    category: "Statutory & Legal",
    pillarId: 1,
    intent: "Informational",
    canonicalTarget: "/rera/",
    schemaEntityType: "GovernmentPermit",
    seoAnchorText: "Mantra Meridian Possession Date June 2028",
    editorialSummary: "Verified MahaRERA completion schedule targeting handover by June 2028 as filed with regulatory authorities.",
    keywords: [
      "Mantra Meridian possession", "Mantra Meridian possession date", "Mantra Meridian expected possession", "Mantra Meridian possession 2028",
      "Mantra Meridian June 2028", "Mantra Meridian handover date", "Mantra Meridian completion date", "Mantra Meridian construction timeline",
      "Mantra Meridian project completion", "Mantra Meridian possession status"
    ]
  },
  34: {
    id: 34,
    name: "Construction Status Cluster",
    category: "Project Progress",
    pillarId: 1,
    intent: "Informational",
    canonicalTarget: "/construction-status/",
    schemaEntityType: "Project",
    seoAnchorText: "Mantra Meridian Construction Status 2026",
    editorialSummary: "Monthly photographic and video engineering updates documenting podium, foundation, and structural progress.",
    keywords: [
      "Mantra Meridian construction status", "Mantra Meridian construction update", "Mantra Meridian latest construction update",
      "Mantra Meridian construction progress", "Mantra Meridian site progress", "Mantra Meridian construction photos",
      "Mantra Meridian construction video", "Mantra Meridian tower construction", "Mantra Meridian building progress",
      "Mantra Meridian latest update", "Mantra Meridian project status", "Mantra Meridian under construction",
      "Mantra Meridian construction 2026", "Mantra Meridian construction 2027", "Mantra Meridian construction 2028"
    ]
  },
  35: {
    id: 35,
    name: "Price / Cost Sheet Ecosystem",
    category: "Commercial Intent",
    pillarId: 1,
    intent: "Transactional",
    canonicalTarget: "/price/",
    schemaEntityType: "PriceSpecification",
    seoAnchorText: "Mantra Meridian All Inclusive Cost Sheet",
    editorialSummary: "Itemized cost breakdown including agreement value, stamp duty, GST, maintenance, and home loan financing.",
    keywords: [
      "Mantra Meridian price list", "Mantra Meridian cost sheet", "Mantra Meridian cost calculator", "Mantra Meridian total cost",
      "Mantra Meridian all inclusive price", "Mantra Meridian base price", "Mantra Meridian agreement value", "Mantra Meridian GST",
      "Mantra Meridian stamp duty", "Mantra Meridian registration charges", "Mantra Meridian maintenance charges",
      "Mantra Meridian floor rise", "Mantra Meridian parking charges", "Mantra Meridian other charges", "Mantra Meridian payment plan",
      "Mantra Meridian construction linked plan", "Mantra Meridian EMI", "Mantra Meridian home loan", "Mantra Meridian bank finance"
    ]
  },
  36: {
    id: 36,
    name: "Investment Research Keywords",
    category: "Market Analysis",
    pillarId: 8,
    intent: "Informational",
    canonicalTarget: "/pune-real-estate/",
    schemaEntityType: "Article",
    seoAnchorText: "Mantra Meridian Balewadi Investment Analysis",
    editorialSummary: "Objective real estate research examining capital growth drivers, rental yields, and infrastructure appreciation in West Pune.",
    keywords: [
      "Mantra Meridian investment", "Mantra Meridian property investment", "Mantra Meridian investment analysis",
      "Mantra Meridian investment potential", "Mantra Meridian rental investment", "Mantra Meridian rental demand",
      "Mantra Meridian resale", "Mantra Meridian resale value", "Mantra Meridian capital appreciation", "Mantra Meridian ROI",
      "Mantra Meridian rental yield", "Mantra Meridian investment review", "Balewadi property investment",
      "Balewadi real estate investment", "West Pune property investment", "riverfront property investment Pune",
      "luxury property investment Pune", "Hinjewadi investment property", "Baner Balewadi investment"
    ]
  },
  37: {
    id: 37,
    name: "Rental Ecosystem",
    category: "Market Analysis",
    pillarId: 8,
    intent: "Commercial",
    canonicalTarget: "/pune-real-estate/",
    schemaEntityType: "RealEstateListing",
    seoAnchorText: "Balewadi Rental Yield & Tech Corridor Leasing",
    editorialSummary: "Premium executive tenant demand driven by Hinjewadi tech parks, Balewadi commercial offices, and multinational firms.",
    keywords: [
      "Mantra Meridian rent", "Mantra Meridian rental", "Mantra Meridian rental property", "Mantra Meridian rental flats",
      "Mantra Meridian 2 BHK rent", "Mantra Meridian 3 BHK rent", "Mantra Meridian 4 BHK rent", "Mantra Meridian rental yield",
      "Balewadi rental property", "Balewadi 2 BHK rent", "Balewadi 3 BHK rent", "luxury flats for rent Balewadi",
      "flats for rent near Hinjewadi", "premium rental homes West Pune"
    ]
  },
  38: {
    id: 38,
    name: "Buyer-Intent Keywords",
    category: "Direct Conversion",
    pillarId: 1,
    intent: "Transactional",
    canonicalTarget: "/explore/",
    schemaEntityType: "RealEstateAgent",
    seoAnchorText: "Book Mantra Meridian Balewadi Site Visit",
    editorialSummary: "Priority buyer concierge for booking private presentations, inspecting sample residences, and reviewing sanctioned plans.",
    keywords: [
      "buy Mantra Meridian", "buy Mantra Meridian Balewadi", "buy Mantra Meridian Riverside", "Mantra Meridian for sale",
      "Mantra Meridian flats for sale", "Mantra Meridian apartments for sale", "Mantra Meridian homes for sale",
      "Mantra Meridian 2 BHK for sale", "Mantra Meridian 3 BHK for sale", "Mantra Meridian 4 BHK for sale",
      "Mantra Meridian duplex for sale", "Mantra Meridian penthouse for sale", "Mantra Meridian direct booking",
      "Mantra Meridian booking", "Mantra Meridian site visit", "Mantra Meridian sample flat", "Mantra Meridian sales office",
      "Mantra Meridian enquiry", "Mantra Meridian contact"
    ]
  },
  39: {
    id: 39,
    name: "Review Keywords",
    category: "Credibility & Feedback",
    pillarId: 8,
    intent: "Informational",
    canonicalTarget: "/compare/",
    schemaEntityType: "Review",
    seoAnchorText: "Mantra Meridian Verified Buyer Reviews",
    editorialSummary: "Unbiased customer testimonials, architectural reviews, and pros-and-cons analysis for prospective homeowners.",
    keywords: [
      "Mantra Meridian review", "Mantra Meridian reviews", "Mantra Meridian Balewadi review", "Mantra Meridian Riverside review",
      "Mantra Meridian Pune review", "Mantra Meridian project review", "Mantra Meridian honest review", "Mantra Meridian buyer review",
      "Mantra Meridian customer review", "Mantra Meridian developer review", "Mantra Meridian location review",
      "Mantra Meridian amenities review", "Mantra Meridian construction review", "Mantra Meridian 2 BHK review",
      "Mantra Meridian 3 BHK review", "Mantra Meridian 4 BHK review", "Mantra Meridian pros and cons", "Mantra Meridian project analysis"
    ]
  },
  40: {
    id: 40,
    name: "Location + Nearby Landmark Keywords",
    category: "Civic Infrastructure",
    pillarId: 4,
    intent: "Navigational",
    canonicalTarget: "/location/",
    schemaEntityType: "GeoCoordinates",
    seoAnchorText: "Mantra Meridian Balewadi Location Coordinates",
    editorialSummary: "Exact geospatial placement on Balewadi Village Road (18.5848° N, 73.7751° E) beside the Mula River corridor.",
    keywords: [
      "Mantra Meridian location", "Mantra Meridian address", "Mantra Meridian map", "Mantra Meridian Google Maps",
      "Mantra Meridian Balewadi location", "Mantra Meridian nearby", "places near Mantra Meridian", "schools near Mantra Meridian",
      "hospitals near Mantra Meridian", "malls near Mantra Meridian", "restaurants near Mantra Meridian", "offices near Mantra Meridian",
      "IT parks near Mantra Meridian", "Balewadi High Street near Mantra Meridian", "Baner near Mantra Meridian",
      "Hinjewadi near Mantra Meridian", "Mahalunge near Mantra Meridian", "Wakad near Mantra Meridian"
    ]
  },
  41: {
    id: 41,
    name: "School / Education Cluster",
    category: "Civic Infrastructure",
    pillarId: 4,
    intent: "Informational",
    canonicalTarget: "/location/",
    schemaEntityType: "EducationalOrganization",
    seoAnchorText: "Top Schools Near Balewadi & Mantra Meridian",
    editorialSummary: "Minutes from reputed educational institutions including Global Indian International School (GIIS) and MITCON Institute.",
    keywords: [
      "schools near Mantra Meridian", "schools near Mantra Meridian Balewadi", "schools near Balewadi", "international schools Balewadi",
      "schools near Baner Balewadi Road", "schools near Mahalunge", "schools near Hinjewadi", "GIIS Balewadi",
      "Global Indian International School Balewadi", "MITCON Institute of Management", "schools near riverfront apartments Balewadi",
      "best schools near Balewadi property"
    ]
  },
  42: {
    id: 42,
    name: "Hospital / Healthcare Cluster",
    category: "Civic Infrastructure",
    pillarId: 4,
    intent: "Informational",
    canonicalTarget: "/location/",
    schemaEntityType: "Hospital",
    seoAnchorText: "Multi-Specialty Hospitals Near Balewadi",
    editorialSummary: "Rapid emergency access to Jupiter Super Specialty Hospital, Surya Mother & Child Hospital, and Apollo Clinic.",
    keywords: [
      "hospitals near Mantra Meridian", "hospitals near Mantra Meridian Balewadi", "hospitals near Balewadi", "hospitals near Baner",
      "hospitals near Mahalunge", "hospitals near Hinjewadi", "Jupiter Hospital near Balewadi", "Surya Hospital near Balewadi",
      "healthcare near Mantra Meridian", "emergency hospitals near Balewadi", "multispeciality hospitals Balewadi"
    ]
  },
  43: {
    id: 43,
    name: "Mall / Entertainment Cluster",
    category: "Civic Infrastructure",
    pillarId: 4,
    intent: "Informational",
    canonicalTarget: "/location/",
    schemaEntityType: "ShoppingCenter",
    seoAnchorText: "Malls & Dining Near Balewadi High Street",
    editorialSummary: "Minutes from Phoenix Mall of the Millennium, Westend Mall Aundh, and Balewadi High Street gourmet hubs.",
    keywords: [
      "malls near Mantra Meridian", "malls near Balewadi", "Westend Mall near Balewadi", "Phoenix Mall of the Millennium",
      "Balewadi High Street restaurants", "restaurants near Mantra Meridian", "cafes near Mantra Meridian", "nightlife Balewadi",
      "entertainment near Balewadi", "shopping near Balewadi", "lifestyle destinations Balewadi"
    ]
  },
  44: {
    id: 44,
    name: "IT / Employment Cluster",
    category: "Employment Hub",
    pillarId: 5,
    intent: "Commercial",
    canonicalTarget: "/hinjewadi/",
    schemaEntityType: "BusinessPark",
    seoAnchorText: "Corporate IT Parks Near Balewadi",
    editorialSummary: "Close proximity to Cummins India, Infosys, Wipro, TCS, and EON IT Park Hinjewadi Phase 1, 2, and 3.",
    keywords: [
      "Mantra Meridian near IT Park", "Mantra Meridian near Hinjewadi IT Park", "Mantra Meridian near Infosys",
      "Mantra Meridian near Rajiv Gandhi Infotech Park", "Mantra Meridian near Cummins", "Mantra Meridian near EON IT Park",
      "Balewadi IT corridor", "Hinjewadi IT corridor property", "Baner Balewadi IT corridor", "IT professionals property Balewadi",
      "IT employee homes Pune", "residential projects near IT parks Pune"
    ]
  },
  45: {
    id: 45,
    name: "NRI Keywords",
    category: "Global Investment",
    pillarId: 8,
    intent: "Transactional",
    canonicalTarget: "/nri-desk/",
    schemaEntityType: "RealEstateAgent",
    seoAnchorText: "NRI Real Estate Investment Desk Pune",
    editorialSummary: "Dedicated NRI advisory desk offering seamless FEMA-compliant transactions, virtual video walkthroughs, and rental management.",
    keywords: [
      "Mantra Meridian NRI investment", "Mantra Meridian NRI property", "Mantra Meridian NRI buying", "Mantra Meridian NRI home Pune",
      "Mantra Meridian luxury property NRI", "Mantra Meridian Dubai NRI", "Mantra Meridian overseas buyer", "luxury homes Pune NRI",
      "Balewadi property for NRI", "West Pune property for NRI", "riverfront property Pune NRI"
    ]
  },
  46: {
    id: 46,
    name: "Hindi / Hinglish Keywords",
    category: "Conversational & Voice Search",
    pillarId: 1,
    intent: "Informational",
    canonicalTarget: "/explore/",
    schemaEntityType: "FAQPage",
    seoAnchorText: "Mantra Meridian Balewadi Hindi Information",
    editorialSummary: "Natural conversational query handling matching bilingual spoken voice search across Google and YouTube.",
    keywords: [
      "Mantra Meridian Balewadi kaisa hai", "Mantra Meridian project kaisa hai", "Mantra Meridian price kya hai",
      "Mantra Meridian 2 BHK price", "Mantra Meridian 3 BHK price", "Mantra Meridian 4 BHK price", "Mantra Meridian kaha hai",
      "Mantra Meridian location", "Mantra Meridian Balewadi location", "Mantra Meridian riverfront project",
      "Mantra Meridian project review", "Mantra Meridian booking kaise kare", "Mantra Meridian RERA number",
      "Mantra Meridian possession kab hai", "Mantra Meridian amenities kya hai", "Mantra Meridian floor plan",
      "Mantra Meridian investment kaisa hai", "Mantra Meridian site visit", "Mantra Meridian sample flat", "Mantra Meridian latest update"
    ]
  },
  47: {
    id: 47,
    name: "YouTube / Pune Property Vlog Cluster",
    category: "Video & Media",
    pillarId: 1,
    intent: "Informational",
    canonicalTarget: "/gallery/",
    schemaEntityType: "VideoObject",
    seoAnchorText: "Mantra Meridian YouTube Walkthrough Video",
    editorialSummary: "Comprehensive 4K drone tours, sample flat walkthroughs, and project video analysis by PunePropertyVlog.",
    keywords: [
      "Mantra Meridian Balewadi", "Mantra Meridian Riverside Balewadi", "Mantra Meridian full project tour",
      "Mantra Meridian site visit", "Mantra Meridian property tour", "Mantra Meridian walkthrough",
      "Mantra Meridian 2 BHK walkthrough", "Mantra Meridian 3 BHK walkthrough", "Mantra Meridian 4 BHK walkthrough",
      "Mantra Meridian duplex walkthrough", "Mantra Meridian sample flat", "Mantra Meridian amenities tour",
      "Mantra Meridian clubhouse tour", "Mantra Meridian riverfront tour", "Mantra Meridian floor plan explained",
      "Mantra Meridian master plan explained", "Mantra Meridian location explained", "Mantra Meridian price explained",
      "Mantra Meridian RERA explained", "Mantra Meridian construction update", "Mantra Meridian possession update",
      "Mantra Meridian review", "Mantra Meridian investment analysis", "Mantra Meridian vs Baner projects",
      "Mantra Meridian vs Balewadi projects", "Mantra Meridian vs Mahalunge projects", "Mantra Meridian vs Hinjewadi projects"
    ]
  },
  48: {
    id: 48,
    name: "Comparison Keyword Ecosystem",
    category: "Comparative Research",
    pillarId: 8,
    intent: "Commercial",
    canonicalTarget: "/compare/",
    schemaEntityType: "ItemPage",
    seoAnchorText: "Mantra Meridian Project Comparison Matrix",
    editorialSummary: "Objective comparative assessment across carpet area, price, land parcel, riverfront frontage, and MahaRERA filings.",
    keywords: [
      "Mantra Meridian vs VTP", "Mantra Meridian vs VTP Bellissimo", "Mantra Meridian vs Lodha Altero", "Mantra Meridian vs Saheel Luxton",
      "Mantra Meridian vs Supreme Rivana", "Mantra Meridian vs Godrej projects", "Mantra Meridian vs Mahindra Lifespaces",
      "Mantra Meridian vs Kolte Patil projects", "Mantra Meridian vs Shapoorji Pallonji projects", "Mantra Meridian vs Baner projects",
      "Mantra Meridian vs Balewadi projects", "Mantra Meridian vs Mahalunge projects", "Mantra Meridian vs Hinjewadi projects",
      "Mantra Meridian vs Wakad projects"
    ]
  },
  49: {
    id: 49,
    name: "Best / Top Searches — Market Research Content",
    category: "Market Research",
    pillarId: 8,
    intent: "Informational",
    canonicalTarget: "/pune-real-estate/",
    schemaEntityType: "Article",
    seoAnchorText: "Top Luxury Riverfront Projects in Pune",
    editorialSummary: "In-depth market research surveying premium riverfront gated developments and luxury high-rises across West Pune.",
    keywords: [
      "luxury projects in Balewadi", "premium projects in Balewadi", "best 2 BHK projects Balewadi", "best 3 BHK projects Balewadi",
      "luxury riverfront projects Pune", "riverfront apartments Pune", "riverfront projects West Pune", "luxury projects West Pune",
      "premium projects West Pune", "luxury apartments near Hinjewadi", "luxury apartments near Baner", "luxury apartments near Mahalunge",
      "premium apartments near Balewadi High Street", "luxury projects near Balewadi High Street"
    ]
  },
  50: {
    id: 50,
    name: "Market-Level Keywords",
    category: "Market Research",
    pillarId: 8,
    intent: "Informational",
    canonicalTarget: "/pune-real-estate/",
    schemaEntityType: "Article",
    seoAnchorText: "Balewadi Real Estate Price Trends 2026",
    editorialSummary: "Historical price index, capital appreciation trajectory, and micro-market forecasts for West Pune residential property.",
    keywords: [
      "Balewadi real estate market", "Balewadi property market", "Balewadi property prices", "Balewadi property price trends",
      "Balewadi real estate trends", "Balewadi residential market", "Balewadi luxury real estate", "Balewadi premium real estate",
      "West Pune real estate market", "West Pune property prices", "West Pune property trends", "West Pune residential market",
      "Baner Balewadi real estate", "Baner Balewadi property prices", "Balewadi Mahalunge real estate", "Mahalunge Balewadi property market",
      "Hinjewadi Balewadi property market", "Wakad Balewadi real estate"
    ]
  },
  51: {
    id: 51,
    name: "Location-Corridor Content Clusters",
    category: "Corridor Architecture",
    pillarId: 5,
    intent: "Informational",
    canonicalTarget: "/location/",
    schemaEntityType: "Place",
    seoAnchorText: "Balewadi to Hinjewadi Tech Corridor",
    editorialSummary: "Independent search corridor connecting Balewadi Real Estate → Balewadi High Street → Baner → Mahalunge → Hinjewadi → Wakad.",
    keywords: [
      "Balewadi to Baner corridor", "Balewadi High Street to Hinjewadi corridor", "Mahalunge Balewadi bridge connection",
      "Wakad Balewadi river corridor", "West Pune luxury arterial corridor", "Mula riverfront development corridor",
      "Baner Balewadi expressway access", "Balewadi metro transit corridor"
    ]
  },
  52: {
    id: 52,
    name: "Recommended Pillar Pages for PunePropertyVlog",
    category: "Site Architecture",
    pillarId: 1,
    intent: "Navigational",
    canonicalTarget: "/",
    schemaEntityType: "SiteNavigationElement",
    seoAnchorText: "Topical SEO Pillar Architecture",
    editorialSummary: "Complete topical pillar page architecture ensuring clean PageRank distribution and zero orphan pages.",
    keywords: [
      "/mantra-meridian-balewadi/", "/mantra-meridian-price/", "/mantra-meridian-floor-plan/", "/mantra-meridian-master-plan/",
      "/mantra-meridian-amenities/", "/mantra-meridian-location/", "/mantra-meridian-riverfront/", "/mantra-meridian-rera/",
      "/mantra-meridian-possession/", "/mantra-meridian-construction-status/", "/mantra-meridian-brochure/", "/mantra-meridian-reviews/",
      "/mantra-meridian-2-bhk/", "/mantra-meridian-3-bhk/", "/mantra-meridian-3-bhk-duplex/", "/mantra-meridian-4-bhk/",
      "/mantra-meridian-penthouse/", "/mantra-meridian-price-list/", "/mantra-meridian-cost-sheet/", "/mantra-meridian-payment-plan/",
      "/mantra-meridian-carpet-area/", "/mantra-properties-pune/", "/mantra-properties-projects/", "/mantra-riverside-balewadi/",
      "/mantra-riverside-pune/", "/riverfront-projects-pune/", "/riverfront-projects-west-pune/", "/balewadi-real-estate/",
      "/balewadi-new-projects/", "/balewadi-luxury-projects/", "/balewadi-premium-projects/", "/baner-balewadi-property/",
      "/mahalunge-balewadi-property/", "/hinjewadi-balewadi-property/", "/wakad-balewadi-property/", "/west-pune-real-estate/",
      "/west-pune-luxury-projects/", "/west-pune-new-projects/"
    ]
  },
  53: {
    id: 53,
    name: "8 Major Topical Pillars",
    category: "Topical Strategy",
    pillarId: 1,
    intent: "Informational",
    canonicalTarget: "/",
    schemaEntityType: "ItemList",
    seoAnchorText: "8 Strategic Topical Pillars",
    editorialSummary: "The core eight conceptual pillars anchoring the entirety of the project's semantic authority on search engines.",
    keywords: [
      "PILLAR 1: Project (Mantra Meridian → Price → Floor Plan → RERA → Possession → Construction)",
      "PILLAR 2: Configuration (2 BHK → 3 BHK → 3 BHK Duplex → 4 BHK → Penthouse)",
      "PILLAR 3: Riverfront (Mula River → Riverside → River View → Waterfront → Riverfront Lifestyle)",
      "PILLAR 4: Balewadi (Balewadi → Balewadi High Street → Balewadi Real Estate → Luxury Projects)",
      "PILLAR 5: West Pune (Baner → Balewadi → Mahalunge → Hinjewadi → Wakad)",
      "PILLAR 6: Connectivity (NH48 → Mumbai-Pune Expressway → Metro → Balewadi-Wakad → Hinjewadi IT Park)",
      "PILLAR 7: Lifestyle (Clubhouse → Infinity Pool → Fitness → Wellness → River Promenade → Landscape)",
      "PILLAR 8: Market Research (Balewadi Property Market → West Pune Market → Project Comparisons → Investment Research)"
    ]
  },
  54: {
    id: 54,
    name: "Core Keyword Knowledge Graph Map",
    category: "Entity Schema",
    pillarId: 1,
    intent: "Navigational",
    canonicalTarget: "/",
    schemaEntityType: "Thing",
    seoAnchorText: "Knowledge Graph Entity Architecture",
    editorialSummary: "Graph structure connecting Mantra Properties → Mantra Meridian → Balewadi → Mula River → Typologies → West Pune.",
    keywords: [
      "Mantra Properties Entity", "Mantra Meridian Entity", "Mantra Meridian Balewadi Entity",
      "2 BHK Residential Entity", "3 BHK Residential Entity", "3 BHK Duplex Architectural Entity", "4 BHK Estate Entity", "Penthouse Sky Villa Entity",
      "Mula River Geographic Entity", "Amenities & Grand Pavilion Entity",
      "Balewadi Micro-Market Entity", "Baner Geographic Entity", "Mahalunge Geographic Entity", "Wakad Geographic Entity", "Hinjewadi IT Corridor Entity",
      "West Pune Macro-Market Entity", "Pune Real Estate Authority Entity"
    ]
  }
};

export const ALL_54_CLUSTERS_ARRAY: TopicalClusterDefinition[] = Object.values(TOPICAL_CLUSTERS_54);

// =============================================================================
// 8 CORE TOPICAL PILLARS (Topical Authority Architecture)
// =============================================================================
export const EIGHT_CORE_PILLARS = [
  {
    id: 1,
    name: "PROJECT AUTHORITY",
    coreClusterIds: [1, 2, 3, 32, 33, 34, 35, 38],
    anchorKeywords: ["Mantra Meridian", "Price", "Floor Plan", "RERA P52100045688", "June 2028 Possession", "Construction Status"],
    canonicalPath: "/"
  },
  {
    id: 2,
    name: "RESIDENTIAL CONFIGURATION",
    coreClusterIds: [4, 5, 6, 7, 8, 9, 10],
    anchorKeywords: ["2 BHK 815 sq ft", "3 BHK 1180 sq ft", "3 BHK Sky Duplex 1660 sq ft", "4 BHK 2050 sq ft", "Penthouses"],
    canonicalPath: "/residences/"
  },
  {
    id: 3,
    name: "MULA RIVERFRONT SANCTUARY",
    coreClusterIds: [12, 13, 29],
    anchorKeywords: ["Mula River", "Riverside Promenade", "River Facing Flats Balewadi", "Biophilic Architecture", "75% Open Space"],
    canonicalPath: "/mantra-meridian-riverside/riverside/"
  },
  {
    id: 4,
    name: "BALEWADI CIVIC & HIGH STREET",
    coreClusterIds: [14, 15, 40, 41, 42, 43],
    anchorKeywords: ["Balewadi Real Estate", "Balewadi High Street", "GIIS Balewadi", "Jupiter Hospital", "Balewadi Village Road"],
    canonicalPath: "/balewadi/"
  },
  {
    id: 5,
    name: "WEST PUNE REGIONAL CORRIDOR",
    coreClusterIds: [16, 17, 18, 19, 20, 44, 51],
    anchorKeywords: ["Baner", "Balewadi", "Mahalunge", "Hinjewadi IT Park", "Wakad", "West Pune Luxury Projects"],
    canonicalPath: "/west-pune/"
  },
  {
    id: 6,
    name: "MULTI-MODAL TRANSIT CONNECTIVITY",
    coreClusterIds: [21, 22, 23, 24],
    anchorKeywords: ["NH48 Highway", "Mumbai Pune Expressway", "PMRDA Metro Line 3", "Balewadi Wakad Bridge", "Pune Airport Transit"],
    canonicalPath: "/location/"
  },
  {
    id: 7,
    name: "CURATED LIFESTYLE & AMENITIES",
    coreClusterIds: [25, 26, 27, 28, 30, 31],
    anchorKeywords: ["The Grand Pavilion 20000 sq ft", "Infinity Lap Pool", "Technogym Studio", "Double Height Living", "Resort Lifestyle"],
    canonicalPath: "/amenities/"
  },
  {
    id: 8,
    name: "MARKET RESEARCH & INVESTOR INTELLIGENCE",
    coreClusterIds: [36, 37, 39, 45, 46, 47, 48, 49, 50],
    anchorKeywords: ["Balewadi Price Trends", "Rental Yield", "Project Comparison", "NRI Investment", "PunePropertyVlog Tour"],
    canonicalPath: "/pune-real-estate/"
  }
] as const;

// Master Keyword Ecosystem Object
export const meridianKeywordEcosystem = {
  brandKeywords: brandPermutations,
  configurationKeywords: typologyPermutations,
  commercialKeywords: pricingPermutations,
  locationKeywords: locationPermutations,
  lifestyleKeywords: [
    "8 acre luxury project in Balewadi",
    "Mantra Meridian 8 acre masterplan",
    "Riverside boardwalk apartments Pune",
    "Temperature controlled infinity pool Balewadi",
    "The Grand Pavilion clubhouse 20000 sq ft",
    "Double height 20ft ceiling living apartments Pune",
    "Zero dead corridor homes Pune",
    "Gated luxury community Balewadi",
    "75 percent open space project Balewadi",
    "Tennis court pickleball court society Balewadi",
    "Dolby Atmos private cinema society Balewadi"
  ],
  statutoryKeywords: statutoryPermutations,
  comparativeKeywords: [...reputationPermutations, ...comparativeProjectKeywords],
  hinjewadiKeywords: hinjewadiKeywords,
  banerKeywords: banerKeywords,
  mahalungeKeywords: mahalungeKeywords,
  duplexKeywords: duplexPenthouseKeywords,
  investmentKeywords: [
    ...puneRealEstateMacroKeywords,
    "NRI property investment in Pune Balewadi",
    "Rental yield Balewadi High Street tech corridor",
    "Capital appreciation West Pune property 2026 to 2030",
    "Pre launch luxury apartments Balewadi Pune",
    "High return real estate investment Pune"
  ],
  clusters54: TOPICAL_CLUSTERS_54
};

// All combined search permutations
export const allSearchPermutations: string[] = [
  ...brandPermutations,
  ...typologyPermutations,
  ...pricingPermutations,
  ...locationPermutations,
  ...collateralPermutations,
  ...statutoryPermutations,
  ...contactPermutations,
  ...reputationPermutations,
  ...hinjewadiKeywords,
  ...banerKeywords,
  ...mahalungeKeywords,
  ...duplexPenthouseKeywords,
  ...comparativeProjectKeywords,
  ...puneRealEstateMacroKeywords
];

// Curated default meta keywords string for general pages
export const defaultMetaKeywords = [
  ...brandPermutations.slice(0, 10),
  ...typologyPermutations.slice(0, 6),
  ...pricingPermutations.slice(0, 4),
  ...locationPermutations.slice(0, 4),
  "MahaRERA P52100045688",
  "Mantra Properties Pune"
].join(", ");

export function getConfigurationKeywords(configSlug: string, configName: string): string {
  const base = [
    `${configName} Mantra Meridian Riverside Balewadi`,
    `Mantra Meridian ${configSlug.toUpperCase()} price`,
    `Mantra Meridian ${configSlug.toUpperCase()} floor plans`,
    `Mantra Meridian ${configSlug.toUpperCase()} carpet area`,
    `Mantra Meridian ${configName} cost sheet`,
    `${configSlug.toUpperCase()} flats in Balewadi Mantra Meridian`,
    `Mantra Riverside ${configSlug.toUpperCase()} Balewadi`,
    `Meridian Riverside ${configSlug.toUpperCase()} layout`,
    `luxury ${configSlug.toUpperCase()} apartments near Balewadi High Street`,
    `Mula river facing ${configSlug.toUpperCase()} flats Pune`,
    "Mantra Properties Balewadi",
    "MahaRERA P52100045688",
    "June 2028 possession"
  ];
  return base.join(", ");
}

// Commercial / Pricing keyword builder
export const pricingKeywords = [
  ...pricingPermutations,
  ...brandPermutations.slice(0, 6),
  "Balewadi flat rates 2026",
  "MahaRERA P52100045688"
].join(", ");

// Location / Connectivity keyword builder
export const locationKeywordsList = [
  ...locationPermutations,
  ...brandPermutations.slice(0, 5),
  "flats near proposed Wakad river bridge",
  "Balewadi High Street luxury apartments",
  "properties near Pune Metro Line 3",
  "MahaRERA P52100045688"
].join(", ");

// Architectural & Floor Plan keyword builder
export const floorPlanKeywords = [
  ...collateralPermutations,
  ...typologyPermutations.slice(0, 6),
  ...brandPermutations.slice(0, 5),
  "MahaRERA carpet area Balewadi",
  "zero dead space floor plans Pune"
].join(", ");

// Lifestyle & Amenities keyword builder
export const amenityKeywords = [
  ...meridianKeywordEcosystem.lifestyleKeywords,
  ...brandPermutations.slice(0, 5),
  "luxury project amenities Balewadi",
  "apartments with infinity pool Pune",
  "clubhouse Balewadi Pune",
  "The Grand Pavilion 20000 sq ft"
].join(", ");

// Masterplan & Estate Blueprint keyword builder
export const masterplanKeywords = [
  ...meridianKeywordEcosystem.lifestyleKeywords.slice(0, 6),
  ...brandPermutations.slice(0, 6),
  "Mantra Meridian 8 acre masterplan",
  "riverside masterplan Balewadi",
  "75 percent open space project Pune",
  "MahaRERA P52100045688"
].join(", ");

// Riverside & Natural Sanctuary keyword builder
export const riversideKeywords = [
  ...locationPermutations.filter(k => k.toLowerCase().includes("river") || k.toLowerCase().includes("mula")),
  ...brandPermutations.slice(0, 6),
  "riverside apartments Balewadi",
  "Mula riverfront apartments Pune",
  "river view flats Balewadi",
  "riverside boardwalk Pune"
].join(", ");

// MahaRERA & Statutory Trust keyword builder
export const statutoryKeywordsList = [
  ...statutoryPermutations,
  ...brandPermutations.slice(0, 6),
  "MahaRERA P52100045688",
  "Mantra Meridian RERA registration",
  "Mantra Meridian possession date June 2028",
  "sanctioned building plans Balewadi"
].join(", ");

// Balewadi Micromarket Authority keyword builder
export const balewadiKeywordsList = [
  ...brandPermutations.slice(0, 10),
  ...locationPermutations.slice(0, 8),
  ...reputationPermutations.slice(0, 6),
  ...typologyPermutations.slice(0, 8),
  "Balewadi real estate",
  "flats in Balewadi Pune",
  "apartments in Balewadi",
  "2 BHK flats in Balewadi",
  "3 BHK flats in Balewadi",
  "4 BHK flats in Balewadi",
  "luxury flats in Balewadi",
  "Balewadi High Street luxury apartments",
  "best residential projects in Balewadi",
  "flats near Balewadi sports complex",
  "Mula riverfront apartments Balewadi",
  "new launch in Balewadi 2026",
  "Mantra Meridian Balewadi"
].join(", ");

// West Pune Regional Intelligence keyword builder
export const westPuneKeywordsList = [
  ...reputationPermutations.slice(0, 6),
  ...locationPermutations.slice(0, 8),
  ...brandPermutations.slice(0, 10),
  "West Pune real estate",
  "West Pune luxury real estate corridor",
  "best luxury projects in West Pune 2026",
  "luxury apartments West Pune",
  "Balewadi vs Baner real estate",
  "flats near Hinjewadi Phase 1",
  "luxury corridor West Pune",
  "Mantra Meridian West Pune",
  "flats near Mumbai Pune Highway West Pune"
].join(", ");

// Pune Real Estate Macro Market keyword builder
export const puneRealEstateKeywordsList = [
  ...meridianKeywordEcosystem.investmentKeywords,
  ...reputationPermutations.slice(0, 6),
  ...pricingPermutations.slice(0, 6),
  ...brandPermutations.slice(0, 10),
  "Pune real estate",
  "Pune real estate market 2026",
  "luxury flats in Pune",
  "property investment Pune",
  "riverfront property appreciation Pune",
  "top luxury projects in Pune",
  "best builders in Pune",
  "3 BHK luxury apartments Pune",
  "4 BHK apartments Pune",
  "Mantra Meridian Riverside Pune"
].join(", ");

// All Residences Portfolio keyword builder
export const residencesKeywordsList = [
  ...typologyPermutations,
  ...brandPermutations.slice(0, 6),
  "luxury 2 3 4 BHK flats Balewadi",
  "Mantra Meridian apartments",
  "duplex flats Balewadi Pune"
].join(", ");

// Visual Archive & Gallery keyword builder
export const galleryKeywordsList = [
  ...brandPermutations.slice(0, 6),
  "Mantra Meridian photos",
  "Mantra Meridian 3D virtual tour",
  "Mantra Meridian sample flat video",
  "Mantra Meridian elevation photos",
  "luxury apartments Balewadi photos"
].join(", ");

// Journal & Editorial Intelligence keyword builder
export const journalKeywordsList = [
  ...brandPermutations.slice(0, 6),
  ...reputationPermutations.slice(0, 4),
  ...meridianKeywordEcosystem.investmentKeywords.slice(0, 3),
  "Balewadi real estate analysis",
  "Pune real estate news 2026",
  "Mantra Meridian news and updates"
].join(", ");

// Hinjewadi Tech Corridor Intelligence keyword builder
export const hinjewadiKeywordsList = [
  ...hinjewadiKeywords,
  ...brandPermutations.slice(0, 5),
  ...locationPermutations.slice(0, 4),
  "Hinjewadi IT Park luxury apartments",
  "PMRDA Metro Line 3 Balewadi to Hinjewadi"
].join(", ");

// Baner Luxury Corridor keyword builder
export const banerKeywordsList = [
  ...banerKeywords,
  ...brandPermutations.slice(0, 10),
  "Baner real estate",
  "Baner Balewadi luxury apartments",
  "Balewadi High Street Baner residences",
  "luxury flats Baner Pune",
  "Mantra Meridian Riverside Baner"
].join(", ");

// Mahalunge Hi-Tech City Corridor keyword builder
export const mahalungeKeywordsList = [
  ...mahalungeKeywords,
  ...brandPermutations.slice(0, 5),
  "Mahalunge Balewadi bridge connectivity",
  "Mula riverfront apartments Mahalunge"
].join(", ");

// Sky Duplex & Penthouse Architectural keyword builder
export const duplexKeywordsList = [
  ...duplexPenthouseKeywords,
  ...brandPermutations.slice(0, 5),
  "3 BHK Duplex in Balewadi Pune",
  "double height ceiling flats West Pune"
].join(", ");

// Comparative Real Estate keyword builder
export const comparativeKeywordsList = [
  ...comparativeProjectKeywords,
  ...reputationPermutations,
  ...brandPermutations.slice(0, 5)
].join(", ");

// Helper functions for programmatic and structured schema generation
export function getClusterById(id: number): TopicalClusterDefinition | undefined {
  return TOPICAL_CLUSTERS_54[id];
}

export function getClusterKeywords(id: number): string[] {
  return TOPICAL_CLUSTERS_54[id]?.keywords ?? [];
}

export function getKeywordsByPillar(pillarId: number): string[] {
  const pillar = EIGHT_CORE_PILLARS.find(p => p.id === pillarId);
  if (!pillar) return [];
  return pillar.coreClusterIds.flatMap(id => TOPICAL_CLUSTERS_54[id]?.keywords ?? []);
}

export function generateTopicalEntitySchema(clusterId: number): Record<string, any> {
  const cluster = TOPICAL_CLUSTERS_54[clusterId];
  if (!cluster) return {};

  return {
    "@context": "https://schema.org",
    "@type": cluster.schemaEntityType,
    "name": cluster.name,
    "description": cluster.editorialSummary,
    "url": `https://mantrameridianriverside.com${cluster.canonicalTarget}`,
    "keywords": cluster.keywords.slice(0, 10).join(", "),
    "about": {
      "@type": "Thing",
      "name": "Mantra Meridian Riverside Balewadi",
      "sameAs": "https://maharera.mahaonline.gov.in/"
    }
  };
}

// Master Search Engine & AI Crawler Repository
export const masterKeywordsRepository = {
  totalKeywords: allSearchPermutations.length,
  coreBrandQueries,
  majorGoogleQueries,
  clusters: {
    brand: brandPermutations,
    typologies: typologyPermutations,
    pricing: pricingPermutations,
    locations: locationPermutations,
    collateral: collateralPermutations,
    statutory: statutoryPermutations,
    contact: contactPermutations,
    reputation: reputationPermutations,
    hinjewadi: hinjewadiKeywords,
    baner: banerKeywords,
    mahalunge: mahalungeKeywords,
    duplex: duplexPenthouseKeywords,
    comparative: comparativeProjectKeywords,
    puneMacro: puneRealEstateMacroKeywords,
    all54Clusters: TOPICAL_CLUSTERS_54
  }
};
