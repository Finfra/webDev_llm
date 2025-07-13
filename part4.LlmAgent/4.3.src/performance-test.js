// LM Studio 성능 벤치마크 스크립트
// 다양한 작업에 대한 성능을 측정하고 비교합니다

const axios = require('axios');

class LMStudioBenchmark {
    constructor(baseURL = 'http://localhost:1234') {
        this.baseURL = baseURL;
        this.results = [];
    }

    // 서버 상태 확인
    async checkConnection() {
        try {
            const response = await axios.get(`${this.baseURL}/v1/models`);
            const model = response.data.data[0];
            console.log(`🔗 연결된 모델: ${model.id}`);
            return model.id;
        } catch (error) {
            throw new Error('LM Studio 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.');
        }
    }

    // 응답 시간 측정
    async measureResponseTime(messages, maxTokens = 100) {
        const startTime = Date.now();
        
        try {
            const response = await axios.post(`${this.baseURL}/v1/chat/completions`, {
                model: 'local-model',
                messages: messages,
                max_tokens: maxTokens,
                temperature: 0.7,
                stream: false
            });
            
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            const content = response.data.choices[0].message.content;
            const tokenCount = this.estimateTokenCount(content);
            
            return {
                responseTime,
                tokenCount,
                tokensPerSecond: tokenCount / (responseTime / 1000),
                content
            };
        } catch (error) {
            throw new Error(`API 요청 실패: ${error.message}`);
        }
    }

    // 토큰 수 추정 (정확하지 않음, 대략적 계산)
    estimateTokenCount(text) {
        // 영어는 평균 4자 = 1토큰, 한국어는 평균 2자 = 1토큰으로 추정
        const englishChars = text.match(/[a-zA-Z0-9\s.,!?]/g)?.length || 0;
        const koreanChars = text.length - englishChars;
        return Math.ceil(englishChars / 4 + koreanChars / 2);
    }

    // 다양한 태스크 테스트
    async runBenchmarkSuite() {
        console.log('🏁 LM Studio 성능 벤치마크 시작');
        console.log('='.repeat(60));

        const modelId = await this.checkConnection();
        
        const tests = [
            {
                name: "간단한 질답",
                messages: [
                    { role: "user", content: "대한민국의 수도는 어디인가요?" }
                ],
                maxTokens: 50
            },
            {
                name: "창의적 글쓰기",
                messages: [
                    { role: "user", content: "우주 여행에 대한 짧은 시를 써주세요." }
                ],
                maxTokens: 150
            },
            {
                name: "코드 생성",
                messages: [
                    { role: "user", content: "파이썬으로 피보나치 수열을 구하는 함수를 작성해주세요." }
                ],
                maxTokens: 200
            },
            {
                name: "논리적 추론",
                messages: [
                    { role: "user", content: "만약 모든 새가 날 수 있고, 펭귄이 새라면, 펭귄도 날 수 있을까요? 논리적으로 설명해주세요." }
                ],
                maxTokens: 200
            },
            {
                name: "번역 작업",
                messages: [
                    { role: "user", content: "다음 문장을 영어로 번역해주세요: '인공지능은 우리의 삶을 어떻게 변화시킬까요?'" }
                ],
                maxTokens: 100
            },
            {
                name: "요약 작업",
                messages: [
                    { role: "user", content: "다음 텍스트를 한 문장으로 요약해주세요: '인공지능 기술의 발전으로 다양한 산업 분야에서 자동화가 진행되고 있으며, 이는 생산성 향상과 동시에 일자리 변화를 가져오고 있다. 특히 제조업, 금융업, 의료업 등에서 AI 도입이 활발하게 이루어지고 있으며, 이러한 변화는 사회 전반에 큰 영향을 미치고 있다.'" }
                ],
                maxTokens: 100
            }
        ];

        const results = [];

        for (let i = 0; i < tests.length; i++) {
            const test = tests[i];
            console.log(`\n📊 테스트 ${i + 1}/${tests.length}: ${test.name}`);
            console.log('-'.repeat(40));

            try {
                const result = await this.measureResponseTime(test.messages, test.maxTokens);
                
                console.log(`⏱️  응답 시간: ${result.responseTime}ms`);
                console.log(`🔢 생성된 토큰: ${result.tokenCount}개`);
                console.log(`🚀 처리 속도: ${result.tokensPerSecond.toFixed(2)} 토큰/초`);
                console.log(`💬 응답 내용: ${result.content.substring(0, 100)}${result.content.length > 100 ? '...' : ''}`);

                results.push({
                    testName: test.name,
                    ...result
                });

                // 다음 테스트 전 잠시 대기
                await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (error) {
                console.error(`❌ 테스트 실패: ${error.message}`);
                results.push({
                    testName: test.name,
                    error: error.message
                });
            }
        }

        this.generateReport(modelId, results);
        return results;
    }

    // 스트레스 테스트 (연속 요청)
    async runStressTest(duration = 60000) {
        console.log(`\n🔥 스트레스 테스트 시작 (${duration/1000}초)`);
        console.log('='.repeat(60));

        const startTime = Date.now();
        const results = [];
        let requestCount = 0;

        const testMessage = [
            { role: "user", content: "1부터 10까지 세어주세요." }
        ];

        while (Date.now() - startTime < duration) {
            try {
                requestCount++;
                const result = await this.measureResponseTime(testMessage, 50);
                results.push(result);
                
                process.stdout.write(`\r📈 요청 #${requestCount} - ${result.responseTime}ms (${result.tokensPerSecond.toFixed(1)} tok/s)`);
                
            } catch (error) {
                console.error(`\n❌ 요청 #${requestCount} 실패: ${error.message}`);
            }
        }

        console.log('\n\n📊 스트레스 테스트 결과:');
        console.log('-'.repeat(40));
        
        const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
        const avgTokensPerSec = results.reduce((sum, r) => sum + r.tokensPerSecond, 0) / results.length;
        const minResponseTime = Math.min(...results.map(r => r.responseTime));
        const maxResponseTime = Math.max(...results.map(r => r.responseTime));

        console.log(`🎯 총 요청 수: ${results.length}개`);
        console.log(`⏱️  평균 응답 시간: ${avgResponseTime.toFixed(2)}ms`);
        console.log(`🚀 평균 처리 속도: ${avgTokensPerSec.toFixed(2)} 토큰/초`);
        console.log(`📈 최소 응답 시간: ${minResponseTime}ms`);
        console.log(`📉 최대 응답 시간: ${maxResponseTime}ms`);

        return {
            totalRequests: results.length,
            avgResponseTime,
            avgTokensPerSec,
            minResponseTime,
            maxResponseTime
        };
    }

    // 메모리 사용량 모니터링 (추정)
    async monitorMemoryUsage() {
        console.log('\n💾 메모리 사용량 모니터링');
        console.log('='.repeat(60));

        const testSizes = [50, 100, 200, 500, 1000]; // 토큰 수
        
        for (const maxTokens of testSizes) {
            try {
                const start = Date.now();
                const result = await this.measureResponseTime([
                    { role: "user", content: `${maxTokens} 토큰 정도의 긴 글을 써주세요. 인공지능과 미래 사회에 대해서 자세히 설명해주세요.` }
                ], maxTokens);
                
                console.log(`📏 ${maxTokens} 토큰 요청: ${result.responseTime}ms (실제: ${result.tokenCount} 토큰)`);
                
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.error(`❌ ${maxTokens} 토큰 테스트 실패: ${error.message}`);
            }
        }
    }

    // 종합 보고서 생성
    generateReport(modelId, results) {
        console.log('\n📋 성능 테스트 종합 보고서');
        console.log('='.repeat(60));
        
        const successfulTests = results.filter(r => !r.error);
        
        if (successfulTests.length === 0) {
            console.log('❌ 성공한 테스트가 없습니다.');
            return;
        }

        const avgResponseTime = successfulTests.reduce((sum, r) => sum + r.responseTime, 0) / successfulTests.length;
        const avgTokensPerSec = successfulTests.reduce((sum, r) => sum + r.tokensPerSecond, 0) / successfulTests.length;
        const totalTokens = successfulTests.reduce((sum, r) => sum + r.tokenCount, 0);

        console.log(`🔧 테스트 모델: ${modelId}`);
        console.log(`✅ 성공한 테스트: ${successfulTests.length}/${results.length}`);
        console.log(`⏱️  평균 응답 시간: ${avgResponseTime.toFixed(2)}ms`);
        console.log(`🚀 평균 처리 속도: ${avgTokensPerSec.toFixed(2)} 토큰/초`);
        console.log(`🔢 총 생성 토큰: ${totalTokens}개`);

        // 성능 등급 평가
        let grade = 'F';
        if (avgTokensPerSec > 50) grade = 'A';
        else if (avgTokensPerSec > 30) grade = 'B';
        else if (avgTokensPerSec > 20) grade = 'C';
        else if (avgTokensPerSec > 10) grade = 'D';

        console.log(`🏆 성능 등급: ${grade}`);

        // 추천사항
        console.log('\n💡 최적화 제안:');
        if (avgResponseTime > 5000) {
            console.log('⚠️  응답 시간이 느립니다. 더 작은 모델이나 양자화 모델을 고려하세요.');
        }
        if (avgTokensPerSec < 10) {
            console.log('⚠️  처리 속도가 느립니다. GPU 가속을 활성화하거나 더 빠른 하드웨어를 고려하세요.');
        }
        if (grade >= 'B') {
            console.log('✨ 성능이 우수합니다! 현재 설정을 유지하세요.');
        }
    }
}

// 메인 실행 함수
async function runBenchmark() {
    try {
        // axios 패키지 확인
        require('axios');
    } catch (error) {
        console.error('❌ axios 패키지가 설치되지 않았습니다.');
        console.log('💡 다음 명령어로 설치하세요: npm install axios');
        process.exit(1);
    }

    const benchmark = new LMStudioBenchmark();
    
    try {
        // 기본 성능 테스트
        await benchmark.runBenchmarkSuite();
        
        // 메모리 사용량 테스트
        await benchmark.monitorMemoryUsage();
        
        // 스트레스 테스트 (30초)
        await benchmark.runStressTest(30000);
        
        console.log('\n🎉 모든 벤치마크 테스트 완료!');
        
    } catch (error) {
        console.error('❌ 벤치마크 실패:', error.message);
        console.log('\n💡 해결방법:');
        console.log('1. LM Studio가 실행 중인지 확인');
        console.log('2. 모델이 로드되어 있는지 확인');
        console.log('3. Local Server가 시작되어 있는지 확인');
        console.log('4. 방화벽이나 보안 소프트웨어 확인');
    }
}

// 스크립트 직접 실행 시
if (require.main === module) {
    console.log('🔬 LM Studio 성능 벤치마크 도구');
    console.log('='.repeat(60));
    runBenchmark();
}

module.exports = { LMStudioBenchmark };
