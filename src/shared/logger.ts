import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, prettyPrint } = format;

// Custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${date.toDateString()} ${hour}:${minutes} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Info Log' }), timestamp(), myFormat, prettyPrint()),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: '%DATE%-success.log',
      dirname: 'logs/winston/successes',
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Error Log' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: '%DATE%-error.log',
      dirname: 'logs/winston/errors',
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorLogger };
