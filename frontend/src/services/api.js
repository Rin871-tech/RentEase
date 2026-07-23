import axios from 'axios';

const API_BASE_URL='https://rentease-production-9a13.up.railway.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  // Use admin token for admin routes, otherwise use user token
  if (config.url?.includes('/admin')) {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const adminAuthAPI = {
  login: (data) => api.post('/admin/auth/login', data),
  register: (data) => api.post('/admin/auth/register', data),
  getMe: () => api.get('/admin/auth/me'),
};

export const productsAPI = {
  getAll: (category) => api.get('/products', { params: { category } }),
  getById: (id) => api.get(`/products/${id}`),
};

export const adminProductsAPI = {
  getAll: (params) => api.get('/admin/products', { params }),
  create: (data) => api.post('/admin/products', data),
  update: (id, data) => api.put(`/admin/products/${id}`, data),
  delete: (id) => api.delete(`/admin/products/${id}`),
};

export const adminOrdersAPI = {
  getAll: (params) => api.get('/admin/orders', { params }),
  getById: (id) => api.get(`/admin/orders/${id}`),
  updateStatus: (id, status) => api.put(`/admin/orders/${id}/status`, { status }),
};

export const adminRentalsAPI = {
  getAll: (params) => api.get('/admin/rentals', { params }),
  getById: (id) => api.get(`/admin/rentals/${id}`),
  markReturned: (id, data) => api.put(`/admin/rentals/${id}/return`, data),
  reportDamage: (id, data) => api.post(`/admin/rentals/${id}/damage`, data),
};

export const adminUsersAPI = {
  getAll: (params) => api.get('/admin/users', { params }),
  getById: (id) => api.get(`/admin/users/${id}`),
};

export const adminAnalyticsAPI = {
  getAnalytics: () => api.get('/admin/analytics'),
  getDashboard: () => api.get('/admin/dashboard'),
};

export default api;
