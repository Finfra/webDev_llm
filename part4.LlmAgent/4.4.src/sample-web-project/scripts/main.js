// 메인 JavaScript - Cline과 함께 개발하는 포트폴리오
// Cline에게 요청: 더 부드러운 스크롤 애니메이션과 인터랙션 효과 추가

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // DOM이 로드된 후 초기화
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
            this.initScrollAnimations();
            this.initNavigation();
            this.initTypingEffect();
            
            // Cline에게 요청: 페이지 로딩 애니메이션 추가
            this.initPageLoading();
            
            console.log('✨ 포트폴리오 앱 초기화 완료');
        });
    }

    bindEvents() {
        // 스크롤 이벤트
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateActiveNavLink();
        });

        // 리사이즈 이벤트
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // 네비게이션 링크 클릭
        this.initSmoothScrolling();

        // 프로젝트 카드 호버 효과
        this.initProjectCardEffects();

        // Cline에게 요청: 키보드 네비게이션 지원
        this.initKeyboardNavigation();
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // 네비게이션 바 스타일 변경
        this.updateNavbarOnScroll(scrollY);
        
        // 스크롤 진행 표시기 업데이트
        this.updateScrollProgress(scrollY);
        
        // Cline에게 요청: 패럴랙스 효과 추가
        this.updateParallaxEffects(scrollY);
        
        // 스크롤 투 톱 버튼 표시/숨김
        this.toggleScrollToTopButton(scrollY);
    }

    updateNavbarOnScroll(scrollY) {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    updateScrollProgress(scrollY) {
        // Cline에게 요청: 스크롤 진행 표시기 구현
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / docHeight) * 100;
        
        let progressBar = document.getElementById('scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrollPercent}%;
                height: 3px;
                background: linear-gradient(90deg, #4a90e2, #50c878);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = `${scrollPercent}%`;
        }
    }

    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // 네비게이션 높이 고려
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Cline에게 요청: 스크롤 버튼들에 대한 부드러운 스크롤 효과 추가
        this.initScrollButtons();
    }

    initScrollButtons() {
        // 스크롤 다운 버튼
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // 히어로 섹션 버튼들
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.textContent.includes('프로젝트')) {
                    e.preventDefault();
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                } else if (button.textContent.includes('연락')) {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    initScrollAnimations() {
        // Intersection Observer를 사용한 스크롤 애니메이션
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Cline에게 요청: 카운터 애니메이션 추가
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // 애니메이션 대상 요소들 관찰
        const animateElements = document.querySelectorAll(`
            .about-content,
            .project-card,
            .stat-card,
            .skill-category,
            .contact-content
        `);

        animateElements.forEach(el => {
            el.classList.add('animate-target');
            observer.observe(el);
        });

        // Cline에게 요청: 더 다양한 애니메이션 효과 추가
        this.addAnimationStyles();
    }

    addAnimationStyles() {
        // 동적으로 애니메이션 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            .animate-target {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-target.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .project-card.animate-target {
                transform: translateY(50px) scale(0.9);
            }
            
            .project-card.animate-in {
                transform: translateY(0) scale(1);
            }
            
            .stat-card.animate-target {
                transform: translateX(-30px);
            }
            
            .stat-card.animate-in {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }

    animateCounter(statCard) {
        // Cline에게 요청: 숫자 카운트업 애니메이션 구현
        const numberElement = statCard.querySelector('h3');
        if (!numberElement) return;

        const targetNumber = parseInt(numberElement.textContent);
        if (isNaN(targetNumber)) return;

        let currentNumber = 0;
        const increment = targetNumber / 50; // 50 스텝으로 나누어 애니메이션
        const duration = 1000; // 1초
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            numberElement.textContent = Math.floor(currentNumber) + '+';
        }, stepTime);
    }

    initProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // 마우스 엔터 효과
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                
                // Cline에게 요청: 카드 내부 이미지에 확대 효과 추가
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                    img.style.transition = 'transform 0.3s ease';
                }
            });

            // 마우스 리브 효과
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });

            // Cline에게 요청: 3D 틸트 효과 추가
            this.add3DTiltEffect(card);
        });
    }

    add3DTiltEffect(element) {
        // Cline에게 요청: 마우스 움직임에 따른 3D 틸트 효과
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `
                translateY(-10px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.02)
            `;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    }

    initTypingEffect() {
        // Cline에게 요청: 히어로 섹션 타이핑 효과 구현
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (!heroSubtitle) return;

        const originalText = heroSubtitle.textContent;
        const texts = [
            '웹 개발자입니다',
            'UI/UX 디자이너입니다', 
            '문제 해결사입니다',
            'AI 도구 활용자입니다'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // 완성된 텍스트 표시 시간
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // 2초 후 타이핑 효과 시작
        setTimeout(typeEffect, 2000);
    }

    initPageLoading() {
        // Cline에게 요청: 페이지 로딩 애니메이션 구현
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>포트폴리오 로딩중...</p>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;

        document.body.appendChild(loader);

        // 페이지 로드 완료 후 로더 제거
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }

    initKeyboardNavigation() {
        // Cline에게 요청: 키보드 접근성 개선
        document.addEventListener('keydown', (e) => {
            // 섹션 간 네비게이션 (화살표 키)
            if (e.altKey) {
                const sections = ['home', 'about', 'projects', 'skills', 'contact'];
                const currentHash = window.location.hash.substring(1) || 'home';
                const currentIndex = sections.indexOf(currentHash);

                if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                    e.preventDefault();
                    const nextSection = document.getElementById(sections[currentIndex + 1]);
                    nextSection?.scrollIntoView({ behavior: 'smooth' });
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    e.preventDefault();
                    const prevSection = document.getElementById(sections[currentIndex - 1]);
                    prevSection?.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    toggleScrollToTopButton(scrollY) {
        // Cline에게 요청: 스크롤 투 톱 버튼 구현
        let scrollToTopBtn = document.getElementById('scroll-to-top');
        
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.id = 'scroll-to-top';
            scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
            scrollToTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            `;
            
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            document.body.appendChild(scrollToTopBtn);
        }

        if (scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(20px)';
        }
    }

    handleResize() {
        // 반응형 처리
        const navbar = document.querySelector('.navbar');
        // Cline에게 요청: 모바일 네비게이션 토글 기능 추가
    }

    // 유틸리티 메서드들
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 성능 모니터링 (개발용)
    logPerformance() {
        if (window.performance) {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`페이지 로딩 시간: ${loadTime}ms`);
        }
    }
}

// 포트폴리오 앱 인스턴스 생성
const portfolioApp = new PortfolioApp();

// Cline에게 요청할 추가 기능들:
// 1. 이미지 지연 로딩 (Lazy Loading)
// 2. 서비스 워커를 이용한 캐싱
// 3. 다국어 지원
// 4. 애니메이션 성능 최적화
// 5. 접근성 개선 (ARIA 라벨, 포커스 관리)
// 6. PWA 기능 추가
// 7. 폼 유효성 검사
// 8. 이미지 최적화 및 WebP 지원
// 9. 스크롤 가상화 (큰 목록 처리)
// 10. 사용자 상호작용 분석

/* 사용 예시:
 * 
 * // 특정 섹션으로 스크롤
 * document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
 * 
 * // 현재 활성 섹션 확인
 * console.log(portfolioApp.getCurrentActiveSection());
 * 
 * // 성능 데이터 확인
 * portfolioApp.logPerformance();
 */
