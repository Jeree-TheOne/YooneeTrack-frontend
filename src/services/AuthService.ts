import AuthController from "@/controllers/authController";
import User from "@/models/response/User";
import StorageService from "@/services/storageService";


class AuthService {
  async login(login: string, password: string): Promise<User> {
    const { data } = await AuthController.login({login, password});
    StorageService.setItem('token', data.access_token);

    return data.user
  }

  async registration(email: string, password: string) {
    await AuthController.registration({email, password});    
  }

  async logout() {
    AuthController.logout()
    StorageService.removeItem('token')
  }
}

export default new AuthService()