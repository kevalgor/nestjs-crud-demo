import * as Joi from 'joi';

export const userIdSchema = Joi.object({
  userId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().trim().optional(),
}).options({
  abortEarly: true,
});
