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
    answer: "Discerning homebuyers can schedule a private presentation or request the digital architectural brochure by utilizing our confidential 3-step 'Private Presentation' digital concierge on this website, or by calling our concierge line at +91 77440 09295."
  },
  {
    id: "is-meridian-good-investment",
    category: "pricing",
    question: "Is Mantra Meridian good for real estate investment in Pune?",
    answer: "Yes. Mantra Meridian Riverside represents high capital appreciation potential in West Pune due to its irreplaceable Mula river frontage, low-density 8-acre estate planning, proximity to Balewadi High Street (5 mins), and rapid transit to Hinjewadi via the upcoming Wakad bridge and PMRDA Metro Line 3."
  },
  {
    id: "what-is-the-price-of-mantra-meridian",
    category: "pricing",
    question: "What is the price of apartments at Mantra Meridian Riverside?",
    answer: "Indicative starting prices begin from approximately ₹ 85 Lakhs* for 2 BHK residences, ₹ 1.28 Cr* for 3 BHK homes, ₹ 1.85 Cr* for 3 BHK Sky Duplexes, and ₹ 2.40 Cr* for 4 BHK Grand Estates (excluding statutory taxes and registration). Detailed unit-wise cost sheets are available upon request."
  },
  {
    id: "distance-to-balewadi-high-street",
    category: "location",
    question: "How far is Mantra Meridian from Balewadi High Street?",
    answer: "Mantra Meridian is situated approximately 1.2 km (a 3 to 5-minute drive) from Balewadi High Street, offering effortless walking and vehicle access to Pune's premier dining, specialty roaster cafes, and cosmopolitan retail boulevards."
  },
  {
    id: "planned-wakad-bridge-benefit",
    category: "location",
    question: "What is the planned Balewadi–Wakad river bridge and how does it benefit residents?",
    answer: "The planned bridge across the Mula River corridor directly links Balewadi Village Road to Wakad, providing a high-speed bypass that reduces transit times to Hinjewadi IT Park and Phoenix Mall of the Millennium to under 10 minutes."
  },
  {
    id: "possession-date-mantra-meridian",
    category: "rera",
    question: "What is the official possession date for Mantra Meridian Balewadi?",
    answer: "The sanctioned completion and target handover date for Mantra Meridian Riverside is June 2028, as formally registered under MahaRERA certificate P52100045688."
  },
  {
    id: "approved-home-loan-banks",
    category: "pricing",
    question: "Which banks have approved home loans for Mantra Meridian Riverside?",
    answer: "Mantra Meridian has received formal project approvals from leading financial institutions including State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, and Bank of Baroda, offering attractive interest rates and flexible construction-linked disbursement schemes."
  },
  {
    id: "carpet-area-dimensions-breakdown",
    category: "configurations",
    question: "What are the exact RERA carpet areas for Mantra Meridian residences?",
    answer: "Sanctioned MahaRERA usable carpet areas are: 2 BHK Contemporary Homes from 785 to 845 sq.ft., 3 BHK Riverside Residences from 1,120 to 1,240 sq.ft., 3 BHK Signature Sky Duplexes from 1,580 to 1,740 sq.ft., and 4 BHK Grand Estates from 1,920 to 2,180 sq.ft."
  },
  {
    id: "comparative-luxury-edge",
    category: "overview",
    question: "How does Mantra Meridian compare with other luxury projects in Balewadi?",
    answer: "Mantra Meridian Riverside stands out as an 8-acre low-density sanctuary featuring over 75% landscaped open green areas, a dedicated 500-metre Mula river promenade, rare two-tier sky duplexes with 20ft double-height living ceilings, and a 20,000 sq.ft. clubhouse pavilion—delivering lower density and superior riparian views compared to crowded high-density towers."
  },
  {
    id: "names-permutations-meridian",
    category: "overview",
    question: "Is Mantra Riverside Balewadi the same project as Mantra Meridian Riverside?",
    answer: "Yes. Mantra Meridian Riverside is commonly searched and referred to by homebuyers and investors as Mantra Meridian, Mantra Riverside Balewadi, Meridian Riverside Balewadi, Mantra Properties Meridian, and Site Mantra Riverside. It is the flagship 8-acre riverside residential estate developed by Mantra Properties along the Mula River corridor in Balewadi, West Pune under MahaRERA P52100045688."
  },
  {
    id: "contact-sales-office-details",
    category: "location",
    question: "What is the official contact number and sales gallery address for Mantra Meridian Balewadi?",
    answer: "The official concierge and sales enquiry desk for Mantra Meridian Riverside Balewadi can be reached by phone or WhatsApp at +91 77440 09295. The on-site experience center and sales office is located at Sr. No. 45, 13, Balewadi Village Road, near Mamta Dining Hall, Balewadi, Pune 411045."
  }
];
