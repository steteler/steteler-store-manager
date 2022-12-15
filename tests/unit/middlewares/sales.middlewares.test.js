const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesMiddlewares = require('../../../src/middlewares/sales.middlewares');

describe('Testa sales middleware', function () {
  afterEach(sinon.restore);

  describe('Testa se validateInsertSaleBody é chamada', function () {
    it("Testa se retorna erro se não for um array", async function () {
      const res = {};
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"sales" must be an array' });
    });

    it('Testa se da erro se estiver vazio', async function () {
      const res = {};
      const req = { body: [] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"sales" is empty' });
    });

    it("Testa se da erro se o array não tiver quality", async function () {
      const res = {};
      const req = { body: [{ productId: 1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it("Testa se da erro se não tiver o productId", async function () {
      const res = {};
      const req = { body: [{ quantity: 1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it("Testa se dar erro se o quantity for string", async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: 'test' }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" should be a type of "number"',
      });
    });

    it("Testa se da erro se o quantity for negativo", async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: -1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it("Testa se retorna erro se o productId for string", async function () {
      const res = {};
      const req = { body: [{ productId: 'test', quantity: 1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" should be a type of "number"',
      });
    });

    it("Testa se dar erro se o productId for negativo", async function () {
      const res = {};
      const req = { body: [{ productId: -1, quantity: 1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" must be greater than or equal to 1',
      });
    });

    it('Testa se o next é chamado se for válido', async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: 1 }] };

      const next = sinon.stub();

      await salesMiddlewares.validateInsertSaleBody(req, res, next);

      expect(next).to.have.been.called;
    });
  });

  describe('Testa se validateId é chamado', function () {
    it('testa se retorna erro se não for um number', async function () {
      const res = {};
      const req = {
        params: { id: 'test' }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateId(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be a number',
      });
    });

    it('testa se da erro se o valor for negativo', async function () {
      const res = {};
      const req = {
        params: { id: -1 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateId(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be greater than or equal to 1',
      });
    });

    it('testa se o next é chamado se for válido', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      const next = sinon.stub();

      await salesMiddlewares.validateId(req, res, next);

      expect(next).to.have.been.called;
    });
  });
});