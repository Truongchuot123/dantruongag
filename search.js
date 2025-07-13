// --- SEARCH FUNCTIONALITY ---

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration & State Management ---
    const config = {
        searchContainerId: 'search-container',
        searchFormId: 'search-form',
        searchInputId: 'search-input',
        closeSearchBtnId: 'close-search-btn',
        suggestionsOutputId: 'search-suggestions-output',
        loginPromptHTML: `
            <div class="login-prompt-inline">
                <i class="fas fa-lock text-4xl text-yellow-400 mb-3"></i>
                <h4 class="text-xl font-bold text-white mb-2">Yêu Cầu Đăng Nhập</h4>
                <p class="mb-4">Bạn cần đăng nhập để tìm kiếm và xem kết quả.</p>
                <button onclick="showLoginForm()" class="cta-button">Đăng nhập ngay</button>
            </div>`,
        noResultsHTML: `<p class="p-4 text-center text-gray-400">Không tìm thấy kết quả nào.</p>`
    };

    const state = {
        isLoggedIn: () => !!localStorage.getItem('loggedInUser')
    };

    // --- DOM Element Selection ---
    const searchContainer = document.getElementById(config.searchContainerId);
    const searchForm = document.getElementById(config.searchFormId);
    const searchInput = document.getElementById(config.searchInputId);
    const closeSearchBtn = document.getElementById(config.closeSearchBtnId);
    const suggestionsOutput = document.getElementById(config.suggestionsOutputId);

    // --- Searchable Data ---
    const searchableContent = [
        {
            title: 'Trang Chủ',
            description: 'Quay về trang chủ của website.',
            url: 'index.html',
            icon: 'fa-home'
        },
        {
            title: 'Liên Hệ Với Tôi',
            description: 'Tìm thông tin liên hệ: Facebook, Instagram. Gmail...',
            action: () => showContact(), // Assumes showContact() is a globally available function
            icon: 'fa-phone'
        },
        {
            title: 'Giải Phẫu',
            description: 'Cùng học giải phẫu thôi nào.',
            url: '/giai_phau/trang_chu_giai_phau.html',
            icon: 'fa-dna'
        },
        {
            title: 'Bệnh học',
            description: 'Cùng học bệnh học thôi nào thôi nào.',
            url: '/benhhoc/benhhoc.html',
            icon: 'fa-dna'
        },
        {
            title: 'Tiếng anh',
            description: 'Cùng học tiếng anh thôi nào.',
            url: '/tienganh/tienganh.html',
            icon: 'fa-dna'
        },
        {
            title: 'Học phiên âm quốc tế (IPA)',
            description: 'Học phiên âm IPA qua vidieo cùng người bản xứ .',
            url: '/tienganh/IPA.html',
            icon: 'fa-dna'
        },
        {
            title: 'Học từ vựng',
            description: 'Hệ thống học từ vựng hơn 500+.',
            url: '/tienganh/vocabulary.html',
            icon: 'fa-book'
        },
        {
            title: 'Listenning English',
            description: 'Hệ thống học nghe tiếng anh.',
            url: '/tienganh/listeing/listening.html',
            icon: 'fa-headphones'
        },
        {
            title: 'Tra cứu tài liệu nhanh',
            description: 'Hệ thống tra cứu tài liệu nhanh chóng.',
            url: 'index.html',
            icon: 'fa-search'
        },
        {
            title: 'Tra cứu huyệt',
            description: 'Hệ thống tra cứu huyệt nhanh chóng.',
            url: 'index.html',
            icon: 'fa-search'
        },
        {
            title: 'Góp Ý',
            description: 'Đóng góp ý kiến để tôi cải thiện hơn.',
            url: 'gopy.html',
            icon: 'fa-envelope'
        }
       
    ];

    const openSearch = () => {
        searchContainer.classList.add('active');
        searchInput.focus();
    };

    const closeSearch = () => {
        searchContainer.classList.remove('active');
        searchInput.value = '';
        suggestionsOutput.innerHTML = '';
    };

    /**
     * Performs a search based on the query and updates the suggestions.
     * @param {string} query The search term.
     */
    const performSearch = (query) => {
        if (!query) {
            suggestionsOutput.innerHTML = '';
            return;
        }

        if (!state.isLoggedIn()) {
            suggestionsOutput.innerHTML = config.loginPromptHTML;
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const results = searchableContent.filter(item =>
            item.title.toLowerCase().includes(lowerCaseQuery) ||
            item.description.toLowerCase().includes(lowerCaseQuery)
        );

        renderSuggestions(results);
    };

    /**
     * Renders the search results in the suggestions container.
     * @param {Array} results The array of search result objects.
     */
    const renderSuggestions = (results) => {
        if (results.length === 0) {
            suggestionsOutput.innerHTML = config.noResultsHTML;
            return;
        }

        suggestionsOutput.innerHTML = ''; // Clear previous results
        const fragment = document.createDocumentFragment();

        results.forEach(item => {
            const suggestionEl = document.createElement('div');
            suggestionEl.className = 'suggestion-item_search';
            suggestionEl.innerHTML = `
                <i class="fas ${item.icon} icon"></i>
                <div>
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>`;
            suggestionEl.addEventListener('click', () => handleSuggestionClick(item));
            fragment.appendChild(suggestionEl);
        });

        suggestionsOutput.appendChild(fragment);
    };

    /**
     * Handles the click event on a suggestion item.
     * @param {object} item The clicked search result item.
     */
    const handleSuggestionClick = (item) => {
        if (item.action && typeof item.action === 'function') {
            item.action();
        } else if (item.url) {
            window.location.href = item.url;
        }
        closeSearch();
    };

    // --- Event Listeners ---
    if (searchContainer && searchForm && searchInput && closeSearchBtn && suggestionsOutput) {
        // Make the openSearch function globally accessible for `onclick` attributes
        window.handleSearchClick = openSearch;

        closeSearchBtn.addEventListener('click', closeSearch);
        searchContainer.addEventListener('click', (e) => {
            if (e.target === searchContainer) {
                closeSearch();
            }
        });

        searchForm.addEventListener('submit', (e) => e.preventDefault());

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim();
            performSearch(query);
        });
    } else {
        console.error("Search UI elements not found. Please check your HTML structure and IDs.");
    }
    
    // Assuming loadComponents() is defined elsewhere and handles loading of other parts.
    // loadComponents();
});