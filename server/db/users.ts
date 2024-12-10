import { db } from './schema';
import { User } from '../types/auth';
import bcrypt from 'bcryptjs';
import { DatabaseError } from '../utils/errors';

export const usersDb = {
  findByEmail: (email: string) => {
    try {
      console.log('Finding user by email:', email);
      const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
      const user = stmt.get(email) as User | undefined;
      console.log('User found:', user ? 'yes' : 'no');
      return user;
    } catch (error) {
      console.error('Database error in findByEmail:', error);
      throw new DatabaseError('Error finding user');
    }
  },

  validatePassword: (password: string, hashedPassword: string) => {
    try {
      console.log('Validating password');
      return bcrypt.compareSync(password, hashedPassword);
    } catch (error) {
      console.error('Error validating password:', error);
      throw new DatabaseError('Error validating password');
    }
  },

  findAll: () => {
    try {
      const stmt = db.prepare(`
        SELECT id, email, name, role, created_at 
        FROM users 
        ORDER BY created_at DESC
      `);
      return stmt.all() as Omit<User, 'password'>[];
    } catch (error) {
      throw new DatabaseError('Error fetching users');
    }
  },

  create: (user: Omit<User, 'id'>) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO users (id, email, password, name, role)
        VALUES (?, ?, ?, ?, ?)
      `);
      
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      const userId = 'user-' + Date.now();
      
      stmt.run(userId, user.email, hashedPassword, user.name, user.role);
      return { ...user, id: userId };
    } catch (error) {
      console.error('Database error in create:', error);
      throw new DatabaseError('Error creating user');
    }
  }
};