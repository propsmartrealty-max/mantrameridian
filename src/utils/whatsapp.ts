import { projectData } from '../data/project';

/**
 * Resolves intelligent, route-aware WhatsApp enquiry prompts tailored to user context
 */
export function getContextualWhatsAppText(pathname: string = '/'): string {
  const path = pathname.toLowerCase();
  if (path.includes('/balewadi')) {
    return "Hello Mantra Meridian Concierge, I am viewing the Balewadi Micromarket Guide and would like to receive the latest price trends, brochure, and floor plans for Mantra Meridian Riverside.";
  }
  if (path.includes('/duplex')) {
    return "Hello Mantra Meridian Concierge, I am inquiring about the 3 BHK Signature Sky Duplex with 20-ft double height ceilings at Mantra Meridian Riverside.";
  }
  if (path.includes('/penthouse')) {
    return "Hello Mantra Meridian Concierge, I am interested in the Penthouse & Sky Villa collection (4 BHK Grand Estates and Sky Duplexes) at Mantra Meridian Riverside.";
  }
  if (path.includes('/nri-desk')) {
    return "Hello Mantra Meridian NRI Desk, I am an overseas investor inquiring about foreign inward remittance, FEMA guidelines, and scheduling a live 4K virtual tour.";
  }
  if (path.includes('/price')) {
    return "Hello Mantra Meridian Concierge, I would like to receive an itemized on-road cost sheet and payment plan for Mantra Meridian Riverside.";
  }
  if (path.includes('/floor-plans')) {
    return "Hello Mantra Meridian Concierge, I would like to receive the sanctioned architectural floor plans and carpet area breakdown for Mantra Meridian Riverside.";
  }
  if (path.includes('/directions')) {
    return "Hello Mantra Meridian Concierge, I am planning to visit the Experience Centre and site office today. Please guide me with directions and parking.";
  }
  if (path.includes('/home-loan')) {
    return "Hello Mantra Meridian Banking Desk, I would like to check my home loan eligibility, APF codes, and preferred interest rates for Mantra Meridian Balewadi.";
  }
  if (path.includes('/compare')) {
    return "Hello Mantra Meridian Concierge, I am comparing Balewadi luxury residential projects and would like an objective comparative factsheet.";
  }
  if (path.includes('/construction-status')) {
    return "Hello Mantra Meridian Concierge, I would like to receive the latest structural construction report and MahaRERA architect progress certificate.";
  }
  if (path.includes('/hinjewadi')) {
    return "Hello Mantra Meridian Concierge, I am a tech professional from Hinjewadi looking for luxury residences at Mantra Meridian Balewadi.";
  }
  if (path.includes('/baner')) {
    return "Hello Mantra Meridian Concierge, I am considering upgrading from Baner to the 8-acre riverside estate at Mantra Meridian Balewadi.";
  }
  if (path.includes('/mahalunge')) {
    return "Hello Mantra Meridian Concierge, I am evaluating Mahalunge & Balewadi projects and would like details on Mantra Meridian Riverside.";
  }
  if (path.includes('/rera') || path.includes('/documents')) {
    return "Hello Mantra Meridian Concierge, I am reviewing the MahaRERA P52100045688 documents and would like to receive the verified brochure PDF.";
  }
  return projectData.contact.whatsappEnquiryText;
}

/**
 * Returns complete encoded WhatsApp URL
 */
export function getWhatsAppUrl(pathname: string = '/', customPhone?: string): string {
  const text = getContextualWhatsAppText(pathname);
  const phone = (customPhone || projectData.contact.whatsapp).replace(/[^0-9]/g, '');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
