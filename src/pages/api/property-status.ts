import type { APIRoute } from 'astro';
import { projectData } from '../../data/project';
import { residencesData } from '../../data/residences';

export const prerender = false; // Cloudflare Workers Edge Runtime Execution

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const GET: APIRoute = async ({ request }) => {
  try {
    const headers = request.headers;

    // Edge Geo & PoP metadata injected by Cloudflare Edge Network
    const cfColo = headers.get('cf-ray')?.split('-')[1] || headers.get('cf-colo') || 'EDGE-POP';
    const cfRay = headers.get('cf-ray') || 'direct-worker';
    const cfCountry = headers.get('cf-ipcountry') || headers.get('cf-country') || 'IN';
    const cfCity = headers.get('cf-ipcity') || 'Pune';
    const cfRegion = headers.get('cf-region') || 'Maharashtra';
    const cfPostalCode = headers.get('cf-postal-code') || '411045';

    // Build real-time inventory configuration metadata
    const inventory = residencesData.map((res) => ({
      id: res.id,
      slug: res.slug,
      type: res.type,
      name: res.name,
      carpetArea: res.carpetAreaRange,
      priceStarting: res.priceStarting,
      bathrooms: res.bathrooms,
      balconyType: res.balconyType,
      aspect: res.aspect,
      availabilityStatus: 'IN_STOCK',
      bookingStatus: 'AVAILABLE_FOR_ALLOTMENT',
      officialUrl: `https://mantrameridianriverside.com/mantra-meridian-riverside/${res.slug}`,
    }));

    const responsePayload = {
      status: 'active',
      edgeRuntime: {
        network: 'Cloudflare Workers Edge Network',
        colo: cfColo,
        rayId: cfRay,
        clientGeo: {
          city: cfCity,
          region: cfRegion,
          country: cfCountry,
          postalCode: cfPostalCode,
        },
        timestampIso: new Date().toISOString(),
      },
      propertyIdentity: {
        name: projectData.name,
        tagline: projectData.tagline,
        developer: projectData.developer.name,
        scale: projectData.projectScale,
        towers: projectData.towers,
        floors: projectData.floors,
        openSpacePercentage: projectData.openSpacePercentage,
        siteAddress: projectData.contact.siteAddress,
      },
      compliance: {
        mahareraNumber: projectData.reraNumber,
        officialPortal: projectData.reraRegistrationUrl,
        regulatoryStatus: 'MahaRERA Registered & Sanctioned',
        projectStatus: 'Under Construction & Bookings Open',
        possessionTarget: 'December 2028 (As Per MahaRERA Specification)',
      },
      googleKnowledgeGraph: {
        kgMid: projectData.googleMapsKgId,
        kgSearchUrl: `https://www.google.com/search?kgmid=${projectData.googleMapsKgId}`,
        cid: projectData.googleMapsCid,
        mapsUrl: projectData.googleMapsUrl,
        directDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${projectData.coordinates.latitude},${projectData.coordinates.longitude}`,
        coordinates: projectData.coordinates,
        verifiedPlaceName: 'Site - Mantra Riverside',
      },
      inventoryOverview: {
        totalConfigurations: inventory.length,
        configurations: inventory,
      },
      concierge: {
        deskPhone: projectData.contact.phone,
        whatsappChannel: 'Active (Direct WhatsApp Concierge Button)',
        siteVisitBookingEndpoint: 'https://mantrameridianriverside.com/api/enquiry',
        bookingAction: 'ReserveAction',
      },
    };

    return new Response(JSON.stringify(responsePayload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'all',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to retrieve real-time property status',
        error: error?.message || 'Unknown Edge Error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};
