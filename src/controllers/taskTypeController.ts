import axios from "axios"

export default class TaskTypeController {
  static async add(name: string) {
    return axios.post('/task-type/add', { name })
  }

  static async update(id: string, name: string) {
    return axios.put('/task-type/update/' + id, { name })
  }

  static async delete(id: string): Promise<void> {
    return axios.delete('/task-type/delete/' + id)
  }
}