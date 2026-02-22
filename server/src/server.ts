import path from 'path';

// Load .env before anything else
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenvPath = path.resolve(__dirname, '..', '.env');
try {
  require('dotenv').config({ path: dotenvPath });
} catch {
  // dotenv is optional - env vars can be set externally in production
}

import app from './app';
import prisma from './utils/prisma';
import logger from './utils/logger';

const PORT = parseInt(process.env.PORT ?? '4000', 10);
const HOST = process.env.HOST ?? '0.0.0.0';

async function startServer(): Promise<void> {
  try {
    // Verify database connectivity before accepting requests
    await prisma.$connect();
    logger.info('Database connection established');

    const server = app.listen(PORT, HOST, () => {
      logger.info(
        { port: PORT, host: HOST, env: process.env.NODE_ENV ?? 'development' },
        `Server listening on http://${HOST}:${PORT}`
      );
    });

    // ---------------------------------------------------------------------------
    // Graceful shutdown
    // ---------------------------------------------------------------------------
    const shutdown = async (signal: string) => {
      logger.info({ signal }, 'Shutdown signal received, closing gracefully...');

      server.close(async () => {
        logger.info('HTTP server closed');

        try {
          await prisma.$disconnect();
          logger.info('Database connection closed');
        } catch (err) {
          logger.error({ err }, 'Error disconnecting from database');
        }

        process.exit(0);
      });

      // Force shutdown after 30 seconds if graceful shutdown hangs
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 30_000).unref();
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // ---------------------------------------------------------------------------
    // Unhandled rejection / uncaught exception safety nets
    // ---------------------------------------------------------------------------
    process.on('unhandledRejection', (reason: unknown) => {
      logger.error({ err: reason }, 'Unhandled promise rejection');
    });

    process.on('uncaughtException', (error: Error) => {
      logger.fatal({ err: error }, 'Uncaught exception - shutting down');
      shutdown('uncaughtException');
    });
  } catch (error) {
    logger.fatal({ err: error }, 'Failed to start server');
    await prisma.$disconnect().catch(() => {});
    process.exit(1);
  }
}

startServer();
