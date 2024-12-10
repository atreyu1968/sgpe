import { Router } from 'express';
import sqlite3 from '@vscode/sqlite3';
import { SERVER_CONFIG } from '../config';
import { authMiddleware } from '../middleware/auth';
import { USER_ROLES } from '../../src/config/roles';
import { promisify } from 'util';

const router = Router();

const db = new sqlite3.Database(SERVER_CONFIG.DB_PATH);

// Convert callback methods to promises
const allAsync = promisify(db.all.bind(db));
const runAsync = promisify(db.run.bind(db));

// Middleware to check if user is admin
const checkAdmin = (req: any, res: any, next: any) => {
  if (req.user?.role === USER_ROLES.ADMINISTRATOR) {
    next();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

// Get list of tables
router.get('/tables', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const tables = await allAsync(`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `);
    res.json(tables.map(t => t.name));
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get table details
router.get('/tables/:tableName', authMiddleware, checkAdmin, async (req, res) => {
  const { tableName } = req.params;

  try {
    const columns = await allAsync(`PRAGMA table_info(${tableName})`);
    const rows = await allAsync(`SELECT * FROM ${tableName} LIMIT 100`);

    res.json({
      columns: columns.reduce((acc, col) => ({
        ...acc,
        [col.name]: col.type
      }), {}),
      rows
    });
  } catch (error) {
    console.error('Error fetching table data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const databaseRouter = router;