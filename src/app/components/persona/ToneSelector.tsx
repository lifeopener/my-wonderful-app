import { OptionButton } from '../shared/OptionButton';

interface TonePreset {
  label: string;
  icon: string;
  desc: string;
}

const tonePresets: TonePreset[] = [
  { label: '따뜻하고 친근한', icon: '😊', desc: '친구처럼 편하게 대화해요' },
  { label: '전문적이고 신중한', icon: '🎯', desc: '정확한 분석과 조언을 제공해요' },
  { label: '활발하고 격려하는', icon: '🌟', desc: '긍정적으로 동기부여해요' },
  { label: '차분하고 논리적인', icon: '📊', desc: '데이터 기반으로 설명해요' }
];

interface ToneSelectorProps {
  selectedTone: string;
  onSelectTone: (tone: string) => void;
}

export function ToneSelector({ selectedTone, onSelectTone }: ToneSelectorProps) {
  return (
    <div>
      <label className="block text-[#F0F0F0] mb-3">대화 스타일 선택</label>
      <div className="grid grid-cols-2 gap-3">
        {tonePresets.map((preset) => (
          <OptionButton
            key={preset.label}
            isSelected={selectedTone === preset.label}
            onClick={() => onSelectTone(preset.label)}
            title={preset.label}
            description={preset.desc}
            icon={preset.icon}
            layout="vertical"
          />
        ))}
      </div>
    </div>
  );
}
