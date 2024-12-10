/**
 * Server Configuration
 * Contains all server-related settings
 */
export const SERVER_CONFIG = {
  IP: 'localhost',
  PORT: 3001,
  get BASE_URL() {
    return `http://${this.IP}:${this.PORT}`;
  }
};