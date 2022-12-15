const connection = require('./connection');

const postSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `
    SELECT
      s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity 
    FROM
      StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
    ORDER BY
      s.id ASC,
      sp.product_id ASC
    `,
  );

  return sales;
};

const getSalesById = async (id) => {
  const [sales] = await connection.execute(
    `
    SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
    WHERE
      s.id = ?
    ORDER BY
      s.id ASC,
      sp.product_id ASC
    `,
    [id],
  );

  return sales;
};

const existSale = async (id) => {
  const [sale] = await connection.execute(
    'SELECT id FROM StoreManager.sales WHERE id = ?', [id],
  );

  return sale;
};

const deleteSales = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};

module.exports = {
  postSales,
  getAllSales,
  getSalesById,
  existSale,
  deleteSales,
};