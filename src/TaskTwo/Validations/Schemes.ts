import joi from 'joi';

export const newUserSchema = joi.object().keys({
  Age: joi.number().min(4).max(130).required(),
  Password: joi.string().alphanum().regex(/^(?=.*?\d)(?=.*?[a-zA-Z]).*$/),
  Login: joi.string().required(),
});

export const undateUserSchema = joi.object().keys({
  Id: joi.string().uuid({ version: 'uuidv4' }).required(),
  Age: joi.number().min(4).max(130).required(),
  Login: joi.string().required(),
});