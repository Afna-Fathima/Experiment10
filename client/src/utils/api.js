import axios from 'axios'

// Get API URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_URL = `${API_BASE_URL}/api`

const api = axios.create({
  baseURL: API_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
