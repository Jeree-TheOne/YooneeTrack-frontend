import LoginData from "@/models/response/LoginData";
import axios, { AxiosResponse } from "axios"

export default class AuthController {
  static async login(AuthData: {login: string, password: string}): Promise<AxiosResponse<LoginData>> {
    return await axios.post<LoginData>('/auth/login', AuthData)
  }

  static async registration(RegistrationData: {email: string, password: string}): Promise<AxiosResponse<LoginData>> {
    return await axios.post<LoginData>('/auth/registration', RegistrationData)
  }

  static async logout(): Promise<void> {
    return await axios.post('/auth/logout')
  }
}