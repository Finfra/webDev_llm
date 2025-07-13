# 추천 LLM 모델 목록

## 초보자용 (4GB RAM 이상)

### 1. Phi-3 Mini (3.8B)
* **크기**: ~2.3GB
* **메모리**: 4GB RAM 권장
* **특징**: Microsoft의 소형 고성능 모델
* **용도**: 기본 대화, 간단한 코딩
* **다운로드**: `microsoft/Phi-3-mini-4k-instruct-gguf`

### 2. TinyLlama (1.1B)
* **크기**: ~637MB
* **메모리**: 2GB RAM
* **특징**: 매우 빠른 추론 속도
* **용도**: 테스트, 학습용
* **다운로드**: `TinyLlama/TinyLlama-1.1B-Chat-v1.0-GGUF`

## 중급자용 (8GB RAM 이상)

### 1. Llama 3.2 (3B)
* **크기**: ~2GB
* **메모리**: 6GB RAM 권장
* **특징**: Meta의 최신 모델, 뛰어난 성능
* **용도**: 일반 대화, 텍스트 생성, 기초 코딩
* **다운로드**: `meta-llama/Llama-3.2-3B-Instruct-GGUF`

### 2. Mistral 7B
* **크기**: ~4.1GB (Q4 양자화)
* **메모리**: 8GB RAM 권장
* **특징**: 효율적인 아키텍처, 빠른 추론
* **용도**: 범용 텍스트 생성, 코딩 지원
* **다운로드**: `mistralai/Mistral-7B-Instruct-v0.3-GGUF`

### 3. CodeLlama 7B
* **크기**: ~4.1GB (Q4 양자화)
* **메모리**: 8GB RAM 권장
* **특징**: 코드 생성에 특화
* **용도**: 프로그래밍, 코드 리뷰, 디버깅
* **다운로드**: `codellama/CodeLlama-7b-Instruct-hf-GGUF`

## 고급자용 (16GB RAM 이상)

### 1. Llama 3.1 (8B)
* **크기**: ~4.7GB (Q4 양자화)
* **메모리**: 12GB RAM 권장
* **특징**: 긴 컨텍스트 지원, 높은 성능
* **용도**: 복잡한 추론, 문서 분석
* **다운로드**: `meta-llama/Meta-Llama-3.1-8B-Instruct-GGUF`

### 2. Qwen2.5 (7B)
* **크기**: ~4.4GB (Q4 양자화)
* **메모리**: 10GB RAM 권장
* **특징**: 다국어 지원, 수학/코딩 강화
* **용도**: 다국어 처리, 복잡한 추론
* **다운로드**: `Qwen/Qwen2.5-7B-Instruct-GGUF`

### 3. Mixtral 8x7B (MoE)
* **크기**: ~26GB (Q4 양자화)
* **메모리**: 32GB RAM 권장
* **특징**: Mixture of Experts, 높은 성능
* **용도**: 전문적 작업, 복잡한 프로젝트
* **다운로드**: `mistralai/Mixtral-8x7B-Instruct-v0.1-GGUF`

## 특수 목적 모델

### 1. 한국어 특화
* **EEVE-Korean-10.8B**: 한국어 성능 강화
* **kuotient/Llama-3-Ko-8B-Instruct**: 한국어 파인튜닝

### 2. 코딩 특화
* **CodeQwen1.5-7B**: 코드 생성 최적화
* **DeepSeek-Coder-6.7B**: 고급 프로그래밍 지원

### 3. 수학/과학 특화
* **MetaMath-Mistral-7B**: 수학 문제 해결
* **Abel-7B-002**: 수학적 추론 강화

## 양자화 수준 선택 가이드

### Q2_K (가장 압축, 품질 저하)
* **메모리**: ~1.5GB (7B 모델 기준)
* **용도**: 메모리 매우 제한적인 환경

### Q4_K_M (균형잡힌 선택)
* **메모리**: ~4.1GB (7B 모델 기준)
* **용도**: 대부분의 사용자에게 권장

### Q5_K_M (고품질)
* **메모리**: ~4.8GB (7B 모델 기준)
* **용도**: 성능이 중요한 작업

### Q8_0 (최고 품질)
* **메모리**: ~7.2GB (7B 모델 기준)
* **용도**: 최고 품질이 필요한 전문 작업

## 다운로드 방법

### LM Studio UI 사용
1. 좌측 메뉴에서 "Models" 클릭
2. "Browse" 버튼으로 모델 검색
3. 원하는 모델 선택 후 다운로드

### 직접 다운로드
```bash
# Hugging Face CLI 사용
huggingface-cli download microsoft/Phi-3-mini-4k-instruct-gguf \
  --local-dir ./models/phi3-mini \
  --local-dir-use-symlinks False
```

## 성능 비교 (참고용)

| 모델            | 크기  | 메모리 | 추론속도   | 품질       | 한국어   |
| --------------- | ----- | ------ | ---------- | ---------- | -------- |
| TinyLlama 1.1B  | 637MB | 2GB    | ⭐⭐⭐⭐⭐      | ⭐⭐         | ⭐⭐       |
| Phi-3 Mini 3.8B | 2.3GB | 4GB    | ⭐⭐⭐⭐       | ⭐⭐⭐⭐       | ⭐⭐⭐      |
| Mistral 7B      | 4.1GB | 8GB    | ⭐⭐⭐⭐       | ⭐⭐⭐⭐       | ⭐⭐⭐      |
| Llama 3.1 8B    | 4.7GB | 12GB   | ⭐⭐⭐        | ⭐⭐⭐⭐⭐      | ⭐⭐⭐⭐     |
| Mixtral 8x7B    | 26GB  | 32GB   | ⭐⭐         | ⭐⭐⭐⭐⭐      | ⭐⭐⭐⭐     |

## 선택 가이드

### 처음 시작하는 경우
👉 **Phi-3 Mini 3.8B (Q4_K_M)** 추천

### 일반적인 사용
👉 **Mistral 7B (Q4_K_M)** 또는 **Llama 3.2 3B**

### 코딩 중심 작업
👉 **CodeLlama 7B** 또는 **CodeQwen1.5 7B**

### 고성능이 필요한 경우
👉 **Llama 3.1 8B** 또는 **Mixtral 8x7B**

### 한국어 중심 작업
👉 **EEVE-Korean-10.8B** 또는 **Llama-3-Ko-8B**
