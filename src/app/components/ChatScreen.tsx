import { useState, useRef, useEffect } from 'react';
import { ChatMessageBubble } from './ChatMessageBubble';
import { LoadingSpinner } from './LoadingSpinner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  toolInvocations?: Array<{
    title: string;
    category: string;
    url: string;
    description?: string;
  }>;
}

interface ChatScreenProps {
  personaName: string;
  onBack: () => void;
}

const initialMessages: Message[] = [
  {
    role: 'user',
    content: '오늘 시장이 많이 떨어졌는데 어떻게 생각해?'
  },
  {
    role: 'assistant',
    content: '지금 VIX가 22를 넘어서 시장이 꽤 불안한 상황이에요. **하지만 장기 관점에서 보면 지금이 오히려 기회일 수 있어요.** 아래 리포트가 도움이 될 거예요:',
    toolInvocations: [
      {
        title: '2024 하반기 포트폴리오 리밸런싱 가이드',
        category: '투자 교육',
        url: 'https://example.com',
        description: '시장 변동성이 높을 때 포트폴리오를 재조정하는 방법'
      }
    ]
  }
];

export function ChatScreen({ personaName, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        role: 'assistant',
        content: '네, 좋은 질문이에요. 시장 상황을 면밀히 분석해보니 **장기적인 관점에서 접근하는 것이 중요**합니다. 지금은 변동성이 크지만, 분산 투자와 꾸준한 모니터링이 핵심이에요.'
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A12] flex flex-col">
      <header className="bg-[#1A1A2E] px-6 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-[#F0F0F0] hover:text-[#F5A623] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#F5A623] to-[#E8920A] rounded-full"></div>
            <div>
              <div className="text-[#F0F0F0]">{personaName}</div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[#8A8A9A] text-xs">온라인</span>
              </div>
            </div>
          </div>
        </div>
        <button className="text-[#8A8A9A] hover:text-[#F0F0F0] transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map((message, index) => (
          <ChatMessageBubble key={index} {...message} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-[#1A1A2E] px-4 py-3 rounded-[20px] rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>
                <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-[pulse_1s_ease-in-out_0.2s_infinite]"></div>
                <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-[pulse_1s_ease-in-out_0.4s_infinite]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-[#1A1A2E] px-6 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="베스퍼에게 말해보세요..."
            className="flex-1 bg-[#0A0A12] text-[#F0F0F0] px-4 py-3 rounded-full border border-white/10 focus:border-[#F5A623] focus:outline-none placeholder:text-[#8A8A9A]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 bg-[#F5A623] rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E8920A] transition-colors active:scale-95"
          >
            <svg className="w-5 h-5 text-[#0A0A12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
