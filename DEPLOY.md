# 🚀 GitHub 배포 가이드

## 1️⃣ GitHub에 올리기

### 방법 1: 터미널 사용

```bash
# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: WordBit - NGSL 영어 단어 학습 앱"

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub 원격 저장소 연결
git remote add origin https://github.com/dev-jhjoo/my-wordbit.git

# GitHub에 푸시
git push -u origin main
```

### 방법 2: GitHub Desktop 사용

1. GitHub Desktop 열기
2. File → Add Local Repository
3. 프로젝트 폴더 선택
4. "Create a repository" 클릭
5. Publish repository 클릭
6. Repository name: `my-wordbit` 입력
7. Publish 클릭

## 2️⃣ Vercel에 배포하기 (추천)

### 자동 배포 설정

1. [Vercel](https://vercel.com) 접속
2. "Import Project" 클릭
3. GitHub 저장소 연결
4. `my-wordbit` 선택
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Deploy 클릭

### 환경 변수 (필요 없음)
이 프로젝트는 환경 변수가 필요 없습니다.

## 3️⃣ Netlify에 배포하기

1. [Netlify](https://netlify.com) 접속
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 연결
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy 클릭

## 4️⃣ GitHub Pages에 배포하기

### package.json 수정

```json
{
  "homepage": "https://dev-jhjoo.github.io/my-wordbit",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### gh-pages 설치 및 배포

```bash
# gh-pages 설치
npm install --save-dev gh-pages

# 배포
npm run deploy
```

### GitHub 설정

1. GitHub 저장소 → Settings
2. Pages → Source: `gh-pages` 브랜치 선택
3. Save

## 5️⃣ 업데이트 푸시하기

```bash
# 변경사항 확인
git status

# 변경된 파일 추가
git add .

# 커밋
git commit -m "Update: 기능 추가/수정 설명"

# GitHub에 푸시
git push
```

## 📝 유용한 Git 명령어

```bash
# 현재 상태 확인
git status

# 변경 이력 확인
git log --oneline

# 원격 저장소 확인
git remote -v

# 브랜치 확인
git branch

# 최신 코드 받기
git pull
```

## 🔧 문제 해결

### "remote origin already exists" 에러

```bash
git remote remove origin
git remote add origin https://github.com/dev-jhjoo/my-wordbit.git
```

### 푸시 권한 에러

```bash
# GitHub 토큰 사용
git remote set-url origin https://YOUR_TOKEN@github.com/dev-jhjoo/my-wordbit.git
```

### 대용량 파일 에러

```bash
# node_modules가 포함되었는지 확인
git rm -r --cached node_modules
git commit -m "Remove node_modules"
```

## 🌐 배포 후 확인사항

- ✅ 모든 페이지가 정상 작동하는지 확인
- ✅ 다크모드 전환 테스트
- ✅ 단어 학습 기능 테스트
- ✅ 백업/복원 기능 테스트
- ✅ 모바일에서 정상 작동 확인

## 📱 모바일 앱으로 만들기 (선택사항)

### PWA (Progressive Web App)

1. `manifest.json` 추가
2. Service Worker 설정
3. 모바일에서 "홈 화면에 추가"

### Capacitor (네이티브 앱)

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add ios
npx cap add android
```

## 🎉 완료!

배포가 완료되면 다음 URL에서 접속할 수 있습니다:
- Vercel: `https://my-wordbit.vercel.app`
- Netlify: `https://my-wordbit.netlify.app`
- GitHub Pages: `https://dev-jhjoo.github.io/my-wordbit`
