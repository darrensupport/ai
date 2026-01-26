import { cookies } from "next/headers";
import { Suspense } from "react";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";

const DIFY_PROMPT_ID = "dify-rule-ver5";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-dvh" />}>
      <NewDifyChatPage />
    </Suspense>
  );
}

async function NewDifyChatPage() {
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");
  const id = generateUUID();

  const chatProps = {
    autoResume: false,
    id,
    initialMessages: [],
    initialVisibilityType: "private" as const,
    isReadonly: false,
    systemPromptId: DIFY_PROMPT_ID,
    chatPathPrefix: "/dify/chat",
    newChatPath: "/dify",
    inputPlaceholder: "Describe the workflow you want to build...",
  };

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat {...chatProps} initialChatModel={DEFAULT_CHAT_MODEL} key={id} />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        {...chatProps}
        initialChatModel={modelIdFromCookie.value}
        key={id}
      />
      <DataStreamHandler />
    </>
  );
}
