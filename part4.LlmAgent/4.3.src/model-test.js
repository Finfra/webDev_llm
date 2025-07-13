// LM Studio 로컬 API 테스트 스크립트
// 사용 전 LM Studio에서 모델을 로드하고 Local Server를 시작하세요

const axios = require('axios');

// LM Studio 기본 설정
const LM_STUDIO_URL = 'http://localhost:1234';

class LMStudioClient {
    constructor(baseURL = LM_STUDIO_URL) {
        this.baseURL = baseURL;
    }

    // 서버 상태 확인
    async checkStatus() {
        try {
            const response = await axios.get(`${this.baseURL}/v1/models`);
            console.log('✅ LM Studio 서버 연결 성공');
            console.log('📋 사용 가능한 모델:', response.data.data.map(m => m.id));
            return true;
        } catch (error) {
            console.error('❌ LM Studio 서버 연결 실패:', error.message);
            console.log('💡 해결방법:');
            console.log('1. LM Studio가 실행 중인지 확인');
            console.log('2. 모델이 로드되어 있는지 확인');
            console.log('3. Local Server가 시작되어 있는지 확인');
            return false;
        }
    }

    // 텍스트 생성 (완성)
    async generateCompletion(prompt, options = {}) {
        try {
            const response = await axios.post(`${this.baseURL}/v1/completions`, {
                prompt: prompt,
                max_tokens: options.max_tokens || 100,
                temperature: options.temperature || 0.7,
                top_p: options.top_p || 0.9,
                stream: false
            });

            return response.data.choices[0].text;
        } catch (error) {
            console.error('텍스트 생성 실패:', error.message);
            throw error;
        }
    }

    // 채팅 형식 대화
    async generateChatCompletion(messages, options = {}) {
        try {
            const response = await axios.post(`${this.baseURL}/v1/chat/completions`, {
                model: 'local-model', // LM Studio는 'local-model' 사용
                messages: messages,
                max_tokens: options.max_tokens || 150,
                temperature: options.temperature || 0.7,
                stream: false
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('채팅 생성 실패:', error.message);
            throw error;
        }
    }

    // 스트리밍 응답 (실시간)
    async generateStreamingChat(messages, onChunk, options = {}) {
        try {
            const response = await axios.post(`${this.baseURL}/v1/chat/completions`, {
                model: 'local-model',
                messages: messages,
                max_tokens: options.max_tokens || 150,
                temperature: options.temperature || 0.7,
                stream: true
            }, {
                responseType: 'stream'
            });

            return new Promise((resolve, reject) => {
                let fullResponse = '';
                
                response.data.on('data', (chunk) => {
                    const lines = chunk.toString().split('\n').filter(line => line.trim());
                    
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') {
                                resolve(fullResponse);
                                return;
                            }
                            
                            try {
                                const parsed = JSON.parse(data);
                                const content = parsed.choices[0]?.delta?.content || '';
                                if (content) {
                                    fullResponse += content;
                                    onChunk(content);
                                }
                            } catch (e) {
                                // JSON 파싱 오류 무시
                            }
                        }
                    }
                });

                response.data.on('error', reject);
            });
        } catch (error) {
            console.error('스트리밍 생성 실패:', error.message);
            throw error;
        }
    }
}

// 테스트 함수들
async function testBasicCompletion() {
    console.log('\n🧪 기본 텍스트 완성 테스트');
    console.log('='.repeat(50));
    
    const client = new LMStudioClient();
    
    try {
        const result = await client.generateCompletion(
            "인공지능의 미래에 대해 한국어로 간단히 설명하면",
            { max_tokens: 100, temperature: 0.7 }
        );
        
        console.log('💬 생성된 텍스트:');
        console.log(result);
    } catch (error) {
        console.error('테스트 실패:', error.message);
    }
}

async function testChatCompletion() {
    console.log('\n🧪 채팅 대화 테스트');
    console.log('='.repeat(50));
    
    const client = new LMStudioClient();
    
    const messages = [
        { role: "system", content: "당신은 도움이 되는 AI 어시스턴트입니다. 한국어로 답변해주세요." },
        { role: "user", content: "파이썬으로 피보나치 수열을 구하는 간단한 코드를 작성해주세요." }
    ];
    
    try {
        const result = await client.generateChatCompletion(messages, {
            max_tokens: 200,
            temperature: 0.3
        });
        
        console.log('🤖 AI 응답:');
        console.log(result);
    } catch (error) {
        console.error('테스트 실패:', error.message);
    }
}

async function testStreamingChat() {
    console.log('\n🧪 스트리밍 응답 테스트');
    console.log('='.repeat(50));
    
    const client = new LMStudioClient();
    
    const messages = [
        { role: "system", content: "당신은 창의적인 글쓰기 도우미입니다." },
        { role: "user", content: "우주 여행에 대한 짧은 시를 한국어로 써주세요." }
    ];
    
    try {
        console.log('🤖 AI 응답 (실시간):');
        process.stdout.write('💭 ');
        
        await client.generateStreamingChat(messages, (chunk) => {
            process.stdout.write(chunk);
        }, {
            max_tokens: 150,
            temperature: 0.8
        });
        
        console.log('\n✅ 스트리밍 완료');
    } catch (error) {
        console.error('테스트 실패:', error.message);
    }
}

// 메인 테스트 실행
async function runAllTests() {
    console.log('🚀 LM Studio API 테스트 시작');
    console.log('='.repeat(50));
    
    const client = new LMStudioClient();
    
    // 서버 상태 확인
    const isConnected = await client.checkStatus();
    if (!isConnected) {
        return;
    }
    
    // 각 테스트 실행
    await testBasicCompletion();
    await testChatCompletion();
    await testStreamingChat();
    
    console.log('\n🎉 모든 테스트 완료!');
}

// 스크립트 직접 실행 시 테스트 실행
if (require.main === module) {
    // axios 설치 확인
    try {
        require('axios');
    } catch (error) {
        console.error('❌ axios 패키지가 설치되지 않았습니다.');
        console.log('💡 다음 명령어로 설치하세요: npm install axios');
        process.exit(1);
    }
    
    runAllTests().catch(console.error);
}

module.exports = { LMStudioClient };
