import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with timeout
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('🔴 API Error Details:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
      config: error.config?.url
    });
    return Promise.reject(error);
  }
);

const apiService = {
  // Register for marathon
  registerMarathon: async (data) => {
    try {
      console.log('📡 Sending to:', `${API_BASE_URL}/registration/create`);
      const response = await axiosInstance.post('/registration/create', data);
      return response.data;
    } catch (error) {
      console.error('❌ Registration API Error:', error);
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('❌ Request timeout - Backend server not responding');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('❌ Connection refused - Backend server is not running on port 5000');
      } else if (!error.response) {
        throw new Error('❌ Network Error - Cannot connect to backend. Make sure backend is running: npm start');
      }
      
      const errorData = error.response?.data || { message: error.message };
      throw new Error(errorData.message || 'Registration failed');
    }
  },

  // Get registration by ID
  getRegistration: async (id) => {
    try {
      const response = await axiosInstance.get(`/registration/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('❌ Network Error - Cannot connect to backend');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch registration');
    }
  },

  // Get user registrations
  getUserRegistrations: async (userId) => {
    try {
      const response = await axiosInstance.get(`/registration/user/${userId}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('❌ Network Error - Cannot connect to backend');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch user registrations');
    }
  },
};

export default apiService;
