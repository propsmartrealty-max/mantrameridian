export interface FAQItem {
  id: string;
  category: "overview" | "rera" | "configurations" | "amenities" | "location" | "pricing";
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "where-is-meridian-located",
    category: "overview",
    question: "Where exactly is Mantra Meridian located in Balewadi?",
    answer: "Mantra Meridian Riverside is situated on Balewadi Village Road along the scenic Mula River corridor in Balewadi, West Pune (PIN 411045). It is positioned just 3 minutes (1.2 km) from Balewadi High Street, 5 minutes from the upcoming Balewadi Metro Station, and approximately 14 minutes from Rajiv Gandhi Infotech Park, Hinjewadi."
  },
  {
    id: "what-is-rera-number",
    category: "rera",
    question: "What is the official MahaRERA registration number for Mantra Meridian?",
    answer: "Mantra Meridian Riverside is officially registered with the Maharashtra Real Estate Regulatory Authority under MahaRERA registration number P52100045688. Verified certificates and project filings can be independently inspected on the official MahaRERA portal (maharera.mahaonline.gov.in)."
  },
  {
    id: "what-configurations-available",
    category: "configurations",
    question: "What residential configurations are offered at Mantra Meridian Riverside?",
    answer: "Meridian offers four distinct residential formats: 2 Bedroom Contemporary Residences (785 – 845 sq.ft. carpet), 3 Bedroom Riverside Residences (1,120 – 1,240 sq.ft. carpet), 3 Bedroom Signature Sky Duplexes (1,580 – 1,740 sq.ft. carpet across two levels), and 4 Bedroom Grand Riverside Estates (1,920 – 2,180 sq.ft. carpet)."
  },
  {
    id: "what-makes-duplex-unique",
    category: "configurations",
    question: "What are the signature features of the 3 BHK Sky Duplexes?",
    answer: "The 3 BHK Duplexes are arranged over two complete vertical tiers featuring a dramatic 20-foot double-height living salon with structural glass curtain walls, an architectural cantilevered floating staircase, a private upper-level master sanctuary wing, and a double-height riverside sky terrace."
  },
  {
    id: "what-are-the-amenities",
    category: "amenities",
    question: "What amenities are included within the 8-acre estate?",
    answer: "Meridian features over 30 curated lifestyle amenities spread across 8 chapters, including a 20,000 sq.ft. Grand Pavilion clubhouse, temperature-controlled 25m riverside infinity lap pool, Technogym fitness club, floodlit tennis and pickleball court, glass-back squash court, 4K Dolby Atmos screening theatre, 500-metre riverside pedestrian boardwalk, children's adventure playscape, and 75%+ landscaped botanical open space."
  },
  {
    id: "connectivity-to-hinjewadi-baner",
    category: "location",
    question: "How well is Meridian connected to Baner and Hinjewadi IT Park?",
    answer: "Meridian enjoys direct arterial connectivity: Baner's commercial boulevard is just 6 minutes (2.8 km) away via Balewadi High Street, while Hinjewadi Phase 1 is accessible in approximately 14 minutes (7.5 km). The Mumbai–Bengaluru Highway (NH 48) is 4 minutes away, and the upcoming PMRDA Metro Line 3 station is 5 minutes from the estate gates."
  },
  {
    id: "who-is-the-developer",
    category: "overview",
    question: "Who is the developer behind Meridian Riverside?",
    answer: "The project is developed by Mantra Properties, one of Pune's leading and most respected real estate developers with over 17 years of excellence, delivering millions of square feet across prime residential micro-markets in Pune."
  },
  {
    id: "how-can-i-request-pricing-brochure",
    category: "pricing",
    question: "How can I obtain the detailed pricing, floor plan kit, and schedule a private visit?",
    answer: "Discerning homebuyers can schedule a private presentation or request the digital architectural brochure by utilizing our confidential 3-step 'Private Presentation' digital concierge on this website, or by calling our concierge line at +91 92281 56408."
  }
];
