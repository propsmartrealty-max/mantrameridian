export interface LocationDestination {
  id: string;
  name: string;
  category: "work" | "dining" | "shopping" | "education" | "healthcare" | "connectivity";
  categoryLabel: string;
  distanceKm: string;
  driveTimeMins: string;
  description: string;
  verifiedSource: string;
  lastUpdated: string;
  coordinates: {
    lat: number;
    lng: number;
    relativeX: number; // 0 to 100 on custom schematic map
    relativeY: number; // 0 to 100 on custom schematic map
  };
}

export const locationCategories = [
  { id: "all", label: "All Destinations" },
  { id: "dining", label: "High Street & Dining" },
  { id: "work", label: "Business & IT Hubs" },
  { id: "connectivity", label: "Transit & Highways" },
  { id: "education", label: "World-Class Schools" },
  { id: "healthcare", label: "Super-Specialty Care" },
  { id: "shopping", label: "Retail & Parks" }
];

export const locationDestinations: LocationDestination[] = [
  {
    id: "balewadi-high-street",
    name: "Balewadi High Street",
    category: "dining",
    categoryLabel: "High Street & Dining",
    distanceKm: "1.2 km",
    driveTimeMins: "3 – 5 mins",
    description: "Pune's celebrated open-air culinary and nightlife boulevard, hosting Michelin-inspired dining, artisanal cafes, and boutique social hubs.",
    verifiedSource: "Official Project Brochure / Survey",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.5775, lng: 73.7745, relativeX: 42, relativeY: 38 }
  },
  {
    id: "the-urban-foundry",
    name: "The Urban Foundry & Artisanal Bistros",
    category: "dining",
    categoryLabel: "High Street & Dining",
    distanceKm: "1.4 km",
    driveTimeMins: "4 mins",
    description: "Iconic Balewadi culinary destination known for contemporary industrial aesthetics and craft dining.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.578, lng: 73.776, relativeX: 45, relativeY: 36 }
  },
  {
    id: "the-orchid-hotel",
    name: "The Orchid Hotel Pune",
    category: "dining",
    categoryLabel: "High Street & Dining",
    distanceKm: "2.1 km",
    driveTimeMins: "5 mins",
    description: "5-star luxury eco-hotel with fine dining banquets, business lounges, and corporate conference venues.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.571, lng: 73.77, relativeX: 38, relativeY: 44 }
  },
  {
    id: "hinjewadi-it-park",
    name: "Infosys Ltd & Rajiv Gandhi Infotech Park",
    category: "work",
    categoryLabel: "Business & IT Hubs",
    distanceKm: "7.5 km",
    driveTimeMins: "14 mins",
    description: "Maharashtra's premier IT hub employing 400,000+ technology leaders across Infosys, Wipro, TCS, and Cognizant.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.5912, lng: 73.7389, relativeX: 18, relativeY: 22 }
  },
  {
    id: "cummins-india",
    name: "Cummins India Technical Center",
    category: "work",
    categoryLabel: "Business & IT Hubs",
    distanceKm: "3.1 km",
    driveTimeMins: "7 mins",
    description: "Major global engineering and corporate headquarters complex located in Balewadi.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.57, lng: 73.78, relativeX: 52, relativeY: 48 }
  },
  {
    id: "eon-it-park-baner",
    name: "EON IT Park & Commercial District",
    category: "work",
    categoryLabel: "Business & IT Hubs",
    distanceKm: "2.8 km",
    driveTimeMins: "6 mins",
    description: "High-grade corporate financial park hosting tech consulting firms, financial institutions, and co-working hubs.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.5642, lng: 73.7821, relativeX: 58, relativeY: 55 }
  },
  {
    id: "proposed-wakad-bridge",
    name: "Planned Balewadi–Wakad Bridge Link",
    category: "connectivity",
    categoryLabel: "Transit & Highways",
    distanceKm: "0.8 km",
    driveTimeMins: "2 mins",
    description: "Proposed municipal river bridge connecting Meridian directly to Wakad and Phoenix Mall of the Millennium without highway detours.",
    verifiedSource: "Official Municipal Masterplan & Mantra Disclosures",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.585, lng: 73.771, relativeX: 36, relativeY: 26 }
  },
  {
    id: "proposed-metro-station",
    name: "Proposed Balewadi Metro Station (Line 3)",
    category: "connectivity",
    categoryLabel: "Transit & Highways",
    distanceKm: "1.8 km",
    driveTimeMins: "5 mins",
    description: "PMRDA elevated metro line linking Hinjewadi directly to Civil Court and Central Pune.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.574, lng: 73.771, relativeX: 38, relativeY: 48 }
  },
  {
    id: "pune-international-airport",
    name: "Pune International Airport",
    category: "connectivity",
    categoryLabel: "Transit & Highways",
    distanceKm: "21 km",
    driveTimeMins: "42 mins",
    description: "Domestic and international air terminal connected via Old Mumbai Road and University flyover.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.582, lng: 73.919, relativeX: 92, relativeY: 30 }
  },
  {
    id: "pune-railway-station",
    name: "Pune Junction Railway Station",
    category: "connectivity",
    categoryLabel: "Transit & Highways",
    distanceKm: "15 km",
    driveTimeMins: "32 mins",
    description: "Main central railway terminal providing interstate Vande Bharat and express connections.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.528, lng: 73.874, relativeX: 84, relativeY: 72 }
  },
  {
    id: "jupiter-hospital",
    name: "Jupiter Super Specialty Hospital, Baner",
    category: "healthcare",
    categoryLabel: "Super-Specialty Care",
    distanceKm: "4.2 km",
    driveTimeMins: "8 mins",
    description: "NABH-accredited tertiary care multi-specialty hospital with 24/7 cardiac, trauma, and critical care units.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.558, lng: 73.791, relativeX: 68, relativeY: 62 }
  },
  {
    id: "surya-hospital",
    name: "Surya Mother & Child Super Speciality Hospital",
    category: "healthcare",
    categoryLabel: "Super-Specialty Care",
    distanceKm: "3.8 km",
    driveTimeMins: "7 mins",
    description: "Renowned pediatric and maternity super-specialty hospital providing advanced neonatal and intensive care.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.562, lng: 73.785, relativeX: 64, relativeY: 59 }
  },
  {
    id: "giis-balewadi",
    name: "Global Indian International School (GIIS), Balewadi",
    category: "education",
    categoryLabel: "World-Class Schools",
    distanceKm: "1.9 km",
    driveTimeMins: "5 mins",
    description: "Flagship international IB and CBSE curriculum school equipped with smart campuses and sports academies.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.583, lng: 73.766, relativeX: 32, relativeY: 30 }
  },
  {
    id: "mitcon-institute",
    name: "MITCON Institute of Management, Balewadi",
    category: "education",
    categoryLabel: "World-Class Schools",
    distanceKm: "1.6 km",
    driveTimeMins: "4 mins",
    description: "Distinguished postgraduate institute and business school located in central Balewadi.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.579, lng: 73.768, relativeX: 35, relativeY: 34 }
  },
  {
    id: "westend-mall",
    name: "Westend Mall, Aundh",
    category: "shopping",
    categoryLabel: "Retail & Parks",
    distanceKm: "6.8 km",
    driveTimeMins: "13 mins",
    description: "Upscale lifestyle retail center featuring international brands, gourmet grocery, and Cinepolis VIP theatres.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.561, lng: 73.808, relativeX: 82, relativeY: 66 }
  },
  {
    id: "balewadi-biodiversity-park",
    name: "Balewadi Biodiversity Park & Baner Hills",
    category: "shopping",
    categoryLabel: "Retail & Parks",
    distanceKm: "2.4 km",
    driveTimeMins: "6 mins",
    description: "Protected municipal ecological green hills offering bird-watching, sunrise trails, and panoramic city vistas.",
    verifiedSource: "Official Property Proximity List",
    lastUpdated: "Active 2026",
    coordinates: { lat: 18.563, lng: 73.778, relativeX: 50, relativeY: 60 }
  }
];

export const lifestyleTimeline = [
  {
    period: "Morning",
    time: "06:30 — 09:00",
    title: "Still Waters & Sunrise Rhythms",
    description: "Wake to natural birdsong from the Mula river riparian tree line. Step onto your cantilevered deck with a cup of single-origin coffee, followed by an invigorating jog along the 500-metre private riverfront boardwalk or yoga on the floating timber pavilion."
  },
  {
    period: "Midday",
    time: "09:30 — 17:30",
    title: "Effortless Executive Connectivity",
    description: "Commute in under 15 minutes to Rajiv Gandhi Infotech Park Hinjewadi or Baner's corporate hubs, avoiding heavy cross-city traffic. Alternatively, host executive video conferences inside Meridian's private co-working acoustic pods."
  },
  {
    period: "Evening",
    time: "18:00 — 21:30",
    title: "Culinary Splendor on Balewadi High Street",
    description: "Meet friends and colleagues at Balewadi High Street's gourmet bistros, just 3 minutes from your gates. Alternatively, savor sunset cocktails on your double-height sky terrace watching the twilight reflection ripple across the river."
  },
  {
    period: "Night",
    time: "22:00 onwards",
    title: "Whispering Waters & Absolute Silence",
    description: "Return home to acoustic tranquility. With heavy-gauge double-glazed sliding panels and zero vehicular through-traffic, the river breeze creates an undisturbed restorative sanctuary for deep sleep."
  }
];
