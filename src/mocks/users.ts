import { User } from '../types/auth';
import { USER_ROLES } from '../config/constants';

interface MockUser extends User {
  password: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'admin-1',
    email: 'admin@awards.com',
    name: 'Administrator',
    role: USER_ROLES.ADMINISTRATOR,
    password: 'admin123'
  }
];