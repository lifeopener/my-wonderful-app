import { PortfolioCard } from './home/PortfolioCard';
import { MarketStatusCard } from './home/MarketStatusCard';
import { DailyMissionCard } from './home/DailyMissionCard';
import { RecentActivityList } from './home/RecentActivityList';
import { InsightCard } from './home/InsightCard';
import { BottomNavigation } from './shared/BottomNavigation';
import { FloatingActionButton } from './shared/FloatingActionButton';

interface HomeScreenProps {
  userName: string;
  personaName: string;
  onChatClick: () => void;
  onProfileClick: () => void;
}

/**
 * @description 홈 대시보드 메인 레이아웃 컴포넌트. 포트폴리오, 시장 현황, 일일 미션 등을 렌더링합니다.
 * @ai_context Acts as a layout container. All specific UI blocks are abstracted into the `home/` directory components. Do not add raw HTML/Tailwind logic here; instead, create a new sub-component in `home/` and import it.
 */
export function HomeScreen({ userName, personaName, onChatClick, onProfileClick }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-[#0A0A12] pb-20 relative">
      <div className="px-6 pt-8 pb-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#F0F0F0] text-2xl mb-2">안녕하세요, {userName}님</h2>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#F5A623] to-[#E8920A] rounded-full"></div>
              <span className="text-[#8A8A9A]">{personaName}와 함께</span>
            </div>
          </div>
          <button className="w-10 h-10 bg-[#1A1A2E] rounded-full flex items-center justify-center border border-white/10 hover:border-[#F5A623] transition-colors">
            <svg className="w-5 h-5 text-[#F0F0F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>

        <PortfolioCard />
        <MarketStatusCard />
        <DailyMissionCard />
        <RecentActivityList />
        <InsightCard />
      </div>

      <FloatingActionButton onClick={onChatClick} />
      
      <BottomNavigation 
        activeTab="home"
        onChatClick={onChatClick}
        onProfileClick={onProfileClick}
      />
    </div>
  );
}
