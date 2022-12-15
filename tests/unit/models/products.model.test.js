const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { productList } = require('./mocks/products.model.mock');
const { expect } = chai;

describe('Testa o product model', function () {
  afterEach(sinon.restore);

  describe('Testa se getAllProducts é chamado', function () {
    it('testa se retorna os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productList]);
      const result = await productsModel.getAllProducts();
      expect(result).to.be.deep.equal(productList);
    });
  });

  // describe('Testa se getProductById é chamado', function () {
  //   it('testa se retorna é válido', async function () {
  //     sinon.stub(connection, 'execute').resolves([productList[0]]);
  //     const result = await productsModel.getProductById(1);
  //     expect(result).to.be.deep.equal(productList[0]);
  //   });
  // });

  describe('Testa se postProduct é chamado', function () {
    it('testa se o produto foi inserido', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await productsModel.postProduct('Product 1');
      expect(result).to.be.deep.equal(1);
    });
  });

  describe('Testa se updateProduct é chamado', function () {
    it('testa se ele retorna affectedRows', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productsModel.updateProduct(1, 'Product 1');
      expect(result).to.be.deep.equal(true);
    });
  });

  describe('Testa se deleteProduct é chamado', function () {
    it('testa se ele retorna affectedRows', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productsModel.deleteProduct(1);
      expect(result).to.be.deep.equal(true);
    });
  });
});