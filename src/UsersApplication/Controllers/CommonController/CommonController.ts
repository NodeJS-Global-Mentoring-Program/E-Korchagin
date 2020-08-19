import { ErrorRequestHandler } from 'express';
import { CommonError } from './types';

export class CommonController {
  public static handleCommonError: ErrorRequestHandler = (err: CommonError, req, res, next) => {
    res.status(err.Status || 500).json(err.Message || 'Something bad happend');
  }
}
