// Chuyển đổi Menu
document.getElementById("menu-bar").addEventListener("click", function () {
    this.classList.toggle("active");
    document.getElementById("side-nav").classList.toggle("active");
});

// Thay đổi màu nền khi cuộn
const toP = document.querySelector(".top");
window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
        toP.classList.add("active"); // Thêm màu nền
    } else {
        toP.classList.remove("active");
    }
});
// Tự động đóng menu trên thiết bị di động
document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.getElementById("menu-bar").classList.remove("active");
            document.getElementById("side-nav").classList.remove("active");
        }
    });
});

function showContact() {
    Swal.fire({
        title: 'LIÊN HỆ',
        html: `
            <style>
                .social-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    text-align: center;
                    font-family: Arial, sans-serif;
                }
                .social-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .social-item i {
                    font-size: clamp(30px, 8vw, 50px);
                    margin-bottom: 10px;
                    color: #555;
                }
                .social-item p {
                    font-size: clamp(14px, 4vw, 18px);
                    font-weight: bold;
                    color: #333;
                }
            </style>
            <div class="social-container">
                <a href="https://www.facebook.com/dantruong187/" target="_blank" class="social-item">
                    <i class="fab fa-facebook"></i>
                    <p>Facebook</p>
                </a>
                <a href="https://www.instagram.com/dantruong_2004?igsh=OGZqcjIzbmVnM2lm&utm_source=qr" target="_blank" class="social-item">
                    <i class="fab fa-instagram"></i>
                    <p>Instagram</p>
                </a>
                <a href="https://www.tiktok.com/@dantruong187?_t=ZS-8tuHECUeE78&_r=1" target="_blank" class="social-item">
                    <i class="fab fa-tiktok"></i>
                    <p>TikTok</p>
                </a>
                <a href="javascript:void(0);" class="social-item" onclick="copyEmail()">
                    <i class="fas fa-envelope"></i>
                    <p>Gmail</p>
                </a>
            </div>
        `,
        showCloseButton: true,
    });
}

function copyEmail() {
    var email = "dantruong6904@gmail.com";
    var tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = email;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Show notification
    alert("Đã sao chép địa chỉ email");
}
