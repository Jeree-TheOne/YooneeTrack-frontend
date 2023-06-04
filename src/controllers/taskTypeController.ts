import axios from "axios"

export default class TaskTypeController {
  static async create(name: string) {
    return await axios.post('/task-type', { name })
  }

  static async update(id: string, name: string) {
    return await axios.put('/task-type/' + id, { name })
  }

  static async delete(id: string): Promise<void> {
    return await axios.delete('/task-type/' + id)
  }
}