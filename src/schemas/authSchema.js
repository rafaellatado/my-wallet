import joi from 'joi';

export const userSignUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmedPassword: joi.string().required()
}) 

export const userSignInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});
