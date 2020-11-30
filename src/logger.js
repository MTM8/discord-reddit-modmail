const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.printf((log) => `[${log.level}] ${log.message}`)
  ),
  transports: [
    new winston.transports.Console
  ],
  exceptionHandlers: [
    new winston.transports.Console
  ],
});

module.exports = logger;
