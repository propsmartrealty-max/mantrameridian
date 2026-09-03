export interface KeywordCluster {
  category: string;
  primaryKeywords: string[];
  searchIntents: string[];
  semanticPhrases: string[];
}

export const meridianKeywordEcosystem = {
  brandKeywords: [
    "Mantra Meridian",
    "Mantra Meridian Riverside",
    "Mantra Meridian Balewadi",
    "Meridian at Riverside Balewadi",
    "Mantra Properties Balewadi",
    "Mantra Meridian Pune",
    "Mantra Meridian MahaRERA P52100045688",
    "Mantra Meridian Official Website"
  ],
  configurationKeywords: [
    "2 BHK flats in Balewadi",
    "2 BHK in Balewadi Mantra Meridian",
    "3 BHK flats in Balewadi",
    "3 BHK in Balewadi Mantra Meridian",
    "3 BHK Duplex in Balewadi",
    "Signature Sky Duplex Balewadi",
    "4 BHK luxury apartments Balewadi",
    "4 BHK flats in Balewadi",
    "Mantra Meridian floor plans",
    "Mantra Meridian carpet area",
    "Mantra Meridian price list",
    "Mantra Meridian brochure PDF"
  ],
  locationKeywords: [
    "Riverside apartments in Balewadi",
    "Flats near Balewadi High Street",
    "Properties near Mula River Pune",
    "Flats near proposed Wakad bridge Balewadi",
    "Luxury flats near Hinjewadi IT Park",
    "Apartments near PMRDA Metro Line 3 Balewadi",
    "West Pune luxury real estate",
    "Balewadi Village Road apartments"
  ],
  lifestyleKeywords: [
    "8 acre luxury project in Balewadi",
    "Riverside boardwalk apartments Pune",
    "Temperature controlled infinity pool Balewadi",
    "Double height living ceiling apartments Pune",
    "Zero dead corridor homes Pune",
    "Gated luxury community Balewadi"
  ],
  statutoryKeywords: [
    "MahaRERA P52100045688",
    "Mantra Meridian RERA certificate",
    "Mantra Properties Pune ongoing projects",
    "Mantra Meridian possession date",
    "Mantra Meridian legal approvals"
  ]
};

export const defaultMetaKeywords = [
  ...meridianKeywordEcosystem.brandKeywords,
  ...meridianKeywordEcosystem.configurationKeywords.slice(0, 6),
  ...meridianKeywordEcosystem.locationKeywords.slice(0, 4),
  "MahaRERA P52100045688"
].join(", ");
