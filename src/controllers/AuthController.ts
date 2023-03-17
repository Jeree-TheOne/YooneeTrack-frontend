import axios, { AxiosResponse } from "axios"
import User from "../models/response/User";

export default class AuthController {
  static async login(AuthData: {login: string, password: string}): Promise<AxiosResponse<User>> {
    return axios.post<User>('/login', AuthData)
  }

  static async registration(RegistrationData: {email: string, password: string}): Promise<AxiosResponse<User>> {
    return axios.post<User>('/registration', RegistrationData)
  }

  static async logout(): Promise<void> {
    return axios.post('/logout')
  }
}