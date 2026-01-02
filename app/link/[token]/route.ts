import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { createDecipheriv } from 'crypto';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// AES-256-GCM decryption using AUTH_SECRET
function decrypt(encryptedData: string): string {
  const key = Buffer.from(process.env.AUTH_SECRET!).subarray(0, 32);
  const data = Buffer.from(encryptedData, 'base64url');
  const iv = data.subarray(0, 12);
  const tag = data.subarray(12, 28);
  const encrypted = data.subarray(28);
  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  return decipher.update(encrypted) + decipher.final('utf8');
}

// Get the base URL for redirects (Cloud Run uses x-forwarded-host)
function getBaseUrl(request: Request): string {
  const forwardedHost = request.headers.get('x-forwarded-host');
  return process.env.NEXTAUTH_URL || (forwardedHost ? `https://${forwardedHost}` : request.url);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const baseUrl = getBaseUrl(request);

  try {
    // Get encrypted content from Redis
    const encrypted = await redis.get<string>(`link:${token}`);

    if (!encrypted) {
      return NextResponse.redirect(new URL('/?error=link_expired', baseUrl));
    }

    // Decrypt content
    const content = decrypt(encrypted);

    // Set cookie with content and redirect to /
    // Cookie is HttpOnly, secure, and expires in 60 seconds (just enough for redirect)
    const response = NextResponse.redirect(new URL('/', baseUrl));
    response.cookies.set('shared_link_content', content, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60, // 60 seconds - just enough for the redirect
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Link retrieval failed:', error);
    return NextResponse.redirect(new URL('/?error=link_invalid', baseUrl));
  }
}
