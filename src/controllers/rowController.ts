import axios from "axios"

export default class RowController {
  static async create(name: string) {
    return await axios.post('/row', { name })
  }

  static async update(id: string, name: string) {
    return await axios.put('/row/' + id, { name })
  }

  static async delete(id: string): Promise<void> {
    return await axios.delete('/row/' + id)
  }
}