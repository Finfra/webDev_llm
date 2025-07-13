# 💻 코드 스니펫: {{title}}

**언어**: #language/javascript
**카테고리**: #snippet/함수
**난이도**: #level/intermediate
**생성일**: {{date:YYYY-MM-DD}}

---

## 📋 기본 정보

### 목적
이 코드 스니펫의 용도와 해결하는 문제

### 사용 시나리오
- 시나리오 1
- 시나리오 2

---

## 💾 코드

### 메인 코드
```javascript
// 코드 제목: 함수명 또는 기능명
// 설명: 간단한 기능 설명

function exampleFunction(param1, param2) {
    // 구현 내용
    const result = param1 + param2;
    return result;
}

// 사용 예시
const output = exampleFunction(5, 3);
console.log(output); // 8
```

### 변형 버전
```javascript
// 변형 1: ES6 화살표 함수 버전
const exampleArrowFunction = (param1, param2) => param1 + param2;

// 변형 2: 비동기 버전
async function exampleAsyncFunction(param1, param2) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(param1 + param2);
        }, 1000);
    });
}
```

---

## 📖 사용법

### 기본 사용법
```javascript
// Step 1: 함수 정의
const myFunction = exampleFunction;

// Step 2: 함수 호출
const result = myFunction(10, 20);

// Step 3: 결과 활용
console.log(`결과: ${result}`);
```

### 고급 사용법
```javascript
// 배열과 함께 사용
const numbers = [1, 2, 3, 4, 5];
const results = numbers.map(num => exampleFunction(num, 10));

// 객체와 함께 사용
const data = { a: 5, b: 3 };
const objectResult = exampleFunction(data.a, data.b);
```

---

## ⚙️ 파라미터

| 파라미터 | 타입 | 필수여부 | 기본값 | 설명 |
|----------|------|----------|--------|------|
| param1 | number | 필수 | - | 첫 번째 숫자 |
| param2 | number | 필수 | - | 두 번째 숫자 |

### 반환값
- **타입**: `number`
- **설명**: 두 파라미터의 합

---

## 🧪 테스트 케이스

### 정상 케이스
```javascript
// 테스트 1: 양수
console.assert(exampleFunction(2, 3) === 5, 'Test 1 failed');

// 테스트 2: 음수
console.assert(exampleFunction(-2, 3) === 1, 'Test 2 failed');

// 테스트 3: 0
console.assert(exampleFunction(0, 5) === 5, 'Test 3 failed');
```

### 에지 케이스
```javascript
// 테스트 4: 매우 큰 수
console.assert(exampleFunction(999999, 1) === 1000000, 'Test 4 failed');

// 테스트 5: 소수점
console.assert(exampleFunction(1.5, 2.5) === 4, 'Test 5 failed');
```

### 에러 케이스
```javascript
// 타입 체크 버전
function safeExampleFunction(param1, param2) {
    if (typeof param1 !== 'number' || typeof param2 !== 'number') {
        throw new Error('파라미터는 숫자여야 합니다');
    }
    return param1 + param2;
}

try {
    safeExampleFunction('a', 'b'); // Error 발생
} catch (error) {
    console.error(error.message);
}
```

---

## 🔧 의존성

### 필요한 라이브러리
- 없음 (Vanilla JavaScript)

### 브라우저 호환성
- Chrome: ✅ 모든 버전
- Firefox: ✅ 모든 버전  
- Safari: ✅ 모든 버전
- IE: ❌ 지원 안함

### Node.js 호환성
- Node.js 버전: 8.0.0 이상

---

## 💡 활용 팁

### 성능 최적화
```javascript
// 메모이제이션을 활용한 최적화
const memoizedFunction = (() => {
    const cache = new Map();
    
    return function(param1, param2) {
        const key = `${param1}-${param2}`;
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = param1 + param2;
        cache.set(key, result);
        return result;
    };
})();
```

### 실무 적용 예시
```javascript
// 실제 프로젝트에서 사용하는 방법
class Calculator {
    constructor() {
        this.history = [];
    }
    
    add(a, b) {
        const result = exampleFunction(a, b);
        this.history.push(`${a} + ${b} = ${result}`);
        return result;
    }
    
    getHistory() {
        return this.history;
    }
}

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
console.log(calc.getHistory()); // ['5 + 3 = 8']
```

---

## 🚨 주의사항

### 알려진 이슈
- 매우 큰 숫자의 경우 정밀도 문제 발생 가능
- 무한대(Infinity) 처리 필요

### 보안 고려사항
- 사용자 입력값 검증 필수
- XSS 공격 방지를 위한 입력값 정화

---

## 🔗 관련 리소스

### 참고 문서
- [MDN - Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [JavaScript.info - Functions](https://javascript.info/function-basics)

### 관련 스니펫들
- [[배열 합계 계산 함수]]
- [[객체 속성 합계 함수]]

### 실제 사용 프로젝트
- [[프로젝트 A]] - 계산기 기능
- [[프로젝트 B]] - 데이터 처리

---

## 📚 학습 노트

### 배운 점
- 함수 선언의 다양한 방법
- 에러 처리의 중요성
- 테스트 케이스 작성법

### 개선 아이디어
- [ ] TypeScript 버전 작성
- [ ] 더 많은 테스트 케이스 추가
- [ ] 성능 벤치마크 측정

---

## 🏷 태그
#snippet #javascript #function #basic #utility

**마지막 업데이트**: {{date:YYYY-MM-DD HH:mm}}

---

## 📝 변경 이력

### v1.0 ({{date:YYYY-MM-DD}})
- 초기 버전 작성
- 기본 기능 구현

### v1.1 (날짜)
- 에러 처리 추가
- 테스트 케이스 보강
