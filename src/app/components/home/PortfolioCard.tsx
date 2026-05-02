import { BaseCard } from '../shared/BaseCard';

interface PortfolioCardProps {
  totalValue: string;
  profitValue: string;
  profitPercentage: string;
  investedAmount: string;
  dateStr: string;
}

export function PortfolioCard({
  totalValue = '₩125,840,000',
  profitValue = '+2,340,000',
  profitPercentage = '+1.89%',
  investedAmount = '₩123.5M',
  dateStr = '24.04.23 기준'
}: Partial<PortfolioCardProps>) {
  const dateTag = <span className="text-[#8A8A9A] text-sm">{dateStr}</span>;

  return (
    <BaseCard title="내 포트폴리오" rightElement={dateTag} className="bg-gradient-to-br from-[#1A1A2E] to-[#0F0F1A] shadow-lg">
      <div className="mb-3">
        <div className="text-3xl text-[#F0F0F0] mb-1">{totalValue}</div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">{profitValue}</span>
          <span className="text-green-400 text-sm">{profitPercentage}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
        <div>
          <div className="text-[#8A8A9A] text-xs mb-1">총 투자금</div>
          <div className="text-[#F0F0F0]">{investedAmount}</div>
        </div>
        <div>
          <div className="text-[#8A8A9A] text-xs mb-1">평가손익</div>
          <div className="text-green-400">+{profitValue.replace('+', '₩')}</div>
        </div>
        <div>
          <div className="text-[#8A8A9A] text-xs mb-1">수익률</div>
          <div className="text-green-400">{profitPercentage}</div>
        </div>
      </div>
    </BaseCard>
  );
}
