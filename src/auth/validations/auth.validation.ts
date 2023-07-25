import * as Joi from 'joi';

export const signupSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
