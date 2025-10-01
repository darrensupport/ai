'use client';

import type { ChatMessage, Attachment } from '@/lib/types';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';
import type { Dispatch, SetStateAction } from 'react';
import { MultimodalInput } from './multimodal-input';

interface BenefitApplicationsLandingProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  isReadonly: boolean;
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
  selectedVisibilityType: VisibilityType;
  status: UseChatHelpers<ChatMessage>['status'];
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: ChatMessage[];
  setMessages: UseChatHelpers<ChatMessage>['setMessages'];
}

export function BenefitApplicationsLanding({
  input,
  setInput,
  isReadonly,
  chatId,
  sendMessage,
  selectedVisibilityType,
  status,
  stop,
  attachments,
  setAttachments,
  messages,
  setMessages,
}: BenefitApplicationsLandingProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-chat-background">
      <div className="max-w-4xl w-full text-left">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-purple-900 dark:text-purple-100 mb-16 leading-tight">
          Get started on
          <br />
          benefit applications
        </h1>

        {/* Question */}
        <p className="text-2xl text-gray-800 dark:text-gray-200 mb-4">
          What program would you like to apply for?
        </p>

        {/* Input Form */}
        <div className="mb-8 max-w-4xl mx-auto">
          <MultimodalInput
            chatId={chatId}
            input={input}
            setInput={setInput}
            status={status}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            sendMessage={sendMessage}
            selectedVisibilityType={selectedVisibilityType}
          />
        </div>

        {/* Watermark */}
        <div className="absolute bottom-4 right-4 text-sm text-gray-500 dark:text-gray-400">
          image
        </div>
      </div>
    </div>
  );
}
