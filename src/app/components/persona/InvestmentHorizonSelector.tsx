import { OptionButton } from '../shared/OptionButton';

export type InvestmentHorizon = 'short' | 'medium' | 'long';

interface InvestmentHorizonSelectorProps {
  selectedHorizon: InvestmentHorizon;
  onSelectHorizon: (horizon: InvestmentHorizon) => void;
}

const horizonOptions: { value: InvestmentHorizon; label: string; desc: string }[] = [
  { value: 'short', label: '단기', desc: '1년 미만' },
  { value: 'medium', label: '중기', desc: '1-5년' },
  { value: 'long', label: '장기', desc: '5년 이상' }
];

export function InvestmentHorizonSelector({ selectedHorizon, onSelectHorizon }: InvestmentHorizonSelectorProps) {
  return (
    <div>
      <label className="block text-[#F0F0F0] mb-3">투자 기간</label>
      <div className="grid grid-cols-3 gap-2">
        {horizonOptions.map((option) => (
          <OptionButton
            key={option.value}
            isSelected={selectedHorizon === option.value}
            onClick={() => onSelectHorizon(option.value)}
            title={option.label}
            description={option.desc}
            layout="vertical"
          />
        ))}
      </div>
    </div>
  );
}
