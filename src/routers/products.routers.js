const express = require('express');

const router = express.Router();

const {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controllers');

const {
  validateId,
  validateInsertProductBody,
} = require('../middlewares/products.middlewares');

// get - pegar as informações
router.get('/', getAllProducts);
router.get('/:id', validateId, getProductById);

// post - inserir informações
router.post('/', validateInsertProductBody, postProduct);

// put - atualizar informações
router.put(
  '/:id',
  validateId,
  validateInsertProductBody,
  updateProduct,
);

// delete - deletar informações
router.delete('/:id', validateId, deleteProduct);

module.exports = router;