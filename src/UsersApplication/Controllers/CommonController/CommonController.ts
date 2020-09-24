import jwt from 'jsonwebtoken';
import { ErrorRequestHandler, RequestHandler } from 'express';
import { logger } from '../../Middlewares';
import { CommonError } from './types';
import { runInNewContext } from 'vm';
require('dotenv').config();

const tokenList = new Map<string, string>();

export class CommonController {
  public static login: RequestHandler = async (req, res, next) => {
    try {
      const user = {
        name: req.body.Name
      };

      const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: 100 });
      const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET!, { expiresIn: 300 });

      tokenList.set(refreshToken, token);
      console.log(tokenList);
      res.status(200).json({
        token,
        refreshToken
      });
    } catch (e) {
      next(e);
    }
  };

  public static refreshToken: RequestHandler = async (req, res, next) => {
    try {
      const user = {
        name: req.body.Name
      };

      if (tokenList.has(req.body.RefreshToken)) {
        const token = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: 100 });

        tokenList.set(req.body.RefreshToken, token);

        res.status(200).json(token);
      } else {
        res.status(404).send('Invalid request');
      }
    } catch (e) {
      next(e);
    }
  };

  public static handleCommonError: ErrorRequestHandler = (err: CommonError, req, res, next) => {
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
