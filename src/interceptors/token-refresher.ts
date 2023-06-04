import LoginData from '@/models/response/LoginData'
import StorageService from '@/services/storageService'
import axios from 'axios'
import API from '@/settings'

let subscribers = [] as Array<any>
let isRefreshing = false

export const refreshToken = () => {
  if (!isRefreshing) {
    isRefreshing = true
    return doRefresh()
  }

  return new Promise(resolve => subscribers.push(resolve))
}

const doRefresh = async () => {
  try {
    const { data } = await axios.post<LoginData>('auth/refresh')
    if (data) isRefreshing = false

    StorageService.setItem('token', data.accessToken)

    subscribers.forEach(resolveSubscription => resolveSubscription(data))

    return data
  } catch {
    removeAuthorization()
  } finally {
    subscribers = []
  }
}

export function removeAuthorization() {
  window.location.replace(import.meta.env.VITE_CLIENT_URL + '/login')

  StorageService.removeItem('token')
}
