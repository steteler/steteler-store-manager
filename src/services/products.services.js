const productsModel = require('../models/products.model');

const searchByQuery = async (query) => {
  const products = await productsModel.searchByQuery(query);
  console.log(products);
  return products;
};

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  console.log(product);
  return product;
};

const postProduct = async (name) => {
  const insertId = await productsModel.postProduct(name);
  return { id: insertId, name };
};

const updateProduct = async (id, name) => {
  const updated = await productsModel.updateProduct(id, name);

  const product = await productsModel.getProductById(id);

  return { updated, product };
};

const deleteProduct = async (id) => {
  const deleted = await productsModel.deleteProduct(id);

  return deleted;
};

module.exports = {
  searchByQuery,
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};