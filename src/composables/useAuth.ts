import AuthDomain from "../domains/AuthDomain";
import AuthService from "../services/AuthService";

const authDomain = new AuthDomain()
const authService = new AuthService(authDomain);

export default function useAuth(): {authService: AuthService, authDomain: AuthDomain} {
  return { 
    authService, 
    authDomain
  }
}