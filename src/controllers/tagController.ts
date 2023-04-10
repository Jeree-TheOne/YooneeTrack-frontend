import axios from "axios"

export default class TagController {
  static async add(name: string, background: string, color: string) {
    return axios.post('/tag/add', { name, background, color })
  }

  static async update(id: string, name: string, background: string, color: string) {
    return axios.put('/tag/update/' + id, { name, background, color })
  }

  static async delete(id: string): Promise<void> {
    return axios.delete('/tag/delete/' + id)
  }
}