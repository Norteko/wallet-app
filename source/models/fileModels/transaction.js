
const ApplicationError = require('../../../libs/application-error');

const FileModel = require('../common/fileModel');


class Transactions extends FileModel {
  constructor() {
    super('transactions.json');
  }

  async create(transaction) {
    const newTransaction = Object.assign({}, transaction, {
      id: this.generateId(),
    });
    this.dataSource.push(newTransaction);
    await this.saveUpdates();
    return newTransaction;
  }


  async getByCard(cardId) {
    return this.dataSource.filter(transaction => transaction.cardId === cardId);
  }

  async getAll() {
    return this.dataSource;
  }

  static async remove() {
    throw new ApplicationError('Transaction can\'t be removed', 400);
  }
}

module.exports = Transactions;
