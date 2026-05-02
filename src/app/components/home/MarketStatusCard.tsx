import { BaseCard } from '../shared/BaseCard';

export function MarketStatusCard() {
  const rightTag = <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs">경계</span>;

  return (
    <BaseCard title="오늘의 시장 분위기" rightElement={rightTag}>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0A0A12] rounded-lg p-3">
          <div className="text-[#8A8A9A] text-xs mb-1">VIX 지수</div>
          <div className="text-2xl text-[#F0F0F0]">22.4</div>
          <div className="text-orange-400 text-xs mt-1">+3.2%</div>
        </div>
        <div className="bg-[#0A0A12] rounded-lg p-3">
          <div className="text-[#8A8A9A] text-xs mb-1">공포 탐욕 지수</div>
          <div className="text-2xl text-[#F0F0F0]">42</div>
          <div className="text-[#8A8A9A] text-xs mt-1">중립</div>
        </div>
      </div>
    </BaseCard>
  );
}
