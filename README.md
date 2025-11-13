# 📚 워드비트 (WordBit)

NGSL 1,297개 영어 단어를 효과적으로 학습할 수 있는 React 웹 애플리케이션입니다.

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

## 🎮 사용 방법

1. **단어 학습**
   - 단어 카드를 탭하여 뜻 확인
   - 아는 단어 → 오른쪽 스와이프 또는 "알아요" 버튼
   - 모르는 단어 → 왼쪽 스와이프 또는 "모름" 버튼

2. **메뉴 (☰)**
   - 단어 목록: 학습한 단어 확인 및 수정
   - 진행 상황: 상세 통계 확인
   - 설정: 백업/복원, 데이터 초기화
   - 테마 변경: 다크/라이트 모드 전환

3. **백업/복원**
   - 설정 → 백업 파일 내보내기
   - 다른 기기에서 백업 파일 가져오기

## 🛠 기술 스택

- **React 19.2.0** + **TypeScript**
- **Vite** - 빠른 개발 환경
- **LocalStorage** - 로컬 데이터 저장
- **NGSL** - New General Service List 1,297 단어

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── WordCard.tsx          # 단어 카드 (스와이프)
│   ├── ProgressBar.tsx       # 진행률 바
│   ├── Statistics.tsx        # 완료 통계
│   ├── ProgressPage.tsx      # 진행 상황 페이지
│   ├── WordListPage.tsx      # 단어 목록 & 수정
│   ├── SettingsPage.tsx      # 설정 페이지
│   └── MenuDrawer.tsx        # 햄버거 메뉴
├── data/
│   └── words.ts              # NGSL 1,297개 단어
├── hooks/
│   └── useWordLearning.ts    # 학습 로직
├── types/
│   └── index.ts              # TypeScript 타입
├── utils/
│   └── storage.ts            # 저장/불러오기
├── App.tsx                   # 메인 앱
└── App.css                   # 스타일
```

## 💡 주요 특징

- ✅ **1,297개 NGSL 단어** - 실제 영어 학습에 필요한 기본 단어
- ✅ **랜덤 학습** - 매번 다른 순서로 학습
- ✅ **전체 추적** - 모든 단어의 상태를 정확히 기록
- ✅ **오프라인 지원** - 인터넷 없이도 사용 가능
- ✅ **데이터 백업** - JSON 파일로 백업/복원
- ✅ **모바일 최적화** - 터치 친화적인 UI

## 🚀 배포

이 프로젝트는 정적 사이트로 배포할 수 있습니다:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## 📝 라이선스

MIT

## 👨‍💻 개발자

[@dev-jhjoo](https://github.com/dev-jhjoo)
