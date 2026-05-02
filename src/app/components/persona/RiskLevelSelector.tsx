import { OptionButton } from '../shared/OptionButton';

export type RiskLevel = 'conservative' | 'moderate' | 'aggressive';

interface RiskLevelSelectorProps {
  selectedRisk: RiskLevel;
  onSelectRisk: (risk: RiskLevel) => void;
}

const riskOptions: { value: RiskLevel; label: string; desc: string; icon: string }[] = [
  { value: 'conservative', label: '안정형', desc: '원금 보존을 우선시해요', icon: '🛡️' },
  { value: 'moderate', label: '중립형', desc: '적절한 위험과 수익을 추구해요', icon: '⚖️' },
  { value: 'aggressive', label: '공격형', desc: '높은 수익을 위해 위험을 감수해요', icon: '🚀' }
];

export function RiskLevelSelector({ selectedRisk, onSelectRisk }: RiskLevelSelectorProps) {
  const checkIcon = (
    <svg className="w-5 h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
    </svg>
  );

  return (
    <div>
      <label className="block text-[#F0F0F0] mb-3">투자 성향</label>
      <div className="space-y-2">
        {riskOptions.map((option) => (
          <OptionButton
            key={option.value}
            isSelected={selectedRisk === option.value}
            onClick={() => onSelectRisk(option.value)}
            title={option.label}
            description={option.desc}
            icon={option.icon}
            layout="horizontal"
            rightElement={selectedRisk === option.value ? checkIcon : null}
          />
        ))}
      </div>
    </div>
  );
}
