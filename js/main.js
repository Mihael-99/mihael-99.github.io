// 부드러운 스크롤 진입 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.page-section, .home-hero, .home-intro');

    sections.forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    requestAnimationFrame(() => {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });

    // 메인 페이지 히어로 슬라이드쇼 — 5초마다 자동 전환
    const slides = document.querySelectorAll('.hero-slide');
    console.log('[Hero slideshow] slides found:', slides.length);

    if (slides.length > 1) {
        // HTML에서 is-active가 어디 붙어있든 그 위치에서 시작
        let activeIndex = Array.from(slides).findIndex((s) => s.classList.contains('is-active'));
        if (activeIndex < 0) {
            activeIndex = 0;
            slides[0].classList.add('is-active');
        }

        setInterval(() => {
            slides[activeIndex].classList.remove('is-active');
            activeIndex = (activeIndex + 1) % slides.length;
            slides[activeIndex].classList.add('is-active');
            console.log('[Hero slideshow] →', activeIndex);
        }, 5000);
    }
});
