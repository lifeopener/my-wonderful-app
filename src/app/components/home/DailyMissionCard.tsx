import { BaseCard } from '../shared/BaseCard';

export function DailyMissionCard() {
  const missionIcon = (
    <svg className="w-5 h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );

  return (
    <BaseCard title="오늘의 투자 미션" rightElement={missionIcon} className="border-l-4 border-l-[#F5A623] !border-y-white/5 !border-r-white/5">
      <p className="text-[#F0F0F0] mb-2">오늘 포트폴리오를 한 번 점검해보세요</p>
      <p className="text-[#8A8A9A] text-sm mb-3">시장 변동성이 커진 만큼, 리스크 관리가 중요합니다.</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-[#0A0A12] rounded-full h-2">
          <div className="bg-gradient-to-r from-[#F5A623] to-[#E8920A] h-2 rounded-full w-[60%]"></div>
        </div>
        <span className="text-[#8A8A9A] text-xs">60%</span>
      </div>
    </BaseCard>
  );
}
