import { IconContainer } from './shared/IconContainer';

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-[#0A0A12] flex flex-col items-center justify-between px-6 py-12 animate-[fadeIn_0.6s_ease-in] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#7B61FF]/5 via-transparent to-[#F5A623]/5"></div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-[#F5A623] to-[#E8920A] rounded-full mb-8 shadow-[0_0_40px_rgba(245,166,35,0.5)] flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <h1 className="text-6xl tracking-[0.3em] text-[#F0F0F0] mb-4 font-serif">
          VESPER
        </h1>
        <p className="text-[#8A8A9A] text-lg mb-2">당신의 평생 투자 파트너</p>
        <p className="text-[#8A8A9A]/60 text-sm">AI와 함께하는 스마트한 투자 여정</p>

        <div className="mt-12 grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-2">
            <IconContainer size="lg" colorTheme="dark">
              <svg className="w-6 h-6 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </IconContainer>
            <span className="text-[#8A8A9A] text-xs text-center">맞춤<br/>분석</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <IconContainer size="lg" colorTheme="dark">
              <svg className="w-6 h-6 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </IconContainer>
            <span className="text-[#8A8A9A] text-xs text-center">실시간<br/>인사이트</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <IconContainer size="lg" colorTheme="dark">
              <svg className="w-6 h-6 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </IconContainer>
            <span className="text-[#8A8A9A] text-xs text-center">신뢰성<br/>검증</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-[#F5A623] to-[#E8920A] text-[#0A0A12] py-4 rounded-full shadow-[0_4px_20px_rgba(245,166,35,0.3)] hover:shadow-[0_6px_30px_rgba(245,166,35,0.5)] transition-all active:scale-95 mb-4"
        >
          시작하기
        </button>
        <p className="text-center text-[#8A8A9A] text-xs">
          계속하시면 <span className="text-[#F5A623]">서비스 약관</span> 및 <span className="text-[#F5A623]">개인정보 처리방침</span>에 동의하게 됩니다
        </p>
      </div>
    </div>
  );
}
