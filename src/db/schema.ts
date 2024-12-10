import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { USER_ROLES } from '../config/constants';

const db = new Database('awards.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create users table
db.exec(`
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
db.exec(`
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
db.exec(`
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

// Insert default admin user if not exists
const adminEmail = 'admin@awards.com';
const adminPassword = 'admin123'; // This should be changed after first login
const hashedPassword = bcrypt.hashSync(adminPassword, 10);

const insertAdmin = db.prepare(`
  INSERT OR IGNORE INTO users (id, email, password, name, role)
  VALUES (?, ?, ?, ?, ?)
`);

insertAdmin.run(
  'admin-' + Date.now(),
  adminEmail,
  hashedPassword,
  'Administrator',
  USER_ROLES.ADMINISTRATOR
);

export { db };