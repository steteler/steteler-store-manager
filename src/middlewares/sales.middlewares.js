const { validateSales, validadeId } = require('./validations');

const validateIfAllKeysArePresent = (products) => {
  for (let i = 0; i < products.length; i += 1) {
    const { productId, quantity } = products[i];
    if (productId === undefined) {
      return {
        statusCode: 400,
        message: '"productId" is required',
      };
    }
    if (quantity === undefined) {
      return {
        statusCode: 400,
        message: '"quantity" is required',
      };
    }
  }

  return false;
};

const validateInsertSaleBody = async (req, res, next) => {
  const sales = req.body;

  if (!Array.isArray(sales)) {
    return res.status(400).json({ message: '"sales" must be an array' });
  }

  if (sales.length === 0) {
    return res.status(400).json({ message: '"sales" is empty' });
  }

  const allKeysArePresent = validateIfAllKeysArePresent(sales);
  if (allKeysArePresent) {
    const { statusCode, message } = allKeysArePresent;
    return res.status(statusCode).json({ message });
  }

  const isError = validateSales(sales);
  if (isError) {
    const { statusCode, message } = isError;
    return res.status(statusCode).json({ message });
  }

  next();
};

const validateId = async (req, res, next) => {
  const { id } = req.params;

  const isError = validadeId(id);
  if (isError) {
    const { statusCode, message } = isError;
    return res.status(statusCode).json({ message });
  }

  next();
};

module.exports = {
  validateInsertSaleBody,
  validateId,
};