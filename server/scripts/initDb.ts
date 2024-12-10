import { db } from '../db/schema';
import { logger } from '../utils/logger';
import { checkDatabaseConnection } from './checkDb';

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');
    
    // Check if database is accessible
    const isConnected = checkDatabaseConnection();
    if (!isConnected) {
      throw new Error('Could not establish database connection');
    }

    // Verify admin user exists
    const adminUser = db.prepare(`
      SELECT * FROM users WHERE email = ?
    `).get('admin@awards.com');

    if (!adminUser) {
      console.log('Admin user not found. Database may need re-initialization.');
      process.exit(1);
    }

    console.log('Database initialization complete!');
    console.log('Default admin credentials:');
    console.log('Email: admin@awards.com');
    console.log('Password: admin123');

    logger.logAuth('Database initialized successfully', {
      tables: db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
    });

  } catch (error) {
    console.error('Database initialization failed:', error);
    logger.logAuth('Database initialization failed', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();