import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Products API
export const productsApi = {
  getAll: (featured = false) => 
    api.get(`/products${featured ? '?featured=1' : ''}`),
  getBySlug: (slug) => 
    api.get(`/products/${slug}`),
};

// Orders API
export const ordersApi = {
  create: (orderData) => 
    api.post('/orders', orderData),
  getAll: () => 
    api.get('/admin/orders'),
  updateStatus: (id, status) => 
    api.put(`/admin/orders/${id}/status`, { status }),
};

// Admin API
export const adminApi = {
  login: (credentials) => 
    api.post('/admin/login', credentials),
  logout: () => 
    api.post('/admin/logout'),
  getCurrentUser: () => 
    api.get('/admin/me'),
  getOrders: (status = '') => 
    api.get(`/admin/orders${status ? `?status=${status}` : ''}`),
  getOrderDetails: (id) => 
    api.get(`/admin/orders/${id}`),
  updateOrderStatus: (id, status) => 
    api.put(`/admin/orders/${id}/status`, { status }),
};

export default api;
