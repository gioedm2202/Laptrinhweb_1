/* --- Đây là phần JavaScript --- */
        
document.addEventListener('DOMContentLoaded', () => {
    
    // Xử lý việc gửi form
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn form gửi đi theo cách truyền thống
        
        // Lấy giá trị từ form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Hiển thị thông báo thành công
            showCustomMessage('Cảm ơn! Lời nhắn của bạn đã được gửi.', 'success');
            
            // Xóa nội dung form
            form.reset();
            
            // (Trong một ứng dụng thực tế, bạn sẽ gửi dữ liệu này đến máy chủ)
            console.log('Form submitted:', { name, email, message });
        } else {
            // Hiển thị thông báo lỗi
            showCustomMessage('Vui lòng điền đầy đủ thông tin.', 'error');
        }
    });

    // Xử lý cuộn mượt khi nhấp vào link nav
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Ngăn hành vi mặc định
            const targetId = link.getAttribute('href'); // Lấy id (vd: #about)
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    const fetchBtn = document.getElementById('fetch-pokemon-btn');
    const displayContainer = document.getElementById('pokemon-display-container');

    if (fetchBtn) { // Kiểm tra nút có tồn tại không
        fetchBtn.addEventListener('click', () => {
            // Hiển thị trạng thái đang tải
            displayContainer.classList.add('visible'); // Hiển thị khung
            displayContainer.classList.add('loading'); // Thêm class loading
            displayContainer.innerHTML = '<h4 class="loading-text">Đang tải Pokémon...</h4>'; // Đổi h3 thành h4

            const randomId = Math.floor(Math.random() * 898) + 1;
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Không thể tải dữ liệu Pokémon');
                    }
                    return response.json();
                })
                .then(data => {
                    const name = data.name;
                    const imageUrl = data.sprites.other['official-artwork'].front_default;

                    displayContainer.classList.remove('loading');
                    
                    displayContainer.innerHTML = `
                        <img src="${imageUrl}" alt="Ảnh của ${name}">
                        <h4>${name}</h4> `;
                })
                .catch(error => {
                    console.error('Lỗi API Pokémon:', error);
                    displayContainer.classList.remove('loading');
                    displayContainer.innerHTML = '<h4>Oops! Đã có lỗi xảy ra.</h4>'; // Đổi h3 thành h4
                    showCustomMessage('Không thể lấy dữ liệu Pokémon. Vui lòng thử lại.', 'error');
                });
        });
    }
    // ==== KẾT THÚC TÍNH NĂNG POKÉMON ====

    // ==== BẮT ĐẦU TÍNH NĂNG TỶ GIÁ ====
    // ==== BẮT ĐẦU TÍNH NĂNG TỶ GIÁ ====
const fetchRateBtn = document.getElementById('fetch-rate-btn');
const rateDisplayContainer = document.getElementById('rate-display-container');

// 1. Thay đổi API URL
const rateApiUrl = 'https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=VND';
// 2. Thêm API key của bạn
const myApiKey = 'o49R15U5JWegz1UrNNGHzyD5N2RsHltg';

// Hàm để gọi API tỷ giá và cập nhật UI
function fetchExchangeRate() {
    // Hiển thị trạng thái đang tải
    rateDisplayContainer.classList.add('visible');
    rateDisplayContainer.classList.add('loading');
    rateDisplayContainer.innerHTML = '<h4 class="loading-text">Đang cập nhật tỷ giá...</h4>';

    // 3. Cập nhật fetch để gửi 'headers'
    fetch(rateApiUrl, {
        method: 'GET',
        headers: {
            'apikey': myApiKey // Gửi key trong header
        }
    })
    .then(response => {
        if (!response.ok) {
            // Nếu lỗi 4xx, 5xx, ném ra lỗi
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Cấu trúc data của APILayer tương tự exchangerate.host
        if (data.success && data.rates.VND) {
            const rate = data.rates.VND;
            const date = new Date(data.date); // Dùng data.date cho dễ
            const formattedDate = date.toLocaleDateString('vi-VN', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });

            // Định dạng số VND (làm tròn)
            const formattedRate = rate.toLocaleString('vi-VN', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            });

            rateDisplayContainer.classList.remove('loading');

            // Hiển thị kết quả
            rateDisplayContainer.innerHTML = `
                <p class="rate-base">1 USD bằng</p>
                <h4 class="rate-text">${formattedRate} VND</h4>
                <p class="rate-time">Cập nhật: ${formattedDate}</p>
            `;
        } else {
            // Xử lý lỗi trả về từ APILayer (ví dụ: hết hạn key, sai key)
            let errorMessage = (data.error && data.error.info) ? data.error.info : 'Dữ liệu tỷ giá không hợp lệ.';
            console.error("Lỗi từ APILayer:", data);
            throw new Error(errorMessage);
        }
    })
    .catch(error => {
        // Bắt lỗi chung (lỗi mạng, lỗi ném ra ở trên)
        console.error('Lỗi API Tỷ giá:', error);
        rateDisplayContainer.classList.remove('loading');
        // Hiển thị lỗi rõ ràng cho người dùng
        rateDisplayContainer.innerHTML = `<h4 style="color: #e63946;">Lỗi: ${error.message}</h4>`;
        showCustomMessage('Không thể lấy dữ liệu tỷ giá.', 'error');
    });
}

// (Phần code bên dưới không đổi)
// Thêm sự kiện click cho nút "Làm Mới"
if (fetchRateBtn) {
    fetchRateBtn.addEventListener('click', fetchExchangeRate);
}

// Tự động gọi API tỷ giá khi tải trang lần đầu
if (rateDisplayContainer) {
    fetchExchangeRate();
}
// ==== KẾT THÚC TÍNH NĂNG TỶ GIÁ ====
});

// Hàm hiển thị thông báo tùy chỉnh
function showCustomMessage(message, type = 'success') {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    
    // Đặt màu dựa trên loại thông báo
    messageBox.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    
    // Hiển thị thông báo
    messageBox.classList.add('show');
    
    // Tự động ẩn sau 3 giây
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000);
}
