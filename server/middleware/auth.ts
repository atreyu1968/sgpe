import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SERVER_CONFIG } from '../config';
import { isValidUserRole } from '../../src/config/constants';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Authentication middleware
 * Validates JWT tokens and ensures proper user authentication
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, SERVER_CONFIG.JWT_SECRET);
    const decodedUser = decoded as AuthRequest['user'];
    
    // Validate user role
    if (!isValidUserRole(decodedUser.role)) {
      return res.status(401).json({ error: 'Invalid user role' });
    }
    
    req.user = decodedUser;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};