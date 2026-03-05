export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
export const STORAGE_KEYS = { TOKEN: 'cc_token', USER: 'cc_user', THEME: 'cc_theme' };
export const ROUTES = {
  HOME: '/', LOGIN: '/login', REGISTER: '/register',
  DASHBOARD: '/dashboard', PROJECT_CREATE: '/projects/create',
  PROJECT: '/projects/:id', EDITOR: '/editor/:id', PROFILE: '/profile',
};
