import joi from 'joi';

export const transactionsPostSchema = joi.object({
  value: joi.number().positive().required(),
  description: joi.string().trim().required(),
  type: joi.string().valid('deposit', 'withdraw').required()
});

export const transactionsPutSchema = joi.object({
  value: joi.number().positive().required(),
  description: joi.string().trim().required(),
  type: joi.string().valid('deposit', 'withdraw').required()
});
