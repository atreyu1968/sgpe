import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import { USER_ROLES } from '../../src/config/constants';
import { SERVER_CONFIG } from '../config';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { logger } from '../utils/logger';

const dbDir = path.dirname(SERVER_CONFIG.DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new sqlite3.Database(SERVER_CONFIG.DB_PATH);

// Convert callback-based methods to promises
const runAsync = promisify(db.run.bind(db));
const execAsync = promisify(db.exec.bind(db));

console.log('Creating database schema...');

// Create tables in a transaction
try {
  await execAsync('PRAGMA foreign_keys = ON;');
  await execAsync('BEGIN TRANSACTION;');

  try {
    await execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  
    // Create registration codes table
    await execAsync(`
      CREATE TABLE IF NOT EXISTS registration_codes (
        code TEXT PRIMARY KEY,
        role TEXT NOT NULL,
        uses_left INTEGER NOT NULL,
        expires_at DATETIME NOT NULL,
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    // Create contests table
    await execAsync(`
      CREATE TABLE IF NOT EXISTS contests (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        start_date DATETIME NOT NULL,
        end_date DATETIME NOT NULL,
        status TEXT NOT NULL,
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    // Create educational centers table
    await execAsync(`
      CREATE TABLE IF NOT EXISTS educational_centers (
        id TEXT PRIMARY KEY,
        code TEXT NOT NULL UNIQUE,
        center_type TEXT NOT NULL,
        name TEXT NOT NULL,
        island TEXT NOT NULL,
        province TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        created_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);

    // Insert default admin user if not exists
    const adminEmail = 'admin@awards.com';
    const adminPassword = 'admin123';
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    const adminId = 'admin-1';

    await runAsync(`
      INSERT OR REPLACE INTO users (id, email, password, name, role)
      VALUES (?, ?, ?, ?, ?)
    `, [
      adminId,
      adminEmail,
      hashedPassword,
      'Administrator',
      USER_ROLES.ADMINISTRATOR
    ]);

    await execAsync('COMMIT;');
    console.log('Database initialization complete ✅');
  } catch (error) {
    await execAsync('ROLLBACK;');
    throw error;
  }

} catch (error) {
  console.error('Failed to initialize database:', error);
  throw error;
}

export function checkDatabaseConnection() {
  try {
    // Ensure database directory exists
    const dbDir = path.dirname(SERVER_CONFIG.DB_PATH);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    // Check database file
    if (!fs.existsSync(SERVER_CONFIG.DB_PATH)) {
      console.log('Database file does not exist, it will be created automatically');
      return true;
    }

    // Test database connection
    const db = new sqlite3.Database(SERVER_CONFIG.DB_PATH, (err) => {
      if (err) {
        throw err;
      }
      db.close();
    });

    console.log('✅ Database connection successful');
    
    return true;
  } catch (error) {
    console.error('❌ Database check failed:', error);
    logger.logAuth('Database connection check', { 
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return false;
  }
}