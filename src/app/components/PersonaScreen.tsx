import { useState } from 'react';
import { ToneSelector } from './persona/ToneSelector';
import { RiskLevelSelector, RiskLevel } from './persona/RiskLevelSelector';
import { InvestmentHorizonSelector, InvestmentHorizon } from './persona/InvestmentHorizonSelector';

interface PersonaScreenProps {
  onBack: () => void;
  onSave: (data: { name: string; tone: string; goal: string }) => void;
}

export function PersonaScreen({ onBack, onSave }: PersonaScreenProps) {
  const [name, setName] = useState('베스퍼');
  const [tone, setTone] = useState('따뜻하고 친근한');
  const [goal, setGoal] = useState('');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('moderate');
  const [investmentHorizon, setInvestmentHorizon] = useState<InvestmentHorizon>('long');

  const handleSave = () => {
    onSave({ name, tone, goal });
    onBack();
  };

  return (
    <div className="min-h-screen bg-[#0A0A12] pb-20 overflow-y-auto">
      <header className="bg-[#1A1A2E] px-6 py-4 flex items-center gap-3 border-b border-white/10 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="text-[#F0F0F0] hover:text-[#F5A623] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-[#F0F0F0]">나만의 파트너 만들기</h2>
      </header>

      <div className="px-6 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[#F5A623] to-[#E8920A] rounded-full flex items-center justify-center mb-3 cursor-pointer hover:shadow-[0_4px_20px_rgba(245,166,35,0.4)] transition-shadow">
            <svg className="w-10 h-10 text-[#0A0A12]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-[#8A8A9A] text-sm">아바타 이미지 선택</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[#F0F0F0] mb-2">파트너 이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1A1A2E] text-[#F0F0F0] px-4 py-3 rounded-lg border border-white/10 focus:border-[#F5A623] focus:outline-none"
              placeholder="예: 베스퍼"
            />
          </div>

          <ToneSelector selectedTone={tone} onSelectTone={setTone} />
          
          <RiskLevelSelector selectedRisk={riskLevel} onSelectRisk={setRiskLevel} />
          
          <InvestmentHorizonSelector selectedHorizon={investmentHorizon} onSelectHorizon={setInvestmentHorizon} />

          <div>
            <label className="block text-[#F0F0F0] mb-2">나의 투자 목표</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={4}
              className="w-full bg-[#1A1A2E] text-[#F0F0F0] px-4 py-3 rounded-lg border border-white/10 focus:border-[#F5A623] focus:outline-none resize-none"
              placeholder="예: 5년 후 내 집 마련을 위한 종자돈 1억 모으기"
            />
          </div>

          <div className="bg-gradient-to-r from-[#7B61FF]/10 to-[#F5A623]/10 rounded-lg p-4 border border-[#7B61FF]/20">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <div className="flex-1">
                <div className="text-[#F0F0F0] text-sm mb-1">AI 파트너 팁</div>
                <div className="text-[#8A8A9A] text-xs">구체적인 목표를 설정할수록 더 맞춤화된 투자 조언을 받을 수 있어요.</div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-[#F5A623] to-[#E8920A] text-[#0A0A12] py-4 rounded-full mt-8 shadow-[0_4px_20px_rgba(245,166,35,0.3)] hover:shadow-[0_6px_30px_rgba(245,166,35,0.5)] transition-all active:scale-95"
        >
          파트너 저장하기
        </button>
      </div>
    </div>
  );
}
