import { SignJWT } from 'jose';
import { createLinkRequestSchema, type CreateLinkResponse } from './schema';

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    let requestBody;
    try {
      const json = await request.json();
      requestBody = createLinkRequestSchema.parse(json);
    } catch {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { content, expiresInHours } = requestBody;

    // Create signed JWT with content and expiration
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);
    const token = await new SignJWT({ content })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expiresAt)
      .setIssuedAt()
      .sign(SECRET);

    // Build the redirect URL
    const baseUrl =
      process.env.NEXTAUTH_URL || request.headers.get('origin') || '';
    const url = `${baseUrl}/link/${token}`;

    const response: CreateLinkResponse = {
      url,
      token,
      expiresAt: expiresAt.toISOString(),
    };

    return Response.json(response, { status: 201 });
  } catch (error) {
    console.error('Unexpected error in link creation:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
