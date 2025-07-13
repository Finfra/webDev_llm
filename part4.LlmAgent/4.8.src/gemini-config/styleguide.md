# 코딩 스타일 가이드

## JavaScript 코딩 규칙
### 함수 정의
```javascript
// 권장: 화살표 함수 사용
const calculateTotal = (transactions) => {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
};

// 지양: function 키워드
function calculateTotal(transactions) {
  // ...
}
```

### 에러 처리
```javascript
// 권장: try-catch with specific error types
try {
  const result = await apiCall();
  return result;
} catch (error) {
  if (error.code === 'AUTH_ERROR') {
    throw new AuthenticationError('Invalid credentials');
  }
  throw new ServerError('Unexpected error occurred');
}
```

### 데이터베이스 쿼리
```javascript
// 권장: 파라미터 바인딩
const getUserTransactions = async (userId) => {
  return db.query(
    'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
};
```

## API 응답 형식
```javascript
// 성공 응답
{
  "success": true,
  "data": {
    "transactions": [...],
    "total": 1250.50
  },
  "meta": {
    "page": 1,
    "totalPages": 5
  }
}

// 에러 응답
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid transaction amount",
    "details": {
      "field": "amount",
      "value": "-100"
    }
  }
}
```

## 테스트 작성 가이드
```javascript
describe('Transaction API', () => {
  beforeEach(async () => {
    await setupTestData();
  });

  test('should create new transaction', async () => {
    const transactionData = {
      amount: 50.00,
      category: 'food',
      description: 'Lunch at cafe'
    };

    const response = await request(app)
      .post('/api/transactions')
      .send(transactionData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.transaction.amount).toBe(50.00);
  });
});
```
