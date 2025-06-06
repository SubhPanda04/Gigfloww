import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Add a function to set the default header
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
  }
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.reject('No token found');
  }
  setAuthToken(token);
  const user = await getCurrentUser();
  return { user, token };
};

const initializeAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
};

initializeAuth();

export const logout = () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};