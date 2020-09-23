import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});

export const logMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  logger.info({
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params
  });

  next();
};
