import joi from 'joi';
import { RequestHandler } from 'express';

export const getValidationMiddleWare = (schema: joi.ObjectSchema<any>): RequestHandler => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });

  error
    ? res.status(400).json(error.details.map(e => e.message))
    : next();
};