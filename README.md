# 📚 워드비트 (WordBit)

**Toss App**으로 개발된 NGSL 1,297개 중 중요 600개 영어 단어를 효과적으로 학습할 수 있는 React 웹 애플리케이션입니다.
`@apps-in-toss/web-framework`와 `Granite`를 기반으로 구축되었습니다.

## ✨ 주요 기능

### 📱 학습 기능
- **스와이프 학습**: 카드를 좌우로 드래그하거나 버튼으로 단어 분류
- **랜덤 순서**: 매 라운드마다 단어가 랜덤하게 섞여서 나옴
- **라운드 시스템**: 
  - 1라운드: 전체 1,297개 단어 학습
  - 2라운드 이상: 모르는 단어만 반복 학습
  - 모든 단어를 알 때까지 계속

### 💾 데이터 관리
- **자동 저장**: LocalStorage에 실시간 자동 저장
- **파일 백업**: JSON 파일로 내보내기/가져오기
- **전체 단어 추적**: 1,297개 모든 단어의 상태 추적
  - 학습 전 (not-studied)
  - 아는 단어 (known)
  - 모르는 단어 (unknown)
  - 완료 (completed)

### 🎨 사용자 경험
- **다크모드**: 라이트/다크 테마 자동 저장
- **단어 목록**: 학습한 단어 검색 및 상태 수정
- **진행 상황**: 상세한 학습 통계 확인
- **반응형 디자인**: 모바일/데스크톱 최적화

## 🛠 기술 스택

- **Framework**: `@apps-in-toss/web-framework`
- **Build Tool**: `Granite` (Vite 기반)
- **Frontend**: React 19.2.0 + TypeScript
- **State Management**: LocalStorage (Custom Hooks)
- **Data**: NGSL (New General Service List) 1,297 단어

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

Granite 기반의 개발 서버를 실행합니다.

```bash
npm run dev
# 또는
granite dev
```

### 빌드

프로젝트를 프로덕션용으로 빌드합니다.

```bash
npm run build
# 또는
granite build
```

### 프리뷰

빌드된 결과물을 미리 확인합니다.

```bash
npm run preview
```

## ⚙️ 설정 (Configuration)

`granite.config.ts` 파일에서 앱의 주요 설정을 관리합니다.

```typescript
export default defineConfig({
  appName: 'my-wordbit',
  brand: {
    displayName: '워드비트', // 앱 이름
    primaryColor: '#3182F6', // 테마 색상
    // ...
  },
  // ...
});
```

## 🚀 배포 (Deployment)

### Toss 플랫폼 배포

Toss App 배포 도구를 사용하여 배포합니다.

```bash
npm run deploy
# 또는
ait deploy
```

### 기타 정적 호스팅 배포

이 프로젝트는 표준 웹 기술을 사용하므로 Vercel, Netlify, GitHub Pages 등에도 배포 가능합니다.
`dist` 폴더의 내용을 정적 호스팅 서비스에 업로드하세요.

## 📁 프로젝트 구조

```
src/
├── components/      # UI 컴포넌트
├── data/            # 단어 데이터 (NGSL)
├── hooks/           # 커스텀 훅 (학습 로직)
├── types/           # TypeScript 타입 정의
├── utils/           # 유틸리티 함수 (스토리지 등)
├── App.tsx          # 메인 앱 컴포넌트
└── App.css          # 전역 스타일
granite.config.ts    # Granite 설정 파일
```

## 📝 라이선스

MIT

## 👨‍💻 개발자

[@dev-jhjoo](https://github.com/dev-jhjoo)
