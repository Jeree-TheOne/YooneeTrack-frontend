import User from "../models/response/User";

export default class AuthDomain {
  private user: User;

  constructor() {
    this.user = null as unknown as User;
  }

  getUser = (): User => this.user

  setUser = (user: User) => this.user = user
}