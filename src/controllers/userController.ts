import StorageService from "@/services/storageService";
import axios from "axios"

export default class DeskController {
  static async uploadAvatar(image: File) {
    const form = new FormData();
    form.append('image', image);
    const { data } = await axios.put('/upload-avatar', form)
    StorageService.setItem('token', data.access_token)
  }

  static async removeAvatar(): Promise<void> {
    return axios.delete('/user/remove-avatar')
  }

  static async changeData(login: string, firstName: string, secondName: string) {
    const { data } = await axios.put('/user/change-data', { login, firstName, secondName })
    StorageService.setItem('token', data.access_token)
  }

  static async changePassword(newPassword: string, oldPassword: string) {
    const { data } = await axios.post('/user/change-password', { newPassword, oldPassword})
    StorageService.setItem('token', data.access_token)
  }
}