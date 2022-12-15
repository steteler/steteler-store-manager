const { validadeId, validateName } = require('./validations');

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const isError = validadeId(id);
  if (isError) {
    const { statusCode, message } = isError;
    return res.status(statusCode).json({ message });
  }
  next();
};

const validateInsertProductBody = async (req, res, next) => {
  const { name } = req.body;
  const isError = validateName(name);
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (isError) {
    const { statusCode, message } = isError;
    return res.status(statusCode).json({ message });
  }
  next();
};

module.exports = {
  validateId,
  validateInsertProductBody,
};