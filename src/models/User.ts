export type Role = 'ADMIN' | 'USER';

export interface AuthenticatedUser {
  username: string;
  role: Role;
}