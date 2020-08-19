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

export const validateUserId = (id: string) => joi.string().uuid({ version: 'uuidv4' }).required().validate(id);

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
