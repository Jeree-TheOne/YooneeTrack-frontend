import axios from "axios"

export default class TagController {
  static async create(name: string, background: string, color: string) {
    return await axios.post('/tag', { name, background, color })
  }

  static async update(id: string, name: string, background: string, color: string) {
    return await axios.put('/tag/' + id, { name, background, color })
  }

  static async delete(id: string): Promise<void> {
    return await axios.delete('/tag/' + id)
  }
}