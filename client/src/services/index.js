import api from './api.js';

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  sendOtp: (data) => api.post('/auth/send-otp', data),
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  logout: () => api.post('/auth/logout'),
  requestPasswordOtp: (data) => api.post('/auth/password/request-otp', data),
  resetPassword: (data) => api.post('/auth/password/reset', data),
  updateAvatar: (formData) => api.put('/auth/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateProfile: (data) => api.put('/auth/update', data),
  deleteAccount: () => api.delete('/auth/me'),
  getActivityHistory: (params) => api.get('/auth/activity', { params }),
  getActivityStats: () => api.get('/auth/activity-stats'),
};

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projectService = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects/create', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// ─── Videos ───────────────────────────────────────────────────────────────────
export const videoService = {
  generate: (data) => api.post('/videos/generate', data),
  upload: (formData) => api.post('/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getById: (id) => api.get(`/videos/${id}`),
  getStatus: (id) => api.get(`/videos/${id}/status`),
  getByProject: (projectId) => api.get(`/videos?projectId=${projectId}`),
};

// ─── Scenes ───────────────────────────────────────────────────────────────────
export const sceneService = {
  getByVideo: (videoId) => api.get(`/scenes?videoId=${videoId}`),
  getByVideoId: (videoId) => api.get(`/scenes/video/${videoId}`),
  getById: (id) => api.get(`/scenes/${id}`),
  update: (id, data) => api.put(`/scenes/${id}`, data),
  regenerate: (id, regenerateType) => api.post(`/scenes/${id}/regenerate`, { regenerateType }),
  factCheck: (id, sourceText) => api.post(`/scenes/${id}/fact-check`, { sourceText }),
};

// ─── Edits ────────────────────────────────────────────────────────────────────
export const editService = {
  create: (data) => api.post('/edits/create', data),
  getByScene: (sceneId) => api.get(`/edits/scene/${sceneId}`),
  getByVideo: (videoId) => api.get(`/edits?videoId=${videoId}`),
  undo: (editId) => api.post(`/edits/undo/${editId}`),
};
