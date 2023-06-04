import axios from "axios"

export default class DeskController {
  static async select(id: string) {
    return await axios.get('/desk/' + id)
  }

  static async create(name: string, isCurrent: boolean) {
    return await axios.post('/desk', { name, isCurrent })
  }

  static async update(id: string, name: string) {
    return await axios.put('/desk/' + id, { name })
  }

  static async setCurrent(id: string) {
    return await axios.patch('/desk/' + id)
  }

  static async delete(id: string): Promise<void> {
    return await axios.delete('/desk/' + id)
  }
}