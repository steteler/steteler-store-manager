const connection = require('./connection');

const searchByQuery = async (query) => {
  const [products] = await connection.execute(
    `
    SELECT
      *
    FROM
      StoreManager.products
    WHERE
      name LIKE ?`,
    [`%${query}%`],
  );

  return products;
};

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  return products;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?', [id],
  );
  return product;
};

const postProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const updateProduct = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id =  ?',
    [name, id],
  );

  return affectedRows > 0;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return affectedRows > 0;
};

module.exports = {
  searchByQuery,
  getAllProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};