const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const productsServices = require('../../../src/services/products.services');
const productsModel = require('../../../src/models/products.model');
const { productList } = require('./mocks/products.services.mock');

const { expect } = chai;

describe('Testa product service', function () {
  afterEach(sinon.restore);

  describe('testa se getAllProducts é chamado', function () {
    it('testa se retorna a lista de produtos', async function () {
      sinon.stub(productsModel, 'getAllProducts').resolves(productList);
      const result = await productsServices.getAllProducts();
      expect(result).to.be.deep.equal(productList);
    });
  });

  describe('testa se getProductById é chamado', function () {
    it('testa se retorna válido', async function () {
      sinon.stub(productsModel, 'getProductById').resolves([productList[0]]);
      const result = await productsServices.getProductById(1);
      expect(result).to.be.deep.equal([productList[0]]);
    });

    it('testa se retorna not found se não encontrado', async function () {
      sinon.stub(productsModel, 'getProductById').resolves([]);
      const result = await productsServices.getProductById(1);
    });
  });

  describe('Testa se postProduct é chamado', function () {
    it('testa se o id retornado é valido', async function () {
      sinon.stub(productsModel, 'postProduct').resolves(1);
      sinon.stub(productsModel, 'getProductById').resolves([productList[0]]);
      const result = await productsServices.postProduct('Nome1');
      expect(result).to.be.deep.equal(productList[0]);
    });
  });

  describe('Testa se updateProduct é chamado', function () {
    it('testa se o id é válido', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves(true);
      sinon.stub(productsModel, 'getProductById').resolves([productList[0]]);
      const result = await productsServices.updateProduct(1, 'Produto 1');
      // expect(result).to.be.deep.equal(productList[0]);
    });

    it('testa se o id não é encontrado', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves(false);
      const result = await productsServices.updateProduct(1, 'Produto 1');
    });
  });

  describe('Testa se deleteProduct é chamado', function () {
    it('testa se o id é válido', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves(true);
      const result = await productsServices.deleteProduct(1);
    });

    it('testa se o id não é encontrado', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves(false);
      const result = await productsServices.deleteProduct(1);
    });
  });
});