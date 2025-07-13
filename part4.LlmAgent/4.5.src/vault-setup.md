# Obsidian Vault 설정 가이드

## 1. Obsidian 설치

### 공식 웹사이트에서 다운로드
- [Obsidian 공식 사이트](https://obsidian.md) 접속
- 운영체제에 맞는 버전 다운로드
- 설치 후 첫 실행

### 초기 설정
1. **새 Vault 생성** 선택
2. Vault 이름: `DevKnowledge` 또는 원하는 이름
3. 위치: `~/Documents/ObsidianVaults/DevKnowledge`

## 2. 개발자를 위한 폴더 구조

```
DevKnowledge/
├── 📂 00-Templates/          # 템플릿 모음
├── 📂 01-Inbox/             # 임시 메모, 아이디어
├── 📂 02-Projects/          # 프로젝트별 문서
│   ├── 📂 WebDev-LLM/
│   ├── 📂 Personal-Website/
│   └── 📂 AI-Tools-Study/
├── 📂 03-Learning/          # 학습 노트
│   ├── 📂 JavaScript/
│   ├── 📂 Python/
│   ├── 📂 AI-ML/
│   └── 📂 DevOps/
├── 📂 04-References/        # 참고 자료
│   ├── 📂 Code-Snippets/
│   ├── 📂 Documentation/
│   └── 📂 Tutorials/
├── 📂 05-Daily-Notes/       # 일일 노트
├── 📂 06-Meeting-Notes/     # 회의 기록
├── 📂 07-Archive/          # 완료된 프로젝트
└── 📂 99-Meta/             # Vault 관리용
    ├── Vault-Overview.md
    └── Workflow-Guide.md
```

## 3. 필수 설정

### Core 플러그인 활성화
- [ ] **Daily notes** - 일일 노트 자동 생성
- [ ] **Templates** - 템플릿 기능
- [ ] **Graph view** - 노트 관계 시각화
- [ ] **Backlinks** - 역링크 표시
- [ ] **Tag pane** - 태그 관리
- [ ] **File recovery** - 파일 복구
- [ ] **Sync** - 동기화 (선택사항)

### 에디터 설정
- **Default view for new tabs**: Editing view
- **Show line numbers**: 활성화
- **Fold heading**: 활성화
- **Fold indent**: 활성화

### 파일 및 링크 설정
- **Default location for new notes**: `01-Inbox`
- **New link format**: Shortest path when possible
- **Use [[Wikilinks]]**: 활성화

## 4. 추천 커뮤니티 플러그인

### 필수 플러그인
1. **Templater** - 고급 템플릿 기능
2. **Dataview** - 데이터 쿼리 및 뷰
3. **Calendar** - 달력 기반 일일 노트
4. **Advanced Tables** - 테이블 편집 개선
5. **Kanban** - 칸반 보드 생성

### 개발자용 플러그인
6. **Code Block Copy** - 코드 블록 복사 버튼
7. **Highlightr** - 구문 하이라이팅 강화
8. **File Tree Alternative** - 파일 트리 개선
9. **Quick Switcher++** - 빠른 파일 전환
10. **Smart Typography** - 타이포그래피 자동 교정

### LLM 연동 플러그인
11. **Text Generator** - GPT 모델 연동
12. **Smart Connections** - AI 기반 노트 연결
13. **Copilot** - AI 작성 도우미

## 5. Dataview 쿼리 예제

### 최근 프로젝트 목록
```dataview
TABLE file.mtime AS "수정일", tags AS "태그"
FROM "02-Projects"
WHERE file.mtime >= date(today) - dur(7 days)
SORT file.mtime DESC
```

### 학습 진행 상황
```dataview
TABLE progress AS "진행률", difficulty AS "난이도"
FROM "03-Learning"
WHERE contains(tags, "in-progress")
SORT progress DESC
```

### 코드 스니펫 검색
```dataview
LIST
FROM "04-References/Code-Snippets"
WHERE contains(file.name, "javascript")
SORT file.name ASC
```

## 6. 태그 체계

### 프로젝트 태그
- `#project/active` - 진행 중인 프로젝트
- `#project/completed` - 완료된 프로젝트
- `#project/on-hold` - 보류된 프로젝트

### 학습 태그
- `#learning/javascript`
- `#learning/python` 
- `#learning/ai-ml`
- `#learning/devops`

### 상태 태그
- `#status/draft` - 초안
- `#status/review` - 검토 필요
- `#status/final` - 완성

### 우선순위 태그
- `#priority/high` - 높음
- `#priority/medium` - 보통
- `#priority/low` - 낮음

## 7. 단축키 설정

### 자주 사용하는 단축키
- `Ctrl/Cmd + N` - 새 노트 생성
- `Ctrl/Cmd + O` - Quick Switcher
- `Ctrl/Cmd + P` - Command Palette
- `Ctrl/Cmd + E` - 편집/미리보기 전환
- `Ctrl/Cmd + [` / `]` - 앞으로/뒤로

### 커스텀 단축키 추천
- `Ctrl/Cmd + T` - 새 템플릿 삽입
- `Ctrl/Cmd + D` - 일일 노트 열기
- `Alt + N` - 새 노트를 Inbox에 생성
- `F2` - 파일명 변경

## 8. 백업 및 동기화

### Git을 이용한 버전 관리
```bash
cd ~/Documents/ObsidianVaults/DevKnowledge
git init
git add .
git commit -m "Initial vault setup"
git remote add origin [your-repo-url]
git push -u origin main
```

### .gitignore 설정
```gitignore
.obsidian/workspace.json
.obsidian/hotkeys.json
.obsidian/appearance.json
.trash/
```

### 자동 백업 스크립트
```bash
#!/bin/bash
# auto-backup.sh
cd ~/Documents/ObsidianVaults/DevKnowledge
git add .
git commit -m "Auto backup $(date)"
git push origin main
```

## 9. 성능 최적화

### 대용량 Vault 관리
- **파일 크기 제한**: 10MB 이하 권장
- **이미지 최적화**: WebP 형식 사용
- **플러그인 정리**: 사용하지 않는 플러그인 비활성화

### 검색 성능 향상
- **핵심 키워드 중심**: 태그와 헤딩 활용
- **파일명 최적화**: 검색하기 쉬운 이름 사용
- **구조화된 내용**: 헤딩과 리스트 활용

## 10. 문제 해결

### 자주 발생하는 문제
1. **동기화 충돌**
   - 해결: `.obsidian/workspace.json` 제외
   
2. **플러그인 오류**
   - 해결: Safe mode에서 플러그인 개별 확인
   
3. **성능 저하**
   - 해결: 인덱싱 재구축, 캐시 정리

### 디버깅 방법
- **Developer Console** (Ctrl+Shift+I)
- **Safe mode** 실행
- **Plugin** 개별 비활성화 테스트

## 11. 고급 활용법

### CSS 스니펫 커스터마이징
```css
/* 코드 블록 스타일링 */
.theme-dark .HyperMD-codeblock {
    background-color: #1e1e1e;
    border-left: 3px solid #4a90e2;
}

/* 태그 스타일링 */
.tag[href="#priority/high"] {
    background-color: #ff6b6b;
    color: white;
}
```

### Templater 고급 스크립트
```javascript
// 자동 파일명 생성
<%* 
const today = moment().format("YYYY-MM-DD");
const title = await tp.system.prompt("노트 제목을 입력하세요:");
await tp.file.rename(`${today}-${title}`);
%>
```

이제 Obsidian을 개발자 친화적으로 설정하여 효율적인 지식 관리가 가능합니다! 🚀
