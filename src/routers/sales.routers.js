const express = require('express');

const router = express.Router();

const {
  getAllSales,
  getSalesById,
  postSales,
  updateSales,
  deleteSales,
} = require('../controllers/sales.controllers');

const {
  validateId,
  validateInsertSaleBody,
} = require('../middlewares/sales.middlewares');

// get - pegar as informações
router.get('/', getAllSales);
router.get('/:id', validateId, getSalesById);

// post - inserir informações
router.post('/', validateInsertSaleBody, postSales);

// put - atualizar informações
router.put(
  '/:id',
  validateId,
  validateInsertSaleBody,
  updateSales,
);

// delete - deletar informações
router.delete('/:id', validateId, deleteSales);

module.exports = router;