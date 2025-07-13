# 🔄 Obsidian 개발자 워크플로우 가이드

이 문서는 개발자가 Obsidian을 효과적으로 활용할 수 있는 실제 워크플로우 사례들을 정리한 것입니다.

---

## 📅 일일 워크플로우

### 아침 루틴 (09:00-09:15)
1. **일일 노트 생성** (`Ctrl+D`)
   - 오늘의 목표 3개 설정
   - 주요 프로젝트 우선순위 정리
   - 학습 계획 수립

2. **어제 회고 확인**
   - 완료하지 못한 작업 이월
   - 학습 내용 복습
   - 개선점 확인

3. **미팅 일정 확인**
   - Calendar 플러그인으로 오늘 일정 확인
   - 미팅 노트 템플릿 미리 준비

### 개발 작업 중 (09:15-18:00)
1. **새로운 문제 발견 시**
   ```
   Ctrl+N → 01-Inbox → 문제-YYYY-MM-DD-간단설명
   ```
   - 문제 상황 즉시 기록
   - 해결 과정 단계별 정리
   - 참고 링크 수집

2. **코드 작성 후**
   ```
   Ctrl+T → Code Snippet Template
   ```
   - 재사용 가능한 코드는 즉시 스니펫으로 저장
   - 사용법과 주의사항 함께 기록

3. **새로운 기술 학습 시**
   ```
   Ctrl+N → 03-Learning → [기술명]-YYYY-MM-DD
   ```
   - 학습 목표와 진행 상황 기록
   - 실습 결과와 예제 코드 저장
   - 관련 문서들과 양방향 링크 연결

### 저녁 루틴 (18:00-18:15)
1. **오늘 작업 정리**
   - 완료된 작업 체크
   - 내일 할 일 미리 계획
   - 배운 것들 간단 요약

2. **노트 정리**
   - Inbox 폴더 정리
   - 태그 통일성 확인
   - 백링크 관계 점검

---

## 🚀 프로젝트 관리 워크플로우

### 새 프로젝트 시작
1. **프로젝트 폴더 생성**
   ```
   02-Projects/[프로젝트명]-YYYY-MM/
   ├── 00-Overview.md (프로젝트 템플릿 사용)
   ├── 01-Requirements.md
   ├── 02-Architecture.md
   ├── 03-Development-Log.md
   └── 04-Lessons-Learned.md
   ```

2. **초기 문서화**
   ```dataview
   TABLE status, priority, deadline
   FROM "02-Projects/[프로젝트명]"
   WHERE contains(tags, "task")
   SORT priority DESC
   ```

3. **칸반 보드 설정**
   - Kanban 플러그인으로 작업 보드 생성
   - 백로그 → 진행중 → 리뷰 → 완료

### 진행 중 관리
1. **주간 회고**
   ```
   ## 이번 주 성과
   - 완료된 기능들
   - 해결한 이슈들
   - 배운 새로운 기술들
   
   ## 다음 주 계획
   - 우선순위 높은 작업들
   - 블로킹 이슈 해결 방안
   - 학습이 필요한 영역들
   ```

2. **이슈 트래킹**
   ```
   # 🐛 이슈: [간단한 설명]
   
   **발생일**: YYYY-MM-DD
   **심각도**: High/Medium/Low
   **카테고리**: #bug #feature #improvement
   
   ## 증상
   - 구체적인 문제 상황
   
   ## 재현 방법
   1. 단계 1
   2. 단계 2
   
   ## 해결 방법
   - [ ] 시도한 방법 1
   - [x] 성공한 방법
   
   ## 관련 링크
   - [[관련 코드 스니펫]]
   - [Stack Overflow 링크](url)
   ```

---

## 📚 학습 관리 워크플로우

### 새로운 기술 학습 시작
1. **학습 계획 수립**
   ```
   # 📖 [기술명] 학습 계획
   
   **학습 기간**: YYYY-MM-DD ~ YYYY-MM-DD
   **목표**: 구체적인 학습 목표
   **선행 지식**: 필요한 배경 지식
   
   ## 학습 로드맵
   - [ ] 1주차: 기초 개념
   - [ ] 2주차: 실습 프로젝트
   - [ ] 3주차: 고급 기능
   - [ ] 4주차: 실제 프로젝트 적용
   
   ## 참고 자료
   - [[관련 문서 1]]
   - [온라인 강의](url)
   - [공식 문서](url)
   ```

2. **일일 학습 기록**
   ```
   ## 📅 YYYY-MM-DD 학습 기록
   
   ### 오늘 학습한 내용
   - 개념 1: 핵심 포인트
   - 개념 2: 실습 결과
   
   ### 실습 코드
   ```javascript
   // 오늘 작성한 예제 코드
   ```
   
   ### 어려웠던 점
   - 문제점과 해결 과정
   
   ### 내일 학습할 것
   - [ ] 다음 주제 1
   - [ ] 다음 주제 2
   ```

### 학습 완료 후 정리
1. **지식 체계화**
   ```dataview
   TABLE summary, difficulty, practice_project
   FROM "03-Learning"
   WHERE contains(tags, "completed")
   SORT file.mtime DESC
   ```

2. **스킬 매트릭스 업데이트**
   ```
   # 🛠 기술 스킬 매트릭스
   
   ## Frontend
   - JavaScript: ▓▓▓▓▓▓▓▓░░ 80%
   - React: ▓▓▓▓▓▓░░░░ 60%
   - Vue.js: ▓▓▓░░░░░░░ 30%
   
   ## Backend  
   - Node.js: ▓▓▓▓▓▓▓░░░ 70%
   - Python: ▓▓▓▓▓░░░░░ 50%
   ```

---

## 🤝 미팅 및 협업 워크플로우

### 미팅 전 준비
1. **미팅 노트 생성**
   ```
   Ctrl+T → Meeting Note Template
   ```
   - 아젠다 미리 정리
   - 질문 사항 준비
   - 공유할 자료 링크

2. **관련 자료 수집**
   ```dataview
   LIST
   FROM [[현재 프로젝트]]
   WHERE contains(tags, "reference")
   ```

### 미팅 후 후속 작업
1. **액션 아이템 관리**
   ```
   ## ✅ 내 액션 아이템
   - [ ] 작업 1 [[관련 노트]] 📅 YYYY-MM-DD
   - [ ] 작업 2 [[참고 자료]] 📅 YYYY-MM-DD
   ```

2. **정보 공유**
   - 팀원들과 공유할 내용 정리
   - 결정사항을 관련 프로젝트 문서에 반영

---

## 🔧 코드 관리 워크플로우

### 코드 스니펫 체계화
1. **카테고리별 분류**
   ```
   04-References/Code-Snippets/
   ├── JavaScript/
   │   ├── Functions/
   │   ├── DOM-Manipulation/
   │   └── Async-Programming/
   ├── Python/
   │   ├── Data-Processing/
   │   └── Web-Scraping/
   └── CSS/
       ├── Layouts/
       └── Animations/
   ```

2. **검색과 재사용**
   ```dataview
   TABLE language, category, difficulty
   FROM "04-References/Code-Snippets"
   WHERE contains(tags, "utility")
   SORT file.name ASC
   ```

### 문제 해결 기록
1. **디버깅 과정 문서화**
   ```
   # 🔍 디버깅: [문제 요약]
   
   **발생 시간**: YYYY-MM-DD HH:mm
   **환경**: 브라우저/Node.js 버전
   
   ## 문제 상황
   - 구체적인 에러 메시지
   - 발생 조건
   
   ## 시도한 방법들
   1. [x] 방법 1 - 실패 (이유)
   2. [x] 방법 2 - 부분 성공
   3. [x] 방법 3 - 완전 해결 ✅
   
   ## 최종 해결책
   ```코드
   // 해결한 코드
   ```
   
   ## 교훈
   - 핵심 포인트
   - 다음에 주의할 점
   ```

---

## 📊 성과 관리 워크플로우

### 월간 리뷰
1. **프로젝트 진행 현황**
   ```dataview
   TABLE progress, status, next_milestone
   FROM "02-Projects"
   WHERE contains(tags, "active")
   SORT priority DESC
   ```

2. **학습 성과 정리**
   ```dataview
   TABLE completed_date, difficulty, application
   FROM "03-Learning"
   WHERE contains(tags, "completed") AND file.ctime >= date({{date-1M:YYYY-MM-DD}})
   ```

3. **코드 기여도 분석**
   ```
   ## 📈 이번 달 개발 성과
   
   ### 완성한 기능들
   - 기능 1: [[관련 문서]]
   - 기능 2: [[관련 문서]]
   
   ### 해결한 주요 이슈들
   - [[이슈 1]]: 해결 방법 요약
   - [[이슈 2]]: 해결 방법 요약
   
   ### 새로 배운 기술들
   - [[기술 1]]: 활용 계획
   - [[기술 2]]: 활용 계획
   ```

### 개인 발전 계획
1. **스킬 갭 분석**
   ```
   ## 🎯 개발 목표 설정
   
   ### 현재 수준
   - 강점: 잘하는 기술 영역
   - 약점: 개선이 필요한 영역
   
   ### 목표 수준  
   - 3개월 후: 구체적 목표
   - 6개월 후: 중기 목표
   - 1년 후: 장기 목표
   
   ### 액션 플랜
   - [ ] 학습 계획 1
   - [ ] 실습 프로젝트 2
   - [ ] 포트폴리오 개선 3
   ```

---

## ⚡ 생산성 향상 팁

### 키보드 단축키 마스터
- `Ctrl+O`: 빠른 파일 전환
- `Ctrl+P`: 명령 팔레트
- `Ctrl+G`: 그래프 뷰
- `Ctrl+E`: 편집/미리보기 전환
- `Ctrl+T`: 템플릿 삽입

### 자동화 활용
1. **Templater 스크립트 예시**
   ```javascript
   // 자동 파일명 생성
   <%* 
   const projectName = await tp.system.prompt("프로젝트명:");
   const today = moment().format("YYYY-MM-DD");
   await tp.file.rename(`${today}-${projectName}`);
   %>
   ```

2. **Dataview 동적 쿼리**
   ```
   # 📋 오늘 할 일
   ```dataview
   TASK
   FROM "02-Projects" OR "05-Daily-Notes"
   WHERE !completed AND due <= date(today)
   SORT due ASC
   ```
   ```

### 정기적 정리 작업
- **주간**: 태그 정리, 백링크 정리
- **월간**: 플러그인 업데이트, 워크플로우 개선
- **분기**: 전체 구조 재정비, 백업 점검

이러한 워크플로우를 통해 Obsidian을 개발 업무의 중심 도구로 활용할 수 있습니다! 🚀
