## ✅ Firebase Studio 입력 프롬프트 (전체 복사)

```
Build a React Native (Expo) mobile app called "Vesper AI Companion OS" — a premium AI companion app for investors. The design must feel extremely premium, emotional, and trustworthy. Use a dark navy/black base with a warm amber/gold accent color (#F5A623) and soft purple highlights. Use the Inter or Outfit font family throughout.

## Tech Stack
- React Native with Expo (TypeScript)
- NativeWind (Tailwind CSS for React Native) for all styling
- React Navigation (Stack + Bottom Tab)
- expo-safe-area-context for safe area handling

## ABSOLUTE DESIGN RULES (Never break these)
- Dark mode only. Background: #0A0A12 (deep navy-black)
- Primary accent: #F5A623 (warm amber/gold)
- Secondary accent: #7B61FF (soft violet)
- Text primary: #F0F0F0, Text secondary: #8A8A9A
- NO screen blur, NO button locks, NO intrusive overlays that block user interaction
- All transitions must be smooth (native iOS slide / Android fade)
- All interactive elements must have visible tap feedback (opacity change or scale)

## Screens to Build

### 1. Splash / Onboarding Screen (`SplashScreen.tsx`)
- Full screen dark background (#0A0A12)
- Center: Vesper logo (a small glowing amber star icon) with app name "VESPER" in large, spaced-out serif font
- Subtitle: "당신의 평생 투자 파트너" in soft gray
- Bottom: "시작하기" CTA button — pill-shaped, amber gradient background (#F5A623 → #E8920A), full width, with a subtle glow shadow
- Smooth fade-in animation on mount (use Animated API or Reanimated)

### 2. Home Dashboard Screen (`HomeScreen.tsx`)
- Header: Left side shows greeting text ("안녕하세요, [유저명]님") and current persona name with a small avatar circle
- Hero section: A sleek card with rounded corners (radius 20) showing today's market mood — e.g., "오늘의 VIX 지수" with a color-coded badge (green=calm, red=panic). Use a subtle glassmorphism effect (semi-transparent white border, slight blur)
- Mission card below: "오늘의 투자 미션" card with an amber left border accent, title, and a short description placeholder
- Large CTA button at the bottom center: Round floating button (60x60) with an amber background and chat bubble icon — tapping navigates to ChatScreen
- Bottom Tab Bar: 3 tabs — Home (house icon), Chat (bubble icon), Profile (person icon). Active tab highlighted in amber

### 3. Chat Screen (`ChatScreen.tsx`)
- Header: Shows current AI persona name + small avatar. Back button on the left.
- Message list: FlatList with auto-scroll to bottom when new messages arrive
- Two message bubble styles:
  - User bubble: Right-aligned, rounded corners (20px, sharp bottom-right), amber/gold background (#F5A623), dark text
  - AI bubble: Left-aligned, rounded corners (20px, sharp bottom-left), dark card background (#1A1A2E), light text. Supports markdown rendering (bold, lists, code blocks)
- AI bubble can also render a special "B2B Curation Card" instead of text when tool data arrives:
  - Card style: Dark background with amber left border, title, category badge, and "보러가기 →" link button
  - Multiple cards displayed in a horizontal scroll view
- Input area at the bottom:
  - TextInput with dark background (#1A1A2E), rounded full, placeholder "베스퍼에게 말해보세요...", soft border
  - Send button: Amber circle with arrow icon, disabled state when input is empty
  - Wrapped in KeyboardAvoidingView (behavior: "padding" for iOS, "height" for Android)
- Loading state: When AI is typing, show a small animated "..." bubble on the left side (three dots with staggered pulse animation)
- Error state: Instead of a crash, show a friendly inline message: "연결이 잠시 불안정합니다. 잠깐만 기다려 주세요 🌙" in a soft amber-tinted card. Include a "다시 시도" retry button.

### 4. Persona Setup Screen (`PersonaScreen.tsx`)
- Title: "나만의 파트너 만들기" — centered, large
- Avatar section: A circular avatar placeholder with a "+" icon in the center — tapping opens image picker
- Form fields (all dark-styled TextInputs with amber focus border):
  - Persona Name (e.g., "베스퍼")
  - Tone/Personality (e.g., "따뜻하고 전문적인")
- Goal section: A multi-line TextInput: "나의 투자 목표는..." with a placeholder
- Save button: Full-width amber gradient pill button at the bottom: "파트너 저장하기"
- All fields animate upward when keyboard appears (KeyboardAvoidingView)

### 5. Common Components to Build
- `LoadingSpinner.tsx`: A small amber-colored spinning ring using Animated.loop. Must NOT block the full screen — only appears inline where content is loading.
- `ErrorBoundaryUI.tsx`: A card component (not full-screen overlay) showing error icon, friendly message, and retry button.
- `B2BCurationCard.tsx`: Props — title (string), category (string), url (string), description (string). Dark card with amber left accent bar, category badge in violet, title, short description, and a tappable "보러가기 →" row that opens the URL via Linking.openURL. Tap feedback via Pressable opacity.
- `ChatMessageBubble.tsx`: Props — role ('user' | 'assistant'), content (string), toolInvocations (optional). Renders markdown for assistant messages, renders B2BCurationCard horizontally when toolInvocations are present.

## Navigation Structure
- Stack Navigator root with:
  - SplashScreen (no header)
  - Main (Bottom Tab Navigator):
    - HomeScreen
    - ChatScreen
    - PersonaScreen

## Dummy Data to Use for Preview
- Persona name: "베스퍼"
- User name: "김민준"
- Sample chat messages:
  - user: "오늘 시장이 많이 떨어졌는데 어떻게 생각해?"
  - assistant: "지금 VIX가 22를 넘어서 시장이 꽤 불안한 상황이에요. **하지만 장기 관점에서 보면 지금이 오히려 기회일 수 있어요.** 아래 리포트가 도움이 될 거예요:"
  - Then a B2BCurationCard: { title: "2024 하반기 포트폴리오 리밸런싱 가이드", category: "투자 교육", url: "https://example.com" }
- Today's VIX: 22.4 (show as "경계" in orange badge)
- Daily mission: "오늘 포트폴리오를 한 번 점검해보세요"

## Final Quality Check
- Every screen must look premium and beautiful — imagine this is on the App Store featured list
- Animations should be smooth, not janky
- No plain white backgrounds anywhere
- All text must be legible against dark backgrounds
- The app must feel like a trustworthy financial companion, not a generic chatbot
```