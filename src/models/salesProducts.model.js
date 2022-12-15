const connection = require('./connection');

const postSales = async (saleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return affectedRows === 1;
};

const deleteSales = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?', [id]);
};

module.exports = {
  postSales,
  deleteSales,
};