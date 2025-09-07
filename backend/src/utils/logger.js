import pino from 'pino';
import pinoHttp from 'pino-http';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production' ? undefined : {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

logger.info('Application started');
logger.error('Something went wrong');

export const httpLogger = pinoHttp({ logger });

export default logger;
