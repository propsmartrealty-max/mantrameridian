import type { APIRoute } from 'astro';

export const prerender = false; // Edge on-demand execution on Cloudflare Workers

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid Content-Type. Expected application/json.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      selectedResidence,
      selectedIntent,
      preferredSlot,
      landingPage,
      referrer,
      honeypot
    } = body;

    // Honeypot spam trap
    if (honeypot) {
      // Quietly succeed to fool spam bots
      return new Response(
        JSON.stringify({ success: true, message: 'Enquiry received.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Required fields validation
    if (!fullName || !phone) {
      return new Response(
        JSON.stringify({ success: false, error: 'Full name and phone number are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Edge request metadata via Cloudflare headers
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const cfCountry = request.headers.get('cf-ipcountry') || 'IN';
    const cfCity = request.headers.get('cf-ipcity') || 'Pune';
    const cfRegion = request.headers.get('cf-region') || 'Maharashtra';
    const cfTimezone = request.headers.get('cf-timezone') || 'Asia/Kolkata';
    const cfRay = request.headers.get('cf-ray') || '';

    // Sanitized Lead Payload
    const leadRecord = {
      project: 'Mantra Meridian Riverside',
      rera: 'P52100045688',
      leadId: `MMR-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      fullName: String(fullName).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      configuration: selectedResidence || 'Not Specified',
      intent: selectedIntent || 'General Presentation',
      preferredSlot: preferredSlot || 'Anytime',
      landingPage: landingPage || '/',
      referrer: referrer || 'direct',
      edgeMetadata: {
        country: cfCountry,
        city: cfCity,
        region: cfRegion,
        timezone: cfTimezone,
        cfRay: cfRay
      },
      userAgent: userAgent.substring(0, 150)
    };

    // In production, this can forward to Cloudflare D1 / KV / CRM Webhook (Salesforce, Zoho, LeadSquared, etc.)
    console.log('[LEAD RECEIVED AT CLOUDFLARE EDGE]:', JSON.stringify(leadRecord, null, 2));

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your presentation request has been registered with the Senior Meridian Concierge.',
        leadId: leadRecord.leadId
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'X-Content-Type-Options': 'nosniff'
        }
      }
    );
  } catch (error: any) {
    console.error('[EDGE ENQUIRY ERROR]:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'An unexpected error occurred while processing your request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
