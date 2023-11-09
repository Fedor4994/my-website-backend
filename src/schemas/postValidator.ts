import Joi from "joi";

export const addPostSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.string().required(),
  text: Joi.string().required(),
});
