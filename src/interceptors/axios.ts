import axios from 'axios'
import API from '@/settings'
import { refreshToken, removeAuthorization } from './token-refresher'
import StorageService from '@/services/storageService'

// export const setHeader = (header: string, value: any) => {
//   axios.defaults.headers.common[header] = value
// }

axios.interceptors.request.use((config): any => {
  config.baseURL = API.DOMAIN
  config.headers.workspace = localStorage.getItem('workspace')
  config.withCredentials = true

  const token = StorageService.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use((config): any => {
  return config
},async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401 && error.config && error.response.data.message !== "EXPIRED_TOKEN") {
    return refreshToken().then(() => axios(originalRequest))
  }
  if (error.response.status === 401 && error.response.data.message === "EXPIRED_TOKEN") {
    removeAuthorization()
  }

  if (error.response.data.message === "UNAVAILABLE_WORKSPACE") {
    window.location.replace(import.meta.env.VITE_CLIENT_URL + '/workspaces')
  }
  throw error
})

