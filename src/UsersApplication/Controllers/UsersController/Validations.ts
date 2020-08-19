import joi from 'joi';
import { RequestHandler, RequestParamHandler } from 'express';

export const getValidationMiddleWare = (schema: joi.ObjectSchema<any>): RequestHandler => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });

  if (error) {
    res.status(400).json(error.details.map(e => e.message));
  } else {
    next();
  }
};

export const ValidateLimitMiddleWare: RequestHandler = (req, res, next) => {
  const { limit } = req.query;
  const { error } = joi.number().min(1).max(50).validate(limit);

  if (error) {
    res.status(400).json(error.details.map(e => e.message));
  } else {
    next();
  }
};


export const ValidateUserIdMiddleWare: RequestParamHandler = (req, res, next, id) => {
  const { error } = joi.string().uuid({ version: 'uuidv4' }).required().validate(id);

  if (error) {
    res.status(400).json(error.details.map(e => e.message));
  } else {
    next();
  }
};

export const newUserDataSchema = joi.object().keys({
  Age: joi.number().min(4).max(130).required(),
  Login: joi.string().required(),
  Password: joi.string().alphanum().regex(/^(?=.*?\d)(?=.*?[a-zA-Z]).*$/).required()
});

export const userUpdateDataSchema = joi.object().keys({
  Age: joi.number().min(4).max(130),
  Login: joi.string(),
  Password: joi.string().alphanum().regex(/^(?=.*?\d)(?=.*?[a-zA-Z]).*$/)
}).or('Age', 'Login', 'Password');
