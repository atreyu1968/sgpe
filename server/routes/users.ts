import { Router } from 'express';
import { usersDb } from '../db/users';

const router = Router();

router.get('/', (req, res) => {
  try {
    const users = usersDb.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const usersRouter = router;