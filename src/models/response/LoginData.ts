import User from "./User";

export default interface LoginData {
  accessToken: string;
  refreshToken: string;
  user: User;
}