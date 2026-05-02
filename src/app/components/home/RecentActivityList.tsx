import { BaseCard } from '../shared/BaseCard';
import { IconContainer } from '../shared/IconContainer';

export function RecentActivityList() {
  const moreButton = <button className="text-[#F5A623] text-sm">더보기</button>;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[#F0F0F0]">최근 활동</h3>
        {moreButton}
      </div>
      <div className="space-y-2">
        <div className="bg-[#1A1A2E] rounded-lg p-4 border border-white/5">
          <div className="flex items-center gap-3">
            <IconContainer size="sm" colorTheme="purple">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </IconContainer>
            <div>
              <div className="text-[#F0F0F0] text-sm">리포트 추천받음</div>
              <div className="text-[#8A8A9A] text-xs">2시간 전</div>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A2E] rounded-lg p-4 border border-white/5">
          <div className="flex items-center gap-3">
            <IconContainer size="sm" colorTheme="success">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </IconContainer>
            <div>
              <div className="text-[#F0F0F0] text-sm">미션 완료: 포트폴리오 점검</div>
              <div className="text-[#8A8A9A] text-xs">어제</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
