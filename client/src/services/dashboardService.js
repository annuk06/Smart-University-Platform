import api from './api';

export const getStudentDashboardData = async () => {
  const response = await api.get('/students/dashboard');
  return response.data;
};

export const getFacultyDashboardData = async () => {
  const response = await api.get('/faculty/dashboard');
  return response.data;
};

export const getAdminDashboardData = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const getAnnouncements = async (audience = '') => {
  const query = audience ? `?targetAudience=${audience}` : '';
  const response = await api.get(`/announcements${query}`);
  return response.data;
};

export const getCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};
