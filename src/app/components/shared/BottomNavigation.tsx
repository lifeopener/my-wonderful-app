interface BottomNavigationProps {
  onHomeClick?: () => void;
  onChatClick: () => void;
  onProfileClick: () => void;
  activeTab?: 'home' | 'chat' | 'profile';
}

export function BottomNavigation({ onHomeClick, onChatClick, onProfileClick, activeTab = 'home' }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A2E] border-t border-white/10">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <button onClick={onHomeClick} className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-[#F5A623]' : 'text-[#8A8A9A] hover:text-[#F5A623]'}`}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
          </svg>
          <span className="text-xs">홈</span>
        </button>
        <button onClick={onChatClick} className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === 'chat' ? 'text-[#F5A623]' : 'text-[#8A8A9A] hover:text-[#F5A623]'}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-xs">채팅</span>
        </button>
        <button onClick={onProfileClick} className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-[#F5A623]' : 'text-[#8A8A9A] hover:text-[#F5A623]'}`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs">프로필</span>
        </button>
      </div>
    </nav>
  );
}
