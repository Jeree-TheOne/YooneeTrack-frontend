import User from "./User";

export default interface LoginData {
  access_token: string;
  refresh_token: string;
  user: User;
}