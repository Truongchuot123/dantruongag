const items = document.querySelectorAll('.noidung-noibat-iten');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const sliderContainer = document.querySelector('.noidung-noibat-row');

let currentIndex = 0;
const visibleItems = window.innerWidth < 768 ? 1 : (window.innerWidth < 992 ? 2 : 3); // Xác định số mục hiển thị theo màn hình
let interval;

// Cập nhật slider với hiệu ứng chuyển động mượt mà
function updateSlider() {
    sliderContainer.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;
}

// Tạo hiệu ứng trượt mượt mà
sliderContainer.style.display = 'flex';
sliderContainer.style.transition = 'transform 0.5s ease-in-out';

// Cập nhật số lượng hiển thị khi resize
window.addEventListener('resize', () => {
    currentIndex = 0; // Reset vị trí khi thay đổi kích thước
    updateSlider();
});

// Nút next
nextBtn.addEventListener('click', () => {
    if (currentIndex + visibleItems < items.length) {
        currentIndex++;
    } else {
        currentIndex = 0; // Quay lại ảnh đầu tiên nếu đến cuối
    }
    updateSlider();
    resetAutoSlide();
});

// Nút prev
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = items.length - visibleItems; // Quay lại ảnh cuối nếu đang ở đầu
    }
    updateSlider();
    resetAutoSlide();
});

// Tự động chuyển nội dung sau 10 giây
function autoSlide() {
    interval = setInterval(() => {
        nextBtn.click();
    }, 10000);
}

function resetAutoSlide() {
    clearInterval(interval);
    autoSlide();
}

autoSlide();
updateSlider();
