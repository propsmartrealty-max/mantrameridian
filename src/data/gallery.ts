export interface GalleryImage {
  id: string;
  title: string;
  category: "architecture" | "interiors" | "riverside" | "amenities" | "landscape" | "lifestyle";
  categoryLabel: string;
  url: string;
  aspectRatio: "landscape" | "portrait" | "wide";
  caption: string;
  locationContext: string;
}

export const galleryCategories = [
  { id: "all", label: "Complete Archive" },
  { id: "architecture", label: "Architecture & Façade" },
  { id: "riverside", label: "The Riverside Experience" },
  { id: "interiors", label: "Living & Master Suites" },
  { id: "amenities", label: "Clubhouse & Wellness" },
  { id: "landscape", label: "Gardens & Promenade" }
];

export const galleryImages: GalleryImage[] = [
  {
    id: "gallery-official-1",
    title: "Mantra Meridian Architectural Tower Elevation",
    category: "architecture",
    categoryLabel: "Architecture & Façade",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-106076887.webp",
    aspectRatio: "wide",
    caption: "Iconic high-rise tower elevation framing panoramic views over the Mula river canopy in Balewadi.",
    locationContext: "Mantra Meridian River Elevation"
  },
  {
    id: "gallery-official-2",
    title: "Riverside Podium & Water Cascade",
    category: "riverside",
    categoryLabel: "The Riverside Experience",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-7690160.webp",
    aspectRatio: "landscape",
    caption: "Atmospheric perspective along the riverside promenade and landscaped podium terraces.",
    locationContext: "Central Promenade Level"
  },
  {
    id: "gallery-official-3",
    title: "Double-Height Grand Living Void",
    category: "interiors",
    categoryLabel: "Living & Master Suites",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-475996847.webp",
    aspectRatio: "landscape",
    caption: "20-foot vertical double-height living salon in the 3 BHK Signature Sky Duplex.",
    locationContext: "Tower B Duplex Residence"
  },
  {
    id: "gallery-official-4",
    title: "Contemporary Master Sanctuary",
    category: "interiors",
    categoryLabel: "Living & Master Suites",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-993460122.webp",
    aspectRatio: "landscape",
    caption: "Spacious master bedroom with corner acoustic glazing, walk-in dressing niche, and sunset views.",
    locationContext: "Riverside Master Suite"
  },
  {
    id: "gallery-official-5",
    title: "Infinity Lap Pool & Sunken Sun Loungers",
    category: "amenities",
    categoryLabel: "Clubhouse & Wellness",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-533930309.webp",
    aspectRatio: "wide",
    caption: "Olympic-dimension temperature-controlled pool poised directly above the natural river buffer.",
    locationContext: "Clubhouse Wellness Deck"
  },
  {
    id: "gallery-official-6",
    title: "Grand Entrance Porte-Cochère",
    category: "architecture",
    categoryLabel: "Architecture & Façade",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-274967097.webp",
    aspectRatio: "wide",
    caption: "Double-height covered vehicular arrival concourse with granite pavers and ambient night illumination.",
    locationContext: "Arrival Boulevard"
  },
  {
    id: "gallery-official-7",
    title: "Central Botanical Lawn & Zen Courtyard",
    category: "landscape",
    categoryLabel: "Gardens & Promenade",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-350194882.webp",
    aspectRatio: "landscape",
    caption: "75%+ landscaped open spaces featuring native shade trees, reflection pools, and walking boulevards.",
    locationContext: "Central Estate Gardens"
  },
  {
    id: "gallery-official-8",
    title: "The Grand Pavilion Social Lounge",
    category: "amenities",
    categoryLabel: "Clubhouse & Wellness",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-636694877.webp",
    aspectRatio: "landscape",
    caption: "Double-height community clubhouse with private banquet salon, concierge, and executive lounge.",
    locationContext: "The Grand Meridian Pavilion"
  },
  {
    id: "gallery-official-9",
    title: "500-Metre Mula River Boardwalk",
    category: "riverside",
    categoryLabel: "The Riverside Experience",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-63028088.webp",
    aspectRatio: "wide",
    caption: "Direct access to the natural riparian buffer and quiet wooden reading gazebos overlooking the water.",
    locationContext: "Riverside Promenade"
  },
  {
    id: "gallery-official-10",
    title: "Chef's Show Kitchen & Breakfast Bar",
    category: "interiors",
    categoryLabel: "Living & Master Suites",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-830667067.webp",
    aspectRatio: "landscape",
    caption: "Parallel quartz kitchen layout with undermount double sink and separate service yard.",
    locationContext: "4 BHK Gourmet Kitchen"
  },
  {
    id: "gallery-official-11",
    title: "Technogym High-Performance Fitness Studio",
    category: "amenities",
    categoryLabel: "Clubhouse & Wellness",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-858055725.webp",
    aspectRatio: "landscape",
    caption: "State-of-the-art cardio and functional strength training studio looking onto the river greens.",
    locationContext: "Pavilion Level 2"
  },
  {
    id: "gallery-official-12",
    title: "Cantilevered Sunset Sky Terrace",
    category: "architecture",
    categoryLabel: "Architecture & Façade",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-344980877.webp",
    aspectRatio: "landscape",
    caption: "8-foot deep observation decks engineered with seamless acoustic glass balustrades.",
    locationContext: "Tower Balconies"
  },
  {
    id: "gallery-official-13",
    title: "Spa Thermal Steam & Sauna Suite",
    category: "amenities",
    categoryLabel: "Clubhouse & Wellness",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-512405277.webp",
    aspectRatio: "landscape",
    caption: "Cedarwood thermal hydrotherapy chambers for post-workout detox and physical revitalization.",
    locationContext: "Clubhouse Spa Wing"
  },
  {
    id: "gallery-official-14",
    title: "Children's Adventure Playscape",
    category: "landscape",
    categoryLabel: "Gardens & Promenade",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-815277701.webp",
    aspectRatio: "landscape",
    caption: "Non-toxic timber play equipment on rubberized soft-fall flooring surrounded by shaded trees.",
    locationContext: "West Family Enclave"
  },
  {
    id: "gallery-official-15",
    title: "Evening Architectural Façade Lighting",
    category: "architecture",
    categoryLabel: "Architecture & Façade",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-765721034.webp",
    aspectRatio: "wide",
    caption: "Subtle warm architectural illumination highlighting the vertical structural rhythm at night.",
    locationContext: "Balewadi Skyline"
  },
  {
    id: "gallery-official-16",
    title: "Executive Co-Working & Conference Pods",
    category: "amenities",
    categoryLabel: "Clubhouse & Wellness",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-799319487.webp",
    aspectRatio: "landscape",
    caption: "Soundproof video-conference suites with enterprise high-speed fiber for productive remote work.",
    locationContext: "Business Lounge"
  },
  {
    id: "gallery-official-17",
    title: "Formal Dining Salon & Wine Showcase",
    category: "interiors",
    categoryLabel: "Living & Master Suites",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-738772119.webp",
    aspectRatio: "landscape",
    caption: "Elegant 10-seater dining space opening onto the river-facing observation balcony.",
    locationContext: "Grand Riverside Salon"
  },
  {
    id: "gallery-official-18",
    title: "Championship Tennis & Pickleball Court",
    category: "amenities",
    categoryLabel: "Clubhouse & Wellness",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-911472749.webp",
    aspectRatio: "landscape",
    caption: "US Open-grade acrylic cushioned synthetic floodlit court for competitive and leisure play.",
    locationContext: "North Sports Arena"
  },
  {
    id: "gallery-official-19",
    title: "Sunrise Yoga Floating Timber Deck",
    category: "riverside",
    categoryLabel: "The Riverside Experience",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-221460870.webp",
    aspectRatio: "landscape",
    caption: "Oriented East to catch the first morning rays filtering through riverside leaves.",
    locationContext: "Riparian Meditation Deck"
  },
  {
    id: "gallery-official-20",
    title: "Hotel-Grade Private Lift Vestibule",
    category: "interiors",
    categoryLabel: "Living & Master Suites",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-674922882.webp",
    aspectRatio: "landscape",
    caption: "Exclusive keycard-operated elevator arrival directly into residence foyer in 4 BHK units.",
    locationContext: "Tower A Elevator Lobby"
  },
  {
    id: "gallery-official-21",
    title: "Reflexology Pebble Garden & Sensory Path",
    category: "landscape",
    categoryLabel: "Gardens & Promenade",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-683039693.webp",
    aspectRatio: "landscape",
    caption: "Graded river stones providing natural foot reflexology therapy amidst lavender blooms.",
    locationContext: "Botanical Garden"
  },
  {
    id: "gallery-official-22",
    title: "Dolby Atmos 4K Private Screening Cinema",
    category: "amenities",
    categoryLabel: "Clubhouse & Wellness",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-319534698.webp",
    aspectRatio: "landscape",
    caption: "Tiered leather recliner cinema salon with 9.2.4 surround audio for private family movie nights.",
    locationContext: "Grand Pavilion Lower Level"
  },
  {
    id: "gallery-official-23",
    title: "Mula River Riparian Twilight Reflection",
    category: "riverside",
    categoryLabel: "The Riverside Experience",
    url: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-170408229.webp",
    aspectRatio: "wide",
    caption: "Tranquil waters capturing the twilight hues of the Balewadi western horizon.",
    locationContext: "Mula River Bank"
  }
];
