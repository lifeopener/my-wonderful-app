# Vesper AI Companion - 통합 아키텍처 및 스크린 플로우 다이어그램 (Enterprise Level)
**기반 문서**: `01_PRD_Final.md`, `08_Vesper_SRS_v3_HumanDev_Revised.md`

본 문서는 Vesper AI Companion의 화면 간 네비게이션은 물론, 클라이언트 앱과 백엔드 인프라(Edge Functions, pgvector, 외부 API), 그리고 데이터 트래킹 및 폴백(Fallback) 방어 체계까지 아우르는 고도화된 전체 시스템 흐름을 시각화합니다. 어떤 기능적/비기능적 명세도 생략되지 않았습니다.

---

## 1. 🌐 통합 옴니채널 시스템 및 네비게이션 아키텍처

React 클라이언트 스크린들과 Supabase BaaS, 3rd Party API 간의 상호작용 및 추적 로그(Mixpanel) 적재 지점을 모두 포함합니다.

```mermaid
stateDiagram-v2
    %% Client Screens
    state "📱 Splash Screen (가치 제안)" as Splash
    state "📱 Home Screen (Dashboard)" as Home
    state "📱 Persona Screen (Settings)" as Persona
    state "📱 Chat Screen (Action-Master)" as Chat
    
    %% Triggers & Background
    state "OS 팝업: 알림 권한 요청" as Permission
    state "FCM Push / 카카오 알림톡 발송" as Push
    
    %% Serverless Backend
    state "Supabase DB (PostgreSQL)" as DB
    state "pgvector (heritage_logs)" as VectorDB
    state "Edge Func: /api/cron-push" as CronAPI
    
    %% Mixpanel Trackers (Event Nodes)
    state "📊 Track: Permission_Denied" as TR_Perm
    state "📊 Track: Onboarding_Upload_Rate" as TR_Onboard

    [*] --> Splash
    Splash --> Permission
    Permission --> Home : 승인
    Permission --> TR_Perm : 거부 (추후 인앱 푸시로 대체)
    TR_Perm --> Home
    
    %% Persona Config Flow
    Home --> Persona : 프로필 설정 진입
    Persona --> DB : [Update] profiles.persona_name, tone
    Persona --> VectorDB : [Insert] 유저 궁극적 목표 임베딩 (text-embedding-3-small)
    Persona --> TR_Onboard : 저장 완료 로깅
    VectorDB --> Home : 즉시 State 동기화 (아바타/이름 반영)
    
    %% Core Interaction
    Home --> Chat : 채팅 진입 (FAB / Nav Bar)
    
    %% Cron & Lock-in Flow
    CronAPI --> DB : 24h 미접속 유저 쿼리
    CronAPI --> Push : 맞춤형 안부 생성 및 발송
    Push --> Chat : 딥링크 클릭 (유저 재관여)
```

---

## 2. ⚡ 초정밀 Chat Screen 실시간 인터랙션 시퀀스 (Tool Calling & RAG)

Vesper 시스템의 뇌(Brain) 역할을 하는 `/api/chat` Edge Function 내부의 초단위 타임아웃 제어, 예산 통제(Budget Guardrail), RAG 추출 및 실시간 검색, 그리고 규제 마스킹까지의 완벽한 흐름도입니다.

```mermaid
sequenceDiagram
    autonumber
    actor User as 사용자 (App)
    participant ChatUI as ChatScreen (React)
    participant Edge as /api/chat (Deno Edge)
    participant DB as Supabase DB (Budget/B2B)
    participant VectorDB as pgvector (Heritage)
    participant Tools as Tavily API (Search)
    participant AI as OpenAI (LLM)
    participant Mixpanel as Mixpanel (Tracking)

    User->>ChatUI: "엔비디아 하락 원인이 뭐야?"
    ChatUI->>ChatUI: 사용자 메시지 로컬 렌더링 & Loading Spinner
    
    ChatUI->>Edge: POST /api/chat (userId, messages)
    activate Edge
    
    %% 1. Budget & Compliance Guardrails
    Edge->>DB: 현재 누적 비용 조회 (rpc: get_monthly_cost)
    DB-->>Edge: "38,000 KRW (80% 임계치 미만)"
    
    %% 2. RAG Extraction
    Edge->>VectorDB: User Message 임베딩 유사도 검색
    VectorDB-->>Edge: 과거 맥락 반환 ("공격투자형", "트라우마 보유")
    
    %% 3. Tool Calling with Timeout (CP-1)
    Edge->>Tools: 실시간 하락 뉴스 검색 (getRealTimeNews)
    alt 검색 성공 ( < 1500ms )
        Tools-->>Edge: 뉴스 원문 (JSON)
    else 검색 타임아웃 발생 ( > 1500ms )
        Tools--xEdge: [Abort] 내부 지식 Fallback 발동
    end
    
    %% 4. B2B Catalog Fetch
    Edge->>DB: 활성 B2B 큐레이션 링크 조회
    DB-->>Edge: Markdown 포맷 링크 카탈로그 반환
    
    %% 5. LLM Streaming with Timeout (CP-2)
    Edge->>AI: System Prompt + RAG + News + B2B 조합하여 Stream 요청
    
    alt LLM 정상 응답 ( < 2500ms )
        AI-->>Edge: SSE Response Stream Chunk
        Edge-->>ChatUI: Chunk 전송
        
        %% 6. Client-Side Sanitize (NFR-002)
        ChatUI->>ChatUI: clientSanitize(정규식 마스킹)
        ChatUI->>User: 타이핑 애니메이션으로 안전하게 렌더링 완료
        
        %% 7. Post-Processing
        Edge->>VectorDB: AI 답변을 Vector로 변환하여 양방향 기록 (학습 진화)
        Edge->>DB: api_usage_logs (토큰 비용 기록)
        
    else LLM 과부하/장애 타임아웃 ( > 2500ms )
        AI--xEdge: [Abort] 연결 강제 종료
        Edge-->>ChatUI: HTTP 500 또는 Timeout Error
        
        %% Graceful Degradation UX
        ChatUI->>ChatUI: 🚨 [비상 대응] 무한 스피너 종료
        ChatUI->>User: 로컬 위로 템플릿 노출 ("잠시 서버가 바빠요😊")
        ChatUI->>Mixpanel: Track: Fallback_Sent 발송
    end
    
    deactivate Edge
```

---

## 3. 🚨 예외 및 상태 전이 다이어그램 (Edge Cases State Machine)

단순 정상 플로우 외에, 시스템 장애나 정책 임계점 도달 시 Vesper가 어떻게 동작하는지를 정의한 상태 머신입니다.

```mermaid
stateDiagram-v2
    state "Chat Request" as Request
    
    state "Budget Check" as Budget
    state "예산 80% 초과 (Limit Reached)" as BudgetLimit
    state "예산 정상 (Normal)" as BudgetNormal
    
    state "Tool Calling (Tavily)" as ToolCall
    state "검색 API 장애/지연 (>1.5s)" as SearchFail
    
    state "LLM Response Generation" as LLMGen
    state "LLM API 타임아웃 (>2.5s)" as LLMFail
    
    state "Compliance Filter (RegEx)" as Filter
    state "불법 투자자문 문구 감지" as IllegalDetected
    
    state "✅ 최종 안전 응답 렌더링" as FinalRender
    state "⚠️ 로컬 위로 템플릿 렌더링" as LocalFallback

    [*] --> Request
    Request --> Budget
    
    %% Budget Logic
    Budget --> BudgetLimit : 비용 > 40,000 KRW
    Budget --> BudgetNormal : 비용 < 40,000 KRW
    
    BudgetLimit --> LLMGen : Tool Calling 비활성화 상태로 진행
    BudgetNormal --> ToolCall
    
    %% Search Logic
    ToolCall --> SearchFail : CP-1 발동
    ToolCall --> LLMGen : 검색 성공
    SearchFail --> LLMGen : 내부 지식만 사용 (Fallback)
    
    %% LLM Logic
    LLMGen --> LLMFail : CP-2 발동
    LLMGen --> Filter : 스트림 생성 완료
    
    %% Fail Case
    LLMFail --> LocalFallback
    LocalFallback --> [*]
    
    %% Compliance Logic
    Filter --> IllegalDetected : "무조건 매수" 등 감지
    IllegalDetected --> FinalRender : "[규제에 의해 마스킹됨]" 텍스트 치환
    Filter --> FinalRender : 통과
    
    FinalRender --> [*]
```

### 아키텍처 다이어그램 가이드라인
본 다이어그램은 기획서 내 모든 **비기능적 요구사항(NFR)**과 **비상 대응 계획(CP 1~3)**을 UI 흐름 레벨로 끌어올린 것입니다. 프론트엔드 및 백엔드 개발자는 코드를 작성할 때 반드시 이 시퀀스의 분기점(타임아웃 수치 1500ms, 2500ms 등)과 예산 차단 로직이 구현되어 있는지 검증해야 합니다.
