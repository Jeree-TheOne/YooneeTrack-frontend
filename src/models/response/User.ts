export default interface User {
  id: string;
  createdAt: number;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarPath: string;
  isBlocked: boolean;
  isPremium: boolean;
  isActivated: boolean;
}