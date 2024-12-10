import { Router } from 'express';
import { centersDb } from '../db/centers';
import { authMiddleware } from '../middleware/auth';
import { USER_ROLES } from '../../src/config/constants';

const router = Router();

// Middleware to check if user is admin or coordinator
const checkRole = (req: any, res: any, next: any) => {
  if (
    req.user?.role === USER_ROLES.ADMINISTRATOR || 
    req.user?.role === USER_ROLES.GENERAL_COORDINATOR
  ) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

router.get('/', authMiddleware, checkRole, (req, res) => {
  try {
    const centers = centersDb.findAll();
    res.json(centers);
  } catch (error) {
    console.error('Error fetching centers:', error);
    res.status(500).json({ error: 'Error fetching centers' });
  }
});

router.post('/', authMiddleware, checkRole, (req, res) => {
  try {
    const center = centersDb.create({
      ...req.body,
      created_by: req.user!.id
    });
    res.status(201).json(center);
  } catch (error) {
    console.error('Error creating center:', error);
    res.status(500).json({ error: 'Error creating center' });
  }
});

router.put('/:id', authMiddleware, checkRole, (req, res) => {
  try {
    const success = centersDb.update(req.params.id, req.body);
    if (success) {
      res.json({ message: 'Center updated successfully' });
    } else {
      res.status(404).json({ error: 'Center not found' });
    }
  } catch (error) {
    console.error('Error updating center:', error);
    res.status(500).json({ error: 'Error updating center' });
  }
});

router.delete('/:id', authMiddleware, checkRole, (req, res) => {
  try {
    const success = centersDb.delete(req.params.id);
    if (success) {
      res.json({ message: 'Center deleted successfully' });
    } else {
      res.status(404).json({ error: 'Center not found' });
    }
  } catch (error) {
    console.error('Error deleting center:', error);
    res.status(500).json({ error: 'Error deleting center' });
  }
});

export const centersRouter = router;