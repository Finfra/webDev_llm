# Expense Tracker 개발 규칙

## 코드 작성 및 리뷰 절차
* 모든 기능은 feature 브랜치에서 개발
* 커밋 전 ESLint, Prettier 자동 실행
* 테스트 코드 작성 필수 (최소 80% 커버리지)
* PR 시 자동화된 테스트 통과 필수

## 커밋 메시지 작성 규칙
* 형식: `[타입]: 설명`
* 타입: feat, fix, docs, style, refactor, test, chore
* 예시: `[feat]: 지출 내역 추가 API 구현`
* 예시: `[fix]: 카테고리 필터링 버그 수정`

## 브랜치 전략 및 병합 절차
* 메인 브랜치: `main` (프로덕션 배포용)
* 개발 브랜치: `develop` (통합 테스트용)
* 기능 브랜치: `feature/기능명`
* 버그 수정: `bugfix/이슈번호`
* 병합은 squash merge 방식으로 수행

## 코딩 스타일
### JavaScript/Node.js
- ES6+ 문법 사용
- async/await 선호 (Promise.then 지양)
- 함수명: camelCase
- 상수: UPPER_SNAKE_CASE
- 들여쓰기: 2칸 공백

### CSS/HTML
- BEM 명명 규칙 사용
- CSS Grid/Flexbox 활용
- 반응형 우선 설계 (Mobile First)

## 데이터베이스 규칙
* 테이블명: snake_case 단수형
* 컬럼명: snake_case
* 외래키: `테이블명_id`
* 생성/수정 시간 컬럼 필수: created_at, updated_at

## 보안 규칙
* 환경변수 파일(.env) 깃 추적 금지
* API 키, 패스워드 하드코딩 금지
* 사용자 입력값 검증 필수
* SQL 인젝션 방지를 위한 쿼리 바인딩 사용

## 테스트 및 배포 절차
* 단위 테스트: Jest 사용
* 통합 테스트: Supertest 사용
* E2E 테스트: Playwright 사용
* 배포 전 전체 테스트 스위트 실행 필수
* 스테이징 환경에서 충분한 테스트 후 프로덕션 배포

## 문서화 규칙
* README.md 업데이트 필수
* API 문서는 Swagger/OpenAPI 사용
* 주요 함수에 JSDoc 주석 작성
* 아키텍처 변경 시 문서 동기화
