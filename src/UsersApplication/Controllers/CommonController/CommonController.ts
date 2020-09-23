import { ErrorRequestHandler } from 'express';
import { logger } from '../../Middlewares';
import { CommonError } from './types';

export class CommonController {
  public static handleCommonError: ErrorRequestHandler = (err: CommonError, req, res, next) => {
    console.log(err);
    logger.error({
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
      message: err.Message || 'Something bad happend'
    });

    res.status(err.Status || 500).json(err.Message || 'Something bad happend');
  }
}
