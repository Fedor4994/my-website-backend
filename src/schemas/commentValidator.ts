import Joi from "joi";

export const addCommentForPostSchema = Joi.object({
  text: Joi.string().required(),
  userId: Joi.string().required(),
});
