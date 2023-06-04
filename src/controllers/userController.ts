import StorageService from "@/services/storageService";
import axios from "axios"

export default class DeskController {
  static async uploadAvatar(image: File) {
    const form = new FormData();
    form.append('image', image);
    const { data } = await axios.put('/user/upload-avatar', form)
    StorageService.setItem('token', data.accessToken)
  }

  static async changeName(firstName: string, secondName: string) {
    const { data } = await axios.put('/user/change-name', { firstName, secondName })
    StorageService.setItem('token', data.accessToken)
  }

  static async changeLogin(login: string) {
    const { data } = await axios.put('/user/change-login', { login })
    StorageService.setItem('token', data.accessToken)
  }

  static async changePassword(newPassword: string, oldPassword: string) {
    const { data } = await axios.put('/user/change-password', { newPassword, oldPassword})
    StorageService.setItem('token', data.accessToken)
  }
}