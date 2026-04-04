import axios from 'axios';

// البورت اللي شغال عليه الباك-أند حالياً (5147)
const API_BASE_URL = 'http://localhost:5147/api/Auth'; 

// إنشاء نسخة من axios بإعدادات افتراضية
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة Interceptor لإرسال الـ Token تلقائياً في كل طلب (مهم للـ JWT)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 1. دالة تسجيل مستخدم جديد
export const signUpUser = async (userData: any) => {
  try {
    const response = await apiClient.post('/signup', userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

// 2. دالة تسجيل الدخول
export const loginUser = async (credentials: any) => {
  try {
    const response = await apiClient.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('fullName', response.data.fullName);
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Login failed';
  }
};