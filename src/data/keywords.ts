export interface KeywordCluster {
  category: string;
  primaryKeywords: string[];
  searchIntents: string[];
  semanticPhrases: string[];
}

export const meridianKeywordEcosystem = {
  // 01. Brand & Developer Authority Keywords
  brandKeywords: [
    "Mantra Meridian",
    "Mantra Meridian Riverside",
    "Mantra Meridian Balewadi",
    "Meridian at Riverside Balewadi",
    "Mantra Properties Meridian",
    "Mantra Properties Balewadi",
    "Mantra Riverside Pune",
    "Mantra Meridian Pune",
    "Site Mantra Riverside",
    "Mantra Meridian Official Website",
    "Mantra Meridian Contact Number",
    "Mantra Meridian Sales Office Balewadi",
    "Mantra Meridian Reviews",
    "Mantra Properties Ongoing Projects Pune"
  ],

  // 02. Configuration & Typology Search Keywords
  configurationKeywords: [
    "2 BHK flats in Balewadi",
    "2 BHK in Balewadi Mantra Meridian",
    "Mantra Meridian 2 BHK price",
    "Mantra Meridian 2 BHK carpet area",
    "3 BHK flats in Balewadi",
    "3 BHK in Balewadi Mantra Meridian",
    "Mantra Meridian 3 BHK price",
    "Mantra Meridian 3 BHK carpet area",
    "3 BHK Duplex in Balewadi",
    "Signature Sky Duplex Balewadi",
    "Mantra Meridian Duplex price",
    "Two tier sky homes Balewadi",
    "4 BHK luxury apartments Balewadi",
    "4 BHK flats in Balewadi",
    "Mantra Meridian 4 BHK price",
    "Mantra Meridian 4 BHK carpet area",
    "Mantra Meridian floor plans",
    "Mantra Meridian unit layouts",
    "Mantra Meridian sample flat video",
    "Mantra Meridian virtual tour"
  ],

  // 03. Pricing, Commercial & Cost Sheet Searches
  commercialKeywords: [
    "Mantra Meridian price list 2026",
    "Mantra Meridian cost sheet",
    "Mantra Meridian pricing breakdown",
    "Mantra Meridian payment plan",
    "Mantra Meridian booking amount",
    "Mantra Meridian all inclusive price",
    "Mantra Meridian stamp duty registration Pune",
    "Mantra Meridian home loan approved banks SBI HDFC",
    "Mantra Meridian maintenance charges Balewadi",
    "Mantra Meridian price per square foot"
  ],

  // 04. Location, Transit & Connectivity Keywords
  locationKeywords: [
    "Mantra Meridian exact location",
    "Mantra Meridian site address Balewadi Village Road",
    "Riverside apartments in Balewadi",
    "Flats near Balewadi High Street",
    "Properties near Mula River Pune",
    "Flats near proposed Wakad Balewadi bridge",
    "Luxury flats near Hinjewadi IT Park Phase 1",
    "Apartments near PMRDA Metro Line 3 Balewadi",
    "Flats near Cummins India Balewadi",
    "West Pune luxury real estate corridor",
    "Balewadi Village Road apartments",
    "Flats near The Orchid School Balewadi",
    "Flats near Jupiter Hospital Baner"
  ],

  // 05. Lifestyle, Architecture & Masterplan Keywords
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

  // 06. Statutory, Legal & MahaRERA Compliance
  statutoryKeywords: [
    "Mantra Meridian MahaRERA number",
    "MahaRERA P52100045688",
    "Mantra Meridian RERA certificate download",
    "Mantra Meridian possession date June 2028",
    "Mantra Meridian legal title clearance",
    "Mantra Meridian sanctioned building plans",
    "Mantra Properties track record delivered projects",
    "MahaRERA approved projects Balewadi"
  ],

  // 07. Comparative & Micromarket Dominance Searches
  comparativeKeywords: [
    "Mantra Meridian vs 24K Altura",
    "Mantra Meridian vs Balmoral Riverside",
    "Mantra Meridian vs VTP Earth One",
    "Mantra Meridian vs ANP Universe",
    "Best luxury projects in Balewadi Pune 2026",
    "Top residential developers in West Pune",
    "Balewadi vs Baner real estate investment",
    "Riverfront apartments vs city apartments Pune"
  ],

  // 08. NRI & High-Yield Investment Searches
  investmentKeywords: [
    "NRI property investment in Pune Balewadi",
    "Rental yield Balewadi High Street tech corridor",
    "Capital appreciation West Pune property 2026 to 2030",
    "Pre launch luxury apartments Balewadi Pune",
    "High return real estate investment Pune"
  ]
};

// Curated default meta keywords string for general pages
export const defaultMetaKeywords = [
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 8),
  ...meridianKeywordEcosystem.configurationKeywords.slice(0, 6),
  ...meridianKeywordEcosystem.commercialKeywords.slice(0, 4),
  ...meridianKeywordEcosystem.locationKeywords.slice(0, 4),
  "MahaRERA P52100045688",
  "Mantra Properties Pune"
].join(", ");

// Configuration-specific keyword builders
export function getConfigurationKeywords(configSlug: string, configName: string): string {
  const base = [
    `${configName} Mantra Meridian Riverside`,
    `${configSlug.toUpperCase()} flats in Balewadi`,
    `Mantra Meridian ${configSlug.toUpperCase()} price`,
    `Mantra Meridian ${configSlug.toUpperCase()} floor plans`,
    `Mantra Meridian ${configSlug.toUpperCase()} carpet area`,
    `Mantra Meridian ${configName} cost sheet`,
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
  ...meridianKeywordEcosystem.commercialKeywords,
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 5),
  "Mantra Meridian price list 2026",
  "Mantra Meridian cost sheet PDF",
  "Mantra Meridian 2 BHK 3 BHK 4 BHK prices",
  "Balewadi flat rates 2026",
  "MahaRERA P52100045688"
].join(", ");

// Location / Connectivity keyword builder
export const locationKeywordsList = [
  ...meridianKeywordEcosystem.locationKeywords,
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 4),
  "flats near proposed Wakad river bridge",
  "Balewadi High Street luxury apartments",
  "properties near Pune Metro Line 3",
  "MahaRERA P52100045688"
].join(", ");

// Architectural & Floor Plan keyword builder
export const floorPlanKeywords = [
  ...meridianKeywordEcosystem.configurationKeywords,
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 4),
  "Mantra Meridian floor plans PDF",
  "MahaRERA carpet area Balewadi",
  "zero dead space floor plans Pune",
  "Mantra Meridian unit layouts"
].join(", ");

// Lifestyle & Amenities keyword builder
export const amenityKeywords = [
  ...meridianKeywordEcosystem.lifestyleKeywords,
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 4),
  "luxury project amenities Balewadi",
  "apartments with infinity pool Pune",
  "clubhouse Balewadi Pune",
  "The Grand Pavilion 20000 sq ft"
].join(", ");

// Masterplan & Estate Blueprint keyword builder
export const masterplanKeywords = [
  ...meridianKeywordEcosystem.lifestyleKeywords.slice(0, 6),
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 5),
  "Mantra Meridian 8 acre masterplan",
  "riverside masterplan Balewadi",
  "75 percent open space project Pune",
  "MahaRERA P52100045688"
].join(", ");

// Riverside & Natural Sanctuary keyword builder
export const riversideKeywords = [
  ...meridianKeywordEcosystem.locationKeywords.filter(k => k.toLowerCase().includes("river") || k.toLowerCase().includes("mula")),
  ...meridianKeywordEcosystem.lifestyleKeywords.filter(k => k.toLowerCase().includes("river")),
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 5),
  "riverside apartments Balewadi",
  "Mula riverfront apartments Pune",
  "river view flats Balewadi",
  "riverside boardwalk Pune"
].join(", ");

// MahaRERA & Statutory Trust keyword builder
export const statutoryKeywordsList = [
  ...meridianKeywordEcosystem.statutoryKeywords,
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 5),
  "MahaRERA P52100045688",
  "Mantra Meridian RERA registration",
  "Mantra Meridian possession date June 2028",
  "sanctioned building plans Balewadi"
].join(", ");

// Balewadi Micromarket Authority keyword builder
export const balewadiKeywordsList = [
  ...meridianKeywordEcosystem.locationKeywords,
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 5),
  ...meridianKeywordEcosystem.comparativeKeywords.slice(0, 4),
  "Balewadi real estate",
  "flats in Balewadi Pune",
  "Balewadi High Street luxury apartments",
  "best residential projects in Balewadi"
].join(", ");

// West Pune Regional Intelligence keyword builder
export const westPuneKeywordsList = [
  ...meridianKeywordEcosystem.comparativeKeywords,
  ...meridianKeywordEcosystem.locationKeywords.slice(0, 6),
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 5),
  "West Pune luxury real estate corridor",
  "Balewadi vs Baner real estate",
  "flats near Hinjewadi Phase 1",
  "luxury corridor West Pune"
].join(", ");

// Pune Real Estate Macro Market keyword builder
export const puneRealEstateKeywordsList = [
  ...meridianKeywordEcosystem.investmentKeywords,
  ...meridianKeywordEcosystem.comparativeKeywords,
  ...meridianKeywordEcosystem.commercialKeywords.slice(0, 4),
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 5),
  "Pune real estate market 2026",
  "luxury flats in Pune",
  "property investment Pune",
  "riverfront property appreciation Pune"
].join(", ");

// All Residences Portfolio keyword builder
export const residencesKeywordsList = [
  ...meridianKeywordEcosystem.configurationKeywords,
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 5),
  "luxury 2 3 4 BHK flats Balewadi",
  "Mantra Meridian apartments",
  "duplex flats Balewadi Pune"
].join(", ");

// Visual Archive & Gallery keyword builder
export const galleryKeywordsList = [
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 6),
  "Mantra Meridian photos",
  "Mantra Meridian 3D virtual tour",
  "Mantra Meridian sample flat video",
  "Mantra Meridian elevation photos",
  "luxury apartments Balewadi photos"
].join(", ");

// Journal & Editorial Intelligence keyword builder
export const journalKeywordsList = [
  ...meridianKeywordEcosystem.brandKeywords.slice(0, 5),
  ...meridianKeywordEcosystem.comparativeKeywords.slice(0, 4),
  ...meridianKeywordEcosystem.investmentKeywords.slice(0, 3),
  "Balewadi real estate analysis",
  "Pune real estate news 2026",
  "Mantra Meridian news and updates"
].join(", ");

