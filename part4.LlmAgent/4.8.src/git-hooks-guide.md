# Git Hooks 설정 가이드

## pre-commit 훅 설정
```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

## package.json에 lint-staged 설정 추가
```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "jest --findRelatedTests --passWithNoTests"
    ],
    "*.{css,scss,md}": [
      "prettier --write"
    ]
  }
}
```

## 추천 package.json scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write src/",
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "build": "npm run lint && npm run test",
    "prepare": "husky install"
  }
}
```
