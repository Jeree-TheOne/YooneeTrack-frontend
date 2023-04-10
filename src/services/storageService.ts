import { jsonReviver } from '@/utils/jsonReviver'

export default class StorageService {
  static getStorage(): Storage {
    return localStorage
  }

  static setItem(key: string, value: any) {
    localStorage.setItem(
      key,
      (typeof value === 'object')
        ? JSON.stringify(value)
        : value
    )
  }

  static getItem(key: string): any {
    const item = localStorage.getItem(key)
    if (item === null) return item

    try {
      return JSON.parse(item, jsonReviver)
    } catch {
      return item
    }
  }

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }
}
