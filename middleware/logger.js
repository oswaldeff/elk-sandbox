import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../config/index.js';

// SECTION winston logger Settings
const LEVELS = {
  fatal: 0,
  error: 1,
  debug: 2,
  warn: 3,
  info: 4,
};
const COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  fatal: 'red',
};
const appRoot = process.env.PWD;
const errorTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: `${appRoot}/log/application-%DATE%.log`,
  maxSize: '20m',
  maxFiles: '14d',
  zippedArchive: true,
  datePattern: 'YYYY-MM-DD-HH',
  timestamp: new Date().toString(),
});
const warnTransport = new winston.transports.DailyRotateFile({
  level: 'warn',
  filename: `${appRoot}/log/application-%DATE%.log`,
  maxSize: '20m',
  maxFiles: '14d',
  zippedArchive: true,
  datePattern: 'YYYY-MM-DD-HH',
  timestamp: new Date().toString(),
});
const fatalTransport = new winston.transports.DailyRotateFile({
  level: 'fatal',
  filename: `${appRoot}/log/application-%DATE%.log`,
  maxSize: '20m',
  maxFiles: '14d',
  zippedArchive: true,
  datePattern: 'YYYY-MM-DD-HH',
  timestamp: new Date().toString(),
});
const InfoTransport = new winston.transports.DailyRotateFile({
  level: 'info',
  filename: `${appRoot}/log/application-%DATE%.log`,
  maxSize: '20m',
  maxFiles: '14d',
  zippedArchive: true,
  datePattern: 'YYYY-MM-DD-HH',
  timestamp: new Date().toString(),
});

const logger = winston.createLogger({
  levels: LEVELS,
  transports: [errorTransport, warnTransport, fatalTransport, InfoTransport],
});
winston.addColors(COLORS);

// NOTE
if (config.serverMode !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}
// !SECTION

// SECTION winston logger
class Logger {
  constructor(level, error, ip) {
    logger[level]({
      time: new Date(),
      level,
      code: error.code,
      message: error.message,
      ip,
      stack: error.stack,
    });
  }
}
// !SECTION

export default Logger;
