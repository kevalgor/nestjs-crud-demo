import * as Joi from 'joi';

export const createBlogSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  author: Joi.string().trim().required(),
  category: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const blogIdSchema = Joi.object({
  blogId: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().optional(),
  author: Joi.string().trim().required(),
  category: Joi.string().trim().required(),
}).options({
  abortEarly: true,
});
