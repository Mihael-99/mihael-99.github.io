// 썸네일 클릭 + 좌/우 화살표로 메인 이미지 전환
document.addEventListener('DOMContentLoaded', () => {
    const thumbs = Array.from(document.querySelectorAll('.thumb-item'));
    const mainPlaceholder = document.querySelector('.detail-main-placeholder');
    const mainImg = mainPlaceholder ? mainPlaceholder.querySelector('img') : null;
    const mainSpan = mainPlaceholder ? mainPlaceholder.querySelector('span') : null;
    const prevBtn = document.querySelector('.gallery-arrow.prev');
    const nextBtn = document.querySelector('.gallery-arrow.next');

    if (!thumbs.length || !mainPlaceholder) return;

    let currentIndex = thumbs.findIndex((t) => t.classList.contains('active'));
    if (currentIndex < 0) currentIndex = 0;

    console.log('[Gallery] initialized with', thumbs.length, 'thumbs. mainImg:', !!mainImg);

    function setActive(index) {
        currentIndex = (index + thumbs.length) % thumbs.length;

        thumbs.forEach((t) => t.classList.remove('active'));
        thumbs[currentIndex].classList.add('active');

        // 실제 이미지가 있으면 src 스왑, 아니면 placeholder 라벨 업데이트
        const thumbImg = thumbs[currentIndex].querySelector('img');
        if (thumbImg && mainImg) {
            mainImg.src = thumbImg.src;
            mainImg.alt = thumbImg.alt;
            console.log('[Gallery] → image', currentIndex + 1, thumbImg.src);
        } else if (mainSpan) {
            const label = thumbs[currentIndex].querySelector('span')?.textContent || 'MAIN';
            mainSpan.textContent = `IMAGE ${label}`;
        }

        thumbs[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => setActive(index));
    });

    if (prevBtn) prevBtn.addEventListener('click', () => setActive(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => setActive(currentIndex + 1));

    // ============================================
    // 라이트박스 (이미지 더블클릭 → 풀스크린 모달)
    // ============================================
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.hidden = true;
    lightbox.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="닫기">&times;</button>
        <button type="button" class="lightbox-arrow prev" aria-label="이전 이미지">&lsaquo;</button>
        <button type="button" class="lightbox-arrow next" aria-label="다음 이미지">&rsaquo;</button>
        <div class="lightbox-content"></div>
        <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(lightbox);

    const lbContent = lightbox.querySelector('.lightbox-content');
    const lbCounter = lightbox.querySelector('.lightbox-counter');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-arrow.prev');
    const lbNext = lightbox.querySelector('.lightbox-arrow.next');

    let lightboxIndex = 0;

    function openLightbox(index) {
        lightboxIndex = (index + thumbs.length) % thumbs.length;

        lbContent.innerHTML = '';
        // 실제 이미지가 있으면 img 자체를 라이트박스에 표시 (원본 비율 유지)
        const sourceImg = thumbs[lightboxIndex].querySelector('img');
        if (sourceImg) {
            const img = document.createElement('img');
            img.src = sourceImg.src;
            img.alt = sourceImg.alt;
            lbContent.appendChild(img);
        } else {
            // placeholder만 있는 경우 (실제 이미지 아직 없는 프로젝트)
            const sourcePlaceholder = thumbs[lightboxIndex].querySelector('.image-placeholder');
            if (sourcePlaceholder) {
                const clone = sourcePlaceholder.cloneNode(true);
                clone.classList.remove('thumb-placeholder');
                const span = clone.querySelector('span');
                if (span) span.textContent = `IMAGE ${span.textContent}`;
                lbContent.appendChild(clone);
            }
        }
        lbCounter.textContent = `${lightboxIndex + 1} / ${thumbs.length}`;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lbContent.innerHTML = '';
        document.body.style.overflow = '';
    }

    // 더블클릭 → 라이트박스 열기
    mainPlaceholder.addEventListener('dblclick', () => openLightbox(currentIndex));
    thumbs.forEach((thumb, i) => {
        thumb.addEventListener('dblclick', () => openLightbox(i));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => openLightbox(lightboxIndex - 1));
    lbNext.addEventListener('click', () => openLightbox(lightboxIndex + 1));

    // 배경(어두운 영역) 클릭 시 닫기 — 컨텐츠 안쪽은 pointer-events로 보호됨
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // 키보드 처리 — 라이트박스 열려있으면 라이트박스 컨트롤, 닫혀있으면 갤러리 네비
    document.addEventListener('keydown', (e) => {
        if (!lightbox.hidden) {
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') openLightbox(lightboxIndex - 1);
            else if (e.key === 'ArrowRight') openLightbox(lightboxIndex + 1);
        } else {
            if (e.key === 'ArrowLeft') setActive(currentIndex - 1);
            if (e.key === 'ArrowRight') setActive(currentIndex + 1);
        }
    });

    // 유튜브 영상 lazy load — 썸네일 클릭 시 IFrame API로 플레이어 생성
    // youtube-nocookie.com 도메인 사용 + 임베드 오류(101/150) 시 폴백 UI 표시
    let ytApiPromise = null;
    function loadYouTubeApi() {
        if (ytApiPromise) return ytApiPromise;
        ytApiPromise = new Promise((resolve) => {
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (typeof prev === 'function') prev();
                resolve();
            };
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
        });
        return ytApiPromise;
    }

    function showVideoFallback(iframe, videoId) {
        const fallback = document.createElement('div');
        fallback.className = 'video-fallback';
        fallback.innerHTML = `
            <p>이 영상은 외부 사이트 임베드가 차단되어 있어요.</p>
            <a href="https://youtu.be/${videoId}" target="_blank" rel="noopener">유튜브에서 보기 ↗</a>
        `;
        iframe.replaceWith(fallback);
    }

    document.querySelectorAll('.video-embed').forEach((embed) => {
        const thumb = embed.querySelector('.video-thumb');
        if (!thumb) return;
        thumb.addEventListener('click', async () => {
            const videoId = embed.dataset.videoId;
            if (!videoId) return;

            await loadYouTubeApi();

            const mountId = `yt-${videoId}-${Date.now()}`;
            const mount = document.createElement('div');
            mount.id = mountId;
            thumb.replaceWith(mount);

            new YT.Player(mountId, {
                host: 'https://www.youtube-nocookie.com',
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    rel: 0,
                    playsinline: 1,
                },
                events: {
                    onError: (e) => {
                        // 101, 150 = 영상 소유자가 외부 임베드 차단
                        if (e.data === 101 || e.data === 150) {
                            showVideoFallback(e.target.getIframe(), videoId);
                        }
                    },
                },
            });
        });
    });
});
