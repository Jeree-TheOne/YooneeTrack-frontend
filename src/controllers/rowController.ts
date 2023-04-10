import axios from "axios"

export default class RowController {
  static async add(name: string) {
    return axios.post('/row/add', { name })
  }

  static async update(id: string, name: string) {
    return axios.put('/row/update/' + id, { name })
  }

  static async delete(id: string): Promise<void> {
    return axios.delete('/row/delete/' + id)
  }
}