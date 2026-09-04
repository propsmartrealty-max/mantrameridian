/**
 * CLOUDFLARE WORKERS EDGE GOOGLE OAUTH2 JWT AUTHENTICATOR
 * 
 * Uses native Web Crypto API (crypto.subtle) without any Node.js dependencies.
 * Fully compatible with Cloudflare Workers, V8 Isolates, and Edge runtimes.
 * Generates signed RS256 JWT assertions to obtain Google OAuth2 access tokens in <50ms.
 */

function pemToBinary(pem: string): ArrayBuffer {
  const cleanPem = pem
    .replace(/-----BEGIN[A-Z0-9_\s-]*(?:PRIVATE)?\s*KEY-----/gi, '')
    .replace(/-----END[A-Z0-9_\s-]*(?:PRIVATE)?\s*KEY-----/gi, '')
    .replace(/\s+/g, '');
  
  const binaryString = atob(cleanPem);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function base64UrlEncode(data: Uint8Array): string {
  let binary = '';
  const len = data.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(data[i]);
  }
  return btoa(binary)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export async function getGoogleEdgeAccessToken(
  clientEmail: string,
  privateKeyPem: string,
  scopes: string[] = ['https://www.googleapis.com/auth/indexing']
): Promise<string> {
  const binaryKey = pemToBinary(privateKeyPem);
  
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256'
    },
    false,
    ['sign']
  );

  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const payload = {
    iss: clientEmail,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const encoder = new TextEncoder();
  const encodedHeader = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(encoder.encode(JSON.stringify(payload)));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signatureBuffer = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(unsignedToken)
  );

  const signature = base64UrlEncode(new Uint8Array(signatureBuffer));
  const assertion = `${unsignedToken}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });

  const tokenData: any = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.access_token) {
    throw new Error(`Google OAuth Token Error (${tokenRes.status}): ${JSON.stringify(tokenData)}`);
  }

  return tokenData.access_token as string;
}
