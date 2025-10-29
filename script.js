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
