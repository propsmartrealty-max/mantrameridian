export interface OfficeLocation {
  city: string;
  name: string;
  address: string;
  mapUrl: string;
}

export interface ProjectData {
  name: string;
  tagline: string;
  subtagline: string;
  locationTag: string;
  reraNumber: string;
  reraRegistrationUrl: string;
  officialPropertyUrl: string;
  googleMapsUrl: string;
  googleMapsCid: string;
  googleMapsKgId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  projectScale: string;
  openSpacePercentage: string;
  towers: string;
  floors: string;
  disclaimer: string;
  ogImage: string;
  heroSliderImages: string[];
  introImage: string;
  logoImage: string;
  developer: {
    name: string;
    legacy: string;
    description: string;
  };
  keyHighlights: Array<{
    value: string;
    label: string;
    sublabel: string;
  }>;
  contact: {
    phone: string;
    secondaryPhone: string;
    whatsapp: string;
    whatsappEnquiryText: string;
    siteAddress: string;
    uaeContact: {
      representative: string;
      phone: string;
      office: string;
    };
  };
  offices: OfficeLocation[];
}

export const projectData: ProjectData = {
  name: "Mantra Meridian Riverside",
  tagline: "Where Nature Meets Urban Sophistication",
  subtagline: "Meridian at Riverside Balewadi • 8-Acre Premium Riverside Development",
  locationTag: "Balewadi • Pune",
  reraNumber: "P52100045688",
  reraRegistrationUrl: "https://maharera.mahaonline.gov.in/",
  officialPropertyUrl: "https://www.mantraproperties.in/properties/residential/mantra-meridian",
  googleMapsUrl: "https://www.google.com/maps/place/Site+-+Mantra+Riverside/@18.5839181,73.7747366,17z/data=!4m6!3m5!1s0x3bc2b90046a5808b:0xd7087df3d2222d59!8m2!3d18.5839181!4d73.7747366!16s%2Fg%2F11x7zq3s0c",
  googleMapsCid: "15494874017770876249",
  googleMapsKgId: "/g/11x7zq3s0c",
  coordinates: {
    latitude: 18.5839181,
    longitude: 73.7747366
  },
  projectScale: "8-Acre Premium Development",
  openSpacePercentage: "75%+",
  towers: "Iconic High-Rise Towers",
  floors: "G + Podium + 28 Floors",
  disclaimer: "All the designs, images, specifications and other details are purely indicative in nature and the intended recipient should note that these are to be treated as purely provisional and informative. We reserve the right to modify / amend / alter any of the aforesaid in the best interest of the development and as per RERA regulations. The contents herein should not be construed as an offer / invitation to offer / contract. Any party desirous / interested in the project needs to enter into an Agreement to Sale. MahaRERA No. P52100045688.",
  ogImage: "https://mantrameridianriverside.com/assets/mantra-meridian-hero.webp",
  heroSliderImages: [
    "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-slider-215259293.webp",
    "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-slider-467045184.webp",
    "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-intro-317592911.webp"
  ],
  introImage: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-intro-317592911.webp",
  logoImage: "https://www.mantraproperties.in/assets/images/properties/mantra-meridian-logo-386275043.webp",
  developer: {
    name: "Mantra Properties",
    legacy: "Continuous Innovation Brings Continuous Success",
    description: "One of Pune's leading real estate innovators, crafting benchmark residential communities across West and East Pune."
  },
  keyHighlights: [
    {
      value: "08",
      label: "ACRES",
      sublabel: "Masterplanned Riverside Sanctuary"
    },
    {
      value: "02 / 03 / 04",
      label: "BEDROOMS",
      sublabel: "Expansive Contemporary Layouts"
    },
    {
      value: "03",
      label: "BHK DUPLEX",
      sublabel: "Signature Two-Level Sky Homes"
    },
    {
      value: "P52100045688",
      label: "MAHA RERA",
      sublabel: "Fully Registered & Verified"
    },
    {
      value: "30+",
      label: "AMENITIES",
      sublabel: "Curated Across 8 Wellness Chapters"
    },
    {
      value: "05 MIN",
      label: "BALEWADI HIGH ST",
      sublabel: "Prime Western Corridor Proximity"
    }
  ],
  contact: {
    phone: "+91 77440 09295",
    secondaryPhone: "+91 77440 09295",
    whatsapp: "+91 77440 09295",
    whatsappEnquiryText: "Hello Meridian Concierge, I would like to receive details, floor plans, and pricing for Mantra Meridian Riverside Balewadi.",
    siteAddress: "Sr. No.: 45, 13, Balewadi Village Rd, nr. Mamta Dining Hall, Balewadi, Pune, Maharashtra 411045",
    uaeContact: {
      representative: "International NRI Desk",
      phone: "+91 77440 09295",
      office: "403, Anantara Business Tower, Business Bay, Dubai, UAE"
    }
  },
  offices: [
    {
      city: "Pune Corporate Office",
      name: "The Metropole",
      address: "The Metropole, 3rd Floor, Next to INOX, Bund Garden Road, Camp, Pune 411001, Maharashtra, India",
      mapUrl: "https://maps.app.goo.gl/yyfYVVZjdMbgeYp37"
    },
    {
      city: "Mumbai Office",
      name: "One BKC",
      address: "1504, B-Wing, One BKC, Bandra Kurla Complex (BKC), Bandra East, Mumbai - 400 051",
      mapUrl: "https://maps.app.goo.gl/d5xrtfv6e6utBoov7"
    },
    {
      city: "Dubai Office",
      name: "Anantara Business Tower",
      address: "403, Anantara Business Tower, Business Bay, Dubai, UAE",
      mapUrl: "https://maps.app.goo.gl/8iqyEp98z5ki5JYE8"
    }
  ]
};
