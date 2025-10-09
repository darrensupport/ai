import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  // Check if user is coming from a specific action (consent or previous chat)
  const cookieStore = await cookies();
  const fromConsent = cookieStore.get('from-consent');
  const chatId = cookieStore.get('selected-chat-id');
  
  // If coming from consent flow or has a selected chat, show chat interface
  if (fromConsent?.value === 'true' || chatId?.value) {
    const id = generateUUID();
    const modelIdFromCookie = cookieStore.get('chat-model');

    if (!modelIdFromCookie) {
      return (
        <>
          <Chat
            key={id}
            id={id}
            initialMessages={[]}
            initialChatModel={DEFAULT_CHAT_MODEL}
            initialVisibilityType="private"
            isReadonly={false}
            session={session}
            autoResume={false}
          />
          <DataStreamHandler />
        </>
      );
    }

    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={modelIdFromCookie.value}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        <DataStreamHandler />
      </>
    );
  }
  
  // Otherwise, always redirect to home on first load
  redirect('/home');
}
