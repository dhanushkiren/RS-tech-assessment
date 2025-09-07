import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

export const fetchEmployees = () => api.get('/employees');
export const addEmployee = (employeeData) => api.post('/employees', employeeData,{headers: { 'Content-Type': 'multipart/form-data' }});
export const updateEmployee = (id, formData) => {
  return api.put(`/employees/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
export const getEmployee = (id) => api.get(`/employees/${id}`);