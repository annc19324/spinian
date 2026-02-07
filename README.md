# Spinian 🎡

Spinian là một ứng dụng vòng quay may mắn hiện đại, tương tác và có thể tùy chỉnh, được xây dựng bằng **React** và **Vite**. Cho dù bạn cần chọn một người chiến thắng ngẫu nhiên, phân phát giải thưởng hay chỉ đơn giản là muốn vui vẻ đưa ra quyết định, Spinian cung cấp một trải nghiệm mượt mà và thú vị.

## ✨ Tính Năng

- **Nhiều Chế Độ Chơi**:
  - **Quay Tên**: Hoàn hảo để chọn ngẫu nhiên một người trong nhóm.
  - **Quay Thưởng**: Phân phát phần thưởng hoặc quà tặng.
  - **Quay Lì Xì**: Thêm phần thú vị cho các dịp lễ tết hoặc sự kiện.
- **Tùy Chỉnh Linh Hoạt**:
  - **Chỉnh Sửa Nội Dung**: Dễ dàng thêm, xóa hoặc sửa đổi các mục trên vòng quay.
  - **Chủ Đề Giao Diện**: Chọn từ nhiều chủ đề màu sắc (Tím, Đỏ, Xanh Dương, Xanh Lá, Cam) hoặc sử dụng chế độ "Ngẫu nhiên" năng động.
  - **Cài Đặt Quay**: Điều chỉnh thời gian quay (cố định hoặc ngẫu nhiên) và ẩn/hiện nội dung trong khi quay.
- **Hiệu Ứng Hấp Dẫn**:
  - **Âm Thanh**: Tiếng tích tắc chân thực khi quay và âm thanh chiến thắng khi kết thúc.
  - **Hình Ảnh**: Hoạt ảnh mượt mà và hiệu ứng pháo giấy (confetti) chúc mừng người chiến thắng.
- **Lưu Trữ Dữ Liệu**: Các danh sách tùy chỉnh và cài đặt của bạn được tự động lưu vào trình duyệt.

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: [React 19](https://react.dev/)
- **Công cụ Build**: [Vite](https://vitejs.dev/)
- **Styling**: CSS Modules / Vanilla CSS với Variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hiệu ứng**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

## 🚀 Hướng Dẫn Cài Đặt

### Yêu Cầu

Đảm bảo bạn đã cài đặt [Node.js](https://nodejs.org/) trên máy của mình.

### Cài Đặt

1.  **Clone repository** (nếu có) hoặc tải xuống mã nguồn.
2.  **Cài đặt các gói phụ thuộc**:

    ```bash
    npm install
    ```

### Chạy Local (Môi trường phát triển)

Khởi động server phát triển:

```bash
npm run dev
```

Ứng dụng sẽ chạy tại địa chỉ `http://localhost:5173` (hoặc cổng hiển thị trong terminal của bạn).

### Build cho Production

Để tạo bản build tối ưu cho môi trường production:

```bash
npm run build
```

Để xem trước bản build production:

```bash
npm run preview
```

## 📖 Hướng Dẫn Sử Dụng

1.  **Chọn Chế Độ**: Chọn từ các tab ở trên cùng (Quay Tên, Quay Thưởng, Quay Lì Xì).
2.  **Quay**: Nhấn nút **SPIN** hoặc nhấn vào vòng quay để bắt đầu.
3.  **Tùy Chỉnh**:
    - Nhấn vào **"Chỉnh sửa & Cài đặt"** để mở bảng cấu hình.
    - Điều chỉnh thời gian quay, ẩn kết quả khi quay, hoặc thay đổi chủ đề màu sắc.
    - Chỉnh sửa khung văn bản để cập nhật các mục trên vòng quay (mỗi mục một dòng).
4.  **Đặt Lại**: Sử dụng nút đặt lại để khôi phục danh sách mặc định nếu cần.

## 🤝 Đóng Góp

Mọi đóng góp đều được hoan nghênh! Hãy thoải mái mở issue hoặc gửi pull request để cải thiện ứng dụng.

## 📄 Giấy Phép

Dự án này là mã nguồn mở và có thể sử dụng cho mục đích cá nhân và giáo dục.
