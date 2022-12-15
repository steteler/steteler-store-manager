const productsServices = require('../services/products.services');

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NO_CONTENT = 204;
const HTTP_NOT_FOUND = 404;

// pega todos os produtos
const getAllProducts = async (_req, res) => {
  const products = await productsServices.getAllProducts();
  res.status(HTTP_OK).json(products);
};

// pega um produto especifico pelo id
const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.getProductById(id);
  if (!product) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'Product not found' });
  }
  res.status(HTTP_OK).json(product);
};

// insere um novo produto
const postProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsServices.postProduct(name);
  res.status(HTTP_CREATED).json(product);
};

// atualiza o produto escolhido
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { updated, product } = await productsServices.updateProduct(id, name);
  console.log(updated);
  if (!updated) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'Product not found' });
  }
  res.status(HTTP_OK).json(product);
};

// deleta o produto escolhido
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.deleteProduct(id);
  if (!product) {
    return res.status(HTTP_NOT_FOUND).json({
      message: 'Product not found',
    });
  }
  res.status(HTTP_NO_CONTENT).json();
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};