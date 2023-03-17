import axios from 'axios'

axios.interceptors.request.use((config): any => {
  config.baseURL = import.meta.env.VITE_API_URL
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

axios.interceptors.response.use((config): any => {
  return config
},async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken)
      return axios.request(originalRequest)
    } catch {
      window.location.reload()
    }
  }

  throw error
})

