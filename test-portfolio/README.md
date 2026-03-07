# 💼 사업기획자 웹 이력서

LG 전자 공간사업기획팀 재직 중인 2년차 사원의 **인터랙티브 웹 이력서** 프로젝트입니다.

## ✨ 주요 특징

- 📱 **완전 반응형 디자인** - 모바일, 태블릿, 데스크톱 모두 최적화
- 🎨 **모던한 디자인** - TailwindCSS를 활용한 프로페셔널 스타일
- ⚡ **빠른 성능** - Vanilla JavaScript로 가벼운 번들 사이즈
- 🎭 **부드러운 애니메이션** - Intersection Observer를 활용한 진입 효과
- 🌙 **다크모드 지원** - 사용자 선호도 저장
- ♿ **접근성 준수** - WCAG 2.1 AA 레벨

## 🚀 빠른 시작

### 사전 요구사항
- Node.js v18.0.0 이상
- npm v9.0.0 이상

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저가 자동으로 `http://localhost:8000`에서 열립니다.

### 프로덕션 빌드

```bash
npm run build
```

## 📁 프로젝트 구조

```
├── index.html              # 메인 HTML
├── styles/
│   ├── input.css           # TailwindCSS 입력
│   ├── custom.css          # 커스텀 스타일
│   └── tailwind.css        # 생성된 출력
├── js/
│   ├── main.js             # 네비게이션 로직
│   ├── scroll-animations.js # 애니메이션
│   └── theme.js            # 테마 전환
├── Roadmap.md              # 개발 로드맵
└── CLAUDE.md               # Claude Code 지침
```

## 🛠 기술 스택

| 기술 | 용도 |
|------|------|
| **HTML5** | 시맨틱 마크업 |
| **CSS3** | 스타일링 |
| **TailwindCSS** | 유틸리티 기반 스타일 |
| **JavaScript** | 인터랙션 |
| **PostCSS** | CSS 전처리 |

## 📋 이력서 섹션

1. **헤더** - 프로필, 이름, 직급, 연락처
2. **소개** - 핵심 강점 (3가지)
3. **경력사항** - LG 전자 공간사업기획팀 상세 정보
4. **주요 성과** - 프로젝트별 실적
5. **보유 기술** - 비즈니스 스킬, 분석 도구
6. **연락처** - 이메일, 전화번호

## 🎯 개발 로드맵

상세한 개발 계획은 [Roadmap.md](./Roadmap.md)를 참고하세요.

### 개발 단계
1. ✅ **Phase 1** - 프로젝트 초기화
2. ⬜ **Phase 2** - 기본 레이아웃 & 스타일
3. ⬜ **Phase 3** - 콘텐츠 섹션 구현
4. ⬜ **Phase 4** - 인터랙티브 기능
5. ⬜ **Phase 5** - 최적화 및 배포

## 🎨 색상 팔레트

```
Primary:    #1F2937 (짙은 회색)
Accent:     #3B82F6 (파란색)
Success:    #10B981 (초록색)
Warning:    #F59E0B (주황색)
Danger:     #EF4444 (빨간색)
Background: #FFFFFF (흰색)
```

## 📊 성능 목표

- Lighthouse 성능 점수: **90점 이상**
- 페이지 로드 시간: **2초 이하**
- CSS 크기: **< 50KB** (minified)
- JavaScript 크기: **< 30KB** (minified)

## 🔧 주요 명령어

```bash
# 개발 서버 (TailwindCSS 감시 + HTTP 서버)
npm run dev

# 프로덕션 빌드 (CSS 최소화)
npm run build

# TailwindCSS 감시 모드만
npm run tailwind:watch

# 로컬 서버만 실행
npm run serve
```

## 📝 코드 스타일 가이드

- **한국어**: 코드 주석, 커밋 메시지, 문서화
- **영어**: 변수명, 함수명, 클래스명
- **Prettier** 설정 (프로젝트 추후 추가)
- **ESLint** 규칙 (프로젝트 추후 추가)

## ♿ 접근성

- 시맨틱 HTML5 구조 사용
- 이미지에 대한 alt 텍스트 제공
- 충분한 색상 대비 (WCAG AA)
- 키보드 네비게이션 지원
- 모션 감소 옵션 지원 (`prefers-reduced-motion`)

## 📱 브라우저 지원

- Chrome/Edge (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Mobile Safari (iOS 12+)
- Chrome Android (최신)

## 📦 배포

### Vercel 배포 (추천)
```bash
npm install -g vercel
vercel
```

### Netlify 배포
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### GitHub Pages 배포
1. 저장소 설정에서 Pages 활성화
2. `main` 브랜치에서 배포 선택

## 🤝 기여 가이드

1. 기능 브랜치 생성: `git checkout -b feature/feature-name`
2. 변경사항 커밋: `git commit -m "기능: 기능 설명"`
3. 브랜치 푸시: `git push origin feature/feature-name`
4. Pull Request 생성

## 📄 라이센스

MIT License - [LICENSE](./LICENSE) 파일 참고

## 📞 문의

- 이메일: jin.ho.kim@lge.com
- 전화: 010-XXXX-XXXX

---

**Last Updated**: 2026-03-02

Made with ❤️ by Kim Jin Ho
