const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken')
}

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken()
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

// Weather API
export const weatherAPI = {
  get: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString()
    return apiRequest(`/weather?${queryParams}`)
  },
}

// Posts API
export const postsAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString()
    return apiRequest(`/posts?${queryParams}`)
  },
  create: async (postData) => {
    return apiRequest('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    })
  },
  like: async (postId) => {
    return apiRequest(`/posts/${postId}/like`, {
      method: 'POST',
    })
  },
}

// Alerts API
export const alertsAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString()
    return apiRequest(`/alerts?${queryParams}`)
  },
  getById: async (id) => {
    return apiRequest(`/alerts/${id}`)
  },
  create: async (alertData) => {
    return apiRequest('/alerts', {
      method: 'POST',
      body: JSON.stringify(alertData),
    })
  },
}

// Locations API
export const locationsAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString()
    return apiRequest(`/locations?${queryParams}`)
  },
}
