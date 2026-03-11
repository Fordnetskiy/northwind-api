const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  format:
    process.env.NODE_ENV === "production"
      ? winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        )
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp({ format: "HH:mm:ss" }),
          winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
          }),
        ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

module.exports = logger;
