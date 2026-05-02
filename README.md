# Vesper AI Companion 

당신의 평생 투자 파트너, Vesper AI Companion OS 프로젝트입니다.
본 프로젝트는 사용자의 투자 성향과 목표를 기반으로 맞춤형 시장 분석 및 실시간 인사이트를 제공하는 모바일 최적화 웹 애플리케이션입니다.

---

## 🎯 랜딩페이지 V2 (Vesper Landing Page)

고객의 압도적인 사용 의향과 락인을 이끌어내기 위한 **"과할 정도로 강력한(Extreme) 프리미엄 랜딩페이지"**가 완성되어 전면에 배치되었습니다. (Keys 기획 문서 100% 반영)
CTA("단 하나의 별, 지금 무료로 깨우기") 클릭 시 기존 서비스 앱으로 진입합니다.

- **전략 유형:** B유형(기술 몰입형) + A유형(불안 해소형) 하이브리드 진화형
- **체크리스트 평가:** 종합 S+등급 — [LANDING_PAGE_CHECKLIST_V2.md](docs/LANDING_PAGE_CHECKLIST_V2.md)
- **핵심 파괴적(Disruptive) 요소:** 
  - **우주적 미학 (Celestial Guidance):** 딥 네이비와 앰버 골드의 강렬한 대비, 무한 페이드인 애니메이션
  - **JTBD 감성 타이핑 데모:** 유저의 치명적 Pain Point("전세금 마련")를 꿰뚫는 AI 동기화 멘탈 케어 시연
  - **트리플 락인 엔진 선언:** "우리를 떠나는 건 멘토의 뇌를 포맷하는 일입니다"와 같은 매몰비용 각인 카피
  - **4대 킬러 밸류 부각:** Amber Glow, Wisdom Partner, Heritage Archive, Omni-Channel Companion의 완벽한 가시화

---

## 🚀 Prototyping Phase 완료 보고서

성공적으로 1차 프론트엔드 프로토타이핑 단계를 마무리했습니다. 초기 Monolithic 코드의 기술 부채를 해결하고, 상용화(Production)가 가능한 모듈형 아키텍처를 구축했습니다. 상세한 설계 및 품질 분석 결과는 `docs/` 디렉토리에 문서화되어 있습니다.

### 1. 주요 UX 플로우 ([UX_FLOW.md](docs/UX_FLOW.md))
- **온보딩 시나리오**: 스플래시 화면을 거쳐 파트너 설정(페르소나 톤, 투자 성향, 기간)을 커스터마이징합니다.
- **대시보드 모니터링**: 홈 화면에서 포트폴리오 수익률, VIX 지수, 일일 미션 및 AI 인사이트를 즉각적으로 파악합니다.
- **AI 인터랙션**: 언제든 플로팅 버튼을 눌러 AI(베스퍼)와 대화하며 실시간 시장 분석 및 B2B 리포트 큐레이션을 받습니다.

### 2. 컴포넌트 아키텍처 ([COMPONENT_STRUCTURE.md](docs/COMPONENT_STRUCTURE.md))
- 기존 거대한 단일 파일 구조(`HomeScreen.tsx` 등)를 도메인 단위(`home/`, `persona/`, `shared/`)로 완벽히 분리했습니다.
- `BaseCard`, `OptionButton`, `IconContainer` 등 강력한 재사용성(Reusability)을 지닌 디자인 시스템 기반 공통 컴포넌트를 구축하여 UI 일관성을 극대화했습니다.

### 3. 코드 품질 평가 ([CODE_QUALITY_REPORT.md](docs/CODE_QUALITY_REPORT.md))
- **가독성 및 유지보수성**: 컴포넌트 크기가 평균 40줄 이내로 대폭 감소하여 관심사의 분리가 명확해졌습니다.
- **타입 안전성**: 모든 컴포넌트에 엄격한 TypeScript Interface를 명시하여 런타임 에러 가능성을 차단했습니다.
- **개발자/AI 협업 최적화**: 주요 핵심 파일(`App.tsx`, `BaseCard.tsx` 등)에 개발자 및 AI 에이전트를 위한 상세한 `@description`, `@ai_context` Docstring을 추가하여 유지보수 컨텍스트를 보존했습니다. 종합 S 등급(93/100)을 달성했습니다.

---

## 💻 시작하기 (Getting Started)

```bash
# 의존성 패키지 설치
npm install

# 로컬 개발 서버 실행 (포트 5173)
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속하여 확인해 주세요.

---

## 🛠 Tech Stack
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Architecture**: Domain-Driven Component Structure

---

## 📁 프로젝트 구조

```
my-wonderful-app/
├── src/
│   ├── app/
│   │   ├── App.tsx              # 루트 라우팅 (Landing → Splash → Home)
│   │   └── components/
│   │       ├── LandingPage.tsx   # 🆕 랜딩페이지 (고객 Hook)
│   │       ├── SplashScreen.tsx  # 스플래시 화면
│   │       ├── HomeScreen.tsx    # 메인 대시보드
│   │       ├── ChatScreen.tsx    # AI 채팅
│   │       ├── PersonaScreen.tsx # 페르소나 설정
│   │       ├── home/             # 홈 화면 서브 컴포넌트
│   │       ├── persona/          # 페르소나 서브 컴포넌트
│   │       └── shared/           # 공통 UI 컴포넌트
│   ├── assets/                   # 이미지 에셋
│   └── styles/                   # CSS (Tailwind, 테마, 폰트)
├── docs/                         # 설계 문서
│   ├── LANDING_PAGE_CHECKLIST.md # 🆕 랜딩페이지 체크리스트 평가서
│   ├── 01_PRD_Final.md
│   ├── UX_FLOW.md
│   ├── COMPONENT_STRUCTURE.md
│   └── CODE_QUALITY_REPORT.md
└── package.json
```
