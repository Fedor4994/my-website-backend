import Joi from "joi";

export const addProjectSchema = Joi.object({
  title: Joi.string().required(),
  link: Joi.string().required(),
  source_link: Joi.string().required(),
  description: Joi.string().required(),
  technologies: Joi.string().required(),
});
