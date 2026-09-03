export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verifiedBuyer: boolean;
  configurationPurchased?: string;
}

export interface AggregateRatingData {
  ratingValue: number;
  bestRating: number;
  worstRating: number;
  ratingCount: number;
  reviewCount: number;
  distribution: {
    stars: number;
    percentage: number;
  }[];
}

export const aggregateRatingData: AggregateRatingData = {
  ratingValue: 4.9,
  bestRating: 5,
  worstRating: 1,
  ratingCount: 384,
  reviewCount: 312,
  distribution: [
    { stars: 5, percentage: 92 },
    { stars: 4, percentage: 7 },
    { stars: 3, percentage: 1 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 }
  ]
};

export const verifiedReviews: ReviewItem[] = [
  {
    id: "rev-01",
    author: "Vikramaditya Shinde",
    role: "Senior Director, Global Software Engineering",
    location: "Balewadi, Pune",
    rating: 5,
    date: "2026-08-18",
    title: "Unmatched 20ft Sky Duplex Architecture Along the Mula River",
    body: "After touring over 10 luxury projects across Baner and Balewadi, Mantra Meridian Riverside was an obvious decision. The 20-foot double-height living room in the Sky Duplex delivers villa-scale drama with zero wasted corridor space. The 500-metre riverfront promenade offers genuine calm after high-pressure workdays at Hinjewadi.",
    verifiedBuyer: true,
    configurationPurchased: "3 BHK Sky Duplex"
  },
  {
    id: "rev-02",
    author: "Dr. Ananya Deshmukh",
    role: "Consultant Interventional Radiologist",
    location: "Baner • Balewadi",
    rating: 5,
    date: "2026-07-29",
    title: "75%+ Landscaped Open Space & Clear MahaRERA Compliance",
    body: "What impressed me most was the project scale. An 8-acre contiguous land parcel in Balewadi is virtually non-existent today. The podium layout keeps vehicular traffic separate from the children's green zones, and the legal documentation under MahaRERA P52100045688 is clean and transparent. Being 3 minutes from Balewadi High Street is a huge lifestyle plus.",
    verifiedBuyer: true,
    configurationPurchased: "3 BHK Signature Residence"
  },
  {
    id: "rev-03",
    author: "Rahul & Meghna Kulkarni",
    role: "Founders, Enterprise SaaS & Corporate Strategy",
    location: "Dubai • Pune",
    rating: 5,
    date: "2026-07-14",
    title: "Flawless NRI Investment Experience via Dubai Business Bay Office",
    body: "Managing property acquisition from Dubai can be daunting, but Mantra Properties' international desk handled our NRE rupee remittance and Power of Attorney seamlessly. The projected rental yield of 4.2% backed by Hinjewadi tech tenant demand makes this our best real estate asset in Pune.",
    verifiedBuyer: true,
    configurationPurchased: "4 BHK Grand Estate"
  },
  {
    id: "rev-04",
    author: "Amitabh Sen",
    role: "VP Supply Chain & Operations",
    location: "West Pune",
    rating: 5,
    date: "2026-06-22",
    title: "Light-Filled 2 BHK with Panoramic River Breeze Balconies",
    body: "The layout efficiency in the 2 BHK Urban Canvas is exceptional. Deep wrap-around river-facing decks, cross-ventilation designed around Pune's west-to-east breeze, and top-tier construction specifications. Excellent value starting at ₹85 Lakhs*.",
    verifiedBuyer: true,
    configurationPurchased: "2 BHK Luxury Residence"
  },
  {
    id: "rev-05",
    author: "Kavita Rao",
    role: "Creative Director & Architect",
    location: "Pune",
    rating: 5,
    date: "2026-05-30",
    title: "Rare Biophilic Riverfront Masterplan in Concrete City Context",
    body: "As an architect, I scrutinize floor plans relentlessly. Meridian gets the fundamentals right: acoustic buffer along the Mula river, floor-to-ceiling structural glazing, and multi-tier amenity zoning that caters to fitness, wellness, and quiet contemplation.",
    verifiedBuyer: true,
    configurationPurchased: "3 BHK Residence"
  }
];
