function createCardElement(config) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-lg flex flex-col sm:flex-row card-transition hover:shadow-2xl hover:-translate-y-1.5';
        
        card.innerHTML = `
            <!-- Left side: Icon and Title -->
            <div class="flex-shrink-0 w-full sm:w-38 md:w-60 flex flex-col items-center justify-center text-center p-6 border-b sm:border-b-0 sm:border-r border-gray-200">
                ${config.iconSvg}
                <h3 class="font-bold text-lg text-gray-700 mt-2">${config.title}</h3>
                <p class="text-sm text-gray-500 mt-1 js-count"></p>
            </div>
            <!-- Right side: List of links -->
            <div class="flex-grow p-6 relative">
                <ul class="space-y-2 js-list">
                    <!-- JS will populate this -->
                </ul>
                <!-- Navigation Buttons -->
                <div class="js-nav-controls absolute bottom-4 right-6 flex hidden space-x-2">
                    <button class="prev-btn rounded-full bg-gray-200 p-2 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50">
                        <svg class="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button class="next-btn rounded-full bg-gray-200 p-2 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50">
                        <svg class="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        `;
        return card;
    }

    /**
     * Fetches and populates a list with links, showing a loading state.
     * @param {Array<string>} links - Array of URLs to fetch.
     * @param {HTMLElement} listElement - The UL element to populate.
     * @param {function} onCompleteCallback - Callback to run after population.
     */
    async function fetchAndPopulateList(links, listElement, onCompleteCallback) {
        if (!listElement) return;
        listElement.innerHTML = ''; // Clear existing content

        // Create placeholder items for loading state
        const placeholders = Array.from({ length: Math.min(links.length, 5) }, () => {
            const li = document.createElement('li');
            li.className = 'p-2 rounded-md bg-gray-100 animate-pulse';
            li.style.height = '36px'; // Match link height
            return li;
        });
        listElement.append(...placeholders);

        const fetchPromises = links.map(async (url) => {
            try {
                // Simulate network delay for better UX demonstration
                await new Promise(res => setTimeout(res, 50 + Math.random() * 150)); 
                const res = await fetch(url);
                if (!res.ok) throw new Error('Network response was not ok');
                const html = await res.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                
                const titleElement = 
                    doc.querySelector('h1.text-3xl.md\\:text-4xl.font-bold.tracking-wide.text-gradient') ||
                    doc.querySelector('h1') ||
                    doc.querySelector('title');
                const rawTitle = titleElement ? titleElement.textContent.trim() : (doc.title || url);
                const title = capitalizeFirstWordOnly(rawTitle);

                return { title, url, success: true };
            } catch (err) {
                console.error(`Failed to fetch ${url}:`, err);
                const dummyTitle = url.split('/').pop().replace('.html', '').replace(/-/g, ' ');
                return { title: `(Lỗi) ${capitalizeFirstWordOnly(dummyTitle)}`, url, success: false };
            }
        });

        const items = await Promise.all(fetchPromises);
        
        listElement.innerHTML = ''; // Clear placeholders

        items.forEach(({ title, url, success }, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        a.textContent = title;
        a.href = url;
        a.className = `block p-2 rounded-md font-medium transition-all duration-200 animate-fadeInUp ${success ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700' : 'text-red-500 cursor-not-allowed'}`;
        a.style.animationDelay = `${(index % 5) * 50}ms`;

        if (!success) a.onclick = (e) => e.preventDefault();
        
        li.appendChild(a);
        listElement.appendChild(li);
    });

        if (onCompleteCallback) onCompleteCallback();
    }

    /**
 * Sets up pagination for a single card.
 * @param {HTMLElement} cardElement - The root HTML element for the card.
 * @param {object} config - The configuration object for the card.
 */
function setupCardPaginator(cardElement, config) {
    const listElement = cardElement.querySelector('.js-list');
    const countElement = cardElement.querySelector('.js-count');
    const navControls = cardElement.querySelector('.js-nav-controls');
    const prevBtn = navControls.querySelector('.prev-btn');
    const nextBtn = navControls.querySelector('.next-btn');

    let currentPage = 1;
    const itemsPerPage = 5; // Display 5 links per page

    const updateView = () => {
        const items = listElement.querySelectorAll('li');
        const totalItems = items.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        items.forEach((li, index) => {
            const itemPage = Math.floor(index / itemsPerPage) + 1;
            li.style.display = itemPage === currentPage ? 'block' : 'none';
        });

        if (totalPages > 1) {
            navControls.classList.remove('hidden');
        } else {
            navControls.classList.add('hidden');
        }

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;

        // Update count text
        if (countElement) {
            countElement.textContent = `${totalItems} ${config.countUnit}`;
        }
    };

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateView();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalItems = listElement.querySelectorAll('li').length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateView();
        }
    });

    // Initial population and view update
    fetchAndPopulateList(config.links, listElement, updateView);
}

    /**
     * Capitalizes only the first word of a string and converts the rest to lowercase.
     * @param {string} str - The input string.
     * @returns {string} The formatted string.
     */
    function capitalizeFirstWordOnly(str) {
        str = str.toLowerCase().trim();
        if (str.length === 0) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // --- Main DOMContentLoaded Listener for Card Initialization and Iframe ---
    document.addEventListener('DOMContentLoaded', () => {
        const cardConfigurations = [
            {
                title: 'Thần kinh',
                iconSvg: `<div class="icon text-purple-600 text-4xl"><i class="fas fa-brain"></i></div>`,
                links: [
                    '/benhhoc/tailieu/benh_alzhemer.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'TIÊU HÓA',
                iconSvg: `<div class="icon text-green-600 text-4xl"><i class="fas fa-book-medical"></i></div>`,
                links: [
                    '/benhhoc/tailieu/loet_da_day_ta_trang.html', 
                    '/benhhoc/tailieu/HC_trao_nguoc_da_day_thuc_quan.html', 
                    '/benhhoc/tailieu/thung_da_day.html',
                    '/benhhoc/tailieu/HC_tac_ruot.html',
                    '/benhhoc/tailieu/viem_ruot_thua_cap.html',
                    '/benhhoc/tailieu/soi_tui_mat.html',
                    '/benhhoc/tailieu/viem_gan_toi_cap.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'HÔ HẤP',
                iconSvg: `<div class="icon text-red-600 text-4xl"><i class="fas fa-lungs"></i></div>`,
                links: [
                    
                    '/benhhoc/tailieu/viem_phoi_cong_dong.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'TAI - MŨI - HỌNG',
                iconSvg: `<div class="icon text-indigo-600 text-4xl"><i class="fas fa-deaf"></i></div>`, // Assuming fas-bone exists or use a generic one
                links: [
                    '/benhhoc/tailieu/viem_VA.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'TIM MẠCH',
                iconSvg: `<div class="icon text-blue-600 text-4xl"><i class="fas fa-heart"></i></div>`,
                links: [
                    '/benhhoc/tailieu/tang_huyet_ap.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'TIẾT NIỆU',
                iconSvg: `<div class="icon text-yellow-600 text-4xl"><i class="fas fa-tint"></i></div>`, // Assuming fas-kidneys exists or use a generic one
                links: [
                    
                    '/benhhoc/tailieu/benh_than_man.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'NỘI TIẾT',
                iconSvg: `<div class="icon text-yellow-600 text-4xl"><i class="fas fa-vial"></i></div>`, // Assuming fas-kidneys exists or use a generic one
                links: [
                    '/benhhoc/tailieu/dai_thao_duong.html', 
                    '/benhhoc/tailieu/hoi_chung_cushing.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'CƠ XƯƠNG KHỚP',
                iconSvg: `<div class="icon text-indigo-600 text-4xl"><i class="fas fa-bone"></i></div>`, // Assuming fas-bone exists or use a generic one
                links: [
                    '/benhhoc/tailieu/viem_khop_dang_thap.html', 
                    '/benhhoc/tailieu/gout.html', 
                    '/benhhoc/tailieu/loang_xuong.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'TRUYỀN NHIỄM',
                iconSvg: `<div class="icon text-indigo-600 text-4xl"><i class="fa-solid fa-viruses"></i></div>`, // Assuming fas-bone exists or use a generic one
                links: [
                    '/benhhoc/tailieu/viem_gan_sieu_vi.html',
                    '/benhhoc/tailieu/lao_phoi.html',
                    '/benhhoc/tailieu/benh_uon_van.html',
                    '/benhhoc/tailieu/nhiem_khuan_ho_hap_cap_tinh_tre_em.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'DỊ ỨNG',
                iconSvg: `<div class="icon text-indigo-600 text-4xl"><i class="fas fa-allergies"></i></div>`, // Assuming fas-bone exists or use a generic one
                links: [
                    '/benhhoc/tailieu/lupus_ban_do_he_thong.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'MẮT',
                iconSvg: `<div class="icon text-indigo-600 text-4xl"><i class="fa-solid fa-eye"></i></div>`, // Assuming fas-bone exists or use a generic one
                links: [
                    '/benhhoc/tailieu/viem_ket_mac.html'
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'MÁU VÀ DI TRUYỀN',
                iconSvg: `<div class="icon text-yellow-600 text-4xl"><i class="fa-solid fa-dna"></i></div>`, // Assuming fas-kidneys exists or use a generic one
                links: [
                    '/benhhoc/tailieu/benh_thalasemia.html',
                    '/benhhoc/tailieu/benh_bach_tang.html',
                    '/benhhoc/tailieu/HC_down.html',
                ],
                countUnit: 'tài liệu'
            },
            {
                title: 'SỨC KHỎE GIỚI TÍNH',
                iconSvg: `<div class="icon text-indigo-600 text-4xl"><i class="fas fa-venus-mars"></i></div>`, // Assuming fas-bone exists or use a generic one
                links: [
                    '/benhhoc/tailieu/nhiem_doc_thai_nghen.html'
                ],
                countUnit: 'tài liệu'
            }
        ];

        const container = document.getElementById('card-container');
        if (container) {
            // Initialize all cards based on the configuration array
            cardConfigurations.forEach(config => {
                const cardElement = createCardElement(config);
                container.appendChild(cardElement);
                setupCardPaginator(cardElement, config);
            });
        }
        const iframe = document.getElementById("driveFrame");
        if (iframe) {
            const originalSrc = iframe.getAttribute("src");
            const match = originalSrc.match(/\/file\/d\/([^/]+)\/view/);
            if (match && match[1]) {
                const fileId = match[1];
                const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
                iframe.src = previewUrl;
            }
        }
    });