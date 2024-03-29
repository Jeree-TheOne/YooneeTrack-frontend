export default interface User {
  id: string;
  createdAt: number;
  login: string;
  email: string;
  first_name: string;
  second_name: string;
  avatar: string;
  is_blocked: boolean;
  is_premium: boolean;
  is_activated: boolean;
}