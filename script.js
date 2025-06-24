document.addEventListener("DOMContentLoaded", function () {
    // Chuyển đổi Menu
    const menuBar = document.getElementById("menu-bar");
    const sideNav = document.getElementById("side-nav");

    if (menuBar && sideNav) {
        menuBar.addEventListener("click", function () {
            this.classList.toggle("active");
            sideNav.classList.toggle("active");
        });
    }

    // Thay đổi màu nền khi cuộn
    const toP = document.querySelector(".top");
    if (toP) {
        window.addEventListener("scroll", function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            toP.classList.toggle("active", scrollTop > 300);
        });
    }
});

// Hiệu ứng pháo hoa
function launchConfettiInSection() {
    const section = document.querySelector(".banner_giai_phong_mien_nam_30-4");
    if (!section) return;

    setInterval(() => {
        const rect = section.getBoundingClientRect();
        const x = (rect.left + rect.right) / 2 / window.innerWidth;
        const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

        confetti({
            particleCount: 7,
            spread: 180,
            startVelocity: 30,
            origin: { x, y },
            colors: ['#ffcc00', '#ff0000', '#00ff00', '#ff6600', '#00ccff'],
            gravity: 0.8,
            scalar: 1.2
        });
    }, 600);
}

// Kích hoạt pháo hoa khi trang tải xong
window.addEventListener("load", launchConfettiInSection);
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
                <a href="https://www.instagram.com/dantruong_ag/" target="_blank" class="social-item">
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

// Sweet2 fllow loket
// Kiểm tra nếu trang hiện tại là index.html
if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
  // Hiển thị popup Locket sau 5 giây
  setTimeout(() => {
    Swal.fire({
      html: `
        <div style="display: flex; align-items: center; gap: 20px;">
          <div class="phone">
            <div class="screen"></div>
          </div>
          <div>
            <h2 class="swal2-title" style="margin-bottom: 12px;">Mình vừa tham gia Locket. Kết bạn với mình nhé!</h2>
            <a href="https://locket.camera/links/rRNxm56LDxb9BAjJ9" class="custom-button" target="_blank" rel="noopener noreferrer">Thêm ngay</a>
          </div>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      padding: '20px',
      customClass: {
        popup: 'custom-popup',
        closeButton: 'custom-close-button'
      },
      background: 'linear-gradient(#fcf5f5, rgba(253, 251, 251, 0.1)), url("../hinhanh/phongne%20sweet2.jpg") center/cover no-repeat',
      showClass: {
        popup: 'swal2-animate-popup'
      }
    });
  }, 5000);
}



// JS cho form đăng nhập
const style = document.createElement('style');
style.innerHTML = `
    .swal2-popup .login-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .swal2-popup .login-form input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .swal2-popup .login-form button {
        background: #007bff;
        color: #fff;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .swal2-popup .login-form button:hover {
        background: #0056b3;
    }
    .swal2-popup .login-form .exit-btn {
        background: #ff4d4d;
        color: #fff;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .swal2-popup .login-form .exit-btn:hover {
        background: #cc0000;
    }
`;
document.head.appendChild(style);

// JS CHO THÔNG BÁO ĐĂNG NHẬP MỚI TÌM KIẾM
function handleSearchClick() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href = "/timkiem.html";
    } else {
        Swal.fire({
            title: 'Bạn vui lòng đăng nhập để sử dụng chức năng tìm kiếm.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đăng nhập',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                showLoginForm(); // Gọi form đăng nhập dạng popup/modal
            }
        });
    }
}


// Kiểm tra trạng thái đăng nhập khi tải trang
window.onload = function() {
    const savedName = localStorage.getItem('loggedInUser');
    if (savedName) {
        updateLoginButton(savedName);
        showContent();
    } else {
        hideContent();
    }
}

function updateLoginButton(name) {
    const loginBtn = document.getElementById('login-btn');
    loginBtn.innerHTML = `
        <div class="user-info">
            <div class="user-details">
                <i class="fas fa-user-circle"></i>
                <span class="username">${name}</span>
            </div>
            <a class="logout-btn" onclick="logout()">Đăng xuất</a>
        </div>
    `;
}

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('loggedInUser');
    Swal.fire('Đã đăng xuất!', '', 'success').then(() => {
        const loginBtn = document.getElementById('login-btn');
        loginBtn.innerHTML = `
            <div>
                <li id="login-btn">
                    <a href="javascript:void(0);" onclick="showLoginForm()" class="login-button">
                        <i class="fas fa-user-circle"></i> ĐĂNG NHẬP
                    </a>
                </li>
            </div>
        `;
        hideContent();
    });
}

// Hiển thị nội dung khi đã đăng nhập
function showContent() {
    const protectedContent = document.getElementById('protected-content');
    protectedContent.style.display = 'block';
}

// Ẩn nội dung khi chưa đăng nhập
function hideContent() {
    const protectedContent = document.getElementById('protected-content');
    protectedContent.style.display = 'none';
}

// Hiển thị form đăng nhập
function showLoginForm() {
    Swal.fire({
        title: 'Đăng nhập',
        html: `
            <form id="loginForm" class="login-form">
                <input type="text" id="username" placeholder="Tên đăng nhập" required>
                <div style="position: relative; display: flex; align-items: center;">
                    <input type="password" id="password" placeholder="Mật khẩu" required style="width: 100%;">
                    <i id="togglePassword" class="fas fa-eye" style="position: absolute; right: 10px; cursor: pointer;"></i>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                    <button type="button" class="exit-btn" onclick="Swal.close()" style="width: 48%;">Thoát</button>
                    <button type="submit" style="width: 48%;">Đăng nhập</button>
                </div>
                <p style="margin-top: 10px; font-size: 1em; color: red; text-align: left;">
                    *Nếu bạn quên mật khẩu hoặc chưa có tài khoản, vui lòng 
                    <span style="color: blue; cursor: pointer; text-decoration: underline;" onclick="showContact()">liên hệ</span> để cấp lại mật khẩu hoặc cấp tài khoản.
                </p>
            </form>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        didRender: () => {
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('togglePassword');

            togglePassword.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    togglePassword.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    togglePassword.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });

            document.getElementById('loginForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                fetch(`https://script.google.com/macros/s/AKfycbxPan-KQDfgVodlpBL06ZjkSrIKUTgS3syVxJCZ67JhJaMktXfjz_99c6WptPuzjzLN_g/exec?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            const displayName = data.name || username;
                            localStorage.setItem('loggedInUser', displayName);
                            Swal.fire('Thành công!', 'Đăng nhập thành công!', 'success').then(() => {
                                updateLoginButton(displayName);
                                showContent();
                            });
                        } else {
                            Swal.fire('Thất bại!', 'Tên đăng nhập hoặc mật khẩu không đúng.', 'error');
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi:', error);
                        Swal.fire('Lỗi!', 'Không thể kết nối đến máy chủ.', 'error');
                    });
            });
        }
    });
}


// JS CHO BANNER MẠNG XÃ HỘI 
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000, // Chuyển slide sau 5 giây
        disableOnInteraction: false,
    },
    speed: 800, // Tăng tốc độ chuyển slide
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar', // Hiển thị thanh trượt ngang
    },
});

// File: js/analytics.js

// --- CẤU HÌNH ---
const GA_MEASUREMENT_ID = "G-GZYHW8CJY9"; // <<== THAY MÃ CỦA BẠN VÀO ĐÂY
// ----------------

// Tạo thẻ script đầu tiên
const script1 = document.createElement('script');
script1.async = true;
script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

// Tạo thẻ script thứ hai
const script2 = document.createElement('script');
script2.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
`;

// Chèn hai thẻ script này vào cuối của thẻ <head>
document.head.appendChild(script1);
document.head.appendChild(script2);

console.log("Google Analytics tracking code injected."); // Dòng này để bạn kiểm tra trên trình duyệt