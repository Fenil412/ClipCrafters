import api from './api';
export const videoService = {
  generate: (data) => api.post('/videos/generate', data),
  upload: (formData) => api.post('/videos/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getOne: (id) => api.get(`/videos/${id}`),
  getScenes: (videoId) => api.get(`/scenes/video/${videoId}`),
  updateScene: (sceneId, data) => api.put(`/scenes/${sceneId}`, data),
  createEdit: (data) => api.post('/edits/create', data),
  getEdits: (sceneId) => api.get(`/edits/scene/${sceneId}`),
};
