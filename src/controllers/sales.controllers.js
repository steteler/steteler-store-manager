const salesServices = require('../services/sales.services');

// códigos http, significa o resultado da solicitação
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SV_ERROR = 500;

// adiciona uma novas sales
const postSales = async (req, res) => {
  const sale = req.body;
  const sales = await salesServices.postSales(sale);

  if (sales.invalidProducts) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'Product not found' });
  }

  if (sales.insertItemError) {
    return res.status(HTTP_INTERNAL_SV_ERROR).json({ message: 'Error inserting sale' });
  }

  res.status(HTTP_CREATED).json(sales);
};

// pega todas as sales
const getAllSales = async (_req, res) => {
  const sales = await salesServices.getAllSales();
  res.status(HTTP_OK).json(sales);
};

// pega uma sales específica
const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getSalesById(id);
  if (!sale || !sale.length) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'Sale not found' });
  }
  res.status(HTTP_OK).json(sale);
};

// atualiza uma sales especifica
const updateSales = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const sales = await salesServices.updateSales(id, sale);

  if (sales.isInvalidSale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  if (sales.isInvalidSold) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(HTTP_OK).json(sales);
};

// deleta uma sales especifica
const deleteSales = async (req, res) => {
  const { id } = req.params;
  const sales = await salesServices.deleteSales(id);

  if (sales.isSaleInvalid) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(HTTP_NO_CONTENT).json();
};

module.exports = {
  postSales,
  getAllSales,
  getSalesById,
  updateSales,
  deleteSales,
};