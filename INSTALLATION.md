# Next App 설치

yarn create next-app .
✔ Would you like to use TypeScript? … No / Yes (No)
✔ Would you like to use ESLint? … No / Yes (Yes)
✔ Would you like to use Tailwind CSS? … No / Yes (No)
✔ Would you like to use `src/` directory? … No / Yes (Yes)
✔ Would you like to use App Router? (recommended) … No / Yes (Yes)
✔ Would you like to customize the default import alias (@/_)? … No / Yes (Yes)
✔ What import alias would you like configured? … @/_ (~/\*)

# ESLint, Prettier 설정

yarn add --dev eslint prettier eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-prettier eslint-plugin-prettier

# 라이브러리 설치

yarn add axios
yarn add normalize.css
yarn upgrade eslint ajv uri-js

# 개발 의존성 라이브러리 설치

yarn add --dev sass
yarn add --dev @svgr/webpack

# 프로젝트 기본 구조

(root)/
│
├── public/ # 사용안함. 모든 정적 파일들은 storage.reviewniverse.net/assets 에 업로드 후 사용
│
├── src/
│ ├── app/ # Next 파일들
│ │
│ ├── components/ # 컴포넌트들
│ │ └── ui/ # 버튼, 모달 등 UI 컴포넌트들
│ │ └── layout/ # 레이아웃 관련 컴포넌트들
│ │
│ ├── config/ # 프로젝트 설정
│ │ └── settings.js
│ │
│ ├── contexts/ # React Context API 관련 파일들
│ │ └── AuthContext.js
│ │
│ ├── hooks/ # 커스텀 React Hooks들
│ │ └── useUser.js
│ │
│ ├── library/ # 유틸리티 함수나 외부 API 연동 등을 처리하는 디렉토리
│ │ └── api.js # API 요청 처리 함수들
│ │ └── auth.js # 인증 관련 유틸리티
│ │
│ ├── resources/ # 이미지들
│ │ └── logo.svg
│ │
│ ├── services/ # 비즈니스 로직 및 외부 서비스와의 통신을 처리하는 파일들
│ │ └── userService.js # 사용자 관련 서비스 로직
│ │
│ ├── styles/ # 스타일 시트 및 스타일 관련 파일들
│ │ └── globals.scss
│ │ └── Home.module.scss
│ │
│ ├── utils/ # 유틸리티 함수들
│ └── formatDate.js # 날짜 포맷팅 유틸리티 함수
│
├── .env.local # 환경변수
├── .eslintrc.json # ESLint 설정 파일
├── .prettierrc.json # Prettier 설정 파일
├── next.config.js # Next.js 설정 파일
├── jsconfig.json
├── package.json
├── yarn.lock
├── INSTALLATION.md # 프로젝트 설치 명세서 (학습용)
└── README.md # 프로젝트 설명서
