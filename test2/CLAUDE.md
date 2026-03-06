# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고하는 지침을 제공합니다.

---

## 언어 및 커뮤니케이션 규칙

### 기본 설정
- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

### 응답 스타일
- 간결하고 명확한 설명
- 필요한 경우만 상세 설명 제공
- 파일 경로와 라인 번호로 코드 위치 명시 (예: `src/file.js:42`)

---

## 개발 환경 설정

### 필수 환경
- **Node.js**: v18.0.0 이상
- **npm**: v9.0.0 이상
- **패키지 관리자**: npm

### 개발 의존성 설치

```bash
npm install
```

---

## 주요 명령어

### 개발 서버 실행

```bash
npm run dev
```

- TailwindCSS 감시 모드 활성화
- HTTP 서버 실행 (포트 8000)
- 기본 브라우저에서 페이지 자동 열기

### 프로덕션 빌드

```bash
npm run build
```

- TailwindCSS를 프로덕션용으로 컴파일
- CSS를 최소화 (minify)

### TailwindCSS 개발 모드

```bash
npm run tailwind:watch
```

- CSS 변경사항 실시간 감시 및 컴파일

---

## 코드베이스 구조

```
business-planner-resume/
├── index.html              # 메인 HTML 파일
├── styles/
│   ├── input.css           # TailwindCSS 입력 파일
│   ├── custom.css          # 커스텀 스타일
│   └── tailwind.css        # 생성된 Tailwind 출력 (자동 생성)
├── js/
│   ├── main.js             # 메인 스크립트 (네비게이션, 초기화)
│   ├── scroll-animations.js # 스크롤 애니메이션 (Intersection Observer)
│   └── theme.js            # 다크모드 테마 전환
├── images/                 # 프로필 및 프로젝트 이미지 (생성 예정)
├── assets/                 # PDF 및 기타 리소스 (생성 예정)
├── package.json            # npm 설정
├── tailwind.config.js      # TailwindCSS 설정
├── postcss.config.js       # PostCSS 설정
├── Roadmap.md              # 개발 로드맵
└── .gitignore              # Git 무시 파일

```

### 핵심 아키텍처

**단일 페이지 웹 이력서**

```
1. HTML (index.html)
   └─ 시맨틱 마크업으로 섹션 구성 (hero, about, experience, achievements, skills, contact)

2. CSS (TailwindCSS)
   └─ 반응형 디자인 (모바일 우선)
   └─ 커스텀 애니메이션 및 스타일

3. JavaScript (모듈화)
   ├─ main.js: 네비게이션 및 기본 상호작용
   ├─ scroll-animations.js: 섹션별 Fade-in 애니메이션
   └─ theme.js: 테마 전환 (다크모드)
```

**데이터 흐름**
- 사용자가 페이지 접속
- index.html 로드 및 스타일 적용
- JavaScript 초기화 (테마, 애니메이션 옵저버 설정)
- 사용자 상호작용 (네비게이션, 스크롤)에 따라 애니메이션 트리거

### 중요 파일 및 역할

| 파일 | 역할 |
|------|------|
| `index.html` | 전체 콘텐츠 구조 및 마크업 |
| `tailwind.config.js` | 색상, 폰트, 애니메이션 커스터마이징 |
| `js/main.js` | 네비게이션 및 메뉴 토글 기능 |
| `js/scroll-animations.js` | Intersection Observer를 통한 진입 애니메이션 |
| `styles/custom.css` | 프린트 스타일, 접근성, 프린트 최적화 |

---

## 프로젝트별 주의사항

### 성능
- 이미지는 WebP 포맷으로 최적화하여 사용
- 불필요한 JavaScript 라이브러리 추가 금지 (Vanilla JS 우선)
- 프로덕션 빌드 시 CSS 최소화 필수

### 반응형 디자인
- **모바일 우선** 접근 방식 사용 (TailwindCSS 기본)
- 최소 3단계 반응형: 모바일 (< 768px), 태블릿 (768px ~ 1024px), 데스크톱 (> 1024px)
- 터치 디바이스 고려 (버튼 최소 48px 높이)

### 접근성 (A11y)
- 시맨틱 HTML 구조 유지
- 이미지에 alt 텍스트 작성
- 색상만으로 정보 전달 금지
- 키보드 네비게이션 지원
- WCAG 2.1 AA 레벨 준수

### SEO 최적화
- 메타 태그 (title, description, og:* tags) 작성
- 구조화된 데이터 (Schema.org) 고려
- 시맨틱 HTML 사용

### 콘텐츠 관리
- 개인정보 보호: 전화번호, 이메일 일부 마스킹
- 이력서 정보는 imaginary 2년차 사원 기준 (실명 사용 금지)

---

## 개발 워크플로우

### 로컬 개발
```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 시작
npm run dev

# 3. 코드 수정 후 자동 리로드 확인
```

### 빌드 및 배포
```bash
# 1. 프로덕션 빌드
npm run build

# 2. 배포 (Vercel, Netlify, GitHub Pages 등)
# 배포 전 Lighthouse 점수 확인 (90점 이상 목표)
```

---

## 우용한 리소스

- **개발 로드맵**: [Roadmap.md](./Roadmap.md)
- **TailwindCSS 문서**: https://tailwindcss.com/docs
- **MDN Web Docs**: https://developer.mozilla.org/ko/
- **웹 접근성 가이드**: https://www.w3.org/WAI/WCAG21/quickref/ (한국어: https://www.kwacc.or.kr/)

---

**Last Updated**: 2026-03-02
