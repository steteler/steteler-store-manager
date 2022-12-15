const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;

const connection = require('../../../src/models/connection');
const salesProductsModel = require('../../../src/models/salesProducts.model');

describe('Testa salesProducts model', function () {
  afterEach(sinon.restore);

  describe('Testa se postSales é chamado', function () {
    it('testa se retorna verdadeiro com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesProductsModel.postSales(1, 1, 1);
      expect(result).to.be.equal(true);
    });
  });

  describe('Testa se deleteSales éc chamado', function () {
    it('testa se remove com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves();
      await salesProductsModel.deleteSales(1);
      expect(connection.execute).to.have.been.calledWith(
        'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
        [1],
      );
    });
  });
});