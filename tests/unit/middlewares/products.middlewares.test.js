const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsMiddlewares = require('../../../src/middlewares/products.middlewares');

describe('Testa products middlewares', function () {
  afterEach(sinon.restore);

  describe('testa se validateId é chamada', function () {
    it('testa se retorna erro ao ser string', async function () {
      const res = {};
      const req = {
        params: { id: 'test' }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsMiddlewares.validateId(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be a number',
      });
    });

    it('testa se retorna erro se número for negativo', async function () {
      const res = {};
      const req = {
        params: { id: -1 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsMiddlewares.validateId(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be greater than or equal to 1',
      });
    });

    it('testa se o next é chamado se id for numero', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      const next = sinon.stub().returns();

      await productsMiddlewares.validateId(req, res, next);

      expect(next).to.have.been.called;
    });
  });

  describe('Testa se validateInsertProductBody é chamado', function () {
    it("testa se retorna erro se não tiver name", async function () {
      const res = {};
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsMiddlewares.validateInsertProductBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });

    it("Testa se retorna erro se o name não for string", async function () {
      const res = {};
      const req = { body: { name: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsMiddlewares.validateInsertProductBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" should be a type of "text"',
      });
    });

    it('Testa se da erro se o name tiver tamanho menor que 5', async function () {
      const res = {};
      const req = { body: { name: 'test' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsMiddlewares.validateInsertProductBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('Testa se o next é chamado se der certo', async function () {
      const res = {};
      const req = { body: { name: 'test test' } };
      const next = sinon.stub().returns();

      await productsMiddlewares.validateInsertProductBody(req, res, next);

      expect(next).to.have.been.called;
    });
  });
});