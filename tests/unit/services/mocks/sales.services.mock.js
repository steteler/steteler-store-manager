const sales = [
  {
    productId: 1,
    quantity: 1,
  },
];

const serviceReturn = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const updateReturn = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

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

module.exports = {
  sales,
  serviceReturn,
  updateReturn,
  finalReturn,
};