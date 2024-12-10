import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { SERVER_CONFIG as CLIENT_CONFIG } from '../src/config/server';

// Load environment variables from project root
dotenv.config();

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

/**
 * Server Configuration
 * Contains all server-related settings and validates required values
 */
export const SERVER_CONFIG = {
  PORT: CLIENT_CONFIG.PORT,
  HOST: CLIENT_CONFIG.IP,
  JWT_SECRET: process.env.JWT_SECRET || 'development-secret-key', 
  DB_PATH: path.resolve(process.cwd(), 'data', 'awards.db'),
  get BASE_URL() {
    return `http://${this.HOST}:${this.PORT}`;
  }
};

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Validate JWT secret at runtime
if (process.env.NODE_ENV === 'production' && SERVER_CONFIG.JWT_SECRET === 'development-secret-key') {
  console.warn('Warning: Using default JWT secret. Please set a secure JWT_SECRET in production.');
}

// Log server configuration on startup
console.log('Server configuration loaded:', {
  port: SERVER_CONFIG.PORT,
  dbPath: SERVER_CONFIG.DB_PATH,
  baseUrl: SERVER_CONFIG.BASE_URL
});