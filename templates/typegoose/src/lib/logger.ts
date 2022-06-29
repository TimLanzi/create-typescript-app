/*
Tim Lanzi
May 2020

Custom Winston error logger
*/

import winston from "winston";
import { TEST, PROD } from "../constants";

const levels = {
  error: 0,
  warn: 1,
  http: 2,
  info: 3,
  debug: 4,
};

const level = () => {
  return PROD ? 'info' : 'debug';
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms'}),
  winston.format.printf(({ timestamp, level, message, ...rest }) =>
    `${timestamp} ${level.toUpperCase()}: ${message} ${JSON.stringify({ ...rest })}`.trim()
  ),
);

const transports = [
  new winston.transports.Console({
    format: winston.format.colorize({ all: true }),
    silent: TEST,
  }),
  new winston.transports.File({
    level: "error",
    filename: './logs/error.log',
    silent: !PROD,
  }),
  new winston.transports.File({
    level: "http",
    filename: "./logs/http.log",
    silent: !PROD,
  }),
  new winston.transports.File({
    filename: './logs/combined.log',
    silent: !PROD,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;