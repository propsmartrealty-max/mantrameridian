export interface RoomDetail {
  id: string;
  name: string;
  dimensions: string;
  areaSqFt: number;
  description: string;
  coords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface OfficialFloorPlan {
  title: string;
  unitPlanCode: string;
  imageUrl: string;
  description: string;
}

export interface ResidenceConfig {
  id: string;
  slug: string;
  name: string;
  type: string;
  subtitle: string;
  carpetAreaRange: string;
  priceStarting: string;
  balconyType: string;
  bathrooms: number;
  aspect: string;
  levels: number;
  renderImage: string;
  virtualTourUrl?: string;
  overview: string;
  architecturalHighlights: string[];
  specifications: {
    flooring: string;
    doorsWindows: string;
    kitchen: string;
    bathrooms: string;
    electrical: string;
    homeAutomation: string;
  };
  rooms: RoomDetail[];
  svgFloorplan: {
    viewBox: string;
    backgroundOutline: string;
  };
  officialFloorPlans: OfficialFloorPlan[];
}

export const residencesData: ResidenceConfig[] = [
  {
    id: "2bhk",
    slug: "2-bhk",
    name: "2 Bedroom Contemporary Residence",
    type: "2 BHK",
    subtitle: "For modern homebuyers seeking efficient yet stylish spaces, thoughtfully designed 2 BHK flats in Balewadi offer the perfect combination of comfort and connectivity.",
    carpetAreaRange: "785 – 845 sq.ft.",
    priceStarting: "Price on Request",
    balconyType: "Panoramic River & Garden Deck",
    bathrooms: 2,
    aspect: "East-Facing Morning Sunlight & Podium Greens",
    levels: 1,
    renderImage: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-344980877.webp",
    overview: "Nestled in Balewadi, just steps away from the Holy River, the 2 BHK residences at Mantra Meridian Riverside optimize spatial balance and light. With seamless flow from the foyer through the open dining lounge into the deep cantilevered balcony, the space invites natural cross-ventilation and golden morning light.",
    architecturalHighlights: [
      "Zero dead-corridor spatial geometry",
      "Full-height acoustic double-glazed balcony slider",
      "Dedicated utility alcove secluded from main living area",
      "Cross-ventilated master suite with river breeze corridor",
      "Smart biometric access and smart climate pre-wiring"
    ],
    specifications: {
      flooring: "Large format 1200x600mm glazed vitrified porcelain in living, dining, and master suite; anti-skid rustic tiles on deck",
      doorsWindows: "8ft high veneered designer main door; heavy-gauge anodized aluminum sliding glass systems with mosquito mesh",
      kitchen: "Quartz stone counter with deep undermount double-bowl stainless sink, full CP fittings by Kohler / Grohe, piped gas provision",
      bathrooms: "Concealed diverters and sanitaryware by Grohe/Kohler; glass shower partition in master bath; solar hot water connection",
      electrical: "Concealed copper wiring with Schneider / Legrand modular switches, USB fast-charge points, EV charging provision in parking",
      homeAutomation: "Video door phone, smart digital door lock with fingerprint/PIN, Wi-Fi integrated touch switches for mood lighting"
    },
    rooms: [
      {
        id: "foyer",
        name: "Private Entry Vestibule",
        dimensions: "5'6\" × 6'4\"",
        areaSqFt: 35,
        description: "Intimate arrival alcove shielding internal living areas from exterior corridors.",
        coords: { x: 50, y: 150, width: 90, height: 70 }
      },
      {
        id: "living-dining",
        name: "Grand Living & Dining Lounge",
        dimensions: "21'4\" × 12'0\"",
        areaSqFt: 256,
        description: "Expansive column-free open space with continuous sightline to the landscaped deck.",
        coords: { x: 140, y: 120, width: 220, height: 180 }
      },
      {
        id: "balcony",
        name: "Cantilevered Riverside Deck",
        dimensions: "12'0\" × 6'0\"",
        areaSqFt: 72,
        description: "Deep outdoor deck engineered with seamless glass balustrade overlooking landscaped courtyards.",
        coords: { x: 360, y: 120, width: 90, height: 180 }
      },
      {
        id: "kitchen",
        name: "Modular Gourmet Kitchen & Dry Balcony",
        dimensions: "10'6\" × 8'2\"",
        areaSqFt: 86,
        description: "L-shaped preparation zone with separate service terrace for washing and utility appliances.",
        coords: { x: 140, y: 300, width: 140, height: 110 }
      },
      {
        id: "master-bedroom",
        name: "Master Suite & Private Bath",
        dimensions: "14'0\" × 12'0\"",
        areaSqFt: 168,
        description: "Serene retreat featuring wide corner glazing, walk-in wardrobe niche, and ensuite bath.",
        coords: { x: 280, y: 300, width: 170, height: 160 }
      },
      {
        id: "bedroom-2",
        name: "Guest Suite / Study",
        dimensions: "11'6\" × 11'0\"",
        areaSqFt: 126,
        description: "Flexible room configured as an executive home office or guest bedroom with garden vistas.",
        coords: { x: 50, y: 220, width: 90, height: 140 }
      }
    ],
    svgFloorplan: {
      viewBox: "0 0 500 480",
      backgroundOutline: "M 40,110 L 460,110 L 460,470 L 40,470 Z"
    },
    officialFloorPlans: [
      {
        title: "2 BHK - 1",
        unitPlanCode: "A1 - TYPICAL UNIT PLAN",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-279058082.webp",
        description: "Official sanctioned layout A1 for Tower A 2 BHK contemporary residence."
      },
      {
        title: "2 BHK",
        unitPlanCode: "A1 - TYPICAL UNIT PLAN (ALT)",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-425800430.webp",
        description: "Official architectural layout A1 standard variation."
      },
      {
        title: "2 BHK - 2",
        unitPlanCode: "A5 - TYPICAL UNIT PLAN",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-763477442.webp",
        description: "Official unit layout A5 with enhanced dining foyer and garden balcony."
      },
      {
        title: "2 BHK - 3",
        unitPlanCode: "A5 - TYPICAL UNIT PLAN (ALT)",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-506294750.webp",
        description: "Official corner layout A5 with dual aspect sunlight."
      }
    ]
  },
  {
    id: "3bhk",
    slug: "3-bhk",
    name: "3 Bedroom Riverside Residence",
    type: "3 BHK",
    subtitle: "Those looking for enhanced space and elegance will find the premium 3 BHK flats in Balewadi ideal for a refined and contemporary lifestyle.",
    carpetAreaRange: "1,120 – 1,240 sq.ft.",
    priceStarting: "Price on Request",
    balconyType: "Wraparound Dual Riverside Balconies",
    bathrooms: 3,
    aspect: "North-West River Panorama with Sunset Views",
    levels: 1,
    renderImage: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-993460122.webp",
    virtualTourUrl: "https://my.matterport.com/show/?m=GBTsK9FFEvJ",
    overview: "The 3 Bedroom Riverside Residence is curated for families desiring expansive spaces and unobstructed river views. Featuring dual balconies, three ensuite or dedicated baths, and a sprawling 28-foot living pavilion, it offers a resort-inspired lifestyle in the heart of Balewadi.",
    architecturalHighlights: [
      "28-foot panoramic living and dining expanse",
      "Dual balconies offering both river sunrise and sunset vistas",
      "Master bedroom with private river-facing balcony and walk-in dresser",
      "Engineered acoustic damping between living and private quarters",
      "Full maid/utility quarter with direct back-service entry"
    ],
    specifications: {
      flooring: "Italian marble finish vitrified slabs (1600x800mm) in living & dining; engineered wooden flooring in master suite; teak-textured deck tiles",
      doorsWindows: "8'6\" high flush doors with natural oak veneer finish; motorized acoustic glass sliding panels by Technal / Fenesta",
      kitchen: "Premium parallel quartz countertop with Hansgrohe brassware, prep-sink, and chimney exhaust provisions",
      bathrooms: "Full-height designer marble-finish tiles; wall-hung WC with concealed Geberit cisterns, Grohe thermostatic rain showers",
      electrical: "Multi-zone smart distribution panel, high-speed fiber termination, dedicated home office circuitry",
      homeAutomation: "Integrated Smart Touch Control Panel, motorized curtain tracks, automated lighting and AC climate management"
    },
    rooms: [
      {
        id: "grand-foyer",
        name: "Sculptural Entry Gallery",
        dimensions: "7'2\" × 8'6\"",
        areaSqFt: 61,
        description: "Architectural arrival gallery with backlit art wall niche and private guest coat vestibule.",
        coords: { x: 40, y: 140, width: 80, height: 100 }
      },
      {
        id: "living-dining-pavilion",
        name: "Riverfront Living & Dining Pavilion",
        dimensions: "28'0\" × 14'6\"",
        areaSqFt: 406,
        description: "Spectacular entertaining hall flooded with daylight from floor-to-ceiling river-facing windows.",
        coords: { x: 120, y: 110, width: 260, height: 180 }
      },
      {
        id: "main-deck",
        name: "Main River Observation Deck",
        dimensions: "16'0\" × 7'6\"",
        areaSqFt: 120,
        description: "Generous open-air sky deck overlooking the Mula river riparian tree canopy.",
        coords: { x: 380, y: 110, width: 90, height: 180 }
      },
      {
        id: "kitchen-utility",
        name: "Chef's Kitchen & Service Yard",
        dimensions: "14'0\" × 9'6\"",
        areaSqFt: 133,
        description: "Dual-counter layout with separate deep pantry and dedicated service utility terrace.",
        coords: { x: 120, y: 290, width: 130, height: 130 }
      },
      {
        id: "master-sanctuary",
        name: "Master Riverside Sanctuary",
        dimensions: "16'6\" × 13'6\"",
        areaSqFt: 222,
        description: "Ultra-luxurious suite featuring walk-in closet, five-fixture master bath, and private sunset terrace.",
        coords: { x: 250, y: 290, width: 160, height: 150 }
      },
      {
        id: "junior-suite",
        name: "Junior Suite Bedroom 2",
        dimensions: "13'0\" × 12'0\"",
        areaSqFt: 156,
        description: "Comfortable private bedroom with attached bath and direct view towards the podium gardens.",
        coords: { x: 40, y: 240, width: 80, height: 180 }
      },
      {
        id: "bedroom-3",
        name: "Children's / Guest Chamber",
        dimensions: "12'0\" × 11'6\"",
        areaSqFt: 138,
        description: "Multi-functional suite designed for family members or visiting guests.",
        coords: { x: 410, y: 290, width: 60, height: 150 }
      }
    ],
    svgFloorplan: {
      viewBox: "0 0 520 480",
      backgroundOutline: "M 30,100 L 480,100 L 480,460 L 30,460 Z"
    },
    officialFloorPlans: [
      {
        title: "3 BHK",
        unitPlanCode: "A4 - TYPICAL UNIT PLAN",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-270942215.webp",
        description: "Official sanctioned 3 BHK layout A4 featuring dual balconies and riverfront salon."
      },
      {
        title: "3 BHK - 1",
        unitPlanCode: "A4 - TYPICAL UNIT PLAN (ALT)",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-668100051.webp",
        description: "Official 3 BHK layout A4 orientation variant."
      },
      {
        title: "3 BHK - 2",
        unitPlanCode: "A5 - TYPICAL UNIT PLAN",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-634039557.webp",
        description: "Official 3 BHK layout A5 with expanded master dressing suite."
      }
    ]
  },
  {
    id: "3bhk-duplex",
    slug: "3-bhk-duplex",
    name: "3 Bedroom Signature Sky Duplex",
    type: "3 BHK Duplex",
    subtitle: "Two architectural levels. Double-height riverside volume. One extraordinary lifestyle.",
    carpetAreaRange: "1,580 – 1,740 sq.ft.",
    priceStarting: "Price on Request",
    balconyType: "Double-Height Sky Terrace & Master Deck",
    bathrooms: 4,
    aspect: "Unobstructed 270° Riverfront & Skyline Horizon",
    levels: 2,
    renderImage: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-475996847.webp",
    virtualTourUrl: "https://www.youtube.com/embed/6VhVRl7ycds?si=PpcHSihidvFD07g7",
    overview: "Exclusive 3 BHK duplex apartments redefining luxury living in Balewadi. Arranged over two grand vertical tiers connected by an architectural open-riser cantilevered staircase, it offers a monumental 20-foot double-height living void that creates an unmatched feeling of light, openness, and distinction.",
    architecturalHighlights: [
      "20-foot double-height living room glass curtain wall",
      "Architectural floating staircase with frameless glass banister",
      "Upper-level private family lounge overlooking the living void",
      "Master suite occupying the entire upper river-facing wing",
      "Private double-height sky garden terrace"
    ],
    specifications: {
      flooring: "Imported Statuario marble in lower level living & foyer; brushed herringbone hardwood in upper master floor; composite timber deck flooring",
      doorsWindows: "Custom 9ft pivot front door in smoked walnut; structural silicone curtain glazing with motorized solar louvers",
      kitchen: "Island kitchen configuration with Italian quartz prep surfaces and provisions for wine cooler & built-in appliances",
      bathrooms: "Custom freestanding soaking tub in master bath overlooking river; Dornbracht / Grohe brushed brass fittings",
      electrical: "Complete smart Lutron-compatible lighting automation, multi-room acoustic pre-wiring, EV fast-charger bundle",
      homeAutomation: "Full home automation hub control with iPad console, motorized double-height shades, biometric door access"
    },
    rooms: [
      {
        id: "double-height-living",
        name: "Double-Height Grand Living Void",
        dimensions: "24'0\" × 18'0\" (20ft Ceiling)",
        areaSqFt: 432,
        description: "Monumental living volume with two-storey glass façade opening directly to the river sky.",
        coords: { x: 120, y: 100, width: 240, height: 190 }
      },
      {
        id: "sky-terrace",
        name: "Double-Height Sky Terrace",
        dimensions: "18'0\" × 8'0\"",
        areaSqFt: 144,
        description: "Al fresco living zone with vertical greenery trellis and 180° river views.",
        coords: { x: 360, y: 100, width: 100, height: 190 }
      },
      {
        id: "dining-kitchen",
        name: "Formal Dining & Island Kitchen",
        dimensions: "20'0\" × 12'0\"",
        areaSqFt: 240,
        description: "Seamless culinary zone with central island bar and adjacent preparation larder.",
        coords: { x: 120, y: 290, width: 160, height: 140 }
      },
      {
        id: "lower-suite",
        name: "Lower Level Guest Suite",
        dimensions: "14'0\" × 12'6\"",
        areaSqFt: 175,
        description: "Private ensuite bedroom on the lower floor ideal for senior parents or visiting guests.",
        coords: { x: 280, y: 290, width: 140, height: 140 }
      },
      {
        id: "staircase-foyer",
        name: "Cantilevered Floating Stair & Gallery",
        dimensions: "12'0\" × 10'0\"",
        areaSqFt: 120,
        description: "Centerpiece architectural stair linking the lower social zone with upper private suites.",
        coords: { x: 40, y: 100, width: 80, height: 190 }
      },
      {
        id: "upper-master-pavilion",
        name: "Upper Level Master Penthouse Wing",
        dimensions: "22'0\" × 15'0\"",
        areaSqFt: 330,
        description: "Upper floor master sanctuary with private bridge, expansive walk-in boutique, and spa bath.",
        coords: { x: 40, y: 290, width: 80, height: 140 }
      }
    ],
    svgFloorplan: {
      viewBox: "0 0 500 480",
      backgroundOutline: "M 30,90 L 470,90 L 470,450 L 30,450 Z"
    },
    officialFloorPlans: [
      {
        title: "3 BHK Duplex - Lower Level",
        unitPlanCode: "A2 A3 - TYPICAL UNIT PLAN",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-371620990.webp",
        description: "Official Lower Level layout showing double-height living salon, kitchen, and guest suite."
      },
      {
        title: "3 BHK Duplex - Upper Level",
        unitPlanCode: "A2 A3 - TYPICAL UNIT PLAN",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-760657828.webp",
        description: "Official Upper Level layout with private master sanctuary bridge, walk-in boutique, and family lounge."
      }
    ]
  },
  {
    id: "4bhk",
    slug: "4-bhk",
    name: "4 Bedroom Grand Riverside Estate",
    type: "4 BHK",
    subtitle: "For those who desire expansive luxury living, the exclusive 4 BHK flats in Balewadi provide grand layouts complemented by a serene riverside ambience.",
    carpetAreaRange: "1,920 – 2,180 sq.ft.",
    priceStarting: "Price on Request",
    balconyType: "Wrap-around Triple Decks & Private Sunset Lounge",
    bathrooms: 5,
    aspect: "Corner 3-Sided Open River & Hill Views",
    levels: 1,
    renderImage: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-gallery-738772119.webp",
    virtualTourUrl: "https://www.youtube.com/embed/6hsoYHelVXg?si=HBbZ9of8vVROszQx",
    overview: "Crafted for connoisseurs of fine architecture, the 4 Bedroom Grand Estate represents the most palatial single-level home at Meridian. Featuring four expansive ensuite bedrooms, separate staff quarters with dedicated service entrance, and an astonishing 34-foot wide riverfront hall, it redefines luxury in West Pune.",
    architecturalHighlights: [
      "Sprawling 34-foot wide riverfront salon with 10ft clear finished ceiling",
      "Private lift lobby arrival directly into residence",
      "Four grand suites, each with dedicated ensuite baths and walk-in dressing",
      "Independent staff quarters with private washroom and service entryway",
      "Triple exposure: East sunrise, North river, and West sunset"
    ],
    specifications: {
      flooring: "Imported Italian Botticino / Armani Grey marble slabs across all social spaces; herringbone hardwood in all suites; non-skid teak decking",
      doorsWindows: "Grand 9ft acoustic pivot entry door; floor-to-ceiling Schuco / Reynaers aluminum curtain walls with low-E solar glass",
      kitchen: "Show kitchen with central marble island plus concealed dirty-prep scullery with separate exhaust and sink",
      bathrooms: "Custom bookmatched Italian marble feature walls; Hansgrohe Axor / Kohler Veil smart sanitaries; private Jacuzzi bath in master",
      electrical: "High-capacity 3-phase redundant electrical setup with automated circuit isolation and EV high-speed wallbox",
      homeAutomation: "Comprehensive Control4 / Savant home automation controlling lighting, climate, multi-zone Bose audio, and security"
    },
    rooms: [
      {
        id: "private-lift-lobby",
        name: "Private Elevator Vestibule",
        dimensions: "9'0\" × 8'0\"",
        areaSqFt: 72,
        description: "Exclusive keycard-operated direct elevator arrival opening into private home gallery.",
        coords: { x: 30, y: 100, width: 80, height: 110 }
      },
      {
        id: "grand-salon",
        name: "Grand Riverfront Salon & Formal Dining",
        dimensions: "34'0\" × 16'0\"",
        areaSqFt: 544,
        description: "Monumental salon spanning the entire frontage with uninterrupted river vistas.",
        coords: { x: 110, y: 90, width: 280, height: 190 }
      },
      {
        id: "wrap-terrace",
        name: "Panoramic Riverside Lanai",
        dimensions: "24'0\" × 8'0\"",
        areaSqFt: 192,
        description: "Deep al fresco entertaining terrace with integrated planter beds and glass railings.",
        coords: { x: 390, y: 90, width: 90, height: 190 }
      },
      {
        id: "master-presidential",
        name: "Presidential Master Suite",
        dimensions: "20'0\" × 16'0\"",
        areaSqFt: 320,
        description: "Corner sanctuary with dual dressers, five-fixture spa bath, and private sunset deck.",
        coords: { x: 260, y: 280, width: 170, height: 160 }
      },
      {
        id: "suite-2",
        name: "Riverside Suite 2",
        dimensions: "16'0\" × 13'0\"",
        areaSqFt: 208,
        description: "Secondary master suite with river-facing picture windows and private ensuite.",
        coords: { x: 130, y: 280, width: 130, height: 160 }
      },
      {
        id: "suite-3",
        name: "Garden Suite 3",
        dimensions: "14'6\" × 13'0\"",
        areaSqFt: 188,
        description: "Spacious private bedroom overlooking the lush central podium and reflection pools.",
        coords: { x: 30, y: 210, width: 80, height: 140 }
      },
      {
        id: "suite-4-staff",
        name: "Family Lounge & Staff Suite",
        dimensions: "16'0\" × 10'0\"",
        areaSqFt: 160,
        description: "Private family multimedia lounge plus discrete staff room with private back access.",
        coords: { x: 30, y: 350, width: 100, height: 110 }
      }
    ],
    svgFloorplan: {
      viewBox: "0 0 520 490",
      backgroundOutline: "M 20,80 L 490,80 L 490,480 L 20,480 Z"
    },
    officialFloorPlans: [
      {
        title: "4 BHK",
        unitPlanCode: "A6 - TYPICAL UNIT PLAN",
        imageUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-floor-plan-789654719.webp",
        description: "Official sanctioned 4 BHK grand layout A6 with private elevator lobby and staff quarters."
      }
    ]
  }
];

export const allOfficialFloorPlans = residencesData.flatMap(r => 
  r.officialFloorPlans.map(fp => ({ ...fp, residenceType: r.type, slug: r.slug }))
);
