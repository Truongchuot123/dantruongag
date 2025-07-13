    document.addEventListener('DOMContentLoaded', () => {
        
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzmrAr3kY3fK2465RjQr7_j-2-Ly-85qxrisQxVvlN2frWx4uJbBsueMHK_F9EP9hExUw/exec';
        const lessonTitleElement = document.getElementById('lesson-title');

        function createVocabularySection() {
            const mainContent = document.getElementById('main-content');
            const grammarSection = document.getElementById('grammar-section');
            if (!mainContent || !grammarSection) return;

            const section = document.createElement('section');
            section.id = 'vocabulary-section';
            section.className = 'lesson-section p-4 sm:p-6 lg:p-8';

            const h2 = document.createElement('h2');
            h2.className = 'section-title text-2xl md:text-3xl';
            h2.append('Vocabulary');

            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'ml-auto';
            
            const buttonLink = document.createElement('a');
            buttonLink.href = 'hoc-tu-vung.html';
            buttonLink.target = '_blank';
            buttonLink.className = 'text-sm font-semibold bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-2 px-4 sm:px-5 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center';

            const icon = document.createElement('i');
            icon.className = 'fas fa-rocket mr-2';

            buttonLink.appendChild(icon);
            buttonLink.append('Học Từ Vựng');
            buttonContainer.appendChild(buttonLink);
            h2.appendChild(buttonContainer);
            section.appendChild(h2);

            const tableContainer = document.createElement('div');
            tableContainer.className = 'hidden md:block overflow-x-auto rounded-lg';

            const table = document.createElement('table');
            table.className = 'min-w-full bg-white border border-gray-200 table-auto';

            const thead = document.createElement('thead');
            thead.className = 'bg-blue-600 text-white';
            const headerRow = document.createElement('tr');
            
            const headers = [
                { text: 'STT',       widthClass: 'w-12' },
                { text: 'English',   widthClass: 'w-1/5' },
                { text: 'Loại từ',   widthClass: 'w-20' },
                { text: 'Tiếng Việt',widthClass: 'w-1/5' },
                { text: 'Ví dụ',     widthClass: 'w-2/5' }
            ];
            
            headers.forEach((header, index) => {
                const th = document.createElement('th');
                const borderClass = index < headers.length - 1 ? 'border-r border-blue-500' : '';
                th.className = `text-center py-3 px-4 font-semibold text-sm ${header.widthClass} ${borderClass}`;
                th.textContent = header.text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            const tbody = document.createElement('tbody');
            tbody.id = 'vocab-table-body';
            tbody.className = 'text-gray-700';
            tbody.innerHTML = `<tr><td colspan="5" class="text-center p-8 text-gray-500">Đang tải...</td></tr>`;

            table.appendChild(thead);
            table.appendChild(tbody);
            tableContainer.appendChild(table);
            section.appendChild(tableContainer);

            const cardContainer = document.createElement('div');
            cardContainer.id = 'vocab-card-container';
            cardContainer.className = 'block md:hidden space-y-4';
            cardContainer.innerHTML = `<div class="text-center p-8 text-gray-500">Đang tải...</div>`;
            section.appendChild(cardContainer);

            mainContent.insertBefore(section, grammarSection);
        }

        function autoNumberHeadings() {
            const titles = document.querySelectorAll('#main-content > .lesson-section > .section-title');
            const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
            
            titles.forEach((title, index) => {
                if (index < romanNumerals.length && !title.querySelector('.roman-numeral')) {
                    const numberEl = document.createElement('div');
                    numberEl.textContent = romanNumerals[index];
                    numberEl.className = 'roman-numeral flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-lg sm:text-xl mr-3 sm:mr-5 shadow-lg';
                    title.insertBefore(numberEl, title.firstChild);
                }
            });
        }
        
        function formatAndRenderExamples(exampleText) {
            if (!exampleText || exampleText.trim() === '') return '';

            const lines = exampleText.split('\n').filter(line => line.trim() !== '');
            const html = lines.map(line => {
                const match = line.match(/(.*?)\s*\((.*?)\)/);
                if (match && match[1] && match[2]) {
                    const english = match[1].trim();
                    const vietnamese = match[2].trim();
                    return `<div class="example-pair">
                                <span class="english-example">${english}</span>
                                <span class="vietnamese-example">(${vietnamese})</span>
                            </div>`;
                }
                return `<div class="example-pair">${line}</div>`;
            }).join('');
            return `<div class="example-container">${html}</div>`;
        }

        async function fetchAndDisplayVocab() {
            const vocabTableBody = document.getElementById('vocab-table-body');
            const vocabCardContainer = document.getElementById('vocab-card-container');
            
            if (!vocabTableBody || !vocabCardContainer || !lessonTitleElement) {
                console.error("Không tìm thấy các thành phần cần thiết.");
                return;
            }

            const currentLessonTitle = lessonTitleElement.textContent.trim();
            const loadingHTML = `<div class="flex justify-center items-center space-x-2 p-8 text-gray-500"><svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Hệ thống đang lấy dữ liệu</span></div>`;
            
            vocabTableBody.innerHTML = `<tr><td colspan="5">${loadingHTML}</td></tr>`;
            vocabCardContainer.innerHTML = loadingHTML;

            try {
                const response = await fetch(SCRIPT_URL);
                if (!response.ok) throw new Error(`Lỗi mạng: ${response.statusText}`);
                
                const allData = await response.json();
                if (allData.status === 'error') throw new Error(allData.message);

                const filteredData = allData.filter(row => row.lesson && row.lesson.trim().toLowerCase() === currentLessonTitle.toLowerCase());

                if (filteredData.length === 0) {
                    const notFoundHTML = `<div class="text-center p-8 text-gray-500">Không tìm thấy từ vựng cho bài học "${currentLessonTitle}".</div>`;
                    vocabTableBody.innerHTML = `<tr><td colspan="5">${notFoundHTML}</td></tr>`;
                    vocabCardContainer.innerHTML = notFoundHTML;
                    return;
                }

                const tableRowsHTML = filteredData.map((row, index) => `
                    <tr class="hover:bg-blue-50 border-b border-gray-200 transition-colors duration-200 align-top">
                        <td class="text-center py-3 px-4 font-medium border-r border-gray-200">${index + 1}</td>
                        <td class="py-3 px-4 border-r border-gray-200">
                            <span class="font-semibold text-blue-700">${row.english || ''}</span>
                            ${row.ipa ? `<span class="block text-sm font-normal text-gray-500">/${row.ipa}/</span>` : ''}
                        </td>
                        <td class="py-3 px-4 text-gray-600 italic border-r border-gray-200">${row.type || ''}</td>
                        <td class="py-3 px-4 border-r border-gray-200">${row.vietnamese || ''}</td>
                        <td class="py-3 px-4 text-sm">${formatAndRenderExamples(row.example || '')}</td>
                    </tr>
                `).join('');

                const cardsHTML = filteredData.map(row => `
                    <div class="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500 space-y-1">
                        <div class="flex items-baseline">
                            <span class="font-bold text-lg text-blue-700">${row.english || ''}</span>
                            <span class="text-sm font-mono text-gray-500 ml-2">${row.ipa ? `/${row.ipa}/` : ''}</span>
                        </div>
                        <div class="text-sm text-gray-500 italic">
                            ${row.type ? `(${row.type})` : ''}
                        </div>
                        <div class="text-gray-800 font-medium">
                            ${row.vietnamese || ''}
                        </div>
                        ${row.example ? `
                        <div class="pt-2 mt-2 border-t border-gray-100 text-sm">
                            ${formatAndRenderExamples(row.example)}
                        </div>
                        ` : ''}
                    </div>
                `).join('');

                vocabTableBody.innerHTML = tableRowsHTML;
                vocabCardContainer.innerHTML = cardsHTML;

            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
                const errorHTML = `<div class="text-center p-8 text-red-600 font-semibold">Đã xảy ra lỗi khi tải dữ liệu.<br><small class="font-normal">${error.message}</small></div>`;
                vocabTableBody.innerHTML = `<tr><td colspan="5">${errorHTML}</td></tr>`;
                vocabCardContainer.innerHTML = errorHTML;
            }
        }
        
        /**
         * === HÀM MỚI: KHỞI TẠO HIỆU ỨNG KHI CUỘN CHUỘT ===
         * Sử dụng Intersection Observer để thêm lớp 'is-visible' cho các mục
         * khi chúng xuất hiện trên màn hình.
         */
        function initializeScrollAnimations() {
            const sections = document.querySelectorAll('.lesson-section');

            if (!sections.length) return;

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // Nếu phần tử đang hiển thị trên màn hình
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Dừng theo dõi sau khi đã hiển thị để tiết kiệm tài nguyên
                        observer.unobserve(entry.target); 
                    }
                });
            }, {
                root: null, // Quan sát so với viewport
                rootMargin: '0px',
                threshold: 0.1 // Kích hoạt khi 10% phần tử được nhìn thấy
            });

            // Bắt đầu theo dõi từng section
            sections.forEach(section => {
                observer.observe(section);
            });
        }

        // --- INITIALIZATION ---
        createVocabularySection();
        autoNumberHeadings();
        fetchAndDisplayVocab();
        initializeScrollAnimations(); // <-- Gọi hàm mới ở đây
    });