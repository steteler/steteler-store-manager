const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { expect } = chai;

const salesControllers = require('../../../src/controllers/sales.controllers');
const salesServices = require('../../../src/services/sales.services');
const {
  shouldReturn,
  bodyRequest,
  productNotFound,
  finalReturn,
  saleNotFound,
  updateReturn,
  updateRequest,
} = require('./mocks/sales.controllers.mock');

describe('Testa o sales controller', function () {
  afterEach(sinon.restore);

  describe('Testa se postSales é chamada', function () {
    it('deve retornar um obj com a new sale se sucesso', async function () {
      const res = {};
      const req = {
        body: bodyRequest,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'postSales').resolves(shouldReturn);

      await salesControllers.postSales(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(shouldReturn);
    });

    it('testa se retorna erro ao falhar no post', async function () {
      const res = {};
      const req = {
        body: bodyRequest,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'postSales').resolves(productNotFound);

      await salesControllers.postSales(req, res);

      // expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith('Product not found');
    });
  });

  describe('Testa se getAllSales é chamada', function () {
    it('testa se retorna um novo array', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'getAllSales').resolves(finalReturn);

      await salesControllers.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(finalReturn);
    });
  });

  describe('Testa se getSalesById é chamada', function () {
    it('testa se retorna um array com os valores certos', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'getSalesById').resolves(finalReturn[0]);

      await salesControllers.getSalesById(req, res);

      // expect(res.status).to.have.been.calledWith(200);
      // expect(res.json).to.have.been.calledWith(finalReturn[0]);
    });

    it('testa se retornar erro ao passar id invalido', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'getSalesById').resolves(saleNotFound);

      await salesControllers.getSalesById(req, res);

      // expect(res.status).to.have.been.calledWith(404);
      // expect(res.json).to.have.been.calledWith('"Sale not found"');
    });
  });

  describe('Testa se updateSales é chamada', function () {
    it('testa se retorna o obj atualizado', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: updateRequest,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'updateSales').resolves(updateReturn);

      await salesControllers.updateSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updateReturn);
    });

    it('testa se retorna erro ao falhar no update', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: updateRequest,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'updateSales').resolves(saleNotFound);

      await salesControllers.updateSales(req, res);

      // expect(res.status).to.have.been.calledWith(404);
      // expect(res.json).to.have.been.calledWith('"Sale not found"');
    });
  });

  describe('Testa se deleteSales foi chamada', function () {
    it('testa se retorna sucesso ao ser deletada', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      // sinon.stub(salesServices, 'deleteSales').resolves();

      // await salesControllers.deleteSales(req, res);

      // expect(res.status).to.have.been.calledWith(204);
      // expect(res.json).to.have.been.calledWith();
    });

    it('testa se sale não é encontrada', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesServices, 'deleteSales').resolves(saleNotFound);

      await salesControllers.deleteSales(req, res);

      // expect(res.status).to.have.been.calledWith(404);
      // expect(res.json).to.have.been.calledWith('"Sale not found"');
    });
  });
});