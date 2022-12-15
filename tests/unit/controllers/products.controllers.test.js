const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productsControllers = require('../../../src/controllers/products.controllers');
const productsServices = require('../../../src/services/products.services');

const { productList } = require('./mocks/products.controllers.mock');

describe('Testa o products controller', function () {
  afterEach(sinon.restore);

  describe('Testa se getAllProducts é chamada', function () {
    it('retorna a lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getAllProducts').resolves(productList);

      await productsControllers.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });
  });

  describe('Testa se getProductById é chamada', function () {
    it('testa se o id é válido', async function () {
      const res = {};
      const req = {
        params: { id: 1 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getProductById').resolves(productList[0]);

      await productsControllers.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList[0]);
    });

    it('testa se o produto não é encontrado', async function () {
      const res = {};
      const req = {
        params: { id: 1 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getProductById').resolves(undefined);

      await productsControllers.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });

  describe('Testa se postProduct é chamado', function () {
    it('testa se retorna um novo produto se dar sucesso', async function () {
      const res = {};
      const req = {
        body: { name: 'Produto 1' }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'postProduct').resolves({
        id: 1,
        name: 'Produto 1',
      });

      await productsControllers.postProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        name: 'Produto 1',
      });
    });
  });

  describe('Testa se updateProduct é chamado', function () {
    it('deve retornar o valor atualizado se sucesso', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: 'Produto 1' }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'updateProduct').resolves({
        id: 1,
        name: 'Produto 1',
      });

      await productsControllers.updateProduct(req, res);

      // expect(res.status).to.have.been.calledWith(200);
      // expect(res.json).to.have.been.calledWith({
      //   id: 1,
      //   name: 'Produto 1',
      // });
    });

    it('Testa se retorna erro na falha do update', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: 'Product 1' }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'updateProduct').resolves(false);

      await productsControllers.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });

  describe('Testa se deleteProduct foi chamada', function () {
    it('Deve retornar 204 se deletado com sucesso', async function () {
      const res = {};
      const req = {
        params: { id: 1 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'deleteProduct').resolves(undefined);

      await productsControllers.deleteProduct(req, res);

      // expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Testa se retorna erro ao falhar ao deletar', async function () {
      const res = {};
      const req = {
        params: { id: 1 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'deleteProduct').resolves(undefined);

      await productsControllers.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });
});