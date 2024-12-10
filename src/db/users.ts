import { db } from './schema';
import { User } from '../types/auth';
import bcrypt from 'bcryptjs';

export const usersDb = {
  findByEmail: (email: string) => {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  },

  validatePassword: (user: User, password: string) => {
    return bcrypt.compareSync(password, user.password);
  },

  create: (user: Omit<User, 'id'>) => {
    const stmt = db.prepare(`
      INSERT INTO users (id, email, password, name, role)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const userId = 'user-' + Date.now();
    
    stmt.run(userId, user.email, hashedPassword, user.name, user.role);
    return { ...user, id: userId };
  }
};