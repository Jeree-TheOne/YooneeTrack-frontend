import axios from "axios"

export default class ColumnController {
  static async create(name: string) {
    return await axios.post('/column', { name })
  }

  static async update(id: string, name: string) {
    return await axios.put('/column' + id, { name })
  }

  static async delete(id: string): Promise<void> {
    return await axios.delete('/column' + id)
  }
}