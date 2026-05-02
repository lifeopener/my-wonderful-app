import { B2BCurationCard } from './B2BCurationCard';

interface ToolInvocation {
  title: string;
  category: string;
  url: string;
  description?: string;
}

interface ChatMessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: ToolInvocation[];
}

export function ChatMessageBubble({ role, content, toolInvocations }: ChatMessageBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-[#F5A623] text-[#0A0A12] px-4 py-3 rounded-[20px] rounded-br-sm max-w-[70%]">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[70%]">
        <div className="bg-[#1A1A2E] text-[#F0F0F0] px-4 py-3 rounded-[20px] rounded-bl-sm">
          <div className="whitespace-pre-wrap">
            {content.split('**').map((part, i) =>
              i % 2 === 0 ? part : <strong key={i}>{part}</strong>
            )}
          </div>
        </div>
        {toolInvocations && toolInvocations.length > 0 && (
          <div className="flex gap-3 overflow-x-auto mt-3 pb-2">
            {toolInvocations.map((tool, index) => (
              <B2BCurationCard key={index} {...tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
