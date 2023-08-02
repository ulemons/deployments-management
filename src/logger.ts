import winston from "winston";

// Define your logger configuration
const logger = winston.createLogger({
  level: "info", // Minimum log level to output
  format: winston.format.simple(), // Log format
  transports: [
    new winston.transports.Console(), // Output logs to the console
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Output error logs to a file
  ],
});

export default logger;
