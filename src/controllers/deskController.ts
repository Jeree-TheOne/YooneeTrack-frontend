import axios from "axios"

export default class DeskController {
  static async add(name: string) {
    return axios.post('/desk/add', { name })
  }

  static async update(id: string, name: string) {
    return axios.put('/desk/update/' + id, { name })
  }

  static async setCurrent(id: string) {
    return axios.put('/desk/set-current/' + id)
  }

  static async delete(id: string): Promise<void> {
    return axios.delete('/desk/delete/' + id)
  }
}