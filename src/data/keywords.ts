export interface KeywordCluster {
  category: string;
  primaryKeywords: string[];
  searchIntents: string[];
  semanticPhrases: string[];
}

// 00. Core High-Priority Brand Search Queries (Tier-1 Ranking Targets for Google.com)
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

// 01. Comprehensive Brand Entity Permutations (Tokens: Mantra, Meridian, Riverside, Balewadi, Pune, Properties)
export const brandPermutations: string[] = [
  // 5 Explicit High-Priority Target Search Queries
  "Mantra Meridian",
  "Mantra Balewadi",
  "Mantra Riverside",
  "Mantra Riverside Balewadi",
  "Mantra Meridian Balewadi",

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
  "Mantra Properties Balewadi Village Road"
];

// 02. Configuration & Typology Search Permutations
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

// 03. Pricing, Commercial & Cost Sheet Permutations
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

// 04. Location, Transit & Proximity Permutations
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

// 05. Floor Plans, Masterplan & Collateral Permutations
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

// 06. MahaRERA Statutory, Legal & Possession Permutations
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

// 07. Contact, Sales Office & Site Visit Permutations
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

// 08. Reviews, Credibility & Comparative Permutations
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
  comparativeKeywords: reputationPermutations,
  investmentKeywords: [
    "NRI property investment in Pune Balewadi",
    "Rental yield Balewadi High Street tech corridor",
    "Capital appreciation West Pune property 2026 to 2030",
    "Pre launch luxury apartments Balewadi Pune",
    "High return real estate investment Pune"
  ]
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
  ...reputationPermutations
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
  ...locationPermutations.slice(0, 6),
  ...brandPermutations.slice(0, 6),
  ...reputationPermutations.slice(0, 4),
  "Balewadi real estate",
  "flats in Balewadi Pune",
  "Balewadi High Street luxury apartments",
  "best residential projects in Balewadi"
].join(", ");

// West Pune Regional Intelligence keyword builder
export const westPuneKeywordsList = [
  ...reputationPermutations.slice(0, 4),
  ...locationPermutations.slice(0, 6),
  ...brandPermutations.slice(0, 6),
  "West Pune luxury real estate corridor",
  "Balewadi vs Baner real estate",
  "flats near Hinjewadi Phase 1",
  "luxury corridor West Pune"
].join(", ");

// Pune Real Estate Macro Market keyword builder
export const puneRealEstateKeywordsList = [
  ...meridianKeywordEcosystem.investmentKeywords,
  ...reputationPermutations.slice(0, 4),
  ...pricingPermutations.slice(0, 4),
  ...brandPermutations.slice(0, 6),
  "Pune real estate market 2026",
  "luxury flats in Pune",
  "property investment Pune",
  "riverfront property appreciation Pune"
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
