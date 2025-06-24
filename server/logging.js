/**
 * A logging module using Winston for better management of logs with colorized output.
 * 
 * Winston is a versatile logging library for Node.js, providing various features like log levels,
 * transports (e.g., console, file, HTTP), and customizable log formatting.
 * 
 * @module logging
 * @requires winston
 */

const winston = require("winston");

// Define log levels and colors for better readability
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

// Create a logger with console transport and colorized output
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'debug', // Set the minimum log level to output (adjust as needed)
    }),
  ],
});

/**
 * Exports a configured Winston logger instance for use in other modules.
 * 
 * @type {Object}
 * @property {Logger} logger - The configured Winston logger instance.
 * @memberof logging
 */
module.exports = { logger }
