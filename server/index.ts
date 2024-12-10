import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';
import { centersRouter } from './routes/centers';
import { databaseRouter } from './routes/database';
import { authMiddleware } from './middleware/auth';
import { SERVER_CONFIG } from './config';
import { checkDatabaseConnection } from './scripts/checkDb';

const app = express();

app.use(cors());
app.use(express.json());

// Check database connection before starting server
if (!checkDatabaseConnection()) {
  console.error('Failed to connect to database. Exiting...');
  process.exit(1);
}

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', authMiddleware, usersRouter);
app.use('/api/centers', authMiddleware, centersRouter);
app.use('/api/database', databaseRouter);

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server running on ${SERVER_CONFIG.BASE_URL}`);
});