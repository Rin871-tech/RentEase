import api from './api';

const adminApi = {
  // Auth
  login: (email, password) => 
    api.post('/admin/auth/login', { email, password }),
  
  getMe: (token) => 
    api.get('/admin/me', { 
      headers: { Authorization: `Bearer ${token}` } 
    }),

  // Analytics
  getDashboard: (token) =>
    api.get('/admin/analytics/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Products
  getProducts: (token) =>
    api.get('/admin/products', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  getProduct: (id, token) =>
    api.get(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  createProduct: (productData, token) =>
    api.post('/admin/products', productData, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateProduct: (id, productData, token) =>
    api.put(`/admin/products/${id}`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  deleteProduct: (id, token) =>
    api.delete(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Orders
  getOrders: (token) =>
    api.get('/admin/orders', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateOrderStatus: (id, status, token) =>
    api.put(`/admin/orders/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Users
  getUsers: (token) =>
    api.get('/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  getUser: (id, token) =>
    api.get(`/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
};

export default adminApi;