const Joi = require('joi');

// prettier-ignore
const idSchema = Joi.number().integer().min(1).required()
  .messages({
    'number.base': '"id" must be a number',
    'number.integer': '"id" must be an integer',
    'number.min': '"id" must be greater than or equal to 1',
    'any.required': '"id" is required',
  });

const productNameSchema = Joi.string().min(5).required().messages({
  'string.base': '"name" should be a type of "text"',
  'string.empty': '"name" cannot be an empty field',
  'string.min': '"name" length must be at least 5 characters long',
  'any.required': '"name" is required',
});

const saleSchema = Joi.object({
  // prettier-ignore
  productId: Joi.number().integer().min(1).required()
    .messages({
      'number.base': '"productId" should be a type of "number"',
      'number.empty': '"productId" cannot be an empty field',
      'number.min': '"productId" must be greater than or equal to 1',
      'any.required': '"productId" is required',
    }),
  // prettier-ignore
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'number.base': '"quantity" should be a type of "number"',
      'number.empty': '"quantity" cannot be an empty field',
      'number.min': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
});

const saleArraySchema = Joi.array().items(saleSchema).min(1).required();

module.exports = {
  idSchema,
  productNameSchema,
  saleArraySchema,
};