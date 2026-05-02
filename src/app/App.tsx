import { useState } from 'react';
import { LandingPageV2 } from './components/VesperLandingPage';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { ChatScreen } from './components/ChatScreen';
import { PersonaScreen } from './components/PersonaScreen';

type Screen = 'landing' | 'splash' | 'home' | 'chat' | 'persona';

/**
 * @description Vesper AI 메인 애플리케이션 루트 컴포넌트. 화면 라우팅과 최상위 전역 상태를 관리합니다.
 * @ai_context This is the central controller. The 'landing' screen is now the default entry point.
 * CTA buttons on the landing page transition to 'splash', then to the main app flow.
 * When adding new screens, update the `Screen` type union and add a conditional render block here.
 * Global states (e.g. personaName) should eventually be migrated to Zustand/Context API.
 */
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userName] = useState('김민준');
  const [personaName, setPersonaName] = useState('베스퍼');

  const handlePersonaSave = (data: { name: string; tone: string; goal: string }) => {
    setPersonaName(data.name);
  };

  /* 랜딩페이지는 전체 너비, 앱 화면은 모바일 레이아웃 유지 */
  if (currentScreen === 'landing') {
    return <LandingPageV2 onEnterApp={() => setCurrentScreen('splash')} />;
  }

  return (
    <div className="size-full bg-[#0A0A12] overflow-hidden">
      <div className="max-w-md mx-auto h-full relative shadow-2xl">
        {currentScreen === 'splash' && (
          <SplashScreen onStart={() => setCurrentScreen('home')} />
        )}
        {currentScreen === 'home' && (
          <HomeScreen
            userName={userName}
            personaName={personaName}
            onChatClick={() => setCurrentScreen('chat')}
            onProfileClick={() => setCurrentScreen('persona')}
          />
        )}
        {currentScreen === 'chat' && (
          <ChatScreen
            personaName={personaName}
            onBack={() => setCurrentScreen('home')}
          />
        )}
        {currentScreen === 'persona' && (
          <PersonaScreen
            onBack={() => setCurrentScreen('home')}
            onSave={handlePersonaSave}
          />
        )}
      </div>
    </div>
  );
}