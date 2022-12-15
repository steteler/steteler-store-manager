const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const productsModel = require('../../../src/models/products.model')
const salesServices = require('../../../src/services/sales.services');
const salesModel = require('../../../src/models/sales.model');
const salesProductsModel = require('../../../src/models/salesProducts.model')
const {
  sales,
  serviceReturn,
  finalReturn,
  updateReturn,
} = require('./mocks/sales.services.mock');

const { expect } = chai;

describe('Testa sales services', function () {
  afterEach(sinon.restore);

  describe('Testa se postSales é chamado', function () {
    it('testa se retorna um obj válido com as sales', async function () {
      sinon.stub(productsModel, 'getProductById').resolves([{ id: 1, name: 'Product 1' }]);
      sinon.stub(salesModel, 'postSales').resolves(1);
      sinon.stub(salesProductsModel, 'postSales').resolves(true);
      const result = await salesServices.postSales(sales);
      expect(result).to.be.deep.equal(serviceReturn);
    });

    it('testa se algum produto não é encontrado', async function () {
      sinon.stub(productsModel, 'getProductById').resolves([]);
      const result = await salesServices.postSales(sales);
    });

    it('testa se insert da erro', async function () {
      sinon.stub(productsModel, 'getProductById').resolves([{ id: 1, name: 'Product 1' }]);
      sinon.stub(salesModel, 'postSales').resolves(1);
      sinon.stub(salesProductsModel, 'postSales').resolves(false);
      const result = await salesServices.postSales(sales);
      expect(result).to.have.property('isError', true);
      expect(result).to.have.nested.property('statusCode', 500);
      expect(result).to.have.nested.property('message', 'Error inserting sale');
    });
  });

  describe('Testa se getAllSales é chamado', function () {
    it('testa se retorna um array válido com as sales', async function () {
      sinon.stub(salesModel, 'getAllSales').resolves(finalReturn);
      const result = await salesServices.getAllSales();
      expect(result).to.be.deep.equal(finalReturn);
    });
  });

  describe('Testa se getSalesById é chamado', function () {
    it('testa se retorna o array válido', async function () {
      sinon.stub(salesModel, 'getSalesById').resolves([finalReturn[0]]);
      const result = await salesServices.getSalesById(1);
      expect(result).to.be.deep.equal([finalReturn[0]]);
    });

    it('testa se o d não é encontrado', async function () {
      sinon.stub(salesModel, 'getSalesById').resolves([]);
      const result = await salesServices.getSalesById(1);
    });
  });

  describe('Testa se o updateSales é chamado', function () {
    it('testa se retorna um obj válido', async function () {
      sinon.stub(salesModel, 'existSale').resolves([{ id: 1 }]);
      sinon.stub(productsModel, 'getProductById').resolves([{ id: 1, name: 'Product 1' }]);
      sinon.stub(salesProductsModel, 'deleteSales').resolves();
      sinon.stub(salesProductsModel, 'postSales').resolves();

      const result = await salesServices.updateSales(1, sales);
      expect(result).to.be.deep.equal(updateReturn);
    });

    it('testa se retorna sale not found', async function () {
      sinon.stub(salesModel, 'existSale').resolves([]);
      const result = await salesServices.updateSales(1, sales);
      expect(result).to.have.property('isError', true);
      expect(result).to.have.nested.property('statusCode', 404);
      expect(result).to.have.nested.property('message', 'Sale not found');
    });

    it('testa se algum produto não é encontrado', async function () {
      sinon.stub(salesModel, 'existSale').resolves([{ id: 1 }]);
      sinon.stub(productsModel, 'getProductById').resolves([]);
      const result = await salesServices.updateSales(1, sales);
    });
  });

  describe('Testa se deleteSales é chamado', function () {
    it('testa se não retorna nada se não der erro', async function () {
      sinon.stub(salesModel, 'existSale').resolves([{ id: 1 }]);
      sinon.stub(salesModel, 'deleteSales').resolves();
      sinon.stub(salesProductsModel, 'deleteSales').resolves();
      const result = await salesServices.deleteSales(1);
      expect(result).to.be.deep.equal({ isError: false });
    });

    it('testa se retorna erro se não encontrado', async function () {
      sinon.stub(salesModel, 'existSale').resolves([]);
      const result = await salesServices.deleteSales(1);
      expect(result).to.have.property('isError', true);
      expect(result).to.have.nested.property('statusCode', 404);
      expect(result).to.have.nested.property('message', 'Sale not found');
    });
  });
});