export class User {
  id: number;
  username: string;
  email: string;
  contact: number;
  hashedPassword: string;
  confirmPassword: string;
  isAdmin: boolean;
  createdAt: Date;
}
