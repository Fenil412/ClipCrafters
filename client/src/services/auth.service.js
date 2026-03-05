import api from './api';
export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getCurrentUser: () => api.get('/auth/me'),
  sendOtp: (method, contact) => api.post('/auth/send-otp', { method, ...contact }),
  verifyOtp: (otp, method) => api.post('/auth/verify-otp', { otp, method }),
};
