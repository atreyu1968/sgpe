import sqlite3 from '@vscode/sqlite3';
import bcrypt from 'bcryptjs';
import { USER_ROLES } from '../../src/config/roles';
import { SERVER_CONFIG } from '../config';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

console.log('Initializing database...');

// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database
const db = new sqlite3.Database(SERVER_CONFIG.DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
});

// Convert callback methods to promises
const runAsync = promisify(db.run.bind(db));
const allAsync = promisify(db.all.bind(db));
const execAsync = promisify(db.exec.bind(db));

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Initialize schema
db.serialize(() => {
  // Create users table
  db.run(`
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

  // Create educational centers table
  db.run(`
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

  // Insert default admin user
  const adminEmail = 'admin@awards.com';
  const adminPassword = bcrypt.hashSync('admin123', 10);
  const adminId = 'admin-1';

  db.run(`
    INSERT OR REPLACE INTO users (id, email, password, name, role)
    VALUES (?, ?, ?, ?, ?)
  `, [
    adminId,
    adminEmail,
    adminPassword,
    'Administrator',
    USER_ROLES.ADMINISTRATOR
  ], (err) => {
    if (err) {
      console.error('Error creating admin user:', err);
    } else {
      console.log('✅ Database initialized successfully');
    }
  });
});

// Export promisified methods
export const dbAsync = {
  run: runAsync,
  all: allAsync,
  exec: execAsync
};