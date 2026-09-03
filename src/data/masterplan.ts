export interface MasterplanZone {
  id: string;
  name: string;
  tagline: string;
  category: "residential" | "amenity" | "landscape" | "access";
  description: string;
  highlights: string[];
  coordinates: {
    cx: number;
    cy: number;
    r: number;
    labelX: number;
    labelY: number;
  };
  details: {
    availableUnits?: string;
    views?: string;
    levels?: string;
    completionPhase?: string;
  };
}

export const masterplanZones: MasterplanZone[] = [
  {
    id: "tower-a",
    name: "Tower A — The Riverside Landmark",
    tagline: "Unobstructed direct river frontage with private panoramic sky decks",
    category: "residential",
    description: "Tower A commands the prime north-facing edge directly over the Mula river. Houses spacious 3 BHK and 4 BHK grand estates with private elevator vestibules and sunset horizons.",
    highlights: [
      "Direct 180° Mula river frontage",
      "Spacious 3 & 4 BHK corner estates",
      "Double-glazed acoustic low-E façade",
      "Dedicated high-speed passenger elevators"
    ],
    coordinates: { cx: 220, cy: 170, r: 35, labelX: 220, labelY: 175 },
    details: {
      availableUnits: "3 BHK & 4 BHK Estates",
      views: "Unobstructed River Panorama & Sunset Skyline",
      levels: "G + Podium + 28 Floors",
      completionPhase: "Phase 1 Registered"
    }
  },
  {
    id: "tower-b",
    name: "Tower B — The Duplex Signature",
    tagline: "Two-level sky homes with double-height volume",
    category: "residential",
    description: "Designed for architectural connoisseurs, Tower B features the signature 3 BHK Duplex residences alongside river-facing 3 BHK homes, celebrating vertical light and spatial grandeur.",
    highlights: [
      "Exclusive 3 BHK Sky Duplex residences",
      "Double-height living rooms with 20ft glass curtain walls",
      "Panoramic views towards river and central botanical courtyards",
      "Private upper-floor family sanctuaries"
    ],
    coordinates: { cx: 360, cy: 160, r: 35, labelX: 360, labelY: 165 },
    details: {
      availableUnits: "3 BHK Duplexes & 3 BHK Homes",
      views: "Dual Aspect River & Central Greens",
      levels: "G + Podium + 28 Floors",
      completionPhase: "Phase 1 Registered"
    }
  },
  {
    id: "tower-c",
    name: "Tower C — The Park View Tower",
    tagline: "Optimal cross-ventilation and vast podium garden vistas",
    category: "residential",
    description: "Tower C looks directly onto the vast landscaped podium gardens, reflection ponds, and jogging circuit, offering balanced sun exposure throughout the day.",
    highlights: [
      "2 BHK & 3 BHK contemporary configurations",
      "Morning sun exposure and cool breeze orientation",
      "Direct sheltered walkway to the Grand Clubhouse",
      "Quiet residential cul-de-sac positioning"
    ],
    coordinates: { cx: 480, cy: 260, r: 35, labelX: 480, labelY: 265 },
    details: {
      availableUnits: "2 BHK & 3 BHK Residences",
      views: "Podium Garden & Balewadi Skyline",
      levels: "G + Podium + 26 Floors",
      completionPhase: "Phase 1 Registered"
    }
  },
  {
    id: "tower-d",
    name: "Tower D — The Urban Haven",
    tagline: "Contemporary residences with seamless access to high-street connectivity",
    category: "residential",
    description: "Positioned with convenient access to the grand arrival porte-cochère and Balewadi High Street road corridor, featuring smart 2 BHK and 3 BHK layouts.",
    highlights: [
      "Efficient, zero dead-space 2 BHK layouts",
      "Fast connectivity to estate exit and arterial roads",
      "Dedicated EV charging basement bays",
      "Panoramic South-East city skyline views"
    ],
    coordinates: { cx: 160, cy: 300, r: 35, labelX: 160, labelY: 305 },
    details: {
      availableUnits: "2 BHK Contemporary Residences",
      views: "City Skyline & Central Boulevard",
      levels: "G + Podium + 26 Floors",
      completionPhase: "Phase 1 Registered"
    }
  },
  {
    id: "clubhouse-pool",
    name: "The Grand Pavilion & Infinity Lap Pool",
    tagline: "20,000 sq.ft. of curated wellness, dining, and social indulgence",
    category: "amenity",
    description: "The architectural centerpiece of the community, anchoring the swimming pavilion, Technogym fitness club, private cinema, banquet lounge, and co-working executive pods.",
    highlights: [
      "25-metre glass-edge riverside lap pool",
      "Double-height social ballroom and private dining",
      "Dolby Atmos private cinema salon",
      "Executive co-working conference suites"
    ],
    coordinates: { cx: 290, cy: 260, r: 40, labelX: 290, labelY: 265 },
    details: {
      levels: "3 Levels of Curated Lifestyle Spaces",
      completionPhase: "Integrated Estate Amenity"
    }
  },
  {
    id: "riverside-promenade",
    name: "The Mula Riverside Boardwalk",
    tagline: "500-metre dedicated natural trail beside the living waters",
    category: "landscape",
    description: "An eco-sensitive riparian buffer promenade lined with native trees, peaceful reading pergolas, yoga platforms, and dusk lighting overlooking the river.",
    highlights: [
      "500 metres of pedestrian-only waterfront trail",
      "Sunset observation viewing pavilions",
      "Morning yoga & meditation floating timber deck",
      "Direct nature connection away from city bustle"
    ],
    coordinates: { cx: 300, cy: 75, r: 30, labelX: 300, labelY: 80 },
    details: {
      views: "Direct Riverfront and Riparian Canopy",
      completionPhase: "Dedicated Nature Reserve"
    }
  },
  {
    id: "sports-arena",
    name: "Championship Sports Enclave",
    tagline: "Tournament tennis court, pickleball, and enclosed futsal turf",
    category: "amenity",
    description: "High-grade athletic sports grounds buffered with acoustic green screening so residents can engage in high-intensity sports without noise disruption to living towers.",
    highlights: [
      "Floodlit tennis & pickleball court",
      "Multi-purpose cricket & futsal astroturf arena",
      "Spectator viewing gallery with hydration point",
      "Outdoor calisthenics fitness station"
    ],
    coordinates: { cx: 580, cy: 160, r: 30, labelX: 580, labelY: 165 },
    details: {
      completionPhase: "Integrated Sports Park"
    }
  },
  {
    id: "arrival-gatehouse",
    name: "Grand Entrance Porte-Cochère & Security Plaza",
    tagline: "Double-height arrival canopy with 7-tier AI-monitored checkpoint",
    category: "access",
    description: "A ceremonial vehicular drop-off featuring water features, cobblestone paving, ANPR license plate recognition, and visitor concierge assistance.",
    highlights: [
      "Hotel-grade covered vehicular drop-off",
      "Automated license plate scanning (ANPR)",
      "Separate service and residential traffic lanes",
      "24/7 manned security control and concierge"
    ],
    coordinates: { cx: 80, cy: 370, r: 30, labelX: 80, labelY: 375 },
    details: {
      completionPhase: "Primary Estate Gateway"
    }
  }
];
