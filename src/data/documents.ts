export interface ProjectDocument {
  id: string;
  category: "rera" | "brochure" | "plans" | "specifications" | "legal";
  title: string;
  description: string;
  documentType: string;
  fileSize: string;
  lastUpdated: string;
  isOfficialVerification: boolean;
  downloadUrl?: string;
  externalVerificationUrl?: string;
}

export const projectDocuments: ProjectDocument[] = [
  {
    id: "rera-certificate",
    category: "rera",
    title: "MahaRERA Official Registration Certificate",
    description: "Official registration certificate issued by Maharashtra Real Estate Regulatory Authority under registration number P52100045688.",
    documentType: "Official Government PDF Certificate",
    fileSize: "1.4 MB",
    lastUpdated: "Active Registration",
    isOfficialVerification: true,
    downloadUrl: "https://www.mantraproperties.in/assets/images/properties/mantra-magnus-certificate-988224001.pdf",
    externalVerificationUrl: "https://maharera.mahaonline.gov.in/"
  },
  {
    id: "architectural-brochure",
    category: "brochure",
    title: "Meridian Master Architectural Monograph",
    description: "Comprehensive 48-page editorial monograph featuring design philosophy, riverside masterplan, tower elevations, and landscape narratives.",
    documentType: "High-Resolution Digital Monograph (PDF)",
    fileSize: "18.2 MB",
    lastUpdated: "Edition 2026",
    isOfficialVerification: false,
    downloadUrl: "#"
  },
  {
    id: "floor-plans-complete",
    category: "plans",
    title: "Complete Architectural Floor Plan Book (2, 3, 3 Duplex & 4 BHK)",
    description: "Detailed measured architectural drawings, carpet area declarations under RERA, unit orientations, and furniture zoning layouts.",
    documentType: "Architectural Drawing Portfolio (PDF)",
    fileSize: "12.6 MB",
    lastUpdated: "Verified Dimensions",
    isOfficialVerification: true,
    downloadUrl: "#"
  },
  {
    id: "material-specifications",
    category: "specifications",
    title: "Master Material Specifications & Brand Catalog",
    description: "Exhaustive technical schedule of marble selections, Schuco acoustic glazing, Hansgrohe/Grohe sanitaryware, and smart home automation infrastructure.",
    documentType: "Technical Specification Document (PDF)",
    fileSize: "4.8 MB",
    lastUpdated: "Standardised 2026",
    isOfficialVerification: false,
    downloadUrl: "#"
  },
  {
    id: "environmental-clearance",
    category: "legal",
    title: "Environmental & Riparian Buffer Clearance",
    description: "Full state environmental impact assessment and green development clearances honoring the Mula river riparian conservation buffer zone.",
    documentType: "Environmental Compliance Filing (PDF)",
    fileSize: "3.1 MB",
    lastUpdated: "Compliant & Approved",
    isOfficialVerification: true,
    downloadUrl: "#"
  },
  {
    id: "title-clearance-search",
    category: "legal",
    title: "Advocate Legal Title Search & Ownership Report",
    description: "Clear and marketable 30-year legal title search report conducted by leading Pune high-court legal counsel.",
    documentType: "Legal Title Search Report (PDF)",
    fileSize: "5.5 MB",
    lastUpdated: "Certified Title",
    isOfficialVerification: true,
    downloadUrl: "#"
  }
];
