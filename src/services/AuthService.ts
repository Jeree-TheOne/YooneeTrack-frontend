import AuthController from "../controllers/AuthController";
import AuthDomain from "../domains/AuthDomain";


export default class AuthService {
  private authDomain: AuthDomain

  constructor(authDomain: AuthDomain) {
    this.authDomain = authDomain
  }
  async login(login: string, password: string) {
    const { data } = await AuthController.login({login, password});
    this.authDomain.setUser(data);
    console.log(data);
  }

  async registration(email: string, password: string) {
    const { data } = await AuthController.registration({email, password});
    
    console.log(data);
  }

  async logout() {
    await AuthController.logout()
  }
}