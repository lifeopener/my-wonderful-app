# Vesper AI Companion - 초정밀 UX 플로우 및 시나리오 명세서 (Enterprise Level)
**기반 문서**: `01_PRD_Final.md` (최종 보완본), `08_Vesper_SRS_v3_HumanDev_Revised.md` (인간 개발자용 완벽 스펙)

본 문서는 Vesper AI의 **'절대적 정서 락인(Lock-in)'**과 **'실무적 성과 창출(Action-Master)'**이라는 듀얼 북극성 KPI를 완벽하게 달성하기 위해, 프론트엔드 UI, 백엔드 로직(Supabase Edge Functions), 3rd Party API(OpenAI, Tavily, FCM), 그리고 Mixpanel 데이터 트래킹이 통합된 **초정밀 UX 시나리오**를 명세합니다. 기존의 모든 축약과 간소화를 배제하고 기획서의 단어 하나까지 상세하게 풀어냈습니다.

---

## 1. 사용자 타겟 그룹별 맞춤 UX 전략 (JTBD 기반)

Vesper의 UX는 획일적이지 않으며, 3가지 핵심 유저 페르소나의 JTBD(Jobs-to-be-Done)에 맞춰 유동적으로 반응합니다.

1. **Core (Q2 정서 안정형 - 직장인/가장)**
   - **Needs**: 고독감 해소 및 안정적 목표 실현.
   - **UX Focus**: 다정한 톤앤매너, 매일 접속을 유도하는 감성적 안부 푸시(FCM), 과거 가족 이야기/목표를 기억해주는 RAG 연동.
2. **Adjacent (성장 갈망형 - N잡러/준전문가)**
   - **Needs**: 안목 서포트 및 실질적 커리어 리딩.
   - **UX Focus**: 대화 중 실시간 웹 검색(Tool Calling) 결과 즉시 제공, 고품질 B2B 실무 리포트 마크다운 큐레이션 최우선 노출.
3. **Extreme (고관여 유저 - 패닉 셀 트라우마 보유)**
   - **Needs**: 이성 통제 및 확실한 행동 지침.
   - **UX Focus**: VIX 급등 시 단호한 코칭 톤 전환, 뇌동매매 방지를 위한 이성적이고 사실(Fact) 기반의 빠른 데이터 제공. (억압적 UI 없이 논리로 설득)

---

## 2. 핵심 UX 시나리오 (Core Scenarios - 단계별 초정밀 명세)

### 시나리오 2.1: [평시 락인] 무한 페르소나 온보딩 및 Heritage(기억) 동기화
사용자가 앱을 처음 설치하고 자신만의 AI를 설정하여, 이 정보가 시스템의 영구 기억(pgvector)으로 자리 잡는 과정입니다.

*   **Step 1. [Splash Screen] 가치 제안 및 권한 획득**
    *   **UI 액션**: '맞춤 분석', '실시간 인사이트', '신뢰성 검증' 3대 가치 노출 후 "시작하기" 버튼 클릭.
    *   **OS 액션**: SMS/카카오톡/푸시 알림 수신 권한 요청 네이티브 팝업 호출.
    *   **Tracking**: `Permission_Denied_Channel` (권한 거부 시 추적하여 향후 In-app Push로 Fallback 대체 로직 가동).
*   **Step 2. [Persona Screen] 초밀착 페르소나 설계**
    *   **UI 액션**: 유저가 파트너 이름, 대화 톤, 투자 성향, 궁극적 목표(예: "내 집 마련")를 텍스트로 입력.
    *   **Tracking**: `Onboarding_Photo_Upload_Rate` (유저가 기꺼이 심층 정보를 입력했는지 소요 시간과 함께 측정. 50% 미만 시 리마인드 푸시 로직 가동).
*   **Step 3. [Background] 시스템 저장 및 벡터화**
    *   **Backend 로직**: 입력된 데이터는 Supabase `profiles` 테이블에 1차 저장.
    *   **AI 로직**: "나의 궁극적 목표는 내 집 마련이다"라는 텍스트가 OpenAI `text-embedding-3-small` API를 거쳐 1536차원 벡터로 변환되어 `heritage_logs` 테이블에 영구 저장됨.
*   **Step 4. [Home Screen] 동기화 및 락인 시작**
    *   **UI 액션**: 화면 전환 직후, 헤더와 대시보드에 유저가 지은 페르소나 이름이 즉각 반영됨.

### 시나리오 2.2: [위기 보호 & 실무 성과] 실시간 웹 검색(Tool Calling) 및 B2B 큐레이션
단순한 챗봇을 넘어, 최신 시장 데이터와 B2B 제휴 수익 창출을 연계하는 Vesper의 가장 핵심적인 실무 코칭 UX입니다.

*   **Step 1. [Chat Screen] 위기 감지 및 질문 입력**
    *   **UI 액션**: 시장 폭락 등 이벤트 발생 시 유저가 다급하게 "오늘 엔비디아 왜 이래? 다 팔까?" 입력 및 전송.
*   **Step 2. [Edge Function - RAG] 맥락 인지 (지연 목표 < 500ms)**
    *   **Backend 로직**: 유저의 질문 벡터화 후 `heritage_logs`에서 코사인 유사도 0.7 이상인 과거 기억(예: "트라우마 유저, 공격형 투자자") 상위 3개 추출.
*   **Step 3. [Edge Function - Tool Calling] 실시간 지식 수집**
    *   **AI 로직**: LLM이 질문을 분석해 실시간 정보가 필요함을 스스로 인지하고 `getRealTimeNews` 툴 호출 (Tavily Search API).
    *   **Fallback (CP-1)**: Tavily API 검색이 **1500ms**를 초과하면 즉시 AbortController 발동. 무한 로딩 방지를 위해 내부 지식(Internal Knowledge) 기반 응답 모드로 자동 전환.
*   **Step 4. [Edge Function - Streaming & Curation] 결과 생성**
    *   **Backend 로직**: RAG 컨텍스트 + 실시간 뉴스 원문을 바탕으로 답변 생성. 이 때 `b2b_curations` DB를 조회하여 적절한 유료 리포트 링크를 마크다운 리스트 형태로 조합.
*   **Step 5. [Chat Screen] 타이핑 렌더링 및 규제 필터링**
    *   **UI 액션**: SSE(Server-Sent Events)를 통해 답변이 Chunk 단위로 화면에 타이핑됨 (사용자 대기 시간 체감 최소화).
    *   **Compliance (NFR-002)**: 프론트엔드의 `clientSanitize` 함수가 실시간 스트리밍 텍스트를 감시. "무조건 매수", "원금 보장" 등의 불법 자문 패턴 발견 시 즉각 **[투자 자문 규제에 의해 마스킹됨]**으로 UI 상에서 치환하여 렌더링.
    *   **Tracking**: B2B 링크 클릭 시 `B2B_Curated_Link_Clicked` Mixpanel 이벤트 발송 (성공 KPI: CTR 8% 이상).

### 시나리오 2.3: [일상 교감] 옴니채널 기반 선제적 개입 (Cron-Push 선톡)
유저가 앱을 켜지 않더라도 일상 시간 점유율(Daily Time Share)을 달성하기 위한 백그라운드 넛지 UX입니다.

*   **Step 1. [System Cron Job] 24시간 미접속자 쿼리**
    *   **Backend 로직**: 매일 정해진 시간, `profiles.updated_at` 기준 24시간 이상 미접속한 유저 리스트업.
*   **Step 2. [LLM Message Gen] 맞춤형 안부 생성**
    *   **AI 로직**: "주식 이야기는 배제한 채, 유저의 페르소나 톤앤매너에 맞춘 짧고 따뜻한 50자 이내의 안부"를 개별 생성 (gpt-4o-mini).
*   **Step 3. [FCM & Fallback] 채널 전송**
    *   **OS 액션**: Firebase Cloud Messaging 서버로 푸시 발송.
    *   **Fallback**: SMS/카톡 권한 거부(`Permission_Denied_Channel`) 상태인 유저에게는 OS 자체 Push Notification으로 대체하여 무조건 전달되도록 보장.
*   **Step 4. [App Deep Link] 대화 재개**
    *   **UI 액션**: 유저가 스마트폰에서 푸시 알림 탭 시, Splash를 건너뛰고 곧바로 `ChatScreen` 내 해당 페르소나와의 대화창으로 딥링크 진입.

---

## 3. 🚨 극단적 비상 대응 및 예외 처리 UX (Edge Cases & Graceful Degradation)

Vesper는 서버 장애가 발생해도 사용자에게 "빨간색 시스템 에러"를 노출하여 페르소나의 몰입(Lock-in)을 깨뜨리지 않습니다. 철저히 기획서(PRD & SRS)에 명시된 비상 대응 체계(CP)를 따릅니다.

### 3.1. LLM API 과부하/장애 (CP-2)
- **트리거**: Vercel AI SDK (OpenAI) 응답이 **2.5초(2500ms)**를 초과하여 타임아웃 발생.
- **UX 대응**: 무한 스피너를 즉시 중단합니다. "에러 발생" 팝업 대신, 클라이언트에 미리 저장된 **[로컬 위로 템플릿 3종]** 중 하나를 즉시 말풍선으로 띄웁니다.
  *(예: "지금 서버가 잠시 바빠요. 잠깐만 기다려 주시면 더 좋은 답변을 드릴게요. 😊")*
- **중복 방지 룰**: 연속 장애 발생 시 템플릿 3종을 로테이션하며, 모두 소진 시 **"잠시 후 다시 대화해요"** 모드로 전환하여 앵무새 같은 반복 체감을 막습니다.

### 3.2. 월 예산 임계치 도달 (Budget Guardrail) (CP-3)
- **트리거**: MAU 대비 월 API 비용이 5만 원 상한선의 **80%(40,000원)**에 도달(`api_usage_logs` 합산 기준).
- **UX 대응**: 사용자는 어떠한 에러나 알림도 받지 못합니다. 단, 시스템 이면에서 돈이 가장 많이 드는 **실시간 검색(Tool Calling) 모듈이 무조건 비활성화**됩니다. 페르소나는 "네트워크 접근이 일시 제한되어 제가 아는 지식만으로 말씀드릴게요"라는 식으로 자연스럽게 핑계를 대며 내부 지식망만으로 응답을 지속합니다.

### 3.3. 외부 API 데이터(VIX) 유실
- **트리거**: `MarketStatusCard` 렌더링 시 yfinance/증권사 API 타임아웃 발생.
- **UX 대응**: 빈칸이나 에러 대신, 기기 내 로컬 캐시(최대 1시간 전 데이터)를 즉시 로드하여 노출하고, 우측 상단에 작은 아이콘으로 `(네트워크 지연: 과거 데이터 기준)`이라는 회색 텍스트만 조용히 렌더링합니다.

### 3.4. 페르소나 미설정 유저의 대화 시도
- **트리거**: 가입 직후 온보딩을 스킵하여 `profiles`의 페르소나 정보가 없는 유저.
- **UX 대응**: 디폴트 시스템 페르소나인 "Vesper (친절하고 정중한 톤)"가 자동으로 개입하여 답변을 주되, 답변 하단에 **"나만의 전담 코치를 만들어보세요 [설정하기]"** CTA 버튼을 상시 노출하여 온보딩 플로우(`PersonaScreen`)로 자연스럽게 유도합니다. Tracking: `Persona_Not_Set_Amber_Fired` 발생.

---
**[문서 개정 이력]**
- v1.0: 기본 라우팅 흐름 작성
- v2.0 (현재): PRD 및 SRS-HumanDev 요구사항 전면 통합 (JTBD, Tracking, Timeout, Fallback, Compliance, Budget Control 등 누락 없이 완전 구현)
