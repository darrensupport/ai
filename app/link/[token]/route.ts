import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  try {
    // Verify and decode the JWT
    const { payload } = await jwtVerify(token, SECRET);
    const content = payload.content as string;

    if (!content) {
      redirect('/?error=link_invalid');
    }

    // Redirect to chat with the content pre-populated
    redirect(`/?query=${encodeURIComponent(content)}`);
  } catch (error) {
    // JWT verification failed (expired, invalid signature, etc.)
    console.error('Link verification failed:', error);
    redirect('/?error=link_expired');
  }
}
