const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const Sentry = require('winston-raven-sentry');

const { NODE_ENV, SENTRY_DSN, root } = require('../../config/environment');

const logger = new winston.Logger({
  transports: [
    new DailyRotateFile({
      datePattern: 'YYYY-MM-DD',
      filename: `${root}/logs/error.%DATE%.log`,
      level: 'error',
      maxFiles: '7d',
    }),
    new Sentry({
      dsn: NODE_ENV === 'production' && SENTRY_DSN,
      install: true,
      config: { environment: NODE_ENV, release: '@@_RELEASE_' },
      level: 'warn',
    }),
    new (winston.transports.Console)({
      name: 'console',
      level: 'debug',
      silent: NODE_ENV === 'production',
    }),
  ],
});

module.exports = logger;
