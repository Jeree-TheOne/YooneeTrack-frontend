import LoginData from "@/models/response/LoginData";
import axios, { AxiosResponse } from "axios"

export default class AuthController {
  static async login(AuthData: {login: string, password: string}): Promise<AxiosResponse<LoginData>> {
    return axios.post<LoginData>('/login', AuthData)
  }

  static async registration(RegistrationData: {email: string, password: string}): Promise<AxiosResponse<LoginData>> {
    return axios.post<LoginData>('/registration', RegistrationData)
  }

  static async logout(): Promise<void> {
    return axios.post('/logout')
  }
}