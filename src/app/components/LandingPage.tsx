import { useState, useEffect, useRef } from 'react';
import heroImage from '../../assets/vesper_hero_mockup.png';

interface LandingPageProps {
  onEnterApp: () => void;
}

/* ── 카운트업 애니메이션 훅 ── */
function useCountUp(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [started, target, duration]);

  return { count, ref };
}

/* ── 스크롤 페이드인 훅 ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ── CTA 버튼 ── */
function CTAButton({ onClick, size = 'lg' }: { onClick: () => void; size?: 'lg' | 'md' }) {
  const base = size === 'lg'
    ? 'px-10 py-4 text-lg'
    : 'px-8 py-3 text-base';
  return (
    <button
      id="cta-primary"
      onClick={onClick}
      className={`${base} bg-gradient-to-r from-[#F5A623] to-[#E8920A] text-[#0A0A12] font-semibold rounded-full shadow-[0_4px_30px_rgba(245,166,35,0.35)] hover:shadow-[0_6px_40px_rgba(245,166,35,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer`}
    >
      지금 무료로 시작하기
    </button>
  );
}

/* ── 타이핑 데모 ── */
function TypingDemo() {
  const lines = [
    { role: 'user' as const, text: '오늘 시장이 많이 떨어졌는데 어떻게 해야 할까?' },
    { role: 'ai' as const, text: 'VIX 지수가 24.3으로 상승했어요. 하지만 민준님의 포트폴리오는 분산이 잘 되어 있어서 지금은 관망이 최선이에요. 제가 실시간으로 모니터링 할게요 💛' },
  ];
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [phase, setPhase] = useState<'typing-user' | 'pause' | 'typing-ai' | 'done'>('typing-user');

  useEffect(() => {
    if (phase === 'typing-user') {
      const full = lines[0].text;
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTypedText(full.slice(0, i));
        if (i >= full.length) { clearInterval(id); setVisibleLines(1); setPhase('pause'); }
      }, 40);
      return () => clearInterval(id);
    }
    if (phase === 'pause') {
      const id = setTimeout(() => { setPhase('typing-ai'); setTypedText(''); }, 800);
      return () => clearTimeout(id);
    }
    if (phase === 'typing-ai') {
      const full = lines[1].text;
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTypedText(full.slice(0, i));
        if (i >= full.length) { clearInterval(id); setVisibleLines(2); setPhase('done'); }
      }, 20);
      return () => clearInterval(id);
    }
  }, [phase]);

  return (
    <div className="bg-[#0D0D1A] rounded-2xl border border-white/10 p-5 max-w-md mx-auto shadow-2xl">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-[#F5A623] animate-pulse" />
        <span className="text-xs text-[#8A8A9A]">베스퍼 · 온라인</span>
      </div>
      <div className="space-y-3 min-h-[140px]">
        {/* 유저 메시지 */}
        {(phase !== 'typing-user' || typedText) && (
          <div className="flex justify-end">
            <div className="bg-[#F5A623]/15 text-[#F0F0F0] text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%]">
              {visibleLines >= 1 ? lines[0].text : typedText}
              {phase === 'typing-user' && <span className="animate-pulse">|</span>}
            </div>
          </div>
        )}
        {/* AI 메시지 */}
        {(phase === 'typing-ai' || phase === 'done') && (
          <div className="flex justify-start">
            <div className="bg-[#1A1A2E] text-[#F0F0F0] text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
              {visibleLines >= 2 ? lines[1].text : typedText}
              {phase === 'typing-ai' && <span className="animate-pulse">|</span>}
            </div>
          </div>
        )}
        {phase === 'pause' && (
          <div className="flex justify-start">
            <div className="bg-[#1A1A2E] px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   메인 랜딩페이지
   ══════════════════════════════════════════ */
export function LandingPage({ onEnterApp }: LandingPageProps) {
  const [navSolid, setNavSolid] = useState(false);
  const users = useCountUp(12847, 2200);
  const satisfaction = useCountUp(97, 2000);
  const sessions = useCountUp(384000, 2500);

  useEffect(() => {
    const handleScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A12] text-[#F0F0F0] overflow-x-hidden">
      {/* ─── 네비게이션 ─── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${navSolid ? 'bg-[#0A0A12]/95 backdrop-blur-lg border-b border-white/5 shadow-lg' : 'bg-transparent'}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#F5A623] to-[#E8920A] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,166,35,0.3)]">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="text-xl font-serif tracking-[0.15em]">VESPER</span>
          </div>
          <button
            onClick={onEnterApp}
            className="px-5 py-2 text-sm border border-[#F5A623]/40 text-[#F5A623] rounded-full hover:bg-[#F5A623]/10 transition-all cursor-pointer"
          >
            앱 시작하기
          </button>
        </div>
      </nav>

      {/* ─── ① 히어로 섹션 ─── */}
      <section id="hero" className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7B61FF]/5 via-transparent to-[#F5A623]/5" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#F5A623]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#7B61FF]/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F5A623]/10 border border-[#F5A623]/20 rounded-full text-sm text-[#F5A623]">
              <span className="w-2 h-2 bg-[#F5A623] rounded-full animate-pulse" />
              AI 투자 파트너 · 지금 무료 체험
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              투자의 외로움,<br />
              <span className="bg-gradient-to-r from-[#F5A623] to-[#FFD700] bg-clip-text text-transparent">
                이제 베스퍼가 함께합니다
              </span>
            </h1>
            <p className="text-lg text-[#8A8A9A] leading-relaxed max-w-lg">
              당신의 투자 성향을 학습하고, 위기의 순간엔 이성을 지켜주며,
              매일 실질적인 인사이트로 꿈의 실현을 함께 이끌어가는 AI 투자 동반자.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <CTAButton onClick={onEnterApp} />
              <a
                href="#demo"
                className="px-8 py-4 text-lg border border-white/10 text-[#F0F0F0] rounded-full hover:border-[#F5A623]/40 hover:bg-white/5 transition-all"
              >
                데모 보기 ↓
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-[#F5A623]/20 to-[#7B61FF]/20 rounded-full blur-[80px]" />
              <img
                src={heroImage}
                alt="Vesper AI 앱 화면"
                className="relative z-10 w-full max-w-sm rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── ③ 신뢰 지표 (Social Proof) ─── */}
      <FadeSection>
        <section className="py-16 border-y border-white/5">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center" ref={users.ref}>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-[#F5A623]">{users.count.toLocaleString()}+</div>
              <div className="text-sm text-[#8A8A9A] mt-1">사전 등록 사용자</div>
            </div>
            <div ref={satisfaction.ref}>
              <div className="text-3xl md:text-4xl font-bold text-[#F5A623]">{satisfaction.count}%</div>
              <div className="text-sm text-[#8A8A9A] mt-1">만족도</div>
            </div>
            <div ref={sessions.ref}>
              <div className="text-3xl md:text-4xl font-bold text-[#F5A623]">{(sessions.count / 1000).toFixed(0)}K+</div>
              <div className="text-sm text-[#8A8A9A] mt-1">누적 AI 대화 세션</div>
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ─── ④ 가치 제안 (Benefits) ─── */}
      <FadeSection>
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">왜 <span className="text-[#F5A623]">베스퍼</span>인가요?</h2>
              <p className="text-[#8A8A9A] text-lg">기능이 아닌, 당신이 얻게 될 변화에 집중합니다</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🛡️',
                  title: '패닉에서 지켜줍니다',
                  desc: '급락장에서 매매 버튼을 자동 잠금하고, 당신의 감정이 이성을 이길 때 베스퍼가 먼저 개입합니다.',
                  highlight: '뇌동매매 방지율 70%',
                },
                {
                  icon: '🧠',
                  title: '당신만을 위한 AI',
                  desc: '투자 성향, 과거 대화, 약점까지 기억하는 페르소나가 점점 당신에게 최적화됩니다.',
                  highlight: '맥락 기억 정확도 95%',
                },
                {
                  icon: '🎯',
                  title: '실질적 성과를 이끕니다',
                  desc: '위로에 그치지 않습니다. 리포트 큐레이션, 리밸런싱 제안 등 구체적 행동을 코칭합니다.',
                  highlight: 'B2B 연계 프리미엄 전환율 15%',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group bg-[#1A1A2E]/60 border border-white/5 rounded-2xl p-8 hover:border-[#F5A623]/30 hover:bg-[#1A1A2E] transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-[#8A8A9A] text-sm leading-relaxed mb-4">{item.desc}</p>
                  <div className="inline-block text-xs text-[#F5A623] bg-[#F5A623]/10 px-3 py-1 rounded-full">
                    {item.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ─── B유형: 데모 시연 (Show, Don't Tell) ─── */}
      <FadeSection>
        <section id="demo" className="py-24 px-6 bg-gradient-to-b from-transparent via-[#7B61FF]/3 to-transparent">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">직접 <span className="text-[#F5A623]">경험</span>해보세요</h2>
            <p className="text-[#8A8A9A] text-lg">베스퍼가 실시간으로 당신의 질문에 응답하는 모습입니다</p>
          </div>
          <TypingDemo />
        </section>
      </FadeSection>

      {/* ─── A유형: 워크플로우 시각화 ─── */}
      <FadeSection>
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">올인원 <span className="text-[#F5A623]">투자 여정</span></h2>
              <p className="text-[#8A8A9A] text-lg">복잡한 과정을 베스퍼 하나로 해결하세요</p>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: '01', label: '페르소나 설정', desc: '투자 성향·목표·톤 맞춤', icon: '⚙️' },
                { step: '02', label: '실시간 모니터링', desc: 'VIX·포트폴리오 추적', icon: '📊' },
                { step: '03', label: 'AI 코칭', desc: '맞춤 인사이트·리포트', icon: '💬' },
                { step: '04', label: '위기 방어', desc: '패닉셀 차단·리밸런싱', icon: '🛡️' },
              ].map((s, i) => (
                <div key={i} className="relative group">
                  <div className="bg-[#1A1A2E]/60 border border-white/5 rounded-2xl p-6 text-center hover:border-[#F5A623]/30 transition-all h-full">
                    <div className="text-3xl mb-3">{s.icon}</div>
                    <div className="text-xs text-[#F5A623] font-mono mb-2">STEP {s.step}</div>
                    <h4 className="font-semibold mb-1">{s.label}</h4>
                    <p className="text-xs text-[#8A8A9A]">{s.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 text-[#F5A623]/40 text-xl z-10">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ─── B유형: 하드 팩트 (스펙) ─── */}
      <FadeSection>
        <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#F5A623]/3 to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">숫자로 <span className="text-[#F5A623]">증명</span>합니다</h2>
              <p className="text-[#8A8A9A] text-lg">"빠르다"가 아니라, 정확한 스펙을 보여드립니다</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { metric: '≤ 1.5초', label: '옴니채널 응답 속도 (p95)', detail: '어떤 채널에서든 1.5초 이내 답변 도달' },
                { metric: '95%+', label: 'RAG 맥락 기억 정확도', detail: '과거 대화와 개인 정보를 정확히 기억' },
                { metric: '≤ 0.5초', label: '위기 개입 지연시간', detail: 'VIX 임계치 돌파 시 즉각 화면 보호 발동' },
                { metric: '99.5%', label: '메시지 발송 성공률', detail: '트래픽 3배 스파이크에서도 안정 운영' },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-5 bg-[#1A1A2E]/40 border border-white/5 rounded-xl p-6 hover:border-[#F5A623]/20 transition-all">
                  <div className="text-2xl font-bold text-[#F5A623] min-w-[100px] text-right font-mono">{s.metric}</div>
                  <div>
                    <div className="font-semibold mb-1">{s.label}</div>
                    <div className="text-sm text-[#8A8A9A]">{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ─── A유형: 안전 장치 강조 ─── */}
      <FadeSection>
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">당신의 자산을 <span className="text-[#F5A623]">안전하게</span></h2>
            <p className="text-[#8A8A9A] text-lg mb-12">AI 환각(Hallucination)은 투자에 치명적입니다. 베스퍼는 다릅니다.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '🔒', title: '금융 특화 데이터 학습', desc: '일반 AI가 아닌, 검증된 금융 데이터만으로 학습된 전문 엔진' },
                { icon: '🧪', title: 'Fallback 안전망', desc: 'AI 장애 시 사전 검증된 안전 템플릿으로 즉시 전환, 페르소나 단절 방지' },
                { icon: '📡', title: '옴니채널 보호', desc: '앱·SMS·카카오톡 어디서든 위기 감지 시 선제적으로 알림 발송' },
              ].map((s, i) => (
                <div key={i} className="bg-[#1A1A2E]/40 border border-white/5 rounded-2xl p-6 hover:border-[#F5A623]/20 transition-all">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h4 className="font-semibold mb-2">{s.title}</h4>
                  <p className="text-sm text-[#8A8A9A] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeSection>

      {/* ─── 최하단 CTA ─── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5A623]/5 via-transparent to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            지금, 당신만의 <span className="text-[#F5A623]">평생 투자 파트너</span>를 만나보세요
          </h2>
          <p className="text-[#8A8A9A] text-lg">
            더 이상 혼자 고민하지 마세요. 베스퍼가 언제나 당신 곁에 있습니다.
          </p>
          <CTAButton onClick={onEnterApp} />
        </div>
      </section>

      {/* ─── 푸터 ─── */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#8A8A9A]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-br from-[#F5A623] to-[#E8920A] rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
            <span className="font-serif tracking-wider">VESPER</span>
          </div>
          <p>© 2026 Vesper AI Companion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
