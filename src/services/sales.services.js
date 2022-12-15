const salesModel = require('../models/sales.model');
const salesProductsModel = require('../models/salesProducts.model');

const insertProducts = async (sale) => {
  const saleId = await salesModel.postSales();

  const itemsSoldInserted = await Promise.all(
    sale.map(async ({ productId, quantity }) => {
      const inserted = await salesProductsModel.postSales(saleId, productId, quantity);
      return inserted;
    }),
  ).then((itens) => itens.every((item) => item));

  return { saleId, itemsSoldInserted };
};

const isValidProduct = async (sale) => {
  const isValid = await Promise.all(
    sale.map(async ({ productId }) => {
      const [product] = await salesModel.getSalesById(productId);
      return product;
    }),
  ).then((products) => products.every((product) => product));

  return isValid;
};

const postSales = async (sale) => {
  const allProductsIsValid = await isValidProduct(sale);

  if (!allProductsIsValid) {
    return { invalidProducts: true };
  }

  const { saleId, itemsSoldInserted } = await insertProducts(sale);

  if (!itemsSoldInserted) {
    return { insertItemError: true };
  }

  return {
    id: saleId,
    itemsSold: sale,
  };
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesById = async (id) => {
  const sale = await salesModel.getSalesById(id);

  return sale;
};

const isSaleExist = async (id) => {
  const sale = await salesModel.existSale(id);

  return sale;
};

const updateSales = async (id, sale) => {
  const saleExist = await isSaleExist(id);

  if (!saleExist.length) {
    return { isInvalidSale: true };
  }

  const isValid = await isValidProduct(sale);

  if (!isValid) {
    return { isInvalidSold: true };
  }

  await salesProductsModel.deleteSales(id);

  await Promise.all(
    sale.map(async (item) => {
      await salesProductsModel.postSales(id, item.productId, item.quantity);
    }),
  );

  return {
    saleId: Number(id),
    itemsUpdated: sale,
  };
};

const deleteSales = async (id) => {
  const saleExist = await isSaleExist(id);

  if (!saleExist.length) {
    return { isSaleInvalid: true };
  }

  await salesModel.deleteSales(id);
  await salesProductsModel.deleteSales(id);

  return true;
};

module.exports = {
  postSales,
  getAllSales,
  getSalesById,
  updateSales,
  deleteSales,
};