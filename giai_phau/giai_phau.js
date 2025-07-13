function setupMainMediaCarousel() {
    // 1. Chọn tất cả các card giải phẫu trên trang
    const anatomyCards = document.querySelectorAll('.noidung_anatomy-card');

    // 2. Lặp qua từng card để thiết lập carousel riêng cho nó
    anatomyCards.forEach(card => {
        const carousel = card.querySelector('.anatomy-media-carousel');
        const prevBtn = card.querySelector('.carousel-btn.prev');
        const nextBtn = card.querySelector('.carousel-btn.next');

        // Nếu card này không có carousel thì bỏ qua
        if (!carousel || !prevBtn || !nextBtn) return;

        // Ẩn các slide có video nhưng không có đường dẫn hợp lệ
        const videoSlides = card.querySelectorAll('.media-slide .anatomy-video-container');
        videoSlides.forEach(videoContainer => {
            const source = videoContainer.querySelector('video source');
            if (!source || !source.getAttribute('src') || source.getAttribute('src').trim() === '') {
                videoContainer.closest('.media-slide').style.display = 'none';
            }
        });

        // Lấy danh sách các slide có thể nhìn thấy (không bị ẩn)
        const visibleSlides = Array.from(carousel.querySelectorAll('.media-slide')).filter(
            slide => slide.style.display !== 'none'
        );

        // 3. Nếu chỉ có 1 slide hoặc không có slide nào, hãy ẩn các nút chuyển
        if (visibleSlides.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return; // Dừng thực thi cho carousel này
        }

        let currentIndex = 0;
        const totalSlides = visibleSlides.length;

        const updateCarousel = () => {
            // Sắp xếp lại các slide để đảm bảo chúng liền mạch
            visibleSlides.forEach(slide => carousel.appendChild(slide));
            
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            prevBtn.classList.toggle('hidden', currentIndex === 0);
            nextBtn.classList.toggle('hidden', currentIndex === totalSlides - 1);
            
            // Xử lý phát/dừng video
            const allVideos = card.querySelectorAll('video');
            allVideos.forEach(vid => vid.pause()); // Dừng tất cả video trước

            const activeSlideVideo = visibleSlides[currentIndex].querySelector('video');
            if (activeSlideVideo) {
                activeSlideVideo.play();
            }
        };

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Khởi tạo trạng thái ban đầu
        updateCarousel();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const allAnatomyPages = [
        { pageUrl: '/giai_phau/chi_tren/co_delta.html' },
        { pageUrl: '/giai_phau/chi_tren/co_tron_lon.html' },
        { pageUrl: '/giai_phau/chi_tren/co_tron_be.html' },
        { pageUrl: '/giai_phau/chi_tren/co_tren_gai.html' },
        { pageUrl: '/giai_phau/chi_tren/co_duoi_gai.html' },        
        { pageUrl: '/giai_phau/chi_tren/co_duoi_vai.html' },
        { pageUrl: '/giai_phau/chi_tren/co_nhi_dau_canh_tay.html' },
        { pageUrl: '/giai_phau/chi_tren/co_tam_dau_canh_tay.html' },
        { pageUrl: '/giai_phau/chi_tren/co_canh_tay.html' },
        { pageUrl: '/giai_phau/chi_tren/co_qua_canh_tay.html' },
        { pageUrl: '/giai_phau/chi_tren/co_khuyu.html' },
        { pageUrl: '/giai_phau/chi_tren/co_canh_tay_quay.html' },
        { pageUrl: '/giai_phau/chi_tren/co_sap_tron.html' },
        { pageUrl: '/giai_phau/chi_tren/co_sap_vuong.html' },
        { pageUrl: '/giai_phau/chi_tren/co_ngua.html' },
        { pageUrl: '/giai_phau/chi_tren/co_gap_co_tay_tru.html' },
        { pageUrl: '/giai_phau/chi_tren/co_gap_co_tay_quay.html' },
        { pageUrl: '/giai_phau/chi_tren/co_gan_tay_dai.html' },
        { pageUrl: '/giai_phau/chi_tren/co_gap_cac_ngon_nong.html' },
        { pageUrl: '/giai_phau/chi_tren/co_gap_cac_ngon_sau.html' },
        { pageUrl: '/giai_phau/chi_tren/co_gap_ngon-cai_dai.html' },
        { pageUrl: '/giai_phau/chi_tren/co_gap_ngon_cai_ngan.html' },
        { pageUrl: '/giai_phau/chi_tren/co_gap_ngon_ut.html' },
        { pageUrl: '/giai_phau/chi_tren/co_duoi_co_tay_quay_dai.html' },
        { pageUrl: '/giai_phau/chi_tren/co_duoi_co_tay_quay_ngan.html' },
        { pageUrl: '/giai_phau/chi_tren/co_duoi_co_tay_tru.html' },
        { pageUrl: '/giai_phau/chi_tren/co_duoi_chung_cac_ngon.html' },
        { pageUrl: '/giai_phau/chi_tren/co_duoi_ngon_cai_dai.html' },
        { pageUrl: '/giai_phau/chi_tren/co_duoi_ngon_cai_ngan.html' },
        { pageUrl: '/giai_phau/chi_tren/co_duoi_ngon_tro.html' },
        { pageUrl: '/giai_phau/chi_tren/co_duoi_ngon_ut.html' },
        { pageUrl: '/giai_phau/chi_tren/co_giun.html' },        
        { pageUrl: '/giai_phau/chi_tren/co_gian_cot_gan_tay.html' },
        { pageUrl: '/giai_phau/chi_tren/co_gian_cot_mu_tay.html' },
        { pageUrl: '/giai_phau/chi_tren/co_dang_ngon_cai_dai.html' },
        { pageUrl: '/giai_phau/chi_tren/co_dang_ngon_cai_ngan.html' },
        { pageUrl: '/giai_phau/chi_tren/co_dang_ngon_ut.html' },
        { pageUrl: '/giai_phau/chi_tren/co_doi_ngon_cai.html' },
        { pageUrl: '/giai_phau/chi_tren/co_doi_ngon_ut.html' },
    // --- Chi dưới ---
        { pageUrl: '/giai_phau/chi_duoi/co_that_lung_chau.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_mong_lon.html' },        { pageUrl: '/giai_phau/chi_duoi' },
        { pageUrl: '/giai_phau/chi_duoi/co_mong_be.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_mong_nho.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_cang_mac_dui.html' },
        { pageUrl: '/giai_phau/chi_duoi/nhom_co_xoay_ngoai_hong.html' },
        { pageUrl: '/giai_phau/chi_duoi/nhom_co_khep.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_may.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_tu_dau_dui.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_tam_dau_dui.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_luoc.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_thon.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_chay_truoc.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_chay_sau.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_bung_chan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_dep.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_gan_chan_gay.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_khoeo.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_mac_dai.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_mac_ngan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_mac_ba.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_gap_ngon_chan_dai.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_gap_ngon_chan_ngan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_gap_ngon_chan_cai_dai.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_gap_ngon_chan_cai_ngan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_duoi_ngon_chan_dai.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_duoi_ngon_chan_ngan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_duoi_ngon_chan_cai_dai.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_duoi_ngon_chan_cai_ngan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_dang_ngon_chan_cai.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_khep_ngon_chan_cai.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_gian-cot_mu_chan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_gian_cot_gan_chan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_giun.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_vuong_gan_chan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_gap_ngon_chan_ut_ngan.html' },
        { pageUrl: '/giai_phau/chi_duoi/co_dang_ngon_chan_ut.html' },
        // --- Lưng ---
        { pageUrl: '/giai_phau/lung/co_lung_rong.html' },
        { pageUrl: '/giai_phau/lung/co_tram_lon.html' },
        { pageUrl: '/giai_phau/lung/co_tram_be.html' },
        { pageUrl: '/giai_phau/lung/co_nang_vai.html' },
        { pageUrl: '/giai_phau/lung/co_rang_cua_sau.html' },
        { pageUrl: '/giai_phau/lung/co_cuc_dai.html' },
        { pageUrl: '/giai_phau/lung/co_chau_suon.html' },
        { pageUrl: '/giai_phau/lung/co_gai_song.html' },
        { pageUrl: '/giai_phau/lung/co_nhieu_chan.html' },
        { pageUrl: '/giai_phau/lung/co_xoay.html' },
        { pageUrl: '/giai_phau/lung/co_gian_gai.html' },
        { pageUrl: '/giai_phau/lung/co_gian_ngang.html' },
        { pageUrl: '/giai_phau/lung/co_nang_suon.html' },
        // --- đẦU MẶT CỔT ---
        { pageUrl: '/giai_phau/dau_mat_co/co_tran.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_vong_mat.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_cau_may.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_manh_khanh.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_mui.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_vong_mieng.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_nang_moi_tren.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_nang_moi_tren_canh_mui.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_go_ma_nho.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_go_ma_lon.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_mut.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_nang_goc_mieng.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_cuoi.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_ha_moi_duoi.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_can.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_thai_duong.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_chan_buom_trong.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_chan_buom_ngoaoi.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_bam_da_co.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_uc_don_chum.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_hai_than.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_ham_mong.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_tram_mong.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_cam_mong.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_uc_mong.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_giap_mong.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_vai_mong.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_uc_giap.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_thang_dau_truoc.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_thang_dau_ben.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_dai_dau.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_dai_co.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_bac__thang.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_thang.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_goi_dau.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_goi_co.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_ban_gai_co.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_thang_dau_sau_lon.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_thang_dau_sau_be.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_cheo_dau_tren.html' },
        { pageUrl: '/giai_phau/dau_mat_co/co_cheo_dau_duoi.html' },

             
    ];
    function smoothScrollTo(element, to, duration) {
        const start = element.scrollLeft;
        const change = to - start;
        let startTime = null;

        function animateScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = 0.5 * (1 - Math.cos(Math.PI * progress));
            element.scrollLeft = start + change * ease;
            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }
        requestAnimationFrame(animateScroll);
    }

    function setupCarousel(containerId, leftBtnId, rightBtnId, pages) {
        const container = document.getElementById(containerId);
        const leftBtn = document.getElementById(leftBtnId);
        const rightBtn = document.getElementById(rightBtnId);

        if (!container || !leftBtn || !rightBtn || pages.length === 0) {
            const section = container?.closest('.limb-section');
            if (section) section.style.display = 'none';
            return;
        }

        // Cập nhật số lượng thẻ
        const section = container.closest('.limb-section');
        if (section) {
            const heading = section.querySelector('h4');
            if (heading) {
                if (!heading.dataset.originalText) {
                    heading.dataset.originalText = heading.textContent;
                }
                heading.textContent = `${heading.dataset.originalText} (${pages.length})`;
            }
        }

        container.innerHTML = '';
        pages.forEach(pageData => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';

            const img = document.createElement('img');
            img.src = pageData.imageUrl;
            img.alt = `Hình ảnh ${pageData.title}`;
            img.onerror = function () {
                if (!this.dataset.failed) {
                    this.src = 'https://placehold.co/250x150/007bff/ffffff?text=Not+Found';
                    this.dataset.failed = 'true';
                }
            };

            const titleEl = document.createElement('h4');
            titleEl.className = 'suggestion-item-title';
            titleEl.textContent = pageData.title;

            const link = document.createElement('a');
            link.className = 'suggestion-btn';
            link.href = pageData.pageUrl;
            link.textContent = 'Xem chi tiết';

            item.append(img, titleEl, link);
            container.appendChild(item);
        });

        const updateButtons = () => {
            setTimeout(() => {
                const hasOverflow = container.scrollWidth > container.clientWidth;
                if (!hasOverflow) {
                    leftBtn.classList.add('hidden');
                    rightBtn.classList.add('hidden');
                    return;
                }

                const scrollAmount = container.scrollLeft;
                const maxScroll = container.scrollWidth - container.clientWidth;
                leftBtn.classList.toggle('hidden', scrollAmount <= 0);
                rightBtn.classList.toggle('hidden', scrollAmount >= maxScroll - 1);
            }, 150);
        };

        const scrollDistance = container.clientWidth * 0.8;
        leftBtn.addEventListener('click', () =>
            smoothScrollTo(container, container.scrollLeft - scrollDistance, 400)
        );
        rightBtn.addEventListener('click', () =>
            smoothScrollTo(container, container.scrollLeft + scrollDistance, 400)
        );
        container.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);

        updateButtons();
    }

    async function initializeSuggestions() {
        const currentPageTitle = document.querySelector('.anatomy-title')?.textContent.trim() || '';

        const invalidUrls = ['/giai_phau/chi_duoi', '/giai_phau/lung'];
        const pageDataPromises = allAnatomyPages.map(async (page) => {
            try {
                if (!page.pageUrl || invalidUrls.includes(page.pageUrl.trim())) return null;

                const response = await fetch(page.pageUrl);
                if (!response.ok) return null;

                const htmlText = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');

                const title = doc.querySelector('.anatomy-title')?.textContent.trim();
                const imageUrl = doc.querySelector('.anatomy-image-container img')?.src;
                const limbType = doc.querySelector('main.noidung_container')?.dataset.limbType;

                if (!title || !imageUrl || !limbType) return null;
                if (title === currentPageTitle) return null;

                return {
                    title,
                    imageUrl,
                    pageUrl: page.pageUrl,
                    limbType
                };
            } catch (error) {
                console.error(`Lỗi khi xử lý ${page.pageUrl}:`, error);
                return null;
            }
        });

        const allPageData = (await Promise.all(pageDataPromises)).filter(Boolean);

        const upperLimbData = allPageData.filter(p => p.limbType === 'chi-tren');
        const lowerLimbData = allPageData.filter(p => p.limbType === 'chi-duoi');
        const backLimbData = allPageData.filter(p => p.limbType === 'lung');
        const headAndNeckLimbData = allPageData.filter(p => p.limbType === 'dau_mat_co');

        setupCarousel('suggestion-container-upper', 'upper-scroll-left', 'upper-scroll-right', upperLimbData);
        setupCarousel('suggestion-container-lower', 'lower-scroll-left', 'lower-scroll-right', lowerLimbData);
        setupCarousel('suggestion-container-back', 'back-scroll-left', 'back-scroll-right', backLimbData);
        setupCarousel('suggestion-container-Head_and_Neck_Anatomy', 'Head_and_Neck_Anatomy-scroll-left', 'Head_and_Neck_Anatomy-scroll-right', headAndNeckLimbData);
    }

    setupMainMediaCarousel();
    initializeSuggestions();
});