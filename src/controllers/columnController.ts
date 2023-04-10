import axios from "axios"

export default class ColumnController {
  static async add(name: string) {
    return axios.post('/column/add', { name })
  }

  static async update(id: string, name: string) {
    return axios.put('/column/update/' + id, { name })
  }

  static async delete(id: string): Promise<void> {
    return axios.delete('/column/delete/' + id)
  }
}