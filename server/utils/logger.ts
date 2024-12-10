import fs from 'fs';
import path from 'path';

class Logger {
  private logDir: string;
  private authLogPath: string;

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.authLogPath = path.join(this.logDir, 'auth.log');
    this.initializeLogDirectory();
  }

  private initializeLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  private formatLogMessage(message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const dataString = data ? `\nData: ${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] ${message}${dataString}\n`;
  }

  public logAuth(message: string, data?: any) {
    const logEntry = this.formatLogMessage(message, data);
    fs.appendFileSync(this.authLogPath, logEntry);
  }
}

export const logger = new Logger();