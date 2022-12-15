const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const { finalReturn } = require('./mocks/sales.model.mock');

describe('Testing the sales model', function () {
  afterEach(sinon.restore);

  describe('Testa se postSales é chamado', function () {
    it('testa se retorna o valor inserido', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesModel.postSales();
      expect(result).to.be.deep.equal(1);
    });
  });

  describe('Testa se getAllSales é chamado', function () {
    it('testa se retorna um array válido', async function () {
      sinon.stub(connection, 'execute').resolves([finalReturn]);
      const result = await salesModel.getAllSales();
      expect(result).to.be.deep.equal(finalReturn);
    });
  });

  describe('Testa se getSalesById é chamado', function () {
    it('testa se retorna um array válido com os sales', async function () {
      sinon.stub(connection, 'execute').resolves([[finalReturn[0]]]);
      const result = await salesModel.getSalesById(1);
      expect(result).to.be.deep.equal([finalReturn[0]]);
    });
  });

  describe('Testa se existSale é chamado', function () {
    it('testa se retorna válido', async function () {
      sinon.stub(connection, 'execute').resolves([[{ id: 1 }]]);
      const result = await salesModel.existSale(1);
      expect(result).to.be.deep.equal([{ id: 1 }]);
    });
  });

  describe('Testa se deleteSales é chamado', function () {
    it('testa se é removido com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves();
      await salesModel.deleteSales(1);
      expect(connection.execute).to.have.been.calledWith(
        'DELETE FROM StoreManager.sales WHERE id = ?',
        [1],
      );
    });
  });
});