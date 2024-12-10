import { UserRole } from '../../src/config/constants';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
}