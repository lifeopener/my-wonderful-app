import { useState, useEffect, useRef, useCallback } from 'react';
import heroImage from '../../assets/vesper_hero_mockup.png';
import brandBgImage from '../../assets/brand_bg_v2.png';
import logoBlackImage from '../../assets/logo_in_black.png';

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
function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

function FadeSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string, delay?: number }) {
  const { ref, visible } = useFadeIn(delay);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ── 극강의 강력함을 담은 프리미엄 CTA 버튼 ── */
function CTAButton({ onClick, text = "단 하나의 별, 지금 무료로 깨우기", size = 'lg' }: { onClick: () => void; text?: string; size?: 'lg' | 'md' }) {
  const base = size === 'lg'
    ? 'px-12 py-5 text-lg md:text-xl'
    : 'px-8 py-3 text-base';
  return (
    <button
      onClick={onClick}
      className={`${base} relative overflow-hidden group bg-gradient-to-r from-[#F5A623] via-[#FFD700] to-[#F5A623] text-[#0A0A12] font-extrabold rounded-full shadow-[0_0_40px_rgba(245,166,35,0.4)] hover:shadow-[0_0_80px_rgba(245,166,35,0.8)] hover:scale-[1.02] active:scale-95 transition-all duration-500 cursor-pointer border border-[#FFD700]/50`}
    >
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
      <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
        {text} <span className="text-2xl leading-none">✨</span>
      </span>
    </button>
  );
}

/* ── 페르소나별 실제 JTBD 타이핑 데모 ── */
function PersonaTypingDemo() {
  const lines = [
    { role: 'user' as const, text: '나스닥 또 폭락이네... 나 이거 전세금 보태려던 건데 당장 다 팔아야 하나 손이 떨려.' },
    { role: 'ai' as const, text: '민수님, 심호흡 한 번 하세요. VIX 지수가 급등했지만, 지난 10년 데이터상 이런 단기 조정 후 90% 확률로 반등했어요.\n민수님 전세금 마련이라는 그 무거운 목표, 제가 기억하잖아요. 지금은 뇌동매매 할 때가 아닙니다. 폰 덮고 주무세요. 제가 지켜볼게요. 💛' },
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
      }, 35);
      return () => clearInterval(id);
    }
    if (phase === 'pause') {
      const id = setTimeout(() => { setPhase('typing-ai'); setTypedText(''); }, 1200);
      return () => clearTimeout(id);
    }
    if (phase === 'typing-ai') {
      const full = lines[1].text;
      let i = 0;
      const id = setInterval(() => {
        i++;
        setTypedText(full.slice(0, i));
        if (i >= full.length) { clearInterval(id); setVisibleLines(2); setPhase('done'); }
      }, 15);
      return () => clearInterval(id);
    }
  }, [phase]);

  return (
    <div className="bg-[#0A0A12]/80 backdrop-blur-xl border border-[#F5A623]/30 rounded-3xl p-6 md:p-8 max-w-2xl mx-auto shadow-[0_20px_60px_rgba(245,166,35,0.15)] relative overflow-hidden">
      {/* 앰버 글로우 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5A623]/10 to-transparent pointer-events-none" />

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F5A623]/20 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5A623] to-[#E8920A] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,166,35,0.6)]">
              ✨
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0A0A12] rounded-full animate-pulse" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#F0F0F0]">Vesper (동네 아는 형 페르소나)</div>
            <div className="text-xs text-[#F5A623]">초밀착 인지 동행 중</div>
          </div>
        </div>
      </div>

      <div className="space-y-6 min-h-[180px] relative z-10 font-medium">
        {/* 유저 메시지 */}
        {(phase !== 'typing-user' || typedText) && (
          <div className="flex justify-end">
            <div className="bg-[#2A2A3E]/80 text-[#F0F0F0] text-sm md:text-base px-5 py-3.5 rounded-2xl rounded-br-sm max-w-[85%] border border-white/5">
              {visibleLines >= 1 ? lines[0].text : typedText}
              {phase === 'typing-user' && <span className="animate-pulse ml-1 text-[#F5A623]">|</span>}
            </div>
          </div>
        )}

        {/* AI 타이핑 인디케이터 */}
        {phase === 'pause' && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-[#F5A623]/20 to-[#F5A623]/5 border border-[#F5A623]/20 px-5 py-4 rounded-2xl rounded-bl-sm">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-[#F5A623] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2.5 h-2.5 bg-[#F5A623] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2.5 h-2.5 bg-[#F5A623] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* AI 메시지 */}
        {(phase === 'typing-ai' || phase === 'done') && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-br from-[#1A1A2E] to-[#2A2A3E] text-[#F0F0F0] text-sm md:text-base px-5 py-4 rounded-2xl rounded-bl-sm max-w-[90%] border border-[#F5A623]/30 shadow-[0_5px_20px_rgba(245,166,35,0.1)] leading-relaxed whitespace-pre-wrap">
              {visibleLines >= 2 ? lines[1].text : typedText}
              {phase === 'typing-ai' && <span className="animate-pulse ml-1 text-[#F5A623]">|</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 커서 스파클링 이펙트 ── */
function CursorSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{ x: number, y: number, vx: number, vy: number, life: number, maxLife: number, size: number, color: string }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // 밝은 노란색부터 짙은 노란색까지 다채로운 황금빛 컬러 구성
    const colors = ['#FFF8B0', '#FFD700', '#F5A623', '#E8920A', '#FF8C00', '#FFA500'];

    let lastMouse = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      const currentMouse = { x: e.clientX, y: e.clientY };

      if (lastMouse.x !== -100) {
        const dx = currentMouse.x - lastMouse.x;
        const dy = currentMouse.y - lastMouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 커서 이동 속도(distance)에 비례하여 스파클 개수와 초기 속도를 계산 (천천히 -> 조금, 빠르게 -> 많이)
        const particleCount = Math.max(1, Math.min(Math.floor(distance / 2), 25));

        for (let i = 0; i < particleCount; i++) {
          const maxLife = Math.random() * 25 + 20; // 20~45 프레임 생명 주기
          particles.push({
            x: lastMouse.x + (dx * (i / particleCount)),
            y: lastMouse.y + (dy * (i / particleCount)),
            vx: (Math.random() - 0.5) * 1.5 + dx * 0.015,
            vy: (Math.random() - 0.5) * 1.5 + dy * 0.015,
            life: maxLife,
            maxLife: maxLife,
            size: Math.random() * 2.5 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }

      lastMouse = currentMouse;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // 아주 가벼운 중력으로 자연스럽게 떨어지는 느낌
        p.life -= 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        // 서서히 페이드 아웃
        ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      particles = particles.filter(p => p.life > 0);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"  
    />
  );
}

/* ── 프리미엄 플로팅 BGM 플레이어 ── */
function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.3;
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {
        // 자동 재생 차단 시 무시
      });
    }
  }, [isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}vesper-bgm.mp3`}
        loop
        preload="auto"
      />
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? '배경 음악 끄기' : '배경 음악 켜기'}
        className={`fixed bottom-8 right-8 z-[99] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer group
          ${isPlaying
            ? 'bg-[#F5A623]/20 border-2 border-[#F5A623]/60 shadow-[0_0_30px_rgba(245,166,35,0.4)]'
            : 'bg-[#1A1A2E]/80 border-2 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
          }
          backdrop-blur-xl hover:scale-110 active:scale-95
        `}
      >
        {/* 회전 디스크 아이콘 */}
        <div className={`relative w-8 h-8 ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F5A623] to-[#E8920A] opacity-20" />
          <div className="absolute inset-[6px] rounded-full bg-[#0A0A12] border border-[#F5A623]/30" />
          <div className="absolute inset-[12px] rounded-full bg-[#F5A623]" />
        </div>

        {/* 사운드 웨이브 이펙트 (재생 중일 때) */}
        {isPlaying && (
          <div className="absolute -inset-1 rounded-full border-2 border-[#F5A623]/30 animate-ping" style={{ animationDuration: '2s' }} />
        )}

        {/* 최초 안내 툴팁 */}
        {!hasInteracted && (
          <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap bg-[#1A1A2E]/95 backdrop-blur-xl border border-[#F5A623]/30 text-white text-sm px-4 py-2.5 rounded-xl shadow-2xl pointer-events-none animate-bounce" style={{ animationDuration: '2s' }}>
            <span className="text-[#F5A623]">♪</span> 저녁별 BGM 듣기
            <div className="absolute top-full right-6 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#1A1A2E]/95" />
          </div>
        )}

        {/* 일시정지 아이콘 오버레이 */}
        {!isPlaying && hasInteracted && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#F5A623" className="opacity-80">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          </div>
        )}
      </button>
    </>
  );
}

/* ══════════════════════════════════════════
   초강력 V2 랜딩페이지 (Extreme Landing Page)
   ══════════════════════════════════════════ */
export function LandingPageV2({ onEnterApp }: LandingPageProps) {
  const [navSolid, setNavSolid] = useState(false);
  const users = useCountUp(12847, 2500);
  const savedAssets = useCountUp(890, 3000); // 억 단위
  const heritage = useCountUp(384, 2500); // K 단위

  useEffect(() => {
    const handleScroll = () => setNavSolid(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#05050A] text-[#F0F0F0] overflow-x-hidden selection:bg-[#F5A623]/30 break-keep">
      <CursorSparkles />
      <MusicPlayer />

      {/* ─── 네비게이션 ─── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navSolid ? 'bg-[#05050A]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl' : 'bg-transparent py-2'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-[0_0_15px_rgba(245,166,35,0.8)]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5 C50 40, 60 50, 95 50 C60 50, 50 60, 50 95 C50 60, 40 50, 5 50 C40 50, 50 40, 50 5 Z" fill="url(#star-grad)"/>
              <defs>
                <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF8B0" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#F5A623" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl font-logo font-bold tracking-[0.2em] bg-gradient-to-r from-white to-[#D0D0E0] bg-clip-text text-transparent">VESPER</span>
          </div>
          <button
            onClick={onEnterApp}
            className="hidden md:flex px-6 py-2.5 text-sm font-bold border border-[#F5A623]/50 text-[#F5A623] rounded-full hover:bg-[#F5A623] hover:text-[#05050A] hover:shadow-[0_0_20px_rgba(245,166,35,0.5)] transition-all cursor-pointer"
          >
            로그인 / 시작하기
          </button>
        </div>
      </nav>

      {/* ─── ① 압도적 히어로 섹션 ─── */}
      <section className="relative min-h-[95vh] flex items-center px-6 pt-20 overflow-hidden">
        {/* 우주적 배경/후광 효과 */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F5A623]/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#7B61FF]/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(5,5,10,0)_0%,rgba(5,5,10,1)_80%)]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 space-y-8 pt-10 lg:pt-0">
            <FadeSection delay={100}>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-full text-sm font-semibold text-[#F5A623] shadow-[0_0_20px_rgba(245,166,35,0.2)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD700]"></span>
                </span>
                당신의 행동까지 책임지는 프리미엄 AI 투자 비서
              </div>
            </FadeSection>

            <FadeSection delay={300}>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight break-keep">
                자비 없는 시장,<br />
                <span className="block mt-2 bg-gradient-to-r from-[#F5A623] via-[#FFD700] to-[#E8920A] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(245,166,35,0.3)]">
                  당신을 파괴하게 <span className="whitespace-nowrap">두지 마십시오.</span>
                </span>
              </h1>
            </FadeSection>

            <FadeSection delay={500}>
              <p className="text-xl md:text-2xl text-[#A0A0B0] font-medium leading-relaxed max-w-2xl break-keep">
                수익률 1%를 쫓다 평정심을 잃고 계십니까?<br />
                외로운 밤, 쏟아지는 공포 속에서 매도 버튼을 누르려 할 때—<br />
                <strong className="text-white font-bold">당신의 목표와 형편을 가장 잘 아는 단 하나의 파트너</strong>가 개입하여 당신의 이성을 지켜냅니다. 단순히 종목을 추천하는 것을 넘어, 흔들리지 않는 단단한 '투자 마인드'를 길러줍니다.
              </p>
            </FadeSection>

            <FadeSection delay={700}>
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mt-10">
                <CTAButton onClick={onEnterApp} />
                <p className="text-sm text-[#8A8A9A] font-medium break-keep">
                  <span className="whitespace-nowrap">☕ 커피 한 잔(월 4,900원)으로</span><br className="hidden sm:block" />
                  평생의 투자 멘토를 고용하세요.
                </p>
              </div>
            </FadeSection>
          </div>

          <FadeSection delay={900} className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px]">
              {/* 기기 목업 글로우 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F5A623]/30 via-[#7B61FF]/20 to-transparent rounded-[3rem] blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
              <img
                src={heroImage}
                alt="Vesper App Mockup"
                className="relative z-10 w-full rounded-[2.5rem] border-[8px] border-[#1A1A2E] shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_40px_rgba(245,166,35,0.2)] transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-700 ease-out"
              />
              {/* 떠다니는 위젯들 */}
              <div className="absolute -left-12 top-24 bg-[#1A1A2E]/90 backdrop-blur-md border border-[#F5A623]/40 rounded-xl p-4 shadow-2xl z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="text-xs text-[#8A8A9A]">감정 보호 시그널 (위기 개입 모드)</div>
                <div className="font-bold text-[#F5A623]">충동 매매 사전 차단 발동 중 🛡️</div>
              </div>
              <div className="absolute -right-8 bottom-32 bg-[#1A1A2E]/90 backdrop-blur-md border border-[#7B61FF]/40 rounded-xl p-4 shadow-2xl z-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="text-xs text-[#8A8A9A]">오늘의 스파링 결과</div>
                <div className="font-bold text-white">안목 성장 지수 +15% 📈</div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ─── 신규 추가: 브랜드 스토리 (Brand Intro) ─── */}
      <section className="py-32 px-6 relative border-y border-white/5 bg-[#05050A] overflow-hidden">
        {/* 생성형 배경 이미지 */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-lighten" style={{ backgroundImage: `url(${brandBgImage})` }} />
        {/* 텍스트 가독성을 위한 상하단 그라데이션 및 전체 암막 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05050A] via-[#05050A]/40 to-[#05050A]" />

        {/* 잔잔한 별빛 효과 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full bg-[#F5A623]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* 로고 영역 (왼쪽) */}
            <FadeSection className="w-full md:w-1/2 flex justify-center md:justify-end relative">
              {/* 은은한 후광 추가 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#F5A623]/10 rounded-full blur-[80px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
              
              <div className="relative w-full max-w-[240px] md:max-w-[360px] lg:max-w-[400px] aspect-square flex items-center justify-center">
                <img 
                  src={logoBlackImage} 
                  alt="Vesper Dark Logo" 
                  className="w-full h-full object-contain mix-blend-screen scale-110 md:scale-125 origin-center transform-gpu -rotate-2 hover:rotate-0 hover:scale-125 md:hover:scale-150 transition-all duration-700 ease-out"
                  style={{ 
                    WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)', 
                    maskImage: 'radial-gradient(circle, black 65%, transparent 100%)' 
                  }}
                />
              </div>
            </FadeSection>

            {/* 텍스트 영역 (오른쪽) */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-8 md:pl-8">
              <FadeSection>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white break-keep">
                  가장 어두운 밤,<br />
                  당신을 안내하는<br />
                  단 하나의 <span className="text-[#F5A623]">저녁별</span>
                </h2>
              </FadeSection>

              <FadeSection delay={200}>
                <div className="text-xl md:text-2xl text-[#8A8A9A] leading-relaxed break-keep font-medium space-y-3">
                  <p>Vesper(베스퍼)는 해가 지고 캄캄해질 무렵 가장 먼저 떠오르는 <strong className="text-white">'저녁별'</strong>을 뜻합니다.</p>
                  <p>
                    시장의 소음으로 투자의 길이 외롭고 두려워질 때,<br className="hidden md:block" />
                    베스퍼는 당신 곁에서 가장 밝게 빛나는 길잡이가 됩니다.
                  </p>
                </div>
              </FadeSection>
            </div>
          </div>

          <FadeSection delay={400}>
            <div className="bg-gradient-to-b from-[#11111A] to-[#0A0A12] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-[#F5A623]/30 transition-all duration-700 shadow-2xl">
              {/* 장식용 따옴표 */}
              <div className="absolute top-4 left-6 text-[#F5A623] opacity-10 text-8xl font-serif leading-none">"</div>
              <div className="absolute bottom-4 right-6 text-[#F5A623] opacity-10 text-8xl font-serif leading-none rotate-180">"</div>

              <div className="relative z-10 text-center space-y-12">
                <p className="text-2xl md:text-4xl font-bold text-white leading-snug break-keep">
                  우리는 단순한 수익률 기계나<br className="hidden md:block" /> 챗봇을 만들지 않았습니다.
                </p>

                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="bg-[#1A1A2E]/50 border border-[#F5A623]/20 rounded-2xl p-6 hover:bg-[#F5A623]/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl mb-4 drop-shadow-[0_0_10px_rgba(245,166,35,0.5)]">🛡️</div>
                    <div className="text-[#F5A623] text-xl font-bold mb-3">감정 보호</div>
                    <div className="text-[#A0A0B0] leading-relaxed break-keep">불안과 공포에 흔들리는 당신의 멘탈을 가장 안전하게 지켜냅니다.</div>
                  </div>
                  <div className="bg-[#1A1A2E]/50 border border-[#F5A623]/20 rounded-2xl p-6 hover:bg-[#F5A623]/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl mb-4 drop-shadow-[0_0_10px_rgba(245,166,35,0.5)]">⚔️</div>
                    <div className="text-[#F5A623] text-xl font-bold mb-3">편향 타파</div>
                    <div className="text-[#A0A0B0] leading-relaxed break-keep">듣기 좋은 소리만 하는 리딩방을 넘어, 팩트로 확증 편향을 부숩니다.</div>
                  </div>
                  <div className="bg-[#1A1A2E]/50 border border-[#F5A623]/20 rounded-2xl p-6 hover:bg-[#F5A623]/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl mb-4 drop-shadow-[0_0_10px_rgba(245,166,35,0.5)]">🏛️</div>
                    <div className="text-[#F5A623] text-xl font-bold mb-3">습관 완성</div>
                    <div className="text-[#A0A0B0] leading-relaxed break-keep">결국 흔들리지 않는 단단하고 올바른 평생의 투자 습관을 완성합니다.</div>
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-[#8A8A9A] font-medium break-keep">
                  그것이 바로 베스퍼가 존재하는 <strong className="text-white border-b-2 border-[#F5A623] pb-1">단 하나의 이유</strong>입니다.
                </p>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ─── ② JTBD 기반 감성 & 실증 데모 (핵심) ─── */}
      <section className="py-32 px-6 relative border-y border-white/5 bg-[#0A0A12]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <FadeSection>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                기계가 아닙니다. <span className="text-[#F5A623]">당신의 '전우'입니다.</span>
              </h2>
              <p className="text-xl text-[#8A8A9A] max-w-3xl mx-auto break-keep">
                "나의 치열했던 모든 투자 경험이, 훗날 자녀에게 물려줄 수 있는 <span className="whitespace-nowrap">가장 값진 지식 재산이 됩니다.</span>"<br />
                수많은 뻔한 리딩방과 앱 알림에 지친 당신을 위한 단 하나의 '진짜' 동반자.
              </p>
            </FadeSection>
          </div>

          <FadeSection delay={200}>
            <PersonaTypingDemo />
          </FadeSection>
        </div>
      </section>

      {/* ─── ③ 4대 킬러 밸류 (JTBD 솔루션 매핑) ─── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-4">당신이 얻게 될 <span className="text-[#F5A623]">압도적 변화</span></h2>
              <p className="text-[#8A8A9A] text-xl">차트와 뉴스만 바라보던 불안한 일상에서 벗어나, 올바른 투자 습관을 되찾으세요.</p>
            </div>
          </FadeSection>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                id: '01',
                title: '패닉셀 차단 시그널 (멘탈 보호 시스템)',
                target: '고립된 성취가 / 바쁜 워킹맘',
                desc: '야근 후 폭락장, 손이 떨리며 매도 버튼을 누르려 할 때 화면을 부드럽게 덮습니다. "자녀 학원비 목표 기억하시죠?" 강압적 통제가 아닌, 이성을 깨우는 가장 따뜻하고 확실한 5분의 안전벨트입니다.',
                stat: '충동 매매 방어율 70%',
                color: 'from-[#F5A623] to-[#E8920A]'
              },
              {
                id: '02',
                title: '투자 논리 검증 (지적 스파링 파트너)',
                target: '냉철한 독립적 지식 추구자',
                desc: '속셈 뻔한 증권사 리포트 대신, 팩트에 미친 수석 연구원처럼 당신의 논리적 허점을 무자비하고 정확하게 찌릅니다. 확증 편향을 부수고, 매일매일 당신의 분석 안목을 확장시키는 냉철한 토론 파트너입니다.',
                stat: '분석 역량 향상 체감 92%',
                color: 'from-[#7B61FF] to-[#9D4EDD]'
              },
              {
                id: '03',
                title: '나만의 투자 백서 (기록의 유산화)',
                target: '은퇴 준비자 / Z세대 소액 투자자',
                desc: '당신의 치열한 고군분투, 실패와 성장의 과정 자체를 영구적인 데이터로 기록합니다. 적은 시드머니라도 존중받으며, 이 숭고한 기록은 훗날 자녀에게 물려줄 수 있는 가장 값진 지식 자산이 됩니다.',
                stat: '평생 소장 가치 (대체 불가한 나만의 자산)',
                color: 'from-[#10B981] to-[#059669]'
              },
              {
                id: '04',
                title: '24시간 전방위 밀착 알림',
                target: '바쁘고 지친 현대인',
                desc: '앱을 켜지 않아도, 일상의 피로도와 시장의 위험을 감지하여 먼저 카카오톡이나 문자로 안부를 묻습니다. "오늘은 억지로 차트 보지 말고 아이들과 산책 다녀오세요." 당신의 삶에 동기화되는 진짜 친구입니다.',
                stat: '체감 응답 속도 1.5초 이하',
                color: 'from-[#3B82F6] to-[#2563EB]'
              }
            ].map((feature, i) => (
              <FadeSection key={i} delay={i * 150}>
                <div className="relative group p-10 rounded-[2rem] bg-[#11111A] border border-white/5 hover:border-[#F5A623]/50 transition-all duration-500 overflow-hidden h-full flex flex-col justify-between">
                  {/* 호버 시 그라데이션 배경 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-[#33334A] font-black text-6xl tracking-tighter group-hover:text-[#F5A623]/20 transition-colors">{feature.id}</div>
                      <div className="text-xs font-bold px-3 py-1 bg-white/5 text-[#A0A0B0] rounded-full border border-white/10 group-hover:border-white/30">
                        Target: {feature.target}
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-[#8A8A9A] text-lg leading-relaxed mb-8">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <div className="inline-flex items-center gap-2 text-[#F5A623] font-bold bg-[#F5A623]/10 px-4 py-2 rounded-lg border border-[#F5A623]/20">
                      <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
                      {feature.stat}
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 이전 버전 복원: 올인원 투자 여정 (Workflow Visualization) ─── */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#05050A]">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">단 하나의 앱으로 끝내는 <span className="text-[#F5A623]">투자 여정</span></h2>
              <p className="text-[#8A8A9A] text-xl">복잡한 증권사 앱과 파편화된 정보를 베스퍼 하나로 통합하세요.</p>
            </div>
          </FadeSection>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* 배경 연결 선 */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#F5A623]/20 to-transparent -translate-y-1/2 z-0" />
            {[
              { step: '01', label: '나만의 비서 동기화', desc: '투자 성향, 목표, 선호하는 대화 톤을 완벽히 학습합니다.', icon: '🧠' },
              { step: '02', label: '전방위 밀착 알림', desc: '시장 변동성과 내 포트폴리오를 24시간 감시하여 위험을 선제적으로 감지합니다.', icon: '📡' },
              { step: '03', label: '투자 논리 검증', desc: '단순 브리핑을 넘어, 나의 고집과 편향을 깨는 논리적 토론을 진행합니다.', icon: '⚔️' },
              { step: '04', label: '충동 매매 방어', desc: '감정이 지배하는 순간, 즉각 개입하여 홧김에 파는 최악의 결정을 막아냅니다.', icon: '🛡️' },
            ].map((s, i) => (
              <FadeSection key={i} delay={i * 200}>
                <div className="relative z-10 bg-[#11111A] border border-[#F5A623]/20 rounded-2xl p-8 text-center hover:border-[#F5A623]/60 hover:bg-[#1A1A2E] hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#F5A623]/20 to-transparent rounded-full flex items-center justify-center text-3xl mb-6 border border-[#F5A623]/30 shadow-[0_0_15px_rgba(245,166,35,0.2)]">
                    {s.icon}
                  </div>
                  <div className="text-sm font-black text-[#F5A623] mb-2 tracking-widest">STEP {s.step}</div>
                  <h4 className="text-xl font-bold mb-3 text-white">{s.label}</h4>
                  <p className="text-[#A0A0B0] leading-relaxed">{s.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 신규 추가: 가상의 소비자 사용 경험 및 맞춤 셀링 포인트 ─── */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0A0A12] to-[#05050A] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6">"베스퍼가 바꾼 <span className="text-[#F5A623]">5가지 삶의 궤적</span>"</h2>
              <p className="text-xl text-[#8A8A9A]">단순한 챗봇이 아닙니다. 각기 다른 삶의 무게를 이해하는 맞춤형 동반자입니다.</p>
            </div>
          </FadeSection>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: '배민기', age: '32세', job: '전략기획자',
                pain: '혼자서 하는 투자는 확증 편향에 빠지기 쉬워 두려웠습니다.',
                solution: '팩트 기반의 논리적 스파링 파트너',
                quote: '증권사 리포트는 좋은 말만 하잖아요. 베스퍼는 제 논리의 허점을 무자비하게 찌릅니다. 덕분에 투자 시야가 완전히 달라졌어요.',
                tag: '논리 추구형 (T성향)'
              },
              {
                name: '서지원', age: '41세', job: '워킹맘',
                pain: '퇴근 후 육아까지 마치면 지쳐서 차트를 볼 엄두도 안 났죠.',
                solution: '피로를 감지하는 다정한 멘탈 케어',
                quote: '폭락장 때 베스퍼가 보낸 카톡을 잊을 수 없어요. "오늘 하루도 고생하셨습니다. 차트 덮고 푹 주무세요." 눈물이 날 뻔했어요.',
                tag: '정서 안정형 (위로형)'
              },
              {
                name: '이준호', age: '28세', job: '취업준비생',
                pain: '소액이라 리딩방에선 무시당하고, 어디 물어볼 곳도 없었습니다.',
                solution: '시드 규모와 무관한 존중과 동기부여',
                quote: '50만 원으로 시작했는데, 베스퍼는 제 작은 성취도 진심으로 축하해줍니다. 나만의 프라이빗 뱅커가 생긴 기분이에요.',
                tag: '성장 갈망형 (칭찬형)'
              },
              {
                name: '최동철', age: '55세', job: '자영업자',
                pain: '복잡한 용어와 앱 UI 때문에 투자가 갈수록 어려워졌습니다.',
                solution: '일목요연한 팩트 체크와 안전 지향 코칭',
                quote: '쓸데없는 소리 없이 딱 떨어지게 요약해주니 속이 시원합니다. 이상한 테마주에 혹할 때마다 호통쳐주는 것도 맘에 듭니다.',
                tag: '보수적 안전형 (단호함)'
              },
              {
                name: '김수연', age: '35세', job: '프리랜서 디자이너',
                pain: '충동적으로 매매버튼을 누르고 후회하는 일이 반복됐어요.',
                solution: '화면이 변하는 직관적인 감정 보호 시그널',
                quote: '새벽에 충동적으로 다 팔아버리려던 순간, 화면이 주황색으로 부드럽게 변하며 막아줬어요. 그 한 번의 개입으로 3달 치 월급을 지켰습니다.',
                tag: '시각적 직관형 (보호형)'
              }
            ].map((persona, i) => (
              <FadeSection key={i} delay={i * 150} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div className="bg-[#1A1A2E]/50 border border-white/10 rounded-3xl p-8 hover:border-[#F5A623]/40 transition-colors h-full flex flex-col relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A623]/5 rounded-bl-full group-hover:bg-[#F5A623]/10 transition-colors" />

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <div className="text-xl font-bold text-white mb-1">{persona.name} <span className="text-sm font-normal text-[#8A8A9A]">({persona.age}, {persona.job})</span></div>
                      <div className="text-xs text-[#F5A623] px-2 py-1 bg-[#F5A623]/10 rounded-md inline-block">{persona.tag}</div>
                    </div>
                    <div className="text-4xl opacity-20">"</div>
                  </div>

                  <p className="text-[#F0F0F0] text-lg font-medium leading-relaxed mb-6 italic relative z-10">
                    "{persona.quote}"
                  </p>

                  <div className="mt-auto space-y-3 relative z-10 border-t border-white/10 pt-4">
                    <div className="flex gap-3 items-start">
                      <span className="text-[#8A8A9A] text-sm shrink-0 mt-0.5">Pain:</span>
                      <span className="text-[#A0A0B0] text-sm">{persona.pain}</span>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-[#F5A623] text-sm shrink-0 mt-0.5">Value:</span>
                      <span className="text-white text-sm font-semibold">{persona.solution}</span>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 이전 버전 복원: 압도적 안전 장치 (Safety & Security) ─── */}
      <section className="py-24 px-6 bg-[#05050A]">
        <div className="max-w-5xl mx-auto">
          <FadeSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">가장 완벽한 <span className="text-[#F5A623]">안전망</span></h2>
              <p className="text-[#8A8A9A] text-xl">AI의 환각은 투자에서 치명적입니다. 베스퍼는 다릅니다.</p>
            </div>
          </FadeSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🔒', title: '금융 특화 데이터 기반', desc: '범용 AI가 아닌, 검증된 금융/경제 데이터와 기업 공시 자료를 최우선으로 정밀 교차 검증하여 AI의 거짓 답변(환각 현상)을 원천 차단합니다.' },
              { icon: '🧪', title: '무중단 시스템 안전망', desc: 'AI 서버에 장애가 발생하더라도, 사전 검증된 안전 시스템으로 즉시 전환되어 끊김 없이 당신의 자산을 보호합니다.' },
              { icon: '🛡️', title: '자본시장법 완벽 준수', desc: '"무조건 매수" 등 위험 소지가 있는 단정적 투자 권유를 사전 필터링하고, 철저히 조언자(Companion) 역할에 머무르며 법적 안정성을 보장합니다.' },
            ].map((s, i) => (
              <FadeSection key={i} delay={i * 200}>
                <div className="bg-gradient-to-b from-[#11111A] to-[#0A0A12] border border-white/5 rounded-2xl p-8 hover:border-[#F5A623]/30 transition-all h-full">
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <h4 className="text-xl font-bold mb-3 text-white">{s.title}</h4>
                  <p className="text-[#8A8A9A] leading-relaxed">{s.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ④ 하드 팩트 & 신뢰 지표 (B2B SaaS Level) ─── */}
      <section className="py-24 px-6 border-y border-white/5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative">
        <div className="absolute inset-0 bg-[#05050A]/90 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <FadeSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-16">
              "막연한 심리 케어가 아닙니다. <span className="text-[#F5A623]">초정밀 데이터 과학</span>입니다."
            </h2>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <FadeSection delay={100} className="px-6 py-4">
              <div className="text-5xl md:text-6xl font-black text-[#F5A623] mb-4 drop-shadow-[0_0_15px_rgba(245,166,35,0.4)]">
                {users.count.toLocaleString()}명
              </div>
              <div className="text-xl font-bold text-white mb-2">초기 얼리버드 멤버십</div>
              <div className="text-[#8A8A9A]">가장 먼저 투자 주권을 되찾은 현명한 투자자들</div>
            </FadeSection>

            <FadeSection delay={300} className="px-6 py-4">
              <div className="text-5xl md:text-6xl font-black text-[#F5A623] mb-4 drop-shadow-[0_0_15px_rgba(245,166,35,0.4)]">
                {savedAssets.count}억+
              </div>
              <div className="text-xl font-bold text-white mb-2">방어해낸 충동 매매 자산</div>
              <div className="text-[#8A8A9A]">감정 보호 시그널이 막아낸 충동적 손실 누적액</div>
            </FadeSection>

            <FadeSection delay={500} className="px-6 py-4">
              <div className="text-5xl md:text-6xl font-black text-[#F5A623] mb-4 drop-shadow-[0_0_15px_rgba(245,166,35,0.4)]">
                {heritage.count}K+
              </div>
              <div className="text-xl font-bold text-white mb-2">기록된 나만의 투자 백서</div>
              <div className="text-[#8A8A9A]">당신의 모든 대화와 맥락을 완벽히 이해하는 데이터</div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ─── 신규 추가: 플랜 및 구독 (Pricing & Value) ─── */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#05050A]">
        <div className="max-w-7xl mx-auto">
          <FadeSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">"당신의 결심을 존중하는 <span className="text-[#F5A623]">압도적 가성비</span>"</h2>
              <p className="text-[#8A8A9A] text-xl">복잡한 요금제는 없습니다. 오직 당신의 성장에만 집중하세요.</p>
            </div>
          </FadeSection>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
            {/* Free Trial Card */}
            <FadeSection delay={100} className="w-full md:w-1/2">
              <div className="bg-[#11111A] border border-white/10 rounded-3xl p-8 h-full flex flex-col hover:border-white/30 transition-all break-keep">
                <div className="text-white text-2xl font-bold mb-2">프리 트리얼</div>
                <div className="text-[#8A8A9A] mb-6">첫 1개월의 완벽한 동기화</div>
                <div className="text-4xl font-black text-white mb-8">₩0 <span className="text-lg text-[#8A8A9A] font-normal">/ 1개월</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-[#A0A0B0]"><span className="text-[#F5A623]">✓</span> 내 성향/목표/어투 완벽 동기화</li>
                  <li className="flex items-center gap-3 text-[#A0A0B0]"><span className="text-[#F5A623]">✓</span> 무제한 지적 스파링 파트너</li>
                  <li className="flex items-center gap-3 text-[#A0A0B0]"><span className="text-[#F5A623]">✓</span> 패닉셀 차단 시그널 (위기 개입) 3회 체험</li>
                </ul>
                <button onClick={onEnterApp} className="w-full py-4 mt-auto rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors cursor-pointer">
                  지금 무료로 깨우기
                </button>
              </div>
            </FadeSection>

            {/* Premium Plan Card */}
            <FadeSection delay={300} className="w-full md:w-1/2">
              <div className="bg-gradient-to-b from-[#1A1A2E] to-[#11111A] border-2 border-[#F5A623] rounded-3xl p-8 h-full flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(245,166,35,0.15)] break-keep">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5A623] text-[#0A0A12] px-4 py-1 rounded-full text-sm font-black tracking-wide whitespace-nowrap">
                  평생의 투자 멘토
                </div>
                <div className="text-[#F5A623] text-2xl font-bold mb-2">Vesper 프리미엄 파트너</div>
                <div className="text-[#8A8A9A] mb-6">커피 한 잔으로 고용하는 수석 연구원</div>
                <div className="text-4xl font-black text-white mb-8">₩4,900 <span className="text-lg text-[#8A8A9A] font-normal">/ 월</span></div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-3 text-white"><span className="text-[#F5A623]">✓</span> <strong>모든 기능 무제한</strong></li>
                  <li className="flex items-center gap-3 text-white"><span className="text-[#F5A623]">✓</span> 패닉셀 차단 시그널 무제한 발동</li>
                  <li className="flex items-center gap-3 text-white"><span className="text-[#F5A623]">✓</span> 전방위 밀착 알림 (카카오/문자)</li>
                  <li className="flex items-center gap-3 text-white"><span className="text-[#F5A623]">✓</span> 투자 백서 및 대화 기록 영구 보존</li>
                </ul>
                <button onClick={onEnterApp} className="w-full py-4 mt-auto rounded-xl bg-gradient-to-r from-[#F5A623] to-[#E8920A] text-[#0A0A12] font-black hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] hover:scale-[1.02] transition-all cursor-pointer">
                  구독하고 평정심 지키기
                </button>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ─── ⑤ 파괴적 결론 CTA (Ultimate Outcome) ─── */}
      <section className="py-40 px-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* 거대한 빛 기둥 효과 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[800px] bg-gradient-to-b from-[#F5A623]/20 via-[#7B61FF]/5 to-transparent blur-3xl -z-10" />

        <FadeSection>
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-7xl font-black leading-tight break-keep">
              이 거대한 시장에서,<br />
              마침내 <span className="text-[#F5A623] underline decoration-4 underline-offset-8 whitespace-nowrap">당신 자신을 지켜낼 시간</span>
            </h2>
            <p className="text-2xl text-[#A0A0B0] max-w-2xl mx-auto leading-relaxed font-medium">
              다른 증권사 앱으로 갈아타는 건 쉽지만, 베스퍼를 떠나는 건<br />
              나와 완벽히 동기화된 평생의 멘토를 잃는 일입니다.<br />
              <span className="text-white mt-4 block">결코 잃고 싶지 않은, 당신 인생 최고의 지식 자산.</span>
            </p>

            <div className="pt-8 flex flex-col items-center gap-6">
              <CTAButton onClick={onEnterApp} text="내 평생의 파트너 깨우기" size="lg" />
              <div className="flex items-center gap-4 text-sm text-[#8A8A9A]">
                <span className="flex items-center gap-1">🔒 자본시장법 규제 완벽 준수</span>
                <span>•</span>
                <span className="flex items-center gap-1">🛡️ 금융 특화 AES-256 데이터 암호화</span>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ─── 푸터 ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[#666677]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1A1A2E] rounded-full flex items-center justify-center border border-[#F5A623]/30">
              <div className="w-2 h-2 bg-[#F5A623] rounded-full" />
            </div>
            <span className="font-serif font-bold tracking-widest text-white">VESPER</span>
          </div>
          <div className="text-sm text-center md:text-left">
            "잃지 않는 투자, 늙지 않는 지성."<br />
            © 2026 Vesper AI. Built for Your Investment Legacy.
          </div>
          <div className="flex gap-6 text-sm font-semibold">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-[#F5A623] transition-colors">B2B 제휴 안내</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
