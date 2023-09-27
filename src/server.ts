import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

// Uncaught exception error
process.on('uncaughtException', (error: Error) => {
  errorLogger.error('Uncaught Exception:', error);
  process.exit(1);
});

let server: Server | null = null;

export async function startServer() {
  try {
    const DATABASE_URL = config.database_url;

    if (!DATABASE_URL) {
      throw new Error('Please define the DATABASE_URL environment variable inside .env');
    }

    await mongoose.connect(DATABASE_URL, {
      bufferCommands: false,
    });
    logger.info('Database connected');

    server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });

    // Unhandled rejection error
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      errorLogger.error(`Unhandled Rejection at: ${promise}\nReason: ${reason}`);
      if (server) {
        server.close(() => {
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  } catch (error: any) {
    errorLogger.error('Error during server startup:', error);
    process.exit(1);
  }
}

startServer();

process.on('SIGTERM', () => {
  errorLogger.info('Received SIGTERM signal. Shutting down gracefully.');
  if (server) {
    server.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
