const shouldReturn = {
  id: 1,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 2 },
  ],
};

const bodyRequest = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 2 },
];

const productNotFound = undefined;

const finalReturn = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleNotFound = undefined;

const updateReturn = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const updateRequest = [
  {
    productId: 1,
    quantity: 1,
  },
];

module.exports = {
  shouldReturn,
  bodyRequest,
  productNotFound,
  finalReturn,
  saleNotFound,
  updateReturn,
  updateRequest,
};