import Joi from "joi";

// validation schema to create a user
const createUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().required(),
});

// validation schema to update an user
const updateUserSchema = Joi.object({
  name: Joi.string(),
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string(),
});

export { createUserSchema, updateUserSchema };
