import type { APIRoute } from 'astro';

export const prerender = false; // Cloudflare Workers Edge Execution

const PRIMARY_NOTIFICATION_EMAIL = 'propsmartrealty@gmail.com';

/**
 * Escapes HTML characters to prevent XSS/injection attacks in email rendering
 */
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Cloudflare Workers V8 Isolate In-Memory Sliding Window Rate Limiter
 * Operates at edge isolate speeds (< 1ms) with zero database overhead.
 */
interface RateLimitRecord {
  count: number;
  firstRequestTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientKey);

  // Evict stale records periodically
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now - val.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record) {
    rateLimitMap.set(clientKey, { count: 1, firstRequestTime: now });
    return false;
  }

  if (now - record.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientKey, { count: 1, firstRequestTime: now });
    return false;
  }

  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

/**
 * Sanitizes arbitrary string inputs: strips control characters, trims, and truncates length
 */
function sanitizeString(val: unknown, maxLen = 100): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLen);
}

/**
 * Builds an ultra-clean, mobile-responsive HTML email template optimized for Gmail
 */
function buildLeadEmailHtml(lead: {
  leadId: string;
  fullName: string;
  phone: string;
  cleanPhone: string;
  email?: string;
  configuration: string;
  intent: string;
  preferredSlot: string;
  landingPage: string;
  referrer: string;
  city: string;
  country: string;
  isNRI: boolean;
  timestamp: string;
}) {
  const safeFullName = escapeHtml(lead.fullName);
  const safePhone = escapeHtml(lead.phone);
  const safeEmail = lead.email ? escapeHtml(lead.email) : undefined;
  const safeConfig = escapeHtml(lead.configuration);
  const safeIntent = escapeHtml(lead.intent);
  const safeSlot = escapeHtml(lead.preferredSlot);
  const safeCity = escapeHtml(lead.city);
  const safeCountry = escapeHtml(lead.country);
  const safeLandingPage = escapeHtml(lead.landingPage);
  const safeLeadId = escapeHtml(lead.leadId);
  const safeTimestamp = escapeHtml(lead.timestamp);

  const whatsappUrl = `https://wa.me/91${encodeURIComponent(lead.cleanPhone)}?text=${encodeURIComponent(
    `Hello ${lead.fullName}, thank you for your interest in Mantra Meridian Riverside, Balewadi. Regarding your enquiry for ${lead.configuration}:`
  )}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0E0F13; color: #FFFFFF;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0E0F13; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #17181F; border: 1px solid #DFB75A; border-radius: 4px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1A1C24 0%, #0C0D10 100%); padding: 25px 30px; border-bottom: 2px solid #DFB75A;">
              <table width="100%">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #DFB75A; margin-bottom: 4px;">
                      HIGH-INTENT BUYER ENQUIRY
                    </div>
                    <div style="font-size: 24px; font-weight: 600; color: #FFFFFF; letter-spacing: 0.05em;">
                      Mantra Meridian Riverside
                    </div>
                    <div style="font-size: 12px; color: #C8C4B8; margin-top: 4px;">
                      Balewadi, Pune • MahaRERA: P52100045688
                    </div>
                  </td>
                  <td align="right" valign="top">
                    ${
                      lead.isNRI
                        ? '<span style="background-color: #DFB75A; color: #0C0D10; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.1em;">NRI INVESTOR LEAD</span>'
                        : '<span style="background-color: #253B25; color: #A3C9A0; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.1em;">VERIFIED INQUIRY</span>'
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 30px;">
              <table width="100%" cellpadding="8" cellspacing="0" style="font-size: 14px; border-collapse: collapse;">
                
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td width="35%" style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Lead ID</td>
                  <td style="color: #FFFFFF; font-family: monospace; font-weight: 600;">${safeLeadId}</td>
                </tr>

                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Buyer Name</td>
                  <td style="color: #FFFFFF; font-size: 16px; font-weight: 600;">${safeFullName}</td>
                </tr>

                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Phone Number</td>
                  <td>
                    <a href="tel:${safePhone}" style="color: #DFB75A; font-size: 16px; font-weight: 700; text-decoration: none;">
                      ${safePhone}
                    </a>
                  </td>
                </tr>

                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Email Address</td>
                  <td>
                    ${
                      safeEmail
                        ? `<a href="mailto:${safeEmail}" style="color: #FFFFFF; text-decoration: none;">${safeEmail}</a>`
                        : '<span style="color: #717688; font-style: italic;">Not Provided</span>'
                    }
                  </td>
                </tr>

                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Configuration</td>
                  <td style="color: #FFFFFF; font-weight: 600; font-size: 15px;">${safeConfig}</td>
                </tr>

                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Client Intent</td>
                  <td style="color: #C8C4B8;">${safeIntent}</td>
                </tr>

                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Preferred Slot</td>
                  <td style="color: #C8C4B8;">${safeSlot}</td>
                </tr>

                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Visitor Location</td>
                  <td style="color: #C8C4B8;">${safeCity}, ${safeCountry}</td>
                </tr>

                <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                  <td style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Origin Page</td>
                  <td style="color: #C8C4B8; font-family: monospace; font-size: 12px;">${safeLandingPage}</td>
                </tr>

                <tr>
                  <td style="color: #DFB75A; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Submission Time</td>
                  <td style="color: #C8C4B8; font-size: 12px;">${safeTimestamp}</td>
                </tr>

              </table>

              <!-- Instant Action Call-to-Actions -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center" style="padding-right: 8px;">
                    <a href="tel:${safePhone}" style="display: block; background-color: #DFB75A; color: #0C0D10; text-decoration: none; padding: 14px 20px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; text-align: center; border-radius: 2px;">
                      📞 Call Buyer Now
                    </a>
                  </td>
                  <td align="center" style="padding-left: 8px;">
                    <a href="${whatsappUrl}" target="_blank" style="display: block; background-color: #25D366; color: #FFFFFF; text-decoration: none; padding: 14px 20px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; text-align: center; border-radius: 2px;">
                      💬 Chat on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Legal -->
          <tr>
            <td style="background-color: #111216; padding: 15px 30px; font-size: 11px; color: #717688; text-align: center; border-top: 1px solid rgba(255,255,255,0.08);">
              This notification was generated by the Cloudflare Edge API for <a href="https://mantrameridianriverside.com" style="color: #DFB75A; text-decoration: none;">Mantra Meridian Riverside</a>. Delivered to <strong>${PRIMARY_NOTIFICATION_EMAIL}</strong>.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtimeEnv = (locals as any)?.runtime?.env || {};
    const procEnv = (globalThis as any).process?.env || {};
    const globalEnv = globalThis as any;

    const targetNotificationEmail =
      runtimeEnv.PRIMARY_NOTIFICATION_EMAIL ||
      import.meta.env.PRIMARY_NOTIFICATION_EMAIL ||
      procEnv.PRIMARY_NOTIFICATION_EMAIL ||
      PRIMARY_NOTIFICATION_EMAIL;

    const resendApiKey =
      runtimeEnv.RESEND_API_KEY ||
      import.meta.env.RESEND_API_KEY ||
      procEnv.RESEND_API_KEY ||
      globalEnv.RESEND_API_KEY;

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid Content-Type. Expected application/json.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 0. Cloudflare Workers Edge Rate Limiting: Max 5 submissions per 10 minutes per IP
    const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
    if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Rate limit exceeded: Please wait a few minutes before submitting another request or contact concierge directly via WhatsApp.'
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '600'
          }
        }
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
      return new Response(
        JSON.stringify({ success: true, message: 'Enquiry registered.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize text inputs
    const cleanFullName = sanitizeString(fullName, 80);
    const cleanRawPhone = sanitizeString(phone, 25);
    const cleanEmail = email ? sanitizeString(email, 100) : undefined;
    const cleanResidence = sanitizeString(selectedResidence, 50);
    const cleanIntent = sanitizeString(selectedIntent, 60);
    const cleanSlot = sanitizeString(preferredSlot, 60);
    const cleanLandingPage = sanitizeString(landingPage, 120);
    const cleanReferrer = sanitizeString(referrer, 120);

    // Required fields validation
    if (!cleanFullName || !cleanRawPhone) {
      return new Response(
        JSON.stringify({ success: false, error: 'Full name and phone number are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Phone number validation: extract digits, must be between 10 and 15 digits
    const rawDigits = cleanRawPhone.replace(/\D/g, '');
    if (rawDigits.length < 10 || rawDigits.length > 15) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a valid contact number (at least 10 digits).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const cleanPhone = rawDigits.slice(-10);

    // Email validation (if provided)
    if (cleanEmail) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(cleanEmail)) {
        return new Response(
          JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Edge request metadata via Cloudflare headers
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const cfCountry = request.headers.get('cf-ipcountry') || 'IN';
    const cfCity = request.headers.get('cf-ipcity') || 'Pune';
    const cfRegion = request.headers.get('cf-region') || 'Maharashtra';
    const cfRay = request.headers.get('cf-ray') || '';

    // Check NRI status
    const isNRI = ['AE', 'US', 'GB', 'SG', 'QA', 'SA', 'CA', 'AU'].includes(cfCountry.toUpperCase());

    const leadId = `MMR-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    const formattedTimestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium'
    });

    // Sanitized Lead Payload
    const leadRecord = {
      project: 'Mantra Meridian Riverside',
      rera: 'P52100045688',
      leadId,
      timestamp: formattedTimestamp,
      fullName: cleanFullName,
      phone: cleanRawPhone,
      cleanPhone,
      email: cleanEmail || undefined,
      configuration: cleanResidence || 'Not Specified',
      intent: cleanIntent || 'Private Presentation',
      preferredSlot: cleanSlot || 'Immediate Assistance',
      landingPage: cleanLandingPage || '/',
      referrer: cleanReferrer || 'direct',
      city: cfCity,
      country: cfCountry,
      region: cfRegion,
      isNRI,
      cfRay,
      userAgent: userAgent.substring(0, 120)
    };

    console.log(`[LEAD RECEIVED] Dispatching to ${PRIMARY_NOTIFICATION_EMAIL}:`, JSON.stringify(leadRecord));

    // Dispatch email notification to propsmartrealty@gmail.com
    const emailSubject = `🔥 [NEW LEAD] ${leadRecord.fullName} - ${leadRecord.configuration} | Mantra Meridian Riverside`;
    const emailHtml = buildLeadEmailHtml(leadRecord);

    const dispatchPromises: Promise<any>[] = [];

    // Dispatcher 1: FormSubmit.co AJAX Service (Direct to targetNotificationEmail)
    dispatchPromises.push(
      fetch(`https://formsubmit.co/ajax/${targetNotificationEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: 'table',
          _captcha: 'false',
          'Lead ID': leadRecord.leadId,
          'Project': 'Mantra Meridian Riverside (Balewadi, Pune)',
          'MahaRERA': 'P52100045688',
          'Client Name': leadRecord.fullName,
          'Contact Phone': leadRecord.phone,
          'Email Address': leadRecord.email || 'Not Provided',
          'Configuration Requested': leadRecord.configuration,
          'Intent': leadRecord.intent,
          'Preferred Slot': leadRecord.preferredSlot,
          'Buyer Location': `${leadRecord.city}, ${leadRecord.country} ${leadRecord.isNRI ? '(NRI Lead)' : ''}`,
          'Page URL': `https://mantrameridianriverside.com${leadRecord.landingPage}`,
          'Submitted At': leadRecord.timestamp
        })
      }).catch((err) => console.error('[FORMSUBMIT DISPATCH ERROR]:', err))
    );

    // Dispatcher 2: Cloudflare Native MailChannels API (Edge SMTP directly on Workers)
    dispatchPromises.push(
      fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: targetNotificationEmail, name: 'PropSmart Realty' }]
            }
          ],
          from: {
            email: 'leads@mantrameridianriverside.com',
            name: 'Mantra Meridian Riverside Leads'
          },
          subject: emailSubject,
          content: [
            {
              type: 'text/html',
              value: emailHtml
            }
          ]
        })
      }).catch((err) => console.error('[MAILCHANNELS DISPATCH ERROR]:', err))
    );

    // Dispatcher 3: Resend API (Activated when RESEND_API_KEY is configured in Cloudflare environment)
    if (resendApiKey) {
      dispatchPromises.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Mantra Meridian Leads <onboarding@resend.dev>',
            to: [targetNotificationEmail],
            subject: emailSubject,
            html: emailHtml
          })
        }).catch((err) => console.error('[RESEND DISPATCH ERROR]:', err))
      );
    }

    // Wait with timeout to ensure response returns in under 1.5s
    await Promise.race([
      Promise.allSettled(dispatchPromises),
      new Promise((resolve) => setTimeout(resolve, 1500))
    ]);

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
