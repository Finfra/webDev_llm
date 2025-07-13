// 테마 전환 기능 - Cline과 함께 개발
// Cline에게 요청: 더 부드러운 테마 전환 애니메이션 추가

class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // 저장된 테마 불러오기 또는 기본값 설정
        this.currentTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.applyTheme(this.currentTheme);
        
        // 테마 토글 버튼 이벤트 리스너
        this.bindEvents();
        
        // 시스템 테마 변경 감지
        this.watchSystemTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Cline에게 요청: 키보드 단축키로 테마 전환 기능 추가 (예: Ctrl+Shift+T)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        // 현재 테마와 반대로 전환
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Cline에게 요청: 테마 전환 시 간단한 피드백 효과 추가
        this.showThemeChangeEffect();
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        this.updateThemeIcon(theme);
    }

    applyTheme(theme) {
        // HTML 요소에 data-theme 속성 설정
        document.documentElement.setAttribute('data-theme', theme);
        
        // body 클래스 업데이트 (추가적인 스타일링을 위해)
        document.body.className = `theme-${theme}`;
        
        // Cline에게 요청: 메타 태그 테마 컬러 업데이트
        this.updateMetaThemeColor(theme);
    }

    saveTheme(theme) {
        // 로컬 스토리지에 테마 저장
        localStorage.setItem('portfolio-theme', theme);
        
        // Cline에게 요청: 사용자 선호도 분석을 위한 테마 사용 통계 저장
        this.saveThemeUsageStats(theme);
    }

    updateThemeIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        if (icon) {
            // 아이콘 클래스 업데이트
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            
            // Cline에게 요청: 아이콘 회전 애니메이션 추가
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 300);
        }

        // 툴팁 텍스트 업데이트
        const tooltip = theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환';
        themeToggle.setAttribute('title', tooltip);
        themeToggle.setAttribute('aria-label', tooltip);
    }

    updateMetaThemeColor(theme) {
        // 모바일 브라우저의 상태바 색상 업데이트
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.getElementsByTagName('head')[0].appendChild(metaThemeColor);
        }

        const themeColors = {
            light: '#ffffff',
            dark: '#1a1a1a'
        };

        metaThemeColor.content = themeColors[theme];
    }

    watchSystemTheme() {
        // 시스템 테마 변경 감지 (사용자가 OS 테마를 변경했을 때)
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // 사용자가 수동으로 테마를 설정하지 않았다면 시스템 테마 따라가기
                if (!localStorage.getItem('portfolio-theme-manual')) {
                    const systemTheme = e.matches ? 'dark' : 'light';
                    this.setTheme(systemTheme);
                }
            });

            // 초기 로드 시 시스템 테마 확인
            if (!localStorage.getItem('portfolio-theme')) {
                const systemTheme = mediaQuery.matches ? 'dark' : 'light';
                this.setTheme(systemTheme);
            }
        }
    }

    showThemeChangeEffect() {
        // Cline에게 요청: 테마 전환 시 시각적 피드백 구현
        const body = document.body;
        
        // 간단한 플래시 효과
        body.style.transition = 'none';
        body.style.opacity = '0.8';
        
        setTimeout(() => {
            body.style.transition = 'opacity 0.3s ease';
            body.style.opacity = '1';
        }, 50);

        // 사용자가 수동으로 테마를 변경했음을 표시
        localStorage.setItem('portfolio-theme-manual', 'true');
    }

    saveThemeUsageStats(theme) {
        // Cline에게 요청: 테마 사용 통계 수집 (선택사항)
        const stats = JSON.parse(localStorage.getItem('theme-stats') || '{}');
        const today = new Date().toDateString();
        
        if (!stats[today]) {
            stats[today] = { light: 0, dark: 0 };
        }
        
        stats[today][theme]++;
        
        // 최근 30일 데이터만 유지
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        Object.keys(stats).forEach(date => {
            if (new Date(date) < thirtyDaysAgo) {
                delete stats[date];
            }
        });
        
        localStorage.setItem('theme-stats', JSON.stringify(stats));
    }

    // 현재 테마 반환
    getCurrentTheme() {
        return this.currentTheme;
    }

    // 테마 통계 반환 (개발용)
    getThemeStats() {
        return JSON.parse(localStorage.getItem('theme-stats') || '{}');
    }

    // 시스템 테마 감지
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
}

// 페이지 로드 시 테마 매니저 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 테마 매니저 인스턴스 생성
    window.themeManager = new ThemeManager();
    
    // Cline에게 요청: 테마 전환 애니메이션 개선
    console.log('🎨 테마 매니저 초기화 완료');
    console.log(`현재 테마: ${window.themeManager.getCurrentTheme()}`);
});

// Cline에게 요청할 추가 기능들:
// 1. 테마별 배경 이미지 설정
// 2. 테마 전환 시 페이지 요소들의 순차적 애니메이션
// 3. 시간대별 자동 테마 전환 (아침/저녁)
// 4. 커스텀 테마 색상 선택기
// 5. 테마 미리보기 기능

/* 사용 예시:
 * 
 * // 프로그래밍 방식으로 테마 변경
 * window.themeManager.setTheme('dark');
 * 
 * // 현재 테마 확인
 * const currentTheme = window.themeManager.getCurrentTheme();
 * 
 * // 시스템 테마 확인
 * const systemTheme = window.themeManager.getSystemTheme();
 * 
 * // 테마 사용 통계 확인
 * const stats = window.themeManager.getThemeStats();
 */
