// Import axios từ file cấu hình
import axios from '../setup/axios';

// Hàm gọi API để tạo danh sách role
const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles]);
}

// Export để dùng ở nơi khác
export { createRoles };
