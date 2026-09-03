export interface AmenityItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  specs?: string;
  locationOnSite?: string;
}

export interface AmenityChapter {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: AmenityItem[];
}

export const amenityChapters: AmenityChapter[] = [
  {
    id: "wellness",
    title: "Wellness & Renewal",
    subtitle: "Sanctuaries of physical balance and mental stillness.",
    description: "Conceived as private wellness sanctuaries, Meridian's health spaces offer panoramic water views, natural ventilation, and state-of-the-art restorative equipment.",
    items: [
      {
        id: "infinity-lap-pool",
        name: "Riverside Infinity Lap Pool",
        category: "wellness",
        tagline: "Suspended above the riverside tree canopy",
        description: "Olympic-dimension temperature-controlled pool with glass edge overlooking the serene Mula river waters, complemented by submerged lounging pods and sunken sun loungers.",
        features: ["25m Olympic training length", "Submerged aqua loungers", "Separate heated jacuzzi spa", "River-view infinity edge"],
        locationOnSite: "Riverside Podium Level 2"
      },
      {
        id: "sky-gymnasium",
        name: "Technogym High-Performance Studio",
        category: "wellness",
        tagline: "Cardio and strength training framed by panoramic views",
        description: "Equipped with the latest Technogym Artis series, cardio consoles with personalized digital training, free weights area, and dedicated functional movement turf.",
        features: ["Technogym Artis biometric equipment", "Floor-to-ceiling river glass", "Dedicated TRX & CrossFit zone", "Personal training consultation suite"],
        locationOnSite: "Clubhouse Level 3"
      },
      {
        id: "yoga-meditation-deck",
        name: "Morning Sun Meditation Lawn & Yoga Pavilion",
        category: "wellness",
        tagline: "Open-air mindfulness at the water's edge",
        description: "A tranquil timber deck shaded by mature riverside canopy trees, oriented East to capture the first gentle rays of sunrise for prāṇāyāma and yoga.",
        features: ["Teak wood floating deck", "Surrounding herbal aroma garden", "Acoustic water feature cascade", "Sunrise eastern orientation"],
        locationOnSite: "East Riverside Promenade"
      },
      {
        id: "steam-sauna-spa",
        name: "Thermal Hydrotherapy Suites",
        category: "wellness",
        tagline: "Detoxification and post-workout revitalization",
        description: "Private cedarwood saunas, eucalyptus mist steam rooms, and invigorating experience showers for deep physical restoration.",
        features: ["Nordic cedar sauna", "Aromatherapy steam chambers", "Contrast cold plunge pool", "Private treatment suites"],
        locationOnSite: "Clubhouse Spa Wing"
      }
    ]
  },
  {
    id: "social",
    title: "The Social Club",
    subtitle: "Spaces designed for effortless entertaining and connection.",
    description: "An architectural clubhouse serving as the cultural heart of Meridian, providing refined settings for grand celebrations or intimate evenings with friends.",
    items: [
      {
        id: "meridian-clubhouse",
        name: "The Grand Meridian Pavilion",
        category: "social",
        tagline: "Double-height architectural community salon",
        description: "A 20,000 sq.ft. multi-level pavilion featuring soaring ceilings, contemporary bespoke art installations, and floor-to-ceiling glass that blurs indoors and out.",
        features: ["Double-height architectural lounge", "Private banquet ballroom with catering pantry", "Art curation gallery", "Concierge reception desk"],
        locationOnSite: "Central Estate Axis"
      },
      {
        id: "private-dining-wine",
        name: "Private Dining Salon & Cigar Bar",
        category: "social",
        tagline: "Intimate dinners curated for your closest circle",
        description: "An exclusive dining venue with professional chef's staging kitchen, temperature-controlled wine displays, and private riverfront terrace seating.",
        features: ["Sommelier wine storage", "16-seat custom marble banquet table", "Live chef demonstration island", "Connected sunset terrace"],
        locationOnSite: "Pavilion Level 2"
      },
      {
        id: "screening-theatre",
        name: "Private Cinema & Media Salon",
        category: "social",
        tagline: "Bespoke 4K Dolby Atmos audio-visual retreat",
        description: "Acoustically tuned screening chamber with plush tiered motorized leather recliners, 4K laser projection, and curated library access.",
        features: ["24 motorized Italian leather recliners", "Dolby Atmos 9.2.4 surround architecture", "4K HDR laser cinema projector", "Private acoustic bar alcove"],
        locationOnSite: "Clubhouse Entertainment Level"
      },
      {
        id: "business-lounge",
        name: "Executive Co-Working & Conference Pods",
        category: "social",
        tagline: "Professional executive productivity minutes from home",
        description: "Ergonomic workstations, soundproof video-conferencing booths, presentation conference rooms, and high-speed enterprise fiber connection.",
        features: ["Soundproof Zoom pods", "10-seat executive boardroom with 85\" display", "High-speed Wi-Fi 6E throughout", "Café bar & printer station"],
        locationOnSite: "Clubhouse Level 1"
      }
    ]
  },
  {
    id: "recreation",
    title: "Active Recreation & Sport",
    subtitle: "Championship-grade athletic and leisure amenities.",
    description: "Thoughtfully engineered sporting facilities built to international standards, catering to both competitive tournaments and casual weekend play.",
    items: [
      {
        id: "tennis-pickleball",
        name: "All-Weather Tennis & Pickleball Court",
        category: "recreation",
        tagline: "Championship-grade cushioned synthetic surface",
        description: "Floodlit court with tournament-standard acrylic surface, spectator viewing gallery, and adjustable configurations for tennis and pickleball.",
        features: ["US Open-grade acrylic cushioned turf", "Anti-glare LED sports floodlights", "Elevated spectator lounge", "Equipment storage lockers"],
        locationOnSite: "West Sports Enclave"
      },
      {
        id: "squash-court",
        name: "Glass-Back Indoor Squash Court",
        category: "recreation",
        tagline: "Fast-paced indoor athletic competition",
        description: "Air-conditioned WSF-certified squash court with imported maple wood sprung flooring and impact-resistant glass observation wall.",
        features: ["WSF compliant dimensions", "Shock-absorbent maple wood floor", "Viewing mezzanine", "Climate-controlled chamber"],
        locationOnSite: "Sports Complex"
      },
      {
        id: "indoor-games-room",
        name: "Billiards & Championship Games Lounge",
        category: "recreation",
        tagline: "Classic games in a refined gentleman's club atmosphere",
        description: "Featuring full-size English Riley snooker tables, table tennis, foosball, and bespoke chess and board game seating corners.",
        features: ["Full-size tournament snooker table", "Stiga professional table tennis", "Artisan chess and card tables", "Cocktail lounge bar"],
        locationOnSite: "Clubhouse Upper Floor"
      },
      {
        id: "multipurpose-turf",
        name: "Astro-Turf Futsal & Cricket Arena",
        category: "recreation",
        tagline: "High-energy enclosed turf for football and net cricket",
        description: "Enclosed all-weather synthetic turf with boundary netting, automatic bowling machine provision, and multi-sport pitch markings.",
        features: ["Seamless shock-pad artificial turf", "Cricket bowling crease & netting", "Mini-futsal goal systems", "Night lighting"],
        locationOnSite: "North Estate Sector"
      }
    ]
  },
  {
    id: "landscape",
    title: "Landscape & Riverside Nature",
    subtitle: "75%+ open green spaces crafted in harmony with the river ecosystem.",
    description: "Designed by world-class landscape architects, the grounds feature native flora, rhythmic water features, and expansive pedestrian green boulevards.",
    items: [
      {
        id: "riverside-promenade",
        name: "The Mula Riverside Promenade",
        category: "landscape",
        tagline: "500-metre landscaped walkway along the riverbank",
        description: "Continuous pedestrian walkway landscaped with indigenous riverside trees, quiet reading benches, night-sky illumination, and viewing platforms over the water.",
        features: ["500-metre paved uninterrupted path", "River-view viewing pavilions", "Reflective night ambient lighting", "Native biodiversity plantings"],
        locationOnSite: "Estate River Frontage"
      },
      {
        id: "reflexology-path",
        name: "Sensory & Reflexology Stone Walkways",
        category: "landscape",
        tagline: "Natural grounding through pebble therapy",
        description: "Meticulously arranged river pebble paths designed to massage pressure points on feet, surrounded by fragrant jasmine and lavender blooms.",
        features: ["Graded river stone textures", "Aromatic shrub borders", "Bamboo wind-chime screening", "Resting stone benches"],
        locationOnSite: "Central Botanical Enclave"
      },
      {
        id: "biodiversity-garden",
        name: "Botanical Garden & Zen Water Courtyard",
        category: "landscape",
        tagline: "Ecological serenity with cascading water features",
        description: "Lush micro-climate gardens featuring lotus water bodies, stepping-stone bridges, and native bird-attracting flora.",
        features: ["Naturalized lily & lotus water ponds", "Sculptural water weir fountains", "Shaded pergola reading pavilions", "Zero-pesticide organic care"],
        locationOnSite: "Central Podium"
      },
      {
        id: "jogging-track",
        name: "1-Kilometre Cushioned Jogging Track",
        category: "landscape",
        tagline: "Dedicated rubberized running loop through the estate",
        description: "Zero-vehicular interaction running loop with high-density EPDM shock-absorbing surface, mile-markers, and shaded canopy trees.",
        features: ["EPDM synthetic shock-absorbent turf", "Vehicular-free secure loop", "Hydration stations", "Calisthenics workout stops"],
        locationOnSite: "Estate Perimeter Circuit"
      }
    ]
  },
  {
    id: "children",
    title: "Children & Family",
    subtitle: "Inspiring outdoor exploration, creative play, and multi-generational harmony.",
    description: "Safe, imaginative spaces where children can freely explore physical play and parents can relax in comforting sightlines.",
    items: [
      {
        id: "adventure-play-park",
        name: "Nature-Inspired Adventure Playscape",
        category: "children",
        tagline: "Non-toxic timber play equipment and soft-fall surfaces",
        description: "Custom-crafted timber play towers, rope bridges, climbing boulders, and subterranean slides set on impact-absorbing rubberized flooring.",
        features: ["European safety-certified wooden play equipment", "EPDM soft-fall surface", "Shaded parent lounge cabanas", "Toddler-exclusive zone"],
        locationOnSite: "Podium West Garden"
      },
      {
        id: "kids-splash-pad",
        name: "Zero-Depth Aqua Splash Pad & Toddler Pool",
        category: "children",
        tagline: "Safe, joyful interactive water jets",
        description: "Zero-standing-water splash park with dancing interactive fountains, spray hoops, and shallow 1-foot heated toddler wade pool.",
        features: ["Zero-depth hazard-free surface", "Interactive water geysers", "UV-treated water filtration", "Non-slip textured pool deck"],
        locationOnSite: "Pool Deck Lower Level"
      },
      {
        id: "senior-citizen-plaza",
        name: "Senior Citizens' Shaded Pavilion & Chitchat Corner",
        category: "children",
        tagline: "Peaceful social retreat designed for elders",
        description: "Barrier-free, wheelchair accessible enclave shaded by wide-canopy trees with ergonomic seating, chess tables, and gentle morning breeze.",
        features: ["100% barrier-free wheelchair ramps", "Ergonomic back-support stone benches", "Shaded flowering arbors", "Gentle walking trails"],
        locationOnSite: "East Sanctuary Garden"
      }
    ]
  },
  {
    id: "everyday",
    title: "Everyday Infrastructure & Security",
    subtitle: "Discreet technology, convenience retail, and 7-tier security protocols.",
    description: "Intelligent engineering seamlessly supporting high-end urban living with uncompromising peace of mind.",
    items: [
      {
        id: "security-surveillance",
        name: "7-Tier Biometric & AI Security Network",
        category: "everyday",
        tagline: "Comprehensive 24/7 intelligent surveillance",
        description: "Perimeter intrusion detection, ANPR automated number plate recognition, boom barriers, and biometric elevator access.",
        features: ["AI-powered CCTV cameras", "Automated license plate recognition", "Card-controlled elevator destination dispatch", "Trained professional security vanguard"],
        locationOnSite: "Estate Gatehouse & Common Areas"
      },
      {
        id: "ev-charging-infrastructure",
        name: "Dedicated EV Charging Stations",
        category: "everyday",
        tagline: "Future-ready electric mobility infrastructure",
        description: "High-capacity fast-charging bays for electric four-wheelers and two-wheelers with smart metering and app integration.",
        features: ["Fast DC charging capability", "Pre-wired slots for individual parking bays", "Smart mobile app billing", "Renewable solar offset"],
        locationOnSite: "Multi-Level Basement Parking"
      },
      {
        id: "grand-arrival-court",
        name: "Hotel-Grade Grand Arrival Porte-Cochère",
        category: "everyday",
        tagline: "A majestic sense of arrival for residents and guests",
        description: "Spacious drop-off concourse with granite cobbles, architectural water walls, valet staging, and ambient welcoming illumination.",
        features: ["Double-height covered arrival canopy", "Architectural water curtain feature", "Valet parking assistance service", "Visitor reception lounge"],
        locationOnSite: "Main Entrance Boulevard"
      }
    ]
  }
];

export const allAmenitiesList = amenityChapters.flatMap(c => c.items);
