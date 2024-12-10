import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { usersDb } from '../db/users';
import { User } from '../../src/types/auth';
import { SERVER_CONFIG } from '../config';
import { AuthenticationError, DatabaseError } from '../utils/errors';
import { logger } from '../utils/logger';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  logger.logAuth('Login attempt', { email });

  if (!email || !password) {
    logger.logAuth('Login failed - Missing credentials', { email });
    return res.status(400).json({ 
      error: 'Email and password are required' 
    });
  }

  try {
    const user = usersDb.findByEmail(email);

    if (!user || !user.password) {
      logger.logAuth('Login failed - User not found', { email });
      throw new AuthenticationError('Invalid credentials');
    }

    const isValidPassword = usersDb.validatePassword(password, user.password);
    if (!isValidPassword || !user.id || !user.email || !user.role) {
      logger.logAuth('Login failed - Invalid password', { email });
      throw new AuthenticationError('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SERVER_CONFIG.JWT_SECRET,
      { expiresIn: '24h', algorithm: 'HS256' }
    );

    const userResponse: Omit<User, 'password'> = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    logger.logAuth('Login successful', { 
      email: user.email, 
      role: user.role 
    });
    
    res.json({
      user: userResponse,
      token
    });
  } catch (error) {
    logger.logAuth('Login error', { 
      email, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });

    if (error instanceof AuthenticationError) {
      return res.status(401).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      console.error('Database error during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const authRouter = router;