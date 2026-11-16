# Mingyu Shin Portfolio · Project Brief for Claude Code

이 문서는 새 세션의 Claude Code가 프로젝트 컨텍스트를 빠르게 파악하기 위한 참고 자료입니다. 코드 수정 요청을 받으면 먼저 이 문서를 읽고 아래 규칙을 따라주세요.

---

## 1. 프로젝트 정체성

- **소유자**: 신민규 (Mingyu Shin, 1995.08.26)
- **직업**: 미디어 아티스트 (Media Artist)
- **활동 분야**: Robotics, Kinetic Art, Drawing, 3D Design
- **소속**: 유한책임회사 매드제너레이터 (책임, 2025.07 ~)
- **사이트 URL**: https://mihael-99.github.io/ (+ 커스텀 도메인 mingyushin.com 연결 진행 중)
- **연락처**: mingue_s02@naver.com · Instagram @mingyus02

**사이트 성격**: 개인 포트폴리오. 미니멀·중앙 정렬·여백 넉넉한 갤러리형 레이아웃.

---

## 2. 작업 환경 & 배포

### 작업 폴더 (반드시 여기서만 수정)
```
/Users/q/Desktop/mihael-99.github.io/
```
※ 예전 `Desktop/Claude.Test/portfolio/` 폴더는 폐기됨. 그쪽 절대 건드리지 말 것.

### 배포 방식
- **GitHub Pages** (main branch, root)
- **리포지토리**: `mihael-99/mihael-99.github.io`
- **워크플로우**: 로컬 수정 → `python3 -m http.server 8000`로 확인 → GitHub Desktop → Commit → Push → 1~2분 뒤 라이브 반영
- **CNAME 파일**: 리포 최상위에 `mingyushin.com` 담긴 파일 존재 · 삭제 금지 (커스텀 도메인 연결)

### 로컬 확인 방법
```bash
cd /Users/q/Desktop/mihael-99.github.io
python3 -m http.server 8000
# 브라우저에서 localhost:8000 열기
```

---

## 3. 폰트 시스템 (매우 중요)

CSS 변수 4개로 관리. **각 요소별 지정된 폰트가 정해져 있음** — 임의로 다른 변수 쓰지 말 것.

| 변수명 | 폰트 스택 | 용도 |
|--------|----------|------|
| `--font-serif` | **Playfair Display** + serif | 이름 (`.home-name`, `.about-name`) — 오직 여기만 |
| `--font-title` | **Poppins** + **Noto Sans KR** | 프로젝트 제목 / 페이지 제목 (`.page-title`, `.project-title`, `.detail-title`, `.contact-lead`) |
| `--font-category` | **Poppins** | 카테고리 / 라벨 (`.project-category`, `.detail-subtitle`, `.home-keywords`) |
| `--font-sans` | **Pretendard Variable** | body 기본 (한글·영문 겸용) |

Google Fonts + Pretendard(jsDelivr CDN)로 로드. 모든 HTML `<head>`에 동일한 링크 4개 (preconnect × 3 + fonts CSS + Pretendard CSS).

---

## 4. 폰트 크기 시스템

모든 폰트 크기는 `:root`의 CSS 변수로 통합 관리 (`--fs-*`). 사용자는 이 변수만 바꾸면 사이트 전체가 갱신됨. 개별 요소에 직접 `font-size` 하드코딩 지양.

주요 변수:
- `--fs-hero-title` (4.5rem) 홈 메인 타이틀
- `--fs-page-title` (3rem) About/Project/Contact 헤더
- `--fs-about-name` (2.5rem) About 이름
- `--fs-detail-title` (2.5rem) 프로젝트 상세 제목
- `--fs-project-title` (1.125rem) 프로젝트 카드 제목
- `--fs-body` (1rem) 본문
- `--fs-body-sm` (0.9375rem) 메타 리스트
- `--fs-label` (0.75rem) 카테고리 · 라벨 · 푸터

---

## 5. 파일 · 폴더 규칙

### HTML 페이지
- `index.html` — 홈 (21:9 5장 슬라이드쇼 + 이름/키워드 + CTA 3개)
- `about.html` — 소개글 + Education/Experience/Exhibitions/Teaching
- `project.html` — 프로젝트 5개 그리드
- `project-detail.html` ~ `project-detail-5.html` — 각 프로젝트 상세 (**detail-6은 존재하지 않음** — Personal Space가 삭제됨)
- `contact.html` — Based in / Email / Instagram 3개 항목

### 이미지 폴더 규칙 (엄수)
```
images/
├── home/
│   └── slide-1.jpg ~ slide-5.jpg      (5장, slide-3만 .jpeg)
└── projects/
    ├── it-said/         main.jpg + 01~06.jpg      (6장, 모두 .jpg)
    ├── systematic-object/ main.jpg + 01~06.jpg   (6장, 모두 .jpg)
    ├── doze-off/        main.jpeg + 01~06.jpeg   (6장, 모두 .jpeg)
    ├── short-breathe/   main.jpg + 01~05.jpg    (5장, 모두 .jpg)
    └── face/            main.jpg + 01~05.jpg    (5장, 모두 .jpg)
```

**파일명 규칙**:
- `main.*` = 프로젝트 카드 썸네일
- `01, 02, 03...` = 상세 페이지 갤러리
- doze-off 프로젝트만 `.jpeg` 확장자 (나머지는 `.jpg`)

---

## 6. 프로젝트 5개 (현재 순서)

| # | 페이지 | 타이틀 | 카테고리 | 연도 |
|---|--------|--------|---------|------|
| 1 | project-detail.html | 가라사대 / It Said | Robotic Performance | 2025 |
| 2 | project-detail-2.html | 체계화된 사물 - 의자 / Systematic Object - Chair | Robotic Performance | 2025 |
| 3 | project-detail-3.html | 출근길 - Doze Off | Kinetic Art | 2024 |
| 4 | project-detail-4.html | Kinetic Sculpture : Short Breathe | Kinetic Art | 2023 |
| 5 | project-detail-5.html | Drawing Kinetic : FACE | Kinetic Art | 2022 |

---

## 7. 디자인 원칙 (사용자 선호)

지금까지 대화에서 확인된 사용자의 취향·판단:

### 레이아웃
- **미니멀** · **중앙 정렬** · **넉넉한 여백** 선호
- About 페이지에 **프로필 이미지 칸 없음** (한 번 넣었다 지움) — 다시 추가 금지
- About 이름·역할 텍스트는 가운데 정렬, 본문·이력 목록은 좌측 정렬
- 상단 이름 → 역할 → 소개글 → 이력 각 섹션 사이 여백 96~48px 크게

### 홈 페이지
- 21:9 풀폭 히어로 슬라이드쇼 · 5초 간격 · 5장
- 서브타이틀 "Media Art Project & Work"
- 키워드 "Robotics, Kinetic Art, Drawing, 3D Design."
- **인트로 텍스트(한글 설명) 없음** (예: "불확실한 현상 속..." → 삭제됨)
- CTA 3개 가로 배치: `About →` `Projects →` `Contact →`
- CTA는 밑줄 스타일 + hover 시 자간 확대 애니메이션

### 프로젝트 페이지
- 3-column 그리드
- 카드: 이미지 → 제목 → 카테고리
- 상세 페이지: 좌측 갤러리 (main + 썸네일) · 우측 정보 (제목/메타/설명/영상)
- 갤러리 썸네일 105px 고정 폭 · 중앙 정렬
- 이미지 더블클릭 → 라이트박스
- 유튜브 영상은 `youtube-nocookie.com` + IFrame API + 임베드 차단 시 폴백 링크

### Contact 페이지
- **인트로 문구 없음** ("함께하고 싶은 프로젝트..." → 삭제됨)
- Based in → Email → Instagram 순서 (Phone 없음)
- 제목과 목록 사이 여백 80px

### 이력 목록 (About)
- `<li>` 안에 `<span class="year">` + `<span class="entry">` 구조
- 연도 컬럼 **고정 폭 9em** (모든 항목 정렬)
- 두 줄로 넘어갈 때 hanging indent (연도 아래가 아니라 텍스트 시작점에 맞춤)

---

## 8. 하면 안 되는 것들 (Do NOT)

과거에 시도했다가 제거된 것들. 사용자가 명시적으로 요청하지 않으면 되살리지 말 것.

- ❌ **Work 카테고리** 추가 (SK/현대차/두산 등 상업 프로젝트) — 시도했다가 전부 삭제
- ❌ **Personal Space** 프로젝트 되살리기 — 삭제됨
- ❌ **Artist Statement** 섹션 (About) — 삭제됨
- ❌ **About 프로필 이미지 칸** — 삭제됨
- ❌ **Contact 인트로 문구** ("함께하고 싶은...") — 삭제됨
- ❌ **홈 인트로 한글 설명** ("불확실한 현상 속...") — 삭제됨
- ❌ Cormorant Garamond / Inter 폰트 — Playfair Display / Pretendard로 교체됨
- ❌ 새 요소 만들 때 하드코딩된 폰트/색상/크기 — 반드시 CSS 변수 사용

---

## 9. 자주 하는 작업 · 참고 패턴

### 새 프로젝트 추가
1. `project-detail-6.html` 등으로 기존 상세 페이지 복사
2. 타이틀·설명·유튜브 ID·이미지 경로 수정
3. `images/projects/새폴더/` 생성 → `main.*`, `01.*`, `02.*`, ... 이미지 넣기
4. `project.html` 그리드에 카드 하나 추가
5. 이전/다음 프로젝트 링크 정리 (양쪽 상세 페이지도 수정)

### 텍스트 수정
- 오타·표현·연도 등은 해당 HTML 파일에서 직접 수정
- 저작권 연도 (footer)는 9개 HTML 모두 동일하게 유지

### 스타일 조정
- CSS 변수 우선 (변수만 바꾸면 사이트 전체 반영)
- 특정 페이지에만 영향 있는 값은 해당 클래스(`.contact-content`, `.about-meta` 등)에서 조정
- `.page-title`처럼 여러 페이지 공유 클래스는 함부로 바꾸지 말 것

---

## 10. 소통 규칙

- **사용자는 한국어 사용자** — 응답은 한국어로
- 사용자는 코드에 익숙하지 않음 — 기술 용어는 짧게 설명 곁들이기
- 파일 경로는 상대 링크 형태로 안내 (예: [css/style.css](css/style.css))
- 큰 변경 전에는 어떤 파일 · 어떤 라인 · 어떤 값을 바꿀지 짧게 브리핑
- 사이트 URL·개인정보(연락처)는 절대 임의로 노출/수정 금지
- 사용자가 "일단 되면 됐어"라고 하면 완벽함보다 실용성 우선

---

## 11-A. 다국어 지원 (KR / EN)

### 작동 방식
- `<html lang="ko|en">` 속성 기반으로 CSS가 콘텐츠 표시/숨김 제어
- 사용자 선택은 `localStorage` 키 `portfolio-lang`에 저장 (기본값 `ko`)
- 페이지 로드 시 즉시 적용 (FOUC 방지를 위해 `<body>` 렌더 전 `<html>.lang` 설정)

### 전환 UI 위치
- 모든 페이지 header, nav 가장 왼쪽 (About 링크 바로 좌측)
- 구조: `<button type="button" class="lang-toggle">KR</button>` — 현재 언어 하나만 표시, JS가 `KR`/`EN` 글자를 직접 바꿈
- 각 페이지 `<head>` 끝의 인라인 스크립트가 첫 렌더 전에 저장된 언어를 적용 (깜빡임 방지)
- 사이트 전체가 완전 전환: 한글 모드에선 한글만, 영문 모드에선 영문만 (nav·제목·메타·본문·버튼 모두)
- 예외: 로고 `MINGYU SHIN`, 푸터 저작권, About / Project / Contact 라벨(메뉴·페이지 제목·홈 CTA — 사용자 요청으로 KR 모드에서도 영문 유지)
- **작품 제목·전시 제목(·강의 프로그램명)은 언어와 상관없이 원래 표기 그대로** (예: `가라사대 / It Said`, `&lt;얼기설기 무늬의 규약, The Interlace Pattern Protocol&gt;`). 본문 속 인용도 동일. 장소/기관명 등 나머지 부분만 `data-lang`으로 전환
  - 마크업 예: `&lt;전시 제목&gt;, <span data-lang="ko">장소, 서울, 한국</span><span data-lang="en">Venue, Seoul, Korea</span>`

### 캐시 주의
- CSS/JS 링크에 `?v=5` 같은 버전이 붙어 있음. **CSS나 JS를 수정하면 9개 HTML의 버전 숫자를 하나 올릴 것** (안 올리면 브라우저가 예전 파일을 써서 수정이 안 보임)

### 번역 가능한 콘텐츠 마크업 패턴

**두 가지 방식 혼용**:

1. **인라인 span 방식** (짧은 텍스트, 제목, 리스트 항목)
   ```html
   <h1>
     <span data-lang="ko">가라사대 / It Said</span>
     <span data-lang="en">It Said</span>
   </h1>
   ```

2. **블록 요소 방식** (여러 문단, 긴 섹션)
   ```html
   <div class="detail-description" data-lang="ko">
     <p>한국어 설명...</p>
   </div>
   <div class="detail-description" data-lang="en">
     <p>English description...</p>
   </div>
   ```

### CSS 규칙 (style.css)
```css
html[lang="ko"] [data-lang="en"] { display: none !important; }
html[lang="en"] [data-lang="ko"] { display: none !important; }
```

### 새 콘텐츠 추가 시 체크리스트
- [ ] 한국어 버전 (`data-lang="ko"`)
- [ ] 영어 버전 (`data-lang="en"`)
- [ ] 두 버전 의미/톤 일치 확인
- [ ] 로컬에서 토글 눌러 양쪽 다 확인

### 번역된 요소 (전 페이지)
- 공통: nav 링크, 페이지 제목, 상세 메타 키(연도/장소/재료/크기/러닝타임), 이전·다음 링크, 영상 캡션
- Home: 이름, 역할, 키워드, CTA 3개
- About: 이름, 역할, Bio 3단락, 섹션 제목, 모든 이력 항목
- Project: 카드 제목, 카테고리
- Project Detail × 5: 제목, 서브타이틀, 장소, 재료, 러닝타임, 설명 3단락
- Contact: 라벨 3개, 활동 지역 값

### 영문 버전이 아직 없는 경우
해당 요소에 `data-lang="ko"`만 있고 `data-lang="en"`이 없으면, EN 모드에서 아무것도 안 보임. 번역 추가하거나, EN 모드에서도 그대로 보이게 하려면 `data-lang` 속성 빼기.

---

## 11. 기술 스택 요약

- **정적 HTML/CSS/JS** (프레임워크 없음)
- **JS 2개 파일**:
  - `js/main.js`: 페이지 진입 애니메이션 + 홈 슬라이드쇼 자동 전환
  - `js/detail.js`: 프로젝트 상세 갤러리 · 라이트박스 · 유튜브 IFrame API
- **폰트 로드**: Google Fonts (Playfair Display, Poppins, Noto Sans KR) + jsDelivr (Pretendard Variable)
- **호스팅**: GitHub Pages
- **도메인**: 가비아에서 구매한 mingyushin.com 연결 (DNS 설정 중)

---

## 12. 새 세션 첫 응답 시 확인 흐름

새 세션에서 이 문서를 처음 읽었을 때, 사용자 요청 처리 전 다음을 순서대로:

1. **작업 폴더 확인**: `/Users/q/Desktop/mihael-99.github.io/` 인지 확인
2. **CSS 변수 위치 파악**: `css/style.css` 상단 `:root` 블록
3. **요청이 위의 "하면 안 되는 것들"에 해당하는지 검토** → 해당하면 사용자에게 재확인 요청
4. **폰트·색상·크기 요청 시**: 반드시 변수 통해 조정 (하드코딩 금지)
5. **파일 수정 후**: 사용자에게 "GitHub Desktop → Commit → Push" 안내 (사용자가 여전히 이 워크플로우에 익숙해지는 중)

---

## 13. 참고 정보 (변경 이력 축약)

이 사이트는 2026년에 만들어졌으며, 이전 리비전에서 다음이 실험/제거됨:
- Work 섹션 (Robotic System : AI X Manufacturing 등 4개) 시도 후 제거
- Personal Space 프로젝트 추가 후 제거
- Cormorant Garamond → Playfair Display 폰트 교체
- Inter → Pretendard 본문 폰트 교체
- About 프로필 이미지 · Artist Statement 섹션 · 홈 인트로 한글 문구 · Contact 인트로 문구 등 여러 요소 제거

**핵심 방향**: 처음보다 훨씬 미니멀·컴팩트해지는 흐름. 새 요소 추가 요청보다 정리·다듬기 요청이 많음.

---

_이 문서 자체도 프로젝트가 진화하면 함께 업데이트되어야 합니다. 큰 변경 후에는 사용자에게 "CLAUDE.md도 갱신할까요?"라고 제안하세요._
